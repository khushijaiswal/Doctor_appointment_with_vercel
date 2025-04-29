import React from 'react'
import PublicNavbar from './publicNavbar'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
    return <>
        <PublicNavbar />
        <Outlet />
    </>
}

export default PublicLayout