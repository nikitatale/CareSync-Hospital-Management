import { useEffect, useState } from "react"
import { dummyProfileData } from "../assets/assets"
import { motion } from "framer-motion"
import Loading from "../components/Loading"
import { Lock } from "lucide-react"
import ProfileForm from "../components/ProfileForm"
import ChangePasswordModel from "../components/ChangePasswordModel"

const Settings = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const fetchProfile = async () => {
    setProfile(dummyProfileData)
    setTimeout(() => setLoading(false), 1000)
  }

  useEffect(() => { fetchProfile() }, [])

  if (loading) return <Loading/>

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
          <h1 className="text-2xl font-semibold text-[#0a2e24] tracking-tight">Account Settings</h1>
        </div>
        <p className="page-subtitle">Manage your profile, bio & security preferences</p>
      </motion.div>

    
      {profile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}>
          <ProfileForm initialData={profile} onSuccess={fetchProfile}/>
        </motion.div>
      )}

    
      <motion.div
        className="card p-5 flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#e8f5f0] rounded-xl flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 text-[#0d6b52]"/>
          </div>
          <div>
            <p className="font-medium text-[#0a2e24]">Password & Security</p>
            <p className="text-xs text-slate-400 mt-0.5">Last updated recently — keep it strong</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="btn-secondary text-sm cursor-pointer"
          onClick={() => setShowPassword(true)}>
          Update
        </motion.button>
      </motion.div>

      <ChangePasswordModel open={showPassword} onClose={() => setShowPassword(false)}/>
    </motion.div>
  )
}

export default Settings