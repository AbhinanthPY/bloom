import { FRAME, LAYERS, textureURL } from './bloom-layers.js';

const section = document.getElementById('bloom');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const staticRequested = new URLSearchParams(location.search).get('bloom-motion') === 'off';
let controller = null;
let generation = 0;
let preloadObserver = null;
let presenceFrame = 0;

function updateScenePresence() {
  if (!section) return;
  const rect = section.querySelector('.bloom-stage').getBoundingClientRect();
  document.body.classList.toggle('bloom-in-view', rect.top < innerHeight * .45 && rect.bottom > innerHeight * .6);
}

function staticView(reason) {
  section.classList.remove('bloom-webgl-ready', 'bloom-has-motion');
  section.dataset.bloomState = 'static';
  section.dataset.bloomReason = reason;
  updateScenePresence();
}

async function initialize() {
  const token = ++generation;
  section.dataset.bloomState = 'loading';
  try {
    const [THREE, { gsap }, { ScrollTrigger }] = await Promise.all([
      import('./vendor/three/three.module.js'),
      import('./vendor/gsap/index.js'),
      import('./vendor/gsap/ScrollTrigger.js')
    ]);
    if (token !== generation || reduced.matches) return;
    gsap.registerPlugin(ScrollTrigger);
    controller = await createExperience(THREE, gsap, ScrollTrigger, token);
  } catch (error) {
    if (token !== generation) return;
    controller?.dispose();
    controller = null;
    staticView('unavailable');
    console.warn('Wellcare Bloom: the static landscape is available while 3D could not initialize.', error);
  }
}

async function createExperience(THREE, gsap, ScrollTrigger, token) {
  const stage = section.querySelector('.bloom-stage');
  const mount = section.querySelector('.bloom-canvas');
  const lines = [...section.querySelectorAll('.bloom-title-line')];
  const kicker = section.querySelector('.bloom-kicker');
  const brand = section.querySelector('.bloom-brand img');
  const abort = new AbortController();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 1, 6000);
  const scrollGroup = new THREE.Group();
  const pointerGroup = new THREE.Group();
  scene.add(scrollGroup);
  scrollGroup.add(pointerGroup);
  const geometry = new THREE.PlaneGeometry(FRAME.width, FRAME.height);
  const loader = new THREE.TextureLoader();
  const target = new THREE.Vector2();
  const pointer = new THREE.Vector2();
  const cameraMotion = { x: -8, y: -8, z: 40 };
  const phase = { progress: 0 };
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: stage.clientWidth > 809, powerPreference: 'low-power' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  mount.append(renderer.domElement);

  let layers = [];
  let mobile = stage.clientWidth <= 809;
  let tier = mobile ? 'mobile' : 'desktop';
  let baseCameraZ = 1600;
  let pixelsToWorld = 1;
  let visibleHeight = FRAME.height;
  let active = false;
  let lost = false;
  let disposed = false;
  let raf = 0;
  let lastFrame = 0;
  let refreshTimer = 0;
  let resizeFrame = 0;
  let textureGeneration = 0;
  let measuredWidth = 0;
  let measuredHeight = 0;
  let timeline = null;
  let media = null;
  let resizeObserver = null;
  let viewObserver = null;

  async function loadTextures(textureTier) {
    const results = await Promise.allSettled(LAYERS.map(async config => {
      const texture = await loader.loadAsync(textureURL(config.file, textureTier));
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      return texture;
    }));
    const failed = results.find(result => result.status === 'rejected');
    if (failed) {
      results.forEach(result => { if (result.status === 'fulfilled') result.value.dispose(); });
      throw failed.reason;
    }
    return results.map(result => result.value);
  }

  async function changeTextureTier(nextTier) {
    if (nextTier === tier) return;
    tier = nextTier;
    const version = ++textureGeneration;
    try {
      const textures = await loadTextures(nextTier);
      if (disposed || version !== textureGeneration) {
        textures.forEach(texture => texture.dispose());
        return;
      }
      layers.forEach((layer, i) => {
        const old = layer.mesh.material.map;
        layer.mesh.material.map = textures[i];
        layer.mesh.material.needsUpdate = true;
        old.dispose();
      });
      section.dataset.bloomTier = nextTier;
      render(performance.now(), true);
    } catch (error) {
      // Keep the already loaded textures if an optional resize upgrade fails.
      if (!disposed && version === textureGeneration) tier = section.dataset.bloomTier;
      console.warn('Wellcare Bloom: retaining the available texture resolution.', error);
    }
  }

  function resize() {
    if (disposed) return;
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (!width || !height || (width === measuredWidth && height === measuredHeight)) return;
    measuredWidth = width;
    measuredHeight = height;
    mobile = width <= 809;
    const ratio = width / height;
    visibleHeight = Math.min(FRAME.height, FRAME.width / ratio) / 1.025;
    baseCameraZ = visibleHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    pixelsToWorld = visibleHeight / height;
    camera.aspect = ratio;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.25 : 1.5));
    renderer.setSize(width, height, false);
    if (layers.length) changeTextureTier(mobile ? 'mobile' : 'desktop');
    render(performance.now(), true);
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => { if (!disposed) ScrollTrigger.refresh(); }, 160);
  }

  function render(now, force = false) {
    if (disposed || lost || !layers.length) return;
    const interval = mobile ? 1000 / 30 : 1000 / 60;
    if (!force && lastFrame && now - lastFrame < interval - 1) return;
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, .05) : 1 / 60;
    lastFrame = now;
    const damping = 1 - Math.exp(-4.5 * dt);
    pointer.lerp(target, damping);
    const strength = mobile ? .55 : 1;
    const time = now / 1000;
    camera.position.set(cameraMotion.x * strength + pointer.x * 2, cameraMotion.y * strength + pointer.y * 1.5, baseCameraZ + cameraMotion.z * strength);
    camera.lookAt(cameraMotion.x * strength * .4, cameraMotion.y * strength * .4, 0);
    pointerGroup.position.set(-pointer.x * 1.5, pointer.y, 0);
    layers.forEach((layer, i) => {
      const { config, mesh, motion } = layer;
      // Compensation preserves the common image composition at neutral depth.
      const distanceFactor = (baseCameraZ - config.z) / baseCameraZ;
      const planX = mobile && config.mobileX !== undefined ? config.mobileX : config.x;
      const ambientY = i === 1 ? Math.sin(time * .09) * 1.5 : i === 9 ? Math.sin(time * .24) * 7 : 0;
      const ambientX = i === 9 ? Math.sin(time * .18) * 4 : 0;
      const pointerX = -pointer.x * config.pointer * pixelsToWorld * distanceFactor;
      const pointerY = pointer.y * config.pointer * .65 * pixelsToWorld * distanceFactor;
      mesh.position.set((planX + motion.x * strength + ambientX) * distanceFactor + pointerX, (-config.y + motion.y * strength + ambientY) * distanceFactor + pointerY, config.z);
      mesh.scale.setScalar(config.scale * distanceFactor * motion.zoom);
      mesh.rotation.z = i === 8 ? Math.sin(time * .12) * .0015 : 0;
      mesh.material.opacity = config.opacity * (mobile && i === 9 ? .45 : 1);
    });
    renderer.render(scene, camera);
    section.dataset.bloomPointer = `${pointer.x.toFixed(2)},${pointer.y.toFixed(2)}`;
    section.dataset.bloomPhase = phase.progress < .15 ? 'entrance' : phase.progress < .65 ? 'depth' : phase.progress < .75 ? 'settle' : 'hold';
  }

  function frame(now) {
    raf = 0;
    if (!active || document.hidden || disposed || lost) return;
    render(now);
    raf = requestAnimationFrame(frame);
  }
  function start() {
    if (!raf && active && !document.hidden && !disposed && !lost) {
      lastFrame = 0;
      raf = requestAnimationFrame(frame);
    }
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    textureGeneration++;
    stop();
    abort.abort();
    clearTimeout(refreshTimer);
    cancelAnimationFrame(resizeFrame);
    resizeObserver?.disconnect();
    viewObserver?.disconnect();
    media?.kill(true);
    layers.forEach(layer => { layer.mesh.material.map.dispose(); layer.mesh.material.dispose(); });
    geometry.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    section.classList.remove('bloom-webgl-ready', 'bloom-has-motion');
    document.body.classList.remove('bloom-in-view');
  }

  try {
    const textures = await loadTextures(tier);
    if (token !== generation || reduced.matches) {
      textures.forEach(texture => texture.dispose());
      dispose();
      return null;
    }
    layers = LAYERS.map((config, i) => {
      const material = new THREE.MeshBasicMaterial({ map: textures[i], transparent: i !== 0, opacity: config.opacity, depthWrite: false, depthTest: false, alphaTest: i === 0 ? 0 : .001, toneMapped: false });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = i;
      mesh.frustumCulled = false;
      pointerGroup.add(mesh);
      return { config, mesh, motion: { x: 0, y: 0, zoom: 1 } };
    });
    section.dataset.bloomLayers = String(layers.length);
    section.dataset.bloomTier = tier;
    resize();

    media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 810px)', mobile: '(max-width: 809px)' }, context => {
      const small = context.conditions.mobile;
      Object.assign(cameraMotion, { x: -8, y: -8, z: 40 });
      phase.progress = 0;
      layers.forEach((layer, i) => Object.assign(layer.motion, { x: i > 5 ? layer.config.scrollX * 1.4 : 0, y: i > 5 ? -layer.config.scrollY * .5 : 0, zoom: i > 5 ? 1.016 : 1 }));
      section.classList.add('bloom-has-motion');
      // Reveal the complete stage before the existing pinned scene begins.
      // The section stays untransformed, keeping pin measurements unchanged.
      gsap.fromTo(stage, {
        scale: small ? .96 : .92,
        y: small ? 36 : 64,
        opacity: .35,
        borderRadius: small ? '32px' : '72px'
      }, {
        scale: 1,
        y: 0,
        opacity: 1,
        borderRadius: '0px',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'top 5%',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
      timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        trigger: section, start: 'top top', end: () => `+=${stage.clientHeight * (small ? 1.6 : 2.5)}`,
        pin: true, pinSpacing: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: self => { section.dataset.bloomProgress = self.progress.toFixed(3); },
        onRefresh: () => { if (!disposed) render(performance.now(), true); }
      }});
      timeline.to(phase, { progress: 1, duration: 1 }, 0);
      timeline.to(cameraMotion, { x: 0, y: 0, z: 15, duration: .15, ease: 'power1.out' }, 0);
      timeline.to(cameraMotion, { x: 10, y: 8, z: -35, duration: .5, ease: 'sine.inOut' }, .15);
      timeline.to(cameraMotion, { x: 8, y: 5, z: -40, duration: .1, ease: 'sine.out' }, .65);
      layers.forEach((layer, i) => {
        timeline.to(layer.motion, { x: 0, y: 0, zoom: 1, duration: .15, ease: 'sine.out' }, 0);
        timeline.to(layer.motion, { x: layer.config.scrollX, y: layer.config.scrollY, zoom: i > 5 ? 1.014 : 1, duration: .5, ease: 'sine.inOut' }, .15);
        timeline.to(layer.motion, { x: layer.config.scrollX * .96, y: layer.config.scrollY * .96, duration: .1, ease: 'sine.out' }, .65);
      });
      lines.forEach((line, i) => timeline.fromTo(line, { x: () => (i === 2 ? 1 : -1) * stage.clientWidth * [.45, .54, .35][i], opacity: 1 }, { x: 0, duration: .15, ease: 'power2.out' }, i * .01));
      timeline.to(lines, { y: -34, opacity: 0, stagger: .015, duration: .24, ease: 'sine.inOut' }, .34);
      timeline.to(kicker, { opacity: 0, duration: .2 }, .38);
      // Follow the heading with the same soft fade and vertical movement.
      timeline.fromTo(brand, {
        opacity: 0, y: 34
      }, {
        opacity: 1, y: 0,
        duration: .14, ease: 'sine.inOut'
      }, .62);
      timeline.to(brand, { opacity: 0, y: -34, duration: .1, ease: 'sine.inOut' }, .88);
      return () => {
        timeline = null;
        section.classList.remove('bloom-has-motion');
        document.body.classList.remove('bloom-in-view');
      };
    });

    stage.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !matchMedia('(hover: hover)').matches) return;
      const rect = stage.getBoundingClientRect();
      target.set(THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1), THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1));
    }, { passive: true, signal: abort.signal });
    stage.addEventListener('pointerleave', () => target.set(0, 0), { passive: true, signal: abort.signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); }, { signal: abort.signal });
    window.addEventListener('pagehide', event => { if (event.persisted) stop(); else dispose(); }, { signal: abort.signal });
    window.addEventListener('pageshow', () => { ScrollTrigger.refresh(); start(); }, { signal: abort.signal });
    renderer.domElement.addEventListener('webglcontextlost', () => { lost = true; stop(); section.classList.remove('bloom-webgl-ready'); section.dataset.bloomState = 'context-lost'; }, { signal: abort.signal });
    renderer.domElement.addEventListener('webglcontextrestored', () => { lost = false; section.classList.add('bloom-webgl-ready'); section.dataset.bloomState = 'ready'; render(performance.now(), true); start(); }, { signal: abort.signal });
    viewObserver = new IntersectionObserver(entries => { active = entries[0].isIntersecting; if (active) start(); else { stop(); target.set(0, 0); document.body.classList.remove('bloom-in-view'); } }, { rootMargin: '100px 0px' });
    viewObserver.observe(stage);
    resizeObserver = new ResizeObserver(() => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(resize); });
    resizeObserver.observe(stage);
    section.dataset.bloomState = 'ready';
    delete section.dataset.bloomReason;
    section.classList.add('bloom-webgl-ready');
    render(performance.now(), true);
    await document.fonts.ready;
    if (!disposed) ScrollTrigger.refresh();
    return { dispose };
  } catch (error) {
    dispose();
    throw error;
  }
}

function schedule() {
  preloadObserver?.disconnect();
  generation++;
  controller?.dispose();
  controller = null;
  if (reduced.matches || staticRequested) {
    staticView(reduced.matches ? 'reduced-motion' : 'manual');
    return;
  }
  if (location.hash === '#bloom') initialize();
  else {
    preloadObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { preloadObserver.disconnect(); initialize(); }
    }, { rootMargin: '1200px 0px' });
    preloadObserver.observe(section);
  }
}

if (section) {
  window.addEventListener('scroll', () => {
    if (!presenceFrame) presenceFrame = requestAnimationFrame(() => { presenceFrame = 0; updateScenePresence(); });
  }, { passive: true });
  window.addEventListener('resize', updateScenePresence, { passive: true });
  reduced.addEventListener('change', schedule);
  updateScenePresence();
  schedule();
}
