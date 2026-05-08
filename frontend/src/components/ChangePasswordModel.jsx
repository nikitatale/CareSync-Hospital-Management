import { Loader2, LockIcon, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ChangePasswordModel = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}>

          <div className='absolute inset-0 bg-black/40 backdrop-blur-sm'/>

          <motion.div
            className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md'
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0,    scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}>

           
            <div className='flex items-center justify-between p-6 pb-0'>
              <div className='flex items-center gap-3'>
                <div className='w-9 h-9 bg-[#e8f5f0] rounded-xl flex items-center justify-center shrink-0'>
                  <ShieldCheck className='w-4 h-4 text-[#0d6b52]'/>
                </div>
                <div>
                  <h2 className='text-base font-semibold text-[#0a2e24]'>Update Password</h2>
                  <p className='text-xs text-slate-400 mt-0.5'>Choose a strong, unique password</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className='p-2 rounded-lg hover:bg-[#f4f7f5] transition-colors text-slate-400 hover:text-slate-600 cursor-pointer'>
                <X className='w-4 h-4'/>
              </motion.button>
            </div>

       
            <form className='p-6 space-y-4' onSubmit={handleSubmit}>

            
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-xl text-sm flex items-start gap-3 border
                    ${message.type === "success"
                      ? "bg-[#e8f5f0] text-[#0d6b52] border-[#c6e8dc]"
                      : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0
                    ${message.type === "success" ? "bg-[#0d6b52]" : "bg-rose-500"}`}/>
                  {message.text}
                </motion.div>
              )}

             
              <div>
                <label className='block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                  Current Password
                </label>
                <input type="password" name='currentPassword' required placeholder='Enter your current password'/>
              </div>

             
              <div>
                <label className='block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2'>
                  New Password
                </label>
                <input type="password" name='newPassword' required placeholder='Min. 8 characters recommended'/>
                <p className='text-xs text-slate-400 mt-1.5'>Use a mix of letters, numbers & symbols</p>
              </div>

            
              <div className='flex gap-3 pt-2'>
                <button
                  type='button' onClick={onClose}
                  className='btn-secondary cursor-pointer flex-1'>
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type='submit' disabled={loading}
                  className='btn-primary flex-1 cursor-pointer flex justify-center items-center gap-2'>
                  {loading
                    ? <><Loader2 className='w-4 h-4 animate-spin'/> Updating...</>
                    : <><LockIcon className='w-4 h-4'/> Update Password</>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ChangePasswordModel