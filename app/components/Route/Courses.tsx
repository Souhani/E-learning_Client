import { useGetAllUsersCoursesQuery } from '@/redux/features/courses/courseApi';
import React, { useEffect, useState } from 'react';
import CourseCard from "../Course/CourseCard"
import { Loader } from '../Loader/LoadPage';

type Props = {
  courses:any;
  isPage: boolean;
  isLoading?: boolean;
}

const Courses = ({ courses, isPage, isLoading }:Props) => {

  return (
    isLoading ? 
    <div className='h-screen w-full'>
     <Loader />
    </div> :
    <div>
        <div className='w-[90%] 800px:w-[80%] m-auto mt-10 mb-20'>
            {isPage && 
            <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:leading-[60px] text-black font-[700] tracking-tight'>
            Expand Your Career {" "}
            <span className='text-gradient'>Opportunity</span> 
            <br/>
             With Our Courses:
        </h1>}
            <br/>
            <br/>
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[30px]  1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
                {
                   courses && courses.map((item:any, index:number) => (
                    <CourseCard 
                      item={item}
                      key={index}
                      />
                   ))
                }
            </div>
        </div>
    </div>
  )
}

export default Courses