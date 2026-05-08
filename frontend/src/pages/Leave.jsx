import { useCallback, useEffect, useState } from "react"
import { dummyLeaveData } from "../assets/assets"
import { motion } from "framer-motion"
import Loading from "../components/Loading"
import { PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from "lucide-react"
import LeaveHistory from "../components/leave/LeaveHistory"
import ApplyLeaveModel from "../components/leave/ApplyLeaveModel"

const Leave = () => {
  const [leaves, setLeaves]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [showModel, setShowModel] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const isAdmin = false

  const fetchLeaves = useCallback(() => {
    setLeaves(dummyLeaveData)
    setTimeout(() => setLoading(false), 1000)
  }, [])

  useEffect(() => { fetchLeaves() }, [fetchLeaves])

  if (loading) return <Loading/>

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED")
  const sickCount      = approvedLeaves.filter((l) => l.type === "SICK").length
  const casualCount    = approvedLeaves.filter((l) => l.type === "CASUAL").length
  const annualCount    = approvedLeaves.filter((l) => l.type === "ANNUAL").length

  const leavesStats = [
    { label: "Sick Leave",   value: sickCount,   icon: ThermometerIcon,
      iconBg: "bg-rose-50",   iconColor: "text-rose-500",   bar: "group-hover:bg-rose-400"   },
    { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon,
      iconBg: "bg-amber-50",  iconColor: "text-amber-500",  bar: "group-hover:bg-amber-400"  },
    { label: "Annual Leave", value: annualCount, icon: PalmtreeIcon,
      iconBg: "bg-[#e8f5f0]", iconColor: "text-[#0d6b52]", bar: "group-hover:bg-[#0d6b52]" },
  ]

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
              {isAdmin ? "Leave Requests" : "Time Off"}
            </h1>
          </div>
          <p className="page-subtitle">
            {isAdmin ? "Review and action pending leave applications" : "Track your leaves — approved, pending & rejected"}
          </p>
        </div>

        {!isAdmin && !isDeleted && (
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowModel(true)}
            className="btn-primary cursor-pointer flex items-center gap-2 w-full sm:w-auto justify-center">
            <PlusIcon className="w-4 h-4"/> Request Leave
          </motion.button>
        )}
      </motion.div>

    
      {!isAdmin && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>

          {leavesStats.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }
              }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="card p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group cursor-default">

              <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-slate-200 transition-colors duration-300 ${s.bar}`}/>

              <div className={`p-3 rounded-xl transition-colors duration-200 ${s.iconBg}`}>
                <s.icon className={`w-5 h-5 ${s.iconColor}`}/>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">{s.label}</p>
                <p className="text-2xl font-semibold text-[#0a2e24] tracking-tight">
                  {s.value} <span className="text-xs font-normal text-slate-400">days taken</span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves}/>
      <ApplyLeaveModel open={showModel} onClose={() => setShowModel(false)} onSuccess={fetchLeaves}/>
    </motion.div>
  )
}

export default Leave