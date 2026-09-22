import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Sliders, AlertCircle, CheckCircle2 } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { COLOR_PALETTE, STATISTICAL_GLOSSARY } from '../data/constants';

export default function PopulationSetup({
  populationSize,
  setPopulationSize,
  pctA,
  setPctA,
  pctB,
  setPctB,
  pctC,
  setPctC,
  isValid,
  validationError
}) {
  const totalPct = pctA + pctB + pctC;
  const countA = Math.round((pctA / 100) * populationSize);
  const countB = Math.round((pctB / 100) * populationSize);
  const countC = Math.max(0, populationSize - countA - countB);

  const pieData = [
    { name: 'Option A', value: countA, percentage: pctA, color: COLOR_PALETTE.optionA },
    { name: 'Option B', value: countB, percentage: pctB, color: COLOR_PALETTE.optionB },
    { name: 'Option C', value: countC, percentage: pctC, color: COLOR_PALETTE.optionC }
  ];

  const handlePctChange = (option, val) => {
    const num = Math.max(0, Math.min(100, Number(val) || 0));
    if (option === 'A') setPctA(num);
    if (option === 'B') setPctB(num);
    if (option === 'C') setPctC(num);
  };

  const autoBalance = () => {
    const remainder = Math.max(0, 100 - pctA - pctB);
    setPctC(remainder);
  };

  return (
    <div id="population-section" className="card" style={{ height: '100%' }}>
      <div className="card-header">
        <div className="card-title-group">
          <Sliders size={20} color="var(--blue-primary)" />
          <div>
            <div className="card-title">Population Setup</div>
            <div className="card-subtitle">Configure the ground-truth simulated voter electorate</div>
          </div>
        </div>
        <TooltipIcon text={STATISTICAL_GLOSSARY.population} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        {/* Controls & Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div className="form-group">
            <label className="form-label">
              <span>Population Size (N)</span>
              <span className="text-mono" style={{ color: 'var(--blue-primary)', fontWeight: 800, fontSize: '1.05rem' }}>
                {Number(populationSize).toLocaleString()} voters
              </span>
            </label>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={populationSize}
              onChange={e => setPopulationSize(Math.max(100, parseInt(e.target.value) || 1000))}
              className="form-range"
              style={{ accentColor: 'var(--blue-primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
              <span>500</span>
              <span>Universe: {populationSize.toLocaleString()}</span>
              <span>50,000</span>
            </div>
          </div>

          {/* Option A */}
          <div className="form-group">
            <div className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLOR_PALETTE.optionA }} />
                Option A Preference
              </span>
              <span className="text-mono" style={{ fontWeight: 700 }}>
                {pctA}% ({countA.toLocaleString()} voters)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={pctA}
              onChange={e => handlePctChange('A', e.target.value)}
              className="form-range"
              style={{ accentColor: COLOR_PALETTE.optionA }}
            />
          </div>

          {/* Option B */}
          <div className="form-group">
            <div className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLOR_PALETTE.optionB }} />
                Option B Preference
              </span>
              <span className="text-mono" style={{ fontWeight: 700 }}>
                {pctB}% ({countB.toLocaleString()} voters)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={pctB}
              onChange={e => handlePctChange('B', e.target.value)}
              className="form-range"
              style={{ accentColor: COLOR_PALETTE.optionB }}
            />
          </div>

          {/* Option C */}
          <div className="form-group">
            <div className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLOR_PALETTE.optionC }} />
                Option C Preference
              </span>
              <span className="text-mono" style={{ fontWeight: 700 }}>
                {pctC}% ({countC.toLocaleString()} voters)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={pctC}
              onChange={e => handlePctChange('C', e.target.value)}
              className="form-range"
              style={{ accentColor: COLOR_PALETTE.optionC }}
            />
          </div>

          {/* Validation Status */}
          {isValid ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--emerald-accent)',
              fontSize: '0.8rem',
              background: 'var(--emerald-light)',
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <CheckCircle2 size={15} />
              <span>Valid distribution (Total: 100%)</span>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              color: 'var(--rose-accent)',
              fontSize: '0.8rem',
              background: 'var(--rose-light)',
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={15} />
                <span>{validationError || `Total is ${totalPct}% (must be 100%)`}</span>
              </div>
              <button onClick={autoBalance} className="btn btn-outline btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.725rem' }}>
                Auto-Balance
              </button>
            </div>
          )}
        </div>

        {/* Donut Chart of True Population */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', height: 210 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, item) => [
                    `${Number(value).toLocaleString()} voters (${item.payload.percentage}%)`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.825rem'
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(val, entry) => (
                    <span style={{ color: 'var(--text-main)', fontSize: '0.8rem', fontWeight: 600 }}>
                      {val} ({entry.payload.percentage}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted" style={{ textAlign: 'center', marginTop: '0.25rem' }}>
            Ground Truth Parameter (P): N = {populationSize.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
