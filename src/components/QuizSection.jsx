import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Sparkles, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/constants';

export default function QuizSection() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
  };

  const answeredCount = Object.keys(submittedAnswers).length;
  const correctCount = Object.keys(submittedAnswers).filter(qId => {
    const q = QUIZ_QUESTIONS.find(item => item.id === Number(qId));
    return q && q.options[selectedAnswers[qId]]?.isCorrect;
  }).length;

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div className="card-header">
        <div className="card-title-group">
          <HelpCircle size={20} color="var(--purple-accent)" />
          <div>
            <div className="card-title">Can You Explain It? (Self-Check Quiz)</div>
            <div className="card-subtitle">Quick conceptual checks with instant feedback — no pressure, just learning</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {answeredCount > 0 && (
            <span className="badge badge-purple">
              Score: {correctCount} / {QUIZ_QUESTIONS.length}
            </span>
          )}
          <button
            onClick={handleResetQuiz}
            className="btn btn-outline btn-sm"
            title="Reset Quiz"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {QUIZ_QUESTIONS.map(q => {
          const isSubmitted = submittedAnswers[q.id];
          const selectedIdx = selectedAnswers[q.id];

          return (
            <div
              key={q.id}
              style={{
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--blue-primary)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Question {q.id}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem', lineHeight: 1.45 }}>
                  {q.question}
                </h4>

                {/* Options */}
                <div>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedIdx === optIdx;
                    let btnClass = 'quiz-option-btn';
                    if (isSubmitted) {
                      if (opt.isCorrect) btnClass += ' correct';
                      else if (isSelected && !opt.isCorrect) btnClass += ' incorrect';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={btnClass}
                        disabled={isSubmitted}
                      >
                        <span style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--bg-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span style={{ flex: 1 }}>{opt.text}</span>
                        {isSubmitted && opt.isCorrect && <CheckCircle2 size={16} color="var(--emerald-accent)" />}
                        {isSubmitted && isSelected && !opt.isCorrect && <XCircle size={16} color="var(--rose-accent)" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback */}
              {isSubmitted && (
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.75rem',
                  border: '1px solid var(--border-light)',
                  marginTop: '0.75rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-body)',
                  animation: 'fadeInSlideUp 0.2s ease'
                }}>
                  <strong style={{ color: q.options[selectedIdx]?.isCorrect ? 'var(--emerald-accent)' : 'var(--amber-accent)', display: 'block', marginBottom: '0.2rem' }}>
                    {q.options[selectedIdx]?.isCorrect ? '✓ Spot on!' : '💡 Learning opportunity:'}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
