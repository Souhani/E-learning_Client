import { styles } from '@/app/styles/style';
import { useGetLayoutQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react'
import { Categories } from '../EditCategories/EditCategories';
import toast from 'react-hot-toast';

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo:any) => void;
    setActive: (active:number) => void;
}

const CourseInformation:FC<Props> = ({ courseInfo, setCourseInfo, setActive }) => {
  const [dragging, setDragging] = useState(false);
  const {data} = useGetLayoutQuery("CATEGORIES");
  const [categories, setCategories] = useState<Categories>([]);
  useEffect(() => {
    if(data) {
        setCategories(data?.layout?.categories);
    }
 },[data]);
  const handleThumbnail = (file:any) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
       if(fileReader.readyState === 2) {
          setCourseInfo({...courseInfo, thumbnail:fileReader.result});
       };
    }
  }
  const handleThumbnailInput = (e:any) => {
    handleThumbnail(e.target.files[0])
  }
  const handleDragOver = () => {
    setDragging(true)
  }
  const handleDragLeave = () => {
    setDragging(false)
  }
  const handleDrop = (e:any) => {
    setDragging(false);
    e.preventDefault();
   handleThumbnail( e.dataTransfer.files?.[0]);
     
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(!courseInfo.category) {
      return toast.error("Category is required");
    }
    if(!courseInfo.thumbnail) {
      return toast.error("Thumbnail is required");
    }
    if(!courseInfo.videoPlayer) {
      return toast.error("Video Player is required");
    }
    setActive(1);
  } 

  return (
    <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Course Name
        </label>
        <input className={styles.input} 
                type='text'
                name="name"
                required
                id="name"
                placeholder='Example: Web Developer in 2024'
                value={courseInfo.name}
                onChange={(e) => setCourseInfo({...courseInfo, name: e.target.value})}/>
        <label className={styles.label}>
          Course Description
        </label>
        <textarea 
          className={'min-h-[100px] py-2' + styles.input}
          required
          name="description"
          id="description"
          cols={30}
          rows={8}
          placeholder='Example: Learn to code. Get hired. This is one of the most popular, highly rated coding bootcamps online....'
          value={courseInfo.description}
         onChange={(e) => setCourseInfo({...courseInfo, description: e.target.value})}>
        </textarea>
        <div className='w-full flex gap-10'>
          <div className='w-[50%]'>
            <label className={styles.label}>
              Price
            </label>
            <input className={styles.input} 
                    type='number'
                    name="price"
                    required
                    id="price"
                    placeholder='Example: 89'
                    value={courseInfo.price}
                    onChange={(e) => setCourseInfo({...courseInfo, price: e.target.value})}/>
          </div>
          <div className='w-[50%]'>
            <label className={styles.label}>
              Estimated Price
            </label>
            <input className={styles.input} 
                    type='number'
                    name="estimated price"
                    required
                    id="estimated price"
                    placeholder='Example: 199'
                    value={courseInfo.estimatedPrice}
                    onChange={(e) => setCourseInfo({...courseInfo, estimatedPrice: e.target.value})}/>
          </div>
        </div>
        <div className='w-full flex gap-10'>
           <div className='w-[50%]'>
              <label className={styles.label}>
                  Course Tags
                </label>
                <input className={styles.input} 
                        type='text'
                        name="course tags"
                        required
                        id="course tags"
                        placeholder='Example: HTML, CSS, JavaScript, React, Node.js, Machine Learning...'
                        value={courseInfo.tags}
                        onChange={(e) => setCourseInfo({...courseInfo, tags: e.target.value})}/>
           </div>
           <div className='w-[50%]'>
              <label className={styles.label}>
                  Course Category
                </label>
                <select className={styles.select} 
                        value={courseInfo.category}
                        onChange={(e) => setCourseInfo({...courseInfo, category: e.target.value})}>
                          <option value="">
                             Select Category
                          </option>
                        {
                          categories.map(c => (
                            <option key={c._id} value={c.title}>
                               {c.title}
                            </option>
                          ))
                        }
                </select>
           </div>
        </div>
        <div className='flex w-full gap-10'>
          <div className='w-[50%]'>
          <label className={styles.label}>
                  Video Player
                </label>
                <select className={styles.select} 
                        value={courseInfo.videoPlayer}
                        onChange={(e) => setCourseInfo({...courseInfo, videoPlayer: e.target.value})}>
                          <option value="">
                             Select Video Player
                          </option>
                          <option value="vdocipher">
                              Vdocipher
                           </option>
                </select>
          </div>
          <div className='w-[50%]'>
            <label className={styles.label}>
                Demo Video id or url 
              </label>
              <input className={styles.input} 
                      type='text'
                      name="demo url"
                      required
                      id="Demo Video id or url"
                      placeholder='Example: eer74fd'
                      value={courseInfo.demoUrl}
                      onChange={(e) => setCourseInfo({...courseInfo, demoUrl: e.target.value})}/>
          </div>
        </div>
        <div>
        <div className='flex w-full gap-10'>
        <div className='w-[50%]'>
            <label className={styles.label}>
                Course Level
              </label>
              <input className={styles.input} 
                      type='text'
                      name="course level"
                      required
                      id="course level"
                      placeholder='Example: Beginner, Intermediate, Expert'
                      value={courseInfo.level}
                      onChange={(e) => setCourseInfo({...courseInfo, level: e.target.value})}/>
          </div>
          <div className='w-[50%]'></div>
        </div>
        </div>
        <label className={styles.label}>
                Course Thumbnail
              </label>
        <div 
             className={`relative  max-h-[500px] max-w-[1000px] flex justify-center border-gray-400 border-[1px] ${dragging ? "bg-blue-500" : "dark:bg-gray-900 bg-gray-200"}`}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
             onDrop={handleDrop}>
            <input 
              type='file'
              className='absolute top-0 right-0 bottom-0 left-0 opacity-0 cursor-pointer  '
              accept='image/*'
              name="thumbnail"
              id="thumbnail"
              onChange={(e) => handleThumbnailInput(e)}/>
              {
                courseInfo.thumbnail ? 
                <img src={courseInfo.thumbnail}
                      alt=""
                      className='max-w-full max-h-full object-contain'/>
                :
                <p className='text-center py-10 px-10'>Drag and Drop your thumbnail here or click to browse. 1000 pixels by 500 pixels</p>
              }
        </div>
        <div className='w-full flex justify-end'>
          <input 
            type='submit'
            value="Next"
            className='cursor-pointer px-10 py-2 text-[20px] text-white dark:text-black rounded-sm  my-5 bg-[#7F27FF] dark:bg-[#37a39a]'
            />
        </div>
    </form>
  )
}

export default CourseInformation