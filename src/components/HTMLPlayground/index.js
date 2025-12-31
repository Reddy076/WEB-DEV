import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { useColorMode } from '@docusaurus/theme-common';
import '../../css/playground.css';

const HTMLPlayground = ({ initialCode = '' }) => {
  const [code, setCode] = useState(initialCode.trim());
  const { colorMode } = useColorMode();
  const [srcDoc, setSrcDoc] = useState('');
  const [layout, setLayout] = useState('split'); // 'split' | 'preview' | 'code'

  // Update preview with delay to avoid rapid re-renders
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(code);
    }, 500);
    return () => clearTimeout(timeout);
  }, [code]);

  const handleReset = () => {
    setCode(initialCode.trim());
    setLayout('split');
  };

  const getGridStyle = () => {
    if (layout === 'preview') return '30% 70%';
    if (layout === 'code') return '70% 30%';
    return '1fr 1fr';
  };

  return (
    <div className="playground-container">
      <div className="playground-header">
        <span style={{ flex: 1 }}>Live Preview</span>
        <div className="playground-header-actions">
          <div className="playground-layout-controls">
            <button
              className={`layout-btn ${layout === 'code' ? 'active' : ''}`}
              onClick={() => setLayout('code')}
              title="Code Only"
            >
              Code
            </button>
            <button
              className={`layout-btn ${layout === 'split' ? 'active' : ''}`}
              onClick={() => setLayout('split')}
              title="Split View"
            >
              Split
            </button>
            <button
              className={`layout-btn ${layout === 'preview' ? 'active' : ''}`}
              onClick={() => setLayout('preview')}
              title="Preview Only"
            >
              Preview
            </button>
          </div>
          <button
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="playground-body" style={{ '--playground-cols': getGridStyle() }}>
        <div className="playground-editors" style={{ overflow: 'hidden' }}>
          <div className="editor-section">
            <div className="editor-label">HTML</div>
            <CodeMirror
              value={code}
              height="100%"
              extensions={[html()]}
              onChange={(value) => setCode(value)}
              theme="dark" // Always dark theme for editor to match CSS playground style
              style={{ fontSize: '14px', height: '100%' }}
            />
          </div>
        </div>
        <div className="playground-preview" style={{ overflow: 'hidden' }}>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default HTMLPlayground;
