import { Link } from "react-router-dom"
import LoginLeftSide from "./LoginLeftSide"
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { useState } from "react"

const LoginForm = ({role, title, subtitle}) => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[showPassword, setShowPassword] = useState(false);
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
          e.preventDefault();

    }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
         <LoginLeftSide/>
         <div className="flex flex-1 items-center justify-center p-6 sm:p-12 bg-white">
                <div className="w-full max-w-md animate-fade-in">
           <Link to="/login"className="inline-flex items-center gap-2 text-[#0d6b52] cursor-pointer text-sm font-medium mb-10 transition-colors">
              <div className="bg-[#f0f7f4] w-35 h-7 rounded-lg flex items-center justify-center shrink-0">
                <ArrowLeftIcon size={16}/> &nbsp; Back to Portals
              </div>
           </Link>

           <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-medium text-zinc-800">{title}</h1>
              <p className="text-slate-500 text-sm sm:text-base mt-2">{subtitle}</p>
           </div>

           {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"/>
                {error}
            </div>
           )}


           <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input type="email" value={email} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1a8064]" onChange={(e) => setEmail(e.target.value)} required placeholder="adam@example.com"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                 <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1a8064] pr-11" value={password} onChange={(e) => setPassword(e.target.value)}  required placeholder="*****"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/>}
                </button>
                 </div>
              </div>

             <button type="submit" disabled={loading} className="w-full py-3 bg-linear-to-r from-[#0a4a3a] to-[#0d6b52] text-white rounded-md 
             text-sm font-semibold cursor-pointer hover:from-[#0d6b52] hover:to-[#0d6b52] disabled:opacity-50 transition-all duration-200 shadow-lg shadow-[#0d6b529f] active:scale-[0.98] flex items-center justify-center">
               {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2"/>}
               {loading ? "Signing in..." : "Sign in"}
             </button>

           </form>

         </div>
         </div>
    
    </div>
  )
}

export default LoginForm