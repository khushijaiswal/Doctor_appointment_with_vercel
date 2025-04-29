import React, { useState, useEffect } from "react";
import { useBookAppointmentMutation, useCancelAppointmentMutation, useGetAppointmentsQuery, useGetDoctorsByIdQuery } from "../../redux/api/patientApi";
import { Badge, Button, Spinner } from "react-bootstrap";
import { data, useParams } from "react-router-dom";
import { format } from "date-fns"

const BookAppointment = () => {
    const [available, setAvailable] = useState([])
    const { id } = useParams();
    const [selectedDay, setSelectedDay] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const { data: doctor, isSuccess } = useGetDoctorsByIdQuery(id, { skip: !id });
    const { data: appointments, isSuccess: isAppointmentSuccess } = useGetAppointmentsQuery();
    const [bookAppointment, { isLoading: bookLoading }] = useBookAppointmentMutation();
    const [cancelAppointment] = useCancelAppointmentMutation();


    const todayDate = new Date().toISOString().split("T")[0];
    const [formData, setFormData] = useState({
        doctorId: "",
        date: todayDate,
        timeSlot: "",
    });
    const [bookedSlots, setBookedSlots] = useState([])
    const [slotBookedDate, setSlotBookedDate] = useState([])

    // Generate time slots dynamically
    const generateTimeSlots = (schedule) => {
        const slotsByDay = {};

        schedule.forEach(({ day, startTime, endTime }) => {
            // sat 12:00 17:00
            let slots = [];
            let [startHour, startMinute] = startTime.split(":").map(Number);
            // console.log(startHour);

            let [endHour, endMinute] = endTime.split(":").map(Number);

            let currentTime = new Date();
            currentTime.setHours(startHour, startMinute, 0);

            let endTimeObj = new Date();
            endTimeObj.setHours(endHour, endMinute, 0);

            while (currentTime < endTimeObj) {
                let hours = currentTime.getHours();
                let minutes = currentTime.getMinutes();
                let period = hours >= 12 ? "PM" : "AM";
                let formattedHours = hours > 12 ? hours - 12 : hours;
                formattedHours = formattedHours === 0 ? 12 : formattedHours;
                let formattedMinutes = minutes === 0 ? "00" : minutes;

                const formattedSlots = `${formattedHours}:${formattedMinutes} ${period}`
                if (!bookedSlots.includes(formattedSlots)) {
                    slots.push(formattedSlots);
                }
                currentTime.setMinutes(currentTime.getMinutes() + 30);
            }


            slotsByDay[day] = slots;
        });

        return slotsByDay;
    };




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTimeSlotSelect = (slot) => {
        setFormData((prev) => ({ ...prev, timeSlot: slot }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.doctorId || !formData.date || !formData.timeSlot) {
            alert("Please fill all fields!");
            return;
        }
        const selectedTimeSlot = formData.timeSlot.trim().toLowerCase();

        const isSlotBooked = appointments?.result.some(
            (appointment) =>
                appointment.doctorId._id === formData.doctorId &&
                appointment.date === formData.date &&
                appointment.timeSlot.trim().toLowerCase() === selectedTimeSlot
        );

        bookAppointment(formData);
        setFormData({ doctorId: doctor?.result?._id || "", date: "", timeSlot: "" });
    };

    const getAvailableTimeSlot = () => {

        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        const d = new Date(formData.date)
        const day = weekdays[d.getDay()]
        const today = day

        const availableSlots = appointments.result.filter(item => {
            const d = new Date(item.date)
            const bookedDay = weekdays[d.getDay()]

            if (bookedDay === today && format(item.date, "dd-MM-yyyy") === format(formData.date, "dd-MM-yyyy")) {
                return item.timeSlot
            }
        }).map(item => item.timeSlot)

        if (availableSlots.length === 0) {
            // console.log("not booked", timeSlots);

            return timeSlots[today]
        } else {
            return timeSlots[today] && timeSlots[today].filter(item => !availableSlots.includes(item))
        }

    }
    useEffect(() => {
        if (isAppointmentSuccess) {
            setAvailable(getAvailableTimeSlot())
        }
    }, [formData])
    useEffect(() => {
        if (isSuccess && doctor?.result) {
            setFormData((prev) => ({ ...prev, doctorId: doctor.result._id }));
            const allSlots = generateTimeSlots(doctor.result.schedule);
            Object.keys(allSlots).forEach((day) => {
                // formdata.date
                allSlots[day] = allSlots[day].filter(slot => !bookedSlots.includes(slot));
                // allSlots[day] = allSlots[day].find(slot => appointments.result);
            });
            // console.log("all slots", allSlots)
            // console.log("booked slots", bookedSlots)
            setTimeSlots(allSlots);
        }
    }, [isSuccess, doctor, bookedSlots]);

    useEffect(() => {
        if (isAppointmentSuccess && appointments?.result) {

            const slots = appointments.result.map(item => item.timeSlot);
            const slotDate = appointments.result.map(item => item.date);

            setBookedSlots(slotDate)

            setTimeout(() => {
                setAvailable(getAvailableTimeSlot)
            }, 0);

        }
    }, [isAppointmentSuccess, appointments, id]);

    useEffect(() => {
        if (formData.date) {
            const selectedDate = new Date(formData.date);
            const dayOfWeek = selectedDate.toLocaleDateString('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' });
            setSelectedDay(dayOfWeek);
        }
    }, [formData.date]);
    return (
        <div className="container">

            {/* <pre>{JSON.stringify(available, null, 2)}</pre> */}
            <h1>Book Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="doctorName">Doctor</label>
                    <input type="text" className="form-control" name="doctorName" value={doctor?.result?.name || ""} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Select Time Slot</label>
                    <div className="d-flex flex-wrap gap-2">
                        {selectedDay && timeSlots[selectedDay] ? (
                            available?.map((slot, index) => (
                                <Badge
                                    key={index}
                                    className={`badge-pill p-2 m-1 ${formData.timeSlot === slot ? "bg-primary" : "bg-secondary"}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleTimeSlotSelect(slot)}
                                >
                                    {slot}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-danger">No slots available for {selectedDay}</p>
                        )}
                    </div>
                </div>

                <Button type="submit" className="btn btn-primary mt-3" disabled={bookLoading}>
                    {bookLoading ? <Spinner animation="border" size="sm" /> : "Book Appointment"}
                </Button>
            </form>

            {appointments && (
                <table className="table table-bordered table-striped table-hover p-2 mt-4">
                    <thead>
                        <tr>
                            <th>Doctor Name</th>
                            <th>Doctor Email</th>
                            <th>Doctor Mobile</th>
                            <th>Doctor Specialization</th>
                            <th>Time Slot</th>
                            <th>Status</th>
                            <th>date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.doctorId.name}</td>
                                <td>{item.doctorId.email}</td>
                                <td>{item.doctorId.phone}</td>
                                <td>{item.doctorId.specialization}</td>
                                <td>{item.timeSlot}</td>
                                <td>{item.status}</td>
                                <td>{item.date.split("T")[0]}</td>
                                <td>
                                    <button onClick={() => cancelAppointment(item._id)} className="btn btn-danger btn-sm">
                                        Cancel Appointment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookAppointment;
