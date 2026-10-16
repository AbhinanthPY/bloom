/* Althea recreation. Buildless, framework-free HTML, CSS and JavaScript. */
'use strict';
const ASSET = 'assets/';
const images = {
  hero:'hero-mother-baby.webp', depth:'30nszQvXKcEgIENheS0WavYlM2Y.jpg',
  front:'azpEwdss6XW8gQrcvhKGGrYqjg.webp', frontJpg:'Iygm9WFensHwXXoe01QWLQ0iF78.jpg',
  side:'AYmhm7fQptPoF2bCQsLfIJDi0U4.jpg', face:'AFEMnkblR75GU9bwfRpmzlqBpQ.jpg',
  reeds:'nJqFkXMmRiafaaCThCYlQSprSFk.jpg', hydration:'0WVX1KMgVFBEAviv4zQhKVw8rgk.jpg'
};
const escapeHtml = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image = (file,alt='',className='',lazy=true) => `<img src="${ASSET}${file}" alt="${escapeHtml(alt)}" class="${className}" loading="${lazy?'lazy':'eager'}" decoding="async"${lazy?'':' fetchpriority="high"'}>`;
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
const social = () => `<div class="socials"><a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">◎</a><a href="https://www.threads.com/" aria-label="Threads" target="_blank" rel="noopener noreferrer">@</a><a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">ⓕ</a><a href="https://www.youtube.com/" aria-label="YouTube" target="_blank" rel="noopener noreferrer">▷</a></div>`;
const proof = () => `<div class="client-proof"><h4 style="font-size:30px">Care that understands you.</h4><p style="margin-top:20px">Private, respectful consultations.</p><p style="margin-top:16px">Individual assessment and personal planning.</p><p style="margin-top:16px">Practical guidance for everyday life.</p></div>`;
const careCTA = () => `<section class="container care-cta reveal"><div class="cta-copy"><h3>Ready to begin<br>your care?</h3><p>Every step at Wellcare Bloom starts with listening. Together, we plan care around your comfort, function, recovery and everyday goals.</p>${button()}</div><div>${proof()}<p style="font-size:13px;margin-top:32px;text-align:center"><a href="mailto:info@wellcarebloom.in">Send us an email</a> or connect with us on social — we’re always happy to help.</p>${social()}</div></section>`;
const bloomExperience = () => `<section class="bloom-experience" id="bloom" aria-labelledby="bloom-title" data-bloom-state="static"><div class="bloom-stage"><div class="bloom-fallback" aria-hidden="true"></div><div class="bloom-canvas" aria-hidden="true"></div><div class="bloom-atmosphere" aria-hidden="true"></div><p class="bloom-kicker">YOUR<br>WELLBEING<br>FIRST</p><h2 id="bloom-title" aria-label="Extraordinary care."><span class="bloom-title-line bloom-title-extra" aria-hidden="true">Extra</span><span class="bloom-title-line bloom-title-ordinary" aria-hidden="true">Ordinary</span><span class="bloom-title-line bloom-title-last" aria-hidden="true">Care</span></h2><div class="bloom-brand" aria-hidden="true"><img src="assets/wellcare-bloom-white.webp" alt="" width="1880" height="837" loading="lazy" decoding="async"></div></div></section>`;
const faqs = [
 [
  "What happens at my first visit?",
  "We begin with a confidential conversation about your concerns, history and goals. An individual assessment helps us understand your needs and agree on a care plan together.",
  "Relevant movement, posture, breathing, core and pelvic floor function may be assessed where appropriate. We explain each step and work at a pace that respects your comfort."
 ],
 [
  "Can I come for care after childbirth?",
  "Yes. Our specialities include postpartum recovery and care after vaginal birth or a C-section. Your assessment and plan are shaped around your symptoms, goals and recovery stage."
 ],
 [
  "Can I discuss leakage, pelvic pain or intimate concerns?",
  "Yes. Wellcare Bloom provides a private, respectful space to discuss bladder leakage, pelvic pain, pelvic floor and intimate health concerns. We listen and help you understand the care options relevant to your needs."
 ],
 [
  "How can I book a consultation?",
  "You can <a href=\"book-a-consultation.html\">request a consultation</a> or email <a href=\"mailto:info@wellcarebloom.in\">info@wellcarebloom.in</a>. Our team can help you decide where to begin."
 ],
 [
  "Will my consultation be private?",
  "Our approach centres on confidential conversations and a private, respectful environment. We explain the assessment and care plan, and take your concerns and comfort seriously."
 ],
 [
  "How is my care plan decided?",
  "Your plan is based on your assessment, symptoms, goals and recovery stage. We agree on practical steps together and adapt the plan as your needs change."
 ],
 [
  "Do I need to know which service to choose?",
  "No. You can start with a conversation. Tell us what you are experiencing and what you want to work towards; we will help you identify the right starting point."
 ],
 [
  "How do you review progress?",
  "We review how you are feeling and functioning, discuss your goals and adjust your plan. Clear communication and practical guidance help connect your rehabilitation with everyday life."
 ]
];
const faqItem = (f,i) => `<div class="faq-item"><button aria-expanded="${i===0}" aria-controls="answer-${i}" id="question-${i}">${f[0]}<span aria-hidden="true">+</span></button><div id="answer-${i}" class="faq-answer ${i===0?'open':''}" role="region" aria-labelledby="question-${i}" ${i===0?'':'inert'}><div>${f.slice(1).map(p=>`<p>${p}</p>`).join('')}</div></div></div>`;
const FAQ = () => `<section class="section container" id="faq">${heading('Frequently Asked Questions','Your questions, answered.','Everything you need to know before booking your visit.')}<div class="faq-grid reveal"><div class="faq-column">${faqs.slice(0,4).map((f,i)=>faqItem(f,i)).join('')}</div><div class="faq-column">${faqs.slice(4).map((f,i)=>faqItem(f,i+4)).join('')}</div></div><div class="contact-note reveal"><p>Didn’t find what you were looking for? Get in touch and let’s sort it out.</p><a href="mailto:info@wellcarebloom.in">info@wellcarebloom.in</a></div></section>`;
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
  "title": "Care Begins with Listening.",
  "description": "What to expect from a private conversation, individual assessment and a care plan built around you.",
  "category": "Pelvic Health",
  "image": "approach-physiotherapy.webp",
  "url": "article-guidance.html",
  "body": [
   [
    "h2",
    "A conversation that respects you."
   ],
   [
    "p",
    "Pelvic floor concerns, bladder leakage and pelvic pain can be difficult to talk about. At Wellcare Bloom, care begins with a confidential conversation about your concerns, history and goals."
   ],
   [
    "h2",
    "An assessment shaped around your needs."
   ],
   [
    "p",
    "Relevant movement, posture, breathing, core and pelvic floor function may be assessed where appropriate. We explain the process and work with you in a private, respectful and supportive environment."
   ],
   [
    "h2",
    "A plan we agree on together."
   ],
   [
    "p",
    "Your care plan reflects your symptoms, goals and recovery stage. We communicate clearly, offer practical guidance for daily life and review progress so the plan can adapt to your needs."
   ]
  ]
 },
 {
  "title": "Recovery at Your Own Pace.",
  "description": "A thoughtful approach to postpartum recovery, rebuilding movement and returning to everyday life.",
  "category": "Postpartum Care",
  "image": "approach-mother-baby.webp",
  "url": "article-hydration.html",
  "body": [
   [
    "h2",
    "Your recovery is personal."
   ],
   [
    "p",
    "Changes after childbirth can affect comfort, movement and confidence. Wellcare Bloom provides personalised postpartum rehabilitation and birth recovery care in a supportive environment."
   ],
   [
    "h2",
    "Begin with listening and assessment."
   ],
   [
    "p",
    "We take time to understand your concerns, history and goals. Your assessment helps us agree on an individual care plan that reflects your symptoms and stage of recovery."
   ],
   [
    "h2",
    "Rebuild progressively, review together."
   ],
   [
    "p",
    "Rehabilitation may focus on mobility, strength, coordination or relaxation, according to your needs. We review progress and adapt the plan as you work towards daily activities and a return to exercise."
   ]
  ]
 }
];
const articleCard = a => `<a class="article-card reveal" href="${a.url}" data-category="${a.category}"><div class="article-copy"><h3>${a.title}</h3><p>${a.description}</p></div><div class="article-image">${image(a.image,a.title)}<span class="category-tag">${a.category}</span></div></a>`;
const journalSection = () => `<section class="section container journal-feature" id="home-journal">${heading('Our Journal','Notes for your next chapter.','Thoughtful reading on pelvic health, postpartum recovery and finding your way back to everyday life.')}<div class="journal-grid">${articles.map(articleCard).join('')}</div><div class="section-end reveal"><p>Explore our Journal for thoughtful insights on women’s health, recovery and everyday confidence.</p>${button('Browse insights','journal.html')}</div></section>`;
const testimonials = [
 ['I appreciated how calm and unhurried the consultation felt. Everything was explained clearly, and the results look natural — exactly what I hoped for.','Emma L.'],
 ['I liked how personal the whole experience felt. Nothing was rushed, and the recommendations made complete sense for my skin. The results look fresh and natural.','Sofia M.'],
 ['The consultation was very thoughtful. I never felt pushed toward treatments I didn’t need, and the final result looks subtle but noticeably better.','Laura P.'],
 ['What stood out most was the calm atmosphere and clear explanations. I felt comfortable asking questions, and everything was done with real care.','Isabelle R.'],
 ['I was looking for something natural, not dramatic. The treatment refreshed my skin without changing how I look — exactly what I wanted.','Anna K.']
];
function home(){
 return `<section class="hero" id="hero"><div class="hero-bg" aria-hidden="true"></div><div class="hero-petals" aria-hidden="true"><span class="hero-petal hero-petal-1"><img src="assets/bloom-petal.svg" alt="" decoding="async"></span><span class="hero-petal hero-petal-2"><img src="assets/bloom-petal.svg" alt="" decoding="async"></span><span class="hero-petal hero-petal-3"><img src="assets/bloom-petal.svg" alt="" decoding="async"></span><span class="hero-petal hero-petal-4"><img src="assets/bloom-petal.svg" alt="" decoding="async"></span></div><div class="hero-portrait">${image(images.hero,'A mother holding her sleeping baby','',false)}<canvas id="portrait-depth" aria-hidden="true"></canvas></div><div class="hero-copy"><h1 aria-label="Heal. Rebuild. Bloom."><span class="hero-line">Heal. Rebuild.</span> <span class="hero-line">Bloom.</span></h1><p>Women’s health physiotherapy for pelvic care, postpartum recovery and everyday confidence.</p><div class="hero-actions">${button('Book a consultation')}${button('Explore our services','#our-services','light')}</div></div></section>
 <section class="manifesto"><div class="manifesto-inner container"><blockquote>"You deserve care that understands you. Pelvic floor concerns, bladder leakage, pelvic pain and changes after childbirth can be difficult to talk about. At Wellcare Bloom, you do not have to navigate them alone. We listen, assess your needs and plan care around your comfort, recovery and everyday goals."</blockquote><cite>Wellcare Bloom — Women’s Health Physiotherapy</cite></div></section>
 <section class="services-scroll" id="our-services" aria-label="Our Services"><div class="services-intro">${heading('Our Specialities','Care to help you bloom.','Pelvic health and postpartum physiotherapy, personalised to your symptoms, goals and recovery stage.')}</div><div class="services-runway" style="--service-count:${services.length}"><div class="services-sticky"><div class="service-track">${services.map((s,i)=>`<div class="service-slot"><a href="services.html#service-${i}" class="service-card"><span class="service-glass-rim" aria-hidden="true"></span>${i===3?'<svg class="service-icon" viewBox="0 0 80 80" aria-hidden="true"><path d="M47 69C19 73 5 47 16 25S53 9 62 27c10 21-4 38-20 34-14-3-18-18-10-27 8-8 21-2 18 8-2 7-11 7-12 0"/></svg>':icon(i)}<h3>${s[0]}</h3><p>${s[1]}</p><small>Click to learn more</small></a></div>`).join('')}</div><div class="mobile-dots">${services.map((_,i)=>`<button aria-label="Scroll to service ${i+1}" aria-pressed="${i===0}" class="${i===0?'active':''}" data-slide="${i}"></button>`).join('')}</div></div></div></section>
 <section class="section journey container">${heading('','Your Bloom Journey.','From listening and assessment to rehabilitation and review, every step is shaped around you.')}<div class="journey-layout"><div class="reveal">${image('journey-pregnant-woman.webp','Pregnant woman standing in side profile','journey-face')}</div><div class="journey-steps">${[['Listen & Assess.','We listen to your concerns and assess movement, posture, breathing, core and pelvic floor function where appropriate.'],['Plan & Rebuild.','Together, we agree on a personal plan and work progressively on mobility, strength, coordination or relaxation to suit your needs.'],['Review & Progress.','We review your progress, adapt your plan and offer practical guidance for daily life, recovery and returning to activity.']].map((s,i)=>`<div class="journey-step reveal"><span class="step-number">0${i+1}</span><div><h4>${s[0]}</h4><p>${s[1]}</p></div></div>`).join('')}</div></div></section>
 ${bloomExperience()}
 <section class="section wide" id="our-approach">${heading('Why Wellcare Bloom?','Care that understands you.','Dedicated women’s health physiotherapy, with private consultations, personal plans and practical support for everyday life.')}<div class="approach-grid">${[['Listening first','Start with a confidential conversation. We take time to understand your concerns, history and goals in a private, respectful space.','approach-listening-background.webp'],['Focused<br>care','Our focus is women’s health and pelvic rehabilitation, with individual assessment and care guided by your needs.','approach-physiotherapy.webp'],['Your pace,<br>your plan','Rehabilitation reflects your symptoms, goals and recovery stage. We work with you towards better comfort, function and confidence.','approach-mother-baby.webp'],['Progress<br>together','Clear communication, regular review and practical guidance help connect your care with everyday life. Your plan adapts as your needs change.','approach-longterm-background.webp']].map((c,i)=>`<div class="approach-card reveal approach-${['listening','careful','results','longterm'][i]}"><h4>${c[0]}</h4><p>${c[1]}</p>${image(c[2],i===1?'Mother practising gentle breathing during postpartum physiotherapy':i===2?'Mother holding her sleeping newborn':'')}</div>`).join('')}</div></section>
 <section class="testimonials" aria-label="Client testimonials" hidden><div class="testimonial-backdrop" aria-hidden="true">What our<br>clients say</div><div class="testimonial-deck" aria-live="polite">${testimonials.map((t,i)=>`<article class="testimonial-card" data-index="${i}"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“${t[0]}”</blockquote><cite>— ${t[1]}</cite></article>`).join('')}</div><div class="testimonial-controls"><button class="round-button" id="review-prev" aria-label="Previous review">‹</button><button class="round-button" id="review-next" aria-label="Next review">›</button></div></section>
 ${pricing()}
 <section class="stats container" hidden><div class="stat-grid">${[[9,'Years of experience in aesthetic and wellness care'],[320,'Clients supported with personal, thoughtful attention'],[20,'Services carefully selected and regularly reviewed']].map(s=>`<div class="reveal"><div class="stat-number"><span data-count="${s[0]}">0</span>+</div><p>${s[1]}</p></div>`).join('')}</div><h4 class="reveal">Behind every treatment is time, attention, and thoughtful work. These milestones reflect a practice focused on quality, trust, and long-term care.</h4>${button('Start your journey')}</section>
 ${journalSection()}${FAQ()}`;
}
const intro=(title,desc)=>`<section class="page-intro reveal"><h1>${title}</h1><p>${desc}</p></section>`;
function about(){
 const source=REFERENCE_CONTENT.about;
 const photos=source.images.map(u=>u.split('/').pop());
 return `${intro('About Althea.','Althea is a space where aesthetic care meets thoughtful attention. We focus on subtle, natural results and treatments chosen carefully to support long-term skin health and overall well-being.')}<div class="container image-frame about-cover reveal">${image(photos[0],'The Althea clinic')}</div><section class="section container"><div class="prose reveal"><h2>How We Think About Care.</h2>${source.text.filter(x=>x[1].startsWith('Many aesthetic')||x[1].startsWith('Our process begins')||x[1].startsWith('This philosophy')).map(x=>`<p>${escapeHtml(x[1])}</p>`).join('')}</div></section><section class="section container founder-grid"><div class="image-frame reveal">${image(photos[1],'Dr. Eva Laurent')}</div><div class="reveal"><h2>Meet Our Founder.</h2><p>With years of experience in aesthetic and skin care treatments, Dr. Laurent founded Althea to create a practice centered on natural results and patient trust. Her approach combines medical expertise with a deep respect for balance and individuality.</p><blockquote class="founder-quote">“True confidence comes from feeling comfortable in your own skin. Our role is simply to support that process with care and experience.”</blockquote><p>Dr. Eva Laurent — Founder</p></div></section><section class="section container">${heading('','Our Team.','The team at Althea brings together specialists in aesthetic care, skin health, and wellness. Each practitioner shares the same philosophy — thoughtful treatments, natural results, and care designed around individual needs.')}<div class="team-grid">${['Aesthetic Specialist','Wellness & Recovery Specialist','Skin Therapy Specialist'].map((n,i)=>`<div class="reveal"><div class="image-frame">${image(photos[i+2],n)}</div><h4 style="text-align:center;font-size:30px;margin-top:22px">${['Dr. Sofia Martin','Dr. Elena Rossi','Dr. Maya Chen'][i]}</h4><p style="margin-top:8px">${n}</p></div>`).join('')}</div></section>${careCTA()}<section class="section container">${heading('Our Space','A Calm Place for Care.','The Althea space is designed to feel calm, private, and welcoming. Every detail is meant to create a quiet environment where thoughtful care and personal attention come first.')}<div class="journal-grid">${photos.slice(10,14).map(f=>`<div class="image-frame reveal" style="height:420px">${image(f,'Inside the Althea clinic')}</div>`).join('')}</div></section>${FAQ()}`;
}
function servicePage(){
 return `${intro('Our Specialities.','Women’s health physiotherapy for pelvic health, postpartum recovery and a stronger return to everyday life.')}<section class="container">${services.map((s,i)=>`<article class="service-detail reveal" id="service-${i}"><div>${icon(i)}<h2>${s[0]}</h2></div><div><p>${s[1]}</p><p style="margin-top:20px">Care begins with a confidential conversation and individual assessment. Together, we agree on a plan that reflects your symptoms, goals and recovery stage.</p><div>${button('Book a consultation',`book-a-consultation.html?service=${i}`)}</div></div></article>`).join('')}</section>${pricing()}${careCTA()}${FAQ()}`;
}
function consultation(isContact=false){
 return `${intro(isContact?'Contact Wellcare Bloom.':'Care begins with a conversation.',isContact?'Have a question about pelvic health, postpartum recovery or getting started? Contact our team and we will help you find the right starting point.':'Tell us about your concerns, recovery stage and goals. Your first step is a private conversation and an individual assessment, with care planned around you.')}<section class="container form-layout"><form class="form-panel reveal" data-local-form="${isContact?'message':'consultation'}"><h3>${isContact?'Send us a message.':'Tell us about you.'}</h3>${isContact?'<p>We’ll respond as soon as possible, usually within one business day.</p>':''}<div class="field-grid"><label class="field"><span class="field-label">Your name *</span><input name="name" placeholder="Your Name *" autocomplete="name" required></label><label class="field"><span class="field-label">Phone number</span><input type="tel" name="phone" placeholder="Phone Number" autocomplete="tel"></label></div><label class="field"><span class="field-label">Your email *</span><input type="email" name="email" placeholder="Your Email *" autocomplete="email" required></label><label class="field"><span class="field-label">How can we help?</span><textarea name="message" placeholder="Feel free to share what you’re looking for or any concerns you’d like to discuss." ${isContact?'required':''}></textarea></label>${isContact?'':`<fieldset><legend>What service are you interested in?</legend>${[...services.map(s=>s[0].replace(/<br>/g,' ')),'Not sure yet — I’d like guidance'].map((s,i)=>`<label class="check-field"><input type="checkbox" name="service" value="${escapeHtml(s)}" ${new URLSearchParams(location.search).get('service')===String(i)?'checked':''}>${s}</label>`).join('')}</fieldset><label class="field"><span class="field-label">Preferred appointment date.</span><input type="date" name="date" required></label><label class="check-field"><input type="checkbox" name="updates">I would like to receive occasional updates via email</label><p class="form-note">We share thoughtful updates on women’s health and recovery.<br>You can unsubscribe at any time.</p>`}<button class="button" type="submit" style="margin-top:30px"><span>${isContact?'Submit':'Book a consultation'}</span></button><p class="demo-note">Preview form — no message or appointment is sent.</p><p class="form-status" role="status"></p></form><aside class="form-aside reveal">${isContact?'<h4>Email:</h4><a href="mailto:info@wellcarebloom.in">info@wellcarebloom.in</a><h4>Private, personal care.</h4><p>Tell us about your concerns and goals. Our team can help you explore pelvic health and postpartum care.</p>':proof()}${social()}</aside></section>${isContact?careCTA()+journalSection():FAQ()}`;
}
function journal(){return `${intro('The Wellcare Bloom Journal.','Thoughtful insights on women’s health, postpartum recovery and everyday confidence.')}<section class="container"><div class="filter-row" role="group" aria-label="Filter articles by category">${['All','Pelvic Health','Postpartum Care','Advice'].map((n,i)=>`<button class="filter-chip ${i===0?'active':''}" aria-pressed="${i===0}" data-filter="${n}">${n}</button>`).join('')}</div><div class="journal-grid">${articles.map(articleCard).join('')}<p class="empty-filter" hidden>No articles in this category yet. Explore all insights.</p></div></section>${careCTA()}`}
function articlePage(index){const a=articles[index];return `${intro(a.title,a.description)}<article class="container"><div class="image-frame article-hero reveal">${image(a.image,a.title,'',false)}</div><div class="prose article-body reveal"><span class="eyebrow">${a.category}</span>${a.body.map(([tag,text])=>`<${tag}>${escapeHtml(text)}</${tag}>`).join('')}</div></article>${journalSection()}`}

function legalPage(type){const name={'privacy-policy':'Privacy Policy','terms-of-use':'Terms of Use','cookie-policy':'Cookie Policy'}[type];const data=REFERENCE_CONTENT['legal-'+type].text;const start=data.findIndex(x=>x[0]==='h1');const end=data.findIndex((x,i)=>i>start&&x[1]==='A quiet note from Althea.');return `${intro(name,'')}<article class="prose container legal-page">${data.slice(start+1,end).filter(x=>x[1].length>2).map(([t,s])=>`<${t==='p'?'p':'h2'}>${escapeHtml(s)}</${t==='p'?'p':'h2'}>`).join('')}</article>`}
function footer(){return `<div class="footer-scene"><section class="newsletter reveal"><h3>A little care in your inbox.</h3><p>Thoughtful updates on pelvic health, postpartum recovery and finding confidence in everyday life.</p><form data-local-form="newsletter"><label class="sr-only" for="newsletter-email" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)">Email address</label><input id="newsletter-email" type="email" name="email" placeholder="Enter your email" required autocomplete="email"><button class="button" type="submit"><span>Subscribe</span></button></form><p class="form-status" role="status"></p><p class="privacy-note">By subscribing, you agree to receive emails from Wellcare Bloom. You can unsubscribe at any time. Read our <a href="privacy-policy.html">Privacy Policy.</a></p></section><div class="container footer-grid reveal"><div class="footer-panel"><p>Sitemap</p><div class="sitemap"><a href="index.html">Home</a><a href="article-guidance.html">Article</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="services.html">Services</a><a href="book-a-consultation.html">Book a session</a><a href="journal.html">Journal</a><a href="404.html">404</a></div></div><div class="footer-panel"><p>Legal</p><div class="legal-links"><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-use.html">Terms of Use</a><a href="cookie-policy.html">Cookie Policy</a></div></div></div><div class="footer-bottom container">${social()}<p>Copyright 2026 Wellcare Bloom. All rights reserved.</p><p class="credits">Design by <a href="https://abhinanth.co.in" target="_blank" rel="noopener noreferrer">Abhinanth</a>.</p><div class="footer-symbol" aria-hidden="true"></div></div></div>`}
const currentFile=location.pathname.split('/').pop()||'index.html';
const page=currentFile.replace(/\.html$/,'');
const routes={index:home,about,services:servicePage,journal,contact:()=>consultation(true),'book-a-consultation':()=>consultation(false),'article-guidance':()=>articlePage(0),'article-hydration':()=>articlePage(1),'privacy-policy':()=>legalPage('privacy-policy'),'terms-of-use':()=>legalPage('terms-of-use'),'cookie-policy':()=>legalPage('cookie-policy'),'404':()=>`${intro('A little off the path.','The page you’re looking for could not be found. Let’s take you somewhere familiar.')}<div style="text-align:center;padding-bottom:100px">${button('Back to home','index.html')}</div>`};
document.querySelector('#main').innerHTML=(routes[page]||routes['404'])();
document.querySelector('#footer').innerHTML=footer();
document.title=page==='index'?'Wellcare Bloom — Women’s Health Physiotherapy':`${page.split('-').map(s=>s[0]?.toUpperCase()+s.slice(1)).join(' ')} — Wellcare Bloom`;
if(page==='index'){
 const loader=document.getElementById('page-loader');
 const heroImage=document.querySelector('.hero-portrait img');
 const minimum=new Promise(resolve=>setTimeout(resolve,450));
 const maximum=new Promise(resolve=>setTimeout(resolve,1650));
 const background=new Image();background.src='assets/hero-bg.webp';
 const critical=Promise.allSettled([heroImage?.decode(),background.decode(),document.fonts?.ready]);
 Promise.race([critical,maximum]).then(()=>minimum).then(()=>{
  document.documentElement.classList.remove('page-loading');
  document.querySelector('#main')?.removeAttribute('aria-busy');
  loader?.classList.add('is-hidden');
  setTimeout(()=>loader?.remove(),650);
 });
}
document.querySelectorAll(`.desktop-nav a[href="${currentFile}"]`).forEach(a=>a.setAttribute('aria-current','page'));

// Mobile menu uses a focus loop and restores focus when dismissed.
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menu';document.body.classList.remove('menu-open')}
menuButton.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Close':'Menu';document.body.classList.toggle('menu-open',open);if(open)menu.querySelector('a').focus()});
document.addEventListener('keydown',e=>{if(menu.hidden)return;if(e.key==='Escape'){closeMenu();menuButton.focus()}if(e.key==='Tab'){const focusable=[menuButton,...menu.querySelectorAll('a')];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
window.addEventListener('resize',()=>{if(innerWidth>809)closeMenu()});

// Accessible, smoothly expanding FAQ answers.
document.querySelectorAll('.faq-item button').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));const answer=document.getElementById(b.getAttribute('aria-controls'));answer.classList.toggle('open',open);answer.inert=!open}));
document.querySelectorAll('.service-more').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.textContent=open?'Show less −':'Show more +';document.getElementById(b.getAttribute('aria-controls')).hidden=!open}));

// Reorder the physical stack so every review can be reached in either direction.
let reviewIndex=0;
const reviewCards=[...document.querySelectorAll('.testimonial-card')];
function updateReviews(){reviewCards.forEach((card,i)=>{const depth=(i-reviewIndex+reviewCards.length)%reviewCards.length;card.style.zIndex=String(10-depth);card.style.transform=`rotate(${[0,-5,5,-9,9][depth]}deg) translateY(${depth*2}px)`;card.style.opacity=depth<4?'1':'0';card.setAttribute('aria-hidden',String(depth!==0));card.inert=depth!==0})}
updateReviews();
document.getElementById('review-next')?.addEventListener('click',()=>{reviewIndex=(reviewIndex+1)%reviewCards.length;updateReviews()});
document.getElementById('review-prev')?.addEventListener('click',()=>{reviewIndex=(reviewIndex-1+reviewCards.length)%reviewCards.length;updateReviews()});
let touchStart=0;
document.querySelector('.testimonial-deck')?.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].clientX},{passive:true});
document.querySelector('.testimonial-deck')?.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>45){reviewIndex=(reviewIndex+(delta<0?1:-1)+reviewCards.length)%reviewCards.length;updateReviews()}},{passive:true});

const serviceTrack=document.querySelector('.service-track');
document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{const card=serviceTrack.children[+b.dataset.slide];serviceTrack.scrollTo({left:card.offsetLeft-(serviceTrack.clientWidth-card.offsetWidth)/2,behavior:'smooth'})}));
serviceTrack?.addEventListener('scroll',()=>{if(innerWidth>809)return;const middle=serviceTrack.scrollLeft+serviceTrack.clientWidth/2;let best=0,distance=Infinity;[...serviceTrack.children].forEach((c,i)=>{const d=Math.abs(c.offsetLeft+c.offsetWidth/2-middle);if(d<distance){distance=d;best=i}});document.querySelectorAll('[data-slide]').forEach((b,i)=>{b.classList.toggle('active',i===best);b.setAttribute('aria-pressed',String(i===best))})},{passive:true});

const audio=document.querySelector('#ambient-audio');const soundButton=document.querySelector('.sound-control');
audio.volume=.35;
soundButton.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();soundButton.setAttribute('aria-pressed','true');soundButton.setAttribute('aria-label','Mute ambient sound');sessionStorage.setItem('althea-sound','on')}catch{soundButton.setAttribute('aria-label','Sound unavailable. Try again.')}}else{audio.pause();soundButton.setAttribute('aria-pressed','false');soundButton.setAttribute('aria-label','Enable ambient sound');sessionStorage.removeItem('althea-sound')}});

// Forms intentionally validate locally. They never claim a real delivery.
document.querySelectorAll('[data-local-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('.form-status')||form.parentElement.querySelector('.form-status');status.textContent=form.dataset.localForm==='newsletter'?'Thank you! This is a local preview; your email has not been subscribed.':form.dataset.localForm==='consultation'?'Your details are ready. This is a local preview; no appointment has been booked.':'Your message is ready. This is a local preview; no message has been sent.';status.scrollIntoView({behavior:'smooth',block:'nearest'})}));
const dateInput=document.querySelector('input[type=date]');if(dateInput){const now=new Date();dateInput.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`}
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
