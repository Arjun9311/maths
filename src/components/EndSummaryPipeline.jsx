import React from 'react';
import { ArrowRight, CheckCircle2, Award, Sparkles, Compass, BookOpen } from 'lucide-react';

export default function EndSummaryPipeline({
  populationSize,
  sampleSize,
  sampleResults,
  confidenceInterval,
  onOpenVivaModal
}) {
  const propA = sampleResults ? (sampleResults.proportions['Option A'] * 100).toFixed(1) : '48.2';
  const ciLower = confidenceInterval ? (confidenceInterval.lower * 100).toFixed(1) : '44.1';
  const ciUpper = confidenceInterval ? (confidenceInterval.upper * 100).toFixed(1) : '52.3';

  const pipelineNodes = [
    { num: '01', title: 'Population', val: `N = ${populationSize.toLocaleString()}` },
    { num: '02', title: 'Sample', val: `n = ${sampleSize.toLocaleString()}` },
    { num: '03', title: 'Statistic', val: `p̂ = ${propA}%` },
    { num: '04', title: 'Point Estimate', val: `${propA}%` },
    { num: '05', title: '95% CI', val: `[${ciLower}%, ${ciUpper}%]` },
    { num: '06', title: 'Repeated Samples', val: 'M = 500' },
    { num: '07', title: 'Sampling Dist', val: 'Normal Shape' },
    { num: '08', title: 'Inference', val: 'Measured Risk' }
  ];

  const demonstrates = [
    'Probabilistic Sampling (SRS, Systematic, Stratified)',
    'Point Estimation & Parameter Inference',
    'Interval Estimation with Finite Population Correction (FPC)',
    'Empirical Sampling Distributions of Proportions',
    'Central Limit Theorem (Convergence to Normality)',
    "Student's t-Distribution for Unknown Variance",
    'Chi-Square Categorical Goodness-of-Fit Testing',
    'F-Distribution Analysis of Variance (ANOVA)'
  ];

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div className="card-header">
        <div className="card-title-group">
          <Sparkles size={20} color="var(--blue-primary)" />
          <div>
            <div className="card-title">The Whole Idea in One Picture</div>
            <div className="card-subtitle">The complete end-to-end inferential statistics journey visualized</div>
          </div>
        </div>

        <button
          onClick={onOpenVivaModal}
          className="btn btn-primary btn-sm"
        >
          <Award size={14} />
          Give Me My Viva Explanation
        </button>
      </div>

      {/* Animated Pipeline Flow */}
      <div className="pipeline-flow-wrapper">
        {pipelineNodes.map((node, idx) => (
          <React.Fragment key={node.num}>
            <div className="pipeline-node">
              <div className="node-num">{node.num}</div>
              <div className="node-title">{node.title}</div>
              <div className="node-val">{node.val}</div>
            </div>
            {idx < pipelineNodes.length - 1 && (
              <div style={{ color: 'var(--blue-primary)', display: 'flex', alignItems: 'center' }}>
                <ArrowRight size={16} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Project Mastery List */}
      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          What This Project Demonstrates:
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
          {demonstrates.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-body)',
                background: 'var(--bg-subtle)',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)'
              }}
            >
              <CheckCircle2 size={15} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
