import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine } from 'recharts';
import { GitCommit, Sliders, Info } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { tPDF, getCriticalT } from '../utils/distributions';
import { normalPDF } from '../utils/statistics';
import { STATISTICAL_GLOSSARY } from '../data/constants';

export default function TDistribution() {
  const [df, setDf] = useState(5);
  const [confLevel, setConfLevel] = useState(0.95);

  const tCrit = getCriticalT(confLevel, df);

  // Generate curve points from x = -4 to +4
  const curveData = [];
  const step = 0.15;
  for (let x = -4; x <= 4.05; x += step) {
    const roundX = parseFloat(x.toFixed(2));
    curveData.push({
      x: roundX,
      'Student t': parseFloat(tPDF(roundX, df).toFixed(4)),
      'Standard Normal (Z)': parseFloat(normalPDF(roundX, 0, 1).toFixed(4))
    });
  }

  return (
    <div id="distributions" className="card">
      <div className="card-header">
        <div className="card-title-group">
          <GitCommit size={20} color="var(--purple-accent)" />
          <div>
            <div className="card-title">Student's t-Distribution vs Standard Normal (Z)</div>
            <div className="card-subtitle">Comparing heavier tails and convergence to the Gaussian curve</div>
          </div>
        </div>
        <TooltipIcon text={STATISTICAL_GLOSSARY.tDistribution} />
      </div>

      <p style={{ marginBottom: '1.25rem', color: 'var(--text-body)' }}>
        <strong>Theory: </strong>
        The t-distribution is symmetric and bell-shaped, but has <strong>heavier tails</strong> than the standard normal distribution to account for additional uncertainty when estimating population variability from a sample.
        As the degrees of freedom (<em>df</em>) increase, the t-distribution converges to the Standard Normal curve.
      </p>

      {/* Interactive Controls & Metrics Bar */}
      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        alignItems: 'center'
      }}>
        {/* DF Slider */}
        <div className="form-group">
          <div className="form-label">
            <span>Degrees of Freedom (df = n - 1):</span>
            <span className="text-mono" style={{ color: 'var(--purple-accent)', fontWeight: 700, fontSize: '1rem' }}>
              df = {df}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="60"
            value={df}
            onChange={e => setDf(parseInt(e.target.value) || 1)}
            className="form-range"
            style={{ accentColor: 'var(--purple-accent)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
            <span>df = 1 (heavy tails)</span>
            <span>df = 60 (near normal)</span>
          </div>
        </div>

        {/* Confidence Level */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
            Confidence Level (Two-Tailed):
          </label>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {[0.90, 0.95, 0.99].map(lvl => (
              <button
                key={lvl}
                onClick={() => setConfLevel(lvl)}
                className={`btn btn-sm ${confLevel === lvl ? 'btn-secondary' : 'btn-outline'}`}
              >
                {(lvl * 100).toFixed(0)}%
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Critical t value */}
        <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Critical t* (df={df}, α={(1 - confLevel).toFixed(2)})
          </div>
          <div className="text-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--purple-accent)' }}>
            ±{tCrit.toFixed(3)}
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
            vs Normal Z* = ±{confLevel === 0.95 ? '1.960' : confLevel === 0.90 ? '1.645' : '2.576'}
          </div>
        </div>
      </div>

      {/* Recharts Curve Comparison */}
      <div style={{ width: '100%', height: 280, marginBottom: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={curveData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="x" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} domain={[0, 0.45]} />
            <Tooltip
              formatter={(val, name) => [val, name]}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '0.825rem'
              }}
            />
            <Legend iconType="plainline" wrapperStyle={{ fontSize: '0.825rem' }} />
            <Line
              type="monotone"
              dataKey="Student t"
              stroke="var(--purple-accent)"
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Standard Normal (Z)"
              stroke="#94a3b8"
              strokeWidth={1.75}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="callout callout-purple" style={{ margin: 0 }}>
        <div style={{ fontSize: '0.85rem', lineHeight: 1.55 }}>
          <strong>Takeaway: </strong>
          When sample size is small (e.g., <em>df = 5</em>), the critical value <em>t* = ±{tCrit.toFixed(3)}</em> is noticeably larger than 1.960, ensuring wider confidence intervals to maintain 95% coverage under parameter uncertainty.
        </div>
      </div>
    </div>
  );
}
