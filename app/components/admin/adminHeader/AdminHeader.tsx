import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketID from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketID(ENDPOINT, { transports: ["websocket"]});

import React, { useEffect, useState } from "react";
import { useGetALlNotificationsQuery, useUpdateNotificationStatusMutation } from "@/redux/features/notifications/notificationsApi";
import { format } from "timeago.js";
import Link from "next/link";
import toast from "react-hot-toast";


type Props = {};

const DashboardHeader = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {data, refetch} = useGetALlNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  const [updatedNotificationStatus, { isSuccess, isLoading }] = useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(new Audio("https://res.cloudinary.com/dqxkzecxp/video/upload/v1706973093/audio/mixkit-positive-notification-951_chhzwp.wav"));
  useEffect(() => {
    socketId.on("newNotification", () => {
      refetch();
      audio.load();
      playNotificationSound();
    })
  },[]);
  const playNotificationSound = () => {
    audio.play();
  };
  useEffect(() => {
    if(data) {
      setNotifications(
        data.notifications.filter((item:any)=> item.status === "unread")
      );
      if(isSuccess) {
        refetch();
      }; 
    }
  },[data, isSuccess]);
  const handleNotificationStatusChange = async (id:string) => {
    if(isLoading) {
      return toast("loading...")
    }
    await updatedNotificationStatus(id);
  }
  return (
   <div>
     <div className='w-full flex justify-end p-4'>
      <div className="flex gap-10">
      <div className=" flex gap-10 text-[20px] font-Poppins font-[500] text-black dark:text-white">
                        <Link href={"/"}
                            >
                                E-learning
                            </Link>
                    </div>
        <ThemeSwitcher />
        <div>
          <div className="relative z-[100]">
            <div
              className="cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <IoMdNotificationsOutline size={30} />
              <div className="bg-[#9F70FD] dark:bg-[#37a39a] p-1 h-[17px] w-[17px] text-white rounded-full text-[11px] flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                <span>{notifications.length}</span>
              </div>
            </div>
            {isOpen && (
              <div className="absolute overflow-auto w-[300px] h-[550px] rounded-sm dark:bg-[#161A30] bg-[#F5F5F5] shadow-md border-gray-300 dark:border-gray-700 border-[1px] top-[105%] right-0">
                <h2 className="text-center font-[600] py-3">Notifications</h2>
                <div className="w-full h-[1px] dark:bg-gray-600 bg-gray-300"></div>
                <div className="">
                 {
                  notifications && notifications.map((item:any) => (
                    <div key={item._id} className="p-2 mb-2 dark:bg-[#202647] bg-[#dfdfdf] border-gray-300 dark:border-gray-600 border-y-[1px]">
                    <div className="flex dark:text-gray-300 text-gray-700">
                      <span className="text-start text-[13px] w-[130%]">
                        {item.title}
                      </span>
                      <span className="text-end text-[13px] w-full cursor-pointer" onClick={ () =>  handleNotificationStatusChange(item._id)}>
                        Mark as read
                      </span>
                    </div>
                    <div className="my-1">
                      <p>
                         {item.message}
                      </p>
                    </div>
                    <span className="text-start text-[11px] dark:text-gray-300 text-gray-700">
                       {format(item.createdAt)}
                    </span>
                  </div>
                  ))
                 }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800 mb-5"></div>

   </div>
  );
};

export default DashboardHeader;
