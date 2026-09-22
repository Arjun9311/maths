import React from 'react';
import { BookOpen, Shuffle, Layers, Sparkles, Target, ShieldCheck, GitCommit, Network, GitPullRequest } from 'lucide-react';

export default function EducationalPanel() {
  const concepts = [
    {
      title: 'Sampling',
      icon: Shuffle,
      color: 'var(--blue-primary)',
      summary: 'We study a smaller sample instead of the entire population.',
      detail: 'Selecting representative observations via SRS, Systematic, or Stratified protocols allows us to conduct inference without costly exhaustive censuses.'
    },
    {
      title: 'Sampling Distribution',
      icon: Layers,
      color: 'var(--purple-accent)',
      summary: 'We examine how a statistic changes across repeated samples.',
      detail: 'Any single sample produces a sample statistic (like p̂). Drawing repeated independent samples demonstrates how estimates cluster around the true parameter.'
    },
    {
      title: 'Central Limit Theorem',
      icon: Sparkles,
      color: 'var(--blue-primary)',
      summary: 'Repeated sample statistics form a normal bell curve under standard conditions.',
      detail: 'As sample size n increases, the distribution of sample averages becomes bell-shaped, and standard error shrinks by a factor of 1/√n.'
    },
    {
      title: 'Point Estimation',
      icon: Target,
      color: 'var(--emerald-accent)',
      summary: 'A single statistic is used to estimate a population parameter.',
      detail: 'The sample proportion p̂ serves as an unbiased best-guess point estimate for the unknown population parameter P.'
    },
    {
      title: 'Interval Estimation',
      icon: ShieldCheck,
      color: 'var(--amber-accent)',
      summary: 'A range is used to communicate uncertainty around an estimate.',
      detail: 'Confidence intervals convey the margin of error at a specified confidence level (e.g. 95%), reflecting long-run coverage across repeated sampling.'
    },
    {
      title: 'Student’s t-Distribution',
      icon: GitCommit,
      color: 'var(--purple-accent)',
      summary: 'Useful for mean inference when population variability is unknown.',
      detail: 'With heavier tails than the normal curve, the t-distribution compensates for uncertainty when estimating the population standard deviation s from small samples.'
    },
    {
      title: 'Chi-Square Distribution (χ²)',
      icon: Network,
      color: 'var(--amber-accent)',
      summary: 'Used in categorical goodness-of-fit and independence procedures.',
      detail: 'Goodness-of-fit tests compare observed sample counts against expected frequencies to determine if polling data conforms to theoretical demographic distributions.'
    },
    {
      title: 'F-Distribution',
      icon: GitPullRequest,
      color: 'var(--purple-accent)',
      summary: 'Used in variance ratios and ANOVA-related procedures.',
      detail: 'Formed by ratios of Mean Squares to compare continuous variables (such as voter ages) across multiple categorical preference groups simultaneously.'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <BookOpen size={20} color="var(--blue-primary)" />
          <div>
            <div className="card-title">What Did We Learn?</div>
            <div className="card-subtitle">Summary of core statistical concepts demonstrated visually in this simulator</div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem'
      }}>
        {concepts.map(c => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              style={{
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <div style={{
                    color: c.color,
                    background: 'var(--bg-card)',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    border: '1px solid var(--border-light)'
                  }}>
                    <Icon size={16} />
                  </div>
                  <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {c.title}
                  </h4>
                </div>

                <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                  "{c.summary}"
                </div>
              </div>

              <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginTop: '0.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem' }}>
                {c.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
