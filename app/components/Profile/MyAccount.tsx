'use client'
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import defaultAvatar from "../../../public/assets/avatar.png";
import { CiCamera } from "react-icons/ci";
import { useUpdateAvatarMutation, useUpdateInfoMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { DefaultProfilePic } from '@/app/utils/defaultProfilePic';

type Props = {
    user:any;
    session:any;
}

const MyAccount:FC<Props> = ({ user, session }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true});
  const [updateAvatar, { isSuccess, isError, error, data }] = useUpdateAvatarMutation();
  const [updateInfo, { isSuccess:isSuccessInfo, isError:isErrorInfo, error:errorInfo, data:dataInfo }] = useUpdateInfoMutation();
    const imageHandler = (e:any) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = async () => {
           if(fileReader.readyState === 2) {
              await updateAvatar(fileReader.result);
           };
        }
    }
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      await updateInfo({ name });
    };
    useEffect(() => {
      // update user avatar
       if(isSuccess && data) {
         toast.success(data?.message || "Updated successfully");
         setLoadUser(true);
         location.reload();
       }
       if(isError && error) {
        if("data" in error) {
          const errorData = error as any;
          toast.error(errorData.data?.message || "Failed to update profile");
        }
        toast.error("Failed to update image")
       };
       // update user info
       if(isSuccessInfo && dataInfo) {
        toast.success(dataInfo?.message || "Updated successfully");
        setLoadUser(true);
      }
      if(isErrorInfo && errorInfo) {
       if("data" in errorInfo) {
         const errorData = errorInfo as any;
         toast.error(errorData.data?.message || "Failed to update profile");
       }
       toast.error("Failed to update profile")
      };
    }, [isSuccess, isError, data, error,
        isSuccessInfo, isErrorInfo, dataInfo, errorInfo]);
  return (
    <div className='w-[80%]'>
        <div className='relative mx-auto mb-7 overflowl-hidden w-[100px] h-[100px] text-[50px] flex justify-center items-center'>
        { !(user?.avatar?.url)? 
                                           <DefaultProfilePic name={user?.name as string} /> :
            <Image 
               src={ user?.avatar?.url || session?.user?.image || defaultAvatar} 
               alt={user.name} 
               width={100} height={100}
               className='w-[100px] h-[100px] object-cover rounded-full border-[3px] border-[#9F70FD] dark:border-[#6a6af0]'
                />}

            <input 
            className='z-[9] w-[100px] h-[100px] absolute opacity-0 cursor-pointer'
             type='file'
             name=""
             id="avatar"
             onChange={(e) => imageHandler(e)}
             accept='image/png,image/jpg,image/jpeg,image/webp'/>
             <div className='flex justify-center items-center absolute bg-gray-900 h-[30px] w-[30px] text-white bottom-0 left-[50%] translate-x-[-50%] rounded-full'>
               <CiCamera size={20}/>
             </div>
         </div>
         <form onSubmit={handleSubmit}>
            <label className='font-[400] dark:text-white my-2'>Full Name</label>
            <input className='mb-5 mt-1 p-1 bg-transparent dark:border-white border-gray-900 border-[2px] rounded-md dark:text-white w-full'
               type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}/>
            <label className='font-[400] dark:text-white my-2'>Email Address</label>
            <input className='mb-5 mt-1 p-1 dark:bg-gray-900 bg-slate-200 border-gray-900 dark:border-white border-[2px] rounded-md dark:text-white w-full cursor-not-allowed'
                   value={email} 
                   readOnly
                   required
            />
            <input className='p-1 my-1 mx-auto bg-transparent border-[#9F70FD] dark:border-[#6a6af0] border-[2px] rounded-md dark:text-white w-[100px] cursor-pointer'
               type="submit"
                value="Update" />
         </form>
    </div>
  )
}

export default MyAccount;