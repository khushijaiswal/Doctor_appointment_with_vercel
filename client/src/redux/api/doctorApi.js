import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const doctorApi = createApi({
    reducerPath: "doctorApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/doctor`,
        credentials: "include"
    }),
    tagTypes: ["appointment"],
    endpoints: (builder) => {
        return {
            getAppointment: builder.query({
                query: () => {
                    return {
                        url: "/showAppointment-doctor",
                        method: "GET"
                    }
                },
                providesTags: ["appointment"]
            }),
            acceptAppointment: builder.mutation({
                query: (aid) => ({
                    url: `/acceptAppointment-doctor/${aid}`,
                    method: "PUT"
                }),
                invalidatesTags: ["appointment"]
            }),
            updateAppointmentStatus: builder.mutation({
                query: ({ id, status }) => {
                    console.log(id, status);

                    return {
                        url: `/updateAppointmentStatus-doctor/${id}`,
                        method: "PUT",
                        body: { status }
                    }
                },
                invalidatesTags: ["appointment"]
            }),
            declineAppointment: builder.mutation({
                query: (aid) => ({
                    url: `/declineAppointment-doctor/${aid}`,
                    method: "PUT"
                }),
                invalidatesTags: ["appointment"]
            }),

        }


    }
})

export const { useGetAppointmentQuery, useAcceptAppointmentMutation, useDeclineAppointmentMutation, useUpdateAppointmentStatusMutation } = doctorApi
