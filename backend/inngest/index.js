

import {cron, Inngest, step} from "inngest";
import Attendance from "../models/Attendance.js";
import Staff from "../models/Staff.js";
import LeaveApplication from "../models/LeaveApplication.js";
import sendEmail from "../config/nodemailer.js";



export const inngest = new Inngest({id: "caresync"});


const autoCheckOut = inngest.createFunction(
    {id: "auto-check-out", triggers: [{event: "staff/check-out"}]},
    async ({event, step}) => {
        const {staffId, attendanceId} = event.data;

        await step.sleepUntil("wait-for-the-9-hours", new Date(new Date().getTime() + 9 * 60 * 60 * 1000))

        let attendance = await Attendance.findById(attendanceId)

        if(!attendance?.checkOut){
            const staff = await Staff.findById(staffId);

            await sendEmail({
                to: staff.email,
                subject: "Attendance Check Out Remainder",
                body: ` <div style="max-width: 600px;">
                    <h2>Hi ${staff.firstName}, 👋</h2>
                    <p style="font-size: 16px;">You have a check-in in ${staff.department} today:</p>
                    <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${attendance?.checkIn?.toLocaleTimeString()}</p>
                    <p style="font-size: 16px;">Please make sure to check-out in one hour.</p>
                    <p style="font-size: 16px;">If you have any questions, please contact your admin.</p>
                    <br />
                    <p style="font-size: 16px;">Best Regards,</p>
                    <p style="font-size: 16px;">CareSync</p>
                </div>`
            })

            await step.sleepUntil("wait-for-the-1-hour", new Date(new Date().getTime() + 1 * 60 * 60 * 1000))

            attendance = await Attendance.findById(attendanceId)
            if(!attendance?.checkOut){
                attendance.checkOut = new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000;
                attendance.workingHours = 4;
                attendance.dayType = "Half Day";
                attendance.status = "LATE";
                await attendance.save();
            }
        }
    }
)

const leaveApplicationRemainder  = inngest.createFunction(
    {id: "leave-application-remainder", triggers: [{event: "leave/pending"}]},
    async({event, step}) => {
        const { leaveApplicationId  } = event.data;

        await step.sleepUntil("wait-for-the-24-hours", new Date(new Date().getTime() + 24 * 60 * 60 * 1000))

        const leaveApplication = await LeaveApplication.findById(leaveApplicationId)

        if(leaveApplication?.status === "PENDING"){
            const staff = await Staff.findById(leaveApplication.staffId)

            await sendEmail({
                to:process.env.ADMIN_EMAIL,
                subject: `Leave Application Remainder`,
                body: `<div style="max-width: 600px;">
                <h2>Hi Admin, 👋</h2>
                <p style="font-size: 16px;">You have a leave application in ${staff.department} today:</p>
                <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${leaveApplication?.startDate?.toLocaleDateString()}</p>
                <p style="font-size: 16px;">Please make sure to take action on this leave application.</p>
                <br />
                <p style="font-size: 16px;">Best Regards,</p>
                <p style="font-size: 16px;">CareSync</p>
            </div>`
            })

        }


    }
)



const attendanceRemainderCron  = inngest.createFunction(
    {id: "attendance-remainder-cron", triggers: [{cron: "TZ=Asia/Kolkata 30 11 * * *"}]},
    async({step}) => {
     const today = await step.run("get-today-date", () => {
        const startUTC =  new Date(new Date().toLocaleDateString("en-CA", {timeZone: "Asia/Kolkata"}) + "T00:00:00+05:30");
        const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);
        return {startUTC: startUTC.toISOString(), endUTC:endUTC.toISOString()}
     })
 
     const activeStaffs = await step.run("get-active-staffs", async() => {
        const staffs = await Staff.find({isDeleted: false, employmentStatus: "ACTIVE"}).lean();

        return staffs.map((s) => ({_id: s._id.toString(), firstName: s.firstName, lastName: e.lastName, email: e.email, department: e.department}))
        
     })


     const onLeaveIds = await step.run("get-on-leave-ids", async() => {
        const leaves = await LeaveApplication.find({
            status: "APPROVED",
            startDate: {$lte: new Date(today.endUTC)},
            endDate: {$gte: new Date(today.startUTC)}
        }).lean();

        return leaves.map((l) => l.staffId.toString())
     })

     const checkedInIds = await step.run("get-checked-in-ids", async() => {
        const attendances = await Attendance.find({
            date: {$gte: new Date(today.startUTC), $lt: new Date(today.endUTC)},
        }).lean();

        return attendances.map((a) => a.staffId.toString())
     })


     const absentStaffs = activeStaffs.filter((staff) => !onLeaveIds.includes(staff._id) && !checkedInIds.includes(staff._id))


     if(absentStaffs.length > 0){
        await step.run("send-remainder-emails", async() => {
            const emailPromises = absentStaffs.map((staff) => {
                sendEmail({
                to: staff.email,
                subject: "Attendance Remainder - Please Mark Your Attendance",
                body: `
                 <div style="max-width: 600px; font-family: Arial, sans-serif;">
                                <h2>Hi ${staff.firstName}, 👋</h2>
                                <p style="font-size: 16px;">We noticed you haven't marked your attendance yet today.</p>
                                <p style="font-size: 16px;">The deadline was <strong>11:30 AM</strong> and your attendance is still missing.</p>
                                <p style="font-size: 16px;">Please check in as soon as possible or contact your admin if you're facing any issues.</p>
                                <br />
                                <p style="font-size: 14px; color: #666;">Department: ${staff.department}</p>
                                <br />
                                <p style="font-size: 16px;">Best Regards,</p>
                                <p style="font-size: 16px;"><strong>CareSync</strong></p>
                            </div>
                `
               })
            })

             await Promise.all(emailPromises)
             return {emailSent: absentStaffs.length}
        })
     }

    
     return {totalActive: activeStaffs.length, onLeave: onLeaveIds.length, checkedIn: checkedInIds.length, absent: absentStaffs.length}

    }
)




export const functions = [autoCheckOut, leaveApplicationRemainder, attendanceRemainderCron];



