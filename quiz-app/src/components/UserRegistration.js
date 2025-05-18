import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './UserRegistration.css';

const UserRegistration = ({ onRegister, existingUsername }) => {
  const [username, setUsername] = useState(existingUsername || '');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate username
    if (username.trim().length >= 3 && username.trim().length <= 15) {
      setIsValid(true);
      setError('');
    } else {
      setIsValid(false);
      if (username.trim().length > 0) {
        setError('Username must be between 3-15 characters');
      } else {
        setError('');
      }
    }
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isValid) {
      onRegister(username.trim());
    } else {
      setError('Please enter a valid username (3-15 characters)');
    }
  };

  return (
    <motion.div 
      className="user-registration"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Welcome to Qurio!</h2>
      <p className="registration-subtitle">Enter a username to start your quiz journey</p>
      
      <form onSubmit={handleSubmit} className="username-form">
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            className={error ? 'error' : ''}
            autoComplete="off"
            maxLength={15}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <motion.button 
          type="submit"
          className="register-button"
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.95 } : {}}
        >
          Continue
        </motion.button>
      </form>
      
      <p className="data-notice">
        Your username and scores will be saved for 7 days.
      </p>
    </motion.div>
  );
};

export default UserRegistration;
