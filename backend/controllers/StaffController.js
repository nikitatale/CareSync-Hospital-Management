import Staff from "../models/Staff.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";



export const getStaff = async (req, res) => {
    try {
        const {department} = req.query;
        const where = {};
        if(department) where.department = department;

        const staffs = (await Staff.find(where)).toSorted({createdAt: -1}).populate("userId", "email role").lean();

        const result = staffs.map((staff) => ({
            ...staff,
            id: staff._id.toString(),
            user: staff.userId ? {email: staff.userId, role: emp.userId.role} : null
        }))

        return res.json(result);
    } catch (error) {
        return res.status(500).json({error: "Failed to fetch staffs"});
    }
}

export const createStaff = async(req, res) => {
     try {

        const {firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, joinDate, password, role, bio} = req.body;

        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({error: "Missing required fields"})
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashed,
            role: role || "STAFF"
        })

        const staff = await Staff.create({
            userId: user._id,
            fisrtname,
            lastName,
            email,
            phone, 
            position, 
            department: department || "NURSE",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            joinDate: new Date(joinDate),
            bio: bio || ""
        })
        

        return res.status(201).json({success:true, staff: staff})

    } catch (error) {
         if(error.code === 11000){
            return res.status(400).json({error: "Email already exists"});
         }

         console.error("Create staff error", error)
         return res.status(500).json({error: "Failed to create staffs"});
    }
}


export const updateStaff = async(req, res) => {
        try {

            const {id} = req.params;

        const {firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, password, role, bio, staffStatus} = req.body;

       const staff = await Staff.findById(id);

       if(!staff){
        return res.status(404).json({error: "Staff not found"})
       }

        await Staff.findByIdAndUpdate(id, {
            fisrtname,
            lastName,
            email,
            phone, 
            position, 
            department: department || "NURSE",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            staffStatus: staffStatus || "ACTIVE",
            bio: bio || ""
        })
        
        // update user record

        const userUpdate = {email}
        if(role) userUpdate.role = role
        if(password) userUpdate.password = await bcrypt.hash(password, 10)
            await User.findByIdAndUpdate(staff.userId, userUpdate)

        return res.json({success:true})

    } catch (error) {
         if(error.code === 11000){
            return res.status(400).json({error: "Email already exists"});
         }

        
         return res.status(500).json({error: "Failed to update staffs"});
    }
}

export const deleteStaff = async(req, res) => {
     try {

        const {id} = req.params;

        const staff = await Staff.findById(id)
        if(!staff) return res.status(404).json({error: "Staff not found"});

        staff.isDeleted = true;
        staff.staffStatus = "INACTIVE";
        await staff.save();
        return res.json({success: true})
        
    } catch (error) {
         return res.status(500).json({error: "Failed to delete staff"});
    }
}


