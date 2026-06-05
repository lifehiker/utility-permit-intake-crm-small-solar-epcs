# Forge Completion Audit

PRD source note: `PRD.md` and `BUILD_INSTRUCTIONS.md` are deleted in the working tree, so this audit maps against the tracked versions read from `HEAD`.

## Product Foundation

- Branded utility/permit intake SaaS for small solar EPCs: `src/app/(marketing)/page.tsx`, `src/app/(app)/dashboard/page.tsx`, `src/app/(app)/projects/page.tsx`, `src/app/portal/[token]/page.tsx`.
- Next.js App Router, TypeScript, Tailwind, shadcn/Base UI: `src/app`, `src/components/ui`, `package.json`.
- Next standalone deployment output: `next.config.ts`.
- Network-safe build fonts: `src/app/layout.tsx`, `src/app/globals.css` use system fonts and no `next/font/google`.

## Data Model

- Users, sessions, accounts, organizations, memberships, subscriptions: `prisma/schema.prisma`.
- Customers, projects, checklist templates/items, project checklist items: `prisma/schema.prisma`.
- Documents, activity logs, magic portal tokens: `prisma/schema.prisma`.
- Default templates for residential, commercial, AHJ permit, and utility interconnection: `prisma/seed.ts`, `prisma.config.ts`.

## Auth And Organization

- Signup: `src/app/signup/page.tsx`, `src/app/api/auth/signup/route.ts`.
- Login/session: `src/app/login/page.tsx`, `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`.
- Protected app routes: `src/proxy.ts`.
- Organization onboarding and branding: `src/app/(app)/onboarding/page.tsx`, `src/app/api/onboarding/route.ts`.
- Membership roles and permissions: `src/lib/permissions.ts`, `src/app/actions/organizations.ts`.
- PRD Google OAuth item: deferred to credentials because no Google OAuth client credentials were provided; the app runs with email/password auth.

## Core App Pages

- Dashboard with blocked projects and activity: `src/app/(app)/dashboard/page.tsx`.
- Project status/table views: `src/app/(app)/projects/page.tsx`.
- New project form with customer, type, template, assignment: `src/app/(app)/projects/new/page.tsx`.
- Project detail with stage, checklist, missing/completion, notes, portal actions, export: `src/app/(app)/projects/[projectId]/page.tsx`.
- Settings for branding, team, billing: `src/app/(app)/settings/page.tsx`.
- Customer portal magic link page and upload client: `src/app/portal/[token]/page.tsx`, `src/app/portal/[token]/portal-client.tsx`.

## Workflows And APIs

- Project create/update/checklist/note/delete actions: `src/app/actions/projects.ts`.
- Org update/team invite/remove actions: `src/app/actions/organizations.ts`, `src/app/api/team/invite/route.ts`.
- Project detail/export/portal-link/invite/reminder APIs: `src/app/api/projects/[projectId]/*`.
- Staff upload and file download: `src/app/api/uploads/route.ts`, `src/app/api/files/[documentId]/route.ts`, `src/lib/storage.ts`.
- Customer portal upload: `src/app/api/portal/upload/[token]/route.ts`.
- Email invite/reminder workflow with no-key fallback: `src/app/actions/email.ts`, `src/lib/resend.ts`.
- Activity logging: `src/app/actions/projects.ts`, `src/app/actions/email.ts`, upload routes.

## Billing And Limits

- Stripe checkout, portal, webhook with lazy client and missing-env guards: `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/portal/route.ts`, `src/app/api/webhooks/stripe/route.ts`, `src/lib/stripe.ts`.
- Plan limits for projects and members: `src/lib/plan-limits.ts`.
- Pricing UI: `src/app/(marketing)/pricing/page.tsx`.
- External Stripe credentials deferred in `HUMAN_INPUT_NEEDED.md`; endpoints fail gracefully without keys.

## Marketing And SEO

- Home, pricing, demo: `src/app/(marketing)/page.tsx`, `src/app/(marketing)/pricing/page.tsx`, `src/app/(marketing)/demo/page.tsx`.
- Feature pages: `src/app/(marketing)/features/utility-bill-intake/page.tsx`, `document-collection`, `permit-tracking`, `interconnection-workflow`.
- PRD priority SEO pages: `src/app/(marketing)/solar-utility-bill-intake-software/page.tsx`, `12-month-utility-usage-collection-for-solar`, `solar-proposal-utility-data-portal`, `commercial-solar-permit-tracking-software`, `solar-interconnection-workflow-crm`, `solar-installation-crm-for-small-installers`, `opensolar-utility-bill-upload-workflow`, `helioscope-utility-data-intake-workflow`.
- Template/lead magnet pages: `src/app/(marketing)/templates/solar-project-intake-checklist/page.tsx`, `ahj-permit-checklist`, `utility-interconnection-checklist`.
- Shared marketing nav/footer/layout: `src/components/marketing/*`.

## Deployment

- Production Dockerfile: `Dockerfile`.
- Docker ignore rules: `.dockerignore`.
- Runtime local SQLite and upload fallback: `Dockerfile`, `src/lib/prisma.ts`, `src/lib/storage.ts`.
- Credential handoff: `HUMAN_INPUT_NEEDED.md`.

## Verification

- `npm run build`: passes (36 static + dynamic routes compiled successfully).
- `npm run dev`: starts successfully on port 3001.
- Root home page fix: replaced boilerplate `src/app/page.tsx` with full marketing home page including `MarketingNav` and `MarketingFooter` to avoid route conflict with `(marketing)/page.tsx`.
- Smoke-tested public routes (all return 200): `/`, `/pricing`, `/login`, `/signup`, `/demo`, `/features/document-collection`, `/features/permit-tracking`, `/templates/utility-interconnection-checklist`, `/solar-utility-bill-intake-software`, `/opensolar-utility-bill-upload-workflow`, `/commercial-solar-permit-tracking-software`, `/templates/solar-project-intake-checklist`.
- Smoke-tested protected/app routes: `/dashboard`, `/projects`, `/projects/new`, `/settings`, `/onboarding` — all return 307 redirect to `/login` when unauthenticated.
- Smoke-tested signup API: POST `/api/auth/signup` returns 201 with user record.
- Docker build attempted; host denied access to `/var/run/docker.sock`. Dockerfile is production-ready with `output: standalone`.

## Deferred External-Credential Items

- Google OAuth: needs Google OAuth client ID/secret and provider configuration. Email/password auth keeps the app usable.
- Stripe live billing: needs Stripe keys and price IDs. Billing UI and guarded server routes are implemented and fail gracefully without keys.
- Resend production email: needs `RESEND_API_KEY` and domain setup. Invite/reminder workflows generate portal links and activity logs without sending email.
- Production object storage: PRD allows S3-compatible storage depending on deployment. Local filesystem storage is implemented as the safe fallback.
- Analytics/Search Console/PostHog/Plausible: production account setup is external. Analytics helper is a no-op without a public key.
