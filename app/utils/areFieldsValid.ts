import { IQuiz } from "../admin/create-quiz/page";

// a function that checks if any field is empty before submitting the quiz
export  const isThereEmptyField = (quizData: IQuiz): boolean => {
  // Check title and course_id
  if (!quizData.title.trim() || !quizData.course_id.trim()) {
    return true;
  }

  // Check if quiz array exists and is not empty
  if (!quizData.quiz || quizData.quiz.length === 0) {
    return true;
  }

  // Check each question
  return quizData.quiz.some(question => {
    // Check question fields
    if (!question.question.trim() || 
        question.time <= 0 ) {
      return true;
    }

    // Check if options array exists and has at least 2 options
    if (!question.options || question.options.length < 2) {
      return true;
    }

    // Check each option
    return question.options.some(option => 
      !option.option.trim() || 
      typeof option.is_correct !== 'boolean'
    );
  });
};