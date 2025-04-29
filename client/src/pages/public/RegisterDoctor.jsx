// import React, { useEffect, useState } from 'react'
// import { useFormik } from 'formik'
// import { clsx } from 'clsx';
// import * as yup from 'yup'
// import { toast } from 'react-toastify';
// import { useDoctorRegisterMutation } from '../../redux/api/authApi';
// import { Button, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const RegisterDoctor = () => {
//     const [registerDoct, { isSuccess, isLoading }] = useDoctorRegisterMutation()
//     const [profileImg, setProfileImg] = useState(false)
//     const [preview, setPreview] = useState()
//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: "",
//             email: "",
//             password: "",
//             specialization: "",
//             phone: "",
//             address: "",
//             profileImage: null,
//             schedule: [{ startTime: "", endTime: "" }],
//         },
//         validationSchema: yup.object({
//             name: yup.string().required("Enter name"),
//             email: yup.string().required("Enter email"),
//             password: yup.string().required("Enter password"),
//             specialization: yup.string().required("Enter specialization"),
//             phone: yup.string().required("Enter phone"),
//             address: yup.string().required("Enter address"),
//             profileImage: yup.mixed().required("Upload profile image"),
//             // schedule: yup.string().required("Enter schedule"),
//             schedule: yup.array().of(
//                 yup.object().shape({
//                     day: yup.string().required("Enter day"),
//                     startTime: yup.string().required("Enter start time"),
//                     endTime: yup.string().required("Enter end time")
//                 })
//             ).min(1, "At least one schedule entry is required"),
//         }),

//         onSubmit: (values, { resetForm }) => {
//             console.log(values)
//             const fd = new FormData();
//             for (const key in values) {
//                 if (key === "schedule") {
//                     fd.append("schedule", JSON.stringify(values.schedule)); // Convert schedule array to JSON
//                 } else if (key !== "profileImage") {
//                     fd.append(key, values[key]);
//                 }
//             }

//             if (values.profileImage) {
//                 fd.append("profileImage", values.profileImage); // Ensure only one file is appended
//             }

//             registerDoct(fd);
//             resetForm();
//         }
//     })
//     const handleClasses = key => clsx({
//         'form-control my-2': true,
//         "is-invalid": formik.touched[key] && formik.errors[key],
//         "is-valid": formik.touched[key] && !formik.errors[key],
//     })
//     useEffect(() => {
//         if (isSuccess) {
//             toast.success("Doctor register success")
//         }
//     }, [isSuccess])
//     return <>

//         <Container>
//             <div className="row">
//                 <div className="col-sm-6 offset-3">
//                     <div className="card">
//                         <div className="card-header text-center">Doctor Registration</div>
//                         <div className="card-body">
//                             <form onSubmit={formik.handleSubmit}>

//                                 <input
//                                     className={handleClasses('name')}
//                                     {...formik.getFieldProps('name')}
//                                     type="text"
//                                     placeholder='name' />
//                                 <span className='invalid-feedback'>{formik.errors.name}</span>
//                                 <input
//                                     className={handleClasses('email')}
//                                     {...formik.getFieldProps('email')}
//                                     type="text"
//                                     placeholder='email' />
//                                 <span className='invalid-feedback'>{formik.errors.email}</span>
//                                 <input
//                                     className={handleClasses('specialization')}
//                                     {...formik.getFieldProps('specialization')}
//                                     type="text"
//                                     placeholder='specialization' />
//                                 <span className='invalid-feedback'>{formik.errors.specialization}</span>

//                                 <input
//                                     className={handleClasses('password')}
//                                     {...formik.getFieldProps('password')}
//                                     placeholder='password'></input>
//                                 <span className='invalid-feedback'>{formik.errors.password}</span>
//                                 <input
//                                     className={handleClasses('phone')}
//                                     {...formik.getFieldProps('phone')}
//                                     placeholder='phone'></input>
//                                 <span className='invalid-feedback'>{formik.errors.phone}</span>
//                                 <input
//                                     className={handleClasses('address')}
//                                     {...formik.getFieldProps('address')}
//                                     placeholder='address'></input>
//                                 <span className='invalid-feedback'>{formik.errors.address}</span>
//                                 {/* <input
//                                     className={handleClasses('schedule')}
//                                     {...formik.getFieldProps('schedule')}
//                                     type='date'
//                                     placeholder='schedule'></input>
//                                 <span className='invalid-feedback'>{formik.errors.schedule}</span> */}

//                                 {/* <input
//                                     className={handleClasses('profileImage')}
//                                     {...formik.getFieldProps('profileImage')}
//                                     type='file'
//                                     placeholder='profileImage'></input>
//                                 <span className='invalid-feedback'>{formik.errors.profileImage}</span> */}


//                                 <input
//                                     className={handleClasses('profileImage')}
//                                     type="file"
//                                     // accept="image/*"
//                                     onChange={e => {
//                                         const file = e.target.files[0]; // Get the first file only
//                                         if (file) {
//                                             setPreview(URL.createObjectURL(file));
//                                             formik.setFieldValue("profileImage", file);
//                                             // setPreview(file)
//                                         }
//                                     }}

//                                 // onChange={(event) => formik.setFieldValue("profileImage", event.target.files[0])}
//                                 />
//                                 {
//                                     preview && <img src={preview} height={50} alt="" />
//                                 }

//                                 <Button
//                                     onClick={() => {
//                                         setProfileImg(false);
//                                         setPreview([]); // Clear preview
//                                         formik.setFieldValue("profileImage", ""); // Reset Formik field
//                                     }}
//                                     className='me-2 my-2 btn-danger btn-sm'
//                                 >Cancel</Button>
//                                 <div>
//                                     <div className='input-group my-2'>
//                                         <strong className='input-group-text'>mon</strong>
//                                         <input placeholder='start time' className='form-control' type="text" />
//                                         <input placeholder='end time' className='form-control' type="text" />
//                                     </div>
//                                     <div className='input-group my-2'>
//                                         <strong className='input-group-text'>tue</strong>
//                                         <input placeholder='start time' className='form-control' type="text" />
//                                         <input placeholder='end time' className='form-control' type="text" />
//                                     </div>
//                                     <div className='input-group my-2'>
//                                         <strong className='input-group-text'>wed</strong>
//                                         <input placeholder='start time' className='form-control' type="text" />
//                                         <input placeholder='end time' className='form-control' type="text" />
//                                     </div>
//                                     <div className='input-group my-2'>
//                                         <strong className='input-group-text'>thu</strong>
//                                         <input placeholder='start time' className='form-control' type="text" />
//                                         <input placeholder='end time' className='form-control' type="text" />
//                                     </div>
//                                     <div className='input-group my-2'>
//                                         <strong className='input-group-text'>fir</strong>
//                                         <input placeholder='start time' className='form-control' type="text" />
//                                         <input placeholder='end time' className='form-control' type="text" />
//                                     </div>
//                                     <div className='input-group my-2'>
//                                         <strong className='input-group-text'>sat</strong>
//                                         <input placeholder='start time' className='form-control' type="text" />
//                                         <input placeholder='end time' className='form-control' type="text" />
//                                     </div>
//                                     <div className='input-group my-2'>
//                                         <strong className='input-group-text'>sun</strong>
//                                         <input placeholder='start time' className='form-control' type="text" />
//                                         <input placeholder='end time' className='form-control' type="text" />
//                                     </div>
//                                 </div>

//                                 <span className="invalid-feedback">{formik.errors.profileImage}</span>
//                                 {/* 
//                                 <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
//                                     {isLoading ? "Registering..." : "Register"}
//                                 </button> */}



//                                 <button
//                                     className='btn btn-primary w-100'
//                                     type='submit'>Register</button>
//                             </form>
//                             <Link className='nav-link text-center p-2' to='/login-patient' >Already have an account? SignIn</Link>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </Container>
//     </>
// }

// export default RegisterDoctor


import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDoctorRegisterMutation } from '../../redux/api/authApi';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterDoctor = () => {
    const [registerDoct, { isSuccess, isLoading }] = useDoctorRegisterMutation();
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(null);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            specialization: "",
            phone: "",
            address: "",
            profileImage: null,
            schedule: [],
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            email: yup.string().required("Enter email"),
            specialization: yup.string().required("Enter specialization"),
            phone: yup.string().required("Enter phone"),
            address: yup.string().required("Enter address"),
            profileImage: yup.mixed().required("Upload profile image"),
            schedule: yup.array().of(
                yup.object().shape({
                    day: yup.string().required("Enter day"),
                    startTime: yup.string().required("Enter start time"),
                    endTime: yup.string().required("Enter end time")
                })
            ).min(1, "At least one schedule entry is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            const fd = new FormData();
            for (const key in values) {
                if (key === "schedule") {
                    fd.append("schedule", JSON.stringify(values.schedule));
                } else if (key !== "profileImage") {
                    fd.append(key, values[key]);
                }
            }
            if (values.profileImage) {
                fd.append("profileImage", values.profileImage);
            }
            registerDoct(fd);
            resetForm();
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Doctor register success");
        }
    }, [isSuccess]);

    const handleAddSchedule = () => {
        formik.setFieldValue("schedule", [...formik.values.schedule, { day: "", startTime: "", endTime: "" }]);
    };

    const handleRemoveSchedule = (index) => {
        const updatedSchedule = formik.values.schedule.filter((_, i) => i !== index);
        formik.setFieldValue("schedule", updatedSchedule);
    };

    return (
        <Container>
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <div className="card">
                        <div className="card-header text-center">Doctor Registration</div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <input className='form-control my-2' {...formik.getFieldProps('name')} type="text" placeholder='Name' />
                                <input className='form-control my-2' {...formik.getFieldProps('email')} type="email" placeholder='Email' />
                                {/* <input className='form-control my-2' {...formik.getFieldProps('password')} type="password" placeholder='Password' /> */}
                                <input className='form-control my-2' {...formik.getFieldProps('specialization')} type="text" placeholder='Specialization' />
                                <input className='form-control my-2' {...formik.getFieldProps('phone')} type="text" placeholder='Phone' />
                                <input className='form-control my-2' {...formik.getFieldProps('address')} type="text" placeholder='Address' />
                                <input className='form-control my-2' type="file" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
                                        formik.setFieldValue("profileImage", file);
                                    }
                                }} />
                                {preview && <img src={preview} height={50} className='my-2' />}

                                <Button
                                    onClick={() => {
                                        setProfileImg(false);
                                        setPreview([]); // Clear preview
                                        formik.setFieldValue("profileImage", ""); // Reset Formik field
                                    }}
                                    className='me-2 my-2 btn-danger btn-sm'
                                >Cancel</Button>
                                <h5>Schedule</h5>
                                {formik.values.schedule.map((slot, index) => (
                                    <div key={index} className='d-flex gap-2 align-items-center my-2'>
                                        <input className='form-control' type="text" placeholder='Day' value={slot.day} onChange={(e) => {
                                            const updatedSchedule = [...formik.values.schedule];
                                            updatedSchedule[index].day = e.target.value;
                                            formik.setFieldValue("schedule", updatedSchedule);
                                        }} />
                                        <input className='form-control' type="time" placeholder='Start Time' value={slot.startTime} onChange={(e) => {
                                            const updatedSchedule = [...formik.values.schedule];
                                            updatedSchedule[index].startTime = e.target.value;
                                            formik.setFieldValue("schedule", updatedSchedule);
                                        }} />
                                        <input className='form-control' type="time" placeholder='End Time' value={slot.endTime} onChange={(e) => {
                                            const updatedSchedule = [...formik.values.schedule];
                                            updatedSchedule[index].endTime = e.target.value;
                                            formik.setFieldValue("schedule", updatedSchedule);
                                        }} />
                                        <Button variant='danger' size='sm' onClick={() => handleRemoveSchedule(index)}>X</Button>
                                    </div>
                                ))}
                                <Button className='btn btn-secondary w-100 my-2' onClick={handleAddSchedule}>Add Schedule</Button>
                                <button className='btn btn-primary w-100' type='submit' disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</button>
                            </form>
                            <Link className='nav-link text-center p-2' to='/login-doctor'>Already have an account? Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default RegisterDoctor;
