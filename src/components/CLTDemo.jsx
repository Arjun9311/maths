import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Sparkles, RefreshCw, ArrowRight, GraduationCap, HelpCircle, Mic, CheckCircle2, Eye } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { simulateSamplingDistribution } from '../utils/sampling';
import { CLT_SAMPLE_SIZES, STATISTICAL_GLOSSARY } from '../data/constants';

export default function CLTDemo({
  population,
  popPercentages,
  onOpenTeachMe,
  onOpenWhy,
  onOpenHowToExplain
}) {
  const [cltData, setCltData] = useState({});
  const [isSimulating, setIsSimulating] = useState(false);
  const [explainLikeNew, setExplainLikeNew] = useState(true);

  const runCltSimulations = () => {
    if (!population || population.length === 0) return;
    setIsSimulating(true);

    setTimeout(() => {
      const results = {};
      CLT_SAMPLE_SIZES.forEach(n => {
        results[n] = simulateSamplingDistribution(population, n, 300, 'Option A');
      });
      setCltData(results);
      setIsSimulating(false);
    }, 20);
  };

  useEffect(() => {
    runCltSimulations();
  }, [population, popPercentages.pctA]);

  return (
    <div id="clt-section" className="card">
      {/* Header */}
      <div className="card-header">
        <div className="card-title-group">
          <Sparkles size={20} color="var(--blue-primary)" />
          <div>
            <div className="card-title">Central Limit Theorem (CLT) Visual Laboratory</div>
            <div className="card-subtitle">Watch the sampling distribution turn into a smooth bell curve as n increases</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          {onOpenTeachMe && (
            <button
              onClick={() => onOpenTeachMe('clt')}
              className="btn btn-outline btn-sm"
              title="Step-by-step interactive lesson"
            >
              <GraduationCap size={13} color="var(--blue-primary)" />
              Teach Me
            </button>
          )}

          {onOpenWhy && (
            <button
              onClick={() => onOpenWhy('clt')}
              className="btn btn-outline btn-sm"
              title="Why is CLT the heart of statistics?"
            >
              <HelpCircle size={13} color="var(--amber-accent)" />
              Why?
            </button>
          )}

          {onOpenHowToExplain && (
            <button
              onClick={() => onOpenHowToExplain('clt')}
              className="btn btn-outline btn-sm"
              title="Viva elevator pitch"
            >
              <Mic size={13} color="var(--purple-accent)" />
              How do I explain this?
            </button>
          )}

          <button
            onClick={runCltSimulations}
            disabled={isSimulating}
            className="btn btn-outline btn-sm"
          >
            <RefreshCw size={13} className={isSimulating ? 'spin' : ''} />
            Re-run
          </button>
          <TooltipIcon text={STATISTICAL_GLOSSARY.centralLimitTheorem} />
        </div>
      </div>

      {/* Section 21: "Explain Like I'm New" Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(124, 58, 237, 0.05) 100%)',
        border: '1px solid var(--blue-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
              Explain Like I'm New
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500, margin: 0 }}>
            "Even if the original population is not normally shaped, averages from many sufficiently large random samples tend to form a bell-shaped pattern under the theorem's conditions."
          </p>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Rule of Thumb: <strong>n ≥ 30</strong> gives reliable bell shape
        </div>
      </div>

      {/* 3 Side-by-Side CLT Panels */}
      <div className="grid-3" style={{ marginBottom: '1.25rem' }}>
        {CLT_SAMPLE_SIZES.map(n => {
          const res = cltData[n];
          const colors = {
            10: 'var(--amber-accent)',
            30: 'var(--purple-accent)',
            100: 'var(--blue-primary)'
          };

          return (
            <div
              key={n}
              style={{
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                border: '1px solid var(--border-light)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: colors[n] }}>
                  Sample Size: n = {n}
                </span>
                <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                  300 Samples
                </span>
              </div>

              {res && (
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Center: <strong className="text-mono">{(res.meanProportion * 100).toFixed(1)}%</strong></span>
                  <span>Spread (SE): <strong className="text-mono" style={{ color: colors[n] }}>±{(res.empiricalSE * 100).toFixed(1)}%</strong></span>
                </div>
              )}

              <div style={{ width: '100%', height: 160 }}>
                {res ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={res.histogramData} margin={{ top: 5, right: 5, left: -25, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="var(--border-light)" />
                      <XAxis dataKey="rangeLabel" tick={{ fontSize: 9, fill: 'var(--text-secondary)' }} interval={3} />
                      <YAxis tick={{ fontSize: 9, fill: 'var(--text-secondary)' }} />
                      <Tooltip
                        formatter={(val) => [`${val} samples`, 'Frequency']}
                        contentStyle={{ fontSize: '0.75rem', borderRadius: '6px', background: 'var(--bg-card)' }}
                      />
                      <Bar dataKey="frequency" fill={colors[n]} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Generating CLT trials...
                  </div>
                )}
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: colors[n], marginTop: '0.5rem', textAlign: 'center' }}>
                {n === 10 && 'Small sample: wider, choppier distribution'}
                {n === 30 && 'Medium sample: symmetric bell shape begins to form'}
                {n === 100 && 'Large sample: sharp, tight bell curve around parameter'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Takeaway Card */}
      <div className="key-takeaway-box">
        <CheckCircle2 size={16} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Key Idea</strong>
          <p>The Central Limit Theorem proves that sample averages become approximately normal as sample size grows, allowing us to calculate margins of error reliably.</p>
        </div>
      </div>
    </div>
  );
}
