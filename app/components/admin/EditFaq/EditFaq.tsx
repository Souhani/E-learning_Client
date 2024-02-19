import { styles } from '@/app/styles/style';
import { useGetLayoutQuery, useUpdateLayoutMutation } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { IoMdAddCircleOutline } from 'react-icons/io';

type Props = {};

export type Questions = {
    question: string;
    answer: string;
    _id:string;
    active: boolean;
}[]

const EditFaq = (props: Props) => {
    const [questions, setQuestions] = useState<Questions>([]);
    const [oldQuestions, setOldQuestions] = useState<Questions>([]);
    const {data, refetch:refreshLayout} = useGetLayoutQuery("FAQ",{
        refetchOnMountOrArgChange:true
      });
   const [updateLayout, {isLoading, isSuccess, data:updatedData, isError, error}] = useUpdateLayoutMutation();
      useEffect(() => {
        if(data) {
          setOldQuestions(data?.layout?.faq.map((q:any) => ({...q, active:true})));
          setQuestions(data?.layout?.faq.map((q:any) => ({...q, active:true})));
        }
     },[data]);
    const toggleQuestion = (questionId:string) => {
        setQuestions((prev) => prev.map(q => (q._id === questionId) ? {...q, active: !q.active} : q))
    };
    const handleQuestionChange = (questionId:string, value:string) => {
       setQuestions(prev => prev.map(q => (q._id === questionId) ? {...q, question: value} : q))
    };
    const handleAnswerChange = (questionId:string, value:string) => {
      setQuestions(prev => prev.map(q => (q._id === questionId) ? {...q, answer: value} : q))
    };
    const handleAddNewFaq = () => {
      if(isAnyQuestionEmpty()) {
        return toast.error("Please fill all the fields")
      }
        setQuestions([...questions, {question:'', answer:'', _id:questions.length.toString(), active:true}])
    };
    const areQuestionsUnchanged = () => {
      return JSON.stringify(oldQuestions.map(q => ({question:q.question, answer:q.answer}))) === JSON.stringify(questions.map(q => ({question:q.question, answer:q.answer})));
    };
    const isAnyQuestionEmpty = () => {
       return questions.some(q => q.question === "" || q.answer === "");
    };
    const handleSubmit =async () => {
      if(isLoading) {
        return toast("Loading...");
      }
      if(isAnyQuestionEmpty()) {
        return toast.error("Please fill all the fields")
      }
      if(areQuestionsUnchanged()){
        return toast.error("Please make changes first to update");
      }
      await updateLayout({
      type:"FAQ",
      faq: questions
      });
    };
    useEffect(() => {
      if(isSuccess && updatedData){
        toast.success(updatedData.message || "Updated successfully");
        refreshLayout();
       }
       if(error && isError) {
         if("data" in error) {
           const errorData = error as any;
           toast.error(errorData.data.message || "Failed to update")
         } else {
          toast.error("Failed to update")
         }
       }
    }, [isSuccess, updatedData, isError, error])
    
  return (
    <div className='w-full mb-10'>
        <div className='mt-12'>
           <dl className='space-y-3'>
              {questions.map((q:any) => (
                 <div
                      key={q._id}
                      className={
                        `${
                            q._id !== questions[0]?._id && "border-t"
                        } border-gray-200 pt-6`
                      }>
                    <dt className='text-lg'>
                        <div className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'>
                              <input  
                                className={`${styles.input} border-none`}
                                value={q.question}
                                onChange={(e) => {
                                    handleQuestionChange(q._id, e.target.value)
                                }}
                                placeholder='Add your quistion...'/>
                                 <span className="ml-6 cursor-pointer" onClick={(e) => {toggleQuestion(q._id)}}>
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
                           <input 
                                  className={`${styles.input} border-none ml-7`}
                                  value={q.answer}
                                  onChange={(e) => {
                                    handleAnswerChange(q._id, e.target.value);
                                  }}
                                  placeholder="Add your answer..." />
                                  <span className='ml-6 flex-shrink-0'>
                                     <AiOutlineDelete
                                        className="dark:text-white text-black text-[18px] cursor-pointer"
                                        onClick={() => {
                                            setQuestions((prev) => prev.filter((item) => item._id !== q._id))
                                        }} />
                                  </span>
                        </dd>
                    )}
                 </div>
              ))}
           </dl>
           <br />
           <br />
           <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={handleAddNewFaq} />
        </div>
        <div className='w-full flex justify-end mt-1 '>
          <button className={`!max-w-[100px] ${styles.submit} 
                  ${
                    (areQuestionsUnchanged() ||
                      isAnyQuestionEmpty()) && 
                  "!bg-[unset] !border-[2px] !border-gray-500 !cursor-not-allowed dark:!text-white !text-gray-800"}`}
          onClick={handleSubmit}>
            Save
          </button>
        </div>
    </div>
  )
}

export default EditFaq