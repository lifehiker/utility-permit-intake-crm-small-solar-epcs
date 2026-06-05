# Forge PRD Tasks

PRD.md and BUILD_INSTRUCTIONS.md are deleted in the working tree, so the tracked versions were read from `HEAD`. This checklist is based on those PRD/build instructions, the existing implementation, and the system completion contract.

## Foundation

- [x] Inspect available product docs and confirm PRD/build instructions are missing.
- [x] Read local Next.js 16 App Router docs under `node_modules/next/dist/docs/`.
- [x] Remove network-dependent `next/font/google` usage.
- [x] Ensure package scripts, Prisma configuration, and Next standalone output work.
- [x] Create production Dockerfile that only copies existing directories.

## Data Model

- [x] User, session, account, and verification token models.
- [x] Organization, membership, customer, project, checklist template/item models.
- [x] Document, activity log, magic link token, and subscription models.
- [x] Verify Prisma client generation and schema validation work for SQLite fallback.
- [x] Seed safe defaults for residential, commercial, AHJ, and interconnection checklist templates.

## Auth And Access

- [x] Email/password signup API.
- [x] NextAuth credentials session support as local fallback.
- [x] External Google OAuth requirement documented as not configured in this environment.
- [x] Middleware/proxy protection for app routes.
- [x] Organization membership and role helpers.
- [x] Verify signup/login/onboarding flow end to end through HTTP smoke tests.

## User-Facing App Pages

- [x] Marketing home page.
- [x] Login and signup pages.
- [x] Onboarding page.
- [x] Dashboard page.
- [x] Projects list page.
- [x] New project page.
- [x] Project detail page.
- [x] Customer portal page.
- [x] Settings/team/billing page.
- [x] Smoke-test routes in a running dev server.

## API Routes And Server Actions

- [x] Auth signup and NextAuth routes.
- [x] Onboarding and organization context APIs.
- [x] Project CRUD/status/checklist/note server actions.
- [x] Project detail, export, portal-link, invite, reminder APIs.
- [x] Authenticated upload, customer portal upload, and file download APIs.
- [x] Stripe checkout, customer portal, and webhook APIs with missing-env guards.
- [x] Team invite API.
- [x] Re-run build after type and runtime fixes.

## Core Workflows

- [x] Create organization during onboarding.
- [x] Create projects from customer data and checklist templates.
- [x] Track checklist completion and project stages.
- [x] Generate customer portal magic links.
- [x] Upload documents from staff and customer portal.
- [x] Export project package metadata.
- [x] Log activity for key workflow events.
- [x] Smoke-test core forms, navigation, and project actions through HTTP/API flows.

## Billing, Email, Storage, Analytics

- [x] Resend lazy initialization with no-key fallback activity logging.
- [x] Stripe lazy initialization with no-key fallback responses.
- [x] Local filesystem upload storage fallback.
- [x] Analytics no-op without public key.
- [x] Document external credential requirements in `HUMAN_INPUT_NEEDED.md`.

## Marketing And SEO

- [x] Pricing page.
- [x] Demo request page.
- [x] Feature pages for document collection, permit tracking, utility bill intake, and interconnection workflow.
- [x] SEO pages for solar installer CRM, utility bill intake, proposal portal, OpenSolar, HelioScope, commercial permits, 12-month usage, and workflow CRM.
- [x] Checklist template landing pages.
- [x] Visual polish pass across primary pages/components by code review and route smoke tests.

## Deployment

- [x] `next.config.ts` uses `output: "standalone"`.
- [x] Dockerfile.
- [x] Optional `.dockerignore`.
- [x] Attempt Docker image build; blocked by host Docker socket permission.

## Verification

- [x] `npm run build` passes.
- [x] `npm run lint` passes.
- [x] Dev server starts without crashing.
- [x] Primary routes smoke-tested.
- [x] Interactive forms/buttons tested through signup, onboarding, project, portal, export, invite, reminder, and upload HTTP flows.
- [x] `FORGE_COMPLETION_AUDIT.md` maps requirements to implementation.
- [x] Final response includes `FORGE_BUILD_COMPLETE`.
