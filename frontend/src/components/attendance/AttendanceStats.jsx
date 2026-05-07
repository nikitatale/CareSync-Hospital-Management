import { AlertCircleIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const AttendanceStats = ({ history }) => {

  const totalPresent = history.filter((h) => h.status === "PRESENT" || h.status === "LATE").length
  const totalLate = history.filter((h) => h.status === "LATE").length

  const stats = [
    { label: "Shifts Completed", value: totalPresent, icon: CalendarIcon },
    { label: "Late Clock-ins",   value: totalLate,    icon: AlertCircleIcon },
    { label: "Avg. Hours/Day",   value: "7.6 hrs",    icon: ClockIcon },
  ]

  return (
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8'
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>

      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }
          }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className='card p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group cursor-default'>

          <div className='absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-slate-200 group-hover:bg-[#0d6b52] transition-colors duration-300'/>

          <div className='p-3 bg-[#e8f5f0] rounded-xl group-hover:bg-[#d4ede6] transition-colors duration-200'>
            <s.icon className='w-5 h-5 text-[#0d6b52]'/>
          </div>

          <div>
            <p className='text-xs text-slate-500 font-medium'>{s.label}</p>
            <p className='text-2xl font-semibold text-[#0a2e24] tracking-tight'>{s.value}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default AttendanceStats