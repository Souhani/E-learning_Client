import Link from 'next/link'
import React from 'react'
import { AiOutlineGithub, AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";


type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='dark:bg-[#0e0e1a] bg-gray-50'>
       <div className='border-t border-gray-300 dark:border-[#ffffff1e]'>
            <br/>
            <div className='w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-4 lg:px-8'>
               <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
                  <div className='space-y-3'>
                     <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                        About
                     </h3>
                     <ul className='space-y-4'>
                        <li>
                            <Link href={"/about"}
                                  className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                    Our Story
                            </Link>
                        </li>
                        <li>
                            <Link   href={"/faq"}
                                    className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                      FAQ
                            </Link> 
                        </li>
                     </ul>
                  </div>
                  <div className='space-y-3'>
                     <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                        Quick Links
                     </h3>
                     <ul className='space-y-4'>
                        <li>
                            <Link href={"/courses"}
                                  className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                    Courses
                            </Link>
                        </li>
                        <li>
                            <Link   href={"/profile"}
                                    className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                     My Account
                            </Link> 
                        </li>
                     </ul>
                  </div>
                  <div className='space-y-3'>
                     <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                        Social Links
                     </h3>
                     <ul className='space-y-4'>
                        <li>
                            <Link href={"https://www.youtube.com"}
                                  className='text-base text-black flex gap-1 items-center dark:text-gray-300 dark:hover:text-white'>
                                    <AiOutlineYoutube />
                                    <span>Youtube</span>
                            </Link>
                        </li>
                        <li>
                            <Link   href={"https://www.github.com"}
                                    className='flex gap-1 items-center text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                        <AiOutlineGithub />
                                        <span>Github</span>
                            </Link> 
                        </li>
                     </ul>
                  </div>
                  <div>
                        <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                            Contact Info
                        </h3>
                        <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                            Address: 13340 Alice Ave, LA, USA
                        </p>
                        <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                                Mail Us: johnsnow@gmail.com
                        </p>
                  </div>
                </div> 
                <p className=' text-center mt-2 pb-1 text-gray-500'>
                    Copyright © 2024 E-learning
                </p> 
            </div>
       </div>
    </footer>
  )
}

export default Footer