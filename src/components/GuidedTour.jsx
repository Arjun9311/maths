import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Compass, Sparkles } from 'lucide-react';
import { GUIDED_TOUR_STEPS } from '../data/constants';

export default function GuidedTour({ isOpen, onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = GUIDED_TOUR_STEPS[currentStepIndex];
  const totalSteps = GUIDED_TOUR_STEPS.length;

  // Scroll target element into view smoothly when step changes
  useEffect(() => {
    if (!isOpen || !step) return;

    const el = document.getElementById(step.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add subtle temporary pulse border to the target
      el.style.transition = 'outline 0.3s ease, box-shadow 0.3s ease';
      el.style.outline = '3px solid var(--blue-primary)';
      el.style.boxShadow = '0 0 25px rgba(37, 99, 235, 0.4)';

      return () => {
        el.style.outline = 'none';
        el.style.boxShadow = 'none';
      };
    }
  }, [isOpen, currentStepIndex, step]);

  if (!isOpen || !step) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1100,
      maxWidth: '420px',
      width: 'calc(100% - 48px)',
      background: 'var(--bg-card)',
      border: '2px solid var(--blue-primary)',
      borderRadius: 'var(--radius-xl)',
      padding: '1.5rem',
      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25), 0 0 25px rgba(37, 99, 235, 0.35)',
      animation: 'fadeInSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-blue">
            <Compass size={13} />
            60-Second Guided Tour
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
            {currentStepIndex + 1} of {totalSteps}
          </span>
        </div>

        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '2px' }}
          title="Skip Tour"
        >
          <X size={16} />
        </button>
      </div>

      {/* Title & Body */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
        {step.title}
      </h3>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
        {step.description}
      </p>

      {/* Progress Bars */}
      <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.25rem' }}>
        {GUIDED_TOUR_STEPS.map((_, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: 'var(--radius-pill)',
              background: idx <= currentStepIndex ? 'var(--blue-primary)' : 'var(--bg-muted)',
              transition: 'all 0.25s ease'
            }}
          />
        ))}
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onClose}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.75rem' }}
        >
          Skip Tour
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setCurrentStepIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentStepIndex === 0}
            className="btn btn-outline btn-sm"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          {currentStepIndex < totalSteps - 1 ? (
            <button
              onClick={() => setCurrentStepIndex(prev => Math.min(prev + 1, totalSteps - 1))}
              className="btn btn-primary btn-sm"
            >
              Next
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="btn btn-primary btn-sm"
            >
              Complete Tour!
              <CheckCircle2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
