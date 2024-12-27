import { IQuiz, IOption } from "@/app/admin/create-quiz/page";
import { FC } from "react";
import { IQuizResults } from "./CourseQuizzes";

type QuizMyAnswersPopupProps = {
  quizData: IQuiz; 
  userResults: IQuizResults; 
  onClose: () => void; 
};

export const QuizMyAnswersPopup: FC<QuizMyAnswersPopupProps> = ({
  quizData,
  userResults,
  onClose,
}) => {
  // Mapping user results for quick lookup
  const userAnswersMap = new Map(
    userResults.results.map((result) => [result.question_id, result.options_ids])
  );

  return (
    <div className="fixed cursor-default inset-0 text-black bg-gray-700 bg-opacity-60 flex items-center justify-center z-[9999]">
      <div className="bg-white border-gray-500 border w-[90%] h-[90%] p-6 relative shadow-lg overflow-auto">
        {/* Close Button */}
        <button
          className="absolute top-0 right-5 text-gray-600 hover:text-gray-900 text-[2.5rem] font-semibold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-600 uppercase mb-4 text-center w-full">
          My Answers
        </h2>

        {quizData.quiz.map((quiz, index) => {
          const userSelectedOptionIds = userAnswersMap.get(quiz._id as string) || [];

          return (
            <div key={index}>
              {/* Question Order */}
              <div className="my-5 text-gray-500 underline font-semibold">
                <label>
                  Question {index + 1}/{quizData.quiz.length}
                </label>
              </div>

              {/* Question Text */}
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {quiz.question}
              </h3>

              {/* Options */}
              <div className="mt-4">
                {quiz.options.map((option, optIndex) => {
                  const isUserSelected = userSelectedOptionIds.includes(option._id as string);
                  return (
                    <div
                      key={optIndex}
                      className={`w-full text-left px-4 py-2 mt-2 rounded border cursor-not-allowed ${
                        isUserSelected
                          ? "bg-blue-100 border-blue-500 text-blue-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {option.option}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
