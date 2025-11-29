document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email?.trim().toLowerCase());
    }
    

    function isValidVietnamesePhone(phone) {
        const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
        const cleanPhone = phone?.trim().replace(/\s+/g, '');
        return phoneRegex.test(cleanPhone);
    }
    
    function isValidMessage(message) {
        return message?.trim().length >= 10;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const message = document.getElementById('contactMessage').value;
        
        let isValid = true;
        
        
        if (!isValidEmail(email)) {
            document.getElementById('contactEmail').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('contactEmail').classList.remove('is-invalid');
        }
        
        
        if (!isValidVietnamesePhone(phone)) {
            document.getElementById('contactPhone').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('contactPhone').classList.remove('is-invalid');
        }
        
        
        if (!isValidMessage(message)) {
            document.getElementById('contactMessage').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('contactMessage').classList.remove('is-invalid');
        }
    
        if (isValid) {
            successMessage.classList.remove('d-none');
            form.reset();
            
        }
    });

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
});