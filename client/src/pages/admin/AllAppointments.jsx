import React, { useEffect } from 'react'
import { useLazyGetAllAppointmentsQuery } from '../../redux/api/adminApi'
import { toast } from "react-toastify"

const AllAppointments = () => {
    const [getAppointment, { data, isSuccess, isLoading }] = useLazyGetAllAppointmentsQuery()
    if (isLoading) {
        <div>Please wait.... <div class="spinner-border text-primary"></div></div>
    }
    useEffect(() => {
        getAppointment()
    }, [])
    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success("Appointment fetch success")
    //         getAppointment()
    //     }
    // }, [isSuccess])
    return <>

        <div className="container mt-5">
            {
                data && <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Patient Email</th>
                            <th>Patient Mobile</th>
                            <th>Doctor name</th>
                            <th>Doctor email</th>
                            <th>Doctor mobile</th>
                            <th>Doctor Speciality</th>
                            <th>Appointment date</th>
                            <th>Appointment time</th>
                            <th>Appointment Status</th>
                            {/* <th>Doctor IsActive</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.result.map((item, index) => <tr key={index}>
                                <td>{item.patientId.name}</td>
                                <td>{item.patientId.email}</td>
                                <td>{item.patientId.mobile}</td>
                                <td>{item.doctorId.name}</td>
                                <td>{item.doctorId.email}</td>
                                <td>{item.doctorId.phone}</td>
                                <td>{item.doctorId.specialization}</td>
                                <td>{item.date.split("T")[0]}</td>
                                <td>{item.timeSlot}</td>
                                <td>{item.status}</td>
                                {/* <td>{item.doctorId.isActive}</td> */}



                            </tr>)
                        }
                    </tbody>
                </table>
            }
        </div>
    </>
}

export default AllAppointments