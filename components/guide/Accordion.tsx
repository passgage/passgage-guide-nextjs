'use client';

import { useState, ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

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

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);

        return (
          <div
            key={item.id}
            className="accordion-item"
          >
            <button
              className="accordion-header"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="flex-1 text-left pr-4">{item.question}</span>
              <svg
                className={`w-6 h-6 text-passgage-blue transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id={`accordion-content-${item.id}`}
              className={`accordion-content transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 py-0'
              }`}
              aria-hidden={!isOpen}
            >
              <div className="pt-2">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
