import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js';
import { FaRegMessage } from "react-icons/fa6";
import { useAddNewAnswerMutation } from '@/redux/features/courses/courseApi';
import toast from 'react-hot-toast';
import { VscVerifiedFilled } from "react-icons/vsc";
import socketID from "socket.io-client";
import { useSelector } from 'react-redux';
import { DefaultProfilePic } from '@/app/utils/defaultProfilePic';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketID(ENDPOINT, { transports: ["websocket"]});

type Props = {
    section:any;
    id: string;
    refetch: any;
}

const CourseQuestions = ({section, id, refetch}: Props) => {
  const user = useSelector((state:any) => state.auth.user)
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
    Array(section?.questions?.length).fill(false)
  );
  const [answers, setAnswers] = useState<string[]>(
    Array(section?.questions?.length).fill("")
  );
  const [index, setIndex] = useState<number>(0);
  const [addNewAnswer, {isSuccess:isAddAnswerSuccess, isLoading:isAnswerLoading, error:answerError}] = useAddNewAnswerMutation();
  const handleCollapse = (index:number) => {
    const newIsCollapsed = [...isCollapsed];
    newIsCollapsed[index] = !newIsCollapsed[index];
    setIsCollapsed(newIsCollapsed);
  }
  const handleAnswerChange = (value:string, index:number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }
  const handleSubmitAnswer = async (questionId:string, index:number) => {
    if(isAnswerLoading) {
       return toast("Loading...");
    }
    if(answers[index].length===0) {
      return toast.error("Your answer is required");
    } else {
      setIndex(index);
      await addNewAnswer({ answer:answers[index], courseId:id, contentId:section._id, questionId: section.questions[index]._id });
      handleAnswerChange("", index);
      refetch()
    }
  };
  useEffect(() => {
      if(isAddAnswerSuccess) {
        if(user.role !== "Admin") {
          socketId.emit("notification")
        }
        toast.success("Your answer added successfully.");
        refetch();
      }
      if(answerError) {
         if("data" in answerError) {
          const errorData = answerError as any;
          toast.error(errorData.data.message || "Oops somthing went wrong!")
         }
      }
  },[isAddAnswerSuccess, answerError]);
  return (
    <div className='w-full my-3'>
        {
          section?.questions.map((item:any, index:number) => (
            <div key={index} className="my-10"> 
              <div className='flex mb-2'>
                 <div className='min-w-[50px] h-[50px] text-[20px]'>
                 { !item.user?.avatar?.url ? 
                    <DefaultProfilePic name={item?.user?.name as string} /> :
                    <Image
                    src={item?.user?.avatar?.url}
                    width={50}
                    height={50}
                    alt=""
                    className='w-[50px] h-[50px] rounded-full object-cover'
                    />
               }
                 </div>
                 <div className='pl-3'>
                   <div className='flex gap-1 items-center'>
                   <h5 className='text-[20px]'>
                        {item?.user?.name}
                    </h5>
                    {item?.user?.role==="Admin" && <VscVerifiedFilled size={20} className='text-[20px] text-[#0051ff]'/>}
                   </div>
                    <p className='ml-2 mt-1 text-[19px] text-gray-900 dark:text-gray-200'>{item.question}</p>
                    <small className='text-gray-500'> { item.createdAt && format(item.createdAt) }. </small>
                 </div>
              </div>
              <div>
                <div className='pl-10 flex items-center gap-2 cursor-pointer w-max' onClick={() => handleCollapse(index)}>
                    <p className='text-gray-500 text-[15px] '>{isCollapsed[index] ? "Hide Replies" : "Add Replay"}</p>
                    <div className='flex gap-1 relative'>
                      <FaRegMessage size={15} className="text-gray-500 text-[15px]"/>
                      <small className='text-gray-500 absolute top-[-40%] right-[-65%]'>{item.questionReplies.length}</small>
                    </div>
                </div>
                <div className='ml-10'>
                  {
                    isCollapsed[index] && (
                      <div>
                          <div className=''>
                            {
                              item.questionReplies.map((answer:any, answerIndex:number) => (
                                 <div key={answerIndex} className='my-5'>
                                        <div className='flex mb-2'>
                                        <div className='min-w-[40px] h-[40px] text-[17px]'>
                                        { !answer.user?.avatar?.url ? 
                                              <DefaultProfilePic name={answer?.user?.name as string} />  :
                                              <Image
                                              src={answer?.user?.avatar?.url}
                                              width={40}
                                              height={40}
                                              alt=""
                                              className='w-[40px] h-[40px] rounded-full object-cover'
                                              />
                                        }
                                        </div>
                                          <div className='pl-3'>
                                              <div className='flex gap-1 items-center'>
                                                <h5 className='text-[18px]'>
                                                    {answer?.user?.name}
                                                </h5>
                                                {answer?.user?.role==="Admin" && <VscVerifiedFilled size={18} className='text-[18px] text-[#0051ff]'/>}
                                              </div>
                                              <p className='ml-2 mt-1 text-[17px] text-gray-900 dark:text-gray-200'>{answer.reply}</p>
                                              <small className='text-gray-500'> { answer.createdAt && format(answer.createdAt) }. </small>
                                          </div>
                                        </div>
                                 </div>
                              ))
                            }
                          </div>
                          <div className='flex'>
                          <input className='outline-none p-2 w-full bg-transparent'
                                type="text"
                                placeholder='Write your answer...'
                                value={answers[index]}
                                onChange={(e) => handleAnswerChange(e.target.value, index)}
                          />
                          <button 
                                  onClick={!isAnswerLoading ? () => handleSubmitAnswer(item._id, index) : () => {}}
                                  disabled ={isAnswerLoading}>
                                    Submit</button>
                          </div>
                          <div className='h-[1px] bg-gray-400 w-full'></div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )).reverse()
        }
    </div>
  )
}

export default CourseQuestions