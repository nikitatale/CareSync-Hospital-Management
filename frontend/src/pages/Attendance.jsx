import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Loading from "../components/Loading"
import CheckInButton from "../components/attendance/CheckInButton"
import AttendanceStats from "../components/attendance/AttendanceStats"
import AttendanceHistory from "../components/attendance/AttendanceHistory"
import toast from "react-hot-toast"
import api from "../api/axios"

const Attendance = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)

  const fetchData = useCallback(async () => {
     try {
      
      const res = await api.get("/attendance")
      const json = res.data;
      setHistory(json.data || [])
      if(json.staff?.isDeleted) setIsDeleted(true)
     } catch (error) {
       toast.error(error.response?.data?.error || error?.message)
     }finally{
      setLoading(false);
     }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) return <Loading/>

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString()
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}>

    
      <div className="page-header">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-[3px] h-6 rounded-sm bg-[#0d6b52]"/>
          <h1 className="text-2xl font-semibold text-[#0a2e24] tracking-tight">My Attendance</h1>
        </div>
        <p className="page-subtitle">Your daily duty log - every shift, every hour</p>
      </div>

      
      {isDeleted ? (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-8 p-5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3">
          <div className="w-5 h-5 mt-0.5 text-rose-500 shrink-0">⚠</div>
          <p className="text-rose-600 text-sm">
            Your staff profile has been deactivated. Please contact HR for assistance.
          </p>
        </motion.div>
      ) : (
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecord} onAction={fetchData}/>
        </div>
      )}

      <AttendanceStats history={history}/>
      <AttendanceHistory history={history}/>
    </motion.div>
  )
}

export default Attendance