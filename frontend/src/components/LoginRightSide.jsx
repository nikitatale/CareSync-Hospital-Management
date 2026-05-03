import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, 
    },
  },
};

const smoothFade = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, 
      ease: [0.25, 0.1, 0.25, 1], 
    },
  },
};

const LoginRightSide = () => {
  const navigate = useNavigate();

  const roles = {
    admin: {
      title: "Admin Access Portal",
      subtitle: "Oversee staff, shifts, payroll & hospital operations.",
      to: "/login/admin",
    },
    staff: {
      title: "Staff Portal",
      subtitle: "View your shifts, apply for leave & download payslips.",
      to: "/login/staff",
    },
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#f4f7f5] px-8 py-12 min-h-screen">
      <motion.div 
        className="w-full max-w-sm"
        variants={container}
        initial="hidden"
        animate="show"
      >
        
        <motion.div variants={smoothFade} className="text-center mb-10">
          <div className="w-12 h-12 bg-[#e8f5f0] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7v10l9 5 9-5V7L12 2z"
                stroke="#0d6b52"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M12 12v5M12 12l4-2.5M12 12l-4-2.5"
                stroke="#0d6b52"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-[#0a2e24] mb-2">Welcome Back</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Select your portal to securely access the system.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
     
          <motion.button
            variants={smoothFade}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(roles.admin.to)}
            className="bg-white border-[1.5px] border-[#e2ede8] rounded-2xl p-6
                  flex items-center justify-between
                  cursor-pointer group
                  hover:border-[#0d6b52] hover:shadow-xl hover:shadow-[#0d6b52]/5
                  transition-colors duration-300 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#e8f5f0] rounded-xl flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.5" stroke="#0d6b52" strokeWidth="1.7" />
                  <path
                    d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                    stroke="#0d6b52"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-[#0a2e24]">
                  {roles.admin.title}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {roles.admin.subtitle}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-[#f0f7f4] group-hover:bg-[#0d6b52] rounded-lg flex items-center justify-center shrink-0 transition-colors">
              <ArrowRightIcon size={16} className="text-[#0d6b52] group-hover:text-white" />
            </div>
          </motion.button>

        
          <motion.button
            variants={smoothFade}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(roles.staff.to)}
            className="bg-white border-[1.5px] border-[#e2ede8] rounded-2xl p-6
                  flex items-center justify-between
                  cursor-pointer group
                  hover:border-[#0d6b52] hover:shadow-xl hover:shadow-[#0d6b52]/5
                  transition-colors duration-300 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#eff6ff] rounded-xl flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="3"
                    width="16"
                    height="18"
                    rx="2"
                    stroke="#0d6b52"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 8h8M8 12h8M8 16h5"
                    stroke="#0d6b52"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-[#0a2e24]">
                  {roles.staff.title}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {roles.staff.subtitle}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-[#eff6ff] group-hover:bg-[#0d6b52] rounded-lg flex items-center justify-center shrink-0 transition-colors">
              <ArrowRightIcon size={16} className="text-[#0d6b52] group-hover:text-white" />
            </div>
          </motion.button>
        </div>

        <motion.p 
          variants={smoothFade}
          className="text-center text-xs text-slate-400 mt-12 tracking-wide"
        >
          © 2026 CareSync. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginRightSide;