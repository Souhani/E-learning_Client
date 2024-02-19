import { styles } from '@/app/styles/style';
import { useGetLayoutQuery, useUpdateLayoutMutation } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { CiCamera } from 'react-icons/ci';

type Props = {}

const EditHero = (props: Props) => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const {data, refetch:refreshLayout} = useGetLayoutQuery("BANNER",{
      refetchOnMountOrArgChange:true
    });
    const [updateLayout,{data:updatedData, isLoading, isSuccess, error}] = useUpdateLayoutMutation();
    useEffect(() => {
       if(data) {
        setImage(data?.layout?.banner?.image?.url);
        setTitle(data?.layout?.banner?.title);
        setSubTitle(data?.layout?.banner?.subTitle);
       }
    },[data]);
    useEffect(() => {
      if(isSuccess && updatedData){
        toast.success(updatedData.message || "Updated successfully");
        refreshLayout();
       }
       if(error) {
         if("data" in error) {
           const errorData = error as any;
           toast.error(errorData.data.message || "Failed to update")
         } else {
          toast.error("Failed to update")
         }
       }
    },[isSuccess, error, updatedData]);
    const handleTitleChange = (e:any) => {
      setTitle(e.target.value);
    };
    const handleSubTitleChange = (e:any) => {
      setSubTitle(e.target.value);
    };
    const imageHandler = (e:any) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = async () =>   {
         if(fileReader.readyState === 2) {
          const newImage = fileReader.result as string;
            setImage(newImage);
         };
      }
   };
    const handleSubmit = async () => {
      if(isLoading) {
        return toast("Loading...");
      }
      if(
        title!==data?.layout?.banner?.title ||
        subTitle!==data?.layout?.banner?.subTitle ||
        image!==data?.layout?.banner?.image.url
        ) {
        const data = {
          type: "BANNER",
          image,
          title,
          subTitle
      }
      await updateLayout(data);
      }
    }
  const screenWdith = document.body.clientWidth;
  return (
    <div className='w-full mb-10'>
        <div className='text-black dark:text-white 800px:flex gap-4 items-center mx-8 my-1'>
        <div className='flex-1 relative'>
                <img  className='max-h-[550px] object-cover w-auto m-auto object-contain z-[10]'
                    src={image}
                    alt="programming"
                />
               <input 
                className='z-[9] absolute h-[70px] w-[70px] bottom-0 left-[90%] translate-x-[-50%] opacity-0 cursor-pointer'
                type='file'
                name=""
                id="avatar"
                onChange={(e) => imageHandler(e)}
                accept='image/png,image/jpg,image/jpeg,image/webp'/>
             <div className='flex justify-center items-center absolute bg-gray-900 h-[70px] w-[70px] text-white bottom-0 left-[90%] translate-x-[-50%] rounded-full'>
               <CiCamera size={40}/>
             </div>
        </div>

        <div className='flex-1 text-center font-Poppins'>
                <textarea cols={20}  
                          rows={3} 
                          maxLength={100} 
                          className='800px:text-[2.5rem] block font-[700] my-2 border-0 bg-[unset]' 
                          value={title}
                          onChange={(e) => handleTitleChange(e)}
                          ></textarea>
                <textarea cols={screenWdith >= 640 ? 60 : 20} 
                          rows={3} 
                          maxLength={200} 
                          className='800px:text-[1rem] block border-0 bg-[unset] mt-1 sm:mt-0' 
                          value={subTitle}
                          onChange={(e) => handleSubTitleChange(e)}></textarea>
        </div>
        </div>
        <div className='w-full flex justify-end mt-1'>
            <button 
               onClick={handleSubmit}
               className={`!max-w-[100px] ${styles.submit} 
                ${
                !( title!==data?.layout?.banner?.title ||
                  subTitle!==data?.layout?.banner?.subTitle ||
                  image!==data?.layout?.banner?.image.url) && 
                "!bg-[unset] !border-[2px] !border-gray-500 !cursor-not-allowed dark:!text-white !text-gray-800"}`}>
                Save
            </button>
        </div>
    </div>
  )
}

export default EditHero