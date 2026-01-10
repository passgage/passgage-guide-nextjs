/**
 * Hero Component - Standard Passgage Hero Section
 *
 * CRITICAL: This component uses the SAME design for ALL pages (landing, iOS, Android, Access Tag)
 * Only content changes (icon, title, description, buttons) - background and layout are IDENTICAL
 *
 * Background: #1a1a2e + hero-bg + hero-grid (from globals.css)
 * Layout: Consistent padding, spacing, typography
 * Brand: Passgage gradient (orange-gold) for icon and highlighted text
 */

import { ReactNode } from 'react';

export interface HeroProps {
  /** Icon element (e.g., <i className="fas fa-rocket" />) */
  icon: ReactNode;

  /** Main title before highlighted text (e.g., "Passgage") */
  titleBefore: string;

  /** Highlighted text with gradient (e.g., "Kurulum", "Android", "iOS") */
  titleHighlight: string;

  /** Main title after highlighted text (e.g., "Rehberi", "Kurulumu") */
  titleAfter?: string;

  /** Description text below title */
  description: string;

  /** Primary button text (default: "Başlayalım") */
  primaryButtonText?: string;

  /** Primary button href (default: "#step1") */
  primaryButtonHref?: string;

  /** Secondary button text (default: "Sorun mu Var?") */
  secondaryButtonText?: string;

  /** Secondary button href (default: "#step6") */
  secondaryButtonHref?: string;

  /** Secondary button click handler (e.g., for opening search modal) */
  onSecondaryClick?: () => void;
}

export default function Hero({
  icon,
  titleBefore,
  titleHighlight,
  titleAfter,
  description,
  primaryButtonText = 'Başlayalım',
  primaryButtonHref = '#step1',
  secondaryButtonText = 'Sorun mu Var?',
  secondaryButtonHref = '#step6',
  onSecondaryClick,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-6 md:px-8" style={{ background: '#1a1a2e' }}>
      {/* Background Gradient (globals.css: hero-bg) */}
      <div className="hero-bg" />

      {/* Grid Pattern (globals.css: hero-grid) */}
      <div className="hero-grid" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        {/* Floating Icon */}
        <div
          className="w-[100px] h-[100px] mx-auto mb-8 rounded-[28px] flex items-center justify-center text-white text-6xl shadow-strong animate-float"
          style={{
            background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
          }}
        >
          {icon}
        </div>

        {/* Heading */}
        <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] font-extrabold leading-tight text-white mb-6">
          {titleBefore}{' '}
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {titleHighlight}
          </span>
          {titleAfter && ` ${titleAfter}`}
        </h1>

        {/* Description */}
        <p className="text-[clamp(1rem,2vw,1.2rem)] text-white/90 mb-12 max-w-[600px] mx-auto leading-relaxed">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button */}
          <a
            href={primaryButtonHref}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            style={{
              background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
            }}
          >
            <i className="fas fa-play"></i>
            {primaryButtonText}
          </a>

          {/* Secondary Button */}
          {onSecondaryClick ? (
            <button
              onClick={onSecondaryClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent text-white font-bold text-base sm:text-lg border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <i className="fas fa-question-circle"></i>
              {secondaryButtonText}
            </button>
          ) : (
            <a
              href={secondaryButtonHref}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent text-white font-bold text-base sm:text-lg border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <i className="fas fa-question-circle"></i>
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
