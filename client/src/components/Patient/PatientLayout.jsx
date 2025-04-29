import React from 'react'
import { Outlet } from 'react-router-dom'
import PatientNavbar from './PatientNavbar'

const PatientLayout = () => {
    return <>
        <PatientNavbar />
        <Outlet />
    </>
}

export default PatientLayout