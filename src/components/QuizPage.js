import React, { useState, useEffect } from 'react';
import '../index.css'; // Tailwind styles
// import quiz from '../quizData.json'

const QuizPage = ({quiz}) => {
    const [quizData, setQuizData] = useState(null); // Store fetched quiz data
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);

    // useEffect(() => {
    //     // Fetch the quiz data from a JSON file located in the public directory
    //     const fetchQuizData = async () => {
    //         const response = await fetch('/quizData.json');
    //         const data = await response.json();
    //         setQuizData(data);
    //     };
        
    //     fetchQuizData();
    // }, []);

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handleNextQuestion = () => {
        const isCorrect = selectedOption === quizData.questions[currentQuestion].answer;

        if (isCorrect) {
            setScore(score + 1);
        }

        setResults([
            ...results,
            {
                question: quizData.questions[currentQuestion].question,
                selectedOption,
                correctAnswer: quizData.questions[currentQuestion].answer,
                isCorrect,
                justification: quizData.questions[currentQuestion].justification
            }
        ]);

        setSelectedOption(null);
        if (currentQuestion < quizData.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption(null);
        setShowResults(false);
        setResults([]);
    };

    if (!quizData) {
        return <p>Loading quiz...</p>; // Render a loading state while data is fetched
    }

    return (
        <div className="min-h-screen bg-gray-100 p-5 flex items-center justify-center">
            <div className="bg-white shadow-lg p-6 rounded-lg max-w-xl w-full">
                {!showResults ? (
                    <>
                        <h1 className="text-xl font-bold mb-4">
                            Question {currentQuestion + 1}/{quizData.questions.length}
                        </h1>
                        <p className="mb-6 text-lg">{quizData.questions[currentQuestion].question}</p>

                        <div className="grid grid-cols-1 gap-4">
                            {quizData.questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(index)}
                                    className={`p-3 border rounded-md text-left ${
                                        selectedOption === index ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedOption === null}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                            >
                                {currentQuestion === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
                        <p className="text-lg mb-4">Your Score: {score}/{quizData.questions.length}</p>

                        <div className="mb-6">
                            <h2 className="text-lg font-bold mb-2">Results</h2>
                            {results.map((result, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-gray-700">
                                        <strong>Q{index + 1}:</strong> {result.question}
                                    </p>
                                    <p className={`text-sm ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                        Your Answer: {quizData.questions[index].options[result.selectedOption]} 
                                        ({result.isCorrect ? 'Correct' : 'Incorrect'})
                                    </p>
                                    <p className="text-gray-500 text-sm">Correct Answer: {quizData.questions[index].options[result.correctAnswer]}</p>
                                    <p className="text-gray-500 text-sm italic">Justification: {result.justification}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleRestartQuiz}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Restart Quiz
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
