import { DEPARTMENTS } from "../constants/departments.js";
import Attendance from "../models/Attendance.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Payslip from "../models/PaySlip.js";
import Staff from "../models/Staff.js";



export const getDashboard = async(req, res) => {
    try {

        const session = req.session;
        if(session.role === "ADMIN"){
           
            const [totalStaff, todayAttendance, pendingLeaves] = await Promise.all([Staff.countDocuments({isDeleted: {$ne: true}}),
                Attendance.countDocuments({
                    date: {
                        $gte: new Date(new Date().setHours(0,0,0,0)),
                        $lt: new Date(new Date().setHours(24, 0, 0, 0)) 
                    }
                }),

                LeaveApplication.countDocuments({status: "PENDING"})

            ])

            return res.json({role: "ADMIN", totalStaff, totalDepartments: DEPARTMENTS.length,
                todayAttendance, pendingLeaves
            })
        
        } else{
              const staff = await Staff.findOne({
                userId: session.userId,
              }).lean();

              if(!staff) return res.status(404).json({error: "Staff not found"});

              const today = new Date();

              const[currentMonthAttendance, pendingLeaves, latestPayslip] = await Promise.all([
                Attendance.countDocuments({
                    staffId: staff._id,
                    date: {
                        $gte: new Date(today.getFullYear(), today.getMonth(), 1),
                        $lt: new Date(today.getFullYear(), today.getMonth(), + 1, 1) 
                    }
                }),

                LeaveApplication.countDocuments({
                    staffId: staff._id,
                    status: "PENDING",
                }),

                Payslip.findOne({staffId: staff._id}).sort({
                    createdAt: -1
                }).lean(),
              ])

              return res.json({
                role: "STAFF",
                staff: {...staff, id: staff._id.toString()},
                currentMonthAttendance,
                pendingLeaves,
                latestPayslip: latestPayslip ? {...latestPayslip, id: latestPayslip._id.toString()} : null
              })
        }
        
    } catch (error) {
        console.error("Dashboard error: " , error);
        return res.status(500).json({error: "Failed"});
    }
}