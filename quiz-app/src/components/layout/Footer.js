import React from 'react';
import './Footer.css';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Qurio</h3>
          <p>Test your knowledge with our fun and challenging quizzes!</p>
        
            
          
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
        <p>&copy; {currentYear} Qurio. All rights reserved.</p>
        <p>Powered by <a href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">Open Trivia Database</a></p>
      </div>
    </footer>
  );
};

export default Footer;
