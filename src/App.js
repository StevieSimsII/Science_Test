import React, { useState } from 'react';
import { quizData } from './data/quizData';
import QuizSelector from './components/QuizSelector';
import Quiz from './components/Quiz';
import './styles/App.css';

function App() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setQuizComplete(false);
  };

  const handleQuizComplete = () => {
    setQuizComplete(true);
  };

  const handleRestart = () => {
    setSelectedLesson(null);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Science Quiz
                </h1>
                {!selectedLesson ? (
                  <QuizSelector
                    lessons={quizData.lessons}
                    onLessonSelect={handleLessonSelect}
                  />
                ) : (
                  <Quiz
                    lesson={selectedLesson}
                    onComplete={handleQuizComplete}
                    onRestart={handleRestart}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 