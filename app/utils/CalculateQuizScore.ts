import { IQuestion, IQuiz } from "../admin/create-quiz/page";
import { IQuizResults } from "../components/Course/CourseQuizzes";

 const CalculateScore = (userResults: IQuizResults, quiz: IQuiz): number => {
    // Initialize the score
    let score = 0;
  
    // Map the questions from the quiz for easier lookup
    const questionMap = new Map<string, IQuestion>(
      quiz.quiz.map((question) => [question._id || "no_id", question])
    );

  
    // Iterate through the user's results
    userResults.results.forEach((userResult) => {
      const question = questionMap.get(userResult.question_id);
  
      if (question) {
        // Get the correct options for the current question
        const correctOptionIds = question.options
          .filter((option) => option.is_correct)
          .map((option) => option._id);
  
        // Check if the user's answers match the correct options
        const isCorrect = 
          correctOptionIds?.length === userResult.options_ids.length &&
          correctOptionIds?.every((id) => userResult.options_ids.includes(id));
        // If the answer is correct, add the question's points to the score
        if (isCorrect) {
          score =score +1;
        }
      }
    });
  
    return score;
  };

  export default CalculateScore;

  