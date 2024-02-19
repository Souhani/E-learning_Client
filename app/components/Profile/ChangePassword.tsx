import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    user:any;
    session:any;
}

const ChangePassword:FC<Props> = ({ user, session }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updatePassword, {isSuccess, isError, data, error}] = useUpdatePasswordMutation();
    const handleChangePassword = (e:any) => {
        e.preventDefault();
        if(newPassword !== confirmPassword) {
            toast.error("new password does not match");
            return
         };
         updatePassword({ newPassword, oldPassword });
    };
    useEffect(() => {
        if(isSuccess && data) {
            toast.success(data.message || "Password Updated successfully");
          }
          if(isError && error) {
           if("data" in error) {
             const errorData = error as any;
             toast.error(errorData.data?.message || "Failed to update profile");
           } else {
           toast.error("Failed to update password")
           }
          };
    },[isSuccess, isError, data, error]);

  return (
  <div className='w-[80%]'>
    <h2 className='dark:text-white text-black font-[500] text-[25px] font-Poppins text-center mb-7'>Change Password</h2>
    <form onSubmit={(e) => handleChangePassword(e)}>
       <label className='font-[400] dark:text-white my-2'>Old Password</label>
       <input className='mb-5 mt-1 p-1 bg-transparent dark:border-white border-gray-900 border-[2px] rounded-md dark:text-white w-full'
              type="password"
              value={oldPassword}
              required
              minLength={6}
              onChange={(e) => setOldPassword(e.target.value)}/>
       <label className='font-[400] dark:text-white my-2'>New Password</label>
       <input className='mb-5 mt-1 p-1 bg-transparent dark:border-white border-gray-900 border-[2px] rounded-md dark:text-white w-full'
              type="password"
              value={newPassword}
              minLength={6}
              required
              onChange={(e) => setNewPassword(e.target.value)}/>
       <label className='font-[400] dark:text-white my-2'>Confirm Password</label>
       <input className='mb-5 mt-1 p-1 bg-transparent dark:border-white border-gray-900 border-[2px] rounded-md dark:text-white w-full'
              type="password"
              value={confirmPassword}
              minLength={6}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}/>
       <input className='p-1 my-1 mx-auto bg-transparent border-[#9F70FD] dark:border-[#6a6af0] border-[2px] rounded-md dark:text-white w-[100px] cursor-pointer'
               type="submit"
                value="Update" />
    </form>
  </div>
  )
};

export default ChangePassword;