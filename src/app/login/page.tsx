'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
      <div className="bg-white p-8 rounded-lg shadow-sm border w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#4f46e5]">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border text-gray-900 border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border text-gray-900 border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#4f46e5] text-white py-3 rounded-md hover:bg-[#4338ca] transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="text-sm text-center text-neutral-600">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-[#4f46e5] font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}