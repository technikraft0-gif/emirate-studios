

\# Emirate Studios — Architecture Decision Log



\*\*Purpose:\*\* Record approved technical and product decisions, their rationale, consequences, and unresolved choices.



\*\*Related document:\*\* `PROJECT\_BLUEPRINT.md`



\*\*Status convention:\*\*



\- `ACCEPTED`: approved and part of the project requirements.

\- `PROPOSED`: suggested but not yet approved.

\- `PENDING`: requires an explicit decision or verification.

\- `SUPERSEDED`: replaced by a newer recorded decision.



Do not silently reverse an accepted decision. If a change becomes necessary, add a new decision record explaining the reason and consequences.



\---



\## ADR-001 — Retain Astro as the Application Framework



\*\*Status:\*\* ACCEPTED



\### Decision



Keep Astro as the primary application framework for both the public website and protected server-rendered routes.



\### Rationale



The existing portfolio is already built with Astro. Retaining it avoids an unnecessary full rewrite and lets the public design continue evolving within the same project.



\### Consequences



\- Astro remains the owner of routing and server-side rendering.

\- The Vercel adapter will support on-demand server rendering.

\- Individual routes may be prerendered when justified.

\- The existing public site must be protected against regressions during the transition.



\---



\## ADR-002 — Use TypeScript as the Primary Application Language



\*\*Status:\*\* ACCEPTED



\### Decision



Use TypeScript for application logic, server endpoints, data access, shared types, and integrations.



Use SQL for database schemas, migrations, constraints, and Row Level Security policies.



Use CSS for styling.



\### Rationale



Typed application code and versioned database migrations improve maintainability and make refactoring safer as the CMS grows.



\### Consequences



\- New application files should use TypeScript where appropriate.

\- Shared types should describe core domain records and validated inputs.

\- Types do not replace runtime validation of untrusted data.

\- SQL changes must be reviewed and version-controlled.



\---



\## ADR-003 — Use React and TSX for the Custom Dashboard



\*\*Status:\*\* ACCEPTED



\### Decision



Use React through Astro's official React integration for interactive dashboard screens and components.



\### Rationale



The administration interface needs forms, tables, filters, upload interactions, modals, and user-management workflows that benefit from interactive component state.



\### Consequences



\- Install the Astro React integration and compatible React dependencies during the framework phase.

\- Keep client-side JavaScript focused on genuinely interactive UI.

\- Protect data and privileged operations on the server, not only through React components.

\- React integration must not turn every public page into an unnecessary client-rendered application.



\---



\## ADR-004 — Use Supabase as the Backend



\*\*Status:\*\* ACCEPTED



\### Decision



Use Supabase for:



\- PostgreSQL database.

\- Authentication.

\- Storage.

\- Row Level Security.

\- Appropriate server-side functions.



\### Rationale



Supabase supplies managed backend infrastructure while allowing the project to retain a fully custom dashboard and relational data model.



\### Consequences



\- SQL migrations become part of the repository.

\- RLS and database grants must be configured together.

\- Privileged actions require server-side authorization.

\- Database and Storage access must be explicitly tested.

\- Service-role and secret credentials must never be exposed in the browser.



\---



\## ADR-005 — Use Vercel for Hosting and Astro Server Rendering



\*\*Status:\*\* ACCEPTED



\### Decision



Host the public website and dashboard routes on Vercel and use the compatible official Astro Vercel adapter.



Configure Astro for server rendering by default. Keep static assets and selectively prerendered routes static where appropriate.



\### Rationale



The requirement is for dynamic content that can be updated without rebuilding the entire website for each ordinary edit.



\### Consequences



\- Configure `output: "server"` and the Vercel adapter during the SSR foundation phase.

\- Reverify all existing public routes after changing rendering mode.

\- Configure local, preview, and production environments.

\- Establish explicit cache behavior.

\- Dynamic pages must not expose unpublished content or share private responses through public caches.



\---



\## ADR-006 — Passwordless Google and GitHub OAuth Only



\*\*Status:\*\* ACCEPTED



\### Decision



The Emirate Studios CMS will offer Google and GitHub sign-in through Supabase Auth.



The CMS will not offer application-managed email/password login, password-reset forms, or public self-registration.



\### Rationale



The project owner wants users to authenticate with an existing Google or GitHub account rather than maintain a separate CMS password.



\### Consequences



\- Configure Google and GitHub OAuth applications.

\- Use the supported Supabase OAuth callback and server-side PKCE/session flow.

\- Configure approved local and production redirect URLs.

\- Handle provider denial, callback errors, revoked access, and expired sessions.

\- Passwordless refers to the CMS login flow; providers may still authenticate their accounts using passwords or their own MFA.



\---



\## ADR-007 — Invitation-Only CMS Access



\*\*Status:\*\* ACCEPTED



\### Decision



Successful OAuth authentication does not automatically grant permission to use the CMS.



Every CMS user must have an authorized active application membership. New membership requires an approved invitation or controlled first-Owner bootstrap.



\### Rationale



The CMS must remain private even though the login page offers Google and GitHub buttons.



\### Consequences



\- Unknown users must not gain CMS access after sign-in.

\- Invitations must be validated server-side.

\- Membership and invitation states must be checked on protected routes and privileged operations.

\- The system must not rely on client-side role checks.

\- The first Owner must be provisioned through a controlled, documented procedure.

\- Any Auth Hook used for sign-up restrictions must be tested against provider and callback behavior.



\---



\## ADR-008 — Application-Owned Roles and Permissions



\*\*Status:\*\* ACCEPTED



\### Decision



Implement the following application roles:



\- Owner

\- Administrator

\- Editor

\- Publisher

\- Viewer



These are application-specific permissions, not built-in Supabase roles.



\### Rationale



The project requires multiple users with different levels of access, including separate content editing and publishing responsibilities.



\### Consequences



\- Store authoritative membership and role data in a protected database design.

\- Protect role assignments from unauthorized modification.

\- Enforce permissions through server-side checks, database grants, and RLS.

\- Do not trust browser-provided role names or OAuth profile metadata.

\- Prevent accidental removal or demotion of the last active Owner.

\- Audit role changes and important administrative actions.



\---



\## ADR-009 — Dynamic Public Website With Selective Static Assets



\*\*Status:\*\* ACCEPTED



\### Decision



Use server-side rendering for dynamic public content and the CMS. Continue serving CSS, JavaScript bundles, images, and other suitable assets statically.



\### Rationale



The site owner wants changes to published content to appear without requiring a full rebuild for each normal content edit.



\### Consequences



\- Public pages must query published records.

\- Project and case-study pages will use controlled dynamic routes.

\- Dynamic data queries must be optimized and appropriately cached.

\- Unpublished content must never appear in public responses.

\- Static rendering may be used only for routes where it has a clear benefit and remains consistent with publishing requirements.



\---



\## ADR-010 — Separate Draft Content From Published Content



\*\*Status:\*\* ACCEPTED



\### Decision



Maintain a distinction between editable draft content and the content currently visible on the public website.



\### Rationale



Editors must be able to prepare changes without unintentionally changing live content before publication.



\### Consequences



\- Define a versioned publishing model before implementing CRUD screens.

\- Public queries must use published versions only.

\- Publishing must be an authorized server-side operation.

\- Important multi-record publication changes must use an appropriate atomic consistency mechanism.

\- Unpublishing must remove content from public queries, routes, and sitemap output.

\- Previous published versions should be recoverable where supported by the final schema.



\---



\## ADR-011 — Use Supabase Storage for Media



\*\*Status:\*\* ACCEPTED



\### Decision



Use Supabase Storage for uploaded site logos, project images, galleries, and other required media.



\### Rationale



It integrates with the selected backend and can use access policies consistent with the database permission model.



\### Consequences



\- Validate media types and sizes.

\- Use appropriate Storage policies.

\- Distinguish public assets from restricted draft previews where necessary.

\- Validate and store alternative text and ordering information.

\- Secure upload, replacement, and deletion operations.

\- Do not assume that hiding a file in the dashboard makes the file private.



\---



\## ADR-012 — Preserve the Existing Public Design System



\*\*Status:\*\* ACCEPTED



\### Decision



Retain the existing design system and site appearance unless a deliberate, documented redesign is approved.



Use custom CSS for the dashboard by default. Tailwind CSS is optional and will not be introduced without a clear need.



\### Rationale



The existing portfolio has already been designed and tested. The CMS must enhance the site without causing accidental visual regression.



\### Consequences



\- Preserve the existing brand appearance and responsive behavior.

\- Create a coherent separate dashboard design system.

\- Use accessible forms, states, keyboard navigation, and responsive layouts.

\- Retest existing public behavior whenever shared styles or frontend configuration changes.



\---



\## ADR-013 — Keep Project Memory in Git



\*\*Status:\*\* ACCEPTED



\### Decision



Maintain the architecture, phase tracker, decision log, test plan, and AI coding instructions as files in the repository.



\### Rationale



Conversation history alone is not a reliable long-term project record. Version-controlled documentation creates a portable, reviewable source of truth.



\### Consequences



\- Update memory documents after meaningful implementation or architectural changes.

\- Commit documentation with coherent implementation checkpoints.

\- Record actual verification results, current branch, commit hash, known risks, and the next exact task.

\- Future work must inspect the current repository and read the handbook before changing code.



\---



\## ADR-014 — Build the Dashboard as a Custom Application



\*\*Status:\*\* ACCEPTED



\### Decision



Do not use Sanity or another hosted CMS as the primary editing interface. Build a custom React/TSX dashboard backed by Supabase.



\### Rationale



The owner explicitly requires a fully custom-designed administration experience and custom multi-user permission behavior.



\### Consequences



\- We must implement and test the dashboard, content editors, and workflows.

\- Supabase is backend infrastructure, not a ready-made CMS UI.

\- The custom implementation requires more development and maintenance than a hosted editorial CMS.

\- Security and usability acceptance criteria must be addressed for each module.



\---



\## ADR-015 — Use a Structured, Verifiable Implementation Workflow



\*\*Status:\*\* ACCEPTED



\### Decision



Implement the system in sequential phases, with small changes, clear acceptance criteria, and explicit test checkpoints.



\### Rationale



The project owner wants to prevent regressions, lost context, false claims about testing, and unnecessary rework.



\### Consequences



\- Inspect actual files and Git state before changing code.

\- Give exact file paths and complete file contents when replacing a file.

\- The project owner applies and executes the commands locally.

\- Diagnose reported failures before progressing to dependent work.

\- Never claim tests passed unless their results were actually observed.

\- Keep the working `main` branch protected through feature branches and pull requests.



\---



\# Pending Decisions



These items must be resolved or verified in the relevant phase before implementation depends on them.



\## PD-001 — Google OAuth Configuration



\*\*Status:\*\* PENDING



Create and configure the Google OAuth application and verify its client configuration and callback URLs.



Do not record provider secrets in this document.



\## PD-002 — GitHub OAuth Configuration



\*\*Status:\*\* PENDING



Create the GitHub OAuth application, configure its callback URL, and verify the end-to-end flow.



\## PD-003 — First Owner Provisioning



\*\*Status:\*\* PENDING



Design and test a controlled method for establishing the first Owner without leaving public registration enabled or hard-coding an administrator identity.



\## PD-004 — Vercel Environment and Deployment Behavior



\*\*Status:\*\* PENDING



Verify current production branch, Preview deployment behavior, environment-variable settings, and rollback process.



\## PD-005 — Final SQL Content Schema



\*\*Status:\*\* PENDING



Design and review detailed table definitions, relations, constraints, and publishing-version behavior before creating the migrations.



\## PD-006 — Contact Submission and Retention



\*\*Status:\*\* PENDING



Confirm whether contact submissions should be stored and, if so, define approved access, delivery, spam controls, and retention behavior.



\## PD-007 — Caching Policy



\*\*Status:\*\* PENDING



Specify public response caching, invalidation, draft previews, and authenticated route behavior before production rendering is enabled.



\## PD-008 — Account Email Matching and Provider Linking



\*\*Status:\*\* PENDING



Test and document how Google/GitHub accounts with verified emails are matched to invitations and memberships. Do not grant access solely because untrusted profile data contains a particular email.



\---



\## Decision Change Procedure



When an accepted decision needs to change:



1\. Add a new decision entry with a unique ADR number.

2\. State which existing decision it changes.

3\. Explain the reason and consequences.

4\. Identify affected documentation, configuration, schema, and tests.

5\. Update `PROJECT\_BLUEPRINT.md` if the change affects the authoritative requirements.

6\. Record approval and implement the change through a controlled Git checkpoint.

7\. Mark the older decision `SUPERSEDED` only after the replacement decision has been accepted.



\---



\*\*End of Decision Log\*\*



