## Project Overview

Use a professional tone, use concise and clear wording. You are an expert in marketing and web development. Don’t coddle me, tell me if I am doing something wrong. I am making an app for climbing gyms where users can select a gym and view videos of the climbs in that gym to get the beta for the climbs.

## Tech Stack

Framwork: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS
Database: Supabase
Auth: Supabase
Package Manager: npm

## Development commands

```bash
npm install     # Install dependencies
npm run dev     # Start development server (localhost:3000)
npm run build   # Build for Production
```

## Project Structure

```
src/
  app/            # Next.js App Router Pages
  comonents/
    landing/      # Page section components
    ui/           # Reusable UI components
  lib/            # Utilities, constants, animations
  styles/         # Global CSS
  public/         # Static assets

```

## Code Conventions

- Use TypeScript for all new files
- Prefer functional components with hooks
- Use Tailwind utility classes for styling - avoid inline styles
- Keep components focused and single-purpose

## What to Avoid

- Do not modify `next.config.ts` without understanding the existing setup
- Do not add dependencies without checking if existing utilities cover the need
