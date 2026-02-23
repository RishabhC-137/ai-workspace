import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fc] text-neutral-900">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-neutral-200 bg-white/70 backdrop-blur">
        <h1 className="text-xl font-semibold tracking-tight text-[#4f46e5]">
          AI Workspace
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-600 py-2 hover:text-[#4f46e5] transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-[#4f46e5] text-white px-4 py-2 rounded-md text-sm hover:bg-[#4338ca] transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
          Organize your thoughts.
          <br />
          <span className="text-[#4f46e5]">
            Let AI summarize them.
          </span>
        </h2>

        <p className="mt-6 text-neutral-600 max-w-xl text-lg">
          Create projects, add documents, and generate AI-powered summaries
          instantly. Simple. Secure. Private.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="bg-[#4f46e5] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#4338ca] transition"
          >
            Start Free
          </Link>

          <Link
            href="/login"
            className="border border-neutral-300 px-6 py-3 rounded-md text-sm font-medium hover:bg-white transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="px-10 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-semibold mb-2 text-[#4f46e5]">
              Project Based
            </h3>
            <p className="text-sm text-neutral-600">
              Organize documents inside clean project spaces.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-semibold mb-2 text-[#4f46e5]">
              Secure by Design
            </h3>
            <p className="text-sm text-neutral-600">
              Row Level Security ensures data isolation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="font-semibold mb-2 text-[#4f46e5]">
              AI Powered
            </h3>
            <p className="text-sm text-neutral-600">
              Generate summaries instantly using Gemini.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-neutral-500 border-t border-neutral-200 bg-white/60 backdrop-blur">
        © {new Date().getFullYear()} AI Workspace
      </footer>
    </main>
  )
}