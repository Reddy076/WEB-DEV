import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from '@docusaurus/router';
import AuthModal from '../components/AuthModal';

export default function Root({ children }) {
  const location = useLocation();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const publicPaths = ['/login', '/register'];
      const currentPath = location.pathname;

      // Update body attribute for CSS targeting
      document.documentElement.setAttribute('data-curr-path', currentPath);

      if (token) {
        // console.log('Root.js: User is logged in, token present.');
        document.documentElement.classList.add('user-logged-in');
        setAuthorized(true);
      } else {
        document.documentElement.classList.remove('user-logged-in');
        if (publicPaths.includes(currentPath)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          // Redirect to login handled in render
        }
      }
    };

    // Enforce class presence with MutationObserver to prevent Docusaurus from wiping it
    const observer = new MutationObserver(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken && !document.documentElement.classList.contains('user-logged-in')) {
        document.documentElement.classList.add('user-logged-in');
      } else if (!currentToken && document.documentElement.classList.contains('user-logged-in')) {
        document.documentElement.classList.remove('user-logged-in');
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Handle login-page-active persistence
    const loginObserver = new MutationObserver(() => {
      if (location.pathname === '/login' && !document.documentElement.classList.contains('login-page-active')) {
        document.documentElement.classList.add('login-page-active');
        document.body.classList.add('login-page-active');
      } else if (location.pathname !== '/login' && document.documentElement.classList.contains('login-page-active')) {
        document.documentElement.classList.remove('login-page-active');
        document.body.classList.remove('login-page-active');
      }
    });
    loginObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Initial check
    checkAuth();

    // Listen for custom event/storage
    window.addEventListener('auth-change', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      observer.disconnect();
      loginObserver.disconnect();
      window.removeEventListener('auth-change', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, [location.pathname]);

  // If not authorized and not on a public path, redirect
  // Note: We need to handle this carefully to avoid infinite loops or flash
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const publicPaths = ['/login', '/register'];
  const isPublic = publicPaths.includes(location.pathname);

  if (!token && !isPublic) {
    // Preserve the query params (like ?auth=login) when redirecting
    return <Redirect to={`/login${location.search}`} />;
  }

  return (
    <>
      {children}
      <AuthModal />
    </>
  );
}
