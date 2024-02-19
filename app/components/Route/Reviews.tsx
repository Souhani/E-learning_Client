import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react';
import ReviewCard from "../Reviews/ReviewCard";


type Props = {}

const reviews = [
  {
    name: "Emily White",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    profession: "Software Engineer | Australia",
    comment: "I can't express enough how beneficial the courses on this platform have been for my career. The content is not only relevant but also presented in a way that makes complex topics easy to understand. The practical examples and coding exercises have significantly improved my coding skills. The platform is a goldmine of knowledge for software engineers. Kudos to the team behind this excellent resource!",
    rating: 4
  },
  {
    name: "Ryan Miller",
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
    profession: "Web Developer | Germany",
    comment: "The courses on this platform are a game-changer for web developers. The depth of coverage on various web development technologies is impressive. The interactive nature of the courses, combined with the real-world projects, has greatly accelerated my learning. Whether you're a beginner or an experienced developer, you'll find valuable insights and practical tips that will enhance your skills. Highly recommended!",
    rating: 3
  },
  {
    name: "Olivia Davis",
    avatar: "https://randomuser.me/api/portraits/women/84.jpg",
    profession: "Graphic Designer | France",
    comment: "I've been searching for a platform that caters to the specific needs of graphic designers, and I finally found it here. The courses are not only informative but also tailored to the latest design trends. The instructors are industry experts who share their insights and experiences. The design projects and portfolio-building exercises are invaluable for honing practical skills. A must-visit platform for graphic designers!",
    rating: 5
  },
  {
    name: "Matthew Wilson",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    profession: "Cybersecurity Analyst | Japan",
    comment: "I am thoroughly impressed with the cybersecurity courses on this platform. The content is not only up-to-date but also covers a wide range of topics within the field. The hands-on labs and simulations provided a practical understanding of various cybersecurity concepts. Whether you're a beginner looking to enter the field or an experienced professional seeking to enhance your skills, this platform is a valuable resource. Two thumbs up!",
    rating: 4
  }
];



const Reviews = (props: Props) => {
  return (
    <div className='w-[90%] 800px:w-[80%] m-auto mt-10'>
        <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:leading-[60px] text-black font-[700] tracking-tight'>
           What Our Students Are<br/> Saying About Us:
        </h1>
        <br />
        <br/>
      <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[30px]  1500px:grid-cols-2 1500px:gap-[35px] mb-12 border-0'>
          {
            reviews && reviews.map((i,index) => <ReviewCard item={i} key={index} />)
          }
      </div>
    </div>
  )
};

export default Reviews;