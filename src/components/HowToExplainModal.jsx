import React, { useState } from 'react';
import { X, Mic, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { HOW_TO_EXPLAIN } from '../data/constants';

export default function HowToExplainModal({ explainKey, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !explainKey) return null;

  const item = HOW_TO_EXPLAIN[explainKey] || HOW_TO_EXPLAIN.sampling;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="edu-modal-backdrop" onClick={onClose}>
      <div className="edu-modal-card" style={{ maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="edu-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--emerald-accent), var(--blue-primary))',
              color: '#ffffff',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex'
            }}>
              <Mic size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Presentation-ready spoken pitch for your teacher or viva
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
            marginBottom: '1rem',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '1.05rem',
              color: 'var(--text-main)',
              lineHeight: 1.65,
              fontWeight: 500,
              fontStyle: 'normal'
            }}>
              "{item.text}"
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.775rem',
            color: 'var(--text-secondary)',
            background: 'var(--bg-app)',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            <Sparkles size={14} color="var(--blue-primary)" />
            <span>
              <strong>Tip for presentation:</strong> Speak clearly and pause after mentioning the numbers. This demonstrates genuine conceptual mastery!
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="edu-modal-footer">
          <button
            onClick={handleCopy}
            className="btn btn-outline btn-sm"
          >
            {copied ? (
              <>
                <Check size={14} color="var(--emerald-accent)" />
                <span style={{ color: 'var(--emerald-accent)', fontWeight: 600 }}>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy Explanation
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="btn btn-primary btn-sm"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
