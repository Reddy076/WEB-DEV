import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { html as langHtml } from '@codemirror/lang-html';
import '../../css/playground.css';

const Playground = ({ initialHTML = '', initialCSS = '' }) => {
  const [htmlCode, setHtmlCode] = useState(initialHTML.trim());
  const [cssCode, setCssCode] = useState(initialCSS.trim());
  const [layout, setLayout] = useState('split'); // 'split' | 'preview' | 'code'

  const handleReset = () => {
    setHtmlCode(initialHTML.trim());
    setCssCode(initialCSS.trim());
    setLayout('split');
  };

  // Debounce could be added here if performance is an issue, 
  // but for local static docs, direct state update is usually fine.

  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 1rem; margin: 0; background-color: #fff; }
          * { box-sizing: border-box; }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
    </html>
  `;

  const getGridStyle = () => {
    if (layout === 'preview') return '30% 70%';
    if (layout === 'code') return '70% 30%';
    return '1fr 1fr';
  };

  const btnStyle = (isActive) => ({
    background: isActive ? 'rgba(255,255,255,0.25)' : 'transparent',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '0.7rem',
    cursor: 'pointer',
    marginLeft: '4px'
  });

  return (
    <div className="playground-container">
      <div className="playground-header">
        <span style={{ flex: 1 }}>Live Preview</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={() => setLayout('code')} style={btnStyle(layout === 'code')} title="Big Code">Code</button>
          <button onClick={() => setLayout('split')} style={btnStyle(layout === 'split')} title="Equal Split">Split</button>
          <button onClick={() => setLayout('preview')} style={btnStyle(layout === 'preview')} title="Big Preview">Preview</button>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.3)', margin: '0 8px' }}></div>
          <button onClick={handleReset} style={btnStyle(false)}>Reset</button>
        </div>
      </div>
      <div className="playground-body" style={{ '--playground-cols': getGridStyle() }}>
        <div className="playground-editors">
          <div className="editor-section">
            <div className="editor-label">HTML</div>
            <CodeMirror
              value={htmlCode}
              height="100%"
              extensions={[langHtml()]}
              onChange={(value) => setHtmlCode(value)}
              theme="dark"
              style={{ fontSize: '14px', height: '100%' }}
            />
          </div>
          <div className="editor-section">
            <div className="editor-label">CSS</div>
            <CodeMirror
              value={cssCode}
              height="100%"
              extensions={[css()]}
              onChange={(value) => setCssCode(value)}
              theme="dark"
              style={{ fontSize: '14px', height: '100%' }}
            />
          </div>
        </div>
        <div className="playground-preview">
          <iframe
            title="preview"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;
