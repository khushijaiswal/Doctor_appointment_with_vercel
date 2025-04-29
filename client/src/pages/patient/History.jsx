import React from 'react'
import { useGetHistoryAppointmentsQuery } from '../../redux/api/patientApi'

const History = () => {
    const { data } = useGetHistoryAppointmentsQuery()
    return <div className='container'>

        {data && (
            <table className="table table-bordered table-striped table-hover p-2 mt-4">
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Doctor Email</th>
                        <th>Doctor Mobile</th>
                        <th>Doctor Specialization</th>
                        <th>Time Slot</th>
                        <th>date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.result.map((item, index) => (
                        <tr key={index}>
                            <td>{item.doctorId.name}</td>
                            <td>{item.doctorId.email}</td>
                            <td>{item.doctorId.phone}</td>
                            <td>{item.doctorId.specialization}</td>
                            <td>{item.timeSlot}</td>
                            <td>{item.date.split("T")[0]}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

    </div>
}

export default History