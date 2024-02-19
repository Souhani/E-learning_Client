import {
    PaymentElement,
    LinkAuthenticationElement
  } from '@stripe/react-stripe-js'
  import {FC, useEffect, useState} from 'react'
  import {useStripe, useElements} from '@stripe/react-stripe-js';
import { styles } from '@/app/styles/style';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import socketID from "socket.io-client";
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketID(ENDPOINT, { transports: ["websocket"]});
  
type Props = {
    setOpen: (open:boolean) => void;
    course: any;
}
const CheckoutForm:FC<Props> = ({setOpen, course}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [createOrder, {data:orderData, error}] = useCreateOrderMutation();
    const { isSuccess, refetch } = useLoadUserQuery(undefined,{refetchOnMountOrArgChange:true})
    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setIsLoading(true);
  
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required"
      });
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error) {
        setMessage(error.message || "An unexpected error occured.");
      } else if(paymentIntent && paymentIntent.status === "succeeded") {
        createOrder({
            courseId: course?._id, 
            payment_info: paymentIntent
        });
      }
      setIsLoading(false);
    };
    useEffect(() => {
        if(orderData) {
            refetch();
            if(isSuccess){
              socketId.emit("notification");
              redirect(`/course-access/${course._id}`);
            }
        }
        if(error) {
            if("data" in error) {
                const  errorData = error as any;
                toast.error(errorData.data.message||"An unexpected error occured.");
            }  else {
                toast.error("An unexpected error occured.");
            }
        }
    },[orderData, error, isSuccess])
  
    return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          // options={{defaultValues: {email: 'foo@bar.com'}}}
          />
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit" className={`${styles.submit} !w-max mt-7`}>
          <span id="button-text">
            {isLoading ? "Wait..." : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className='text-[red] font-Poppins mt-5'>{message}</div>}
      </form>
    )
  };

  export default CheckoutForm;