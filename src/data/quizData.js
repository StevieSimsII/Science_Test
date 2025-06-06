import englishQuizData from './subjects/English/quizData';
import socialStudiesQuizData from './subjects/Social Studies/quizData';
import scienceQuizData from './subjects/Science/quizData';

const quizData = {
  lessons: [
    ...englishQuizData.lessons,
    ...socialStudiesQuizData.lessons,
    ...scienceQuizData.lessons
  ]
};

export default quizData; 
