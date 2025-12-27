/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  jsSidebar: [
    {
      type: 'category',
      label: '1. Getting Started',
      collapsed: true,
      items: [
        'Fundamentals/getting-started',
        'Fundamentals/js-fundamentals',
        'Fundamentals/frameworks-libraries',
      ],
    },
    {
      type: 'category',
      label: '2. Variables & Data Types',
      collapsed: true,
      items: [
        'VariablesDataTypes/variables',
        'VariablesDataTypes/data-types',
        'VariablesDataTypes/operators',
      ],
    },
    {
      type: 'category',
      label: '3. Control Flow',
      collapsed: true,
      items: [
        'ControlFlow/control-flow',
        'ControlFlow/conditionals-loops',
      ],
    },
    {
      type: 'category',
      label: '4. Objects & Functions',
      collapsed: true,
      items: [
        'ObjectsFunctions/objects',
        'ObjectsFunctions/this-keyword',
        'ObjectsFunctions/function-declaration',
        'ObjectsFunctions/arrow-functions',
        'ObjectsFunctions/callbacks',
        'ObjectsFunctions/closures',
        'ObjectsFunctions/iife',
      ],
    },
    {
      type: 'category',
      label: '5. Array Methods',
      collapsed: true,
      items: [
        'ArrayMethods/array-methods',
        'ArrayMethods/foreach-map-filter-reduce',
      ],
    },
    {
      type: 'category',
      label: '6. DOM Manipulation',
      collapsed: true,
      items: [
        'DOMManipulation/selecting-elements',
        'DOMManipulation/modifying-content',
        'DOMManipulation/traversing-dom',
        'DOMManipulation/dom-manipulation',
      ],
    },
    {
      type: 'category',
      label: '7. Events',
      collapsed: true,
      items: [
        'Events/events-listeners',
      ],
    },
    {
      type: 'category',
      label: '8. Async JavaScript',
      collapsed: true,
      items: [
        'AsyncJS/sync-async',
        'AsyncJS/call-stack',
        'AsyncJS/event-loop',
        'AsyncJS/callback-functions',
        'AsyncJS/callback-hell',
        'AsyncJS/promises',
        'AsyncJS/json',
        'AsyncJS/fetch-api',
      ],
    },
    {
      type: 'category',
      label: '9. ES6+ Features',
      collapsed: true,
      items: [
        'ES6Features/es6-features',
      ],
    },
    {
      type: 'category',
      label: '10. Debugging & Testing',
      collapsed: true,
      items: [
        'Debugging/debugging',
      ],
    },
  ],
};

export default sidebars;
