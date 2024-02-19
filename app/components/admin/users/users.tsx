import { Button } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loader } from '../../Loader/LoadPage';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineMail } from "react-icons/hi";
import { format } from 'timeago.js';
import Table from '@/app/utils/Table';
import { Modal } from '@/app/utils/CustomModel';
import { styles } from '@/app/styles/style';
import { useDeleteUserMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';


type Props = {
    isTeamMembers: boolean;
    isLoading: boolean;
    data: any;
    refetchUsres: any;
}

const AllUsers:FC<Props> = ({ isTeamMembers, isLoading, data, refetchUsres}) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [deleteUser,{isSuccess:isUserDeleted, isLoading:deleting}] = useDeleteUserMutation({});

  const handleDeleteUser = async () => {
    if(!deleting) {
      setOpen(false);
      await deleteUser({userId});
    }
  };

  useEffect(() => {
    if(isUserDeleted) {
      refetchUsres();
      toast.success("User deleted successfully");
    }
},[isUserDeleted])

useEffect(() => {
  if(deleting) {
    toast("Deleting...");
  }
},[deleting])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.6 },
    { field: 'name', headerName: 'Name', flex: 0.4 },
    { field: 'email', headerName: 'Email', flex: 0.7 },
    { field: 'role', headerName: 'Role', flex: 0.3 },
    { field: 'created_at', headerName: 'Joined At', flex: 0.3 },
    {
      field:"delete",
      headerName:"Delete",
      flex: 0.2,
      renderCell: (params:any) => {
        return(
          <>
            <Button onClick={() => { 
              setOpen(true); 
              setUserId(params.row.id);
              }}>
              <AiOutlineDelete key={params.row.id} className="dark:text-white text-black" size={20}/>
            </Button>
          </>
        )
      }
    },
    {
        field:"sendEmail",
        headerName:"Send Email",
        flex: 0.2,
        renderCell: (params:any) => {
          return(
            <>
              <Button >
                <a href={`mailto:${params.row?.email}`}>
                  <HiOutlineMail className="dark:text-white text-black" size={20}/>
                </a>
              </Button>
            </>
          )
        }
      }
  ];
  const screenWdith = document.body.clientWidth;
  if(screenWdith<640) {
    columns.splice(0,2);
    columns.splice(1,2);
    columns.pop();
  }
  
  if(!isTeamMembers && screenWdith>640) {
    const purchasedCourcesColumn = { field: 'courses', headerName: 'Purchased Courses', flex: 0.4 };
    columns.splice(4,0, purchasedCourcesColumn)
  };
  type Row = {
    id: string;
    name: string;
    email: string;
    role: string;
    courses: number;
    created_at: string;
  }
  const rows: Array<Row> = [];
  if(isTeamMembers) {
    const teamData:object[] = data && data.users.filter((user:any) => user.role !== "User")
    teamData && teamData.forEach((item:any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt)
        })})
  } else{
    data && data.users.forEach((item:any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt)
        })})
  };
  return (
    <div className='w-full'>
      <Table>
      {  isLoading    ?
        <Loader /> : 
        <DataGrid rows={rows} columns={columns}/>
           }
      </Table>
      <Modal   open={open}
               setOpen={setOpen}>
            <div>
                <h1 className={styles.title}>Are you sure you want to delete this user?</h1>
                <div className='flex justify-around mt-10'>
                  <button className="px-4 py-2 rounded-lg text-white bg-green-600"
                          onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg text-white bg-red-500"
                          onClick={handleDeleteUser}>
                    Delete
                  </button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default AllUsers;