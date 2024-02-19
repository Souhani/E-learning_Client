import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react'
import toast from 'react-hot-toast';
import { MdAddCircle } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";

type Props = {
    benefits: {title: string}[];
    setBenefits: (benefits: {title: string}[]) => void;
    prerequisites: {title: string}[];
    setPrerequisites: (prerequisites: {title: string}[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseBenefs_Prereqs:FC<Props> = ({ prerequisites, setPrerequisites, benefits, setBenefits, active, setActive}) => {
    const handleAddPrerequisites = () => {
        const newPrerequisites = [...prerequisites, {title: ""}];
        setPrerequisites(newPrerequisites)
    }
    const handleRemovePrerequisites = () => {
        const newPrerequisites = [...prerequisites];
        newPrerequisites.pop()
        setPrerequisites(newPrerequisites);

    }
    const handlePrerequisitesChange = (e:any, index:number) => {
        const newPrerequisites = [...prerequisites ];
        newPrerequisites[index] = {title:e.target.value};
        setPrerequisites(newPrerequisites);
    }
    const handleAddBenefits = () => {
        const newBenefits = [...benefits, {title: ""}];
        setBenefits(newBenefits)
    }
    const handleRemoveBenefits = () => {
        const newBenefits = [...benefits];
        newBenefits.pop()

        setBenefits(newBenefits);

    }
    const handleBenefitsChange = (e:any, index:number) => {
        const newBenefits = [...benefits ];
        newBenefits[index] = {title:e.target.value};
        setBenefits(newBenefits);
    }
    const handleNext = () => {
        const benefs_prereqs = [...benefits, ...prerequisites];
        for(let i=0; i<benefs_prereqs.length; i++) {
            if(!benefs_prereqs[i].title) {
              return toast.error("Please fill all the fields");
            }
        }
        const newActive = active + 1; 
        setActive(newActive);
    }
    const handlePrev = () => {
        const newActive = active - 1; 
        setActive(newActive);
    }
   return (
    <div>
        <div className='mb-5'>
            <label className={styles.label}>
              Prerequisites: 
            </label>
            <div>
                {prerequisites.length>0 && prerequisites.map((item, index) => (
                <div key={index} className='mb-4'>
                    <input 
                        className={styles.input}
                        placeholder='Example: Basic javascript knowledge'    
                        type="text" 
                        name="prerequisites"
                        onChange={(e) => {handlePrerequisitesChange(e, index)}}
                        value = {prerequisites[index].title}
                    />
                </div>
                ))}
            </div>
            <div className='w-full flex gap-7'>
                <MdAddCircle className="cursor-pointer dark:text-white text-gray-500" size={30} onClick = {handleAddPrerequisites} />
                {
                prerequisites.length>1 && 
                <MdRemoveCircle className="cursor-pointer dark:text-white text-gray-500" size={30} onClick = {handleRemovePrerequisites} />
                }
            </div>
        </div>
        <div className='mb-5'>
            <label className={styles.label}>
              Benefits: 
            </label>
            <div>
                {benefits.length>0 && benefits.map((item, index) => (
                <div key={index} className='mb-4'>
                    <input 
                        className={styles.input}
                        placeholder='Example:  Master beginner and advanced JavaScript topics'    
                        type="text" 
                        name="benefits"
                        onChange={(e) => {handleBenefitsChange(e, index)}}
                        value = {benefits[index].title}
                    />
                </div>
                ))}
            </div>
            <div className='w-full flex gap-7'>
                <MdAddCircle className="cursor-pointer dark:text-white text-gray-500" size={30} onClick = {handleAddBenefits} />
                {
                benefits.length>1 && 
                <MdRemoveCircle className="cursor-pointer dark:text-white text-gray-500" size={30} onClick = {handleRemoveBenefits} />
                }
            </div>
        </div>
        <div className='flex justify-between gap-2'>
                <button onClick={handlePrev} className='cursor-pointer px-10 py-2 text-[20px] text-white dark:text-black rounded-sm  my-5 bg-[#7F27FF] dark:bg-[#37a39a]'>Prev</button>
                <button onClick={handleNext} className='cursor-pointer px-10 py-2 text-[20px] text-white dark:text-black rounded-sm  my-5 bg-[#7F27FF] dark:bg-[#37a39a]'>Next</button>
        </div>
    </div>
  )
}

export default CourseBenefs_Prereqs