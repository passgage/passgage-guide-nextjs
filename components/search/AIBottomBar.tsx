'use client';

import { useState, useRef, useEffect } from 'react';
import { Platform } from '@/lib/faq/types';
import { useAISearchStore, performAISearch } from '@/store/aiSearchStore';
import QuickActionChips from './QuickActionChips';

interface AIBottomBarProps {
  variant: 'landing' | 'guide';
  platform?: Platform;
  currentStep?: string;
}

export default function AIBottomBar({
  variant,
  platform,
  currentStep,
}: AIBottomBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const setStoreQuery = useAISearchStore((state) => state.setQuery);
  const shouldFocusBar = useAISearchStore((state) => state.shouldFocusBar);
  const resetBottomBarFocus = useAISearchStore((state) => state.resetBottomBarFocus);

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !query.trim()
      ) {
        setIsFocused(false);
      }
    };

    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused, query]);

  // Handle Esc key to collapse
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFocused) {
        setIsFocused(false);
        setQuery('');
        inputRef.current?.blur();
      }
    };

    if (isFocused) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isFocused]);

  // Handle focus trigger from store (for "Yeni sohbet" flow)
  useEffect(() => {
    if (shouldFocusBar) {
      setIsFocused(true);
      setQuery('');
      inputRef.current?.focus();
      resetBottomBarFocus();
    }
  }, [shouldFocusBar, resetBottomBarFocus]);

  // Handle expand on click
  const handleExpand = () => {
    setIsFocused(true);
    inputRef.current?.focus();

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'bottom_bar_click', {
        event_category: 'search',
        platform: variant === 'landing' ? 'landing' : platform || 'unknown',
      });
    }
  };

  // Handle chip click
  const handleChipClick = (chipQuery: string) => {
    setQuery(chipQuery);
    setStoreQuery(chipQuery); // Update store query
    // Trigger AI search
    performAISearch(chipQuery, false);
  };

  // Handle Enter key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      setStoreQuery(query.trim()); // Update store query
      // Trigger AI search
      performAISearch(query.trim(), false);
    }
  };

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Clear query
  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const showChips = isFocused && !query.trim();
  const isCollapsed = !isFocused;

  return (
    <div
      ref={containerRef}
      className={`
        fixed z-40
        bg-white/90 backdrop-blur-md
        border-2 border-neutral-200
        transition-all duration-300 ease-in-out
        ${
          isCollapsed
            ? 'bottom-4 md:bottom-8 left-4 md:left-1/2 right-4 md:right-auto md:-translate-x-1/2 md:max-w-2xl h-14 rounded-full shadow-medium'
            : 'bottom-4 md:bottom-8 left-4 md:left-1/2 right-4 md:right-auto md:-translate-x-1/2 md:max-w-4xl rounded-3xl shadow-strong'
        }
      `}
      onClick={isCollapsed ? handleExpand : undefined}
    >
      {/* Input Field */}
      <div className="relative flex items-center px-4 py-3">
        {/* Search Icon */}
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 mx-3 bg-transparent outline-none text-neutral-900 placeholder-neutral-500"
          placeholder={
            variant === 'landing'
              ? 'Sorunuzu sorun...'
              : 'Nasıl yardımcı olabilirim?'
          }
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Temizle"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Action Chips */}
      {showChips && (
        <div className="px-4 pb-4 pt-2">
          <QuickActionChips
            variant={variant === 'landing' ? 'landing' : (platform as any) || 'landing'}
            currentStep={currentStep}
            onChipClick={handleChipClick}
          />
        </div>
      )}
    </div>
  );
}
