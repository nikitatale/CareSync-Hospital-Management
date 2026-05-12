import { Router } from "express";
import { createStaff, deleteStaff, getStaff, updateStaff } from "../controllers/StaffController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const staffRouter = Router();

staffRouter.get("/", protect, protectAdmin, getStaff);
staffRouter.post("/", protect, protectAdmin, createStaff);
staffRouter.put("/:id", protect, protectAdmin, updateStaff);
staffRouter.delete("/:id", protect, protectAdmin, deleteStaff);



export default staffRouter;