# Font usage versus font rights

A10/A06/A07/A16. Repository records identify **Arial Bold** at `C:/Windows/Fonts/arialbd.ttf` with historical SHA-256 `4d59199834e7439c67ea4949407639961060b21b173833f566eb60ac6fd8f5af`. This fingerprint was read from visual-correction-study/source-manifest.json, not recomputed from the external file. External binary identity/vendor/name-table contents and current hash remain NOT VERIFIED. The font was not read, copied, embedded or downloaded in REV.

Recorded usage: B-art-refinement/refine.py creates12/21 on a common blank master using ImageFont.truetype at260, center(384,302),2px stroke. VCS scripts/study.py C2a uses that recorded same font/layout with lighter gold fill. CCV consumes the exact existing C2a PNG assets; it does not re-render a font. These are repository primary process/transform records plus technical manifests, not terms.

The documented outputs are raster PNGs. No font binary in tracked/nonignored repository project files, no font embedding operation or font-distribution artifact in the selected source process/manifests, and no saved applicable font license were established. Raster glyph usage differs from shipping a TTF/font resource. This audit does not assume font-file redistribution occurs, or that raster output automatically permits commercial use. Installation is not a production grant.

Required evidence: identify the actual applicable font/source record and license terms for the proposed raster numeral use, modification/output distribution and any other truly intended embedding. Qualified review must resolve applicability/allowed uses/restrictions/attribution if needed. Do not demand a font-binary redistribution permission as though a binary were proven bundled; do not infer unrestricted raster rights either.

PROVENANCE PARTIAL; RIGHTS EVIDENCE NOT VERIFIED. Historical fingerprint is Tier3; renderer source Tier2. No Tier1 applicable terms found. P0-05 remains critical; P1-04 records the narrower identity-evidence gap. G18 BLOCKED. Full recorded fields [asset-evidence.json](asset-evidence.json); exact [source registry](EVIDENCE_SOURCE_REGISTER.md).
