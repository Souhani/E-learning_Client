import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import { FC } from "react";
import "./loader.css"
const LoadPage:FC<{ children:React.ReactNode}> = ({ children }) => {
    const { isLoading } = useLoadUserQuery({})
      return (
        <>
        {
         isLoading ? 
         <div className="h-screen">
           <Loader />
         </div> :
         <> { children } </>
        }
        </>
      )
  };

export const Loader = () => {
          return (
            <div className='h-full w-full flex justify-center items-center'>
                  <div className='load dark:border-gray-600 border-[5px] dark:border-t-white border-gray-400  border-t-gray-700 rounded-full w-[50px] h-[50px]'></div>
            </div>
          )
}
  export default LoadPage;