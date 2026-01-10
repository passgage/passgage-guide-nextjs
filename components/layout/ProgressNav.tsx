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
      threshold: 0.15,
      rootMargin: '-100px 0px -60% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepNum = parseInt(entry.target.id.replace('step', ''));
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
        }
      });
    }, observerOptions);

    // Observe all step sections
    steps.forEach((step) => {
      const element = document.getElementById(step.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [steps, activeStep]);

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

  return (
    <nav className={`progress-nav ${className}`} aria-label="Progress Navigation">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => {
            const isActive = step.number === activeStep;
            const isCompleted = step.number < activeStep;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => scrollToStep(step.id, step.number)}
                  onKeyDown={(e) => handleKeyDown(e, step.id, step.number, index)}
                  aria-label={`${step.label} - Adım ${step.number}`}
                  aria-current={isActive ? 'step' : undefined}
                  tabIndex={0}
                >
                  <div className="step-num">
                    <span>{step.number}</span>
                  </div>
                  <span className="visually-hidden">{step.label}</span>
                </button>

                {/* Progress line between steps */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-neutral-200 mx-2 relative overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r from-passgage-red to-passgage-gold transition-all duration-600 ${
                        isCompleted ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Screen reader announcements */}
      <div
        id="step-announcer"
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {steps.find((s) => s.number === activeStep)?.label}. {activeStep} / {steps.length} adım.
      </div>
    </nav>
  );
}
