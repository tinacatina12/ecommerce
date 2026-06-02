/* Shared layout: navbar, mini-cart offcanvas, bottom nav, footer, fab call */
(function(){
  function bp(){ return PI.basePath(); }
  function isAdminUser(){ const u=PI.user(); return u && u.role==='admin'; }

  function navbar(active){
    const u=PI.user();
    return `
    <nav class="pi-nav">
      <div class="container-xxl">
        <div class="d-flex align-items-center justify-content-between py-2 gap-3">
          <a href="${bp()}index.html" class="d-flex align-items-center gap-2 navbar-brand m-0">
            <span class="pi-logo">P</span>
            <span class="d-none d-sm-inline">PEAK <span class="text-gradient">Investments</span></span>
          </a>
          <div class="d-none d-lg-flex align-items-center gap-1">
            <a class="nav-link ${active==='home'?'active':''}" href="${bp()}index.html">Home</a>
            <a class="nav-link ${active==='shop'?'active':''}" href="${bp()}pages/shop.html">Shop</a>
            <a class="nav-link ${active==='about'?'active':''}" href="${bp()}pages/about.html">About</a>
            <a class="nav-link ${active==='contact'?'active':''}" href="${bp()}pages/contact.html">Contact</a>
            <a class="nav-link ${active==='faq'?'active':''}" href="${bp()}pages/faq.html">FAQ</a>
          </div>
          <div class="pi-search d-none d-md-flex flex-grow-1" style="max-width:380px">
            <i class="fa-solid fa-magnifying-glass text-muted"></i>
            <input id="navSearch" placeholder="Search products, brands, categories..." />
          </div>
          <div class="d-flex align-items-center gap-2">
            <button class="icon-btn" onclick="PI.toggleTheme()" title="Toggle theme"><i data-theme-icon class="fa-solid fa-moon"></i></button>
            <a class="icon-btn d-none d-sm-inline-flex" href="${bp()}pages/wishlist.html" title="Wishlist"><i class="fa-regular fa-heart"></i><span class="badge bg-primary" data-wish-count>0</span></a>
            <button class="icon-btn" data-bs-toggle="offcanvas" data-bs-target="#miniCart" title="Cart"><i class="fa-solid fa-bag-shopping"></i><span class="badge bg-primary" data-cart-count>0</span></button>
            ${u ? `<div class="dropdown">
              <button class="icon-btn" data-bs-toggle="dropdown"><i class="fa-solid fa-user"></i></button>
              <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="border-radius:14px">
                <li class="px-3 py-2"><div class="fw-bold">${u.name}</div><div class="small text-muted">${u.email}</div></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="${bp()}pages/account.html"><i class="fa-solid fa-id-badge me-2"></i>My Account</a></li>
                <li><a class="dropdown-item" href="${bp()}pages/account.html#orders"><i class="fa-solid fa-receipt me-2"></i>Orders</a></li>
                ${u.role==='admin'?`<li><a class="dropdown-item" href="${bp()}admin/index.html"><i class="fa-solid fa-gauge-high me-2"></i>Admin</a></li>`:''}
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item text-danger" href="#" onclick="event.preventDefault();PI.logout();"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</a></li>
              </ul>
            </div>` : `<a class="btn btn-primary btn-sm d-none d-sm-inline-flex" href="${bp()}pages/login.html"><i class="fa-solid fa-right-to-bracket"></i> Sign in</a>`}
            <button class="icon-btn d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu"><i class="fa-solid fa-bars"></i></button>
          </div>
        </div>
      </div>
    </nav>`;
  }

  function miniCart(){
    return `
    <div class="offcanvas offcanvas-end" tabindex="-1" id="miniCart" style="width:420px;max-width:95vw">
      <div class="offcanvas-header border-bottom">
        <h5 class="m-0"><i class="fa-solid fa-bag-shopping me-2"></i>Your Cart</h5>
        <button class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body" id="miniCartList"></div>
      <div class="border-top p-3">
        <div class="d-flex justify-content-between mb-2"><span class="text-muted">Subtotal</span><strong id="miniCartSubtotal">UGX 0</strong></div>
        <div class="d-flex gap-2">
          <a href="${bp()}pages/cart.html" class="btn btn-ghost flex-grow-1"><i class="fa-solid fa-cart-shopping"></i> View cart</a>
          <a href="${bp()}pages/checkout.html" class="btn btn-primary flex-grow-1"><i class="fa-solid fa-credit-card"></i> Checkout</a>
        </div>
      </div>
    </div>`;
  }

  function mobileMenu(){
    return `
    <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu">
      <div class="offcanvas-header"><h5 class="m-0"><span class="pi-logo me-2">P</span>Peak Investments</h5><button class="btn-close" data-bs-dismiss="offcanvas"></button></div>
      <div class="offcanvas-body">
        <div class="pi-search mb-3"><i class="fa-solid fa-magnifying-glass text-muted"></i><input placeholder="Search..."/></div>
        <a class="nav-link" href="${bp()}index.html"><i class="fa-solid fa-house me-2"></i>Home</a>
        <a class="nav-link" href="${bp()}pages/shop.html"><i class="fa-solid fa-store me-2"></i>Shop</a>
        <a class="nav-link" href="${bp()}pages/wishlist.html"><i class="fa-regular fa-heart me-2"></i>Wishlist</a>
        <a class="nav-link" href="${bp()}pages/account.html"><i class="fa-solid fa-user me-2"></i>Account</a>
        <a class="nav-link" href="${bp()}pages/about.html"><i class="fa-solid fa-circle-info me-2"></i>About</a>
        <a class="nav-link" href="${bp()}pages/contact.html"><i class="fa-solid fa-headset me-2"></i>Contact</a>
        <a class="nav-link" href="${bp()}pages/faq.html"><i class="fa-solid fa-circle-question me-2"></i>FAQ</a>
        <a class="nav-link" href="${bp()}pages/delivery.html"><i class="fa-solid fa-truck me-2"></i>Delivery & Returns</a>
        <hr/>
        ${PI.user()? `<a class="nav-link text-danger" href="#" onclick="PI.logout()"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</a>` :
          `<a class="btn btn-primary w-100" href="${bp()}pages/login.html"><i class="fa-solid fa-right-to-bracket"></i> Sign in</a>`}
      </div>
    </div>`;
  }

  function bottomNav(active){
    return `
    <div class="bottom-nav"><div class="grid">
      <a href="${bp()}index.html" class="${active==='home'?'active':''}"><i class="fa-solid fa-house"></i><span>Home</span></a>
      <a href="${bp()}pages/shop.html" class="${active==='shop'?'active':''}"><i class="fa-solid fa-store"></i><span>Shop</span></a>
      <a href="#" data-bs-toggle="offcanvas" data-bs-target="#miniCart"><i class="fa-solid fa-bag-shopping"></i><span>Cart <span class="badge bg-primary ms-1" data-cart-count>0</span></span></a>
      <a href="${bp()}pages/wishlist.html" class="${active==='wish'?'active':''}"><i class="fa-regular fa-heart"></i><span>Wishlist</span></a>
      <a href="${bp()}pages/account.html" class="${active==='account'?'active':''}"><i class="fa-solid fa-user"></i><span>Account</span></a>
    </div></div>`;
  }

  function fabCall(){
    return `<a href="tel:+256783118186" class="fab-call" title="Call us"><i class="fa-solid fa-phone"></i></a>`;
  }

  function footer(){
    return `
    <footer class="footer">
      <div class="container-xxl">
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="d-flex align-items-center gap-2 mb-3"><span class="pi-logo">P</span><strong>PEAK Investments</strong></div>
            <p class="text-muted small">Kampala's premium destination for electronics, home, fashion and more. Verified business, secure payments and fast Kampala delivery.</p>
            <div class="d-flex gap-2 mt-3">
              <a class="icon-btn" href="#"><i class="fa-brands fa-facebook-f"></i></a>
              <a class="icon-btn" href="#"><i class="fa-brands fa-instagram"></i></a>
              <a class="icon-btn" href="#"><i class="fa-brands fa-x-twitter"></i></a>
              <a class="icon-btn" href="https://wa.me/256783118186"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          <div class="col-6 col-lg-2"><h6>Shop</h6>
            <a href="${bp()}pages/shop.html">All products</a>
            <a href="${bp()}pages/shop.html?cat=electronics">Electronics</a>
            <a href="${bp()}pages/shop.html?cat=phones">Phones</a>
            <a href="${bp()}pages/shop.html?cat=home">Home</a>
          </div>
          <div class="col-6 col-lg-2"><h6>Company</h6>
            <a href="${bp()}pages/about.html">About us</a>
            <a href="${bp()}pages/contact.html">Contact</a>
            <a href="${bp()}pages/faq.html">FAQ</a>
            <a href="${bp()}pages/delivery.html">Delivery & Returns</a>
          </div>
          <div class="col-lg-4"><h6>Visit our store</h6>
            <p class="text-muted small mb-2"><i class="fa-solid fa-location-dot me-2 text-gradient"></i>Lukadde Road, Kampala, Uganda</p>
            <p class="text-muted small mb-2"><i class="fa-solid fa-phone me-2 text-gradient"></i><a href="tel:+256783118186">+256 783 118186</a></p>
            <p class="text-muted small mb-2"><i class="fa-regular fa-clock me-2 text-gradient"></i>Mon–Sat 8:00 AM – 9:00 PM · Sun 8:00 AM – 6:00 PM</p>
            <p class="text-muted small mb-0"><i class="fa-solid fa-square-parking me-2 text-gradient"></i>Free parking · In-store pickup available</p>
          </div>
        </div>
        <div class="divider"></div>
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <small class="text-muted">© ${new Date().getFullYear()} Peak Investments. All rights reserved.</small>
          <div class="d-flex align-items-center gap-2 small text-muted">
            <span>We accept</span>
            <span class="chip" style="background:var(--surface-2);color:var(--text);border-color:var(--border)">MTN MoMo</span>
            <span class="chip" style="background:var(--surface-2);color:var(--text);border-color:var(--border)">Airtel Money</span>
            <span class="chip" style="background:var(--surface-2);color:var(--text);border-color:var(--border)">Visa</span>
            <span class="chip" style="background:var(--surface-2);color:var(--text);border-color:var(--border)">Mastercard</span>
          </div>
        </div>
      </div>
    </footer>`;
  }

  window.PILayout = {
    mount(active){
      const hdr=document.getElementById('pi-header');
      if(hdr) hdr.innerHTML = navbar(active) + miniCart() + mobileMenu();
      const bn=document.getElementById('pi-bottom'); if(bn) bn.innerHTML = bottomNav(active);
      const ft=document.getElementById('pi-footer'); if(ft) ft.innerHTML = footer();
      const fb=document.getElementById('pi-fab'); if(fb) fb.innerHTML = fabCall();
      // search behavior
      const s=document.getElementById('navSearch');
      if(s) s.addEventListener('keydown',e=>{ if(e.key==='Enter'){ location.href = bp()+'pages/shop.html?q='+encodeURIComponent(s.value); }});
      PI.refreshCart();
    }
  };
})();
