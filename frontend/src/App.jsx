import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"

import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import Staff from "./pages/Staff"

import Attendance from "./pages/Attendance"
import Leave from "./pages/Leave"
import Payslip from "./pages/Payslip"

import Settings from "./pages/Settings"
import PrintPayslip from "./pages/PrintPayslip"
import LoginForm from "./components/LoginForm"


const App = () => {
  return (

    <>

      <Toaster/>

      <Routes>

        <Route path="/login" element={<LandingPage/>}/>

        <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Access Portal" subtitle="Manage hospital staff, shifts, and operations seamlessly."/>}/>

        <Route path="/login/staff" element={<LoginForm role="staff" title="Staff Login" subtitle="Access your shifts, attendance, and payslips."/>}/>
        
        <Route element={<Layout/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/staffs" element={<Staff/>}/>
            <Route path="/attendance" element={<Attendance/>}/>
            <Route path="/leave" element={<Leave/>}/>
            <Route path="/payslips" element={<Payslip/>}/>
            <Route path="/settings" element={<Settings/>}/>
        </Route>

            <Route path="/print/payslips/:id" element={<PrintPayslip/>}/>

            <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
        
      </Routes>

    </>

  )
}

export default App