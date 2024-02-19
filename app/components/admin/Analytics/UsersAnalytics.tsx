import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Loader } from '../../Loader/LoadPage';
import { useTheme } from 'next-themes';


type Props = {}

const UsersAnalytics = (props: Props) => {
    const { theme } = useTheme();
    const [users, setUsers] = useState([]) as any;
    const {isLoading, data} = useGetUsersAnalyticsQuery(undefined);
    useEffect( ()=> {
        if(data) {
            setUsers(data);
        }
      },[data]);
     return isLoading
        ? <div className='h-[100vh] w-full'>
              <Loader />
          </div>
        : <div className='h-full max-w-[80%] m-auto'>
                <h1 className='font-[500] mb-5'>Users:</h1>
                <div className='text-black h-full w-full'>
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={users?.data?.last12Months}
                        margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke={theme==="dark" ? "#37a39a" : "#9F70FD"} fill={theme==="dark" ? "#37a39a" : "#9F70FD"}/>
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
          </div>
}

export default UsersAnalytics