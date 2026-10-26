/* Design-stage form review only. No fetch, storage, email or messaging delivery. */
'use strict';
(() => {
 document.querySelectorAll('[data-enquiry-preview]').forEach(form => {
  const dialog=document.getElementById(`${form.dataset.enquiryPreview}-review`);
  if(!dialog)return;
  const name=form.elements.namedItem('name'),phone=form.elements.namedItem('phone');
  const now=new Date();
  const today=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  form.querySelectorAll('input[type="date"]').forEach(field=>{field.min=today;});
  [name,phone].forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
  form.addEventListener('submit',event=>{
   event.preventDefault();
   name.value=name.value.trim();phone.value=phone.value.trim();
   name.setCustomValidity(name.value?'':'Please enter your name.');
   const digits=phone.value.replace(/\D/g,'');
   phone.setCustomValidity(phone.value&&(!/^[+\d\s().-]+$/.test(phone.value)||digits.length<7||digits.length>15)?'Please enter a valid phone number.':'');
   if(!form.reportValidity())return;
   const list=dialog.querySelector('.enquiry-review-list');
   list.replaceChildren();
   // Read the same controls the visitor can see. Insert values as text, never HTML.
   form.querySelectorAll('[data-preview-label]').forEach(field=>{
    let value=field.value.trim();
    if(!value&&field.name==='service')value='Help me choose';
    if(!value)return;
    if(field.type==='date')value=new Date(`${value}T12:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
    const row=document.createElement('div'),label=document.createElement('dt'),detail=document.createElement('dd');
    label.textContent=field.dataset.previewLabel;detail.textContent=value;
    row.append(label,detail);list.append(row);
   });
   if(!dialog.open)dialog.showModal();
   dialog.querySelector('h2').focus();
  });
  dialog.querySelectorAll('[data-close-preview]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
 });
})();
