import React from 'react';
import { BarChart3, GraduationCap, RotateCcw, Info, Sun, Moon, Sparkles, BookOpen, Layers, Monitor, Award, Book, Compass, Utensils } from 'lucide-react';

export default function Header({
  isDarkMode,
  onToggleDarkMode,
  isLearningMode,
  onToggleLearningMode,
  viewMode,
  onToggleViewMode,
  onReset,
  onOpenAbout,
  onOpenViva,
  onOpenDictionary,
  onOpenPresentation,
  onStartTour,
  isRealLifeMode,
  onToggleRealLifeMode
}) {
  return (
    <header style={{
      backgroundColor: 'var(--bg-glass)',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(12px)',
      boxShadow: 'var(--shadow-xs)'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0.65rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--blue-primary), var(--purple-accent))',
            color: '#ffffff',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
          }}>
            <BarChart3 size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Sampling & Estimation
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.675rem' }}>
                Interactive Lab
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Visual Statistics & Self-Explaining Inference
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          {/* Explain This Project (Viva Deck) */}
          <button
            onClick={onOpenViva}
            className="btn btn-primary btn-sm"
            title="10s, 30s & 1-minute viva-ready project explanations"
            style={{ fontWeight: 700, gap: '0.35rem' }}
          >
            <Award size={14} />
            <span>Explain This Project</span>
          </button>

          {/* Presentation Mode */}
          <button
            onClick={onOpenPresentation}
            className="btn btn-outline btn-sm"
            title="Launch 10-Slide Classroom Presentation Deck"
            style={{ gap: '0.35rem' }}
          >
            <Monitor size={14} color="var(--purple-accent)" />
            <span className="hide-on-mobile">Presentation Mode</span>
          </button>

          {/* 60-Second Tour */}
          <button
            onClick={onStartTour}
            className="btn btn-outline btn-sm"
            title="Take a 60-second guided tour of the simulator"
            style={{ gap: '0.35rem' }}
          >
            <Compass size={14} color="var(--blue-primary)" />
            <span className="hide-on-mobile">Tour</span>
          </button>

          {/* Statistics Dictionary */}
          <button
            onClick={onOpenDictionary}
            className="btn btn-outline btn-sm"
            title="Searchable Statistics Glossary with Real-Life Analogies"
            style={{ gap: '0.35rem' }}
          >
            <Book size={14} />
            <span className="hide-on-mobile">Dictionary</span>
          </button>

          {/* Real-Life Analogies Toggle */}
          <button
            onClick={onToggleRealLifeMode}
            className={`btn btn-sm ${isRealLifeMode ? 'btn-primary' : 'btn-outline'}`}
            title="Toggle Real-Life Analogies (Soup tasting, etc.)"
            style={{ padding: '0.4rem 0.6rem' }}
          >
            <Utensils size={13} />
            <span className="hide-on-mobile" style={{ fontSize: '0.725rem' }}>Analogies</span>
          </button>

          {/* Learning Stepper Toggle */}
          <button
            onClick={onToggleLearningMode}
            className={`btn btn-sm ${isLearningMode ? 'btn-primary' : 'btn-outline'}`}
            title="Toggle Step-by-Step Classroom Mode"
            style={{ padding: '0.4rem 0.6rem' }}
          >
            <BookOpen size={13} />
            <span className="hide-on-mobile" style={{ fontSize: '0.725rem' }}>Steps</span>
          </button>

          {/* View Mode Toggle: Basic vs Technical */}
          <button
            onClick={onToggleViewMode}
            className="btn btn-outline btn-sm"
            title="Toggle between Beginner Visual View and Advanced Technical View"
            style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
          >
            <Layers size={13} />
            <span className="hide-on-mobile">{viewMode === 'technical' ? 'Technical' : 'Beginner'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.45rem', borderRadius: '50%' }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={14} color="var(--amber-accent)" /> : <Moon size={14} color="var(--purple-accent)" />}
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="btn btn-secondary btn-sm"
            title="Reset Simulation to Initial Defaults"
            style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
          >
            <RotateCcw size={13} />
          </button>

          {/* About */}
          <button
            onClick={onOpenAbout}
            className="btn btn-outline btn-sm"
            title="Methodology Notes"
            style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
          >
            <Info size={13} />
          </button>
        </div>
      </div>
    </header>
  );
}
