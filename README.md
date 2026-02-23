# AI Workspace SaaS

A production-structured, multi-tenant SaaS application built with:

- Next.js (App Router + TypeScript)
- Supabase (PostgreSQL + Row Level Security)
- Anthropic Claude API
- Vercel deployment

This project demonstrates secure multi-user isolation, server-side AI integration, and database-enforced authorization.

---

# Architecture Overview

## Stack

- Frontend & Server Framework: Next.js (App Router)
- Database & Auth: Supabase (PostgreSQL + RLS)
- AI Provider: Anthropic Claude
- Hosting: Vercel

---

# System Design Principles

## Server-First Architecture

All sensitive operations (authentication validation, database writes, AI calls) execute server-side using Next.js Server Actions.

No external API keys are exposed to the client.

---

## Multi-Tenant Isolation

This is a shared database system where multiple users exist in the same database, but each user only sees their own data.

Isolation is enforced at the database level using PostgreSQL Row Level Security (RLS).

---

## Database-Level Authorization

Instead of filtering data in the frontend like:

.where('user_id', user.id)

Authorization is enforced directly in PostgreSQL using:

using (auth.uid() = user_id)

This prevents data leaks even if frontend logic fails.

---

## Defense in Depth

Security is enforced at multiple layers:

- Server assigns ownership (user_id)
- RLS enforces row ownership
- Foreign key constraints enforce relational integrity
- Secrets remain server-only
- AI integration abstracted behind service layer

---

# Database Schema

## projects

| Column      | Type      | Description |
|-------------|-----------|-------------|
| id          | UUID      | Primary key |
| user_id     | UUID      | Owner reference |
| name        | Text      | Project name |
| created_at  | Timestamp | Creation time |

## documents

| Column      | Type      | Description |
|-------------|-----------|-------------|
| id          | UUID      | Primary key |
| project_id  | UUID      | Project relation |
| user_id     | UUID      | Owner reference |
| content     | Text      | Original content |
| ai_summary  | Text      | Claude-generated summary |
| created_at  | Timestamp | Creation time |

---

# Security Model

## Authentication

- Supabase Auth
- JWT stored in HttpOnly cookies
- Session validated server-side on protected routes

## Authorization

PostgreSQL Row Level Security enabled with policies:

auth.uid() = user_id

## Secret Management

- Claude API key stored in environment variables
- Never exposed to client
- AI calls executed only server-side

---

# AI Integration

Claude integration is abstracted inside:

/lib/ai/claude.ts

Server actions call this service layer, keeping business logic separate from provider implementation.

This allows:

- Easy provider swap (Claude → OpenAI)
- Cleaner architecture
- Isolated testing
- Maintainable codebase

---

# Example Data Flow (Summary Generation)

1. User clicks "Generate Summary"
2. Server action validates session
3. Database fetches document (RLS enforced)
4. Claude API called server-side
5. Summary stored in database
6. Updated UI rendered

No client-side API calls.

---

# Folder Structure

src/
  app/
    login/
    dashboard/
      [projectId]/
    actions/
  lib/
    supabase/
    ai/

---

# Local Development

npm install  
npm run dev  

Required environment variables:

NEXT_PUBLIC_SUPABASE_URL=  
NEXT_PUBLIC_SUPABASE_ANON_KEY=  
ANTHROPIC_API_KEY=  

---

# Future Improvements

- AI rate limiting
- Idempotent summary generation
- Stripe subscription tiers
- Background job queue for long-running AI tasks
- Optimistic UI updates
- Improved error handling

---

# Purpose

This project demonstrates:

- Multi-tenant SaaS architecture
- Database-enforced security
- Server-side AI integration
- Production-ready full-stack design

It is structured as a scalable foundation for AI-enabled SaaS platforms.
