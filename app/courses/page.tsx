'use client'
import { useEffect, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Route/Footer";
import { useGetAllUsersCoursesQuery } from "@/redux/features/courses/courseApi";
import { Loader } from "../components/Loader/LoadPage";
import { useSearchParams } from "next/navigation";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import Courses from "../components/Route/Courses";
import { styles } from "../styles/style";


const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("login");
  const {data:coursesData, isLoading:coursesLoading} = useGetAllUsersCoursesQuery(undefined);
  const [search, setSearch] = useState<string>("")
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [categoryCourses, setCategoryCourses] = useState<any>([]);
  const {data:categoriesData, isLoading:categoriesLoading} = useGetLayoutQuery("CATEGORIES");
  const [switchCategory, setSwitchCategory] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    setCourses(coursesData?.allCourses);
   },[coursesData]);
  useEffect(() => {
       setSearch(searchParams?.get("search") as string);
  },[]);
  useEffect(() => {
    if(categoriesData?.layout.categories){
    setCategories(categoriesData?.layout.categories);
    }
  },[categoriesData]);
  useEffect(() => {
       if(category==="all") { 
        setCourses(coursesData?.allCourses)
         setCategoryCourses(coursesData?.allCourses);
         setSwitchCategory(false);
         return;
       }
        const newCousres = [...coursesData?.allCourses].filter((course:any) => {
            return course.category === category;
        }) as any;
        setCategoryCourses(newCousres);
        setCourses(newCousres)
        setSwitchCategory(false);
  },[category]);
  
  const searchFilter = (isCategoryCoursesExist:boolean) => {
    if(isCategoryCoursesExist) {
      if(search===null) {
        setSearch("");
        return setCourses(coursesData?.allCourses);
      }
      const newCousres =  [...categoryCourses].filter((course:any) => course?.name?.toLowerCase()?.includes(search?.toLocaleLowerCase())) as any;
      setCourses(newCousres);
    } else {
      setCourses(coursesData?.allCourses);
      setSearch("");
    }
  }

  useEffect( () => {
    if(categoryCourses === undefined) {
      setCategoryCourses([]);
      searchFilter(false)
      return;
    }
    searchFilter(true);
   },[search, switchCategory])
  return (
   <>
     {coursesLoading || categoriesLoading ? (
        <div className="w-screen h-screen">
            <Loader />
        </div>
     ) : (
     <div>
        <Heading 
          title="E-learing Courses"
          description="E-learing is a platform for students to learn and get help from teachers"
          keywords={"Programming, MERN,Redux,Machine learning"}
        />
        <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
        />
<div className="h-max">
<div className="flex justify-between mx-10 mt-10 mb-5 items-center flex-wrap gap-5">
<div className="flex gap-5 flex-wrap">
            <div>
                <button className={styles.submit + " !w-max !mt-0" + (category==="all" ? " !bg-[#fd4267]" : " !bg-[#7F27FF] dark:!bg-[#6a6af0]") }
                        onClick={() => {setCategory("all"); setSearch(""); setSwitchCategory(true)}}>
                     All
                </button>
            </div>
            {
            categories.length>0 && categories.map((item:any, index:number) => (
              <div key={index}>
                 <button className={styles.submit + " !w-max !mt-0" + (category===item.title ? " !bg-[#fd4267]" : " !bg-[#7F27FF] dark:!bg-[#6a6af0]") }
                         onClick={() => {setCategory(item.title); setSearch(""); setSwitchCategory(true)}}>
                     {item.title}
                </button>
              </div>
            ))
            }
        </div>
        <input  className='py-2 px-4 w-[250px] rounded-md dark:text-black bg-gray-300 dark:bg-gray-300 placeholder-gray-900 focus:outline-none focus:border-2 dark:focus:border-[#6a6af0ab]  focus:border-[#fd4267a6]'
                    placeholder='Search Courses...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
</div>
        { courses?.length === 0 ? 
        <div className="my-[200px] w-full flex justify-center items-center font-[600] text-[20px]"> <h1>No course found!</h1></div>: 
        <Courses courses={courses} isPage={false} />}
</div>
        <Footer/>
    </div>
     )}
   </>
  )
};


export default Page;