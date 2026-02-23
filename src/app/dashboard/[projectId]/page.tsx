import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { createDocument } from '@/app/actions/createDocument'
import { generateDocumentSummary } from '@/app/actions/generateSummary'
import { deleteDocument } from '@/app/actions/deleteDocument'
import { logout } from '@/app/actions/logout'
import Link from 'next/link'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (!project) return <div className="p-10">Not found</div>

  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="max-w-4xl mx-auto p-10 space-y-8">

        {/* Header */}
       <div className="flex justify-between items-center">
  <h1 className="text-3xl font-bold text-[#4f46e5]">
    {project.name}
  </h1>

  <div className="flex gap-4 items-center">
    <Link
      href="/dashboard"
      className="text-sm text-neutral-600 hover:text-[#4f46e5]"
    >
      ← Back
    </Link>

    <form action={logout}>
      <button className="border border-neutral-300 text-gray-950 px-4 py-2 rounded-md text-sm hover:bg-neutral-500 transition">
              Logout
            </button>
    </form>
  </div>
</div>

        {/* Create Document */}
        <div className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-neutral-700">
            Add Document
          </h2>

          <form action={createDocument} className="space-y-3">
            <input type="hidden" name="projectId" value={projectId} />

            <textarea
              name="content"
              placeholder="Write something..."
              className="w-full border text-gray-500 border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
            />

            <button className="bg-[#4f46e5] text-white px-4 py-2 rounded-md hover:bg-[#4338ca] transition">
              Add Document
            </button>
          </form>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {documents?.length === 0 && (
            <div className="bg-white border rounded-lg p-6 text-center text-neutral-500">
              No documents yet.
            </div>
          )}

          {documents?.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border rounded-lg p-6 shadow-sm space-y-4"
            >
              <p className="text-neutral-800 whitespace-pre-wrap">
                {doc.content}
              </p>

              {doc.ai_summary && (
                <div className="bg-[#eef2ff] border border-[#c7d2fe] rounded-md p-4 text-sm text-neutral-700">
                  <strong className="text-[#4f46e5]">
                    AI Summary:
                  </strong>
                  <p className="mt-2">{doc.ai_summary}</p>
                </div>
              )}

              <div className="flex gap-3">
                {!doc.ai_summary && (
                  <form action={generateDocumentSummary}>
                    <input
                      type="hidden"
                      name="documentId"
                      value={doc.id}
                    />
                    <button className="bg-[#4f46e5] text-white px-3 py-1 rounded-md hover:bg-[#4338ca] transition text-sm">
                      Generate Summary
                    </button>
                  </form>
                )}

                <form action={deleteDocument}>
                  <input
                    type="hidden"
                    name="documentId"
                    value={doc.id}
                  />
                  <input
                    type="hidden"
                    name="projectId"
                    value={projectId}
                  />
                  <button className="bg-[#ef4444] text-white px-3 py-1 rounded-md hover:bg-[#dc2626] transition text-sm">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}