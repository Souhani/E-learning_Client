import { styles } from '@/app/styles/style';
import { useActivationMutation } from '@/redux/features/auth/authApi';
import React, { FC, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from 'react-redux';

type Props = {
    setRoute: (rout:string) => void;
}

type VerifyNmuber = {
   "0":string;
    "1":string;
    "2":string;
    "3":string;
}
const Verification:FC<Props> = ({ setRoute }) => {
const [verifyNumber, setVerifyNumber] = useState<VerifyNmuber>({
     0:"",
     1:"",
     2:"",
     3:""
});
const inputRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
];
const [invalidError, setInvalidError] = useState<boolean>(false);
const handleInputChange = (index:number, value:string) => {
    setInvalidError(false)
    if(value.length>1) {
        value = value[value.length-1];
    }
    const newVerifyNumber = {...verifyNumber, [index]:value};
    setVerifyNumber(newVerifyNumber);
    if(value.length>0 && index<3) {
        inputRef[index+1].current?.focus();
    } else if(value==="" && index>0) {
        inputRef[index-1].current?.focus();
    }
};

const { token: activation_token } = useSelector((state:any) => state.auth);
const [activation, {isSuccess, isError, data, error, isLoading}] = useActivationMutation();
useEffect(() => {
   if(isSuccess && data) {
    toast.success(data.message || "Account activated successfully!");
    setRoute("login");
   };
   if(isError && error) {
    setInvalidError(true);
    if("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "Account activation failed!")
    } else {
        toast.error("Account activation failed!")
    }
   }
}, [isSuccess, isError, data, error])

const handleValidation = async () => {
    const activation_code = Object.values(verifyNumber).join("");
    if(activation_code.length !== 4) {
        setInvalidError(true);
        return;
    }
    await activation({ activation_token, activation_code});
}
  return (
    <div>
        <h1 className={`${styles.title}`}>Verify Your Account</h1>
        <br/>
        <div className='flex items-center justify-center'>
            <div className='text-white dark:bg-[#6a6af0] bg-[#93fc32] rounded-full h-[80px] w-[80px] flex items-center justify-center'>
            <VscWorkspaceTrusted size={55}/>
            </div>
        </div>
        <br/>
        <div className='flex justify-between'>
           {
            Object.keys(verifyNumber).map((key:string, index:number) => (
                     <input 
                     className={`${invalidError ? "shake border-red-600" : "dark:border-white border-black"} border-[3px] p-1 bg-transparent w-[20%] h-[70px] rounded-lg dark:text-white text-black text-[1.5rem] text-center`}
                     key={key}
                      type='number'
                      placeholder=''
                      maxLength={1}
                      value={verifyNumber[key as keyof VerifyNmuber]}
                      ref={inputRef[index]}
                      onChange={ (e)=> handleInputChange(index, e.target.value) } />
            ))
           }
        </div>
        <br/>
        <div className='flex justify-center'>
            <button 
             onClick={handleValidation}
             className={styles.submit}>{isLoading ? "Wait..." : "Verify OTP"}</button>
        </div>
        <br/>
        <div className='text-center'>
            <p>Go back to sign in? <span 
                   className='dark:text-[#6a6af0] text-[#7F27FF] cursor-pointer'
                  onClick={() => setRoute("login")}>Sing in</span></p>
        </div>
    </div>
  )
};

export default Verification;