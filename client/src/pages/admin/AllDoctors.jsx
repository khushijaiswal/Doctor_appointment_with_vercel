import React, { useEffect } from 'react'
import { useDoctorBlockUnBlockMutation, useGetAllDoctorsQuery } from '../../redux/api/adminApi'
import { toast } from "react-toastify"


const AllDoctors = () => {
    const { data } = useGetAllDoctorsQuery()
    const [adminBlockUser, { isSuccess: blockSuccess }] = useDoctorBlockUnBlockMutation()

    useEffect(() => {
        if (blockSuccess) {
            toast.success("user block success")
        }
    }, [blockSuccess])
    return <>
        <div className='container'>
            <h4 className='m-1'>All Doctor</h4>

            <div >
                {/* {
                    data && data.result.map((item, index) => <div
                        key={index}>
                        <img src={item.profileImage} className='rounded-4' height={300} width={300} alt="" />
                        <div>
                            <p>{item.name}</p>
                            <p>{item.phone}</p>
                            <p>{item.specialization}</p>
                        </div>
                    </div>)
                } */}

                {
                    data && <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Doctor name</th>
                                <th>Doctor email</th>
                                <th>Doctor mobile</th>
                                <th>Doctor Speciality</th>
                                <th>profileImage</th>
                                <th>IsActive?</th>
                                <th>Actions?</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => <tr key={index}
                                    className={`
                                    ${!item.isActive && "table-danger"}
                            `}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.specialization}</td>
                                    <td> <img src={item.profileImage} className='rounded-4' height={150} width={150} alt="" /></td>
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
        </div>
    </>
}

export default AllDoctors