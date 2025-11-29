/* script.js - dùng chung cho index.html & product.html */

/* --- Dữ liệu mẫu (nội bộ) --- 
   Nếu bạn muốn lấy từ DB thì thay logic này bằng fetch/AJAX. */
const PRODUCTS = {
  son: {
    id: "son",
    name: "Son môi cao cấp",
    price: "250,000đ",
    img: "IMG/son.jpg",
    color: "Đỏ Ruby",
    desc: "Son môi cao cấp giữ màu lâu, dưỡng ẩm và an toàn cho làn môi nhạy cảm. Thiết kế sang trọng, phù hợp cho mọi phong cách.",
  },
  kem: {
    id: "kem",
    name: "Kem dưỡng da",
    price: "350,000đ",
    img: "IMG/kem-duong.jpg",
    color: "Trắng kem",
    desc: "Kem dưỡng da giúp cấp ẩm sâu, làm mềm da và sáng nhẹ.",
  },
  sua: {
    id: "sua",
    name: "Sữa rửa mặt",
    price: "180,000đ",
    img: "IMG/sua-rua-mat.jpg",
    color: "N/A",
    desc: "Sữa rửa mặt làm sạch sâu, dịu nhẹ cho da nhạy cảm.",
  },
  nuochoa: {
    id: "nuochoa",
    name: "Nước hoa",
    price: "1,200,000đ",
    img: "IMG/nuoc-hoa.jpg",
    color: "Nhiều hương",
    desc: "Nước hoa hương lâu, quyến rũ, dành cho dịp đặc biệt.",
  },
};

/* ========== Helper: đọc query param ========== */
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

/* ========== Header search behavior ========== */
document.addEventListener("DOMContentLoaded", () => {
  const headerSearch = document.getElementById("header-search");
  const headerBtn = document.getElementById("header-search-btn");

  // nếu URL có ?search=... thì gán vào ô tìm để người dùng thấy
  const q = getQueryParam("search");
  if (q && headerSearch) headerSearch.value = decodeURIComponent(q);

  if (headerBtn && headerSearch) {
    headerBtn.addEventListener("click", () => {
      const keyword = headerSearch.value.trim();
      // redirect về index với query param -> index sẽ filter
      window.location.href = `index.html${
        keyword ? "?search=" + encodeURIComponent(keyword) : ""
      }`;
    });
  }

  // Page-specific initialization
  if (document.body.contains(document.getElementById("product-list"))) {
    initIndexPage();
  }

  if (document.body.contains(document.getElementById("detail-box"))) {
    initProductPage();
  }
});

/* ========== Index page: filter products by search param or live ========== */
function initIndexPage() {
  const list = document.getElementById("product-list");
  const searchParam = getQueryParam("search");
  if (searchParam) {
    filterIndex(searchParam);
  }

  // allow live filtering if user types in header and presses Enter
  const headerInput = document.getElementById("header-search");
  if (headerInput) {
    headerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const kw = headerInput.value.trim();
        filterIndex(kw);
      }
    });
  }
}

function filterIndex(keyword) {
  const cards = document.querySelectorAll(".product-card");
  const k = (keyword || "").toLowerCase();
  cards.forEach((card) => {
    const name = (card.dataset.name || "").toLowerCase();
    if (!k || name.includes(k)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

/* ========== Product page: render details from URL param ========== */
function initProductPage() {
  const prodId = getQueryParam("product");
  const detailName = document.getElementById("detail-name");
  const detailImg = document.getElementById("detail-img");
  const detailPrice = document.getElementById("detail-price");
  const detailColor = document.getElementById("detail-color");
  const detailDesc = document.getElementById("detail-desc");
  const relatedList = document.getElementById("related-list");

  let product = PRODUCTS[prodId] || PRODUCTS["son"]; // default son nếu không có param

  // populate info
  if (detailName) detailName.textContent = product.name;
  if (detailImg) {
    detailImg.src = product.img;
    detailImg.onerror = () =>
      (detailImg.src = "https://via.placeholder.com/300x300");
  }
  if (detailPrice) detailPrice.textContent = product.price;
  if (detailColor) detailColor.textContent = product.color;
  if (detailDesc) detailDesc.textContent = product.desc;

  // related products: list others
  if (relatedList) {
    relatedList.innerHTML = "";
    Object.values(PRODUCTS).forEach((p) => {
      if (p.id !== product.id) {
        const node = document.createElement("div");
        node.className = "related-item";
        node.innerHTML = `
          <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/100'">
          <h4>${p.name}</h4>
          <p class="price">${p.price}</p>
          <a class="btn" href="product.html?product=${p.id}">Xem chi tiết</a>
        `;
        relatedList.appendChild(node);
      }
    });
  }

  // add to cart / buy now behavior
  const addBtn = document.getElementById("add-to-cart");
  const buyBtn = document.getElementById("buy-now");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const qty = Number(document.getElementById("qty").value || 1);
      alert(`Đã thêm ${qty} x ${product.name} vào giỏ hàng!`);
    });
  }
  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      alert(`Cảm ơn bạn đã mua ${product.name} `);
    });
  }
}
