import { styles } from "@/app/styles/style";
import VideoPlayer from "@/app/utils/VideoPlayer";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import CourseList from "./CourseList";
import Image from "next/image";
import { useSelector } from "react-redux";
import defaultAvatar from "../../../public/assets/avatar.png";
import {
  useAddNewQuestionMutation,
  useAddNewReviewMutation,
  useGetCourseByIdQuery,
} from "@/redux/features/courses/courseApi";
import toast from "react-hot-toast";
import CourseQuestions from "./CourseQuestions";
import CourseReviews from "./CourseReviews"
import socketID from "socket.io-client";
import { DefaultProfilePic } from "@/app/utils/defaultProfilePic";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketID(ENDPOINT, { transports: ["websocket"]});

type Props = {
  id: string;
  content: any;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  refetch: any;
};

const CourseContent = ({
  id,
  content,
  activeVideo,
  setActiveVideo,
  refetch,
}: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [
    addNewQuestion,
    {
      isSuccess: isAddQuestionSuccess,
      isLoading: isQuestionLoading,
      error: questionError,
    },
  ] = useAddNewQuestionMutation();
  const [
    addNewReview,
    {
      isSuccess: isAddReviewSuccess,
      isLoading: isReviewLoading,
      error: reviewError,
    },
  ] = useAddNewReviewMutation();
  const {
    data: courseData,
    isLoading: courseLoading,
    refetch: courseRefetch,
  } = useGetCourseByIdQuery(id, { refetchOnMountOrArgChange: true });
  const isReviewed = courseData?.course?.reviews?.some(
    (item: any) => item.user._id === user._id
  );
  const handleQuestionSubmit = async () => {
    if (question.length === 0) {
      return toast.error("Question is required");
    } else {
     await addNewQuestion({
        question,
        courseId: id,
        contentId: content[activeVideo]._id,
      });
      setQuestion("");
    }
  };
  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      return toast.error("Review is required");
    } else {
      await addNewReview({ comment: review, rating, courseId: id });
      setReview("");
    }
  };
  useEffect(() => {
    if (isAddQuestionSuccess) {
      toast.success("Question added successfully.");
      refetch();
      socketId.emit("notification");
    }
    if (questionError) {
      if ("data" in questionError) {
        const errorData = questionError as any;
        toast.error(errorData.data.message || "Oops somthing went wrong!");
      } else {
        toast.error("Oops somthing went wrong!");
      }
    }
  }, [isAddQuestionSuccess, questionError]);
  useEffect(() => {
    if (isAddReviewSuccess) {
      toast.success("Review added successfully.");
      courseRefetch();
      socketId.emit("notification")
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorData = questionError as any;
        toast.error(errorData.data.message || "Oops somthing went wrong!");
      } else {
        toast.error("Oops somthing went wrong!");
      }
    }
  }, [isAddReviewSuccess, reviewError]);
  return (
    <div className="w-full grid 800px:grid-cols-10 dark:text-white text-black">
      <div className="col-span-7">
        <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
          <VideoPlayer
            title={content[activeVideo]?.title}
            videoUrl={content[activeVideo]?.videoUrl}
          />
          <div className="w-full flex items-center justify-between my-3">
            <button
              className={`${styles.submit} !w-max flex items-center ${
                activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
              }`}
              onClick={() =>
                setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
              }
            >
              <AiOutlineArrowLeft className="mr-2" />
              Prev Lesson
            </button>
            <button
              className={`${styles.submit} !w-max flex items-center ${
                activeVideo === content.length - 1 &&
                "!cursor-no-drop opacity-[0.8]"
              }`}
              onClick={() =>
                setActiveVideo(
                  activeVideo === content.length - 1
                    ? content.length - 1
                    : activeVideo + 1
                )
              }
            >
              <AiOutlineArrowRight className="mr-2" />
              Next Lesson
            </button>
          </div>
          <h1 className="pt-2 text-[25px] font-[600]">
            {content[activeVideo].title}
          </h1>
          <br />
          <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
            {["Overview", "Resources", "Q&A", "Reviews"].map(
              (text: string, index: number) => (
                <h5
                  className={`800px:text-[20px] cursor-pointer ${
                    activeBar === index && "dark:text-[#6a6af0] text-[#7F27FF]"
                  }`}
                  key={index}
                  onClick={() => setActiveBar(index)}
                >
                  {text}
                </h5>
              )
            )}
          </div>
          <br />
          {activeBar === 0 && (
            <p className="text-[18px] whitespace-pre-line mb-3">
              {content[activeVideo]?.description}
            </p>
          )}
          {activeBar === 1 && (
            <div>
              {content[activeVideo]?.links.map((link: any, index: number) => (
                <div key={index} className="mb-5">
                  <h2 className="800px:text-[20px] 800px:inline-block">
                    {link.title && link.title + ": "}
                  </h2>
                  <a
                    href={link.url}
                    className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                  >
                    {link.url}
                  </a>
                </div>
              ))}
            </div>
          )}
          {activeBar === 2 && (
            <div>
              <div className="flex w-full">
              <div className='min-w-[50px] h-[50px] text-[20px]'>
                 { !user?.avatar?.url ? 
                    <DefaultProfilePic name={user?.name as string} /> :
                <Image
                  src={user?.avatar?.url ? user?.avatar?.url : defaultAvatar}
                  width={50}
                  height={50}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                 }
                 </div>
                <textarea
                  name=""
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  id=""
                  cols={40}
                  rows={5}
                  placeholder="Write your question..."
                  className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-gray-300 8000px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                ></textarea>
              </div>
              <div className="w-full flex justify-end">
                <button
                  className={`${
                    styles.submit
                  } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                    isQuestionLoading && "cursor-not-allowed"
                  }`}
                  onClick={isQuestionLoading ? () => {} : handleQuestionSubmit}
                >
                  {isQuestionLoading ? "Wait..." : "Submit"}
                </button>
              </div>
              <br />
              <br />
              <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <CourseQuestions
                  section={content[activeVideo]}
                  id={id}
                  refetch={refetch}
                />
              </div>
            </div>
          )}
          {activeBar === 3 && (
            <div>
              {!isReviewed && user.role !== "Admin" && (
                <div>
                  <div className="flex w-full">
                  <div className='min-w-[50px] h-[50px] text-[20px]'>
                 { !user?.avatar?.url ? 
                    <DefaultProfilePic name={user?.name as string} /> :
                    <Image
                      src={
                        user?.avatar?.url ? user?.avatar?.url : defaultAvatar
                      }
                      width={50}
                      height={50}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                   }
                    </div>
                    <div className="w-full">
                      <h5 className="pl-3 text-[20px] font-[500]">
                        Give a Rating <span className="text-red-500">*</span>
                      </h5>
                      <div className="flex w-full ml-2 pb-3">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="Write your question..."
                        className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-gray-300 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      className={`${
                        styles.submit
                      } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                        isReviewLoading
                          ? "!cursor-not-allowed"
                          : "!cursor-pointer"
                      }`}
                      onClick={isReviewLoading ? () => {} : handleReviewSubmit}
                    >
                      {isReviewLoading ? "Wait..." : "Submit"}
                    </button>
                  </div>
                  <br />
                  <br />
                </div>
              )}
              <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600"></div>

              <div>
                <CourseReviews
                  course={courseData.course}
                  courseRefetch={courseRefetch}
                  user={user}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hidden 800px:block 800px:col-span-3">
        <CourseList
          setActiveVideo={setActiveVideo}
          activeVideo={activeVideo}
          content={content}
        />
      </div>
    </div>
  );
};

export default CourseContent;
