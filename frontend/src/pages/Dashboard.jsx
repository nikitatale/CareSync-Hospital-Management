import { useEffect, useState } from "react"
import { dummyAdminDashboardData, dummyStaffDashboardData } from "../assets/assets";
import Loading from "../components/Loading";
import StaffDashboard from "../components/StaffDashboard";
import AdminDashboard from "../components/AdminDashboard";

const Dashboard = () => {

  const[data, setData] = useState(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyAdminDashboardData)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  if(loading) return <Loading/>
  if(!data) return <p className="text-center text-slate-500 py-12">Failed to load dashboard data</p>

  if(data.role === "ADMIN"){
      return <AdminDashboard data={data}/>
  } else{
    return <StaffDashboard data={data}/>
  }
}

export default Dashboard