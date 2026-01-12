# AI Search Experience Redesign - Complete Implementation Plan

**Project:** Passgage Guide Next.js
**Feature:** Modern AI-Powered Search (Gemini-Style Bottom Bar + Conversational Chat)
**Target Users:** Low-tech retail workers (mağaza personeli, kargo görevlileri, depo çalışanları)
**Date:** 2026-01-12
**Status:** 🟡 Planning Complete, Implementation Pending

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Current State Analysis](#current-state-analysis)
3. [Design Vision](#design-vision)
4. [User Flows](#user-flows)
5. [Component Architecture](#component-architecture)
6. [Implementation Phases](#implementation-phases)
7. [Technical Specifications](#technical-specifications)
8. [Testing & Verification](#testing--verification)
9. [Success Metrics](#success-metrics)
10. [References](#references)

---

## Project Overview

### Problem Statement

Mevcut search deneyimi:
- ❌ Traditional modal overlay (⌘K shortcut) - low-tech kullanıcı için karmaşık
- ❌ Sağ alt floating button - artık "noise" haline gelmiş, modern değil
- ❌ Klasik search results - AI bot var ama potansiyeli kullanılmıyor
- ❌ %40 search abandonment rate - kullanıcı cevap bulamadan terkediyor

### Solution

Modern AI chat experience:
- ✅ **Gemini-style bottom bar** - Ekran ortasında floating pill, expand ediyor
- ✅ **Quick action chips** - "NFC açılmıyor" gibi tek-tap çözümler
- ✅ **Hybrid results** - AI cevabı + kaynak FAQ kartları (hem hız hem doğrulama)
- ✅ **Follow-up conversations** - Multi-turn chat, kullanıcı tekrar yazmadan devam eder
- ✅ **Text-only** - NO voice, NO image upload (sade ve odaklı)

### User Preferences (Approved)

| Aspect | Choice |
|--------|--------|
| **Landing page UI** | Gemini-style bottom bar (tüm sayfada sabit) |
| **Guide pages UI** | Bottom bar + modal hybrid |
| **First impression** | Quick action chips + empty input |
| **Results display** | Hybrid (AI answer + source cards) |
| **Extra features** | ❌ None - text-only chat |

### Expected Impact

| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| **Time to answer** | ~30s | <10s | **3x faster** |
| **Abandonment rate** | 40% | 15% | **2.5x lower** |
| **Success rate** | ~50% | 80%+ | **1.6x higher** |
| **User satisfaction** | 3.2/5 | 4.5/5 | **+1.3 points** |

---

## Current State Analysis

### Existing Components

#### 1. SearchModal.tsx
**Location:** `components/search/SearchModal.tsx`

**Current Behavior:**
- Full-screen overlay with backdrop blur
- Triggered by ⌘K shortcut, Header search bar, or FloatingSearchButton
- Shows traditional search results (FAQ cards with platform badges)
- Keyboard navigation (↑↓ arrow keys, Enter to select)
- Platform filters (iOS/Android/Access Tag)

**Issues:**
- No AI answer display (sadece FAQ listesi)
- No conversational flow
- No quick action chips
- Modal feels "heavy" for simple questions

#### 2. FloatingSearchButton.tsx
**Location:** `components/search/FloatingSearchButton.tsx`

**Current Behavior:**
- Fixed bottom-right floating button (mobile only)
- Pulsing animation
- Opens SearchModal on tap

**Issues:**
- Sağ alt bubble pattern artık eski (users ignore it)
- Always visible, can be distracting
- Not context-aware (same on all pages)

#### 3. searchStore.ts (Zustand)
**Location:** `store/searchStore.ts`

**Current State:**
```typescript
interface SearchState {
  isOpen: boolean;
  query: string;
  results: FAQSearchResult[];
  isLoading: boolean;
  error: string | null;
  filters: { platform?: Platform };
  selectedIndex: number;
  searchHistory: string[]; // Tracked but not displayed
}
```

**Issues:**
- No AI answer state
- No conversation history
- No bottom bar state management
- Search history collected but never shown to user

#### 4. API Route: /api/search
**Location:** `app/api/search/route.ts`

**Current Behavior:**
- Calls Cloudflare FAQ Bot API (`/api/ask`)
- Returns simple array of FAQ results
- No AI answer formatting
- No follow-up chip generation

**Issues:**
- Response format doesn't support hybrid UI (AI + sources)
- No confidence score handling
- No follow-up suggestions

### Backend: Cloudflare FAQ Bot

**Status:** ✅ Fully operational

**Endpoint:** `POST /api/ask`

**Request:**
```json
{
  "question": "NFC nasıl açılır?"
}
```

**Response:**
```json
{
  "success": true,
  "answer": "NFC açmak için Ayarlar → Bağlantılar → NFC yolunu izleyin...",
  "confidence": 0.87,
  "matchedQuestion": "NFC nasıl açılır?",
  "category": "geçiş-kontrol",
  "suggestions": [
    { "question": "...", "id": "...", "category": "..." }
  ],
  "_metadata": {
    "cached": true,
    "responseTimeMs": 245,
    "fuzzy": false
  }
}
```

**Features:**
- Cloudflare Workers AI (BGE-M3 model, 1024 dimensions)
- Turkish text normalization (typo correction)
- Vectorize similarity search
- KV embedding cache (60-80% hit rate)
- Mixpanel analytics
- Three-tier confidence scoring (0.7+: direct, 0.6-0.69: fuzzy, <0.6: no match)

**No Changes Needed:** Backend is perfect, we only update front-end!

---

## Design Vision

### Core Principles

1. **Progressive Disclosure**
   - Start simple (collapsed bar)
   - Reveal more as needed (expand → chips → modal → conversation)
   - Never overwhelm low-tech users

2. **Zero Learning Curve**
   - Quick chips eliminate typing
   - Visual feedback at every step
   - Familiar patterns (like Google/Gemini)

3. **Conversational, Not Chatbot**
   - Direct answers, not "I'm an AI assistant..."
   - Follow-up chips, not forced conversations
   - User always in control (can skip to guide)

4. **Mobile-First**
   - Bottom bar in thumb reach zone
   - One-handed operation
   - Touch targets ≥ 44x44px

### Design Inspiration

**Gemini (Google AI):**
- Floating pill-shaped bottom bar
- Expands dynamically on interaction
- Quick action buttons integrated

**Claude.ai:**
- Clean conversation UI
- Markdown-formatted answers
- Follow-up suggestions below answers

**Perplexity AI:**
- Hybrid results (AI answer + sources)
- Source attribution with links
- Confidence indicators

**Arc Browser:**
- Command palette pattern (⌘T)
- Quick actions with keyboard shortcuts
- Context-aware suggestions

### Research Findings

**1. Chat UI is Fading** ([Smashing Magazine](https://www.smashingmagazine.com/2025/07/design-patterns-ai-interfaces/))
> "Chat is being complemented with task-oriented UIs like buttons, sliders, and quick actions. Messaging UI feels dated as AI agents use multiple tools in the background."

**Implication for Passgage:** Quick chips > pure chat interface

**2. Low-Tech User Principles** ([TELUS Digital](https://www.telusdigital.com/insights/digital-experience/article/7-ux-ui-rules-for-designing-a-conversational-ai-assistant))
- **Simplicity:** 1-tap solutions, no jargon
- **Transparency:** Show confidence scores, AI limitations
- **User Control:** Always provide "go to guide" option

**3. Search vs Conversational AI** ([DevRev](https://devrev.ai/blog/chatbots-vs-conversational-ai))
- Simple queries (70%): Direct answer style ✅
- Complex queries (20%): Conversational style ✅
- Unclear queries (10%): Clarifying questions ✅

**Our hybrid approach handles all three!**

---

## User Flows

### Flow 1: Landing Page → Quick Answer

```
1. User lands on home page (/)
   ↓
2. Bottom bar visible (collapsed pill)
   "Sorunuzu sorun..." placeholder
   ↓
3. User clicks bar
   ↓
4. Bar expands, shows 4 quick chips:
   💬 "NFC açılmıyor"
   📱 "Uygulamayı indiremedim"
   🔑 "Login yapamıyorum"
   ⚡ "QR okutamıyorum"
   ↓
5. User clicks "NFC açılmıyor" chip
   ↓
6. Modal opens with hybrid results:
   ┌─────────────────────────────┐
   │ 🤖 AI Cevabı               │
   │ NFC açmak için:            │
   │ 1. Ayarlar uygulamasını aç │
   │ 2. Bağlantılar'a git       │
   │ 3. NFC'yi aç               │
   │                             │
   │ Güven: 87% ✅              │
   │ Kaynak: iOS Kılavuzu       │
   │                             │
   │ [Ayarlarda bulamadım]      │
   │ [Hangi model?]             │
   └─────────────────────────────┘
   ┌─────────────────────────────┐
   │ 📚 Kaynaklar                │
   │                             │
   │ [iOS] NFC Nasıl Açılır?    │
   │ iPhone 7 ve sonrası...     │
   │ [Detaylı kılavuza git →]   │
   │                             │
   │ [Android] NFC Ayarları     │
   │ Samsung, Xiaomi, Huawei... │
   │ [Detaylı kılavuza git →]   │
   └─────────────────────────────┘
   ↓
7. User clicks "Detaylı kılavuza git" on iOS card
   ↓
8. Modal closes, navigates to /ios#step4
```

**Time to answer:** <10 seconds ✅

---

### Flow 2: Guide Page → Follow-Up Conversation

```
1. User on /android guide, reading Step 2 (İzinler)
   ↓
2. User stuck, clicks bottom bar
   ↓
3. Bar expands, shows Android-specific chips:
   🔋 "Pil optimizasyonu kapat"
   📡 "NFC açmıyor"
   🔐 "Cihaz eşleştirme"
   📍 "GPS sorunu"
   ↓
4. User clicks "Pil optimizasyonu kapat"
   ↓
5. Modal opens with AI answer:
   "Samsung cihazlarda pil optimizasyonunu kapatmak için..."
   ↓
6. AI answer includes follow-up chips:
   [Ayarlarda bulamadım] [Hangi marka?] [Hâlâ çalışmıyor]
   ↓
7. User clicks "Hangi marka?"
   ↓
8. New AI message appears (conversational):
   "Hangi Android marka kullanıyorsunuz?"
   [Samsung] [Xiaomi] [Huawei] [Google]
   ↓
9. User clicks "Samsung"
   ↓
10. AI answer updates:
    "Samsung One UI cihazlarda:
    Ayarlar → Uygulamalar → Passgage → Pil →
    Optimize edilmemiş olarak ayarla"

    [Kılavuza dön] [Başka soru sor]
   ↓
11. User clicks "Kılavuza dön"
    ↓
12. Modal closes, scrolls to Step 2
```

**Conversation depth:** 2-3 turns (natural, not forced)

---

### Flow 3: Error Recovery (Unclear Query)

```
1. User types unclear query: "Çalışmıyor"
   ↓
2. AI responds with clarifying question:
   "Hangi adımda sorun yaşıyorsunuz?"

   Quick chips:
   📱 Uygulama açılmıyor
   🔔 Bildirim gelmiyor
   📍 Konum algılanmıyor
   📡 QR okutamıyorum
   ↓
3. User selects "📡 QR okutamıyorum"
   ↓
4. AI gives refined answer:
   "QR kod okutma sorunu için:
   1. Kamera izni verilmiş mi kontrol edin
   2. QR kodu iyi aydınlatılmış bir yerde tutun
   3. Telefonu QR koda 10-15 cm mesafede tutun"

   [iOS Kamera İzni] [Android Kamera İzni]
   ↓
5. User clicks guide link or closes modal
```

**Recovery rate:** 80%+ (users get relevant answer after clarification)

---

## Component Architecture

### Overview

```
┌─────────────────────────────────────────┐
│         AIBottomBar.tsx                 │
│  (Floating pill, expands with chips)   │
└─────────────────┬───────────────────────┘
                  │
                  │ User clicks chip or types
                  ↓
┌─────────────────────────────────────────┐
│       AISearchModal.tsx                 │
│  ┌───────────────────────────────────┐  │
│  │   AIAnswerCard.tsx               │  │
│  │   (AI answer + confidence +      │  │
│  │    follow-up chips)              │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   SourceCard.tsx (×3)            │  │
│  │   (FAQ cards with guide links)   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
         │
         │ State managed by
         ↓
┌─────────────────────────────────────────┐
│      aiSearchStore.ts (Zustand)         │
│  - barState: collapsed/focused/results  │
│  - aiAnswer: text + confidence + source │
│  - conversationHistory: user/assistant  │
│  - performAISearch(): API call + format │
└─────────────────────────────────────────┘
         │
         │ API call to
         ↓
┌─────────────────────────────────────────┐
│   /api/search (Next.js Route)           │
│   - Calls Cloudflare /api/ask          │
│   - Returns hybrid response             │
│   - Generates follow-up chips           │
└─────────────────────────────────────────┘
```

---

### Component Specifications

#### 1. AIBottomBar.tsx

**File:** `components/search/AIBottomBar.tsx`

**Props:**
```typescript
interface AIBottomBarProps {
  variant: 'landing' | 'guide';
  platform?: 'ios' | 'android' | 'access-tag';
  currentStep?: string; // e.g., "step3" for context-aware chips
}
```

**States:**
- `collapsed` (default): Pill with placeholder, width: `max-w-2xl`
- `focused`: Expanded, shows quick chips, width: `max-w-4xl`
- `typing`: Input active, chips hidden
- `results`: Modal opened (bar returns to collapsed)

**Design Specs:**
```css
/* Collapsed */
width: max-w-2xl (672px)
height: h-14 (56px)
position: fixed bottom-8 left-1/2 -translate-x-1/2
z-index: 40
background: bg-white/90 backdrop-blur-md
border: border-2 border-neutral-200
border-radius: rounded-full (9999px)
shadow: shadow-medium

/* Focused */
width: max-w-4xl (896px)
height: auto (expands with chips)
border-radius: rounded-3xl (24px)
shadow: shadow-strong (orange glow)

/* Mobile (<768px) */
width: calc(100vw - 32px)
left: 16px, right: 16px (no centering)
bottom: 16px (safe area aware)
```

**Interactions:**
1. Click anywhere on bar → expand, show chips, focus input
2. Click outside → collapse (if no text typed)
3. Type text → hide chips, show input only
4. Press Enter / click chip → trigger search, open modal
5. Press Esc → collapse bar

**Quick Chips Data:**

```typescript
// Landing page chips
const landingChips = [
  { icon: '💬', label: 'NFC açılmıyor', query: 'NFC nasıl açılır?' },
  { icon: '📱', label: 'Uygulamayı indiremedim', query: 'Passgage uygulamasını nereden indirebilirim?' },
  { icon: '🔑', label: 'Login yapamıyorum', query: 'Giriş yapamıyorum ne yapmalıyım?' },
  { icon: '⚡', label: 'QR okutamıyorum', query: 'QR kod okutamıyorum nasıl çözebilirim?' },
];

// iOS guide chips
const iosChips = [
  { icon: '📍', label: 'Konum izni', query: 'iOS konum izni nasıl verilir?', step: 'step2' },
  { icon: '🔔', label: 'Bildirim izni', query: 'iOS bildirim izni nasıl açılır?', step: 'step2' },
  { icon: '📡', label: 'NFC kontrol', query: 'iPhone NFC destekliyor mu?', step: 'step4' },
  { icon: '📸', label: 'QR okutamıyorum', query: 'iOS QR kod okuyamıyorum', step: 'step5' },
];

// Android guide chips
const androidChips = [
  { icon: '🔋', label: 'Pil optimizasyonu', query: 'Android pil optimizasyonu nasıl kapatılır?' },
  { icon: '📡', label: 'NFC açmıyor', query: 'Samsung NFC nasıl açılır?' },
  { icon: '🔐', label: 'Cihaz eşleştirme', query: 'Android cihaz eşleştirme nasıl yapılır?' },
  { icon: '📍', label: 'GPS sorunu', query: 'Android GPS çalışmıyor' },
];

// Access Tag chips
const accessTagChips = [
  { icon: '📦', label: 'Kutu içeriği', query: 'Access Tag kutusunda neler var?' },
  { icon: '🔧', label: 'Montaj', query: 'Access Tag nasıl monte edilir?' },
  { icon: '🧹', label: 'Bakım', query: 'Access Tag bakımı nasıl yapılır?' },
  { icon: '🔋', label: 'Pil ömrü', query: 'Access Tag pil ömrü ne kadar?' },
];
```

---

#### 2. AISearchModal.tsx

**File:** `components/search/AISearchModal.tsx` (renamed from `SearchModal.tsx`)

**Props:**
```typescript
interface AISearchModalProps {
  // Inherited from store, but explicit for clarity
}
```

**Layout:**
```
┌───────────────────────────────────────────┐
│ Header                                    │
│ ┌─────────────────────────────────────┐   │
│ │ Query: "NFC açılmıyor"              │   │
│ │                        [✕ Close]    │   │
│ └─────────────────────────────────────┘   │
├───────────────────────────────────────────┤
│ AI Answer Section (if confidence >= 0.7)  │
│ ┌─────────────────────────────────────┐   │
│ │ 🤖 AI Cevabı                        │   │
│ │                                     │   │
│ │ [Markdown formatted answer text]    │   │
│ │                                     │   │
│ │ ✅ Güven: 87% | Kaynak: iOS Kılavuzu│   │
│ │                                     │   │
│ │ Follow-up chips:                    │   │
│ │ [Ayarlarda bulamadım] [Hangi model?]│   │
│ └─────────────────────────────────────┘   │
├───────────────────────────────────────────┤
│ Source Cards Section                      │
│ ┌─────────────────────────────────────┐   │
│ │ [iOS] NFC Nasıl Açılır?            │   │
│ │ iPhone 7 ve sonrası NFC destekler...│   │
│ │ [Detaylı kılavuza git →]           │   │
│ └─────────────────────────────────────┘   │
│ ┌─────────────────────────────────────┐   │
│ │ [Android] NFC Ayarları             │   │
│ │ Android cihazlarda NFC...           │   │
│ │ [Detaylı kılavuza git →]           │   │
│ └─────────────────────────────────────┘   │
├───────────────────────────────────────────┤
│ Footer (if conversation history exists)   │
│ [Yeni sohbet başlat] [Kılavuza dön]      │
└───────────────────────────────────────────┘
```

**Responsive:**
- Desktop: `max-w-3xl`, centered, `max-h-[80vh]` with scroll
- Mobile: Full-screen, `h-screen` with scroll

**Keyboard Navigation:**
- Tab: Cycle through follow-up chips → source cards → footer buttons
- Esc: Close modal
- ↑↓: Navigate source cards (legacy feature, keep for power users)

---

#### 3. AIAnswerCard.tsx

**File:** `components/search/AIAnswerCard.tsx`

**Props:**
```typescript
interface AIAnswerCardProps {
  answer: string; // Markdown formatted
  confidence: number; // 0.0 - 1.0
  source: {
    id: string;
    title: string; // FAQ question
    url: string; // Guide link
  };
  followUpChips?: string[]; // e.g., ["Ayarlarda bulamadım", "Hangi model?"]
  onFollowUpClick: (chip: string) => void;
}
```

**Confidence Badge:**
```typescript
const getConfidenceBadge = (score: number) => {
  if (score >= 0.8) return { icon: '✅', label: `${(score * 100).toFixed(0)}%`, color: 'text-green-600' };
  if (score >= 0.6) return { icon: '⚠️', label: `${(score * 100).toFixed(0)}%`, color: 'text-yellow-600' };
  return { icon: '❓', label: `${(score * 100).toFixed(0)}%`, color: 'text-red-600' };
};
```

**Markdown Rendering:**
- Use `react-markdown` or `remark`
- Support: **bold**, *italic*, lists, links
- Sanitize HTML (XSS protection)

**Follow-up Chips:**
- Horizontal scrollable (mobile)
- Pill-shaped: `rounded-full px-4 py-2`
- Gradient background: `bg-gradient-to-r from-passgage-red to-passgage-gold`
- White text: `text-white font-medium`

---

#### 4. SourceCard.tsx

**File:** `components/search/SourceCard.tsx`

**Props:**
```typescript
interface SourceCardProps {
  platform: 'ios' | 'android' | 'access-tag' | 'general';
  question: string;
  answer: string; // Preview only (100 chars)
  guideLink: string;
  onClick: () => void;
}
```

**Design:**
- Simpler than current FAQ cards (less visual weight)
- Platform badge (top-left)
- Question (bold, 1 line with ellipsis)
- Answer preview (2 lines with ellipsis)
- "Detaylı kılavuza git →" button (primary color)

**Platform Colors:**
```typescript
const platformColors = {
  ios: 'bg-gray-800 text-white',
  android: 'bg-android-green text-white',
  'access-tag': 'bg-tag-blue text-white',
  general: 'bg-neutral-500 text-white',
};
```

---

#### 5. QuickActionChips.tsx

**File:** `components/search/QuickActionChips.tsx`

**Props:**
```typescript
interface QuickActionChipsProps {
  variant: 'landing' | 'ios' | 'android' | 'access-tag';
  currentStep?: string;
  onChipClick: (query: string) => void;
}
```

**Chip Structure:**
```typescript
interface QuickChip {
  icon: string; // Emoji (preferred) or Font Awesome class
  label: string; // "NFC açılmıyor"
  query: string; // Full query sent to API
  platform?: Platform;
  step?: string; // Show only on specific guide step
}
```

**Layout:**
- Horizontal grid: `grid grid-flow-col auto-cols-max gap-2`
- Mobile: `overflow-x-auto snap-x` (swipeable)
- Desktop: All visible (no scroll)

**Chip Design:**
```css
/* Chip */
padding: py-2 px-4
border-radius: rounded-full
font-size: text-sm
font-weight: font-medium
transition: all 0.2s

/* Platform-specific gradients */
iOS: bg-gradient-to-r from-gray-700 to-gray-900
Android: bg-gradient-to-r from-android-green to-green-600
Access Tag: bg-gradient-to-r from-tag-blue to-blue-700
Landing: bg-gradient-to-r from-passgage-red to-passgage-gold

/* Hover */
transform: scale(1.05)
shadow: shadow-lg

/* Icon */
margin-right: mr-2
font-size: text-base
```

---

#### 6. aiSearchStore.ts

**File:** `store/aiSearchStore.ts` (renamed from `searchStore.ts`)

**Full State Interface:**
```typescript
interface AISearchState {
  // Bottom Bar State
  barState: 'collapsed' | 'focused' | 'typing' | 'results';
  setBarState: (state: BarState) => void;

  // Modal State
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;

  // Query & Results
  query: string;
  setQuery: (query: string) => void;
  results: FAQSearchResult[];
  setResults: (results: FAQSearchResult[]) => void;

  // AI Answer State (NEW)
  aiAnswer: {
    text: string; // Markdown formatted
    confidence: number;
    source: {
      id: string;
      title: string;
      url: string;
    };
    followUpChips?: string[];
  } | null;
  setAIAnswer: (answer: AIAnswerState | null) => void;

  // Conversation History (NEW)
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
  addToConversation: (role: 'user' | 'assistant', content: string) => void;
  clearConversation: () => void;

  // Loading & Error
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Filters
  filters: { platform?: Platform };
  setPlatformFilter: (platform?: Platform) => void;
  clearFilters: () => void;

  // Keyboard Navigation (Legacy)
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  selectNext: () => void;
  selectPrevious: () => void;

  // Search History (NEW - Now actually displayed)
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;

  // Quick Chips State (NEW)
  activeChips: QuickChip[];
  setActiveChips: (chips: QuickChip[]) => void;

  // Actions
  performAISearch: (query: string, conversational?: boolean) => Promise<void>;
  reset: () => void;
}
```

**Key Methods:**

```typescript
// performAISearch - Main search method
async performAISearch(query: string, conversational = false) {
  setIsLoading(true);
  setError(null);

  try {
    // Add user message to conversation
    if (conversational) {
      addToConversation('user', query);
    }

    // Call API
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        conversational,
        history: conversational ? conversationHistory : undefined
      }),
    });

    const data = await response.json();

    // Set AI answer
    if (data.aiAnswer) {
      setAIAnswer(data.aiAnswer);
      if (conversational) {
        addToConversation('assistant', data.aiAnswer.text);
      }
    } else {
      setAIAnswer(null);
    }

    // Set source cards
    setResults(data.sources || []);

    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ai_answer_shown', {
        query,
        confidence: data.aiAnswer?.confidence,
        source_count: data.sources?.length || 0,
      });
    }

    // Add to search history
    addToHistory(query);

    // Open modal
    openModal();
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Arama hatası');
  } finally {
    setIsLoading(false);
  }
}
```

---

#### 7. API Route: /api/search

**File:** `app/api/search/route.ts`

**Request Interface:**
```typescript
interface SearchRequest {
  query: string;
  conversational?: boolean;
  history?: Array<{ role: string; content: string }>;
}
```

**Response Interface:**
```typescript
interface AISearchResponse {
  // AI Answer (primary)
  aiAnswer: {
    text: string; // Markdown formatted
    confidence: number;
    source: {
      id: string;
      title: string;
      url: string;
    };
    followUpChips?: string[];
    conversational: boolean;
  } | null;

  // Source Cards (secondary)
  sources: FAQSearchResult[];

  // Metadata
  total: number;
  queryTime: number;
  fallback: boolean;
}
```

**Implementation Logic:**

```typescript
export async function POST(request: NextRequest) {
  const { query, conversational, history } = await request.json();

  // Call Cloudflare FAQ Bot
  const cloudflareResponse = await fetch(CLOUDFLARE_FAQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': CLOUDFLARE_FAQ_API_KEY,
    },
    body: JSON.stringify({ question: query }),
  });

  const data = await cloudflareResponse.json();

  // High confidence (>= 0.7) - Show AI answer
  if (data.success && data.confidence >= 0.7) {
    return NextResponse.json({
      aiAnswer: {
        text: data.answer,
        confidence: data.confidence,
        source: {
          id: data.matchedQuestion,
          title: data.matchedQuestion,
          url: getFullGuideLinkUrl(data.category),
        },
        followUpChips: generateFollowUpChips(data.category),
        conversational: conversational || false,
      },
      sources: convertSuggestionsToSources(data.suggestions),
      total: data.suggestions?.length || 0,
      queryTime: data._metadata?.responseTimeMs || 0,
    });
  }

  // Fuzzy match (0.6-0.69) - Show suggestions only
  if (data.fuzzy) {
    return NextResponse.json({
      aiAnswer: null,
      sources: convertSuggestionsToSources([
        { question: data.suggestedQuestion, answer: data.answer, category: data.category },
        ...data.suggestions,
      ]),
      total: data.suggestions?.length || 0,
      queryTime: data._metadata?.responseTimeMs || 0,
      fallback: true,
    });
  }

  // No match - Return empty with suggestions
  return NextResponse.json({
    aiAnswer: null,
    sources: convertSuggestionsToSources(data.suggestions || []),
    total: 0,
    queryTime: data._metadata?.responseTimeMs || 0,
    fallback: true,
  });
}

// Helper: Generate follow-up chips based on category
function generateFollowUpChips(category: string): string[] {
  const followUpMap: Record<string, string[]> = {
    'geçiş-kontrol': ['Ayarlarda bulamadım', 'Hangi model?', 'Hâlâ çalışmıyor'],
    'giriş': ['SMS gelmiyor', 'Şifre unuttum', 'Cihaz tanınmıyor'],
    'vardiya': ['Shift başlatamıyorum', 'Vardiya kapatamdım', 'Geçmiş vardiyalar'],
    'buradayım': ['Check-in yapamıyorum', 'Konum algılanmıyor', 'Fotoğraf yüklenmiyor'],
  };

  return followUpMap[category] || ['Detaylı bilgi', 'Başka soru'];
}
```

---

## Implementation Phases

### Timeline Overview

| Phase | Duration | Tasks | Deliverables |
|-------|----------|-------|--------------|
| **Phase 1** | Week 1 | Bottom bar foundation | AIBottomBar + QuickChips components |
| **Phase 2** | Week 2 | Modal + hybrid results | AISearchModal + AIAnswerCard + SourceCard |
| **Phase 3** | Week 3 | Follow-up conversations | Multi-turn chat with conversation history |
| **Phase 4** | Week 4 | Polish + analytics | Production-ready, full GA4 tracking |

---

### Phase 1: Foundation & Bottom Bar

**Goal:** Replace existing search UI with Gemini-style bottom bar

**Tasks:**

1. **Create AIBottomBar.tsx**
   - [ ] Collapsed pill state (default)
   - [ ] Expand animation on focus (CSS transitions)
   - [ ] Input field with placeholder
   - [ ] Mobile-friendly positioning (thumb reach zone)
   - [ ] Desktop centering (left-1/2 -translate-x-1/2)
   - [ ] Click outside to collapse
   - [ ] Press Esc to collapse

2. **Create QuickActionChips.tsx**
   - [ ] Landing chips (4 common questions)
   - [ ] iOS chips (4 platform-specific)
   - [ ] Android chips (4 platform-specific)
   - [ ] Access Tag chips (4 platform-specific)
   - [ ] Horizontal scrollable layout (mobile swipe)
   - [ ] Emoji icons (no external assets)
   - [ ] Platform-specific gradients

3. **Update app/layout.tsx**
   - [ ] Remove `<SearchModal />` from root layout
   - [ ] Remove `<FloatingSearchButton />` (mobile)
   - [ ] Add `<AIBottomBar variant="landing" />`

4. **Update guide pages**
   - [ ] `app/ios/page.tsx`: Add `<AIBottomBar variant="guide" platform="ios" />`
   - [ ] `app/android/page.tsx`: Add `<AIBottomBar variant="guide" platform="android" />`
   - [ ] `app/access-tag/page.tsx`: Add `<AIBottomBar variant="guide" platform="access-tag" />`

5. **Update components/layout/Header.tsx**
   - [ ] Remove desktop search bar (center)
   - [ ] Remove mobile search icon (right)
   - [ ] Keep back button + logo only

6. **Create aiSearchStore.ts**
   - [ ] Copy from `searchStore.ts`
   - [ ] Add `barState` field ('collapsed' | 'focused' | 'typing' | 'results')
   - [ ] Add `setBarState()` method
   - [ ] Add `activeChips` state
   - [ ] Add `setActiveChips()` method

7. **Testing**
   - [ ] Bottom bar visible on landing page (collapsed)
   - [ ] Bottom bar expands on click, shows 4 quick chips
   - [ ] Bottom bar visible on guide pages (persistent)
   - [ ] Quick chips are platform-specific (iOS ≠ Android)
   - [ ] Mobile: Bottom bar in thumb reach zone, one-handed usable
   - [ ] Desktop: Bottom bar centered, no horizontal scroll

**Files to Create:**
- `components/search/AIBottomBar.tsx`
- `components/search/QuickActionChips.tsx`
- `store/aiSearchStore.ts`

**Files to Modify:**
- `app/layout.tsx`
- `app/page.tsx` (optional: update hero text)
- `app/ios/page.tsx`
- `app/android/page.tsx`
- `app/access-tag/page.tsx`
- `components/layout/Header.tsx`

**Files to Delete:**
- `components/search/FloatingSearchButton.tsx`
- `store/searchStore.ts` (renamed to aiSearchStore.ts)

---

### Phase 2: Modal Overlay & Hybrid Results

**Goal:** Display AI answer + source cards in modal

**Tasks:**

1. **Rename & Refactor SearchModal.tsx**
   - [ ] Rename file: `SearchModal.tsx` → `AISearchModal.tsx`
   - [ ] Update layout: Add AI answer section (top)
   - [ ] Update layout: Keep source cards section (bottom)
   - [ ] Add confidence indicator badge
   - [ ] Add follow-up chips section (below AI answer)
   - [ ] Add conversation history display (if multi-turn)
   - [ ] Update imports in all files

2. **Create AIAnswerCard.tsx**
   - [ ] Display markdown formatted answer (use `react-markdown`)
   - [ ] Show confidence score badge (color-coded: green 80+, yellow 60-79, red <60)
   - [ ] Show source attribution (FAQ title + guide link)
   - [ ] Display follow-up chips (horizontal scrollable)
   - [ ] Handle chip click → trigger new search

3. **Create SourceCard.tsx**
   - [ ] Simplified FAQ card (smaller than current design)
   - [ ] Platform badge (top-left corner)
   - [ ] Question title (bold, 1 line ellipsis)
   - [ ] Answer preview (2 lines ellipsis, 100 chars max)
   - [ ] "Detaylı kılavuza git →" button
   - [ ] Click handler → close modal, navigate to guide

4. **Update aiSearchStore.ts**
   - [ ] Add `aiAnswer` state field
   - [ ] Add `setAIAnswer()` method
   - [ ] Update `performSearch()` → rename to `performAISearch()`
   - [ ] Call `/api/search` and parse hybrid response
   - [ ] Handle `conversationHistory` state (prepare for Phase 3)

5. **Update /api/search/route.ts**
   - [ ] Keep Cloudflare API call (no changes to backend)
   - [ ] Parse response: Extract `answer`, `confidence`, `matchedQuestion`, `suggestions`
   - [ ] Format hybrid response: `aiAnswer` + `sources`
   - [ ] Generate follow-up chips based on category
   - [ ] Handle fuzzy matches (confidence 0.6-0.69)
   - [ ] Handle no matches (confidence < 0.6)

6. **Wire Bottom Bar → Modal**
   - [ ] Click quick chip → `performAISearch(chip.query)` → open modal
   - [ ] Type in bar → debounce 300ms → `performAISearch(query)` → open modal
   - [ ] Press Enter → same as above

7. **Testing**
   - [ ] Click quick chip → modal opens with AI answer + 2-3 source cards
   - [ ] AI answer shows confidence badge (87% = green check icon)
   - [ ] Source cards have platform badges (iOS = gray, Android = green, Access Tag = blue)
   - [ ] Click "Detaylı kılavuza git" → closes modal, navigates to guide
   - [ ] Keyboard navigation works (Tab through elements, Esc closes)
   - [ ] Modal responsive (full-screen on mobile, 80vh on desktop)

**Files to Create:**
- `components/search/AIAnswerCard.tsx`
- `components/search/SourceCard.tsx`

**Files to Modify:**
- `components/search/SearchModal.tsx` (rename to `AISearchModal.tsx`)
- `store/aiSearchStore.ts`
- `app/api/search/route.ts`
- `components/search/AIBottomBar.tsx` (wire to store)

**Dependencies:**
- `react-markdown` (for markdown rendering in AI answer)
- `remark-gfm` (GitHub Flavored Markdown support)

---

### Phase 3: Conversational Follow-Ups

**Goal:** Enable multi-turn conversations (user asks follow-up without re-typing)

**Tasks:**

1. **Add Follow-Up Logic to AIAnswerCard.tsx**
   - [ ] Display follow-up chips below AI answer
   - [ ] Clicking chip → `performAISearch(chip, conversational: true)`
   - [ ] Chip click adds to conversation history
   - [ ] New AI answer appears (modal stays open)

2. **Update aiSearchStore.ts**
   - [ ] Implement `conversationHistory` array tracking
   - [ ] Implement `addToConversation(role, content)` method
   - [ ] Implement `clearConversation()` method
   - [ ] Update `performAISearch()` to pass `conversational` flag to API
   - [ ] Update `performAISearch()` to append to conversation history

3. **Update /api/search/route.ts**
   - [ ] Accept `conversational` flag in request
   - [ ] Accept `history` array in request (for future LLM integration)
   - [ ] Generate context-aware follow-up chips based on category
   - [ ] Example mappings:
     - NFC category → ["Ayarlarda bulamadım", "Hangi model?", "Hâlâ çalışmıyor"]
     - Login category → ["SMS gelmiyor", "Şifre unuttum", "Cihaz tanınmıyor"]
     - Battery category → ["Hangi marka?", "Ayarda bulamadım", "Optimize seçeneği yok"]

4. **Add Clarifying Questions for Low-Confidence Results**
   - [ ] If confidence < 0.6, return clarifying question
   - [ ] Example: "Hangi adımda sorun yaşıyorsunuz?"
   - [ ] Display quick chips for each guide step category
   - [ ] User selects → new refined search

5. **Update AISearchModal.tsx**
   - [ ] Show conversation history (user messages + AI answers)
   - [ ] Scroll to latest message automatically
   - [ ] Add "Yeni sohbet" button to footer
   - [ ] "Yeni sohbet" → clearConversation() → reset to quick chips
   - [ ] Add "Kılavuza dön" button to footer

6. **Testing**
   - [ ] User asks "NFC açılmıyor" → AI answer + follow-up chips appear
   - [ ] User clicks "Ayarlarda bulamadım" → new AI answer appears (modal stays open)
   - [ ] Conversation history visible (user messages in blue bubbles, AI in white)
   - [ ] "Yeni sohbet" button clears history and resets to quick chips
   - [ ] "Kılavuza dön" button closes modal and scrolls to relevant guide section
   - [ ] Conversation depth analytics tracked (avg 1-2 turns expected)

**Files to Modify:**
- `components/search/AIAnswerCard.tsx`
- `components/search/AISearchModal.tsx`
- `store/aiSearchStore.ts`
- `app/api/search/route.ts`

**Data Required:**
- Follow-up chip mappings per category (see Task 3 above)
- Clarifying question templates

---

### Phase 4: Polish & Analytics

**Goal:** Production-ready UX with full analytics tracking

**Tasks:**

1. **Animation Polish**
   - [ ] Bottom bar expand/collapse: Smooth spring animation (use `framer-motion` or CSS `transition`)
   - [ ] Modal enter/exit: Fade + slide from bottom
   - [ ] AI answer typing animation (optional: typewriter effect, can be skipped if time-constrained)
   - [ ] Source cards: Stagger animation (0.1s delay between cards)

2. **Loading States**
   - [ ] Bottom bar: Skeleton loader while typing (pulsing shimmer)
   - [ ] Modal: Skeleton for AI answer section (3 lines pulsing)
   - [ ] Source cards: Skeleton cards (2-3 cards pulsing)
   - [ ] Ensure skeletons match final layout (prevent layout shift)

3. **Error Handling**
   - [ ] API timeout (>10s): Show "Bağlantı zaman aşımı" error with retry button
   - [ ] No results: Show "Cevap bulunamadı" + suggest "Destek ekibiyle iletişime geç" button
   - [ ] Cloudflare API down: Client-side fallback to keyword matching (use existing `faq-data.ts`)
   - [ ] Network error: Show offline indicator

4. **Analytics Tracking (Google Analytics 4)**
   - [ ] `bottom_bar_click` - Bottom bar opened (label: platform)
   - [ ] `quick_chip_click` - Quick action chip clicked (label: chip text)
   - [ ] `ai_answer_shown` - AI answer displayed (confidence, source, query)
   - [ ] `follow_up_click` - Follow-up chip clicked (label: chip text, conversation_depth)
   - [ ] `conversation_depth` - Average turns in conversation (custom metric)
   - [ ] `source_card_click` - User clicked source card instead of AI answer (bypass rate)
   - [ ] `modal_closed` - Modal closed without clicking guide link (abandonment)

5. **Accessibility (A11y)**
   - [ ] Bottom bar: Focus trap when expanded, `aria-label="AI arama çubuğu"`
   - [ ] Modal: Focus trap, Esc to close, `role="dialog"`, `aria-labelledby`
   - [ ] AI answer: `role="article"`, `aria-labelledby="ai-answer-heading"`
   - [ ] Confidence badge: `aria-label="Güven skoru: 87%"`
   - [ ] Source cards: `aria-label="Kaynak: iOS Kılavuzu"`
   - [ ] Keyboard navigation: Tab through all interactive elements
   - [ ] Screen reader: Announce AI answer, confidence level, source count
   - [ ] Focus indicators: `focus-visible:ring-4 ring-passgage-blue/50`
   - [ ] High contrast mode support (test with Chrome DevTools)

6. **Mobile Optimization**
   - [ ] Bottom bar: Safe area insets (iPhone notch, Android gesture bar)
   - [ ] Modal: Full-screen on mobile, no margin/padding issues
   - [ ] Quick chips: Horizontal scroll with momentum (`overflow-x-auto snap-x`)
   - [ ] Touch targets: Minimum 44x44px (Apple HIG)
   - [ ] Bottom bar minimum height: `h-14` (56px)
   - [ ] Quick chips: `py-3 px-4` (minimum 44px height)
   - [ ] Test on real devices: iPhone SE, iPhone 14 Pro, Samsung S21, Xiaomi Redmi

7. **Performance Optimization**
   - [ ] Code splitting: `AISearchModal` lazy loaded (`React.lazy` + `Suspense`)
   - [ ] Image optimization: Quick chip icons use emoji (no external assets)
   - [ ] API response caching: Cache last 5 queries in `aiSearchStore` (avoid duplicate calls within 5 min)
   - [ ] Bundle size: Ensure new components add <20KB gzipped
   - [ ] Lighthouse audit: Target 95+ score (performance, accessibility, best practices)

8. **Testing**
   - [ ] Lighthouse score: 95+ (performance, accessibility, best practices, SEO)
   - [ ] Mobile: Bottom bar doesn't overlap iOS home indicator or Android gesture bar
   - [ ] Analytics: All events firing correctly in GA4 dashboard (verify in Real-Time view)
   - [ ] Keyboard only navigation: Entire flow completable without mouse
   - [ ] Screen reader: VoiceOver (iOS) / TalkBack (Android) can navigate and understand AI answers
   - [ ] Cross-browser: Test on Chrome, Safari, Firefox, Edge
   - [ ] Cross-device: Test on iOS (Safari), Android (Chrome), Desktop (all browsers)

**Files to Modify:**
- All components (animation polish)
- `components/search/AIBottomBar.tsx` (loading states, error handling)
- `components/search/AISearchModal.tsx` (loading states, analytics)
- `components/search/AIAnswerCard.tsx` (accessibility, animations)
- `store/aiSearchStore.ts` (caching, analytics)
- `app/api/search/route.ts` (error handling)

**Dependencies:**
- `framer-motion` (optional, for advanced animations)
- No other new dependencies (use existing GA4 setup)

---

## Technical Specifications

### API Integration

**Existing Cloudflare FAQ Bot API** (No changes required!)

**Endpoint:** `POST /api/ask`

**Request:**
```json
{
  "question": "NFC nasıl açılır?"
}
```

**Response:**
```json
{
  "success": true,
  "answer": "NFC açmak için Ayarlar → Bağlantılar → NFC yolunu izleyin...",
  "confidence": 0.87,
  "matchedQuestion": "NFC nasıl açılır?",
  "category": "geçiş-kontrol",
  "suggestions": [
    {
      "question": "iPhone NFC destekliyor mu?",
      "id": "faq-csv1-012",
      "category": "geçiş-kontrol"
    }
  ],
  "_metadata": {
    "cached": true,
    "responseTimeMs": 245,
    "fuzzy": false
  }
}
```

**New Next.js API Wrapper** (Update existing `/api/search`)

**Endpoint:** `POST /api/search`

**Request:**
```json
{
  "query": "NFC açılmıyor",
  "conversational": false,
  "history": [] // Optional, for Phase 3+
}
```

**Response:**
```json
{
  "aiAnswer": {
    "text": "NFC açmak için şu adımları izleyin:\n\n1. **Ayarlar** uygulamasını açın\n2. **Bağlantılar** veya **Daha fazla** seçeneğine gidin\n3. **NFC** seçeneğini bulun ve **Açık** konuma getirin\n\n**Not:** iPhone 7 ve sonrası modellerde NFC otomatik olarak açıktır.",
    "confidence": 0.87,
    "source": {
      "id": "faq-csv1-012",
      "title": "NFC nasıl açılır?",
      "url": "/ios#step4"
    },
    "followUpChips": [
      "Ayarlarda bulamadım",
      "Hangi model?",
      "Hâlâ çalışmıyor"
    ],
    "conversational": false
  },
  "sources": [
    {
      "id": "cloudflare-suggestion-0",
      "platform": "ios",
      "category": "geçiş-kontrol",
      "question": "iPhone NFC destekliyor mu?",
      "answer": "iPhone 7 ve sonrası tüm modellerde NFC desteği vardır...",
      "keywords": [],
      "pageUrl": "/ios#step4",
      "metadata": {
        "importance": "medium",
        "lastUpdated": "2026-01-12T10:30:00Z"
      },
      "score": 0.75,
      "guideLink": "/ios#step4"
    },
    {
      "id": "cloudflare-suggestion-1",
      "platform": "android",
      "category": "geçiş-kontrol",
      "question": "Android NFC nasıl açılır?",
      "answer": "Android cihazlarda NFC açmak için...",
      "keywords": [],
      "pageUrl": "/android#step5",
      "metadata": {
        "importance": "medium",
        "lastUpdated": "2026-01-12T10:30:00Z"
      },
      "score": 0.68,
      "guideLink": "/android#step5"
    }
  ],
  "total": 2,
  "queryTime": 287,
  "fallback": false
}
```

---

### Component File Structure

```
components/
├── search/
│   ├── AIBottomBar.tsx           # NEW - Gemini-style bottom input bar
│   ├── AISearchModal.tsx         # RENAMED from SearchModal.tsx
│   ├── AIAnswerCard.tsx          # NEW - AI answer display
│   ├── SourceCard.tsx            # NEW - Simplified FAQ source card
│   ├── QuickActionChips.tsx      # NEW - Context-aware quick action chips
│   ├── FloatingSearchButton.tsx  # DEPRECATED - Delete after Phase 1
│   └── index.ts                  # Barrel exports

├── layout/
│   ├── Header.tsx                # MODIFIED - Remove search bar
│   ├── Footer.tsx                # No changes
│   └── ...

store/
├── aiSearchStore.ts              # RENAMED from searchStore.ts
└── index.ts

app/
├── layout.tsx                    # MODIFIED - Add AIBottomBar, remove SearchModal
├── page.tsx                      # OPTIONAL - Update hero text
├── ios/page.tsx                  # MODIFIED - Add AIBottomBar
├── android/page.tsx              # MODIFIED - Add AIBottomBar
├── access-tag/page.tsx           # MODIFIED - Add AIBottomBar
└── api/
    └── search/
        └── route.ts              # MODIFIED - Hybrid response format

lib/
└── faq/
    ├── types.ts                  # MODIFIED - Add AISearchResult interface
    └── categoryMapping.ts        # No changes (existing guide link mapping)
```

---

### Styling & Design Tokens

**Tailwind Classes (Project Standard: Tailwind CSS 4)**

```css
/* Bottom Bar */
.bottom-bar {
  @apply fixed z-40;
  @apply bg-white/90 backdrop-blur-md;
  @apply border-2 border-neutral-200;
  @apply shadow-medium;
  @apply transition-all duration-300 ease-in-out;
}

/* Bottom Bar - Collapsed */
.bottom-bar-collapsed {
  @apply bottom-8 left-1/2 -translate-x-1/2;
  @apply max-w-2xl h-14;
  @apply rounded-full;
}

/* Bottom Bar - Focused */
.bottom-bar-focused {
  @apply bottom-8 left-1/2 -translate-x-1/2;
  @apply max-w-4xl;
  @apply rounded-3xl;
  @apply shadow-strong; /* Custom shadow with orange glow */
}

/* Bottom Bar - Mobile */
@media (max-width: 768px) {
  .bottom-bar {
    @apply bottom-4 left-4 right-4;
    @apply translate-x-0; /* Remove centering */
  }
}

/* Modal Overlay */
.modal-overlay {
  @apply fixed inset-0 z-50;
  @apply bg-black/50 backdrop-blur-sm;
  @apply animate-fade-in;
}

/* Modal Content */
.modal-content {
  @apply bg-white rounded-3xl shadow-2xl;
  @apply max-w-3xl mx-auto;
  @apply max-h-[80vh] overflow-y-auto;
  @apply animate-slide-up;
}

@media (max-width: 768px) {
  .modal-content {
    @apply h-screen max-h-screen rounded-none;
  }
}

/* Gradient Backgrounds (Passgage Brand) */
.gradient-passgage {
  background: linear-gradient(135deg, #FF501D 0%, #FFD700 100%);
}

.gradient-ios {
  background: linear-gradient(135deg, #374151 0%, #111827 100%);
}

.gradient-android {
  background: linear-gradient(135deg, #3ddc84 0%, #16a34a 100%);
}

.gradient-access-tag {
  background: linear-gradient(135deg, #2872fa 0%, #1e3a8a 100%);
}
```

**Custom Animations (globals.css)**

```css
/* Bottom Bar Expand */
@keyframes expand-bar {
  from {
    width: 672px; /* max-w-2xl */
    border-radius: 9999px; /* rounded-full */
  }
  to {
    width: 896px; /* max-w-4xl */
    border-radius: 24px; /* rounded-3xl */
  }
}

/* Modal Slide Up */
@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

/* Fade In */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

/* Stagger Animation for Source Cards */
.stagger-item {
  animation: slide-up 0.3s ease-out;
}

.stagger-item:nth-child(1) { animation-delay: 0s; }
.stagger-item:nth-child(2) { animation-delay: 0.1s; }
.stagger-item:nth-child(3) { animation-delay: 0.2s; }
```

**Responsive Breakpoints**

- Mobile: `< 768px` (md breakpoint)
- Desktop: `>= 768px`

**Mobile Adjustments:**
- Bottom bar: Full width with 16px margin (`left-4 right-4`)
- Modal: Full-screen (`h-screen`)
- Quick chips: Horizontal scroll with snap (`overflow-x-auto snap-x`)

**Desktop:**
- Bottom bar: Centered with max-width (`left-1/2 -translate-x-1/2 max-w-2xl`)
- Modal: 80vh max-height, centered
- Quick chips: All visible (no scroll)

---

### Performance Targets

| Metric | Target | Current | Strategy |
|--------|--------|---------|----------|
| **Bottom Bar Render** | <50ms | N/A | CSS transitions only (no JS animations) |
| **Modal Open** | <100ms | ~200ms | Code split modal with React.lazy |
| **API Response** | <500ms | ~300ms (cached) | Keep Cloudflare caching (60-80% hit rate) |
| **Bundle Size** | <220KB gzipped | ~200KB | New components ~20KB (stay under budget) |
| **Lighthouse Score** | 95+ | N/A | Lazy load modal, optimize images (emoji = no assets) |
| **First Contentful Paint** | <1.5s | ~1.2s | Maintain current performance |
| **Time to Interactive** | <3s | ~2.5s | Maintain current performance |

---

### Accessibility Checklist

**Keyboard Navigation:**
- [ ] Tab to bottom bar → Enter to expand
- [ ] Tab through quick chips → Enter to select
- [ ] Tab through follow-up chips in modal → Enter to select
- [ ] Tab through source cards → Enter to open guide
- [ ] Esc to close modal (from any focused element)
- [ ] Esc to collapse bottom bar (if expanded)

**Screen Reader (VoiceOver/TalkBack):**
- [ ] Bottom bar: `aria-label="AI arama çubuğu"`
- [ ] Quick chips: `aria-label="Hızlı eylem: NFC açılmıyor"`
- [ ] Modal: `role="dialog"`, `aria-labelledby="modal-title"`
- [ ] AI answer: `role="article"`, `aria-labelledby="ai-answer-heading"`
- [ ] Confidence badge: `aria-label="Güven skoru: 87%"`
- [ ] Source cards: `aria-label="Kaynak: iOS Kılavuzu, NFC nasıl açılır"`
- [ ] Follow-up chips: `aria-label="Devam sorusu: Ayarlarda bulamadım"`

**Focus Management:**
- [ ] Bottom bar expands → focus moves to input field
- [ ] Modal opens → focus trapped inside modal
- [ ] Modal closes → focus returns to bottom bar
- [ ] Tab order logical (top to bottom, left to right)

**Visual Indicators:**
- [ ] Focus ring on all interactive elements: `focus-visible:ring-4 ring-passgage-blue/50`
- [ ] High contrast mode support (test with Chrome DevTools)
- [ ] Color contrast ratio: 4.5:1 for text, 3:1 for UI components (WCAG AA)

**Touch Targets (Mobile):**
- [ ] Minimum 44x44px (Apple Human Interface Guidelines)
- [ ] Bottom bar height: `h-14` (56px) ✅
- [ ] Quick chips height: `py-3 px-4` (minimum 44px height) ✅
- [ ] Follow-up chips: Same as quick chips
- [ ] Source card clickable area: Full card (not just button)

---

## Testing & Verification

### Manual Testing Scenarios

#### Scenario 1: Landing Page → Quick Answer (Happy Path)

**Steps:**
1. User lands on `/` (home page)
2. User sees bottom bar (collapsed, pill-shaped, center bottom)
3. User clicks bar
4. Bar expands, shows 4 quick chips:
   - 💬 "NFC açılmıyor"
   - 📱 "Uygulamayı indiremedim"
   - 🔑 "Login yapamıyorum"
   - ⚡ "QR okutamıyorum"
5. User clicks "NFC açılmıyor" chip
6. Modal opens (fade + slide animation) with:
   - AI answer: "NFC açmak için: 1. Ayarlar... 2. Bağlantılar... 3. NFC'yi aç"
   - Confidence: 87% ✅ (green check icon)
   - Source: iOS Kılavuzu (link)
   - Follow-up chips: ["Ayarlarda bulamadım", "Hangi model?"]
   - 2 source cards (iOS guide, Android guide)
7. User clicks "Detaylı kılavuza git" on iOS card
8. Modal closes (fade out), navigates to `/ios#step4`

**Expected Outcome:**
- ✅ User finds answer in <10 seconds (vs ~30s with old search)
- ✅ No typing required (quick chip)
- ✅ AI answer is clear and actionable
- ✅ Guide link available as fallback

**Success Criteria:**
- Time to answer: <10s ✅
- User satisfaction: 4.5/5 (measure via post-interaction survey)

---

#### Scenario 2: Guide Page → Follow-Up Conversation

**Steps:**
1. User on `/android` guide, reading Step 2 (İzinler)
2. User stuck on battery optimization, clicks bottom bar
3. Bar expands, shows Android-specific chips:
   - 🔋 "Pil optimizasyonu kapat"
   - 📡 "NFC açmıyor"
   - 🔐 "Cihaz eşleştirme"
   - 📍 "GPS sorunu"
4. User clicks "Pil optimizasyonu kapat"
5. Modal opens with AI answer:
   "Samsung cihazlarda pil optimizasyonunu kapatmak için:
   Ayarlar → Uygulamalar → Passgage → Pil → Optimize edilmemiş"
6. AI answer includes follow-up chips:
   - "Ayarlarda bulamadım"
   - "Hangi marka?"
   - "Hâlâ çalışmıyor"
7. User clicks "Hangi marka?" chip
8. New AI message appears (modal stays open):
   "Hangi Android marka kullanıyorsunuz?"
   Quick chips: [Samsung] [Xiaomi] [Huawei] [Google]
9. User clicks "Samsung"
10. AI answer updates:
    "Samsung One UI cihazlarda:
    Ayarlar → Uygulamalar → Passgage → Pil → Optimize edilmemiş olarak ayarla

    **Not:** One UI 5.0 ve üzeri versiyonlarda bu ayar 'Pil kullanımı' altında olabilir."

    Footer buttons: [Kılavuza dön] [Başka soru sor]
11. User clicks "Kılavuza dön"
12. Modal closes, scrolls to Android guide Step 2

**Expected Outcome:**
- ✅ Conversational flow feels natural (2 follow-up turns)
- ✅ User doesn't need to re-type question
- ✅ AI answer adapts based on user selection (Samsung-specific)
- ✅ User can return to guide easily

**Success Criteria:**
- Conversation depth: 1-2 turns avg (measured via GA4)
- Follow-up engagement: 20%+ users click follow-up chip

---

#### Scenario 3: Mobile → One-Handed Usage (iOS)

**Device:** iPhone 14 Pro, one-handed mode (right hand)

**Steps:**
1. User on `/ios` guide, reading with one hand (thumb)
2. Bottom bar visible at bottom center (thumb reach zone)
3. User taps bar with thumb
4. Bar expands, quick chips appear
5. User swipes chips horizontally (smooth momentum scroll)
6. User taps "QR okutamıyorum" chip (single tap, 44x44px target)
7. Modal opens, AI answer loads (<500ms)
8. User reads answer, taps "Detaylı kılavuza git" button (also in thumb reach)
9. Modal closes, navigates to guide

**Expected Outcome:**
- ✅ Entire flow completable with thumb, no hand repositioning
- ✅ Bottom bar doesn't overlap iOS home indicator (safe area respected)
- ✅ Touch targets meet Apple HIG (44x44px minimum)
- ✅ Scroll smooth, no jank (60fps)

**Success Criteria:**
- Mobile abandonment rate: <5% (users complete flow)
- No accessibility issues in VoiceOver testing

---

#### Scenario 4: Error Recovery (Unclear Query)

**Steps:**
1. User types unclear query: "Çalışmıyor" (too vague)
2. User presses Enter
3. Modal opens, AI responds:
   "Hangi adımda sorun yaşıyorsunuz?" (clarifying question)

   Quick chips:
   - 📱 Uygulama açılmıyor
   - 🔔 Bildirim gelmiyor
   - 📍 Konum algılanmıyor
   - 📡 QR okutamıyorum
4. User selects "📡 QR okutamıyorum"
5. AI gives refined answer:
   "QR kod okutma sorunu için:
   1. Kamera izni verilmiş mi kontrol edin (Ayarlar → Passgage → Kamera)
   2. QR kodu iyi aydınlatılmış bir yerde tutun
   3. Telefonu QR koda 10-15 cm mesafede tutun"

   Follow-up chips: ["iOS Kamera İzni", "Android Kamera İzni"]
6. User clicks "iOS Kamera İzni" chip
7. AI answer updates with iOS-specific instructions
8. User clicks guide link

**Expected Outcome:**
- ✅ Vague query doesn't result in "no results" error
- ✅ AI guides user to clarify with chips (no typing)
- ✅ Refined answer is specific and helpful
- ✅ 80%+ recovery rate (user gets useful answer after clarification)

**Success Criteria:**
- Vague query rate: <10% (most queries are specific thanks to quick chips)
- Clarification success rate: 80%+ (users click clarifying chip and get answer)

---

### Analytics Validation (Google Analytics 4)

**Events to Track:**

| Event Name | Parameters | Purpose |
|------------|------------|---------|
| `bottom_bar_click` | `platform` (landing/ios/android/access-tag) | Track engagement with new UI |
| `quick_chip_click` | `chip_label`, `platform` | Measure quick chip popularity |
| `ai_answer_shown` | `query`, `confidence`, `source_id`, `category` | Track AI answer quality |
| `follow_up_click` | `chip_label`, `conversation_depth` | Measure conversational engagement |
| `conversation_depth` | `depth` (number of turns) | Custom metric for avg conversation length |
| `source_card_click` | `source_id`, `platform`, `bypass` (true if clicked instead of AI answer) | Measure AI answer vs source preference |
| `modal_closed` | `method` (esc/outside_click/guide_link), `time_open` (seconds) | Track abandonment patterns |
| `search_performed` | `query`, `result_count`, `has_ai_answer` | Overall search usage (legacy event, keep for comparison) |

**Custom Metrics (GA4):**
- `avg_conversation_depth`: Average number of follow-up turns per search
- `ai_confidence_avg`: Average confidence score of AI answers
- `quick_chip_usage_rate`: % of searches using quick chips vs typing

**Funnels to Monitor:**
1. **Quick Answer Funnel:**
   - Bottom bar click → Quick chip click → AI answer shown → Guide link click
   - Expected drop-off: <15% at each step

2. **Conversational Funnel:**
   - AI answer shown → Follow-up click → New AI answer → Guide link click
   - Expected drop-off: <25% at each step

3. **Search Abandonment:**
   - Modal open → Modal closed without guide click
   - Target: <20% abandonment (vs 40% current)

**Dashboard Metrics:**
- Daily active searches (expect 2x increase with quick chips)
- Top 10 quick chips (hypothesis: "NFC açılmıyor" #1)
- AI confidence distribution (target: 70%+ queries with score >=0.7)
- Avg time to answer (target: <10s, vs ~30s current)

**Validation Process:**
1. Deploy to production with GA4 events
2. Monitor Real-Time view for 24h (ensure events firing)
3. Create custom dashboard in GA4 (Week 1 after launch)
4. Weekly review for 4 weeks (measure against targets)
5. A/B test report (if using feature flag, compare old vs new search)

---

## Success Metrics

### Primary KPIs

| Metric | Baseline (Old Search) | Target (New Search) | Measurement Period |
|--------|----------------------|---------------------|-------------------|
| **Time to Answer** | ~30s | <10s | Week 1-4 avg |
| **Search Abandonment Rate** | 40% | <15% | Week 1-4 avg |
| **Search Success Rate** | ~50% | >80% | Week 1-4 avg |
| **User Satisfaction** | 3.2/5 | >4.5/5 | Post-interaction survey |

### Secondary KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Quick Chip Usage** | >60% of searches use chips | GA4 `quick_chip_click` / total searches |
| **AI Answer Confidence** | >70% queries have score >=0.7 | GA4 `ai_confidence_avg` |
| **Conversation Engagement** | >20% users click follow-up | GA4 `follow_up_click` / `ai_answer_shown` |
| **Avg Conversation Depth** | 1.2-1.5 turns | GA4 `avg_conversation_depth` |
| **Mobile Engagement** | >70% mobile users complete flow | GA4 mobile funnel completion rate |

### Technical KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Lighthouse Score** | 95+ (all) | Chrome DevTools audit |
| **API Response Time** | <500ms (p95) | Cloudflare analytics dashboard |
| **Bundle Size** | <220KB gzipped | Next.js build output |
| **Bottom Bar Render** | <50ms | Chrome DevTools Performance tab |
| **Modal Open** | <100ms | Chrome DevTools Performance tab |

### Success Criteria

**Phase 1 Success:**
- [ ] Bottom bar visible and functional on all pages
- [ ] Quick chips are platform-specific
- [ ] Mobile: One-handed usable
- [ ] Zero console errors
- [ ] No accessibility regressions (Lighthouse 95+)

**Phase 2 Success:**
- [ ] AI answers display correctly with confidence badge
- [ ] Source cards visible below AI answer
- [ ] Modal responsive (desktop + mobile)
- [ ] Keyboard navigation works
- [ ] API response time <500ms

**Phase 3 Success:**
- [ ] Follow-up chips functional
- [ ] Conversation history tracked
- [ ] Multi-turn conversations work
- [ ] Avg conversation depth: 1-2 turns
- [ ] No memory leaks (conversation history capped at 10 messages)

**Phase 4 Success:**
- [ ] All animations smooth (no jank)
- [ ] All GA4 events firing
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Error handling graceful (no crashes)
- [ ] Performance targets met (see Technical KPIs)

**Overall Launch Success:**
- [ ] Time to answer: <10s (3x improvement) ✅
- [ ] Abandonment rate: <15% (2.5x improvement) ✅
- [ ] User satisfaction: 4.5/5 (measured via survey) ✅
- [ ] Zero critical bugs in Week 1
- [ ] Positive user feedback (>80% positive)

---

## Migration Strategy - Zero Downtime

### Option A: Feature Flag (Recommended)

**Environment Variable:** `NEXT_PUBLIC_ENABLE_AI_BOTTOM_BAR=false`

**Timeline:**
- **Week 1-2:** Build new components, keep old search active (`flag=false`)
- **Week 3:** Internal testing with flag enabled (`flag=true` for team only)
- **Week 4:** Public beta (50% users get new UI via A/B test)
- **Week 5:** Full rollout (100% users, remove flag)

**Implementation:**
```typescript
// app/layout.tsx
const useNewSearch = process.env.NEXT_PUBLIC_ENABLE_AI_BOTTOM_BAR === 'true';

return (
  <>
    {useNewSearch ? (
      <AIBottomBar variant="landing" />
    ) : (
      <>
        <SearchModal />
        <FloatingSearchButton />
      </>
    )}
  </>
);
```

**A/B Test (Week 4):**
- Split traffic 50/50 in Vercel Edge Config
- Track both groups separately in GA4 (add `experiment_variant` parameter)
- Compare metrics after 7 days
- If new search performs 2x better, roll out to 100%

---

### Option B: Parallel Routes (Alternative)

**Create `/beta` route with new UI:**
- `/beta` → New AI bottom bar experience
- `/` → Old search modal (default)

**Process:**
1. Deploy `/beta` route with new components
2. Share link with beta testers (10-20 users)
3. Gather feedback via Typeform survey
4. Fix bugs based on feedback
5. Merge to `/` after 1 week of stable beta

**Pros:**
- Easy to test without affecting production
- Can share beta link publicly

**Cons:**
- Duplicate code (maintain two UIs temporarily)
- Users might not find `/beta` route

---

### Rollback Plan

**If critical bug found post-launch:**

1. **Immediate:** Set `NEXT_PUBLIC_ENABLE_AI_BOTTOM_BAR=false` in Vercel env (1 min)
2. **Redeploy:** Trigger new build in Vercel (2-3 min)
3. **Verify:** Check production with old search active (1 min)
4. **Fix:** Create hotfix branch, fix bug, test locally
5. **Re-enable:** Set flag back to `true`, redeploy

**Total rollback time:** <5 minutes (with feature flag)

**Critical Bugs (require immediate rollback):**
- Search completely broken (API errors)
- Bottom bar crashes on mobile
- Modal won't close (user stuck)
- Accessibility blocker (can't use keyboard)

**Non-Critical Bugs (can fix in next deploy):**
- Animation glitch
- Wrong chip label
- Follow-up chip doesn't work (user can still use main answer)

---

## References & Design Inspiration

### Research Sources
- [Transforming UX Through AI Conversational Interfaces](https://lollypop.design/blog/2025/may/ai-conversational-interfaces/)
- [UX for AI Chatbots: Complete Guide (2025)](https://www.parallelhq.com/blog/ux-ai-chatbots)
- [AI Chatbot UX: 2026's Top Design Best Practices](https://www.letsgroto.com/blog/ux-best-practices-for-ai-chatbots)
- [Design Patterns For AI Interfaces — Smashing Magazine](https://www.smashingmagazine.com/2025/07/design-patterns-ai-interfaces/)
- [Google Revamps Gemini AI App with Dynamic Floating Bar on Android](https://www.webpronews.com/google-revamps-gemini-ai-app-with-dynamic-floating-bar-on-android/)
- [Conversational AI Assistant Design: 7 UX/UI Best Practices | TELUS Digital](https://www.telusdigital.com/insights/digital-experience/article/7-ux-ui-rules-for-designing-a-conversational-ai-assistant)
- [Chatbots vs Conversational AI](https://devrev.ai/blog/chatbots-vs-conversational-ai)

### Design Examples
- **Gemini (Google AI):** Floating bottom bar, dynamic expand, quick actions
- **Claude.ai:** Clean conversation UI, markdown answers, follow-up suggestions
- **Perplexity AI:** Hybrid search + AI answer with source attribution
- **Arc Browser:** Command palette with quick actions (⌘T)

---

## Appendix

### Glossary

- **Bottom Bar:** Gemini-style floating pill input bar at bottom of screen
- **Quick Chips:** One-tap action buttons for common questions (no typing required)
- **Hybrid Results:** AI answer + source FAQ cards displayed together
- **Follow-Up Chips:** Suggested follow-up questions below AI answer
- **Conversational Mode:** Multi-turn chat where conversation history is tracked
- **Confidence Score:** 0.0-1.0 score indicating AI answer quality (from Cloudflare API)
- **Fuzzy Match:** Medium confidence result (0.6-0.69) shown as "Did you mean?" suggestion
- **Source Card:** Simplified FAQ card with guide link (displayed below AI answer)

### File Naming Conventions

- Components: PascalCase (e.g., `AIBottomBar.tsx`)
- Stores: camelCase (e.g., `aiSearchStore.ts`)
- API routes: kebab-case folder, lowercase file (e.g., `app/api/search/route.ts`)
- Types: Interfaces PascalCase (e.g., `AISearchState`)

### Code Style

- Use Tailwind CSS utility classes (NO custom CSS classes)
- Use TypeScript strict mode (no `any` types)
- Use `'use client'` directive for client components
- Use named exports (no default exports except page.tsx)
- Use async/await (no `.then()` chains)
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Types:**
- `feat`: New feature (e.g., `feat(search): Add AIBottomBar component`)
- `fix`: Bug fix (e.g., `fix(search): Prevent modal close on chip click`)
- `refactor`: Code refactoring (e.g., `refactor(search): Rename SearchModal to AISearchModal`)
- `style`: Styling changes (e.g., `style(search): Update quick chip gradients`)
- `docs`: Documentation (e.g., `docs: Update AI search plan`)
- `test`: Tests (e.g., `test(search): Add AIBottomBar unit tests`)
- `chore`: Tooling/config (e.g., `chore: Add react-markdown dependency`)

**Scopes:**
- `search`: Search-related components and features
- `store`: State management (Zustand)
- `api`: API routes
- `layout`: Layout components (Header, Footer)
- `types`: TypeScript types and interfaces

---

**End of Plan Document**

**Status:** ✅ Ready for Implementation
**Next Steps:** See `docs/ai-search-todo.md` for detailed task breakdown
