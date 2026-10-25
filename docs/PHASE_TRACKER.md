

\# Emirate Studios — Phase Tracker



\*\*Purpose:\*\* Track verified implementation progress and identify the exact next action.  

\*\*Companion document:\*\* `PROJECT\_BLUEPRINT.md`  

\*\*Current status:\*\* Phase 00 — Project memory and recovery  

\*\*Last updated:\*\* 2026-10-25



\---



\## 1. Current Checkpoint



\### Repository



\- Repository: `https://github.com/technikraft0-gif/emirate-studios`

\- Local directory: `C:\\Users\\HP\\Downloads\\emirate-studios`

\- Production website: `https://emirate-studios.vercel.app/`

\- Last confirmed working branch: `feat/custom-cms-foundation`

\- Last confirmed branch commit: `f7f7504`

\- Last confirmed working-tree status before creating project documentation: clean



\*\*Important:\*\* Recheck branch, commit, and working-tree status before relying on these values. The project memory files are currently being created and may be uncommitted.



\### Existing foundation



The following work was completed and merged into `main` through pull request #1:



\- Upgraded Astro to `7.4.2`.

\- Installed `@astrojs/sitemap` `3.7.4`.

\- Configured the production site URL.

\- Added canonical and Open Graph metadata.

\- Added `public/favicon.svg`.

\- Added `public/robots.txt`.

\- Added `tsconfig.json`.

\- Updated the README.

\- Added a scroll-reveal fallback for browsers without `IntersectionObserver`.



Historical verification results:



\- `npm audit`: reported zero vulnerabilities after the dependency upgrade.

\- `npm run build`: passed after the foundation changes.

\- `git diff --check`: passed after whitespace cleanup.

\- Local browser checks after the Astro upgrade: reported as passed by the project owner.

\- Sitemap output was verified in `dist/`.



These results are historical checkpoints. Re-run relevant checks after subsequent changes.



\## 2. Phase Status



Status definitions:



\- `NOT STARTED`: implementation has not begun.

\- `IN PROGRESS`: work is underway.

\- `BLOCKED`: a required dependency or decision prevents progress.

\- `VERIFICATION`: implementation is complete but acceptance checks remain.

\- `COMPLETE`: acceptance criteria passed and the work is committed.



| Phase | Name | Status |

|---|---|---|

| 00 | Project memory, Git, and recovery | IN PROGRESS |

| 01 | Environment and external services | NOT STARTED |

| 02 | SSR and framework foundation | NOT STARTED |

| 03 | Database, migrations, and permissions | NOT STARTED |

| 04 | Passwordless OAuth and protected sessions | NOT STARTED |

| 05 | Dashboard shell and design system | NOT STARTED |

| 06 | CMS content modules and media | NOT STARTED |

| 07 | Dynamic public website and publishing | NOT STARTED |

| 08 | Team management, activity, and contact | NOT STARTED |

| 09 | SEO, accessibility, performance, and security | NOT STARTED |

| 10 | Production deployment and handover | NOT STARTED |



A phase must not be marked complete merely because files exist or code has been written. Its acceptance criteria must be verified.



\## 3. Phase 00 — Project Memory and Recovery



\### Objective



Create durable project documentation, establish the correct Git workflow, and prepare a recoverable starting point for CMS implementation.



\### Completed



\- \[x] Foundation pull request merged into `main`.

\- \[x] Local `main` synchronized with `origin/main`.

\- \[x] CMS feature branch created and checked out.

\- \[x] `docs/` directory created.

\- \[x] `docs/PROJECT\_BLUEPRINT.md` created by the project owner.



\### In progress



\- \[ ] Create `docs/PHASE\_TRACKER.md`.

\- \[ ] Create `docs/DECISIONS.md`.

\- \[ ] Create `docs/TEST\_PLAN.md`.

\- \[ ] Create root-level `AGENTS.md`.

\- \[ ] Review the documentation for consistency.

\- \[ ] Inspect `.gitignore` and verify no secrets are staged.

\- \[ ] Stage and inspect the complete memory system.

\- \[ ] Commit and push the documentation changes to the CMS branch.

\- \[ ] Verify the branch is clean and synchronized with GitHub.



\### Acceptance criteria



\- All four memory documents plus the existing blueprint exist at their intended paths.

\- Architecture, authentication, database, roles, rendering, deployment, and test requirements agree across the documents.

\- The current implementation status is accurate.

\- No secrets or unrelated generated files are committed.

\- `git diff --cached --check` reports no whitespace errors.

\- The documentation commit is pushed to `origin/feat/custom-cms-foundation`.

\- The working tree is clean after the push.



\### Next action



Finish the memory documents, review them, and commit them together as a single documentation checkpoint.



\## 4. Phase 01 — Environment and External Services



\### Planned work



\- Confirm supported Node.js and npm versions.

\- Review the installed Astro and npm dependency versions.

\- Create the development Supabase project.

\- Configure local environment variables and example documentation.

\- Register Google OAuth credentials.

\- Register a GitHub OAuth application.

\- Configure provider callback URLs in Supabase.

\- Configure approved application redirect URLs.

\- Establish the initial Owner bootstrap procedure.

\- Review Vercel project settings and deployment-branch behavior.

\- Document local, preview, and production environment separation.



\### Acceptance criteria



\- Each provider configuration is documented and uses the correct callback URLs.

\- Credentials are stored in appropriate provider settings or environment variables.

\- No secrets appear in Git-tracked files or browser bundles.

\- Local configuration works without exposing privileged credentials.

\- Provider sign-in can be tested only after the application callback implementation is complete.



\## 5. Phase 02 — SSR and Framework Foundation



\### Planned work



\- Install a Vercel adapter compatible with the selected Astro version.

\- Install the official Astro React integration and compatible React dependencies.

\- Configure Astro for server-rendered output.

\- Add Supabase client helpers and SSR session infrastructure.

\- Add shared TypeScript types and runtime input validation.

\- Configure code-quality checks and baseline tests.

\- Retest the existing portfolio after the rendering-mode change.



\### Acceptance criteria



\- `npm run build` passes.

\- The Vercel adapter deploys successfully to a preview environment.

\- Existing homepage interactions and styling remain functional.

\- A basic server-rendered route returns valid HTML.

\- No privileged Supabase credentials are included in browser output.



\## 6. Phase 03 — Database and Authorization



\### Planned work



\- Design SQL tables, relationships, constraints, indexes, and migrations.

\- Implement profiles and admin memberships.

\- Implement invitation records and application-role assignments.

\- Implement site settings and content tables.

\- Implement draft and published content separation.

\- Configure RLS policies and required database grants.

\- Add storage access policies.

\- Add automated database tests for allowed and denied operations.



\### Acceptance criteria



\- Migrations apply consistently in development.

\- Roles cannot be self-assigned through untrusted requests or profile metadata.

\- Unauthorized users cannot retrieve drafts or modify content.

\- Public requests can only retrieve intended published content.

\- The last active Owner cannot be accidentally removed or demoted.

\- Database permission tests cover important positive and negative cases.



\## 7. Phase 04 — OAuth and Protected Sessions



\### Planned work



\- Implement Google and GitHub sign-in initiation.

\- Implement the OAuth callback and PKCE-compatible code exchange.

\- Implement secure cookie-based SSR sessions.

\- Implement the first-Owner bootstrap.

\- Implement invitation and membership checks.

\- Implement the unauthorized-access flow and logout.

\- Protect admin pages and privileged server operations.



\### Acceptance criteria



\- Google sign-in succeeds for an authorized member.

\- GitHub sign-in succeeds for an authorized member.

\- Unknown or uninvited accounts cannot access the CMS.

\- Expired, revoked, or inactive memberships are denied.

\- Server-side authorization remains effective if browser controls are bypassed.

\- Session errors and callback failures are handled safely.



\## 8. Phase 05 — Dashboard Foundation



\### Planned work



\- Build responsive dashboard layout and navigation.

\- Establish a shared dashboard design system.

\- Add reusable forms, tables, modals, notifications, and status components.

\- Implement loading, empty, validation, permission-denied, and failure states.

\- Ensure the dashboard responds correctly to the current user's permissions.



\### Acceptance criteria



\- Dashboard routes require authentication and authorization.

\- The main layout works on desktop, tablet, and mobile.

\- Forms and controls are keyboard accessible.

\- Error and loading states do not falsely report success.

\- The dashboard follows the agreed visual direction.



\## 9. Phase 06 — CMS Content Modules



\### Planned order



1\. Site settings and brand identity.

2\. Project categories.

3\. Projects and image galleries.

4\. Case studies.

5\. Services.

6\. Testimonials and publication permissions.

7\. Homepage sections and section ordering.

8\. Media library.



\### Acceptance criteria for each module



\- Authorized users can create, view, and edit records.

\- Required fields and relationships are validated.

\- Permission restrictions are enforced on the server and database.

\- Ordering and visibility behave as specified.

\- Media operations enforce their access policies.

\- Database changes persist after refresh.

\- The public site is not updated by a draft save.

\- Tests cover successful and denied operations.



\## 10. Phase 07 — Dynamic Public Website



\### Planned work



\- Replace hard-coded content with database-backed published content.

\- Render site settings, sections, projects, services, and testimonials dynamically.

\- Implement project and case-study routes based on slugs.

\- Implement public-only database queries.

\- Establish caching and dynamic-data refresh behavior.

\- Ensure publishing updates ordinary site content without a full application rebuild.



\### Acceptance criteria



\- Dynamic pages render useful server-generated HTML.

\- Published content appears correctly.

\- Drafts remain private.

\- Unpublishing removes the content from public routes.

\- Valid slugs resolve to the correct content.

\- Invalid or unpublished slugs receive appropriate responses.

\- Database failures do not expose secrets or raw internal errors.



\## 11. Phase 08 — Administration and Contact



\### Planned work



\- Implement invitations and role changes.

\- Implement membership revocation and deactivation.

\- Prevent removal or demotion of the final Owner.

\- Add audit records for privileged actions.

\- Implement contact submissions if retained in the approved scope.

\- Define validation, spam handling, access restrictions, and message retention.



\### Acceptance criteria



\- Role changes require sufficient privileges.

\- Privileged operations are logged.

\- Contact data is inaccessible to unauthorized users.

\- Submission endpoints apply server-side validation and abuse protection.

\- Retention behavior matches the documented policy.



\## 12. Phase 09 — Quality and Hardening



\### Planned work



\- Dynamic SEO metadata and canonical URLs.

\- Dynamic sitemap for public routes.

\- Correct indexing and cache behavior.

\- Responsive and accessibility checks.

\- Performance and image-loading improvements.

\- Security review of authorization and file operations.

\- Dependency security review.

\- Error handling and rate limiting.

\- Recovery and backup verification.



\### Acceptance criteria



\- Sitemap contains public published routes only.

\- Dashboard and private previews are not publicly indexed or cached.

\- No secrets are exposed to the browser.

\- Required accessibility, performance, and functional tests are recorded.

\- Security tests cover unauthorized database and file access.



\## 13. Phase 10 — Production and Handover



\### Planned work



\- Configure production environment variables.

\- Verify production OAuth callbacks.

\- Apply database migrations through a documented process.

\- Verify Vercel deployment and rollback procedures.

\- Run end-to-end content publishing tests.

\- Document routine operations and recovery.

\- Complete pull-request and branch cleanup where appropriate.



\### Acceptance criteria



\- Production authentication and permissions work as designed.

\- Publishing updates public content.

\- Production secrets are safely configured.

\- Relevant automated and manual tests pass.

\- Backup and recovery expectations are documented.

\- The project handbook and test results reflect the deployed system.



\## 14. Implementation Session Log



Add one entry for every meaningful implementation session.



\### Entry template



\*\*Date:\*\*



\*\*Phase:\*\*



\*\*Branch and commit before work:\*\*



\*\*Scope:\*\*



\*\*Files added or changed:\*\*



\*\*Database migrations:\*\*



\*\*Commands executed:\*\*



\*\*Tests and observed results:\*\*



\*\*Known failures or risks:\*\*



\*\*Commit and push status:\*\*



\*\*Decisions recorded:\*\*



\*\*Next exact action:\*\*



Do not record tests as passed unless they were actually executed and the result was observed.



\---



\*\*End of Phase Tracker\*\*



