import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLayout: builder.query({
            query: (type) => ({
                url: `get-layout/${type}`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        updateLayout: builder.mutation({
            query: (data) => ({
                url: "edit-layout",
                method: "PUT",
                body: data,
                credentials: "include" as const
            })
        })
    }),
});

export const { useGetLayoutQuery, useUpdateLayoutMutation } = layoutApi;