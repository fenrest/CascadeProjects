import React from 'react';
import { useNavigate } from 'react-router-dom';

const Question = ({ question, currentQuestion, totalQuestions, onAnswerSelect }) => {
  const navigate = useNavigate();
  return (
    <div className="question-container">
      <div className="question-header">
        <h2>Question {currentQuestion + 1} of {totalQuestions}</h2>
      </div>
      <h3>{question.text}</h3>
      <div className="options">
        {question.options.map((option, index) => (
          <button 
            key={index} 
            className="option-button"
            onClick={() => onAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button 
        onClick={() => navigate(-1)} 
        className="button back-button question-back-button" 
        style={{ marginTop: '20px' }} // Basic inline style, can be moved to CSS
      >
        Back
      </button>
    </div>
  );
};

export default Question;
