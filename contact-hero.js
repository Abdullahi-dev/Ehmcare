// Function to show consultation booking modal for hero section
function showHeroConsultationForm() {
    console.log('Hero consultation form triggered');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('heroConsultationModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const formHTML = `
        <div id="heroConsultationModal" style="display: block; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); overflow-y: auto; padding: 20px 0;">
            <div style="background-color: white; margin: 0 auto; padding: 30px; border-radius: 10px; width: 90%; max-width: 500px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.3); min-height: auto; max-height: 90vh; overflow-y: auto;">
                <span onclick="document.getElementById('heroConsultationModal').remove()" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; position: absolute; right: 15px; top: 15px; z-index: 10000;">&times;</span>
                <h2 style="color: #2E8B57; margin-bottom: 15px; padding-right: 40px;">Book Free Consultation</h2>
                <p style="margin-bottom: 20px;">Start your natural healing journey today with a FREE consultation.</p>
                <form id="heroConsultationForm" style="margin: 20px 0;">
                    <input type="text" name="fullName" placeholder="Full Name" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <input type="email" name="email" placeholder="Email Address" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <input type="tel" name="phone" placeholder="Phone Number" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                    <select name="healthConcern" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #e9ecef; border-radius: 5px; box-sizing: border-box; font-size: 16px;">
                        <option value="">Primary Health Concern</option>
                        <option value="chronic-pain">Chronic Pain</option>
                        <option value="stress-anxiety">Stress/Anxiety</option>
                        <option value="fertility">Fertility Issues</option>
                        <option value="digestive">Digestive Problems</option>
                        <option value="other">Other</option>
                    </select>
                    <button type="submit" style="width: 100%; background: #2E8B57; color: white; padding: 15px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin: 15px 0; font-weight: 600;">Book Free Consultation</button>
                </form>
                <p style="text-align: center; margin-top: 15px; font-size: 14px;">Prefer to call? <a href="tel:+2349059758574" style="color: #2E8B57; text-decoration: none; font-weight: 600;">+234 905 975 8574</a></p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    // Handle form submission
    document.getElementById('heroConsultationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleHeroConsultationSubmission(this);
    });
    
    // Close on background click
    document.getElementById('heroConsultationModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

// Handle hero consultation form submission
function handleHeroConsultationSubmission(form) {
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
                <a href="https://wa.me/2349015184004" target="_blank" style="background: #2E8B57; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 15px;">Message on WhatsApp</a>
            </div>
        `;
        
        setTimeout(() => {
            const modal = document.getElementById('heroConsultationModal');
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

// Add event listener to hero section consultation button
document.addEventListener('DOMContentLoaded', function() {
    const heroConsultBtn = document.querySelector('.hero-section .consultation-btn');
    if (heroConsultBtn) {
        heroConsultBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showHeroConsultationForm();
        });
    }
});