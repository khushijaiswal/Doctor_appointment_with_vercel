import React, { useEffect } from 'react'
import { useLazyGetAllPatientsQuery, usePatientBlockUnBlockMutation } from '../../redux/api/adminApi'
import { toast } from "react-toastify"

const AllPatients = () => {
    const [getPatients, { data, isSuccess, isLoading }] = useLazyGetAllPatientsQuery()
    const [adminBlockUser, { isSuccess: blockSuccess }] = usePatientBlockUnBlockMutation()


    if (isLoading) {
        <div>Please wait.... <div class="spinner-border text-primary"></div></div>
    }
    useEffect(() => {
        getPatients()
    }, [])
    useEffect(() => {
        if (blockSuccess) {
            toast.success("user block success")
        }
    }, [blockSuccess])
    return <>

        <div className="container mt-5">
            <h4 className='m-1'>All Patients</h4>
            {
                data && <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Patient Email</th>
                            <th>Patient Mobile</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>isActive</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.result.map((item, index) => <tr key={index}
                                className={`
                                ${!item.isActive && "table-danger"}
                        `}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.address}</td>
                                <td>{item.city}</td>
                                <td>{item.isActive.toString()}</td>
                                <td>

                                    {
                                        item.isActive
                                            ? <button
                                                onClick={e => adminBlockUser({ ...item, isActive: false })}
                                                className='btn btn-danger btn-sm'>Block</button>
                                            : <button
                                                onClick={e => adminBlockUser({ ...item, isActive: true })}
                                                className='btn btn-success btn-sm'>unBlock</button>

                                    }

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            }
        </div>
    </>
}

export default AllPatients