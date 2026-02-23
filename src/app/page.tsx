import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-[#f8f9fc] via-[#f3f4ff] to-[#eef2ff] text-neutral-900">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-neutral-200 bg-white/70 backdrop-blur-md">
        <h1 className="text-xl font-semibold tracking-tight text-[#4f46e5]">
          AI Workspace
        </h1>

        <div className="flex gap-4 items-center">
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-600 py-2 hover:text-[#4f46e5] transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-[#4f46e5] text-white px-4 py-2 rounded-md text-sm hover:bg-[#4338ca] transition shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-36">

        {/* Small Badge */}
        <div className="mb-6 px-4 py-1 text-xs font-medium bg-[#eef2ff] text-[#4f46e5] rounded-full border border-[#e0e7ff]">
          AI-Powered Document Workspace
        </div>

        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight tracking-tight">
          Organize your thoughts.
          <br />
          <span className="text-[#4f46e5]">
            Let AI summarize them.
          </span>
        </h2>

        <p className="mt-6 text-neutral-600 max-w-xl text-lg leading-relaxed">
          Create structured projects, manage documents securely, and generate
          AI-powered summaries in seconds. Built with modern architecture
          and secure multi-tenant isolation.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="bg-[#4f46e5] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#4338ca] transition shadow-md hover:shadow-lg"
          >
            Start Free
          </Link>

          <Link
            href="/login"
            className="border border-neutral-300 px-6 py-3 rounded-md text-sm font-medium bg-white hover:bg-neutral-50 transition"
          >
            Login
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-xs text-neutral-500">
          Secure authentication · Database-level isolation · Server-side AI
        </p>
      </section>

      {/* Feature Section */}
      <section className="px-10 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-3 text-[#4f46e5] text-lg">
              Project-Based Organization
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Structure your documents inside clean project spaces for
              clarity and focus.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-3 text-[#4f46e5] text-lg">
              Secure by Design
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Row Level Security ensures strict user-level data isolation
              enforced directly in the database.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-3 text-[#4f46e5] text-lg">
              AI-Powered Summaries
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Generate concise summaries instantly using Google Gemini,
              securely executed on the server.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-neutral-500 border-t border-neutral-200 bg-white/60 backdrop-blur">
        © {new Date().getFullYear()} AI Workspace · Built with Next.js & Supabase
      </footer>
    </main>
  )
}