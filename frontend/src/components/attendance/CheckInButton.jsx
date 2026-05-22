import { Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../../api/axios'

const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false)

  const handleAttendance = async () => {
    setLoading(true)
    try {
      await api.post("/attendance")
      onAction()
    } catch (error) {
       toast.error(error.response?.data?.error || error?.message)
    }
    setLoading(false)
  }

  if (todayRecord?.checkOut) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className='flex flex-col items-center justify-center p-8 bg-[#f4f7f5] rounded-2xl border border-[#e2ede8] text-center'>
        <div className='w-12 h-12 bg-[#e8f5f0] rounded-full flex items-center justify-center mb-3'>
          <LogOutIcon className='w-5 h-5 text-[#0d6b52]'/>
        </div>
        <h3 className='text-lg font-semibold text-[#0a2e24]'>Shift Wrapped Up!</h3>
        <p className='text-slate-500 text-sm mt-1'>Great work today — rest up, see you tomorrow</p>
      </motion.div>
    )
  }

  const isCheckedIn = !!todayRecord?.checkIn

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>

      <motion.button
        onClick={handleAttendance}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-6 cursor-pointer px-6 py-4 rounded-xl text-white transition-all duration-200
          ${isCheckedIn
            ? 'bg-gradient-to-br from-[#0a2e24] to-[#051a12]'
            : 'bg-gradient-to-br from-[#0d6b52] to-[#0a4a3a]'
          }`}>

        <div className='p-2 bg-white/10 rounded-lg'>
          {loading
            ? <Loader2Icon className='size-6 animate-spin'/>
            : isCheckedIn
              ? <LogOutIcon className='size-6'/>
              : <LogInIcon className='size-6'/>
          }
        </div>

        <div className='flex flex-col'>
          <span className='text-base font-semibold'>
            {loading ? "Please wait..." : isCheckedIn ? "End Shift" : "Start Shift"}
          </span>
          <span className='text-xs opacity-70 mt-0.5'>
            {isCheckedIn ? "Mark your shift complete" : "Begin today's duty"}
          </span>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default CheckInButton