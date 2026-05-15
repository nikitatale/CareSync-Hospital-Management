import LeaveApplication from "../models/LeaveApplication.js";
import Staff from "../models/Staff.js";


export const createLeave = async (req, res) => {
    try {
        
        const session = req.session;

        const staff = await Staff.findOne({userId: session.userId})

        if(!staff) return res.status(404).json({error: "Staff not found"});

        if(staff.isDeleted) {
            return res.status(403).json({
                error: "Your account is deactivated. You cannot apply for leave."
            })
        }

        const {type, startDate, endDate, reason} = req.body;

        if(!type || !startDate || !endDate || !reason ){
            return res.status(400).json({error: "Missing fields"});
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        if(new Date(startDate) <= today || new Date(endDate) <= today){
            return res.status(400).json({error: "Leave dates must be in the future"})
        }


         if(new Date(endDate) < new Date(startDate)){
            return res.status(400).json({error: "End date cannot be before start date "})
        }

        const leave = await LeaveApplication.create({
            staffId: staff._id,
            type, 
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            status: "PENDING", 


        })


        return res.json({success: true, data: leave})

    } catch (error) {
        return res.status(500).json({error: "Failed"})
    }
}


export const getLeave = async (req, res) => {
     try {

         const session = req.session;
         const isAdmin = session.role === "ADMIN";

         if(isAdmin){
            const status = req.query.status;
            const where = status ? {status} : {};
            const leaves = await LeaveApplication.find(where).populate("staffId").sort({createdAt: -1})
            const data = leaves.map((l) => {
                const obj = l.toObject();
                return {
                    ...obj,
                    id: obj._id.toString(),
                    staff: obj.staffId,
                    staffId: obj.staffId?._id?.toString(),
                }
            })

            return res.json({data})
         } else {
            const staff = await Staff.findOne({
                staffId: session.staffId,
            }).lean();

            if(!staff) return res.status(404).json({error: "Not Found"})
                const leaves = await LeaveApplication.find({
                    staffId: staff._id
                }).sort({createdAt: -1});

                return res.json({
                    data: leaves,
                    staff: {...staff, id: staff._id.toString()}
                })
         }


        
     } catch (error) {
         return res.status(500).json({error: "Failed"})
     }
}


export const updateLeaveStatus = async (req, res) => {
     try {

        const {status} = req.body;

        if(!["APPROVED", "REJECTED", "PENDING"].includes(status)){
            return res.status(400).json({error: "Invalid Status"})
        }

        const leave = await LeaveApplication.findByIdAndUpdate(req.params.id, {status}, {returnDocument : "after"})
        return res.json({success: true, data: leave})
        
     } catch (error) {
         return res.status(500).json({error: "Failed"})
     }
}