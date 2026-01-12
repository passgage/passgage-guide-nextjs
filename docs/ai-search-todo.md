# AI Search Redesign - Implementation Todo List

**Project:** Passgage Guide Next.js
**Feature:** Modern AI-Powered Search (Gemini-Style)
**Date:** 2026-01-12
**Status:** 🟡 Ready to Start

---

## 📋 Quick Navigation

- [Phase 1: Foundation & Bottom Bar](#phase-1-foundation--bottom-bar-week-1) (Week 1) - 15 tasks
- [Phase 2: Modal & Hybrid Results](#phase-2-modal--hybrid-results-week-2) (Week 2) - 14 tasks
- [Phase 3: Conversational Follow-Ups](#phase-3-conversational-follow-ups-week-3) (Week 3) - 11 tasks
- [Phase 4: Polish & Analytics](#phase-4-polish--analytics-week-4) (Week 4) - 18 tasks

**Total:** 58 tasks across 4 phases

---

## Phase 1: Foundation & Bottom Bar (Week 1)

**Goal:** Replace existing search UI with Gemini-style bottom bar

**Estimated Time:** 5-6 days (1 week with buffer)

### Task 1.1: Create AIBottomBar Component

**File:** `components/search/AIBottomBar.tsx`

- [ ] **1.1.1** Create component file structure
  ```typescript
  interface AIBottomBarProps {
    variant: 'landing' | 'guide';
    platform?: 'ios' | 'android' | 'access-tag';
    currentStep?: string;
  }
  ```
  **Time:** 15 min

- [ ] **1.1.2** Implement collapsed state (default)
  - Pill shape: `rounded-full`
  - Width: `max-w-2xl`
  - Height: `h-14` (56px)
  - Position: `fixed bottom-8 left-1/2 -translate-x-1/2 z-40`
  - Background: `bg-white/90 backdrop-blur-md`
  - Border: `border-2 border-neutral-200`
  - Shadow: `shadow-medium`
  **Time:** 30 min

- [ ] **1.1.3** Implement focused state (expanded)
  - Border radius: `rounded-3xl`
  - Width: `max-w-4xl`
  - Shadow: `shadow-strong` (orange glow)
  - Transition: `transition-all duration-300 ease-in-out`
  **Time:** 30 min

- [ ] **1.1.4** Add input field
  - Placeholder: "Sorunuzu sorun..." (landing) or "Nasıl yardımcı olabilirim?" (guide)
  - Icon: Search icon (left side)
  - Clear button (right side, show when text entered)
  **Time:** 45 min

- [ ] **1.1.5** Add expand/collapse logic
  - Click anywhere on bar → expand
  - Click outside → collapse (if no text)
  - Press Esc → collapse
  - Type text → hide chips, show input only
  **Time:** 1 hour

- [ ] **1.1.6** Add mobile responsive layout
  - Mobile (<768px): Full width with 16px margin (`left-4 right-4`)
  - Remove centering transform on mobile
  - Respect safe area insets (iPhone notch)
  **Time:** 45 min

- [ ] **1.1.7** Wire to aiSearchStore
  - Use `barState` from store
  - Call `setBarState()` on focus/blur
  - Call `performAISearch()` on Enter
  **Time:** 30 min

**Subtotal Task 1.1:** ~4.5 hours

---

### Task 1.2: Create QuickActionChips Component

**File:** `components/search/QuickActionChips.tsx`

- [ ] **1.2.1** Create component file structure
  ```typescript
  interface QuickActionChipsProps {
    variant: 'landing' | 'ios' | 'android' | 'access-tag';
    currentStep?: string;
    onChipClick: (query: string) => void;
  }

  interface QuickChip {
    icon: string; // Emoji
    label: string;
    query: string;
    platform?: Platform;
    step?: string;
  }
  ```
  **Time:** 15 min

- [ ] **1.2.2** Define chip data for each variant
  - Landing chips (4): NFC, App download, Login, QR
  - iOS chips (4): Location, Notification, NFC, QR
  - Android chips (4): Battery, NFC, Pairing, GPS
  - Access Tag chips (4): Unboxing, Installation, Maintenance, Battery
  **Time:** 45 min

- [ ] **1.2.3** Implement chip layout
  - Horizontal scrollable: `grid grid-flow-col auto-cols-max gap-2`
  - Mobile: `overflow-x-auto snap-x` (swipeable)
  - Desktop: All visible (no scroll needed)
  **Time:** 30 min

- [ ] **1.2.4** Style chips
  - Pill-shaped: `rounded-full px-4 py-2`
  - Icon + label: `flex items-center gap-2`
  - Platform-specific gradients:
    - Landing: `bg-gradient-to-r from-passgage-red to-passgage-gold`
    - iOS: `bg-gradient-to-r from-gray-700 to-gray-900`
    - Android: `bg-gradient-to-r from-android-green to-green-600`
    - Access Tag: `bg-gradient-to-r from-tag-blue to-blue-700`
  - Hover: `scale(1.05)`, `shadow-lg`
  **Time:** 1 hour

- [ ] **1.2.5** Add click handler
  - Call `onChipClick(chip.query)`
  - Track GA4 event: `quick_chip_click` with `chip_label` parameter
  **Time:** 15 min

**Subtotal Task 1.2:** ~2.75 hours

---

### Task 1.3: Create aiSearchStore (Zustand)

**File:** `store/aiSearchStore.ts`

- [ ] **1.3.1** Copy existing `searchStore.ts` as starting point
  **Time:** 5 min

- [ ] **1.3.2** Add new state fields
  ```typescript
  barState: 'collapsed' | 'focused' | 'typing' | 'results';
  aiAnswer: AIAnswerState | null;
  conversationHistory: Message[];
  activeChips: QuickChip[];
  ```
  **Time:** 15 min

- [ ] **1.3.3** Add new methods
  ```typescript
  setBarState: (state) => void;
  setAIAnswer: (answer) => void;
  addToConversation: (role, content) => void;
  clearConversation: () => void;
  setActiveChips: (chips) => void;
  ```
  **Time:** 30 min

- [ ] **1.3.4** Rename `performSearch` to `performAISearch`
  - Keep implementation same for now (will update in Phase 2)
  **Time:** 10 min

- [ ] **1.3.5** Update TypeScript interfaces
  - Define `AIAnswerState` interface
  - Define `Message` interface for conversation history
  - Define `QuickChip` interface
  **Time:** 20 min

**Subtotal Task 1.3:** ~1.25 hours

---

### Task 1.4: Update Root Layout

**File:** `app/layout.tsx`

- [ ] **1.4.1** Remove old search components
  - Remove `<SearchModal />` import and usage
  - Remove `<FloatingSearchButton />` import and usage
  **Time:** 5 min

- [ ] **1.4.2** Add `<AIBottomBar variant="landing" />`
  - Import from `@/components/search/AIBottomBar`
  - Place at end of body (after {children})
  **Time:** 10 min

- [ ] **1.4.3** Test on landing page
  - Verify bottom bar visible
  - Verify no console errors
  **Time:** 10 min

**Subtotal Task 1.4:** ~25 min

---

### Task 1.5: Update Guide Pages

- [ ] **1.5.1** Update `/ios` page (`app/ios/page.tsx`)
  - Add `<AIBottomBar variant="guide" platform="ios" />`
  - Remove any existing search UI references
  **Time:** 10 min

- [ ] **1.5.2** Update `/android` page (`app/android/page.tsx`)
  - Add `<AIBottomBar variant="guide" platform="android" />`
  **Time:** 10 min

- [ ] **1.5.3** Update `/access-tag` page (`app/access-tag/page.tsx`)
  - Add `<AIBottomBar variant="guide" platform="access-tag" />`
  **Time:** 10 min

- [ ] **1.5.4** Test all guide pages
  - Verify platform-specific chips show correctly
  - Verify bottom bar persistent (doesn't interfere with scrolling)
  **Time:** 15 min

**Subtotal Task 1.5:** ~45 min

---

### Task 1.6: Update Header Component

**File:** `components/layout/Header.tsx`

- [ ] **1.6.1** Remove desktop search bar (center)
  - Remove search input from header
  - Keep logo + back button only
  **Time:** 15 min

- [ ] **1.6.2** Remove mobile search icon (right)
  - Remove search icon button
  **Time:** 10 min

- [ ] **1.6.3** Test header on all pages
  - Verify logo visible
  - Verify back button works on guide pages
  - Verify no layout shifts
  **Time:** 10 min

**Subtotal Task 1.6:** ~35 min

---

### Task 1.7: Delete Deprecated Files

- [ ] **1.7.1** Delete `components/search/FloatingSearchButton.tsx`
  **Time:** 2 min

- [ ] **1.7.2** Delete (rename) `store/searchStore.ts`
  - Already renamed to `aiSearchStore.ts` in Task 1.3
  - Delete old file if still exists
  **Time:** 2 min

- [ ] **1.7.3** Update imports across codebase
  - Find and replace `searchStore` → `aiSearchStore`
  - Find and replace `FloatingSearchButton` imports (should be none after layout update)
  **Time:** 10 min

**Subtotal Task 1.7:** ~15 min

---

### Task 1.8: Phase 1 Testing

- [ ] **1.8.1** Manual testing: Landing page
  - Bottom bar visible (collapsed)
  - Click bar → expands, shows 4 quick chips
  - Chips have correct icons + labels
  - Click outside → bar collapses
  - Press Esc → bar collapses
  **Time:** 15 min

- [ ] **1.8.2** Manual testing: Guide pages
  - Bottom bar visible on /ios, /android, /access-tag
  - Quick chips are platform-specific
  - No overlap with content
  **Time:** 15 min

- [ ] **1.8.3** Mobile testing
  - Test on iPhone (Safari)
  - Test on Android (Chrome)
  - Bottom bar in thumb reach zone
  - Swipe chips works smoothly
  - No home indicator overlap
  **Time:** 30 min

- [ ] **1.8.4** Desktop testing
  - Test on Chrome, Safari, Firefox
  - Bottom bar centered
  - All chips visible (no scroll)
  **Time:** 20 min

- [ ] **1.8.5** Accessibility testing
  - Tab to bottom bar → Enter to expand
  - Tab through chips → Enter to select
  - Esc to collapse
  - Screen reader announces bar correctly
  **Time:** 20 min

- [ ] **1.8.6** Performance testing
  - Lighthouse audit (target: 95+)
  - Bottom bar render time <50ms
  - No console errors or warnings
  **Time:** 15 min

**Subtotal Task 1.8:** ~2 hours

---

**Phase 1 Total Time:** ~12 hours (1.5 days) + buffer = **2 days**

**Phase 1 Completion Criteria:**
- [ ] Bottom bar visible on all pages
- [ ] Quick chips platform-specific
- [ ] Expand/collapse animations smooth
- [ ] Mobile one-handed usable
- [ ] Zero console errors
- [ ] Lighthouse score 95+

---

## Phase 2: Modal & Hybrid Results (Week 2)

**Goal:** Display AI answer + source cards in modal

**Estimated Time:** 6-7 days (1 week with buffer)

### Task 2.1: Rename & Refactor SearchModal

**File:** `components/search/SearchModal.tsx` → `AISearchModal.tsx`

- [ ] **2.1.1** Rename file
  - `SearchModal.tsx` → `AISearchModal.tsx`
  - Update exports in `components/search/index.ts`
  **Time:** 5 min

- [ ] **2.1.2** Update component structure
  - Add AI answer section (top, before source cards)
  - Keep source cards section (bottom)
  - Add conversation history section (if multi-turn, Phase 3)
  **Time:** 30 min

- [ ] **2.1.3** Update modal layout
  - Header: Query text + Close button
  - AI Answer section (conditional, if `aiAnswer` exists)
  - Source Cards section
  - Footer: Keyboard hints + action buttons
  **Time:** 45 min

- [ ] **2.1.4** Update imports across codebase
  - Find and replace `SearchModal` → `AISearchModal`
  **Time:** 10 min

**Subtotal Task 2.1:** ~1.5 hours

---

### Task 2.2: Create AIAnswerCard Component

**File:** `components/search/AIAnswerCard.tsx`

- [ ] **2.2.1** Create component structure
  ```typescript
  interface AIAnswerCardProps {
    answer: string; // Markdown
    confidence: number;
    source: { id: string; title: string; url: string };
    followUpChips?: string[];
    onFollowUpClick: (chip: string) => void;
  }
  ```
  **Time:** 15 min

- [ ] **2.2.2** Install markdown dependencies
  ```bash
  npm install react-markdown remark-gfm
  ```
  **Time:** 5 min

- [ ] **2.2.3** Implement markdown rendering
  - Use `react-markdown` with `remark-gfm` plugin
  - Support: **bold**, *italic*, lists, links
  - Sanitize HTML (XSS protection)
  **Time:** 1 hour

- [ ] **2.2.4** Implement confidence badge
  - >=0.8: Green check icon ✅ + percentage
  - 0.6-0.79: Yellow warning icon ⚠️ + percentage
  - <0.6: Red question icon ❓ + percentage
  - Color-coded text: `text-green-600`, `text-yellow-600`, `text-red-600`
  **Time:** 45 min

- [ ] **2.2.5** Add source attribution
  - Display: "Kaynak: [FAQ title]"
  - Link to guide: `<Link href={source.url}>`
  - Icon: Book icon (📚)
  **Time:** 30 min

- [ ] **2.2.6** Add follow-up chips section
  - Display chips below answer (if `followUpChips` provided)
  - Horizontal scrollable layout (reuse QuickActionChips styling)
  - Call `onFollowUpClick()` on chip click
  **Time:** 45 min

- [ ] **2.2.7** Style card
  - Background: `bg-gradient-to-br from-blue-50 to-purple-50`
  - Border: `border-2 border-blue-200`
  - Padding: `p-6`
  - Rounded: `rounded-2xl`
  - Shadow: `shadow-medium`
  **Time:** 30 min

**Subtotal Task 2.2:** ~4 hours

---

### Task 2.3: Create SourceCard Component

**File:** `components/search/SourceCard.tsx`

- [ ] **2.3.1** Create component structure
  ```typescript
  interface SourceCardProps {
    platform: Platform;
    question: string;
    answer: string; // Preview (100 chars)
    guideLink: string;
    onClick: () => void;
  }
  ```
  **Time:** 15 min

- [ ] **2.3.2** Implement card layout
  - Platform badge (top-left)
  - Question (bold, 1 line ellipsis)
  - Answer preview (2 lines ellipsis, 100 chars max)
  - "Detaylı kılavuza git →" button (bottom)
  **Time:** 45 min

- [ ] **2.3.3** Style card (simpler than current FAQ cards)
  - Background: `bg-white`
  - Border: `border border-neutral-200`
  - Padding: `p-4`
  - Rounded: `rounded-xl`
  - Hover: `hover:shadow-medium` + `hover:border-passgage-blue`
  **Time:** 30 min

- [ ] **2.3.4** Add platform-specific colors
  ```typescript
  const platformColors = {
    ios: 'bg-gray-800 text-white',
    android: 'bg-android-green text-white',
    'access-tag': 'bg-tag-blue text-white',
    general: 'bg-neutral-500 text-white',
  };
  ```
  **Time:** 15 min

- [ ] **2.3.5** Add click handler
  - Call `onClick()`
  - Track GA4 event: `source_card_click`
  **Time:** 10 min

**Subtotal Task 2.3:** ~2 hours

---

### Task 2.4: Update aiSearchStore

**File:** `store/aiSearchStore.ts`

- [ ] **2.4.1** Implement `performAISearch()` method
  - Rename from `performSearch()`
  - Add API call to `/api/search`
  - Parse hybrid response (AI answer + sources)
  - Set `aiAnswer` state
  - Set `results` (sources) state
  - Track GA4 event: `ai_answer_shown`
  - Add to search history
  **Time:** 1.5 hours

- [ ] **2.4.2** Add error handling
  - API timeout: Set error message
  - No results: Set fallback message
  - Network error: Set offline message
  **Time:** 30 min

- [ ] **2.4.3** Add loading states
  - Set `isLoading` before API call
  - Clear `isLoading` after response
  - Handle concurrent requests (debounce)
  **Time:** 20 min

**Subtotal Task 2.4:** ~2.25 hours

---

### Task 2.5: Update API Route

**File:** `app/api/search/route.ts`

- [ ] **2.5.1** Update response interface
  ```typescript
  interface AISearchResponse {
    aiAnswer: AIAnswerState | null;
    sources: FAQSearchResult[];
    total: number;
    queryTime: number;
    fallback: boolean;
  }
  ```
  **Time:** 15 min

- [ ] **2.5.2** Parse Cloudflare API response
  - Extract `answer`, `confidence`, `matchedQuestion`, `suggestions`
  - Handle `success: true` (high confidence)
  - Handle `fuzzy: true` (medium confidence)
  - Handle `success: false` (no match)
  **Time:** 1 hour

- [ ] **2.5.3** Format hybrid response
  - If confidence >= 0.7: Return `aiAnswer` + `sources`
  - If confidence 0.6-0.69: Return `sources` only (fuzzy)
  - If confidence < 0.6: Return empty `aiAnswer` + suggestions
  **Time:** 45 min

- [ ] **2.5.4** Generate follow-up chips
  - Create `generateFollowUpChips()` helper
  - Category-based chip mapping:
    - `geçiş-kontrol`: ["Ayarlarda bulamadım", "Hangi model?", "Hâlâ çalışmıyor"]
    - `giriş`: ["SMS gelmiyor", "Şifre unuttum", "Cihaz tanınmıyor"]
    - `vardiya`: ["Shift başlatamıyorum", "Vardiya kapatamdım"]
    - `buradayım`: ["Check-in yapamıyorum", "Konum algılanmıyor"]
  - Default: ["Detaylı bilgi", "Başka soru"]
  **Time:** 1 hour

- [ ] **2.5.5** Test API locally
  - Send test query: "NFC açılmıyor"
  - Verify response format
  - Verify follow-up chips generated
  **Time:** 30 min

**Subtotal Task 2.5:** ~3.5 hours

---

### Task 2.6: Wire Bottom Bar to Modal

**File:** `components/search/AIBottomBar.tsx`

- [ ] **2.6.1** Add Enter key handler
  - When user presses Enter → call `performAISearch(query)`
  - Open modal after API response
  **Time:** 20 min

- [ ] **2.6.2** Add chip click handler
  - When user clicks chip → call `performAISearch(chip.query)`
  - Track GA4 event: `quick_chip_click`
  - Open modal after API response
  **Time:** 20 min

- [ ] **2.6.3** Add loading state to bottom bar
  - Show spinner in input field while loading
  - Disable input while loading
  **Time:** 15 min

**Subtotal Task 2.6:** ~55 min

---

### Task 2.7: Integrate Components in Modal

**File:** `components/search/AISearchModal.tsx`

- [ ] **2.7.1** Import new components
  - `AIAnswerCard`
  - `SourceCard`
  **Time:** 5 min

- [ ] **2.7.2** Add AI answer section
  - Conditional render: If `aiAnswer` exists, show `<AIAnswerCard />`
  - Pass props: `answer`, `confidence`, `source`, `followUpChips`, `onFollowUpClick`
  **Time:** 20 min

- [ ] **2.7.3** Update source cards section
  - Map `results` to `<SourceCard />` components
  - Stagger animation (0.1s delay between cards)
  - Grid layout: 1 column mobile, 2 columns desktop
  **Time:** 30 min

- [ ] **2.7.4** Add empty state
  - If no AI answer and no sources: "Cevap bulunamadı"
  - Show support email button
  **Time:** 15 min

**Subtotal Task 2.7:** ~1.25 hours

---

### Task 2.8: Phase 2 Testing

- [ ] **2.8.1** Manual testing: Quick chip → AI answer
  - Click "NFC açılmıyor" chip
  - Verify modal opens
  - Verify AI answer displays with confidence badge
  - Verify follow-up chips appear
  - Verify source cards below AI answer
  **Time:** 20 min

- [ ] **2.8.2** Manual testing: Typed query → AI answer
  - Type "Login yapamıyorum"
  - Press Enter
  - Verify same as above
  **Time:** 10 min

- [ ] **2.8.3** Manual testing: Follow-up chips
  - Click follow-up chip
  - Verify modal stays open (Phase 3 feature, prepare for it)
  **Time:** 10 min

- [ ] **2.8.4** Manual testing: Source card click
  - Click "Detaylı kılavuza git" button
  - Verify modal closes
  - Verify navigation to guide page
  - Verify scroll to correct section (if hash present)
  **Time:** 15 min

- [ ] **2.8.5** Manual testing: Confidence badges
  - Test high confidence query (>= 0.8) → green badge
  - Test medium confidence query (0.6-0.79) → yellow badge
  - Test low confidence query (< 0.6) → no AI answer, only sources
  **Time:** 20 min

- [ ] **2.8.6** Mobile testing
  - Test on iPhone + Android
  - Verify modal full-screen
  - Verify follow-up chips scrollable
  - Verify source cards stack vertically
  **Time:** 20 min

- [ ] **2.8.7** Keyboard navigation testing
  - Tab through follow-up chips
  - Tab through source cards
  - Press Enter to select
  - Press Esc to close modal
  **Time:** 15 min

- [ ] **2.8.8** API error testing
  - Simulate API timeout (slow 3G)
  - Verify error message displays
  - Verify retry button works
  **Time:** 15 min

**Subtotal Task 2.8:** ~2 hours

---

**Phase 2 Total Time:** ~17 hours (2 days) + buffer = **3 days**

**Phase 2 Completion Criteria:**
- [ ] AI answer displays with confidence badge
- [ ] Source cards visible below AI answer
- [ ] Follow-up chips render (functional in Phase 3)
- [ ] Modal responsive (desktop + mobile)
- [ ] Keyboard navigation works
- [ ] API response time <500ms

---

## Phase 3: Conversational Follow-Ups (Week 3)

**Goal:** Enable multi-turn conversations

**Estimated Time:** 5-6 days (1 week with buffer)

### Task 3.1: Add Follow-Up Logic to AIAnswerCard

**File:** `components/search/AIAnswerCard.tsx`

- [ ] **3.1.1** Make follow-up chips functional
  - Wire `onFollowUpClick` handler
  - Call parent method with chip text
  **Time:** 15 min

- [ ] **3.1.2** Add click analytics
  - Track GA4 event: `follow_up_click` with chip label
  **Time:** 10 min

**Subtotal Task 3.1:** ~25 min

---

### Task 3.2: Update aiSearchStore for Conversations

**File:** `store/aiSearchStore.ts`

- [ ] **3.2.1** Implement `addToConversation()` method
  ```typescript
  addToConversation: (role: 'user' | 'assistant', content: string) => {
    set((state) => ({
      conversationHistory: [
        ...state.conversationHistory,
        { role, content, timestamp: Date.now() }
      ]
    }));
  }
  ```
  **Time:** 15 min

- [ ] **3.2.2** Implement `clearConversation()` method
  ```typescript
  clearConversation: () => {
    set({ conversationHistory: [], aiAnswer: null });
  }
  ```
  **Time:** 10 min

- [ ] **3.2.3** Update `performAISearch()` for conversational mode
  - Add `conversational` parameter
  - If `conversational === true`:
    - Add user message to history before API call
    - Add assistant message to history after API response
    - Keep modal open (don't reset state)
  - If `conversational === false`:
    - Clear conversation history
    - Open modal fresh
  **Time:** 45 min

- [ ] **3.2.4** Add conversation depth tracking
  - Custom metric: Count turns in conversation
  - Track to GA4: `conversation_depth` on modal close
  **Time:** 20 min

**Subtotal Task 3.2:** ~1.5 hours

---

### Task 3.3: Update API Route for Conversational Context

**File:** `app/api/search/route.ts`

- [ ] **3.3.1** Accept `conversational` flag in request
  ```typescript
  interface SearchRequest {
    query: string;
    conversational?: boolean;
    history?: Array<{ role: string; content: string }>;
  }
  ```
  **Time:** 10 min

- [ ] **3.3.2** Generate context-aware follow-up chips
  - Check conversation history length
  - If first turn: Generic follow-ups
  - If second+ turn: More specific follow-ups
  - Example:
    - Turn 1: "NFC açılmıyor" → ["Ayarlarda bulamadım", "Hangi model?"]
    - Turn 2: User clicked "Hangi model?" → ["Samsung", "Xiaomi", "Huawei", "Google"]
  **Time:** 1 hour

- [ ] **3.3.3** Update follow-up chip mappings
  - Add manufacturer-specific chips for Android
  - Add iOS version-specific chips (iOS 15, 16, 17)
  - Add troubleshooting escalation chips ("Hâlâ çalışmıyor" → "Destek ekibi")
  **Time:** 45 min

**Subtotal Task 3.3:** ~2 hours

---

### Task 3.4: Add Clarifying Questions for Low Confidence

**File:** `app/api/search/route.ts`

- [ ] **3.4.1** Detect unclear queries
  - If confidence < 0.6 AND query < 10 chars → unclear
  - Examples: "Çalışmıyor", "Hata veriyor", "Olmadı"
  **Time:** 20 min

- [ ] **3.4.2** Return clarifying question
  - Set `aiAnswer.text` to: "Hangi adımda sorun yaşıyorsunuz?"
  - Generate category-based chips:
    - "Uygulama açılmıyor"
    - "Bildirim gelmiyor"
    - "Konum algılanmıyor"
    - "QR okutamıyorum"
    - "NFC çalışmıyor"
  **Time:** 30 min

- [ ] **3.4.3** Handle clarification response
  - When user clicks clarifying chip → new search with category filter
  - Return category-specific AI answer
  **Time:** 30 min

**Subtotal Task 3.4:** ~1.25 hours

---

### Task 3.5: Update AISearchModal for Conversations

**File:** `components/search/AISearchModal.tsx`

- [ ] **3.5.1** Add conversation history display
  - Show user messages (blue bubbles, right-aligned)
  - Show assistant messages (white bubbles, left-aligned)
  - Auto-scroll to latest message
  **Time:** 1 hour

- [ ] **3.5.2** Add "Yeni sohbet" button to footer
  - Text: "Yeni sohbet başlat"
  - Icon: Refresh icon
  - Click → `clearConversation()` → reset to quick chips
  **Time:** 20 min

- [ ] **3.5.3** Add "Kılavuza dön" button to footer
  - Text: "Kılavuza dön"
  - Icon: Arrow left
  - Click → close modal, no navigation (user stays on current page)
  **Time:** 15 min

- [ ] **3.5.4** Update modal layout for conversation mode
  - If conversation history > 0: Show history section (top)
  - Show latest AI answer (middle)
  - Show source cards (bottom, optional)
  **Time:** 45 min

**Subtotal Task 3.5:** ~2.25 hours

---

### Task 3.6: Wire Follow-Up Chips to Conversation

**File:** `components/search/AIAnswerCard.tsx`

- [ ] **3.6.1** Update `onFollowUpClick` handler
  - Call `performAISearch(chipText, conversational: true)`
  - Modal stays open
  - New AI answer appears below previous messages
  **Time:** 20 min

- [ ] **3.6.2** Add loading state for follow-up
  - Show spinner on clicked chip
  - Disable other chips while loading
  **Time:** 15 min

**Subtotal Task 3.6:** ~35 min

---

### Task 3.7: Phase 3 Testing

- [ ] **3.7.1** Manual testing: Single follow-up
  - Ask "NFC açılmıyor"
  - Click "Ayarlarda bulamadım" chip
  - Verify new AI answer appears
  - Verify conversation history shows 2 messages
  - Verify modal stays open
  **Time:** 15 min

- [ ] **3.7.2** Manual testing: Multi-turn conversation
  - Ask "NFC açılmıyor"
  - Click "Hangi model?" chip
  - Click "Samsung" chip
  - Verify Samsung-specific answer
  - Verify conversation history shows 3 messages
  **Time:** 20 min

- [ ] **3.7.3** Manual testing: Clarifying questions
  - Type "Çalışmıyor" (unclear query)
  - Verify clarifying question appears
  - Click "QR okutamıyorum" chip
  - Verify refined answer
  **Time:** 15 min

- [ ] **3.7.4** Manual testing: "Yeni sohbet" button
  - Start conversation (2+ turns)
  - Click "Yeni sohbet" button
  - Verify conversation history cleared
  - Verify quick chips shown again
  **Time:** 10 min

- [ ] **3.7.5** Manual testing: "Kılavuza dön" button
  - Start conversation
  - Click "Kılavuza dön"
  - Verify modal closes
  - Verify no navigation (user stays on page)
  **Time:** 10 min

- [ ] **3.7.6** Analytics testing
  - Verify `follow_up_click` event fires
  - Verify `conversation_depth` tracked
  - Check GA4 Real-Time view
  **Time:** 15 min

- [ ] **3.7.7** Edge case testing
  - Test 5+ turn conversation (max history)
  - Test conversation memory limits
  - Verify no memory leaks (open DevTools Memory tab)
  **Time:** 20 min

**Subtotal Task 3.7:** ~2 hours

---

**Phase 3 Total Time:** ~10 hours (1.5 days) + buffer = **2 days**

**Phase 3 Completion Criteria:**
- [ ] Follow-up chips functional
- [ ] Conversation history tracked
- [ ] Multi-turn conversations work
- [ ] Clarifying questions for unclear queries
- [ ] "Yeni sohbet" button resets conversation
- [ ] Avg conversation depth: 1-2 turns

---

## Phase 4: Polish & Analytics (Week 4)

**Goal:** Production-ready UX with full analytics

**Estimated Time:** 7-8 days (1 week with buffer)

### Task 4.1: Animation Polish

- [ ] **4.1.1** Bottom bar expand/collapse animation
  - Use CSS `transition: all 0.3s ease-in-out`
  - Smooth width change: `max-w-2xl` → `max-w-4xl`
  - Smooth border-radius change: `rounded-full` → `rounded-3xl`
  - Test on all browsers
  **Time:** 1 hour

- [ ] **4.1.2** Modal enter/exit animation
  - Fade in: `animate-fade-in` (0.2s)
  - Slide up: `animate-slide-up` (0.3s)
  - Combine both: Fade + Slide
  - Test on mobile + desktop
  **Time:** 45 min

- [ ] **4.1.3** Source cards stagger animation
  - Add CSS animation delay:
    - Card 1: `animation-delay: 0s`
    - Card 2: `animation-delay: 0.1s`
    - Card 3: `animation-delay: 0.2s`
  - Use `animate-slide-up` for each card
  **Time:** 30 min

- [ ] **4.1.4** (Optional) AI answer typing animation
  - Typewriter effect for AI answer text
  - Skip if time-constrained (not critical)
  **Time:** 1 hour (optional)

**Subtotal Task 4.1:** ~3.25 hours (or 2.25 hours if skipping typing animation)

---

### Task 4.2: Loading States

- [ ] **4.2.1** Bottom bar skeleton loader
  - Show pulsing shimmer while typing
  - Replace input field with skeleton
  - Animate: `animate-pulse`
  **Time:** 30 min

- [ ] **4.2.2** Modal AI answer skeleton
  - 3 lines of pulsing skeleton
  - Match final layout (prevent layout shift)
  - Show while `isLoading === true`
  **Time:** 45 min

- [ ] **4.2.3** Source cards skeleton
  - 2-3 pulsing skeleton cards
  - Match final card dimensions
  - Stagger animation (same as real cards)
  **Time:** 45 min

**Subtotal Task 4.2:** ~2 hours

---

### Task 4.3: Error Handling

- [ ] **4.3.1** API timeout error (>10s)
  - Show error message: "Bağlantı zaman aşımı"
  - Add retry button
  - Track GA4 event: `search_error` with error type
  **Time:** 30 min

- [ ] **4.3.2** No results error
  - Show message: "Cevap bulunamadı. Farklı kelimeler deneyin."
  - Add "Destek ekibiyle iletişime geç" button
  - Email link: support@passgage.com
  **Time:** 30 min

- [ ] **4.3.3** Cloudflare API down error
  - Detect 500/503 status codes
  - Show message: "Arama servisi geçici olarak kullanılamıyor"
  - Client-side fallback: Keyword matching in `faq-data.ts` (existing file)
  - Track GA4 event: `search_fallback_used`
  **Time:** 1 hour

- [ ] **4.3.4** Network offline error
  - Detect `navigator.onLine === false`
  - Show message: "İnternet bağlantınızı kontrol edin"
  - Disable search input
  **Time:** 20 min

**Subtotal Task 4.3:** ~2.25 hours

---

### Task 4.4: Analytics Tracking (Google Analytics 4)

- [ ] **4.4.1** Track `bottom_bar_click` event
  - When: User clicks bottom bar to expand
  - Parameters: `platform` (landing/ios/android/access-tag)
  - Add to `AIBottomBar.tsx`
  **Time:** 15 min

- [ ] **4.4.2** Track `quick_chip_click` event
  - When: User clicks quick action chip
  - Parameters: `chip_label`, `platform`
  - Add to `QuickActionChips.tsx`
  **Time:** 15 min

- [ ] **4.4.3** Track `ai_answer_shown` event
  - When: AI answer displays in modal
  - Parameters: `query`, `confidence`, `source_id`, `category`
  - Add to `aiSearchStore.ts` in `performAISearch()`
  **Time:** 20 min

- [ ] **4.4.4** Track `follow_up_click` event
  - When: User clicks follow-up chip
  - Parameters: `chip_label`, `conversation_depth`
  - Add to `AIAnswerCard.tsx`
  **Time:** 15 min

- [ ] **4.4.5** Track `conversation_depth` metric
  - When: Modal closes
  - Parameters: `depth` (number of turns)
  - Add to `AISearchModal.tsx` on close
  **Time:** 20 min

- [ ] **4.4.6** Track `source_card_click` event
  - When: User clicks source card
  - Parameters: `source_id`, `platform`, `bypass` (true if skipped AI answer)
  - Add to `SourceCard.tsx`
  **Time:** 15 min

- [ ] **4.4.7** Track `modal_closed` event
  - When: Modal closes
  - Parameters: `method` (esc/outside_click/guide_link), `time_open` (seconds)
  - Add to `AISearchModal.tsx`
  **Time:** 20 min

- [ ] **4.4.8** Create GA4 custom dashboard
  - Set up dashboard in GA4 console
  - Add cards for key metrics:
    - Daily active searches
    - Top 10 quick chips
    - AI confidence distribution
    - Avg time to answer
    - Search abandonment rate
  **Time:** 1 hour

**Subtotal Task 4.4:** ~3 hours

---

### Task 4.5: Accessibility (A11y)

- [ ] **4.5.1** Bottom bar focus trap
  - When expanded: Trap focus inside bottom bar
  - Tab cycles through: Input → Chips → Close button
  - Esc: Close (collapse)
  **Time:** 45 min

- [ ] **4.5.2** Modal focus trap
  - When open: Trap focus inside modal
  - Tab cycles through: Follow-up chips → Source cards → Footer buttons
  - Esc: Close modal
  **Time:** 45 min

- [ ] **4.5.3** ARIA labels
  - Bottom bar: `aria-label="AI arama çubuğu"`
  - Quick chips: `aria-label="Hızlı eylem: NFC açılmıyor"`
  - Modal: `role="dialog"`, `aria-labelledby="modal-title"`
  - AI answer: `role="article"`, `aria-labelledby="ai-answer-heading"`
  - Confidence badge: `aria-label="Güven skoru: 87%"`
  - Source cards: `aria-label="Kaynak: iOS Kılavuzu"`
  **Time:** 1 hour

- [ ] **4.5.4** Keyboard navigation
  - Tab through all interactive elements
  - Enter to select chip/card
  - Space to select chip/card (alternative)
  - Esc to close modal/collapse bar
  - Test with keyboard only (no mouse)
  **Time:** 30 min

- [ ] **4.5.5** Screen reader testing
  - Test with VoiceOver (Mac/iOS)
  - Test with TalkBack (Android)
  - Verify all elements announced correctly
  - Verify navigation flow makes sense
  **Time:** 1 hour

- [ ] **4.5.6** Focus indicators
  - Add visible focus ring: `focus-visible:ring-4 ring-passgage-blue/50`
  - Test in high contrast mode (Chrome DevTools)
  - Verify color contrast: 4.5:1 for text, 3:1 for UI (WCAG AA)
  **Time:** 30 min

**Subtotal Task 4.5:** ~4.5 hours

---

### Task 4.6: Mobile Optimization

- [ ] **4.6.1** Safe area insets (iPhone notch, Android gesture bar)
  - Bottom bar: `pb-safe` (Tailwind 4 safe area utility)
  - Modal: `pt-safe` for top notch
  - Test on iPhone 14 Pro, iPhone SE
  **Time:** 30 min

- [ ] **4.6.2** Full-screen modal on mobile
  - Mobile (<768px): `h-screen` (no vh units)
  - Remove border-radius on mobile: `rounded-none md:rounded-3xl`
  - Test on various screen sizes
  **Time:** 20 min

- [ ] **4.6.3** Horizontal scroll with momentum
  - Quick chips: `overflow-x-auto snap-x`
  - Smooth scrolling: `-webkit-overflow-scrolling: touch`
  - Test swipe gesture on real devices
  **Time:** 20 min

- [ ] **4.6.4** Touch targets (minimum 44x44px)
  - Verify all chips: `py-3 px-4` (44px+ height)
  - Verify bottom bar: `h-14` (56px)
  - Verify buttons: Minimum 44x44px
  - Test with Apple HIG guidelines
  **Time:** 30 min

- [ ] **4.6.5** Real device testing
  - Test on iPhone SE (small screen)
  - Test on iPhone 14 Pro (large screen + notch)
  - Test on Samsung S21 (Android)
  - Test on Xiaomi Redmi (Android, MIUI)
  **Time:** 1 hour

**Subtotal Task 4.6:** ~2.5 hours

---

### Task 4.7: Performance Optimization

- [ ] **4.7.1** Code split AISearchModal
  - Use `React.lazy()` + `Suspense`
  - Load modal only when needed (on first open)
  - Measure bundle size before/after
  **Time:** 45 min

- [ ] **4.7.2** API response caching
  - Cache last 5 queries in `aiSearchStore`
  - TTL: 5 minutes
  - Avoid duplicate API calls for same query
  **Time:** 1 hour

- [ ] **4.7.3** Image optimization
  - Use emoji for quick chip icons (no external assets)
  - Verify no large images in components
  - Check bundle size: Target <220KB gzipped
  **Time:** 20 min

- [ ] **4.7.4** Lighthouse audit
  - Run Lighthouse on all pages
  - Target: 95+ (performance, accessibility, best practices, SEO)
  - Fix any issues flagged
  **Time:** 1 hour

- [ ] **4.7.5** Performance profiling
  - Chrome DevTools Performance tab
  - Record bottom bar expand animation (target: <50ms)
  - Record modal open animation (target: <100ms)
  - Check for memory leaks (heap snapshots)
  **Time:** 1 hour

**Subtotal Task 4.7:** ~4 hours

---

### Task 4.8: Phase 4 Testing

- [ ] **4.8.1** Cross-browser testing
  - Chrome (Windows, Mac)
  - Safari (Mac, iOS)
  - Firefox (Windows, Mac)
  - Edge (Windows)
  - Verify animations, styles, functionality
  **Time:** 1 hour

- [ ] **4.8.2** Cross-device testing
  - iPhone (Safari) - iOS 16, 17
  - Android (Chrome) - Android 12, 13
  - iPad (Safari)
  - Desktop (1920x1080, 2560x1440)
  - Small laptop (1366x768)
  **Time:** 1.5 hours

- [ ] **4.8.3** Lighthouse audit verification
  - Run on landing page, iOS guide, Android guide
  - Verify all scores 95+
  - Screenshot scores for documentation
  **Time:** 30 min

- [ ] **4.8.4** Analytics verification
  - Open GA4 Real-Time view
  - Trigger all events (bottom bar click, chip click, etc.)
  - Verify events appear in Real-Time dashboard
  - Check event parameters are correct
  **Time:** 45 min

- [ ] **4.8.5** Accessibility audit
  - Run axe DevTools extension
  - Fix any critical/serious issues
  - Verify WCAG 2.1 AA compliance
  **Time:** 1 hour

- [ ] **4.8.6** Performance testing
  - Test on slow 3G network (Chrome DevTools)
  - Verify loading states appear
  - Verify timeout handling
  - Test on high-latency network
  **Time:** 45 min

- [ ] **4.8.7** User acceptance testing (UAT)
  - Share with 3-5 team members
  - Gather feedback via Typeform survey
  - Fix any critical issues
  **Time:** 2 hours

**Subtotal Task 4.8:** ~7.5 hours

---

**Phase 4 Total Time:** ~29 hours (3.5 days) + buffer = **4 days**

**Phase 4 Completion Criteria:**
- [ ] All animations smooth (no jank)
- [ ] All GA4 events firing correctly
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Error handling graceful
- [ ] Performance targets met
- [ ] Lighthouse score 95+
- [ ] Cross-browser/device tested
- [ ] User feedback positive (>80%)

---

## Summary

### Total Implementation Time

| Phase | Estimated Time | With Buffer |
|-------|----------------|-------------|
| **Phase 1** | 12 hours (1.5 days) | 2 days |
| **Phase 2** | 17 hours (2 days) | 3 days |
| **Phase 3** | 10 hours (1.5 days) | 2 days |
| **Phase 4** | 29 hours (3.5 days) | 4 days |
| **Total** | 68 hours (8.5 days) | **11 days (2.2 weeks)** |

**Recommended Timeline:** 3 weeks (includes buffer for unexpected issues, code reviews, and testing)

---

### Files to Create (12 new files)

1. `components/search/AIBottomBar.tsx`
2. `components/search/QuickActionChips.tsx`
3. `components/search/AISearchModal.tsx` (renamed from SearchModal.tsx)
4. `components/search/AIAnswerCard.tsx`
5. `components/search/SourceCard.tsx`
6. `store/aiSearchStore.ts` (renamed from searchStore.ts)
7. `lib/faq/types.ts` (update with new interfaces)
8. `docs/ai-search-redesign-plan.md` (this plan)
9. `docs/ai-search-todo.md` (this file)

### Files to Modify (7 files)

1. `app/layout.tsx` (remove old search, add AIBottomBar)
2. `app/ios/page.tsx` (add AIBottomBar)
3. `app/android/page.tsx` (add AIBottomBar)
4. `app/access-tag/page.tsx` (add AIBottomBar)
5. `components/layout/Header.tsx` (remove search bar)
6. `app/api/search/route.ts` (hybrid response format)
7. `components/search/index.ts` (update exports)

### Files to Delete (2 files)

1. `components/search/FloatingSearchButton.tsx`
2. `store/searchStore.ts` (renamed to aiSearchStore.ts)

---

### Dependencies to Install

```bash
npm install react-markdown remark-gfm
```

**Total new dependencies:** 2

---

### Success Metrics Recap

| Metric | Baseline | Target | Improvement |
|--------|----------|--------|-------------|
| **Time to answer** | ~30s | <10s | 3x faster |
| **Abandonment rate** | 40% | <15% | 2.5x lower |
| **Success rate** | ~50% | >80% | 1.6x higher |
| **User satisfaction** | 3.2/5 | >4.5/5 | +1.3 points |
| **Quick chip usage** | N/A | >60% | New feature |
| **AI confidence avg** | N/A | >70% >=0.7 | Quality metric |
| **Conversation engagement** | N/A | >20% | New feature |

---

## Next Steps

1. **Read this todo list carefully**
2. **Start with Phase 1, Task 1.1** (Create AIBottomBar)
3. **Check off tasks as you complete them**
4. **Test after each subtask** (don't accumulate untested code)
5. **Commit frequently** with clear messages (use format from plan)
6. **Ask for help if blocked** (don't waste time debugging for >30 min)

**Good luck! 🚀**

---

**End of Todo List**

**Status:** ✅ Ready to Start
**Estimated Completion:** 3 weeks from start date
