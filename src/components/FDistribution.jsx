import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { GitPullRequest, HelpCircle, CheckCircle } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { calculateMean, calculateSampleVariance } from '../utils/statistics';
import { fPDF, fPValue, getCriticalF } from '../utils/distributions';
import { STATISTICAL_GLOSSARY } from '../data/constants';

export default function FDistribution({ sampleResults }) {
  if (!sampleResults || !sampleResults.agesByChoice) return null;

  const agesA = sampleResults.agesByChoice['Option A'] || [];
  const agesB = sampleResults.agesByChoice['Option B'] || [];
  const agesC = sampleResults.agesByChoice['Option C'] || [];

  const nA = agesA.length;
  const nB = agesB.length;
  const nC = agesC.length;
  const totalN = nA + nB + nC;

  if (totalN < 6 || nA < 2 || nB < 2 || nC < 2) return null;

  const meanA = calculateMean(agesA);
  const meanB = calculateMean(agesB);
  const meanC = calculateMean(agesC);
  const grandMean = sampleResults.ageMean;

  const varA = calculateSampleVariance(agesA);
  const varB = calculateSampleVariance(agesB);
  const varC = calculateSampleVariance(agesC);

  // One-way ANOVA calculation:
  // SS_between = n_A * (meanA - grandMean)^2 + n_B * (meanB - grandMean)^2 + n_C * (meanC - grandMean)^2
  const ssBetween = nA * Math.pow(meanA - grandMean, 2) +
                    nB * Math.pow(meanB - grandMean, 2) +
                    nC * Math.pow(meanC - grandMean, 2);

  // SS_within = (nA - 1)*varA + (nB - 1)*varB + (nC - 1)*varC
  const ssWithin = (nA - 1) * varA + (nB - 1) * varB + (nC - 1) * varC;

  const df1 = 2; // k - 1 = 3 - 1
  const df2 = Math.max(1, totalN - 3);

  const msBetween = ssBetween / df1;
  const msWithin = ssWithin / df2;

  const fStat = msWithin > 0 ? msBetween / msWithin : 1.0;
  const pVal = fPValue(fStat, df1, df2);
  const fCrit = getCriticalF(0.05, df1, df2);

  // Generate F-distribution PDF curve from x=0.05 to 6
  const curveData = [];
  for (let x = 0.05; x <= 6.0; x += 0.1) {
    const roundX = parseFloat(x.toFixed(2));
    const density = fPDF(roundX, df1, df2);
    curveData.push({
      x: roundX,
      density: parseFloat(density.toFixed(4)),
      isRejection: roundX >= fCrit ? parseFloat(density.toFixed(4)) : 0
    });
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <GitPullRequest size={20} color="var(--purple-accent)" />
          <div>
            <div className="card-title">F-Distribution & ANOVA Variance Ratio</div>
            <div className="card-subtitle">Comparing voter age dispersion across preference groups</div>
          </div>
        </div>
        <TooltipIcon text={STATISTICAL_GLOSSARY.fDistribution} />
      </div>

      <p style={{ marginBottom: '1.25rem', color: 'var(--text-body)' }}>
        <strong>Theory: </strong>
        The <strong>F-distribution</strong> is defined as the ratio of two independent sample variances or Mean Squares:
        <span className="text-mono" style={{ display: 'inline-block', marginLeft: '0.4rem', fontWeight: 600 }}>
          F = MS_between / MS_within
        </span>.
        In this educational scenario, we use One-Way ANOVA to test whether the average simulated voter age varies significantly across supporters of Option A, Option B, and Option C.
      </p>

      {/* Group Summary Table */}
      <div className="table-container" style={{ marginBottom: '1.25rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Subgroup</th>
              <th>Group Sample (n_k)</th>
              <th>Mean Age (x̄_k)</th>
              <th>Sample Variance (s²_k)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>Option A Voters</td>
              <td className="text-mono">{nA}</td>
              <td className="text-mono">{meanA.toFixed(1)} yrs</td>
              <td className="text-mono">{varA.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>Option B Voters</td>
              <td className="text-mono">{nB}</td>
              <td className="text-mono">{meanB.toFixed(1)} yrs</td>
              <td className="text-mono">{varB.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>Option C Voters</td>
              <td className="text-mono">{nC}</td>
              <td className="text-mono">{meanC.toFixed(1)} yrs</td>
              <td className="text-mono">{varC.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ANOVA Metrics Grid */}
      <div className="grid-4" style={{ marginBottom: '1.25rem' }}>
        <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Between-Group MS (MS_B)</div>
          <div className="text-mono" style={{ fontSize: '1.25rem', fontWeight: 800 }}>{msBetween.toFixed(2)}</div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>df₁ (num) = {df1}</div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Within-Group MS (MS_W)</div>
          <div className="text-mono" style={{ fontSize: '1.25rem', fontWeight: 800 }}>{msWithin.toFixed(2)}</div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>df₂ (denom) = {df2}</div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>F-Statistic Ratio</div>
          <div className="text-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--purple-accent)' }}>
            F = {fStat.toFixed(3)}
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>F_crit = {fCrit.toFixed(3)}</div>
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>p-value (P(X ≥ F))</div>
          <div className="text-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: pVal < 0.05 ? 'var(--rose-accent)' : 'var(--emerald-accent)' }}>
            {pVal < 0.001 ? '< 0.001' : pVal.toFixed(4)}
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
            {pVal >= 0.05 ? 'No group variance difference' : 'Statistically significant'}
          </div>
        </div>
      </div>

      {/* F-Distribution Curve */}
      <div style={{ width: '100%', height: 220, marginBottom: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={curveData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="x" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <Tooltip
              formatter={(val, name) => [val, name === 'density' ? 'F Density' : 'Rejection Region (α=0.05)']}
              contentStyle={{ fontSize: '0.8rem', borderRadius: '8px' }}
            />
            <ReferenceLine x={parseFloat(Math.min(6, fStat).toFixed(2))} stroke="#7c3aed" strokeWidth={2} label={{ value: `F=${fStat.toFixed(2)}`, fill: '#7c3aed', fontSize: 11, position: 'top' }} />
            <ReferenceLine x={parseFloat(fCrit.toFixed(2))} stroke="#ef4444" strokeDasharray="3 3" label={{ value: `Crit=${fCrit.toFixed(2)}`, fill: '#ef4444', fontSize: 11, position: 'insideTopRight' }} />
            <Area type="monotone" dataKey="density" stroke="var(--purple-accent)" fill="#f5f3ff" strokeWidth={2} />
            <Area type="monotone" dataKey="isRejection" stroke="none" fill="#fecaca" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="callout callout-purple" style={{ margin: 0 }}>
        <div style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
          <strong>Educational Takeaway: </strong>
          The F-distribution evaluates whether variance between different option groups is large relative to random within-group variance.
          Here, calculated F = {fStat.toFixed(3)} with degrees of freedom (df₁ = {df1}, df₂ = {df2}) corresponds to p = {pVal.toFixed(4)}.
        </div>
      </div>
    </div>
  );
}
