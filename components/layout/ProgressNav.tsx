'use client';

import { useEffect, useState } from 'react';

export interface ProgressStep {
  id: string;
  number: number;
  label: string;
}

export interface ProgressNavProps {
  steps: ProgressStep[];
  className?: string;
}

export default function ProgressNav({ steps, className = '' }: ProgressNavProps) {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    // IntersectionObserver for automatic step tracking
    const observerOptions = {
      threshold: [0, 0.25, 0.5, 0.75, 1.0],  // Multiple thresholds for precise tracking
      rootMargin: '0px 0px -50% 0px',         // Reduced margin for accurate viewport detection
    };

    const observer = new IntersectionObserver((entries) => {
      // Filter only visible entries
      const visibleEntries = entries.filter(entry => entry.isIntersecting);

      if (visibleEntries.length === 0) return;

      // Find the most visible entry (highest intersectionRatio)
      const mostVisible = visibleEntries.reduce((prev, current) => {
        return current.intersectionRatio > prev.intersectionRatio ? current : prev;
      });

      const stepNum = parseInt(mostVisible.target.id.replace('step', ''));
      if (!isNaN(stepNum) && stepNum !== activeStep) {
        setActiveStep(stepNum);

        // Analytics tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'navigation_scroll', {
            event_category: 'navigation',
            event_label: `Step ${stepNum}`,
            value: stepNum,
          });
        }
      }
    }, observerOptions);

    // Observe all step sections
    steps.forEach((step) => {
      const element = document.getElementById(step.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [steps]);

  const scrollToStep = (stepId: string, stepNumber: number) => {
    const element = document.getElementById(stepId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'navigation_click', {
          event_category: 'navigation',
          event_label: `Step ${stepNumber}`,
          value: stepNumber,
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, stepId: string, stepNumber: number, index: number) => {
    // Enter or Space to activate
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToStep(stepId, stepNumber);
    }

    // Arrow key navigation
    if (e.key === 'ArrowRight' && index < steps.length - 1) {
      e.preventDefault();
      const nextStep = steps[index + 1];
      scrollToStep(nextStep.id, nextStep.number);
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      const prevStep = steps[index - 1];
      scrollToStep(prevStep.id, prevStep.number);
    }
  };

  // Get current step label for mobile display
  const currentStepLabel = steps.find(s => s.number === activeStep)?.label || '';

  return (
    <nav className={`bg-white border-b border-neutral-200 ${className}`} aria-label="Progress Navigation">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* MOBILE: Step header + Dots (< 768px) */}
        <div className="md:hidden">
          {/* Current step indicator */}
          <div className="text-sm text-neutral-600 mb-3 flex items-center justify-between">
            <span className="font-medium">
              Adım {activeStep}: <span className="text-neutral-900">{currentStepLabel}</span>
            </span>
            <span className="text-xs bg-neutral-100 px-2 py-1 rounded">
              {activeStep}/{steps.length}
            </span>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-3">
            {steps.map((step) => {
              const isActive = step.number === activeStep;
              const isCompleted = step.number < activeStep;

              return (
                <button
                  key={step.id}
                  className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-passgage-red focus:ring-offset-2 ${
                    isActive
                      ? 'w-8 h-3'  // Active: pill shape
                      : 'w-3 h-3'  // Inactive/completed: circle
                  } ${
                    !isActive && !isCompleted ? 'bg-neutral-300' : ''
                  }`}
                  style={
                    isActive || isCompleted
                      ? { background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }
                      : undefined
                  }
                  onClick={() => scrollToStep(step.id, step.number)}
                  aria-label={`${step.label} - Adım ${step.number}`}
                  aria-current={isActive ? 'step' : undefined}
                  tabIndex={0}
                >
                  <span className="sr-only">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP: Full step buttons with progress lines (≥ 768px) */}
        <div className="hidden md:flex items-center justify-between gap-2">
          {steps.map((step, index) => {
            const isActive = step.number === activeStep;
            const isCompleted = step.number < activeStep;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  className={`group relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-passgage-red focus:ring-offset-2 ${
                    isActive
                      ? 'text-white shadow-md scale-110'
                      : isCompleted
                      ? 'text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                  style={
                    isActive || isCompleted
                      ? { background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }
                      : undefined
                  }
                  onClick={() => scrollToStep(step.id, step.number)}
                  onKeyDown={(e) => handleKeyDown(e, step.id, step.number, index)}
                  aria-label={`${step.label} - Adım ${step.number}`}
                  aria-current={isActive ? 'step' : undefined}
                  tabIndex={0}
                >
                  {/* Hover gradient overlay for inactive steps */}
                  {!isActive && !isCompleted && (
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
                    />
                  )}
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">{step.number}</span>
                  <span className="sr-only">{step.label}</span>
                </button>

                {/* Progress line between steps */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-neutral-200 mx-2 relative overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                        isCompleted ? 'w-full' : 'w-0'
                      }`}
                      style={{ background: 'linear-gradient(90deg, #FF501D 0%, #FFD700 100%)' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Screen reader announcements */}
        <div
          id="step-announcer"
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentStepLabel}. {activeStep} / {steps.length} adım.
        </div>
      </div>
    </nav>
  );
}
