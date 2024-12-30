import { IOption, IQuiz } from "@/app/admin/create-quiz/page";
import { FC, useEffect, useState } from "react";
import { IQuizResults } from "./CourseQuizzes";


type QuizPopupProps = {
  quizData: IQuiz;
  handleSubmitQuiz: (quizResults:IQuizResults) => void
};

export const QuizPopup: FC<QuizPopupProps> = ({ quizData, handleSubmitQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizData?.quiz[0]?.time);
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const [countdown, setCountdown] = useState(5);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizResults, setQuizResults] = useState<IQuizResults>({
    quiz_id: "",
    results: [],
  }); 
  // Use effect to update quizResults when quizData changes (only once)
  useEffect(() => {
    if (quizData) {
      setQuizResults((prev) => ({ ...prev, quiz_id: quizData._id || "" }));
    }
  }, [quizData]);
  
  const currentQuestion = quizData?.quiz[currentQuestionIndex];

  // Timer for Countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setQuizStarted(true); // Start the quiz after countdown
    }
  }, [countdown]);

  // Timer Effect for Quiz
  useEffect(() => {
    if (!quizStarted && timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      handleNextQuestion();
    }

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted]);

  // Handle Next Question
  const handleNextQuestion = () => {
    const updatedQuizResults = {...quizResults};
    updatedQuizResults.results.push({
        question_id: quizData.quiz[currentQuestionIndex]._id || "",
        options_ids: selectedOptions.map((opt => opt._id  || ""))
    })
    if (currentQuestionIndex < quizData.quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(quizData.quiz[currentQuestionIndex + 1].time);
      setSelectedOptions([]);
    } else {
      setQuizFinished(true); // Mark quiz as finished
    }
  };

  // Toggle Option Selection
  const toggleOptionSelection = (option:IOption) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(option)
          ? prev.filter((opt) => opt !== option) // Deselect if already selected
          : [...prev, option] // Select otherwise
    );
  };

  return (
    <div className="fixed inset-0 text-black bg-gray-700 bg-opacity-60 flex items-center justify-center z-[9999]">
      <div className="bg-white border-gray-500 border w-[90%] h-[90%] p-6 relative shadow-lg">
        {!quizStarted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-gray-800">Get Ready!</h2>
            <p className="text-xl text-gray-600">Starting in {countdown}s</p>
          </div>
        ) : quizFinished ? (
          <div className="flex flex-col items-center justify-center h-full">
            <button
              className="px-8 py-4 bg-green-500 text-white rounded-lg text-xl font-semibold hover:bg-green-600 transition"
              onClick={() => handleSubmitQuiz(quizResults)} // Submit the quiz (you can modify this as needed)
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Timer Bar */}
            <div className="flex gap-2 justify-between items-center">
              <span className=" text-gray-700 w-fit">{timeLeft}s</span>
              <div className="h-2 bg-gray-200 w-full rounded">
                <div
                  className="h-full bg-blue-500 rounded"
                  style={{
                    width: `${(timeLeft / currentQuestion.time) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-700 font-bold">
                Question {currentQuestionIndex + 1}/{quizData.quiz.length}
              </span>
            </div>
            {/* Quiz */}
            <div>
              {/* Question Text */}
              <h2 className="text-lg font-semibold text-gray-800 mt-4">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="mt-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left px-4 py-2 mt-2 rounded border transition-colors ${
                      selectedOptions.includes(option)
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleOptionSelection(option)}
                  >
                    {option.option}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6 absolute bottom-6 right-6">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < quizData.quiz.length - 1
                  ? "Next"
                  : "Finish"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
