import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const profileRouter = Router();


authRouter.get("/", protect, getProfile);
authRouter.post("/", protect, updateProfile);


export default profileRouter

