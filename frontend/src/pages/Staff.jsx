import { useCallback, useEffect, useState } from "react"
import { DEPARTMENTS } from "../assets/assets";
import {Plus, Search, X} from "lucide-react";
import StaffCard from "../components/StaffCard";
import StaffForm from "../components/StaffForm";
import api from "../api/axios";


const Staff = () => {

   const[staffs, setStaffs] = useState([]);
   const[loading, setLoading] = useState(true); 
   const[search, setSearch] = useState("");
   const[selectDept, setSelectDept] = useState("");
   const[editStaff, setEditStaff] = useState(null);
   const[showCreateModal, setShowCreateModal] = useState(false);


   const fetchStaffs = useCallback(async() => {
      try {
        const url = selectDept ? `/staffs?department=${selectDept}` : "/staffs";
        const res = await api.get(url);
        setStaffs(res.data);
      } catch (error) {
        console.error("Failed to fetch staffs", error);
      } finally{
        setLoading(false);
      }
   },[selectDept])

   useEffect(() => {
    fetchStaffs();
   }, [fetchStaffs])


   const filtered = staffs.filter((emp) => `${emp.firstName} ${emp.lastName} ${emp.position}`.toLowerCase().includes(search.toLowerCase()))


  return (
    <div className="animate-fade-in">

   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div>
       <h1 className="page-title text-2xl font-semibold text-[#0a2e24] tracking-tight">Care Team</h1>
       <p className="page-subtitle">Everyone keeping the hospital running</p>
    </div>

 <button onClick={() => setShowCreateModal(true)} className="btn-primary flex cursor-pointer items-center gap-2 w-full sm:w-auto justify-center">
  <Plus size={16}/> Add Member
 </button>
   </div>

    <div className="flex flex-col sm:flex-row gap-3 mb-6">
       <div className="relative flex-1">
         <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h4"/>
         <input type="text" placeholder="Search by name or role..." className="w-full pl-10!" onChange={(e) => setSearch(e.target.value)} value={search}/>
       </div>
       <select value={selectDept} onChange={(e) => setSelectDept(e.target.value)} className="max-w-40 cursor-pointer">
               <option value="">All Departments</option>
               {
                DEPARTMENTS.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))
               }
       </select>
    </div>


      {loading ? (
      <div className='flex justify-center p-12'>
      <div className='animate-spin h-8 w-8 border-2 border-[#0d2e26] border-t-transparent rounded-full'/>
    </div>
      ): (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
           {filtered.length === 0 ? (
            <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
              No team members found for this filter
            </p>
           ) : (
            filtered.map((staff)=> <StaffCard key={staff.id} staffs={staff} onDelete={fetchStaffs} onEdit={(e) => setEditStaff(e)}/>)
           )}
        </div>
      )}
     
 
      
      {showCreateModal && (
          <div className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowCreateModal(false)}>

            <div className="fixed inset-0"/>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in" onClick={(e) => e.stopPropagation()}>
              
              <div className="flex items-center justify-between p-6 pb-0">
                   <div>
                     <h2 className="text-lg font-semibold text-slate-900">Onboard New Member</h2>
                     <p className="text-sm text-slate-500 mt-0.5">Set up access and details for a new hire</p>
                   </div>
                   <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-lg hover:bg-[#f4f7f5] cursor-pointer transition-colors text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5"/>
                   </button>
              </div>

              <div className="p-6">
                <StaffForm onSuccess={() => {setShowCreateModal(false); fetchStaffs(); }} onCancel={() => setShowCreateModal(false)}/>
              </div>

            </div>
          </div>
      )}


        {editStaff && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm" onClick={() => setEditStaff(null)}>
            
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 pb-0 ">
               <div>
                     <h2 className="text-lg font-semibold text-[#0a2e24]">Update Member Profile</h2>
                     <p className="text-sm text-slate-500 mt-0.5">Make changes to this member's role or info</p>
                   </div>
                   <button onClick={() => setEditStaff(null)} className="p-2 rounded-lg hover:bg-[#f4f7f5] cursor-pointer transition-colors text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5"/>
                   </button>
              </div>

              <div className="p-6">
                   <StaffForm initialData={editStaff} onSuccess={() => {setEditStaff(null); fetchStaffs(); }} onCancel={() => setEditStaff(null)}/>
              </div>

            </div>

          </div>
        )}

    </div>
  )
}

export default Staff