import React from 'react'
import { Outlet } from 'react-router-dom'
import DoctorNavbar from './DoctorNavbar'

const DoctorLayout = () => {
    return <>
        <DoctorNavbar />
        <Outlet />
    </>
}

export default DoctorLayout