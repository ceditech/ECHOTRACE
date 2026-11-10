"""Recheck VCS-001 from read-only inputs; refresh only this study's final records."""
from pathlib import Path
import ast
import hashlib
import json
import re
import subprocess
import sys
sys.dont_write_bytecode = True
from PIL import Image
import study

OUT = Path(__file__).resolve().parents[1]
ROOT = study.ROOT


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT, text=True).strip()


def main():
    baseline = study.load(OUT / 'protected-before.json')
    assert study.protected() == len(baseline['files'])
    prefix = OUT.relative_to(ROOT).as_posix() + '/'
    files = git('ls-files', '--cached', '--others', '--exclude-standard').splitlines()
    assert {p for p in files if not p.startswith(prefix)} == set(baseline['files'])
    state = baseline['git_state']
    assert git('branch', '--show-current') == state['branch']
    assert git('rev-parse', 'HEAD') == state['head']
    assert hashlib.sha256(git('for-each-ref').encode()).hexdigest() == state['refs_digest']
    for name, digest in state['metadata'].items():
        p = Path(git('rev-parse', '--git-path', name))
        p = p if p.is_absolute() else ROOT / p
        assert study.sha(p) == digest
    manifest = study.load(OUT / 'candidate-manifest.json')
    measurements = study.load(OUT / 'measurements.json')
    by_id = {x['id']: x for x in measurements['candidates']}
    assert len(manifest['candidates']) == len(by_id) == 7
    assert not manifest['combined_candidate']['generated']
    summaries = []
    for record in manifest['candidates']:
        cid = record['id']
        assert record['overall_status'] in ('PASS', 'CONDITIONAL', 'REJECT', 'NOT VERIFIED')
        parts = record['parts']
        overrides = {}
        if 'passport' in parts:
            overrides['object-passport'] = study.tonal_passport(parts['passport'])[0]
        if 'numerals' in parts:
            overrides.update(study.number_assets(parts['numerals'])[0])
        for key, image in overrides.items():
            output = OUT / 'candidates' / cid / 'assets' / f'{key}.png'
            assert image.tobytes() == Image.open(output).convert('RGBA').tobytes()
        displacement = tuple(parts.get('Owen', (0, 0)))
        pair, layers, transforms, visibility = study.render(overrides, displacement)
        fresh = study.candidate_metrics(cid, pair, layers, transforms, visibility, overrides, displacement)
        recorded = by_id[cid]
        assert fresh['structural_status'] == recorded['structural_status'] == 'PASS'
        assert all(v is True for k, v in fresh['regression'].items() if k != 'R12')
        assert recorded['manual_review']['R12'].startswith('PASS')
        assert recorded['manual_review']['status'] == record['overall_status']
        assert fresh['pair_changed_pixels'] == recorded['pair_changed_pixels']
        assert fresh['unexplained_pair_pixels'] == 0
        assert fresh['outside_event_alpha_pixels'] == 0
        assert json.dumps(fresh['widths'], sort_keys=True) == json.dumps(recorded['widths'], sort_keys=True)
        for endpoint, image in zip(('original', 'changed'), pair):
            dest = OUT / 'candidates' / cid / f'{endpoint}-960.png'
            assert image.tobytes() == Image.open(dest).convert('RGB').tobytes()
            if cid == 'B0':
                assert study.sha(dest) == study.sha(study.STUDY / 'B' / f'{endpoint}-960.png')
            for width in study.WIDTHS:
                preview = OUT / 'previews' / cid / f'{endpoint}-{width}.png'
                assert Image.open(preview).tobytes() == image.resize((width, round(width * 9 / 16)), Image.Resampling.LANCZOS).tobytes()
        for output in record['outputs']:
            dest = OUT / output['path']
            assert dest.is_file() and study.sha(dest) == output['sha256']
            assert list(Image.open(dest).size) == output['dimensions']
        summaries.append({'id': cid, 'fresh_structural_R1_R11': 'PASS', 'manual_R12': 'PASS static review only', 'overall_status': record['overall_status'], 'unexplained_pair_pixels': 0, 'exact_render_reproduction': True})
    assert by_id['B0']['pair_changed_pixels'] == 15391
    assert next(x for x in manifest['candidates'] if x['id'] == 'C3b')['overall_status'] == 'REJECT'
    assert manifest['preferred_minimum'].startswith('C1a alone')
    links = 0
    for p in OUT.glob('*.md'):
        for target in re.findall(r'\]\(([^)]+)\)', p.read_text(encoding='utf-8')):
            if '://' in target:
                continue
            dest = (p.parent / target.split('#')[0]).resolve()
            assert dest.is_file() or dest in (OUT / 'verification.json', OUT / 'FILE_INVENTORY.json'), (p, target)
            links += 1
    for p in OUT.rglob('*.json'):
        study.load(p)
    for p in (OUT / 'scripts').glob('*.py'):
        ast.parse(p.read_text(encoding='utf-8'))
    subprocess.run(['git', 'diff', '--check'], cwd=ROOT, check=True)
    expected = {'README.md','AUTHORIZATION_AND_SCOPE.md','SOURCE_MANIFEST.md','BASELINE_CONTROL_REPORT.md','PASSPORT_CONTRAST_STUDY.md','NUMERAL_TREATMENT_STUDY.md','OWEN_STAGING_STUDY.md','CANDIDATE_COMPARISON_MATRIX.md','THREE_CHANGE_REGRESSION_REPORT.md','MOBILE_PREVIEW_REPORT.md','PROVENANCE_AND_RIGHTS_GAPS.md','RECOMMENDED_MINIMUM_CORRECTION.md','OWNER_DECISION_BRIEF.md','VERIFICATION_REPORT.md'}
    assert {p.name for p in OUT.glob('*.md')} == expected
    matrix = (OUT / 'CANDIDATE_COMPARISON_MATRIX.md').read_text(encoding='utf-8')
    for record in manifest['candidates']:
        assert f"| {record['id']} | {record['overall_status']} |" in matrix
    study.write_json('verification.json', {'integrity_status':'PASS','overall_study_assessment':'CONDITIONAL; C3b rejected on visual tradeoff','protected_files':len(baseline['files']),'protected_raw_hashes_unchanged':True,'outside_inventory_unchanged':True,'captured_git_state_unchanged':True,'source_hashes_unchanged':True,'source_count':len(study.load(OUT/'source-manifest.json')['sources']),'candidate_pairs':7,'new_treatment_pairs':6,'byte_exact_control_pairs':1,'combined_generated':False,'candidates':summaries,'manual_review':'Native pair plus320/390/430 pair panels; static informed inspection, no participant/device test','reproducible_reconstruction_and_output_hashes':'PASS','local_markdown_links_checked':links,'JSON_and_Python_AST':'PASS','git_diff_check':'PASS','human_recognition':'NOT VERIFIED; no new study','rights':'NOT VERIFIED','production_adoption':False,'canonical_edits':False,'application_tests_or_code_modified':False,'T17_T18':False,'commit_push':False})
    entries = [{'path':p.relative_to(OUT).as_posix(),'bytes':p.stat().st_size,'sha256':study.sha(p)} for p in sorted(OUT.rglob('*')) if p.is_file() and p.name != 'FILE_INVENTORY.json']
    entries.append({'path':'FILE_INVENTORY.json','sha256':None,'note':'Recursive self hash and size omitted.'})
    study.write_json('FILE_INVENTORY.json', {'file_count_including_inventory':len(entries),'files':entries})
    assert study.protected()
    print(json.dumps({'status':'PASS','protected':len(baseline['files']),'pairs':7,'files':len(entries),'links':links,'candidate_statuses':{x['id']:x['overall_status'] for x in manifest['candidates']}}, indent=2))


if __name__ == '__main__':
    main()
