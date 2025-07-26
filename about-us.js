// Initialize EmailJS (make sure this is at the top of your script)
const EMAILJS_CONFIG = {
    publicKey: '4Ytx6Sb5JRuo0dY7-',
    serviceId: 'ehmcare_service',
    templateId: 'consultation_booking' // Template ID for consultation booking
};

// Function to show the consultation booking modal
function showConsultationModal() {
    console.log('Consultation modal triggered');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('consultationModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create the modal HTML
    const modalHTML = `
        <div id="consultationModal" style="display: block; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); overflow-y: auto; padding: 20px 0;">
            <div style="background-color: white; margin: 0 auto; padding: 30px; border-radius: 10px; width: 90%; max-width: 500px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3); min-height: auto; max-height: 90vh; overflow-y: auto;">
                <span onclick="document.getElementById('consultationModal').remove()" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; position: absolute; right: 15px; top: 15px; z-index: 10000;">&times;</span>
                <h2 style="color: #2E8B57; margin-bottom: 15px; padding-right: 40px;">Book Free Consultation</h2>
                <p style="margin-bottom: 20px;">Limited slots available this month. Take the first step toward natural healing.</p>
                <form id="consultationForm" style="margin: 20px 0;">
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
    
    // Add modal to the page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Handle form submission
    document.getElementById('consultationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleConsultationSubmission(this);
    });
    
    // Close modal when clicking outside
    document.getElementById('consultationModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

// Handle form submission
function handleConsultationSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;

    // Send via EmailJS
    emailjs.sendForm(
        EMAILJS_CONFIG.serviceId, 
        EMAILJS_CONFIG.templateId, 
        form
    )
    .then(() => {
        // Show success message
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
        
        // Close modal after 10 seconds
        setTimeout(() => {
            const modal = document.getElementById('consultationModal');
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

// Add event listener to the consultation button
document.addEventListener('DOMContentLoaded', function() {
    const consultButtons = document.querySelectorAll('.consultation-btn');
    consultButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showConsultationModal();
        });
    });
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS SDK not loaded');
    }
});