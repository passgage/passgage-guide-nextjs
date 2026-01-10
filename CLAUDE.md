# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Passgage Guide is a Next.js 16 migration of a static HTML installation guide website. This is an **active migration project** - all guide pages have been fully migrated from the original static HTML with 1:1 design matching.

**Key constraint**: Design must match old production exactly (1:1). Any changes to colors, layout, spacing, or visual elements must preserve the original production design.

## Development Commands

```bash
# Development server (port 3002)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Seed Qdrant vector database (FAQ search)
npm run seed-qdrant
```

**Port Configuration**: Dev server runs on port 3002 (not default 3000) to avoid conflicts with other local projects.

## Critical Architecture Patterns

### 0. **MOST IMPORTANT RULE: Tailwind CSS ONLY**

**This project uses ONLY Tailwind CSS utility classes with a mobile-first approach. NO custom CSS classes are allowed.**

**Rules:**
1. **Mobile-first breakpoints**: Always start with mobile styles, then add `sm:`, `md:`, `lg:`, `xl:` breakpoints
   ```tsx
   // ✅ CORRECT - Mobile first
   <div className="px-4 sm:px-8 md:px-12 lg:px-16">

   // ❌ WRONG - Desktop first
   <div className="px-16 md:px-12 sm:px-8">
   ```

2. **NO custom CSS classes**: Never use custom classes like `.hero`, `.btn`, `.card`, etc.
   ```tsx
   // ✅ CORRECT - Tailwind utilities
   <section className="relative pt-36 pb-24 px-4 sm:px-8 overflow-hidden">

   // ❌ WRONG - Custom CSS class
   <section className="hero">
   ```

3. **Inline styles ONLY for complex gradients and animations**:
   ```tsx
   // ✅ CORRECT - Complex gradient that can't be done in Tailwind
   <div style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}>

   // ✅ CORRECT - Animation keyframe reference
   <div style={{ animation: 'float 3s ease-in-out infinite' }}>
   ```

4. **globals.css contains ONLY**:
   - `@import "tailwindcss"` - Tailwind 4 import
   - Base styles (`body` only - minimal)
   - `@keyframes` animations (fadeIn, slideUp, slideDown, pulseGlow, scaleIn, blob, float, gridMove)
   - Animation utility classes (`.animate-fade-in`, `.animate-slide-up`, `.animate-float`, etc.)
   - `.visually-hidden` - Accessibility-only class
   - `.custom-scrollbar` - Custom scrollbar styling
   - `.hero-bg` & `.hero-grid` - Landing page hero background (complex pseudo-elements, can't be Tailwinded)
   - Print media queries (hide navigation on print)

5. **ABSOLUTE PROHIBITIONS**:
   - ❌ NO custom component classes (`.card`, `.button`, `.hero`, etc.) - USE TAILWIND UTILITIES
   - ❌ NO CSS variables in globals.css - ALL colors defined in `tailwind.config.ts`
   - ❌ NO new CSS classes - USE TAILWIND or inline styles for gradients/animations
   - ❌ NO `@layer components` with custom classes - ONLY for `.visually-hidden`

6. **When to use inline styles vs Tailwind**:
   - Tailwind: 99% of styling (layout, colors, spacing, shadows, etc.)
   - Inline styles: ONLY for complex gradients and animation references
   ```tsx
   // ✅ CORRECT - Gradient that can't be in Tailwind
   style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}

   // ✅ CORRECT - Animation reference from globals.css
   style={{ animation: 'blob 7s infinite' }}

   // ❌ WRONG - Use Tailwind instead
   style={{ padding: '20px', borderRadius: '10px' }} // Use p-5 rounded-xl
   ```

### 1. Design System - Passgage Kurumsal Renkleri

The project uses **Passgage.com kurumsal renk paleti** - defined in `tailwind.config.ts`:

```typescript
// Primary Brand Colors (UNIVERSAL)
'passgage-red': '#FF501D'      // Turuncu-kırmızı (gradient start)
'passgage-gold': '#FFD700'     // Altın-sarı (gradient end)
'passgage-blue': '#2872fa'     // Passgage mavi
```

**Platform-specific accents**:
- iOS guide: `#1d1d1f` (ios-black), `#86868b` (ios-gray)
- Android guide: `#3ddc84` (android-green)
- Access Tag guide: `#2872fa` (tag-blue), `#1a5490` (tag-navy)

**Gradient Kullanımı (Tailwind CSS):**

```tsx
// ✅ CORRECT - Step badges, buttons, icons (Tailwind)
<div className="bg-gradient-to-br from-passgage-red to-passgage-gold">

// ✅ CORRECT - Gradient text (Tailwind)
<span className="bg-gradient-to-r from-passgage-red to-passgage-gold bg-clip-text text-transparent">
  Gradient Text
</span>

// ❌ ONLY for complex multi-color gradients (rare)
<div style={{ background: 'linear-gradient(135deg, rgba(...), rgba(...))' }}>
```

**Logo Usage:**
```tsx
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Passgage"
  width={160}
  height={40}
  priority
/>
```

### 2. Page Structure - Custom Headers for Guide Pages

**Landing page** (`/`): Uses standard Header component with logo and badge.

**Guide pages** (`/ios`, `/android`, `/access-tag`): Use **custom header** integrated directly in the page with:
- Back button linking to home
- Passgage logo
- Platform-specific badge (e.g., "iOS Kurulumu", "Android Kurulumu", "Access Tag Kurulumu")
- ProgressNav component for step tracking

Do not use the shared Header component for guide pages - they have custom headers with ProgressNav.

### 3. ProgressNav Component - Automatic Scroll Tracking

The ProgressNav component uses IntersectionObserver to automatically track which step is visible:

```typescript
const iosSteps = [
  { id: 'step1', number: 1, label: 'Uygulamayı indirin' },
  { id: 'step2', number: 2, label: 'Gerekli izinleri verin' },
  // ... etc
];

<ProgressNav steps={iosSteps} />
```

**Requirements**:
- Each step section must have `id="step1"`, `id="step2"`, etc.
- Step IDs must match the `id` field in the steps array
- Observer threshold: 15% visibility with -100px top margin
- Automatically tracks Google Analytics navigation events
- Supports keyboard navigation (Arrow keys, Enter/Space)

### 4. Hero Sections - Pattern Guidelines

**Landing Page** (`/`) uses a unique hero with animated grid background:

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-6 md:px-8">
  {/* Background gradient (globals.css: .hero-bg) */}
  <div className="hero-bg" />

  {/* Animated grid pattern (globals.css: .hero-grid) */}
  <div className="hero-grid" />

  {/* Floating icon with orange gradient */}
  <div
    className="w-[100px] h-[100px] mx-auto mb-8 rounded-[28px] flex items-center justify-center text-white text-6xl shadow-strong animate-float"
    style={{
      background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
    }}
  >
    <i className="fas fa-rocket"></i>
  </div>

  {/* Hero content */}
  <div className="relative z-10 max-w-[800px] mx-auto text-center">
    <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] font-extrabold leading-tight text-white mb-6">
      {/* Title with gradient "Kurulum" text */}
    </h1>
    {/* ... */}
  </div>
</section>
```

**Guide Pages** (`/ios`, `/android`, `/access-tag`) use platform-specific hero sections with solid gradients (no animated grid):

```tsx
<section className="relative pt-32 pb-20 px-8 overflow-hidden">
  {/* Platform-specific gradient background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #252542 100%)' // iOS/Android/Tag specific
    }}
  />

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    {/* ... */}
  </div>
</section>
```

### 5. Step Number Badges - Consistent Pattern

All guide pages use the same step badge pattern with orange gradient:

```tsx
<div
  className="flex-shrink-0 w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-medium"
  style={{
    background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
  }}
>
  1
</div>
```

**Never** use Tailwind classes like `bg-orange-gradient` for step badges - always use inline styles for consistency.

### 6. FAQ Vector Search Architecture (Implemented ✅)

The project uses Qdrant Cloud for vector search with intelligent fallback:

```typescript
// FAQ Entry Schema (lib/faq/types.ts)
interface FAQEntry {
  id: string;
  platform: 'ios' | 'android' | 'access-tag' | 'general';
  category: 'troubleshooting' | 'permissions' | 'nfc' | 'battery' | 'gps' | 'installation' | 'maintenance';
  question: string;
  answer: string;
  keywords: string[];
  relatedSteps?: number[];
  pageUrl: string;
  metadata: {
    importance: 'high' | 'medium' | 'low';
    lastUpdated: string;
  };
}
```

**Dual Search Strategy**:
- **Primary**: Vector search with Qdrant + OpenAI embeddings (text-embedding-3-small, 1536 dimensions)
- **Fallback**: Client-side keyword matching when Qdrant unavailable
- Automatic failover ensures search always works

**Search flow**:
1. User types query → handled by Zustand store
2. POST to `/api/search` with query + filters
3. Server attempts vector search via `smartSearch()`
4. If Qdrant fails → automatic client-side fallback
5. Return top 10 results (score threshold: 0.7 for vector, 0.1 for fallback)
6. Display with platform badges + analytics tracking

**State Management** (store/searchStore.ts):
- Zustand store manages all search state
- Modal open/close state
- Search query, results, loading, errors
- Search history (last 5 queries)
- Keyboard navigation state (selected index)
- Platform filters

**UI Components**:
- `FloatingSearchButton` - Mobile only, fixed bottom-right (components/search/)
- `SearchModal` - Full-screen overlay with ⌘K shortcut, platform filters, keyboard nav (components/search/)
- Integrated in root layout - always available

**Database Seeding**:
```bash
npm run seed-qdrant  # One-time setup to populate Qdrant with 22 FAQ entries
```

## Environment Variables

Required for FAQ search functionality:

```env
# Qdrant Cloud
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your_api_key

# OpenAI
OPENAI_API_KEY=sk-your_key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-374JCV17P7

# App URL
NEXT_PUBLIC_APP_URL=https://kilavuz.passgage.com
```

## Migration Status

**Completed Phases**:
- ✅ Phase 1: Foundation (Next.js 16, TypeScript, Tailwind CSS 4)
- ✅ Phase 2: Shared Components (Header, Footer, ProgressNav, etc.)
- ✅ Phase 3: FAQ Vector Search (Qdrant + OpenAI + Zustand + Smart Fallback)
- ✅ Phase 4: Landing Page Migration (1:1 design match)

**Completed Pages** (1:1 design match):
- ✅ `/` - Landing page with 3 platform cards
- ✅ `/ios` - iOS guide (6 steps) - **Partial** (foundation complete)
- ✅ `/android` - Android guide (6 steps + battery warning) - **Partial** (foundation complete)
- ✅ `/access-tag` - Access Tag guide (5 steps + mounting methods + maintenance)

**Current Phase**: Phase 5-6 (iOS/Android Guide Migration - In Progress)
**Next Phase**: Phase 7 (Access Tag Guide Migration)

## Design Consistency Rules

1. **Colors**: Never modify the original Passgage color palette (use Tailwind config colors)
2. **Gradients**: Always use inline styles for gradient text and backgrounds (see Rule #0 above)
3. **Spacing**: Use Tailwind spacing utilities - match exact pixel values with arbitrary values when needed (e.g., `rounded-[28px]`)
4. **Typography**: Use Tailwind font utilities - arbitrary values for exact sizes (e.g., `text-[0.75rem]`)
5. **Animations**: Reference keyframes from globals.css via inline styles (e.g., `animation: 'float 3s ease-in-out infinite'`)
6. **Scrollbar**: Custom orange-gold gradient scrollbar defined in globals.css (automatic)
7. **Icons**: Font Awesome 6.5.1 (loaded via CDN in layout.tsx)
8. **Logo**: Always use Passgage logo from CDN (passgage.com/wp-content/uploads/...)

## Tailwind CSS 4 Configuration

This project uses **Tailwind CSS 4** with @tailwindcss/postcss plugin:

**Import Syntax** (globals.css):
```css
@import "tailwindcss";  /* ✅ Tailwind 4 */
/* ❌ NOT: @tailwind base; @tailwind components; @tailwind utilities; (Tailwind 3) */
```

**Config File** (tailwind.config.ts):
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'passgage-red': '#FF501D',
        'passgage-gold': '#FFD700',
        'passgage-blue': '#2872fa',
        'ios-black': '#1d1d1f',
        'ios-gray': '#86868b',
        'android-green': '#3ddc84',
        'tag-blue': '#2872fa',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'strong': '0 10px 60px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
```

**Available Animations** (defined in globals.css):
- `float` - Floating effect for hero icons
- `pulse` - Pulsing scale animation for warnings
- `gridMove` - Grid background movement
- `pulse-glow` - Glowing pulse for active states
- `step-activate` - Step activation animation
- `.fade-up` + `.visible` - Scroll reveal animation
- `.visually-hidden` - Screen reader only content

## Analytics Events

Google Analytics 4 events (hardcoded ID: G-374JCV17P7):

**Implemented events**:
- `platform_choice` - Landing card clicks (iOS/Android/Access Tag)
- `download_click` - App store buttons
- `navigation_click` - Progress step clicks (ProgressNav component)
- `navigation_scroll` - Automatic step tracking (ProgressNav IntersectionObserver)
- `search_performed` - FAQ search query submitted (searchStore.ts)

**Planned events**:
- `search_result_clicked` - FAQ result selected
- `search_filter_applied` - Platform filter used
- `scroll_depth` - 25%, 50%, 75%, 100%

**Implementation**: GA4 script loaded in app/layout.tsx head section. Events tracked via `window.gtag()` calls.

## Common Patterns to Follow

### Android-Specific: Battery Optimization Warning

Android guide includes a critical pulsing warning box:

```tsx
<div
  className="relative rounded-3xl p-10 mb-12 overflow-hidden border-[3px]"
  style={{
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
    borderColor: '#ef4444',
    boxShadow: '0 10px 40px rgba(239, 68, 68, 0.2)'
  }}
>
  <div className="absolute top-0 left-0 right-0 h-1.5"
    style={{ background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)' }}
  />
  <div className="flex gap-6 items-start">
    <div
      className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl"
      style={{
        background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
        boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
        animation: 'pulse 2s ease-in-out infinite'
      }}
    >
      <i className="fas fa-exclamation-triangle" />
    </div>
    <div className="flex-1">
      <h4 className="text-2xl font-extrabold text-red-700 mb-3 uppercase tracking-wide">
        ÖNEMLİ: Pil Optimizasyonu
      </h4>
      {/* Warning content */}
    </div>
  </div>
</div>
```

### Android-Specific: Manufacturer Badges

```tsx
<span
  className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white ml-2"
  style={{ background: 'linear-gradient(135deg, #1428a0 0%, #0c52ff 100%)' }}
>
  SAMSUNG
</span>

<span
  className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white ml-2"
  style={{ background: 'linear-gradient(135deg, #ff6900 0%, #ff9500 100%)' }}
>
  XIAOMI
</span>
```

### Settings Path Pattern

iOS uses gray arrows, Android uses green arrows:

```tsx
// iOS
<div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 my-2">
  Ayarlar <span className="text-gray-500 mx-2">→</span> Gizlilik
</div>

// Android
<div
  className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
  style={{
    background: '#f1f5f9',
    color: '#1f2937',
    borderColor: '#3ddc84'
  }}
>
  Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Uygulamalar
</div>
```

## File Structure Context

```
app/
├── layout.tsx              # Root layout, GA4, metadata, SearchModal + FloatingSearchButton
├── page.tsx                # Landing page with 3 platform cards
├── globals.css             # Tailwind 4 + custom animations + scrollbar
├── ios/page.tsx            # iOS guide (partial - foundation complete)
├── android/page.tsx        # Android guide (partial - foundation complete)
├── access-tag/page.tsx     # Access Tag guide (partial - foundation complete)
└── api/search/route.ts     # FAQ vector search API (POST /api/search)

components/
├── layout/
│   ├── Header.tsx          # Header with logo + badge (landing page only)
│   ├── Footer.tsx          # Simple footer with copyright
│   ├── ProgressNav.tsx     # Auto-tracking step navigation with IntersectionObserver
│   └── Hero.tsx            # Reusable hero section component
├── search/
│   ├── SearchModal.tsx     # Full-screen search overlay with ⌘K shortcut
│   ├── FloatingSearchButton.tsx  # Mobile floating search button
│   └── index.ts            # Barrel exports
├── guide/
│   ├── PhoneMockup.tsx     # Phone mockup with notch
│   ├── InfoBox.tsx         # Info/warning/success boxes
│   ├── Accordion.tsx       # Accordion for troubleshooting
│   └── index.ts            # Barrel exports
├── landing/
│   ├── PlatformCard.tsx    # iOS/Android/Access Tag choice cards
│   └── index.ts            # Barrel exports
└── ui/
    ├── Button.tsx          # Reusable button component
    ├── Card.tsx            # Reusable card component
    └── index.ts            # Barrel exports

lib/
├── qdrant/
│   ├── client.ts           # Qdrant client initialization
│   ├── embeddings.ts       # OpenAI embedding generation
│   ├── search.ts           # Vector search + client-side fallback (smartSearch)
│   └── index.ts            # Barrel exports
└── faq/
    ├── faq-data.ts         # 22 FAQ entries (iOS: 5, Android: 12, Access Tag: 5)
    ├── types.ts            # TypeScript interfaces for FAQ, Search
    └── index.ts            # Barrel exports

store/
└── searchStore.ts          # Zustand store for search state + performSearch()

scripts/
└── seed-qdrant.ts          # Seed Qdrant database with FAQ embeddings

hooks/                      # (Empty - reserved for custom hooks)

public/
└── screenshots/            # Guide screenshots migrated from old project
```

## Important Architectural Decisions

### Component Organization
- **Barrel exports**: All component directories use index.ts for clean imports
- **Separation**: layout/ (structural), search/ (search UI), guide/ (guide-specific), landing/ (landing-specific), ui/ (reusable)
- **Client components**: SearchModal, FloatingSearchButton, ProgressNav use `'use client'`

### State Management
- **Zustand**: Single store for all search state (store/searchStore.ts)
- **No React Context**: Zustand provides simpler, more performant global state
- **Server state**: No caching layer - direct API calls to /api/search

### Search Architecture Principles
1. **Resilience**: Always provide results (vector OR fallback)
2. **Progressive enhancement**: Works without Qdrant/OpenAI configured
3. **Client-side fallback**: Keyword matching when vector search fails
4. **Smart threshold**: 0.7 for vector, 0.1 for fallback (different relevance scales)

### SEO & Metadata
- **Root metadata**: Defined in app/layout.tsx (Turkish language)
- **Page-specific**: Each route should override title/description via metadata export
- **OpenGraph**: Configured for social sharing
- **Structured data**: JSON-LD for rich snippets (planned)

### Accessibility
- **Keyboard navigation**: ProgressNav supports Arrow keys, Enter/Space
- **Screen readers**: aria-labels, visually-hidden class, role="status"
- **Focus management**: SearchModal traps focus when open
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)

## Performance Targets

- **Lighthouse**: 95+ all metrics
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle Size**: < 200KB gzipped
- **Search Response**: < 500ms (vector), < 100ms (fallback)

## Deployment Configuration

**Platform**: Vercel
**Domain**: kilavuz.passgage.com (planned)

**Required 301 Redirects** (vercel.json):
```json
{
  "redirects": [
    { "source": "/ios.html", "destination": "/ios", "permanent": true },
    { "source": "/android.html", "destination": "/android", "permanent": true },
    { "source": "/access-tag.html", "destination": "/access-tag", "permanent": true }
  ]
}
```
