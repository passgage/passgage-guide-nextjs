'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore, performSearch } from '@/store/searchStore';
import { Platform } from '@/lib/faq/types';

const platformLabels: Record<Platform, string> = {
  ios: 'iOS',
  android: 'Android',
  'access-tag': 'Access Tag',
  general: 'Genel',
};

const platformColors: Record<Platform, string> = {
  ios: 'bg-ios-blue text-white',
  android: 'bg-android-green text-white',
  'access-tag': 'bg-tag-blue text-white',
  general: 'bg-neutral-500 text-white',
};

export default function SearchModal() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen,
    closeModal,
    query,
    setQuery,
    results,
    isLoading,
    error,
    filters,
    setPlatformFilter,
    selectedIndex,
    selectNext,
    selectPrevious,
    setSelectedIndex,
    reset,
  } = useSearchStore();

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(query, filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, filters]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle modal
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? closeModal() : useSearchStore.getState().openModal();
      }

      // ESC to close
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }

      // Arrow keys for navigation (only when modal is open)
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectNext();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectPrevious();
        }

        // Enter to select
        if (e.key === 'Enter' && results[selectedIndex]) {
          e.preventDefault();
          handleResultClick(results[selectedIndex].pageUrl);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      reset();
    }
  }, [isOpen, reset]);

  const handleResultClick = useCallback(
    (url: string) => {
      // Track click with Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'search_result_clicked', {
          event_category: 'search',
          event_label: url,
        });
      }

      closeModal();
      router.push(url);
    },
    [closeModal, router]
  );

  const handlePlatformFilter = (platform?: Platform) => {
    setPlatformFilter(platform);

    // Track filter with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'search_filter_applied', {
        event_category: 'search',
        event_label: platform || 'all',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-6 border-b border-neutral-200">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-neutral-200 rounded-2xl focus:outline-none focus:border-passgage-blue transition-colors"
              placeholder="Sorun mu yaşıyorsunuz? Arayın..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Platform Filters */}
          <div className="flex gap-2 mt-4">
            <button
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                !filters.platform
                  ? 'bg-passgage-blue text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              onClick={() => handlePlatformFilter(undefined)}
            >
              Tümü
            </button>
            {(['ios', 'android', 'access-tag'] as Platform[]).map((platform) => (
              <button
                key={platform}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filters.platform === platform
                    ? platformColors[platform]
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                onClick={() => handlePlatformFilter(platform)}
              >
                {platformLabels[platform]}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {isLoading && (
            <div className="p-8 text-center text-neutral-500">
              <div className="inline-block w-8 h-8 border-4 border-passgage-blue border-t-transparent rounded-full animate-spin" />
              <p className="mt-4">Aranıyor...</p>
            </div>
          )}

          {error && (
            <div className="p-8 text-center text-red-600">
              <p className="font-semibold">Hata</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          )}

          {!isLoading && !error && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-neutral-500">
              <svg
                className="w-16 h-16 mx-auto text-neutral-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="font-semibold">Sonuç bulunamadı</p>
              <p className="text-sm mt-2">Farklı anahtar kelimeler deneyin</p>
            </div>
          )}

          {!isLoading && !error && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  className={`w-full text-left px-6 py-4 hover:bg-neutral-50 transition-colors border-l-4 ${
                    index === selectedIndex
                      ? 'bg-blue-50 border-passgage-blue'
                      : 'border-transparent'
                  }`}
                  onClick={() => handleResultClick(result.pageUrl)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            platformColors[result.platform]
                          }`}
                        >
                          {platformLabels[result.platform]}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {(result.score * 100).toFixed(0)}% eşleşme
                        </span>
                      </div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {result.question}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {result.answer.substring(0, 150)}...
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-neutral-400 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded">↑↓</kbd>
                Gezin
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded">Enter</kbd>
                Seç
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded">Esc</kbd>
                Kapat
              </span>
            </div>
            <span>
              {results.length > 0 && `${results.length} sonuç bulundu`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
