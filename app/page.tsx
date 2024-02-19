'use client'
import { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/Route/FAQ";
import Footer from "./components/Route/Footer"
import { useGetAllUsersCoursesQuery } from "@/redux/features/courses/courseApi";

interface Props {

}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login");
      const {data, isLoading} = useGetAllUsersCoursesQuery(undefined);
    const [courses, setCourses] = useState([]);
    useEffect( () => {
     setCourses(data?.allCourses);
    },[data]);
  return (
    <div>
        <Heading 
          title="E-learing"
          description="E-learing is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN,Redux,Machine learning"
        />
        <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
        />
        <Hero />
        <Courses courses={courses} isPage={true} isLoading={isLoading}/>
        <Reviews />
        <FAQ />
        <Footer/>
    </div>
  )
};


export default Page;