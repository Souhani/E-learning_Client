import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js';
import {useAddReviewReplyMutation } from '@/redux/features/courses/courseApi';
import toast from 'react-hot-toast';
import { VscVerifiedFilled } from "react-icons/vsc";
import Rating from '@/app/utils/Rating';
import { DefaultProfilePic } from '@/app/utils/defaultProfilePic';

type Props = {
    course: any;
    courseRefetch: any;
    user:any ;
}

const CourseReviews = ({ course, courseRefetch, user }: Props) => {
    const [replys, setReplys] = useState<string[]>(
        Array(course?.reviews?.length).fill("")
    );
    const [index, setIndex] = useState<number>(0);
    const [addReviewReply, { isSuccess: isAddReviewReplySuccess, isLoading: isReviewReplyLoading, error: reviewReplyError }] = useAddReviewReplyMutation();
    const handleReplyChange = (value: string, index: number) => {
        const newReplys = [...replys];
        newReplys[index] = value;
        setReplys(newReplys);
    }
    const handleSubmitReply = async (index: number) => {
        if(isReviewReplyLoading) {
            return toast("Loading...")
        }
        if (replys[index].length === 0) {
            return toast.error("Your reply is required");
        } else {
            setIndex(index);
            await addReviewReply({ replyMessage: replys[index], courseId: course._id, reviewId: course.reviews[index]._id });
            handleReplyChange("", index);
        }
    };
    useEffect(() => {
        if (isAddReviewReplySuccess) {
            toast.success("Your reply added successfully.");
            courseRefetch();
        }
        if (reviewReplyError) {
            if ("data" in reviewReplyError) {
                const errorData = reviewReplyError as any;
                toast.error(errorData.data.message || "Oops somthing went wrong!")
            } else {
                toast.error("Oops somthing went wrong!")
            }
        }
    }, [isAddReviewReplySuccess, reviewReplyError]);
    return (
        <div className='w-full my-3'>
            {
                course?.reviews.map((item: any, index: number) => (
                    <div key={index} className="my-10">
                        <div className='flex mb-2  gap-2'>
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
                        <div className=''>
                            <div className='800px:flex items-center gap-1'>
                                <h5 className='text-[22px]'>
                                    {item?.user?.name}
                                </h5>
                               <div> <Rating rating={item.rating} /></div>
                            </div>
                            <div>
                                <p className='ml-2 mt-1 text-[19px] text-gray-900 dark:text-gray-200'>{item.comment}</p>
                                <small className='text-gray-500 text-[12px]'> {item.createdAt && format(item.createdAt)}. </small>
                            </div>
                            </div>

                        </div>
                        <div>
                            <div className='ml-10'>
                                {
                                     (
                                        <div>
                                            <div className=''>
                                                {
                                                   item?.reviewReplies && item?.reviewReplies?.map((reply: any, replyIndex: number) => (
                                                        <div key={replyIndex} className='my-5'>
                                                            <div className='flex mb-2'>
                                                            <div className='min-w-[40px] h-[40px] text-[17px]'>
                                                            { !reply?.user?.avatar?.url ? 
                                                                 <DefaultProfilePic name={reply?.user?.name as string} />   :
                                                                    <Image
                                                                        src={reply?.user?.avatar?.url}
                                                                        width={40}
                                                                        height={40}
                                                                        alt=""
                                                                        className='w-[40px] h-[40px] rounded-full object-cover'
                                                                    />
                                                                }
                                                                </div>
                                                                <div className='pl-3'>
                                                                    <div className='flex gap-1 items-center'>
                                                                        <h5 className='text-[20px]'>
                                                                            {reply?.user?.name}
                                                                        </h5>
                                                                        {reply?.user?.role === "Admin" && <VscVerifiedFilled size={18} className='text-[18px] text-[#0051ff]' />}
                                                                    </div>
                                                                    <p className='ml-2 mt-1 text-[17px] text-gray-900 dark:text-gray-200'>{reply.reply}</p>
                                                                    <small className='text-gray-500'> {reply.createdAt && format(reply.createdAt)}. </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            { user?.role === "Admin" && item?.reviewReplies?.length === 0 && <div>
                                                <div className='flex'>
                                                <input className='outline-none p-2 w-full bg-transparent'
                                                    type="text"
                                                    placeholder='Write your reply...'
                                                    value={replys[index]}
                                                    onChange={(e) => handleReplyChange(e.target.value, index)}
                                                />
                                                <button
                                                    onClick={!isReviewReplyLoading ? () => handleSubmitReply(index) : () => { }}
                                                    disabled={isReviewReplyLoading}>Submit</button>
                                            </div>
                                            <div className='h-[1px] bg-gray-400 w-full'></div>
                                            </div>}
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

export default CourseReviews;