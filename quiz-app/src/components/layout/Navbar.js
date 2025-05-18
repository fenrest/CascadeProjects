import React from 'react';
import './Navbar.css';

const Navbar = ({ onHomeClick, onLeaderboardClick, username }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon"></span>
          <h1>Qurio</h1>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick && onHomeClick(); }} className="nav-link active">
            <span className="nav-icon"></span>
            Home
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onLeaderboardClick && onLeaderboardClick(); }} className="nav-link">
            <span className="nav-icon"></span>
            Leaderboard
          </a>
        </div>
        
        {username && (
          <div className="user-info">
            <span className="username">Hi, {username}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
