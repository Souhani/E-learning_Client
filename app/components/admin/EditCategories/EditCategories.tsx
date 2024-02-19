import { styles } from '@/app/styles/style';
import { useGetLayoutQuery, useUpdateLayoutMutation } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';

type Props = {};

export type Categories = {
    title: string;
    _id:string;
}[];

const EditCategories = (props: Props) => {
    const [categories, setCategories] = useState<Categories>([]);
    const [oldCategories, setOldCategories] = useState<Categories>([]);
    const {data, refetch:refreshLayout} = useGetLayoutQuery("CATEGORIES",{
        refetchOnMountOrArgChange:true
      });
   const [updateLayout, {isLoading, isSuccess, data:updatedData, isError, error}] = useUpdateLayoutMutation();
      useEffect(() => {
        if(data) {
            setOldCategories(data?.layout?.categories);
            setCategories(data?.layout?.categories);
        }
     },[data]);
    const handleCategoryChange = (categoryId:string, value:string) => {
       setCategories(prev => prev.map(c => (c._id === categoryId) ? {...c, title: value} : c))
    };
    const handleAddNewCategory = () => {
        if(isAnyCategoryEmpty()) {
            return toast.error("Please fill all the fields")
          }
        setCategories([...categories, {title:'',  _id:categories.length.toString()}])
    };
    const areCategoriesUnchanged = () => {
      return JSON.stringify(oldCategories) === JSON.stringify(categories);
    };
    const isAnyCategoryEmpty = () => {
       return categories.some(c => c.title === "");
    };
    const handleSubmit =async () => {
      if(isLoading) {
        return toast("Loading...");
      }
      if(isAnyCategoryEmpty()) {
        return toast.error("Please fill all the fields")
      }
      if(areCategoriesUnchanged()){
        return toast.error("Please make changes to update");
      }
      await updateLayout({
      type:"CATEGORIES",
      categories
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
    <div className='w-full my-10 grid justify-center'>
        <h1 className='text-[30px] font-bold'>All Categories</h1>
        <br />
        <div>
            {
              categories.map(c => (
               <div key={c._id} className='flex items-center gap-2'>
                   <input  
                    className={`${styles.input} border-none`}
                    value={c.title}
                    onChange={(e) => {
                    handleCategoryChange(c._id, e.target.value)
                }}
                placeholder='Add new category...' />
                 <AiOutlineDelete
                    className="dark:text-white text-black text-[18px] cursor-pointer"
                    onClick={() => {
                        setCategories((prev) => prev.filter((item) => item._id !== c._id))
                    }} />
               </div>
              ))  
            }
        </div>
        <br />
        <div className=''>
           <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={handleAddNewCategory} />
        </div>
        <div className='w-full flex justify-end mt-1 '>
          <button className={`!max-w-[100px] ${styles.submit} 
                  ${
                    (areCategoriesUnchanged() ||
                      isAnyCategoryEmpty()) && 
                  "!bg-[unset] !border-[2px] !border-gray-500 !cursor-not-allowed dark:!text-white !text-gray-800"}`}
          onClick={handleSubmit}>
            Save
          </button>
        </div>
    </div>
  )
}

export default EditCategories