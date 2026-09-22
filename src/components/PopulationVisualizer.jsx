import React, { useMemo, useState, useEffect } from 'react';
import { Users, UserCheck, ArrowRight, Sparkles, GraduationCap, HelpCircle, Mic, CheckCircle2 } from 'lucide-react';
import { COLOR_PALETTE } from '../data/constants';

export default function PopulationVisualizer({
  populationSize,
  sampleSize,
  sampleResults,
  popPercentages,
  onGenerateSample,
  isSimulating,
  onOpenTeachMe,
  onOpenWhy,
  onOpenHowToExplain
}) {
  const [animatedCounter, setAnimatedCounter] = useState(sampleSize);

  // Generate a matrix of ~360 visual dots to represent the 10,000 population
  const totalDisplayDots = 360;
  const sampleDotCount = Math.max(5, Math.min(120, Math.round((sampleSize / populationSize) * totalDisplayDots)));

  // Animate counter when a new sample is drawn
  useEffect(() => {
    if (isSimulating) {
      let current = 0;
      const step = Math.max(1, Math.floor(sampleSize / 25));
      const timer = setInterval(() => {
        current += step;
        if (current >= sampleSize) {
          setAnimatedCounter(sampleSize);
          clearInterval(timer);
        } else {
          setAnimatedCounter(current);
        }
      }, 15);
      return () => clearInterval(timer);
    } else {
      setAnimatedCounter(sampleSize);
    }
  }, [isSimulating, sampleSize]);

  const dots = useMemo(() => {
    const list = [];
    const countA = Math.round((popPercentages.pctA / 100) * totalDisplayDots);
    const countB = Math.round((popPercentages.pctB / 100) * totalDisplayDots);
    const countC = totalDisplayDots - countA - countB;

    for (let i = 0; i < countA; i++) list.push({ id: i, choice: 'Option A', color: COLOR_PALETTE.optionA });
    for (let i = 0; i < countB; i++) list.push({ id: countA + i, choice: 'Option B', color: COLOR_PALETTE.optionB });
    for (let i = 0; i < countC; i++) list.push({ id: countA + countB + i, choice: 'Option C', color: COLOR_PALETTE.optionC });

    // Seeded pseudo-shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = (i * 37 + 13) % list.length;
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list.map((dot, idx) => ({
      ...dot,
      isSampled: idx < sampleDotCount
    }));
  }, [popPercentages, totalDisplayDots, sampleDotCount]);

  const sampledDots = dots.filter(d => d.isSampled);

  return (
    <div id="population-visualizer-section" className="card" style={{ marginBottom: '2rem' }}>
      {/* Header */}
      <div className="card-header">
        <div className="card-title-group">
          <Users size={22} color="var(--blue-primary)" />
          <div>
            <div className="card-title">Visual Population & Sample Extraction</div>
            <div className="card-subtitle">Every dot represents real voters. Watch them get selected into your sample live.</div>
          </div>
        </div>

        {/* Action Helper Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          {onOpenTeachMe && (
            <button
              onClick={() => onOpenTeachMe('population')}
              className="btn btn-outline btn-sm"
              title="Step-by-step interactive lesson"
            >
              <GraduationCap size={13} color="var(--blue-primary)" />
              <span>Teach Me</span>
            </button>
          )}

          {onOpenWhy && (
            <button
              onClick={() => onOpenWhy('sampling')}
              className="btn btn-outline btn-sm"
              title="Why do we use sampling?"
            >
              <HelpCircle size={13} color="var(--amber-accent)" />
              <span>Why?</span>
            </button>
          )}

          {onOpenHowToExplain && (
            <button
              onClick={() => onOpenHowToExplain('sampling')}
              className="btn btn-outline btn-sm"
              title="15-20 second spoken viva pitch"
            >
              <Mic size={13} color="var(--purple-accent)" />
              <span>How do I explain this?</span>
            </button>
          )}

          <span className="badge badge-blue">
            N = {populationSize.toLocaleString()}
          </span>
          <span className="badge badge-purple">
            n = {sampleSize.toLocaleString()} ({((sampleSize / populationSize) * 100).toFixed(1)}%)
          </span>
        </div>
      </div>

      {/* Beginner Explanation Banner */}
      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1.15rem',
        marginBottom: '1.25rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem',
        fontSize: '0.825rem'
      }}>
        <div>
          <strong style={{ color: 'var(--blue-primary)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            What is a Population?
          </strong>
          <span style={{ color: 'var(--text-body)' }}>The entire group we want to study (here: 10,000 voters).</span>
        </div>
        <div>
          <strong style={{ color: 'var(--purple-accent)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            What is a Sample?
          </strong>
          <span style={{ color: 'var(--text-body)' }}>Only a smaller group selected from the population (here: {sampleSize} voters).</span>
        </div>
        <div>
          <strong style={{ color: 'var(--emerald-accent)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            What are we doing?
          </strong>
          <span style={{ color: 'var(--text-body)' }}>Extracting random observations to calculate statistics without asking everyone.</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        {/* Left: Population Matrix */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Population Matrix (10,000 Voters)
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                "Everyone we are studying"
              </span>
            </div>
            <span className="text-xs text-muted">
              {dots.length} visual units (1 dot ≈ {Math.round(populationSize / totalDisplayDots)} voters)
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(24, 1fr)',
            gap: '3px',
            padding: '0.5rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            maxHeight: '175px',
            overflowY: 'hidden'
          }}>
            {dots.map(d => (
              <div
                key={d.id}
                title={`${d.choice} ${d.isSampled ? '(Sampled)' : ''}`}
                style={{
                  width: '6.5px',
                  height: '6.5px',
                  borderRadius: '50%',
                  background: d.color,
                  opacity: d.isSampled ? 1 : 0.35,
                  transform: d.isSampled ? 'scale(1.35)' : 'scale(1)',
                  boxShadow: d.isSampled ? `0 0 6px ${d.color}` : 'none',
                  transition: 'all 0.25s ease'
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.65rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLOR_PALETTE.optionA }} />
              Opt A ({popPercentages.pctA}%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLOR_PALETTE.optionB }} />
              Opt B ({popPercentages.pctB}%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLOR_PALETTE.optionC }} />
              Opt C ({popPercentages.pctC}%)
            </span>
          </div>
        </div>

        {/* Center: Extraction Mechanism & Live Counter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.5rem' }}>
          <div style={{
            color: 'var(--blue-primary)',
            background: 'var(--blue-light)',
            padding: '0.75rem',
            borderRadius: '50%',
            display: 'flex',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)'
          }}>
            <ArrowRight size={22} className={isSimulating ? 'spin' : ''} />
          </div>

          <button
            onClick={onGenerateSample}
            disabled={isSimulating}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', maxWidth: '220px', boxShadow: 'var(--shadow-glow)' }}
          >
            <Sparkles size={16} />
            {isSimulating ? 'Extracting Sample...' : 'Generate Live Sample'}
          </button>

          <div style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--purple-accent)',
            fontFamily: 'var(--font-mono)'
          }}>
            {animatedCounter.toLocaleString()} observations sampled
          </div>
        </div>

        {/* Right: Sample Collector Container */}
        <div style={{
          background: 'var(--purple-light)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--purple-border)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--purple-accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Sample Container (n = {sampleSize})
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                "Only the smaller selected group"
              </span>
            </div>
            <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
              Live Sample
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            padding: '0.75rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--purple-border)',
            minHeight: '110px',
            maxHeight: '130px',
            overflowY: 'hidden',
            alignContent: 'flex-start'
          }}>
            {sampledDots.map((d, idx) => (
              <div
                key={`sampled-${idx}`}
                title={`Sampled: ${d.choice}`}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: d.color,
                  boxShadow: `0 0 4px ${d.color}`,
                  animation: 'fadeInSlideUp 0.3s ease forwards',
                  animationDelay: `${Math.min(idx * 0.005, 0.5)}s`
                }}
              />
            ))}
          </div>

          <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '0.65rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Option A: <strong className="text-mono" style={{ color: COLOR_PALETTE.optionA }}>{sampleResults ? sampleResults.percentages['Option A'] : '—'}%</strong></span>
            <span>Option B: <strong className="text-mono" style={{ color: COLOR_PALETTE.optionB }}>{sampleResults ? sampleResults.percentages['Option B'] : '—'}%</strong></span>
            <span>Option C: <strong className="text-mono" style={{ color: COLOR_PALETTE.optionC }}>{sampleResults ? sampleResults.percentages['Option C'] : '—'}%</strong></span>
          </div>
        </div>
      </div>

      {/* Key Takeaway Card */}
      <div className="key-takeaway-box">
        <CheckCircle2 size={18} color="var(--emerald-accent)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Key Idea</strong>
          <p>Sampling lets us learn about a large population using a smaller group, saving enormous time and resources.</p>
        </div>
      </div>
    </div>
  );
}
