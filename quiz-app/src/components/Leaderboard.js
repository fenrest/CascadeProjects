import React from 'react';
import { motion } from 'framer-motion';
import './Leaderboard.css';

const Leaderboard = ({ scores, currentUsername, onBack }) => {
  // Sort scores by score value (highest first)
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  
  return (
    <div className="leaderboard-wrapper">
      <motion.div 
        className="leaderboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Leaderboard</h2>
        <p className="leaderboard-subtitle">Top scores from the last 7 days</p>
        
        {sortedScores.length > 0 ? (
          <div className="scores-table">
            <div className="table-header">
              <div className="username-column">Username</div>
              <div className="score-column">Score</div>
              <div className="date-column">Date</div>
            </div>
            
            {sortedScores.map((score, index) => (
              <motion.div 
                key={index}
                className={`table-row ${score.username === currentUsername ? 'current-user' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="username-column">{score.username}</div>
                <div className="score-column">{score.score}%</div>
                <div className="date-column">{new Date(score.date).toLocaleDateString()}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-scores">
            <p>No scores yet. Be the first to make the leaderboard!</p>
          </div>
        )}
      </motion.div>
      
      <motion.button 
        className="back-button"
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Home
      </motion.button>
    </div>
  );
};

export default Leaderboard;
