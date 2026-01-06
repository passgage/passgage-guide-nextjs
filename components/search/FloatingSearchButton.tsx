'use client';

import { useSearchStore } from '@/store/searchStore';

export default function FloatingSearchButton() {
  const openModal = useSearchStore((state) => state.openModal);

  return (
    <button
      onClick={openModal}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-passgage-blue to-blue-600 text-white rounded-full shadow-2xl hover:shadow-hover hover:scale-110 transition-all duration-300 flex items-center justify-center group md:hidden"
      aria-label="FAQ Ara"
    >
      <svg
        className="w-7 h-7 transition-transform group-hover:scale-110"
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

      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-passgage-blue opacity-75 animate-ping" />
    </button>
  );
}
