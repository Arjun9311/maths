import React from 'react';
import { Users, UserCheck, TrendingUp, ShieldAlert, Activity } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { STATISTICAL_GLOSSARY } from '../data/constants';

export default function KpiCards({ populationSize, sampleSize, sampleResults, confidenceInterval }) {
  const estPct = sampleResults ? (sampleResults.proportions['Option A'] * 100).toFixed(1) + '%' : '—';
  const ageMean = sampleResults ? sampleResults.ageMean.toFixed(1) : '—';
  const ciStr = confidenceInterval
    ? `${(confidenceInterval.lower * 100).toFixed(1)}% – ${(confidenceInterval.upper * 100).toFixed(1)}%`
    : '—';

  const cards = [
    {
      title: 'POPULATION SIZE',
      value: populationSize ? populationSize.toLocaleString() : '0',
      explanation: 'The complete simulated universe of voters being studied',
      icon: Users,
      color: 'var(--blue-primary)',
      bg: 'var(--blue-light)',
      sparkType: 'dots',
      tooltip: STATISTICAL_GLOSSARY.population
    },
    {
      title: 'SAMPLE SIZE',
      value: sampleSize ? sampleSize.toLocaleString() : '0',
      explanation: `Represents ${populationSize ? ((sampleSize / populationSize) * 100).toFixed(1) : 0}% sampling fraction of the universe`,
      icon: UserCheck,
      color: 'var(--purple-accent)',
      bg: 'var(--purple-light)',
      sparkType: 'fraction',
      tooltip: STATISTICAL_GLOSSARY.sample
    },
    {
      title: 'ESTIMATED PROPORTION',
      value: estPct,
      explanation: 'Sample proportion (p̂) used as an unbiased point estimate of true P',
      icon: TrendingUp,
      color: 'var(--emerald-accent)',
      bg: 'var(--emerald-light)',
      sparkType: 'bar',
      tooltip: STATISTICAL_GLOSSARY.pointEstimate
    },
    {
      title: 'SAMPLE MEAN (AGE)',
      value: ageMean,
      explanation: 'Continuous metric average calculated directly from sample responses',
      icon: Activity,
      color: 'var(--amber-accent)',
      bg: 'var(--amber-light)',
      sparkType: 'line',
      tooltip: STATISTICAL_GLOSSARY.tDistribution
    },
    {
      title: '95% CONFIDENCE INTERVAL',
      value: ciStr,
      explanation: confidenceInterval ? `Margin of error ±${(confidenceInterval.marginOfError * 100).toFixed(1)}% around estimate` : 'Interval bounds for true parameter',
      icon: ShieldAlert,
      color: 'var(--blue-primary)',
      bg: 'var(--blue-light)',
      sparkType: 'range',
      tooltip: STATISTICAL_GLOSSARY.confidenceInterval
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    }}>
      {cards.map(c => {
        const Icon = c.icon;
        return (
          <div
            key={c.title}
            className="card"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  {c.title}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <TooltipIcon text={c.tooltip} />
                  <div style={{ color: c.color, background: c.bg, padding: '0.3rem', borderRadius: 'var(--radius-sm)', display: 'flex' }}>
                    <Icon size={15} />
                  </div>
                </div>
              </div>

              {/* Dominant Large Number */}
              <div style={{
                fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '0.5rem'
              }}>
                {c.value}
              </div>
            </div>

            {/* Clear Educational Explanation */}
            <div>
              <div style={{
                height: '3px',
                width: '100%',
                background: 'var(--bg-muted)',
                borderRadius: '2px',
                marginBottom: '0.65rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: '65%',
                  background: c.color,
                  borderRadius: '2px'
                }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {c.explanation}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
