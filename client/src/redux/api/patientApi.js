import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
    reducerPath: "patientApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/patient`,
        credentials: "include",
    }),
    tagTypes: ["Patient", "Doctor", "Appointment"],
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => ({
                url: "/fetchAllDotors-patient",
                method: "GET",
            }),
            providesTags: [{ type: "Doctor", id: "LIST" }],
        }),

        getDoctorsById: builder.query({
            query: (id) => ({
                url: `/fetchDoctorById/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Doctor", id }],
        }),

        getAppointments: builder.query({
            query: () => ({
                url: "/fetchAppointment-patient",
                method: "GET",
            }),
            providesTags: (result) =>
                result?.result
                    ? [
                        ...result.result.map((item) => ({ type: "Appointment", id: item._id })),
                        { type: "Appointment", id: "LIST" },
                    ]
                    : [{ type: "Appointment", id: "LIST" }],
        }),

        getHistoryAppointments: builder.query({
            query: () => ({
                url: "/fetchHistoryAppointment-patient",
                method: "GET",
            }),
            providesTags: [{ type: "Appointment", id: "HISTORY" }],
        }),

        bookAppointment: builder.mutation({
            query: (appointmentData) => ({
                url: "/bookAppointment-patient",
                method: "POST",
                body: appointmentData,
            }),
            invalidatesTags: [{ type: "Appointment", id: "LIST" }],
        }),

        cancelAppointment: builder.mutation({
            query: (id) => ({
                url: "/cancelAppointment-patient/" + id,
                method: "PUT",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Appointment", id },
                { type: "Appointment", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetDoctorsQuery,
    useBookAppointmentMutation,
    useGetAppointmentsQuery,
    useCancelAppointmentMutation,
    useGetDoctorsByIdQuery,
    useGetHistoryAppointmentsQuery,
} = patientApi;
