import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createProject } from "@/app/actions/createProject";
import { deleteProject } from "@/app/actions/deleteProject";
import { logout } from "@/app/actions/logout";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f9fc] via-[#f3f4ff] to-[#eef2ff]">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#4f46e5]">
              Dashboard
            </h1>
            <p className="text-sm text-neutral-600 mt-2">
              {user.email}
            </p>
          </div>

          <form action={logout}>
            <button className="border border-neutral-300 bg-white text-neutral-700 px-4 py-2 rounded-md text-sm hover:bg-neutral-50 transition shadow-sm">
              Logout
            </button>
          </form>
        </div>

        {/* Create Project */}
        <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm space-y-5">
          <h2 className="font-semibold text-neutral-800 text-lg">
            Create New Project
          </h2>

          <form action={createProject} className="flex gap-3">
            <input
              name="name"
              placeholder="Enter project name..."
              className="flex-1 border text-gray-900 border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] bg-neutral-50"
            />
            <button className="bg-[#4f46e5] text-white px-6 py-3 rounded-md hover:bg-[#4338ca] transition shadow-md hover:shadow-lg">
              Create
            </button>
          </form>
        </div>

        {/* Projects */}
        <div className="space-y-4">

          {projects?.length === 0 && (
            <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center text-neutral-500 shadow-sm">
              <p className="text-sm">
                No projects yet.
              </p>
              <p className="text-xs mt-2 text-neutral-400">
                Create your first project to start organizing documents.
              </p>
            </div>
          )}

          {projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <Link
                href={`/dashboard/${project.id}`}
                className="font-semibold text-neutral-800 hover:text-[#4f46e5] transition"
              >
                {project.name}
              </Link>

              <form action={deleteProject}>
                <input type="hidden" name="projectId" value={project.id} />
                <button className="bg-[#ef4444] text-white px-4 py-2 rounded-md hover:bg-[#dc2626] transition text-sm shadow-sm">
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}