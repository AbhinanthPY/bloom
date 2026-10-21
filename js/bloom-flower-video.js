/* Transparent, silent flower opening; independent of the mouse-only camera/depth effect. */
'use strict';
(() => {
 const scene=document.querySelector('[data-glass-scene]');
 const layer=scene?.querySelector('.wb-flower-motion');
 const video=layer?.querySelector('video');
 if(!video)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let inView=false,ready=false,finished=false,failed=false,objectURL=null,preparing=null,observer=null,destroyed=false;
 video.muted=true;
 video.playsInline=true;
 video.defaultPlaybackRate=2;
 video.playbackRate=2;
 scene.dataset.flowerState='preparing';
 // WebKit uses HEVC alpha. Chromium/Firefox use VP9 alpha, avoiding opaque HEVC decoding.
 const appleWebKit=(!/Chrome|Chromium|Edg\//.test(navigator.userAgent)||/iP(?:hone|ad|od)/.test(navigator.userAgent))&&!!video.canPlayType('video/mp4; codecs="hvc1"');
 const path=appleWebKit?video.dataset.hevcSrc:video.dataset.webmSrc;
 scene.dataset.flowerFormat=appleWebKit?'hevc-alpha':'vp9-alpha';
 function syncPlayback(){
  if(!ready||failed||destroyed)return;
  if(reduced.matches){video.pause();layer.classList.remove('is-video-ready');scene.dataset.flowerState='static';return;}
  layer.classList.add('is-video-ready');
  if(inView&&!document.hidden&&!finished&&scene.dataset.sceneEntrance==='revealed'){
   video.playbackRate=2;
   video.play().then(()=>{scene.dataset.flowerState='playing';}).catch(()=>{scene.dataset.flowerState='paused';});
  }else{
   video.pause();scene.dataset.flowerState=finished?'complete':'paused';
  }
 }
 function waitForFrame(){
  return new Promise((resolve,reject)=>{
   const finish=error=>{
    clearTimeout(timer);video.removeEventListener('loadeddata',check);video.removeEventListener('canplay',check);video.removeEventListener('error',bad);
    error?reject(error):resolve();
   };
   const check=()=>{if(video.readyState>=2)finish();};
   const bad=()=>finish(Error('Transparent flower video unavailable'));
   const timer=setTimeout(bad,20000);
   video.addEventListener('loadeddata',check);video.addEventListener('canplay',check);video.addEventListener('error',bad,{once:true});check();
  });
 }
 function prepare(){
  if(reduced.matches){scene.dataset.flowerState='static';return Promise.resolve();}
  if(preparing)return preparing;
  preparing=(async()=>{
   const url=new URL(path,document.baseURI).href;
   video.preload='auto';
   if(location.protocol==='file:')video.src=url;
   else{
    // Buffer the selected file before the startup overlay leaves; ordinary HTTP cache serves repeat visits.
    const response=await fetch(url,{cache:'force-cache'});
    if(!response.ok)throw Error('Flower video could not load');
    objectURL=URL.createObjectURL(await response.blob());video.src=objectURL;
   }
   video.load();await waitForFrame();ready=true;
   scene.dataset.flowerState='ready';
   if(!reduced.matches)layer.classList.add('is-video-ready');
   syncPlayback();
  })().catch(()=>{
   failed=true;layer.classList.remove('is-video-ready');scene.dataset.flowerState='fallback';
   // A transparent still remains available if a codec, network or autoplay restriction prevents motion.
  });
  return preparing;
 }
 function onEnded(){finished=true;scene.dataset.flowerState='complete';}
 function onError(){failed=true;layer.classList.remove('is-video-ready');scene.dataset.flowerState='fallback';}
 function observe(){
  if(destroyed)return;
  observer=new IntersectionObserver(entries=>{
   inView=entries[0].isIntersecting&&entries[0].intersectionRatio>=.18;syncPlayback();
  },{threshold:[0,.18]});
  observer.observe(scene);
 }
 function onReducedChange(){prepare().then(syncPlayback);}
 function teardown(event){
  video.pause();
  if(event.persisted)return;
  destroyed=true;observer?.disconnect();
  if(objectURL)URL.revokeObjectURL(objectURL);
  reduced.removeEventListener('change',onReducedChange);
  document.removeEventListener('visibilitychange',syncPlayback);
  scene.removeEventListener('pointerdown',syncPlayback);
  scene.removeEventListener('bloom:glass-scene-ready',syncPlayback);
  video.removeEventListener('ended',onEnded);video.removeEventListener('error',onError);
  window.removeEventListener('bloom:page-ready',observe);window.removeEventListener('pageshow',syncPlayback);window.removeEventListener('pagehide',teardown);
 }
 video.addEventListener('ended',onEnded);video.addEventListener('error',onError);
 reduced.addEventListener('change',onReducedChange);
 document.addEventListener('visibilitychange',syncPlayback);
 scene.addEventListener('pointerdown',syncPlayback,{passive:true});
 scene.addEventListener('bloom:glass-scene-ready',syncPlayback);
 window.addEventListener('pageshow',syncPlayback);window.addEventListener('pagehide',teardown);
 window.BloomReady?.add('glass-flower',prepare());
 if(!window.BloomReady)prepare();
 if(document.documentElement.classList.contains('page-loading'))window.addEventListener('bloom:page-ready',observe,{once:true});else observe();
})();
