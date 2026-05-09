import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { dummyPayslipData } from "../assets/assets"
import Loading from "../components/Loading"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { PrinterIcon } from "lucide-react"

const PrintPayslip = () => {
  const { id } = useParams()
  const [paySlip, setPaySlip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPaySlip(dummyPayslipData.find((slip) => slip._id === id))
    setTimeout(() => setLoading(false), 1000)
  }, [id])

  if (loading) return <Loading/>

  if (!paySlip) return (
    <div className="min-h-screen bg-[#f4f7f5] flex items-center justify-center">
      <p className="text-slate-400 text-sm">
        Payslip not found — it may have been removed or the link is invalid.
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f4f7f5] py-8 px-4 print:bg-white print:py-0">
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 print:shadow-none print:rounded-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}>

      
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#e2ede8]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(93,202,165,0.12)", border: "1px solid rgba(93,202,165,0.2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#0d6b52" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M12 12v5M12 12l4-2.5M12 12l-4-2.5" stroke="#5dcaa5" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[#0a2e24] text-sm tracking-wide">CareSync</p>
              <p className="text-[10px] text-slate-400 font-medium">Hospital Management</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Pay Period</p>
            <p className="font-semibold text-[#0a2e24] text-sm">
              {format(new Date(paySlip.year, paySlip.month - 1), "MMMM yyyy")}
            </p>
          </div>
        </div>

       
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[3px] h-5 rounded-sm bg-[#0d6b52]"/>
            <h1 className="text-lg font-bold text-[#0a2e24] tracking-tight">Salary Statement</h1>
          </div>
          <p className="text-xs text-slate-400 ml-[11px]">
            Official payslip issued for {format(new Date(paySlip.year, paySlip.month - 1), "MMMM yyyy")}
          </p>
        </div>

   
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-[#f4f7f5] border border-[#e2ede8]">
          {[
            { label: "Staff Name", value: `${paySlip.staff?.firstName} ${paySlip.staff?.lastName}` },
            { label: "Role",       value: paySlip.staff?.position },
            { label: "Work Email", value: paySlip.staff?.email },
            { label: "Pay Period", value: format(new Date(paySlip.year, paySlip.month - 1), "MMMM yyyy") },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
              <p className="font-semibold text-[#0a2e24] text-sm">{item.value}</p>
            </div>
          ))}
        </div>

       
        <div className="rounded-xl border border-[#e2ede8] overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f4f7f5]">
                <th className="text-left py-3 px-5 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Description
                </th>
                <th className="text-right py-3 px-5 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#e2ede8]">
                <td className="py-3 px-5 text-slate-600">Base Salary</td>
                <td className="text-right py-3 px-5 text-[#0a2e24] font-medium">
                  ${paySlip.basicSalary?.toLocaleString()}
                </td>
              </tr>
              <tr className="border-t border-[#e2ede8]">
                <td className="py-3 px-5 text-slate-600">Allowances & Benefits</td>
                <td className="text-right py-3 px-5 text-[#0d6b52] font-medium">
                  + ${paySlip.allowances?.toLocaleString()}
                </td>
              </tr>
              <tr className="border-t border-[#e2ede8]">
                <td className="py-3 px-5 text-slate-600">Deductions & Tax</td>
                <td className="text-right py-3 px-5 text-rose-500 font-medium">
                  - ${paySlip.deductions?.toLocaleString()}
                </td>
              </tr>

              
              <tr className="border-t-2 border-[#0d6b52]/20 bg-[#e8f5f0]">
                <td className="py-3.5 px-5 font-bold text-[#0a2e24]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0d6b52]"/>
                    Net Payout
                  </div>
                </td>
                <td className="text-right py-3.5 px-5 text-[#0d6b52] text-base font-bold">
                  ${paySlip.netSalary?.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

       
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#e2ede8]">
          <div>
            <p className="text-xs text-slate-400">
              Generated on {format(new Date(), "dd MMM yyyy")} · System-generated document
            </p>
            <p className="text-xs text-[#0d6b52] mt-0.5 font-medium">
              Thank you for your dedication to the team 🌿
            </p>
          </div>
          <button
            className="btn-primary print:hidden cursor-pointer flex items-center gap-2 shrink-0 text-sm"
            onClick={() => window.print()}>
            <PrinterIcon className="w-4 h-4"/> Print Payslip
          </button>
        </div>

      </motion.div>
    </div>
  )
}

export default PrintPayslip