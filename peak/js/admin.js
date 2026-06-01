/* Admin sidebar/topbar */
(function(){
  function bp(){ return '../'; }
  function side(active){
    const items=[
      ['dash','Dashboard','fa-gauge-high','index.html'],
      ['prod','Products','fa-box','products.html'],
      ['ord','Orders','fa-receipt','orders.html'],
      ['cust','Customers','fa-users','customers.html'],
      ['cat','Categories','fa-tags','categories.html'],
      ['set','Settings','fa-gear','settings.html']
    ];
    return `
    <aside class="admin-side" id="adminSide">
      <div class="brand"><span class="pi-logo">P</span> Peak <span class="text-gradient">Admin</span></div>
      <div class="menu">
        ${items.map(i=>`<a href="${i[3]}" class="${active===i[0]?'active':''}"><i class="fa-solid ${i[2]}"></i>${i[1]}</a>`).join('')}
      </div>
      <div class="divider"></div>
      <a href="${bp()}index.html" class="d-block text-muted small px-2"><i class="fa-solid fa-arrow-left me-2"></i>Back to store</a>
      <a href="#" onclick="PI.logout()" class="d-block text-danger small px-2 mt-2"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</a>
    </aside>`;
  }
  function topbar(title){
    const u=PI.user();
    return `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-2">
        <button class="icon-btn d-lg-none" onclick="document.getElementById('adminSide').classList.toggle('open')"><i class="fa-solid fa-bars"></i></button>
        <div><h3 class="m-0 fw-bold">${title}</h3><div class="text-muted small">${new Date().toDateString()}</div></div>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <div class="pi-search d-none d-md-flex"><i class="fa-solid fa-magnifying-glass text-muted"></i><input placeholder="Search anything..."/></div>
        <button class="icon-btn" onclick="PI.toggleTheme()"><i data-theme-icon class="fa-solid fa-moon"></i></button>
        <button class="icon-btn"><i class="fa-regular fa-bell"></i><span class="badge bg-primary">3</span></button>
        <div class="d-flex align-items-center gap-2 ms-2"><div class="pi-logo">${(u?.name||'A')[0].toUpperCase()}</div><div class="d-none d-md-block"><div class="fw-bold small">${u?.name||'Admin'}</div><div class="small text-muted">${u?.email||''}</div></div></div>
      </div>
    </div>`;
  }
  window.PIAdmin = {
    mount(active,title){
      // guard
      const u=PI.user();
      if(!u || u.role!=='admin'){ location.href='../pages/login.html'; return false; }
      document.getElementById('adminSidebar').innerHTML = side(active);
      document.getElementById('adminTopbar').innerHTML = topbar(title);
      return true;
    }
  };
})();
