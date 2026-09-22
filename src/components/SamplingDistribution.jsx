import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { Layers, Play, RefreshCw, TrendingUp, Sparkles, ArrowRight, GraduationCap, HelpCircle, Mic, CheckCircle2 } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { simulateSamplingDistribution } from '../utils/sampling';
import { REPEATED_SAMPLES_PRESETS, STATISTICAL_GLOSSARY } from '../data/constants';

export default function SamplingDistribution({
  population,
  popPercentages,
  onOpenTeachMe,
  onOpenWhy,
  onOpenHowToExplain
}) {
  const [numSamples, setNumSamples] = useState(500);
  const [sampleSize, setSampleSize] = useState(100);
  const [targetOption, setTargetOption] = useState('Option A');
  const [distResult, setDistResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [animatedSamplesList, setAnimatedSamplesList] = useState([]);

  const sampleSizeOptions = [10, 30, 50, 100, 500];

  const runSimulation = () => {
    if (!population || population.length === 0) return;
    setIsSimulating(true);

    // Generate recent sample estimates preview list
    setTimeout(() => {
      const res = simulateSamplingDistribution(population, sampleSize, numSamples, targetOption);
      setDistResult(res);

      if (res && res.sampleProportions) {
        const preview = res.sampleProportions.slice(0, 5).map((p, idx) => ({
          sampleId: idx + 1,
          pct: (p * 100).toFixed(1)
        }));
        setAnimatedSamplesList(preview);
      }

      setIsSimulating(false);
    }, 40);
  };

  useEffect(() => {
    runSimulation();
  }, [population, sampleSize, numSamples, targetOption]);

  const trueP = targetOption === 'Option A' ? popPercentages.pctA : targetOption === 'Option B' ? popPercentages.pctB : popPercentages.pctC;

  return (
    <div id="sampling-dist-section" className="card">
      {/* Header */}
      <div className="card-header">
        <div className="card-title-group">
          <Layers size={20} color="var(--purple-accent)" />
          <div>
            <div className="card-title">Repeated Sampling & Sampling Distribution</div>
            <div className="card-subtitle">Watch hundreds of estimates pile up into a predictable distribution</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          {onOpenTeachMe && (
            <button
              onClick={() => onOpenTeachMe('samplingDistribution')}
              className="btn btn-outline btn-sm"
              title="Step-by-step interactive lesson"
            >
              <GraduationCap size={13} color="var(--blue-primary)" />
              Teach Me
            </button>
          )}

          {onOpenWhy && (
            <button
              onClick={() => onOpenWhy('repeatedSampling')}
              className="btn btn-outline btn-sm"
              title="Why study repeated samples?"
            >
              <HelpCircle size={13} color="var(--amber-accent)" />
              Why?
            </button>
          )}

          {onOpenHowToExplain && (
            <button
              onClick={() => onOpenHowToExplain('samplingDistribution')}
              className="btn btn-outline btn-sm"
              title="Viva elevator pitch"
            >
              <Mic size={13} color="var(--purple-accent)" />
              How do I explain this?
            </button>
          )}

          <TooltipIcon text={STATISTICAL_GLOSSARY.samplingDistribution} />
        </div>
      </div>

      {/* Section 20 Visual Pipeline & Preview */}
      <div style={{
        background: 'var(--bg-app)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.25rem',
        border: '1px solid var(--border-light)'
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Sequential Sampling Simulation:
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">Population N = 10,000</span>
          <span>⟶</span>
          {animatedSamplesList.map(s => (
            <div
              key={s.sampleId}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                animation: 'fadeInSlideUp 0.3s ease'
              }}
            >
              <span style={{ color: 'var(--text-tertiary)' }}>S{s.sampleId}: </span>
              <strong style={{ color: 'var(--blue-primary)' }}>{s.pct}%</strong>
            </div>
          ))}
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>... ({numSamples} total samples)</span>
          <span>⟶</span>
          <span className="badge badge-purple">Forms Bell Histogram Below</span>
        </div>
      </div>

      {/* Control Panel */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.25rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-xs)'
      }}>
        {/* Sample Size Control */}
        <div>
          <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
            Sample Size (n):
          </label>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {sampleSizeOptions.map(sz => (
              <button
                key={sz}
                onClick={() => setSampleSize(sz)}
                className={`btn btn-sm ${sampleSize === sz ? 'btn-primary' : 'btn-outline'}`}
                style={{ minWidth: '45px' }}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Repeated Samples */}
        <div>
          <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
            Repeated Iterations (M):
          </label>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {REPEATED_SAMPLES_PRESETS.map(m => (
              <button
                key={m}
                onClick={() => setNumSamples(m)}
                className={`btn btn-sm ${numSamples === m ? 'btn-secondary' : 'btn-outline'}`}
                style={{ minWidth: '50px' }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Target Option */}
        <div>
          <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
            Evaluated Option:
          </label>
          <select
            value={targetOption}
            onChange={e => setTargetOption(e.target.value)}
            className="form-input"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.825rem' }}
          >
            <option value="Option A">Option A (P = {popPercentages.pctA}%)</option>
            <option value="Option B">Option B (P = {popPercentages.pctB}%)</option>
            <option value="Option C">Option C (P = {popPercentages.pctC}%)</option>
          </select>
        </div>

        {/* Re-simulate Button */}
        <div>
          <label style={{ display: 'block', fontSize: '0.775rem', color: 'transparent', marginBottom: '0.35rem' }}>Action</label>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="btn btn-outline btn-sm"
          >
            <RefreshCw size={13} className={isSimulating ? 'spin' : ''} />
            Re-simulate
          </button>
        </div>
      </div>

      {/* Histogram & Results */}
      {distResult && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.25rem'
          }}>
            <div className="kpi-card" style={{ padding: '0.85rem' }}>
              <span className="kpi-label">Mean of All Estimates (E[p̂])</span>
              <div className="kpi-value text-mono" style={{ color: 'var(--blue-primary)', fontSize: '1.35rem' }}>
                {(distResult.empiricalMean * 100).toFixed(1)}%
              </div>
              <span className="text-xs text-muted">True Parameter: {trueP}%</span>
            </div>

            <div className="kpi-card" style={{ padding: '0.85rem' }}>
              <span className="kpi-label">Empirical Standard Error (SE)</span>
              <div className="kpi-value text-mono" style={{ color: 'var(--purple-accent)', fontSize: '1.35rem' }}>
                {(distResult.empiricalSE * 100).toFixed(2)}%
              </div>
              <span className="text-xs text-muted">Observed spread across samples</span>
            </div>

            <div className="kpi-card" style={{ padding: '0.85rem' }}>
              <span className="kpi-label">Theoretical Formula SE</span>
              <div className="kpi-value text-mono" style={{ color: 'var(--emerald-accent)', fontSize: '1.35rem' }}>
                {(distResult.theoreticalSE * 100).toFixed(2)}%
              </div>
              <span className="text-xs text-muted">√(P(1-P)/n) × FPC</span>
            </div>
          </div>

          {/* Recharts Bar Chart Histogram */}
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={distResult.bins} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="tooltip-card">
                        <div style={{ fontWeight: 700 }}>Proportion Range: {data.range}</div>
                        <div>Frequency: {data.count} samples ({(data.frequency * 100).toFixed(1)}%)</div>
                      </div>
                    );
                  }}
                />
                <ReferenceLine x={`${trueP}%`} stroke="var(--rose-accent)" strokeDasharray="4 4" label={{ value: `True P (${trueP}%)`, fill: 'var(--rose-accent)', fontSize: 11 }} />
                <Bar dataKey="count" fill="var(--purple-accent)" radius={[4, 4, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Key Takeaway Card */}
      <div className="key-takeaway-box">
        <CheckCircle2 size={16} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Key Idea</strong>
          <p>A sampling distribution shows how a statistic behaves across repeated samples. The estimates cluster symmetrically around the true population parameter.</p>
        </div>
      </div>
    </div>
  );
}
