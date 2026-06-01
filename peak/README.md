# Peak Investments — Premium E-commerce (Phase 1)

A modern, mobile-first, localStorage-first business e-commerce website for **Peak Investments** (Lukadde Road, Kampala, Uganda).

## Quick start

Just open `index.html` in any modern browser — no build step required. For best results, serve via a simple static server:

```bash
# Option 1: Python
python3 -m http.server 8080

# Option 2: Node
npx serve .
```

Then visit http://localhost:8080

## Demo admin login

- Email: `admin@peak.com`
- Password: `admin123`

Any other email/password creates a regular customer account (simulated).

## Project structure

```
peak-investments/
├── index.html              # Home / landing
├── css/style.css           # Premium design system (light + dark)
├── js/
│   ├── data.js             # Seed products & categories
│   ├── app.js              # Core: storage, cart, wishlist, auth, theme
│   ├── ui.js               # Product card renderers
│   ├── layout.js           # Shared navbar, mini-cart, bottom nav, footer
│   └── admin.js            # Admin sidebar & topbar
├── pages/
│   ├── shop.html           # Catalog with filters/sort/search
│   ├── product.html        # Product details
│   ├── cart.html           # Full cart
│   ├── checkout.html       # Checkout with Kampala delivery options
│   ├── wishlist.html
│   ├── account.html        # Profile + order history
│   ├── login.html          # Animated premium login
│   ├── register.html
│   ├── contact.html        # Address, phone, hours, map
│   ├── about.html
│   ├── faq.html
│   └── delivery.html       # Delivery zones & returns
└── admin/
    ├── index.html          # Dashboard (KPIs, charts)
    ├── products.html       # Full CRUD
    ├── orders.html
    ├── customers.html
    ├── categories.html
    └── settings.html
```

## Features

- **Localstorage-first architecture** — products, cart, wishlist, orders, customers, settings, theme and session all persist
- **Mobile-first** with sticky navbar, mobile bottom nav, offcanvas mini-cart, FAB call button
- **Dark / light theme toggle**
- **Premium design system** — glassmorphism, gradients, soft shadows, animated buttons
- **Full customer flow** — browse → product → cart → checkout → order confirmation
- **Admin dashboard** — KPIs with animated counters, Chart.js revenue & status charts, CRUD for products, orders, customers, categories, settings
- **Kampala-specific** — boda delivery, Wakiso courier, upcountry bus, in-store pickup at Lukadde Rd; MTN MoMo, Airtel Money, Visa, Mastercard, Cash on delivery
- **Backend-ready** — clean separation of data (`data.js`), state (`app.js`), UI (`ui.js`, `layout.js`); swap localStorage calls for API calls without touching the UI

## Backend-ready integration points

In `js/app.js`, the `PI` object exposes:

- `PI.products()`, `PI.saveProducts()`
- `PI.cart()`, `PI.addToCart()`, `PI.updateQty()`, `PI.removeFromCart()`
- `PI.orders()`, `PI.placeOrder()`
- `PI.user()`, `PI.login()`, `PI.register()`, `PI.logout()`

To migrate to a backend, replace the `get`/`set` calls in those methods with `fetch()` calls to your API — the rest of the UI keeps working.

## Payment gateway placeholders

The checkout flow shows MTN MoMo, Airtel Money, Visa/Mastercard and Cash on Delivery and simulates a payment dialog. Integration points are ready for **Pesapal**, **Flutterwave** or **DPO** when backend credentials are added in Phase 2.

---

© Peak Investments · Lukadde Road, Kampala · +256 783 118186
