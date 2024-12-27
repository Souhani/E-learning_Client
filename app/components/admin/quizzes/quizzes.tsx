import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loader } from '../../Loader/LoadPage';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai';
import { format } from 'timeago.js';
import Table from '@/app/utils/Table';
import { Modal } from '@/app/utils/CustomModel';
import { styles } from '@/app/styles/style';
import toast from 'react-hot-toast';
import { useDeleteQuizMutation, useGetAllAdminQuizzesQuery } from '@/redux/features/quiz/quizApi';


type Props = {}

const AllQuizzes = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [quizId, setQuizId] = useState<string>("");
  const { isLoading, data, refetch:refetchQuizzes} = useGetAllAdminQuizzesQuery({}, {
    refetchOnMountOrArgChange: true
  });
  const [deleteQuiz, {isSuccess:IsQuizDeleted, isLoading:deleting}] = useDeleteQuizMutation({});
  const handleDeleteQuiz = async () => {
    if(!deleting) {
      setOpen(false);
      await deleteQuiz(quizId);;
    }
  };
  useEffect(() => {
    if(IsQuizDeleted) {
       refetchQuizzes();
      toast.success("Quiz deleted successfully");
    }
},[IsQuizDeleted]);

useEffect(() => {
  if(deleting) {
    toast("Deleting...");
  }
},[deleting])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Quiz Title', flex: 0.7 },
    { field: 'created_at', headerName: 'Created At', flex: 0.3 },
    {
      field:"delete",
      headerName:"Delete",
      flex: 0.2,
      renderCell: (params:any) => {
        return(
          <>
            <Button onClick={() => { 
              setOpen(true); 
              setQuizId(params.row.id);
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
    created_at: string;
  }
  const rows: Array<Row> = [];
  data && data.quizzes.forEach((item:any) => {
    rows.push({
      id: item._id,
      title: item.title,
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
                <h1 className={styles.title}>Are you sure you want to delete this quiz?</h1>
                <div className='flex justify-around mt-10'>
                  <button className="px-4 py-2 rounded-lg text-white bg-green-600"
                          onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg text-white bg-red-500"
                          onClick={handleDeleteQuiz}>
                    Delete
                  </button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default AllQuizzes