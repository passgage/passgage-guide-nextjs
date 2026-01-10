'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export type PlatformType = 'ios' | 'android' | 'access-tag';

interface PlatformCardProps {
  badge?: string;  // 🆕 Optional badge text
  type: PlatformType;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function PlatformCard({
  badge,
  type,
  title,
  description,
  href,
  icon,
  gradient,
}: PlatformCardProps) {
  useEffect(() => {
    // Declare gtag for TypeScript
    const gtag = (window as any).gtag;
    if (!gtag) return;

    const handleClick = () => {
      gtag('event', 'platform_choice', {
        event_category: 'engagement',
        event_label: type,
        value: 1,
      });
    };

    return () => {};
  }, [type]);

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'platform_choice', {
        event_category: 'engagement',
        event_label: type,
        value: 1,
      });
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`platform-card group relative block rounded-3xl p-8 md:p-10 ${gradient} text-white overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Badge (Category) */}
        {badge && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-bold text-neutral-800 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
              {badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4 transition-transform duration-500 group-hover:translate-x-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6">
          {description}
        </p>

        {/* Arrow Icon */}
        <div className="flex items-center text-white/80 group-hover:text-white transition-all duration-300">
          <span className="mr-2 font-medium">Kurulum Kılavuzunu Gör</span>
          <svg
            className="w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700" />
    </Link>
  );
}
