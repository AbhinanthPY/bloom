/* Wellcare Bloom. Buildless, framework-free HTML, CSS and JavaScript. */
'use strict';
const ASSET = 'assets/';
const CONTACT_EMAIL = 'wellcarephysiotherapy.in@gmail.com';
// Official WhatsApp number in international format, shared by both entry points.
const WHATSAPP_URL = 'https://wa.me/917510103160';
const whatsappIcon = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M27 15.5a11 11 0 0 1-16.3 9.65L5 27l1.85-5.7A11 11 0 1 1 27 15.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m11.2 9.8 2 3.3-1.3 1.55c1.1 2.15 2.55 3.6 4.7 4.7l1.55-1.3 3.3 2c-.25 1.65-1.35 2.4-2.75 2.15-5.25-.95-9.7-5.4-10.65-10.65-.25-1.4.5-2.5 2.15-2.75l1 1Z" fill="currentColor"/></svg>';
// Recipient confirmed by the owner. FormSubmit requires one-time mailbox activation before delivery.
const ENQUIRY_EMAIL_ENABLED = true;
const images = {
  hero:'hero-mother-baby.webp', depth:'30nszQvXKcEgIENheS0WavYlM2Y.jpg',
  front:'azpEwdss6XW8gQrcvhKGGrYqjg.webp', frontJpg:'Iygm9WFensHwXXoe01QWLQ0iF78.jpg',
  side:'AYmhm7fQptPoF2bCQsLfIJDi0U4.jpg', face:'AFEMnkblR75GU9bwfRpmzlqBpQ.jpg',
  reeds:'nJqFkXMmRiafaaCThCYlQSprSFk.jpg', hydration:'0WVX1KMgVFBEAviv4zQhKVw8rgk.jpg'
};
const escapeHtml = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image = (file,alt='',className='',lazy=true) => `<img src="${ASSET}${file}" alt="${escapeHtml(alt)}" class="${className}" loading="eager" decoding="async" fetchpriority="${lazy?'low':'high'}"${file===images.hero?' width="1086" height="1448"':file==='journey-pregnant-woman.webp'?' width="1122" height="1402"':''}>`;
const button = (text='Book a consultation',href='book-a-consultation.html',cls='') => `<a class="button ${cls}" href="${href}"><span>${text}</span></a>`;
const heading = (tag,title,description='') => `<div class="section-heading reveal">${tag?`<span class="eyebrow">${tag}</span>`:''}<h2>${title}</h2>${description?`<p>${description}</p>`:''}</div>`;
const services = [
 [
  "Postpartum<br>Recovery",
  "Personalised support after childbirth, shaped around your symptoms, goals and stage of recovery."
 ],
 [
  "Pelvic Floor<br>& Gut Health",
  "Private assessment and individual care for pelvic floor concerns, bowel function and everyday comfort."
 ],
 [
  "Bladder<br>Leakage",
  "Respectful support for bladder leakage and incontinence, with care planned around your daily needs."
 ],
 [
  "Pelvic Pain<br>Care",
  "A confidential space to discuss pelvic pain and work towards improved comfort and function."
 ],
 [
  "Intimate<br>Health",
  "Sensitive, respectful physiotherapy for intimate and sexual health concerns, guided by your comfort and goals."
 ],
 [
  "Core<br>Rehabilitation",
  "Individualised care for diastasis recti and core function as you rebuild confidence in movement."
 ],
 [
  "Birth &<br>C-Section Care",
  "Support for recovery after vaginal birth or a C-section, tailored to your needs and recovery stage."
 ],
 [
  "Return to<br>Fitness",
  "Progressive guidance for returning to exercise, building strength and moving with greater confidence."
 ]
];
const iconPaths = [
 '<circle cx="40" cy="20" r="9"/><path d="M40 65C21 62 13 50 13 34c18 0 27 12 27 31Zm0 0c0-22 11-21 22-37 12 21-1 37-22 37Z"/>',
 '<path d="M14 18c19-7 42-8 44 12 2 12-9 34 9 35M15 36c15-10 26-9 36-1M21 33c5 15 19 14 24 0"/>',
 '<circle cx="44" cy="18" r="9"/><path d="M33 64C16 58 12 44 15 24c21 8 25 20 18 40Zm0 0c0-21 17-12 27-26 4 21-7 29-27 26Z"/>',
 '<path d="M15 25c0-12 16-14 22-2 6-12 22-10 22 2 0 13-22 27-22 27S15 38 15 25Z"/><path d="m12 49 8 13h34l12-17M27 61V48m23 13V48"/>',
 '<path d="M40 66C23 52 23 36 40 16c18 19 18 36 0 50Zm0 0C21 63 12 51 13 33c17 1 26 15 27 33Zm0 0c19-3 28-15 27-33-17 1-26 15-27 33Z"/><path d="M40 66C21 74 8 62 6 55c15-8 26-1 34 11Zm0 0c19 8 32-4 34-11-15-8-26-1-34 11Z"/>',
 '<circle cx="29" cy="19" r="8"/><circle cx="50" cy="38" r="6"/><path d="M29 30c-13 7-18 24-9 35 9 10 30 5 39-9M29 33c2 12 11 21 24 22M43 46c-9 1-14 8-10 14 5 7 17 4 24-3M17 44c-2 11 4 17 14 18"/>',
 '<path d="M40 12 63 23v19c0 14-12 24-23 29-11-5-23-15-23-29V23Z"/><path d="M40 55c-13-1-18-11-16-20 10 1 16 8 16 20Zm0 0c13-1 18-11 16-20-10 1-16 8-16 20ZM40 55V29"/>',
 '<circle cx="42" cy="16" r="7"/><path d="m24 30 16 8 20-12M40 38l-3 17M37 55 23 69M37 55l19 13M14 46l5-5m43 8 5 5"/>'
];
const icon = n => `<svg class="service-icon" viewBox="0 0 80 80" aria-hidden="true">${iconPaths[n%iconPaths.length]}</svg>`;
const social = () => `<div class="socials"><a href="mailto:${CONTACT_EMAIL}" aria-label="Email Wellcare Bloom">@</a></div>`;
const proof = () => `<div class="client-proof"><h4 style="font-size:30px">Care that understands you.</h4><p style="margin-top:20px">Private, respectful consultations.</p><p style="margin-top:16px">Individual assessment and personal planning.</p><p style="margin-top:16px">Practical guidance for everyday life.</p></div>`;
const careCTA = () => `<section class="container care-cta reveal"><div class="cta-copy"><h3>Ready to begin<br>your care?</h3><p>Every step at Wellcare Bloom starts with listening. Together, we plan care around your comfort, function, recovery and everyday goals.</p>${button()}</div><div>${proof()}<p style="font-size:13px;margin-top:32px;text-align:center"><a href="mailto:${CONTACT_EMAIL}">Send us an email</a> — we’re happy to help you find a starting point.</p>${social()}</div></section>`;
const bloomExperience = () => `<section class="bloom-experience" id="bloom" aria-labelledby="bloom-title" data-bloom-state="static"><div class="bloom-stage"><div class="bloom-fallback" aria-hidden="true"></div><div class="bloom-motion-media" aria-hidden="true"><video class="bloom-video" muted playsinline preload="none" disablepictureinpicture disableremoteplayback tabindex="-1" poster="assets/bloom-garden-start.webp" data-desktop-src="assets/bloom-garden-scroll.mp4" data-mobile-src="assets/bloom-garden-scroll-mobile.mp4"></video><img class="bloom-final-frame" src="assets/bloom-garden-end.webp" alt="" width="1280" height="720" loading="eager" decoding="async" fetchpriority="low"></div><div class="bloom-atmosphere" aria-hidden="true"></div><div class="bloom-message"><p class="bloom-kicker"><span>You are</span></p><h2 id="bloom-title" aria-label="You are our first priority, as you bloom."><span class="bloom-title-line bloom-title-care" aria-hidden="true">our <span class="bloom-priority-word"><span class="bloom-flourish-letter"><i>f</i></span>irst</span> priority</span><span class="bloom-title-line bloom-title-blooms" aria-hidden="true">as you bloom.</span></h2></div><div class="bloom-brand" aria-hidden="true"><img src="assets/wellcare-bloom-white.webp" alt="" width="1880" height="837" loading="eager" decoding="async" fetchpriority="low"></div></div></section>`;
// Editable content for the standalone mouse-parallax section.
const glassBloomContent = {
 eyebrow: 'POSTPARTUM CARE',
 heading: 'When to Start',
 description: 'The right time depends on your birth, healing and symptoms. Your first step can be a conversation.',
 points: [
  {title: 'Early in recovery', text: 'Gentle movement can begin when comfortable, with advice suited to your birth.'},
  {title: 'Before higher-impact exercise', text: 'Review your readiness before running, jumping or heavier workouts.'},
  {title: 'If symptoms affect you', text: 'Ask about leakage, pelvic heaviness or persistent discomfort.'}
 ],
 cta: 'Book a consultation',
 href: 'book-a-consultation.html?service=0'
};
const glassBloomSection = () => {
 // Supplied full-scene artwork: keep the existing card and entrance above it.
 return `<section class="wb-glass-scene" id="gentle-bloom" aria-labelledby="gentle-bloom-title" data-glass-scene><div class="wb-glass-stage"><div class="wb-glass-artboard" aria-hidden="true"><img class="wb-glass-layer wb-glass-layer-0" src="assets/bloom-glass/cherry-blossom-background.png" alt="" width="1672" height="941" loading="eager" decoding="async" fetchpriority="low" draggable="false"></div><div class="wb-glass-card"><div class="wb-glass-surface" aria-hidden="true"></div><div class="wb-glass-content"><p class="wb-glass-eyebrow">${glassBloomContent.eyebrow}</p><h2 id="gentle-bloom-title">${glassBloomContent.heading}</h2><p class="wb-glass-description">${glassBloomContent.description}</p><ul class="wb-glass-points">${glassBloomContent.points.map(point=>`<li><div><strong>${point.title}</strong><p>${point.text}</p></div></li>`).join('')}</ul><a class="wb-glass-cta" href="${glassBloomContent.href}"><span>${glassBloomContent.cta}</span><span class="wb-glass-arrow" aria-hidden="true">↗</span></a></div></div></div></section>`;
};
const priceData = [
 [
  "Postpartum<br>Recovery",
  "01",
  "Personalised care after childbirth, from your first assessment to a plan that evolves with your recovery.",
  0
 ],
 [
  "Pelvic<br>Health",
  "02",
  "Private support for pelvic floor concerns, bladder leakage, pelvic pain and intimate well-being.",
  1
 ],
 [
  "Core &<br>Movement",
  "03",
  "Care for diastasis recti, core function and movement, shaped around what matters in your daily life.",
  5
 ],
 [
  "Return to<br>Activity",
  "04",
  "Progressive support as you work towards exercise, strength and a more confident return to everyday activity.",
  7
 ]
];
const pricing = () => `<section class="section wide" id="pricing">${heading('Personalised Care','Your care, your pace.','Start with an individual assessment. Together, we agree on a plan that respects your symptoms, goals and recovery stage.')}<div class="pricing-grid">${priceData.map(p=>`<a class="price-card reveal" href="services.html#service-${p[3]}"><h4>${p[0]}</h4><div class="price"><small>Care focus</small>${p[1]}</div><p>${p[2]}</p></a>`).join('')}</div><div class="section-end reveal"><p>You deserve to feel supported as you work towards better pelvic health and recovery.</p>${button('Book a consultation')}</div></section>`;
const articles = [
 {
  "title": "New Mom Neck Pain?",
  "description": "Feeding, holding and carrying a newborn can keep your neck and shoulders in one position for long stretches. Small comfort adjustments may help.",
  "category": "Postpartum Care",
  "image": "journal-neck-pain-cover-1672.webp",
  "imageStem": "journal-neck-pain-cover",
  "imageWidth": 1672,
  "imageHeight": 941,
  "url": "article-guidance.html",
  "sources": [{"label":"NHS: Neck pain","url":"https://www.nhs.uk/symptoms/neck-pain-and-stiff-neck/"},{"label":"NHS: Breastfeeding positions and attachment","url":"https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/positioning-and-attachment/"},{"label":"NHS: Breastfeeding positions","url":"https://www.nhs.uk/best-start-in-life/baby/feeding-your-baby/breastfeeding/how-to-breastfeed/breastfeeding-positions/"}],
  "body": [
   ["h2","Why can my neck feel tired?"],
   ["p","New routines can mean many minutes spent looking down, reaching or holding your baby. If your head, shoulders and arms stay unsupported or in one position, your neck and upper back may feel uncomfortable. This experience is personal, and neck pain can have many causes."],
   ["h2","Make feeding and holding more comfortable."],
   ["p","Settle yourself before a feed. Support your back and arms with cushions, let your shoulders relax, and bring your baby close instead of leaning forward. Try different comfortable positions and change posture when you can. Choose support that keeps your baby’s face clear and breathing unobstructed."],
   ["h2","When should I ask for help?"],
   ["p","If pain is persistent, worsening, affects daily activities or worries you, speak with a qualified health professional. Seek prompt medical advice for neck pain with symptoms such as pins and needles or a cold arm. A physiotherapist can discuss your movement, daily demands and suitable next steps."],
   ["p","This article is general information, not a diagnosis or an individual treatment plan. Feeding positions should keep your baby safe and follow advice from your maternity or infant-feeding care team."]
  ]
 },
 {
  "title": "5 Postpartum Problems Mothers Often Ignore",
  "description": "Leaking, pelvic discomfort, core changes and other symptoms deserve a conversation. You do not have to wait until they disrupt daily life to ask for support.",
  "category": "Postpartum Care",
  "image": "journal-postpartum-cover-20261026-960.webp",
  "imageStem": "journal-postpartum-cover-20261026",
  "imageWidth": 960,
  "imageHeight": 1280,
  "url": "article-hydration.html",
  "sources": [{"label":"RCOG: Recovery after a perineal tear","url":"https://www.rcog.org.uk/for-the-public/perineal-tears-and-episiotomies-in-childbirth/third-and-fourth-degree-tears-oasi/"},{"label":"NHS: Your post-pregnancy body","url":"https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/"},{"label":"RCOG: Pelvic floor health","url":"https://www.rcog.org.uk/about-us/campaigning-and-opinions/position-statements/pelvic-floor-health-position-statement/"},{"label":"NICE: Pelvic floor dysfunction recommendations","url":"https://www.nice.org.uk/guidance/ng210/chapter/Recommendations"}],
  "body": [
   ["h2","Symptoms worth bringing up"],
   ["p","Pregnancy, birth and caring for a newborn can bring physical changes. They differ from person to person, and symptoms are not something you have to dismiss as simply part of being a new mother. A clinician can help you understand what may be contributing and what support is appropriate."],
   ["h2","1. Bladder or bowel leakage"],
   ["p","Leaking urine or difficulty controlling bowel movements can affect confidence and daily routines. Mention it to your doctor or physiotherapist, especially if it continues or concerns you."],
   ["h2","2. Pelvic heaviness, pressure or pain"],
   ["p","A heavy or uncomfortable feeling around the pelvis, pain, or symptoms that affect intimacy deserve a respectful assessment. Pelvic floor concerns can present in different ways."],
   ["h2","3. Abdominal separation or a change in core function"],
   ["p","Changes in the abdominal wall and core can affect how movement feels. If you notice a persistent gap, discomfort or difficulty with everyday tasks, ask a health professional for advice."],
   ["h2","4. C-section, perineal or scar discomfort"],
   ["p","If a healing wound or scar is painful, swollen, has an unusual smell, or you have a fever, contact your maternity or medical team promptly. For ongoing discomfort after healing, ask what assessment and support are suitable."],
   ["h2","5. Neck, back or movement discomfort"],
   ["p","Feeding, lifting and carrying can add new demands to your day. Persistent pain or difficulty returning to comfortable daily movement can be discussed with a clinician."],
   ["h2","We will provide support"],
   ["p","Start by describing what you notice and how it affects your day. Care can begin with listening and an assessment; any next steps should be explained and agreed with you. This article is general information and does not replace medical advice or an individual assessment."]
  ]
 }
];
const journalPoster = (a,lazy=true) => {
 const stem=a.imageStem||a.image.replace(/\.webp$/,'');
 // Use the supplied poster at its native size; never upscale the source.
 const fullWidth=a.imageWidth||1086;
 const widths=[648,1086,fullWidth].filter((width,index,list)=>width<=fullWidth&&list.indexOf(width)===index);
 const fallbackWidth=lazy?widths[0]:Math.min(1086,fullWidth);
 const sources=type=>widths.map(width=>`${ASSET}${stem}-${width}.${type} ${width}w`).join(', ');
 const sizes=lazy?'(max-width:520px) calc(100vw - 56px), (max-width:809px) 320px, 500px':'(max-width:1120px) calc(100vw - 48px), 1072px';
 return `<picture class="journal-poster"><source type="image/avif" srcset="${sources('avif')}" sizes="${sizes}"><img src="${ASSET}${stem}-${fallbackWidth}.webp" srcset="${sources('webp')}" sizes="${sizes}" alt="${escapeHtml(a.title)}" width="${a.imageWidth||1086}" height="${a.imageHeight||1448}" loading="eager" decoding="async" fetchpriority="${lazy?'low':'high'}"></picture>`;
};
const articleCard = a => `<a class="article-card reveal${a.imageWidth>a.imageHeight?' article-card-landscape':''}" href="${a.url}" data-category="${a.category}"><div class="article-copy"><h3>${a.title}</h3><p>${a.description}</p></div><div class="article-image">${journalPoster(a)}</div></a>`;
const journalSection = () => `<section class="section container journal-feature" id="home-journal">${heading('Our Journal','Notes for your next chapter.','Thoughtful reading on pelvic health, postpartum recovery and finding your way back to everyday life.')}<div class="journal-grid">${articles.map(articleCard).join('')}</div><div class="section-end reveal"><p>Explore our Journal for thoughtful insights on women’s health, recovery and everyday confidence.</p>${button('Browse insights','journal.html')}</div></section>`;
function home(){
 return `<section class="hero" id="hero"><div class="hero-bg" aria-hidden="true"></div><div class="hero-petals" aria-hidden="true"><span class="hero-petal hero-petal-1"><img src="assets/bloom-petal.svg" alt="" decoding="async"></span><span class="hero-petal hero-petal-2"><img src="assets/bloom-petal.svg" alt="" decoding="async"></span><span class="hero-petal hero-petal-3"><img src="assets/bloom-petal.svg" alt="" decoding="async"></span><span class="hero-petal hero-petal-4"><img src="assets/bloom-petal.svg" alt="" decoding="async"></span></div><div class="hero-portrait">${image(images.hero,'A mother holding her sleeping baby','',false)}<canvas id="portrait-depth" aria-hidden="true"></canvas></div><div class="hero-copy"><h1 aria-label="Heal. Rebuild. Bloom."><span class="hero-line">Heal. Rebuild.</span> <span class="hero-line">Bloom.</span></h1><p>Women’s health physiotherapy for pelvic care, postpartum recovery and everyday confidence.</p><div class="hero-actions">${button('Book a consultation')}${button('Explore our services','#our-services','light')}</div></div></section>
 <section class="manifesto"><div class="manifesto-inner container"><blockquote>"You deserve care that understands you. Pelvic floor concerns, bladder leakage, pelvic pain and changes after childbirth can be difficult to talk about. At Wellcare Bloom, you do not have to navigate them alone. We listen, assess your needs and plan care around your comfort, recovery and everyday goals."</blockquote><cite>Wellcare Bloom — Women’s Health Physiotherapy</cite></div></section>
 <section class="services-scroll" id="our-services" aria-label="Our Services"><div class="services-intro">${heading('Our Specialities','Care to help you bloom.','Pelvic health and postpartum physiotherapy, personalised to your symptoms, goals and recovery stage.')}</div><div class="services-runway" style="--service-count:${services.length}"><div class="services-sticky"><div class="service-track">${services.map((s,i)=>`<div class="service-slot"><a href="services.html#service-${[0,8,2,3,4,5,6,7][i]}" class="service-card"><span class="service-glass-rim" aria-hidden="true"></span>${i===3?'<svg class="service-icon" viewBox="0 0 80 80" aria-hidden="true"><path d="M47 69C19 73 5 47 16 25S53 9 62 27c10 21-4 38-20 34-14-3-18-18-10-27 8-8 21-2 18 8-2 7-11 7-12 0"/></svg>':icon(i)}<h3>${s[0]}</h3><p>${s[1]}</p><small>Click to learn more</small></a></div>`).join('')}</div><div class="mobile-dots">${services.map((_,i)=>`<button aria-label="Scroll to service ${i+1}" aria-pressed="${i===0}" class="${i===0?'active':''}" data-slide="${i}"></button>`).join('')}</div></div></div></section>
 <section class="section journey container">${heading('','Your Bloom Journey.','From listening and assessment to rehabilitation and review, every step is shaped around you.')}<div class="journey-layout"><div class="reveal">${image('journey-pregnant-woman.webp','Pregnant woman standing in side profile','journey-face')}</div><div class="journey-steps">${[['Listen & Assess.','We listen to your concerns and assess movement, posture, breathing, core and pelvic floor function where appropriate.'],['Plan & Rebuild.','Together, we agree on a personal plan and work progressively on mobility, strength, coordination or relaxation to suit your needs.'],['Review & Progress.','We review your progress, adapt your plan and offer practical guidance for daily life, recovery and returning to activity.']].map((s,i)=>`<div class="journey-step reveal"><span class="step-number">0${i+1}</span><div><h4>${s[0]}</h4><p>${s[1]}</p></div></div>`).join('')}</div></div></section>
 ${bloomExperience()}
 <section class="section wide" id="our-approach">${heading('Why Wellcare Bloom?','Care that understands you.','Dedicated women’s health physiotherapy, with private consultations, personal plans and practical support for everyday life.')}<div class="approach-grid">${[['Listening first','Start with a confidential conversation. We take time to understand your concerns, history and goals in a private, respectful space.','approach-listening-background.webp'],['Focused<br>care','Our focus is women’s health and pelvic rehabilitation, with individual assessment and care guided by your needs.','approach-physiotherapy.webp'],['Your pace,<br>your plan','Rehabilitation reflects your symptoms, goals and recovery stage. We work with you towards better comfort, function and confidence.','approach-mother-baby.webp'],['Progress<br>together','Clear communication, regular review and practical guidance help connect your care with everyday life. Your plan adapts as your needs change.','approach-longterm-background.webp']].map((c,i)=>`<div class="approach-card reveal approach-${['listening','careful','results','longterm'][i]}"><h4>${c[0]}</h4><p>${c[1]}</p>${image(c[2],i===1?'Mother practising gentle breathing during postpartum physiotherapy':i===2?'Mother holding her sleeping newborn':'')}</div>`).join('')}</div></section>
 ${glassBloomSection()}
 ${pricing()}
 ${journalSection()}`;
}
const intro=(title,desc)=>`<section class="page-intro reveal"><h1>${title}</h1><p>${desc}</p></section>`;
const careKicker = text => `<span class="care-kicker"><span aria-hidden="true"></span>${text}</span>`;
const carePortrait = (file,alt,eager=false) => `<img src="${ASSET}${file}" alt="${escapeHtml(alt)}" width="1086" height="1448" loading="eager" decoding="async" fetchpriority="${eager?'high':'low'}">`;
const careInvitation = () => `<section class="care-invitation care-width reveal" aria-labelledby="care-invitation-title"><div>${careKicker('Your next chapter')}<h2 id="care-invitation-title">Let’s begin with<br>a <em>conversation.</em></h2></div><div class="care-invitation-copy"><p>You don’t have to have all the answers. Tell us what you’re experiencing, and we’ll help you find a starting point.</p>${button('Book a consultation','book-a-consultation.html')}<a class="care-text-link" href="tel:+919207798777">Or call +91 92077 98777 <span aria-hidden="true">↗</span></a></div></section>`;
function about(){
 const principles=[
  ['Listening first.','We take time to understand your concerns, history and what matters in your everyday life.'],
  ['Clarity before care.','We explain our findings and suitable options in clear language, so you can take part in decisions.'],
  ['Your consent, always.','Any examination or hands-on care is explained beforehand and requires your informed consent.'],
  ['Progress, together.','Your plan reflects your goals. We review it with you and coordinate with other clinicians when needed.']
 ];
 const steps=[['Listen','Your concerns, history and goals.'],['Assess','Relevant movement and function.'],['Plan','Options explained and agreed together.'],['Rehabilitate','Work towards your everyday goals.'],['Review','Reflect, adapt and move forward.']];
 return `<div class="care-page care-page-about"><section class="care-hero care-hero-about"><div class="care-width care-hero-layout"><div class="care-hero-copy reveal">${careKicker('About Wellcare Bloom')}<h1>Care that<br>sees <em>you.</em></h1><p>For the personal concerns. The everyday changes. The next chapter. Women’s health physiotherapy that begins with understanding you.</p><div class="care-hero-actions">${button('Our approach','#bloom-philosophy')}<a class="care-text-link" href="services.html">Explore our care <span aria-hidden="true">↗</span></a></div><span class="care-hero-footnote">PELVIC HEALTH · POSTPARTUM RECOVERY</span></div><div class="care-hero-visual reveal"><div class="care-portrait care-portrait-about">${carePortrait('approach-mother-baby.webp','A mother resting with her sleeping baby',true)}</div><div class="care-photo-note"><span class="care-note-dot" aria-hidden="true"></span><p>Your comfort.<br>Your consent.<br><strong>Your own pace.</strong></p></div><span class="care-orbit" aria-hidden="true"></span></div></div></section><div class="care-width care-assurance-strip"><span>Women’s health. Thoughtfully cared for.</span><span>Wellcare Physiotherapy &amp; Sports Rehabilitation</span><a href="contact.html">Thiruvananthapuram <span aria-hidden="true">↗</span></a></div><section class="care-width care-story care-section"><div class="reveal">${careKicker('01 / Our story')}<h2>Your story.<br>Your starting <em>point.</em></h2></div><div class="care-story-copy reveal"><p class="care-lead">Pelvic health is personal.<br>Your care should feel personal, too.</p><p>Wellcare Bloom is a women’s health physiotherapy initiative associated with Wellcare Physiotherapy &amp; Sports Rehabilitation. We focus on pelvic health, postpartum recovery and the functional concerns that can affect comfort, confidence and daily activities.</p><p>We recognise that symptoms can be difficult to discuss. Our approach is respectful and confidential, with space to ask questions, understand your options and take part in decisions about your rehabilitation.</p></div></section><section class="care-width care-philosophy care-section" id="bloom-philosophy"><div class="care-section-top reveal"><div>${careKicker('02 / Our philosophy')}<h2>A plan for your body.<br>A partnership with <em>you.</em></h2></div><p>Good care starts with trust. Here is what guides every step at Wellcare Bloom.</p></div><div class="care-philosophy-layout"><div class="care-belief-visual reveal">${carePortrait('approach-physiotherapy.webp','A woman seated comfortably with her hands resting on her abdomen')}<div class="care-belief-caption"><span>SPACE TO BE HEARD</span><p>You can ask.<br>You can pause.<br>You can choose.</p></div></div><div class="care-belief-list">${principles.map(([title,copy],i)=>`<article class="care-belief reveal"><span class="care-small-number">0${i+1}</span><div><h3>${title}</h3><p>${copy}</p></div></article>`).join('')}</div></div></section><section class="care-path care-section"><div class="care-width"><div class="care-path-heading reveal">${careKicker('03 / Your Bloom Journey')}<h2>At your pace.<br>Every <em>step.</em></h2><p>From the first conversation to reviewing your progress, care is shaped around your symptoms, recovery stage and goals.</p></div><ol class="care-path-steps">${steps.map(([title,copy],i)=>`<li class="reveal"><span class="care-path-number">0${i+1}</span><h3>${title}</h3><p>${copy}</p></li>`).join('')}</ol></div></section>${careInvitation()}</div>`;
}
const serviceDetails = [
 {title:'Postpartum recovery', lead:'Your recovery matters. Support after childbirth is shaped around your symptoms, healing and everyday goals.', concerns:['Bladder leakage, pelvic floor changes or perineal discomfort','Abdominal separation or reduced core control','Neck, back, hip or pelvic discomfort while caring for your baby'], support:['Relevant pelvic floor and deep-core rehabilitation','Breathing, posture and practical lifting guidance','Progressive movement and return-to-exercise planning'], question:'When can I begin?', answer:'Timing depends on your delivery, healing, symptoms and medical advice. Education may be appropriate early; assessment and exercise progression are individual.'},
 {title:'Pelvic floor physiotherapy', lead:'Understand your pelvic floor and find care that fits. Symptoms can involve weakness, excessive tension, reduced coordination or a combination of factors.', concerns:['Leakage, urgency or difficulty emptying','Pelvic heaviness, pain or difficulty relaxing','Changes in pelvic floor function after birth'], support:['Assessment of symptoms and relevant muscle function','Strengthening, relaxation or coordination as indicated','Breathing, home exercise guidance and shared care when needed'], question:'Is it just Kegel exercises?', answer:'No. Some people need strengthening; others need relaxation, coordination or another approach. An assessment helps guide suitable care.'},
 {title:'Bladder leakage and incontinence', lead:'Bladder leakage can happen with coughing, laughing, lifting or exercise. Sudden urgency and frequent trips to the washroom also deserve support.', concerns:['Leakage with movement or impact activity','Urgency or mixed bladder symptoms','Pregnancy-related or postpartum changes'], support:['An assessment of symptoms and relevant pelvic floor function','Individual muscle training and pressure-management strategies','Guidance on bladder habits and activity'], question:'Can physiotherapy help?', answer:'It may improve symptoms for many people, depending on the cause. Results vary, and some symptoms need further medical assessment.'},
 {title:'Pelvic pain rehabilitation', lead:'Your concerns deserve to be heard. Pelvic pain can affect sitting, walking, sleep, exercise and everyday comfort.', concerns:['Pelvic or perineal discomfort','Tailbone pain or discomfort when sitting','Pelvic muscle tension or pain during movement'], support:['Assessment of symptoms, movement and contributing factors','Education, activity adjustments, breathing and relaxation','Progressive mobility or strengthening, with referral when needed']},
 {title:'Intimate and sexual health', lead:'Private, respectful care for concerns that can be difficult to discuss. Your comfort and consent guide the consultation.', concerns:['Pain or discomfort during intimacy','Pelvic floor tension or involuntary tightening','Postpartum discomfort or scar sensitivity'], support:['A confidential discussion of symptoms and goals','Explanation and consent before any proposed examination','Suitable relaxation or coordination work and medical collaboration when needed'], question:'What happens at the first visit?', answer:'We begin with a conversation about your symptoms, history and goals. Any proposed physical examination is explained first and requires your informed consent.'},
 {title:'Diastasis recti and core rehabilitation', lead:'Rebuild functional strength and confidence. Care focuses on abdominal wall function and movement, alongside any separation between the abdominal muscles.', concerns:['Abdominal doming or reduced core control','Difficulty lifting or managing daily activities','Challenges progressing back to exercise'], support:['Assessment of abdominal wall function and movement','Breathing and pressure-management education','Progressive core and functional strengthening towards your goals']},
 {title:'C-section and birth recovery', lead:'Recovery after a C-section, vaginal birth, episiotomy or perineal tear is personal. Care is guided by healing, comfort and your recovery stage.', concerns:['Scar sensitivity or restricted mobility after healing','Abdominal weakness or pelvic floor symptoms','Discomfort with feeding, carrying or daily activity'], support:['Gentle mobility and breathing guidance','Scar-related care only when healed, appropriate and consented to','Core, pelvic floor and everyday movement rehabilitation as indicated']},
 {title:'Return to exercise and fitness', lead:'From recovery to active living. Work towards running, gym training or sport with a plan that reflects your symptoms and goals.', concerns:['Leakage or discomfort during workouts','Core weakness or abdominal doming','Reduced confidence with lifting, running or sport'], support:['Relevant movement and functional strength assessment','Progressive strength, coordination and impact work','Exercise modification and load management'], question:'When can I return to running?', answer:'There is no single timeline for everyone. Readiness depends on healing, symptoms, strength and activity demands. An appropriate assessment can help guide progression.'},
 {title:'Pelvic floor and gut health', lead:'Support for selected pelvic floor and bowel-function concerns, alongside medical care where required.', concerns:['Straining or difficulty emptying the bowel','A feeling of incomplete emptying','Pelvic tension or coordination difficulties with bowel symptoms'], support:['A review of symptoms, habits and relevant movement','Breathing, pelvic floor coordination and positioning guidance','Coordination with a gastroenterologist or other clinician when indicated'], question:'Can physiotherapy treat IBS or gut diseases?', answer:'Physiotherapy does not cure underlying gastrointestinal diseases. It may support selected functional symptoms and should complement appropriate medical care.'}
];
const serviceGroups = ['recovery','pelvic','pelvic','pelvic','pelvic','recovery movement','recovery','recovery movement','pelvic'];
const serviceTopics = ['After pregnancy & birth','Strength, relaxation & coordination','Bladder habits & everyday confidence','Comfort, movement & function','Sensitive, respectful support','Abdominal wall & functional strength','Healing, mobility & daily activity','Strength, confidence & active living','Bowel function & pelvic coordination'];
function servicePage(){
 return `<div class="care-page care-page-services"><section class="care-hero care-hero-services"><div class="care-width care-hero-layout"><div class="care-hero-copy reveal">${careKicker('Women’s health services')}<h1>Care for<br>every <em>chapter.</em></h1><p>Pelvic health, postpartum recovery and everyday movement. Personalised physiotherapy, shaped around your body and your goals.</p><div class="care-hero-actions">${button('Find your care','#care-services')}<a class="care-text-link" href="book-a-consultation.html">Let’s talk <span aria-hidden="true">↗</span></a></div><span class="care-hero-footnote">INDIVIDUAL ASSESSMENT. INFORMED CHOICES.</span></div><div class="care-hero-visual reveal"><div class="care-portrait care-portrait-services">${carePortrait('approach-physiotherapy.webp','A woman seated quietly with her hands resting on her abdomen',true)}</div><div class="care-photo-note"><span class="care-note-dot" aria-hidden="true"></span><p>No single path.<br>No fixed pace.<br><strong>Care that fits you.</strong></p></div><span class="care-orbit" aria-hidden="true"></span></div></div></section><div class="care-width care-assurance-strip"><span>Private &amp; respectful</span><span>Individually planned</span><span>Progress at your pace</span></div><section class="care-width care-section care-explorer" id="care-services" data-care-explorer><div class="care-section-top reveal"><div>${careKicker('Explore our care')}<h2>Find your<br>starting <em>point.</em></h2></div><p>You don’t need to know which service to choose. Explore a concern below, or <a href="book-a-consultation.html">start with a conversation ↗</a>.</p></div><div class="care-filter-bar"><div class="care-filters" role="group" aria-label="Filter services">${[['all','All care'],['recovery','After birth'],['pelvic','Pelvic health'],['movement','Movement']].map(([value,label],i)=>`<button type="button" class="care-filter${i===0?' is-active':''}" data-care-filter="${value}" aria-pressed="${i===0}">${label}</button>`).join('')}</div><p class="care-result-count" aria-live="polite">9 care areas</p></div><div class="care-service-list">${serviceDetails.map((s,i)=>`<details class="care-service reveal" id="service-${i}" data-care-groups="${serviceGroups[i]}"${i===0?' open':''}><summary class="care-service-summary"><span class="care-small-number">${String(i+1).padStart(2,'0')}</span><span class="care-service-emblem" aria-hidden="true">${icon(i)}</span><div class="care-service-label"><h3>${s.title}</h3><span>${serviceTopics[i]}</span></div><span class="care-service-plus" aria-hidden="true">+</span></summary><div class="care-service-body"><p class="care-service-lead">${s.lead}</p><div class="care-service-columns"><div><h4>What you may be experiencing</h4><ul>${s.concerns.map(t=>`<li>${t}</li>`).join('')}</ul></div><div><h4>How we can support you</h4><ul>${s.support.map(t=>`<li>${t}</li>`).join('')}</ul></div></div>${s.question?`<aside class="care-service-answer"><h4>${s.question}</h4><p>${s.answer}</p></aside>`:''}<div class="care-service-end"><p>Assessment comes first. Any examination or hands-on care is explained and carried out only with your informed consent.</p>${button('Ask about this care',`book-a-consultation.html?service=${i}`)}</div></div></details>`).join('')}</div><div class="care-explorer-note reveal"><span aria-hidden="true">✳</span><p><strong>Your experience is individual.</strong> Care options depend on your assessment, comfort, goals and recovery stage. We explain the options and agree on next steps with you.</p></div></section><section class="care-width care-service-interlude care-section reveal"><div class="care-interlude-image">${carePortrait('approach-mother-baby.webp','A mother holding her sleeping baby')}</div><div class="care-interlude-copy">${careKicker('More than a care plan')}<h2>For the life<br>you live <em>every day.</em></h2><p>Feeding, carrying, moving, exercising. We connect rehabilitation with the things that matter in your daily life, reviewing and adapting your plan together.</p><a class="care-text-link" href="about.html">Get to know our approach <span aria-hidden="true">↗</span></a></div></section>${careInvitation()}</div>`;
}
// Shared consultation/contact components and the email review step.
const enquiryArrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const enquirySymbol = type => {
 const paths={phone:'M8 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 2a13 13 0 0 1-6-6l2-2-2-5Z',mail:'M3 5h18v14H3V5Zm0 1 9 7 9-7',pin:'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'};
 return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="${paths[type]}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
};
function enquiryForm(selected=null,isContact=false){
 const kind=isContact?'contact':'consultation';
 return `<section class="enquiry-form-panel enquiry-glass" aria-labelledby="${kind}-form-title">
  <div class="enquiry-form-top"><span>Your next chapter</span><span class="enquiry-route-badge">${ENQUIRY_EMAIL_ENABLED?'Email the team':'Call to enquire'}</span></div>
  <h2 id="${kind}-form-title">${isContact?'Start a conversation.':'Book a consultation.'}</h2>
  <p class="enquiry-form-intro">A few details, at your pace. Name and phone number are required.</p>
  <form id="${kind}-form" data-enquiry-form="${kind}" data-recipient="${CONTACT_EMAIL}" data-delivery-enabled="${ENQUIRY_EMAIL_ENABLED}" action="https://formsubmit.co/${CONTACT_EMAIL}" method="POST" novalidate onsubmit="return false">
   <input class="enquiry-honeypot" name="_honey" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
   <div class="enquiry-fields">
    <label class="enquiry-field"><span>Full name <b aria-hidden="true">*</b></span><input name="name" type="text" autocomplete="name" placeholder="Your full name" maxlength="100" required data-enquiry-label="Full name"></label>
    <label class="enquiry-field"><span>Phone number <b aria-hidden="true">*</b></span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Your contact number" maxlength="30" required data-enquiry-label="Phone number"></label>
    <label class="enquiry-field"><span>Email <small>(optional)</small></span><input name="email" type="email" autocomplete="email" placeholder="you@example.com" maxlength="180" data-enquiry-label="Email"></label>
    <label class="enquiry-field"><span>Care interest <small>(optional)</small></span><select name="service" data-enquiry-label="Care interest"><option value="">Help me choose</option>${serviceDetails.map(s=>`<option value="${escapeHtml(s.title)}"${selected===s?' selected':''}>${escapeHtml(s.title)}</option>`).join('')}</select></label>
    ${isContact?'':`<label class="enquiry-field"><span>Preferred date <small>(optional)</small></span><input name="date" type="date" data-enquiry-label="Preferred date"></label>
    <label class="enquiry-field"><span>Preferred time <small>(optional)</small></span><select name="time" data-enquiry-label="Preferred time"><option value="">No preference</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>`}
   </div>
   <label class="enquiry-field enquiry-message"><span>${isContact?'Your message':'What would you like help with?'} <small>(optional)</small></span><textarea name="message" rows="3" maxlength="800" placeholder="A little about what you need support with…" aria-describedby="${kind}-message-hint" data-enquiry-label="Your message"></textarea></label>
   <p id="${kind}-message-hint" class="enquiry-field-hint">A short note is enough. You can discuss the details with the team.</p>
   <div class="enquiry-form-footer"><button class="enquiry-submit" type="submit"><span>Review details</span><span class="enquiry-button-arrow">${enquiryArrow}</span></button><p>${ENQUIRY_EMAIL_ENABLED?`Review, then send your enquiry to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. <a href="privacy-policy.html">Privacy</a>`:`Online sending is not available yet. <a href="tel:+919207798777">Please call the clinic.</a>`}</p></div>
  </form>
  <dialog class="enquiry-review" id="${kind}-review" aria-labelledby="${kind}-review-title" aria-describedby="${kind}-review-note">
   <div class="enquiry-review-inner"><button type="button" class="enquiry-review-close" data-close-preview aria-label="Close review">×</button><span class="enquiry-kicker">A moment to review</span><h2 id="${kind}-review-title" tabindex="-1">Your ${isContact?'enquiry':'consultation details'}.</h2><p id="${kind}-review-note">${ENQUIRY_EMAIL_ENABLED?`Review your details before emailing ${CONTACT_EMAIL}. The clinic will confirm appointment availability with you.`:'You can review your details here. Online sending will be available once email enquiries are activated.'}</p><dl class="enquiry-review-list"></dl><p class="enquiry-delivery-status" role="status" aria-live="polite" aria-atomic="true"></p><button type="button" class="enquiry-submit" data-send-enquiry${ENQUIRY_EMAIL_ENABLED?'':' hidden'}>Send ${isContact?'enquiry':'consultation request'} ${enquiryArrow}</button><button type="button" class="enquiry-review-edit" data-close-preview>Back to your details</button></div>
  </dialog>
 </section>`;
}
function enquiryClinic(){
 return `<aside class="enquiry-clinic enquiry-glass" aria-labelledby="enquiry-clinic-title"><span class="enquiry-kicker">A real conversation</span><h2 id="enquiry-clinic-title">Here for you,<br>at your pace.</h2><p>Reach the team directly, or leave a little about what you’re looking for in the form.</p><div class="enquiry-clinic-links">
  <a href="tel:+919207798777"><span class="enquiry-contact-icon">${enquirySymbol('phone')}</span><span><small>Speak with the team</small><strong>+91 92077 98777</strong></span><span aria-hidden="true">↗</span></a>
  <a href="tel:+914712551825"><span class="enquiry-contact-icon">${enquirySymbol('phone')}</span><span><small>Call the clinic</small><strong>+91 471 2551825</strong></span><span aria-hidden="true">↗</span></a>
  <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Wellcare Bloom on WhatsApp at +91 75101 03160"><span class="enquiry-contact-icon enquiry-whatsapp-icon">${whatsappIcon}</span><span><small>Official WhatsApp</small><strong>+91 75101 03160</strong></span><span aria-hidden="true">↗</span></a>
  <a href="mailto:${CONTACT_EMAIL}"><span class="enquiry-contact-icon">${enquirySymbol('mail')}</span><span><small>Write to us</small><strong class="enquiry-email">${CONTACT_EMAIL}</strong></span><span aria-hidden="true">↗</span></a>
 </div><div class="enquiry-address"><span class="enquiry-contact-icon">${enquirySymbol('pin')}</span><div><h3>Visit the clinic</h3><strong>Wellcare Physiotherapy &amp;<br>Sports Rehabilitation</strong><address>Medical College Murinjapalam Road, Murinjapalam<br>Thiruvananthapuram, Kerala 695011</address><a href="https://www.google.com/maps?cid=2350634483304533301" target="_blank" rel="noopener noreferrer">Find us on Google Maps <span aria-hidden="true">↗</span></a></div></div><p class="enquiry-clinic-footnote">Ask for Wellcare Bloom women’s health physiotherapy.</p></aside>`;
}
const enquiryNextSteps = () => `<section class="enquiry-width enquiry-next" aria-labelledby="enquiry-next-title"><div class="enquiry-next-heading"><span class="enquiry-kicker">Your first visit</span><h2 id="enquiry-next-title">A little clarity<br>before you begin.</h2><p>We listen, explain the options, and agree on the next step together.</p></div><div class="enquiry-next-cards">${[['We listen.','Space to talk about your concerns, your recovery and what matters to you.'],['We understand.','Any recommended assessment is explained and guided by your comfort and consent.'],['We plan together.','A personal starting point, shaped around your needs and your pace.']].map(([title,copy],i)=>`<article class="enquiry-glass"><span>0${i+1}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></section>`;
function consultation(isContact=false){
 const params=new URLSearchParams(location.search),requested=Number(params.get('service'));
 const selected=params.has('service')&&Number.isInteger(requested)?serviceDetails[requested]:null;
 if(isContact)return `<div class="enquiry-page enquiry-contact-page"><header class="enquiry-width enquiry-contact-heading"><span class="enquiry-kicker">Contact Wellcare Bloom</span><h1>Let’s take the<br><em>first step.</em></h1><p>Questions about your care, your recovery, or where to begin?<br>There’s room for a conversation.</p></header><section class="enquiry-width enquiry-contact-grid" aria-label="Contact the team or enquire about care">${enquiryClinic()}${enquiryForm(selected,true)}</section><section class="enquiry-width enquiry-booking-strip enquiry-glass"><div><span class="enquiry-kicker">Ready when you are</span><h2>Make a little space<br>for <em>your wellbeing.</em></h2></div><div><p>Take the next step with a consultation shaped around you.</p><a class="enquiry-submit" href="book-a-consultation.html">Book a consultation ${enquiryArrow}</a></div></section></div>`;
 return `<div class="enquiry-page enquiry-booking-page"><section class="enquiry-width enquiry-layout" aria-label="Book a consultation"><div class="enquiry-intro"><span class="enquiry-kicker">Book a consultation</span><h1>Care begins<br>with <em>you.</em></h1><p>A quiet first step towards feeling more like yourself. Share what you’re looking for, at your own pace.</p><div class="enquiry-assurances"><span>Private &amp; respectful</span><span>Your care. Your pace.</span></div><div class="enquiry-moment">${image('approach-mother-baby.webp','A mother holding her sleeping newborn','',false)}<div><span>A gentle reminder</span><p>You deserve<br>to feel supported.</p></div></div>${selected?`<div class="enquiry-selected"><span class="enquiry-kicker">Your care interest</span><h2>${escapeHtml(selected.title)}</h2><p>${escapeHtml(selected.lead)}</p></div>`:''}<a class="enquiry-call-link" href="tel:+919207798777">Prefer to talk? <strong>+91 92077 98777</strong> <span aria-hidden="true">↗</span></a></div>${enquiryForm(selected)}</section>${enquiryNextSteps()}<div class="enquiry-width enquiry-location-line"><span>${enquirySymbol('pin')}Wellcare Physiotherapy &amp; Sports Rehabilitation · Thiruvananthapuram</span><a href="contact.html">Contact &amp; clinic details ↗</a></div></div>`;
}
function journal(){return `${intro('The Wellcare Bloom Journal.','Thoughtful insights on women’s health, postpartum recovery and everyday confidence.')}<section class="container journal-list"><div class="journal-grid">${articles.map(articleCard).join('')}</div></section>${careCTA()}`}
function articlePage(index){const a=articles[index];return `${intro(a.title,a.description)}<article class="container"><div class="image-frame article-hero reveal">${journalPoster(a,false)}</div><div class="prose article-body reveal"><span class="eyebrow">${a.category}</span>${a.body.map(([tag,text])=>`<${tag}>${escapeHtml(text)}</${tag}>`).join('')}<aside class="article-sources"><h2>Further reading</h2><ul>${a.sources.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label} ↗</a></li>`).join('')}</ul></aside></div></article>${journalSection()}`}

function legalPage(type){const name={'privacy-policy':'Privacy Policy','terms-of-use':'Terms of Use','cookie-policy':'Cookie Policy'}[type];const text={
 'privacy-policy':`<h2>Information you choose to share</h2><p>The newsletter form is a preview and does not send or store submissions. Consultation and contact forms let you review your details before sending. When online sending is enabled and you choose Send, the details you enter are processed by FormSubmit and emailed to ${CONTACT_EMAIL}. This can include your name, phone number, optional email, care interest, appointment preferences and message. The website does not save a copy in browser storage.</p><p>FormSubmit states that it retains submissions for 30 days. See <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit’s privacy information</a>. Keep your message brief and discuss detailed health information directly with the clinic. Contact links let you call the clinic or open your own email app. Please avoid sending sensitive health information by email.</p><h2>External links</h2><p>This website may link to external health information. Those sites have their own privacy practices.</p><h2>Questions</h2><p>For questions about Wellcare Bloom, email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`,
 'terms-of-use':`<h2>General information</h2><p>Website content is for general information and does not replace an individual consultation, diagnosis or medical advice. If you have a health concern, speak with an appropriately qualified healthcare professional.</p><h2>Using this website</h2><p>Please use the website lawfully and do not rely on it for urgent or emergency care. Content may be updated over time.</p><h2>Questions</h2><p>Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> with website questions.</p>`,
 'cookie-policy':`<h2>Essential site functions</h2><p>This static website uses browser storage for the optional ambient sound preference and cached media. The newsletter form is a preview and does not save or transmit submissions.</p><h2>External services</h2><p>Links to external websites are governed by those sites’ own policies.</p><h2>Questions</h2><p>Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> with questions.</p>`
}[type];return `${intro(name,'')}<article class="prose container legal-page">${text}</article>`}
function footer(){return `<div class="footer-scene"><section class="newsletter reveal"><h3>A little care in your inbox.</h3><p>Thoughtful updates on pelvic health, postpartum recovery and finding confidence in everyday life.</p><form data-local-form="newsletter"><label class="sr-only" for="newsletter-email" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)">Email address</label><input id="newsletter-email" type="email" name="email" placeholder="Enter your email" required autocomplete="email"><button class="button" type="submit"><span>Subscribe</span></button></form><p class="form-status" role="status"></p><p class="privacy-note">By subscribing, you agree to receive emails from Wellcare Bloom. You can unsubscribe at any time. Read our <a href="privacy-policy.html">Privacy Policy.</a></p></section><div class="container footer-grid reveal"><div class="footer-panel"><p>Sitemap</p><div class="sitemap"><a href="index.html">Home</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="services.html">Services</a><a href="book-a-consultation.html">Book a session</a><a href="journal.html">Journal</a></div></div><div class="footer-panel"><p>Legal</p><div class="legal-links"><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-use.html">Terms of Use</a><a href="cookie-policy.html">Cookie Policy</a></div></div></div><div class="footer-bottom container">${social()}<p>Copyright 2026 Wellcare Bloom. All rights reserved.</p><p class="credits">Design by <a href="https://abhinanth.co.in" target="_blank" rel="noopener noreferrer">Abhinanth</a>.</p></div></div>`}
const currentFile=location.pathname.split('/').pop()||'index.html';
const page=currentFile.replace(/\.html$/,'');
const routes={index:home,about,services:servicePage,journal,contact:()=>consultation(true),'book-a-consultation':()=>consultation(false),'article-guidance':()=>articlePage(0),'article-hydration':()=>articlePage(1),'privacy-policy':()=>legalPage('privacy-policy'),'terms-of-use':()=>legalPage('terms-of-use'),'cookie-policy':()=>legalPage('cookie-policy'),'404':()=>`${intro('A little off the path.','The page you’re looking for could not be found. Let’s take you somewhere familiar.')}<div style="text-align:center;padding-bottom:100px">${button('Back to home','index.html')}</div>`};
document.querySelector('#main').innerHTML=(routes[page]||routes['404'])();
document.querySelector('#footer').innerHTML=footer();
// A normal click-to-chat link opens WhatsApp; no SDK, tracking widget or automatic messages.
if(page==='index'){
 const whatsapp=document.createElement('a');
 whatsapp.className='whatsapp-float';
 whatsapp.href=WHATSAPP_URL;
 whatsapp.target='_blank';
 whatsapp.rel='noopener noreferrer';
 whatsapp.setAttribute('aria-label','Chat with Wellcare Bloom on WhatsApp');
 whatsapp.innerHTML=`${whatsappIcon}<span class="whatsapp-float-label">Chat on WhatsApp</span>`;
 document.body.append(whatsapp);
}

document.title=page==='index'?'Wellcare Bloom — Women’s Health Physiotherapy':page==='article-guidance'?`${articles[0].title} — Wellcare Bloom`:page==='article-hydration'?`${articles[1].title} — Wellcare Bloom`:`${page.split('-').map(s=>s[0]?.toUpperCase()+s.slice(1)).join(' ')} — Wellcare Bloom`;
document.querySelectorAll(`.desktop-nav a[href="${currentFile}"]`).forEach(a=>a.setAttribute('aria-current','page'));

// Mobile menu uses a focus loop and restores focus when dismissed.
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menu';document.body.classList.remove('menu-open')}
menuButton.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Close':'Menu';document.body.classList.toggle('menu-open',open);if(open)menu.querySelector('a').focus()});
document.addEventListener('keydown',e=>{if(menu.hidden)return;if(e.key==='Escape'){closeMenu();menuButton.focus()}if(e.key==='Tab'){const focusable=[menuButton,...menu.querySelectorAll('a')];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
window.addEventListener('resize',()=>{if(innerWidth>809)closeMenu()});

document.querySelectorAll('.service-more').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.textContent=open?'Show less −':'Show more +';document.getElementById(b.getAttribute('aria-controls')).hidden=!open}));

const serviceTrack=document.querySelector('.service-track');
document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{const card=serviceTrack.children[+b.dataset.slide];serviceTrack.scrollTo({left:card.offsetLeft-(serviceTrack.clientWidth-card.offsetWidth)/2,behavior:'smooth'})}));
serviceTrack?.addEventListener('scroll',()=>{if(innerWidth>809)return;const middle=serviceTrack.scrollLeft+serviceTrack.clientWidth/2;let best=0,distance=Infinity;[...serviceTrack.children].forEach((c,i)=>{const d=Math.abs(c.offsetLeft+c.offsetWidth/2-middle);if(d<distance){distance=d;best=i}});document.querySelectorAll('[data-slide]').forEach((b,i)=>{b.classList.toggle('active',i===best);b.setAttribute('aria-pressed',String(i===best))})},{passive:true});

const audio=document.querySelector('#ambient-audio');const soundButton=document.querySelector('.sound-control');
audio.volume=.35;
soundButton.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();soundButton.setAttribute('aria-pressed','true');soundButton.setAttribute('aria-label','Mute ambient sound');sessionStorage.setItem('wellcare-bloom-sound','on')}catch{soundButton.setAttribute('aria-label','Sound unavailable. Try again.')}}else{audio.pause();soundButton.setAttribute('aria-pressed','false');soundButton.setAttribute('aria-label','Enable ambient sound');sessionStorage.removeItem('wellcare-bloom-sound')}});

// Keep deep links from the home page aligned with the selected care panel.
const careExplorer=document.querySelector('[data-care-explorer]');
if(careExplorer){
 const panels=[...careExplorer.querySelectorAll('.care-service')];
 const filters=[...careExplorer.querySelectorAll('[data-care-filter]')];
 const count=careExplorer.querySelector('.care-result-count');
 function filterCare(category){
  filters.forEach(b=>{const active=b.dataset.careFilter===category;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});
  panels.forEach(panel=>{panel.hidden=category!=='all'&&!panel.dataset.careGroups.split(' ').includes(category);if(panel.hidden)panel.open=false});
  const visible=panels.filter(panel=>!panel.hidden);
  count.textContent=`${visible.length} care ${visible.length===1?'area':'areas'}`;
  if(!visible.some(panel=>panel.open)&&visible[0])visible[0].open=true;
 }
 filters.forEach(b=>b.addEventListener('click',()=>filterCare(b.dataset.careFilter)));
 panels.forEach(panel=>panel.addEventListener('toggle',()=>{if(panel.open)panels.forEach(other=>{if(other!==panel)other.open=false})}));
 function openCareHash(){
  const target=panels.find(panel=>'#'+panel.id===location.hash);
  if(!target)return;
  filterCare('all');
  panels.forEach(panel=>{panel.open=panel===target});
  requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
 }
 window.addEventListener('hashchange',openCareHash);
 openCareHash();
}

// The newsletter remains a local preview. Enquiries use js/enquiry-form.js.
document.querySelectorAll('[data-local-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('.form-status')||form.parentElement.querySelector('.form-status');status.textContent=form.dataset.localForm==='newsletter'?'Thank you! This is a local preview; your email has not been subscribed.':form.dataset.localForm==='consultation'?'Your details are ready. This is a local preview; no appointment has been booked.':'Your message is ready. This is a local preview; no message has been sent.';status.scrollIntoView({behavior:'smooth',block:'nearest'})}));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const category=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(n=>{const active=n===b;n.classList.toggle('active',active);n.setAttribute('aria-pressed',String(active))});let visible=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=category!=='All'&&card.dataset.category!==category;if(!card.hidden)visible++});document.querySelector('.empty-filter').hidden=visible>0}));

// The scroll ribbon controls placement; each card handles its own hover depth.
const serviceHoverMedia=matchMedia('(min-width: 810px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
const hoverServiceCards=[...document.querySelectorAll('.service-track .service-card')];
function resetServiceHover(card){
 card.classList.remove('is-tilting');
 card.style.setProperty('--card-tilt-x','0deg');
 card.style.setProperty('--card-tilt-y','0deg');
}
hoverServiceCards.forEach(card=>{
 card.addEventListener('pointerenter',e=>{if(serviceHoverMedia.matches&&e.pointerType==='mouse')card.classList.add('is-tilting')});
 card.addEventListener('pointermove',e=>{
  if(!serviceHoverMedia.matches||e.pointerType!=='mouse')return;
  card.classList.add('is-tilting');
  const rect=card.getBoundingClientRect();
  const x=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
  const y=Math.max(0,Math.min(1,(e.clientY-rect.top)/rect.height));
  card.style.setProperty('--card-tilt-x',`${(0.5-y)*12}deg`);
  card.style.setProperty('--card-tilt-y',`${(x-0.5)*14}deg`);
  card.style.setProperty('--card-light-x',`${x*100}%`);
  card.style.setProperty('--card-light-y',`${y*100}%`);
 });
 card.addEventListener('pointerleave',()=>resetServiceHover(card));
 card.addEventListener('pointercancel',()=>resetServiceHover(card));
});
serviceHoverMedia.addEventListener('change',()=>hoverServiceCards.forEach(resetServiceHover));
document.addEventListener('visibilitychange',()=>{if(document.hidden)hoverServiceCards.forEach(resetServiceHover)});
