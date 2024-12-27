import React, { FC, useEffect, useState } from "react";
import { QuizPopup } from "./quizPopup";
import { useGetQuizByCourseIdQuery } from "@/redux/features/quiz/quizApi";
import { Loader } from "../Loader/LoadPage";
import { useUpdateQuizzesMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { QuizCorrectAnswersPopup } from "./quizCorrectAnswersPopup";
import CalculateScore from "@/app/utils/CalculateQuizScore";
import { QuizMyAnswersPopup } from "./quizUserAnswersPopup";

//Result Items for a quiz
export interface IQuizResultItems {
  question_id: string;
  options_ids: string[];
}

// quiz result interface
export interface IQuizResults {
  quiz_id: string;
  results: IQuizResultItems[];
}
type CourseQuizzesProps = {
  courseId: string;
};

const CourseQuizzes: FC<CourseQuizzesProps> = ({ courseId }) => {
  const { user } = useSelector((state: any) => state.auth);
  const { data, error, isLoading } = useGetQuizByCourseIdQuery(courseId);
  const [
    updateUserQuizess,
    {
      isSuccess: isSuccessUserQ,
      isError: isErrorUserQ,
      error: errorUserQ,
      data: dataUserQ,
    },
  ] = useUpdateQuizzesMutation();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [showUserAnswers, setShowUserAnswers] = useState(false);
  const [isUserDoneTheQuiz, setIsUserDoneTheQuiz] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);


  const handleSubmitQuiz = async (data: IQuizResults) => {
    await updateUserQuizess(data);
  };

  //once we get the quiz from database we check if user done this specific quiz
  useEffect(() => {
    if (data && data.quiz && data.quiz[0]?._id) {
      setIsUserDoneTheQuiz(
        user.quizzesResults.some((quizR: IQuizResults) => quizR.quiz_id == data.quiz[0]._id)
      );
    }

  }, [data]);

  useEffect(() => {
     if(isUserDoneTheQuiz) {
      setTotalQuestions(data.quiz[0].quiz.length);
      const getUserQuizResult = user.quizzesResults.find((quiz:IQuizResults) => quiz.quiz_id == data.quiz[0]._id);
      setUserScore(CalculateScore(getUserQuizResult,data.quiz[0]));
     }
  },[isUserDoneTheQuiz])

  useEffect(() => {
    if (isSuccessUserQ) {
      window.location.reload();
    }
    if (errorUserQ) {
      if ("data" in errorUserQ) {
        const errorData = errorUserQ as any;
        toast.error(errorData.data.message || "Oops somthing went wrong!");
      }
    }
  }, [isSuccessUserQ, errorUserQ]);

  return (
    <div>
      <div className="my-4 font-bold text-[25px]">Course Quizzes:</div>

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {data ? (
        <div className="flex gap-4 items-center">
          <h1 className=" text-[1rem] font-bold w-[10%] uppercase">{data.quiz[0].title}:</h1>
          {isUserDoneTheQuiz ? (
            <div className="flex gap-5 w-full items-center">
              
              <div className="flex items-center gap-2">
                <span className="text-[1rem] text-gray-600">YOUR SCORE:</span>
                <div
                className={`w-16 h-16 rounded-full cursor-pointer flex items-center justify-center border-4 ${
                  userScore >= totalQuestions / 2
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <span className="text-xl font-bold"> {`${userScore}/${totalQuestions}`}</span>
              </div>
                </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowUserAnswers(true)}>
                Show My Answers
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowCorrectAnswers(true)}>
                Show Correct Answers
              </button>
            </div>
          ) : (
            <button
              className="text-[15px] font-[500] black bg-[#fd4267] text-white outline-none px-2 py-1 w-fit rounded-md cursor-pointer"
              onClick={() => setShowQuiz(true)}
            >
              Take The Quiz
            </button>
          )}
        </div>
      ) : (
        <p>There is no quiz for this course.</p>
      )}
      {showQuiz && (
        <QuizPopup
          handleSubmitQuiz={handleSubmitQuiz}
          quizData={data.quiz[0]}
        />
      )}
       {showCorrectAnswers && (
        <QuizCorrectAnswersPopup
          quizData={data.quiz[0]}
          onClose={() => setShowCorrectAnswers(false)}
        />
      )}
      {showUserAnswers && (
        <QuizMyAnswersPopup
          quizData={data.quiz[0]}
          userResults={user.quizzesResults.find((quiz:IQuizResults) => quiz.quiz_id == data.quiz[0]._id)}
          onClose={() => setShowUserAnswers(false)}
        />
      )}
    </div>
  );
};

export default CourseQuizzes;
