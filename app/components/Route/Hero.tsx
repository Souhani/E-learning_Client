import { useGetLayoutQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Loader } from '../Loader/LoadPage';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";


type Props = {}

const H1Variants = {
  initial: { y: -500, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
};

const TextVariants = {
  initial: { x: 500 },
  animate: { x: 0, transition: { duration: 0.5 } }
};


const Hero = (props: Props) => {  
  const {data, isLoading} = useGetLayoutQuery("BANNER");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearchSubmit = () => {
   if(search) {
    router.push(`/courses?search=${search}`);
   }
  }
  return (
     isLoading ? 
     <div className='h-screen w-full'>
      <Loader />
     </div> : 
     <div className='text-black dark:text-white 800px:flex gap-4 items-center mx-8 my-1'>
      <div className='flex-1 floating'>
            <img  className='max-h-[550px] w-auto m-auto object-contain z-[10]'
                src={data?.layout?.banner?.image.url}
                alt="programming"
            />
      </div>

      <div className='flex-1 text-center font-Poppins'>
            <motion.h1 variants={H1Variants} initial="initial" animate="animate" className='sm:text-[2.5rem] text-[1.9rem] font-[700] my-2 mx-1'>{data?.layout?.banner?.title}</motion.h1>
            <motion.p variants={TextVariants} initial="initial" animate="animate" className='text-[1rem] my-2 mx-1'>{data?.layout?.banner?.subTitle}</motion.p>
            <div className='flex w-full m-2 r-10 '>
              <input  className='px-2 py-4 w-[87%] rounded-l-md dark:text-black bg-gray-300 dark:bg-gray-300 placeholder-gray-900 focus:outline-none dark:focus:border-[#6a6af0]  focus:border-[#9F70FD] focus:border-[1px]'
                    placeholder='Search Courses...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
              <div className='dark:bg-[#6a6af0]  bg-[#9F70FD] px-2 py-4 w-[13%] flex items-center justify-center rounded-r-md cursor-pointer'
                   onClick={handleSearchSubmit}>
                 <BiSearch size={30} className='text-white' />
              </div>
            </div>
            <div className='flex items-center my-8 mx-2 gap-2'>
              <div className='flex'>
                <Image  className='max-h-[50px] w-auto rounded-[100%] border-gray-400 dark:border-white border-[2px] overflow-hidden'
                  src={require("../../../public/assets/hero_students/1.png")}
                  alt="girl student 1"
                /> 
                 <Image  className='ml-[-20px] max-h-[50px] w-auto rounded-[100%] border-gray-400 dark:border-white border-[2px] overflow-hidden'
                  src={require("../../../public/assets/hero_students/2.png")}
                  alt="boy  student 2"
                /> 
                 <Image  className='ml-[-20px] max-h-[50px] w-auto rounded-[100%] border-gray-400 dark:border-white border-[2px] overflow-hidden	'
                  src={require("../../../public/assets/hero_students/3.png")}
                  alt="boy student 3"
                /> 
              </div>
              <div className='flex flex-wrap items-center'>
                 <p>100K+ People already trusted us.{" "}
                   <Link href={"/courses"}
                          className='dark:text-[#6a6af0] text-[#7F27FF]'>
                     View Courses
                   </Link>
                 </p>
              </div>
            </div>
      </div>
      
    </div>
  )
};

export default Hero;