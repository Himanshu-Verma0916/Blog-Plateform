import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const styles = {
  wrap: { display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' },
  btn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--parchment-deep)', background: 'var(--white)',
    color: 'var(--ink)', cursor: 'pointer', fontSize: '0.875rem',
    fontWeight: 500, transition: 'all var(--transition)',
    fontFamily: 'var(--font-body)',
  },
  activePage: {
    background: 'var(--ink)', color: 'var(--parchment)',
    borderColor: 'var(--ink)',
  },
  disabled: { opacity: 0.35, cursor: 'not-allowed', pointerEvents: 'none' },
};

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={styles.wrap}>
      <button
        style={{ ...styles.btn, ...(currentPage === 1 ? styles.disabled : {}) }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        onMouseEnter={e => { if (currentPage !== 1) e.currentTarget.style.background = 'var(--parchment-warm)'; }}
        onMouseLeave={e => { if (currentPage !== 1) e.currentTarget.style.background = 'var(--white)'; }}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map(page => (
        <button
          key={page}
          style={{ ...styles.btn, ...(currentPage === page ? styles.activePage : {}) }}
          onClick={() => onPageChange(page)}
          onMouseEnter={e => { if (currentPage !== page) e.currentTarget.style.background = 'var(--parchment-warm)'; }}
          onMouseLeave={e => { if (currentPage !== page) e.currentTarget.style.background = 'var(--white)'; }}
        >
          {page}
        </button>
      ))}

      <button
        style={{ ...styles.btn, ...(currentPage === totalPages ? styles.disabled : {}) }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        onMouseEnter={e => { if (currentPage !== totalPages) e.currentTarget.style.background = 'var(--parchment-warm)'; }}
        onMouseLeave={e => { if (currentPage !== totalPages) e.currentTarget.style.background = 'var(--white)'; }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
