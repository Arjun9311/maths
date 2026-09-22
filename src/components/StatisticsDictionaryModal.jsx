import React, { useState, useMemo } from 'react';
import { X, Book, Search, Sparkles, Utensils, CheckCircle } from 'lucide-react';
import { STATISTICS_DICTIONARY, REAL_LIFE_ANALOGIES } from '../data/constants';

export default function StatisticsDictionaryModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Basics', 'Estimation', 'Inference', 'Theory', 'Distributions'];

  const filteredEntries = useMemo(() => {
    return STATISTICS_DICTIONARY.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.analogy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="edu-modal-backdrop" onClick={onClose}>
      <div className="edu-modal-card" style={{ maxWidth: '820px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="edu-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--blue-primary), var(--purple-accent))',
              color: '#ffffff',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex'
            }}>
              <Book size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Interactive Statistics Dictionary
              </h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                Plain-English definitions & real-life analogies (Zero textbook jargon)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.35rem 0.5rem', borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              placeholder="Search statistical terms or analogies (e.g. population, soup, parameter)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.4rem', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="edu-modal-body" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
          {filteredEntries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              No terms match your search query. Try another term!
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {filteredEntries.map(item => (
                <div
                  key={item.term}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {item.term}
                      </h4>
                      <span className="badge badge-blue" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        {item.symbol}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                      {item.definition}
                    </p>

                    {/* Analogy Box */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.04) 100%)',
                      border: '1px solid var(--amber-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.65rem 0.85rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      marginBottom: '0.65rem'
                    }}>
                      <Utensils size={15} color="var(--amber-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
                        <strong style={{ color: 'var(--amber-accent)', display: 'block', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                          Real-Life Analogy
                        </strong>
                        {item.analogy}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem' }}>
                    <strong>Simulator Example:</strong> {item.example}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="edu-modal-footer">
          <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
            Showing {filteredEntries.length} statistical terms
          </span>
          <button
            onClick={onClose}
            className="btn btn-primary btn-sm"
          >
            Close Dictionary
          </button>
        </div>
      </div>
    </div>
  );
}
