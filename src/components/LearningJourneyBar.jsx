import React from 'react';
import { Users, Shuffle, PieChart, Calculator, Target, ShieldCheck, ChevronRight } from 'lucide-react';

export default function LearningJourneyBar({ activeStage, onSelectStage }) {
  const stages = [
    { id: 'population', title: 'Population', subtitle: 'N = 10,000', icon: Users, color: 'var(--blue-primary)', targetId: 'population-section' },
    { id: 'sampling', title: 'Sampling', subtitle: 'Method selection', icon: Shuffle, color: 'var(--purple-accent)', targetId: 'sampling-method' },
    { id: 'sample', title: 'Sample', subtitle: 'Subset (n)', icon: PieChart, color: 'var(--emerald-accent)', targetId: 'sample-results-section' },
    { id: 'statistic', title: 'Statistic', subtitle: 'Sample p̂ / x̄', icon: Calculator, color: 'var(--amber-accent)', targetId: 'sample-results-section' },
    { id: 'estimation', title: 'Estimation', subtitle: 'p̂ ≈ P Parameter', icon: Target, color: 'var(--purple-accent)', targetId: 'estimation-section' },
    { id: 'interval', title: 'Confidence Interval', subtitle: '95% Uncertainty', icon: ShieldCheck, color: 'var(--blue-primary)', targetId: 'ci-section' },
  ];

  const handleClick = (stage) => {
    if (onSelectStage) onSelectStage(stage.id);
    const el = document.getElementById(stage.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      padding: '0.65rem 1.25rem',
      position: 'sticky',
      top: '72px',
      zIndex: 40,
      backdropFilter: 'blur(10px)',
      boxShadow: 'var(--shadow-xs)'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto',
        gap: '0.5rem',
        paddingBottom: '2px'
      }}>
        {stages.map((stg, idx) => {
          const Icon = stg.icon;
          const isActive = activeStage === stg.id;
          return (
            <React.Fragment key={stg.id}>
              <button
                onClick={() => handleClick(stg)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--blue-light)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--blue-border)' : 'transparent'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <div style={{
                  color: isActive ? stg.color : 'var(--text-secondary)',
                  background: isActive ? '#ffffff' : 'var(--bg-subtle)',
                  padding: '0.35rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}>
                  <Icon size={16} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    color: isActive ? 'var(--blue-primary)' : 'var(--text-main)',
                    lineHeight: 1.1
                  }}>
                    {stg.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {stg.subtitle}
                  </div>
                </div>
              </button>
              {idx < stages.length - 1 && (
                <ChevronRight size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0, opacity: 0.6 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
