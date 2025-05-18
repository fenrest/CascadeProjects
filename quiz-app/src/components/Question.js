import React from 'react';

const Question = ({ question, currentQuestion, totalQuestions, onAnswerSelect }) => {
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
    </div>
  );
};

export default Question;
