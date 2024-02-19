import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDeleteCourseMutation, useGetAllAdminCoursesQuery } from '@/redux/features/courses/courseApi';
import { Loader } from '../../Loader/LoadPage';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai';
import { format } from 'timeago.js';
import Table from '@/app/utils/Table';
import { Modal } from '@/app/utils/CustomModel';
import { styles } from '@/app/styles/style';
import toast from 'react-hot-toast';
import Link from 'next/link';


type Props = {}

const AllCources = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch:refetchCourses} = useGetAllAdminCoursesQuery({}, {
    refetchOnMountOrArgChange: true
  });
  const [deleteCourse, {isSuccess:IsCourseDeleted, isLoading:deleting}] = useDeleteCourseMutation({});
  const handleDeleteCourse = async () => {
    if(!deleting) {
      setOpen(false);
      await deleteCourse(courseId);;
    }
  };
  useEffect(() => {
    if(IsCourseDeleted) {
      refetchCourses();
      toast.success("Course deleted successfully");
    }
},[IsCourseDeleted]);

useEffect(() => {
  if(deleting) {
    toast("Deleting...");
  }
},[deleting])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.7 },
    { field: 'title', headerName: 'Course Title', flex: 1 },
    { field: 'purchased', headerName: 'Purchased', flex: 0.3 },
    { field: 'ratings', headerName: 'Ratings', flex: 0.2 },
    { field: 'created_at', headerName: 'Created At', flex: 0.3 },
    {
      field:"edit",
      headerName:"Edit",
      flex: 0.2,
      renderCell: (params:any) => {
        return(
          <>
            <Link href={`/admin/edit-course/${params.row.id}`} >
              <FiEdit className="dark:text-white text-black" size={20}/>
            </Link>
          </>
        )
      }
    },
    {
      field:"delete",
      headerName:"Delete",
      flex: 0.2,
      renderCell: (params:any) => {
        return(
          <>
            <Button onClick={() => { 
              setOpen(true); 
              setCourseId(params.row.id);
              }}>
              <AiOutlineDelete className="dark:text-white text-black" size={20}/>
            </Button>
          </>
        )
      }
    }
  ];

  const screenWdith = document.body.clientWidth;
  if(screenWdith<640) {
    columns.splice(0,1);
    columns.splice(1,3);
  }

  type Row = {
    id: string;
    title: string;
    purchased: string;
    ratings: string;
    created_at: string;
  }
  const rows: Array<Row> = [];
  data && data.courses.forEach((item:any) => {
    rows.push({
      id: item._id,
      title: item.name,
      purchased: item.purchased,
      ratings: item.ratings,
      created_at: format(item.createdAt)
    })})
  
  return (
    <div className='w-full'>
      <Table>
      {  isLoading    ?
        <Loader /> : 
        <DataGrid rows={rows} columns={columns}  />
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
                          onClick={handleDeleteCourse}>
                    Delete
                  </button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default AllCources