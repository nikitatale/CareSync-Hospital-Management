import { Router } from "express";
import { clockInOut, getAttendance } from "../controllers/attendanceController.js";
import { protect } from "../middleware/auth.js";
import { getDashboard } from "../controllers/dashboardController.js";

const dashboardRouter = Router();


dashboardRouter.get("/", protect, getDashboard);


export default dashboardRouter

