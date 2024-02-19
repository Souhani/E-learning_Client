"use client";
import React, { FC, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { styles } from "@/app/styles/style";
import { MdAddCircle } from "react-icons/md";
import toast from "react-hot-toast";

type Props = {
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
    Array(courseContentData.length).fill(false)
  );  
  const handleCollapes = (index: number) => {
    const newIsCollapsed = [...isCollapsed];
    newIsCollapsed[index] = !newIsCollapsed[index];
    setIsCollapsed(newIsCollapsed);
  };
  const handleSectionChange = (e: any, index: number) => {
    const newCourseContentData = [...courseContentData];
    for (let i = 1; i < newCourseContentData.length + 1; i++) {
      if (
        newCourseContentData[index]?.videoSection ===
        newCourseContentData[index + i]?.videoSection
      ) {
        newCourseContentData[index+1] = {...newCourseContentData[index+1], videoSection: e.target.value};
      } else {
        newCourseContentData[index] = {...newCourseContentData[index], videoSection: e.target.value};
        return setCourseContentData(newCourseContentData);
      }
    }
    newCourseContentData[index] = {...newCourseContentData[index], videoSection: e.target.value};
    setCourseContentData(newCourseContentData);
  };
  const handleTitleChange = (e: any, index: number) => {
    const newCourseContentData = [...courseContentData];
    newCourseContentData[index] = {...newCourseContentData[index], title:e.target.value};
    setCourseContentData(newCourseContentData);
  };
  const handleVideoUrlChange = (e: any, index: number) => {
    const newCourseContentData = [...courseContentData];
    newCourseContentData[index] = {...newCourseContentData[index], videoUrl:e.target.value};
    setCourseContentData(newCourseContentData);
  };
  const handleVideoLengthChange = (e: any, index: number) => {
    const newCourseContentData = [...courseContentData];
    newCourseContentData[index] = {...newCourseContentData[index], videoLength:e.target.value};
    setCourseContentData(newCourseContentData);
  };
  const handleDescriptionChange = (e: any, index: number) => {
    const newCourseContentData = [...courseContentData];
    newCourseContentData[index] = {...newCourseContentData[index], description:e.target.value};
    setCourseContentData(newCourseContentData);
  };
  const handleLinkTitleChange = (e: any, index: number, linkIndesx: number) => {
    const newCourseContentData = [...courseContentData];

    newCourseContentData[index] = {...newCourseContentData[index], 
      links: [...newCourseContentData[index].links].map((link, i) => {
           if(i===linkIndesx) {
              return {...link, title:e.target.value}
           } else {
              return {...link}
           }
    })};
    setCourseContentData(newCourseContentData);
  };
  const handleLinkUrlChange = (e: any, index: number, linkIndesx: number) => {
    const newCourseContentData = [...courseContentData];
    newCourseContentData[index] = {...newCourseContentData[index], 
      links: [...newCourseContentData[index].links].map((link, i) => {
           if(i===linkIndesx) {
              return {...link, url:e.target.value}
           } else {
              return {...link}
           }
    })};
    setCourseContentData(newCourseContentData);
  };
  const handleAddLink = (index: number) => {
    if (
      !courseContentData[index].links[courseContentData[index].links.length - 1]
        .title ||
      !courseContentData[index].links[courseContentData[index].links.length - 1]
        .url
    ) {
      return toast.error("Please fill all the empty fields first");
    }
    const newCourseContentData = [...courseContentData];
    const newLinks = [...newCourseContentData[index].links,{ title: "", url: "" }];
    newCourseContentData[index] = {...newCourseContentData[index], links:newLinks};
    setCourseContentData(newCourseContentData);
  };
  const handleAddContent = (index: number) => {
    for (let i = 0; i < courseContentData.length; i++) {
      if (
        !courseContentData[i].title ||
        !courseContentData[i].videoUrl ||
        !courseContentData[i].description ||
        !courseContentData[i].links[courseContentData[i].links.length - 1].title ||
        !courseContentData[i].links[courseContentData[i].links.length - 1].url
      ) {
        return toast.error("Please fill all the empty fields first");
      }
    }
    const newCourseContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: courseContentData[index].videoSection,
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    };
    const newCourseContentData = [...courseContentData];
    newCourseContentData.splice(index + 1, 0, newCourseContent);
    setCourseContentData(newCourseContentData);
  };
  const handleAddSection = () => {
    if (
      !courseContentData[courseContentData.length - 1].title ||
      !courseContentData[courseContentData.length - 1].videoUrl ||
      !courseContentData[courseContentData.length - 1].videoSection ||
      !courseContentData[courseContentData.length - 1].description ||
      !courseContentData[courseContentData.length - 1].links[
        courseContentData[courseContentData.length - 1].links.length - 1
      ].title ||
      !courseContentData[courseContentData.length - 1].links[
        courseContentData[courseContentData.length - 1].links.length - 1
      ].url
    ) {
      return toast.error("Please fill all the empty fields first");
    }
    
    const newCourseContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section, " + (courseContentData.length+1),
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    };
    setCourseContentData([...courseContentData, newCourseContent]);
  };
  const handleDeleteContent = (index: number) => {
    if (courseContentData.length > 1) {
      const newCourseContentData = [...courseContentData];
      newCourseContentData.splice(index, 1);
      setCourseContentData(newCourseContentData);
    }
  };
  const handleDeleteLink = (index: number, LinkIndex: number) => {
    if (courseContentData[index].links.length > 1) {
      const newCourseContentData = [...courseContentData];
      newCourseContentData[index].links.splice(LinkIndex, 1);
      setCourseContentData(newCourseContentData);
    }
  };
  const handleNext = async() => {
  if (
    !courseContentData[courseContentData.length - 1].title ||
    !courseContentData[courseContentData.length - 1].videoUrl ||
    !courseContentData[courseContentData.length - 1].videoSection ||
    !courseContentData[courseContentData.length - 1].description ||
    !courseContentData[courseContentData.length - 1].links[
      courseContentData[courseContentData.length - 1].links.length - 1
    ].title ||
    !courseContentData[courseContentData.length - 1].links[
      courseContentData[courseContentData.length - 1].links.length - 1
    ].url
  ) {
    return toast.error("Please fill all the empty fields first");
  }
    await handleSubmit();
    const newActive = active + 1;
    setActive(newActive);
  };
  const handlePrev = () => {
    const newActive = active - 1;
    setActive(newActive);
  };
  return (
    <div className="w-full">
      {courseContentData.map((item: any, index: number) => {
        const showSectionInput =
          courseContentData[index - 1]?.videoSection !== item?.videoSection;
        return (
          <div
            className={`dark:bg-gray-700 bg-gray-200 p-4 w-full ${
              showSectionInput ? "mt-10" : "mb-0"
            }`}
            key={index}
          >
            {showSectionInput && (
              <div className="flex gap-2 items-center w-full">
                <input
                  className="bg-transparent outline-none max-w-[80%]"
                  value={item.videoSection}
                  onChange={(e) => {
                    handleSectionChange(e, index);
                  }}
                />
                <LiaEdit size={20} />
              </div>
            )}
            <div className="flex justify-between items-center mt-4 w-full">
              <div className="w-full overflow-hidden">
                {isCollapsed[index] && (
                  <p>{index + 1 + " - " + item.title || ""}</p>
                )}
              </div>
              <div className="flex gap-2 w-full justify-end">
                <AiOutlineDelete
                  size={20}
                  className={`dark:text-white text-black ${
                    courseContentData.length > 1
                      ? "cursor-pointer"
                      : "cursor-no-drop"
                  }`}
                  onClick={() => handleDeleteContent(index)}
                />
                <IoIosArrowDown
                  size={20}
                  className={`dark:text-white text-black cursor-pointer transform ${
                    isCollapsed[index] ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => handleCollapes(index)}
                />
              </div>
            </div>
            {!isCollapsed[index] && (
              <div>
                <label className={styles.label}>Video Title</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="basic html part 1"
                  value={item.title}
                  onChange={(e) => {
                    handleTitleChange(e, index);
                  }}
                />
                <label className={styles.label}>Video id or url </label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="ers7e"
                  value={item.videoUrl}
                  onChange={(e) => {
                    handleVideoUrlChange(e, index);
                  }}
                />
                 <label className={styles.label}>Video Length (in minutes)</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="40"
                  value={item.videoLength}
                  onChange={(e) => {
                    handleVideoLengthChange(e, index);
                  }}
                />
                <label className={styles.label}>Video Description</label>
                <textarea
                  className={styles.input}
                  placeholder="this video is about basic html5 ...."
                  value={item.description}
                  onChange={(e) => {
                    handleDescriptionChange(e, index);
                  }}
                />
                <div>
                  {item.links.map((link: any, LinkIndex: number) => {
                    return (
                      <div key={LinkIndex}>
                        <div className="flex gap-3 items-center">
                          <label className={styles.label}>
                            {"link " + (LinkIndex + 1)}
                          </label>
                          <AiOutlineDelete
                            size={15}
                            className={`mt-5 dark:text-white  text-black ${
                              courseContentData[index].links.length > 1
                                ? "cursor-pointer"
                                : "cursor-no-drop"
                            }`}
                            onClick={() => handleDeleteLink(index, LinkIndex)}
                          />
                        </div>
                        <input
                          className={styles.input}
                          type="text"
                          placeholder="title: code source"
                          value={item.links[LinkIndex].title}
                          onChange={(e) => {
                            handleLinkTitleChange(e, index, LinkIndex);
                          }}
                        />
                        <input
                          className={styles.input + " mt-2"}
                          type="text"
                          placeholder="url: github.com/user/app"
                          value={item.links[LinkIndex].url}
                          onChange={(e) => {
                            handleLinkUrlChange(e, index, LinkIndex);
                          }}
                        />
                      </div>
                    );
                  })}
                  <div
                    className="cursor-pointer mt-2 flex gap-2 items-center w-max"
                    onClick={() => handleAddLink(index)}
                  >
                    <MdAddCircle
                      className=" dark:text-white text-gray-500"
                      size={20}
                    />
                    <p>Add link</p>
                  </div>
                </div>
              </div>
            )}

            {item?.videoSection !==
              courseContentData[index + 1]?.videoSection && (
              <div
                className="cursor-pointer mt-10 flex gap-2  items-center w-max"
                onClick={() => handleAddContent(index)}
              >
                <MdAddCircle
                  className="dark:text-white text-gray-500"
                  size={30}
                />
                <p className="text-[20px]">Add New Content</p>
              </div>
            )}
          </div>
        );
      })}
      <div
        className="cursor-pointer mt-5 flex gap-2  items-center w-max"
        onClick={() => handleAddSection()}
      >
        <MdAddCircle className="dark:text-white text-gray-500" size={30} />
        <p className="text-[20px]">Add New Section</p>
      </div>
      <div className="flex mt-5 justify-between gap-2">
        <button
          onClick={handlePrev}
          className="cursor-pointer px-10 py-2 text-[20px] text-white dark:text-black rounded-sm  my-5 bg-[#7F27FF] dark:bg-[#37a39a]"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="cursor-pointer px-10 py-2 text-[20px] text-white dark:text-black rounded-sm  my-5 bg-[#7F27FF] dark:bg-[#37a39a]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
