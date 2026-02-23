'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const name = formData.get('name') as string

  await supabase.from('projects').insert({
    name,
    user_id: user.id,
  })

  redirect('/dashboard')
}