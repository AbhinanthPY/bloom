/* Motion is implemented with native Canvas, WebGL and browser observers. */
'use strict';
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
 const lerp=(a,b,n)=>a+(b-a)*n;
 const canvas=document.getElementById('contours');
 const ctx=canvas.getContext('2d');
 const contoursEnabled=getComputedStyle(canvas).display!=='none';
 let width=innerWidth,height=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
 let mouse={x:0,y:0},smoothMouse={x:0,y:0};
 let visible=!document.hidden,lastFrame=0,raf=0;
 const header=document.querySelector('.site-header');
 const footer=document.querySelector('#footer.footer-bloom');
 const footerScene=footer?.querySelector('.footer-scene');
 const hero=document.querySelector('.hero');
 let heroVisible=true;
 const pausePetals=()=>hero?.classList.toggle('petals-paused',document.hidden||!heroVisible);
 if(hero)new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;pausePetals()},{threshold:0}).observe(hero);
 document.addEventListener('visibilitychange',pausePetals);
 const portrait=document.querySelector('.hero-portrait');
 const heroCopy=document.querySelector('.hero-copy');
 const manifesto=document.querySelector('.manifesto');
 const quote=manifesto?.querySelector('blockquote');
 const serviceSection=document.querySelector('.services-runway');
 const track=document.querySelector('.service-track');
 const serviceSlots=[...document.querySelectorAll('.service-slot')];
 let serviceTravel=0,serviceStart=0;
 let quoteWords=[];
 if(quote){quote.innerHTML=quote.textContent.split(/\s+/).map((w,i)=>`<span class="word" data-order="${i}">${w}</span>`).join(' ');quoteWords=[...quote.children]}
 const title=hero?.querySelector('h1');
 if(title){let letter=0;title.querySelectorAll('.hero-line').forEach(line=>{line.setAttribute('aria-hidden','true');line.innerHTML=[...line.textContent].map(c=>c===' '?' ':`<span class="letter" style="--i:${letter++}">${c}</span>`).join('')})}
 let geometry={};
 function measure(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);geometry={quoteTop:manifesto?.offsetTop||0,quoteHeight:manifesto?.offsetHeight||1,serviceTop:serviceSection?serviceSection.getBoundingClientRect().top+scrollY:0,serviceHeight:serviceSection?.offsetHeight||1,heroHeight:hero?.offsetHeight||1};resizePortrait();scrollMotion()}
 window.addEventListener('pointermove',e=>{mouse.x=(e.clientX/width-.5)*2;mouse.y=(e.clientY/height-.5)*2},{passive:true});
 window.addEventListener('pointerout',e=>{if(!e.relatedTarget){mouse.x=0;mouse.y=0}},{passive:true});
 function drawContours(time){
  if(!contoursEnabled)return;
  ctx.clearRect(0,0,width,height);
  const unit=Math.min(width,height);
  const centerX=width*.5+smoothMouse.x*12,centerY=height*.5+smoothMouse.y*10;
  const spacing=unit*.086;
  const count=Math.ceil(Math.hypot(width,height)/2/spacing)+2;
  const speed=reduced.matches?0:time*.00011;
  ctx.lineWidth=.85;ctx.strokeStyle='rgba(255,255,255,.50)';
  for(let ring=0;ring<count;ring++){
   const radius=unit*.066+ring*spacing;
   ctx.beginPath();
   for(let step=0;step<=200;step++){
    const a=step/200*Math.PI*2;
    const wobble=Math.sin(a*6+speed+ring*.13)*unit*.009+Math.sin(a*3-speed*.7+ring*.25)*unit*.013+Math.cos(a*9+speed*.4)*unit*.003;
    const r=radius+wobble;
    const x=centerX+Math.cos(a)*r*(1+Math.sin(speed*.3)*.026);
    const y=centerY+Math.sin(a)*r;
    step===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
   }
   ctx.closePath();ctx.stroke();
  }
 }
 function scrollMotion(){
  const y=window.scrollY;
  header.classList.toggle('scrolled',y>60);
  if(footerScene){
   // Measure the stationary footer, then reveal its contents before they fill the view.
   const p=reduced.matches?1:clamp((height*.95-footer.getBoundingClientRect().top)/(height*.85));
   footerScene.style.setProperty('--footer-enter',String(p*p*(3-2*p)));
  }
  if(reduced.matches)return;
  if(heroCopy){const p=clamp(y/(geometry.heroHeight*.8));heroCopy.style.opacity=1-p;heroCopy.style.transform=`translateY(${y*.18}px)`;heroCopy.style.filter=`blur(${p*12}px)`;portrait.style.opacity=1-clamp(y/(geometry.heroHeight*.9));portrait.style.transform=`translateY(${y*.25}px)`}
  if(quote){const progress=clamp((y-geometry.quoteTop+height*.65)/(geometry.quoteHeight*.72));quoteWords.forEach((w,i)=>{const offset=((i*37)%quoteWords.length)/quoteWords.length*.58;const p=clamp((progress-offset)*4);w.style.opacity=.12+p*.88;w.style.filter=`blur(${(1-p)*9}px)`});const cite=manifesto.querySelector('cite');cite.style.opacity=clamp((progress-.55)*4)}
  if(track&&width>809){
   const distance=Math.max(1,geometry.serviceHeight-height);
   const p=clamp((y-geometry.serviceTop)/distance);
   const cardWidth=serviceSlots[0]?.offsetWidth||310;
   const gap=parseFloat(getComputedStyle(track).gap)||110;
   serviceStart=width*.82;
   serviceTravel=serviceStart+(serviceSlots.length-1)*(cardWidth+gap)+cardWidth+width*.25;
   const x=serviceStart-p*serviceTravel;
   track.style.transform=`translate3d(${x}px,-50%,0)`;
   serviceSlots.forEach((slot,i)=>{
    const center=x+i*(cardWidth+gap)+cardWidth/2;
    const fromCenter=clamp((center-width/2)/(width/2),-1.6,1.6);
    const angle=fromCenter*15;
    slot.style.transform=`translateY(${fromCenter*fromCenter*Math.min(95,height*.12)}px) rotate(${angle}deg)`;
    slot.style.setProperty('--counter-angle',`${-angle}deg`);
   });
  }else if(track){
   track.style.transform='';
   serviceSlots.forEach(slot=>{slot.style.transform='';slot.style.removeProperty('--counter-angle')});
  }
 }
 serviceSlots.forEach((slot,i)=>slot.querySelector('a').addEventListener('focus',()=>{
  if(width<=809||reduced.matches||!serviceTravel)return;
  const rect=slot.getBoundingClientRect();
  if(rect.left>=35&&rect.right<=width-35)return;
  const step=slot.offsetWidth+(parseFloat(getComputedStyle(track).gap)||110);
  const progress=clamp((serviceStart+i*step+slot.offsetWidth/2-width/2)/serviceTravel);
  window.scrollTo({top:geometry.serviceTop+progress*(geometry.serviceHeight-height),behavior:'instant'});
 }));
 let scrollQueued=false;
 window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(()=>{scrollMotion();scrollQueued=false})}},{passive:true});
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
 const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count);const begin=performance.now();function count(now){const p=clamp((now-begin)/1700);el.textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1&&!reduced.matches)requestAnimationFrame(count);else el.textContent=target}requestAnimationFrame(count);counterObserver.unobserve(el)}),{threshold:.5});
 document.querySelectorAll('[data-count]').forEach(el=>counterObserver.observe(el));

 // Depth-map displacement gives the portrait its subtle mouse-follow perspective.
 const glCanvas=document.getElementById('portrait-depth');
 let gl=null,program=null,offsetUniform=null,portraitReady=false;
 function resizePortrait(){if(!gl||!glCanvas)return;const rect=glCanvas.getBoundingClientRect();glCanvas.width=Math.round(rect.width*dpr);glCanvas.height=Math.round(rect.height*dpr);gl.viewport(0,0,glCanvas.width,glCanvas.height)}
 async function setupPortrait(){
  if(!glCanvas||reduced.matches)return;
  try{
   gl=glCanvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:true});
   if(!gl)return;
   const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Portrait shader unavailable');return s};
   const vs=compile(gl.VERTEX_SHADER,'attribute vec2 position; varying vec2 uv; void main(){uv=vec2((position.x+1.0)*.5,1.0-(position.y+1.0)*.5);gl_Position=vec4(position,0.,1.);}');
   const fs=compile(gl.FRAGMENT_SHADER,'precision mediump float;uniform sampler2D portrait;uniform sampler2D depth;uniform vec2 offset;varying vec2 uv;void main(){float d=texture2D(depth,uv).r;vec2 displaced=uv+offset*d*.018;vec4 color=texture2D(portrait,displaced);gl_FragColor=color;}');
   program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;gl.useProgram(program);
   const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
   const load=src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src});
   const textures=await Promise.all([load(portrait.querySelector('img').currentSrc || portrait.querySelector('img').src),load('assets/30nszQvXKcEgIENheS0WavYlM2Y.jpg')]);
   textures.forEach((img,i)=>{const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);gl.uniform1i(gl.getUniformLocation(program,i===0?'portrait':'depth'),i)});
   offsetUniform=gl.getUniformLocation(program,'offset');resizePortrait();portraitReady=true;portrait.classList.add('has-depth');
   glCanvas.addEventListener('webglcontextlost',()=>{portraitReady=false;portrait.classList.remove('has-depth')});
  }catch{portrait?.classList.remove('has-depth')}
 }
 function animate(now){
  if(!visible){raf=0;return}
  if(now-lastFrame>30){
   smoothMouse.x=lerp(smoothMouse.x,mouse.x,.07);smoothMouse.y=lerp(smoothMouse.y,mouse.y,.07);
   drawContours(now);
   if(portraitReady&&scrollY<geometry.heroHeight&&!reduced.matches){gl.uniform2f(offsetUniform,smoothMouse.x,smoothMouse.y);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)}
   lastFrame=now;
  }
  if(!reduced.matches)raf=requestAnimationFrame(animate);else raf=0;
 }
 document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible&&!raf)raf=requestAnimationFrame(animate)});
 reduced.addEventListener('change',()=>{if(!raf)raf=requestAnimationFrame(animate);if(reduced.matches){document.querySelectorAll('.word').forEach(w=>{w.style.filter='none';w.style.opacity=1});if(heroCopy){heroCopy.style.opacity=1;heroCopy.style.transform='none';heroCopy.style.filter='none'}if(portrait){portrait.style.opacity=1;portrait.style.transform='none';portrait.classList.remove('has-depth')}}else if(portraitReady){portrait.classList.add('has-depth')}measure()});
 window.addEventListener('resize',measure,{passive:true});
 window.addEventListener('load',measure);
 document.fonts.ready.then(measure);
 measure();setupPortrait();raf=requestAnimationFrame(animate);
})();
