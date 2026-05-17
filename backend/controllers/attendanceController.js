import { inngest } from "../inngest/index.js";
import Attendance from "../models/Attendance.js";
import Staff from "../models/Staff.js";


export const clockInOut = async(req, res) => {
    try {
        
        const session = req.session;
        const staff = await Staff.findOne({userId: session.userId})

        if(!staff) return res.status(404).json({error: "Staff not found"});

        if(staff.isDeleted) return res.status(403).json({
            error: "Your account is deactivated. You cannot clock in/out"
        })

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existing = await Attendance.findOne({
            staffId: staff._id,
            date: today
        })

        const now = new Date();

        if(!existing){
            const isLate = now.getHours() >= 9 && now.getMinutes() > 0;

            const attendance = await Attendance.create({
                staffId: staff._id,
                date: today,
                checkIn: now,
                status: isLate ? "LATE" : "PRESENT"
            })

            await inngest.send({
                name: "staff/check-out",
                data: {
                    staffId: staff._id,
                    attendanceId: attendance._id,
                }
            })

             return res.json({success: true, type: "CHECK_IN", data: attendance});

        } else if(!existing.checkOut){
            const checkInTime = new Date(existing.checkIn).getTime()
            const diffMs = now.getTime() - checkInTime;
            const diffHours = diffMs / (1000 * 60 * 60)

            existing.checkOut = now;

            const workingHours = parseFloat(diffHours.toFixed(2))
            let dayType = "Half Day";
            if(workingHours >= 8) dayType = "Full Day";
            else if(workingHours >= 6) dayType = "Three Quarter Day";
            else if(workingHours >= 4) dayType = "Half Day";
            else dayType = "Short Day"


            existing.workingHours = workingHours;
            existing.dayType = dayType;

            await existing.save();

            return res.json({success: true, type: "CHECK_OUT", data: existing});
        } else {
            return res.json({success: true, type: "CHECK_OUT", data: existing});
        }

    } catch (error) {
        console.error("Attendance error", error);
        return res.status(500).json({error: "Operation Failed"})
    }
}



export const getAttendance = async(req, res) => {
     try {
        
        const session = req.session;
        const staff = await Staff.findOne({userId: session.userId})

        if(!staff) return res.status(404).json({error: "Staff not found"})

        const limit = parseInt(req.query.limit || 30);   
        const history = await Attendance.find({staffId: staff._id}).sort({date: -1}).limit(limit); 


         return res.json({data: history, staff: {isDeleted: staff.isDeleted}})

     } catch (error) {
        return res.status(500).json({error: "Failed to fetch attendance"})
     }

}
