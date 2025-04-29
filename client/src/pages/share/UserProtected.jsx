import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const UserProtected = ({ compo }) => {
    const { patient } = useSelector(state => state.auth)
    return patient ? compo : <Navigate to='/login-patient' />
}

export default UserProtected