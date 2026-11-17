/* Synthetic-only research infrastructure; no production imports or persistent storage. */
(function(root){
  "use strict";
  const C=typeof module!=="undefined"?require("./research-config.js"):root.F3B_CONFIG;
  const copy=value=>JSON.parse(JSON.stringify(value));
  const freeze=value=>{if(value&&typeof value==="object"){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
  function assert(condition,message){if(!condition)throw new Error(message);}
  function conditionSize(id){assert(Object.hasOwn(C.conditions,id),"unsupported_condition");return C.conditions[id];}
  function checkBounds(id,bounds,viewport){
    const size=conditionSize(id);
    return Number.isFinite(bounds.x)&&Number.isFinite(bounds.y)&&bounds.width===size.width&&bounds.height===size.height&&bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=viewport.width&&bounds.y+bounds.height<=viewport.height;
  }
  async function verifyBytes(bytes,expected,digest){
    const actual=await digest(bytes);assert(actual===expected,"hash_mismatch");return actual;
  }
  async function loadInput(role,{fetchBytes,digest,decode,expected=C.inputs[role]?.hash,url=C.inputs[role]?.url}){
    assert(Object.hasOwn(C.inputs,role),"unsupported_snapshot");
    const bytes=await fetchBytes(url);const hash=await verifyBytes(bytes,expected,digest);
    const decoded=await decode(bytes);
    try{assert(decoded.width===960&&decoded.height===540,"native_dimension_mismatch");}
    catch(error){decoded.dispose?.();throw error;}
    return {role,hash,...decoded};
  }
  function createTrial({id,condition,now,schedule,cancel,onPhase=()=>{}}){
    assert(/^SYNTHETIC-[A-Za-z0-9-]{1,60}$/.test(id),"synthetic_id_required");conditionSize(condition);
    let phase="ready",timer=null,freeRecall=null,locked=null,prompted=[],corrections=[],reviewer=null,last=-Infinity;
    const events=[];
    function event(type,detail={}){
      const at=now();assert(Number.isFinite(at)&&at>=last,"non_monotonic_clock");last=at;
      events.push({sequence:events.length+1,trialId:id,type,at,detail:copy(detail)});
    }
    function clear(){if(timer!==null){cancel(timer);timer=null;}}
    function move(next){
      clear();event("phase_requested",{from:phase,to:next});phase=next;
      onPhase(next,event);event("phase_entered",{phase:next});
      if(Object.hasOwn(C.timing,next)){
        const due=now()+C.timing[next];event("timer_scheduled",{phase:next,due});
        timer=schedule(()=>{timer=null;event("timer_callback",{due,lateness:now()-due});move(next==="original"?"blank":next==="blank"?"recall":"ended");},C.timing[next]);
      }
    }
    event("trial_created",{condition,inputs:C.inputs,revision:C.revision});
    function snapshot(){return copy({revision:C.revision,syntheticOnly:true,researchExecutionAuthorized:false,id,pseudonym:id,condition,inputs:{original:C.inputs.original.hash,changed:C.inputs.changed.hash},screening:"MOCK_UNFAMILIAR",consentReference:"MOCK_NOT_CONSENT",phase,events,freeRecall,locked,prompted,corrections,reviewer,timingEligibility:"UNAPPROVED_FOR_RESEARCH"});}
    return {
      phase:()=>phase,event,snapshot,
      start(){assert(phase==="ready","start_not_allowed");move("original");},
      end(){assert(phase==="recall","end_not_allowed");move("ended");},
      invalidate(reason){if(["original","blank","recall"].includes(phase)){event("invalidated",{reason});move("invalid");}},
      capture(){assert(phase==="recall"&&!locked,"capture_not_allowed");assert(freeRecall===null,"free_recall_already_captured");freeRecall=C.mockRecall;event("mock_free_recall_captured");},
      lock(){assert(["recall","ended"].includes(phase)&&freeRecall!==null&&!locked,"lock_not_allowed");if(phase==="recall")move("ended");locked=freeze({text:freeRecall,at:now(),eventScores:{passport:"IDENTIFIED",stands:"IDENTIFIED",wallet:"IDENTIFIED"},identity:{passport:"SUPPORTED",numeral12:"SUPPORTED",numeral21:"SUPPORTED",exchange:"SUPPORTED",sameWallet:"SUPPORTED",star:"NOT_DEMONSTRATED",closed:"SUPPORTED"},source:"SYNTHETIC_SPONTANEOUS_FIXTURE",falsePositives:[],uncertainty:"MOCK_NONE"});event("spontaneous_locked");phase="locked";},
      prompt(){assert(phase==="locked"||phase==="followup","prompt_requires_lock");assert(prompted.length===0,"mock_followup_already_captured");prompted.push({prompt:C.mockPrompt,response:C.mockAnswer,source:"SYNTHETIC_PROMPTED_FIXTURE"});phase="followup";event("mock_prompted_captured");},
      correct(){assert(locked,"correction_requires_lock");corrections.push({at:now(),field:"observerNote",oldValue:null,newValue:"SYNTHETIC correction only; original recall preserved",reason:"SYNTHETIC audit test"});event("mock_correction_appended");},
      review(){assert(locked,"review_requires_lock");reviewer={pseudonym:"SYNTHETIC-REVIEWER-2",rubric:"Historical events + approved charter identity extension",disposition:"SYNTHETIC_TECHNICAL_FIXTURE_ONLY",disagreements:[]};event("mock_second_review");},
      dispose(){clear();event("disposed");}
    };
  }
  function validateRecord(value){
    assert(value&&typeof value==="object","invalid_record");
    const keys=["revision","syntheticOnly","researchExecutionAuthorized","id","pseudonym","condition","inputs","screening","consentReference","phase","events","freeRecall","locked","prompted","corrections","reviewer","timingEligibility"];
    assert(Object.keys(value).length===keys.length&&Object.keys(value).every(k=>keys.includes(k)),"unsupported_record_field");
    assert(value.revision===C.revision&&value.syntheticOnly===true&&value.researchExecutionAuthorized===false,"synthetic_record_required");
    assert(/^SYNTHETIC-[A-Za-z0-9-]{1,60}$/.test(value.id)&&value.id===value.pseudonym,"invalid_trial_identity");conditionSize(value.condition);
    assert(value.inputs?.original===C.inputs.original.hash&&value.inputs?.changed===C.inputs.changed.hash,"record_input_mismatch");
    assert(value.screening==="MOCK_UNFAMILIAR"&&value.consentReference==="MOCK_NOT_CONSENT"&&value.timingEligibility==="UNAPPROVED_FOR_RESEARCH","invalid_mock_metadata");
    assert(["ready","original","blank","recall","ended","invalid","locked","followup"].includes(value.phase),"invalid_phase");
    assert(Array.isArray(value.events)&&value.events.length>0,"missing_events");let last=-Infinity;
    for(const [i,e] of value.events.entries()){assert(e.sequence===i+1&&e.trialId===value.id&&Number.isFinite(e.at)&&e.at>=last&&typeof e.type==="string"&&e.detail&&typeof e.detail==="object","invalid_event_order");last=e.at;}
    assert(value.freeRecall===null||value.freeRecall===C.mockRecall,"non_fixture_response");
    assert(Array.isArray(value.prompted)&&value.prompted.length<=1&&value.prompted.every(p=>p.prompt===C.mockPrompt&&p.response===C.mockAnswer&&p.source==="SYNTHETIC_PROMPTED_FIXTURE"),"non_fixture_prompt");
    assert(value.locked===null||(value.locked.text===C.mockRecall&&value.freeRecall===C.mockRecall&&value.events.some(e=>e.type==="spontaneous_locked")),"invalid_lock");
    assert(value.prompted.length===0||value.locked!==null,"prompt_without_lock");
    assert(Array.isArray(value.corrections)&&value.corrections.every(c=>c.newValue==="SYNTHETIC correction only; original recall preserved"&&c.reason==="SYNTHETIC audit test"),"non_fixture_correction");
    assert(value.reviewer===null||value.reviewer.pseudonym==="SYNTHETIC-REVIEWER-2","invalid_reviewer");return copy(value);
  }
  function roundTrip(record){const text=JSON.stringify(record);return {text,record:validateRecord(JSON.parse(text))};}
  const API={conditionSize,checkBounds,verifyBytes,loadInput,createTrial,validateRecord,roundTrip};
  if(typeof module!=="undefined"){module.exports=API;return;}
  root.F3B_CORE=Object.freeze(API);
  const $=id=>document.getElementById(id);
  const params=new URLSearchParams(location.search),isScreen=params.get("presentation")==="1";
  const activePhases=["original","blank","recall"];
  if(isScreen){
    document.body.classList.add("screen");$("presentation").hidden=false;
    const channel=params.get("channel");let trial=null,resources=[],generation=0,condition="B1",preparing=false;
    const send=(type,detail={})=>{if(window.opener)window.opener.postMessage({kind:"f3b-screen",channel,type,...detail},location.origin);};
    function bounds(){const r=$("frame").getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}
    function metrics(){return {condition,bounds:bounds(),viewport:{width:innerWidth,height:innerHeight},dpr:devicePixelRatio,visualViewportScale:window.visualViewport?.scale??null,orientation:screen.orientation?.type??"unavailable",visibility:document.visibilityState,browserZoom:"MANUAL_NOT_MEASURED",osScale:"MANUAL_NOT_MEASURED"};}
    function publish(){send("state",{record:trial?.snapshot()??null,metrics:metrics()});}
    function hide(){ $("original").hidden=true;$("changed").hidden=true; }
    function release(){hide();resources.forEach(r=>r.dispose());resources=[];$("original").removeAttribute("src");$("changed").removeAttribute("src");}
    function error(message){generation++;preparing=false;trial?.dispose();trial=null;release();send("error",{message});}
    function checkPresentation(){return document.visibilityState==="visible"&&checkBounds(condition,bounds(),{width:innerWidth,height:innerHeight});}
    const digest=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes)),b=>b.toString(16).padStart(2,"0")).join("");
    async function prepare(data){
      assert(!preparing,"prepare_in_progress");assert(!trial||!activePhases.includes(trial.phase()),"cannot_prepare_active_trial");
      assert(["none","hash","missing","decode"].includes(data.fault),"unsupported_fault");
      conditionSize(data.condition);const token=++generation;preparing=true;trial?.dispose();trial=null;release();condition=data.condition;
      const size=conditionSize(condition);$("frame").style.width=size.width+"px";$("frame").style.height=size.height+"px";
      try{
        for(const role of ["original","changed"]){
          const resource=await loadInput(role,{
            url:data.fault==="missing"&&role==="original"?"/research-inputs/missing.png":C.inputs[role].url,
            expected:data.fault==="hash"&&role==="original"?"0".repeat(64):C.inputs[role].hash,
            fetchBytes:async url=>{const res=await fetch(url,{cache:"no-store"});assert(res.ok,"input_unavailable");return res.arrayBuffer();},digest,
            decode:async bytes=>{
              if(data.fault==="decode")throw new Error("SIMULATED_decoder_failure");
              const url=URL.createObjectURL(new Blob([bytes],{type:"image/png"}));const img=new Image();img.src=url;
              try{await img.decode();}catch(e){URL.revokeObjectURL(url);throw new Error("image_decode_failed");}
              return {width:img.naturalWidth,height:img.naturalHeight,url,dispose:()=>URL.revokeObjectURL(url)};
            }
          });
          if(token!==generation){resource.dispose();return;}resources.push(resource);
          $(role).src=resource.url;await $(role).decode();
        }
        if(token!==generation)return;
        assert(checkPresentation(),"presentation_not_exact_or_not_visible");
        trial=createTrial({id:data.id,condition,now:()=>performance.now(),schedule:setTimeout,cancel:clearTimeout,onPhase:(phase,event)=>{
          hide();if(phase==="original"||phase==="recall")$(phase==="original"?"original":"changed").hidden=false;
          event("dom_updated",{phase,...metrics()});const id=data.id;
          requestAnimationFrame(at=>{if(trial?.snapshot().id===id&&trial.phase()===phase){trial.event("rendering_opportunity",{phase,frameTimestamp:at,...metrics()});publish();}});
        }});
        trial.event("inputs_verified_decoded",{hashes:resources.map(r=>({role:r.role,hash:r.hash})),...metrics()});preparing=false;publish();
      }catch(e){if(token===generation)error(e.message);}
    }
    window.addEventListener("message",event=>{
      if(event.origin!==location.origin||event.source!==window.opener||event.data?.kind!=="f3b-control"||event.data.channel!==channel)return;
      const data=event.data;
      Promise.resolve().then(async()=>{
        if(data.command==="prepare"){await prepare(data);return;}
        assert(trial&&data.id===trial.snapshot().id,"stale_or_missing_trial");
        if(data.command==="start"){assert(checkPresentation(),"presentation_not_exact_or_not_visible");trial.start();}
        else if(data.command==="delay"){
          assert(activePhases.includes(trial.phase()),"delay_requires_active_trial");trial.event("synthetic_delay_requested",{duration:100,timingUncertain:true});const until=performance.now()+100;while(performance.now()<until){}trial.event("synthetic_delay_finished");
        }else if(["end","capture","lock","prompt","correct","review"].includes(data.command))trial[data.command]();
        else if(data.command==="roundtrip"){const result=roundTrip(trial.snapshot());trial.event("synthetic_roundtrip_verified",{bytes:result.text.length,equal:JSON.stringify(result.record)===result.text});}
        else throw new Error("unsupported_command");
        publish();
      }).catch(e=>{if(["start","prepare"].includes(data.command))error(e.message);else send("command-rejected",{message:e.message});});
    });
    function interrupt(reason){if(trial&&activePhases.includes(trial.phase())){trial.invalidate(reason);publish();}}
    document.addEventListener("visibilitychange",()=>{if(document.hidden)interrupt("visibility_hidden");});
    window.addEventListener("resize",()=>interrupt("viewport_resize"));
    window.visualViewport?.addEventListener("resize",()=>interrupt("visual_viewport_resize"));
    window.addEventListener("pagehide",()=>{generation++;interrupt("pagehide");trial?.dispose();release();});
    send("screen-ready");
  }else{
    $("console").hidden=false;let screenWindow=null,channel=null,currentId=null,record=null,serial=0,preparing=false;
    function controls(){const phase=record?.phase;$("prepare").disabled=!screenWindow||screenWindow.closed||preparing||activePhases.includes(phase);$("start").disabled=phase!=="ready";$("end").disabled=phase!=="recall";$("delay").disabled=!activePhases.includes(phase);$("capture").disabled=phase!=="recall"||record?.freeRecall!==null;$("lock").disabled=!["recall","ended"].includes(phase)||record?.freeRecall===null;$("prompt").disabled=!["locked","followup"].includes(phase)||record?.prompted.length>0;for(const id of ["correct","review","roundtrip"])$(id).disabled=!record?.locked;$("condition").disabled=activePhases.includes(phase)||preparing;$("fault").disabled=activePhases.includes(phase)||preparing;}
    function send(command,extra={}){if(!screenWindow||screenWindow.closed){$("error").textContent="Presentation window closed. Open a new window; no replay occurs.";record=null;controls();return;}if(command==="prepare"||command==="start")screenWindow.focus();screenWindow.postMessage({kind:"f3b-control",channel,id:currentId,command,...extra},location.origin);}
    $("open").onclick=()=>{
      if(screenWindow&&!screenWindow.closed){screenWindow.focus();return;}
      channel=crypto.randomUUID();record=null;currentId=null;preparing=false;
      screenWindow=window.open("/?presentation=1&channel="+encodeURIComponent(channel),"f3b-synthetic-"+channel,"popup,width=700,height=500");
      $("status").textContent=screenWindow?"Waiting for presentation window.":"Popup blocked; allow this local popup explicitly.";controls();
    };
    $("prepare").onclick=()=>{currentId="SYNTHETIC-"+$("condition").value+"-"+String(++serial).padStart(3,"0");record=null;preparing=true;$("error").textContent="";$("status").textContent="Verifying exact bytes and decode…";send("prepare",{id:currentId,condition:$("condition").value,fault:$("fault").value});controls();};
    for(const id of ["start","end","delay","capture","lock","prompt","correct","review","roundtrip"])$(id).onclick=()=>send(id);
    window.addEventListener("message",event=>{
      if(event.origin!==location.origin||event.source!==screenWindow||event.data?.kind!=="f3b-screen"||event.data.channel!==channel)return;
      const data=event.data;
      if(data.type==="screen-ready"){$("status").textContent="Presentation connected. Prepare a synthetic trial.";}
      else if(data.type==="error"){preparing=false;record=null;$("error").textContent=data.message;$("status").textContent="Blocked; scene concealed. Prepare a new synthetic trial to retry.";}
      else if(data.type==="command-rejected"){$("error").textContent=data.message;}
      else if(data.type==="state"&&data.record?.id===currentId){record=validateRecord(data.record);preparing=false;$("status").textContent="Synthetic phase: "+record.phase+". Research execution not authorized.";$("metrics").textContent=JSON.stringify(data.metrics,null,2);$("record").textContent=JSON.stringify(record,null,2);}
      controls();
    });
    window.addEventListener("pagehide",()=>{screenWindow?.close();});controls();
  }
})(globalThis);
