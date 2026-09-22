import React from 'react';
import { AlertCircle, Heart } from 'lucide-react';

export default function Footer({ onOpenAbout }) {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--border-light)',
      padding: '2.5rem 1.25rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {/* Educational Disclaimer Callout */}
        <div style={{
          background: 'var(--amber-light)',
          border: '1px solid var(--amber-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.9rem 1.15rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start'
        }}>
          <AlertCircle size={18} color="var(--amber-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.825rem', color: 'var(--text-body)', lineHeight: 1.55 }}>
            <strong>Academic Disclaimer: </strong>
            This application uses synthetic simulated data strictly for statistical education.
            The results are not forecasts of real elections and must not be interpreted as real-world political polling.
            All voter choices are represented generically as <em>Option A</em>, <em>Option B</em>, and <em>Option C</em>.
          </div>
        </div>

        {/* Footer Meta Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}>
          <div>
            <strong>Sampling & Estimation Simulator</strong> — Interactive Statistics Learning Project
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Built for educational purposes. All calculations executed in browser memory.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              onClick={onOpenAbout}
              style={{ background: 'none', border: 'none', color: 'var(--blue-primary)', cursor: 'pointer', fontSize: 'inherit', fontWeight: 600 }}
            >
              Methodology & Formulas
            </button>
            <span>•</span>
            <span>Client-Side Stochastic Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
