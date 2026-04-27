import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const styles = {
  footer: {
    background: 'var(--ink)', color: 'var(--parchment)',
    padding: '48px 2rem 32px',
    marginTop: '80px',
  },
  inner: {
    maxWidth: '1200px', margin: '0 auto',
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
    gap: '40px',
  },
  brand: {},
  logo: {
    display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px',
  },
  logoText: {
    fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
  },
  tagline: { fontSize: '0.875rem', color: 'rgba(250,248,244,0.5)', lineHeight: 1.6 },
  colTitle: {
    fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.08em', color: 'rgba(250,248,244,0.4)',
    marginBottom: '16px',
  },
  links: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' },
  link: {
    fontSize: '0.875rem', color: 'rgba(250,248,244,0.7)',
    textDecoration: 'none', transition: 'color var(--transition)',
  },
  bottom: {
    maxWidth: '1200px', margin: '40px auto 0',
    paddingTop: '24px', borderTop: '1px solid rgba(250,248,244,0.1)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  bottomText: { fontSize: '0.8rem', color: 'rgba(250,248,244,0.35)' },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.brand}>
          <div style={styles.logo}>
            <BookOpen size={18} color="var(--parchment)" />
            <span style={styles.logoText}>Inkwell</span>
          </div>
          <p style={styles.tagline}>A platform for thoughtful writing and careful reading.</p>
        </div>
        <div>
          <h4 style={styles.colTitle}>Explore</h4>
          <ul style={styles.links}>
            {['Technology', 'Essays', 'Travel', 'Culture'].map(c => (
              <li key={c}>
                <Link to={`/?category=${c}`} style={styles.link}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--parchment)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,248,244,0.7)'}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={styles.colTitle}>Platform</h4>
          <ul style={styles.links}>
            {[['Home', '/'], ['Write', '/new-post'], ['Sign In', '/login']].map(([label, href]) => (
              <li key={label}>
                <Link to={href} style={styles.link}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--parchment)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,248,244,0.7)'}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={styles.bottom}>
        <span style={styles.bottomText}>© 2025 Inkwell. Built with React & Supabase.</span>
        <span style={styles.bottomText}>Powered by Google AI</span>
      </div>
    </footer>
  );
}
