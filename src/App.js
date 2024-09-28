import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import UploadPage from './components/UploadPage';
import SummaryPage from './components/SummaryPage';
import ReadingPage from './components/ReadingPage';
import QuizPage from './components/QuizPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500">
        <Routes>
          <Route path="/" element={<Navigate to="/upload" replace />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<Navigate to="/upload" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;