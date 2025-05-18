# Quiz App

A simple interactive quiz application built with React that allows users to take quizzes and see their results.

## Features

- Interactive quiz interface
- Multiple-choice questions
- Score calculation
- Results review with correct/incorrect answers highlighted
- Option to restart the quiz

## Project Structure

```
/quiz-app
  /public
    index.html
  /src
    /components
      Question.js - Individual question display
      QuizForm.js - Quiz form controller
      Results.js - Results display
    /services
      api.js - Mock API service for quiz data
    App.js - Main application component
    index.js - Entry point
    App.css - Main styles
    index.css - Global styles
  package.json - Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Customizing the Quiz

To add or modify quiz questions, edit the mock data in `/src/services/api.js`. In a production environment, you would replace this with actual API calls to fetch quiz data from a server.

## License

MIT
