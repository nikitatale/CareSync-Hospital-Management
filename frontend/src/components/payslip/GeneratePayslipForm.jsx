import { Loader2Icon, Plus, X, ReceiptText } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../../api/axios'

const GeneratePayslipForm = ({ staffs, onSuccess }) => {
  const [isOpen, setIsOpen]   = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries())
    try {
       await api.post("/payslips", data)
       setIsOpen(false)
       onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message)
    } 
    setLoading(false);
  }

  return (
    <>
   
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className='btn-primary cursor-pointer flex items-center gap-2'>
        <Plus className='w-4 h-4'/> Generate Payslip
      </motion.button>

   
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}>

            <motion.div
              className='bg-white rounded-2xl shadow-2xl max-w-lg w-full'
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{ opacity: 0,    scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}>

           
              <div className='flex items-center justify-between p-6 pb-0'>
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 bg-[#e8f5f0] rounded-xl flex items-center justify-center'>
                    <ReceiptText className='w-4 h-4 text-[#0d6b52]'/>
                  </div>
                  <div>
                    <h3 className='text-base font-semibold text-[#0a2e24]'>Generate Payslip</h3>
                    <p className='text-xs text-slate-400 mt-0.5'>Create monthly salary record for a staff member</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className='p-2 rounded-lg hover:bg-[#f4f7f5] transition-colors text-slate-400 hover:text-slate-600 cursor-pointer'>
                  <X className='w-4 h-4'/>
                </motion.button>
              </div>

           
              <form className='p-6 space-y-4' onSubmit={handleSubmit}>

             
                <div>
                  <label className='block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                    Staff Member
                  </label>
                  <select name="staffId" required>
                    {staffs.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.firstName} {e.lastName} — {e.position}
                      </option>
                    ))}
                  </select>
                </div>

              
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                      Month
                    </label>
                    <select name='month'>
                      {["January","February","March","April","May","June",
                        "July","August","September","October","November","December"
                       ].map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                      Year
                    </label>
                    <input type="number" name='year' defaultValue={new Date().getFullYear()}/>
                  </div>
                </div>

          
                <div>
                  <label className='block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                    Basic Salary
                  </label>
                  <input type="number" name='basicSalary' required placeholder='e.g. 50,000'/>
                </div>

                
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                      Allowances
                    </label>
                    <input type="number" name='allowances' defaultValue="0"/>
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                      Deductions
                    </label>
                    <input type="number" name='deductions' defaultValue="0"/>
                  </div>
                </div>

           
                <div className='flex justify-end gap-3 pt-2'>
                  <button
                    type='button' onClick={() => setIsOpen(false)}
                    className='btn-secondary cursor-pointer'>
                    Cancel
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type='submit' disabled={loading}
                    className='btn-primary flex items-center gap-2 cursor-pointer'>
                    {loading && <Loader2Icon className='w-4 h-4 animate-spin'/>}
                    {loading ? "Generating..." : "Generate Payslip"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GeneratePayslipForm