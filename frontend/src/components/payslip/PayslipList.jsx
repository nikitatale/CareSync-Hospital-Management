import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Download, ReceiptText } from 'lucide-react'

const PayslipList = ({ payslips, isAdmin }) => {
  return (
    <motion.div
      className='card overflow-hidden'
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}>

  
      <div className='px-6 py-4 border-b border-[#e2ede8] flex items-center justify-between'>
        <div>
          <h3 className='font-semibold text-[#0a2e24]'>
            {isAdmin ? "All Payslips" : "Salary History"}
          </h3>
          <p className='text-xs text-slate-400 mt-0.5'>
            {isAdmin ? "Every generated payslip across all staff" : "Your month-wise salary breakdown"}
          </p>
        </div>
        <span className='text-xs font-medium px-2.5 py-1 bg-[#e8f5f0] text-[#0d6b52] rounded-full'>
          {payslips.length} records
        </span>
      </div>

      <div className='overflow-x-auto'>
        <table className='table-modern'>
          <thead>
            <tr>
              {isAdmin && <th>Staff Member</th>}
              <th>Pay Period</th>
              <th>Basic Salary</th>
              <th>Net Payout</th>
              <th className='text-center'>Download</th>
            </tr>
          </thead>
          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className='text-center py-16 text-slate-400'>
                  No payslips generated yet — run your first payroll!
                </td>
              </tr>
            ) : (
              payslips.map((payslip, index) => (
                <motion.tr
                  key={payslip._id || payslip.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}>

                  {isAdmin && (
                    <td className='px-6 py-4 font-medium text-[#0a2e24]'>
                      {payslip.staff?.firstName} {payslip.staff?.lastName}
                    </td>
                  )}

                  <td className='px-6 py-4 text-[#0a2e24]'>
                    {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                  </td>

                  <td className='px-6 py-4 text-[#0a2e24]'>
                    ${payslip.basicSalary?.toLocaleString()}
                  </td>

                  <td className='px-6 py-4'>
                    <span className='font-semibold text-[#0d6b52]'>
                      ${payslip.netSalary?.toLocaleString()}
                    </span>
                  </td>

                  <td className='px-6 py-4 text-center'>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(`/print/payslips/${payslip._id || payslip.id}`)}
                      className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                        text-[#0d6b52] cursor-pointer bg-[#e8f5f0] hover:bg-[#d4ede6]
                        transition-colors ring-1 ring-[#0d6b52]/15'>
                      <Download className='w-3 h-3'/> Download
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default PayslipList