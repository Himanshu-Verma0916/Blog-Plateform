import React from 'react';
import { Search, X } from 'lucide-react';

const styles = {
  wrap: { position: 'relative', width: '100%', maxWidth: '480px' },
  input: {
    width: '100%', padding: '10px 16px 10px 40px',
    border: '1.5px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--white)', color: 'var(--ink)',
    fontSize: '0.875rem', outline: 'none',
    transition: 'border-color var(--transition)',
    fontFamily: 'var(--font-body)',
  },
  icon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' },
  clear: {
    position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)',
    display: 'flex', alignItems: 'center', padding: '2px',
    borderRadius: '50%', transition: 'color var(--transition)',
  },
};

export default function SearchBar({ value, onChange, placeholder = 'Search posts...' }) {
  return (
    <div style={styles.wrap}>
      <span style={styles.icon}>
        <Search size={15} color="var(--ink-muted)" />
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
        onFocus={e => e.target.style.borderColor = 'var(--ink)'}
        onBlur={e => e.target.style.borderColor = 'var(--parchment-deep)'}
      />
      {value && (
        <button style={styles.clear} onClick={() => onChange('')}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
