import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usePatientSignoutMutation } from '../../redux/api/authApi'

const PatientNavbar = () => {
    const { patient } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [patientSignOut, { isError, isSuccess, isLoading }] = usePatientSignoutMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success("logout success")
            navigate('/login-patient')

        }
    }, [isSuccess])
    if (isError) {
        toast.error("logout failed")
    }
    return <>
        <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
            <div className="container">
                <Link to="/patient-dashboard" className="navbar-brand bg-red-500">Doctor Booking System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/patient" className="nav-link active">DashBoard</Link>
                        {/* <Link to="/patient/patient-bookappointment" className="nav-link">Book Appointment</Link> */}
                        <Link to="/patient/patient-history" className="nav-link">History</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        Welcome {patient.name}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={patientSignOut} disabled={isLoading}>
                                {isLoading ? "Logging out..." : "Logout"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default PatientNavbar