import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { usePatientRegisterMutation } from '../../redux/api/authApi';
// import { handleClasses } from '../../utils/handleClasses';



const Register = () => {
    const [registerPatient, { isSuccess, isLoading }] = usePatientRegisterMutation()
    const navigate = useNavigate()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            address: "",
            password: "",
            city: "",
            // gender: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().required("Enter email"),
            mobile: yup.string().required("Enter mobile"),
            address: yup.string().required("Enter address"),
            password: yup.string().required("Enter address"),
            city: yup.string().required("Enter city"),
            // gender: yup.string().required("Enter gender"),
        }),
        onSubmit: (values, { resetForm }) => {
            registerPatient(values)
            resetForm()
        }
    })

    const handleClasses = key => clsx({
        'form-control my-2': true,
        "is-invalid": formik.touched[key] && formik.errors[key],
        "is-valid": formik.touched[key] && !formik.errors[key],
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("register success")
            navigate('/login-patient')
        }
    }, [isSuccess])

    if (isLoading) {
        return <div>
            <div className="spinner-border text-primary">Please wait...</div>
        </div>
    }
    return <>

        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <div className="card">
                        <div className="card-header text-center">Patient Registration</div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>

                                <input
                                    className={handleClasses('name')}
                                    {...formik.getFieldProps('name')}
                                    type="text"
                                    placeholder='Name' />
                                <span className='invalid-feedback'>{formik.errors.name}</span>
                                <input
                                    className={handleClasses('email')}
                                    {...formik.getFieldProps('email')}
                                    type="email"
                                    placeholder='Email' />
                                <span className='invalid-feedback'>{formik.errors.email}</span>
                                <input
                                    className={handleClasses('mobile')}
                                    {...formik.getFieldProps('mobile')}
                                    placeholder='Mobile no'></input>
                                <span className='invalid-feedback'>{formik.errors.mobile}</span>
                                <input
                                    className={handleClasses('address')}
                                    {...formik.getFieldProps('address')}
                                    placeholder='Address'></input>
                                <span className='invalid-feedback'>{formik.errors.address}</span>
                                <input
                                    className={handleClasses('password')}
                                    {...formik.getFieldProps('password')}
                                    placeholder='Password'
                                    type='password'></input>
                                <span className='invalid-feedback'>{formik.errors.password}</span>
                                <input
                                    className={handleClasses('city')}
                                    {...formik.getFieldProps('city')}
                                    placeholder='City'></input>
                                <span className='invalid-feedback'>{formik.errors.city}</span>


                                {/* <div className="mt-1">
                                    <select
                                        id="gender"
                                        {...formik.getFieldProps('gender')}
                                        className={handleClasses('gender')}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <span className='invalid-feedback'>{formik.errors.gender}</span>


                                </div> */}
                                <button
                                    className='btn btn-primary w-100'
                                    type='submit'>Register</button>
                            </form>
                            <Link className='nav-link text-center p-2' to='/login-patient' >Already have an account? Signin</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    </>
}

export default Register