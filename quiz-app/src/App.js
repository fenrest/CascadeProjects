import React, { useState, useEffect } from 'react';
import './App.css';
import QuizForm from './components/QuizForm';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './components/LandingPage';
import Results from './components/Results';
import UserRegistration from './components/UserRegistration';
import CategorySelection from './components/CategorySelection';
import QuizSetup from './components/QuizSetup';
import Leaderboard from './components/Leaderboard';

import { fetchQuizData, fetchCategories } from './services/api';
import { getUsername, saveUsername, getScores, saveScore } from './utils/storage';

function App() {
  // Quiz data and answers
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // User data
  const [username, setUsername] = useState(getUsername() || '');
  const [scores, setScores] = useState(getScores());
  
  // Selected category for quiz
  const [selectedCategory, setSelectedCategory] = useState({
    id: '',
    name: ''
  });
  
  // Quiz options
  const [quizOptions, setQuizOptions] = useState({
    amount: 5,
    category: '',
    difficulty: '',
    type: 'multiple'
  });
  
  // App screens
  const [currentScreen, setCurrentScreen] = useState(
    username ? 'landing' : 'registration'
  );

  useEffect(() => {
    // Load available categories when component mounts
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadQuizData = async (options) => {
    setLoading(true);
    try {
      const data = await fetchQuizData(options);
      setQuizData(data);
      setCurrentScreen('quiz');
    } catch (error) {
      console.error('Error loading quiz data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle user registration
  const handleRegister = (username) => {
    setUsername(username);
    saveUsername(username);
    setCurrentScreen('landing');
  };
  
  // Handle start quiz from landing page
  const handleStartQuiz = () => {
    setCurrentScreen('categories');
  };
  
  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    const selectedCat = categories.find(cat => cat.id === categoryId) || { id: '', name: 'Random' };
    setSelectedCategory(selectedCat);
    setCurrentScreen('setup');
  };
  
  // Handle quiz setup and start
  const handleQuizSetup = (options) => {
    setQuizOptions(options);
    loadQuizData(options);
  };
  
  // Handle quiz completion
  const handleQuizComplete = (answers) => {
    setUserAnswers(answers);
    
    // Calculate score
    let score = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    
    const percentage = Math.round((score / quizData.questions.length) * 100);
    
    // Save score to leaderboard
    const updatedScores = saveScore(
      username,
      percentage,
      selectedCategory.name,
      quizOptions.difficulty || 'Any'
    );
    
    setScores(updatedScores);
    setCurrentScreen('results');
  };
  
  // Handle restart quiz
  const handleRestart = () => {
    setUserAnswers([]);
    setCurrentScreen('setup');
  };
  
  // Handle back to home
  const handleBackToHome = () => {
    setCurrentScreen('landing');
    setUserAnswers([]);
  };
  
  // Handle view leaderboard
  const handleViewLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };
  
  // Handle back actions based on current screen
  const handleBack = () => {
    switch (currentScreen) {
      case 'categories':
        setCurrentScreen('landing');
        break;
      case 'setup':
        setCurrentScreen('categories');
        break;
      case 'leaderboard':
        setCurrentScreen('landing');
        break;
      default:
        setCurrentScreen('landing');
    }
  };

  if (loading) {
    return <div className="app-container loading">Loading quiz...</div>;
  }

  return (
    <div className="app-wrapper">
      <Navbar 
        onHomeClick={handleBackToHome} 
        onLeaderboardClick={handleViewLeaderboard}
        username={username}
      />
      <div className="app-container">
        {currentScreen === 'registration' && (
          <UserRegistration 
            onRegister={handleRegister} 
            existingUsername={username} 
          />
        )}
        
        {currentScreen === 'landing' && (
          <LandingPage 
            onStartQuiz={handleStartQuiz} 
            username={username}
          />
        )}
        
        {currentScreen === 'categories' && (
          <CategorySelection 
            categories={categories} 
            onSelectCategory={handleCategorySelect}
            onBack={handleBack}
          />
        )}
        
        {currentScreen === 'setup' && (
          <QuizSetup 
            categoryId={selectedCategory.id}
            categoryName={selectedCategory.name}
            onStartQuiz={handleQuizSetup}
            onBack={handleBack}
          />
        )}
        
        {currentScreen === 'quiz' && (
          <>
            <header className="app-header">
              <h1>{quizData?.quizTitle || 'Test Your Knowledge'}</h1>
              <p className="app-subtitle">Good luck, {username}!</p>
            </header>
            <main className="app-main">
              <QuizForm 
                questions={quizData.questions} 
                onComplete={handleQuizComplete} 
              />
            </main>
          </>
        )}
        
        {currentScreen === 'results' && (
          <>
            <header className="app-header">
              <h1>Quiz Results</h1>
              <p className="app-subtitle">Well done, {username}!</p>
            </header>
            <main className="app-main">
              <Results 
                questions={quizData.questions} 
                userAnswers={userAnswers} 
                onRestart={handleRestart}
                onHome={handleBackToHome}
                onViewLeaderboard={handleViewLeaderboard}
              />
            </main>
          </>
        )}
        
        {currentScreen === 'leaderboard' && (
          <Leaderboard 
            scores={scores} 
            currentUsername={username} 
            onBack={handleBack} 
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
