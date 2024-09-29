import React, { useState, useEffect } from 'react';
import '../index.css'; // Tailwind styles

const QuizPage = () => {
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
            {
                "question": "Who applied dynamic programming techniques to determine optimal scoring rates in One-Day International matches?",
                "options": [
                    "Peterson et al.",
                    "Clarke",
                    "Johnston",
                    "Preston and Thomas"
                ],
                "answer": 1,
                "justification": "Clarke (1988) applied dynamic programming techniques in a study on One-Day International matches to determine optimal scoring rates and suggest possible winning batting strategies."
            },
            {
                "question": "Who introduced a player rating system for One Day International (ODI) cricket using a dynamic programming model?",
                "options": [
                    "Johnston",
                    "Clarke and Norman",
                    "Preston and Thomas",
                    "Brooker and Hogan"
                ],
                "answer": 0,
                "justification": "Johnston (1992) introduced a player rating system for rating players and teams in One Day International (ODI) cricket using a dynamic programming model."
            },
            {
                "question": "Who were the first researchers to work with cricket data?",
                "options": [
                    "Elderton and Elderton",
                    "Johnston",
                    "Preston and Thomas",
                    "Brooker and Hogan"
                ],
                "answer": 0,
                "justification": "The first researchers to work with cricket data were Elderton and Elderton (1909), who wrote a book titled 'Primer of Statistics', a pioneering attempt to explain statistical notions using data from cricket."
            },
            {
                "question": "What did Elderton and Elderton (1909) demonstrate the application of in their book?",
                "options": [
                    "Dynamic Programming",
                    "Survival Analysis Models",
                    "Standard Deviation",
                    "The SS Index"
                ],
                "answer": 2,
                "justification": "They demonstrated the application of standard deviation for analyzing batting performance."
            },
            {
                "question": "Who predicted individual scores using data from both Test cricket and the County Championship?",
                "options": [
                    "Elderton and Wood",
                    "Wood",
                    "Swartz",
                    "Peterson et al."
                ],
                "answer": 0,
                "justification": "Elderton and Wood (1945) and Wood (1945b) predicted individual scores using data from both Test cricket and the County Championship."
            },
            {
                "question": "What did Swartz (2016) point out as a challenge in modelling Test cricket data?",
                "options": [
                    "The nature of scoring runs often varies for teams",
                    "The complexity of the game",
                    "The variation in player performance",
                    "The unpredictability of the game"
                ],
                "answer": 0,
                "justification": "Modelling Test cricket data is challenging, as pointed out by Swartz (2016), since the nature of scoring runs often varies for teams aiming for victory versus those trying to prevent a draw."
            },
            {
                "question": "Who developed a model to measure wicket-keeping, batting and bowling performance in cricket?",
                "options": [
                    "Saikia, Bhattacharjee and Bhattacharjee",
                    "Suleman and Saeed",
                    "Gerber and Sharp",
                    "Lemmer"
                ],
                "answer": 0,
                "justification": "Saikia, Bhattacharjee and Bhattacharjee (2012) developed a model to measure wicket-keeping, batting and bowling performance."
            }
        ]
    };

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
    const [timerActive, setTimerActive] = useState(false); // Track if the timer is active

    useEffect(() => {
        // Start the timer when the quiz starts
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
    }, [timerActive]);

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

    const handleFinishQuiz = () => {
        setShowResults(true);
        setTimerActive(false); // Stop the timer when the quiz is finished
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption(null);
        setShowResults(false);
        setResults([]);
        setTimeRemaining(180); // Reset timer for the new quiz
        setTimerActive(true); // Start the timer again
    };

    // Format the remaining time as minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    };

    // Calculate the progress percentage
    const progressPercentage = ((180 - timeRemaining) / 180) * 100;

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
                            <p className={`mb-2 text-lg font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-black'}`}>
                                Time Remaining: {formatTime(timeRemaining)} {/* Display timer */}
                            </p>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-1000"
                                    style={{ width: `${progressPercentage}%` }} // Progress bar
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
        </div>
    );
};

export default QuizPage;

