import React from 'react';
import { X, HelpCircle, Sparkles } from 'lucide-react';
import { WHY_EXPLANATIONS } from '../data/constants';

export default function WhyModal({ whyKey, isOpen, onClose }) {
  if (!isOpen || !whyKey) return null;

  const item = WHY_EXPLANATIONS[whyKey] || WHY_EXPLANATIONS.sampling;

  return (
    <div className="edu-modal-backdrop" onClick={onClose}>
      <div className="edu-modal-card" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="edu-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              background: 'var(--amber-light)',
              color: 'var(--amber-accent)',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex'
            }}>
              <HelpCircle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {item.question}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Quick Conceptual Rationale
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
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            border: '1px solid var(--border-light)',
            fontSize: '1rem',
            color: 'var(--text-body)',
            lineHeight: 1.65
          }}>
            {item.answer}
          </div>
        </div>

        {/* Footer */}
        <div className="edu-modal-footer">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            💡 Clear answers score highest in vivas and interviews
          </div>
          <button
            onClick={onClose}
            className="btn btn-primary btn-sm"
          >
            Understood!
          </button>
        </div>
      </div>
    </div>
  );
}
