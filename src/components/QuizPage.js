import React, { useState } from 'react';
import '../index.css'; // Tailwind styles

const quizData = {
    "questions": [
        {
            "question": "Who proposed an index to measure fielding and wicket-keeping potentials in cricket?",
            "options": [
                "Gerber and Sharp",
                "Suleman and Saeed",
                "Lemmer",
                "Saikia, Bhattacharjee and Bhattacharjee"
            ],
            "answer": 0,
            "justification": "Gerber and Sharp (2006) proposed an index to measure fielding and wicket-keeping potentials."
        },
        {
            "question": "What is the 'SS Index'?",
            "options": [
                "A tool for analysing player performance in batting, bowling and wicket-keeping",
                "A tool for measuring fielding potentials",
                "A method to determine optimal scoring rates",
                "A player rating system in ODI cricket"
            ],
            "answer": 0,
            "justification": "Suleman and Saeed (2009) introduced the 'SS Index', a comprehensive tool for analysing player performance in batting, bowling and wicket-keeping, using Twenty20 cricket match data."
        },
        {
            "question": "What did Lemmer (2011) focus on in Test cricket?",
            "options": [
                "Batting performance",
                "Bowling performance",
                "Fielding performance",
                "Wicket-keeping performance and batting performance"
            ],
            "answer": 3,
            "justification": "Lemmer (2011) focused specifically on wicket-keeping performance in Test cricket, considering both batting performance and dismissal rate."
        },
        // Add the rest of your questions here...
    ]
};

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);

    const totalQuestions = quizData.questions.length;

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handleNextQuestion = () => {
        const isCorrect = selectedOption === quizData.questions[currentQuestion].answer;

        // Update score and track whether the answer was correct or not
        if (isCorrect) {
            setScore(score + 1);
        }

        // Store result (whether it's correct or not)
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
        if (currentQuestion < totalQuestions - 1) {
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

    return (
        <div className="min-h-screen bg-gray-100 p-5 flex items-center justify-center">
            <div className="bg-white shadow-lg p-6 rounded-lg max-w-xl w-full">
                {!showResults ? (
                    <>
                        <h1 className="text-xl font-bold mb-4">
                            Question {currentQuestion + 1}/{totalQuestions}
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
                                {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
                        <p className="text-lg mb-4">Your Score: {score}/{totalQuestions}</p>

                        <div className="mb-6">
                            <h2 className="text-lg font-bold mb-2">Results</h2>
                            {results.map((result, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-gray-700">
                                        <strong>Q{index + 1}:</strong> {result.question}
                                    </p>
                                    <p className={`text-sm ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                        Your Answer: {quizData.questions[index].options[result.selectedOption]} [{result.isCorrect ? 'Correct' : 'Incorrect'}]
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
