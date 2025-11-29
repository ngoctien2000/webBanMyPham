/******************************************
 * script.js — đầy đủ 18 sản phẩm
 * - Đường ảnh dùng ../IMG/ (vì index.html nằm trong HTML/)
 * - Query param: product (ví dụ product.html?product=dior999)
 * - Giữ nguyên các ID trong HTML
 * - Thêm: mỗi sản phẩm có số lượng đánh giá khác nhau (rating)
 ******************************************/

/* ========== DỮ LIỆU SẢN PHẨM (18 items) ========== */
const PRODUCTS = [
  {
    id: "dior999",
    name: "Son Dior 999 Velvet Mini Màu Đỏ Tươi",
    type: "Son môi",
    brand: "Dior",
    price: "499,000đ",
    img: "../IMG/son_dior999.jpg",
    color: "Đỏ tươi",
    desc: "Son Dior 999 Velvet Mini – chất son lì mềm mịn, lên màu chuẩn, giữ màu lâu.",
    rating: 153,
  },
  {
    id: "matna_klairs_vitaminE",
    name: "Mặt Nạ Klairs Freshly Juiced Vitamin E Mask 90ml",
    type: "Mặt nạ",
    brand: "Klairs",
    price: "500,000đ",
    img: "../IMG/matna_klairs_vitaminE.jpg",
    color: "Trắng sữa",
    desc: "Mặt nạ ngủ giúp phục hồi và cấp ẩm sâu cho da khô, chứa Vitamin E.",
    rating: 87,
  },
  {
    id: "toner_klairs_180ml",
    name: "Nước hoa hồng Klairs không mùi 180ml",
    type: "Toner",
    brand: "Klairs",
    price: "250,000đ",
    img: "../IMG/toner_klairs_180ml.jpg",
    color: "Trong suốt",
    desc: "Toner dịu nhẹ, cân bằng pH và cấp ẩm cho da nhạy cảm.",
    rating: 105,
  },
  {
    id: "serum_loreal_hyaluronic",
    name: "Serum L'Oreal Hyaluronic Acid 30ml",
    type: "Serum",
    brand: "L'Oreal",
    price: "296,000đ",
    img: "../IMG/serum_loreal_hyaluronic.jpg",
    color: "Trong suốt",
    desc: "Serum cấp ẩm, làm đầy nếp nhăn và cải thiện độ đàn hồi cho da.",
    rating: 214,
  },
  {
    id: "kemchongnang_cocoon_bidao",
    name: "Kem Chống Nắng Cocoon Bí Đao",
    type: "Kem chống nắng",
    brand: "Cocoon",
    price: "400,000đ",
    img: "../IMG/kemchongnang_cocoon_bidao.jpg",
    color: "Trắng nhẹ",
    desc: "Kem chống nắng phổ rộng, nhẹ dịu, phù hợp da nhạy cảm, không nhờn rít.",
    rating: 92,
  },
  {
    id: "serum_goodndoc_hydra",
    name: "Serum Goodndoc Hydra B5 30ml",
    type: "Serum",
    brand: "Goodndoc",
    price: "349,000đ",
    img: "../IMG/serum_goodndoc_hydra.jpg",
    color: "Trong suốt",
    desc: "Serum chứa B5 giúp phục hồi hàng rào ẩm và tăng độ đàn hồi cho da.",
    rating: 176,
  },
  {
    id: "nuochoa_ysl_blackopium",
    name: "Nước Hoa Nữ YSL Black Opium EDP 90ml",
    type: "Nước hoa",
    brand: "YSL",
    price: "2,180,000đ",
    img: "../IMG/nuochoa_ysl_blackopium.jpg",
    color: "Nhiều hương",
    desc: "Hương thơm ngọt ngào, ấm áp, phù hợp cho buổi tối và dịp đặc biệt.",
    rating: 263,
  },
  {
    id: "nuochoa_chanel_coco",
    name: "Nước Hoa Nữ Chanel Coco Mademoiselle EDP",
    type: "Nước hoa",
    brand: "Chanel",
    price: "2,690,000đ",
    img: "../IMG/nuochoa_chanel_coco.jpg",
    color: "Hương hoa",
    desc: "Hương thơm thanh lịch, nữ tính và sang trọng.",
    rating: 315,
  },
  {
    id: "kemnen_ysl_toucheEclat",
    name: "Kem Nền YSL Touche Eclat Le Teint Creme 25ml",
    type: "Kem nền",
    brand: "YSL",
    price: "1,120,000đ",
    img: "../IMG/kemnen_ysl_toucheEclat.jpg",
    color: "Tông sáng tự nhiên",
    desc: "Kem nền mỏng nhẹ, che phủ tự nhiên, tạo lớp nền rạng rỡ.",
    rating: 198,
  },
  {
    id: "kemmat_ahc_realeye",
    name: "Kem Mắt AHC Real Eye Cream",
    type: "Kem dưỡng",
    brand: "AHC",
    price: "450,000đ",
    img: "../IMG/kemmat_ahc_realeye.jpg",
    color: "Trắng kem",
    desc: "Kem mắt dưỡng ẩm, giảm quầng thâm và bọng mắt.",
    rating: 134,
  },
  {
    id: "kemtaydachet_dove_smoothie",
    name: "Tẩy Da Chết Dove Smoothie",
    type: "Tẩy da chết",
    brand: "Dove",
    price: "220,000đ",
    img: "../IMG/kemtaydachet_dove_smoothie.jpg",
    color: "Hồng nhẹ",
    desc: "Tẩy da chết dịu nhẹ, để lại làn da mềm mịn.",
    rating: 78,
  },
  {
    id: "kemduong_estee_nightrepair",
    name: "Estee Lauder Advanced Night Repair 15ml",
    type: "Kem dưỡng",
    brand: "Estee Lauder",
    price: "320,000đ",
    img: "../IMG/kemduong_estee_nightrepair.jpg",
    color: "Nâu vàng",
    desc: "Tinh chất phục hồi ban đêm, chống lão hoá, cải thiện kết cấu da.",
    rating: 205,
  },
  {
    id: "kemnen_estee_doublewear",
    name: "Kem Nền Estee Lauder Double Wear",
    type: "Kem nền",
    brand: "Estee Lauder",
    price: "1,270,000đ",
    img: "../IMG/kemnen_estee_doublewear.jpg",
    color: "Nhiều tông",
    desc: "Kem nền lâu trôi, bám tốt, độ che phủ cao.",
    rating: 190,
  },
  {
    id: "kemduong_olay_lightperfecting",
    name: "Kem Dưỡng Olay Light Perfecting",
    type: "Kem dưỡng",
    brand: "Olay",
    price: "560,000đ",
    img: "../IMG/kemduong_olay_lightperfecting.jpg",
    color: "Trắng kem",
    desc: "Dưỡng sáng & cấp ẩm, dùng ban ngày.",
    rating: 230,
  },
  {
    id: "kemduong_olay_total7",
    name: "Olay Total Effects 7 in 1",
    type: "Kem dưỡng",
    brand: "Olay",
    price: "480,000đ",
    img: "../IMG/kemduong_olay_total7.jpg",
    color: "Trắng",
    desc: "Kem chống lão hóa đa tác dụng: dưỡng ẩm, mờ nếp nhăn, chống oxy hóa.",
    rating: 176,
  },
  {
    id: "serum_olay_antiaging",
    name: "Serum Olay Chống Lão Hóa",
    type: "Serum",
    brand: "Olay",
    price: "620,000đ",
    img: "../IMG/serum_olay_antiaging.jpg",
    color: "Trong suốt",
    desc: "Serum phục hồi và cải thiện độ đàn hồi da.",
    rating: 199,
  },
  {
    id: "nuoctaytrang_loreal_micellar",
    name: "Nước Tẩy Trang L'Oreal Micellar",
    type: "Tẩy trang",
    brand: "L'Oreal",
    price: "210,000đ",
    img: "../IMG/nuoctaytrang_loreal_micellar.jpg",
    color: "Trong suốt",
    desc: "Nước tẩy trang 3-in-1: tẩy sạch, làm dịu, cấp ẩm nhẹ.",
    rating: 84,
  },
  {
    id: "kemchongnang_loreal_uvdefender",
    name: "Kem Chống Nắng L'Oreal UV Defender SPF50+",
    type: "Kem chống nắng",
    brand: "L'Oreal",
    price: "350,000đ",
    img: "../IMG/kemchongnang_loreal_uvdefender.jpg",
    color: "Trong suốt",
    desc: "Chống nắng SPF50+, dạng serum, thấm nhanh, không bết dính.",
    rating: 165,
  },
];

/* ========== Helper: đọc query param ========== */
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

/* ========== INIT: DOMContentLoaded ========== */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("product-list")) {
    renderProducts("all");
    setupCategoryButtons();
    const q = getQueryParam("search");
    if (q) applySearch(q);
  }

  if (document.getElementById("detail-box")) {
    renderProductDetail();
  }

  const headerSearch = document.getElementById("header-search");
  const headerBtn = document.getElementById("header-search-btn");
  if (headerBtn && headerSearch) {
    headerBtn.addEventListener("click", () => {
      const kw = headerSearch.value.trim();
      window.location.href = `index.html${
        kw ? "?search=" + encodeURIComponent(kw) : ""
      }`;
    });
    headerSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const kw = headerSearch.value.trim();
        window.location.href = `index.html${
          kw ? "?search=" + encodeURIComponent(kw) : ""
        }`;
      }
    });
  }
});

/* ========== RENDER PRODUCTS ========== */
function renderProducts(category = "all", searchKeyword = "") {
  const container = document.getElementById("product-list");
  if (!container) return;

  const searchLower = (searchKeyword || "").toLowerCase();

  const list = PRODUCTS.filter((p) => {
    const matchCategory = category === "all" ? true : p.type === category;
    const matchSearch =
      !searchLower ||
      p.name.toLowerCase().includes(searchLower) ||
      (p.brand && p.brand.toLowerCase().includes(searchLower));
    return matchCategory && matchSearch;
  });

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    return;
  }

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = p.id;
    card.dataset.name = p.name;

    card.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(
      p.name
    )}" onerror="this.src='https://via.placeholder.com/300x200'">
      <h3>${escapeHtml(p.name)}</h3>
      <p class="price">${p.price}</p>
      <a class="btn detail" href="product.html?product=${encodeURIComponent(
        p.id
      )}">Xem chi tiết</a>
    `;
    container.appendChild(card);
  });
}

/* ========== setup category buttons ========== */
function setupCategoryButtons() {
  const buttons = document.querySelectorAll(".category-filter button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.textContent.trim();
      if (text === "Tất cả") renderProducts("all");
      else renderProducts(text);
      const list = document.getElementById("product-list");
      if (list) list.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ========== search apply ========== */
function applySearch(keyword) {
  renderProducts("all", keyword);
  const headerInput = document.getElementById("header-search");
  if (headerInput) headerInput.value = decodeURIComponent(keyword);
}

/* ========== PRODUCT DETAIL PAGE ========== */
function renderProductDetail() {
  const prodId = getQueryParam("product");
  const product = PRODUCTS.find((p) => p.id === prodId);

  if (!product) {
    if (PRODUCTS.length > 0) {
      window.history.replaceState(
        {},
        "",
        `product.html?product=${PRODUCTS[0].id}`
      );
      return renderProductDetail();
    }
    return;
  }

  const detailName = document.getElementById("detail-name");
  const detailImg = document.getElementById("detail-img");
  const detailPrice = document.getElementById("detail-price");
  const detailColor = document.getElementById("detail-color");
  const detailDesc = document.getElementById("detail-desc");
  const detailRating = document.getElementById("detail-rating"); // 🆕 thêm

  if (detailName) detailName.textContent = product.name;
  if (detailImg) {
    detailImg.src = product.img;
    detailImg.onerror = () =>
      (detailImg.src = "https://via.placeholder.com/300x300");
  }
  if (detailPrice) detailPrice.textContent = product.price;
  if (detailColor) detailColor.textContent = product.color || "-";
  if (detailDesc) detailDesc.textContent = product.desc;
  if (detailRating)
    detailRating.textContent = `⭐⭐⭐⭐⭐ (${product.rating} đánh giá)`; // 🆕 hiển thị số đánh giá

  const relatedList = document.getElementById("related-list");
  if (relatedList) {
    relatedList.innerHTML = "";
    const related = PRODUCTS.filter(
      (p) => p.type === product.type && p.id !== product.id
    ).slice(0, 6);
    related.forEach((p) => {
      const node = document.createElement("div");
      node.className = "related-item";
      node.innerHTML = `
        <img src="${p.img}" alt="${escapeHtml(
        p.name
      )}" onerror="this.src='https://via.placeholder.com/100'">
        <h4>${escapeHtml(p.name)}</h4>
        <p class="price">${p.price}</p>
        <a class="btn" href="product.html?product=${encodeURIComponent(
          p.id
        )}">Xem chi tiết</a>
      `;
      relatedList.appendChild(node);
    });
  }

  const addBtn = document.getElementById("add-to-cart");
  const buyBtn = document.getElementById("buy-now");
  if (addBtn) {
    addBtn.onclick = () => {
      const qty = Number(document.getElementById("qty").value || 1);
      alert(`Đã thêm ${qty} x ${product.name} vào giỏ hàng!`);
    };
  }
  if (buyBtn) {
    buyBtn.onclick = () => {
      alert(`Cảm ơn bạn đã mua ${product.name}!`);
    };
  }
}

/* ========== small helper to avoid HTML injection in text nodes ========== */
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
