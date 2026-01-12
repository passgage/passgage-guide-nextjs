'use client';

import Link from 'next/link';
import { FAQSearchResult, Platform } from '@/lib/faq/types';

interface SourceCardProps {
  result: FAQSearchResult;
  isSelected?: boolean;
  onMouseEnter?: () => void;
  onClick?: () => void;
  onGuideClick?: () => void;
}

const platformLabels: Record<Platform, string> = {
  ios: 'iOS',
  android: 'Android',
  'access-tag': 'Access Tag',
  general: 'Genel',
};

const platformColors: Record<Platform, string> = {
  ios: 'bg-ios-black text-white',
  android: 'bg-android-green text-white',
  'access-tag': 'bg-tag-blue text-white',
  general: 'bg-neutral-500 text-white',
};

export default function SourceCard({
  result,
  isSelected = false,
  onMouseEnter,
  onClick,
  onGuideClick,
}: SourceCardProps) {
  return (
    <button
      className={`w-full text-left px-6 py-4 hover:bg-neutral-50 transition-colors border-l-4 rounded-r-xl ${
        isSelected
          ? 'bg-blue-50 border-passgage-blue'
          : 'border-transparent hover:border-neutral-200'
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Platform Badge + Score */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                platformColors[result.platform]
              }`}
            >
              {platformLabels[result.platform]}
            </span>
            <span className="text-xs text-neutral-500 font-medium">
              {(result.score * 100).toFixed(0)}% eşleşme
            </span>
          </div>

          {/* Question */}
          <h3 className="font-bold text-neutral-900 mb-2 leading-tight">
            {result.question}
          </h3>

          {/* Answer Preview */}
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {result.answer ? result.answer.substring(0, 120) : 'Cevap bulunamadı'}...
          </p>

          {/* Guide Link */}
          {result.guideLink && (
            <Link
              href={result.guideLink}
              className="inline-flex items-center gap-2 mt-3 text-sm text-passgage-blue hover:text-passgage-blue/80 font-medium transition-colors"
              onClick={(e) => {
                e.stopPropagation();

                // Close bottom sheet
                if (onGuideClick) {
                  onGuideClick();
                }

                // Track click
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'source_card_guide_click', {
                    event_category: 'search',
                    result_id: result.id,
                    platform: result.platform,
                  });
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Detaylı kılavuza git
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Arrow Icon */}
        <svg
          className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-1"
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
  );
}
