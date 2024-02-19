import React, { FC } from 'react'
import VideoPlayer from "../../../utils/VideoPlayer"
import { styles } from '@/app/styles/style';
import Rating from '@/app/utils/Rating';
import { FaCheckDouble } from "react-icons/fa6";

type Props = {
    setActive : (acive:number)=> void;
    active :  number;
    courseData: any;
    handleCourseCreate: any;
    isEdit?: boolean;
}

const CoursePreview:FC<Props> = ({ setActive, active, courseData, handleCourseCreate, isEdit}) => {
    const discountPercentage = (((courseData.estimatedPrice-courseData.price) / courseData.estimatedPrice)*100).toFixed(2)
    const handlePrev = () => {
        const newActive = active - 1;
        setActive(newActive);
    }
    const handleNext = () => {
        handleCourseCreate();
    }
  return (
    <div>
       <div>
        <div className=''>
                <VideoPlayer 
                videoUrl= {courseData?.demoUrl}
                title= {courseData?.name}
                />
        </div>
       </div>
        <div className='p-4 flex gap-4 dark:text-white text-black'>
            <h1 className='text-[25px] font-[600]'>{courseData?.price === 0 ? "Free" : courseData?.price + "$"}</h1>
            <div className='mt-0  flex gap-3'>
                <h5 className='line-through text-[13px] '>{courseData.estimatedPrice}$</h5>
                <h4 className='text-[15px]'>{discountPercentage}% Off</h4>
            </div>
        </div>
        <div className='800px:w-[40%] w-[70%]'>
            <button className={styles.submit + " !cursor-not-allowed "}>
               Buy Now
            </button>
        </div>
        <div className='w-full flex gap-2 mt-3 h-[40px] items-center'>
            <input className="w-[80%] dark:text-white text-black font-[400] text-[17px]  p-2 rounded-md border-[1px] border-gray-500 bg-[unset] cursor-not-allowed" 
                   placeholder='Discount code...'
                   readOnly/>
            <button className="w-[20%] min-w-min border-[2px] dark:border-[#6a6af0] border-[#7F27FF] rounded-xl px-4 py-2 cursor-not-allowed">Apply</button>
        </div>
        <div className='mt-4'>
            <h1 className='text-[30px]'>{courseData.name}</h1>
        </div>
        <div className='mt-4'>
            <p>• Source code included.</p>
            <p>• Full lifetime access.</p>
            <p>• Certificate of completion.</p>
            <p>• Premium Support.</p>
        </div>
        <div className='800px:flex block  justify-between mt-4'>
            <div className='800px:flex block gap-1'>
              <Rating rating={0} />
              <p>0 Reviews</p>
            </div>
            <div>
              <p>0 students</p>
            </div>
        </div>
        <div className='mt-5'>
            <h2 className='text-[20px]'>What you will learn from this course:</h2>
            {courseData?.benefits && courseData.benefits.map((benefit:any, index:number) => (
               <div key={index}
                    className='flex gap-2 items-center p-2'>
                    <FaCheckDouble size={20} className="w-[3%]" />
                    <p className="w-[95%]">{benefit.title}</p>
               </div>
            ))}
        </div>
        <div className='mt-5'>
            <h2 className='text-[20px]'>What are the prerequisites for starting this course?</h2>
            {courseData?.prerequisites && courseData.prerequisites.map((prerequisite:any, index:number) => (
               <div key={index}
                    className='flex gap-2 items-center p-2'>
                    <FaCheckDouble size={20} className="w-[3%]" />
                    <p className="w-[95%]">{prerequisite.title}</p>
               </div>
            ))}
        </div>
        <div className='mt-5'>
          <h2 className='text-[20px]'>Course Details:</h2>
          <p className='p-2'>{courseData.description}</p>
        </div>
        <div className="flex mt-5 justify-between gap-2 ">
            <button
            onClick={handlePrev}
            className="cursor-pointer px-10 py-2 text-[20px] text-white dark:text-black rounded-sm  my-5 bg-[#7F27FF] dark:bg-[#37a39a]"
            >
            Prev
            </button>
            <button
            onClick={handleNext}
            className="cursor-pointer px-10 py-2 text-[20px] text-white dark:text-black rounded-sm  my-5 bg-[#7F27FF] dark:bg-[#37a39a]"
            >
            {isEdit ? "Update" : "Create"}
            </button>
      </div>
    </div>
  )
}

export default CoursePreview