import Booking from "../models/Booking.js";

export const getAllBookings = async ({
    search = "",
    status = "All",
    page = 1,
    limit = 10,
}) => {
    const skip = (page - 1) * limit;

    const filter = {};

    
    if (status !== "All") {
        filter.status = status;
    }

 
    if (search.trim()) {
        filter.$or = [
            {
                bookingId: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                vehicle: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                registrationNumber: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                service: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    const [bookings, totalBookings] = await Promise.all([
        Booking.find(filter)
            .populate("customer", "name")
            .populate("mechanic", "name")
            .sort({ bookingDate: -1 })
            .skip(skip)
            .limit(limit),

        Booking.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalBookings / limit);

    return {
        bookings,
        pagination: {
            currentPage: page,
            totalPages,
            totalBookings,
            limit,
        },
    };
};