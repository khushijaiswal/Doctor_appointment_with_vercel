const asyncHandler = require("express-async-handler");
const Doctor = require("../model/Doctor");
const Patient = require("../model/Patient");
const Appointment = require("../model/Appointment");
const redisClient = require("../redisClient");

const CACHE_EXPIRY = 60 * 2; // 2 minutes

// 🔄 Helper to refresh patient's appointments cache
const refreshPatientAppointmentsCache = async (patientId) => {
    const cacheKey = `patient:${patientId}:appointments`;
    const updatedAppointments = await Appointment.find({
        patientId,
        isDeleted: false,
        status: { $in: ["Pending", "Accepted"] }
    }).populate("doctorId", "name email address phone specialization");

    await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(updatedAppointments));
};

// ✅ Fetch all active doctors (cached)
exports.fetchDoctors = asyncHandler(async (req, res) => {
    const cacheKey = "patient:doctors";
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        return res.json({ message: "Doctor fetch success (from cache)", result: JSON.parse(cached) });
    }

    try {
        const result = await Doctor.find({ isActive: true }).select("-password");
        await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(result));
        return res.json({ message: "Doctor fetch success", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

// ✅ Fetch a single doctor by ID (with cache)
exports.fetchDoctorsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cacheKey = `doctor:${id}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
        return res.json({ message: "Doctor fetch success (from cache)", result: JSON.parse(cached) });
    }

    try {
        const result = await Doctor.findById(id).select("-password");

        if (!result) {
            return res.status(404).json({ message: "No doctor found" });
        }

        await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(result));
        return res.json({ message: "Doctor fetch success", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

// ✅ Book an appointment and refresh patient cache
exports.BookAppointment = asyncHandler(async (req, res) => {
    const { doctorId, date, timeSlot } = req.body;
    const patientId = req.loggedInUser;

    const existingAppointment = await Appointment.findOne({ doctorId, date, timeSlot });

    if (existingAppointment) {
        return res.status(400).json({ message: "Slot not available. Please choose another time." });
    }

    const newAppointment = await Appointment.create({ doctorId, patientId, date, timeSlot });

    await refreshPatientAppointmentsCache(patientId);

    return res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
});

// ✅ Cancel appointment and refresh patient cache
exports.cancelAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
        req.params.aid,
        { isDeleted: true },
        { new: true }
    );

    if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
    }

    await refreshPatientAppointmentsCache(appointment.patientId);

    return res.json({ message: "Appointment deleted successfully", result: appointment });
});

// ✅ Fetch upcoming appointments with cache
exports.fetchAppointments = asyncHandler(async (req, res) => {
    const patientId = req.loggedInUser;
    const cacheKey = `patient:${patientId}:appointments`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
        return res.json({ message: "Appointment fetch success (from cache)", result: JSON.parse(cached) });
    }

    const result = await Appointment.find({
        patientId,
        isDeleted: false,
        status: { $in: ["Pending", "Accepted"] }
    }).populate("doctorId", "name email address phone specialization");

    await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(result));

    return res.json({ message: "Appointments fetched successfully", result });
});

// ✅ Fetch completed appointment history (no caching needed)
exports.fetchHistoryAppointments = asyncHandler(async (req, res) => {
    const result = await Appointment.find({
        patientId: req.loggedInUser,
        isDeleted: false,
        status: "Completed"
    }).populate("doctorId", "name email address phone specialization");

    return res.json({ message: "History Appointments fetched successfully", result });
});
