import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Mic, GraduationCap, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import ConfidenceCoverageSimulator from './ConfidenceCoverageSimulator';
import { calculateWaldProportionCI, calculateWilsonProportionCI } from '../utils/confidenceIntervals';
import { COLOR_PALETTE, STATISTICAL_GLOSSARY } from '../data/constants';

export default function ConfidenceInterval({
  population,
  populationSize,
  sampleSize,
  sampleResults,
  popPercentages,
  viewMode,
  onOpenTeachMe,
  onOpenWhy,
  onOpenHowToExplain
}) {
  const [confLevel, setConfLevel] = useState(0.95);
  const [ciMethod, setCiMethod] = useState('wald');
  const [showFormula, setShowFormula] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState(null);

  if (!sampleResults) return null;

  const { proportions } = sampleResults;

  const calculateCI = (p) => {
    if (ciMethod === 'wilson') {
      return calculateWilsonProportionCI(p, sampleSize, confLevel);
    }
    return calculateWaldProportionCI(p, sampleSize, populationSize, confLevel);
  };

  const ciA = calculateCI(proportions['Option A']);
  const ciB = calculateCI(proportions['Option B']);
  const ciC = calculateCI(proportions['Option C']);

  const options = [
    { name: 'Option A', p: proportions['Option A'], ci: ciA, truePct: popPercentages.pctA, color: COLOR_PALETTE.optionA },
    { name: 'Option B', p: proportions['Option B'], ci: ciB, truePct: popPercentages.pctB, color: COLOR_PALETTE.optionB },
    { name: 'Option C', p: proportions['Option C'], ci: ciC, truePct: popPercentages.pctC, color: COLOR_PALETTE.optionC }
  ];

  const chartMin = 0;
  const chartMax = 70;
  const getPos = (prop) => `${Math.max(0, Math.min(100, ((prop * 100 - chartMin) / (chartMax - chartMin)) * 100))}%`;

  const propA = (proportions['Option A'] * 100).toFixed(1);
  const ciALower = (ciA.lower * 100).toFixed(1);
  const ciAUpper = (ciA.upper * 100).toFixed(1);
  const marginA = (ciA.marginOfError * 100).toFixed(1);

  const formulaSymbols = [
    { id: 'ci', symbol: 'CI', label: 'Confidence Interval', desc: 'The resulting plausible range [Lower, Upper] containing the true parameter with stated confidence.' },
    { id: 'est', symbol: 'p̂', label: 'Point Estimate', desc: 'The sample statistic (e.g. 48.2%) at the exact center of the interval.' },
    { id: 'pm', symbol: '±', label: 'Margin of Error', desc: 'The plus-or-minus buffer extending symmetrically on both sides of the point estimate.' },
    { id: 'z', symbol: 'z*', label: 'Critical Value', desc: `${confLevel === 0.9 ? '1.645 (for 90%)' : confLevel === 0.95 ? '1.960 (for 95%)' : '2.576 (for 99%)'} - the standard normal multiplier.` },
    { id: 'se', symbol: 'SE', label: 'Standard Error', desc: '√(p̂(1-p̂)/n) - measures how much sample proportions vary from sample to sample.' },
    { id: 'fpc', symbol: 'FPC', label: 'Finite Population Correction', desc: '√((N-n)/(N-1)) - accounts for reduced uncertainty when sampling without replacement from a finite electorate.' }
  ];

  return (
    <div id="ci-section" className="card">
      {/* Header */}
      <div className="card-header">
        <div className="card-title-group">
          <ShieldCheck size={20} color="var(--blue-primary)" />
          <div>
            <div className="card-title">One Number Is Not the Whole Story (Confidence Intervals)</div>
            <div className="card-subtitle">Quantifying uncertainty and communicating margins of error honestly</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          {onOpenTeachMe && (
            <button
              onClick={() => onOpenTeachMe('confidenceInterval')}
              className="btn btn-outline btn-sm"
              title="Step-by-step interactive lesson"
            >
              <GraduationCap size={13} color="var(--blue-primary)" />
              Teach Me
            </button>
          )}

          {onOpenWhy && (
            <button
              onClick={() => onOpenWhy('confidenceInterval')}
              className="btn btn-outline btn-sm"
              title="Why not give just one number?"
            >
              <HelpCircle size={13} color="var(--amber-accent)" />
              Why?
            </button>
          )}

          {onOpenHowToExplain && (
            <button
              onClick={() => onOpenHowToExplain('confidenceInterval')}
              className="btn btn-outline btn-sm"
              title="Viva elevator pitch"
            >
              <Mic size={13} color="var(--purple-accent)" />
              How do I explain this?
            </button>
          )}

          <TooltipIcon text={STATISTICAL_GLOSSARY.confidenceInterval} />
        </div>
      </div>

      {/* Section 18: Expanding Brackets Visual Story */}
      <div style={{
        background: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        border: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          Visual Expansion: Single Estimate into Interval
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Point Estimate:</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--blue-primary)' }}>{propA}%</div>
          </div>

          <div style={{ fontSize: '1.5rem', color: 'var(--purple-accent)', fontWeight: 800 }}>
            ⟶
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Expanded 95% Confidence Interval:</span>
            <div className="bracket-container">
              <span className="bracket-symbol">[</span>
              <span>{ciALower}%</span>
              <span style={{ margin: '0 0.35rem', color: 'var(--text-tertiary)' }}>─────── ● ───────</span>
              <span>{ciAUpper}%</span>
              <span className="bracket-symbol">]</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto' }}>
          "This range communicates uncertainty around the estimate: <strong>{propA}% ± {marginA}%</strong>."
        </p>
      </div>

      {/* Level & Method Controls Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'var(--bg-subtle)',
        padding: '0.75rem 1.15rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.5rem',
        border: '1px solid var(--border-light)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Confidence Level (1 - α):
          </span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {[0.90, 0.95, 0.99].map(lvl => (
              <button
                key={lvl}
                onClick={() => setConfLevel(lvl)}
                className={`btn btn-sm ${confLevel === lvl ? 'btn-primary' : 'btn-outline'}`}
                style={{ minWidth: '55px' }}
              >
                {(lvl * 100).toFixed(0)}%
              </button>
            ))}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.25rem' }}>
            {confLevel === 0.90 ? '(Narrower, 90% certainty)' : confLevel === 0.99 ? '(Widest, 99% certainty)' : '(Standard 95% benchmark)'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Method:</span>
          <select
            value={ciMethod}
            onChange={e => setCiMethod(e.target.value)}
            className="form-input"
            style={{ padding: '0.3rem 0.65rem', fontSize: '0.825rem' }}
          >
            <option value="wald">Wald Normal Interval (with FPC)</option>
            <option value="wilson">Wilson Score Interval (Edge-Safe)</option>
          </select>
        </div>
      </div>

      {/* Visual Forest Plot / Confidence Interval Chart */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              "Think of It as a Range" Visual Forest Plot ({(confLevel * 100).toFixed(0)}% Level)
            </h4>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
              Lower Bound | ──────|────────●────────|────── | Upper Bound
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue-primary)' }} />
              Point Estimate (p̂)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 3, height: 14, background: 'var(--text-main)' }} />
              True Parameter (P)
            </span>
          </div>
        </div>

        {/* Forest Plot Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', padding: '0.5rem 0' }}>
          {options.map(opt => {
            const leftPct = getPos(opt.ci.lower);
            const rightPct = getPos(opt.ci.upper);
            const centerPct = getPos(opt.p);
            const truePct = getPos(opt.truePct / 100);

            return (
              <div key={opt.name} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 150px', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: opt.color }}>
                  {opt.name}
                </span>

                <div className="ci-bar-track">
                  {/* CI Range Span with transition */}
                  <div
                    style={{
                      position: 'absolute',
                      left: leftPct,
                      width: `calc(${rightPct} - ${leftPct})`,
                      height: '100%',
                      background: opt.color,
                      opacity: 0.25,
                      borderRadius: '4px',
                      transition: 'all 0.35s ease'
                    }}
                  />

                  {/* Range Boundaries [ and ] */}
                  <div style={{ position: 'absolute', left: leftPct, top: '2px', bottom: '2px', width: '2px', background: opt.color }} />
                  <div style={{ position: 'absolute', left: rightPct, top: '2px', bottom: '2px', width: '2px', background: opt.color }} />

                  {/* Point Estimate Dot */}
                  <div
                    className="ci-dot-marker"
                    style={{ left: centerPct, background: opt.color }}
                    title={`Estimate: ${(opt.p * 100).toFixed(1)}%`}
                  />

                  {/* True Population Reference Marker */}
                  <div
                    className="ci-true-marker"
                    style={{ left: truePct }}
                    title={`True Parameter: ${opt.truePct}%`}
                  />
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                  <span className="text-mono" style={{ fontWeight: 700, color: opt.color }}>
                    [{(opt.ci.lower * 100).toFixed(1)}%, {(opt.ci.upper * 100).toFixed(1)}%]
                  </span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                    ±{(opt.ci.marginOfError * 100).toFixed(1)}% MoE
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 26: Formula Reveal System */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.75rem' }}
        >
          {showFormula ? 'Hide Formula System' : 'See the Formula & Break It Down'}
        </button>

        {showFormula && (
          <div className="formula-reveal-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Wald Confidence Interval Formula with FPC:
              </span>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-tertiary)' }}>
                Click any symbol below to break it down
              </span>
            </div>

            <div style={{
              fontSize: '1.2rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--blue-primary)',
              background: 'var(--bg-card)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              marginBottom: '0.85rem',
              textAlign: 'center'
            }}>
              CI = p̂ ± z* × √( p̂(1-p̂)/n ) × √( (N-n)/(N-1) )
            </div>

            {/* Clickable Symbols */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {formulaSymbols.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSymbol(activeSymbol === s.id ? null : s.id)}
                  className={`formula-symbol-tag ${activeSymbol === s.id ? 'active' : ''}`}
                  style={{
                    borderColor: activeSymbol === s.id ? 'var(--blue-primary)' : 'var(--border-light)',
                    background: activeSymbol === s.id ? 'var(--blue-light)' : 'var(--bg-card)'
                  }}
                >
                  <span>{s.symbol}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>({s.label})</span>
                </button>
              ))}
            </div>

            {/* Expanded Active Symbol Definition */}
            {activeSymbol && (
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                border: '1px solid var(--blue-border)',
                fontSize: '0.8rem',
                color: 'var(--text-main)',
                animation: 'fadeInSlideUp 0.2s ease'
              }}>
                <strong style={{ color: 'var(--blue-primary)' }}>
                  {formulaSymbols.find(s => s.id === activeSymbol)?.label}:
                </strong>{' '}
                {formulaSymbols.find(s => s.id === activeSymbol)?.desc}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Coverage Simulator Component */}
      <ConfidenceCoverageSimulator
        population={population}
        populationSize={populationSize}
        sampleSize={sampleSize}
        popPercentages={popPercentages}
        confLevel={confLevel}
      />

      {/* Key Takeaway Card */}
      <div className="key-takeaway-box">
        <CheckCircle2 size={16} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Key Idea</strong>
          <p>A confidence interval shows a range that reflects sampling uncertainty. Higher confidence requires wider intervals; larger sample sizes create narrower intervals.</p>
        </div>
      </div>
    </div>
  );
}
