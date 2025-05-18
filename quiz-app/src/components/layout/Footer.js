import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Trivia Master <span className="footer-emoji">🧠</span></h3>
          <p>Test your knowledge with our fun and challenging quizzes!</p>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <span className="social-icon">🐦</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <span className="social-icon">📘</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <span className="social-icon">📷</span>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><a href="/category/9">General Knowledge</a></li>
            <li><a href="/category/17">Science</a></li>
            <li><a href="/category/23">History</a></li>
            <li><a href="/category/21">Sports</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Trivia Master. All rights reserved.</p>
        <p>Powered by <a href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">Open Trivia Database</a></p>
      </div>
    </footer>
  );
};

export default Footer;
