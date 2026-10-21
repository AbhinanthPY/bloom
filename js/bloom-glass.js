/* Mouse-only depth for the standalone glass scene. No scroll listener or idle loop. */
'use strict';
(() => {
 const scene=document.querySelector('[data-glass-scene]');
 if(!scene)return;
 const layers=[...scene.querySelectorAll('.wb-glass-layer')];
 const surface=scene.querySelector('.wb-glass-surface');
 const stage=scene.querySelector('.wb-glass-stage');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 // Small pointer offsets sit above the responsive corner anchors defined in CSS.
 const depths=[[0,0,0],[-6,-3,.06],[10,5,.12],[-16,5,.2],[25,-10,.32],[-32,12,.42]];
 const clamp=n=>Math.max(-1,Math.min(1,n));
 let current={x:0,y:0},target={x:0,y:0},raf=0,last=0;
 let visible=false,entered=false,enabled=false,observer=null,destroyed=false,sceneTimer=0;
 scene.dataset.glassEntrance=reduced.matches?'revealed':'pending';
 scene.dataset.sceneEntrance=reduced.matches?'revealed':'pending';

 function stop(){
  cancelAnimationFrame(raf);raf=0;last=0;
  // Preserve the last position on leave, visibility changes and scroll away.
  target={...current};
  scene.dataset.pointerMotion=enabled?'settled':'off';
 }
 function paint(){
  layers.forEach((layer,index)=>{
   const [x,y,tilt]=depths[index];
   layer.style.transform=`translate3d(${(current.x*x).toFixed(3)}px,${(current.y*y).toFixed(3)}px,0) rotateX(${(-current.y*tilt).toFixed(3)}deg) rotateY(${(current.x*tilt).toFixed(3)}deg)`;
  });
  scene.dispatchEvent(new Event('bloom:glass-depth'));
 }
 function update(now){
  raf=0;
  if(!enabled||!visible||document.hidden){stop();return;}
  const dt=last?Math.min(64,now-last):16;
  last=now;
  const ease=1-Math.exp(-dt/95);
  current.x+=(target.x-current.x)*ease;
  current.y+=(target.y-current.y)*ease;
  const settled=Math.abs(target.x-current.x)<.001&&Math.abs(target.y-current.y)<.001;
  if(settled)current={...target};
  paint();
  if(settled){last=0;scene.dataset.pointerMotion='settled';}
  else raf=requestAnimationFrame(update);
 }
 function pointerMove(event){
  if(event.pointerType!=='mouse'||!enabled||!visible||document.hidden||scene.dataset.sceneEntrance!=='revealed')return;
  const rect=scene.getBoundingClientRect();
  target.x=clamp((event.clientX-rect.left)/rect.width*2-1);
  target.y=clamp((event.clientY-rect.top)/rect.height*2-1);
  if(Math.abs(target.x-current.x)<.001&&Math.abs(target.y-current.y)<.001)return;
  scene.dataset.pointerMotion='moving';
  if(!raf)raf=requestAnimationFrame(update);
 }
 function reveal(immediate=false){
  if(entered)return;
  entered=true;
  scene.dataset.glassEntrance=immediate||reduced.matches?'revealed':'entering';
 }
 // The scene opens first. Its completion releases the card and the flower video.
 function completeScene(immediate=false){
  clearTimeout(sceneTimer);sceneTimer=0;
  if(scene.dataset.sceneEntrance==='revealed'){if(immediate)reveal(true);return;}
  scene.dataset.sceneEntrance='revealed';
  reveal(immediate);
  scene.dispatchEvent(new Event('bloom:glass-scene-ready'));
 }
 function revealScene(immediate=false){
  if(immediate||reduced.matches){completeScene(true);return;}
  if(scene.dataset.sceneEntrance!=='pending')return;
  scene.dataset.sceneEntrance='entering';
  // Fallback for browsers/extensions that suppress CSS animationend.
  sceneTimer=setTimeout(()=>completeScene(),1150);
 }
 function finishSceneEntrance(event){
  if(event.target===stage&&event.animationName==='wb-glass-scene-in')completeScene();
 }
 function finishEntrance(event){
  if(event.target===surface&&event.animationName==='wb-glass-grow')scene.dataset.glassEntrance='revealed';
 }
 function configure(){
  enabled=fine.matches&&!reduced.matches;
  stop();
  if(!enabled){current={x:0,y:0};target={...current};layers.forEach(layer=>layer.style.removeProperty('transform'));}
  if(reduced.matches){completeScene(true);reveal(true);}
 }
 function observe(){
  if(destroyed)return;
  observer=new IntersectionObserver(entries=>{
   const entry=entries[0];
   visible=entry.isIntersecting;
   if(!visible)stop();
   if(entry.isIntersecting&&entry.intersectionRatio>=.22)revealScene();
  },{threshold:[0,.22]});
  observer.observe(scene);
 }
 function onVisibility(){if(document.hidden)stop();}
 function onFocus(){completeScene(true);reveal(true);scene.dataset.glassEntrance='revealed';}
 function teardown(event){
  stop();
  if(event.persisted)return; // Preserve a completed entrance in the back/forward cache.
  destroyed=true;clearTimeout(sceneTimer);
  observer?.disconnect();
  scene.removeEventListener('pointermove',pointerMove);
  scene.removeEventListener('focusin',onFocus);
  surface.removeEventListener('animationend',finishEntrance);
  stage.removeEventListener('animationend',finishSceneEntrance);
  reduced.removeEventListener('change',configure);
  fine.removeEventListener('change',configure);
  document.removeEventListener('visibilitychange',onVisibility);
  window.removeEventListener('bloom:page-ready',observe);
  window.removeEventListener('pagehide',teardown);
 }
 scene.addEventListener('pointermove',pointerMove,{passive:true});
 // Pointer leave intentionally has no reset animation.
 scene.addEventListener('focusin',onFocus);
 surface.addEventListener('animationend',finishEntrance);
 stage.addEventListener('animationend',finishSceneEntrance);
 reduced.addEventListener('change',configure);
 fine.addEventListener('change',configure);
 document.addEventListener('visibilitychange',onVisibility);
 window.addEventListener('pagehide',teardown);
 configure();
 // The existing startup gate decodes all six layers before this observer can reveal the card.
 if(document.documentElement.classList.contains('page-loading'))window.addEventListener('bloom:page-ready',observe,{once:true});
 else observe();
})();
