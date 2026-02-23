import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  console.log("ENV URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("ENV KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}