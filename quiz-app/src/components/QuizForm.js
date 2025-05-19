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
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }
  
  return (
    <div className="quiz-form">
      <div className="quiz-header">
        <div className="quiz-progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
      
      <Question 
        question={questions[currentQuestionIndex]}
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        onAnswerSelect={handleAnswerSelect}
        onPreviousQuestion={handlePreviousQuestion}
      />
    </div>
  );
};

export default QuizForm;
