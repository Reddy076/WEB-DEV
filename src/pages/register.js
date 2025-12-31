import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import '../css/login.css';

export default function Register() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!location.search.includes('auth=')) {
      history.replace('/register?auth=register');
    }
  }, [location, history]);

  return (
    <Layout title="Join Us" description="Register for WebDev Docs">
      <div className="login-page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Same background style as login for consistency */}
        <div className="login-hero-section" style={{ display: 'block', flex: 'none', width: '100%', height: '100%', position: 'absolute', zIndex: 0 }}>
          <div className="hero-image-container">
            <img src="/img/login-hero-bw.png" alt="Background" className="hero-image" style={{ opacity: 0.3 }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
