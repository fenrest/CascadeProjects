import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import './LandingPage.css';

const LandingPage = ({ onStartQuiz, username }) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);

  useEffect(() => {
    // Stagger the animations
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2000);
    const buttonTimer = setTimeout(() => setShowButton(true), 3500);
    const illustrationTimer = setTimeout(() => setShowIllustration(true), 800);
    
    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
      clearTimeout(illustrationTimer);
    };
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <motion.div 
          className="landing-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="typing-title">
            Test your knowledge with Qurio
          </h1>
          
          {showSubtitle && (
            <motion.p 
              className="landing-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Challenge yourself with fun quizzes on any topic, from general knowledge to specialized subjects.
            </motion.p>
          )}
          
          {showButton && (
            <motion.button 
              className="landing-button" 
              onClick={onStartQuiz}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START QURIO
            </motion.button>
          )}
        </motion.div>
        
        <div className="landing-image">
          {showIllustration && (
            <motion.div 
              className="hero-graphic"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="hero-illustration" />
            </motion.div>
          )}
        </div>
      </div>
      
      <motion.div 
        className="landing-features"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <motion.div 
          className="feature"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="feature-icon feature-icon-categories"></div>
          <h3>Diverse Categories</h3>
          <p>From science to pop culture, we've got questions on everything.</p>
        </motion.div>
        <motion.div 
          className="feature"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="feature-icon feature-icon-quick"></div>
          <h3>Quick Quizzes</h3>
          <p>Test your knowledge in just a few minutes.</p>
        </motion.div>
        <motion.div 
          className="feature"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="feature-icon feature-icon-progress"></div>
          <h3>Track Progress</h3>
          <p>See your scores and improve over time.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
