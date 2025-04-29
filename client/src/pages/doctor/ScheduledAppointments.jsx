// import React from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import ListPlugin from '@fullcalendar/list'
// import { useGetAppointmentQuery } from '../../redux/api/doctorApi'

// const ScheduledAppointments = () => {
//     const { data, isLoading, isError } = useGetAppointmentQuery()

//     if (isLoading) return <p>Loading appointments...</p>;
//     if (isError || !data) return <p>Failed to load appointments.</p>;

//     const formatDateTime = (dateStr, timeStr) => {
//         if (!dateStr || !timeStr) return null;

//         const date = new Date(dateStr);  // Convert date string to Date object
//         const [time, modifier] = timeStr.split(' '); // Split time and AM/PM
//         let [hours, minutes] = time.split(':').map(Number); // Extract hours & minutes

//         // Convert to 24-hour format
//         if (modifier === 'PM' && hours !== 12) hours += 12;
//         if (modifier === 'AM' && hours === 12) hours = 0;

//         date.setHours(hours, minutes, 0, 0); // Set time in date object

//         return date.toISOString(); // Convert to ISO format for FullCalendar
//     };

//     return <>
//         <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, ListPlugin]}
//             initialView={"listWeek"}
//             headerToolbar={{
//                 left: 'prev,next today',
//                 center: 'title',
//                 right: 'listWeek dayGridWeek dayGridMonth'
//             }}
//             events=
//             {
//                 data && data.result.map((appointment) => ({
//                     title: `appointment with : ${appointment.patientId.name}`,
//                     // start: new Date(appointment.date).toISOString(),
//                     start: formatDateTime(appointment.date, appointment.timeSlot),
//                     allDay: false

//                     // end: appointment.date,
//                 }))
//             }
//         />

//         <button className='btn btn-success btn-sm'>Accept</button>
//         <button className='btn btn-danger btn-sm'>Decline</button>
//     </>
// }

// export default ScheduledAppointments

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ListPlugin from '@fullcalendar/list';
import { Modal, Button } from 'react-bootstrap';
import {
    useGetAppointmentQuery,
    useAcceptAppointmentMutation,
    useDeclineAppointmentMutation,
    useUpdateAppointmentStatusMutation
} from '../../redux/api/doctorApi';
import { useParams } from 'react-router-dom';

const ScheduledAppointments = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetAppointmentQuery();
    const [acceptAppointment] = useAcceptAppointmentMutation(id);
    const [declineAppointment] = useDeclineAppointmentMutation(id);
    const [updateStatus] = useUpdateAppointmentStatusMutation();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    if (isLoading) return <p>Loading appointments...</p>;
    if (isError || !data) return <p>Failed to load appointments.</p>;

    const formatDateTime = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return null;
        const date = new Date(dateStr);
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        date.setHours(hours, minutes, 0, 0);
        return date.toISOString();
    };

    const handleStatusUpdate = (id, status) => {
        updateStatus({ id, status })
    }
    const handleEventClick = (clickInfo) => {
        const clickedStart = clickInfo.event.start.toISOString(); // Normalize to UTC

        const appointment = data?.result.find((appt) => {
            const formattedDateTime = formatDateTime(appt.date, appt.timeSlot);
            console.log("Comparing:", formattedDateTime, "===", clickedStart);
            return formattedDateTime === clickedStart;
        });
        if (!appointment) {
            console.error("Appointment not found!");
            return;
        }

        setSelectedAppointment(appointment);
        console.log("Selected Appointment:", appointment);

        setShowModal(true);
    };

    const handleAction = async (status) => {
        if (!selectedAppointment) return;

        try {
            if (status === "Accepted") {
                await acceptAppointment(selectedAppointment._id);
            } else {
                await declineAppointment(selectedAppointment._id);
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error updating appointment:", error);
        }
    };
    console.log(selectedAppointment)

    return <>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, ListPlugin]}
            initialView="listWeek"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'listWeek dayGridWeek dayGridMonth'
            }}
            events={data.result.map((appointment) => ({
                title: `Appointment with: ${appointment.patientId.name}`,
                start: formatDateTime(appointment.date, appointment.timeSlot),
                allDay: false
            }))}
            eventClick={handleEventClick}
        />

        {/* Modal for Accept/Decline */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Appointment Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Do you want to accept or decline this appointment?</p>
                <p><strong>Patient:</strong> {selectedAppointment?.patientId.name}</p>
                <p><strong>Date:</strong> {selectedAppointment?.date ? new Date(selectedAppointment.date).toLocaleDateString('en-GB') : ''}</p>
                <p><strong>Time:</strong> {selectedAppointment?.timeSlot}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleStatusUpdate(selectedAppointment._id, "Completed")}>Complete</Button>
                <Button variant="success" onClick={() => handleStatusUpdate(selectedAppointment._id, "Accepted")}>Accept</Button>
                <Button variant="danger" onClick={() => handleStatusUpdate(selectedAppointment._id, "Declined")}>Decline</Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>;
};

export default ScheduledAppointments;

