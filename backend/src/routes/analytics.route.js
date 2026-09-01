import express from "express";
import { getAnalytics } from "../controller/analytics.controller.js";

const router = express.Router();

router.get("/", getAnalytics);

export default router;