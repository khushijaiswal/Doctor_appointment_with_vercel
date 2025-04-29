import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const publicApi = createApi({
    reducerPath: "publicApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/public" }),
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/public`,
        credentials: "include"
    }),
    // tagTypes: ["doctor"],
    endpoints: (builder) => {
        return {
            getAllDoctorPublic: builder.query({
                query: () => {
                    return {
                        url: "/fetchAllDoctors-public",
                        method: "GET"
                    }
                },
                // providesTags: ["doctor"]
            }),


        }
    }
})

export const { useGetAllDoctorPublicQuery } = publicApi
