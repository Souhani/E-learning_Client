import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createQuiz: builder.mutation({
            query: (data) => ({
                url: "create-quiz",
                method: "POST",
                body: data,
                credentials: "include" as const

            })
        }),
        getAllAdminQuizzes: builder.query({
            query: () => ({
                url: "get-all-quizzes",
                method: "GET",
                credentials: "include" as const
            })
        }),
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `delete-quiz/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        getQuizByCourseId: builder.query({
            query: (id) => ({
              url: `/get-quiz/${id}`,
              method: "GET",
              credentials: "include" as const,
            }),
          }),
    })}
);

export const { useCreateQuizMutation, 
               useGetAllAdminQuizzesQuery, 
               useDeleteQuizMutation,
               useGetQuizByCourseIdQuery
            } = quizApi

        