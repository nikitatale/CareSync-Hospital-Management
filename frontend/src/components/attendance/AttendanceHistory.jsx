import { motion } from 'framer-motion'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets'
import { format } from "date-fns"

const AttendanceHistory = ({ history }) => {
  return (
    <motion.div
      className='card overflow-hidden'
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}>

      <div className='px-6 py-4 border-b border-[#e2ede8]'>
        <h3 className='font-semibold text-[#0a2e24]'>Shift Log</h3>
        <p className='text-xs text-slate-400 mt-0.5'>Your complete attendance timeline</p>
      </div>

      <div className='overflow-x-auto'>
        <table className='table-modern'>
          <thead>
            <tr>
              <th className='px-6 py-4'>Date</th>
              <th className='px-6 py-4'>Check In</th>
              <th className='px-6 py-4'>Check Out</th>
              <th className='px-6 py-4'>Working Hours</th>
              <th className='px-6 py-4'>Day Type</th>
              <th className='px-6 py-4'>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={6} className='text-center py-16 text-slate-400'>
                  No attendance records yet - clock in to get started
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record)
                return (
                  <tr key={record._id || record.id}>
                    <td className='px-6 py-4 font-medium text-[#0a2e24]'>
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </td>
                    <td className='px-6 py-4 text-[#0a2e24]'>
                      {record.checkIn ? format(new Date(record.checkIn), "hh:mm a") : "—"}
                    </td>
                    <td className='px-6 py-4 text-[#0a2e24]'>
                      {record.checkOut ? format(new Date(record.checkOut), "hh:mm a") : "—"}
                    </td>
                    <td className='px-6 py-4 text-[#0a2e24] font-medium'>
                      {getWorkingHoursDisplay(record)}
                    </td>
                    <td className='px-6 py-4'>
                      {dayType.label !== "-"
                        ? <span className={`badge ${dayType.className}`}>{dayType.label}</span>
                        : "—"}
                    </td>
                    <td className='px-6 py-4'>
                      <span className={`badge ${
                        record.status === "PRESENT" ? "badge-success" :
                        record.status === "LATE"    ? "badge-warning" : "badge-danger"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default AttendanceHistory