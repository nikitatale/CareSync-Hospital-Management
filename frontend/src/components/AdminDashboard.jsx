import { Building2Icon, CalendarIcon, FileTextIcon, UserIcon } from "lucide-react"
import { motion } from "framer-motion"

const AdminDashboard = ({ data }) => {

  const stats = [
    { icon: UserIcon,      value: data.totalStaff,       label: "Total Staff",        desc: "Doctors, nurses & staff", color: "default" },
    { icon: Building2Icon, value: data.totalDepartments, label: "Departments",        desc: "Speciality divisions",    color: "default" },
    { icon: CalendarIcon,  value: data.todayAttendance,  label: "Today's Attendance", desc: "On duty right now",       color: "green"   },
    { icon: FileTextIcon,  value: data.pendingLeaves,    label: "Pending Leaves",     desc: "Needs your attention",    color: "amber"   },
  ]

  const iconStyle = {
    default: "bg-[#f4f7f5] text-slate-500 group-hover:bg-[#e8f5f0] group-hover:text-[#0d6b52]",
    green:   "bg-[#e8f5f0] text-[#0d6b52]",
    amber:   "bg-amber-50 text-amber-600",
  }
  const valueStyle = {
    default: "text-[#0a2e24]",
    green:   "text-[#0d6b52]",
    amber:   "text-amber-600",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}>

  
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-[3px] h-6 rounded-sm bg-[#0d6b52]"/>
          <h1 className="text-2xl font-semibold text-[#0a2e24] tracking-tight">Command Centre</h1>
        </div>
        <p className="page-subtitle">Here's what's happening at your hospital today</p>
      </motion.div>

  
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>

        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }
            }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="card p-5 relative overflow-hidden group flex items-center justify-between cursor-default">

            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full
              bg-slate-200 group-hover:bg-[#0d6b52] transition-colors duration-300"/>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-semibold ${valueStyle[s.color]}`}>{s.value}</p>
              <p className="text-[11px] text-slate-400 mt-1">{s.desc}</p>
            </div>

            <s.icon className={`size-10 p-2.5 rounded-xl transition-all duration-200 ${iconStyle[s.color]}`}/>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default AdminDashboard