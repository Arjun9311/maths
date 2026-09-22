import React, { useState } from 'react';
import { ShieldCheck, Play, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';
import { sampleSimpleRandom, summarizeSample } from '../utils/sampling';
import { calculateWaldProportionCI } from '../utils/confidenceIntervals';

export default function ConfidenceCoverageSimulator({ population, populationSize, popPercentages, sampleSize }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coverageData, setCoverageData] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const trueP = (popPercentages?.pctA != null ? popPercentages.pctA : 48) / 100;

  const runCoverageTest = () => {
    if (!population || population.length === 0) return;
    setIsSimulating(true);

    setTimeout(() => {
      const trials = 100;
      const intervals = [];
      let coveredCount = 0;

      for (let i = 0; i < trials; i++) {
        const s = sampleSimpleRandom(population, sampleSize);
        const sum = summarizeSample(s, populationSize);
        const p = sum.proportions['Option A'];
        const ci = calculateWaldProportionCI(p, sampleSize, populationSize, 0.95);
        const covers = trueP >= ci.lower && trueP <= ci.upper;
        if (covers) coveredCount++;

        intervals.push({
          id: i + 1,
          p,
          lower: ci.lower,
          upper: ci.upper,
          covers
        });
      }

      setCoverageData({
        intervals,
        coveredCount,
        trials,
        coverageRate: (coveredCount / trials) * 100
      });
      setIsSimulating(false);
    }, 20);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      marginTop: '1.5rem',
      boxShadow: 'var(--shadow-xs)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="var(--blue-primary)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Interactive Exploration: What does a "95% Confidence Interval" actually mean?
            </h4>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Test the frequentist coverage definition by taking 100 repeated independent samples and counting how many intervals capture the true parameter P = {(trueP * 100).toFixed(1)}%.
          </p>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!coverageData && !isOpen) runCoverageTest();
          }}
          className="btn btn-outline btn-sm"
        >
          {isOpen ? 'Hide Experiment' : 'Launch 100-Sample Coverage Test'}
        </button>
      </div>

      {isOpen && (
        <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={runCoverageTest}
                disabled={isSimulating}
                className="btn btn-primary btn-sm"
              >
                <Play size={14} className={isSimulating ? 'spin' : ''} />
                Run 100 New Samples
              </button>
              {coverageData && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <span>Coverage Rate: <strong className="text-mono" style={{ color: coverageData.coverageRate >= 90 ? 'var(--emerald-accent)' : 'var(--amber-accent)' }}>{coverageData.coveredCount} / 100 ({coverageData.coverageRate.toFixed(0)}%)</strong></span>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                    {coverageData.coveredCount} Captured
                  </span>
                  <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                    {100 - coverageData.coveredCount} Missed
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 12, height: 3, background: 'var(--emerald-accent)', borderRadius: '2px' }} />
                Interval Covers P
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 12, height: 3, background: 'var(--rose-accent)', borderRadius: '2px' }} />
                Interval Misses P
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 2, height: 12, background: '#0f172a' }} />
                True Parameter P
              </span>
            </div>
          </div>

          {/* 100 Horizontal Intervals Canvas / SVG rendering */}
          {coverageData && (
            <div style={{
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              border: '1px solid var(--border-light)',
              maxHeight: '260px',
              overflowY: 'auto',
              position: 'relative'
            }}>
              {/* True Parameter vertical line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${((trueP - 0.25) / 0.45) * 100}%`,
                  width: '2px',
                  background: 'var(--text-main)',
                  zIndex: 10
                }}
                title={`True Population P = ${(trueP * 100).toFixed(1)}%`}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {coverageData.intervals.map(inv => {
                  const leftPct = Math.max(0, Math.min(100, ((inv.lower - 0.25) / 0.45) * 100));
                  const rightPct = Math.max(0, Math.min(100, ((inv.upper - 0.25) / 0.45) * 100));
                  const centerPct = Math.max(0, Math.min(100, ((inv.p - 0.25) / 0.45) * 100));
                  const color = inv.covers ? 'var(--emerald-accent)' : 'var(--rose-accent)';

                  return (
                    <div key={inv.id} style={{ position: 'relative', height: '6px', width: '100%' }}>
                      {/* Interval bar */}
                      <div
                        style={{
                          position: 'absolute',
                          left: `${leftPct}%`,
                          width: `${Math.max(2, rightPct - leftPct)}%`,
                          top: '1px',
                          bottom: '1px',
                          background: color,
                          borderRadius: '2px',
                          opacity: inv.covers ? 0.75 : 1
                        }}
                      />
                      {/* Point estimate dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: `${centerPct}%`,
                          top: '50%',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: color,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="callout callout-purple" style={{ margin: '1rem 0 0 0' }}>
            <div style={{ fontSize: '0.825rem', lineHeight: 1.55 }}>
              <strong>The Exact Meaning: </strong>
              Each horizontal line represents a 95% confidence interval computed from a separate independent random sample.
              Notice that approximately <strong>{coverageData?.coveredCount || 95} of the 100 lines cross the vertical dark marker</strong> (the true population parameter).
              This visually proves that the 95% figure refers to the <em>long-run success rate of the procedure</em>, not the probability of a single fixed interval!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
