import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const DoctorProtected = ({ compo }) => {
    const { doctor } = useSelector(state => state.auth)
    return doctor ? compo : <Navigate to='/login-doctor' />
}

export default DoctorProtected