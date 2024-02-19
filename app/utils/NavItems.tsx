import Link from "next/link";
import { FC } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Image from "next/image";
import { HiOutlineUserCircle } from "react-icons/hi";
import defaultAvatar from "../../public/assets/avatar.png";
import { DefaultProfilePic } from "./defaultProfilePic";

type Props = {
  activeItem: number;
  isMobile: boolean;
  setOpen?: any;
  session?: any;
};
export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];
export const NavItems: FC<Props> = ({
  activeItem,
  isMobile,
  setOpen,
  session,
}) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      {!isMobile && (
        <div className="hidden 800px:flex">
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={i.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "text-[#7F27FF] dark:text-[#6a6af0]"
                      : "text-black dark:text-white"
                  } text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
      {isMobile && (
        <div className="mt-5">
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={i.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "text-[#7F27FF] dark:text-[#6a6af0]"
                      : "text-black dark:text-white"
                  } block text-[18px] py-5 px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
          {user.role === "Admin" && (
            <Link href={"/admin"} passHref>
              <span className="block text-[18px] py-5 px-6 font-Poppins font-[400]">
                <div className="flex gap-1 items-center">
                  <MdAdminPanelSettings size={25} />
                  Admin dashboard
                </div>
              </span>
            </Link>
          )}
          <span className="block text-[18px] py-5 px-6 font-Poppins font-[400] w-min">
            <ThemeSwitcher />
          </span>
          <div className="flex cursor-pointer text-black dark:text-white text-[18px] py-5 px-6 font-Poppins font-[400] ">
            {user?.email ? (
              <Link
                href={"/profile"}
                className="w-[30px] h-[30px] object-cover overflow-hidden"
              >
                  { !(user?.avatar?.url)? 
                                           <DefaultProfilePic name={user?.name as string} /> :
                <Image
                  src={
                    user?.avatar?.url || session?.user?.image || defaultAvatar
                  }
                  alt={user.name || "E-learning Profile"}
                  width={30}
                  height={30}
                  className={`w-full h-full object-cover rounded-full ${
                    activeItem === 5
                      ? "border-[2px] border-[#9F70FD] dark:border-[#6a6af0]"
                      : "border-[unset]"
                  }`}
                />}
              </Link>
            ) : (
              <HiOutlineUserCircle size={30} onClick={() => setOpen(true)} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
