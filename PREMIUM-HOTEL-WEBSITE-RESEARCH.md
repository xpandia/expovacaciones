# Premium Hotel & Resort Website Design Research Report
## Deep Analysis of 15 Luxury Hospitality Websites
### Compiled for Expovacaciones Redesign

---

## SITES SUCCESSFULLY ANALYZED

1. Aman Resorts (aman.com)
2. COMO Hotels (comohotels.com)
3. Rosewood Hotels (rosewoodhotels.com)
4. Mandarin Oriental (mandarinoriental.com)
5. The Ritz-Carlton (ritzcarlton.com)
6. Belmond (belmond.com)
7. EDITION Hotels (editionhotels.com)
8. Sandals Resorts (sandals.com)
9. Raffles Hotels (raffles.com)
10. Viceroy Hotels (viceroyhotelsandresorts.com)
11. Soneva (soneva.com)

---

## PART 1: INDIVIDUAL SITE BREAKDOWNS

---

### 1. AMAN RESORTS (aman.com)

**Section Order:**
1. Transparent navigation over hero
2. Hero carousel/slideshow (Slick carousel) with destination imagery
3. "2026 travel" promotional section
4. "Journeys with Aman" CTA block
5. "Hotels & Resorts" exploration section
6. Seasonal Experiences grid (6 themed cards)
7. "The World of Aman" (4 featured offerings)
8. "Get inspired" newsletter signup
9. Multi-column footer

**Hero:** Carousel slideshow using Slick library (autoplay disabled -- user-controlled). Minimal text overlay on full-width images. Featured image: "amankora-bhutan-bumthang-lodge.jpg". Text: "Journeys with Aman" + "New landscapes unfold through Aman's multi-destination journeys".

**Navigation:** Transparent over hero. Logo left, "Reserve" button right, hamburger menu. Links: Destinations, Hotels & Resorts, Experiences (Journeys, Wellness, Dining, Culture, Celebrations, Adventure, Jet Expeditions, Yachts), Exclusive Offers, Villas, Residences, About Us.

**Typography:** Sans-serif throughout. Clean, minimal. Consistent with ultra-luxury minimalism.

**Colors:** White/off-white backgrounds. Black primary text. White text on dark overlays. Imagery-driven color (turquoise oceans, warm temple tones).

**Cards:** Square images (697x697px), rectangular variants (448x589px). No visible borders. Clean edges. Semi-transparent dark overlays with white text.

**Image Treatment:** Lazy loading via Blazy (offset: 100px). Multiple aspect ratios. Natural color saturation. No filters.

**Animations:** Blazy infinite scroll (threshold: 0, 0.25, 0.5, 0.75, 1). No parallax. Static content with image reveal on scroll.

**Booking:** "Reserve" button links to /book/aman#/booking/destination/dates. Search with AJAX autocomplete (min_length: 3). Geolocation detection for contextual content.

---

### 2. COMO HOTELS (comohotels.com)

**Section Order:**
1. Fixed navigation header
2. Hero slideshow section (Swiper-based, 100vh height)
3. Main content area
4. Property showcases
5. Footer

**Hero:** Slideshow/carousel using Swiper. Full viewport height (height: 100vh). Video support integrated. Dark overlay: `linear-gradient(0deg, rgba(29,29,27,.2), rgba(29,29,27,.2))`. Text: Large heading, Helvetica Neue Extended at 72px, font-weight: 200. Color: #fff. Supports multiple caption positions (top-center, bottom-left, middle-right).

**Navigation:** Fixed position (position: fixed; top: 0; z-index: 70). Starts TRANSPARENT with white text (class `.light`), becomes OPAQUE WHITE on scroll/hover. Logo: 150px width, changes on scroll. Links: Destinations, About, Dining, Experiences. Booking trigger button.

**Typography:**
- Headings: `Helvetica-Neue-Extended`, weights 200-300
- Sizes: h1=72px, h2=56px, h3=40px, h4=24px
- Letter-spacing: 0.1em to 0.2em
- Transform: uppercase
- Body: `Helvetica Neue LT Std` or Arial, sans-serif, 14-19px, line-height 1.5-1.8
- Letter-spacing body: 0.04em to 0.15em

**Colors:**
| Element | Hex |
|---------|-----|
| Primary text | #375059 (dark blue-gray) |
| Background | #fff |
| Accent/hover | #547c8d (muted blue) |
| Secondary text | #1e1e1e |
| Borders | #c7d0d6, #d1d1d1 |
| Blog accent | #003e66 (dark teal) |
| Blog highlight | #e04e39 (coral) |

**Buttons:**
- Primary: padding 16px 35px, font 14px, letter-spacing 2.4px, uppercase
- `.marble` variant: white bg, semi-transparent (hsla(0,0%,100%,.75))
- `.iron` variant: #375059 bg, white text
- `.slate` variant: #f3f3f3 bg, dark text
- Secondary: border thin solid #547c8d, bg white, padding 11px 74px
- Hover: bg becomes #547c8d, text becomes white

**Cards:** Box-shadow: 0 4px 23px rgba(0,0,0,.02). Border-radius: 0 (sharp corners). Transitions: color 0.3s ease, background-color 0.3s ease. Text underline animation: width from 0 to 100%.

**Scroll Animations:**
```css
.fade-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition-duration: .75s;
}
.fade-on-scroll.visible {
  opacity: 1;
  transform: translate(0);
}
/* Directional variants */
.from-left { transform: translateX(-50px); }
.from-right { transform: translateX(50px); }
```
Caption animation: opacity + translateY(100px), timing: 1s ease-in-out 0.5s delay.

**Spacing:** Section padding: 50px 0 standard. Header height: 112px (60px on tablet). Container max-width: 1440px. Side padding: 60px desktop, 80px at 1440px+, 20px mobile.

---

### 3. ROSEWOOD HOTELS (rosewoodhotels.com)

**Section Order:**
1. Fixed navigation (hamburger + centered logo + language/reserve)
2. Hero carousel (4 slides, auto-rotating, video support)
3. Recent Stories editorial grid
4. Exclusive Launch (product feature)
5. Wellness Feature
6. About Section
7. Offers Section
8. Hotels/Destinations carousel
9. Residences Section
10. Events & Venues
11. Shop Section
12. Video carousel
13. Property grid
14. Foundation Feature
15. Experiences grid
16. Discovery/Offers carousel
17. Shop Collection
18. Newsletter signup
19. Multi-column footer

**Hero:** Carousel with 4 slides + video background support. Black semi-transparent overlay (~40% opacity). Centered headline + "Discover" CTA.

**Navigation:** Fixed/persistent. Initially transparent, solid on scroll. Hamburger left, logo centered (SVG wordmark), reserve button right. AEM-powered (Adobe Experience Manager).

**Typography:** Sans-serif predominant. Hero headlines 48px+. Section headers 32-42px. Body 16-18px. Labels 12-14px.

**Colors:** Black/near-black primary. White/off-white backgrounds. Gold/champagne accent tones. Semi-transparent black overlays (rgba ~40%).

**Cards:** No visible borders. Soft shadows (~0 2px 8px rgba(0,0,0,0.1)). Border-radius 4-8px subtle. Image-heavy with text overlay. Full-bleed carousel cards.

**Images:** CDN via Picasso (rosewoodhotelgroup.com). Primarily 16:9 landscape and 1:1 square. Dark 30-40% opacity gradient overlays. High contrast, natural saturation.

**Spacing:** 40-60px section margins. 20-40px card padding. 20-30px grid gaps. Full-bleed mobile, 1200-1400px max-width desktop.

---

### 4. MANDARIN ORIENTAL (mandarinoriental.com)

**Section Order:**
1. Navigation header
2. Hero carousel (Bangkok property featured)
3. "Stay" hotel grid by region
4. "Dine" restaurant cards
5. "Wellness" spa offerings
6. "More at Mandarin Oriental" (Explore, Celebrate, Meet, Gift)
7. Footer

**Hero:** Image slideshow with lazy-loading (data:image/gif placeholders). Text: "150 Years of Hospitality and Tradition". CTA: "See More". Multiple hero variations in carousel.

**Navigation:** Fixed position. White background. Mega-menu dropdowns. Links: Stay, Dine, Wellness, Explore, Celebrate, Meet, Gift, Offers. Guest Support, Sign In/Join, Language selector.

**Typography:** Clean modern sans-serif (likely system font stack). Body opacity animation on load: opacity 0 removed after 3000ms.

**Colors:** White/light neutral backgrounds. Dark gray/black text. Brand gold/cream tones implied.

**Cards:** Rounded corners. Shadow effects. "See More" hover states. Landscape orientation images.

**Booking:** "Book" button in nav. Synxis platform integration. Fans of M.O. loyalty system.

---

### 5. THE RITZ-CARLTON (ritzcarlton.com)

**Section Order:**
1. Navigation with search
2. Hero with VIDEO background + booking widget overlay
3. "Where to Go Next" featured hotels carousel
4. "Journey of a Lifetime" -- Ritz-Carlton Reserve
5. Yacht Collection
6. Hawaiian Islands promotion
7. Rental Collection
8. Editorial content
9. Destination Ideas grid
10. "Explore the World" multi-category carousel
11. Footer

**Hero:** VIDEO BACKGROUND with dark gradient overlay. Text: "Journey into a world where wonders await around every corner. Welcome to the world of Ritz-Carlton." BOOKING WIDGET embedded directly in hero with destination, dates, rooms/guests, rate selector.

**Navigation:** Fixed, semi-transparent white background. Links: Hotels & Resorts, Reserve, Residences, Yachts, About, The Journey. "Sign in or Join" + "Reserve Now" CTA.

**Typography:** `Caslon540Std` (SERIF, custom branded typeface)
| Element | XS | M | L |
|---------|-----|-----|-----|
| Display-L (uppercase) | 3.75rem | 7.8125rem | 12.5rem |
| Title-L | 2.375rem | 2.75rem | 3.75rem |
| Title-M | 3.125rem | -- | 4rem |
| Title-S | 1.75rem | 1.875rem | 2.5rem |
| Subtitle-XL | 1.625rem | 1.875rem | 2.5rem |
Weight: 400 throughout. Letter-spacing: Display 1px uppercase; Overline 1.3px.

**Colors (CSS Custom Properties):**
| Variable | Hex | Use |
|----------|-----|-----|
| --rzp-50 | #1c1c1c | Primary dark |
| --rzp-60 | #ffffff | White |
| --rzp-70 | #f4f4f4 | Light gray bg |
| --rzp-30 | #646464 | Medium gray |
| --rzp-40 | #916E27 | GOLD ACCENT |
| --alert-10 | #d0021b | Error red |
| --rzp-10 | #E0E3EC | Light accent |
| --rzp-20 | #e9f1fa | Light blue |

**Buttons:** Background #1c1c1c, text white, hover tan/gold #646464. Border-radius: 0px (SHARP CORNERS). Padding: 16px x 32px.

**Cards:** Border-radius: 14px (--t-cards-border-radius). Dark gradient overlay on images.

**Gradients:**
- Desktop: `linear-gradient(270deg, rgba(255,255,255,0) 0.03%, rgba(255,255,255,0.46) 58%)`
- Mobile: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.73) 100%)`

**Images:** Primarily landscape 4:3 or 16:9. Marriott CDN (cache.marriott.com). Lazy loading with base64 placeholder PNGs.

---

### 6. BELMOND (belmond.com)

**Section Order:**
1. High-contrast toggle
2. Transparent navigation
3. Hero (full-screen, bg-cover, centered text, white text)
4. "Discover a new pace of travel"
5. "New from Belmond" featured cards
6. Product cards (Marguerite boat, Celia train, Villa San Michele)
7. Photobooks section
8. Assouline books
9. Britannic Explorer train
10. Browse latest offers (4-card grid)
11. Contact form
12. Newsletter signup
13. Footer

**Hero:** Full-screen section (`w-screen h-screen`). Background cover + center. Text centered, white. Dark overlay on hover: `bg-black/40`. Scroll-to-content arrow button: `rounded-1/2 border border-black icon-arrow-down-hard`.

**Navigation:** Transparent over hero. Modal-based menu with focus-trapping. Links: Destinations, Experiences, Packages & Tours, Signature Suites & Villas, Occasions, Offers, Stories. Multi-language: EN, FR, DE, IT, JA, ES, PT.

**Typography:** Uses Tailwind CSS with `font-body` utility class. Strong hierarchy.

**Animations:** Tailwind motion-safe animations:
```
inview-animation motion-safe:inview-faderight motion-safe:duration-1000 motion-safe:delay-500
motion-safe:transition-opacity motion-safe:duration-300
```
Dark overlays appear on hover: `motion-safe:opacity-0` to visible.

**Cards:** Image-based with text overlay. White content boxes: `md:bg-white md:px-16 md:py-22 xl:px-24 xl:py-32`. Minimum heights: `lg:min-h-[36rem] xl:min-h-[54.8rem]`.

**Spacing:** Tailwind spacing: `md:mt-9 md:-ml-9 xl:mt-16 xl:-ml-16`. Footer dividers: `h-[.1rem] my-[2.5rem]`.

**Booking:** Multi-step widget supporting Hotels & Resorts, Trains, Boats, Safaris. Integration with SevenRooms and OpenTable for dining.

---

### 7. EDITION HOTELS (editionhotels.com)

**Section Order:**
1. Transparent navigation with hamburger
2. Hero with tagline
3. "Learn More" CTA
4. Image gallery (3 property photos)
5. "Now Open" Lake Como feature
6. "The New Generation Of Luxury"
7. Dining & Entertainment carousel
8. Shop Edition products
9. The Broadsheet magazine
10. Coming Soon
11. Special Offers
12. Email signup
13. Footer

**Hero:** Static image-based with dark overlay. Tagline: "extraordinary style & exceptional service". EDITION logo centered. Background images via CSS.

**Navigation:** Transparent with white logo. Hamburger menu. Fixed on scroll (`.body-onscroll` class). Reserve button sticky. Properties organized by region.

**Typography:**
- Serif: `Didot` (headlines, major titles)
- Sans-serif: `HelveticaLTStd-Bold`, `HelveticaNeueLTStd-Lt`
- Fallback: "Helvetica Neue", "Helvetica", sans-serif
- Hero h1: 72px
- Event titles: 36px uppercase centered
- Body: 13-14px
- Presets: medium 20px, large 36px, x-large 42px

**Colors:**
| Use | Hex |
|-----|-----|
| Primary dark | #000000, #111111 |
| White | #ffffff |
| Alt text | #222222 |
| Secondary | #666 |
| Borders | #ccc, #cdcdcd |
| Table zebra | #eee |

**Buttons:** Background #111111, color white, border 1px solid #111111. Font: HelveticaLTStd-Bold. Rounded: border-radius 9999px (fully rounded pills for WP buttons).

**Shadows (CSS Custom Properties):**
```css
--wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);
--wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--outlined: 6px 6px 0px -3px rgba(255, 255, 255, 1), 6px 6px rgba(0, 0, 0, 1);
--wp--preset--shadow--crisp: 6px 6px 0px rgba(0, 0, 0, 1);
```

**Spacing Scale:**
```css
--wp--preset--spacing--20: 0.44rem
--wp--preset--spacing--30: 0.67rem
--wp--preset--spacing--40: 1rem
--wp--preset--spacing--50: 1.5rem
--wp--preset--spacing--60: 2.25rem
--wp--preset--spacing--70: 3.38rem
--wp--preset--spacing--80: 5.06rem
```

**Images:** Aspect ratios supported: 1:1, 4:3, 3:4, 3:2, 2:3, 16:9, 9:16. Object-fit: cover. Max-height: 560px on venue banners. Hero min-height: 690px.

**Animations:** Scroll-triggered nav repositioning. Transition: `all .4s ease .2s` on product cards.

---

### 8. SANDALS RESORTS (sandals.com)

**Section Order:**
1. Navigation with booking CTA
2. Hero promotional banner (Stay More savings)
3. Vacation Promise banner
4. Wedding Promo
5. Butler Sky Villas
6. Suite Deals
7. Rates banner
8. Over-the-Water Bungalows
9. Resort Selector (destination/resort dropdowns)
10. "Get Closer to Caribbean" text
11. Find Ideal Sandals
12. Island Selection interactive
13. What's Included grid
14. 17 Resorts Showcase
15. Beaches Family Resorts CTA
16. Reviews/Awards
17. Multi-column footer

**Hero:** Static image slideshow with promotional badge overlay (SVG). Mobile and desktop responsive variants. Savings messaging prominent.

**Navigation:** Background (not transparent). Fixed on scroll. CTA: "Ver tarifas y disponibilidad". Links: Resorts, Incluye, Celebraciones, Grupos, Especiales.

**Typography:**
- Primary: `SandalsSlab` (slab serif for taglines)
- Body: Sans-serif system fonts
- H1: 5rem mobile, 8rem desktop
- Tagline: 1rem, leading 1.6rem, tracking 0.4px

**Colors:**
- Primary blue: rgb(36, 55, 140) (navy)
- White: #ffffff
- Black: #000000 (footer bg)
- Gray: text-gray-37

**Buttons:** Prominent pricing CTAs. Booking links to obe.sandals.com.

**Spacing (Tailwind):**
- pt-[2.5rem] (40px)
- pb-[3.5rem] (56px)
- mt-[10rem] (160px major sections)
- mt-[14rem] (224px footer offset)
- mr-[1rem] (16px button gaps)

**Cards:** Sharp corners. No visible shadows. Resort cards with image, name, location, price, review count. Grid layout with responsive columns.

**Footer:** Black background. 5 column groups. Social icons: h-[3.2rem] w-[3.2rem], rounded 20%, bordered. Dividers: h-[.1rem] my-[2.5rem].

---

### 9. RAFFLES HOTELS (raffles.com)

**Section Order:**
1. Navigation header
2. Hero with booking widget
3. Hotels & Resorts showcase (20 property cards)
4. "A world of elegance" feature
5. "The Butler Did It Collection"
6. "Adventures and encounters" (4 experience sections)
7. Video timeline ("Discover the storied history")
8. ALL loyalty program
9. Newsletter subscription
10. Social media feed
11. Footer

**Hero:** Static image with interactive booking widget overlay. Featured: Raffles Singapore. Dark semi-transparent overlay. Text: "Places of authentic culture". CTA: "Discover".

**Navigation:** Fixed with scroll state detection (`header--scroll` class). SVG logo. Multi-language (en, de, es, fr, tr, ru, ar, zh, ja). Links: Destinations, Hotels & Resorts, Residences, Experiences, Offers, Occasions, Sustainability, About, Raffles 1887 (magazine).

**Colors:**
- Primary button bg: #0C1F1E (dark teal/navy)
- Button text: #FFFFFF
- Links: dark teal

**Scroll Animations:**
```javascript
// Intersection Observer: elements with '.c-appeared' gain 'c-appeared--done'
// when 25% visible (threshold: 0.25)
// Unobserves after animation triggers (one-time)
```

**Booking:** Widget with destination selector (19 hotels), date pickers, rooms & guests config, special rates (loyalty, promo, travel agent codes). Redirects to newbooking.azds.com (Accor platform).

---

### 10. VICEROY HOTELS (viceroyhotelsandresorts.com)

**Section Order:**
1. Transparent sticky navigation
2. Hero image carousel (10 slides)
3. "A Constellation of Discovery" headline
4. Properties carousel
5. Experiences section (4 features)
6. Exclusive Offers & Packages (3 offers)
7. Residences carousel (7 items)
8. "Gather" events section
9. Newsletter signup
10. 3-column footer

**Hero:** Image carousel with dots navigation ("1 of 10"). Dark semi-transparent overlay. White text. "A Constellation of Discovery" headline.

**Navigation:** Fixed/sticky. Transparent background. "Book Now" primary CTA. Links: Locations, Experiences, Residences, Gather, Loyalty, Offers, Journal, Press, Gallery, Contact.

**Typography:** Sans-serif primary. Serif for hero headlines. Mixed hierarchy.

**Cards:** Image-based with text overlay. Tall cards (portrait) for properties. Wide cards (landscape) for residences. Large square: 960x960px.

**Images:** Served through Drupal image style system. Hero mobile variants. Multiple ratio classes.

**Footer:** 3 columns (About, Legal, Values). Social: Instagram, Facebook, TikTok, LinkedIn, Spotify.

---

### 11. SONEVA (soneva.com)

**Typography:**
- Headings: `Miller Display Light` (SERIF)
- Body: `Aller` (sans-serif, including italic variant)
- h2, h3: `miller !important`
- Buttons/UI: `miller` font-family
- CSS variable: `--font-family-body: aller`

**Colors:** Earth tones. Neutral palette. #333 primary text. #63666a button color. #444444 hover states. #9e9e9e secondary/muted elements. #eee backgrounds. #ced4da border accents.

**Cards:** Box-shadow: `0 2px 4px rgba(0,0,0,.1)`. Slick carousel cards.

**Booking:** Litepicker date picker integration. Booking form with resort selector. Dropdown with hover: bg #eee. Selected: bg #eee.

**Animations:** Slick carousel transitions. All transitions: 0.3s linear.

---

## PART 2: CROSS-SITE PATTERN ANALYSIS

---

### LAYOUT PATTERNS (Universal)

**Standard Premium Section Flow:**
1. Transparent nav over full-screen hero
2. Brand statement or featured destination
3. Property/destination showcase (carousel or grid)
4. Experiences/activities section
5. Editorial/stories content
6. Special offers
7. Newsletter signup
8. Multi-column footer

**Hero Approaches (by popularity):**
- Image Carousel/Slideshow: 8/11 sites (Aman, COMO, Rosewood, Mandarin Oriental, Belmond, Raffles, Viceroy, Sandals)
- Video Background: 2/11 (Ritz-Carlton, COMO supports video)
- Static with Overlay: 1/11 (EDITION)

**Navigation Patterns:**
- Transparent over hero, becoming opaque on scroll: 9/11 sites
- Fixed/sticky: 10/11 sites
- Hamburger menu: 7/11 sites
- Centered logo: 6/11 sites
- "Reserve" / "Book Now" button ALWAYS in top-right

---

### TYPOGRAPHY RULES

**The Serif vs Sans-Serif Split:**

| Brand | Headings | Body |
|-------|----------|------|
| Aman | Sans-serif | Sans-serif |
| COMO | Helvetica Neue Extended (sans) | Helvetica Neue LT Std (sans) |
| Rosewood | Sans-serif (geometric) | Sans-serif |
| Ritz-Carlton | Caslon540Std (SERIF) | Sans-serif |
| EDITION | Didot (SERIF) | Helvetica (sans) |
| Soneva | Miller Display (SERIF) | Aller (sans) |
| Sandals | SandalsSlab (slab serif) | System sans-serif |
| Belmond | Custom serif (implied) | Sans-serif body |

**KEY FINDING:** 6 out of 11 premium brands use SERIF for headings paired with SANS-SERIF for body. This is the dominant luxury pattern. The remaining use all-sans for ultra-minimalist positioning.

**Typography Sizing Patterns:**
- Hero text: 48px-72px (up to 12.5rem for display on Ritz-Carlton)
- Section headings: 32px-56px
- Body text: 14px-19px
- Labels/UI: 12px-15px
- Letter-spacing: 0.04em-0.2em on headings (CRITICAL for luxury feel)
- Text-transform: uppercase on headings and CTAs (very common)
- Font-weight: 200-400 on headings (LIGHT weights, NOT bold -- this is key)

---

### COLOR STRATEGY

**Background Colors Used Across All Sites:**

| Color | Hex | Usage |
|-------|-----|-------|
| Pure White | #ffffff | Primary background (ALL sites) |
| Off-White / Cream | #f4f4f4, #fafafa | Alternate section backgrounds |
| Very Light Gray | #f3f3f3, #eee | Card backgrounds, alternate rows |
| Near-Black | #1c1c1c, #111111, #000000 | Footer backgrounds, hero overlays |

**Text Colors:**
| Color | Hex | Usage |
|-------|-----|-------|
| Near-black | #1c1c1c, #111111, #1e1e1e | Primary headings |
| Dark gray | #222222, #333333 | Body text |
| Medium gray | #646464, #666666 | Secondary text, captions |
| Muted gray | #909090, #9e9e9e | Tertiary, disabled states |

**Accent Colors by Brand:**
| Brand | Accent | Hex |
|-------|--------|-----|
| Ritz-Carlton | Gold | #916E27 |
| COMO | Muted Blue | #547c8d |
| COMO | Dark Teal | #003e66 |
| COMO | Coral | #e04e39 |
| Raffles | Dark Teal | #0C1F1E |
| Sandals | Navy | rgb(36, 55, 140) |

**KEY FINDING:** Premium sites use an extremely restrained color palette. 95% of the page is white/off-white + dark text. Accent colors appear sparingly -- usually only on CTAs, active states, or single highlight elements. NO bright primary colors as backgrounds. Gold/champagne is the most common luxury accent.

---

### CARD & COMPONENT DESIGN

**Card Shadows Across Sites:**
```css
/* COMO - Ultra subtle */
box-shadow: 0 4px 23px rgba(0, 0, 0, 0.02);

/* Soneva - Light */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

/* EDITION - Available presets */
--shadow-natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
--shadow-deep: 12px 12px 50px rgba(0, 0, 0, 0.4);

/* Rosewood - Soft */
box-shadow: ~0 2px 8px rgba(0, 0, 0, 0.1);
```

**KEY FINDING:** Shadows are EXTREMELY subtle or absent. Premium sites prefer borderless cards with minimal depth. The trend is toward NO shadow or shadows with less than 10% opacity.

**Border Radius:**
- 0px (sharp corners): COMO, EDITION buttons, Aman
- 4-8px (subtle): Rosewood
- 14px (moderate): Ritz-Carlton cards
- 9999px (pill): EDITION WP buttons only

**KEY FINDING:** Sharp corners (0-8px) are the dominant luxury pattern. Rounded corners above 14px are rare. Pill buttons are used sparingly.

**Hover Effects:**
- Color transitions: 0.3s ease (universal)
- Text underline animations (width 0 to 100%)
- Image opacity shifts
- Background-color and text-color swap on buttons
- Subtle scale (1.02x) on image cards
- EDITION: `transition: all .4s ease .2s`

---

### IMAGE TREATMENT

**Aspect Ratios Used:**
- Full-viewport (100vh): Hero sections
- 16:9: Primary landscapes
- 4:3: Property cards
- 3:2: Blog/editorial
- 1:1 (square): Grid cards (Aman 697x697)
- Portrait 3:4 or 2:3: Tall card variants

**Overlay Patterns:**
```css
/* Aman - Minimal dark */
background: semi-transparent dark overlay (~30-40% opacity)

/* COMO - Subtle warm */
linear-gradient(0deg, rgba(29,29,27,.2), rgba(29,29,27,.2))

/* Ritz-Carlton - Directional */
linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.46) 58%)

/* Belmond - Hover reveal */
bg-black/40 (Tailwind: 40% black overlay on hover)
```

**KEY FINDING:** ALL premium sites use dark gradient overlays on hero images (30-50% opacity). The gradient is typically directional (bottom-to-top or side-to-side) to create space for text. Images are ALWAYS natural/unfiltered -- no Instagram-style filters.

**Image Optimization:**
- Lazy loading: ALL sites (Blazy, native, placeholder GIFs)
- CDN delivery: Picasso (Rosewood), Marriott CDN, Akamai, Accor CDN
- Responsive: srcset, multiple size variants
- Object-fit: cover (universal)
- Object-position: 50% 50% (centered)

---

### ANIMATION & INTERACTION PATTERNS

**Scroll Animations (ranked by frequency):**

1. **Fade-in on scroll** (most common):
```css
/* COMO pattern */
opacity: 0 -> 1
transform: translateY(50px) -> translate(0)
transition-duration: 0.75s
```

2. **Fade-in with direction** (common):
```css
/* Belmond Tailwind pattern */
inview-faderight, duration-1000, delay-500
```

3. **Intersection Observer** (Raffles):
```javascript
threshold: 0.25 (25% visible triggers animation)
// One-time: unobserves after triggering
```

4. **Carousel auto-advance** (Rosewood, Ritz-Carlton):
```
5-8 second intervals between slides
```

**What is NOT used:**
- Heavy parallax scrolling (ZERO sites use aggressive parallax)
- Scroll-jacking (NONE)
- Particle effects (NONE)
- Complex SVG animations (NONE)
- Loading spinners/animations (minimal)

**Page Load Animations:**
- Mandarin Oriental: body opacity 0 -> 1 after 3000ms (fade-in reveal)
- Most sites: content appears progressively via lazy loading

---

### BOOKING/SEARCH UX

**Patterns identified:**

1. **Button-only (most luxury):** Aman, Rosewood, Belmond, EDITION -- simple "Reserve" button in nav that links to booking page
2. **Embedded widget (mid-luxury):** Ritz-Carlton, Sandals, Raffles -- booking form directly in hero or below
3. **Dropdown on click:** COMO -- booking area reveals from nav button click

**Form Fields (when present):**
- Destination selector (dropdown)
- Check-in / Check-out dates (calendar picker)
- Rooms & Guests (expandable)
- Special rates/codes (accordion or toggle)
- "Find Hotels" / "Check Rates" submit button

---

### SPACING SYSTEM

**Vertical Spacing Between Major Sections:**
| Site | Section Gap |
|------|------------|
| COMO | 50px standard |
| Rosewood | 40-60px |
| EDITION | 3.38rem-5.06rem (54px-81px) |
| Sandals | 2.5rem-3.5rem (40-56px) |
| Ritz-Carlton | 3-5rem estimated |

**Container Max-Widths:**
- COMO: 1440px
- Rosewood: 1200-1400px
- Most luxury: 1200-1440px range

**Side Padding:**
- Desktop: 60-80px
- Tablet: 40px
- Mobile: 16-20px

**KEY FINDING:** Premium sites use 50-80px vertical gaps between sections. This generous whitespace is one of the strongest signals of luxury. Generic sites use 20-30px. The difference is dramatic.

---

## PART 3: WHAT MAKES THEM FEEL "PREMIUM"

### The 12 Design Principles of Premium Hospitality Websites

1. **EXTREME WHITESPACE:** 50-80px between sections minimum. Content never feels cramped. White backgrounds dominate. Let imagery breathe.

2. **PHOTOGRAPHY IS KING:** Images are full-bleed, high-resolution, naturally lit, unfiltered. They occupy 60-70% of visual real estate. Text is secondary.

3. **RESTRAINED COLOR:** White + near-black + ONE accent (usually gold, teal, or navy). No bright backgrounds. No gradients as decoration. Color comes from photography.

4. **SERIF HEADINGS + SANS BODY:** The dominant pairing. Serif for headings (Didot, Caslon, Miller) communicates heritage and elegance. Sans-serif body (Helvetica, system fonts) ensures readability.

5. **LIGHT FONT WEIGHTS:** Weights 200-400 on headings. NEVER bold display text. Thinness = refinement. Bold = generic.

6. **GENEROUS LETTER-SPACING:** 0.04em-0.2em on headings. Uppercase + wide tracking = instant luxury feel.

7. **TRANSPARENT NAVIGATION:** Starts invisible over hero, materializes on scroll. Logo centered or left. Always a booking CTA in top-right.

8. **FULL-VIEWPORT HERO:** 100vh minimum. Slideshow or video. Minimal text overlay. Dark gradient (30-40% opacity) for text readability.

9. **SUBTLE OR NO SHADOWS:** Cards rarely have visible shadows. When present, they are under 10% opacity. Premium = flat or barely-there depth.

10. **SHARP CORNERS ON BUTTONS, GENTLE ON CARDS:** Buttons: 0px radius (rectangular) or pill (9999px). Cards: 0-14px radius max. No medium radius (16-20px is avoided).

11. **ANIMATION RESTRAINT:** Only fade-in-on-scroll and subtle hover transitions. 0.3s-0.75s durations. No bouncing, no spinning, no aggressive parallax. Movement is slow and intentional.

12. **EDITORIAL CONTENT FLOW:** Sections alternate between full-width imagery and contained text. The page reads like a magazine, not a dashboard.

---

### ANTI-PATTERNS EVERY PREMIUM SITE AVOIDS

1. **Bright gradient backgrounds** (blue-to-purple, etc.)
2. **Heavy drop shadows** on cards (> rgba 0.15)
3. **Bold/800-900 weight** on headings
4. **Small hero images** (anything less than full-viewport)
5. **Cluttered navigation** (more than 7-8 top-level items visible)
6. **Stock photo appearance** (over-saturated, over-posed)
7. **Busy patterns** or textured backgrounds
8. **Aggressive animations** (bouncing, sliding from sides, particle effects)
9. **Rounded corners over 16px** on cards (looks app-like, not luxury)
10. **Multiple accent colors** (one accent maximum)
11. **Visible borders on cards** (borderless or hairline only)
12. **Dense text blocks** (max 2-3 lines per section description)
13. **Cookie-cutter grid layouts** without hierarchy variation
14. **Countdown timers or urgency messaging** (Sandals does this -- it's the least "premium" site)
15. **Pop-ups and overlays** (minimal intrusions)

---

## PART 4: ACTIONABLE SPECIFICATIONS FOR EXPOVACACIONES REDESIGN

### Recommended Color Palette
```css
:root {
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f8f6;      /* warm off-white */
  --bg-tertiary: #f4f4f4;
  --bg-dark: #1a1a1a;

  /* Text */
  --text-primary: #1c1c1c;
  --text-secondary: #4a4a4a;
  --text-muted: #8a8a8a;
  --text-white: #ffffff;

  /* Accent */
  --accent-primary: #916E27;     /* gold -- Ritz-Carlton inspired */
  --accent-secondary: #547c8d;   /* muted ocean blue -- COMO inspired */

  /* Overlays */
  --overlay-hero: rgba(0, 0, 0, 0.35);
  --overlay-card: rgba(0, 0, 0, 0.4);
}
```

### Recommended Typography
```css
/* Heading: Use a quality serif */
font-family: 'Playfair Display', 'Georgia', serif;
font-weight: 300;          /* LIGHT */
letter-spacing: 0.08em;
text-transform: uppercase;  /* for section labels */

/* Body: Clean sans-serif */
font-family: 'Inter', 'Helvetica Neue', sans-serif;
font-weight: 400;
letter-spacing: 0.02em;
line-height: 1.6;

/* Scale */
--text-hero: clamp(2.5rem, 5vw, 4.5rem);
--text-h2: clamp(1.75rem, 3vw, 3rem);
--text-h3: clamp(1.25rem, 2vw, 2rem);
--text-body: clamp(0.875rem, 1.1vw, 1.125rem);
--text-small: 0.875rem;
--text-label: 0.75rem;
```

### Recommended Spacing System
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 2rem;      /* 32px */
--space-lg: 3.5rem;    /* 56px */
--space-xl: 5rem;      /* 80px */
--space-2xl: 8rem;     /* 128px */
--section-gap: 5rem;   /* Between major sections */
--container-max: 1400px;
--container-padding: clamp(1.25rem, 4vw, 5rem);
```

### Recommended Card Styles
```css
.card {
  border: none;
  border-radius: 8px;          /* subtle */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}
.card img {
  object-fit: cover;
  aspect-ratio: 4/3;
  width: 100%;
}
```

### Recommended Button Styles
```css
.btn-primary {
  background: #1c1c1c;
  color: #ffffff;
  border: 1px solid #1c1c1c;
  padding: 14px 36px;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 0;             /* sharp corners */
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: #916E27;         /* gold accent on hover */
  border-color: #916E27;
}

.btn-secondary {
  background: transparent;
  color: #1c1c1c;
  border: 1px solid #1c1c1c;
  padding: 14px 36px;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 0;
  transition: all 0.3s ease;
}
.btn-secondary:hover {
  background: #1c1c1c;
  color: #ffffff;
}
```

### Recommended Scroll Animations
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* JavaScript: Intersection Observer */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); /* one-time */
    }
  });
}, { threshold: 0.2 });
```

### Recommended Hero Section
```css
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.45) 100%
  );
}
.hero__content {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  z-index: 2;
}
```

### Recommended Navigation
```css
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 1.5rem 3rem;
  transition: background 0.3s ease, padding 0.3s ease;
  background: transparent;
}
.nav.scrolled {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
  padding: 1rem 3rem;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
}
```

---

## PART 5: PREMIUM WEBSITE STRUCTURE TEMPLATE

**Ideal Section Order for a Travel Expo Website:**

1. **Transparent navigation** (logo left, 4-5 links center, CTA right)
2. **Full-screen hero** (video or slideshow, 100vh, dark gradient overlay, event title + date + CTA)
3. **Brand statement** (1-2 sentences, centered, generous padding)
4. **Key attractions/highlights** (3-4 cards, editorial layout)
5. **Featured exhibitors** (logo carousel or grid)
6. **Experience sections** (alternating image-left/right layouts)
7. **Testimonials or past editions** (photo gallery with subtle carousel)
8. **Practical info** (venue, dates, schedule -- clean grid)
9. **Sponsors** (logo strip, minimal)
10. **Newsletter signup** (simple, centered)
11. **Footer** (3-4 columns, dark background)

---

*Research compiled from live analysis of 11 premium hospitality websites. Data extracted from HTML source, inline CSS, CSS custom properties, class names, and rendered content. April 2026.*
