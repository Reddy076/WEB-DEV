import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { html as langHtml } from '@codemirror/lang-html';
import '../../css/playground.css';

const Playground = ({ initialHTML = '', initialCSS = '' }) => {
  const [htmlCode, setHtmlCode] = useState(initialHTML.trim());
  const [cssCode, setCssCode] = useState(initialCSS.trim());

  // Debounce could be added here if performance is an issue, 
  // but for local static docs, direct state update is usually fine.

  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 1rem; margin: 0; }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
    </html>
  `;

  return (
    <div className="playground-container">
      <div className="playground-header">Live Preview</div>
      <div className="playground-body">
        <div className="playground-editors">
          <div className="editor-section">
            <div className="editor-label">HTML</div>
            <CodeMirror
              value={htmlCode}
              height="200px"
              extensions={[langHtml()]}
              onChange={(value) => setHtmlCode(value)}
              theme="dark"
              style={{ fontSize: '14px' }}
            />
          </div>
          <div className="editor-section">
            <div className="editor-label">CSS</div>
            <CodeMirror
              value={cssCode}
              height="200px"
              extensions={[css()]}
              onChange={(value) => setCssCode(value)}
              theme="dark"
              style={{ fontSize: '14px' }}
            />
          </div>
        </div>
        <div className="playground-preview">
          <div className="editor-label" style={{ background: '#f0f0f0', color: '#333', borderBottom: '1px solid #ddd' }}>Browser Output</div>
          <iframe
            title="preview"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;
