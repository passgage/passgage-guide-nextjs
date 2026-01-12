'use client';

import { useEffect, useRef, useState } from 'react';
import { useAISearchStore, performAISearch } from '@/store/aiSearchStore';
import AIAnswerCard from './AIAnswerCard';
import SourceCard from './SourceCard';
import { Skeleton } from '@/components/ui';

export default function AIBottomSheet() {
  const {
    isOpen,
    closeSheet,
    query,
    results,
    aiAnswer,
    isLoading,
    selectedIndex,
    conversationHistory,
    clearConversation,
    triggerBottomBarFocus,
    error,
  } = useAISearchStore();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(100); // Default 100% (full screen)
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const snapPoints = [30, 60, 100]; // Snap points as percentages (full screen at max)

  const handleFollowUpClick = (chip: string) => {
    // Track follow-up click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'follow_up_click', {
        event_category: 'search',
        chip_text: chip,
        conversation_depth: useAISearchStore.getState().conversationHistory.length + 1,
      });
    }

    // Perform conversational search with the follow-up question
    performAISearch(chip, true); // true = conversational mode
  };

  // Close sheet when clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSheet();
    }
  };

  // Handle touch/mouse drag start
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setDragStartY(clientY);
  };

  // Handle touch/mouse drag move
  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;

    const deltaY = dragStartY - clientY;
    const windowHeight = window.innerHeight;
    const deltaPercent = (deltaY / windowHeight) * 100;
    const newHeight = Math.min(100, Math.max(30, currentHeight + deltaPercent));

    setCurrentHeight(newHeight);
    setDragStartY(clientY);
  };

  // Handle touch/mouse drag end
  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Snap to nearest snap point
    const nearest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev
    );

    // If dragged down below 30%, close the sheet
    if (currentHeight < 25) {
      closeSheet();
    } else {
      setCurrentHeight(nearest);
    }
  };

  // Reset height when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentHeight(100); // Default to 100% (full screen) when opening
    }
  }, [isOpen]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto-scroll to bottom when new conversation message arrives
  useEffect(() => {
    if (contentRef.current && conversationHistory.length > 0) {
      const scrollToBottom = () => {
        contentRef.current?.scrollTo({
          top: contentRef.current.scrollHeight,
          behavior: 'smooth',
        });
      };
      // Delay scroll to allow DOM to update
      setTimeout(scrollToBottom, 100);
    }
  }, [conversationHistory.length, aiAnswer]);

  // Keyboard navigation (Esc to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSheet();

        // Track keyboard close
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'sheet_closed_keyboard', {
            event_category: 'search',
            key: 'Escape',
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSheet]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed left-0 right-0 bg-white z-50 transition-all duration-300 ease-out"
        style={{
          bottom: 0,
          height: `${currentHeight}vh`,
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.15)',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-search-title"
        aria-describedby="ai-search-description"
      >
        {/* Drag Handle Header */}
        <div
          className="flex flex-col items-center pt-5 pb-4 px-4 cursor-grab active:cursor-grabbing bg-white border-b-2 border-neutral-200"
          onMouseDown={(e) => handleDragStart(e.clientY)}
          onMouseMove={(e) => handleDragMove(e.clientY)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => {
            e.preventDefault();
            handleDragStart(e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            handleDragMove(e.touches[0].clientY);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleDragEnd();
          }}
        >
          {/* Drag handle - VERY visible */}
          <div
            className="w-20 h-2 rounded-full mb-4 shadow-md"
            style={{ backgroundColor: '#9ca3af' }}
            role="presentation"
            aria-hidden="true"
          />

          {/* Query display */}
          <div className="w-full">
            <p className="text-sm font-semibold text-neutral-700 text-center" role="status" aria-live="polite">
              "{query}"
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={contentRef} className="px-4 pb-8 overflow-y-auto" style={{ height: 'calc(100% - 100px)' }}>
          {/* New Conversation Button */}
          {conversationHistory.length > 0 && !isLoading && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  clearConversation();
                  closeSheet();
                  // Trigger bottom bar focus after a short delay (to allow sheet to close first)
                  setTimeout(() => {
                    triggerBottomBarFocus();
                  }, 300);

                  // Track conversation reset
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'conversation_reset', {
                      event_category: 'search',
                      conversation_length: conversationHistory.length,
                    });
                  }
                }}
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-sm font-medium text-neutral-700 transition-colors"
              >
                🔄 Yeni sohbet
              </button>
            </div>
          )}

          {/* Conversation History */}
          {conversationHistory.length > 0 && !isLoading && (
            <div className="space-y-3 mb-6">
              {conversationHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] px-4 py-3 rounded-2xl
                      ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-passgage-red to-passgage-gold text-white'
                          : 'bg-neutral-100 text-neutral-800'
                      }
                    `}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading State with Typing Indicator & Skeleton */}
          {isLoading && (
            <div className="space-y-4">
              {/* Typing Indicator */}
              <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
                      }}
                    >
                      🤖
                    </div>
                    <div
                      className="absolute -inset-1 rounded-xl opacity-30 animate-pulse"
                      style={{
                        background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg mb-1">AI düşünüyor...</h3>
                    <div className="flex gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                          animationDelay: '0ms'
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                          animationDelay: '150ms'
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                          animationDelay: '300ms'
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-[90%] mb-2" />
                <Skeleton className="h-4 w-[95%]" />
              </div>

              {/* Source Cards Skeleton */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-32" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl border-2 border-neutral-200 p-4 animate-pulse">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-full mb-1" />
                        <Skeleton className="h-3 w-5/6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Answer Section */}
          {!isLoading && aiAnswer && (
            <AIAnswerCard
              answer={aiAnswer}
              onFollowUpClick={handleFollowUpClick}
            />
          )}

          {/* Source Cards Section - Only show if NO AI answer (fallback mode) */}
          {!isLoading && !aiAnswer && results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                📚 Kaynaklar
              </h3>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className={`animate-slide-up stagger-delay-${Math.min(index + 1, 5)}`}
                  >
                    <SourceCard
                      result={result}
                      isSelected={selectedIndex === index}
                      onClick={() => {
                      // Track source card click
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'source_card_click', {
                          event_category: 'search',
                          source_id: result.id,
                          source_platform: result.platform,
                          source_category: result.category,
                          has_ai_answer: !!aiAnswer,
                          conversation_depth: conversationHistory.length,
                        });
                      }

                        closeSheet();
                        window.location.href = result.pageUrl;
                      }}
                      onGuideClick={() => {
                        // Close bottom sheet when "Detaylı kılavuza git" is clicked
                        closeSheet();
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Bir hata oluştu</h3>
              <p className="text-neutral-500 mb-6">{error}</p>
              <button
                onClick={() => {
                  // Retry search
                  performAISearch(query, conversationHistory.length > 0);

                  // Track retry
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'search_retry', {
                      event_category: 'search',
                      error_message: error,
                    });
                  }
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-br from-passgage-red to-passgage-gold text-white font-medium hover:opacity-90 transition-opacity"
              >
                🔄 Tekrar dene
              </button>
            </div>
          )}

          {/* No Results State */}
          {!isLoading && !error && !aiAnswer && results.length === 0 && (
            <div className="text-center py-16 px-4">
              {/* Animated illustration */}
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 80, 29, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)'
                  }}
                />
                <div className="absolute inset-4 flex items-center justify-center text-6xl">
                  🔍
                </div>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-2">Üzgünüz, cevap bulamadık</h3>
              <p className="text-neutral-600 mb-6">Sorunuzu farklı kelimelerle deneyin veya yaygın sorulara göz atın</p>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                <button
                  onClick={() => {
                    closeSheet();
                    // Trigger search modal with common issues
                    triggerBottomBarFocus();
                  }}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm font-medium transition-colors"
                >
                  💬 Yaygın Sorunlar
                </button>
                <button
                  onClick={() => {
                    closeSheet();
                    window.location.href = '/ios';
                  }}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm font-medium transition-colors"
                >
                  📱 iOS Kılavuzu
                </button>
                <button
                  onClick={() => {
                    closeSheet();
                    window.location.href = '/android';
                  }}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm font-medium transition-colors"
                >
                  🤖 Android Kılavuzu
                </button>
              </div>

              {/* Support link - more prominent */}
              <a
                href="mailto:destek@passgage.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
                }}
              >
                📧 Destek Ekibiyle İletişim
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-neutral-200 bg-white safe-area-inset-bottom">
          <p className="text-xs text-neutral-400 text-center">
            Swipe down to close
          </p>
        </div>
      </div>
    </>
  );
}
