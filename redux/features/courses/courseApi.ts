import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const

            })
        }),
        getAllAdminCourses: builder.query({
            query: () => ({
                url: "get-admin-courses",
                method: "GET",
                credentials: "include" as const
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        }),
        editCourse: builder.mutation({
            query: (data) => ({
                url: `edit-course/${data.id}`,
                method: "PUT",
                body: data.courseData,
                credentials: "include" as const
            })
        }),
        getAllUsersCourses: builder.query({
            query: () => ({
                url: "get-courses",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getCourseById: builder.query({
            query: (id) => ({
                url: `/get-course/${id}`,
                method: "GET"
                })
        }),
        getCourseContentById: builder.query({
            query: (id) => ({
                url: `/get-course-content/${id}`,
                method: "GET",
                credentials: "include" as const
                })
        }),
        addNewQuestion: builder.mutation({
            query: ({ question, courseId, contentId }) => ({
                url: "add-question",
                method: "PUT",
                body: { question, courseId, contentId },
                credentials: "include" as const
            })
        }),
        addNewAnswer: builder.mutation({
            query: ({ answer, courseId, contentId, questionId }) => ({
                url: "add-answer",
                method: "PUT",
                body: { answer, courseId, contentId, questionId},
                credentials: "include" as const
            })
        }),
        addNewReview: builder.mutation({
            query: ({ comment, rating, courseId }) => ({
                url: `add-review/${courseId}`,
                method: "PUT",
                body: { comment, rating },
                credentials: "include" as const
            })
        }),
        addReviewReply: builder.mutation({
            query: ({ replyMessage, reviewId, courseId }) => ({
                url: `reply-review`,
                method: "PUT",
                body: { replyMessage, reviewId, courseId },
                credentials: "include" as const
            })
        }),
    })}
);

export const { useCreateCourseMutation, 
               useGetAllAdminCoursesQuery, 
               useDeleteCourseMutation, 
               useEditCourseMutation, 
               useGetAllUsersCoursesQuery, 
               useGetCourseByIdQuery, 
               useGetCourseContentByIdQuery,
               useAddNewQuestionMutation,
               useAddNewAnswerMutation,
               useAddNewReviewMutation,
               useAddReviewReplyMutation } = courseApi