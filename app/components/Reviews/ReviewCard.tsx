import Rating from "@/app/utils/Rating";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  item: any;
};

const ReviewCard: FC<Props> = ({ item }) => {
  return (
    <div className="w-full h-max mt-[40px] pt-[50px] pb-4 dark:bg-slate-700 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur  rounded-xl p-3 shadow-md relative">
      <div className="w-full flex">
        <Image
          src={item.avatar}
          alt=""
          width={80}
          height={80}
          className="absolute top-[-40px] left[10px] shadow-sm border border-gray-500  w-[80px] h-[80px] rounded-full object-cover"
        />
        <div className="800px:flex justify-between w-full hidden">
          <div className="absolute top-[10px] left-[100px] ">
            <Rating rating={item.rating}/>
          </div>
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
        {item.comment}
      </p>
      <div className="pl-5 mt-5">
            <h5 className="font-bold">{item.name}</h5>
            <h6 className="text-[16px] text-gray-700 dark:text-[#ffffffab]">
              {item.profession}
            </h6>
      </div>
    </div>
  );
};

export default ReviewCard;
