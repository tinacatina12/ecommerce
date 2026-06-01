/* UI helpers — product cards, listings, filters */
(function(){
  function bp(){ return PI.basePath(); }

  function productCard(p){
    const old = p.old ? `<span class="old">${PI.fmt(p.old)}</span>` : '';
    const tag = p.tag==='sale'?'<span class="badge-tag">-'+Math.round((1-p.price/p.old)*100)+'%</span>':
                p.tag==='new'?'<span class="badge-tag new">NEW</span>':
                p.tag==='best'?'<span class="badge-tag" style="background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff">BEST</span>':'';
    const wished = PI.inWish(p.id)?'active':'';
    const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5-Math.round(p.rating));
    return `
    <div class="product" data-pid="${p.id}">
      <a href="${bp()}pages/product.html?id=${p.id}" class="thumb">
        ${tag}
        <button class="wish ${wished}" onclick="event.preventDefault();PI.toggleWish('${p.id}');this.classList.toggle('active')"><i class="fa-solid fa-heart"></i></button>
        <span class="emoji">${p.emoji}</span>
      </a>
      <div class="body">
        <div class="cat">${p.cat}</div>
        <h6><a href="${bp()}pages/product.html?id=${p.id}">${p.name}</a></h6>
        <div class="rating">${stars} <span class="text-muted small">(${p.rating})</span></div>
        <div class="d-flex align-items-baseline justify-content-between mt-1">
          <div><span class="price">${PI.fmt(p.price)}</span>${old}</div>
          ${p.stock>0?'<span class="status s-paid">In stock</span>':'<span class="status s-cancel">Out</span>'}
        </div>
        <div class="actions">
          <button class="btn btn-primary btn-sm flex-grow-1" onclick="PI.addToCart('${p.id}')"><i class="fa-solid fa-plus"></i> Add</button>
          <a class="btn btn-ghost btn-sm" href="${bp()}pages/product.html?id=${p.id}"><i class="fa-solid fa-eye"></i></a>
        </div>
      </div>
    </div>`;
  }

  function renderGrid(container, products, cols='col-6 col-md-4 col-lg-3'){
    if(!products.length){ container.innerHTML = `<div class="empty col-12"><div class="ico"><i class="fa-solid fa-box-open"></i></div><div>No products found</div></div>`; return; }
    container.innerHTML = products.map(p=>`<div class="${cols}">${productCard(p)}</div>`).join('');
  }

  window.PIUI = { productCard, renderGrid };
})();
