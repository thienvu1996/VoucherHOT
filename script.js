const grid = document.getElementById("voucher-grid");

function createRipple(btn, e) {
  const circle = document.createElement("span");
  circle.className = "ripple";
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.style.width = circle.style.height = size + "px";
  circle.style.left = e.clientX - rect.left - size / 2 + "px";
  circle.style.top = e.clientY - rect.top - size / 2 + "px";
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

function animateCard(card, idx) {
  card.style.opacity = 0;
  card.style.transform = "scale(0.92) translateY(30px)";
  setTimeout(() => {
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    card.style.opacity = 1;
    card.style.transform = "scale(1) translateY(0)";
  }, 80 * idx + 80);
}

function renderVouchers(vouchers) {
  grid.innerHTML = "";

  vouchers.forEach((voucher, idx) => {
    const div = document.createElement("div");
    div.className = "voucher-card";

    div.innerHTML = `
  <div class="voucher-body">
    <img src="${voucher.img}" alt="${voucher.title}" class="voucher-img"
         onerror="this.src='https://via.placeholder.com/100x100?text=Voucher'" />
    <div class="voucher-title">
      ${voucher.title}
      ${voucher.registered > 500 ? `<span class="badge-hot">🔥 HOT</span>` : ""}
    </div>
    <div class="voucher-desc">${voucher.description}</div>
    <div class="voucher-bottom">
      <div class="voucher-registered">👤 ${voucher.registered} đã đăng ký</div>
      <a href="${voucher.link}" target="_blank" class="voucher-btn">Lấy voucher</a>
    </div>
  </div>
`;

    // Animation
    animateCard(div, idx);

    // Button click ripple effect
    const btn = div.querySelector(".voucher-btn");
    btn.addEventListener("click", function (e) {
      createRipple(btn, e);
    });

    grid.appendChild(div);
  });
}

// Load vouchers from API
const vouchers = [
  {
    title: "MUA 2 TẶNG 1 - Highlands Coffee",
    description: "Ưu đãi khi mua 2 tặng 1 các thức uống Highlands. Áp dụng cho trà sữa Mochi và đá xay.",
    img: "assset/High.jpg",
    link: "https://shorten.asia/WEnMq6Es",
    registered: 1020,
  },
  {
    title: "Ưu đãi The Coffee House",
    description: "Nhận voucher độc quyền từ The Coffee House. Áp dụng toàn quốc.",
    img: "assset/The_cooffe.jpg",
    link: "https://promothecoffeeehouse.com.vn/?utm_source=accesstrade",
    registered: 542,
  },
  {
    title: "Ưu đãi Nhà thuốc FPT Long Châu",
    description: "Săn ưu đãi khi mua hàng tại hệ thống nhà thuốc FPT Long Châu.",
    img: "assset/FPT.png",
    link: "https://nhathuoclongchau.com.vn",
    registered: 421,
  },
  {
    title: "Ưu đãi K'Phúc Sinh",
    description: "Mua cà phê, gia vị và thực phẩm hữu cơ chính hãng tại K'Phúc Sinh.",
    img: "assset/Logo-Phúc-Sinh-Consumer-Nen-Xanh-K-COFFEE.jpg",
    link: "https://shorten.asia/z9m2QhNr",
    registered: 198,
  },
];

renderVouchers(vouchers);

// Add ripple CSS (once)
const style = document.createElement("style");
style.innerHTML = `
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
  z-index: 2;
}
@keyframes ripple {
  to { transform: scale(2.5); opacity: 0; }
}
.voucher-btn { position: relative; overflow: hidden; }
`;
document.head.appendChild(style);
