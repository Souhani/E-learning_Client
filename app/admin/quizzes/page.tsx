'use client'
import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/adminSidbar/adminSidebar';
import AdminProtected from '../../hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import AdminHeader from '../../components/admin/adminHeader/AdminHeader';
import AllQuizzes from '@/app/components/admin/quizzes/quizzes';
type Props = {}

const Page = (props: Props) => {
    const [selected, setSelected] = useState("Quizzes");
    const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
        <AdminProtected>
        <Heading
                title= {`E-learning Admin`}
                description="E-learing is a platform for students to learn and get help from teachers"
                keywords="Programming, MERN,Redux,Machine learning"
                />
        <div className='w-full flex gap-4'>
                <div className='max-w-[20%] h-screen fixed'>
                  <AdminSidebar selected={selected} setSelected={setSelected} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> 
                </div>
                <div className={`min-h-screen w-full ${ isCollapsed ? "ml-[80px]" : "ml-[250px]"}`}>
                    <AdminHeader  />
                    <div className='w-[90%] m-auto'>
                       <AllQuizzes />
                    </div>
                </div>
        </div>
        </AdminProtected>
    </div>
      )
};

export default Page;