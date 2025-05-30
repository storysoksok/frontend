// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import QuestionSectionPage from './pages/QuestionSection';
import CreatingPage from './pages/Creating';
import Library from './pages/Library';
import StoryProcess from './pages/StoryProcess';
import StatsPage from './pages/StatsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/question" element={<QuestionSectionPage />} />
        <Route path="/creating" element={<CreatingPage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/storyprocess" element={<StoryProcess />} />
        <Route path="/stats" element={<StatsPage />} />
        {/* 다른 페이지들도 여기 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
