import { getAllBookings } from "../services/booking.service.js";

export const getBookingsController = async (req, res) => {
    try {
        const {
            search = "",
            status = "All",
            page = 1,
            limit = 10,
        } = req.query;

        const result = await getAllBookings({
            search,
            status,
            page: Number(page),
            limit: Number(limit),
        });

        res.status(200).json({
            success: true,
            data: result.bookings,
            pagination: result.pagination,
        });
    } catch (error) {
        console.error("Get bookings error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
        });
    }
};