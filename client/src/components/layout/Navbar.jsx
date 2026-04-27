import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PenLine, Menu, X, BookOpen, LogOut, User, Settings, ChevronDown } from 'lucide-react';

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(250,248,244,0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--parchment-deep)',
    padding: '0 2rem',
  },
  inner: {
    maxWidth: '1200px', margin: '0 auto',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '8px',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '32px', height: '32px',
    background: 'var(--ink)', borderRadius: '6px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'var(--font-display)', fontSize: '1.35rem',
    fontWeight: 700, color: 'var(--ink)',
    letterSpacing: '-0.02em',
  },
  navLinks: {
    display: 'flex', alignItems: 'center', gap: '2rem',
    listStyle: 'none',
  },
  navLink: {
    fontSize: '0.875rem', fontWeight: 500,
    color: 'var(--ink-muted)', textDecoration: 'none',
    transition: 'color var(--transition)',
  },
  navLinkActive: {
    color: 'var(--ink)',
  },
  actions: {
    display: 'flex', alignItems: 'center', gap: '12px',
  },
  writeBtn: {
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'var(--ink)', color: 'var(--parchment)',
    padding: '8px 16px', borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem', fontWeight: 500,
    transition: 'all var(--transition)',
    textDecoration: 'none',
    border: 'none', cursor: 'pointer',
  },
  userMenu: { position: 'relative' },
  userBtn: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '6px 12px 6px 6px',
    borderRadius: 'var(--radius-md)',
    background: 'transparent',
    border: '1px solid var(--parchment-deep)',
    cursor: 'pointer', transition: 'all var(--transition)',
  },
  avatar: {
    width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover',
  },
  userName: { fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)' },
  dropdown: {
    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
    background: 'var(--white)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)',
    minWidth: '200px', overflow: 'hidden',
    animation: 'fadeIn 0.15s ease',
  },
  dropdownHeader: {
    padding: '12px 16px', borderBottom: '1px solid var(--parchment-warm)',
    background: 'var(--parchment)',
  },
  dropdownName: { fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' },
  dropdownRole: {
    fontSize: '0.75rem', color: 'var(--ink-muted)',
    textTransform: 'capitalize',
    display: 'inline-block', marginTop: '2px',
    background: 'var(--parchment-deep)',
    padding: '1px 8px', borderRadius: '20px',
  },
  dropdownItem: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 16px', fontSize: '0.875rem',
    color: 'var(--ink-soft)', cursor: 'pointer',
    transition: 'background var(--transition)',
    textDecoration: 'none', background: 'none',
    border: 'none', width: '100%', textAlign: 'left',
  },
  loginBtn: {
    padding: '8px 16px', borderRadius: 'var(--radius-md)',
    background: 'transparent', border: '1px solid var(--parchment-deep)',
    fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)',
    cursor: 'pointer', transition: 'all var(--transition)',
    textDecoration: 'none',
  },
  roleBadge: {
    fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.05em', padding: '2px 6px',
    borderRadius: '4px', marginLeft: '4px',
  },
};

const roleBadgeColors = {
  admin: { background: '#fef2f2', color: '#c0392b' },
  author: { background: '#f0fdf4', color: '#2d7a4f' },
  viewer: { background: '#eff6ff', color: '#2563eb' },
};

export default function Navbar() {
  const { currentUser, logout, hasPermission } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <BookOpen size={16} color="#faf8f4" />
          </div>
          <span style={styles.logoText}>Inkwell</span>
        </Link>

        <ul style={styles.navLinks}>
          <li>
            <Link to="/" style={{ ...styles.navLink, ...(isActive('/') && !isActive('/post') && !isActive('/new') && !isActive('/admin') ? styles.navLinkActive : {}) }}>
              Blog
            </Link>
          </li>
          {currentUser?.role === 'admin' && (
            <li>
              <Link to="/admin" style={{ ...styles.navLink, ...(isActive('/admin') ? styles.navLinkActive : {}) }}>
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div style={styles.actions}>
          {currentUser ? (
            <>
              {hasPermission('canCreate') && (
                <Link to="/new-post" style={styles.writeBtn}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--ink-soft)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
                >
                  <PenLine size={14} />
                  Write
                </Link>
              )}
              <div style={styles.userMenu}>
                <button style={styles.userBtn} onClick={() => setMenuOpen(!menuOpen)}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-warm)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <img src={currentUser.avatar} alt={currentUser.name} style={styles.avatar} />
                  <span style={styles.userName}>{currentUser.name.split(' ')[0]}</span>
                  <span style={{ ...styles.roleBadge, ...roleBadgeColors[currentUser.role] }}>
                    {currentUser.role}
                  </span>
                  <ChevronDown size={12} color="var(--ink-muted)" />
                </button>

                {menuOpen && (
                  <div style={styles.dropdown}>
                    <div style={styles.dropdownHeader}>
                      <div style={styles.dropdownName}>{currentUser.name}</div>
                      <span style={styles.dropdownRole}>{currentUser.role}</span>
                    </div>
                    {currentUser.role === 'admin' && (
                      <Link to="/admin" style={styles.dropdownItem}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <Settings size={15} /> Dashboard
                      </Link>
                    )}
                    <button style={styles.dropdownItem} onClick={handleLogout}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" style={styles.loginBtn}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-warm)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
