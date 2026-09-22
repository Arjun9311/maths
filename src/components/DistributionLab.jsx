import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { Activity, Mic, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { tPDF, getCriticalT, chiSquarePDF, chiSquarePValue, getCriticalChiSquare, fPDF, fPValue, getCriticalF } from '../utils/distributions';
import { normalPDF, calculateMean, calculateSampleVariance } from '../utils/statistics';
import { STATISTICAL_GLOSSARY } from '../data/constants';

export default function DistributionLab({
  sampleResults,
  popPercentages,
  sampleSize,
  viewMode,
  onOpenHowToExplain
}) {
  const [activeTab, setActiveTab] = useState('t'); // 't' | 'chisquare' | 'f' | 'normal'
  const [tDf, setTDf] = useState(10);
  const [tConf, setTConf] = useState(0.95);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const tCrit = getCriticalT(tConf, tDf);

  // 1. Normal Curve Data
  const normalCurveData = [];
  for (let x = -4; x <= 4.05; x += 0.2) {
    const roundX = parseFloat(x.toFixed(2));
    normalCurveData.push({
      x: roundX,
      'Standard Normal': parseFloat(normalPDF(roundX, 0, 1).toFixed(4))
    });
  }

  // 2. t-Distribution vs Normal Data
  const tCurveData = [];
  for (let x = -4; x <= 4.05; x += 0.2) {
    const roundX = parseFloat(x.toFixed(2));
    tCurveData.push({
      x: roundX,
      'Student t': parseFloat(tPDF(roundX, tDf).toFixed(4)),
      'Normal (Z)': parseFloat(normalPDF(roundX, 0, 1).toFixed(4))
    });
  }

  // 3. Chi-Square Goodness of Fit Data
  const n = sampleSize || 500;
  const counts = sampleResults?.counts || { 'Option A': 240, 'Option B': 160, 'Option C': 100 };
  const expA = (popPercentages.pctA / 100) * n;
  const expB = (popPercentages.pctB / 100) * n;
  const expC = (popPercentages.pctC / 100) * n;

  const obsA = counts['Option A'];
  const obsB = counts['Option B'];
  const obsC = counts['Option C'];

  const compA = expA > 0 ? Math.pow(obsA - expA, 2) / expA : 0;
  const compB = expB > 0 ? Math.pow(obsB - expB, 2) / expB : 0;
  const compC = expC > 0 ? Math.pow(obsC - expC, 2) / expC : 0;

  const chiStat = compA + compB + compC;
  const chiDf = 2;
  const chiPVal = chiSquarePValue(chiStat, chiDf);
  const chiCrit = getCriticalChiSquare(0.05, chiDf);

  const chiCurveData = [];
  for (let x = 0.1; x <= 14; x += 0.25) {
    const roundX = parseFloat(x.toFixed(2));
    const density = chiSquarePDF(roundX, chiDf);
    chiCurveData.push({
      x: roundX,
      density: parseFloat(density.toFixed(4)),
      isRejection: roundX >= chiCrit ? parseFloat(density.toFixed(4)) : 0
    });
  }

  // 4. F-Distribution Data (ANOVA on Age Variance)
  const agesA = sampleResults?.agesByChoice?.['Option A'] || [40, 45, 50, 42, 38];
  const agesB = sampleResults?.agesByChoice?.['Option B'] || [41, 44, 48, 39, 43];
  const agesC = sampleResults?.agesByChoice?.['Option C'] || [39, 42, 46, 40, 41];

  const nA = agesA.length;
  const nB = agesB.length;
  const nC = agesC.length;
  const totalN = nA + nB + nC;

  const meanA = calculateMean(agesA);
  const meanB = calculateMean(agesB);
  const meanC = calculateMean(agesC);
  const grandMean = sampleResults?.ageMean || 43;

  const varA = calculateSampleVariance(agesA);
  const varB = calculateSampleVariance(agesB);
  const varC = calculateSampleVariance(agesC);

  const ssB = nA * Math.pow(meanA - grandMean, 2) + nB * Math.pow(meanB - grandMean, 2) + nC * Math.pow(meanC - grandMean, 2);
  const ssW = (nA - 1) * varA + (nB - 1) * varB + (nC - 1) * varC;

  const fDf1 = 2;
  const fDf2 = Math.max(1, totalN - 3);
  const msB = ssB / fDf1;
  const msW = ssW / fDf2;
  const fStat = msW > 0 ? msB / msW : 1.0;
  const fPVal = fPValue(fStat, fDf1, fDf2);
  const fCrit = getCriticalF(0.05, fDf1, fDf2);

  const fCurveData = [];
  for (let x = 0.05; x <= 6.0; x += 0.1) {
    const roundX = parseFloat(x.toFixed(2));
    const density = fPDF(roundX, fDf1, fDf2);
    fCurveData.push({
      x: roundX,
      density: parseFloat(density.toFixed(4)),
      isRejection: roundX >= fCrit ? parseFloat(density.toFixed(4)) : 0
    });
  }

  return (
    <div id="distributions-section" className="card">
      {/* Header */}
      <div className="card-header">
        <div className="card-title-group">
          <Activity size={20} color="var(--purple-accent)" />
          <div>
            <div className="card-title">Distribution Laboratory (Normal, t, Chi-Square, F)</div>
            <div className="card-subtitle">Visual and interactive exploration of key statistical inference distributions</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          {onOpenHowToExplain && (
            <button
              onClick={() => onOpenHowToExplain(activeTab === 'chisquare' ? 'chiSquare' : activeTab === 'f' ? 'fDistribution' : 'tDistribution')}
              className="btn btn-outline btn-sm"
              title="Viva elevator pitch"
            >
              <Mic size={13} color="var(--purple-accent)" />
              How do I explain this?
            </button>
          )}
          <TooltipIcon text={STATISTICAL_GLOSSARY.tDistribution} />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-nav">
        <button
          onClick={() => setActiveTab('t')}
          className={`tab-btn ${activeTab === 't' ? 'active' : ''}`}
        >
          1. Student's t-Distribution
        </button>
        <button
          onClick={() => setActiveTab('chisquare')}
          className={`tab-btn ${activeTab === 'chisquare' ? 'active' : ''}`}
        >
          2. Chi-Square Test (χ²)
        </button>
        <button
          onClick={() => setActiveTab('f')}
          className={`tab-btn ${activeTab === 'f' ? 'active' : ''}`}
        >
          3. F-Distribution & ANOVA
        </button>
        <button
          onClick={() => setActiveTab('normal')}
          className={`tab-btn ${activeTab === 'normal' ? 'active' : ''}`}
        >
          4. Standard Normal (Z)
        </button>
      </div>

      {/* TAB 1: Student's t-Distribution (Section 23) */}
      {activeTab === 't' && (
        <div>
          {/* Beginner 3-Question Framework */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <strong style={{ color: 'var(--purple-accent)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                What is it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                A probability distribution used frequently when making inferences about a population mean when the population standard deviation is unknown.
              </p>
            </div>
            <div>
              <strong style={{ color: 'var(--blue-primary)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Why do we need it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                It helps account for additional uncertainty when estimating a population mean from a small sample.
              </p>
            </div>
            <div>
              <strong style={{ color: 'var(--emerald-accent)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                How do I explain it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                "We use the t-distribution when making inference about a mean and the population standard deviation is unknown, especially with smaller samples."
              </p>
            </div>
          </div>

          {/* Interactive df Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div className="form-label" style={{ marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Degrees of Freedom (df = n - 1):</span>
                <span className="text-mono" style={{ color: 'var(--purple-accent)', fontWeight: 800, fontSize: '1.2rem' }}>
                  df = {tDf}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                value={tDf}
                onChange={e => setTDf(parseInt(e.target.value) || 1)}
                className="form-range"
                style={{ accentColor: 'var(--purple-accent)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                <span>df = 1 (heavy tails, high uncertainty)</span>
                <span>df = 60 (converges to Normal)</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Two-Tailed Critical t*</div>
                <div className="text-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--purple-accent)' }}>
                  ±{tCrit.toFixed(3)}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-tertiary)' }}>95% Confidence Level</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Normal Equivalent Z*</div>
                <div className="text-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                  ±1.960
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-tertiary)' }}>Fixed theoretical reference</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div style={{ width: '100%', height: 260, marginBottom: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tCurveData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="x" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} domain={[0, 0.45]} />
                <Tooltip contentStyle={{ fontSize: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)' }} />
                <Line type="monotone" dataKey="Student t" stroke="var(--purple-accent)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="Normal (Z)" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 2: Chi-Square Test (Section 24) */}
      {activeTab === 'chisquare' && (
        <div>
          {/* Beginner 3-Question Framework */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <strong style={{ color: 'var(--amber-accent)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                What is it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                A test that measures how different observed counts in categories are from expected counts.
              </p>
            </div>
            <div>
              <strong style={{ color: 'var(--blue-primary)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Why do we need it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                To verify whether sample voter choices match historical or theoretical demographic proportions.
              </p>
            </div>
            <div>
              <strong style={{ color: 'var(--emerald-accent)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                How do I explain it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                "Chi-square adds up the squared differences between what we saw and what we expected across groups."
              </p>
            </div>
          </div>

          {/* Expected vs Observed Visual Bars */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            marginBottom: '1.25rem'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Observed vs Expected Frequency Bars
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { name: 'Option A', obs: obsA, exp: expA, comp: compA, color: 'var(--blue-primary)' },
                { name: 'Option B', obs: obsB, exp: expB, comp: compB, color: 'var(--purple-accent)' },
                { name: 'Option C', obs: obsC, exp: expC, comp: compC, color: 'var(--emerald-accent)' }
              ].map(item => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span><strong>{item.name}:</strong> Observed = {item.obs} vs Expected = {item.exp.toFixed(0)}</span>
                    <span className="text-mono" style={{ color: 'var(--amber-accent)', fontWeight: 600 }}>Contrib (O-E)²/E = {item.comp.toFixed(2)}</span>
                  </div>
                  <div style={{ position: 'relative', height: '16px', background: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(item.obs / n) * 100 * 1.8}%`, background: item.color, opacity: 0.85 }} />
                    <div style={{ position: 'absolute', left: `${(item.exp / n) * 100 * 1.8}%`, top: 0, bottom: 0, width: '3px', background: '#000000', zIndex: 2 }} title="Expected target line" />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Chi-Square Statistic (χ²):</span>
                <div className="text-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--amber-accent)' }}>
                  χ² = {chiStat.toFixed(2)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>p-value (df = {chiDf}):</span>
                <div className="text-mono" style={{ fontSize: '1.2rem', fontWeight: 700, color: chiPVal > 0.05 ? 'var(--emerald-accent)' : 'var(--rose-accent)' }}>
                  p = {chiPVal.toFixed(3)} {chiPVal > 0.05 ? '(Consistent)' : '(Significant discrepancy)'}
                </div>
              </div>
            </div>
          </div>

          {/* Chi-Square Curve */}
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chiCurveData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="x" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip contentStyle={{ fontSize: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)' }} />
                <Area type="monotone" dataKey="density" stroke="var(--amber-accent)" fill="var(--amber-light)" strokeWidth={2} />
                <ReferenceLine x={parseFloat(chiStat.toFixed(1))} stroke="var(--rose-accent)" strokeWidth={2} label={{ value: `χ² = ${chiStat.toFixed(1)}`, fill: 'var(--rose-accent)', fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 3: F-Distribution & ANOVA (Section 25) */}
      {activeTab === 'f' && (
        <div>
          {/* Beginner 3-Question Framework */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <strong style={{ color: 'var(--purple-accent)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                What is it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                A distribution formed by the ratio of two variances.
              </p>
            </div>
            <div>
              <strong style={{ color: 'var(--blue-primary)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Why do we need it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                In ANOVA, it tests whether average differences between groups are larger than random variation within groups.
              </p>
            </div>
            <div>
              <strong style={{ color: 'var(--emerald-accent)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                How do I explain it?
              </strong>
              <p style={{ margin: '0.2rem 0', color: 'var(--text-body)' }}>
                "The F-distribution is used in statistical procedures involving ratios of variances, including ANOVA."
              </p>
            </div>
          </div>

          {/* Variance Ratio Illustration */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            marginBottom: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Variance Ratio Computation (ANOVA F-Statistic)
            </div>

            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0.5rem 0' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--blue-primary)' }}>
                Between-Group Variance (MS_Between = {msB.toFixed(1)})
              </div>
              <div style={{ width: '220px', height: '2px', background: 'var(--text-main)', margin: '0.35rem 0' }} />
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--purple-accent)' }}>
                Within-Group Variance (MS_Within = {msW.toFixed(1)})
              </div>
            </div>

            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--purple-accent)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
              = F-Statistic: {fStat.toFixed(2)}
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
              p-value = {fPVal.toFixed(3)} (df₁ = {fDf1}, df₂ = {fDf2})
            </p>
          </div>

          {/* F Curve */}
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fCurveData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="x" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip contentStyle={{ fontSize: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)' }} />
                <Area type="monotone" dataKey="density" stroke="var(--purple-accent)" fill="var(--purple-light)" strokeWidth={2} />
                <ReferenceLine x={parseFloat(fStat.toFixed(1))} stroke="var(--rose-accent)" strokeWidth={2} label={{ value: `F = ${fStat.toFixed(1)}`, fill: 'var(--rose-accent)', fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 4: Standard Normal Curve */}
      {activeTab === 'normal' && (
        <div>
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-light)'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              The Standard Normal Distribution (Z-Curve)
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
              Mean μ = 0, Standard Deviation σ = 1. The benchmark bell curve for 95% confidence intervals (Z* = 1.96) and large-sample hypothesis testing under the Central Limit Theorem.
            </p>
          </div>

          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={normalCurveData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="x" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip contentStyle={{ fontSize: '0.8rem', borderRadius: '8px', background: 'var(--bg-card)' }} />
                <Line type="monotone" dataKey="Standard Normal" stroke="var(--blue-primary)" strokeWidth={2.5} dot={false} />
                <ReferenceLine x={-1.96} stroke="var(--rose-accent)" strokeDasharray="3 3" label="-1.96" />
                <ReferenceLine x={1.96} stroke="var(--rose-accent)" strokeDasharray="3 3" label="+1.96" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Technical Details Toggle */}
      <div style={{ marginTop: '1.25rem' }}>
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.75rem' }}
        >
          {showTechnicalDetails ? 'Hide Technical Details' : 'See Advanced Technical Formulas'}
          {showTechnicalDetails ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {showTechnicalDetails && (
          <div className="formula-reveal-card">
            <div className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              <div>• <strong>Student's t:</strong> f(t, ν) = [Γ((ν+1)/2) / (√(πν) Γ(ν/2))] · (1 + t²/ν)^(-(ν+1)/2)</div>
              <div>• <strong>Chi-Square:</strong> χ² = ∑ (O_i - E_i)² / E_i, df = k - 1</div>
              <div>• <strong>F-Distribution:</strong> F = (SS_Between / df₁) / (SS_Within / df₂)</div>
              <div>• <strong>Standard Normal:</strong> f(z) = (1/√(2π)) · e^(-z²/2)</div>
            </div>
          </div>
        )}
      </div>

      {/* Key Takeaway Card */}
      <div className="key-takeaway-box">
        <CheckCircle2 size={16} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Key Idea</strong>
          <p>Different distributions handle different statistical situations: Normal for large-sample averages, t for unknown standard deviations, Chi-Square for categorical counts, and F for comparing multiple group variances.</p>
        </div>
      </div>
    </div>
  );
}
