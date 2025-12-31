import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import '../css/login.css';

export default function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Hide Navbar when on Login page
  // Class management is now handled centrally in Root.js to prevent conflicts
  // But we can keep a simple effect to trigger it initially if needed, though Root.js observers should catch it.
  useEffect(() => {
    // Force add on mount just in case
    document.documentElement.classList.add('login-page-active');
    document.body.classList.add('login-page-active');
  }, []);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      console.log('Login Success:', data);
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('auth-change'));
      history.push('/');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout title="Login" description="Login to WebDev Docs" noFooter>
      <div className="login-page-wrapper">

        {/* Left Column: Hero Image (B&W Waves) */}
        <div className="login-hero-section">
          <div className="hero-image-container">
            <img src="/img/login-hero-bw.png" alt="Abstract Waves" className="hero-image" />
          </div>
        </div>

        {/* Right Column: Form Section */}
        <div className="login-form-section">
          <div className="login-content">
            <div className="brand-logo-container">
              <img src="/img/logo.svg" alt="WebDev Logo" style={{ width: 50, height: 50 }} />
            </div>

            <h1 className="welcome-text">We help you learn<br />WEB-DEV</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={email}
                  onChange={onChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    value={password}
                    onChange={onChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>

            <div className="form-footer">
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <div className="login-footer">
              Don't have an account? <Link to="/?auth=register">Sign up</Link>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
