import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, RotateCcw, GraduationCap, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { TEACH_ME_LESSONS } from '../data/constants';

export default function TeachMeModal({ lessonKey, isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen || !lessonKey) return null;

  const lesson = TEACH_ME_LESSONS[lessonKey] || TEACH_ME_LESSONS.sampling;
  const steps = lesson.steps;
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReplay = () => {
    setCurrentStep(0);
  };

  return (
    <div className="edu-modal-backdrop" onClick={onClose}>
      <div className="edu-modal-card" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="edu-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--blue-primary), var(--purple-accent))',
              color: '#ffffff',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex'
            }}>
              <GraduationCap size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                {lesson.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Step {currentStep + 1} of {steps.length} — Interactive Mini-Lesson
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.35rem 0.5rem', borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="edu-modal-body">
          {/* Step Progress Indicators */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {steps.map((s, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentStep(idx)}
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: 'var(--radius-pill)',
                  background: idx <= currentStep ? 'var(--blue-primary)' : 'var(--bg-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                title={`Go to Step ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>

          {/* Active Step Content */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-light)',
            marginBottom: '1.25rem',
            animation: 'fadeInSlideUp 0.3s ease'
          }}>
            <div style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
              <span className="badge badge-blue">
                {step.highlight}
              </span>
            </div>

            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              {step.title}
            </h4>

            <p style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {step.body}
            </p>

            {/* Key Takeaway Box */}
            <div className="key-takeaway-box">
              <CheckCircle2 size={18} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
              <div>
                <strong>Core Takeaway</strong>
                <p>{step.takeaway}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="edu-modal-footer">
          <button
            onClick={handleReplay}
            className="btn btn-outline btn-sm"
            title="Start from beginning"
          >
            <RotateCcw size={14} />
            Replay
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="btn btn-outline"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn btn-primary"
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="btn btn-primary"
              >
                Got It! Exit
                <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
