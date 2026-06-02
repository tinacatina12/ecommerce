/* Peak Investments — Core App (localStorage-first) */
(function(){
  const KEY = {
    products:'pi.products', cart:'pi.cart', wish:'pi.wish', orders:'pi.orders',
    user:'pi.user', theme:'pi.theme', cats:'pi.cats', settings:'pi.settings',
    customers:'pi.customers'
  };
  const seed = window.PI_SEED || {products:[],categories:[]};

  const PI = {
    fmt(n){ return 'UGX ' + Number(n||0).toLocaleString('en-UG'); },
    get(k,fb){ try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch(e){return fb;} },
    set(k,v){ localStorage.setItem(k, JSON.stringify(v)); },
    uid(){ return 'id_'+Math.random().toString(36).slice(2,9); },

    init(){
      if(!this.get(KEY.products)) this.set(KEY.products, seed.products);
      if(!this.get(KEY.cats)) this.set(KEY.cats, seed.categories);
      if(!this.get(KEY.cart)) this.set(KEY.cart, []);
      if(!this.get(KEY.wish)) this.set(KEY.wish, []);
      if(!this.get(KEY.orders)) this.set(KEY.orders, this.seedOrders());
      if(!this.get(KEY.customers)) this.set(KEY.customers, this.seedCustomers());
      if(!this.get(KEY.settings)) this.set(KEY.settings, {
        storeName:'Peak Investments', currency:'UGX',
        phone:'+256 783 118186', address:'Lukadde Road, Kampala, Uganda',
        hoursWeekday:'Mon–Sat: 8:00 AM – 9:00 PM', hoursSunday:'Sun: 8:00 AM – 6:00 PM'
      });
      const theme = this.get(KEY.theme,'light'); document.documentElement.setAttribute('data-theme', theme);
    },

    seedOrders(){
      const names = ['Sarah Nakato','David Okello','Aisha Mbabazi','Brian Kato','Joan Ainembabazi','Patrick Ssemakula','Mary Achieng','Eric Mugisha'];
      const status = ['paid','shipped','pending','paid','shipped','pending','cancel','paid'];
      const out=[];
      for(let i=0;i<12;i++){
        const d=new Date(); d.setDate(d.getDate()-i*2);
        out.push({
          id:'PI-'+(10240+i),
          customer:names[i%names.length],
          email:'customer'+i+'@mail.com',
          total: 50000 + Math.floor(Math.random()*1500000),
          items: 1+Math.floor(Math.random()*5),
          status: status[i%status.length],
          date: d.toISOString(),
          payment:['MTN MoMo','Airtel Money','Visa','Cash on delivery'][i%4]
        });
      }
      return out;
    },
    seedCustomers(){
      return [
        {id:'c1',name:'Sarah Nakato',email:'sarah@mail.com',phone:'+256 772 123456',orders:6,spent:2350000,joined:'2024-04-12'},
        {id:'c2',name:'David Okello',email:'david@mail.com',phone:'+256 700 998877',orders:3,spent:890000,joined:'2024-08-03'},
        {id:'c3',name:'Aisha Mbabazi',email:'aisha@mail.com',phone:'+256 752 445566',orders:9,spent:4120000,joined:'2023-11-21'},
        {id:'c4',name:'Brian Kato',email:'brian@mail.com',phone:'+256 776 332211',orders:2,spent:520000,joined:'2025-01-09'},
        {id:'c5',name:'Joan Ainembabazi',email:'joan@mail.com',phone:'+256 759 887766',orders:5,spent:1880000,joined:'2024-10-30'}
      ];
    },

    /* Products */
    products(){ return this.get(KEY.products,[]); },
    saveProducts(p){ this.set(KEY.products,p); },
    findProduct(id){ return this.products().find(p=>p.id===id); },

    /* Cart */
    cart(){ return this.get(KEY.cart,[]); },
    cartCount(){ return this.cart().reduce((s,i)=>s+i.qty,0); },
    cartTotal(){ return this.cart().reduce((s,i)=>{const p=this.findProduct(i.id);return s+(p?p.price*i.qty:0);},0); },
    addToCart(id,qty=1){
      const c=this.cart(); const it=c.find(x=>x.id===id);
      if(it) it.qty+=qty; else c.push({id,qty});
      this.set(KEY.cart,c); this.refreshCart(); this.toast('Added to cart','success');
    },
    updateQty(id,delta){
      const c=this.cart(); const it=c.find(x=>x.id===id); if(!it) return;
      it.qty+=delta; if(it.qty<=0) return this.removeFromCart(id);
      this.set(KEY.cart,c); this.refreshCart();
    },
    removeFromCart(id){ this.set(KEY.cart,this.cart().filter(x=>x.id!==id)); this.refreshCart(); },
    clearCart(){ this.set(KEY.cart,[]); this.refreshCart(); },

    /* Wishlist */
    wish(){ return this.get(KEY.wish,[]); },
    inWish(id){ return this.wish().includes(id); },
    toggleWish(id){
      const w=this.wish(); const i=w.indexOf(id);
      if(i>-1){ w.splice(i,1); this.toast('Removed from wishlist','info'); }
      else{ w.push(id); this.toast('Added to wishlist','success'); }
      this.set(KEY.wish,w); this.updateNavCounters();
    },

    /* Orders */
    orders(){ return this.get(KEY.orders,[]); },
    placeOrder(order){
      const o=this.orders(); o.unshift(order); this.set(KEY.orders,o);
    },

    /* Auth */
    user(){ return this.get(KEY.user,null); },
    login(email,password,remember){
      // Simulated auth — admin@peak / admin123 has admin role
      const isAdmin = email==='admin@peak.com' && password==='admin123';
      if(!email || !password) throw new Error('Enter email and password');
      const u={ email, name: email.split('@')[0], role: isAdmin?'admin':'customer', joined:new Date().toISOString() };
      this.set(KEY.user,u); return u;
    },
    register(name,email,password){
      if(!name||!email||!password) throw new Error('All fields required');
      const u={ email, name, role:'customer', joined:new Date().toISOString() };
      this.set(KEY.user,u); return u;
    },
    logout(){ localStorage.removeItem(KEY.user); location.href = this.basePath()+'index.html'; },

    /* Theme */
    toggleTheme(){
      const cur=this.get(KEY.theme,'light'); const nxt=cur==='light'?'dark':'light';
      document.documentElement.setAttribute('data-theme',nxt); this.set(KEY.theme,nxt);
      document.querySelectorAll('[data-theme-icon]').forEach(el=>el.className = nxt==='dark'?'fa-solid fa-sun':'fa-solid fa-moon');
    },

    /* UI */
    toast(msg,type='success'){
      if(window.Swal){
        Swal.fire({toast:true,position:'top-end',icon:type,title:msg,showConfirmButton:false,timer:2200,timerProgressBar:true});
      } else { console.log(type,msg); }
    },
    basePath(){
      const p=location.pathname;
      if(p.includes('/pages/')||p.includes('/admin/')) return '../';
      return '';
    },

    /* Renderers */
    refreshCart(){
      this.updateNavCounters();
      const list=document.getElementById('miniCartList'), sub=document.getElementById('miniCartSubtotal');
      if(!list) return;
      const c=this.cart();
      if(!c.length){
        list.innerHTML = `<div class="empty"><div class="ico">🛒</div><div>Your cart is empty</div><a href="${this.basePath()}pages/shop.html" class="btn btn-primary btn-sm mt-3"><i class="fa-solid fa-bag-shopping"></i> Shop now</a></div>`;
        if(sub) sub.textContent = this.fmt(0); return;
      }
      list.innerHTML = c.map(i=>{ const p=this.findProduct(i.id); if(!p) return '';
        return `<div class="cart-item">
          <div class="thumb">${p.emoji}</div>
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between gap-2">
              <div><div class="fw-semibold small">${p.name}</div><div class="text-muted small">${this.fmt(p.price)}</div></div>
              <button class="btn btn-sm btn-ghost p-1" onclick="PI.removeFromCart('${p.id}')"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="qty"><button onclick="PI.updateQty('${p.id}',-1)">−</button><span>${i.qty}</span><button onclick="PI.updateQty('${p.id}',1)">+</button></div>
              <div class="fw-bold">${this.fmt(p.price*i.qty)}</div>
            </div>
          </div>
        </div>`;
      }).join('');
      if(sub) sub.textContent = this.fmt(this.cartTotal());
    },
    updateNavCounters(){
      document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=this.cartCount());
      document.querySelectorAll('[data-wish-count]').forEach(el=>el.textContent=this.wish().length);
    }
  };

  window.PI = PI;
  PI.init();
  document.addEventListener('DOMContentLoaded',()=>{ PI.refreshCart(); PI.updateNavCounters(); });
})();
