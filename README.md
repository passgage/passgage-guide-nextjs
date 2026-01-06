# Passgage Guide - Next.js Migration

Modern Next.js migration of the Passgage installation guide with integrated FAQ vector search.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Vector DB**: Qdrant Cloud (planned)
- **Embeddings**: OpenAI text-embedding-3-small (planned)
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel

## 📁 Project Structure

```
passgage-guide-nextjs/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with GA
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Tailwind + custom CSS
│   ├── ios/                     # iOS guide (planned)
│   ├── android/                 # Android guide (planned)
│   ├── access-tag/              # Access Tag guide (planned)
│   └── api/search/              # FAQ search API (planned)
│
├── components/
│   ├── layout/                  # Header, Footer, etc.
│   ├── search/                  # Search UI components
│   ├── guide/                   # Guide-specific components
│   └── ui/                      # Reusable UI components
│
├── lib/
│   ├── qdrant/                  # Qdrant client & search
│   └── faq/                     # FAQ data & types
│
├── hooks/                        # Custom React hooks
├── store/                        # Zustand state management
├── public/screenshots/           # Image assets
└── scripts/                      # Build & seed scripts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Environment Variables

Create a `.env.local` file with:

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

## 🧪 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📋 Migration Progress

### ✅ Phase 1: Foundation (Complete)
- [x] Next.js 16 + TypeScript setup
- [x] Tailwind CSS configuration
- [x] Custom CSS migration
- [x] Project structure
- [x] Google Analytics integration
- [x] Environment variables template

### 🚧 Phase 2: Shared Components (Next)
- [ ] Header with search bar
- [ ] Footer
- [ ] Hero component
- [ ] ProgressNav with scroll tracking
- [ ] PhoneMockup component
- [ ] Accordion components
- [ ] Button & Card UI components

### 📅 Upcoming Phases
- Phase 3: FAQ Vector Search
- Phase 4: Landing Page Migration
- Phase 5: iOS Guide Migration
- Phase 6: Android Guide Migration
- Phase 7: Access Tag Guide Migration
- Phase 8: Testing & Optimization
- Phase 9: Production Deployment

## 🎨 Design System

### Colors
- **Passgage Blue**: `#007AFF`
- **Passgage Dark**: `#1A1A1A`
- **iOS Blue**: `#007AFF`
- **Android Green**: `#3DDC84`
- **Access Tag Blue**: `#2196F3`

### Custom Components
- Phone Mockup with notch
- Progress Navigation with animations
- Accordion with smooth transitions
- Warning/Info/Success boxes
- Custom scrollbars

## 🔍 FAQ Vector Search (Planned)

Semantic search powered by:
- **Qdrant Cloud** - Vector database
- **OpenAI Embeddings** - text-embedding-3-small (1536 dimensions)
- **Search UI** - Floating button + Header search bar
- **Keyboard Shortcut** - ⌘K / Ctrl+K

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### 301 Redirects
- `/ios.html` → `/ios`
- `/android.html` → `/android`
- `/access-tag.html` → `/access-tag`

## 🎯 Performance Targets

- **Lighthouse**: 95+ (all metrics)
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle Size**: < 200KB gzipped

## 📄 License

Proprietary - Passgage

## 🤝 Contributing

This is a private project for Passgage. Internal contributions only.

---

**Status**: Phase 1 Complete ✅
**Next**: Phase 2 - Shared Components
**Timeline**: 9-week migration plan
