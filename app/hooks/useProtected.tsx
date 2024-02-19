import React, { FC } from 'react'
import UserAuth from './userAuth';
import { redirect } from 'next/navigation';
type Props = {
    children: React.ReactNode;
}

const UseProtected:FC<Props> = ({ children }) => {
  const isUserAuth = UserAuth();
  if(isUserAuth) {
    return <> { children } </>
  }
  return redirect("/")
};

export default UseProtected;