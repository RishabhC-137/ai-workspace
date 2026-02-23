'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createDocument(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const projectId = formData.get('projectId') as string
  const content = formData.get('content') as string

  await supabase.from('documents').insert({
    project_id: projectId,
    user_id: user.id,
    content,
  })

  redirect(`/dashboard/${projectId}`)
}