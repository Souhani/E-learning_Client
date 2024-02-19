'use client'
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { NavItems } from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import {HiOutlineMenuAlt3, HiOutlineUserCircle} from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "./Auth/Login";
import Signup from "./Auth/Singup";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import defaultAvatar from "../../public/assets/avatar.png";
import { useSession } from 'next-auth/react';
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { MdAdminPanelSettings } from "react-icons/md";
import { DefaultProfilePic } from "../utils/defaultProfilePic";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route:string;
    setRoute: (route:string) => void;
}
const Header: FC<Props> = (props) => {
    const { data:session } = useSession();
    const [social,{isSuccess, isError, data, error}] = useSocialAuthMutation()
    const { user } = useSelector((state:any) => state.auth);
    const [active, setActive] = useState(false);
    const [sessionCreated, setSessionCreated] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    if(typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if(window.scrollY>80) {
                setActive(true);
            } else {
                setActive(false);
            };
        });
    };
    const handleCloseSidebar = (event:any):void => {
        if(event.target?.id === "screen") {
            setOpenSidebar(false);
        }
    };
    useEffect(() => {
        if(isSuccess && data) {
            toast.success(data.message || "login successfully")
        };
        if(isError && error) {
            if("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message || "login failed");
            } else {
                toast.error("login failed");
            }
        }
    }, [isSuccess, isError, data, error]);
    useEffect(() => {
        if(initialLoad) {
            setInitialLoad(false);
            return
        };
        if(!user.email) {
            if(session?.user?.email) {
                if(!sessionCreated) {
                    const {name, email, image:avatar} = session.user as any;
                    social({name, email, avatar});
                    setSessionCreated(true);
                }
            }
        };
    },[session])
    
    return(
        <div className="w-full relative">
          <div className={`${
            active
            ? " bg-white dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-[#161625] dark:to-[#10101b] fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] dark:shadow-xl shadow-md transition duration-300"
            : " w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
          }`}>
            <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                <div className="w-full h-[80px] flex items-center justify-between p-3">
                    <div className=" flex sm:gap-10 gap-4 text-[15px] sm:text-[20px] font-Poppins font-[500] text-black dark:text-white">
                        <Link href={"/"}
                            >
                                E-learning
                            </Link>
                            {
              user.role === "Admin" && 
              <Link href={"/admin"}  passHref>
              <span className="flex gap-1 items-center">
                <MdAdminPanelSettings size={25}/>
                  Admin dashboard
              </span>
          </Link>
            }
                    </div>
                    <div className="flex items-center gap-4">
                        <NavItems
                        activeItem={props.activeItem}
                        isMobile = {false}
                        />
                          <ThemeSwitcher />
                        <div className="flex cursor-pointer text-black dark:text-white">
                           {
                            user?.email ?
                            <Link href={"/profile"} className="w-[30px] h-[30px] object-cover overflow-hidden">
                                     { !(user?.avatar?.url)? 
                                           <DefaultProfilePic name={user?.name as string} /> :
                                <Image src={user?.avatar?.url || session?.user?.image || defaultAvatar} 
                                       alt={user.name||"E-learning Profile"} 
                                       width={30} height={30}
                                       className= {`w-full h-full object-cover rounded-full ${props.activeItem === 5 ? "border-[2px] border-[#9F70FD] dark:border-[#6a6af0]" : "border-[unset]"}`}/>
                                }
                            </Link>
                             :
                             <HiOutlineUserCircle 
                             size={30}
                             onClick={() => props.setOpen(true)}/>
                           }
                        </div>
                        <div className=" 800px:hidden cursor-pointer text-black dark:text-white">
                            <HiOutlineMenuAlt3 
                            size={30}
                            onClick={ () => setOpenSidebar(true) }/>
                        </div>
                    </div>
                </div>
            </div>
            {/* for mobile */}
            <div className={`${openSidebar && "fixed z-[999] dark:bg-transparent bg-[#00000024] h-screen w-full right-0 top-0"}`}
                onClick={handleCloseSidebar}
                id="screen">
                <div className={`fixed z-[9999] dark:bg-slate-900 bg-white h-screen w-[70%] right-[-70%] top-0 transform ${openSidebar ? "translate-x-[-100%]": "translate-x-[0%]"} transition-transform duration-[0.5s]`}>
                <div className="pt-5 px-6">
                    <Link href={"/"}
                        className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
                        >
                            E-learning
                    </Link>
                </div>
                    <NavItems
                          session={session}
                           setOpen={props.setOpen}
                            activeItem={props.activeItem}
                            isMobile = {true}
                            />
                    <div className="py-2 px-2 mt-3 text-black dark:text-white text-[12px]">
                        <p>Copyright © 2023 E-learning</p>
                    </div>
                </div>
            </div>
          </div>
          {
            props.route === "login" && props.open && 
            <div>
                <CustomModel
                   open={props.open} 
                   setOpen = {props.setOpen}
                   route={props.route}
                   setRoute={props.setRoute}
                   component= {Login}
                 />
            </div>
          }
          {
             props.route === "signup" && props.open && 
             <div>
                 <CustomModel
                    open={props.open} 
                    setOpen = {props.setOpen}
                    route={props.route}
                    setRoute={props.setRoute}
                    component= {Signup}
                  />
             </div>
          }
           {
             props.route === "verification" && props.open && 
             <div>
                 <CustomModel
                    open={props.open} 
                    setOpen = {props.setOpen}
                    route={props.route}
                    setRoute={props.setRoute}
                    component= {Verification}
                  />
             </div>
          }
        </div>
    )
};

export default Header;