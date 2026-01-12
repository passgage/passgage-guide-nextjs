import { create } from 'zustand';
import { FAQSearchResult, Platform, SearchFilters } from '@/lib/faq/types';

// API Response Cache
interface CacheEntry {
  query: string;
  response: any;
  timestamp: number;
}

const apiCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 5;

// Types for AI Search
export type BarState = 'collapsed' | 'focused' | 'typing' | 'results';

export interface AIAnswerState {
  text: string; // Markdown formatted
  confidence: number;
  source: {
    id: string;
    title: string;
    url: string;
  };
  followUpChips?: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface QuickChip {
  icon: string;
  label: string;
  query: string;
  platform?: Platform;
  step?: string;
}

interface AISearchState {
  // Bottom Bar State (NEW)
  barState: BarState;
  setBarState: (state: BarState) => void;

  // Bottom Sheet state (renamed from modal)
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggleSheet: () => void;

  // Search query
  query: string;
  setQuery: (query: string) => void;

  // Search results
  results: FAQSearchResult[];
  setResults: (results: FAQSearchResult[]) => void;

  // AI Answer State (NEW)
  aiAnswer: AIAnswerState | null;
  setAIAnswer: (answer: AIAnswerState | null) => void;

  // Conversation History (NEW)
  conversationHistory: Message[];
  addToConversation: (role: 'user' | 'assistant', content: string) => void;
  clearConversation: () => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Filters
  filters: SearchFilters;
  setPlatformFilter: (platform?: Platform) => void;
  clearFilters: () => void;

  // Error state
  error: string | null;
  setError: (error: string | null) => void;

  // Search history (last 5 searches)
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;

  // Selected result index (for keyboard navigation)
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  selectNext: () => void;
  selectPrevious: () => void;

  // Quick Chips State (NEW)
  activeChips: QuickChip[];
  setActiveChips: (chips: QuickChip[]) => void;

  // Bottom Bar Focus State (NEW)
  shouldFocusBar: boolean;
  triggerBottomBarFocus: () => void;
  resetBottomBarFocus: () => void;

  // Reset state
  reset: () => void;
}

const MAX_HISTORY = 5;
const MAX_CONVERSATION_LENGTH = 10; // Limit conversation history to prevent memory issues

export const useAISearchStore = create<AISearchState>((set, get) => ({
  // Bottom Bar State
  barState: 'collapsed',
  setBarState: (barState) => set({ barState }),

  // Bottom Sheet state
  isOpen: false,
  openSheet: () => {
    set({ isOpen: true });

    // Track sheet opened
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sheet_opened', {
        event_category: 'search',
      });
    }
  },
  closeSheet: () => {
    set({ isOpen: false, selectedIndex: 0 });

    // Track sheet closed
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sheet_closed', {
        event_category: 'search',
      });
    }
  },
  toggleSheet: () => set((state) => ({ isOpen: !state.isOpen })),

  // Search query
  query: '',
  setQuery: (query) => set({ query, selectedIndex: 0 }),

  // Search results
  results: [],
  setResults: (results) => set({ results, selectedIndex: 0 }),

  // AI Answer State
  aiAnswer: null,
  setAIAnswer: (aiAnswer) => set({ aiAnswer }),

  // Conversation History
  conversationHistory: [],
  addToConversation: (role, content) =>
    set((state) => {
      const newMessage: Message = { role, content, timestamp: Date.now() };
      const newHistory = [...state.conversationHistory, newMessage].slice(-MAX_CONVERSATION_LENGTH);
      return { conversationHistory: newHistory };
    }),
  clearConversation: () => set({ conversationHistory: [], aiAnswer: null }),

  // Loading state
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  // Filters
  filters: {},
  setPlatformFilter: (platform) =>
    set((state) => ({
      filters: { ...state.filters, platform },
      selectedIndex: 0,
    })),
  clearFilters: () => set({ filters: {}, selectedIndex: 0 }),

  // Error state
  error: null,
  setError: (error) => set({ error }),

  // Search history
  searchHistory: [],
  addToHistory: (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    set((state) => {
      const filtered = state.searchHistory.filter((q) => q !== trimmedQuery);
      const newHistory = [trimmedQuery, ...filtered].slice(0, MAX_HISTORY);
      return { searchHistory: newHistory };
    });
  },
  clearHistory: () => set({ searchHistory: [] }),

  // Selected result index
  selectedIndex: 0,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  selectNext: () =>
    set((state) => ({
      selectedIndex: Math.min(state.selectedIndex + 1, state.results.length - 1),
    })),
  selectPrevious: () =>
    set((state) => ({
      selectedIndex: Math.max(state.selectedIndex - 1, 0),
    })),

  // Quick Chips State
  activeChips: [],
  setActiveChips: (activeChips) => set({ activeChips }),

  // Bottom Bar Focus State
  shouldFocusBar: false,
  triggerBottomBarFocus: () => set({ shouldFocusBar: true }),
  resetBottomBarFocus: () => set({ shouldFocusBar: false }),

  // Reset state
  reset: () =>
    set({
      query: '',
      results: [],
      aiAnswer: null,
      isLoading: false,
      error: null,
      selectedIndex: 0,
      barState: 'collapsed',
    }),
}));

/**
 * Perform AI-powered FAQ search and update store
 * @param query - Search query
 * @param conversational - Whether this is a follow-up in a conversation
 */
export async function performAISearch(query: string, conversational = false) {
  const {
    setIsLoading,
    setResults,
    setAIAnswer,
    setError,
    addToHistory,
    addToConversation,
    conversationHistory,
    openSheet,
  } = useAISearchStore.getState();

  if (!query || query.trim().length < 2) {
    setResults([]);
    setAIAnswer(null);
    return;
  }

  setIsLoading(true);
  setError(null);

  // Add user message to conversation if conversational mode
  if (conversational) {
    addToConversation('user', query.trim());
  }

  try {
    const cacheKey = query.trim().toLowerCase();

    // Check cache first (only for non-conversational queries)
    if (!conversational) {
      const cached = apiCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        // Use cached response
        const data = cached.response;

        if (data.aiAnswer) {
          setAIAnswer(data.aiAnswer);
        } else {
          setAIAnswer(null);
        }

        setResults(data.sources || []);
        addToHistory(query.trim());
        openSheet();
        setIsLoading(false);

        // Track cache hit
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'search_cache_hit', {
            event_category: 'search',
            query: query.trim(),
          });
        }

        return;
      }
    }

    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query.trim(),
        conversational,
        history: conversational ? conversationHistory : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Search failed');
    }

    const data = await response.json();

    // Cache the response (only for non-conversational queries)
    if (!conversational) {
      // Remove oldest entry if cache is full
      if (apiCache.size >= MAX_CACHE_SIZE) {
        const oldestKey = Array.from(apiCache.keys())[0];
        apiCache.delete(oldestKey);
      }

      apiCache.set(cacheKey, {
        query: query.trim(),
        response: data,
        timestamp: Date.now(),
      });
    }

    // Set AI answer (if available)
    if (data.aiAnswer) {
      setAIAnswer(data.aiAnswer);

      // Add assistant message to conversation if conversational mode
      if (conversational) {
        addToConversation('assistant', data.aiAnswer.text);
      }

      // Track AI answer shown
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ai_answer_shown', {
          event_category: 'search',
          query: query.trim(),
          confidence: data.aiAnswer.confidence,
          source_id: data.aiAnswer.source?.id,
          has_follow_ups: (data.aiAnswer.followUpChips?.length || 0) > 0,
        });
      }
    } else {
      setAIAnswer(null);
    }

    // Set source cards
    setResults(data.sources || []);

    // Add to search history
    addToHistory(query.trim());

    // Open bottom sheet (if not already open)
    openSheet();

    // Track search with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'search_performed', {
        event_category: 'search',
        event_label: query.trim(),
        has_ai_answer: !!data.aiAnswer,
        result_count: data.sources?.length || 0,
        conversational,
        conversation_depth: conversationHistory.length,
      });
    }
  } catch (error) {
    console.error('AI Search error:', error);
    setError(error instanceof Error ? error.message : 'An error occurred');
    setResults([]);
    setAIAnswer(null);
  } finally {
    setIsLoading(false);
  }
}
