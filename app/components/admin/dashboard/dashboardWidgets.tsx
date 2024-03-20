import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import OrdersAnalytics from '../Analytics/OrdersAnalytics';
import UsersAnalytics from '../Analytics/UsersAnalytics';
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';


type Props = {}

const DashboardWidgets = (props: Props) => {
  const[ monthOrders, setMonthOrders] = useState<any>("");
  const[ monthOrdersProgress, setMonthOrdersProgress] = useState<number>(0);
  const { data:OrdersData } = useGetOrdersAnalyticsQuery(undefined);
  const[ monthUsers, setMonthUsers] = useState<any>("");
  const[ monthUsersProgress, setMonthUsersProgress] = useState<number>(0);
  const { data:UsersData } = useGetUsersAnalyticsQuery(undefined);
  useEffect( ()=> {
    if(OrdersData) {
      const thisMonthOrders = OrdersData.data?.last12Months[OrdersData.data?.last12Months.length-1].count 
      const lastMonthOrders = OrdersData.data?.last12Months[OrdersData.data?.last12Months.length-2].count 
      setMonthOrders(thisMonthOrders);
      setMonthOrdersProgress(lastMonthOrders !==0 ? (((100*thisMonthOrders)/lastMonthOrders)-100) : 100);
    }
    if(UsersData) {
      const thisMonthUsers = UsersData.data?.last12Months[UsersData.data?.last12Months.length-1].count;
      const lastMonthUsers = UsersData.data?.last12Months[UsersData.data?.last12Months.length-2].count;
      setMonthUsers(thisMonthUsers);
      setMonthUsersProgress(lastMonthUsers !==0 ? ((100*thisMonthUsers)/lastMonthUsers)-100 : 100);
    }
  },[OrdersData, UsersData]);
    const salesProgress = 80;
    const sales = 599;
    const usersProgress = -10;
    const newUsers = 78;
  return (
<div className='h-[80vh] 800px:h-[unset] w-full flex 800px:block items-center justify-center '>
<div className='w-full font-Poppins'>
       <div className='flex items-center w-full justify-center 800px:mb-12 800px:h-[250px] mb-10'>
          <div className='sm:w-[300px] w-[250px] h-[120px] dark:bg-gray-700  bg-gray-200 shadow-sm rounded-lg border-[1px] border-gray-300 dark:border-[0px] p-5 flex justify-between items-center font-Josefin m-2'>
                <div className='text-center text-[18px]'>
                  <h1 className='flex items-center gap-2'><RiMoneyDollarCircleFill size={30} className='dark:text-[#37a39a] text-[#9F70FD]'/> This Month Orders: </h1>
                  <p className='mt-1 '>{monthOrders}</p>
                </div>
                <div className='grid justify-center ml-2'>
                        <div>
                            <CircularProgress 
                                variant='determinate'
                                value={Math.abs(monthOrdersProgress)>100 ? (monthOrdersProgress>0? 100: -100): monthOrdersProgress}
                                size={45}
                                color={monthOrdersProgress && monthOrdersProgress > 0 ? "success" : "error"}
                                thickness={5}/>
                        </div>
                        <p className='mx-auto'>
                            {monthOrdersProgress>0? "+"+monthOrdersProgress.toFixed(0)+"%": monthOrdersProgress.toFixed(0)+"%"}
                        </p>
                </div>
          </div>
          <div className='800px:w-3/4 h-full hidden 800px:block'>
            <OrdersAnalytics />
          </div>
       </div>
       <div className='flex items-center 800px:mb-12 800px:h-[250px] w-full justify-center'>
          <div className='sm:w-[300px] w-[250px] h-[120px] dark:bg-gray-700 bg-gray-200 shadow-sm rounded-lg border-[1px] border-gray-300 dark:border-[0px] p-5 flex justify-between items-center font-Josefin m-2'>
                <div className='text-center text-[18px]'>
                  <h1 className='flex items-center gap-2 '><FaUsers size={30} className='dark:text-[#37a39a] text-[#9F70FD]'/> This Month Users: </h1>
                  <p className='mt-1 '>{monthUsers}</p>
                </div>
                <div className='grid justify-center  ml-2'>
                        <div>
                            <CircularProgress 
                                variant='determinate'
                                value={Math.abs(monthUsersProgress)>100? (monthUsersProgress>0? 100: -100): monthUsersProgress}
                                size={45}
                                color={monthUsersProgress && monthUsersProgress > 0 ? "success" : "error"}
                                thickness={5}/>
                        </div>
                        <p className='mx-auto'>
                            {monthUsersProgress>0? "+"+monthUsersProgress.toFixed(0)+"%": monthUsersProgress.toFixed(0)+"%"}
                        </p>
                </div>
          </div>
          <div className='800px:w-3/4 h-full hidden 800px:block'>
            <UsersAnalytics />
          </div>
       </div>
    </div>
</div>
  )
}

export default DashboardWidgets