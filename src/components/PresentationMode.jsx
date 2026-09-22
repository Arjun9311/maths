import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, RotateCcw, Monitor, CheckCircle, Sparkles } from 'lucide-react';
import { PRESENTATION_SLIDES } from '../data/constants';

export default function PresentationMode({ isOpen, onClose }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Keyboard navigation support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex(prev => Math.min(prev + 1, PRESENTATION_SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slide = PRESENTATION_SLIDES[currentSlideIndex];
  const totalSlides = PRESENTATION_SLIDES.length;

  return (
    <div className="presentation-mode-container">
      {/* Top Bar */}
      <div className="presentation-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'var(--blue-primary)',
            color: '#ffffff',
            padding: '0.45rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex'
          }}>
            <Monitor size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Presentation Mode
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Classroom & Viva Deck — Slide {currentSlideIndex + 1} of {totalSlides}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="text-xs text-muted hide-on-mobile">
            Use Left/Right arrow keys or Spacebar to advance
          </span>
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: 'var(--radius-pill)', padding: '0.35rem 0.85rem' }}
          >
            <X size={15} />
            Exit Presentation
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="presentation-stage">
        <div className="presentation-slide-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span className="badge badge-purple" style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>
              Slide {slide.slideNumber} / {totalSlides}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Antigravity Interactive Statistics
            </span>
          </div>

          <h2 className="presentation-slide-title">
            {slide.title}
          </h2>

          <div className="presentation-slide-sub">
            {slide.subtitle}
          </div>

          {/* Key Bullet Points */}
          <div className="presentation-points">
            {slide.points.map((pt, idx) => (
              <div key={idx} className="presentation-point-item">
                <div className="presentation-point-bullet">
                  {idx + 1}
                </div>
                <div>{pt}</div>
              </div>
            ))}
          </div>

          {/* Large Takeaway Footer */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
            border: '1px solid var(--blue-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              background: 'var(--blue-light)',
              color: 'var(--blue-primary)',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex'
            }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--blue-primary)', letterSpacing: '0.05em' }}>
                Key Slide Takeaway
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.15rem' }}>
                "{slide.takeaway}"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls Bar */}
      <div className="presentation-controls-bar">
        <button
          onClick={() => setCurrentSlideIndex(0)}
          className="btn btn-outline"
        >
          <RotateCcw size={16} />
          Restart Deck
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {PRESENTATION_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              style={{
                width: currentSlideIndex === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: 'var(--radius-pill)',
                background: currentSlideIndex === idx ? 'var(--blue-primary)' : 'var(--border-medium)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              title={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="btn btn-outline btn-lg"
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          {currentSlideIndex < totalSlides - 1 ? (
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.min(totalSlides - 1, prev + 1))}
              className="btn btn-primary btn-lg"
            >
              Next Slide
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="btn btn-primary btn-lg"
            >
              Finish & Return
              <CheckCircle size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
