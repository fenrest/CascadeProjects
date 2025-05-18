import React from 'react';
import './Results.css';

const Results = ({ questions, userAnswers, onBack, onRestart, onHome, onViewLeaderboard }) => {
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  
  // Determine score category for emoji display
  const getScoreCategory = () => {
    if (percentage === 100) return "perfect";
    if (percentage >= 80) return "excellent";
    if (percentage >= 70) return "good";
    if (percentage >= 50) return "average";
    return "poor";
  };

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <div className="score-summary">
        <p>You scored {score} out of {questions.length}</p>
        <p className="percentage" data-score={getScoreCategory()}>{percentage}%</p>
      </div>
      
      <div className="answers-review">
        <h3>Review Your Answers</h3>
        {questions.map((question, index) => (
          <div key={index} className={`question-review ${userAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
            <p className="question-text">{question.text}</p>
            <p className="your-answer">Your answer: {userAnswers[index]}</p>
            <p className="correct-answer">Correct answer: {question.correctAnswer}</p>
          </div>
        ))}
      </div>
      
      <div className="results-actions">
        <button className="results-button" onClick={onBack}>
          Back
        </button>
        <button className="results-button" onClick={onRestart}>
          Take Quiz Again
        </button>
        <button className="results-button" onClick={onViewLeaderboard}>
          View Leaderboard
        </button>
        <button className="results-button home" onClick={onHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Results;