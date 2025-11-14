
# Code Generator Prompt — SIMAKSI Backend (Node.js + TypeScript + Express + Prisma + Swagger)

## GOAL
Generate a complete starter backend codebase for **SIMAKSI** (Surat Izin Masuk Kawasan Konservasi) with the following properties:
- Language: **TypeScript**
- Runtime: Node.js (LTS)
- Framework: **Express**
- ORM: **Prisma** (with migrations auto-applied in CI/CD)
- Database: **PostgreSQL**
- File storage: S3-compatible (signed-URL flow)
- Auth: **JWT** (access + refresh)
- Validation: **Zod**
- API docs: **Swagger / OpenAPI** (swagger-jsdoc + swagger-ui-express) mounted at `/api/docs`
- Testing: **Jest + Supertest**
- Lint & format: **ESLint + Prettier**
- Basic logging: **Pino**
- Docker: optional Dockerfile + docker-compose for dev Postgres
- CI: **GitHub Actions** pipeline with `prisma migrate deploy` step

Generate a minimal but production-minded implementation covering:
- Auth (register/login/refresh/logout) + RBAC middleware
- User profile endpoints
- SIMAKSI CRUD (draft → submit)
- Documents upload endpoint (signed URL flow)
- Admin review endpoints (approve/reject + status log)
- Permit generation endpoint (HTML stream; PDF can be stubbed or use Puppeteer)
- Swagger docs for each endpoint
- Prisma schema and example seed (optional)
- README and `.env.example`
- GitHub Actions workflow that runs migrations (`npx prisma migrate deploy`) before deploy step

---

## PROJECT METADATA (for generator use)
- project_name: `simaksi-backend`
- language: `typescript`
- port: `4000`
- author: fill by user
- license: MIT

---

## FOLDER STRUCTURE TO GENERATE
/(simaksi-backend)
├── prisma/ 
│   ├── schema.prisma 
│   └── seed.ts (optional) 
├── src/ 
│   ├── config/ 
│   │   └── index.ts 
│   ├── controllers/ 
│   ├── services/ 
│   ├── repositories/ 
│   ├── routes/ 
│   ├── middlewares/ 
│   ├── validators/ 
│   ├── utils/ 
│   ├── jobs/ 
│   ├── docs/ 
│   ├── app.ts 
│   └── server.ts 
├── tests/
 ├── .env.example
 ├── package.json
 ├── tsconfig.json
 ├── jest.config.js
 ├── .eslintrc.js
 ├── .prettierrc
 ├── Dockerfile
 ├── docker-compose.yml
 ├── README.md
 └── .github/
 └── workflows/
 └── ci.yml

---

## FILES & CONTENT SKELETON (generator must produce these files)

### 1. `package.json` (key scripts)
```json
{
  "name": "simaksi-backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate:dev": "prisma migrate dev --name init",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "lint": "eslint 'src/**' --ext .ts",
    "test": "jest --runInBand",
    "prepare": "husky install"
  },
  "dependencies": { /* generate appropriate deps */ },
  "devDependencies": { /* generate appropriate dev deps */ }
}

Generator: populate dependencies (express, prisma, @prisma/client, zod, jsonwebtoken, bcrypt, swagger-jsdoc, swagger-ui-express, pino, multer (if using multipart), aws-sdk/@aws-sdk for signed URL, ts-node-dev, types, jest, supertest, etc.)

2. prisma/schema.prisma (exact content — required)

Generator must create prisma/schema.prisma as below (match SDD models & enums):

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String    @id @default(uuid())
  fullName     String
  email        String    @unique
  passwordHash String
  phoneNumber  String?
  role         Role      @default(USER)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  requests     SimaksiRequest[]
}

model SimaksiRequest {
  id               String      @id @default(uuid())
  user             User        @relation(fields: [userId], references: [id])
  userId           String
  activityType     String
  startDate        DateTime
  endDate          DateTime
  destination      String
  participantCount Int
  additionalInfo   String?
  status           RequestStatus @default(DRAFT)
  documents        Document[]
  statusLogs       StatusLog[]
  adminNotes       AdminNote[]
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
}

model Document {
  id               String   @id @default(uuid())
  simaskiRequest   SimaksiRequest @relation(fields: [simaskiRequestId], references: [id])
  simaskiRequestId String
  fileName         String
  fileUrl          String
  fileType         String
  uploadedBy       User?    @relation(fields: [uploadedById], references: [id])
  uploadedById     String?
  uploadedAt       DateTime @default(now())
}

model StatusLog {
  id               String   @id @default(uuid())
  simaskiRequest   SimaksiRequest @relation(fields: [simaskiRequestId], references: [id])
  simaskiRequestId String
  oldStatus        RequestStatus
  newStatus        RequestStatus
  changedBy        User?    @relation(fields: [changedById], references: [id])
  changedById      String?
  note             String?
  changedAt        DateTime @default(now())
}

model AdminNote {
  id               String   @id @default(uuid())
  simaskiRequest   SimaksiRequest @relation(fields: [simaskiRequestId], references: [id])
  simaskiRequestId String
  admin            User     @relation(fields: [adminId], references: [id])
  adminId          String
  note             String
  createdAt        DateTime @default(now())
}

enum Role {
  USER
  ADMIN
  SUPERADMIN
}

enum RequestStatus {
  DRAFT
  SUBMITTED
  IN_REVIEW
  APPROVED
  REJECTED
}

Note: fix naming consistency (SimaksiRequest relations). The generator must ensure relation field names match exactly (simaskiRequestId vs simaksiRequestId) — use consistent simaksiRequestId if adjusting.

3. src/app.ts (Express app skeleton)

Express app

Middlewares: JSON, helmet, cors (restrict to env FRONTEND_ORIGIN), pino logger, error handler

Route mounts: /auth, /users, /simaksi, /admin

Swagger setup: generate swaggerSpec from annotations and mount /api/docs

Health endpoint /healthz


Provide a minimal template that imports route files and attaches Swagger UI.


---

4. src/server.ts

Read env (dotenv)

Initialize Prisma client

Start server on process.env.PORT || 4000

On start, log listening, verify DB connection (prisma.$connect()), and optionally run a safety check that migrations have been applied (do not run migrations in app; CI handles migrations).



---

5. Auth module (controllers/services/middlewares)

Generator must provide:

src/controllers/auth.controller.ts — register/login/refresh/logout handlers

src/services/auth.service.ts — business logic (password hashing, token generation, refresh token handling)

src/middlewares/auth.middleware.ts — verify JWT and add req.user

src/middlewares/role.middleware.ts — check roles

src/validators/auth.validator.ts — zod schemas for register/login


Behavior details:

Passwords hashed with bcrypt (salt rounds configurable)

Tokens: access token short TTL (e.g., 15m), refresh token longer TTL (e.g., 30d). Store refresh tokens hashed in DB or in-memory store; generator may implement a RefreshToken table (optional) or store in User for MVP.



---

6. SIMAKSI module

src/controllers/simaksi.controller.ts — endpoints for create, list, detail, update (only when DRAFT), submit

src/services/simaksi.service.ts — logic to create StatusLog on transitions

src/repositories/simaksi.repository.ts — prisma queries for requests & relations

src/validators/simaksi.validator.ts — zod schemas

POST /simaksi/:id/submit should:

check status is DRAFT

set status = SUBMITTED

create StatusLog entry




---

7. Documents (upload) module

Provide two flows (generator must implement signed-URL preferred):

GET /simaksi/:id/documents/upload-url?filename=...&contentType=... — returns signed PUT URL and public URL to store in DB after upload

POST /simaksi/:id/documents — accept metadata if client already uploaded (store metadata record)

Multer-based multipart handling optional for server-side upload


Storage: use AWS v3 SDK or minimal S3 client; make endpoint use STORAGE_ENDPOINT, STORAGE_KEY, STORAGE_SECRET, STORAGE_BUCKET env vars.


---

8. Admin module

src/controllers/admin.controller.ts — list (with filters), get detail, approve, reject, notes

Approve flow:

verify request in SUBMITTED or IN_REVIEW

set status = APPROVED

create StatusLog

generate permit (HTML string). Optionally create PDF via Puppeteer; if complex, generate HTML and mark permit URL or content.


Reject flow:

set status = REJECTED, save admin note, create StatusLog




---

9. Permit generation

src/controllers/permit.controller.ts with GET /simaksi/:id/permit?format=html|pdf

For HTML: render simple Handlebars/EJS template with request & user data

For PDF: either call Puppeteer to render the HTML to PDF or return HTML and mark PDF generation as background job (stub ok for generator)



---

10. Swagger / OpenAPI generation

Use swagger-jsdoc annotations in controllers or generate a static openapi.json from JSDoc

Mount swagger-ui-express at /api/docs

Configure bearerAuth security scheme in spec

Ensure file upload endpoints use multipart/form-data or documented signed-URL flow



---

11. Prisma auto-migration & CI

Generator must produce GitHub Actions workflow .github/workflows/ci.yml with stages:

1. Checkout


2. Setup Node


3. Install deps


4. Run lint & tests


5. npx prisma migrate deploy (requires DATABASE_URL to point to staging/production DB)


6. Build & (optional) deploy step (left as placeholder)



Include job secrets usage (DATABASE_URL secret) and guard: only run migrate deploy when deploying to staging/production branch.


---

12. .env.example

Provide required env variables:

DATABASE_URL=postgresql://user:pass@host:5432/dbname
PORT=4000
JWT_SECRET=changeme
JWT_REFRESH_SECRET=changeme2
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=30d
STORAGE_ENDPOINT=
STORAGE_KEY=
STORAGE_SECRET=
STORAGE_BUCKET=
FRONTEND_ORIGIN=http://localhost:3000
NODE_ENV=development


---

13. README.md (auto-generate)

Contain:

Quick start (install, setup .env, npx prisma migrate dev, npm run dev)

How to generate prisma client (npx prisma generate)

How to run tests

How to view Swagger (http://localhost:4000/api/docs)

CI notes: migration step in pipeline



---

14. Tests

Generate example Jest test files:

tests/auth.e2e.spec.ts (register→login)

tests/simaksi.e2e.spec.ts (create draft → submit) Use a test DB config (e.g., DATABASE_URL_TEST) and docker-compose for spinning up Postgres in CI.




---

GENERATION RULES & CONSTRAINTS (IMPORTANT)

1. No plaintext secrets: .env.example only; do not commit real secrets.


2. Migrations: generator must create initial migration using prisma migrate dev --name init and include prisma/migrations folder in output OR at least the schema.prisma and instruct user to run migrate.


3. Swagger completeness: every endpoint included in generated controllers must have JSDoc or decorator comments that swagger-jsdoc can transform into OpenAPI.


4. RBAC: enforce role checking in admin routes (middleware).


5. Error handling: central error middleware that returns consistent JSON error shape.


6. Logging: requests and errors logged with Pino (or similar).


7. Types: use TypeScript types for request/response DTOs; Zod schemas should map to types.


8. Modularity: controllers invoke services; services call repositories (which wrap Prisma). Keep controllers thin.


9. Auto-migration in CI: include npx prisma migrate deploy in CI workflow (no db push in prod).


10. Permit generation: at least provide an HTML template and endpoint that returns HTML. PDF generation can be an optional job; if included, use Puppeteer with a feature flag.




---

OPTIONAL (Nice-to-have)

Dockerfile + docker-compose for quick local dev (Postgres + app)

Basic seed script to create an admin user (prisma/seed.ts)

Rate-limiter middleware

Sentry integration (SENTRY_DSN env)

Healthcheck /healthz reporting DB connection status



---

OUTPUT CHECKLIST (what generator must hand back)

Full project tree (TypeScript) with all files above

prisma/schema.prisma and (optionally) migrations

Working npm run dev that starts server and exposes Swagger

Example .env.example

GitHub Actions workflow with prisma migrate deploy step

README with run & migration instructions

Minimal test suite (two E2E tests)

Lint + Prettier configs



---

POST-GENERATION INSTRUCTIONS (for user)

After generator finishes, instruct the user to:

1. Copy .env.example → .env and fill values.


2. Install deps: npm install


3. Generate Prisma client & run migration (dev): npx prisma migrate dev --name init


4. Start dev server: npm run dev


5. Open docs: http://localhost:4000/api/docs




---

EXAMPLE SNIPPETS (for generator to use in templates)

Example Express route JSDoc for Swagger

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/register', authController.register);

Example OpenAPI security scheme (in swagger options)

components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  schemas: { /* add user/request schemas */ }
}


---

FINAL NOTE TO THE GENERATOR

Produce a working scaffold — not every single edge case must be implemented, but core flows (auth, simaksi CRUD, upload URL, admin approve/reject, permit HTML, swagger docs, prisma schema & migrations, CI step for migrations) must be present and runnable out-of-the-box after npm install + npx prisma migrate dev.

If any step cannot be fully coded (e.g., PDF generation in CI-limited environment), add clear TODO comments in the generated code and return stubs that are safe to run.
