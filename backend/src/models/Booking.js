import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        vehicle: {
            type: String,
            required: true,
            trim: true,
        },

        registrationNumber: {
            type: String,
            required: true,
            trim: true,
        },

        service: {
            type: String,
            required: true,
            trim: true,
        },

        mechanic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mechanic",
            default: null,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Assigned",
                "Mechanic On The Way",
                "Completed",
                "Cancelled",
            ],
            default: "Pending",
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        bookingDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;