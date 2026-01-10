'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchStore } from '@/store/searchStore';

export interface HeaderProps {
  showSearch?: boolean;
  className?: string;
}

export default function Header({ showSearch = false, className = '' }: HeaderProps) {
  const openModal = useSearchStore((state) => state.openModal);

  return (
    <header className={`bg-white border-b border-neutral-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Search Bar */}
          {showSearch && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <button
                className="w-full px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-500 text-left rounded-xl border border-neutral-200 transition-colors flex items-center justify-between"
                onClick={openModal}
              >
                <div className="flex items-center gap-2">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-sm">Sorun mu yaşıyorsunuz?</span>
                </div>
                <kbd className="hidden lg:inline-block px-2 py-1 text-xs font-semibold text-neutral-600 bg-white border border-neutral-200 rounded">
                  ⌘K
                </kbd>
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex items-center gap-4">
            <Link
              href="/ios"
              className="text-neutral-700 hover:text-passgage-blue font-medium transition-colors"
            >
              iOS
            </Link>
            <Link
              href="/android"
              className="text-neutral-700 hover:text-passgage-blue font-medium transition-colors"
            >
              Android
            </Link>
            <Link
              href="/access-tag"
              className="text-neutral-700 hover:text-passgage-blue font-medium transition-colors"
            >
              Access Tag
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
