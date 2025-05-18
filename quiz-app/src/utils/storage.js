/**
 * Utility functions for handling localStorage with expiration
 */

// Set data in localStorage with expiration (default 7 days)
export const setWithExpiry = (key, value, ttl = 7 * 24 * 60 * 60 * 1000) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Get data from localStorage and check if it's expired
export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  
  // Return null if item doesn't exist
  if (!itemStr) {
    return null;
  }
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  // Compare the expiry time with current time
  if (now.getTime() > item.expiry) {
    // If expired, remove the item and return null
    localStorage.removeItem(key);
    return null;
  }
  
  return item.value;
};

// Save a score to the leaderboard
export const saveScore = (username, score, category, difficulty) => {
  const now = new Date();
  const scoreData = {
    username,
    score,
    category,
    difficulty,
    date: now.toISOString()
  };
  
  // Get existing scores or initialize empty array
  const existingScores = getWithExpiry('qurio_scores') || [];
  
  // Add new score
  existingScores.push(scoreData);
  
  // Save back to localStorage with 7-day expiry
  setWithExpiry('qurio_scores', existingScores);
  
  return existingScores;
};

// Get all scores from localStorage
export const getScores = () => {
  return getWithExpiry('qurio_scores') || [];
};

// Save username
export const saveUsername = (username) => {
  setWithExpiry('qurio_username', username);
};

// Get username
export const getUsername = () => {
  return getWithExpiry('qurio_username');
};
