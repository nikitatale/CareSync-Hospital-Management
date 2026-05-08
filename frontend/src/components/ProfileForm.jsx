import { Loader2, Save, User } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-6 mb-4">

      
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e2ede8]">
        <div className="w-9 h-9 bg-[#e8f5f0] rounded-xl flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-[#0d6b52]"/>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#0a2e24]">Public Profile</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your info visible across the system</p>
        </div>
      </div>

    
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-rose-50 text-rose-700 p-3.5 rounded-xl text-sm border border-rose-200 mb-5 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"/>
          {error}
        </motion.div>
      )}

      
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#e8f5f0] text-[#0d6b52] p-3.5 rounded-xl text-sm border border-[#c6e8dc] mb-5 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0d6b52] mt-1.5 shrink-0"/>
          {message}
        </motion.div>
      )}

      <div className="space-y-5">

     
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Full Name
            </label>
            <input
              disabled
              value={`${initialData.firstName} ${initialData.lastName}`}
              className="bg-[#f4f7f5] text-slate-400 cursor-not-allowed"/>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Work Email
            </label>
            <input
              disabled
              value={initialData.email}
              className="bg-[#f4f7f5] text-slate-400 cursor-not-allowed"/>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Role & Position
            </label>
            <input
              disabled
              value={`${initialData.position}`}
              className="bg-[#f4f7f5] text-slate-400 cursor-not-allowed"/>
          </div>
        </div>

       
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            Short Bio
          </label>
          <textarea
            className={`resize-none ${initialData.isDeleted ? "bg-[#f4f7f5] text-slate-400 cursor-not-allowed" : ""}`}
            disabled={initialData.isDeleted}
            name="bio"
            defaultValue={initialData.bio || ""}
            placeholder="e.g. Senior nurse with 5 years in the ICU - passionate about patient care."
            rows={3}/>
          <p className="text-xs text-slate-400 mt-1.5">Shown on your staff profile across the system</p>
        </div>

       
        {initialData.isDeleted ? (
          <div className="pt-2">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-center">
              <p className="text-rose-600 font-medium">Account Deactivated</p>
              <p className="text-xs text-rose-400 mt-1">Contact HR to reactivate your profile</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              type="submit" disabled={loading}
              className="btn-primary cursor-pointer flex items-center gap-2 w-full sm:w-auto justify-center">
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin"/> Saving...</>
                : <><Save className="w-4 h-4"/> Save Changes</>}
            </motion.button>
          </div>
        )}
      </div>
    </form>
  )
}

export default ProfileForm