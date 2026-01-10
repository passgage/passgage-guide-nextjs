'use client';

import { useEffect, useRef } from 'react';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoId, title }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-neutral-900 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
          aria-label="Videoyu kapat"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video Header */}
        <div className="bg-gradient-to-r from-passgage-red to-passgage-gold p-4 md:p-6">
          <h2 id="video-modal-title" className="text-xl md:text-2xl font-bold text-white">
            {title}
          </h2>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Keyboard Hint */}
        <div className="bg-neutral-800 px-4 py-3 md:px-6 md:py-4">
          <p className="text-xs md:text-sm text-neutral-400 text-center">
            <kbd className="px-2 py-1 bg-neutral-700 rounded text-neutral-300 font-mono text-xs">
              ESC
            </kbd>
            {' '}tuşuna basarak kapatabilirsiniz
          </p>
        </div>
      </div>
    </div>
  );
}
