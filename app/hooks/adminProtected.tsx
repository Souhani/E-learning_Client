'use client'
import { redirect } from 'next/navigation';
import React, { FC } from 'react'
import { useSelector } from 'react-redux';

type Props = {
    children: React.ReactNode;
}
const AdminProtected:FC<Props> = ({ children }) => {
    const { user } = useSelector((state:any) => state.auth);
    const isAdmin = user.role === "Admin";
    if(isAdmin) {
      return <> { children } </> 
    }
  return redirect("/");
};

export default AdminProtected;