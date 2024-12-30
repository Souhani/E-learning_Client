import { styles } from '@/app/styles/style';
import Rating from '@/app/utils/Rating'
import VideoPlayer from '@/app/utils/VideoPlayer';
import Link from "next/link";
import React, { FC, useEffect, useState } from 'react'
import { FaCheckDouble } from "react-icons/fa6";
import CourseReviews from "./CourseReviews";
import CourseList from '../Course/CourseList'
import { IoCloseOutline } from 'react-icons/io5';
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useSelector } from 'react-redux';

type Props = {
    course: any;
    courseRefetch:any;
    stripePromise: any;
    clientSecret: string;
    setOpenLogin: (openLogin:boolean) => void;
    openLogin: boolean;
}

const CourseDetails:FC<Props> = ({ course, stripePromise, clientSecret, courseRefetch, setOpenLogin, openLogin }) => {
    const {user} = useSelector((state:any) => state.auth);
    const [open, setOpen] = useState(false);
    const [initialRender, setInitialRender] = useState(true);
    const discountPercentage = ((course?.estimatedPrice - course?.price) / course?.estimatedPrice * 100).toFixed(0);
    //here we mute this for demo
   //  const isPurchased = user && user?.courses?.find((item:any) => item._id === course._id);
    const isPurchased = true;

    const handleOrder = () => {
      if(user._id) {
         setOpen(true);
      } else {
         setOpenLogin(true);
      }
      window.location.reload();
    }
    useEffect(() => {
       if(!initialRender) {
         if(user._id && !isPurchased) {
            setOpen(true);
          }
       } else {
         setInitialRender(false)
       }
    }, [openLogin, user])
  return (
    <div>
      <div className='w-[90%] 800px:[90%] m-auto py-5'>
         <div className='w-full flex flex-col-reverse 800px:flex-row'>
            <div className='w-full 800px:w-[65%] 800px:pr-5'>
                  <div className='w-full flex flex-col-reverse 800px:flex-row'>
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                           {course?.name}
                        </h1>
                     </div>
                     <div className='flex items-center justify-between pt-3'>
                        <div className="flex items-center">
                        <Rating rating = {course?.ratings} />
                        <h5 className="text-black dark:text-white">{course?.reviews?.length} Reviews</h5>
                        </div>
                        <h5>{course?.purchased} Students</h5>
                     </div>
                     <br/>
                     <div className='w-full'>
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                        What you will learn from this course
                        </h1>
                        <div>
                           {
                           course?.benefits?.map((item:any, index:number) => (
                              <div className='w-full flex 800px:items-center py-2'
                                 key={index}>
                              <div className='w-[15px] mr-1'>
                                    <FaCheckDouble size={15} className="text-black dark:text-white" />
                              </div>
                              <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                              </div>
                           ))}
                           <br/>
                           <br/>
                        </div>
                     </div>
                     <div className='w-full'>
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                           What are the prerequisites for starting this course?
                        </h1>
                        <div>
                           {
                           course?.prerequisites?.map((item:any, index:number) => (
                              <div className='w-full flex 800px:items-center py-2'
                                 key={index}>
                              <div className='w-[15px] mr-1'>
                                    <FaCheckDouble size={15} className="text-black dark:text-white" />
                              </div>
                              <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                              </div>
                           ))}
                           <br/>
                           <br/>
                        </div>
                     </div>
                     <div className='w-full'>
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                           Course Overview
                        </h1>
                        <div>
                           <CourseList content = {course?.courseData} isDemo={true}/>
                        <br/>
                        <br/>
                        </div>
                     </div>
                     <div className='w-full'>
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                           Course Details
                        </h1>
                        <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white'>
                           {course?.description}
                        </p>
                     </div>
                     <br/>
                     <br/>
                     <div className='w-full'>
                        <div className='800px:flex items-center'>
                           <Rating rating={course?.ratings} />
                           <div className='mb-2 800px:mb-[unset]'>
                              <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                                 {Number.isInteger(course?.ratings) ? 
                                 course?.ratings.toFixed(0)
                                 : course?.ratings.toFixed(1)}{" "}
                                 Course Rating • { course?.reviews?.length } Reviews
                              </h5>
                           </div>
                        </div>
                     </div>
                     <br/>
                     <br/>
                     <div>
                        <CourseReviews
                           course={course}
                           courseRefetch={courseRefetch}
                           user={user}
                        />
                     </div>
            </div>
            <div className='w-full 800px:w-[35%] relative'>
               <div className='sticky top-[100px] left-0 z-50 w-full'>
                  <div className='w-full'>
                    <VideoPlayer videoUrl={course?.demoUrl} title={course?.title} />
                    <div className='flex items-center'>
                       <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                          {course?.price === 0 ? "FREE" : course?.price+"$"}
                       </h1>
                       <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white'>
                         {course?.estimatedPrice}$
                       </h5>
                       <h4 className='pl-5 pt-4 text-[22px] text-black dark:text-white'>
                         {discountPercentage}% Off
                       </h4>
                    </div>
                    <div className='flex items-center'>
                      {
                        ((isPurchased || user?.role === "Admin") && openLogin)? (
                          <Link href={`/course-access/${course?._id}`}
                          className={`${styles?.submit} !w-max !my-3 !font-Poppins !cursor-pointer`}>
                                    Enter to Course
                          </Link>
                        ) : (
                           <div   onClick={handleOrder}
                                 className={`${styles.submit} !w-max !my-3 !font-Poppins !cursor-pointer`}>
                              Log in
                           </div>
                        )
                      }
                    </div>
                  </div>
                  <br/>
                  <div className='text-black dark:text-white space-y-1 mb-5'>
                    <p>• Source code included</p>
                    <p>• Lifetime access</p>
                    <p>• Certificate of completion</p>
                    <p>• premium support</p>
                  </div>
               </div>
            </div>
        </div>
      </div>
      <div>
         {
            open && (
               <div className='w-full h-screen flex bg-[#00000036] fixed top-0 left-0 z-[99999] items-center justify-center'>
                  <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
                     <div className='w-full flex justify-end'>
                        <IoCloseOutline size={40}
                                        className="text-black cursor-pointer"
                                        onClick = {() => setOpen(false)} />
                     </div>
                     <div className="w-full h-full my-auto">
                        { stripePromise && clientSecret && (
                           <Elements stripe={stripePromise} options={{clientSecret}}>
                             <CheckOutForm setOpen={setOpen} course={course} />
                           </Elements>
                        )}
                     </div>
                  </div>
               </div>
            )
         }
      </div>
    </div>
  )
}

export default CourseDetails