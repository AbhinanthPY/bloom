/* A live refractive lens: resample this scene's existing images/video through glass.
   No downloaded screenshot, extra imagery, dependency or idle animation loop. */
'use strict';
(() => {
 const scene=document.querySelector('[data-glass-scene]');
 const card=scene?.querySelector('.wb-glass-card');
 const surface=card?.querySelector('.wb-glass-surface');
 const stage=scene?.querySelector('.wb-glass-stage');
 if(!surface)return;
 const video=scene.querySelector('.wb-flower-video');
 const media=[...scene.querySelectorAll('.wb-glass-artboard img,.wb-glass-artboard video')];
 const canvas=document.createElement('canvas');canvas.className='wb-glass-refraction';canvas.setAttribute('aria-hidden','true');
 const buffer=document.createElement('canvas');
 let gl=null,ctx=null,texture=null,program=null,vertices=null,observer=null,resize=null;
 let raf=0,videoFrame=0,visible=true,destroyed=false,w=0,h=0,pixelRatio=1,pad=72,nativeSVG=null;
 const uniforms={};
 const vertex=`attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=(a_position+1.0)*.5;gl_Position=vec4(a_position.x,-a_position.y,0.,1.);}`;
 const fragment=`precision highp float;
 varying vec2 v_uv;uniform sampler2D u_scene;uniform vec2 u_size;uniform vec2 u_texture;uniform float u_pad;
 float roundedBox(vec2 p,vec2 halfSize,float radius){vec2 q=abs(p)-halfSize+radius;return length(max(q,0.))+min(max(q.x,q.y),0.)-radius;}
 vec3 softSample(vec2 uv){vec2 d=vec2(1.3)/u_texture;return texture2D(u_scene,uv).rgb*.4+(texture2D(u_scene,uv+vec2(d.x,0.)).rgb+texture2D(u_scene,uv-vec2(d.x,0.)).rgb+texture2D(u_scene,uv+vec2(0.,d.y)).rgb+texture2D(u_scene,uv-vec2(0.,d.y)).rgb)*.15;}
 void main(){
  vec2 p=(v_uv-.5)*u_size;vec2 halfSize=u_size*.5;float radius=34.;
  float distance=-roundedBox(p,halfSize,radius);
  vec2 q=abs(p)-halfSize+radius;
  vec2 normal=normalize(max(q,0.)+vec2(.0001))*sign(p);
  if(max(q.x,q.y)<0.)normal=q.x>q.y?vec2(sign(p.x),0.):vec2(0.,sign(p.y));
  float edge=1.-smoothstep(0.,46.,distance);
  // Convex edge refraction plus a broad, stationary water-like bend through the centre.
  vec2 ripple=vec2(sin(p.y*.017+p.x*.004)*7.,sin(p.x*.015+p.y*.004)*13.);
  vec2 offset=normal*pow(edge,1.7)*30.+ripple*(1.-edge*.6)-p*.025;
  vec2 uv=(v_uv*u_size+u_pad+offset)/u_texture;
  vec3 color=softSample(uv);
  vec2 prism=normal*edge*1.1/u_texture;
  color.r=softSample(uv+prism).r;color.b=softSample(uv-prism).b;
  color=mix(color,vec3(.94,.97,1.),.035);
  float glint=(1.-smoothstep(0.,2.2,distance))*.28;
  gl_FragColor=vec4(mix(color,vec3(1.),glint),1.);
 }`;
 function shader(type,source){const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error('Glass shader unavailable');return sh;}
 function size(){
  w=Math.max(1,Math.round(card.offsetWidth));h=Math.max(1,Math.round(card.offsetHeight));
  pixelRatio=Math.min(devicePixelRatio||1,1.25);
  canvas.width=Math.round(w*pixelRatio);canvas.height=Math.round(h*pixelRatio);
  buffer.width=Math.round((w+pad*2)*pixelRatio);buffer.height=Math.round((h+pad*2)*pixelRatio);
 }
 function composite(){
  const cardRect=card.getBoundingClientRect();
  const scale=stage.getBoundingClientRect().width/stage.offsetWidth||1;
  ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);
  ctx.globalAlpha=1;ctx.fillStyle=getComputedStyle(stage).backgroundColor;ctx.fillRect(0,0,w+pad*2,h+pad*2);
  media.forEach(item=>{
   const isVideo=item.tagName==='VIDEO';
   const nw=isVideo?item.videoWidth:item.naturalWidth,nh=isVideo?item.videoHeight:item.naturalHeight;
   if(!nw||!nh||(isVideo&&item.readyState<2))return;
   const style=getComputedStyle(item),opacity=Number(style.opacity);
   if(opacity<.001)return;
   const r=item.getBoundingClientRect(),x=(r.left-cardRect.left)/scale+pad,y=(r.top-cardRect.top)/scale+pad;
   const rw=r.width/scale,rh=r.height/scale;
   const fit=style.objectFit==='cover'?Math.max(rw/nw,rh/nh):Math.min(rw/nw,rh/nh);
   ctx.save();ctx.beginPath();ctx.rect(x,y,rw,rh);ctx.clip();ctx.globalAlpha=opacity;
   ctx.drawImage(item,x+(rw-nw*fit)*.5,y+(rh-nh*fit)*.5,nw*fit,nh*fit);ctx.restore();
  });
 }
 function draw(){
  raf=0;if(destroyed||!gl||!visible||document.hidden)return;
  try{
   if(w!==Math.round(card.offsetWidth)||h!==Math.round(card.offsetHeight))size();
   composite();gl.viewport(0,0,canvas.width,canvas.height);gl.useProgram(program);
   gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,buffer);
   gl.uniform2f(uniforms.size,w,h);gl.uniform2f(uniforms.texture,w+pad*2,h+pad*2);gl.uniform1f(uniforms.pad,pad);
   gl.drawArrays(gl.TRIANGLE_STRIP,0,4);card.classList.add('has-refraction');
  }catch{fallback();}
 }
 function queue(){if(!raf&&visible&&!document.hidden&&!destroyed&&gl)raf=requestAnimationFrame(draw);}
 function stopVideoFrames(){
  if(videoFrame){if(video.requestVideoFrameCallback)video.cancelVideoFrameCallback(videoFrame);else cancelAnimationFrame(videoFrame);videoFrame=0;}
 }
 function onVideoFrame(){videoFrame=0;queue();watchVideo();}
 function watchVideo(){
  if(videoFrame||!video||video.paused||video.ended||!visible||document.hidden||!gl)return;
  videoFrame=video.requestVideoFrameCallback?video.requestVideoFrameCallback(onVideoFrame):requestAnimationFrame(onVideoFrame);
 }
 function onVideoState(){queue();if(video.paused||video.ended)stopVideoFrames();else watchVideo();}
 function onVisibility(){if(document.hidden){cancelAnimationFrame(raf);raf=0;stopVideoFrames();}else{queue();watchVideo();}}
 function nativeRefraction(){
  // file:// media can taint a sampled canvas. Chromium's native SVG backdrop avoids pixel access.
  if(nativeSVG||!/Chrome|Chromium|Edg\//.test(navigator.userAgent))return;
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('width','0');svg.setAttribute('height','0');svg.style.position='absolute';
  svg.innerHTML='<defs><filter id="wb-liquid-lens" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".008 .012" numOctaves="1" seed="4" result="wave"/><feGaussianBlur in="wave" stdDeviation="5" result="smooth"/><feDisplacementMap in="SourceGraphic" in2="smooth" scale="34" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation=".65"/></filter></defs>';
  scene.append(svg);nativeSVG=svg;surface.style.backdropFilter='url(#wb-liquid-lens) saturate(1.07)';surface.style.webkitBackdropFilter='url(#wb-liquid-lens) saturate(1.07)';
  card.dataset.glassOptics='native-refraction';
 }
 function fallback(){
  cancelAnimationFrame(raf);raf=0;stopVideoFrames();card.classList.remove('has-refraction');canvas.remove();gl=null;card.dataset.glassOptics='css-fallback';nativeRefraction();
 }
 function init(){
  try{
   if(location.protocol==='file:'){nativeRefraction();return;}
   ctx=buffer.getContext('2d',{alpha:false});
   gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});if(!gl)throw Error('No WebGL');
   program=gl.createProgram();const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);
   gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Glass program unavailable');
   gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);
   vertices=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vertices);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
   const position=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
   texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
   uniforms.size=gl.getUniformLocation(program,'u_size');uniforms.texture=gl.getUniformLocation(program,'u_texture');uniforms.pad=gl.getUniformLocation(program,'u_pad');
   surface.prepend(canvas);size();draw();if(!gl)return;card.dataset.glassOptics='refractive-lens';
   resize=new ResizeObserver(()=>{size();queue();});resize.observe(card);resize.observe(stage);
   observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){queue();watchVideo();}else{cancelAnimationFrame(raf);raf=0;stopVideoFrames();}},{threshold:0});observer.observe(scene);
  }catch{fallback();}
 }
 function onAnimationEnd(event){if(event.animationName==='wb-glass-grow'||event.animationName==='wb-glass-scene-in')queue();}
 function cleanup(event){
  cancelAnimationFrame(raf);raf=0;stopVideoFrames();if(event.persisted)return;destroyed=true;observer?.disconnect();resize?.disconnect();
  scene.removeEventListener('bloom:glass-depth',queue);scene.removeEventListener('bloom:glass-scene-ready',queue);scene.removeEventListener('animationend',onAnimationEnd);
  document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('pageshow',queue);window.removeEventListener('pagehide',cleanup);
  ['play','pause','ended','seeked','loadeddata'].forEach(name=>video?.removeEventListener(name,onVideoState));
  if(gl){gl.deleteTexture(texture);gl.deleteBuffer(vertices);gl.deleteProgram(program);}nativeSVG?.remove();
 }
 scene.addEventListener('bloom:glass-depth',queue);scene.addEventListener('bloom:glass-scene-ready',queue);scene.addEventListener('animationend',onAnimationEnd);
 document.addEventListener('visibilitychange',onVisibility);window.addEventListener('pageshow',queue);window.addEventListener('pagehide',cleanup);
 ['play','pause','ended','seeked','loadeddata'].forEach(name=>video?.addEventListener(name,onVideoState));
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback();},{once:true});
 const prepared=Promise.all([window.BloomImagesReady,window.BloomReady?.when('glass-flower')]).then(init).catch(fallback);
 window.BloomReady?.add('liquid-glass',prepared);
})();
