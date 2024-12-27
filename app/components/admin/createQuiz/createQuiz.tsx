import { styles } from "@/app/styles/style";
import React, { FC, useEffect, useState } from "react";
import { Loader } from "../../Loader/LoadPage";
import { MdAddCircle } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { IQuiz } from "@/app/admin/create-quiz/page";

interface ICourse {
  _id: string;
  name: string;
}

type Props = {
  courses: ICourse[];
  coursesLoading: boolean;
  setQuizData: (quizData: IQuiz) => void;
  quizData: IQuiz;
  isEdit: boolean;
  handleQuizCreate: (quizData:IQuiz) => void;
};

const CreateQuiz: FC<Props> = ({
  courses,
  coursesLoading,
  quizData,
  setQuizData,
  isEdit,
  handleQuizCreate
}) => {
  const handleAddQuestion = () => {
    // update the quiz state
    const updatedQuiz = [...quizData.quiz];
    updatedQuiz.push({
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
    });
    setQuizData({ ...quizData, quiz: updatedQuiz });
    //update collapse
    const newIsCollapsed = [...isCollapsed, false];
    setIsCollapsed(newIsCollapsed);
  };

  const handleDeleteQuestion = (questionIndex: number) => {
    // we should have at least 1 question otherwise we can not delete the last question
    if (quizData.quiz.length > 1) {
      // update the quiz state
      const updatedQuiz = [...quizData.quiz];
      updatedQuiz.splice(questionIndex, 1);
      setQuizData({ ...quizData, quiz: updatedQuiz });
      //update collapse
      const newIsCollapsed = [...isCollapsed];
      newIsCollapsed.splice(questionIndex, 1);
      setIsCollapsed(newIsCollapsed);
    }
  };

  const handleAddOption = (questionIndex: number) => {
    // update the quiz state
    const updatedQuiz = [...quizData.quiz];
    updatedQuiz[questionIndex].options.push({ option: "", is_correct: false });
    setQuizData({ ...quizData, quiz: updatedQuiz });
  };

  const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
    // we should have at least 2 options otherwise we can not delete the option
    if (quizData.quiz[questionIndex].options.length > 2) {
      // update the quiz state
      const updatedQuiz = [...quizData.quiz];
      updatedQuiz[questionIndex].options.splice(optionIndex, 1);
      setQuizData({ ...quizData, quiz: updatedQuiz });
    }
  };

  // handle the question collapse
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
    Array(quizData.quiz.length).fill(false)
  );
  const handleCollapes = (index: number) => {
    const newIsCollapsed = [...isCollapsed];
    newIsCollapsed[index] = !newIsCollapsed[index];
    setIsCollapsed(newIsCollapsed);
  };

  return (
    <div className="w-full">
      <div>
        <div>
          <label className={styles.label}>Quiz title</label>
          <input
            className={styles.input}
            type="text"
            name="title"
            required
            id="title"
            placeholder="Example: Quiz 1"
            value={quizData.title}
            onChange={(e) => {
              setQuizData({ ...quizData, title: e.target.value });
            }}
          />
        </div>
        <div>
          <label className={styles.label}>Course</label>
          {coursesLoading ? (
            <Loader />
          ) : (
            <select
              className={styles.select}
              value={quizData.course_id}
              onChange={(e) => {
                setQuizData({ ...quizData, course_id: e.target.value });
              }}
            >
              <option value="">Select Course</option>
              {courses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          {quizData?.quiz.map((question, questionIndex) => (
            <div
              className={`dark:bg-gray-700 bg-gray-200 p-4 w-full my-10`}
              key={questionIndex}
            >
              <div className="flex gap-2 w-full justify-end">
                <AiOutlineDelete
                  size={20}
                  className={`dark:text-white text-black ${
                    quizData?.quiz?.length > 1
                      ? "cursor-pointer"
                      : "cursor-no-drop"
                  }`}
                  onClick={() => handleDeleteQuestion(questionIndex)}
                />
                <IoIosArrowDown
                  size={20}
                  className={`dark:text-white text-black cursor-pointer transform ${
                    isCollapsed[questionIndex] ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => handleCollapes(questionIndex)}
                />
              </div>
              {!isCollapsed[questionIndex] ? (
                <div>
                  <div>
                    <label className={styles.label}>Question</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Question"
                      value={question.question}
                      onChange={(e) => {
                        const updatedQuiz = [...quizData.quiz];
                        updatedQuiz[questionIndex].question = e.target.value;
                        setQuizData({ ...quizData, quiz: updatedQuiz });
                      }}
                    />
                  </div>
                  <div className="flex w-full gap-5">
                    <div className="w-1/4">
                      <label className={styles.label}>Time in seconds</label>
                      <input
                        className={styles.input}
                        type="number"
                        min="10"
                        placeholder="30"
                        value={question.time}
                        onChange={(e) => {
                          const updatedQuiz = [...quizData.quiz];
                          updatedQuiz[questionIndex].time = parseInt(
                            e.target.value,
                            10
                          );
                          setQuizData({ ...quizData, quiz: updatedQuiz });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={styles.label}>
                      Options: check the correct ones.
                    </label>
                    <div>
                      {quizData.quiz[questionIndex].options.map(
                        (option, optionIndex) => (
                          <div
                            className="flex gap-2 items-center my-2"
                            key={optionIndex}
                          >
                            <input
                              className={styles.input}
                              type="text"
                              placeholder="Option"
                              value={option.option}
                              onChange={(e) => {
                                const updatedQuiz = [...quizData.quiz];
                                updatedQuiz[questionIndex].options[
                                  optionIndex
                                ].option = e.target.value;
                                setQuizData({ ...quizData, quiz: updatedQuiz });
                              }}
                            />
                            <input
                              type="checkbox"
                              checked={
                                quizData.quiz[questionIndex].options[
                                  optionIndex
                                ].is_correct
                              }
                              onChange={(e) => {
                                const updatedQuiz = [...quizData.quiz];
                                updatedQuiz[questionIndex].options[
                                  optionIndex
                                ].is_correct = e.target.checked;
                                setQuizData({ ...quizData, quiz: updatedQuiz });
                              }}
                              className=" dark:text-white text-black  h-[40px] w-[40px]  rounded-md border-[1px] border-gray-500 bg-[unset]"
                            />
                            <AiOutlineDelete
                              size={30}
                              className={`dark:text-white text-black ${
                                quizData.quiz[questionIndex].options.length > 2
                                  ? "cursor-pointer"
                                  : "cursor-no-drop"
                              }`}
                              onClick={() => {
                                handleDeleteOption(questionIndex, optionIndex);
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                    <div
                      className="cursor-pointer mt-3 flex gap-2  items-center w-max"
                      onClick={() => handleAddOption(questionIndex)}
                    >
                      <MdAddCircle
                        className="dark:text-white text-gray-500"
                        size={30}
                      />
                      <p className="text-[20px]">Add Option</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h1 className="font-bold text-[1.2rem]">
                  {" "}
                  {question.question}{" "}
                </h1>
              )}
            </div>
          ))}
        </div>
        <div
          className="cursor-pointer mt-10 flex gap-2  items-center w-max"
          onClick={() => handleAddQuestion()}
        >
          <MdAddCircle className="dark:text-white text-gray-500" size={30} />
          <p className="text-[20px]">Add Question</p>
        </div>
      </div>
      <div className="flex mt-5 justify-end gap-2 ">
            <button
            onClick={() => {handleQuizCreate(quizData)}}
            className="cursor-pointer px-10 py-2 text-[20px] text-white dark:text-black rounded-sm  my-5 bg-[#7F27FF] dark:bg-[#37a39a]"
            >
            {isEdit ? "Update" : "Create"}
            </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
