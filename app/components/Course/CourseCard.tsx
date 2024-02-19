import Rating from '@/app/utils/Rating';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { CiBoxList } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";



type Props = {
    item: any;
    isProfile?:boolean;
}

const CourseCard:FC<Props> = ({ item, isProfile }) => {
  return (
    <Link href={isProfile ? `/course-access/${item?._id}` : `course/${item?._id}`}>
       <div className='w-full h-max dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:bg-slate-700  rounded-lg shadow-lg dark:shadow-inner text-black dark:text-white'>
        <div className='w-full h-[170px] overflow-hidden object-cover'>
          <Image src={item?.thumbnail?.url} alt="" width={500} height={300} objectFit='contain' className=' w-full h-full object-cover rounded-t-lg'/>
        </div>
          <br />
          <div className='p-3'>
            <h1 className='font-Poppins text-black dark:text-white text-[16px]'>
                {item?.name}
            </h1>
        {!isProfile &&
        <div className='w-full flex items-center justify-between pt-2'>
        <Rating rating={item?.ratings} />
        <h5 className={`text-black dark:text-[#fff] ${
            isProfile && 'hidden 800px:inline'
        }`}>
            <div className='flex items-center'>
                <PiStudent size={20} />
                <h5 className='pl-1 text-black dark:text-[#fff]'>
                Students: {item?.purchased}
                </h5>
            </div>
        </h5>
    </div>}
            <div className='w-full flex items-center justify-between pt-3'>
                {!isProfile && 
                <div className='flex'>
                <h3 className='text-black dark:text-white'>
                    {item?.price === 0 ? "FREE" : item?.price+"$"}
                </h3>
                <h5 className='pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]'>
                    {item?.estimatedPrice}$
                </h5>
            </div>}
                    <div className='flex items-center'>
                        <CiBoxList size={20} />
                        <h5 className='pl-1 text-black dark:text-[#fff]'>
                        lectures: {item?.courseData?.length}
                        </h5>
                    </div>
            </div>
          </div>
       </div>
    </Link>
  )
}

export default CourseCard