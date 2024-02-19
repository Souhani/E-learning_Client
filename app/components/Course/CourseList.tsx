import React, { FC, useState } from 'react'
import { BsChevronDown, BsChevronRight, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
    content: any;
    activeVideo?: number;
    setActiveVideo?: any;
    isDemo?: boolean;
}

const CourseList:FC<Props> = (Props) => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(
        new Set<string>()
    );

    const videoSections: string[] = Array.from(new Set<string>(Props.content?.map((item:any) => item.videoSection)));

    let totalCount:number = 0;

    const toggleSection = (section:string) => {
        const newVisibleSectons = new Set(visibleSections);
        if(newVisibleSectons.has(section)){
            newVisibleSectons.delete(section);
        } else {
            newVisibleSectons.add(section);
        }
        setVisibleSections(newVisibleSectons);
    }
  return (
    <div className={`text-black dark:text-white mt-[15px] w-full ${Props.isDemo && "ml-[-30px] sticky top-24 left-0 z-50"}`}>
       {
        videoSections.map((section: string, sectionIndex: number) => {
            const isSectionVisible = visibleSections.has(section);
            const sectionVideos: any[] = Props.content.filter((item:any) => item.videoSection === section);
            const  sectionVideoCount:number = sectionVideos.length;
            const sectionVideoLength: number = sectionVideos.reduce((totalength, item) => totalength + item.videoLength, 0);
            const sectionStartIndex: number = totalCount;
            totalCount += sectionVideoCount;
            const sectionContentHours: number = sectionVideoLength / 60;
            return(
                <div key={sectionIndex} className={`${  "border-b dark:border-gray-800 border-gray-300 pb-2 mt-2"}`}>
                    <div className='cursor-pointer' onClick={() => toggleSection(section)}>
                    <div className='w-full flex'>
                      <div className='w-full flex justify-between items-center'>
                         <button className='mr-4 cursor-pointer mb-1 flex items-center gap-2'>
                            {
                                isSectionVisible ? (
                                    <BsChevronRight size={20} />
                                ) :
                                (
                                    <BsChevronDown size={20} />
                                )
                            }
                            <h3 className='font-[600]'>{section}</h3>
                         </button>
                      </div>
                    </div>
                      <h5 className='ml-4'>
                        {sectionVideoCount} Lessons .{" "}
                        {sectionVideoLength < 60 ? sectionVideoLength : sectionContentHours.toFixed(2)} {" "}
                        {sectionVideoLength > 60 ? "hours" : "minutes"}
                    </h5>
                    </div>
                    <br/>
                    {isSectionVisible && (
                        <div className='w-full ml-4'>
                          {sectionVideos.map((item:any, index:number) => {
                            const videoIndex: number = sectionStartIndex + index;
                            const contentLength: number = item.videoLength / 60;
                            return(
                                <div key={index}
                                     className={`w-full ${videoIndex === Props.activeVideo ? "bg-gray-200 dark:bg-gray-700" : ""} cursor-pointer transition-all p-2`}
                                     onClick={() => Props.isDemo ? {} : Props.setActiveVideo(videoIndex)}>
                                   <div className="flex items-start">
                                      <div>
                                         <MdOutlineOndemandVideo size={25} className="mr-2 dark:text-[#6a6af0] text-[#7F27FF]" />
                                      </div>
                                      <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                                         {item.title}
                                      </h1>
                                   </div>
                                   <h5 className='pl-8 text-black dark:text-white'>
                                      {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength} {" "}
                                      {item.videoLength > 60 ? "hours" : "minutes"}
                                   </h5>
                                </div>
                            )
                          })}
                        </div>
                    )}
                </div>
            )
        })
       }
    </div>
  )
}

export default CourseList