import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !difficulty) {
      setError('Please select a file and difficulty level');
      navigate('/summary', { state: { summary: 'No file or difficulty selected. Please try again.' } });
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('difficulty', difficulty);

    try {
      const response = await fetch('http://your-backend-api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
      navigate('/summary', { state: { summary: data.summary } });
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('An error occurred while uploading the file. Please try again.');
      navigate('/summary', { state: { summary: 'Error occurred during file upload. Please try again.' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform hover:scale-102 transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
          <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg">Upload PDF</h1>
          <p className="text-center text-white text-opacity-80 mt-2">Select your file and choose difficulty level</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-4">
            <label className="block text-gray-800 text-xl font-bold mb-2" htmlFor="file-upload">
              Choose a PDF file
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              id="file-upload"
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold py-4 px-6 rounded-xl inline-block transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full text-center relative overflow-hidden group"
            >
              <span className="relative z-10">{file ? file.name : 'Select File'}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
            </label>
          </div>
          <div className="space-y-4">
            <h3 className="block text-gray-800 text-xl font-bold mb-4">Select Difficulty:</h3>
            <div className="flex justify-between space-x-4">
              {['easy', 'medium', 'hard'].map((level) => (
                <label key={level} className="flex-1">
                  <input
                    type="radio"
                    value={level}
                    checked={difficulty === level}
                    onChange={handleDifficultyChange}
                    className="sr-only"
                  />
                  <div className={`cursor-pointer p-4 rounded-xl text-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md ${
                    difficulty === level
                      ? level === 'easy' ? 'bg-emerald-500 text-white' :
                        level === 'medium' ? 'bg-amber-500 text-white' :
                        'bg-rose-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}>
                    <span className="text-lg font-semibold capitalize">{level}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm font-medium animate-bounce bg-red-100 border border-red-400 rounded-lg p-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              'Next'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;