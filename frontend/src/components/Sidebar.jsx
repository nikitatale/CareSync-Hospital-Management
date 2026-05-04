import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dummyProfileData } from '../assets/assets';
import {
  CalendarIcon, ChevronRightIcon, DollarSignIcon,
  FileTextIcon, LayoutGridIcon, LogOutIcon,
  MenuIcon, SettingsIcon, UserIcon, XIcon
} from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const role = "" || "STAFF"

  const navItems = [
    { name: "Dashboard",  href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Staff",      href: "/staffs",      icon: UserIcon }
      : { name: "Attendance", href: "/attendance",  icon: CalendarIcon },
    { name: "Leave",     href: "/leave",     icon: FileTextIcon },
    { name: "Payslips",  href: "/payslips",  icon: DollarSignIcon },
    { name: "Settings",  href: "/settings",  icon: SettingsIcon },
  ]

  const handleLogout = () => { window.location.href = "/login" }

  const sidebarContent = (
    <>
    
      <div className="px-4 pt-5 pb-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(93,202,165,0.12)", border: "1px solid rgba(93,202,165,0.2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#5dcaa5" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M12 12v5M12 12l4-2.5M12 12l-4-2.5" stroke="#5dcaa5" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-200 tracking-wide">CareSync</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Hospital Management</p>
            </div>
          </div>
          <button aria-label="Close menu" onClick={() => setMobileMenu(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1">
            <XIcon size={18}/>
          </button>
        </div>
      </div>

    
      {userName && (
        <div className="mx-2.5 mt-3 mb-1 p-2.5 rounded-lg"
          style={{ background: "rgba(93,202,165,0.05)", border: "1px solid rgba(93,202,165,0.08)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "#0d2e26", border: "1px solid rgba(93,202,165,0.15)" }}>
              <span className="text-[#5dcaa5] text-xs font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-slate-300 truncate">{userName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5dcaa5]"></div>
                <p className="text-[10px] text-[#5dcaa5] font-medium">
                  {role === "ADMIN" ? "Administrator" : "Staff"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

     
      <div className="px-4 pt-4 pb-1.5">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-[0.12em]">
          Navigation
        </p>
      </div>

      
      <div className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link key={item.name} to={item.href}
              className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 relative
                ${isActive
                  ? "text-[#5dcaa5]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              style={isActive ? { background: "rgba(93,202,165,0.08)" } : {}}>

            
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#5dcaa5]"/>
              )}

              <item.icon className={`w-[16px] h-[16px] shrink-0 transition-colors
                ${isActive ? "text-[#5dcaa5]" : "text-slate-500 group-hover:text-slate-300"}`}/>

              <span className="flex-1">{item.name}</span>

              {isActive && (
                <ChevronRightIcon className="w-3 h-3 text-[#5dcaa5]/50"/>
              )}
            </Link>
          )
        })}
      </div>

     
      <div className="p-2 border-t border-white/5">
        <button onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium
            text-slate-500 hover:text-rose-400 transition-all duration-150 cursor-pointer"
          style={{ '--hover-bg': 'rgba(248,113,113,0.06)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <LogOutIcon className="w-[16px] h-[16px]"/>
          <span>Log out</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      
      <button aria-label="Open menu" onClick={() => setMobileMenu(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg"
        style={{ background: "#0b1f1a", border: "1px solid rgba(255,255,255,0.08)" }}>
        <MenuIcon size={18} className="text-white"/>
      </button>

     
      {mobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileMenu(false)}/>
      )}

      
      <aside className="hidden lg:flex flex-col h-full w-[240px] shrink-0"
        style={{ background: "#0b1f1a", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        {sidebarContent}
      </aside>

   
      <aside className={`lg:hidden fixed inset-y-0 left-0 w-64 z-50 flex flex-col transform transition-transform duration-300
        ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#0b1f1a" }}>
        {sidebarContent}
      </aside>
    </>
  )
}

export default Sidebar