import React, { useState, useRef, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useColorMode } from '@docusaurus/theme-common';
import '../../css/playground.css';

const JSPlayground = ({ initialCode = '' }) => {
  const [code, setCode] = useState(initialCode.trim());
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef([]);
  const timeoutsRef = useRef([]);
  const { colorMode } = useColorMode();

  const formatOutput = useCallback((value) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'function') return '[Function]';
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    return String(value);
  }, []);

  const addLog = useCallback((type, content) => {
    const newLog = { type, content };
    outputRef.current = [...outputRef.current, newLog];
    setOutput([...outputRef.current]);
  }, []);

  const runCode = async () => {
    // Clear previous timeouts
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];

    setIsRunning(true);
    outputRef.current = [];
    setOutput([]);

    // Create custom console that updates state
    const customConsole = {
      log: (...args) => {
        addLog('log', args.map(formatOutput).join(' '));
      },
      error: (...args) => {
        addLog('error', args.map(formatOutput).join(' '));
      },
      warn: (...args) => {
        addLog('warn', args.map(formatOutput).join(' '));
      },
      info: (...args) => {
        addLog('info', args.map(formatOutput).join(' '));
      },
      table: (data) => {
        addLog('table', formatOutput(data));
      },
      clear: () => {
        outputRef.current = [];
        setOutput([]);
      },
    };

    // Create custom setTimeout that we can track
    const customSetTimeout = (callback, delay) => {
      const id = setTimeout(() => {
        try {
          callback();
        } catch (error) {
          addLog('error', `Error in setTimeout: ${error.message}`);
        }
      }, delay);
      timeoutsRef.current.push(id);
      return id;
    };

    // Create custom setInterval
    const customSetInterval = (callback, delay) => {
      let count = 0;
      const maxIterations = 10; // Limit iterations to prevent infinite loops
      const id = setInterval(() => {
        count++;
        if (count > maxIterations) {
          clearInterval(id);
          addLog('warn', `setInterval stopped after ${maxIterations} iterations`);
          return;
        }
        try {
          callback();
        } catch (error) {
          addLog('error', `Error in setInterval: ${error.message}`);
          clearInterval(id);
        }
      }, delay);
      timeoutsRef.current.push(id);
      return id;
    };

    try {
      // Create an async function wrapper to support await
      const wrappedCode = `
        (async function(console, setTimeout, setInterval, clearTimeout, clearInterval) {
          ${code}
        })
      `;
      const func = eval(wrappedCode);
      const result = await func(
        customConsole,
        customSetTimeout,
        customSetInterval,
        clearTimeout,
        clearInterval
      );

      if (result !== undefined) {
        addLog('result', `→ ${formatOutput(result)}`);
      }
    } catch (error) {
      addLog('error', `Error: ${error.message}`);
    }

    setIsRunning(false);
  };

  const clearOutput = () => {
    // Clear any running timeouts
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
    outputRef.current = [];
    setOutput([]);
  };

  return (
    <div className="playground-container">
      <div className="playground-header">
        <span>JavaScript Playground</span>
        <div className="playground-header-actions">
          <button
            className="layout-btn active"
            onClick={runCode}
            disabled={isRunning}
            style={{ fontWeight: 'bold' }}
          >
            ▶ Run
          </button>
          <button
            className="reset-btn"
            onClick={clearOutput}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="playground-body">
        <div className="playground-editors">
          <div className="editor-section">
            <div className="editor-label">JavaScript</div>
            <CodeMirror
              value={code}
              height="100%"
              extensions={[javascript()]}
              onChange={(value) => setCode(value)}
              theme={colorMode === 'dark' ? 'dark' : 'light'}
              style={{ fontSize: '14px', height: '100%' }}
            />
          </div>
        </div>
        <div className="js-console">
          <div className="console-label">Output</div>
          <div className="console-content">
            {output.length === 0 ? (
              <div className="console-placeholder">
                Click "Run" to execute your code...
              </div>
            ) : (
              output.map((item, index) => (
                <div key={index} className={`console-line log-type-${item.type}`}>
                  <pre>{item.content}</pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSPlayground;
