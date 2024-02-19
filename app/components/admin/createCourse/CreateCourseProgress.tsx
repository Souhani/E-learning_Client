'use client'
import React, { FC } from 'react';
import { FaCheck } from "react-icons/fa";
import { BsDash } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";


type Props = {
    active:number;
    setActive: (active:number) => void;
}

const CreateCourseProgress:FC<Props> = ({ active, setActive }) => {
    const progress = [
        "Course information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
  return (
    <div className='w-[95%] m-auto'>
       {progress.map(
        (item, index) => (
            <div key={index} className=' h-full flex gap-3 justify-start items-start '>
                <div className='relative mb-5 '>
                    <div className= {`h-[35px] w-[35px]  rounded-full flex justify-center items-center
                            ${index < active && "dark:bg-blue-700 bg-[#7F27FF]"}
                            ${index > active && "bg-gray-500"}
                            ${index === active && "dark:bg-blue-400 bg-[#9F70FD]"}
                                `} >
                                { index < active && 
                                <FaCheck size={20} className="text-white" />
                                }
                                { index === active && 
                                <BsThreeDots size={25} className="text-white text-center " />
                                }
                                { index > active && 
                                <BsDash size={35} className="text-white text-center " />
                                }
                    </div>
                    <div>
                        { index < progress.length - 1 && 
                        <div className={`w-1 h-[30px] absolute top[100%] left-[50%] translate-x-[-50%]
                        ${index < active && "dark:bg-blue-700 bg-[#7F27FF]"}
                        ${index > active && "bg-gray-500"}
                        ${index === active && "dark:bg-blue-400 bg-[#9F70FD]"}`}>
                        </div>
                        }
                    </div>
                </div>
                <h5 className='hidden 1000px:flex text-[12px]'>
                    { item }
                </h5>
            </div>
        )
       )}  
    </div>
  )
}

export default CreateCourseProgress