// This file contains API calls to fetch quiz data from Open Trivia Database

/**
 * Fetches quiz data from the Open Trivia Database API
 * @param {Object} options - Configuration options for the quiz
 * @param {number} options.amount - Number of questions (default: 5)
 * @param {string} options.category - Category ID (default: any category)
 * @param {string} options.difficulty - Difficulty level: easy, medium, hard (default: any)
 * @param {string} options.type - Question type: multiple, boolean (default: multiple)
 * @returns {Promise} - Promise that resolves to formatted quiz data
 */
export const fetchQuizData = async (options = {}) => {
  const {
    amount = 5,
    category = '',
    difficulty = '',
    type = 'multiple'
  } = options;
  
  // Build the API URL with query parameters
  let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;
  
  if (category) apiUrl += `&category=${category}`;
  if (difficulty) apiUrl += `&difficulty=${difficulty}`;
  if (type) apiUrl += `&type=${type}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('Failed to fetch quiz data from Open Trivia Database');
    }
    
    // Transform the API response to match our app's format
    return {
      quizTitle: category ? `${getCategoryName(category)} Quiz` : 'General Knowledge Quiz',
      questions: data.results.map((question, index) => {
        // Decode HTML entities in the question and answers
        const decodedQuestion = decodeHtmlEntities(question.question);
        const correctAnswer = decodeHtmlEntities(question.correct_answer);
        
        // Combine and shuffle correct and incorrect answers
        const incorrectAnswers = question.incorrect_answers.map(answer => 
          decodeHtmlEntities(answer)
        );
        
        // Create an array with all options and shuffle them
        const options = [...incorrectAnswers, correctAnswer];
        shuffleArray(options);
        
        return {
          id: index + 1,
          text: decodedQuestion,
          options: options,
          correctAnswer: correctAnswer
        };
      })
    };
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};

/**
 * Helper function to decode HTML entities
 * @param {string} html - String with HTML entities
 * @returns {string} - Decoded string
 */
const decodeHtmlEntities = (html) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
};

/**
 * Helper function to shuffle an array (Fisher-Yates algorithm)
 * @param {Array} array - Array to shuffle
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/**
 * Get category name from category ID
 * @param {string} categoryId - Category ID
 * @returns {string} - Category name
 */
const getCategoryName = (categoryId) => {
  const categories = {
    9: 'General Knowledge',
    10: 'Entertainment: Books',
    11: 'Entertainment: Film',
    12: 'Entertainment: Music',
    13: 'Entertainment: Musicals & Theatres',
    14: 'Entertainment: Television',
    15: 'Entertainment: Video Games',
    16: 'Entertainment: Board Games',
    17: 'Science & Nature',
    18: 'Science: Computers',
    19: 'Science: Mathematics',
    20: 'Mythology',
    21: 'Sports',
    22: 'Geography',
    23: 'History',
    24: 'Politics',
    25: 'Art',
    26: 'Celebrities',
    27: 'Animals',
    28: 'Vehicles',
    29: 'Entertainment: Comics',
    30: 'Science: Gadgets',
    31: 'Entertainment: Japanese Anime & Manga',
    32: 'Entertainment: Cartoon & Animations'
  };
  
  return categories[categoryId] || 'General Knowledge';
};

/**
 * Get available categories from Open Trivia Database
 * @returns {Promise} - Promise that resolves to an array of category objects
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export default {
  fetchQuizData,
  fetchCategories
};
