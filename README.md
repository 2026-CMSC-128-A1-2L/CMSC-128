# CMSC-128 Deployment Notes

This repository is an npm workspace with three packages:

- `frontend`: Vite + React app served from `frontend/dist`
- `backend`: Express API used by the Vercel serverless entry
- `shared`: schemas/constants used by both frontend and backend

## Local Checks

Run these from the repository root before deploying:

```bash
npm install
npm run build -w shared
npm exec -w frontend tsc -- -b
npm run build -w backend
npm run build
```

`npm run build` builds `shared` and the Vite frontend. The backend is loaded by `api/index.ts` for Vercel serverless API requests.

## Vercel Project Settings

Deploy from the repository root.

- Framework preset: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `frontend/dist`
- API routes: `/api/*` are handled by `api/index.ts`

These are also set in `vercel.json` so a teammate should not need to manually override them unless Vercel prompts for confirmation.

## Required Environment Variables

Add these in Vercel Project Settings -> Environment Variables for Production, Preview, and Development as needed:

```text
MONGO_URL=
SESSION_SECRET=
FRONTEND_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
VITE_PUSHER_KEY=
VITE_PUSHER_CLUSTER=
R2_ENDPOINT=
R2_ACCESS_KEY=
R2_SECRET=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
VITE_R2_PUBLIC_URL=
```

Set `FRONTEND_URL` to the exact deployed site origin, for example `https://your-project.vercel.app` or your custom domain. In Google Cloud Console, add this authorized redirect URI:

```text
https://your-project.vercel.app/api/auth/google/callback
```

If you use a custom domain, add the same callback path for that domain too.

## Deployment Flow

1. Pull the latest `develop` branch.
2. Run the local checks above.
3. Push `develop` to the remote repository.
4. In Vercel, import the repository or redeploy the existing project from `develop`.
5. After deploy, open `/`, sign in with Google, and verify one API-backed page such as messages, listings, or notifications.
