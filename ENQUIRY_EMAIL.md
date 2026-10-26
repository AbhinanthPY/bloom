# Consultation and contact email delivery

Official recipient: wellcarephysiotherapy.in@gmail.com (owner confirmed).

Both pages use app.js for the shared form and js/enquiry-form.js for review-before-send delivery through FormSubmit. No mail application is opened and no SMTP credentials are stored in this website. Customer email is optional and supplies Reply-To only.

## Activation

FormSubmit requires the recipient to confirm its activation email. Check Inbox and Spam and activate the live website forms. Delivery is not verified until the owner confirms activation and receipt. An activation/setup submission contains only website setup information, never a patient booking.

Live pages:
- https://abhinanthpy.github.io/bloom/contact.html
- https://abhinanthpy.github.io/bloom/book-a-consultation.html

## Operation

Customers review their details, then choose Send. Only an accepted service response shows submitted; appointment availability is confirmed by the clinic. Errors leave the form populated. An interrupted request can have an uncertain delivery outcome. FormSubmit processes submissions and states a 30-day retention period; this is disclosed in privacy-policy.html. Newsletter remains a local preview.

Maintain the official recipient in CONTACT_EMAIL in app.js. Rebuild the homepage using scripts/build-home-runtime.py after changes to app.js. Contact and booking pages also load js/enquiry-form.js and css/enquiry-pages.css directly. Keep their asset query versions current.

Provider documentation: https://formsubmit.co/documentation and https://formsubmit.co/ajax-documentation
