import { Building2Icon, CalendarIcon, FileTextIcon, UserIcon } from "lucide-react"
import { Link } from "react-router-dom"

const AdminDashboard = ({data}) => {


  const stats = [
  { icon: UserIcon,     value: data.totalStaff,         label: "Total Staff",          desc: "Doctors, nurses & staff",    color: "default" },
  { icon: Building2Icon,value: data.totalDepartments,   label: "Departments",          desc: "Speciality divisions",      color: "default" },
  { icon: CalendarIcon, value: data.todayAttendance,    label: "Today's Attendance",   desc: "On duty right now",    color: "green"   },
  { icon: FileTextIcon, value: data.pendingLeaves,      label: "Pending Leaves",       desc: "Needs your attention",   color: "amber"   },
]

const iconStyle = {
  default: "bg-[#f4f7f5] text-slate-500 group-hover:bg-[#e8f5f0] group-hover:text-[#0d6b52]",
  green:   "bg-[#e8f5f0] text-[#0d6b52]",
  amber:   "bg-amber-50 text-amber-600",
}
const valueStyle = {
  default: "text-[#0a2e24]",
  green:   "text-[#0d6b52]",
  amber:   "text-amber-600",
}

  return (
       <div className="animate-fade-in">
    <div className="page-header">
      <h1 className="page-title">Command Centre</h1>
      <p className="page-subtitle">Here's what's happening at your hospital today</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {stats.map((s) => (
        <div key={s.label}
          className="card card-hover p-5 relative overflow-hidden group flex items-center justify-between">
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full
            bg-slate-200 group-hover:bg-[#0d6b52] transition-colors duration-300"/>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-semibold ${valueStyle[s.color]}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 mt-1">{s.desc}</p>
          </div>
          <s.icon className={`size-10 p-2.5 rounded-xl transition-all duration-200 ${iconStyle[s.color]}`}/>
        </div>
      ))}
    </div>
  </div>
  )
}

export default AdminDashboard