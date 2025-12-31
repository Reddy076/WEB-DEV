
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { useHistory } from '@docusaurus/router';
import searchIndex from '../../data/search-index.json';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const history = useHistory();
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Initialize Fuse with the imported index
  const fuse = useMemo(() => new Fuse(searchIndex, {
    keys: ['title', 'description', 'keywords'],
    threshold: 0.3,
    limit: 10
  }), []);

  const results = useMemo(() => {
    if (!query) return [];
    return fuse.search(query).map(result => result.item);
  }, [query, fuse]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setActiveResultIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveResultIndex(prev =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveResultIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeResultIndex >= 0 && results[activeResultIndex]) {
        navigateToResult(results[activeResultIndex].path);
      }
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  const navigateToResult = (path) => {
    history.push(path);
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
    // Focus after render
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeModal = () => {
    setIsOpen(false);
    setQuery('');
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openModal();
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <>
      {/* Navbar Trigger Button (Minimal Pill) */}
      <button
        className="search-trigger-btn"
        onClick={openModal}
        aria-label="Search"
      >
        <span className="search-pixel-cursor">_</span>
        <span className="search-icon-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
      </button>

      {/* Search Modal Overlay */}
      {isOpen && (
        <div className="search-modal-backdrop">
          <div className="search-modal-container" ref={modalRef}>
            <div className="search-modal-header">
              <svg className="modal-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={inputRef}
                type="search"
                className="search-modal-input"
                placeholder="Search documentation..."
                value={query}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
              />
              <button className="search-modal-close-btn" onClick={closeModal}>✕</button>
            </div>

            <div className="search-modal-results">
              {results.length > 0 ? (
                results.map((item, index) => (
                  <div
                    key={item.path}
                    className={`search-result-item ${index === activeResultIndex ? 'active' : ''}`}
                    onClick={() => navigateToResult(item.path)}
                    onMouseEnter={() => setActiveResultIndex(index)}
                  >
                    <div className="search-result-title">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="search-result-desc">{item.description}</div>
                    )}
                  </div>
                ))
              ) : (
                query && (
                  <div className="search-no-results">
                    <p>No results for "<strong>{query}</strong>"</p>
                  </div>
                )
              )}

              {!query && (
                <div className="search-initial-state">
                  <p>Type to search...</p>
                </div>
              )}
            </div>

            <div className="search-modal-footer">
              <span><kbd>↵</kbd> to select</span>
              <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
              <span><kbd>esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
