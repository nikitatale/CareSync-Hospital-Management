import { motion } from 'framer-motion'
import {
  Check,
  Loader2,
  X,
  BadgePlus,
  Umbrella,
  Palmtree,
  CircleCheckBig,
  CircleX,
  Clock3,
  CalendarDays,
} from 'lucide-react'
import { useState } from 'react'
import { format } from "date-fns"

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null)

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id)
  }

  return (
    <motion.div
      className='card overflow-hidden'
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>

    
      <div className='px-6 py-4 border-b border-[#e2ede8] flex items-center justify-between'>
        <div>
          <h3 className='font-semibold text-[#0a2e24]'>Leave Record</h3>
          <p className='text-xs text-slate-400 mt-0.5'>All your submitted leave requests</p>
        </div>
        <span className='text-xs font-medium px-2.5 py-1 bg-[#e8f5f0] text-[#0d6b52] rounded-full'>
          {leaves.length} total
        </span>
      </div>

      <div className='overflow-x-auto'>
        <table className='table-modern'>
          <thead>
            <tr>
              {isAdmin && <th>Staff Member</th>}
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Reason</th>
              <th>Status</th>
              {isAdmin && <th className='text-center'>Action</th>}
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 4} className='text-center py-16 text-slate-400'>
                  <div className='flex items-center justify-center gap-2'>
                    <CalendarDays className='w-4 h-4' />
                    <span>No leave requests yet - take a well-deserved break!</span>
                  </div>
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave._id || leave.id}>

                  {isAdmin && (
                    <td className='px-6 py-4 font-medium text-[#0a2e24]'>
                      {leave.staff?.firstName} {leave.staff?.lastName}
                    </td>
                  )}

                  <td className='px-6 py-4'>
                    <span className={`badge flex items-center gap-1.5 w-fit ${
                      leave.type === "SICK"
                        ? "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
                        : leave.type === "CASUAL"
                        ? "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
                        : "badge-success"
                    }`}>

                      {leave.type === "SICK" ? (
                        <>
                          <BadgePlus className='w-3.5 h-3.5' />
                          Sick
                        </>
                      ) : leave.type === "CASUAL" ? (
                        <>
                          <Umbrella className='w-3.5 h-3.5' />
                          Casual
                        </>
                      ) : (
                        <>
                          <Palmtree className='w-3.5 h-3.5' />
                          Annual
                        </>
                      )}
                    </span>
                  </td>

                  <td className='px-6 py-4 text-xs text-[#0a2e24]'>
                    <span className='font-medium'>
                      {format(new Date(leave.startDate), "MMM dd")}
                    </span>

                    <span className='text-slate-400 mx-1'>-</span>

                    <span className='font-medium'>
                      {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </span>
                  </td>

                  <td
                    className='px-6 py-4 max-w-xs text-[#0a2e24] text-sm truncate'
                    title={leave.reason}>
                    {leave.reason}
                  </td>

                  <td className='px-6 py-4'>
                    <span className={`badge flex items-center gap-1.5 w-fit ${
                      leave.status === "APPROVED"
                        ? "badge-success"
                        : leave.status === "REJECTED"
                        ? "badge-danger"
                        : "badge-warning"
                    }`}>

                      {leave.status === "APPROVED" ? (
                        <>
                          <CircleCheckBig className='w-3.5 h-3.5' />
                          Approved
                        </>
                      ) : leave.status === "REJECTED" ? (
                        <>
                          <CircleX className='w-3.5 h-3.5' />
                          Rejected
                        </>
                      ) : (
                        <>
                          <Clock3 className='w-3.5 h-3.5' />
                          Pending
                        </>
                      )}
                    </span>
                  </td>

                  {isAdmin && (
                    <td className='px-6 py-4'>
                      {leave.status === "PENDING" && (
                        <div className='flex justify-center gap-2'>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleStatusUpdate(leave._id || leave.id, "APPROVED")
                            }
                            disabled={!!processing}
                            className='p-1.5 cursor-pointer rounded-lg bg-[#e8f5f0] text-[#0d6b52] hover:bg-[#d4ede6] transition-colors'>

                            {processing === (leave._id || leave.id)
                              ? <Loader2 className='w-4 h-4 animate-spin' />
                              : <Check className='w-4 h-4' />}
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleStatusUpdate(leave._id || leave.id, "REJECTED")
                            }
                            disabled={!!processing}
                            className='p-1.5 cursor-pointer rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors'>

                            {processing === (leave._id || leave.id)
                              ? <Loader2 className='w-4 h-4 animate-spin' />
                              : <X className='w-4 h-4' />}
                          </motion.button>

                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default LeaveHistory