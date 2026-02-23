import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Workspace | Secure AI Document SaaS",
  description:
    "AI Workspace is a secure multi-tenant SaaS built with Next.js, Supabase, and Gemini. Organize documents and generate AI-powered summaries with database-level security.",
  keywords: [
    "Next.js SaaS",
    "Supabase RLS",
    "AI Document Summary",
    "Gemini Integration",
    "Multi-tenant SaaS",
    "PostgreSQL Security",
  ],
  authors: [{ name: "Rishabh" }],
  creator: "Rishabh",
  metadataBase: new URL("https://ai-workspace-lemon.vercel.app"),
  openGraph: {
    title: "AI Workspace",
    description:
      "Secure AI-powered document workspace built with Next.js and Supabase.",
    url: "https://ai-workspace-lemon.vercel.app",
    siteName: "AI Workspace",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workspace",
    description:
      "Multi-tenant AI SaaS with Gemini integration and database-level security.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}