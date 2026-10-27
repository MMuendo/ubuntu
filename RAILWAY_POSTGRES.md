# Railway Postgres for Ubuntu Analytiq

The local site runs without PostgreSQL. Account creation, mentorship applications, and saved consultation requests need the database. Until it is ready, the public pages show a direct contact route and disable forms that cannot save.

## Connect a dedicated Ubuntu database

1. In Railway, use an active plan and create a **new Ubuntu Analytiq project** with a PostgreSQL service. Do not reuse an unrelated project's database.
2. For development on this computer, copy the PostgreSQL service's **public** connection URL into `ubuntu-redesign/.env.local` as `DATABASE_URL`. Do not put the URL in Git, a browser variable, or `NEXT_PUBLIC_*`.
3. Set `POSTGRES_SSL=true` if the public connection requires TLS. If Railway's connection details specify otherwise, set it to `false`.
4. In `ubuntu-redesign`, run `npm run db:apply`, then `npm run db:check`. Review the table report before inviting applications.
5. Restart the local Next.js server. Confirm `/api/consultations` returns `{"ready":true}`. Then test a consultation and a test mentee account/application, and verify the rows in Railway.

For a Railway-hosted Ubuntu app, set `DATABASE_URL` as a server-side environment variable using the PostgreSQL service's **private** connection URL. Keep production credentials out of `.env.example` and source control. The schema source is `database/schema.sql`; `npm run db:apply` applies it.

As of 19 October 2026, the signed-in Railway workspace has an expired trial and only the unrelated `nawiri-pms` project. No Ubuntu database was created or connected. The steps above still require an active Railway project and its connection URL.
