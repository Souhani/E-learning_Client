import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Loader } from '../../Loader/LoadPage';
import { useTheme } from 'next-themes';

type Props = {}

const CoursesAnalytics = (props: Props) => {
  const { theme } = useTheme();
    const [courses, setCourses] = useState([]) as any;
    const {isLoading, data} = useGetCoursesAnalyticsQuery(undefined);
    useEffect( ()=> {
      if(data) {
        setCourses(data);
      }
    },[data])
     return (isLoading) 
        ? <div className='h-[100vh] w-full'>
              <Loader />
          </div>
        : <div className='h-full max-w-[80%] m-auto'>
                <h1 className='font-[500] mb-5'>Courses:</h1>
                <div className='text-black h-full w-full'>
                  <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                          data={courses?.data?.last12Months}
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
                          <Line type="monotone" dataKey="count" stroke={theme==="dark" ? "#37a39a" : "#9F70FD"} />
                          </LineChart>
                  </ResponsiveContainer>
                </div>
          </div>
}

export default CoursesAnalytics