/**
 * Simple database utility for storing and retrieving quiz data
 * Uses localStorage with expiration functionality
 */

import { getWithExpiry, setWithExpiry } from './storage';

// Database keys
const DB_KEYS = {
  SCORES: 'qurio_scores',
  USERS: 'qurio_users',
};

// Get all scores from the database
export const getAllScores = () => {
  // No need to manually clean up expired items, getWithExpiry handles that
  const scores = getWithExpiry(DB_KEYS.SCORES) || [];
  return scores;
};

// Save a new score to the database
export const saveScoreToDb = (scoreData) => {
  const scores = getAllScores();
  
  // Add the new score
  scores.push({
    ...scoreData,
    timestamp: Date.now(),
  });
  
  // Sort by score (highest first)
  scores.sort((a, b) => b.score - a.score);
  
  // Save back to storage
  setWithExpiry(DB_KEYS.SCORES, scores, 7 * 24 * 60 * 60 * 1000); // Store for 7 days
  
  return scores;
};

// Get scores for a specific username
export const getUserScores = (username) => {
  const scores = getAllScores();
  return scores.filter(score => score.username === username);
};

// Get top scores (limited to a certain number)
export const getTopScores = (limit = 10) => {
  const scores = getAllScores();
  return scores.slice(0, limit);
};

// Register a new user or update existing user
export const registerUser = (username) => {
  const users = getWithExpiry(DB_KEYS.USERS) || [];
  
  // Check if user already exists
  const existingUserIndex = users.findIndex(user => user.username === username);
  
  if (existingUserIndex >= 0) {
    // Update last login time
    users[existingUserIndex].lastLogin = Date.now();
  } else {
    // Add new user
    users.push({
      username,
      created: Date.now(),
      lastLogin: Date.now(),
    });
  }
  
  // Save back to storage
  setWithExpiry(DB_KEYS.USERS, users, 30 * 24 * 60 * 60 * 1000); // Store user data for 30 days
  
  return username;
};

// Get user data
export const getUserData = (username) => {
  const users = getWithExpiry(DB_KEYS.USERS) || [];
  return users.find(user => user.username === username) || null;
};

// Initialize the database with sample data if empty
export const initializeDatabase = () => {
  const scores = getAllScores();
  
  // Only initialize if no scores exist
  if (scores.length === 0) {
    const sampleScores = [
      { username: 'QuizMaster', score: 95, category: 'Science', timestamp: Date.now() - 86400000 * 2 },
      { username: 'TriviaKing', score: 90, category: 'History', timestamp: Date.now() - 86400000 * 3 },
      { username: 'BrainiacQueen', score: 85, category: 'Geography', timestamp: Date.now() - 86400000 * 1 },
      { username: 'KnowledgeSeeker', score: 80, category: 'Sports', timestamp: Date.now() - 86400000 * 4 },
      { username: 'QuizWhiz', score: 75, category: 'Entertainment', timestamp: Date.now() - 86400000 * 2 },
    ];
    
    setWithExpiry(DB_KEYS.SCORES, sampleScores, 7 * 24 * 60 * 60 * 1000);
  }
};

// Call initialization
// initializeDatabase(); // Removed to prevent pre-filling with sample scores

// Clear all database data
localStorage.removeItem(DB_KEYS.SCORES);
localStorage.removeItem(DB_KEYS.USERS);
