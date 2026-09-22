import React from 'react';
import { Activity, HelpCircle, CheckCircle } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { calculateMean, calculateSampleStdDev, calculatePopulationStdDev } from '../utils/statistics';
import { calculateMeanCI } from '../utils/confidenceIntervals';
import { STATISTICAL_GLOSSARY } from '../data/constants';

export default function VoterAgeDemo({ population, sample, populationSize, viewMode }) {
  if (!sample || sample.length === 0 || !population) return null;

  const sampleAges = sample.map(v => v.age);
  const popAges = population.map(v => v.age);

  const n = sampleAges.length;
  const sampleMean = calculateMean(sampleAges);
  const sampleStdDev = calculateSampleStdDev(sampleAges);

  const popMean = calculateMean(popAges);
  const popStdDev = calculatePopulationStdDev(popAges);

  const meanCI = calculateMeanCI(sampleMean, sampleStdDev, n, populationSize, 0.95);
  const containsPopMean = popMean >= meanCI.lower && popMean <= meanCI.upper;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <Activity size={20} color="var(--emerald-accent)" />
          <div>
            <div className="card-title">Continuous Variable Inference: Voter Age Demonstration</div>
            <div className="card-subtitle">Sampling numerical data to estimate true population mean (μ) using Student's t-distribution</div>
          </div>
        </div>
        <TooltipIcon text={STATISTICAL_GLOSSARY.tDistribution} />
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', marginBottom: '1.25rem', lineHeight: 1.55 }}>
        In opinion polling, continuous demographic metrics like <strong>Voter Age</strong> require inference on population means (<em>μ</em>).
        When the true population standard deviation (<em>σ</em>) is unknown, we substitute the <strong>sample standard deviation (s)</strong> and apply <strong>Student's t-distribution</strong>.
      </p>

      {/* 4 Metric Cards */}
      <div className="grid-4" style={{ marginBottom: '1.25rem' }}>
        <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Sample Mean (x̄)
          </div>
          <div className="text-mono" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--emerald-accent)' }}>
            {sampleMean.toFixed(1)} <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>yrs</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>Point estimate of μ</div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Sample Std Dev (s)
          </div>
          <div className="text-mono" style={{ fontSize: '1.45rem', fontWeight: 800 }}>
            {sampleStdDev.toFixed(2)} <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>yrs</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>df = {meanCI.degreesOfFreedom}</div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Standard Error (SE_x̄)
          </div>
          <div className="text-mono" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--blue-primary)' }}>
            {meanCI.standardError.toFixed(2)} <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>yrs</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>SE = s / √n</div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            True Population Mean (μ)
          </div>
          <div className="text-mono" style={{ fontSize: '1.45rem', fontWeight: 800 }}>
            {popMean.toFixed(1)} <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>yrs</span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>Fixed benchmark</div>
        </div>
      </div>

      {/* 95% t-Confidence Interval Box */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '1.15rem 1.25rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              95% Student's t Confidence Interval for Voter Age Mean
            </h4>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
              x̄ ± t*(df={meanCI.degreesOfFreedom}) × (s / √n) = {sampleMean.toFixed(1)} ± {meanCI.criticalValue.toFixed(3)} × {meanCI.standardError.toFixed(2)}
            </div>
          </div>
          <span className={`badge ${containsPopMean ? 'badge-emerald' : 'badge-amber'}`}>
            {containsPopMean ? 'Captures True μ' : 'Outside Interval'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div className="text-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald-accent)' }}>
            [{meanCI.lower.toFixed(2)} to {meanCI.upper.toFixed(2)}] years
          </div>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Margin of error: ±{meanCI.marginOfError.toFixed(2)} yrs
          </span>
        </div>

        {/* Visual scale line */}
        <div style={{ position: 'relative', height: '22px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-pill)', marginTop: '0.5rem' }}>
          <div style={{
            position: 'absolute',
            left: `${Math.max(0, Math.min(100, ((meanCI.lower - 25) / 45) * 100))}%`,
            width: `${Math.max(2, Math.min(100, ((meanCI.upper - meanCI.lower) / 45) * 100))}%`,
            top: '4px',
            bottom: '4px',
            background: 'var(--emerald-accent)',
            borderRadius: '4px',
            opacity: 0.35
          }} />
          <div style={{
            position: 'absolute',
            left: `${Math.max(0, Math.min(100, ((sampleMean - 25) / 45) * 100))}%`,
            top: '50%',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'var(--emerald-accent)',
            transform: 'translate(-50%, -50%)',
            border: '2px solid #ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            zIndex: 2
          }} title={`Sample mean: ${sampleMean.toFixed(1)}`} />
          <div style={{
            position: 'absolute',
            left: `${Math.max(0, Math.min(100, ((popMean - 25) / 45) * 100))}%`,
            top: '0px',
            bottom: '0px',
            width: '3px',
            background: 'var(--text-main)',
            borderRadius: '2px',
            transform: 'translateX(-50%)',
            zIndex: 3
          }} title={`True population mean: ${popMean.toFixed(1)}`} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          <span>25 yrs</span>
          <span>True μ = {popMean.toFixed(1)} yrs</span>
          <span>70 yrs</span>
        </div>
      </div>
    </div>
  );
}
