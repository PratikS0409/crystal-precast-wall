# Crystal Precast Wall

Official static web application for **Crystal Precast Wall**, an Indian RCC precast concrete boundary wall manufacturing and installation company based in Mankivalli Village, Khopoli, Maharashtra.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** + CSS custom properties generated from centralized theme config
- **GSAP + ScrollTrigger** (cinematic hero intro, clip-path reveals, parallax depth, and scroll-synced manufacturing progress)
- **Motion (`motion/react`)** (specification modals, lightbox, filter transitions, sector switcher, mobile navigation)
- **Lenis Smooth Scroll** (desktop & tablet smooth scrolling synced with GSAP ticker, disabled automatically on `prefers-reduced-motion` or via config)
- **Lucide React** icons
- **`@svg-maps/india`** with calibrated Web Mercator `[longitude, latitude]` coordinate projection, zoom, and pan

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your environment file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Configure **Formspree** for the Inquiry Form:
   - Create a form at [formspree.io](https://formspree.io/) pointing to your company inbox.
   - Set `VITE_FORMSPREE_ENDPOINT="https://formspree.io/f/your_form_id"` in `.env`.
   - When `VITE_FORMSPREE_ENDPOINT` is left empty, the form honestly notifies visitors that email delivery is unconfigured and directs them to the prefilled **WhatsApp Inquiry** button.

4. Start the development server on port `3000`:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Centralized Configuration & Design System

Global styling, animation rules, brand data, and SEO metadata live in `src/config/`:

- **Theme, Colors, Typography, Layout & Buttons (`src/config/theme.ts`)**:
  - Update colors, font stacks, responsive type scales, container widths, section padding, border radii, or button padding/letter-spacing in `theme`.
  - `applyThemeCssVariables()` automatically writes these values onto `:root` CSS variables before mount (`src/main.tsx`), updating the entire UI consistently.
- **Company Identity, Phones, WhatsApp, Address & Social Links (`src/config/company.ts`)**:
  - Single source of truth for brand name, Khopoli address, phone numbers, WhatsApp number/message helper, Google Maps URL, and Why Choose Us pillars.
- **Animation Rules (`src/config/animation.ts`)**:
  - Adjust global `enabled`, `duration`, `stagger`, `ease`, `parallax`, `mobileIntensity`, `enableLenisSmoothScroll`, `enableCustomCursor`, and `respectReducedMotion`.
- **SEO & Metadata (`src/config/seo.ts`)**:
  - Manage default and section-specific `<title>`, `<meta name="description">`, local keywords, Open Graph image, canonical URL behavior (`VITE_SITE_URL`), and Google Search Console tag (`VITE_GOOGLE_SITE_VERIFICATION`).

## Centralized Content Files (`src/data/`)

- **Navigation Links**: `src/data/navigation.ts`
- **Products & Technical Specs**: `src/data/products.ts`
- **7-Stage Manufacturing Workflow**: `src/data/manufacturing.ts`
- **Engineering Quality Controls & Industry Applications**: `src/data/industries.ts`
- **Client Testimonials**: `src/data/testimonials.ts`
- **Project Gallery & Interactive India Map Locations**: `src/data/projects.ts`
  - Set `coordinates: [longitude, latitude]` to project each marker automatically on the India map.
  - Set `isDemo: false` once a sample entry is replaced with a verified company installation.

## Google Search Console Setup & Indexing Guide

1. **Set Your Production Domain & Verification Token**:
   - In `.env` (or your hosting provider's environment settings), set `VITE_SITE_URL="https://yourdomain.com"`.
   - Replace the placeholder domain `https://crystalprecastwall.example` inside `public/sitemap.xml` and update `public/robots.txt` with your full `Sitemap: https://yourdomain.com/sitemap.xml` URL before deploying.
2. **Add & Verify Property in Google Search Console**:
   - Open [Google Search Console](https://search.google.com/search-console) and add your deployed domain (`URL prefix` or `Domain` property).
   - If using the **HTML tag** verification method, copy the `content` token provided by Google and set `VITE_GOOGLE_SITE_VERIFICATION="your-token"` in your deployment environment, then rebuild (`npm run build`) and deploy.
   - Click **Verify** in Google Search Console.
3. **Submit Sitemap & Inspect URLs**:
   - In Search Console, open **Sitemaps**, enter `sitemap.xml`, and click **Submit**.
   - Use the **URL Inspection** bar at the top of Search Console to test your homepage URL and request indexing once deployed.
