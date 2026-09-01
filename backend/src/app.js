import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import overviewRoute from "./routes/overview.route.js";
import bookingRoute from "./routes/booking.route.js"
import mechanicRoute from "./routes/mechanic.route.js"
import analyticsRouter from "./routes/analytics.route.js"

const app = express();

console.log("CLIENT_URL:", process.env.CLIENT_URL);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/overview", overviewRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/mechanics", mechanicRoute);
app.use("/api/analytics", analyticsRouter);

export default app;