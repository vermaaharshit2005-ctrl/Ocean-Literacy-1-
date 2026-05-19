import React, { useState } from "react";

const questions = [
  {
    question: "Which is the Largest Animal in the World?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the World?",
    answers: [
      { text: "Vatican", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the Largest Desert in the World?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: true },
      { text: "Antarctica", correct: false },
    ],
  },
  {
    question: "Which is the Smallest continent in the World?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Europe", correct: false },
    ],
  },
];

export default function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    setSelectedAnswer(isCorrect ? "correct" : "incorrect");
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="bg-cyan-200 min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-lg mx-auto rounded-lg shadow-lg p-8">
        <h1 className="text-4xl text-red-600 border-b-2 pb-4">Sample Quiz for Ocean Literacy</h1>

        {!showScore ? (
          <div className="mt-6">
            <h2 className="text-xl text-blue-800 decoration-auto">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h2>

            <div className="my-4">
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer.correct)}
                  className={`btn w-full bg-white text-gray-900 font-semibold py-2 px-4 my-2 border border-gray-700 rounded-lg hover:bg-gray-900 hover:text-white text-xl transition-colors ${
                    selectedAnswer &&
                    (answer.correct ? "bg-green-300" : "bg-red-300")
                  }`}
                  disabled={selectedAnswer !== null} // Disable buttons after selection
                >
                  {answer.text}
                </button>
              ))}
            </div>

            {selectedAnswer && (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-900 text-white font-semibold py-2 px-6 mt-4 mx-auto rounded-lg hover:bg-blue-700 text-xl transition-colors"
              >
                Next
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl text-blue-800">
              You scored {score} out of {questions.length}!
            </h2>
            <button
              onClick={resetQuiz}
              className="bg-blue-900 text-white font-semibold py-2 px-6 mt-4 mx-auto rounded-lg hover:bg-blue-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
