# Kenya Issues

A county-level civic issue reporting app. Citizens report problems (roads,
water, electricity, waste, health, education, security) by county,
constituency, and ward; admins triage them from a dashboard.

Originally scaffolded with [Lovable](https://lovable.dev), then extended with
Firebase and an AI categorization service.

## Project structure

This repo has two parts that run separately:

- **/** — the Vite + React + TypeScript frontend (talks to Firebase directly
  from the browser for auth and Firestore).
- **/server** — a small Express service that calls OpenAI to auto-suggest a
  category and clean up a description. The frontend calls it at `/api/*`.

## Setup

1. Install frontend dependencies: `npm install`
2. Install server dependencies: `npm install --prefix server`
3. Copy `.env.example` to `.env` and fill in your Firebase web app config
   (Firebase console → Project settings → General → Your apps).
4. Copy `server/.env.example` to `server/.env` and fill in an OpenAI API key.

## Running locally

- `npm run dev` — frontend only, at http://localhost:8080
- `npm run server` — AI service only, at http://localhost:5000
- `npm run dev:all` — both together (requires step 2 above; uses `concurrently`)

In dev, Vite proxies `/api/*` to `localhost:5000` (see `vite.config.ts`), so
the frontend's AI Categorize / AI Enhance buttons work as long as `npm run
server` (or `dev:all`) is running.

## Making someone an admin

There's no self-service admin signup. In the Firebase console, open
Firestore → `users` → the person's document, and set `role: "admin"`. The
`/admin` section checks this field (`src/hooks/useUserRole.ts`,
`src/components/AdminRoute.tsx`) — without it, a user can sign in but can't
reach any `/admin/*` route.

## Deploying

The two parts deploy independently:

- **Frontend**: `npm run build` produces a static `dist/` folder — deploy it
  to Vercel, Netlify, Firebase Hosting, or similar. Set the `VITE_*`
  variables from `.env` in that platform's environment settings.
- **Server**: needs a host that runs a persistent Node process (Render,
  Railway, Fly.io, a VPS — not a static host). Set `OPENAI_API_KEY` there
  as a platform secret, not a committed file.
- If the two end up on different domains, set `VITE_API_URL` (see
  `.env.example`) on the frontend to the server's full URL, so
  `src/lib/aiApi.ts` calls the right place instead of relying on the
  dev-only Vite proxy.

Before deploying, double-check your Firestore security rules — this repo
doesn't include `firestore.rules`, so they're managed separately in the
Firebase console. In particular, make sure a regular user can't write their
own `users/{uid}.role` field to `"admin"`.

## Tech stack

Vite, TypeScript, React, React Router, shadcn/ui, Tailwind CSS,
TanStack Query, react-hook-form + zod, Firebase (Auth + Firestore), Express,
OpenAI.
