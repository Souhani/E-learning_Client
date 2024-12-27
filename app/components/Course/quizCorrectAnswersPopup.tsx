import { IOption, IQuiz } from "@/app/admin/create-quiz/page";
import { FC, useEffect, useState } from "react";

type QuizCorrectAnswersPopupProps = {
  quizData: IQuiz;
  onClose: () => void;
};

export const QuizCorrectAnswersPopup: FC<QuizCorrectAnswersPopupProps> = ({
  quizData,
  onClose,
}) => {
  return (
    <div className="fixed cursor-default inset-0 text-black bg-gray-700 bg-opacity-60 flex items-center justify-center z-[9999]">
      <div className="bg-white border-gray-500 border w-[90%] h-[90%] p-6 relative shadow-lg overflow-auto">
        {/* Close Button */}
        <button
          className="absolute top-0 right-5  text-gray-600 hover:text-gray-900 text-[2.5rem] font-semibold"
          onClick={onClose}
        >
          &times; {/* This is the "X" symbol */}
        </button>
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-600 uppercase mb-4 text-center w-full">
          Quiz Correction
        </h2>
        {quizData.quiz.map((quiz, index) => (
          <div key={index}>
            {/*  question orrder */}
            <div className=" my-5 text-gray-500 underline font-semibold">
              <label>
                Question {index + 1}/{quizData.quiz.length}
              </label>
            </div>
            {/* Quiz */}
            <div>
              {/* Question Text */}
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {quiz.question}
              </h3>

              {/* Options */}
              <div className="mt-4">
                {quiz?.options.map((option, index) => {
                  const isCorrect = option.is_correct; // Assuming you have an isCorrect property in the option object

                  return (
                    <div
                      key={index}
                      className={`w-full cursor-not-allowed text-left px-4 py-2 mt-2 rounded border ${
                        isCorrect
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {option.option}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
