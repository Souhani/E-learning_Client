'use client'
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Loader } from "../../components/Loader/LoadPage";
import Footer from "../../components/Route/Footer";
import Heading from "../../utils/Heading";
import { useGetCourseByIdQuery } from "../../../redux/features/courses/courseApi";
import CourseDetails from "../../components/Course/CourseDetails";
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";

const Page = ({params}: any) => {
  const { id } = params;
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("login");
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const {data, isLoading, refetch:courseRefetch} = useGetCourseByIdQuery(id, {refetchOnMountOrArgChange:true});
  const {data:stripeData} = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation();
  
  useEffect(() => {
    if(stripeData) {
      const { publishableKey } = stripeData;
      setStripePromise(loadStripe(publishableKey));
    }
    if(data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  },[stripeData, data]);

  useEffect(() => {
    if(paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  },[paymentIntentData])
  return (
   <>
     {isLoading ? (
        <div className="w-screen h-screen">
            <Loader />
        </div>
     ) : (
     <div>
        <Heading 
          title={data?.course?.name + " - E-learing"}
          description="E-learing is a platform for students to learn and get help from teachers"
          keywords={data?.course?.tags}
        />
        <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
        />
        {
          stripePromise && (
        <CourseDetails
          course={data?.course}
          stripePromise={stripePromise}
          clientSecret={clientSecret}
          courseRefetch={courseRefetch}
          setOpenLogin = {setOpen}
          openLogin = {open}
         />
          )
        }
        <Footer/>
    </div>
     )}
   </>
  )
};


export default Page;