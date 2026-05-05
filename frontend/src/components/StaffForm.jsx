import  { useState } from 'react'
import {useNavigate} from "react-router-dom";
import { DEPARTMENTS } from '../assets/assets';
import { Loader2Icon } from 'lucide-react';

const StaffForm = ({initialData, onSuccess, onCancel}) => {

    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const isEditMode = !!initialData;
    const handleSubmit = async(e) => {
        e.preventDefault();
    }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-3xl animate-fade-in'>
        
        <div className='card p-5 sm:p-6'>
          <h3 className='font-medium mb-6 pb-4 border-b text-[#0a2e24] border-[#e2ede8]'>About the Member</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
            <div>
                <label className='block mb-2'>First Name </label>
                <input type="text" name='firstName' required defaultValue={initialData?.firstName}/>
            </div>

             <div>
                <label className='block mb-2'>Last Name </label>
                <input type="text" name='lastName' required defaultValue={initialData?.lastName}/>
            </div>

            <div>
                <label className='block mb-2'>Phone Number </label>
                <input name='phone' required defaultValue={initialData?.phone}/>
            </div>

             <div>
                <label className='block mb-2'>Join Date </label>
                <input type="date" name='joinDate' required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] : ""}/>
            </div>

            <div className='sm:col-span-2'>
                <label className='block mb-2'>Short Bio (Optional) </label>
                <textarea name='bio' defaultValue={initialData?.bio} rows={3} className='resize-none' placeholder='e.g. Senior nurse with 5 years in ICU'/>
            </div>

          </div>
        </div>



        <div className='card p-5 sm:p-6'>
          <h3 className='text-base font-medium text-[#0a2e24] mb-6 pb-4 border-b border-[#e2ede8]'>Role & Compensation</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
            <div>
                 <label className='block mb-2'>Department</label>
                 <select name="department" defaultValue={initialData?.department || ""}>
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((deptName) => (
                        <option key={deptName} value={deptName}>
                            {deptName}
                        </option>
                    ))}
                 </select>
            </div>

            <div>
                <label className='block mb-2'>Position</label>
                <input type="text" name='position' required defaultValue={initialData?.position}/>
            </div>

            <div>
                <label className='block mb-2'>Basic Salary</label>
                <input type="number" name='basicSalary' required defaultValue={initialData?.basicSalary || 0} min={0} step={0.01}/>
            </div>

            <div>
                <label className='block mb-2'>Allowances</label>
                <input type="number" name='allowances' required defaultValue={initialData?.allowances || 0} min={0} step={0.01}/>
            </div>

            <div>
                <label className='block mb-2'>Deductions</label>
                <input type="number" name='deductions' required defaultValue={initialData?.deductions || 0} min={0} step={0.01}/>
            </div>

            {
                isEditMode && (
            <div>
                <label className='block mb-2'>Status</label>
                <select  name='staffStatus' required defaultValue={initialData?.staffStatus}>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
            </div>
                )
            }

          </div>
        </div>


        <div className='card p-5 sm:p-6'>
          <h3 className='font-medium text-base text-[#0a2e24] mb-6 pb-4 border-b border-[#e2ede8]'>Access & Credentials</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
            <div className='sm:col-span-2'>
                <label className='block mb-2'>Hospital Email Address</label>
                <input type="email" name='email' required defaultValue={initialData?.email}/>
            </div>

            {!isEditMode && (
            <div>
                <label className='block mb-2'>Initial Password</label>
                <input type="password" name='password' required/>
            </div>
            )}

            {
                isEditMode && (
                <div>
                <label className='block mb-2'>Change Password</label>
                <input type="password" name='password' placeholder="Leave blank to keep existing password"/>
            </div>
                )
            }


             <div>
                <label className='block mb-2'>Role</label>
                <select name='role' defaultValue={initialData?.user?.role || "STAFF"}>
                      <option value="STAFF">STAFF</option>
                      <option value="EMPLOYEE">EMPLOYEE</option>
                </select>
            </div>

 
          </div>
        </div>


          <div className='flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2'>
             <button onClick={() => (onCancel ? onCancel() : navigate(-1))} type='button' className='btn-secondary cursor-pointer'>Cancel</button>
             <button type='submit' disabled={loading} className='btn-primary flex items-center justify-center cursor-pointer'>
                {loading && <Loader2Icon className='w-4 h-4 mr-2 animate-spin'/>}
                {isEditMode ? "Save Changes" : "Add to Team"}
             </button>
          </div>
         
    </form>
  )
}

export default StaffForm