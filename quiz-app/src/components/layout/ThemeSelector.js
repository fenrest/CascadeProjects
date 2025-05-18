import React, { useState, useRef, useEffect } from 'react';
import { themes, applyTheme, saveTheme } from '../../utils/themes';
import './ThemeSelector.css';

/**
 * ThemeSelector component for the footer
 */
const ThemeSelector = ({ currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle theme selection
  const handleThemeSelect = (theme) => {
    applyTheme(theme);
    saveTheme(theme);
    setIsOpen(false);
    
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <button 
        ref={buttonRef}
        className="theme-selector-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span 
          className="theme-icon" 
          style={{ 
            background: currentTheme.appBg,
            border: `1px solid ${currentTheme.border}`
          }}
        ></span>
        <span className="theme-name">Change Theme</span>
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          {Object.values(themes).map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${currentTheme.id === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeSelect(theme)}
            >
              <span 
                className="theme-color-preview" 
                style={{ 
                  background: theme.appBg,
                  border: `1px solid ${theme.border}`
                }}
              ></span>
              <span className="theme-option-name">{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
