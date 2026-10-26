/* Homepage startup barrier: reveal only after media, fonts and motion are usable. */
'use strict';
(() => {
 const root=document.documentElement;
 const loader=document.getElementById('page-loader');
 const tasks=new Map();
 const finalizers=[];
 const caption=loader?.querySelector('.page-loader-caption');
 const retry=loader?.querySelector('.page-loader-retry');
 let complete=false,failed=false;
 root.dataset.startupState='loading';
 const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
 function add(name,promise){
  const task=Promise.resolve(promise).then(value=>{
   root.dataset.startupCompleted=String(Number(root.dataset.startupCompleted||0)+1);
   return value;
  });
  // Capture early rejection while the rest of the single deferred bundle registers.
  task.catch(()=>{});
  tasks.set(name,task);
  return task;
 }
 window.BloomReady={add,when:name=>tasks.get(name)||Promise.resolve(),frame,prepare:callback=>finalizers.push(callback)};
 retry?.addEventListener('click',()=>location.reload());
 const slow=setTimeout(()=>{
  if(!complete&&caption)caption.textContent='Preparing your experience…';
 },2000);
 const long=setTimeout(()=>{
  if(!complete){if(caption)caption.textContent='This is taking a little longer. Please check your connection.';if(retry)retry.hidden=false;}
 },12000);
 function showError(){
  failed=true;
  clearTimeout(slow);clearTimeout(long);
  root.dataset.startupState='error';
  if(caption)caption.textContent='Some content couldn’t load. Please try again.';
  if(retry)retry.hidden=false;
 }
 document.addEventListener('DOMContentLoaded',async()=>{
  try{
   if(!document.querySelector('#main')?.children.length)throw Error('Page unavailable');
   if(!document.querySelector('link[rel="stylesheet"]')?.sheet)throw Error('Styles unavailable');
   const required=['images','animations','bloom-video'];
   if(required.some(name=>!tasks.has(name)))throw Error('Startup incomplete');
   add('fonts',document.fonts?Promise.all([
    document.fonts.load('400 48px "DM Serif Display"'),
    document.fonts.load('italic 400 48px "DM Serif Display"'),
    document.fonts.load('400 16px Inter'),
    document.fonts.load('600 16px Inter')
   ]).then(()=>document.fonts.ready):Promise.resolve());
   root.dataset.startupTotal=String(tasks.size);
   await Promise.all([...tasks.values()]);
   window.dispatchEvent(new Event('bloom:before-reveal'));
   await Promise.all(finalizers.map(callback=>callback()));
   await frame();await frame();
   if(failed)return;
   complete=true;
   clearTimeout(slow);clearTimeout(long);
   loader?.classList.add('is-hidden');
   // Start the hero entrance once the loading overlay has faded away.
   if(loader)await new Promise(resolve=>setTimeout(resolve,200));
   root.dataset.startupState='ready';
   root.dataset.startupMs=String(Math.round(performance.now()));
   document.querySelector('#main')?.removeAttribute('aria-busy');
   root.classList.remove('page-loading');
   window.dispatchEvent(new Event('bloom:page-ready'));
   setTimeout(()=>loader?.remove(),50);
  }catch{showError();}
 },{once:true});
})();
