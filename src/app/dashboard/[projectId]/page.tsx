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
    <div className="min-h-screen bg-linear-to-br from-[#f8f9fc] via-[#f3f4ff] to-[#eef2ff]">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#4f46e5]">
              {project.name}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Project workspace
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <Link
              href="/dashboard"
              className="text-sm text-neutral-600 hover:text-[#4f46e5] transition"
            >
              ← Back
            </Link>

            <form action={logout}>
              <button className="border border-neutral-300 bg-white text-neutral-700 px-4 py-2 rounded-md text-sm hover:bg-neutral-50 transition shadow-sm">
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Create Document */}
        <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm space-y-5">
          <h2 className="font-semibold text-neutral-800 text-lg">
            Add Document
          </h2>

          <form action={createDocument} className="space-y-4">
            <input type="hidden" name="projectId" value={projectId} />

            <textarea
              name="content"
              placeholder="Write something..."
              rows={5}
              className="w-full border border-neutral-300 bg-neutral-50 rounded-md p-4 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition"
            />

            <button className="bg-[#4f46e5] text-white px-6 py-3 rounded-md hover:bg-[#4338ca] transition shadow-md hover:shadow-lg">
              Add Document
            </button>
          </form>
        </div>

        {/* Documents */}
        <div className="space-y-6">

          {documents?.length === 0 && (
            <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center text-neutral-500 shadow-sm">
              <p className="text-sm">
                No documents yet.
              </p>
              <p className="text-xs mt-2 text-neutral-400">
                Add a document to generate your first AI summary.
              </p>
            </div>
          )}

          {documents?.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm space-y-6 hover:shadow-md transition"
            >
              <p className="text-neutral-800 whitespace-pre-wrap leading-relaxed">
                {doc.content}
              </p>

              {doc.ai_summary && (
                <div className="bg-[#eef2ff] border border-[#c7d2fe] rounded-lg p-5 text-sm text-neutral-700">
                  <p className="text-[#4f46e5] font-semibold">
                    AI Summary
                  </p>
                  <p className="mt-3 leading-relaxed">
                    {doc.ai_summary}
                  </p>
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
                    <button className="bg-[#4f46e5] text-white px-4 py-2 rounded-md hover:bg-[#4338ca] transition text-sm shadow-sm">
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
                  <button className="bg-[#ef4444] text-white px-4 py-2 rounded-md hover:bg-[#dc2626] transition text-sm shadow-sm">
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