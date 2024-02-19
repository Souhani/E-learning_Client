'use client'
import React, { useState } from 'react';
import AdminProtected from '../../hooks/adminProtected';
import AdminSidebar from '../../components/admin/adminSidbar/adminSidebar';
import Heading from '../../utils/Heading';
import AdminHeader from '../../components/admin/adminHeader/AdminHeader';
import CreateCourse from '../../components/admin/createCourse/createCourse';

type Props = {}

const Page = (props: Props) => {
    const [selected, setSelected] = useState("Create course");
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
                <div className={`min-h-screen w-full ${ isCollapsed ? "ml-[80px]" : "ml-[250px]"}`}>                    <AdminHeader  />
                    <div className='w-[90%] m-auto'>
                       <CreateCourse />
                    </div>
                </div>
        </div>
        </AdminProtected>
    </div>
      )
};

export default Page;
