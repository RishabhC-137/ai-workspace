'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleLogin = async () => {
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fc] via-[#f3f4ff] to-[#eef2ff] px-4">
      <div className="bg-white p-10 rounded-xl shadow-md border border-neutral-200 w-full max-w-md space-y-8">

        {/* Badge */}
        <div className="text-center">
          <div className="inline-block px-4 py-1 text-xs font-medium bg-[#eef2ff] text-[#4f46e5] rounded-full border border-[#e0e7ff] mb-4">
            AI Workspace
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#4f46e5]">
            Welcome Back
          </h1>

          <p className="text-sm text-neutral-500 mt-2">
            Log in to continue working on your projects.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <input
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border text-gray-900 border-neutral-300 rounded-md p-3 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border text-gray-900 border-neutral-300 rounded-md p-3 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#4f46e5] text-white py-3 rounded-md hover:bg-[#4338ca] transition shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* Inline Message */}
        {message && (
          <div className="text-sm text-center text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-md p-3">
            {message}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-neutral-600">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="text-[#4f46e5] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>

        {/* Trust Note */}
        <p className="text-xs text-center text-neutral-400">
          Secure authentication · Private by default
        </p>

      </div>
    </div>
  )
}