import React from 'react';
import './Footer.css';
import ThemeSelector from './ThemeSelector';

const Footer = ({ currentTheme }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Qurio</h3>
          <p>Test your knowledge with fun quizzes!</p>
        </div>
        
        <div className="footer-section">
          <h3>Links</h3>
          <ul className="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        

        <div className="footer-section">
          <h3>Theme</h3>
          <ThemeSelector currentTheme={currentTheme} />
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Qurio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
