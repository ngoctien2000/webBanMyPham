// Modal
function isValidVietnameseName(name) {
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]{2,50}$/;
    return nameRegex.test(name?.trim());
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email?.trim().toLowerCase());
}

function isValidVietnamesePhone(phone) {
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    const cleanPhone = phone?.trim().replace(/\s+/g, '');
    return phoneRegex.test(cleanPhone);
}

function isMinimumAge(birthdate, minAge = 16) {
    if (!birthdate) return false;
    
    const birthDate = new Date(birthdate);
    const today = new Date();
    
    if (isNaN(birthDate.getTime())) return false;
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= minAge;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const submitBtn = document.getElementById('submitBtn');

    function validateAll() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const birthdate = document.getElementById('birthdate').value;
        const phone = document.getElementById('phone').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        if (!isValidVietnameseName(name)) {
            alert('Vui lòng nhập lại tên (2-50 ký tự, chữ cái hoặc khoảng trắng)');
            return false;
        }
        
        if (!isValidEmail(email)) {
            alert('Vui lòng nhập email hợp lệ');
            return false;
        }
        
        if (!birthdate || !isMinimumAge(birthdate)) {
            alert('Bạn phải trên 16 tuổi');
            return false;
        }
        
        if (!isValidVietnamesePhone(phone)) {
            alert('Vui lòng nhập đúng số điện thoại Việt Nam');
            return false;
        }
        
        if (!agreeTerms) {
            alert('Bạn cần đồng ý điều khoản để tiếp tục');
            return false;
        }
        
        return true;
    }

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateAll()) {
            alert('Đăng ký thành công!');

            form.reset();

            const modal = bootstrap.Modal.getInstance(document.getElementById('JoinModal'));
            modal.hide();
        }
    });
});

// SLIDE

const track = document.querySelector('.slideshow');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const slideWidth = slides[0].offsetWidth;
const visibleSlides = 2;
let currentIndex = 0;

function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex > slides.length - visibleSlides) {
        currentIndex = 0;
    }
    updateSlidePosition();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - visibleSlides;
    }
    updateSlidePosition();
});