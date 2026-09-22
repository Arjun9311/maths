import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { Network, HelpCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { chiSquarePDF, chiSquarePValue, getCriticalChiSquare } from '../utils/distributions';
import { STATISTICAL_GLOSSARY } from '../data/constants';

export default function ChiSquareDistribution({ sampleResults, popPercentages, sampleSize }) {
  if (!sampleResults) return null;

  const { counts } = sampleResults;
  const n = sampleSize;

  // Expected counts under H0 (null hypothesis: sample drawn from population with stated proportions)
  const expectedA = (popPercentages.pctA / 100) * n;
  const expectedB = (popPercentages.pctB / 100) * n;
  const expectedC = (popPercentages.pctC / 100) * n;

  const obsA = counts['Option A'];
  const obsB = counts['Option B'];
  const obsC = counts['Option C'];

  // Chi-Square components: (O - E)^2 / E
  const compA = expectedA > 0 ? Math.pow(obsA - expectedA, 2) / expectedA : 0;
  const compB = expectedB > 0 ? Math.pow(obsB - expectedB, 2) / expectedB : 0;
  const compC = expectedC > 0 ? Math.pow(obsC - expectedC, 2) / expectedC : 0;

  const chiSquareStat = compA + compB + compC;
  const df = 2; // k - 1 categories = 3 - 1 = 2
  const pValue = chiSquarePValue(chiSquareStat, df);
  const criticalValue = getCriticalChiSquare(0.05, df);

  const isReject = chiSquareStat > criticalValue;

  // Generate Chi-Square PDF curve data for df=2 from x=0 to 14
  const curveData = [];
  for (let x = 0.1; x <= 14; x += 0.25) {
    const roundX = parseFloat(x.toFixed(2));
    const density = chiSquarePDF(roundX, df);
    curveData.push({
      x: roundX,
      density: parseFloat(density.toFixed(4)),
      isRejection: roundX >= criticalValue ? parseFloat(density.toFixed(4)) : 0
    });
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <Network size={20} color="var(--amber-accent)" />
          <div>
            <div className="card-title">Chi-Square Goodness-of-Fit Test (χ²)</div>
            <div className="card-subtitle">Testing whether observed sample frequencies match expected population proportions</div>
          </div>
        </div>
        <TooltipIcon text={STATISTICAL_GLOSSARY.chiSquareDistribution} />
      </div>

      <p style={{ marginBottom: '1.25rem', color: 'var(--text-body)' }}>
        <strong>Educational Scenario: </strong>
        In categorical opinion poll analysis, the <strong>Chi-Square Goodness-of-Fit test</strong> evaluates whether observed sample counts deviate significantly from expected demographic proportions:
        <span className="text-mono" style={{ display: 'inline-block', marginLeft: '0.4rem', fontWeight: 600 }}>
          χ² = Σ [ (O_i - E_i)² / E_i ]
        </span>
      </p>

      {/* Observed vs Expected Frequency Table */}
      <div className="table-container" style={{ marginBottom: '1.25rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Observed (O)</th>
              <th>Expected (E = n × P)</th>
              <th>Residual (O - E)</th>
              <th>Contribution (O - E)² / E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>Option A</td>
              <td className="text-mono">{obsA}</td>
              <td className="text-mono">{expectedA.toFixed(1)}</td>
              <td className="text-mono">{(obsA - expectedA > 0 ? '+' : '') + (obsA - expectedA).toFixed(1)}</td>
              <td className="text-mono">{compA.toFixed(3)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>Option B</td>
              <td className="text-mono">{obsB}</td>
              <td className="text-mono">{expectedB.toFixed(1)}</td>
              <td className="text-mono">{(obsB - expectedB > 0 ? '+' : '') + (obsB - expectedB).toFixed(1)}</td>
              <td className="text-mono">{compB.toFixed(3)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>Option C</td>
              <td className="text-mono">{obsC}</td>
              <td className="text-mono">{expectedC.toFixed(1)}</td>
              <td className="text-mono">{(obsC - expectedC > 0 ? '+' : '') + (obsC - expectedC).toFixed(1)}</td>
              <td className="text-mono">{compC.toFixed(3)}</td>
            </tr>
            <tr style={{ background: 'var(--bg-subtle)', fontWeight: 700 }}>
              <td>Total Statistic</td>
              <td className="text-mono">{n}</td>
              <td className="text-mono">{n.toFixed(1)}</td>
              <td className="text-mono">0.0</td>
              <td className="text-mono" style={{ color: 'var(--amber-accent)', fontSize: '1.05rem' }}>
                χ² = {chiSquareStat.toFixed(3)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Test Inference Metrics */}
      <div className="grid-3" style={{ marginBottom: '1.25rem' }}>
        <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Degrees of Freedom (df)</div>
          <div className="text-mono" style={{ fontSize: '1.35rem', fontWeight: 800 }}>df = {df}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>k - 1 categories = 3 - 1</div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Critical Value (α = 0.05)</div>
          <div className="text-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--amber-accent)' }}>
            χ²_crit = {criticalValue.toFixed(3)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rejection threshold at 95%</div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>p-value (P(X ≥ χ²))</div>
          <div className="text-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: pValue < 0.05 ? 'var(--rose-accent)' : 'var(--emerald-accent)' }}>
            {pValue < 0.001 ? '< 0.001' : pValue.toFixed(4)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {pValue >= 0.05 ? 'Consistent with population' : 'Significant deviation'}
          </div>
        </div>
      </div>

      {/* Chi-Square Curve Visualization */}
      <div style={{ width: '100%', height: 220, marginBottom: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={curveData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="x" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <Tooltip
              formatter={(val, name) => [val, name === 'density' ? 'χ² Density' : 'Rejection Region (α=0.05)']}
              contentStyle={{ fontSize: '0.8rem', borderRadius: '8px' }}
            />
            <ReferenceLine x={parseFloat(chiSquareStat.toFixed(2))} stroke="#2563eb" strokeWidth={2} label={{ value: `Sample χ²=${chiSquareStat.toFixed(2)}`, fill: '#2563eb', fontSize: 11, position: 'top' }} />
            <ReferenceLine x={parseFloat(criticalValue.toFixed(2))} stroke="#ef4444" strokeDasharray="3 3" label={{ value: `Crit=${criticalValue.toFixed(2)}`, fill: '#ef4444', fontSize: 11, position: 'insideTopRight' }} />
            <Area type="monotone" dataKey="density" stroke="#d97706" fill="#fef3c7" strokeWidth={2} />
            <Area type="monotone" dataKey="isRejection" stroke="none" fill="#fecaca" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={`callout ${isReject ? 'callout-warning' : 'callout-emerald'}`} style={{ margin: 0 }}>
        {isReject ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
        <div style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
          <strong>Educational Interpretation: </strong>
          Since calculated χ² = {chiSquareStat.toFixed(3)} {isReject ? 'exceeds' : 'is less than'} the critical cutoff of {criticalValue.toFixed(3)} (p = {pValue.toFixed(4)}),
          we {isReject ? 'reject' : 'fail to reject'} the null hypothesis at the 5% significance level.
          {isReject
            ? ' This indicates natural sampling variation or skew in this specific random draw.'
            : ' The observed sample frequencies are statistically consistent with the assumed population distribution.'}
        </div>
      </div>
    </div>
  );
}
