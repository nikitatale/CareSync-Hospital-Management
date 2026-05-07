import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon } from 'lucide-react'
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const StaffDashboard = ({ data }) => {
  const staff = data.staff

  const cards = [
    { icon: CalendarIcon,  value: data.currentMonthAttendance,  title: "Days Present", subtitle: "Out of 26 working days", color: "green"   },
    { icon: FileTextIcon,  value: data.pendingLeaves,  title: "Pending Leaves", subtitle: "Applied this month",     color: "amber"   },
    { icon: DollarSignIcon,value: data.latestPayslip ? `$${data.latestPayslip.netSalary?.toLocaleString()}` : "N/A", title: "Latest Payslip", subtitle: "Last salary credited",   color: "default" },
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
          <h1 className="text-2xl font-semibold text-[#0a2e24] tracking-tight">
            Good to see you, {staff.firstName}!
          </h1>
        </div>
        <p className="page-subtitle">
          {staff?.position} · {staff?.department || "No Department"} · Shift starts at 08:00 AM
        </p>
      </motion.div>

    
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>

        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }
            }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="card p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between cursor-default">

            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full
              bg-slate-200 group-hover:bg-[#0d6b52] transition-colors duration-300"/>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">{card.title}</p>
              <p className={`text-2xl font-semibold ${valueStyle[card.color]}`}>{card.value}</p>
              <p className="text-[11px] text-slate-400 mt-1">{card.subtitle}</p>
            </div>

            <card.icon className={`size-10 p-2.5 rounded-xl transition-all duration-200 ${iconStyle[card.color]}`}/>
          </motion.div>
        ))}
      </motion.div>

      
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}>

        <Link to="/attendance"
          className="btn-primary text-center inline-flex items-center justify-center gap-2">
          Check In for Today <ArrowRightIcon className="w-4 h-4"/>
        </Link>

        <Link to="/leave" className="btn-secondary text-center">
          Request Time Off
        </Link>
      </motion.div>

    </motion.div>
  )
}

export default StaffDashboard