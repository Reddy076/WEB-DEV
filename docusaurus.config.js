// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WebDev',
  tagline: 'Master CSS & JavaScript with Interactive Docs',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: 'https://webdev-docs.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'Reddy076', // Usually your GitHub org/user name.
  projectName: 'CSS', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'js-docs',
        path: 'js-docs',
        routeBasePath: 'js',
        sidebarPath: './jsSidebars.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'html-docs',
        path: 'html-docs',
        routeBasePath: 'html',
        sidebarPath: './htmlSidebars.js',
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: false,
        language: ['en'],
        docsRouteBasePath: ['/', '/js', '/html'],
        docsDir: ['docs', 'js-docs', 'html-docs'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcut: false,
        searchBarShortcutHint: true,
        searchResultLimits: 10,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '', // CSS docs at root paths like /Introduction/css-syntax
        },
        blog: false, // Disable blog for now to focus on docs
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'WebDev',
        logo: {
          alt: 'WebDev Logo',
          src: 'img/logo.svg',
          href: '/',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'htmlSidebar',
            docsPluginId: 'html-docs',
            position: 'left',
            label: '📝 HTML',
            className: 'protected-item',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '🎨 CSS',
            className: 'protected-item',
          },
          {
            type: 'docSidebar',
            sidebarId: 'jsSidebar',
            docsPluginId: 'js-docs',
            position: 'left',
            label: '⚡ JavaScript',
            className: 'protected-item',
          },
          {
            href: 'https://github.com/Reddy076/CSS',
            label: 'GitHub',
            position: 'right',
          },
          {
            to: '/login',
            label: 'Login',
            position: 'right',
            className: 'auth-item-login',
          },
          {
            to: '/?auth=register',
            label: 'Register',
            position: 'right',
            className: 'auth-item-login',
          },
          {
            to: '/logout',
            label: 'Logout',
            position: 'right',
            className: 'auth-item-logout',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '📚 Documentation',
            items: [
              {
                label: 'CSS Basics',
                to: '/Introduction/css-syntax',
              },
              {
                label: 'JavaScript',
                to: '/js/Fundamentals/getting-started',
              },
            ],
          },
          {
            title: '🔗 Resources',
            items: [
              {
                label: 'MDN Web Docs',
                href: 'https://developer.mozilla.org/',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/',
              },
            ],
          },
          {
            title: '🌐 Connect',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Reddy076/CSS',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} WebDev Docs. Built with 💜 and Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
    }),
};

export default config;
