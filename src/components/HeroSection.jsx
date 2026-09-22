import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Play, Eye } from 'lucide-react';

export default function HeroSection({ onStartSimulation, onExploreCLT }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Canvas size
    const width = (canvas.width = canvas.parentElement.clientWidth || 500);
    const height = (canvas.height = 240);

    // Generate ~400 visual dots representing the 10,000 voter population
    const totalDots = 380;
    const sampleSize = 38; // ~10% sample
    const dots = [];

    for (let i = 0; i < totalDots; i++) {
      // Option choices: A (blue), B (purple), C (green)
      const rand = Math.random();
      let color = '#3b82f6';
      if (rand > 0.48 && rand <= 0.80) color = '#8b5cf6';
      else if (rand > 0.80) color = '#10b981';

      dots.push({
        x: Math.random() * (width * 0.58) + 15,
        y: Math.random() * (height - 30) + 15,
        baseX: 0,
        baseY: 0,
        targetX: 0,
        targetY: 0,
        color: color,
        isSampled: i < sampleSize,
        inSampleBucket: false,
        size: i < sampleSize ? 3.5 : 2.2,
        speed: 0.02 + Math.random() * 0.02
      });
      dots[i].baseX = dots[i].x;
      dots[i].baseY = dots[i].y;
      dots[i].targetX = width * 0.72 + Math.random() * (width * 0.22);
      dots[i].targetY = Math.random() * (height - 50) + 25;
    }

    let progress = 0;
    let cycleTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      cycleTime += 0.015;

      // Pulse progress between 0 (in population) and 1 (drawn into sample)
      progress = (Math.sin(cycleTime) + 1) / 2; // 0 to 1

      // 1. Draw Population bounding area (Left)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.04)';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(10, 10, width * 0.60, height - 20, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.fillText('POPULATION UNIVERSE (N = 10,000)', 24, 30);

      // 2. Draw Sample Collector bounding area (Right)
      ctx.fillStyle = 'rgba(124, 58, 237, 0.05)';
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.3)';
      ctx.beginPath();
      ctx.roundRect(width * 0.68, 10, width * 0.30, height - 20, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#7c3aed';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('SAMPLE (n = 500)', width * 0.68 + 14, 30);

      // 3. Draw connecting sampling beam
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(width * 0.60, height / 2);
      ctx.lineTo(width * 0.68, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Render dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let curX = dot.baseX;
        let curY = dot.baseY;

        if (dot.isSampled) {
          // Interpolate position from population to sample container based on cycle progress
          const smoothP = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          curX = dot.baseX + (dot.targetX - dot.baseX) * smoothP;
          curY = dot.baseY + (dot.targetY - dot.baseY) * smoothP;

          // Glowing halo around sampled points
          ctx.beginPath();
          ctx.arc(curX, curY, dot.size + 2, 0, Math.PI * 2);
          ctx.fillStyle = dot.color + '44';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(curX, curY, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="dashboard-section" style={{ marginTop: '1rem' }}>
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)',
        border: '1px solid var(--border-light)',
        padding: '2rem 2rem 1.75rem 2rem',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          {/* Left Text Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <span className="badge badge-blue">
                <Sparkles size={12} />
                Visual Statistics Laboratory
              </span>
              <span className="badge badge-purple">Interactive Inference</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.15,
              marginBottom: '0.85rem',
              letterSpacing: '-0.03em'
            }}>
              Understand Sampling. <br />
              <span style={{
                background: 'linear-gradient(135deg, var(--blue-primary), var(--purple-accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                See Estimation.
              </span>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '520px' }}>
              Explore how a small random sample lets us accurately estimate properties of a large voter electorate.
              Watch the process unfold live: from <strong>10,000 population points</strong> to <strong>sample statistics</strong> and <strong>95% confidence intervals</strong>.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                onClick={onStartSimulation}
                className="btn btn-primary btn-lg"
              >
                <Play size={18} />
                Generate Live Sample
              </button>
              <button
                onClick={onExploreCLT}
                className="btn btn-outline btn-lg"
              >
                <Eye size={18} />
                Explore Central Limit Theorem
              </button>
            </div>
          </div>

          {/* Right Animated Particle Canvas */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: '1rem',
            boxShadow: 'var(--shadow-inner)'
          }}>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '240px', display: 'block' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', padding: '0 0.5rem' }}>
              <span>● Option A (48%)</span>
              <span>● Option B (32%)</span>
              <span>● Option C (20%)</span>
              <span style={{ color: 'var(--purple-accent)', fontWeight: 600 }}>Animated Sampling Extraction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
