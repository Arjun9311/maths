import React, { useState } from 'react';
import { X, Shuffle, ArrowRightLeft, Layers, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { COLOR_PALETTE } from '../data/constants';

export default function CompareSamplingModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('all');

  if (!isOpen) return null;

  // Grid of 30 visual dots for each method
  const totalDots = 30;

  // Simple Random: scattered picks
  const srsSampled = [2, 5, 9, 14, 19, 23, 27];

  // Systematic: regular interval (e.g. start at 1, every 4th)
  const systematicSampled = [1, 5, 9, 13, 17, 21, 25, 29];

  // Stratified: 10 Option A (pick 4), 10 Option B (pick 3), 10 Option C (pick 2)
  const stratifiedSampled = [0, 3, 6, 8, 11, 14, 17, 21, 25];

  const methods = [
    {
      id: 'srs',
      title: 'Simple Random Sampling (SRS)',
      icon: Shuffle,
      color: 'var(--blue-primary)',
      badge: 'Equal Probability',
      howSelected: 'Every member in the population has an identical chance of selection. Generated via a random number lottery.',
      visualPattern: 'Randomly scattered across the population universe without predetermined spacing.',
      sampledIndices: srsSampled,
      pros: 'Completely eliminates human bias; standard mathematical foundation.',
      cons: 'May accidentally over-sample or under-sample rare minority sub-groups by chance.'
    },
    {
      id: 'systematic',
      title: 'Systematic Sampling',
      icon: ArrowRightLeft,
      color: 'var(--purple-accent)',
      badge: 'Regular Interval k',
      howSelected: 'A random start r ∈ [0, k-1] is chosen, then every k-th item is picked systematically (k = N / n).',
      visualPattern: 'Perfect, rhythmic spacing across the sorted population registry (e.g., 1st, 5th, 9th, 13th...).',
      sampledIndices: systematicSampled,
      pros: 'Simple to administer in field interviews; guarantees uniform spread.',
      cons: 'Vulnerable to periodicity if data contains cyclic patterns that match interval k.'
    },
    {
      id: 'stratified',
      title: 'Stratified Sampling',
      icon: Layers,
      color: 'var(--emerald-accent)',
      badge: 'Guaranteed Group Balance',
      howSelected: 'Population is partitioned into homogeneous groups (strata), and random samples are drawn from each stratum proportionally.',
      visualPattern: 'Balanced quotas taken from each distinct subgroup (Opt A, Opt B, Opt C).',
      sampledIndices: stratifiedSampled,
      pros: 'Guarantees representation of small minority groups; reduces standard error.',
      cons: 'Requires prior knowledge of population demographics to define strata.'
    }
  ];

  return (
    <div className="edu-modal-backdrop" onClick={onClose}>
      <div className="edu-modal-card" style={{ maxWidth: '960px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="edu-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--blue-primary), var(--emerald-accent))',
              color: '#ffffff',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex'
            }}>
              <Shuffle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Compare Sampling Methods Side-by-Side
              </h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                Visualizing how different selection protocols extract observations from the same population
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

        {/* Body */}
        <div className="edu-modal-body">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.25rem'
          }}>
            {methods.map(m => {
              const Icon = m.icon;
              return (
                <div
                  key={m.id}
                  style={{
                    background: 'var(--bg-subtle)',
                    border: `2px solid ${m.color}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <div>
                    {/* Card Title */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{
                        background: 'var(--bg-card)',
                        color: m.color,
                        padding: '0.45rem',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        boxShadow: 'var(--shadow-xs)'
                      }}>
                        <Icon size={20} />
                      </div>
                      <span className="badge" style={{ background: 'var(--bg-card)', color: m.color, border: `1px solid ${m.color}` }}>
                        {m.badge}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                      {m.title}
                    </h4>

                    {/* Visual Dots Diagram */}
                    <div style={{
                      background: 'var(--bg-card)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem',
                      border: '1px solid var(--border-light)',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Visual Selection Pattern:
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(10, 1fr)',
                        gap: '5px'
                      }}>
                        {Array.from({ length: totalDots }).map((_, i) => {
                          const isPicked = m.sampledIndices.includes(i);
                          let dotColor = COLOR_PALETTE.optionA;
                          if (i >= 10 && i < 20) dotColor = COLOR_PALETTE.optionB;
                          if (i >= 20) dotColor = COLOR_PALETTE.optionC;

                          return (
                            <div
                              key={i}
                              style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: isPicked ? m.color : 'var(--border-medium)',
                                opacity: isPicked ? 1 : 0.35,
                                transform: isPicked ? 'scale(1.3)' : 'scale(1)',
                                boxShadow: isPicked ? `0 0 6px ${m.color}` : 'none',
                                transition: 'all 0.2s ease'
                              }}
                            />
                          );
                        })}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        <span>● Sampled ({m.sampledIndices.length})</span>
                        <span>○ Unsampled</span>
                      </div>
                    </div>

                    {/* How It Works */}
                    <div style={{ fontSize: '0.825rem', marginBottom: '0.75rem' }}>
                      <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.2rem' }}>How it selects:</strong>
                      <span style={{ color: 'var(--text-body)', lineHeight: 1.5 }}>{m.howSelected}</span>
                    </div>

                    {/* Advantages */}
                    <div style={{ fontSize: '0.825rem', marginBottom: '0.75rem' }}>
                      <strong style={{ color: 'var(--emerald-accent)', display: 'block', marginBottom: '0.2rem' }}>Advantage:</strong>
                      <span style={{ color: 'var(--text-body)', lineHeight: 1.5 }}>{m.pros}</span>
                    </div>

                    {/* Limitations */}
                    <div style={{ fontSize: '0.825rem' }}>
                      <strong style={{ color: 'var(--amber-accent)', display: 'block', marginBottom: '0.2rem' }}>Trade-off:</strong>
                      <span style={{ color: 'var(--text-body)', lineHeight: 1.5 }}>{m.cons}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="edu-modal-footer">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            💡 In this simulator, all three methods produce unbiased estimates, but stratified sampling achieves slightly tighter precision.
          </div>
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
