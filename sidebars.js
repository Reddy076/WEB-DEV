/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '1. Introduction',
      collapsed: true,
      items: [
        'Introduction/css-syntax',
        'Introduction/ways-to-apply-css',
      ],
    },
    {
      type: 'category',
      label: '2. Selectors',
      collapsed: true,
      items: [
        'Selectors/css-selectors',
      ],
    },
    {
      type: 'category',
      label: '3. Typography',
      collapsed: true,
      items: [
        'Typography/styling-text-and-fonts',
        'Typography/font-properties',
      ],
    },
    {
      type: 'category',
      label: '4. Box Model',
      collapsed: true,
      items: [
        'BoxModel/box-model-basics',
        'BoxModel/content-padding-border-margin',
      ],
    },
    {
      type: 'category',
      label: '5. Styles & Effects',
      collapsed: true,
      items: [
        'StylesEffects/colors-and-backgrounds',
        'StylesEffects/borders-and-effects',
      ],
    },
    {
      type: 'category',
      label: '6. Layout Fundamentals',
      collapsed: true,
      items: [
        'LayoutFundamentals/layout-with-css',
        'LayoutFundamentals/display-position-float',
        'LayoutFundamentals/overflow-property',
      ],
    },
    {
      type: 'category',
      label: '7. Flexbox & Grid',
      collapsed: true,
      items: [
        'FlexboxGrid/flexbox-layout',
        'FlexboxGrid/flex-properties',
        'FlexboxGrid/grid-properties',
      ],
    },
    {
      type: 'category',
      label: '8. Responsive Design',
      collapsed: true,
      items: [
        'ResponsiveDesign/media-queries',
        'ResponsiveDesign/breakpoints',
      ],
    },
    {
      type: 'category',
      label: '9. Animations',
      collapsed: true,
      items: [
        'Animations/transitions-animations',
      ],
    },
    {
      type: 'category',
      label: '11. Resources',
      collapsed: false,
      items: [
        'interview-questions',
      ],
    },
  ],
};

export default sidebars;
