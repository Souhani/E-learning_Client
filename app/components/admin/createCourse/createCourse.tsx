import React, { useEffect, useState } from 'react';
import CreateCourseProgress from "./CreateCourseProgress";
import CourseInformation from "./CourseInformation";
import CourseBenefs_Prereqs from "./CourseBenefs_Prereqs";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from '@/redux/features/courses/courseApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
type Props = {}

const CreateCourse = (props: Props) => {
    const [createCourse, {isLoading, isSuccess, isError, data, error}] = useCreateCourseMutation();
    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags:"",
        videoPlayer:"",
        category:"",
        level:"",
        demoUrl:"",
        thumbnail:""
    });
    const [benefits, setBenefits] = useState([{ title:""}]);
    const [prerequisites, setPrerequisites] = useState([{ title:""}]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl:"",
            title:"",
            description:"",
            videoSection:"Untitled Section, 1",
            videoLength:"",
            links: [
                {
                    title:"",
                    url:""
                }
            ],
            suggestion: ""
        }
    ]);

    const [courseData, setCourseData] = useState({});
    const handleSubmit = async () => {
      // format benefits array
      const formatedBenefits = benefits.map(benefit => ({title:benefit.title}));
      // format prerequisites array
      const formatedPrerequisites = prerequisites.map(prerequisite => ({title:prerequisite.title}));
      // format course content array
      const formatedCourseContentData = courseContentData.map(content => ({
        videoUrl: content.videoUrl,
        title: content.title,
        description: content.description,
        videoSection: content.videoSection,
        videoLength: content.videoLength,
        links: content.links.map(link => ({
          title: link.title,
          url: link.url
        })),
        suggestion: content.suggestion
      }));
      // prepare data
      const data = {
        name: courseInfo.name,
        description: courseInfo.description,
        price: courseInfo.price,
        estimatedPrice: courseInfo.estimatedPrice,
        tags: courseInfo.tags,
        category: courseInfo.category,
        thumbnail: courseInfo.thumbnail,
        level: courseInfo.level,
        videoPlayer: courseInfo.videoPlayer,
        demoUrl: courseInfo.demoUrl,
        totalVideos: formatedCourseContentData.length,
        courseData: formatedCourseContentData,
        benefits:formatedBenefits,
        prerequisites:formatedPrerequisites,
      };
      setCourseData(data);
    }
    const handleCourseCreate = async(e:any) => {
       if(!isLoading){
        await createCourse(courseData);
       } else {
        toast("Loading...")
       }
    };
    useEffect(() => {
      if(isSuccess && data) {
        toast.success(data.message || "course created successfully");
        redirect("/admin/courses");
      }
      if(isError && error) {
        if("data" in error) {
          const errorData = error as any;
          toast.error(errorData.data.message);
        } else {
          toast.error("failed to create course");
        }
      }
    }, [isSuccess, isError,  data, error])
    
  return (
    <div className='w-full flex main-h-screen'>
        <div className='w-[80%]'>
         {
            active === 0 && 
                <CourseInformation
                  courseInfo = {courseInfo}
                  setCourseInfo = {setCourseInfo}
                  setActive = {setActive} />
         }
         {
            active === 1 && 
                <CourseBenefs_Prereqs
                  benefits = {benefits}
                  setBenefits= {setBenefits}
                  prerequisites = {prerequisites}
                  setPrerequisites= {setPrerequisites}
                  setActive = {setActive}
                  active = {active} />
         }
          {
            active === 2 && 
                <CourseContent
                  courseContentData = {courseContentData}
                  setCourseContentData = {setCourseContentData}
                  setActive = {setActive}
                  active = {active}
                  handleSubmit= {handleSubmit} />
         }
          {
            active === 3 && 
                <CoursePreview
                  setActive = {setActive}
                  active = {active}
                  courseData= {courseData}
                  handleCourseCreate= {handleCourseCreate} />
         }
         
        </div>
        <div className='max-w-[20%]  mt-[100px]  h-screen fixed z-[-1] right-[25px]'>
          <CreateCourseProgress active={active} setActive={setActive} />
        </div>
    </div>
  )
}

export default CreateCourse