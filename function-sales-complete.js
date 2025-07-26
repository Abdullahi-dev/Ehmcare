// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: '4Ytx6Sb5JRuo0dY7-', // Replace with your actual EmailJS public key
    serviceId: 'ehmcare_service',   // Replace with your actual service ID
    templates: {
        consultationBooking: 'consultation_booking',
        guideAutoReply: 'guide_auto_reply'
    }
};

// Initialize EmailJS when the script loads
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS SDK not loaded');
    }
})();

// RESPONSIVE GLOBAL FUNCTIONS WITH SCROLLABLE MODALS
function showLeadMagnetForm() {
    console.log('Lead magnet form triggered');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('leadMagnetModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const formHTML = `
        <div id="leadMagnetModal" style="display: block; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); overflow-y: auto; padding: 20px 0;">
            <div style="background-color: white; margin: 0 auto; padding: 30px; border-radius: 10px; width: 90%; max-width: 500px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3); min-height: auto; max-height: 90vh; overflow-y: auto;">
                <span onclick="document.getElementById('leadMagnetModal').remove()" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; position: absolute; right: 15px; top: 15px; z-index: 10000;">&times;</span>
                <h2 style="color: #2E8B57; margin-bottom: 15px; padding-right: 40px;">Download Free Guide</h2>
                <p style="margin-bottom: 20px;">Discover the 7 traditional remedies that have helped over 3,000 Nigerians overcome chronic pain, stress, and infertility naturally</p>
                <form id="leadMagnetForm" style="margin: 20px 0;">
                    <input type="text" name="fullName" placeholder="Full Name" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <input type="email" name="email" placeholder="Email Address" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <input type="tel" name="phone" placeholder="Phone Number (Optional)" style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <select name="healthConcern" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                        <option value="">Primary Health Concern</option>
                        <option value="chronic-pain">Chronic Pain</option>
                        <option value="stress-anxiety">Stress/Anxiety</option>
                        <option value="fertility">Fertility Issues</option>
                        <option value="digestive">Digestive Problems</option>
                        <option value="womens-health">Women's Health</option>
                        <option value="back-pain">Back Pain</option>
                        <option value="arthritis">Arthritis</option>
                        <option value="migraines">Migraines/Headaches</option>
                        <option value="other">Other</option>
                    </select>
                    <button type="submit" style="width: 100%; background: #2E8B57; color: white; padding: 15px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin: 15px 0; font-weight: 600;">Download Free Guide</button>
                </form>
                <p style="font-size: 0.9rem; color: #666; text-align: center; margin-top: 15px;">We respect your privacy. Your information will never be shared.</p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    // Handle form submission
    document.getElementById('leadMagnetForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLeadMagnetSubmission(this);
    });
    
    // Close on background click
    document.getElementById('leadMagnetModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

function showBookingForm() {
    console.log('Booking form triggered');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('bookingModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const formHTML = `
        <div id="bookingModal" style="display: block; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); overflow-y: auto; padding: 20px 0;">
            <div style="background-color: white; margin: 0 auto; padding: 30px; border-radius: 10px; width: 90%; max-width: 500px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3); min-height: auto; max-height: 90vh; overflow-y: auto;">
                <span onclick="document.getElementById('bookingModal').remove()" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; position: absolute; right: 15px; top: 15px; z-index: 10000;">&times;</span>
                <h2 style="color: #2E8B57; margin-bottom: 15px; padding-right: 40px;">Book Free Consultation</h2>
                <p style="margin-bottom: 20px;">Limited slots available this month. Take the first step toward natural healing.</p>
                <form id="bookingForm" style="margin: 20px 0;">
                    <input type="text" name="fullName" placeholder="Full Name" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <input type="email" name="email" placeholder="Email Address" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <input type="tel" name="phone" placeholder="Phone Number" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <select name="location" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                        <option value="">Preferred Location</option>
                        <option value="ilorin">Ilorin Clinic</option>
                        <option value="lagos">Lagos (Partner Clinic)</option>
                        <option value="abuja">Abuja (Partner Clinic)</option>
                        <option value="home">Home Visit</option>
                    </select>
                    <select name="healthConcern" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                        <option value="">Primary Health Concern</option>
                        <option value="chronic-pain">Chronic Pain</option>
                        <option value="back-pain">Back Pain</option>
                        <option value="fertility">Fertility Issues</option>
                        <option value="stress-anxiety">Stress/Anxiety</option>
                        <option value="digestive">Digestive Problems</option>
                        <option value="womens-health">Women's Health</option>
                        <option value="arthritis">Arthritis</option>
                        <option value="migraines">Migraines/Headaches</option>
                        <option value="sickle-cell">Sickle Cell Pain</option>
                        <option value="diabetes">Diabetes Management</option>
                        <option value="hypertension">High Blood Pressure</option>
                        <option value="insomnia">Sleep Disorders</option>
                        <option value="other">Other</option>
                    </select>
                    <textarea name="message" placeholder="Tell us more about your condition (optional)" rows="3" style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; resize: vertical; font-size: 16px; font-family: inherit;"></textarea>
                    <button type="submit" style="width: 100%; background: #2E8B57; color: white; padding: 15px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin: 15px 0; font-weight: 600;">Book Free Consultation</button>
                </form>
                <p style="text-align: center; margin-top: 15px; font-size: 14px;">Prefer to call? <a href="tel:+2349059758574" style="color: #2E8B57; text-decoration: none; font-weight: 600;">+234 905 975 8574</a> or <a href="https://wa.me/2349015184004" target="_blank" style="color: #2E8B57; text-decoration: none; font-weight: 600;">WhatsApp us</a></p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    // Handle form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSubmission(this);
    });
    
    // Close on background click
    document.getElementById('bookingModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

// Handle lead magnet form submission
function handleLeadMagnetSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send via EmailJS
    emailjs.sendForm(
        EMAILJS_CONFIG.serviceId, 
        EMAILJS_CONFIG.templates.guideAutoReply, 
        form
    )
    .then(() => {
        // Show success message
        form.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: #2E8B57; margin-bottom: 15px;">Thank You!</h3>
                <p>Your Natural Healing Guide has been sent to your email address.</p>
                <p>Check your inbox (and spam folder) for the download link.</p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <p><strong>Direct Download Link:</strong></p>
                    <a href="https://drive.google.com/uc?export=download&id=1rDfDJ-HtwfNzGqpxNC6vddZ5XJbP4bRs" 
                       target="_blank" download style="background: #2E8B57; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 10px 0;">Download Guide Now</a>
                </div>
                <p>Dr. Alabi will also send you personalized tips over the next few days.</p>
                <a href="https://wa.me/2349015184004" target="_blank" style="background: #25D366; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 10px;">Ask Questions on WhatsApp</a>
            </div>
        `;
        
        setTimeout(() => {
            const modal = document.getElementById('leadMagnetModal');
            if (modal) modal.remove();
        }, 8000);
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        submitBtn.textContent = 'Error - Try Again';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Handle booking form submission
function handleBookingSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;

    // Send via EmailJS
    emailjs.sendForm(
        EMAILJS_CONFIG.serviceId, 
        EMAILJS_CONFIG.templates.consultationBooking, 
        form
    )
    .then(() => {
        form.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: #2E8B57; margin-bottom: 15px;">Booking Confirmed!</h3>
                <p>Thank you for booking your FREE health assessment.</p>
                <p>Dr. Alabi will contact you within 2 hours to confirm your appointment time.</p>
                <p>You'll receive a confirmation message on WhatsApp shortly.</p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; text-align: left;">
                    <h4>What to expect:</h4>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>30-minute comprehensive health assessment</li>
                        <li>Personalized treatment plan recommendation</li>
                        <li>All your questions answered</li>
                        <li>No pressure or obligation</li>
                    </ul>
                </div>
                <a href="https://wa.me/2349015184004" target="_blank" style="background: #2E8B57; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">Message Dr. Alabi</a>
            </div>
        `;
        
        setTimeout(() => {
            const modal = document.getElementById('bookingModal');
            if (modal) modal.remove();
        }, 10000);
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        submitBtn.textContent = 'Error - Try Again';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// RESPONSIVE EVENT LISTENER SETUP
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up responsive button listeners...');
    
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        setupButtonListeners();
        setupOtherFeatures();
        addMobileResponsiveStyles();
    }, 100);
});

function setupButtonListeners() {
    // Lead magnet buttons
    const leadButtons = document.querySelectorAll('.lead-magnet-btn');
    console.log('Found lead magnet buttons:', leadButtons.length);
    leadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Lead magnet button clicked');
            showLeadMagnetForm();
        });
    });
    
    // Consultation buttons
    const consultButtons = document.querySelectorAll('.consultation-btn');
    console.log('Found consultation buttons:', consultButtons.length);
    consultButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Consultation button clicked');
            showBookingForm();
        });
    });
    
    // Fallback: All primary buttons
    const allButtons = document.querySelectorAll('.primary-btn');
    console.log('Found all primary buttons:', allButtons.length);
    allButtons.forEach(btn => {
        // Skip WhatsApp buttons
        if (btn.href && btn.href.includes('wa.me')) return;
        if (btn.textContent.toLowerCase().includes('whatsapp')) return;
        
        const text = btn.textContent.toLowerCase();
        if (text.includes('guide') || text.includes('download')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Guide button clicked (fallback)');
                showLeadMagnetForm();
            });
        } else if (text.includes('book') || text.includes('consultation') || text.includes('assessment')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Booking button clicked (fallback)');
                showBookingForm();
            });
        }
    });
    
    console.log('Button listeners setup complete');
}

function addMobileResponsiveStyles() {
    // Add responsive CSS for mobile CTA buttons
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile responsive styles for CTA buttons */
        @media (max-width: 768px) {
            .hero .container {
                text-align: center !important;
            }
            
            .hero .btn {
                display: block !important;
                margin: 10px auto !important;
                width: 90% !important;
                max-width: 300px !important;
                text-align: center !important;
            }
            
            .cta-section .btn,
            .consultation-section .btn,
            .lead-magnet-section .btn {
                display: block !important;
                margin: 15px auto !important;
                width: 90% !important;
                max-width: 300px !important;
                text-align: center !important;
            }
            
            .video-cta .btn {
                display: block !important;
                margin: 15px auto !important;
                width: 90% !important;
                max-width: 280px !important;
                text-align: center !important;
            }
            
            /* Ensure all sections center their content on mobile */
            .hero-content,
            .cta-content,
            .consultation-content,
            .lead-magnet-content {
                text-align: center !important;
            }
            
            /* Fix button containers */
            .cta-buttons,
            .hero-buttons {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                gap: 15px !important;
            }
            
            /* Ensure buttons are properly styled */
            .primary-btn {
                min-height: 50px !important;
                font-size: 16px !important;
                padding: 15px 20px !important;
                border-radius: 8px !important;
                font-weight: 600 !important;
            }
        }
        
        @media (max-width: 480px) {
            .hero .btn,
            .cta-section .btn,
            .consultation-section .btn,
            .lead-magnet-section .btn,
            .video-cta .btn {
                width: 95% !important;
                font-size: 15px !important;
                padding: 12px 15px !important;
            }
        }
        
        /* Ensure modal scrolling works on all devices */
        @media (max-height: 700px) {
            #bookingModal > div,
            #leadMagnetModal > div {
                margin: 10px auto !important;
                max-height: 85vh !important;
                overflow-y: auto !important;
            }
        }
        
        @media (max-height: 600px) {
            #bookingModal > div,
            #leadMagnetModal > div {
                margin: 5px auto !important;
                max-height: 90vh !important;
                padding: 20px !important;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('Mobile responsive styles added');
}

function setupOtherFeatures() {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for nav links only
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add WhatsApp float button
    if (!document.querySelector('.whatsapp-float')) {
        document.body.insertAdjacentHTML('beforeend', `
            <a href="https://wa.me/2349015184004" class="whatsapp-float" target="_blank" 
               style="position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; 
                      width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; 
                      justify-content: center; text-decoration: none; font-size: 24px; z-index: 1000; 
                      box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: transform 0.3s ease;"
               onmouseover="this.style.transform='scale(1.1)'" 
               onmouseout="this.style.transform='scale(1)'">💬</a>
        `);
    }
}

// Make functions globally available for testing
window.showLeadMagnetForm = showLeadMagnetForm;
window.showBookingForm = showBookingForm;

console.log('Responsive JavaScript loaded successfully');
console.log('Functions available:', typeof showLeadMagnetForm, typeof showBookingForm);