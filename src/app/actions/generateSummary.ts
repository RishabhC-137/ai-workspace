'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { generateSummary } from '@/lib/ai/gemini'

export async function generateDocumentSummary(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const documentId = formData.get('documentId') as string

  const { data: document } = await supabase
    .from('documents')
    .select('*')
    .eq('id', documentId)
    .single()

  if (!document) return

  const summary = await generateSummary(document.content)

  await supabase
    .from('documents')
    .update({ ai_summary: summary })
    .eq('id', documentId)

  redirect(`/dashboard/${document.project_id}`)
}