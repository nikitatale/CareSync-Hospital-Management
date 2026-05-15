import Payslip from "../models/PaySlip.js";



export const createPayslip = async(req, res) => {
       try {

          const {staffId, month, year, basicSalary, allowances, deductions} = req.body;

          if(!staffId || !month || !year || !basicSalary){
             return res.status(400).json({error: "Missing fields"})
          }

          const netSalary = Number(basicSalary) + Number
          (allowances || 0) - Number(deductions || 0)

        const payslip = await Payslip.create({
               staffId,
               month: Number(month),
               year: Number(year),
               basicSalary: Number(basicSalary),
               allowances: Number(allowances || 0),
               deductions: Number(deductions || 0),
               netSalary,
        })

        return res.json({success: true, data: payslip})
       } catch (error) {
          return res.status(500).json({error: "Failed"})
       }
}



export const getPayslip = async(req, res) => {
     try {
        
       const session = req.session;
       const isAdmin = session.role === "ADMIN";
       if(isAdmin){
          const payslips = await Payslip.find().populate("staffId").sort({createdAt: -1})
          const data =  payslips.map((p) => {
             const obj = p.toObject();
             return {
                ...obj,
                id: obj._id.toString(),
                staff: obj.staffId,
                staffId: obj.staffId?._id?.toString(),

             }
          })

          return res.json({data});
       }  else {
          const staff = await Staff.findOne({userId: session.userId})
          if(!staff) return res.status(404).json({error: "Not Found"})
            const payslips = await Payslip.find({staffId: staff._id}).sort({createdAt: -1})

          return res.json({data: payslips})
       }

       } catch (error) {
           return res.status(500).json({error: "Failed"})
       }
}


export const getPayslipById = async(req, res) => {
      try {

        const payslip = await Payslip.findById(req.params.id).populate("staffId").lean();

        if(!payslip) return res.status(404).json({error: "Not Found"});

        const result = {
            ...payslip,
            id: payslip._id.toString(),
            staff: payslip.staffId,
        }

        return res.json({result})
        
       } catch (error) {
         return res.status(500).json({error: "Failed"})
       }
}