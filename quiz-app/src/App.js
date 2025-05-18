import React, { useState, useEffect } from 'react';
import './App.css';
import QuizForm from './components/QuizForm';
import Results from './components/Results';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './components/LandingPage';
import { fetchQuizData, fetchCategories } from './services/api';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [quizOptions, setQuizOptions] = useState({
    amount: 5,
    category: '',
    difficulty: '',
    type: 'multiple'
  });
  const [showSetup, setShowSetup] = useState(true);
  const [showLanding, setShowLanding] = useState(true);

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

  const loadQuizData = async () => {
    setLoading(true);
    try {
      const data = await fetchQuizData(quizOptions);
      setQuizData(data);
      setShowSetup(false);
    } catch (error) {
      console.error('Error loading quiz data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setQuizOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuizComplete = (answers) => {
    setUserAnswers(answers);
    setShowResults(true);
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setShowResults(false);
    setShowSetup(true);
  };
  
  const handleStartQuiz = () => {
    setShowLanding(false);
  };
  
  const handleBackToHome = () => {
    setShowLanding(true);
    setShowResults(false);
    setShowSetup(true);
    setUserAnswers([]);
  };

  if (loading && !showSetup) {
    return <div className="app-container loading">Loading quiz...</div>;
  }

  return (
    <div className="app-wrapper">
      <Navbar onHomeClick={handleBackToHome} />
      <div className="app-container">
        {showLanding ? (
          <LandingPage onStartQuiz={handleStartQuiz} />
        ) : (
          <>
            <header className="app-header">
              <h1>{quizData?.quizTitle || 'Test Your Knowledge'}</h1>
              <p className="app-subtitle">Powered by Open Trivia Database <span className="emoji">🎓</span></p>
            </header>
            <main className="app-main">
              {showSetup ? (
                <div className="quiz-setup">
                  <h2>Quiz Settings</h2>
                  <form onSubmit={(e) => { e.preventDefault(); loadQuizData(); }} className="setup-form">
                    <div className="form-group">
                      <label htmlFor="amount">Number of Questions:</label>
                      <select 
                        id="amount" 
                        name="amount" 
                        value={quizOptions.amount} 
                        onChange={handleOptionChange}
                      >
                        {[5, 10, 15, 20].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
              
                    <div className="form-group">
                      <label htmlFor="category">Category:</label>
                      <select 
                        id="category" 
                        name="category" 
                        value={quizOptions.category} 
                        onChange={handleOptionChange}
                      >
                        <option value="">Any Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
              
                    <div className="form-group">
                      <label htmlFor="difficulty">Difficulty:</label>
                      <select 
                        id="difficulty" 
                        name="difficulty" 
                        value={quizOptions.difficulty} 
                        onChange={handleOptionChange}
                      >
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
              
                    <div className="form-group">
                      <label htmlFor="type">Question Type:</label>
                      <select 
                        id="type" 
                        name="type" 
                        value={quizOptions.type} 
                        onChange={handleOptionChange}
                      >
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                      </select>
                    </div>
                    
                    <button type="submit" className="start-button">Start Quiz</button>
                  </form>
                </div>
              ) : showResults ? (
                <Results 
                  questions={quizData.questions} 
                  userAnswers={userAnswers} 
                  onRestart={handleRestart}
                />
              ) : (
                <QuizForm 
                  questions={quizData.questions} 
                  onComplete={handleQuizComplete} 
                />
              )}
            </main>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
