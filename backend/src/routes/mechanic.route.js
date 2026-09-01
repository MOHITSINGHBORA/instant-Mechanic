import express from "express";
import mechanicController from "../controller/mechanic.controller.js";

const router = express.Router();

router.get("/", mechanicController);

export default router;