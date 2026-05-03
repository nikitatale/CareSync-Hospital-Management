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


const floatingSlow = {
  animate: {
    y: [0, -8, 0],
  },
  transition: {
    duration: 8,       
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const LoginLeftSide = () => {
  return (
    <div
      className="hero-bg hidden md:flex w-1/2 relative overflow-hidden flex-col justify-between p-12"
      style={{
        background:
          "linear-gradient(135deg, #0a4a3a 0%, #0d6b52 50%, #0f7d61 100%)",
      }}
    >
    
      <motion.div
        variants={floatingSlow}
        animate="animate"
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />
      <motion.div
        variants={floatingSlow}
        animate="animate"
        className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full"
        style={{ background: "rgba(255,255,255,0.03)" }}
      />
      <motion.div
        variants={floatingSlow}
        animate="animate"
        className="absolute top-1/2 left-3/5 w-28 h-28 rounded-full"
        style={{ background: "rgba(29,158,117,0.2)" }}
      />

   
      <motion.div variants={container} initial="hidden" animate="show">
      
        <motion.div
          variants={smoothFade}
          className="flex items-center gap-3 mb-12"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7v10l9 5 9-5V7L12 2z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 12v5M12 12l4-2.5M12 12l-4-2.5"
                stroke="#5dcaa5"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-white text-lg font-medium tracking-wide">
            CareSync
          </span>
        </motion.div>

      
        <motion.div
          variants={smoothFade}
          className="inline-block rounded-full px-4 py-1 mb-5 border"
          style={{
            background: "rgba(255,255,255,0.1)",
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Hospital Management
          </span>
        </motion.div>

        
        <motion.h1
          variants={smoothFade}
          className="text-5xl font-semibold leading-tight mb-4 font-serif text-white"
        >
          Where every shift<br />
          <span style={{ color: "#5dcaa5" }}>saves a life.</span>
        </motion.h1>

        <motion.p
          variants={smoothFade}
          className="text-sm leading-relaxed max-w-xs"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Manage your hospital staff, duty rosters, and payroll - all from one
          unified dashboard built for modern healthcare teams.
        </motion.p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
    
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { value: "98%", label: "Attendance accuracy" },
            { value: "3x", label: "Faster payroll" },
            { value: "24/7", label: "Shift coverage" },
          ].map((stat) => (
            <motion.div
              key={stat.value}
              variants={smoothFade}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl p-3 border"
              style={{
                background: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="text-xl font-semibold mb-1"
                style={{ color: "#5dcaa5" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs leading-tight"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={smoothFade}
          className="flex items-center gap-3 pt-5 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div className="flex">
            {["DR", "NR", "AD"].map((initials, i) => (
              <div
                key={initials}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs text-white font-medium -mr-2"
                style={{
                  background: ["#0d6b52", "#0a4a3a", "#0f7d61"][i],
                  borderColor: "rgba(255,255,255,0.3)",
                  zIndex: 3 - i,
                }}
              >
                {initials}
              </div>
            ))}
          </div>
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Trusted by doctors, nurses & admins
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginLeftSide;