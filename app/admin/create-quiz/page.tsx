"use client";
import React, { useEffect, useState } from "react";
import AdminProtected from "../../hooks/adminProtected";
import AdminSidebar from "../../components/admin/adminSidbar/adminSidebar";
import Heading from "../../utils/Heading";
import AdminHeader from "../../components/admin/adminHeader/AdminHeader";
import CreateQuiz from "../../components/admin/createQuiz/createQuiz";
import { useGetAllUsersCoursesQuery } from "@/redux/features/courses/courseApi";
import { useCreateQuizMutation } from "@/redux/features/quiz/quizApi";
import toast from "react-hot-toast";
import { redirect } from 'next/navigation';

export interface IOption {
  _id?: string;
  option: string;
  is_correct: boolean;
}

export interface IQuestion {
  _id?: string;
  question: string;
  time: number;
  options: IOption[];
}

export interface IQuiz {
  _id?: string;
  title: string;
  course_id: string;
  quiz: IQuestion[];
}
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

export const quizDataTemplate = {
  title: "",
  course_id: "",
  quiz: [
    {
      question: "",
      time: 30,
      options: [
        {
          option: "",
          is_correct: false,
        },
        {
          option: "",
          is_correct: false,
        },
      ],
    },
  ],
}
type Props = {};

const Page = (props: Props) => {
  const [selected, setSelected] = useState<string>("Create quiz");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const { data: coursesData, isLoading: coursesLoading } =
    useGetAllUsersCoursesQuery(undefined);
  const [quizData, setQuizData] = useState<IQuiz>(quizDataTemplate);


//handle creating quiz
  const [createQuiz, {isLoading, isSuccess, isError, data, error}] = useCreateQuizMutation();
  const handleQuizCreate = async () => {
    if(isThereEmptyField(quizData)) {
        toast.error("Please fill in all the fields");
        return;
    }
    if(!isLoading){
     await createQuiz(quizData);
    } else {
     toast("Loading...")
    }
 };

 // handle the response of creating quiz
 useEffect(() => {
    if(isSuccess && data) {
      toast.success(data.message || "Quiz created successfully");
      redirect("/admin/quizzes");
    }
    if(isError && error) {
      if("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        toast.error("failed to create quiz");
      }
    }
  }, [isSuccess, isError,  data, error])

  return (
    <div>
      <AdminProtected>
        <Heading
          title={`E-learning Admin`}
          description="E-learing is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN,Redux,Machine learning"
        />
        <div className="w-full flex gap-4">
          <div className="max-w-[20%] h-screen fixed">
            <AdminSidebar
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>
          <div
            className={`min-h-screen w-full ${
              isCollapsed ? "ml-[80px]" : "ml-[250px]"
            }`}
          >
            <AdminHeader />
            <div className="w-[90%] m-auto">
              <CreateQuiz
                courses={coursesData?.allCourses}
                coursesLoading={coursesLoading}
                quizData={quizData}
                setQuizData = {setQuizData}
                isEdit = {false}
                handleQuizCreate = {handleQuizCreate}
              />
            </div>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
