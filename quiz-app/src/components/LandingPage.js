import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './LandingPage.css';

const LandingPage = ({ onStartQuiz, username }) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
useEffect(() => {
    // Stagger the animations
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1500);
    const buttonTimer = setTimeout(() => setShowButton(true), 2500);
    
    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Define animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: { ease: 'easeInOut' }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 12,
        delay: 0.2 
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { 
        type: 'spring',
        stiffness: 450, // Slightly increased stiffness for hover responsiveness
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' 
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="landing-container theme-aware"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="landing-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="landing-text">
            <motion.h1 
              className="typing-title"
              variants={itemVariants}
            >
              Test your knowledge with Qurio
            </motion.h1>
            
            <AnimatePresence>
              {showSubtitle && (
                <motion.p 
                  className="landing-subtitle"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  Challenge yourself with fun quizzes on any topic, from general knowledge to specialized subjects.
                </motion.p>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {showButton && (
                <motion.button 
                  className="landing-button" 
                  onClick={onStartQuiz}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  START QURIO
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
            className="background-decoration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            <motion.div 
              className="floating-shape shape1"
              animate={{ 
                y: [0, -20, 0], 
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="floating-shape shape2"
              animate={{ 
                y: [0, 20, 0], 
                rotate: [0, -5, 0],
                scale: [1, 1.03, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;
