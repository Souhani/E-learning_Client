'use client'
import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react'
import * as yup from "yup";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { styles } from '@/app/styles/style';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';

type Props = {
    setRoute: (route:string) => void;
    setOpen: (open:boolean) => void;
};

const schema = yup.object().shape({
    email: yup.string().email("Invalid email!").required("Please enter your email!"),
    password: yup.string().min(6).required("Please enter your password")
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false);
    const [login, { isSuccess, isError, data, error, isLoading }] = useLoginMutation();
    const user = useSelector((state:any) => state.auth.user);
    const formik = useFormik({
        initialValues: {
          email: "",
          password: ""
        },
        validationSchema: schema,
        async onSubmit(values) {
            await login(values);
        }
      });
    const {handleChange, handleSubmit, values, submitCount, errors} = formik;
    useEffect(() => {
        if(isSuccess && data) {
            setOpen(false);
            toast.success(data.message || "login successffuly");
            if(user.role === "Admin") {
                redirect("/admin");
            }
        }
        if(isError && error) {
            if("data" in error) {
             const errorData = error as any;
             toast.error(errorData.data.message || "login failed");
            } else {
                toast.error("login failed");
            }
        }
    },[error, data, isError,isSuccess, user])
  return (
    <div className='font-Poppins'>
        <h1 className={`${styles.title}`}>Login with E-learning</h1>
        <br/>
        <form onSubmit={handleSubmit}>
            <div>
                <label
                   className={`${styles.label} mt-[unset]`}
                   htmlFor='email'>
                    Enter your Email
                </label>
                <input 
                className={`${styles.input} ${ submitCount > 0 && errors.email ? "border-red-600" : "dark:border-gray-300 border-black"}`}
                placeholder='johndoe@gmail.com'
                name="email"
                type='email'
                value={values.email}
                onChange={handleChange}/>
                {submitCount > 0 && errors.email && (
                <p className={styles.invalid}>{errors.email}</p>
                )}
            </div>
            <div>
                <label
                    className={`${styles.label}`}
                    htmlFor='password'>
                    Enter your Password
                </label>
                <div className='relative'>
                    <input
                    className={`${styles.input} ${ submitCount > 0 && errors.password ? "border-red-600" : "dark:border-gray-300 border-black"}`}
                    placeholder='password!@%'
                    name="password"
                    type={`${show?"text":"password"}`}
                    value={values.password}
                    onChange={handleChange}/>
                    <div className='cursor-pointer absolute top-[50%] right-0 translate-x-[-50%] translate-y-[-50%]'>
                        {show ?
                        <div>
                            <AiOutlineEyeInvisible 
                            size={30}
                            onClick={()=> setShow(false)}/>
                        </div>:
                        <div>
                            <AiOutlineEye 
                            size={30}
                            onClick={()=> setShow(true)}/>
                        </div>}
                    </div>
                </div>
                {submitCount > 0 && errors.password && (
                <p className={styles.invalid}>{errors.password}</p>
                )}
            </div>
            <div className='w-full flex justify-center items-center'>
                <input  className={styles.submit}
                        type="submit"
                        value={isLoading ? "Wait...":"Login"}/>
            </div>
        </form>
        <br/>
        <div className='grid justify-center items-center gap-2'>
            <p className='w-full text-center'>Or login with</p>
            <div className='flex gap-3'>
              <FcGoogle
               onClick = {() => signIn("google")} 
               className="cursor-pointer"
               size={30}/>
              <FaGithub 
              onClick = {() => signIn("github")}
              className="cursor-pointer"
              size={30} />
            </div>
        </div>
        <br/>
        <div className='flex justify-center items-center'>
            <p>Not have any account?{" "}
                <span 
                   className='dark:text-[#6a6af0] text-[#7F27FF] cursor-pointer'
                  onClick={() => setRoute("signup")}>Sign up</span>
            </p>
        </div>
 </div>
  )
};

export default Login;