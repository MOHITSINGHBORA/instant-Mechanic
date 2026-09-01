import Booking from "../models/Booking.js";

export const getAnalyticsService = async () => {
  const bookingsOverTime = await Booking.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$bookingDate",
          },
        },
        bookings: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        bookings: 1,
      },
    },
  ]);

  const revenueOverTime = await Booking.aggregate([
    {
      $match: {
        status: "Completed",
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$bookingDate",
          },
        },
        revenue: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        revenue: 1,
      },
    },
  ]);

  const bookingStatus = await Booking.aggregate([
    {
      $group: {
        _id: "$status",
        value: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        value: 1,
      },
    },
  ]);

  const serviceBreakdown = await Booking.aggregate([
    {
      $group: {
        _id: "$service",
        bookings: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        bookings: -1,
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        bookings: 1,
      },
    },
  ]);

  return {
    bookingsOverTime,
    revenueOverTime,
    bookingStatus,
    serviceBreakdown,
  };
};