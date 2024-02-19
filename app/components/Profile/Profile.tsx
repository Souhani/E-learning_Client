"use client";
import React, { FC, useEffect, useState } from "react";
import ProfileSideBar from "./ProfileSideBar";
import { signOut, useSession } from "next-auth/react";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import MyAccount from "./MyAccount";
import ChangePassword from "./ChangePassword";
import { useGetAllUsersCoursesQuery } from "@/redux/features/courses/courseApi";
import CourseCard from "../Course/CourseCard";
type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(true);
  const { data: session } = useSession();
  const { isSuccess, refetch } = useLogoutQuery(undefined, {
    skip: logout,
    refetchOnMountOrArgChange: true
  });
  const { data, isLoading } = useGetAllUsersCoursesQuery(undefined);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    setCourses(user?.courses?.map((userCourse:any) => data?.allCourses.find((course:any) => course._id === userCourse._id)));
  }, [data]);
  const handleLogout = async () => {
    setLogout(false);
  };
  useEffect(() => {
    if(isSuccess) {
      if (session) {
        signOut();
      }
      setLogout(true);
    }
  },[isSuccess]);

  return (
    <div className="flex w-full my-[80px]">
      <ProfileSideBar
        user={user}
        setActive={setActive}
        active={active}
        handleLogout={handleLogout}
      />
      <div className="w-full flex justify-center">
        {active === 1 && <MyAccount user={user} session={session} />}
        {active === 2 && <ChangePassword user={user} session={session} />}
        {active === 3 && (
          <div className=" mx-10 mt-10 grid grid-cols-1 gap-[10px] lg:grid-cols-2 lg:gap-[20px]  1500px:grid-cols-3 1500px:gap-[30px]  border-0">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard isProfile={true} item={item} key={index} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
