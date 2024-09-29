import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [summaryData, setSummaryData] = useState([]);
  const [doubt, setDoubt] = useState('');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (location.state && location.state.summary) {
      setSummaryData(location.state.summary);
    }
  }, [location.state]);

  const renderContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  const renderSummary = () => {
    if (summaryData.length === 0) {
      return <p>Loading summary...</p>;
    }

    return summaryData.map((item, index) => (
      <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">{item.title}</h2>
        <div className="text-gray-700">
          {renderContent(item.content)}
        </div>
      </div>
    ));
  };

  const handleStartQuiz = () => {
    navigate('/quiz', { state: { quiz: location.state.quiz } });
  };

  const handleAskDoubt = () => {
    console.log("Doubt submitted:", doubt);
    setDoubt('');
    resetTranscript();
  };

  const handleVoiceInput = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  useEffect(() => {
    setDoubt(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!listening) {
      resetTranscript();
    }
  }, [listening, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Summary</h1>
        {renderSummary()}
      </div>
      
      {/* Ask Doubt Section */}
      <div className="fixed bottom-8 left-8 flex flex-col space-y-4 w-64">
        <textarea
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          placeholder="Type your doubt here..."
          className="w-full p-3 rounded-lg shadow-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows="3"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleAskDoubt}
            className="flex-grow bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Ask Doubt
          </button>
          <button
            onClick={handleVoiceInput}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
              listening ? 'animate-pulse' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Start Quiz Button */}
      <button
        onClick={handleStartQuiz}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default SummaryPage;