import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDoctorSignoutMutation } from '../../redux/api/authApi'

const DoctorNavbar = () => {

    const { doctor } = useSelector(state => state.auth)
    const [doctorSignout, { isError, isSuccess, isLoading }] = useDoctorSignoutMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success("logout success")
        }
    }, [isSuccess])
    if (isError) {
        toast.error("logout failed")
    }
    return <>
        <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/doctor/doctor-dashboard" className="nav-link active">Dashboard</Link>
                        <Link to="/doctor/doctor-appointments" className="nav-link active">Appointments</Link>
                        <Link to="/doctor/doctor-profile" className="nav-link">Profile</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        Welcome {doctor.name}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={doctorSignout} disabled={isLoading}>
                                {isLoading ? "Logging out..." : "Logout"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default DoctorNavbar


