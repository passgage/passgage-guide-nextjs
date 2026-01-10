'use client';

import { useState, ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
  badge?: string;
  badgeStyle?: React.CSSProperties;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
  platform?: 'ios' | 'android';
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIndex,
  platform = 'ios',
  className = ''
}: AccordionProps) {
  // Initialize with default open item if specified
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (defaultOpenIndex !== undefined && items[defaultOpenIndex]) {
      return new Set([items[defaultOpenIndex].id]);
    }
    return new Set();
  });

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);

    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(id);
    }

    setOpenItems(newOpenItems);

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', newOpenItems.has(id) ? 'faq_open' : 'faq_close', {
        event_category: 'engagement',
        event_label: items.find(item => item.id === id)?.question || id,
      });
    }
  };

  // Platform-specific accent colors
  const accentColor = platform === 'android' ? '#3ddc84' : '#2872fa';

  return (
    <div className={`space-y-4 md:space-y-6 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl md:rounded-3xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden border border-neutral-100"
          >
            <button
              className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left group focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all min-h-[64px]"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex-1 flex items-center gap-3">
                <span className="text-base md:text-lg font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                  {item.question}
                </span>
                {item.badge && (
                  <span
                    className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold text-white flex-shrink-0"
                    style={item.badgeStyle}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? accentColor : '#f3f4f6',
                }}
              >
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                    isOpen ? 'rotate-180 text-white' : 'text-neutral-600'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            <div
              id={`accordion-content-${item.id}`}
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isOpen}
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
                <div className="prose prose-neutral max-w-none">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
