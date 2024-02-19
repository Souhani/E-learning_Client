import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: "get-admin-orders",
                method: "GET",
                credentials: "include" as const
             })
        }),
        getStripePublishableKey: builder.query({
            query: () => ({
                url: "payment/stripe_publishable_key",
                method: "GET"
             })
        }),
        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: "payment",
                method: "POST",
                body: {
                    amount
                },
                credentials: "include" as const
             })
        }),
        createOrder: builder.mutation({
            query: ({courseId, payment_info}) => ({
                url: "create-order",
                method: "POST",
                body: {
                    courseId,
                    payment_info
                },
                credentials: "include" as const
             })
        }),
    })
});

export const { useGetAllOrdersQuery, useCreateOrderMutation, useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } = ordersApi