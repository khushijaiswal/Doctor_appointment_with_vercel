import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
    name: "authSlice",
    // initialState: {},
    initialState: {
        admin: JSON.parse(localStorage.getItem("dbs-admin")),
        patient: JSON.parse(localStorage.getItem("dbs-patient")),
        // user: JSON.parse(localStorage.getItem("dbs-patient")),
        doctor: JSON.parse(localStorage.getItem("dbs-doctor"))
    },
    reducers: {
        invalidate: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.AdminVerifyOtp.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })

        .addMatcher(authApi.endpoints.adminSignout.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
        .addMatcher(authApi.endpoints.PatientLogin.matchFulfilled, (state, { payload }) => {
            state.patient = payload
        })
        .addMatcher(authApi.endpoints.PatientSignout.matchFulfilled, (state, { payload }) => {
            state.patient = null
        })
        .addMatcher(authApi.endpoints.DoctorLogin.matchFulfilled, (state, { payload }) => {
            state.doctor = payload
        })
        .addMatcher(authApi.endpoints.DoctorSignout.matchFulfilled, (state, { payload }) => {
            state.doctor = null
        })

})

export const { invalidate } = authSlice.actions
export default authSlice.reducer