import React from 'react';
import './Question.css';

const Question = ({ question, currentQuestion, totalQuestions, onAnswerSelect, onPreviousQuestion }) => {
  // Using window.history.back() instead of useNavigate
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
        onClick={onPreviousQuestion} 
        disabled={currentQuestion === 0}
        className="button previous-button" 
        style={{ marginTop: '20px' }} // Basic inline style, can be moved to CSS
      >
        <span className="button-text">Previous Question</span>
      </button>
    </div>
  );
};

export default Question;
