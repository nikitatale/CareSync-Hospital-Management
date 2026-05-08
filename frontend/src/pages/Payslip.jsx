import { useCallback, useEffect, useState } from "react"
import { dummyPayslipData, dummyStaffData } from "../assets/assets"
import { motion } from "framer-motion"
import Loading from "../components/Loading"
import PayslipList from "../components/payslip/PayslipList"
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm"

const Payslip = () => {
  const [paySlips, setPaySlips] = useState([])
  const [staffs, setStaffs]     = useState([])
  const [loading, setLoading]   = useState(true)

  const isAdmin = true

  const fetchPaySlips = useCallback(async () => {
    setPaySlips(dummyPayslipData)
    setTimeout(() => setLoading(false), 1000)
  }, [])

  useEffect(() => { fetchPaySlips() }, [fetchPaySlips])
  useEffect(() => { if (isAdmin) setStaffs(dummyStaffData) }, [isAdmin])

  if (loading) return <Loading/>

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}>

     
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[3px] h-6 rounded-sm bg-[#0d6b52]"/>
            <h1 className="text-2xl font-semibold text-[#0a2e24] tracking-tight">
              {isAdmin ? "Payroll Hub" : "My Payslips"}
            </h1>
          </div>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate, track & manage staff salary records"
              : "Your complete salary and payout history"}
          </p>
        </div>
        {isAdmin && <GeneratePayslipForm staffs={staffs} onSuccess={fetchPaySlips}/>}
      </motion.div>

      <PayslipList payslips={paySlips} isAdmin={isAdmin}/>
    </motion.div>
  )
}

export default Payslip