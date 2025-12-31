/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  htmlSidebar: [
    {
      type: 'category',
      label: 'Fundamentals',
      collapsed: false,
      items: [
        'Fundamentals/getting-started',
        'Fundamentals/elements-attributes',
        'Fundamentals/text-formatting',
        'Fundamentals/semantics',
      ],
    },
    {
      type: 'category',
      label: 'Document Structure',
      collapsed: true,
      items: [
        'Structure/lists',
        'Structure/tables',
        'Structure/links-images',
      ],
    },
    {
      type: 'category',
      label: 'Forms',
      collapsed: true,
      items: [
        'Forms/form-structure',
        'Forms/input-types',
        'Forms/form-controls',
        'Forms/validation',
      ],
    },
    {
      type: 'category',
      label: 'Media & Advanced',
      collapsed: true,
      items: [
        'Media/multimedia',
        'Media/graphics',
        'Advanced/web-storage',
        'Advanced/apis',
      ],
    },
  ],
};

module.exports = sidebars;
