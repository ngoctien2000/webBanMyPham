// =============================================
// WEBSITE BÁN MỸ PHẨM - THE REAL AURA
// Full JavaScript Functionality
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Khởi tạo website
function initializeWebsite() {
    initSearchFunctionality();
    initCartFunctionality();
    initProductFilters();
    initSortingFunctionality();
    initNavigation();
    initProductInteractions();
    initImageZoom();
    initQuantityControls();
    initMobileMenu();
    initScrollEffects();
    initFormValidations();
}

// =============================================
// 1. CHỨC NĂNG TÌM KIẾM
// =============================================
function initSearchFunctionality() {
    const searchButton = document.getElementById('nutTim');
    const searchInput = document.getElementById('text');
    
    if (searchButton && searchInput) {
        // Click search button
        searchButton.addEventListener('click', handleSearch);
        
        // Enter key search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Real-time search suggestions
        searchInput.addEventListener('input', function() {
            showSearchSuggestions(this.value);
        });
    }
}

function handleSearch() {
    const searchTerm = document.getElementById('text').value.trim();
    
    if (searchTerm === '') {
        showNotification('Vui lòng nhập từ khóa tìm kiếm', 'warning');
        return;
    }
    
    // Hiệu ứng loading
    const searchBtn = document.getElementById('nutTim');
    const originalText = searchBtn.textContent;
    searchBtn.textContent = 'Đang tìm...';
    searchBtn.disabled = true;
    
    // Giả lập tìm kiếm (thực tế sẽ gọi API)
    setTimeout(() => {
        searchBtn.textContent = originalText;
        searchBtn.disabled = false;
        
        // Lưu lịch sử tìm kiếm
        saveSearchHistory(searchTerm);
        
        // Chuyển hướng hoặc hiển thị kết quả
        if (window.location.pathname.includes('san-pham')) {
            filterProductsBySearch(searchTerm);
        } else {
            window.location.href = `san-pham.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }, 1000);
}

function showSearchSuggestions(term) {
    if (term.length < 2) {
        hideSearchSuggestions();
        return;
    }
    
    const suggestions = getSearchSuggestions(term);
    displaySearchSuggestions(suggestions);
}

function getSearchSuggestions(term) {
    // Danh sách gợi ý (thực tế sẽ lấy từ API)
    const allSuggestions = [
        'Kem chống nắng', 'Serum vitamin C', 'Kem dưỡng ẩm', 
        'Son môi lì', 'Nước hoa', 'Mặt nạ', 'Toner', 'Sữa rửa mặt',
        'Kem nền', 'Phấn mắt', 'Kem trị mụn', 'Dầu gội', 'Dầu xả'
    ];
    
    return allSuggestions.filter(item => 
        item.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5);
}

function displaySearchSuggestions(suggestions) {
    let suggestionsBox = document.getElementById('search-suggestions');
    
    if (!suggestionsBox) {
        suggestionsBox = document.createElement('div');
        suggestionsBox.id = 'search-suggestions';
        suggestionsBox.className = 'search-suggestions';
        document.getElementById('text').parentNode.appendChild(suggestionsBox);
    }
    
    if (suggestions.length === 0) {
        suggestionsBox.innerHTML = '<div class="suggestion-item">Không tìm thấy kết quả</div>';
    } else {
        suggestionsBox.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`
        ).join('');
    }
    
    suggestionsBox.style.display = 'block';
}

function hideSearchSuggestions() {
    const suggestionsBox = document.getElementById('search-suggestions');
    if (suggestionsBox) {
        suggestionsBox.style.display = 'none';
    }
}

function selectSuggestion(suggestion) {
    document.getElementById('text').value = suggestion;
    hideSearchSuggestions();
    handleSearch();
}

function saveSearchHistory(term) {
    let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    history = history.filter(item => item !== term);
    history.unshift(term);
    history = history.slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

function filterProductsBySearch(term) {
    const productCards = document.querySelectorAll('.product-card');
    let foundCount = 0;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const isVisible = productName.includes(term.toLowerCase());
        
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) foundCount++;
    });
    
    // Hiển thị kết quả
    const resultInfo = document.querySelector('.result-count');
    if (resultInfo) {
        resultInfo.textContent = `Tìm thấy ${foundCount} sản phẩm cho "${term}"`;
    }
}

// =============================================
// 2. GIỎ HÀNG
// =============================================
function initCartFunctionality() {
    updateCartCount();
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productElement) {
    const productCard = productElement.closest('.product-card');
    const productInfo = extractProductInfo(productCard);
    
    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingItemIndex = cart.findIndex(item => item.id === productInfo.id);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({...productInfo, quantity: 1});
    }
    
    // Lưu vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Hiệu ứng
    showAddToCartAnimation(productElement);
    updateCartCount();
    showNotification(`Đã thêm ${productInfo.name} vào giỏ hàng`, 'success');
}

function extractProductInfo(productCard) {
    return {
        id: generateProductId(productCard),
        name: productCard.querySelector('h3').textContent,
        price: parseInt(productCard.querySelector('.new-price').textContent.replace(/[^\d]/g, '')),
        oldPrice: productCard.querySelector('.old-price') ? 
                 parseInt(productCard.querySelector('.old-price').textContent.replace(/[^\d]/g, '')) : null,
        image: productCard.querySelector('img').src,
        rating: productCard.querySelector('.rating') ? 
               productCard.querySelector('.rating').textContent : null
    };
}

function generateProductId(productCard) {
    return 'product_' + Math.random().toString(36).substr(2, 9);
}

function showAddToCartAnimation(button) {
    button.textContent = 'Đã thêm ✓';
    button.style.background = '#28a745';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Thêm vào giỏ';
        button.style.background = '';
        button.disabled = false;
    }, 2000);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ============================
// KHI NHẤN "THÊM VÀO GIỎ" -> CHUYỂN ĐẾN CHI TIẾT
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".add-to-cart[data-product]");
  cartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.product;
      if (id) {
        window.location.href = `product.html?product=${encodeURIComponent(id)}`;
      }
    });
  });
});
/// =============================================
// 3. BỘ LỌC VÀ SẮP XẾP
// =============================================
function initProductFiltersAndSorting() {
    ['brand','price','category','rating','shipping'].forEach(name => {
        document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
            input.addEventListener('change', applyFiltersAndSort);
        });
    });
    
    document.querySelectorAll('input[name="sort"]').forEach(radio => {
        radio.addEventListener('change', applyFiltersAndSort);
    });
}

function applyFiltersAndSort() {
    const selectedBrands = getSelectedValues('brand');
    const selectedPrices = getSelectedValues('price');
    const selectedCategories = getSelectedValues('category');
    const selectedRatings = getSelectedValues('rating');
    const selectedShipping = getSelectedValues('shipping');
    const sortValue = document.querySelector('input[name="sort"]:checked')?.value || 'bestseller';
    
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.querySelectorAll('.product-card'));
    let visibleCount = 0;
    
    const visibleProducts = products.filter(card => {
        const brand = card.dataset.brand;
        const category = card.dataset.category;
        const price = parseInt(card.dataset.price);
        const rating = parseInt(card.dataset.rating);
        const shipping = card.dataset.shipping;
        
        const matchesBrand = selectedBrands.length===0 || selectedBrands.includes(brand);
        const matchesPrice = selectedPrices.length===0 || selectedPrices.some(r => isInPriceRange(price,r));
        const matchesCategory = selectedCategories.length===0 || selectedCategories.includes(category);
        const matchesRating = selectedRatings.length===0 || selectedRatings.some(r=>rating===parseInt(r));
        const matchesShipping = selectedShipping.length===0 || selectedShipping.includes(shipping);
        
        const isVisible = matchesBrand && matchesPrice && matchesCategory && matchesRating && matchesShipping;
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
        return isVisible;
    });
    
    updateProductCount(visibleCount);
    
    visibleProducts.sort((a,b) => {
        switch(sortValue) {
            case 'popular': return getRatingCount(b) - getRatingCount(a);
            case 'bestseller': return getSoldCount(b) - getSoldCount(a);
            case 'price-low': return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high': return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'name': return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            default: return 0;
        }
    });
    
    visibleProducts.forEach(p=>productGrid.appendChild(p));
}

function getSelectedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i=>i.value);
}

function isInPriceRange(price, range) {
    switch(range){
        case 'under100': return price<100000;
        case '100-200': return price>=100000 && price<=200000;
        case '300-500': return price>=300000 && price<=500000;
        case '500-900': return price>=500000 && price<=900000;
        case 'over1000': return price>1000000;
        default: return true;
    }
}
//cập nhật số sản phẩm hiển thị
function updateProductCount(count) {
    const el = document.querySelector('.result-count');
    if (el) el.textContent = `Hiển thị ${count} sản phẩm`;
}


// Số đã bán (convert "1.2k" -> 1200)
function getSoldCount(card) {
    const soldText = card.querySelector('.sold-count')?.textContent || '';
    const match = soldText.match(/([\d\.]+)(k?)/i);
    if (!match) return 0;
    let num = parseFloat(match[1]);
    if (match[2].toLowerCase() === 'k') num *= 1000;
    return num;
}

// Số đánh giá
function getRatingCount(card) {
    const ratingEl = card.querySelector('.rating-count');
    const match = ratingEl?.textContent.match(/\((\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Khởi tạo khi load
initProductFiltersAndSorting();



// =============================================
// 4. ĐIỀU HƯỚNG & MENU
// =============================================
function initNavigation() {
    // Dropdown menu sản phẩm
    const productMenu = document.getElementById('productMenu');
    if (productMenu) {
        productMenu.addEventListener('change', function() {
            if (this.value && this.value !== '#') {
                window.location.href = this.value;
            }
        });
    }
    
    // Smooth scroll cho internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =============================================
// 5. TƯƠNG TÁC SẢN PHẨM
// =============================================
function initProductInteractions() {
    // Thêm sự kiện click cho tất cả nút "Thêm vào giỏ"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(e.target);
        }
    });
    
    // Yêu thích sản phẩm
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('wishlist-btn')) {
            toggleWishlist(e.target);
        }
    });
}

function toggleWishlist(button) {
    const productCard = button.closest('.product-card');
    const productId = generateProductId(productCard);
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
        wishlist = wishlist.filter(id => id !== productId);
        button.textContent = '🤍';
        showNotification('Đã xóa khỏi danh sách yêu thích', 'info');
    } else {
        wishlist.push(productId);
        button.textContent = '❤️';
        showNotification('Đã thêm vào danh sách yêu thích', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// =============================================
// 6. ZOOM ẢNH SẢN PHẨM
// =============================================
function initImageZoom() {
    document.querySelectorAll('.product-card img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Click để xem ảnh lớn
        img.addEventListener('click', function() {
            showImageModal(this.src, this.alt);
        });
    });
}

function showImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${src}" alt="${alt}">
            <p>${alt}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Đóng modal
    modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// =============================================
// 7. ĐIỀU KHIỂN SỐ LƯỢNG
// =============================================
function initQuantityControls() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const input = e.target.parentNode.querySelector('.quantity-input');
            if (e.target.classList.contains('decrease')) {
                input.value = Math.max(1, parseInt(input.value) - 1);
            } else if (e.target.classList.contains('increase')) {
                input.value = parseInt(input.value) + 1;
            }
            updateQuantityPrice(input);
        }
    });
}

function updateQuantityPrice(input) {
    const productCard = input.closest('.product-card');
    const pricePerUnit = parseInt(productCard.querySelector('.new-price').textContent.replace(/[^\d]/g, ''));
    const totalPrice = pricePerUnit * parseInt(input.value);
    
    // Cập nhật hiển thị tổng giá (nếu có)
    const totalElement = productCard.querySelector('.total-price');
    if (totalElement) {
        totalElement.textContent = formatPrice(totalPrice);
    }
}

// =============================================
// 8. MENU MOBILE
// =============================================
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    
    const nav = document.querySelector('.thanhbar');
    nav.parentNode.insertBefore(menuToggle, nav);
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-active');
    });
    
    // Ẩn/hiện menu toggle theo kích thước màn hình
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            nav.classList.remove('mobile-active');
        } else {
            menuToggle.style.display = 'none';
            nav.classList.remove('mobile-active');
        }
    });
    
    // Khởi tạo ban đầu
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
    }
}

// =============================================
// 9. HIỆU ỨNG SCROLL
// =============================================
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.title');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ẩn/hiện header khi scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Hiệu ứng xuất hiện khi scroll
        animateOnScroll();
    });
}

function animateOnScroll() {
    document.querySelectorAll('.product-card').forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// =============================================
// 10. VALIDATION FORM
// =============================================
function initFormValidations() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showInputError(input, 'Trường này là bắt buộc');
            isValid = false;
        } else {
            clearInputError(input);
        }
        
        // Validation email
        if (input.type === 'email' && input.value) {
            if (!isValidEmail(input.value)) {
                showInputError(input, 'Email không hợp lệ');
                isValid = false;
            }
        }
        
        // Validation phone
        if (input.type === 'tel' && input.value) {
            if (!isValidPhone(input.value)) {
                showInputError(input, 'Số điện thoại không hợp lệ');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[0-9]{10,11}$/.test(phone.replace(/\s/g, ''));
}

function showInputError(input, message) {
    clearInputError(input);
    input.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    input.style.borderColor = '';
    const existingError = input.parentNode.querySelector('.input-error');
    if (existingError) {
        existingError.remove();
    }
}

// =============================================
// 11. UTILITY FUNCTIONS
// =============================================
function showNotification(message, type = 'info') {
    // Tạo notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentNode.remove()">&times;</button>
    `;
    
    // Thêm styles nếu chưa có
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                z-index: 1000;
                max-width: 300px;
                animation: slideIn 0.3s ease;
            }
            .notification-success { background: #28a745; }
            .notification-warning { background: #ffc107; color: #000; }
            .notification-error { background: #dc3545; }
            .notification-info { background: #17a2b8; }
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// =============================================
// 12. XỬ LÝ TRANG HIỆN TẠI
// =============================================
function handleCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'trang-chu.html':
            initHomePage();
            break;
        case 'san-pham-ban-chay.html':
            initProductsPage();
            break;
        case 'san-pham-uu-dai.html':
            initPromotionPage();
            break;
        case 'gioi-thieu.html':
            initAboutPage();
            break;
        case 'lien-he.html':
            initContactPage();
            break;
    }
    
    // Xử lý query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        document.getElementById('text').value = searchTerm;
        filterProductsBySearch(searchTerm);
    }
}

function initHomePage() {
    // Khởi tạo slider hoặc banner
    console.log('Initializing home page...');
}

function initProductsPage() {
    // Sắp xếp mặc định cho trang sản phẩm
    sortProducts('bestseller');
}

function initPromotionPage() {
    // Highlight sản phẩm khuyến mãi
    console.log('Initializing promotion page...');
}

// Gọi hàm xử lý trang hiện tại
handleCurrentPage();

// =============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// =============================================
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.showImageModal = showImageModal;
window.selectSuggestion = selectSuggestion;
window.sortProducts = sortProducts;