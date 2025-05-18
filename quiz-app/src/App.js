import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import QuizForm from './components/QuizForm';
import Results from './components/Results';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import UserRegistration from './components/UserRegistration';
import CategorySelection from './components/CategorySelection';
import DifficultySelection from './components/DifficultySelection';
import Leaderboard from './components/Leaderboard';
import { getUsername, saveUsername } from './utils/storage';
import { fetchQuizData, fetchCategories } from './services/api';
import { getTheme, applyTheme, initializeThemeSystem } from './utils/themes';
import { getAllScores, saveScoreToDb, getUserScores, getTopScores } from './utils/database';

function App() {
  // Initialize theme system with the current theme
  useEffect(() => {
    // Apply the current theme on initial load
    applyTheme(currentTheme);
    // Initialize the theme system for system preference detection
    initializeThemeSystem();
  }, []);
  // Quiz data and answers
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // User data
  const [username, setUsername] = useState(getUsername() || '');
  const [scores, setScores] = useState(getAllScores());
  
  // Theme data
  const [currentTheme, setCurrentTheme] = useState(getTheme());
  
  // Initialize theme system with the current theme
  useEffect(() => {
    // Apply the current theme on initial load
    applyTheme(currentTheme);
    // Initialize the theme system for system preference detection
    initializeThemeSystem();
  }, []);
  
  // Quiz options - categoryId will store the ID, categoryName for display
  const [quizOptions, setQuizOptions] = useState({
    amount: 5,
    categoryId: '', 
    categoryName: '',
    difficulty: '',
    type: 'multiple'
  });
  
  // App screens: 'landing', 'registration', 'categorySelection', 'difficultySelection', 'quiz', 'results', 'leaderboard'
  const [currentScreen, setCurrentScreen] = useState('landing');

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
    setCurrentScreen('categorySelection'); // Go to Category Selection after registration
  };
  
  // Handle start quiz from landing page
  const handleStartQuiz = () => {
    // Check if user has a username, if not redirect to registration
    if (!username) {
      setCurrentScreen('registration');
    } else {
      setCurrentScreen('categorySelection'); // Go to Category Selection if user exists
    }
  };
  
  // Handle category selection - New Step 2
  const handleCategorySelected = (categoryId, categoryName) => {
    setQuizOptions(prevOptions => ({
      ...prevOptions,
      categoryId: categoryId,
      categoryName: categoryName
    }));
    setCurrentScreen('difficultySelection');
    window.history.pushState({}, '', '/difficulty'); // Add to history stack
  };
  
  // Handle difficulty selection and start quiz - New Step 3
  const handleDifficultySelected = (difficulty, amount, type) => {
    const updatedOptions = {
      ...quizOptions,
      difficulty,
      amount,
      type
    };
    setQuizOptions(updatedOptions);
    // Construct options for API: categoryId maps to 'category' for fetchQuizData
    loadQuizData({ 
      amount: updatedOptions.amount,
      category: updatedOptions.categoryId, // API expects 'category' for ID
      difficulty: updatedOptions.difficulty,
      type: updatedOptions.type
    });
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
    const scoreData = {
      username,
      score: percentage,
      category: quizOptions.categoryName, // Use categoryName from quizOptions
      difficulty: quizOptions.difficulty || 'Any',
      date: new Date().toISOString()
    };
    
    const updatedScores = saveScoreToDb(scoreData);
    setScores(updatedScores);
    setCurrentScreen('results');
  };
  
  // Handle restart quiz
  const handleRestart = () => {
    setUserAnswers([]);
    // Reset parts of quizOptions for a fresh start, keep username
    setQuizOptions(prev => ({ 
        ...prev,
        categoryId: '', 
        categoryName: '',
        difficulty: '', 
        amount: 5, 
        type: 'multiple' 
    }));
    setCurrentScreen('categorySelection'); // Or 'difficultySelection' if preferred
  };
  
  // Handle back to home or previous screen
  const handleBackToHome = () => {
    setCurrentScreen('landing');
    window.history.pushState({}, '', '/');
  };
  
  // Handle back from leaderboard
  const handleBackFromLeaderboard = () => {
    setCurrentScreen('landing');
    window.history.pushState({}, '', '/');
  };
  
  // Handle back to categories
  const handleBackToCategories = () => {
    setCurrentScreen('categorySelection');
    window.history.pushState({}, '', '/category');
  };
  
  // Handle view leaderboard
  const handleViewLeaderboard = () => {
    setCurrentScreen('leaderboard');
    window.history.pushState({}, '', '/leaderboard');
  };

  // Handle back actions based on current screen
  const handleBack = () => {
    switch (currentScreen) {
      case 'quiz':
        setCurrentScreen('difficultySelection');
        // Optionally clear quizData and userAnswers here if needed
        setQuizData(null);
        setUserAnswers([]);
        break;
      case 'difficultySelection':
        setCurrentScreen('categorySelection');
        // Reset difficulty, amount, type if user goes back
        setQuizOptions(prev => ({ ...prev, difficulty: '', amount: 5, type: 'multiple' }));
        break;
      case 'categorySelection':
        setCurrentScreen('landing');
        // Reset category info
        setQuizOptions(prev => ({ ...prev, categoryId: '', categoryName: '' }));
        break;
      case 'registration': // Back from registration
        setCurrentScreen('landing');
        break;
      case 'results': // Back from results page (handled by onHome in Results component)
        setCurrentScreen('landing'); 
        break;
      case 'leaderboard': // Back from leaderboard
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
    <div className="app">
      <Navbar 
        username={username} 
        onHomeClick={() => setCurrentScreen('landing')}
        onLeaderboardClick={() => setCurrentScreen('leaderboard')}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />
      <div className="app-container">
        {currentScreen === 'landing' && (
          <LandingPage 
            onStartQuiz={handleStartQuiz} 
            username={username}
          />
        )}
        {currentScreen === 'registration' && (
          <UserRegistration 
            onRegister={handleRegister} 
            existingUsername={username} 
          />
        )}
        {currentScreen === 'categorySelection' && (
          <CategorySelection 
            categories={categories} 
            onCategorySelected={handleCategorySelected} 
            onBack={() => setCurrentScreen('landing')} 
          />
        )}
        {currentScreen === 'difficultySelection' && (
          <DifficultySelection 
            onDifficultySelected={handleDifficultySelected} 
            onBack={() => setCurrentScreen('categorySelection')} 
            categoryName={quizOptions.categoryName} 
          />
        )}
        {currentScreen === 'quiz' && quizData && (
          <QuizForm 
            quizData={quizData?.questions} 
            userAnswers={userAnswers} 
            onAnswerChange={setUserAnswers} 
            onComplete={() => setCurrentScreen('results')} 
          />
        )}
        {currentScreen === 'results' && quizData && (
          <Results 
            questions={quizData?.questions} 
            userAnswers={userAnswers} 
            onBack={() => setCurrentScreen('difficultySelection')} 
            onRestart={() => {
              setCurrentScreen('difficultySelection');
              setUserAnswers([]);
            }}
            onHome={() => setCurrentScreen('landing')}
            onViewLeaderboard={() => setCurrentScreen('leaderboard')}
          />
        )}
        {currentScreen === 'leaderboard' && (
          <Leaderboard 
            scores={scores} 
            onBack={() => setCurrentScreen('landing')} 
          />
        )}
      </div>
      <Footer 
        currentTheme={currentTheme} 
      />
    </div>
  );
}

export default App;
