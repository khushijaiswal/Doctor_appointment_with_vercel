import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as yup from 'yup'
import clsx from 'clsx';
import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom';
import { useDoctorLoginMutation } from '../../redux/api/authApi';
function DoctorLogin() {
    const [loginDoctor, { isSuccess, isError, error, isLoading }] = useDoctorLoginMutation()
    const navigate = useNavigate()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: yup.object({
            userName: yup.string().required("Enter userName"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: (values, { resetForm }) => {
            loginDoctor(values)
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
            toast.success("Login success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (isSuccess) {
            navigate("/doctor/doctor-dashboard")
        }
    }, [isSuccess])
    return (
        <Container>
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <div className="card">
                        <div className="card-header text-center">Doctor Login</div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>

                                <input
                                    className={handleClasses('userName')}
                                    {...formik.getFieldProps('userName')}
                                    type="text"
                                    placeholder='userName' />
                                <span className='invalid-feedback'>{formik.errors.userName}</span>

                                <input
                                    className={handleClasses('password')}
                                    {...formik.getFieldProps('password')}
                                    type='password'
                                    placeholder='Password'></input>
                                <span className='invalid-feedback'>{formik.errors.password}</span>


                                <button
                                    className='btn btn-primary w-100'
                                    type='submit'>Login</button>
                            </form>
                            <Link className='nav-link text-center p-2' to='/register-doctor' >Don't have an account? SignUp</Link>
                        </div>

                    </div>
                </div>
            </div>
        </Container>
    );
}

export default DoctorLogin;