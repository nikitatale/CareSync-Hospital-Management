import { CalendarDays, FileTextIcon, Loader2, MessageSquare, Send, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../api/axios'
import toast from 'react-hot-toast'


const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)

  const today    = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const minDate  = tomorrow.toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      await api.post('/leave', data)
      onSuccess();
      onClose()
    } catch (error) {
       toast.error(error.response?.data?.error || error?.message)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}>

          <motion.div
            className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg'
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0,    scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}>

          
            <div className='flex items-center justify-between p-6 pb-0'>
              <div className='flex items-center gap-3'>
                <div className='w-9 h-9 bg-[#e8f5f0] rounded-xl flex items-center justify-center'>
                  <CalendarDays className='w-4 h-4 text-[#0d6b52]'/>
                </div>
                <div>
                  <h2 className='text-base font-semibold text-[#0a2e24]'>Request Time Off</h2>
                  <p className='text-xs text-slate-400 mt-0.5'>Your request goes to admin for approval</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className='p-2 rounded-lg hover:bg-[#f4f7f5] transition-colors text-slate-400 hover:text-slate-600'>
                <X className='w-4 h-4 cursor-pointer'/>
              </motion.button>
            </div>

         
            <form className='p-6 space-y-5' onSubmit={handleSubmit}>

           
              <div>
                <label className='flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                  <FileTextIcon className='w-3.5 h-3.5 text-[#0d6b52]'/>
                  Leave Type
                </label>
                <select name='type' required>
                  <option value="SICK">Sick Leave</option>
                  <option value="CASUAL">Casual Leave</option>
                  <option value="ANNUAL">Annual Leave</option>
                </select>
              </div>

          
              <div>
                <label className='flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                  <CalendarDays className='w-3.5 h-3.5 text-[#0d6b52]'/>
                  Duration
                </label>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <span className='block text-xs text-slate-400 mb-1.5'>From</span>
                    <input type="date" name='startDate' required min={minDate}/>
                  </div>
                  <div>
                    <span className='block text-xs text-slate-400 mb-1.5'>To</span>
                    <input type="date" name='endDate' required min={minDate}/>
                  </div>
                </div>
              </div>

              <div>
                <label className='flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                  <MessageSquare className='w-3.5 h-3.5 text-[#0d6b52]'/>
                  Reason
                </label>
                <textarea
                  name="reason" required rows={3}
                  className='resize-none'
                  placeholder='Briefly describe why you need this time off...'/>
              </div>

         
              <div className='flex gap-3 pt-1'>
                <button type='button' onClick={onClose} className='btn-secondary cursor-pointer flex-1'>
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type='submit' disabled={loading}
                  className='btn-primary cursor-pointer flex-1 flex items-center justify-center gap-2'>
                  {loading
                    ? <><Loader2 className='w-4 h-4 animate-spin'/> Submitting...</>
                    : <><Send className='w-4 h-4'/> Submit Request</>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ApplyLeaveModal