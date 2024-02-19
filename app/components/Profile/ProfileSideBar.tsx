import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import defaultAvatar from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import Link from 'next/link';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { DefaultProfilePic } from '@/app/utils/defaultProfilePic';


type Props = {
    user:any;
    setActive: (active:number) => void;
    active: number;
    handleLogout: () => void;
};

const ProfileSideBar:FC<Props> = ( { user, setActive, active, handleLogout }) => {
    const { data:session } = useSession();
  return (
    <div className= {`800px:w-[350px] h-[400px] dark:bg-gray-900 bg-gray-100 dark:text-black 800px:ml-[100px] ml-[25px] dark:border-gray-800 border-gray-300 border-[1px] rounded-lg dark:shadow-sm shadow-lg`}>
        <div className={`w-full h-[65px] p-4 flex items-center rounded-t-lg ${ active === 1 ? "dark:bg-gray-800 bg-gray-200 border-b-[1px] dark:border-y-[0px] border-gray-300" : "  bg-transparent cursor-pointer"}`}
             onClick={() => setActive(1)}>
          <div className='w-[50px] h-[40px] flex items-center text-[18px]'>
          { !(user?.avatar?.url)? 
                                           <DefaultProfilePic name={user?.name as string} /> :
            <Image src={ user?.avatar?.url || session?.user?.image || defaultAvatar} 
                  alt={user.name||" E-learning Profile"} 
                  width={30} height={30}
                  className='w-[35px] h-[35px] object-cover rounded-full'/>
          }
          </div>
          <h5 className='800px:flex hidden mx-1 font-Poppins font-[400] dark:text-white w-full'>My Account</h5>
        </div>
        {!session?.user?.email && <div className={`w-full h-[65px] p-4 flex items-center ${ active === 2 ? "dark:bg-gray-800 bg-gray-200 border-y-[1px] dark:border-y-[0px] border-gray-300" : "  bg-transparent cursor-pointer"}`}
             onClick={() => setActive(2)}>
          <RiLockPasswordLine
           size={30}
           className='dark:text-white'/>
          <h5 className='800px:flex hidden mx-4 font-Poppins font-[400] dark:text-white w-full'>Change Password</h5>
        </div>}
        { user.role !== "Admin" &&
        <div className={`w-full h-[65px] p-4 flex items-center ${ active === 3 ? "dark:bg-gray-800 bg-gray-200 border-y-[1px] dark:border-y-[0px]  border-gray-300" : "  bg-transparent cursor-pointer"}`}
             onClick={() => setActive(3)}>
          <FaChalkboardTeacher
           size={30}
           className='dark:text-white'/>
          <h5 className='800px:flex hidden mx-4 font-Poppins font-[400] dark:text-white w-full'>Enrolled Courses</h5>
        </div>
        }
        {user.role === "Admin" && 
        <Link href={"admin"} className={`w-full h-[65px] p-4 flex items-center bg-transparent cursor-pointer`}>
          <MdOutlineAdminPanelSettings
           size={30}
           className='dark:text-white'/>
          <h5 className='800px:flex hidden mx-4 font-Poppins font-[400] dark:text-white w-full'>Admin dashboard</h5>
        </Link>}
        <div className={`w-full h-[65px] p-4 flex items-center bg-transparent cursor-pointer`}
             onClick={() => handleLogout()}>
          <IoLogOutOutline
           size={30}
           className='dark:text-white'/>
          <h5 className='800px:flex hidden mx-4 font-Poppins font-[400] dark:text-white w-full'>Log Out</h5>
        </div>
    </div>
  )
};
export default ProfileSideBar;