import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Compass, Sparkles } from 'lucide-react';
import { COLOR_PALETTE } from '../data/constants';

export default function EducationalIntro({ onStartTutorial, onSkipToSimulator }) {
  const [activeStoryStep, setActiveStoryStep] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(true);
  const canvasRef = useRef(null);

  const storySteps = [
    {
      badge: "01. The Challenge",
      title: "10,000 People in Our Electorate",
      subtitle: "Studying everyone can be difficult, expensive, or impossible.",
      subtext: "Imagine trying to interview all 10,000 voters. Conducting a full census takes enormous time and money.",
      statusText: "Population Universe: 10,000 voters"
    },
    {
      badge: "02. The Action",
      title: "So We Take a Random Sample",
      subtitle: "We select a smaller representative group of 500 observations.",
      subtext: "By using randomization, every voter has an equal chance of being chosen, eliminating bias.",
      statusText: "Selected 500 dots (5% sample)"
    },
    {
      badge: "03. The Calculation",
      title: "We Calculate a Sample Statistic",
      subtitle: "From these 500 people, we find 48.2% support Option A.",
      subtext: "This number is our point estimate. We use this known sample statistic to estimate the unknown population parameter.",
      statusText: "Sample Statistic: p̂ = 48.2%"
    },
    {
      badge: "04. Measuring Uncertainty",
      title: "And Because Samples Vary, We Measure Uncertainty",
      subtitle: "A 95% Confidence Interval provides a safe, realistic range.",
      subtext: "Instead of claiming the answer is exactly 48.2%, we say: 'We are 95% confident the true value is between 44.1% and 52.3%'.",
      statusText: "Confidence Interval: [44.1% — 52.3%]"
    },
    {
      badge: "05. Core Concept",
      title: "The Statistical Journey",
      subtitle: "POPULATION → SAMPLE → ESTIMATE → UNCERTAINTY",
      subtext: "You are now ready to explore! Test different sample sizes, sampling methods, and repeated distributions.",
      statusText: "Ready to Explore"
    }
  ];

  // Auto-play through story steps if user hasn't paused
  useEffect(() => {
    if (!isPlayingAuto) return;
    const interval = setInterval(() => {
      setActiveStoryStep(prev => (prev + 1) % storySteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlayingAuto, storySteps.length]);

  // Animated canvas reflecting the current story step
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = (canvas.width = canvas.parentElement.clientWidth || 550);
    const height = (canvas.height = 280);

    // Create 450 visual dots representing the 10,000 population
    const totalDots = 420;
    const sampleSize = 42; // ~10%
    const dots = [];

    for (let i = 0; i < totalDots; i++) {
      const rand = Math.random();
      let color = COLOR_PALETTE.optionA;
      if (rand > 0.48 && rand <= 0.80) color = COLOR_PALETTE.optionB;
      else if (rand > 0.80) color = COLOR_PALETTE.optionC;

      dots.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        origX: 0,
        origY: 0,
        color: color,
        isSampled: i < sampleSize,
        radius: 2.2,
        alpha: 0.6
      });
      dots[i].origX = dots[i].x;
      dots[i].origY = dots[i].y;
    }

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      // Stage behavior based on activeStoryStep:
      // Step 0: All dots floating scattered (10,000 people)
      // Step 1: 500 dots glow brightly, others dim
      // Step 2: 500 dots gather into center cluster (forming sample)
      // Step 3: Brackets expand around center cluster (confidence interval)
      // Step 4: Flow pipeline highlights

      const step = activeStoryStep;

      // Draw background ambient grid
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 20; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 20; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let targetX = dot.origX;
        let targetY = dot.origY;
        let currentRadius = dot.radius;
        let alpha = 0.5;

        if (step === 0) {
          // Scattered, gentle floating
          targetX = dot.origX + Math.sin(t + i) * 3;
          targetY = dot.origY + Math.cos(t + i * 0.7) * 3;
          alpha = 0.7;
        } else if (step === 1) {
          // Highlight sampled dots
          if (dot.isSampled) {
            currentRadius = 4.5;
            alpha = 1;
          } else {
            alpha = 0.15;
          }
        } else if (step === 2 || step === 3 || step === 4) {
          // Move sampled dots towards center calculation hub
          if (dot.isSampled) {
            const angle = (i / sampleSize) * Math.PI * 2;
            const clusterRadius = 35 + Math.sin(t * 2 + i) * 6;
            targetX = width / 2 + Math.cos(angle) * clusterRadius;
            targetY = height / 2 + Math.sin(angle) * clusterRadius;
            currentRadius = 4.0;
            alpha = 1;
          } else {
            alpha = 0.08;
          }
        }

        ctx.beginPath();
        ctx.arc(targetX, targetY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Extra halo for sampled in steps 1+
        if (dot.isSampled && step >= 1) {
          ctx.beginPath();
          ctx.arc(targetX, targetY, currentRadius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = dot.color;
          ctx.globalAlpha = 0.35;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;

      // Step 2 & 3 visuals: Center statistic readout
      if (step >= 2) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(width / 2 - 65, height / 2 - 24, 130, 48, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('p̂ = 48.2%', width / 2, height / 2 + 5);

        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('Sample Statistic', width / 2, height / 2 + 18);
      }

      // Step 3 visuals: Expanding confidence interval brackets
      if (step >= 3) {
        const bracketSpread = 110 + Math.sin(t * 3) * 6;
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 3;

        // Left bracket: [
        ctx.beginPath();
        ctx.moveTo(width / 2 - bracketSpread + 12, height / 2 - 32);
        ctx.lineTo(width / 2 - bracketSpread, height / 2 - 32);
        ctx.lineTo(width / 2 - bracketSpread, height / 2 + 32);
        ctx.lineTo(width / 2 - bracketSpread + 12, height / 2 + 32);
        ctx.stroke();

        // Right bracket: ]
        ctx.beginPath();
        ctx.moveTo(width / 2 + bracketSpread - 12, height / 2 - 32);
        ctx.lineTo(width / 2 + bracketSpread, height / 2 - 32);
        ctx.lineTo(width / 2 + bracketSpread, height / 2 + 32);
        ctx.lineTo(width / 2 + bracketSpread - 12, height / 2 + 32);
        ctx.stroke();

        ctx.fillStyle = '#7c3aed';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('95% Confidence Interval [44.1%, 52.3%]', width / 2, height / 2 + 45);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeStoryStep]);

  return (
    <div id="hero-intro-section" className="card" style={{
      background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)',
      border: '1px solid var(--border-light)',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Banner Tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-blue">
            <Sparkles size={13} />
            Visual Statistics Journey
          </span>
          <span className="badge badge-purple">
            Beginner Friendly
          </span>
        </div>

        {/* Step dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {storySteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveStoryStep(idx);
                setIsPlayingAuto(false);
              }}
              style={{
                width: activeStoryStep === idx ? '22px' : '8px',
                height: '8px',
                borderRadius: 'var(--radius-pill)',
                background: activeStoryStep === idx ? 'var(--blue-primary)' : 'var(--border-medium)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              title={`Jump to Step ${idx + 1}`}
            />
          ))}
          <button
            onClick={() => setIsPlayingAuto(!isPlayingAuto)}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', marginLeft: '0.5rem' }}
          >
            {isPlayingAuto ? 'Pause Animation' : 'Auto Play'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        {/* Left Story Content */}
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--blue-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
            {storySteps[activeStoryStep].badge}
          </div>

          <h1 style={{
            fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginBottom: '0.75rem'
          }}>
            Sampling & Estimation — Made Visual
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--purple-accent)',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}>
            "How can we learn about 10,000 people by studying only 500?"
          </p>

          <div style={{
            background: 'var(--bg-app)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            border: '1px solid var(--border-light)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {storySteps[activeStoryStep].title}
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
              {storySteps[activeStoryStep].subtitle}
            </p>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {storySteps[activeStoryStep].subtext}
            </p>
          </div>

          {/* Core Concept Sequence Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: activeStoryStep >= 0 ? 'var(--blue-primary)' : 'inherit' }}>POPULATION</span>
            <ArrowRight size={12} />
            <span style={{ color: activeStoryStep >= 1 ? 'var(--blue-primary)' : 'inherit' }}>SAMPLE</span>
            <ArrowRight size={12} />
            <span style={{ color: activeStoryStep >= 2 ? 'var(--emerald-accent)' : 'inherit' }}>ESTIMATE</span>
            <ArrowRight size={12} />
            <span style={{ color: activeStoryStep >= 3 ? 'var(--purple-accent)' : 'inherit' }}>UNCERTAINTY</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={onStartTutorial}
              className="btn btn-primary btn-lg"
              style={{ boxShadow: 'var(--shadow-glow)' }}
            >
              <Compass size={18} />
              Start Interactive Tutorial
            </button>
            <button
              onClick={onSkipToSimulator}
              className="btn btn-outline btn-lg"
            >
              Skip to Simulator
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Animated Visual Canvas */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          padding: '1rem',
          boxShadow: 'var(--shadow-inner)',
          position: 'relative'
        }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '280px', display: 'block' }}
          />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginTop: '0.75rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--blue-primary)' }}>
              <CheckCircle2 size={13} />
              {storySteps[activeStoryStep].statusText}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  setActiveStoryStep(prev => (prev > 0 ? prev - 1 : storySteps.length - 1));
                  setIsPlayingAuto(false);
                }}
                className="btn btn-outline btn-sm"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  setActiveStoryStep(prev => (prev + 1) % storySteps.length);
                  setIsPlayingAuto(false);
                }}
                className="btn btn-primary btn-sm"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
