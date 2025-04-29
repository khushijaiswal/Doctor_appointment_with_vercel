import React from 'react'
import { Link } from 'react-router-dom'

const PublicNavbar = () => {
    return <>
        <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
            <div className="container">
                <Link to="/public-dashboard" className="navbar-brand bg-red-500">Doctor Booking System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/public-dashboard" className="nav-link active">DashBoard</Link>
                        <Link to="/login-patient" className="nav-link">Patient Login</Link>
                        <Link to="/register-patient" className="nav-link">Patient Register</Link>
                        <Link to="/register-doctor" className="nav-link">Doctor Register</Link>
                        <Link to="/login-doctor" className="nav-link">Doctor Login</Link>
                        <Link to="/admin-login" className="nav-link">Admin</Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default PublicNavbar