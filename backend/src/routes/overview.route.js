import express from "express";
import { overviewController } from "../controller/overview.controller.js";

const router = express.Router();

router.get("/", overviewController);

export default router;