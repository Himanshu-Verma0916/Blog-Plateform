import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Eye, EyeOff, AlertCircle, UserPlus } from 'lucide-react';
import { MOCK_USERS } from '../../utils/mockData';

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '2rem', background: 'var(--parchment)',
  },
  card: {
    background: 'var(--white)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-lg)', padding: '40px',
    width: '100%', maxWidth: '420px',
    boxShadow: 'var(--shadow-md)', animation: 'fadeIn 0.35s ease',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '8px',
    justifyContent: 'center', marginBottom: '24px',
  },
  logoIcon: {
    width: '36px', height: '36px', background: 'var(--ink)',
    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700,
  },
  heading: {
    fontFamily: 'var(--font-display)', fontSize: '1.5rem',
    fontWeight: 700, textAlign: 'center', marginBottom: '6px',
  },
  sub: { textAlign: 'center', color: 'var(--ink-muted)', fontSize: '0.875rem', marginBottom: '32px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: {},
  label: {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--ink-muted)', marginBottom: '6px',
  },
  input: {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid var(--parchment-deep)', borderRadius: 'var(--radius-md)',
    background: 'var(--white)', color: 'var(--ink)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color var(--transition)',
    fontFamily: 'var(--font-body)',
  },
  passwordWrap: { position: 'relative' },
  eyeBtn: {
    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)',
    display: 'flex', padding: '2px',
  },
  error: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 14px', background: '#fef2f2',
    border: '1px solid #fecaca', borderRadius: 'var(--radius-md)',
    color: '#991b1b', fontSize: '0.85rem',
  },
  btn: {
    background: 'var(--ink)', color: 'var(--parchment)',
    padding: '12px', borderRadius: 'var(--radius-md)',
    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
    border: 'none', transition: 'all var(--transition)',
    fontFamily: 'var(--font-body)', marginTop: '8px',
  },
  divider: {
    display: 'flex', alignItems: 'center', gap: '12px',
    margin: '20px 0',
  },
  dividerLine: { flex: 1, height: '1px', background: 'var(--parchment-deep)' },
  dividerText: { fontSize: '0.75rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap' },
  demoGrid: { display: 'flex', flexDirection: 'column', gap: '8px' },
  demoBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 14px', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', background: 'var(--parchment)',
    cursor: 'pointer', transition: 'all var(--transition)',
    fontFamily: 'var(--font-body)',
  },
  demoLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  demoAvatar: { width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' },
  demoName: { fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink)' },
  demoBadge: {
    fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.04em', padding: '2px 8px', borderRadius: '20px',
  },
};

const roleBadgeColors = {
  admin: { background: '#fef2f2', color: '#c0392b' },
  author: { background: '#f0fdf4', color: '#2d7a4f' },
  viewer: { background: '#eff6ff', color: '#2563eb' },
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 400));
    const result = login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
    setLoading(false);
  };

  const loginAs = (user) => {
    login(user.email, 'demo');
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}><BookOpen size={18} color="#faf8f4" /></div>
          <span style={styles.logoText}>Inkwell</span>
        </div>
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.sub}>Sign in to your account</p>

        <div style={styles.form}>
          {error && (
            <div style={styles.error}>
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <input
              style={styles.input} type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              onFocus={e => e.target.style.borderColor = 'var(--ink)'}
              onBlur={e => e.target.style.borderColor = 'var(--parchment-deep)'}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrap}>
              <input
                style={{ ...styles.input, paddingRight: '40px' }}
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                onBlur={e => e.target.style.borderColor = 'var(--parchment-deep)'}
              />
              <button style={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <button
            style={styles.btn} onClick={handleSubmit} disabled={loading}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--ink-soft)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>Or sign in as a demo user</span>
          <span style={styles.dividerLine} />
        </div>

        <div style={styles.demoGrid}>
          {MOCK_USERS.map(user => (
            <button key={user.id} style={styles.demoBtn} onClick={() => loginAs(user)}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-warm)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--parchment)'}
            >
              <div style={styles.demoLeft}>
                <img src={user.avatar} alt={user.name} style={styles.demoAvatar} />
                <span style={styles.demoName}>{user.name}</span>
              </div>
              <span style={{ ...styles.demoBadge, ...roleBadgeColors[user.role] }}>
                {user.role}
              </span>
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ color: 'var(--ink-muted)', fontSize: '0.875rem' }}>
            New to Inkwell?{' '}
            <Link
              to="/landing"
              style={{
                color: 'var(--ink)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
