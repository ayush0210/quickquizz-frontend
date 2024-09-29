import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css'; // Tailwind styles

const QuizPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const quizData = location.state?.quiz || { questions: [] };

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds
    const [timerActive, setTimerActive] = useState(true);
    const handleFinishQuiz = useCallback(() => {
        setShowResults(true);
        setTimerActive(false); // Stop the timer when the quiz is finished
    }, []);


    useEffect(() => {
        if (timerActive) {
            const timerId = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerId);
                        handleFinishQuiz();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timerId); // Cleanup on unmount
        }
    }, [timerActive, handleFinishQuiz]);

    const handleStartQuiz = () => {
        setTimerActive(true); // Start the timer when the quiz begins
        setTimeRemaining(180); // Reset timer to 3 minutes
    };

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
            handleFinishQuiz(); // Move to finish quiz when the last question is answered
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption(null);
        setShowResults(false);
        setResults([]);
        setTimeRemaining(60); // Reset timer for the new quiz
        setTimerActive(true); // Ensure the timer is active
    };

    // Format the remaining time as minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    };

    // Calculate the progress percentage
    const progressPercentage = ((60 - timeRemaining) / 60) * 100;
    const handleExit = () => {
        navigate('/UploadPage');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-5 flex items-center justify-center">
            <div className="bg-white shadow-lg p-6 rounded-lg max-w-xl w-full">
                {!showResults ? (
                    <>
                        <h1 className="text-xl font-bold mb-4">
                            Question {currentQuestion + 1}/{quizData.questions.length}
                        </h1>
                        <p className="mb-6 text-lg">{quizData.questions[currentQuestion].question}</p>
                        <div className="mb-4">
                            <p className={`mb-2 text-lg font-bold ${timeRemaining <= 30 ? 'text-red-600' : 'text-black'}`}>
                                Time Remaining: {formatTime(timeRemaining)}
                            </p>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${
                                        timeRemaining <= 30 ? 'bg-red-500' : 'bg-blue-500'
                                    }`}
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                        {quizData.questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                className={`block w-full text-left p-2 mb-2 rounded-md ${selectedOption === index ? 'bg-blue-100' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {option}
                            </button>
                        ))}
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedOption === null}
                                className="p-2 bg-blue-500 text-white rounded-md"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
                        <p className="mb-2">Your Score: {score}/{quizData.questions.length}</p>
                        <div>
                            {results.map((result, index) => (
                                <div key={index} className={`p-2 mb-2 border rounded-md ${result.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                                    <p className="font-semibold">{result.question}</p>
                                    <p className="italic">
                                        Your Answer: {result.selectedOption !== null ? quizData.questions[index].options[result.selectedOption] : 'None'}
                                    </p>
                                    <p className="italic">
                                        Correct Answer: {quizData.questions[index].options[result.correctAnswer]}
                                    </p>
                                    <p className="text-sm">{result.justification}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleRestartQuiz} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
                            Restart Quiz
                        </button>
                    </>
                )}
            </div>
            {showResults && (
                <button
                    onClick={handleExit}
                    className="fixed bottom-4 left-4 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                    Exit
                </button>
            )}
        </div>
    );
};

export default QuizPage;