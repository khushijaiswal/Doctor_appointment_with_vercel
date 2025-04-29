import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminSignoutMutation } from '../../redux/api/authApi'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const AdminNavbar = () => {
    const { admin } = useSelector(state => state.auth)
    const [adminSignout, { isError, isSuccess, isLoading }] = useAdminSignoutMutation()
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
                <Link to="/admin-dashboard" className="navbar-brand bg-red-500">Doctor Booking System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/admin" className="nav-link active">DashBoard</Link>
                        <Link to="/admin/admin-allDoctors" className="nav-link">All Doctors</Link>
                        <Link to="/admin/admin-AllPatient" className="nav-link">All Patient</Link>
                        <Link to="/admin/admin-appointments" className="nav-link">Appointment</Link>
                        {/* <Link to="/admin/admin-addDoctor" className="nav-link">Add Doctor</Link> */}
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        Welcome {admin.name}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={adminSignout} disabled={isLoading}>
                                {isLoading ? "Logging out..." : "Logout"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default AdminNavbar