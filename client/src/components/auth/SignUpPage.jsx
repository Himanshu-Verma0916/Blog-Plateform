import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Eye, EyeOff, AlertCircle, User, Mail, Lock } from 'lucide-react';

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '2rem', background: 'var(--parchment)',
  },
  card: {
    background: 'var(--white)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-lg)', padding: '40px',
    width: '100%', maxWidth: '480px',
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
  inputWithIcon: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
    color: 'var(--ink-muted)', pointerEvents: 'none',
  },
  inputWithIconPadding: {
    paddingLeft: '40px',
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
  success: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 14px', background: '#f0fdf4',
    border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)',
    color: '#2d7a4f', fontSize: '0.85rem',
  },
  btn: {
    background: 'var(--ink)', color: 'var(--parchment)',
    padding: '12px', borderRadius: 'var(--radius-md)',
    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
    border: 'none', transition: 'all var(--transition)',
    fontFamily: 'var(--font-body)', marginTop: '8px',
  },
  roleBadge: {
    display: 'inline-block', padding: '4px 12px', borderRadius: '20px',
    fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.04em', marginBottom: '16px',
  },
  roleColors: {
    admin: { background: '#fef2f2', color: '#c0392b' },
    author: { background: '#f0fdf4', color: '#2d7a4f' },
    viewer: { background: '#eff6ff', color: '#2563eb' },
  },
};

const roleDescriptions = {
  admin: 'Administrator with full system access',
  author: 'Content creator and manager',
  viewer: 'Reader and commenter',
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get('role') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: selectedRole,
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedRole) {
      navigate('/landing');
    }
  }, [selectedRole, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Use AuthContext signUp function
      const result = signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      
      if (result.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        
        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(result.error || 'Failed to create account. Please try again.');
      }
      
    } catch (error) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  if (!selectedRole) {
    return null; // Will redirect in useEffect
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}><BookOpen size={18} color="#faf8f4" /></div>
          <span style={styles.logoText}>Inkwell</span>
        </div>
        
        <h1 style={styles.heading}>Create your account</h1>
        <p style={styles.sub}>Join as a {roleDescriptions[selectedRole]}</p>
        
        <div style={{ ...styles.roleBadge, ...styles.roleColors[selectedRole] }}>
          {selectedRole}
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div style={styles.error}>
              <AlertCircle size={14} /> {error}
            </div>
          )}
          
          {success && (
            <div style={styles.success}>
              <AlertCircle size={14} /> {success}
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputWithIcon}>
              <User size={16} style={styles.inputIcon} />
              <input
                style={{ ...styles.input, ...styles.inputWithIconPadding }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWithIcon}>
              <Mail size={16} style={styles.inputIcon} />
              <input
                style={{ ...styles.input, ...styles.inputWithIconPadding }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={{ ...styles.passwordWrap, ...styles.inputWithIcon }}>
              <Lock size={16} style={styles.inputIcon} />
              <input
                style={{ ...styles.input, ...styles.inputWithIconPadding, paddingRight: '40px' }}
                type={showPass ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <div style={{ ...styles.passwordWrap, ...styles.inputWithIcon }}>
              <Lock size={16} style={styles.inputIcon} />
              <input
                style={{ ...styles.input, ...styles.inputWithIconPadding, paddingRight: '40px' }}
                type={showConfirmPass ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            style={styles.btn}
            type="submit"
            disabled={loading}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--ink-soft)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ color: 'var(--ink-muted)', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ink)',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
