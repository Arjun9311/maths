import React from 'react';
import { Target, CheckCircle2, Award } from 'lucide-react';
import { LEARNING_MISSIONS } from '../data/constants';

export default function MissionsTracker({ completedMissions = [] }) {
  const completedCount = completedMissions.length;
  const totalCount = LEARNING_MISSIONS.length;
  const isAllComplete = completedCount === totalCount;

  return (
    <div className="missions-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{
          background: isAllComplete ? 'var(--emerald-light)' : 'var(--blue-light)',
          color: isAllComplete ? 'var(--emerald-accent)' : 'var(--blue-primary)',
          padding: '0.45rem',
          borderRadius: 'var(--radius-sm)',
          display: 'flex'
        }}>
          {isAllComplete ? <Award size={18} /> : <Target size={18} />}
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Interactive Learning Missions</span>
            <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
              {completedCount} / {totalCount} Completed
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Complete guided tasks to master sampling & inference step-by-step
          </p>
        </div>
      </div>

      {/* Mission Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {LEARNING_MISSIONS.map(m => {
          const isDone = completedMissions.includes(m.id);
          return (
            <div
              key={m.id}
              className={`mission-chip ${isDone ? 'completed' : ''}`}
              title={m.desc}
            >
              <CheckCircle2 size={13} color={isDone ? 'var(--emerald-accent)' : 'var(--text-tertiary)'} />
              <span>{m.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
