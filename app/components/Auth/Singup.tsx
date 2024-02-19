'use client'
import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react'
import * as yup from "yup";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { styles } from '@/app/styles/style';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {
    setRoute: (route:string) => void
};

const schema = yup.object().shape({
    name: yup.string().required("Please enter your name!"),
    email: yup.string().email("Invalid email!").required("Please enter your email!"),
    password: yup.string().min(6).required("Please enter your password")
});

const Signup: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false);
    const [register, {isSuccess, isError, data, error, isLoading}] = useRegisterMutation();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: schema,
       async onSubmit(values) {
            await register(values);
        }
        });
        const {handleChange, handleSubmit, values, submitCount, errors} = formik;
        useEffect(() => {
            if(isSuccess && data) {
                toast.success(data.message || "Successfully registred!");
                setRoute("verification");
            }
            if(isError && error) {
                if("data" in error) {
                    const errorData = error as any;
                   toast.error(errorData?.data?.message || "failed to register!")
                }
            }
        }, [isSuccess, isError, data, error])
        
  return (
    <div className='font-Poppins'>
        <h1 className={`${styles.title}`}>Join to E-learning</h1>
        <br/>
        <form onSubmit={handleSubmit}>
            <div>
                <label
                   className={`${styles.label} mt-[unset]`}
                   htmlFor='name'>
                    Enter your name
                </label>
                <input 
                className={`${styles.input} ${ submitCount > 0 && errors.name ? "border-red-600" : "dark:border-gray-300 border-black"}`}
                placeholder='John Doe'
                name="name"
                type='text'
                value={values.name}
                onChange={handleChange}/>
                {submitCount > 0 && errors.name && (
                <p className={styles.invalid}>{errors.name}</p>
                )}
            </div>
            <div>
                <label
                   className={`${styles.label}`}
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
                        value={isLoading ? "Wait..." : "Sing up"}/>
            </div>
        </form>
        <br/>
        <div className='grid justify-center items-center gap-2'>
            <p className='w-full text-center'>Or join with</p>
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
            <p>already have an account?{" "}
                <span 
                   className='dark:text-[#6a6af0] text-[#7F27FF] cursor-pointer'
                  onClick={() => setRoute("login")}>Login</span>
            </p>
        </div>
 </div>
  )
};

export default Signup;