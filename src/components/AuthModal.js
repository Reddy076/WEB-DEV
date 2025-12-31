import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import '../css/login.css'; // We'll leverage existing styles but might need to tweak for modal

export default function AuthModal() {
  const history = useHistory();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Effect to check URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authParam = params.get('auth');
    if (authParam === 'login' || authParam === 'register') {
      setAuthMode(authParam);
      setIsOpen(true);
      setError('');
    } else {
      setIsOpen(false);
    }
  }, [location.search]);

  const onClose = () => {
    setIsOpen(false);
    // Remove query param without refreshing
    history.replace({ search: '' });
  };

  const switchMode = (mode) => {
    setAuthMode(mode);
    setFormData({ email: '', password: '', username: '', confirmPassword: '' });
    setError('');
    history.push({ search: `?auth=${mode}` });
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = authMode === 'login' ? 'login' : 'register';

    // Basic Validation
    if (authMode === 'register' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Construct payload
      const payload = { ...formData };
      if (authMode === 'login') {
        delete payload.username;
        delete payload.confirmPassword;
      }

      console.log(`Submitting to ${endpoint}`, payload);

      const response = await fetch(`http://localhost:5001/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || `${authMode === 'login' ? 'Login' : 'Registration'} failed`);
      }

      console.log('Auth Success:', data);

      if (authMode === 'login') {
        localStorage.setItem('token', data.token);
        window.dispatchEvent(new Event('auth-change'));
        onClose();
        // Maybe redirect to dashboard or stay on page?
      } else {
        // After register, switch to login or auto-login
        switchMode('login');
        setError('Registration successful! Please log in.');
      }

    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>

        <div className="login-content" style={{ maxWidth: '100%', padding: '0' }}>
          <div className="brand-logo-container" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img src="/img/logo.svg" alt="WebDev Logo" style={{ width: 50, height: 50 }} />
          </div>

          <h2 className="welcome-text" style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>

          {error && <div className="error-message" style={{ textAlign: 'center' }}>{error}</div>}

          <form onSubmit={onSubmit}>
            {authMode === 'register' && (
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text" name="username" className="form-input"
                  value={formData.username} onChange={onChange} required
                  placeholder="Username"
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email" name="email" className="form-input"
                value={formData.email} onChange={onChange} required
                placeholder="name@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password" name="password" className="form-input"
                value={formData.password} onChange={onChange} required
                placeholder="Password" minLength="6"
              />
            </div>

            {authMode === 'register' && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password" name="confirmPassword" className="form-input"
                  value={formData.confirmPassword} onChange={onChange} required
                  placeholder="Confirm Password" minLength="6"
                />
              </div>
            )}

            <button type="submit" className="login-btn">
              {authMode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="login-footer">
            {authMode === 'login' ? (
              <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); switchMode('register'); }}>Sign up</a></>
            ) : (
              // Link to full login page
              <>Already have an account? <Link to="/login">Sign in</Link></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
