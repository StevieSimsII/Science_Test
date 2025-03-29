import React, { useState } from 'react';

function Quiz({ lesson, onComplete, onRestart }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const totalQuestions = lesson.questions.length;

  const handleAnswer = (selectedAnswer) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: selectedAnswer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    lesson.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct += 1;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Quiz Results</h2>
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">{calculateScore()}%</p>
          <p className="text-gray-600 mt-2">
            You got {Object.values(answers).filter(
              (answer, index) => answer === lesson.questions[index].correctAnswer
            ).length}{' '}
            out of {totalQuestions} questions correct
          </p>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Another Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{lesson.title}</h2>
        <p className="text-gray-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-lg mb-4">{currentQuestion.question}</p>
        <div className="space-y-2">
          {currentQuestion.type === 'multiple_choice' ? (
            currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-3 text-left rounded-lg transition-colors duration-200 ${
                  answers[currentQuestion.id] === index
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  answers[currentQuestion.id] === true
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  answers[currentQuestion.id] === false
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                False
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            currentQuestionIndex === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Quiz; 