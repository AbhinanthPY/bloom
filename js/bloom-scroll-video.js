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
 let enabled=false,near=false,requested=false,failed=false,raf=0;
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
 function prepare(){
  if(!enabled||!near||requested||document.documentElement.dataset.mediaState==='loading')return;
  requested=true;
  video.preload='auto';
  video.src=innerWidth<=809?video.dataset.mobileSrc:video.dataset.desktopSrc;
  video.load();
  section.dataset.bloomState='loading';
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
  measure();prepare();
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
  if(duration&&requested&&!failed){
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
 const observer=new IntersectionObserver(entries=>{
  near=entries[0].isIntersecting;
  if(near)prepare();
  queue();
 },{rootMargin:'2000px 0px'});
 observer.observe(section);
 window.addEventListener('bloom:media-ready',prepare);
 window.addEventListener('scroll',queue,{passive:true});
 window.addEventListener('resize',measure,{passive:true});
 window.addEventListener('pageshow',measure);
 window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);raf=0;video.pause();});
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
 configure();
})();
