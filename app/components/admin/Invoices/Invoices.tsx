import { Box, Button } from '@mui/material'
import React, { FC, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { Loader } from '../../Loader/LoadPage';
import { format } from 'timeago.js';
import Table from '@/app/utils/Table';
import { HiOutlineMail } from 'react-icons/hi';


type Props = {
  isDashboard:boolean
}

const Invoices:FC<Props> = ({ isDashboard }) => {
  const { isLoading, data } = useGetAllOrdersQuery(undefined);
  const columns: GridColDef[] = !isDashboard ? [
    { field: 'id', headerName: 'ID', flex: 0.4 },
    { field: 'email', headerName: 'Buyer Email', flex: 0.4 },
    { field: 'course', headerName: 'Course', flex: 0.4 },
    { field: 'price', headerName: 'Price', flex: 0.15 },
    { field: 'date', headerName: 'Date', flex: 0.2 },
    {
      field:"sendEmail",
      headerName:"Send Email",
      flex: 0.15,
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
  ]: [
    { field: 'id', headerName: 'ID', flex: 0.4 },
    { field: 'email', headerName: 'Buyer Email', flex: 0.4 },
  ]
  type Row = {
    id: string;
    email: string;
    course?: string;
    price?: string;
    date?: string;
  }
  const rows: Array<Row> = [];
  const getDashboardTransactions = () => {
    if(data) {
      for (let i = 0; i < 10; i++) {
        if(data.orders[i]) {
         rows.push({
           id: data.orders[i]._id,
           email: data.orders[i].userEmail,
          })
        } else {
         return
        }
     }
    }
  };
  !isDashboard ?
  data && data.orders.forEach((item:any) => {
    rows.push( {
      id: item._id,
      email: item.userEmail,
      course: item.courseName,
      price: `${item.price}$`,
      date: format(item.createdAt)
    })}) : getDashboardTransactions();
  const screenWdith = document.body.clientWidth;
  if(screenWdith<640) {
    columns.splice(0,1);
    columns.splice(1,1);
    columns.pop();
    columns.pop();
  }
  return (
    <div className='w-full'>
        <Table>
        {  isLoading    ?
          <Loader /> : 
          <DataGrid rows={rows} columns={columns}  />
            }
      </Table>
    </div>
  )
}

export default Invoices;