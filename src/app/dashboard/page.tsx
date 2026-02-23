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
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="max-w-4xl mx-auto p-10 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#4f46e5]">Dashboard</h1>
            <p className="text-sm text-neutral-600 mt-1">{user.email}</p>
          </div>

          <form action={logout}>
            <button className="border border-neutral-300 text-gray-950 px-4 py-2 rounded-md text-sm hover:bg-neutral-500 transition">
              Logout
            </button>
          </form>
        </div>

        {/* Create Project Card */}
        <div className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-neutral-700">Create New Project</h2>

          <form action={createProject} className="flex gap-3">
            <input
              name="name"
              placeholder="Project name"
              className="flex-1 border text-gray-900 border-neutral-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
            />
            <button className="bg-[#4f46e5] text-white px-5 py-3 rounded-md hover:bg-[#4338ca] transition">
              Create
            </button>
          </form>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects?.length === 0 && (
            <div className="bg-white border rounded-lg p-6 text-center text-neutral-500">
              No projects yet.
            </div>
          )}

          {projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white border rounded-lg p-6 shadow-sm flex justify-between items-center"
            >
              <Link
                href={`/dashboard/${project.id}`}
                className="font-semibold text-neutral-800 hover:text-[#4f46e5] transition"
              >
                {project.name}
              </Link>

              <form action={deleteProject}>
                <input type="hidden" name="projectId" value={project.id} />
                <button className="bg-[#ef4444] text-white px-3 py-1 rounded-md hover:bg-[#dc2626] transition text-sm">
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
