/**
 * Header Component - Standard Passgage Header
 *
 * CRITICAL: Same header design for ALL pages
 * - Landing page: Logo only
 * - Guide pages: Back Button + Logo + ProgressNav
 *
 * NOTE: Search moved to bottom bar (AIBottomBar)
 * ProgressNav is integrated directly into header for guide pages
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import ProgressNav from './ProgressNav';
import type { ProgressStep } from './ProgressNav';

export interface HeaderProps {
  /** Guide page mode with back button and ProgressNav */
  isGuide?: boolean;

  /** Progress steps for ProgressNav (guide pages only) */
  progressSteps?: ProgressStep[];

  className?: string;
}

export default function Header({
  isGuide = false,
  progressSteps,
  className = ''
}: HeaderProps) {
  return (
    <header className={`bg-white border-b border-neutral-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side: Logo (or Back Button + Logo for guides) */}
          {isGuide ? (
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <Link
                href="/"
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <i className="fas fa-arrow-left"></i>
                <span className="hidden sm:inline">Ana Sayfa</span>
              </Link>
              <div className="w-px h-6 bg-neutral-200"></div>
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Passgage"
                  width={120}
                  height={30}
                  priority
                  className="h-auto"
                />
              </Link>
            </div>
          ) : (
            /* Landing Page: Just Logo */
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Passgage"
                width={140}
                height={35}
                priority
                className="h-auto"
              />
            </Link>
          )}
        </div>
      </div>

      {/* ProgressNav - Guide pages only */}
      {isGuide && progressSteps && (
        <ProgressNav steps={progressSteps} />
      )}
    </header>
  );
}
