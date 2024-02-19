"use client"
import React, { FC, useState } from 'react';
import UseProtected from "../hooks/useProtected";
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Profile from '../components/Profile/Profile';
import { useSelector } from 'react-redux';
import Footer from '../components/Route/Footer';

type Props = {
};

const Page:FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("login");
    const { user } = useSelector((state:any) => state.auth)
  return (
    <div>
        <UseProtected>
            <Heading
            title= {`${user.name} profile`}
            description="E-learing is a platform for students to learn and get help from teachers"
            keywords="Programming, MERN,Redux,Machine learning"
            />
            <Header 
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            route={route}
            setRoute={setRoute}
            />
            <Profile user={user}/> 
            <Footer />
        </UseProtected>
    </div>
  )
};

export default Page;