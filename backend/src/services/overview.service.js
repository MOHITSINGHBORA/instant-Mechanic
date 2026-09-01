import Booking from "../models/Booking.js";
import Mechanic from "../models/Mechanic.js";
import Customer from "../models/Customer.js";

const getOverview = async () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [
        totalBookings,
        todaysBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue,
        activeMechanics,
        newCustomers,
    ] = await Promise.all([
        Booking.countDocuments(),

        Booking.countDocuments({
            bookingDate: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }),

        Booking.countDocuments({
            status: "Completed",
        }),

        Booking.countDocuments({
            status: "Pending",
        }),

        Booking.countDocuments({
            status: "Cancelled",
        }),

        Booking.aggregate([
            {
                $match: {
                    status: "Completed",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]),

        Mechanic.countDocuments({
            status: {
                $in: ["Available", "Busy", "On The Way"],
            },
        }),

        Customer.countDocuments({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }),
    ]);

    return {
        totalBookings,
        todaysBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        activeMechanics,
        newCustomers,
    };
};

export default getOverview;