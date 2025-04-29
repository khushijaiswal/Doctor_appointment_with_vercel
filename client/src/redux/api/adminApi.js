import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { data } from "react-router-dom"

export const adminApi = createApi({
    reducerPath: "adminApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
        credentials: "include"
    }),
    tagTypes: ["doctor"],
    endpoints: (builder) => {
        return {
            getAllDoctors: builder.query({
                query: () => {
                    return {
                        url: "/showDoctors-admin",
                        method: "GET"
                    }
                },
                providesTags: ['doctor'],
                transformResponse: data => data.result
            }),
            getAllPatients: builder.query({
                query: () => {
                    return {
                        url: "/showPatients-admin",
                        method: "GET"
                    }
                },
                providesTags: ['patient']
            }),
            getAllAppointments: builder.query({
                query: () => {
                    return {
                        url: "/showAppointment-admin",
                        method: "GET"
                    }
                },
            }),

            DoctorBlockUnBlock: builder.mutation({
                query: DoctorId => {
                    return {
                        url: "/blockUnblock-admin-doctor/" + DoctorId._id,
                        method: "PUT",
                        body: DoctorId     //isactive bhejna iss userdata k ander
                    }
                },
                invalidatesTags: ['doctor']
            }),

            PatientBlockUnBlock: builder.mutation({
                query: PatientId => {
                    return {
                        url: "/blockUnblock-admin-patient/" + PatientId._id,
                        method: "PUT",
                        body: PatientId     //isactive bhejna iss userdata k ander
                    }
                },
                invalidatesTags: ['patient']
            }),


        }
    }
})

export const { useGetAllDoctorsQuery, useGetAllAppointmentsQuery, useLazyGetAllPatientsQuery, useLazyGetAllAppointmentsQuery, useDoctorBlockUnBlockMutation, usePatientBlockUnBlockMutation } = adminApi
