import React, { useState } from 'react';
import { Target, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Mic, GraduationCap, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { COLOR_PALETTE, STATISTICAL_GLOSSARY } from '../data/constants';

export default function PointEstimation({
  populationSize,
  sampleResults,
  popPercentages,
  viewMode,
  onOpenTeachMe,
  onOpenWhy,
  onOpenHowToExplain
}) {
  const [showFormula, setShowFormula] = useState(false);

  if (!sampleResults) return null;

  const { proportions, percentages, estimatedPopulationCounts } = sampleResults;

  const options = [
    {
      name: 'Option A',
      sampleProp: proportions['Option A'],
      samplePct: percentages['Option A'],
      estCount: estimatedPopulationCounts['Option A'],
      trueCount: Math.round((popPercentages.pctA / 100) * populationSize),
      truePct: popPercentages.pctA,
      color: COLOR_PALETTE.optionA
    },
    {
      name: 'Option B',
      sampleProp: proportions['Option B'],
      samplePct: percentages['Option B'],
      estCount: estimatedPopulationCounts['Option B'],
      trueCount: Math.round((popPercentages.pctB / 100) * populationSize),
      truePct: popPercentages.pctB,
      color: COLOR_PALETTE.optionB
    },
    {
      name: 'Option C',
      sampleProp: proportions['Option C'],
      samplePct: percentages['Option C'],
      estCount: estimatedPopulationCounts['Option C'],
      trueCount: Math.round((popPercentages.pctC / 100) * populationSize),
      truePct: popPercentages.pctC,
      color: COLOR_PALETTE.optionC
    }
  ];

  return (
    <div id="estimation-section" className="card">
      {/* Header */}
      <div className="card-header">
        <div className="card-title-group">
          <Target size={20} color="var(--emerald-accent)" />
          <div>
            <div className="card-title">Now We Estimate the Population (Point Estimation)</div>
            <div className="card-subtitle">Using a single number calculated from our sample as the estimate</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          {onOpenTeachMe && (
            <button
              onClick={() => onOpenTeachMe('pointEstimate')}
              className="btn btn-outline btn-sm"
              title="Step-by-step interactive lesson"
            >
              <GraduationCap size={13} color="var(--blue-primary)" />
              Teach Me
            </button>
          )}

          {onOpenWhy && (
            <button
              onClick={() => onOpenWhy('pointEstimate')}
              className="btn btn-outline btn-sm"
              title="Why do we estimate?"
            >
              <HelpCircle size={13} color="var(--amber-accent)" />
              Why?
            </button>
          )}

          {onOpenHowToExplain && (
            <button
              onClick={() => onOpenHowToExplain('pointEstimate')}
              className="btn btn-outline btn-sm"
              title="Viva elevator pitch"
            >
              <Mic size={13} color="var(--purple-accent)" />
              How do I explain this?
            </button>
          )}

          <TooltipIcon text={STATISTICAL_GLOSSARY.pointEstimate} />
        </div>
      </div>

      {/* From Sample to Statistic Visual Transition (Section 15) */}
      <div style={{
        background: 'var(--bg-app)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '0.75rem',
        textAlign: 'center'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Step 1: The Sample</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--purple-accent)' }}>500 Observations</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Raw voter survey responses</span>
        </div>

        <div style={{ color: 'var(--blue-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Counting / Averaging</span>
          <ArrowRight size={20} />
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Step 2: Calculate Statistic</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--blue-primary)', fontFamily: 'var(--font-mono)' }}>
            p̂ = {options[0].samplePct}%
          </div>
          <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>This is a statistic</span>
        </div>

        <div style={{ color: 'var(--emerald-accent)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Use as estimate</span>
          <ArrowRight size={20} />
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Step 3: Estimate Parameter</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
            P ≈ {options[0].samplePct}%
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Estimated population proportion</span>
        </div>
      </div>

      {/* Prominent Visual Relationship Banner (Section 16 & 17) */}
      <div style={{
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        border: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '1rem',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Unknown Population Parameter
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            P = ? (Unknown)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>We cannot ask all 10,000 voters</div>
        </div>

        <div style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--emerald-accent)',
          background: 'var(--emerald-light)',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(16, 185, 129, 0.2)'
        }}>
          ≈
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Point Estimate (ONE NUMBER)
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--blue-primary)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
            p̂ = {options[0].samplePct}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>This single value is our best guess</div>
        </div>
      </div>

      {/* Notice about Uncertainty */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(245, 158, 11, 0.03) 100%)',
        border: '1px solid var(--amber-border)',
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1.15rem',
        marginBottom: '1.5rem',
        fontSize: '0.85rem',
        color: 'var(--text-body)'
      }}>
        <AlertCircle size={18} color="var(--amber-accent)" style={{ flexShrink: 0 }} />
        <div>
          <strong>The Limitation of One Number:</strong> One number gives us a quick estimate, but it does NOT show how uncertain the estimate is. Another sample might produce 47% or 49%. That's why we need an <strong>Interval Estimate (Confidence Interval)</strong> below!
        </div>
      </div>

      {/* 3 Option Estimate Cards */}
      <div className="grid-3" style={{ marginBottom: '1.25rem' }}>
        {options.map(opt => {
          const diffPct = (parseFloat(opt.samplePct) - opt.truePct).toFixed(1);
          const diffSign = parseFloat(diffPct) > 0 ? `+${diffPct}` : diffPct;

          return (
            <div
              key={opt.name}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                borderTop: `4px solid ${opt.color}`,
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                  {opt.name}
                </span>
                <span className="badge badge-blue" style={{ fontSize: '0.675rem' }}>
                  Point Estimate
                </span>
              </div>

              <div style={{ marginBottom: '0.65rem' }}>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  Sample Proportion (p̂)
                </div>
                <div className="text-mono" style={{ fontSize: '1.45rem', fontWeight: 800, color: opt.color }}>
                  {opt.samplePct}%
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginLeft: '0.35rem' }}>
                    ({(opt.sampleProp).toFixed(3)})
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem' }}>
                <span>True Population Value:</span>
                <strong className="text-mono" style={{ color: 'var(--text-main)' }}>{opt.truePct}%</strong>
              </div>

              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span>Estimation Difference:</span>
                <strong className="text-mono" style={{ color: Math.abs(parseFloat(diffPct)) <= 3 ? 'var(--emerald-accent)' : 'var(--amber-accent)' }}>
                  {diffSign}%
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Formula Collapse */}
      <button
        onClick={() => setShowFormula(!showFormula)}
        className="btn btn-outline btn-sm"
        style={{ fontSize: '0.75rem', marginBottom: '1rem' }}
      >
        {showFormula ? 'Hide Formula' : 'See Mathematical Formula (p̂ = x / n)'}
      </button>

      {showFormula && (
        <div className="formula-reveal-card">
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Sample Proportion Estimator Formula:
          </div>
          <div className="text-mono" style={{ fontSize: '1rem', color: 'var(--blue-primary)', marginBottom: '0.5rem' }}>
            p̂ = x / n
          </div>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: 0 }}>
            where <strong>x</strong> is the observed count of supporters in the sample, and <strong>n</strong> is total sample size.
            In statistics, p̂ is an <strong>unbiased estimator</strong> because E[p̂] = P.
          </p>
        </div>
      )}

      {/* Key Takeaway Card */}
      <div className="key-takeaway-box">
        <CheckCircle2 size={16} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Key Idea</strong>
          <p>A point estimate gives one single best-guess number, but it doesn't reveal how uncertain we are about that guess.</p>
        </div>
      </div>
    </div>
  );
}
