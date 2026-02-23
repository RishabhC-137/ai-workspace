'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function deleteDocument(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const documentId = formData.get('documentId') as string
  const projectId = formData.get('projectId') as string

  // Delete only if it belongs to this user (RLS will also enforce)
  await supabase
    .from('documents')
    .delete()
    .eq('id', documentId)
    .eq('user_id', user.id)

  redirect(`/dashboard/${projectId}`)
}