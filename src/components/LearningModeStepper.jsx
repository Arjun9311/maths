import React from 'react';
import { Check, ChevronRight, ChevronLeft, BookOpen, X } from 'lucide-react';

export default function LearningModeStepper({
  currentStep,
  setCurrentStep,
  totalSteps = 9,
  onExitLearningMode
}) {
  const stepTitles = [
    { num: 1, name: 'Setup Population', desc: 'Define simulated voter electorate (N = 10,000)', target: 'population-section' },
    { num: 2, name: 'Set Sample Size', desc: 'Select sample size (n = 500, 5%)', target: 'sample-controls-section' },
    { num: 3, name: 'Select Method', desc: 'Choose SRS, Systematic, or Stratified', target: 'sampling-method' },
    { num: 4, name: 'Generate Sample', desc: 'Extract observations without replacement', target: 'population-visualizer-section' },
    { num: 5, name: 'Calculate Statistic', desc: 'Compute sample proportion p̂ and mean x̄', target: 'sample-results-section' },
    { num: 6, name: 'Estimate Population', desc: 'Project sample proportion onto population N', target: 'estimation-section' },
    { num: 7, name: 'Confidence Interval', desc: 'Construct 95% margin of error bounds', target: 'ci-section' },
    { num: 8, name: 'Sampling Distribution', desc: 'Observe repeated independent draws', target: 'sampling-dist-section' },
    { num: 9, name: 'Central Limit Theorem', desc: 'See variance shrink proportional to 1/√n', target: 'clt-section' }
  ];

  const current = stepTitles[currentStep - 1] || stepTitles[0];

  const goToStep = (stepNum) => {
    setCurrentStep(stepNum);
    const target = stepTitles[stepNum - 1]?.target;
    if (target) {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '2px solid var(--blue-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: '1rem 1.25rem',
      marginBottom: '1.75rem',
      boxShadow: 'var(--shadow-glow)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="badge badge-blue">
            <BookOpen size={12} />
            Classroom Mode
          </span>
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
            Step {currentStep} of {totalSteps}: {current.name}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => goToStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="btn btn-outline btn-sm"
          >
            <ChevronLeft size={14} />
            Previous
          </button>
          <button
            onClick={() => goToStep(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep === totalSteps}
            className="btn btn-primary btn-sm"
          >
            Next
            <ChevronRight size={14} />
          </button>
          <button
            onClick={onExitLearningMode}
            className="btn btn-outline btn-sm"
            title="Exit Classroom Mode"
            style={{ padding: '0.35rem 0.5rem' }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
        {current.desc}
      </p>

      {/* Stepper Progress Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
        {stepTitles.map((step) => {
          const isDone = step.num < currentStep;
          const isCurrent = step.num === currentStep;

          return (
            <button
              key={step.num}
              onClick={() => goToStep(step.num)}
              style={{
                flex: '1 1 0',
                minWidth: '28px',
                height: '8px',
                borderRadius: '4px',
                background: isDone ? 'var(--emerald-accent)' : isCurrent ? 'var(--blue-primary)' : 'var(--bg-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isCurrent ? '0 0 6px var(--blue-primary)' : 'none'
              }}
              title={`Step ${step.num}: ${step.name}`}
            />
          );
        })}
      </div>
    </div>
  );
}
