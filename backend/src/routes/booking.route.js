import express from "express";
import { getBookingsController } from "../controller/booking.controller.js";

const router = express.Router();

router.get("/", getBookingsController);

export default router;