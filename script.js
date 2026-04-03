document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const formStatus = document.getElementById('formStatus');
    const registerBtn = document.querySelector('.register-btn');

    // Replace this with your actual Google Apps Script Web App URL after deployment
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby6TNlgoI6XiHj4ftr_NTuSUdEWBF3NueRiNIVCX325Yl8MnzIrIbeNeZQB4Mv4NHLi/exec';

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Change button state
        registerBtn.textContent = 'SAVING INFO...';
        registerBtn.disabled = true;
        formStatus.textContent = "Writing to the archives of Skyfall...";
        formStatus.className = 'form-status';

        // Extract form data
        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData.entries());
        data.timestamp = new Date().toLocaleString();

        try {
            // Check if URL is placeholder
            if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
                console.warn("No Google Script URL provided. Simulating submission...");
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message for demo
                formStatus.textContent = "SUCCESS! You have been enlisted for Skyfall. (Note: Please set your Google Script URL in script.js to actually sync with sheets)";
                formStatus.className = 'form-status success';
                registrationForm.reset();
            } else {
                // Real submission
                // Using URLSearchParams because some Apps Script setups prefer form-encoded
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Apps Script requires no-cors if not specifically handled
                    body: formData
                });

                // Note: with mode: 'no-cors', we can't read the response body or status.
                // We assume success if no reachability error occurred.
                formStatus.textContent = "SUCCESS! You have been enlisted for Skyfall. Redirecting to payment portal...";
                formStatus.className = 'form-status success';
                registrationForm.reset();

                // Redirect after a short delay so the user sees the success message
                setTimeout(() => {
                    window.location.href = 'https://kjusys-events.kristujayanti.edu.in/#/?id=69c4c8d12b132947b01cb2ad';
                }, 2000);
            }
        } catch (error) {
            console.error('Error submitting to Google Sheets:', error);
            formStatus.textContent = "A storm has disrupted the signal. Please try again.";
            formStatus.className = 'form-status error';
        } finally {
            registerBtn.textContent = 'PROCEED TO PAYMENT';
            registerBtn.disabled = false;
        }
    });

    // Add some soft interaction effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Optional: add visual feedback or sounds if requested
        });
    });
});
