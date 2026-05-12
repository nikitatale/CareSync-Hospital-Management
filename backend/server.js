import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import connectDb from "./config/db.js";

import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 8080;

//middlewares

app.use(cors());
app.use(express.json());
app.use(multer().none());

// routes
app.get("/", (req, res) => res.send("Server is running"));


await connectDb();

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
})