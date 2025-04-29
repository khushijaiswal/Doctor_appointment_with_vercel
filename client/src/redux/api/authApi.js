import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        credentials: "include"
    }),
    endpoints: (builder) => {
        return {

            // Admin

            AdminSignin: builder.mutation({
                query: userData => {
                    return {
                        url: "/login-admin",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            AdminVerifyOtp: builder.mutation({
                query: userData => {
                    return {
                        url: "/verify-admin",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("dbs-admin", JSON.stringify(data.result))
                    return data.result
                }
            }),
            adminSignout: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout-admin",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("dbs-admin")
                    return data
                }
            }),


            // Patient
            PatientRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/register-patient",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            PatientLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/login-patient",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("dbs-patient", JSON.stringify(data.result))
                    return data.result
                }
            }),

            PatientSignout: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout-patient",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("dbs-patient")
                    return data
                }
            }),

            // Doctor
            DoctorRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/register-doctor",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            DoctorLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/login-doctor",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("dbs-doctor", JSON.stringify(data.result))
                    return data.result
                }
            }),
            DoctorSignout: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout-doctor",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("dbs-doctor")
                    return data
                }
            }),

        }
    }
})

export const {
    useAdminVerifyOtpMutation,
    useAdminSignoutMutation,
    useAdminSigninMutation,
    usePatientRegisterMutation,
    usePatientLoginMutation,
    usePatientSignoutMutation,
    useDoctorRegisterMutation,
    useDoctorLoginMutation,
    useDoctorSignoutMutation } = authApi
