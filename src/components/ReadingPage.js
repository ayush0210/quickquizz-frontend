import React, { useState } from 'react';
import "../index.css";

const ReadingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [doubt, setDoubt] = useState('');
  const progress = 69; // Example progress value

  const handleDoubtSubmit = (e) => {
    e.preventDefault();
    console.log(doubt); // Handle the doubt submission here
    setDoubt(''); // Clear the doubt input after submission
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} h-screen`}>
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-5">
        {/* Toggle Dark/Light Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded mb-4"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Progress Bar Section */}
        <div className="p-5">
          <h2 className="text-lg font-semibold">Your Progress</h2>
          <div className="w-full bg-gray-200 rounded-full mt-4">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="p-5">
          <h1 className="text-xl font-bold">My Education Summary</h1>
          <p className="mt-4">
            I have a background in Computer and Information Sciences, with a Master's degree focusing on software engineering and web development. I have expertise in ReactJS, MERN stack, and web application design.
          </p>
        </div>

        {/* Doubt Submission Section */}
        <div className="p-5">
          <h2 className="text-lg font-semibold">Ask your doubts:</h2>
          <form onSubmit={handleDoubtSubmit} className="mt-4">
            <textarea
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Type your doubt here..."
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReadingPage;
