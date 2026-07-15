# Finova-Website

completely deployed

## Consultation Database (Prisma + Supabase/Postgres)

Consultation submissions are stored in Supabase PostgreSQL through Prisma.

- Schema: `prisma/schema.prisma`
- Migration files: `prisma/migrations/`
- Repository layer: `lib/consultation-bookings.ts`

### Required environment variables

- `DATABASE_URL` → Supabase pooled or direct PostgreSQL connection string
- `DIRECT_URL` → direct Supabase PostgreSQL connection string for migrations
- `CONSULTATION_NOTIFICATION_URL` → optional PHP notification endpoint
- `NEXT_PUBLIC_CALENDLY_URL` → your Calendly booking link

### Setup

1. Install dependencies

	`npm install`

2. Generate Prisma client

	`npm run db:generate`

3. Apply migrations locally or against Supabase

	`npm run db:migrate`

### Useful commands

- `npm run db:push` → sync schema without creating migration files
- `npm run db:studio` → open Prisma Studio for local data browsing
- `npm run db:reset` → reset the development database and re-apply migrations

### Migration-friendly design

Because Prisma and migration files are used, moving to Supabase/PostgreSQL is straightforward and Netlify-friendly:

1. Set `DATABASE_URL` and `DIRECT_URL` to your Supabase connection strings.
2. Run `npm run db:migrate` to apply the schema.
3. Keep API/business logic unchanged (`app/api/consultation-booking/route.ts` uses repository functions).