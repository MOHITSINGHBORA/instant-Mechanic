import mongoose from "mongoose";

const mechanicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "Available",
                "Busy",
                "On The Way",
                "Offline",
            ],
            default: "Available",
        },

        jobsCompleted: {
            type: Number,
            default: 0,
        },

        currentBooking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Mechanic = mongoose.model("Mechanic", mechanicSchema);

export default Mechanic;