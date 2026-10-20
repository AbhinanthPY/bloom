/* Decode this page's selected images and CSS backgrounds for the startup barrier. */
'use strict';
(() => {
 const root=document.documentElement;
 const loader=document.getElementById('page-loader');
 let failures=0,total=0,completed=0;
 root.dataset.mediaState='loading';

 function readyImage(img){
  img.loading='eager';
  return new Promise(resolve=>{
   let retried=false,settled=false,decoding=false;
   const finish=ok=>{
    if(settled)return;
    settled=true;
    img.removeEventListener('load',loaded);
    img.removeEventListener('error',failed);
    img.dataset.mediaState=ok?'ready':'error';
    resolve(ok);
   };
   const loaded=()=>{
    if(decoding||settled)return;
    decoding=true;
    // Decoding the selected responsive source avoids a blank first paint.
    (img.decode?img.decode():Promise.resolve()).catch(()=>{}).then(()=>{
     decoding=false;
     if(img.naturalWidth)finish(true);else failed();
    });
   };
   const failed=()=>{
    if(retried){finish(false);return;}
    retried=true;
    // If a modern picture source fails, retry its ordinary WebP fallback.
    const picture=img.closest('picture');
    const selected=img.currentSrc||img.src;
    const fallback=picture&&/\.avif(?:\?|$)/.test(selected)?selected.replace(/\.avif(?=\?|$)/,'.webp'):img.src;
    picture?.querySelectorAll('source').forEach(source=>source.remove());
    img.removeAttribute('srcset');
    const url=new URL(fallback,document.baseURI);
    if(url.protocol==='http:'||url.protocol==='https:')url.searchParams.set('bloom-retry','1');
    img.src=url.href;
   };
   img.addEventListener('load',loaded);
   img.addEventListener('error',failed);
   // A freshly inserted <picture> can be complete before its candidate is selected.
   // Only a real error event should start fallback/retry handling.
   if(img.complete&&img.naturalWidth)loaded();
  });
 }

 function track(promise){
  total++;
  return promise.catch(()=>false).then(ok=>{
   completed++;
   if(!ok)failures++;
   root.dataset.mediaLoaded=String(completed);
   return ok;
  });
 }

 const tasks=[...document.images].map(img=>track(readyImage(img)));
 if(document.querySelector('#portrait-depth')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const depth=new Image();depth.src='assets/30nszQvXKcEgIENheS0WavYlM2Y.jpg';
  tasks.push(track(readyImage(depth)));
 }
 const backgrounds=new Set();
 // CSS images have no load event on their element, so warm the exact computed URLs.
 const selectors='.ambient,.hero-bg,.service-card,.bloom-fallback,#home-journal,.footer-scene,.care-hero,.care-service-summary,.care-service-body,.care-path,.care-invitation';
 document.querySelectorAll(selectors).forEach(element=>{
  [null,'::before','::after'].forEach(pseudo=>{
   const style=getComputedStyle(element,pseudo);
   for(const match of style.backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g))backgrounds.add(match[1]);
  });
 });
 backgrounds.forEach(url=>{
  const img=new Image();
  img.decoding='async';
  img.fetchPriority='low';
  img.src=url;
  tasks.push(track(readyImage(img)));
 });
 root.dataset.mediaTotal=String(total);

 const imagesReady=Promise.all(tasks).then(()=>{
  root.dataset.mediaState=failures?'error':'ready';
  root.dataset.mediaErrors=String(failures);
  window.dispatchEvent(new Event('bloom:media-ready'));
  if(failures)throw Error('An image could not be prepared');
  if(!window.BloomReady&&loader){
   root.classList.remove('page-loading');
   document.querySelector('#main')?.removeAttribute('aria-busy');
   loader.classList.add('is-hidden');
   setTimeout(()=>loader.remove(),250);
  }
 });
 window.BloomImagesReady=imagesReady;
 window.BloomReady?.add('images',imagesReady);
 imagesReady.catch(()=>{});
})();
