import React from 'react';
import { X, GraduationCap, CheckCircle2, Code2, BookOpen } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-light)',
        padding: '1.75rem'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <GraduationCap size={22} color="var(--blue-primary)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                About the Simulator
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Sampling & Estimation Simulator — Interactive Visual Statistics Lab
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.35rem', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Project Purpose
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              This interactive application is designed as a visual laboratory to teach students how population parameters can be accurately estimated by taking representative samples.
              All voter preferences are strictly synthetic and non-partisan, using neutral labels (Option A, Option B, Option C).
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Statistical Concepts Demonstrated
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {[
                'Sampling Methods (SRS, Systematic, Stratified)',
                'Sampling Distributions & Empirical Standard Error',
                'Central Limit Theorem (Variance Reduction 1/√n)',
                'Unbiased Point Estimation (p̂, N̂)',
                'Interval Estimation & Confidence Intervals (Wald / Wilson)',
                'Student\'s t-Distribution & Mean Inference',
                'Chi-Square Goodness-of-Fit Test (χ²)',
                'F-Distribution & One-Way ANOVA Variance Ratios'
              ].map(topic => (
                <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-body)' }}>
                  <CheckCircle2 size={14} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Technology Stack
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['React.js 19', 'Vite 8', 'JavaScript (ES6+)', 'Recharts', 'Lucide React', 'Modern Vanilla CSS Tokens'].map(tech => (
                <span key={tech} className="badge badge-blue" style={{ textTransform: 'none', fontSize: '0.725rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Viva / Academic Examination Notes
            </h4>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
              <li><strong>Sampling Fraction (n/N):</strong> When n/N &gt; 5%, the Finite Population Correction (FPC = √((N-n)/(N-1))) reduces the standard error.</li>
              <li><strong>Wald vs Wilson CI:</strong> Wald intervals p ± z·SE can produce negative bounds or exceed 1 when p is near 0 or 1. The Wilson Score interval prevents boundary violations.</li>
              <li><strong>Confidence Interval Meaning:</strong> Refers to long-run coverage behavior across repeated samples (~95 of 100 intervals contain the true parameter).</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
}
