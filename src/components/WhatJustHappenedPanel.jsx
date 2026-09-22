import React, { useState } from 'react';
import { Activity, Sparkles, X, ChevronRight, HelpCircle } from 'lucide-react';

export default function WhatJustHappenedPanel({
  populationSize,
  sampleSize,
  sampleResults,
  popPercentages,
  confidenceInterval,
  selectedMethod,
  onExplainWhy
}) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!sampleResults || isDismissed) return null;

  const propA = (sampleResults.proportions['Option A'] * 100).toFixed(1);
  const trueA = popPercentages.pctA;
  const countA = sampleResults.counts['Option A'];
  const methodLabel = selectedMethod === 'srs' ? 'Simple Random Sampling' : selectedMethod === 'systematic' ? 'Systematic Sampling' : 'Stratified Sampling';
  const ciLower = confidenceInterval ? (confidenceInterval.lower * 100).toFixed(1) : (Number(propA) - 3.8).toFixed(1);
  const ciUpper = confidenceInterval ? (confidenceInterval.upper * 100).toFixed(1) : (Number(propA) + 3.8).toFixed(1);

  return (
    <div className="what-happened-container">
      <div className="what-happened-icon">
        <Activity size={20} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--blue-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              What Just Happened?
            </span>
            <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
              Live Educational Feedback
            </span>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '2px' }}
            title="Dismiss until next action"
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-body)' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>1. Action Taken:</span>
            <p style={{ margin: '0.15rem 0', fontWeight: 600 }}>
              You selected <strong>{sampleSize.toLocaleString()}</strong> voters from a population of <strong>{populationSize.toLocaleString()}</strong> using <em>{methodLabel}</em>.
            </p>
          </div>

          <div>
            <span style={{ color: 'var(--text-secondary)' }}>2. Observed Sample Statistic:</span>
            <p style={{ margin: '0.15rem 0', fontWeight: 600 }}>
              Your sample found <strong>{countA}</strong> Option A supporters, giving an estimated proportion of <span style={{ color: 'var(--blue-primary)' }}>{propA}%</span>.
            </p>
          </div>

          <div>
            <span style={{ color: 'var(--text-secondary)' }}>3. Estimation & Uncertainty:</span>
            <p style={{ margin: '0.15rem 0', fontWeight: 600 }}>
              We use {propA}% to estimate the true population parameter (actual: {trueA}%). Our 95% Confidence Interval is <span style={{ color: 'var(--purple-accent)' }}>[{ciLower}% to {ciUpper}%]</span>.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(59, 130, 246, 0.15)', fontSize: '0.775rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            💡 Notice: The estimate ({propA}%) is close to the true population ({trueA}%), but not identical. That's natural sampling variability!
          </span>
          {onExplainWhy && (
            <button
              onClick={onExplainWhy}
              className="btn btn-outline btn-sm"
              style={{ padding: '0.15rem 0.5rem', fontSize: '0.725rem' }}
            >
              <HelpCircle size={12} />
              Why does this happen?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
