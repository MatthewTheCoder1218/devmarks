import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      navigate('/home') // go to home after login
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1e1e1e] to-[#0f0f0f] px-4">
    <div className="w-full max-w-md bg-[#141414] border border-[#2a2a2a] p-8 rounded-2xl shadow-xl">
    <h2 className="text-3xl font-semibold text-white mb-6 text-center">Welcome back</h2>

    {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

    <form onSubmit={handleLogin}>

    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f] border border-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f] border border-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button
      type="submit"
      className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium transition duration-200"
    >
      Login
    </button>
    <p className="text-sm text-gray-400 mt-4 text-center">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
        </Link>
    </p>

</form>

  </div>
</div>

  )
}

export default Login
