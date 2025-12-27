import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Resources for Developers,
          <br />
          <span className={styles.heroTitleAccent}>by Developers</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Documenting <Link to="/Introduction/css-syntax">CSS</Link>,{' '}
          <Link to="/js/Fundamentals/getting-started">JavaScript</Link>, and more.
        </p>
      </div>
      <div className={styles.heroGraphic}>
        <div className={styles.codePattern}></div>
      </div>
    </section>
  );
}

function FeatureCard({ category, title, description, link }) {
  return (
    <Link to={link} className={styles.featureCard}>
      <span className={styles.featureCategory}>{category}</span>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </Link>
  );
}

function FeaturedSection() {
  const features = [
    {
      category: 'CSS',
      title: 'Getting Started with CSS',
      description: 'Learn the fundamentals of CSS syntax, selectors, and properties to style your web pages.',
      link: '/Introduction/css-syntax',
    },
    {
      category: 'JavaScript',
      title: 'JavaScript Fundamentals',
      description: 'Master variables, data types, control flow, and functions - the building blocks of JavaScript.',
      link: '/js/Fundamentals/getting-started',
    },
    {
      category: 'CSS',
      title: 'Flexbox & Grid Layouts',
      description: 'Build modern, responsive layouts using CSS Flexbox and Grid systems.',
      link: '/FlexboxGrid/flexbox',
    },
    {
      category: 'JavaScript',
      title: 'Async Programming',
      description: 'Understand Promises, async/await, and how to handle asynchronous operations.',
      link: '/js/AsyncJS/promises',
    },
  ];

  return (
    <section className={styles.featured}>
      <h2 className={styles.featuredTitle}>Featured Topics</h2>
      <div className={styles.featureGrid}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className={styles.quickLinksGroup}>
        <h3 className={styles.quickLinksTitle}>🎨 CSS</h3>
        <ul className={styles.quickLinksList}>
          <li><Link to="/Introduction/css-syntax">CSS Syntax</Link></li>
          <li><Link to="/Selectors/css-selectors">Selectors</Link></li>
          <li><Link to="/BoxModel/box-model-basics">Box Model</Link></li>
          <li><Link to="/FlexboxGrid/flexbox-layout">Flexbox</Link></li>
          <li><Link to="/ResponsiveDesign/media-queries">Media Queries</Link></li>
        </ul>
      </div>
      <div className={styles.quickLinksGroup}>
        <h3 className={styles.quickLinksTitle}>⚡ JavaScript</h3>
        <ul className={styles.quickLinksList}>
          <li><Link to="/js/Fundamentals/getting-started">Getting Started</Link></li>
          <li><Link to="/js/VariablesDataTypes/variables">Variables</Link></li>
          <li><Link to="/js/ObjectsFunctions/objects">Objects & Functions</Link></li>
          <li><Link to="/js/ArrayMethods/array-methods">Array Methods</Link></li>
          <li><Link to="/js/AsyncJS/promises">Promises</Link></li>
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="WebDev Docs - The ultimate guide to CSS and JavaScript for web developers"
    >
      <main className={styles.main}>
        <HeroSection />
        <FeaturedSection />
        <QuickLinks />
      </main>
    </Layout>
  );
}
