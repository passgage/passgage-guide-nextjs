import { create } from 'zustand';
import { FAQSearchResult, Platform, SearchFilters } from '@/lib/faq/types';

interface SearchState {
  // Modal state
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;

  // Search query
  query: string;
  setQuery: (query: string) => void;

  // Search results
  results: FAQSearchResult[];
  setResults: (results: FAQSearchResult[]) => void;

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

  // Reset state
  reset: () => void;
}

const MAX_HISTORY = 5;

export const useSearchStore = create<SearchState>((set, get) => ({
  // Modal state
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, selectedIndex: 0 }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),

  // Search query
  query: '',
  setQuery: (query) => set({ query, selectedIndex: 0 }),

  // Search results
  results: [],
  setResults: (results) => set({ results, selectedIndex: 0 }),

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

  // Reset state
  reset: () =>
    set({
      query: '',
      results: [],
      isLoading: false,
      error: null,
      selectedIndex: 0,
    }),
}));

/**
 * Perform FAQ search and update store
 */
export async function performSearch(query: string, filters?: SearchFilters) {
  const { setIsLoading, setResults, setError, addToHistory } = useSearchStore.getState();

  if (!query || query.trim().length < 2) {
    setResults([]);
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query.trim(),
        filters,
        limit: 10,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Search failed');
    }

    const data = await response.json();
    setResults(data.results);
    addToHistory(query.trim());

    // Track search with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'search_performed', {
        event_category: 'search',
        event_label: query.trim(),
        value: data.results.length,
      });
    }
  } catch (error) {
    console.error('Search error:', error);
    setError(error instanceof Error ? error.message : 'An error occurred');
    setResults([]);
  } finally {
    setIsLoading(false);
  }
}
