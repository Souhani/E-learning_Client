import { useSession } from "next-auth/react";
import { useSelector } from "react-redux"

export default function UserAuth() {
  const {user} = useSelector((state:any) => state.auth);
  const { data:session } = useSession();
  if(user.email || session) {
    return true
  };
  return false;
};