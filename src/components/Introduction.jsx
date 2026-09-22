import React from 'react';
import { ArrowRight, Users, Shuffle, PieChart, Calculator, Target, ShieldCheck } from 'lucide-react';
import TooltipIcon from './TooltipIcon';
import { STATISTICAL_GLOSSARY } from '../data/constants';

export default function Introduction() {
  const steps = [
    { title: 'Population', icon: Users, desc: 'Complete group (N = 10,000)' },
    { title: 'Sampling', icon: Shuffle, desc: 'Random / Systematic / Stratified' },
    { title: 'Sample', icon: PieChart, desc: 'Subgroup collected (n = 500)' },
    { title: 'Statistic', icon: Calculator, desc: 'Sample proportion (p̂)' },
    { title: 'Estimate', icon: Target, desc: 'Point estimate of P' },
    { title: 'Confidence Interval', icon: ShieldCheck, desc: '95% Margin of Error' },
  ];

  return (
    <section className="dashboard-section" style={{ marginTop: '0.5rem' }}>
      <div className="card" style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%)',
        border: '1px solid var(--border-light)'
      }}>
        <div style={{ maxWidth: '920px', marginBottom: '1.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
            Foundations of Statistical Inference
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
            How can we estimate the preferences of a large population by studying only a small sample?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
            In statistical opinion polling, surveying all 10,000 voters in a population is often impractical or costly.
            Instead, we collect a mathematically sound random sample, calculate the sample statistic (such as the sample proportion),
            and quantify our confidence using probability distributions.
          </p>
        </div>

        {/* 4 Core Definitions Grid */}
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.15rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--blue-primary)', fontSize: '0.95rem' }}>
                Population
              </span>
              <TooltipIcon text={STATISTICAL_GLOSSARY.population} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-body)' }}>
              The complete group of simulated voters (parameter <em>N</em>).
            </p>
          </div>

          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.15rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--purple-accent)', fontSize: '0.95rem' }}>
                Sample
              </span>
              <TooltipIcon text={STATISTICAL_GLOSSARY.sample} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-body)' }}>
              A smaller subgroup selected from the population (size <em>n</em>).
            </p>
          </div>

          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.15rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--emerald-accent)', fontSize: '0.95rem' }}>
                Estimator
              </span>
              <TooltipIcon text={STATISTICAL_GLOSSARY.pointEstimate} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-body)' }}>
              A sample statistic used to estimate an unknown population parameter.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.15rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--amber-accent)', fontSize: '0.95rem' }}>
                Confidence Interval
              </span>
              <TooltipIcon text={STATISTICAL_GLOSSARY.confidenceInterval} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-body)' }}>
              A range expressing mathematical uncertainty around our point estimate.
            </p>
          </div>
        </div>

        {/* Visual Pipeline Flow */}
        <div style={{
          background: 'var(--blue-light)',
          border: '1px solid var(--blue-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem'
        }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1rem' }}>
            Inference Pipeline Architecture
          </h4>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.title}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    background: '#ffffff',
                    padding: '0.65rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-xs)'
                  }}>
                    <div style={{
                      color: 'var(--blue-primary)',
                      background: 'var(--blue-light)',
                      padding: '0.35rem',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div style={{ color: 'var(--blue-primary)', opacity: 0.6 }}>
                      <ArrowRight size={16} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
