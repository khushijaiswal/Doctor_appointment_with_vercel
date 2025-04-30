const asyncHandler = require("express-async-handler");
const Appointment = require("../model/Appointment");
const redisClient = require("../redisClient");

const CACHE_EXPIRY = 60 * 5; // 5 minutes

// Helper to update doctor's appointment cache
const refreshDoctorAppointmentsCache = async (doctorId) => {
    const cacheKey = `doctor:${doctorId}:appointments`;
    const updatedAppointments = await Appointment.find({ doctorId })
        .populate("patientId", "name email address mobile");
    await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(updatedAppointments));
};

exports.showAppointmentsToDoctors = asyncHandler(async (req, res) => {
    const doctorId = req.loggedInUser;
    const cacheKey = `doctor:${doctorId}:appointments`;

    try {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            return res.json({
                message: "Appointment fetch success (from cache)",
                result: JSON.parse(cached),
            });
        }

        const result = await Appointment.find({ doctorId })
            .populate("patientId", "name email address mobile");

        if (!result.length) {
            return res.status(404).json({ message: "No appointments found for this doctor" });
        }

        await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(result));
        return res.json({ message: "Appointment fetch success", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

exports.AcceptAppointment = asyncHandler(async (req, res) => {
    try {
        const result = await Appointment.findByIdAndUpdate(
            req.params.aid,
            { status: "Accepted" },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        await refreshDoctorAppointmentsCache(result.doctorId);

        return res.json({ message: "Appointment accepted successfully", result });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

exports.DeclineAppointment = asyncHandler(async (req, res) => {
    try {
        const result = await Appointment.findByIdAndUpdate(
            req.params.aid,
            { status: "Declined" },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        await refreshDoctorAppointmentsCache(result.doctorId);

        return res.json({ message: "Appointment declined successfully", result });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

exports.updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        await refreshDoctorAppointmentsCache(result.doctorId);

        return res.status(200).json({ message: "Appointment status updated successfully", result });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
