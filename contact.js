// EmailJS Configuration (for feedback and appointment forms)
const EMAILJS_CONFIG = {
    publicKey: 'eAJkJK-7YUuhq8Dc1',
    serviceId: 'service_platform',
    templates: {
        feedback: 'feedback_submit',
        appointment: 'book_appointment'
    }
};

// Formspree Endpoints (replace with your actual Formspree IDs)
const FORMSPREE_ENDPOINTS = {
    inquiry: 'https://formspree.io/f/xeozgqbp',
    consultation: 'https://formspree.io/f/mblkojnj'
};

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('EmailJS initialized successfully');
    
    // Set up reply-to fields for Formspree forms
    setupFormspreeForms();
});

// Success Message Function
function showSuccessMessage(formId, message) {
    const form = document.getElementById(formId);
    const successHTML = `
        <div class="form-success-container">
            <div class="form-success-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2E8B57" width="48px" height="48px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h3>Thank You!</h3>
                <p>${message}</p>
                <button class="btn primary-btn close-success-btn">Close</button>
            </div>
        </div>
    `;
    
    form.style.display = 'none';
    form.insertAdjacentHTML('afterend', successHTML);
    
    document.querySelector('.close-success-btn').addEventListener('click', function() {
        document.querySelector('.form-success-container').remove();
        form.style.display = 'block';
        form.reset();
    });
}

// Handle EmailJS Form Submission
function handleEmailJSForm(event, formId, templateId, successMessage) {
    event.preventDefault();
    
    const form = document.getElementById(formId);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    emailjs.sendForm(EMAILJS_CONFIG.serviceId, templateId, form)
        .then(function() {
            console.log('SUCCESS!');
            showSuccessMessage(formId, successMessage);
        }, function(error) {
            console.log('FAILED...', error);
            submitButton.textContent = 'Error - Try Again';
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        });
}

// Handle Formspree Form Submission
function handleFormspreeForm(event, formId, endpoint, successMessage) {
    event.preventDefault();
    
    const form = document.getElementById(formId);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    const formData = new FormData(form);

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('SUCCESS!');
            showSuccessMessage(formId, successMessage);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.log('FAILED...', error);
        submitButton.textContent = 'Error - Try Again';
        setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Set up Formspree forms with reply-to functionality
function setupFormspreeForms() {
    const formspreeForms = [
        { id: 'general-inquiry-form', endpoint: FORMSPREE_ENDPOINTS.inquiry },
        { id: 'consultation-request-form', endpoint: FORMSPREE_ENDPOINTS.consultation }
    ];

    formspreeForms.forEach(formInfo => {
        const form = document.getElementById(formInfo.id);
        if (form) {
            // Add hidden _replyto field if it doesn't exist
            if (!form.querySelector('input[name="_replyto"]')) {
                const replyToField = document.createElement('input');
                replyToField.type = 'hidden';
                replyToField.name = '_replyto';
                form.appendChild(replyToField);
            }

            // Add hidden _subject field if it doesn't exist
            if (!form.querySelector('input[name="_subject"]')) {
                const subjectField = document.createElement('input');
                subjectField.type = 'hidden';
                subjectField.name = '_subject';
                subjectField.value = formInfo.id.includes('inquiry') 
                    ? 'New General Inquiry' 
                    : 'New Consultation Request';
                form.appendChild(subjectField);
            }
        }
    });
}

// Form configurations
const forms = [
    // EmailJS forms
    { 
        id: 'feedback-form',
        handler: handleEmailJSForm,
        templateId: EMAILJS_CONFIG.templates.feedback,
        message: 'Thank you for your valuable feedback! We appreciate you helping us improve our services.'
    },
    { 
        id: 'appointment-booking-form',
        handler: handleEmailJSForm,
        templateId: EMAILJS_CONFIG.templates.appointment,
        message: 'Your appointment request has been received! We will confirm your booking within 2 business hours.'
    },
    // Formspree forms
    { 
        id: 'general-inquiry-form',
        handler: handleFormspreeForm,
        endpoint: FORMSPREE_ENDPOINTS.inquiry,
        message: 'Your inquiry has been received! We will respond within 24 hours during business days.'
    },
    { 
        id: 'consultation-request-form',
        handler: handleFormspreeForm,
        endpoint: FORMSPREE_ENDPOINTS.consultation,
        message: 'Your consultation request has been received! Dr. Alabi will contact you within 2 hours to schedule your session.'
    }
];

// Attach event listeners
forms.forEach(formInfo => {
    const formElement = document.getElementById(formInfo.id);
    if (formElement) {
        formElement.addEventListener('submit', (event) => {
            if (formInfo.handler === handleEmailJSForm) {
                formInfo.handler(event, formInfo.id, formInfo.templateId, formInfo.message);
            } else {
                // Update reply-to field before submission
                const emailInput = formElement.querySelector('input[type="email"]');
                if (emailInput) {
                    formElement.querySelector('input[name="_replyto"]').value = emailInput.value;
                }
                formInfo.handler(event, formInfo.id, formInfo.endpoint, formInfo.message);
            }
        });
    }
});

// Add styles (only once)
if (!document.querySelector('style.form-success-styles')) {
    const style = document.createElement('style');
    style.className = 'form-success-styles';
    style.innerHTML = `
        .form-success-container {
            position: relative;
            background-color: #f8f9fa;
            border-radius: 10px;
            padding: 30px;
            margin: 20px 0;
            border: 1px solid #e9ecef;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .form-success-content {
            max-width: 400px;
            margin: 0 auto;
        }
        
        .form-success-content h3 {
            color: #2E8B57;
            margin: 15px 0 10px;
            font-size: 24px;
        }
        
        .form-success-content p {
            color: #495057;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .close-success-btn {
            background: #2E8B57;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
            margin-top: 15px;
        }
        
        .close-success-btn:hover {
            background: #247a4a;
        }
        
        @media (max-width: 768px) {
            .form-success-container {
                padding: 20px;
            }
            
            .form-success-content h3 {
                font-size: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}