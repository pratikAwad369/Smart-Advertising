# Smart Advertising Flex Printing - Static Website

A production-ready, mobile-first static website for **Smart Advertising Flex Printing** located in Punawale, Pune (Maharashtra). Built using standard semantic HTML5, modern CSS3, and vanilla JavaScript—**no frameworks or build steps required**.

- **Proprietor / Founder**: Anand Awad
- **Phone / WhatsApp**: 8888086602 (+91 8888086602)
- **Address**: Mumbai-Bangalore Highway, near Undarpass, Punawale Service Road, Punawale, Pune 411033

---

## 📁 Project Folder Structure

```
.
├── index.html            # 1. Home (Hero Slide Bar with flex images, Trust Strip, Services, Reviews)
├── services.html         # 2. Services Catalog (Detailed cards with direct WhatsApp buttons)
├── gallery.html          # 3. Work Gallery (Category filter tabs + accessible Lightbox modal)
├── estimator.html        # 4. Instant Quote Estimator (Live pricing calculator + WhatsApp export)
├── about.html            # 5. About Us (Story of Anand Awad, workshop machinery, guarantees)
├── contact.html          # 6. Contact & Location (Click-to-call, embedded map, inquiry form)
├── css/
│   └── style.css         # Mobile-first stylesheet (CSS variables, responsive 360px-1440px)
├── js/
│   ├── main.js           # Shared interactions, Hero Slide Bar, mobile nav drawer, contact form
│   ├── estimator.js      # Quote calculation engine with editable price constants at the top
│   └── gallery.js        # Category filtering & responsive lightbox modal
├── images/               # High-resolution assets
│   ├── flex-banner.jpg           # Outdoor commercial star flex display
│   ├── slider-store-banner.jpg   # Storefront advertising banner
│   ├── slider-event-backdrop.jpg # Large event stage flex backdrop
│   ├── hero-printer.jpg          # Commercial large-format solvent printer
│   ├── rollup-standee.jpg        # Aluminium roll-up standees
│   ├── vinyl-stickers.jpg        # Custom die-cut vinyl decals
│   ├── visiting-cards.svg        # 350 GSM business cards graphic
│   ├── glow-signboard.svg        # LED illuminated sign box graphic
│   ├── outdoor-hoarding.svg      # Highway billboard graphic
│   ├── owner-placeholder.svg     # Anand Awad profile avatar
│   └── logo.svg                  # Brand logo mark
├── robots.txt            # Search engine crawl rules
├── sitemap.xml           # XML sitemap with all 6 pages
└── netlify.toml          # Instant Netlify zero-build deployment configuration
```

---

## 🚀 How to Deploy Free on Netlify

### Option 1: Drag & Drop (Fastest — 30 Seconds)
1. Sign in to [app.netlify.com](https://app.netlify.com).
2. Go to the **Sites** tab.
3. Drag and drop this folder directly into the deploy box.
4. Your site will instantly go live with a free `.netlify.app` URL!

### Option 2: Connect via GitHub
1. Push this folder to a GitHub repository.
2. In Netlify, click **Add new site > Import an existing project > GitHub**.
3. Leave **Build command** empty and set **Publish directory** to `.` (root).
4. Click **Deploy Site**.

---

## ⚙️ Customization Guide

- **Prices & Rates**: Edit the `RATES` constant at the top of `/js/estimator.js`.
- **Workshop Photos**: Place your own photos in `/images/` with the same filenames to update the slider and gallery.
- **Operating Hours**: Configured as *Mon–Sat: 9:30 AM – 10:00 PM*. Update in `index.html` or `contact.html` if required.
