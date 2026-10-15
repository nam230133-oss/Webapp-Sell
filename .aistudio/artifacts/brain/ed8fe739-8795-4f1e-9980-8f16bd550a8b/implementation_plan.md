# GAZU — Modern Desktop-First Luxury Editorial Storefront

An expansive, desktop-first editorial fashion e-commerce storefront faithfully replicating the visual language of the GAZU design reference (`#F4F4F2` warm alabaster canvas, `#111111` deep onyx bands, `#E5E5E0` muted garment cards) enriched with an interactive Group Buying Room (Phòng Mua Chung in `orange-600`), AI Stylist & real-time Available-to-Promise (ATP) stock breakdown in `emerald-600`, and live currency switching (VND ₫ / USD $).

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural decisions below incorporate your confirmed preferences:

- **Confirmed — Phòng Mua Chung (Group Buying Room)**: Interactive co-shopping room with live member invites, countdown timer, tier progression bar (5% off at 2 items, 15% off at 3 items, 25% off at 5 items), and bulk order checkout.
- **Confirmed — AI Stylist & ATP Inventory**: Slide-out smart outfit advisor drawer with instant style advice by occasion/body style paired with real-time warehouse Available-to-Promise (ATP) inventory breakdown (Allocated vs Available in Regional Hubs: Hanoi, Da Nang, HCMC).
- **Confirmed — Currency & Pricing**: Dual currency switcher seamlessly toggling between Vietnamese Dong (`₫`) and US Dollar (`$`), updating all catalogue prices and cart calculations automatically.
- **Strict Layout Compliance**: True desktop-first layout spanning full screen width (`w-full`), with content strictly constrained to `max-w-[1440px] mx-auto px-6 lg:px-12` without artificial vertical phone framing or poster letterboxing.

---

### 1. Overview & Core Concept

- **What It Does**: GAZU delivers a contemporary high-fashion streetwear and luxury basics shopping experience. Shoppers can browse editorial collections across Men, Women, and Kids, view high-resolution garments, inspect real-time stock allocation (ATP), consult an interactive AI Stylist for custom outfit coordination, and host or join a "Phòng Mua Chung" group buying session to unlock tiered wholesale-level discounts.
- **Target Audience / Persona**: Design-conscious fashion shoppers, urban trendsetters, and group buyers seeking minimal luxury apparel with transparent warehouse availability and community co-purchasing perks.
- **Key Value**: Merges minimalist editorial aesthetics with functional e-commerce capabilities: zero dead clicks, live cart and wishlist synchronization, interactive co-shopping, and warehouse-level inventory transparency.

---

### 2. User Experience & Visual Design

#### Visual Identity & Design System
- **Canvas & Structural Colors**:
  - Dominant Canvas (60%): Luxury warm stone/alabaster `#F4F4F2`.
  - Structural Contrast (30%): Deep onyx `#111111` for the announcement bar, dark category strip, and secondary banners; soft warm grey `#E5E5E0` for garment cards and subtle hairline borders.
  - Functional Accents (10%):
    - `emerald-600` (`#059669`): AI Stylist highlights, verified in-stock ATP indicators, and express fulfillment tags.
    - `orange-600` (`#EA580C`): Phòng Mua Chung (Group Buying Room) live alerts, unlock badges, and tier milestones.
- **Typography & Scale**:
  - Brand Wordmark: Bold, geometric neo-grotesque (`Plus Jakarta Sans` / `Outfit` style, tracking tight).
  - Editorial Accents: Monospaced uppercase sub-headers with clean letterspacing (`tracking-wider`).
  - Pricing & Stock Figures: Tabular numbers (`tabular-nums font-mono`) for precision alignment.
- **Section Choreography**:
  1. **Top Announcement Bar (`#111111`)**: Free delivery threshold, currency switcher (`VND / USD`), quick links (`Phòng Mua Chung`, Track Order, Help).
  2. **Main Header (Full-Width, Alabaster `#F4F4F2`)**: 
     - Left: Category navigation (`MEN`, `WOMEN`, `KIDS`, `BEAUTY`).
     - Center: Prominent `GAZU` wordmark.
     - Right: Search toggle, AI Stylist button (with emerald highlight), Login/Account, Wishlist count, and Slide-over Cart (with item count).
  3. **Editorial Hero Showcase**:
     - Oversized typographic backdrop lettering `GAZU`.
     - Campaign slogan: *"FASHION THAT MOVES WITH YOU."*
     - Walking editorial model cut-out composition.
     - Dual CTA buttons: `"SHOP NOW"` (solid black button) and `"EXPLORE NEW IN"` (subtle underline link).
     - Season tag: `NEW COLLECTION 2024`.
  4. **Dark Category Showcase Strip (`#111111`)**:
     - Three split columns for Men, Women, and Kids with dedicated thumbnail cards, editorial descriptive copy, and arrow hover transitions.
  5. **Secondary Campaign Banner ("NEW SEASON / NEW VIBES")**:
     - High-contrast editorial split banner introducing the contemporary monochrome capsule with `"EXPLORE COLLECTION"` action.
  6. **Phòng Mua Chung (Group Buying Live Room Bar & Drawer)**:
     - Real-time group session banner in `orange-600` showing active rooms, countdown timer, and savings progress bar.
  7. **Value Proposition Ribbon**:
     - 4 clean service anchors: Fast Delivery, Easy Returns, Quality Assured, Secure Payment with minimalist stroke icons.
  8. **"BEST OF GAZU" Curated Product Grid**:
     - 4-column responsive grid with warm neutral cards (`#E5E5E0`), wishlist quick-toggle, ATP stock meter in `emerald-600`, color swatches, quick-add modal, and detail view.
  9. **Interactive Modals & Drawers**:
     - **Slide-out Cart**: Line items, quantity selectors, coupon code, group discount auto-apply, and free shipping progress.
     - **AI Stylist Drawer**: Occasion-based outfit matching (Streetwear, Office Minimal, Evening, Weekend Casual) with direct bundle add.
     - **Phòng Mua Chung Modal**: Create/Join group buying session, invite mock link copy, real-time discount tier calculation.
     - **Product Quick View / ATP Breakdown**: Warehouse availability in Hanoi (Kho Bắc), Da Nang (Kho Trung), HCMC (Kho Nam) with estimated delivery lead times.
  10. **Comprehensive Desktop Footer**:
      - Full-width dark footer with brand story, customer care links, newsletter signup, and certified payment methods.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Desktop-First Full-Width Layout Architecture**
  - *Chosen Approach*: Root container spans `100vw` with alternating full-width background bands, while child content containers are strictly constrained with `max-w-[1440px] mx-auto px-6 lg:px-12`.
  - *Why*: Eliminates the claustrophobic mobile-wrapper feel on widescreen monitors while retaining pixel-perfect responsiveness on tablets and mobile screens.
  - *Alternatives Considered*: Fixed 1200px boxed layout (rejected as it leaves excessive empty margins on large displays).

- **Decision 2: Integrated Co-Shopping ("Phòng Mua Chung") Logic**
  - *Chosen Approach*: Client-side interactive room state with live mock participant join events, timer tick down, item pool aggregation, and automatic tiered price recalculation.
  - *Why*: Provides immediate, engaging proof of the user's specific request without requiring multi-tenant cloud infrastructure for instant preview and testing.

- **Decision 3: Available-To-Promise (ATP) Multi-Warehouse Stock Model**
  - *Chosen Approach*: Each product SKU has an explicit breakdown of total stock, reserved units, and Available-To-Promise (ATP) units categorized by geographic fulfillment hub (Hà Nội, Đà Nẵng, TP. Hồ Chí Minh).
  - *Why*: Delivers an enterprise-grade retail inventory feature directly into the luxury UI, giving shoppers certainty before checkout.

- **Decision 4: Visual Asset Generation Strategy**
  - *Chosen Approach*: Utilize `generate_image` in a single parallel batch turn to create authentic studio-grade editorial fashion assets for the walking hero model, category cards, and product catalogue matching the exact mood of the reference image.
  - *Fallback*: Clean SVG and high-resolution CSS textured fallbacks ensuring zero broken image frames.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             GAZU STOREFRONT ROOT                            │
│                  Full-width layout (100vw) / Alabaster Canvas               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│ Global App State │         │  Storefront Hub  │         │ Dynamic Overlays │
│ ──────────────── │         │  ──────────────  │         │ ──────────────── │
│ • Cart & Total   │         │ • Top Announce   │         │ • Slide Cart     │
│ • Wishlist Store │         │ • Main Header    │         │ • AI Stylist     │
│ • Currency Rate  │         │ • Editorial Hero │         │ • Phòng Mua      │
│ • Group Room     │         │ • Category Strip │         │   Chung Room     │
│ • ATP Inventory  │         │ • Season Banner  │         │ • ATP Quick View │
└──────────────────┘         │ • Product Grid   │         │ • Checkout Modal │
                             │ • Value Badges   │         └──────────────────┘
                             │ • Footer         │
                             └──────────────────┘
```

#### Component & Data Flow Mapping:
- `CurrencyContext`: Manages active currency (`VND` / `USD`), exchange conversion multiplier (1 USD ≈ 25,400 VND), and localized number formatting.
- `CartContext`: Handles product variants (Size: S, M, L, XL; Color), group purchase discount deduction, and local storage persistence.
- `GroupBuyContext`: Tracks room ID, active member slots, total bundled items, and tiered discount threshold (5% → 15% → 25%).
- `ProductCatalogue`: Realistic high-end streetwear inventory items with high-resolution imagery, detailed garment specs, fabric composition, and real-time ATP multi-warehouse availability.

---

### Execution Steps
1. **Asset Preparation**: Generate 4-5 high-resolution editorial fashion images matching GAZU aesthetics via `generate_image` in parallel.
2. **State & Mock Data Architecture**: Implement types, data catalog, ATP calculation, currency converters, and group buying session handlers.
3. **Core Storefront Layout**: Construct the full-width Top Bar, Navigation Header, Editorial Hero with dynamic typography, Category Strip, Secondary Banner, Product Grid, and Footer with `max-w-[1440px]` centering.
4. **Interactive Feature Integration**: Build the AI Stylist recommendation drawer, Phòng Mua Chung co-shopping room with live progress bar, ATP warehouse breakdown modal, and Cart drawer.
5. **Polishing & Verification**: Verify responsive desktop/tablet rendering, typography hierarchy, tab controls, and execute `compile_applet` to guarantee error-free deployment.
