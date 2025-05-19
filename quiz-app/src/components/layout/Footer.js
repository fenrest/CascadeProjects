import React from 'react';
import './Footer.css';
import ThemeSelector from './ThemeSelector';

const Footer = ({ currentTheme }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <p>Made by Fern</p>
          </div>
        </div>
        <div className="footer-theme-selector">
          <ThemeSelector currentTheme={currentTheme} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
