import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, RotateCcw, Monitor, CheckCircle, Maximize2, Minimize2 } from 'lucide-react';
import { PRESENTATION_SLIDES } from '../data/constants';

export default function PresentationMode({ isOpen, onClose }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync fullscreen state with DOM
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex(prev => Math.min(prev + 1, PRESENTATION_SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          onClose();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slide = PRESENTATION_SLIDES[currentSlideIndex];
  const totalSlides = PRESENTATION_SLIDES.length;

  return (
    <div className="presentation-mode-container" role="dialog" aria-modal="true" aria-label="Presentation Mode">
      {/* Top Bar */}
      <header className="presentation-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'var(--blue-primary)',
            color: '#ffffff',
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex'
          }}>
            <Monitor size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
              Presentation Mode
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Slide {slide.slideNumber} of {totalSlides} (Use &larr; &rarr; or Spacebar)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={toggleFullscreen}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: 'var(--radius-pill)', padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span className="hide-on-mobile">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: 'var(--radius-pill)', padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
            title="Exit Presentation (Esc)"
          >
            <X size={14} />
            <span>Close</span>
          </button>
        </div>
      </header>

      {/* Main Slide Stage */}
      <main className="presentation-stage">
        <article className="presentation-slide-card">
          <div className="presentation-card-header">
            <span className="badge badge-purple" style={{ fontSize: '0.78rem', padding: '0.25rem 0.75rem' }}>
              Slide {slide.slideNumber} / {totalSlides}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
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

          {/* Slide Takeaway Footer */}
          <div className="presentation-takeaway-card">
            <div style={{
              background: 'var(--blue-light)',
              color: 'var(--blue-primary)',
              padding: '0.4rem',
              borderRadius: '50%',
              display: 'flex',
              flexShrink: 0
            }}>
              <CheckCircle size={18} />
            </div>
            <div>
              <div className="presentation-takeaway-badge">
                Key Slide Takeaway
              </div>
              <div className="presentation-takeaway-text">
                "{slide.takeaway}"
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Slide Navigation Controls Bar */}
      <footer className="presentation-controls-bar">
        <button
          onClick={() => setCurrentSlideIndex(0)}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
        >
          <RotateCcw size={13} />
          <span>Restart</span>
        </button>

        {/* Slide Progress Dots */}
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {PRESENTATION_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              style={{
                width: currentSlideIndex === idx ? '22px' : '7px',
                height: '7px',
                borderRadius: 'var(--radius-pill)',
                background: currentSlideIndex === idx ? 'var(--blue-primary)' : 'var(--border-medium)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                padding: 0
              }}
              title={`Jump to slide ${idx + 1}`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
          >
            <ArrowLeft size={14} />
            <span>Prev</span>
          </button>

          {currentSlideIndex < totalSlides - 1 ? (
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.min(totalSlides - 1, prev + 1))}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
            >
              <span>Finish</span>
              <CheckCircle size={14} />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
