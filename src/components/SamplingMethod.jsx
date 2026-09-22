import React, { useState } from 'react';
import { Shuffle, ArrowRightLeft, Layers, ChevronDown, ChevronUp, CheckCircle, HelpCircle, Mic, Sparkles, CheckCircle2, Split } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { STATISTICAL_GLOSSARY } from '../data/constants';

export default function SamplingMethod({
  selectedMethod,
  setSelectedMethod,
  onOpenCompare,
  onOpenWhy,
  onOpenHowToExplain
}) {
  const [expandedMethod, setExpandedMethod] = useState(null);

  const methods = [
    {
      id: 'srs',
      title: 'Simple Random Sampling',
      shortDesc: 'Equal Chance for Everyone',
      concept: 'Everyone has an equal chance of being selected.',
      explanation: 'Observations are drawn purely at random without replacement, just like a fair lottery.',
      icon: Shuffle,
      formula: 'P(selection) = n / N',
      color: 'var(--blue-primary)',
      // Scattered dot picks
      pattern: [true, false, true, false, false, true, true, false, true, false, false, true]
    },
    {
      id: 'systematic',
      title: 'Systematic Sampling',
      shortDesc: '1 → Every kth Observation',
      concept: 'Choose observations at regular intervals.',
      explanation: 'Select members at regular steps (k = ⌊N/n⌋) after choosing a random starting point.',
      icon: ArrowRightLeft,
      formula: 'k = ⌊N / n⌋, Start = r ∈ [0, k-1]',
      color: 'var(--purple-accent)',
      // Regular rhythmic picks
      pattern: [true, false, false, true, false, false, true, false, false, true, false, false]
    },
    {
      id: 'stratified',
      title: 'Stratified Sampling',
      shortDesc: 'Sample from Each Group',
      concept: 'Split into groups, then sample each.',
      explanation: 'Divide the population into demographic strata (Option A, B, C) and sample proportionally from each.',
      icon: Layers,
      formula: 'n_h = n × (N_h / N)',
      color: 'var(--emerald-accent)',
      // Grouped picks
      pattern: [true, true, false, false, true, true, false, false, true, false, false, false]
    }
  ];

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    setExpandedMethod(expandedMethod === id ? null : id);
  };

  return (
    <div id="sampling-method" className="card">
      {/* Header */}
      <div className="card-header">
        <div className="card-title-group">
          <Shuffle size={20} color="var(--purple-accent)" />
          <div>
            <div className="card-title">Choose Sampling Method</div>
            <div className="card-subtitle">How we extract observations from the population</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          {onOpenCompare && (
            <button
              onClick={onOpenCompare}
              className="btn btn-primary btn-sm"
              style={{ gap: '0.35rem' }}
              title="Interactive side-by-side comparison"
            >
              <Split size={14} />
              Compare Methods
            </button>
          )}

          {onOpenWhy && (
            <button
              onClick={() => onOpenWhy('sampling')}
              className="btn btn-outline btn-sm"
              title="Why do we use sampling?"
            >
              <HelpCircle size={13} color="var(--amber-accent)" />
              Why?
            </button>
          )}

          {onOpenHowToExplain && (
            <button
              onClick={() => onOpenHowToExplain('sampling')}
              className="btn btn-outline btn-sm"
              title="Viva elevator pitch"
            >
              <Mic size={13} color="var(--purple-accent)" />
              How do I explain this?
            </button>
          )}
        </div>
      </div>

      {/* 3 Visual Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        {methods.map(m => {
          const isSelected = selectedMethod === m.id;
          const isExpanded = expandedMethod === m.id;
          const Icon = m.icon;

          return (
            <div
              key={m.id}
              onClick={() => setSelectedMethod(m.id)}
              style={{
                border: `2px solid ${isSelected ? m.color : 'var(--border-light)'}`,
                background: isSelected ? 'var(--bg-subtle)' : 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div style={{
                    color: m.color,
                    background: isSelected ? '#ffffff' : 'var(--bg-subtle)',
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}>
                    <Icon size={18} />
                  </div>
                  {isSelected ? (
                    <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                      <CheckCircle size={11} /> Selected
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-tertiary)' }}>Click to select</span>
                  )}
                </div>

                <h4 style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  {m.title}
                </h4>

                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: m.color, marginBottom: '0.5rem' }}>
                  "{m.concept}"
                </div>

                {/* Visual Dot Pattern Illustration */}
                <div style={{
                  background: 'var(--bg-app)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.5rem 0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.65rem',
                  border: '1px solid var(--border-light)'
                }}>
                  {m.pattern.map((isPick, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        width: isPick ? '8px' : '5px',
                        height: isPick ? '8px' : '5px',
                        borderRadius: '50%',
                        background: isPick ? m.color : 'var(--border-medium)',
                        boxShadow: isPick ? `0 0 5px ${m.color}` : 'none',
                        transition: 'all 0.2s ease'
                      }}
                      title={isPick ? 'Selected' : 'Not selected'}
                    />
                  ))}
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                  {m.explanation}
                </p>
              </div>

              <div>
                <button
                  onClick={(e) => toggleExpand(m.id, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--blue-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0',
                    cursor: 'pointer'
                  }}
                >
                  {isExpanded ? 'Hide Technical Details' : 'See Formula & Details'}
                  {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {isExpanded && (
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '0.65rem',
                    background: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-light)',
                    animation: 'fadeInSlideUp 0.2s ease'
                  }}>
                    <div className="text-mono" style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {m.formula}
                    </div>
                    {m.id === 'srs' && 'Ideal when the population is homogeneous without clear subgroup distinctions.'}
                    {m.id === 'systematic' && 'Simple to execute in field surveys where a physical sequence or list already exists.'}
                    {m.id === 'stratified' && 'Guarantees proportional representation of key demographic minority segments.'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Idea */}
      <div className="key-takeaway-box">
        <CheckCircle2 size={16} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Key Idea</strong>
          <p>Different sampling methods choose members in different ways, but all aim to provide a fair, unbiased sample of the population.</p>
        </div>
      </div>
    </div>
  );
}
