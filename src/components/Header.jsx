import { LogOut, User } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <header className="bg-[#121212] border-b border-[#2a2a2a] text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-[25px] text-white">
        Devmarks
      </Link>

      <div className="flex gap-4 items-center">

        {user && (
          <>
            <div className="flex items-center gap-2 pr-2 border-r border-zinc-700">
              <User className="w-6 h-6 text-gray-400" />
              <span className="hidden sm:block text-sm text-gray-300">
                {user.user_metadata.full_name || user.email}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </header>
  )
}
