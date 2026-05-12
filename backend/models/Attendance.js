import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
   staffId: {type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true},
   date: {type: Date, required: true},
   checkIn: {type: Date, default: null},
   CheckOut: {type: Date, default: null},
   status: {type: String, enum: ["PRESENT", "ABSENT", "LATE"], default: "PRESENT"},
   workingHours: {type: Number, default: null},
   dayType: {type: String, enum: ["Full Day", "Three Quarter Day", "Half Day", "Short Day", null], default: null}
}, {timestamps: true});

attendanceSchema.index({staffId: 1, date: 1}, {unique: true})

const Attendance = mongoose.model.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;