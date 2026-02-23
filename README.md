# AI Workspace – Multi-Tenant AI SaaS

**Live Demo:**  
https://ai-workspace-lemon.vercel.app/

---

## Overview

AI Workspace is a production-ready SaaS application that allows users to:

- Create projects  
- Manage documents  
- Generate AI-powered summaries  
- Keep all data securely isolated per user  

This project demonstrates how to build a secure, scalable AI-enabled SaaS platform using modern full-stack architecture.

---

## What This Project Demonstrates

This is not just a UI demo. It demonstrates:

- Multi-tenant SaaS architecture  
- Database-level security enforcement  
- Server-side AI integration  
- Clean separation of business logic  
- Production deployment  

---

## Tech Stack

### Frontend & Server
- Next.js (App Router)
- TypeScript
- Server Actions

### Database & Authentication
- Supabase (PostgreSQL)
- Row Level Security (RLS)

### AI Integration
- Google Gemini API (server-side only)

### Deployment
- Vercel

---

## Security & Architecture Highlights

### Server-First Design

All sensitive operations run server-side:

- Authentication validation  
- Database writes  
- AI API calls  

No API keys are exposed to the client.

---

### Multi-Tenant Isolation

Each user shares the same database but can only access their own data.

Security is enforced at the database level using PostgreSQL Row Level Security policies:

```sql
auth.uid() = user_id
```

Even if frontend logic fails, the database prevents cross-user access.

---

### AI Integration

AI logic is abstracted into:

```
/lib/ai/gemini.ts
```

This allows:

- Easy provider replacement  
- Clean architecture  
- Maintainable codebase  
- Isolated business logic  

---

## Example Data Flow (Summary Generation)

1. User clicks “Generate Summary”  
2. Server validates session  
3. Database fetches document (RLS enforced)  
4. Gemini API is called server-side  
5. Summary is stored in database  
6. UI updates automatically  

No client-side AI calls are made.

---

## Database Design

### projects

- id (UUID)  
- user_id (UUID)  
- name (Text)  
- created_at (Timestamp)  

### documents

- id (UUID)  
- project_id (UUID)  
- user_id (UUID)  
- content (Text)  
- ai_summary (Text)  
- created_at (Timestamp)  

---

## Local Setup

```bash
npm install
npm run dev
```

Required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
```

---

## Possible Extensions

- Stripe subscription tiers  
- AI usage limits  
- Background job queues  
- Team collaboration  
- Role-based access control  
- Audit logging  

---

## Purpose

This project demonstrates the ability to:

- Architect secure SaaS systems  
- Enforce authorization at the database level  
- Integrate AI securely server-side  
- Deploy scalable full-stack applications  

It serves as a foundation for building real-world AI SaaS platforms.