import React, { useState } from 'react';
import { X, Award, Copy, Check, Clock, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { VIVA_EXPLANATIONS } from '../data/constants';

export default function VivaExplanationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('full1m'); // 'short10s' | 'medium30s' | 'full1m'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const current = VIVA_EXPLANATIONS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="edu-modal-backdrop" onClick={onClose}>
      <div className="edu-modal-card" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="edu-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--blue-primary), var(--purple-accent))',
              color: '#ffffff',
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex'
            }}>
              <Award size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Explain This Project To Your Teacher (Viva Deck)
              </h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                Guaranteed viva-ready scripts structured for high conceptual marks
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

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem 0 1.5rem',
          background: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-light)'
        }}>
          {[
            { id: 'short10s', label: '10-Second Pitch', time: '10s' },
            { id: 'medium30s', label: '30-Second Summary', time: '30s' },
            { id: 'full1m', label: '1-Minute Full Viva Answer', time: '60s' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem' }}
            >
              <Clock size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="edu-modal-body">
          {/* Visual Concept Flow Pipeline */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-secondary)'
          }}>
            <span style={{ color: 'var(--blue-primary)' }}>1. PROBLEM: Census Impractical</span>
            <span>→</span>
            <span style={{ color: 'var(--purple-accent)' }}>2. SAMPLE: Draw n = 500</span>
            <span>→</span>
            <span style={{ color: 'var(--emerald-accent)' }}>3. ESTIMATE: p̂ ≈ P</span>
            <span>→</span>
            <span style={{ color: 'var(--amber-accent)' }}>4. UNCERTAINTY: 95% CI</span>
            <span>→</span>
            <span style={{ color: 'var(--blue-primary)' }}>5. CLT & DISTRIBUTIONS</span>
          </div>

          {/* Script Box */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-light)',
            marginBottom: '1.25rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.725rem' }}>
                <Clock size={12} />
                Estimated Speaking Time: {current.duration}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {current.heading}
              </span>
            </div>

            <div style={{
              fontSize: '1rem',
              color: 'var(--text-main)',
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
              fontWeight: 500
            }}>
              {current.script}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'var(--bg-app)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            fontSize: '0.8rem',
            color: 'var(--text-body)'
          }}>
            <Sparkles size={16} color="var(--purple-accent)" style={{ flexShrink: 0 }} />
            <div>
              <strong>Why Examiners Love This:</strong> It directly answers <em>What</em> was done, <em>Why</em> sampling was used, <em>How</em> uncertainty was measured, and <em>How</em> the Central Limit Theorem was proven.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="edu-modal-footer">
          <button
            onClick={handleCopy}
            className="btn btn-outline"
          >
            {copied ? (
              <>
                <Check size={16} color="var(--emerald-accent)" />
                <span style={{ color: 'var(--emerald-accent)', fontWeight: 600 }}>Copied Script to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Full Explanation
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            Done Practicing
          </button>
        </div>
      </div>
    </div>
  );
}
