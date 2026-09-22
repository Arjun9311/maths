import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Table, BarChart2, MessageSquare, ArrowRight, ShieldAlert } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { COLOR_PALETTE, STATISTICAL_GLOSSARY } from '../data/constants';

export default function SampleResults({
  populationSize,
  sampleSize,
  popPercentages,
  sampleResults,
  confidenceInterval
}) {
  if (!sampleResults) return null;

  const { counts, proportions, percentages } = sampleResults;

  // Comparison data
  const comparisonData = [
    {
      choice: 'Option A',
      'True Population %': parseFloat(popPercentages.pctA),
      'Sample Estimate %': parseFloat(percentages['Option A']),
    },
    {
      choice: 'Option B',
      'True Population %': parseFloat(popPercentages.pctB),
      'Sample Estimate %': parseFloat(percentages['Option B']),
    },
    {
      choice: 'Option C',
      'True Population %': parseFloat(popPercentages.pctC),
      'Sample Estimate %': parseFloat(percentages['Option C']),
    }
  ];

  // Sequential explanation statements per section 22
  const sequentialBullets = [
    `Your sample contained ${sampleSize.toLocaleString()} simulated observations from N = ${populationSize.toLocaleString()}.`,
    `Option A appeared in ${counts['Option A'].toLocaleString()} observations, producing a sample proportion of ${percentages['Option A']}%.`,
    `Option B received ${counts['Option B'].toLocaleString()} (${percentages['Option B']}%), and Option C received ${counts['Option C'].toLocaleString()} (${percentages['Option C']}%).`,
    `We use these sample proportions as unbiased point estimates of the unknown population parameters.`,
    confidenceInterval
      ? `The 95% confidence interval [${(confidenceInterval.lower * 100).toFixed(1)}% to ${(confidenceInterval.upper * 100).toFixed(1)}%] expresses the expected margin of uncertainty.`
      : ''
  ].filter(Boolean);

  return (
    <div id="sample-results-section" className="card">
      <div className="card-header">
        <div className="card-title-group">
          <BarChart2 size={20} color="var(--blue-primary)" />
          <div>
            <div className="card-title">Population vs Sample: Distribution Comparison</div>
            <div className="card-subtitle">Contrasting empirical sample statistics with ground-truth population parameters</div>
          </div>
        </div>
        <span className="badge badge-purple" style={{ fontSize: '0.725rem' }}>
          Sampling introduces uncertainty
        </span>
      </div>

      {/* Split Screen Comparison: Left = Table, Right = Side-by-Side Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Frequency Table */}
        <div>
          <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Table size={15} />
            Sample Frequency & Proportions
          </h4>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Choice</th>
                  <th>Sample Count</th>
                  <th>Sample Proportion (p̂)</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLOR_PALETTE.optionA }} />
                    Option A
                  </td>
                  <td className="text-mono">{counts['Option A'].toLocaleString()}</td>
                  <td className="text-mono">{proportions['Option A'].toFixed(4)}</td>
                  <td className="text-mono" style={{ fontWeight: 700, color: 'var(--blue-primary)' }}>
                    {percentages['Option A']}%
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLOR_PALETTE.optionB }} />
                    Option B
                  </td>
                  <td className="text-mono">{counts['Option B'].toLocaleString()}</td>
                  <td className="text-mono">{proportions['Option B'].toFixed(4)}</td>
                  <td className="text-mono" style={{ fontWeight: 700, color: 'var(--purple-accent)' }}>
                    {percentages['Option B']}%
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLOR_PALETTE.optionC }} />
                    Option C
                  </td>
                  <td className="text-mono">{counts['Option C'].toLocaleString()}</td>
                  <td className="text-mono">{proportions['Option C'].toFixed(4)}</td>
                  <td className="text-mono" style={{ fontWeight: 700, color: 'var(--emerald-accent)' }}>
                    {percentages['Option C']}%
                  </td>
                </tr>
                <tr style={{ background: 'var(--bg-subtle)', fontWeight: 700 }}>
                  <td>Total Sample</td>
                  <td className="text-mono">{sampleSize.toLocaleString()}</td>
                  <td className="text-mono">1.0000</td>
                  <td className="text-mono">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Side-by-Side Comparison Bar Chart */}
        <div>
          <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <BarChart2 size={15} />
            Population % vs Sample % Visual Match
          </h4>
          <div style={{ width: '100%', height: 210 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="choice" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <YAxis unit="%" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} domain={[0, 60]} />
                <Tooltip
                  formatter={(val) => [`${val}%`]}
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.8rem'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '0.775rem', paddingTop: '6px' }} />
                <Bar dataKey="True Population %" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Sample Estimate %" fill="var(--blue-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sequential Results Explanation Panel */}
      <div style={{
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        border: '1px solid var(--border-light)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <MessageSquare size={16} color="var(--purple-accent)" />
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Sequential Findings: What happened in this sample?
          </h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {sequentialBullets.map((stmt, sIdx) => (
            <div
              key={sIdx}
              className="reveal-item"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.65rem',
                fontSize: '0.85rem',
                color: 'var(--text-body)',
                animationDelay: `${sIdx * 0.08}s`
              }}
            >
              <span style={{ color: 'var(--blue-primary)', fontWeight: 800 }}>•</span>
              <span>{stmt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
