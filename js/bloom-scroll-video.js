/* Paused video scrubbing followed by a still-frame parallax finish. No runtime imports. */
'use strict';
(() => {
 const section=document.getElementById('bloom');
 if(!section)return;
 const stage=section.querySelector('.bloom-stage');
 const video=section.querySelector('.bloom-video');
 const lines=[...section.querySelectorAll('.bloom-title-line')];
 const kicker=section.querySelector('.bloom-kicker');
 const brand=section.querySelector('.bloom-brand img');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const manualStatic=new URLSearchParams(location.search).get('bloom-motion')==='off';
 const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
 const smooth=value=>{const x=clamp(value);return x*x*(3-2*x);};
 let enabled=false,requested=false,failed=false,warming=false,raf=0,readyPromise=null,objectURL=null;
 let top=0,travel=1,stageHeight=1;
 let pointerX=0,pointerY=0,easedX=0,easedY=0;
 video.muted=true;
 video.playsInline=true;

 function queue(){if(!raf&&!document.hidden)raf=requestAnimationFrame(update);}
 function measure(){
  stageHeight=stage.offsetHeight;
  top=section.getBoundingClientRect().top+scrollY;
  travel=Math.max(1,section.offsetHeight-stageHeight);
  queue();
 }
 async function completeVideo(url){
  let cache;
  try{
   cache=await caches.open('bloom-complete-video-v1');
   const saved=await cache.match(url);
   if(saved?.ok){
    const blob=await saved.blob();
    if(blob.size){section.dataset.bloomCache='hit';return blob;}
   }
  }catch{}
  let response;
  for(let attempt=0;attempt<2;attempt++){
   try{
    response=await fetch(url,{cache:attempt?'reload':'force-cache'});
    if(response.status!==200)throw Error('Incomplete video response');
    break;
   }catch(error){if(attempt)throw error;}
  }
  const blob=await response.blob();
  if(!blob.size)throw Error('Empty video');
  section.dataset.bloomCache='downloaded';
  if(cache){
   try{
    await cache.put(url,new Response(blob,{headers:{'Content-Type':'video/mp4'}}));
    section.dataset.bloomCache='stored';
   }catch{}
  }
  return blob;
 }
 function waitForFrame(time){
  return new Promise((resolve,reject)=>{
   const check=()=>{if(video.readyState>=2&&!video.seeking&&(time===undefined||Math.abs(video.currentTime-time)<.08))finish();};
   const bad=()=>finish(Error('Video could not be prepared'));
   const finish=error=>{
    clearTimeout(timer);
    ['loadeddata','seeked','canplay'].forEach(name=>video.removeEventListener(name,check));
    video.removeEventListener('error',bad);
    error?reject(error):resolve();
   };
   const timer=setTimeout(bad,20000);
   ['loadeddata','seeked','canplay'].forEach(name=>video.addEventListener(name,check));
   video.addEventListener('error',bad,{once:true});
   if(time!==undefined&&Math.abs(video.currentTime-time)>.01)video.currentTime=time;
   check();
  });
 }
 function prepare(){
  if(!enabled){section.dataset.bloomPrepared='static';return Promise.resolve();}
  if(readyPromise)return readyPromise;
  requested=true;warming=true;
  section.dataset.bloomState='loading';
  readyPromise=(async()=>{
   const url=new URL(innerWidth<=809?video.dataset.mobileSrc:video.dataset.desktopSrc,document.baseURI).href;
   video.preload='auto';
   if(location.protocol==='file:'){
    video.src=url;section.dataset.bloomCache='local';
   }else{
    objectURL=URL.createObjectURL(await completeVideo(url));
    video.src=objectURL;
   }
   video.load();
   await waitForFrame();
   // Warm both ends of the decoder while the loading screen still covers the page.
   await waitForFrame(Math.max(0,video.duration-1/24));
   await waitForFrame(0);
   warming=false;
   section.dataset.bloomPrepared='true';
   section.dataset.bloomState='ready';
   section.classList.add('bloom-video-ready');
   measure();
   await new Promise(resolve=>requestAnimationFrame(resolve));
  })().catch(error=>{warming=false;failed=true;section.dataset.bloomState='error';throw error;});
  readyPromise.catch(()=>{});
  return readyPromise;
 }
 function configure(){
  enabled=!reduced.matches&&!manualStatic;
  section.classList.toggle('bloom-scroll-active',enabled);
  section.classList.toggle('bloom-scroll-static',!enabled);
  section.dataset.bloomState=enabled?(failed?'fallback':video.readyState>=2?'ready':'loading'):'static';
  if(!enabled){
   video.pause();
   stage.style.removeProperty('transform');stage.style.removeProperty('opacity');stage.style.removeProperty('border-radius');
   lines.forEach(line=>{line.style.removeProperty('transform');line.style.removeProperty('opacity');});
   kicker.style.removeProperty('opacity');
   brand.style.removeProperty('opacity');brand.style.removeProperty('transform');
  }
  measure();
  if(enabled&&!requested)prepare();
 }
 function update(){
  raf=0;
  const rect=stage.getBoundingClientRect();
  const inView=rect.bottom>0&&rect.top<innerHeight;
  document.body.classList.toggle('bloom-in-view',inView);
  if(!enabled){
   section.style.setProperty('--bloom-final-opacity','1');
   section.style.setProperty('--bloom-final-x','0px');
   section.style.setProperty('--bloom-final-y','0px');
   section.style.setProperty('--bloom-final-scale','1');
   return;
  }
  const progress=clamp((scrollY-top)/travel);
  const enterStage=smooth((innerHeight-(top-scrollY))/(innerHeight*.95));
  const small=innerWidth<=809;
  stage.style.transform=`translateY(${(small?36:64)*(1-enterStage)}px) scale(${1-(small ? .04 : .08)*(1-enterStage)})`;
  stage.style.opacity=String(.35+.65*enterStage);
  stage.style.borderRadius=`${(small?32:72)*(1-enterStage)}px`;
  section.dataset.bloomProgress=progress.toFixed(3);
  section.dataset.bloomPhase=progress<.15?'entrance':progress<.76?'video':'final-frame';
  // Keep the existing heading entrance, exit and logo reveal at the same phases.
  lines.forEach((line,index)=>{
   const enter=1-Math.pow(1-clamp((progress-index*.01)/.15),3);
   const exit=smooth((progress-.34-index*.015)/.24);
   const x=(index===2?1:-1)*stage.clientWidth*[.45,.54,.35][index]*(1-enter);
   line.style.transform=`translate3d(${x}px,${-34*exit}px,0)`;
   line.style.opacity=String(1-exit);
  });
  kicker.style.opacity=String(1-smooth((progress-.38)/.2));
  const logoIn=smooth((progress-.62)/.14),logoOut=smooth((progress-.88)/.1);
  brand.style.opacity=String(logoIn*(1-logoOut));
  brand.style.transform=`translateY(${34*(1-logoIn)-34*logoOut}px)`;

  const frameRate=24;
  const duration=Number.isFinite(video.duration)?video.duration:0;
  const lastFrame=Math.max(0,duration-1/frameRate);
  const time=Math.round(clamp((progress-.08)/.68)*lastFrame*frameRate)/frameRate;
  if(duration&&requested&&!failed&&!warming){
   if(!video.seeking&&Math.abs(video.currentTime-time)>1/(frameRate*2)){
    // Queue only one precise seek at a time; seeked reads the newest scroll position.
    try{video.currentTime=Math.min(time,lastFrame);}catch{}
   }else if(!video.seeking&&video.readyState>=2){
    section.classList.add('bloom-video-ready');
    section.dataset.bloomState='ready';
   }
  }
  const finish=smooth((progress-.76)/.24);
  const still=smooth((progress-.76)/.035);
  easedX+=(pointerX-easedX)*.12;
  easedY+=(pointerY-easedY)*.12;
  section.style.setProperty('--bloom-final-opacity',String(still));
  section.style.setProperty('--bloom-final-x',`${easedX*12*finish}px`);
  section.style.setProperty('--bloom-final-y',`${(-stageHeight*.025*finish)+(easedY*8*finish)}px`);
  section.style.setProperty('--bloom-final-scale',String(1+.035*finish));
  if(inView&&finish&&(Math.abs(pointerX-easedX)>.001||Math.abs(pointerY-easedY)>.001))queue();
 }

 video.addEventListener('loadedmetadata',queue);
 video.addEventListener('loadeddata',queue);
 video.addEventListener('seeked',()=>{
  section.dataset.bloomVideoTime=video.currentTime.toFixed(3);
  queue();
 });
 video.addEventListener('error',()=>{
  failed=true;
  section.dataset.bloomState='fallback';
  section.classList.remove('bloom-video-ready');
  queue();
 });
 // Playback is driven entirely by scrolling, including reverse scrolling.
 video.addEventListener('play',()=>video.pause());
 window.addEventListener('scroll',queue,{passive:true});
 window.addEventListener('resize',measure,{passive:true});
 window.addEventListener('pageshow',measure);
 window.addEventListener('pagehide',event=>{
  cancelAnimationFrame(raf);raf=0;video.pause();
  if(!event.persisted&&objectURL)URL.revokeObjectURL(objectURL);
 });
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden){cancelAnimationFrame(raf);raf=0;video.pause();}else measure();
 });
 stage.addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse'||!enabled)return;
  const rect=stage.getBoundingClientRect();
  pointerX=clamp((event.clientX-rect.left)/rect.width*2-1,-1,1);
  pointerY=clamp((event.clientY-rect.top)/rect.height*2-1,-1,1);
  queue();
 },{passive:true});
 stage.addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;queue();},{passive:true});
 reduced.addEventListener('change',configure);
 new ResizeObserver(measure).observe(section);
 document.fonts?.ready.then(measure);
 window.addEventListener('load',measure,{once:true});
 window.addEventListener('bloom:before-reveal',measure);
 configure();
 window.BloomReady?.add('bloom-video',prepare());
 window.BloomReady?.prepare(async()=>{
  if(!enabled)return;
  warming=true;measure();
  const progress=clamp((scrollY-top)/travel);
  const last=Math.max(0,video.duration-1/24);
  const time=Math.min(last,Math.round(clamp((progress-.08)/.68)*last*24)/24);
  await waitForFrame(time);
  warming=false;update();
 });
})();
