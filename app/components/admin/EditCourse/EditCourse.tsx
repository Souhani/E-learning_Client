import React, { FC, useEffect, useState } from 'react';
import { useEditCourseMutation, useGetAllAdminCoursesQuery } from '@/redux/features/courses/courseApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import CourseInformation from '../createCourse/CourseInformation';
import CourseBenefs_Prereqs from '../createCourse/CourseBenefs_Prereqs';
import CourseContent from '../createCourse/CourseContent';
import CoursePreview from '../createCourse/CoursePreview';
import CreateCourseProgress from '../createCourse/CreateCourseProgress';
type Props = {
    id:string;
}

const EditCourse:FC<Props> = ({ id }) => {
    const { isLoading:isCoursesLoading, isSuccess:isCoursesSuccess, data:coursesData, refetch:refetchCourses} = useGetAllAdminCoursesQuery({}, {
        refetchOnMountOrArgChange: true
      });
    const [editCourse, {isLoading, isSuccess, data, isError, error}] = useEditCourseMutation({})
    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags:"",
        category:"",
        level:"",
        videoPlayer:"",
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
    useEffect(()=> {
        if(isCoursesSuccess) {
           const course = coursesData?.courses?.find((course:any)=> course._id === id);
           setCourseInfo({
            name: course.name,
            description: course.description,
            price: course.price,
            estimatedPrice: course.estimatedPrice,
            tags: course.tags,
            category: course.category,
            videoPlayer: course.videoPlayer,
            level: course.level,
            demoUrl: course.demoUrl,
            thumbnail: course?.thumbnail?.url
        });
        setBenefits(course.benefits);
        setPrerequisites(course.prerequisites);
        setCourseContentData(course.courseData);
       }},[isCoursesSuccess])
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
        benefits: formatedBenefits,
        prerequisites: formatedPrerequisites,
      };
      setCourseData(data);
    }
    const handleUpdateCourse = async (e:any) => {
       if(!isLoading){
        await handleSubmit();
        if(courseData && id) {
            await editCourse({
                id,
                courseData
            });
        }
       } else {
        toast("Loading...")
       }
    };
    useEffect(() => {
      if(isSuccess && data) {
        toast.success(data.message || "course updated successfully");
        redirect("/admin/courses");
      }
      if(isError && error) {
        if("data" in error) {
          const errorData = error as any;
          toast.error(errorData.data.message);
        } else {
          toast.error("failed to update course");
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
                  handleCourseCreate= {handleUpdateCourse}
                  isEdit ={true} />
         }
         
        </div>
        <div className='max-w-[20%]  mt-[100px]  h-screen fixed z-[-1] right-[25px]'>
          <CreateCourseProgress active={active} setActive={setActive} />
        </div>
    </div>
  )
}

export default EditCourse;