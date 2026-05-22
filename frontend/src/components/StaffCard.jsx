import { Pencil, Trash2Icon } from 'lucide-react'
import { motion } from 'framer-motion'
import api from '../api/axios';
import toast from 'react-hot-toast';

const StaffCard = ({ staffs, onDelete, onEdit, index = 0 }) => {

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
      await api.delete(`/staffs/${staffs.id}`)
      onDelete();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1, y: 0,
          transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }
        }
      }}
      initial="hidden"
      animate="show"
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className='group relative card overflow-hidden'
    >
  
      <div className='relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-[#0d6b52] to-[#269772]'>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='w-20 h-20 rounded-full bg-linear-to-br from-[#97d3c2] to-[#72d1b8] flex items-center justify-center'>
            <span className='text-2xl font-medium text-[#0d6b52]'>
              {staffs.firstName[0]}{staffs.lastName[0]}
            </span>
          </div>
        </div>
      </div>

 
      <div className='absolute top-3 left-3 flex gap-2'>
        <span className='bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-600 rounded-lg shadow-sm'>
          {staffs.department || "Remote"}
        </span>
        {staffs.isDeleted && (
          <span className='bg-red-500/60 font-medium text-white px-2.5 py-1 text-xs rounded'>
            DELETED
          </span>
        )}
      </div>

 
      {!staffs.isDeleted && (
        <div className='absolute inset-0 bg-linear-to-t from-[#074230] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3'>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(staffs)}
            className='p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-[#0d6b52] rounded-xl shadow-lg cursor-pointer'>
            <Pencil className='w-5 h-5' />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className='p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-red-600 rounded-xl shadow-lg cursor-pointer'>
            <Trash2Icon className='w-5 h-5' />
          </motion.button>
        </div>
      )}

   
      <div className='p-5'>
        <h3 className='text-slate-900 font-medium'>{staffs.firstName} {staffs.lastName}</h3>
        <p className='text-xs text-slate-500 mt-0.5'>{staffs.position}</p>
      </div>
    </motion.div>
  )
}

export default StaffCard