import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import connectDb from "./config/db.js";

import dns from "dns";
import authRouter from "./routes/authRoutes.js";
import staffRouter from "./routes/staffRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 8080;

//middlewares

app.use(cors());
app.use(express.json());
app.use(multer().none());

// routes
app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/auth", authRouter);
app.use("/api/staffs", staffRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);


await connectDb();

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
})