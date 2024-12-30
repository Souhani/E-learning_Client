import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

type Props = {
    children: React.ReactNode;
    id: string;
}

const CourseProtected = (props: Props) => {
    const id = props.id;
    const { user } = useSelector((state:any) => state.auth);
    // CHANGE IS PURCHASED FOR DEMO
        const isPurchased = true;
    // const isPurchased = user && user?.courses?.find((item:any) => item._id === id);
    if(isPurchased || user.role === "Admin") {
        return ( <> { props.children } </> );
    } else {
        return redirect("/");
    };
};

export default CourseProtected;