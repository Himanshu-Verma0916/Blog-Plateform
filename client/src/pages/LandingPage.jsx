import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, UserPlus, LogIn, Shield, PenTool, Eye } from 'lucide-react';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, var(--parchment) 0%, var(--parchment-warm) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    animation: 'fadeIn 0.6s ease',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  logoIcon: {
    width: '48px',
    height: '48px',
    background: 'var(--ink)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--ink)',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, var(--ink) 0%, var(--accent) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'var(--ink-muted)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  roleSection: {
    marginBottom: '3rem',
    animation: 'fadeIn 0.8s ease 0.2s backwards',
  },
  sectionTitle: {
    textAlign: 'center',
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    fontWeight: 600,
    marginBottom: '2rem',
    color: 'var(--ink)',
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  roleCard: {
    background: 'var(--white)',
    border: '2px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-lg)',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  roleCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: 'var(--shadow-lg)',
    borderColor: 'var(--ink)',
  },
  roleIcon: {
    width: '64px',
    height: '64px',
    background: 'var(--parchment)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  roleName: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--ink)',
  },
  roleDescription: {
    color: 'var(--ink-muted)',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  roleFeatures: {
    textAlign: 'left',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '0.5rem',
    color: 'var(--ink-soft)',
    fontSize: '0.9rem',
  },
  actionSection: {
    textAlign: 'center',
    animation: 'fadeIn 1s ease 0.4s backwards',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all var(--transition)',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'var(--font-body)',
  },
  btnPrimary: {
    background: 'var(--ink)',
    color: 'var(--parchment)',
  },
  btnSecondary: {
    background: 'transparent',
    color: 'var(--ink)',
    border: '2px solid var(--ink)',
  },
  btnHover: {
    transform: 'translateY(-2px)',
    boxShadow: 'var(--shadow-md)',
  },
  selectedRole: {
    borderColor: 'var(--accent)',
    background: 'linear-gradient(135deg, var(--white) 0%, var(--parchment) 100%)',
  },
  badge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'var(--accent)',
    color: 'var(--white)',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
};

const ROLES = {
  admin: {
    name: 'Administrator',
    icon: Shield,
    description: 'Complete control over the blog platform',
    features: [
      'Manage all users and permissions',
      'Edit and delete any content',
      'Monitor platform activity',
      'System configuration',
    ],
    color: '#c0392b',
  },
  author: {
    name: 'Author',
    icon: PenTool,
    description: 'Create and manage your own blog posts',
    features: [
      'Write and publish posts',
      'Edit your own content',
      'Manage comments',
      'View analytics',
    ],
    color: '#2d7a4f',
  },
  viewer: {
    name: 'Reader',
    icon: Eye,
    description: 'Read and engage with blog content',
    features: [
      'Read published posts',
      'Comment on posts',
      'Save favorites',
      'Follow authors',
    ],
    color: '#2563eb',
  },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [hoveredRole, setHoveredRole] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const cachedUser = localStorage.getItem('blogUser');
    if (cachedUser) {
      try {
        const user = JSON.parse(cachedUser);
        if (user.email && user.role) {
          // User is cached, redirect to home
          navigate('/');
          return;
        }
      } catch (error) {
        // Invalid cache, clear it
        localStorage.removeItem('blogUser');
      }
    }
  }, [navigate]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Store selected role in cache
    localStorage.setItem('selectedRole', role);
  };

  const handleSignUp = () => {
    if (!selectedRole) {
      alert('Please select a role first');
      return;
    }
    navigate(`/signup?role=${selectedRole}`);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <BookOpen size={24} color="#faf8f4" />
            </div>
            <span style={styles.logoText}>Inkwell</span>
          </div>
          <h1 style={styles.title}>
            Welcome to <br />Your Blog Platform
          </h1>
          <p style={styles.subtitle}>
            Choose your role and join our community of writers and readers
          </p>
        </header>

        <section style={styles.roleSection}>
          <h2 style={styles.sectionTitle}>Choose Your Role</h2>
          <div style={styles.roleGrid}>
            {Object.entries(ROLES).map(([key, role]) => {
              const Icon = role.icon;
              const isSelected = selectedRole === key;
              const isHovered = hoveredRole === key;
              
              return (
                <div
                  key={key}
                  style={{
                    ...styles.roleCard,
                    ...(isSelected ? styles.selectedRole : {}),
                    ...(isHovered ? styles.roleCardHover : {}),
                  }}
                  onClick={() => handleRoleSelect(key)}
                  onMouseEnter={() => setHoveredRole(key)}
                  onMouseLeave={() => setHoveredRole('')}
                >
                  {isSelected && (
                    <div style={styles.badge}>Selected</div>
                  )}
                  <div style={styles.roleIcon}>
                    <Icon size={28} color={role.color} />
                  </div>
                  <h3 style={styles.roleName}>{role.name}</h3>
                  <p style={styles.roleDescription}>{role.description}</p>
                  <ul style={styles.roleFeatures}>
                    {role.features.map((feature, index) => (
                      <li key={index} style={styles.featureItem}>
                        <span style={{ color: role.color }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section style={styles.actionSection}>
          <div style={styles.actionButtons}>
            <button
              style={{
                ...styles.btn,
                ...styles.btnPrimary,
                ...(selectedRole ? styles.btnHover : {}),
                opacity: selectedRole ? 1 : 0.6,
              }}
              onClick={handleSignUp}
              disabled={!selectedRole}
              onMouseEnter={e => {
                if (selectedRole) e.currentTarget.style.background = 'var(--ink-soft)';
              }}
              onMouseLeave={e => {
                if (selectedRole) e.currentTarget.style.background = 'var(--ink)';
              }}
            >
              <UserPlus size={18} />
              Sign Up
            </button>
            <button
              style={{
                ...styles.btn,
                ...styles.btnSecondary,
              }}
              onClick={handleLogin}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--ink)';
                e.currentTarget.style.color = 'var(--parchment)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--ink)';
              }}
            >
              <LogIn size={18} />
              Sign In
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
