import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DifficultySelection.css';

const DifficultySelection = ({ categoryName, onDifficultySelected }) => {
  const handleBack = () => {
    window.history.back();
  };
  const [difficulty, setDifficulty] = useState('medium'); // Default difficulty
  const [amount, setAmount] = useState(10); // Default number of questions
  const [type, setType] = useState('multiple'); // Default type

  const handleSubmit = (e) => {
    e.preventDefault();
    onDifficultySelected(difficulty, amount, type);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: { ease: 'easeInOut' }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 24,
        delay: 0.2 
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 10 
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' 
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="difficulty-selection-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h2 
          className="difficulty-selection-title"
          variants={itemVariants}
        >
          Configure Quiz for: <motion.span 
            className="selected-category-name"
            initial={{ opacity: 0, y: -5 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3, duration: 0.5 }
            }}
          >{categoryName || 'Selected Category'}</motion.span>
        </motion.h2>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="difficulty-form"
          variants={containerVariants}
        >
          <motion.div className="form-group" variants={itemVariants}>
            <motion.label htmlFor="difficulty" variants={itemVariants}>Select Difficulty:</motion.label>
            <motion.select 
              id="difficulty" 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-select"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </motion.select>
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <motion.label htmlFor="amount" variants={itemVariants}>Number of Questions:</motion.label>
            <motion.select 
              id="amount" 
              value={amount} 
              onChange={(e) => setAmount(parseInt(e.target.value, 10))}
              className="form-select"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </motion.select>
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <motion.label htmlFor="type" variants={itemVariants}>Question Type:</motion.label>
            <motion.select 
              id="type" 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className="form-select"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </motion.select>
          </motion.div>

          <motion.div 
            className="difficulty-actions"
            variants={containerVariants}
          >
            <motion.button 
              type="button" 
              onClick={handleBack} 
              className="button back-button difficulty-back-button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Back to Categories
            </motion.button>
            <motion.button 
              type="submit" 
              className="button start-quiz-button difficulty-start-button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Start Quiz
            </motion.button>
          </motion.div>
        </motion.form>
        
        <motion.div 
          className="background-decoration difficulty-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div 
            className="floating-shape difficulty-shape1"
            animate={{ 
              y: [0, -15, 0], 
              rotate: [0, 3, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="floating-shape difficulty-shape2"
            animate={{ 
              y: [0, 15, 0], 
              rotate: [0, -3, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 9,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DifficultySelection;
