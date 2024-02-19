import React, { useEffect, useState } from 'react'
import { Questions } from '../admin/EditFaq/EditFaq';
import { useGetLayoutQuery } from '@/redux/features/layout/layoutApi';
import { styles } from '@/app/styles/style';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { Loader } from '../Loader/LoadPage';

type Props = {}

const FAQ = (props: Props) => {
    const [questions, setQuestions] = useState<Questions>([]);
    const {data, isLoading} = useGetLayoutQuery("FAQ");
    useEffect(() => {
        if(data) {
          setQuestions(data?.layout?.faq.map((q:any) => ({...q, active:false})));
        }
     },[data]);
     const toggleQuestion = (questionId:string) => {
        setQuestions((prev:any) => prev.map((q:any) => (q._id === questionId) ? {...q, active: !q.active} : q))
    };
  return (
    isLoading ? 
    <div className='h-screen w-full'>
     <Loader />
    </div> :
    <div className='w-[90%] 800px:w-[80%] m-auto mt-10'>
    <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:leading-[60px] text-black font-[700] tracking-tight'>
      Frequently Asked Questions:
    </h1>
    <br />
    <br/>
    <div className='w-full mb-10'>
        <div className=''>
           <dl className='space-y-3'>
              {questions.map((q:any) => (
                 <div
                      key={q._id}
                      className={
                        `${
                            q._id !== questions[0]?._id && "border-t"
                        } border-gray-200 pt-6 cursor-pointer font-Poppins`
                      }
                      onClick={(e) => {toggleQuestion(q._id)}}>
                    <dt className='text-lg'>
                        <div className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'>
                              <p  className={`${styles.input} border-none`}>
                                  {q.question}
                              </p>
                                 <span className="ml-6 cursor-pointer">
                                   {q.active ? (
                                    <HiMinus className="h-6 w-6" />
                                   ) : (
                                    <HiPlus className="h-6 w-6" />
                                   )}
                                 </span>
                        </div>
                    </dt>
                    {q.active && (
                        <dd className="mt-2 pr-12">
                           <p  className={`${styles.input} border-none ml-7 !text-gray-500`}>{ q.answer }</p>
                        </dd>
                    )}
                 </div>
              ))}
           </dl>
        </div>
    </div>
</div>
  )
}

export default FAQ