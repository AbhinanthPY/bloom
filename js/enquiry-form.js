/* Review-before-send enquiries through FormSubmit. No SMTP password or API secret is shipped. */
'use strict';
(() => {
 document.querySelectorAll('[data-enquiry-form]').forEach(form => {
  const kind=form.dataset.enquiryForm;
  const dialog=document.getElementById(`${kind}-review`);
  if(!dialog)return;
  const recipient=form.dataset.recipient;
  const enabled=form.dataset.deliveryEnabled==='true';
  const send=dialog.querySelector('[data-send-enquiry]');
  const closeButtons=[...dialog.querySelectorAll('[data-close-preview]')];
  const status=dialog.querySelector('.enquiry-delivery-status');
  const list=dialog.querySelector('.enquiry-review-list');
  const name=form.elements.namedItem('name'),phone=form.elements.namedItem('phone');
  const sendLabel=kind==='contact'?'Send enquiry':'Send consultation request';
  let entries=[],sending=false,sent=false;
  const now=new Date();
  const today=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  form.querySelectorAll('input[type="date"]').forEach(field=>{field.min=today;});
  [name,phone].forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
  function setStatus(message,state){status.textContent=message;status.dataset.state=state;}
  function collect(){
   const result=[];
   form.querySelectorAll('[data-enquiry-label]').forEach(field=>{
    let value=field.value.trim();
    if(!value&&field.name==='service')value='Help me choose';
    if(!value&&field.name==='time')value='No preference';
    if(!value)return;
    if(field.type==='date')value=new Date(`${value}T12:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
    result.push({name:field.name,label:field.dataset.enquiryLabel,value});
   });
   return result;
  }
  form.addEventListener('submit',event=>{
   event.preventDefault();
   if(sending||form.elements.namedItem('_honey').value)return;
   name.value=name.value.trim();phone.value=phone.value.trim();
   name.setCustomValidity(name.value?'':'Please enter your name.');
   const digits=phone.value.replace(/\D/g,'');
   phone.setCustomValidity(phone.value&&(!/^[+\d\s().-]+$/.test(phone.value)||digits.length<7||digits.length>15)?'Please enter a valid phone number.':'');
   if(!form.reportValidity())return;
   entries=collect();sent=false;
   list.replaceChildren();
   // User values remain plain text in the review, including messages in Malayalam.
   entries.forEach(entry=>{
    const row=document.createElement('div'),label=document.createElement('dt'),detail=document.createElement('dd');
    label.textContent=entry.label;detail.textContent=entry.value;
    row.append(label,detail);list.append(row);
   });
   setStatus('','');
   send.hidden=!enabled;send.disabled=false;send.textContent=sendLabel;send.removeAttribute('aria-busy');
   closeButtons.forEach(button=>{button.disabled=false;});
   dialog.querySelector('.enquiry-review-edit').textContent='Back to your details';
   if(!dialog.open)dialog.showModal();
   dialog.querySelector('h2').focus();
  });
  send.addEventListener('click',async()=>{
   if(!enabled||sending||sent||!entries.length)return;
   if(location.protocol==='file:'){
    setStatus('Please open the live Wellcare Bloom website to send your enquiry. Your details have not been sent.','error');return;
   }
   sending=true;send.disabled=true;send.textContent='Sending…';send.setAttribute('aria-busy','true');
   closeButtons.forEach(button=>{button.disabled=true;});
   setStatus('Sending your enquiry. Please keep this window open.','sending');
   const payload={
    _subject:`Wellcare Bloom — ${kind==='contact'?'Contact enquiry':'Consultation request'}`,
    _template:'table',_captcha:'false',_honey:'',
    _url:`${location.origin}${location.pathname}`,
    'Request type':kind==='contact'?'Contact enquiry':'Consultation request'
   };
   const labels={name:'Full name',phone:'Phone number',email:'email',service:'Care interest',date:'Preferred date',time:'Preferred time',message:'Message'};
   entries.forEach(entry=>{payload[labels[entry.name]||entry.label]=entry.value;});
   const replyTo=entries.find(entry=>entry.name==='email')?.value;
   if(replyTo)payload._replyto=replyTo;
   const controller=new AbortController();
   const timeout=setTimeout(()=>controller.abort(),25000);
   try{
    const response=await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,{
     method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
     body:JSON.stringify(payload),credentials:'omit',cache:'no-store',signal:controller.signal
    });
    const result=await response.json();
    if(!response.ok||!(result.success===true||result.success==='true')){
     if(/activat/i.test(String(result.message||'')))throw new Error('activation');
     throw new Error('not-accepted');
    }
    sent=true;form.reset();send.hidden=true;
    dialog.querySelector('.enquiry-review-edit').textContent='Close';
    setStatus('Thank you. Your enquiry has been submitted. The clinic will confirm the next step with you; this is not an appointment confirmation.','success');
   }catch(error){
    setStatus(error.message==='activation'
     ?'Email enquiries are being activated. Please call the clinic for now; your details are still in the form.'
     :`We couldn’t confirm that your enquiry was sent. Your details are still here. Please try again or contact ${recipient}.`,'error');
   }finally{
    clearTimeout(timeout);sending=false;send.disabled=false;send.removeAttribute('aria-busy');
    if(!sent)send.textContent=sendLabel;
    closeButtons.forEach(button=>{button.disabled=false;});
   }
  });
  closeButtons.forEach(button=>button.addEventListener('click',()=>{if(!sending)dialog.close();}));
  dialog.addEventListener('cancel',event=>{if(sending)event.preventDefault();});
  dialog.addEventListener('click',event=>{if(event.target===dialog&&!sending)dialog.close();});
  dialog.addEventListener('close',()=>{entries=[];list.replaceChildren();setStatus('','');});
 });
})();
