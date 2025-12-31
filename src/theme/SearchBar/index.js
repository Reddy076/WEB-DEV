
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
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

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
    setIsOpen(true);
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
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const navigateToResult = (path) => {
    history.push(path);
    setIsOpen(false);
    setQuery('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <div className="custom-search-container" ref={searchContainerRef}>
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="search"
          className="navbar__search-input"
          placeholder="Search docs (Ctrl+K)"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results-dropdown">
          {results.map((item, index) => (
            <div
              key={item.path}
              className={`search-result-item ${index === activeResultIndex ? 'active' : ''}`}
              onClick={() => navigateToResult(item.path)}
              onMouseEnter={() => setActiveResultIndex(index)}
            >
              <div className="search-result-title">{item.title}</div>
              {item.description && (
                <div className="search-result-desc">{item.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="search-results-dropdown">
          <div className="search-no-results">No results found for "{query}"</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
