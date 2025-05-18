import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './QuizSetup.css';

const QuizSetup = ({ categoryId, categoryName, onStartQuiz, onBack }) => {
  const [quizOptions, setQuizOptions] = useState({
    amount: 5,
    difficulty: '',
    type: 'multiple'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onStartQuiz({
      ...quizOptions,
      category: categoryId
    });
  };
  
  return (
    <motion.div 
      className="quiz-setup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Quiz Setup</h2>
      <p className="setup-category">Category: {categoryName || 'Random'}</p>
      
      <form onSubmit={handleSubmit} className="setup-form">
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <select 
            id="amount" 
            name="amount" 
            value={quizOptions.amount} 
            onChange={handleChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select 
            id="difficulty" 
            name="difficulty" 
            value={quizOptions.difficulty} 
            onChange={handleChange}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Question Type</label>
          <select 
            id="type" 
            name="type" 
            value={quizOptions.type} 
            onChange={handleChange}
          >
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        
        <div className="setup-actions">
          <motion.button 
            type="button"
            className="back-button"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back
          </motion.button>
          
          <motion.button 
            type="submit"
            className="start-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Quiz
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default QuizSetup;
