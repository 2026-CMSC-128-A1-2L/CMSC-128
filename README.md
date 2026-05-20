# ATLAS

ATLAS (Accommodation Tracking and Lodging Allocation System) is a web-based dormitory search, application, and management platform for University of the Philippines Los Banos students, landlords, managers, and administrators. It centralizes accommodation discovery, listing management, tenant applications, ocular visit scheduling, messaging, verification, billing, reports, and notifications in one role-based system.

Live site: [http://atlas-uplb.vercel.app/](http://atlas-uplb.vercel.app/)

## Project Overview

Students often rely on fragmented, manual, or unreliable channels when searching for dormitories near UPLB. Landlords and housing managers also need a better way to maintain listings, track occupancy, evaluate applications, communicate with tenants, and monitor payments. ATLAS addresses these problems by giving each stakeholder a dedicated workflow inside a shared platform.

The system supports public browsing for guests, verified student workflows for applications and tenant actions, landlord and manager dashboards for property operations, and administrator tools for verification, moderation, announcements, analytics, and system oversight.

## Core Features

- **Role-based access and authentication**: Google OAuth login with role-aware access for students, landlords, managers, and administrators.
- **Dormitory search and filtering**: Browse facilities and listings with filters for room type, capacity, amenities, rules, availability, visit support, and lease transfer support.
- **User and landlord verification**: Students and housing providers can submit required credentials and documents for administrator review.
- **Facility, listing, and unit management**: Landlords and authorized managers can create and update housing facilities, room types, unit records, media, application settings, and availability.
- **Application management**: Students can submit accommodation applications, while managers and landlords can review, approve, reject, assign units, and finalize applications.
- **Ocular visit booking**: Students can request visits, and landlords/managers can set availability and manage booking statuses.
- **Bookmarks and availability alerts**: Students can save preferred listings and receive updates when relevant units become available.
- **Direct messaging**: Verified users can communicate with permitted recipients through real-time messaging.
- **Reviews and ratings**: Eligible tenants can rate and review listings, while public users can view rating information.
- **Notifications, calendar, and announcements**: Users receive in-app updates for important events, schedules, deadlines, and administrator announcements.
- **Lease transfer / Pasalo**: Tenants can request lease transfers, and approved transfer listings can be viewed by interested students.
- **Billing and finance**: Landlords/managers can create billings, verify payments, review financial summaries, and generate downloadable billing PDFs; tenants can view balances and submit payment proof.
- **Reports and moderation**: Users can report listings or other users, while administrators can review reports, process removal requests, and moderate platform activity.
- **Activity logs**: Significant system actions are tracked for transparency and auditability.

## User Roles

| Role | Main Capabilities |
| --- | --- |
| Guest | View public listings and ratings. |
| Student | Search listings, manage profile, submit verification, apply for accommodations, book visits, bookmark listings, message managers, review dorms, view calendar and billing information, submit payment proof, and request lease transfer. |
| Landlord | Create and manage facilities/listings, invite managers or students, review applications, manage tenants, configure visit availability, create billings, view finance summaries, and handle reports related to managed properties. |
| Manager | Assist with assigned facilities according to granted permissions such as building management, billing management, ocular visit handling, and user reporting. |
| Administrator | Review user/facility verification, manage reports and removal requests, monitor activity, view analytics, manage listings and applications, send announcements, and oversee platform integrity. |

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router, Tailwind CSS, Zustand, Axios, Framer Motion, Leaflet, Pusher JS |
| Backend | Node.js, Express 5, TypeScript, Mongoose, MongoDB sessions, Passport Google OAuth, Zod, Pusher, PDFKit, Puppeteer |
| Shared Package | Shared TypeScript schemas, constants, and Zod validation contracts |
| Database | MongoDB / MongoDB Atlas |
| File Storage | S3-compatible object storage, configured for Cloudflare R2 |
| Deployment | Vercel frontend build with serverless Express API routes |
| Tooling | npm workspaces, Biome, TypeScript, Vitest |

## Repository Structure

```text
CMSC-128/
├── api/                 # Vercel serverless entrypoint for the Express API
├── backend/             # Express API, feature modules, models, services, controllers, routers
├── frontend/            # React + Vite client application
├── shared/              # Shared schemas, constants, and TypeScript contracts
├── package.json         # Root npm workspace scripts
├── vercel.json          # Vercel build and rewrite configuration
└── README.md
```

## Backend Feature Modules

The backend is organized by feature under `backend/src/features`:

- `activity`
- `announcement`
- `application`
- `auth`
- `availability`
- `billing`
- `booking`
- `bookmark`
- `calendar`
- `document`
- `facility`
- `file`
- `invite`
- `listing`
- `message`
- `notification`
- `profile`
- `pusher`
- `rental`
- `remove`
- `report`
- `review`
- `tag`
- `transfer`
- `unit`
- `user`

The root API router mounts these modules under `/api`.

## Prerequisites

- Node.js compatible with the installed dependencies
- npm
- MongoDB database URI
- Google OAuth client credentials
- Pusher app credentials
- Cloudflare R2 or another S3-compatible storage bucket for uploads

## Environment Variables

Create a local environment file with the required values before running the app.

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

For production, set `FRONTEND_URL` to the deployed site origin.

```text
https://atlas-uplb.vercel.app/
```

## Getting Started

Install dependencies from the repository root:

```bash
npm install
```

Build the shared package:

```bash
npm run build -w shared
```

Run the frontend and backend together:

```bash
npm run dev
```

By default, the frontend runs through Vite and the backend runs on the configured `PORT`, falling back to `5001`.

## Useful Scripts

From the repository root:

```bash
npm run dev       # Run frontend and backend concurrently
npm run build     # Build shared package and frontend
npm run lint      # Run lint checks across workspaces
npm run format    # Format workspaces with Biome
npm run fix       # Apply Biome lint fixes where available
```

Backend-only scripts:

```bash
npm run dev -w backend
npm run build -w backend
npm run test -w backend
npm run seed:admin-data -w backend
npm run seed:facility-listings -w backend
npm run seed:reports-test -w backend
```

Frontend-only scripts:

```bash
npm run dev -w frontend
npm run build -w frontend
npm run preview -w frontend
```

Shared package:

```bash
npm run build -w shared
```

## Local Checks Before Deployment

Run these commands from the repository root before deploying:

```bash
npm install
npm run build -w shared
npm exec -w frontend tsc -- -b
npm run build -w backend
npm run build
```

## Deployment

This repository is configured for Vercel.

- Deploy from the repository root.
- Framework preset: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `frontend/dist`
- API routes: `/api/*` are handled by `api/index.ts`

The `vercel.json` file rewrites API requests to the serverless Express handler and all non-API routes to the React app.

## Documentation Notes

This README is based on the ATLAS Software Requirements Specification and the current project implementation. The SRS defines the intended scope of the system, while the codebase contains the working frontend, backend, shared schemas, and deployment configuration used by the current ATLAS web application.
