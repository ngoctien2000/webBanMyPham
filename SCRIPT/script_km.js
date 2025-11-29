// =============================================
// SCRIPT TINH GỌN - TRANG DANH SÁCH SẢN PHẨM
// Dùng cho: SanPhamBanChay.html & SanPhamKhuyenMai.html
// =============================================

// Khởi động
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initProductFiltersAndSorting();
    initViewDetailButtons();
});

// =============================================
// 1. NAVIGATION (menu sản phẩm)
// =============================================
function initNavigation() {
    const productMenu = document.getElementById("productMenu");
    if (productMenu) {
        productMenu.addEventListener("change", function () {
            if (this.value && this.value !== "#") {
                window.location.href = this.value;
            }
        });
    }
}

// =============================================
// 2. XỬ LÝ NÚT "XEM CHI TIẾT"
// =============================================
function initViewDetailButtons() {
    const cartButtons = document.querySelectorAll(".add-to-cart[data-product]");
    cartButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.product;
            if (id) {
                window.location.href = `product.html?product=${encodeURIComponent(id)}`;
            }
        });
    });
}

// =============================================
// 3. BỘ LỌC & SẮP XẾP
// =============================================
function initProductFiltersAndSorting() {
    ["brand", "price", "category", "rating", "shipping"].forEach((name) => {
        document
            .querySelectorAll(`input[name="${name}"]`)
            .forEach((input) => input.addEventListener("change", applyFiltersAndSort));
    });

    document
        .querySelectorAll('input[name="sort"]')
        .forEach((radio) => radio.addEventListener("change", applyFiltersAndSort));
}

function applyFiltersAndSort() {
    const selectedBrands = getSelectedValues("brand");
    const selectedPrices = getSelectedValues("price");
    const selectedCategories = getSelectedValues("category");
    const selectedRatings = getSelectedValues("rating");
    const selectedShipping = getSelectedValues("shipping");

    const sortValue =
        document.querySelector('input[name="sort"]:checked')?.value || "bestseller";

    const productGrid = document.querySelector(".product-grid");
    const products = Array.from(productGrid.querySelectorAll(".product-card"));
    let visibleCount = 0;

    const visibleProducts = products.filter((card) => {
        const brand = card.dataset.brand;
        const category = card.dataset.category;
        const price = parseInt(card.dataset.price);
        const rating = parseInt(card.dataset.rating);
        const shipping = card.dataset.shipping;

        const matchesBrand =
            selectedBrands.length === 0 || selectedBrands.includes(brand);
        const matchesPrice =
            selectedPrices.length === 0 ||
            selectedPrices.some((r) => isInPriceRange(price, r));
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(category);
        const matchesRating =
            selectedRatings.length === 0 ||
            selectedRatings.some((r) => rating === parseInt(r));
        const matchesShipping =
            selectedShipping.length === 0 || selectedShipping.includes(shipping);

        const isVisible =
            matchesBrand &&
            matchesPrice &&
            matchesCategory &&
            matchesRating &&
            matchesShipping;

        card.style.display = isVisible ? "block" : "none";

        if (isVisible) visibleCount++;
        return isVisible;
    });

    updateProductCount(visibleCount);

    // Sắp xếp kết quả hiển thị
    visibleProducts.sort((a, b) => {
        switch (sortValue) {
            case "popular":
                return getRatingCount(b) - getRatingCount(a);
            case "bestseller":
                return getSoldCount(b) - getSoldCount(a);
            case "price-low":
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case "price-high":
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case "name":
                return a
                    .querySelector("h3")
                    .textContent.localeCompare(b.querySelector("h3").textContent);
            default:
                return 0;
        }
    });

    visibleProducts.forEach((p) => productGrid.appendChild(p));
}

function getSelectedValues(name) {
    return Array.from(
        document.querySelectorAll(`input[name="${name}"]:checked`)
    ).map((i) => i.value);
}

// Kiểm tra giá
function isInPriceRange(price, range) {
    switch (range) {
        case "under100":
            return price < 100000;
        case "100-200":
            return price >= 100000 && price <= 200000;
        case "300-500":
            return price >= 300000 && price <= 500000;
        case "500-900":
            return price >= 500000 && price <= 900000;
        case "over1000":
            return price > 1000000;
        default:
            return true;
    }
}

// =============================================
// 4. CẬP NHẬT SỐ LƯỢNG HIỂN THỊ
// =============================================
function updateProductCount(count) {
    const el = document.querySelector(".result-count");
    if (el) el.textContent = `Hiển thị ${count} sản phẩm`;
}

// =============================================
// 5. HỖ TRỢ SẮP XẾP
// =============================================
function getSoldCount(card) {
    const soldText = card.querySelector(".sold-count")?.textContent || "";
    const match = soldText.match(/([\d\.]+)(k?)/i);
    if (!match) return 0;
    let num = parseFloat(match[1]);
    if (match[2]?.toLowerCase() === "k") num *= 1000;
    return num;
}

function getRatingCount(card) {
    const ratingEl = card.querySelector(".rating-count");
    const match = ratingEl?.textContent.match(/\((\d+)/);
    return match ? parseInt(match[1]) : 0;
}
