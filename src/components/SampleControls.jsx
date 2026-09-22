import React from 'react';
import { Play, Layers, RotateCcw, Sparkles, Sliders, CheckCircle2, TrendingDown } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { SAMPLE_SIZE_PRESETS, STATISTICAL_GLOSSARY } from '../data/constants';

export default function SampleControls({
  populationSize,
  sampleSize,
  setSampleSize,
  onGenerateSample,
  onGenerate100Samples,
  onReset,
  isSimulating,
  isValid
}) {
  const samplingFraction = populationSize > 0 ? ((sampleSize / populationSize) * 100).toFixed(1) : 0;
  const isOverSized = sampleSize > populationSize;

  // Approximate standard error based on ~50% proportion
  const approxSE = Math.sqrt((0.5 * 0.5) / sampleSize) * 100;

  return (
    <div id="sample-controls-section" className="card">
      <div className="card-header">
        <div className="card-title-group">
          <Sliders size={20} color="var(--blue-primary)" />
          <div>
            <div className="card-title">Sample Size Visualizer & Controls</div>
            <div className="card-subtitle">Adjust sample size (n) and observe how precision improves</div>
          </div>
        </div>
        <TooltipIcon text={STATISTICAL_GLOSSARY.sample} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Large Prominent Sample Size Readout & Slider */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Sample Size (n)
            </span>
            <div style={{ textAlign: 'right' }}>
              <span className="text-mono" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--blue-primary)', lineHeight: 1 }}>
                {sampleSize.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>
                voters ({samplingFraction}% of N)
              </span>
            </div>
          </div>

          <input
            type="range"
            min="10"
            max={Math.min(2500, populationSize)}
            step="10"
            value={sampleSize}
            onChange={e => setSampleSize(parseInt(e.target.value) || 10)}
            className="form-range"
            style={{ accentColor: 'var(--blue-primary)' }}
            disabled={!isValid}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            <span>Min: n = 10</span>
            <span style={{ color: 'var(--emerald-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <TrendingDown size={13} /> Approx SE: ±{approxSE.toFixed(1)}%
            </span>
            <span>Max: n = {Math.min(2500, populationSize).toLocaleString()}</span>
          </div>

          {/* Visual Comparison: Small Sample vs Large Sample */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.65rem 0.85rem',
            marginTop: '0.85rem',
            border: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            fontSize: '0.75rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                SMALL SAMPLE (n = 10):
              </span>
              <div style={{ color: 'var(--amber-accent)', letterSpacing: '3px', fontSize: '0.9rem' }}>
                ● ● ● ●
              </div>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>High uncertainty</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                LARGE SAMPLE (n = 500+):
              </span>
              <div style={{ color: 'var(--blue-primary)', letterSpacing: '2px', fontSize: '0.85rem' }}>
                ● ● ● ● ● ● ● ● ● ● ● ●
              </div>
              <span style={{ color: 'var(--emerald-accent)', fontSize: '0.7rem', fontWeight: 600 }}>High precision</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
            {SAMPLE_SIZE_PRESETS.map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => setSampleSize(preset)}
                className={`btn btn-sm ${sampleSize === preset ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: '1 1 0', minWidth: '55px' }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {isOverSized && (
          <div className="callout callout-error" style={{ margin: 0, padding: '0.65rem 0.85rem', fontSize: '0.825rem' }}>
            Sample size ({sampleSize}) cannot exceed total population size ({populationSize}).
          </div>
        )}

        {/* Primary and Secondary Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <button
            onClick={onGenerateSample}
            disabled={!isValid || isOverSized || isSimulating}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', boxShadow: 'var(--shadow-glow)' }}
          >
            <Play size={18} className={isSimulating ? 'spin' : ''} />
            {isSimulating ? 'Simulating Sampling...' : 'Generate Random Sample'}
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              onClick={onGenerate100Samples}
              disabled={!isValid || isOverSized || isSimulating}
              className="btn btn-secondary"
              title="Generate repeated independent samples to see sampling distribution"
            >
              <Layers size={15} />
              Run 100 Samples
            </button>

            <button
              onClick={onReset}
              className="btn btn-outline"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        {/* Educational Explanatory Text */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
          💡 <strong>Statistical Rule:</strong> Larger samples usually provide more precise estimates with narrower confidence intervals, because standard error shrinks proportionally to <strong>1/√n</strong>.
        </p>
      </div>
    </div>
  );
}
