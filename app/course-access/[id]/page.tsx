'use client'
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Loader } from "../../components/Loader/LoadPage";
import Footer from "../../components/Route/Footer";
import Heading from "../../utils/Heading";
import CourseContent from "../../components/Course/CourseContent";
import CourseProtected from "@/app/hooks/courseProtected";
import { useGetCourseContentByIdQuery } from "@/redux/features/courses/courseApi";

const Page = ({params}: any) => {
  const { id } = params;
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("login");
  const  {data, isLoading, refetch} = useGetCourseContentByIdQuery(id,{refetchOnMountOrArgChange:true});
  const [activeVideo, setActiveVideo] = useState(0);
  return (
      <CourseProtected id={id}>
        {isLoading ? (
            <div className="w-screen h-screen">
                <Loader />
            </div>
        ) : (
        <div>
            <Heading 
            title={data?.content[activeVideo]?.title}
            description="E-learing is a platform for students to learn and get help from teachers"
            keywords={data?.content[activeVideo]?.tags}
            />
            <Header 
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            route={route}
            setRoute={setRoute}
            />
            <CourseContent
              id={id}
              content={data?.content}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              refetch={refetch}
            />
            <Footer/>
        </div>
        )}
   </CourseProtected>
  )
};


export default Page;