import React, { useEffect, useState } from 'react'
import AllUsers from '../users/users'
import { styles } from '@/app/styles/style'
import { Modal } from '@/app/utils/CustomModel'
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi'
import toast from 'react-hot-toast';

type Props = {}

const TeamMembers = (props: Props) => {
    const { isLoading:isUsersLoading, data:users, refetch:refetchUsres} = useGetAllUsersQuery({},{refetchOnMountOrArgChange:true});
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("Admin");
    const [email, setEmail] = useState("");
    const [updateUserRole, {isLoading, isSuccess, isError, data, error}] = useUpdateUserRoleMutation();
    
    const handleAddMember = async () => {
        if(isLoading) {
          return toast("Loading...");
        }
        const data = {
            email,
            role
        }
         await updateUserRole(data);
    };
    useEffect(() => {
       if(isSuccess && data) {
        refetchUsres();
        toast.success(data.message || "user role updated successfully");
        setOpen(false);
      }
      if(isError && error) {
       if("data" in error) {
           const errorData = error as any
           toast.error(errorData.data?.message || "failed to update user role")
       } else {
           toast.error("failed to update user role")
       }
      }
    }, [isSuccess, data, isError, error]);
  return (
    <div className='w-full'>
        <div className='w-full flex justify-end'>
            <div className='w-[255px]'>
                <button onClick={() => setOpen(true)} className={styles.submit}>
                    Add new member
                </button>
            </div>
        </div>
        <AllUsers isTeamMembers={true} data={users} isLoading={isUsersLoading} refetchUsres={refetchUsres} />
        <Modal open={open}
               setOpen={setOpen}>
            <div>
                <h1 className={styles.title}>Add New Momber</h1>
                <label className={styles.label}>Member Email</label>
                <input placeholder='email'
                       type='email'
                       required
                       className={styles.input}
                       onChange={(e) => setEmail(e.target.value)}
                       />
                <label className={styles.label}>Member Role</label>
                <select className={styles.select}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                    <option value="Admin">
                        Admin
                    </option>
                    <option value="User">
                        User
                    </option>
                </select>
                <button className={styles.submit + " w-full mt-5"}
                        onClick={handleAddMember}>Submit</button>
            </div>
        </Modal>
    </div>
  )
}

export default TeamMembers;