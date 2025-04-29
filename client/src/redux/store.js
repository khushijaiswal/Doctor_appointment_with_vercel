import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authSlice from "./slice/authSlice";
import { adminApi } from "./api/adminApi";
import { patientApi } from "./api/patientApi";
import { publicApi } from "./api/publicApi";
import { doctorApi } from "./api/doctorApi";



const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [publicApi.reducerPath]: publicApi.reducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
        auth: authSlice,
    },
    middleware: def => [...def(),
    authApi.middleware,
    adminApi.middleware,
    patientApi.middleware,
    publicApi.middleware,
    doctorApi.middleware]
})

export default reduxStore