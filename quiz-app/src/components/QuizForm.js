import React, { useState } from 'react';
import Question from './Question';

const QuizForm = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };
  
  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }
  
  return (
    <div className="quiz-form">
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
