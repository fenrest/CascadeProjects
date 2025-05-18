import React, { useState } from 'react';
import Question from './Question';
import './QuizForm.css';

const QuizForm = ({ quizData, onSubmit, onBack, onComplete }) => {
  // Ensure compatibility with both prop naming conventions
  const questions = quizData || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Use onSubmit if provided, otherwise fall back to onComplete for compatibility
      if (onSubmit) {
        onSubmit(newAnswers);
      } else if (typeof onComplete === 'function') {
        onComplete(newAnswers);
      }
    }
  };
  
  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
    }
  };
  
  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }
  
  return (
    <div className="quiz-form">
      <div className="quiz-header">
        <button 
          type="button" 
          onClick={handleBack} 
          className="button back-button quiz-back-button"
        >
          Back to Settings
        </button>
        <div className="quiz-progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
      
      <Question 
        question={questions[currentQuestionIndex]}
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        onAnswerSelect={handleAnswerSelect}
      />
    </div>
  );
};

export default QuizForm;
