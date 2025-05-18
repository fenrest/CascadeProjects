import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onStartQuiz }) => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-text">
          <h1>Test, learn, get smarter, and expand your knowledge.</h1>
          <p className="landing-subtitle">
            Build your knowledge with fun quizzes on any topic. Challenge yourself with questions from general knowledge to specialized subjects.
          </p>
          <button className="landing-button" onClick={onStartQuiz}>
            TRY TRIVIA MASTER FOR FREE
          </button>
        </div>
        
        <div className="landing-image">
          <div className="image-collage">
            <div className="collage-item item-1">
              <span className="emoji-icon">🧠</span>
            </div>
            <div className="collage-item item-2">
              <span className="emoji-icon">📚</span>
            </div>
            <div className="collage-item item-3">
              <span className="emoji-icon">🎓</span>
            </div>
            <div className="collage-item item-4">
              <span className="emoji-icon">❓</span>
            </div>
            <div className="collage-item item-5">
              <span className="emoji-icon">🏆</span>
            </div>
            <div className="collage-item item-6">
              <span className="emoji-icon">🔍</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="landing-features">
        <div className="feature">
          <div className="feature-icon">🌐</div>
          <h3>Diverse Categories</h3>
          <p>From science to pop culture, we've got questions on everything.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⏱️</div>
          <h3>Quick Quizzes</h3>
          <p>Test your knowledge in just a few minutes.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📊</div>
          <h3>Track Progress</h3>
          <p>See your scores and improve over time.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
