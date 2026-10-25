

\# Emirate Studios — Project Blueprint



\*\*Document type:\*\* Authoritative architecture and requirements  

\*\*Project:\*\* Emirate Studios custom CMS  

\*\*Production website:\*\* https://emirate-studios.vercel.app/  

\*\*Repository:\*\* https://github.com/technikraft0-gif/emirate-studios  

\*\*Current development branch:\*\* `feat/custom-cms-foundation`  

\*\*Status:\*\* Architecture approved; CMS implementation not started  

\*\*Last updated:\*\* 2026-10-25



\---



\## 1. Purpose



Transform the existing Emirate Studios portfolio into a fully dynamic, professionally managed website with a custom-designed administration dashboard.



The system must allow authorized team members to manage website content without editing source code for routine content changes.



The project must preserve the existing portfolio's established visual design unless a deliberate, documented design improvement is approved.



Implementation will proceed in small, verifiable phases. Every phase must have documented acceptance criteria and recorded test results.



\## 2. Locked Technology Stack



\### Application and frontend



\- Astro 7.4.2 is the current baseline.

\- TypeScript is the primary application language.

\- React and TSX power the interactive administration interface.

\- Existing CSS is retained for the public website.

\- Custom CSS is the default styling approach for the administration interface.

\- Tailwind CSS is optional and will not be added without a specific need.

\- Zod or an equivalent runtime validation library may be used for input validation.

\- The `@astrojs/react` integration will be added when required.



\### Backend and data



\- Supabase provides PostgreSQL, Authentication, Storage, and appropriate server-side functions.

\- SQL migrations define and evolve the database schema.

\- PostgreSQL constraints, foreign keys, indexes, grants, and Row Level Security policies enforce data integrity and access control.

\- Supabase Auth provides passwordless OAuth authentication through Google and GitHub.

\- `@supabase/supabase-js` and `@supabase/ssr` will be used as appropriate for browser and server access.



\### Rendering and deployment



\- Vercel hosts the application.

\- The official Astro Vercel adapter will provide server-side rendering.

\- Astro will use server rendering by default.

\- Individual routes may use static prerendering only when there is a clear performance or operational benefit.

\- The public site must not require a complete rebuild for every ordinary published content edit.

\- Public content must render as useful server-generated HTML.

\- CSS, JavaScript bundles, and other appropriate static assets will remain statically served.



\### Version control



\- GitHub is the source-control platform.

\- All source code, SQL migrations, project documentation, and appropriate automated tests are version-controlled.

\- Secrets, provider credentials, database passwords, service-role keys, and deployment-hook secrets must never be committed.



\## 3. Existing Project Baseline



\### Local location



`C:\\Users\\HP\\Downloads\\emirate-studios`



\### Production domain



`https://emirate-studios.vercel.app/`



\### Current Git state at the beginning of the CMS project



\- `main` contains merged commit `f7f7504`.

\- `feat/custom-cms-foundation` is the active CMS development branch.

\- The working tree was clean when Phase 00 verification completed.

\- The security-upgrade and foundation work was merged through pull request #1.



Recheck the actual branch, commit, and working-tree state before relying on these historical values in a future session.



\### Existing source files



\- `src/pages/index.astro`

\- `src/styles/global.css`

\- `astro.config.mjs`

\- `package.json`

\- `package-lock.json`

\- `tsconfig.json`

\- `public/favicon.svg`

\- `public/robots.txt`

\- `README.md`



\### Existing behavior



The current website is a single-page portfolio with a hero, studio introduction, process, selected projects, services, case studies, testimonials, contact section, and footer.



The current portfolio uses hard-coded content in the Astro source.



Projects and case studies use illustrative concepts. Testimonials are explicitly placeholders and must not be presented as genuine client endorsements.



The current contact call-to-action uses a `mailto:` link. A working contact submission endpoint has not yet been implemented.



Portfolio imagery is loaded from Unsplash and typography from Google Fonts.



\### Verified historical baseline



\- Astro dependency security upgrade was completed on the feature branch.

\- At the last recorded dependency check, `npm audit` reported zero vulnerabilities.

\- The production build succeeded after the foundation changes.

\- The local browser checklist passed after the Astro upgrade.



These are historical test results, not proof that future changes still pass. Rerun tests after relevant implementation work.



\## 4. Core Product Requirements



The CMS must manage the content and presentation data for the Emirate Studios website, including:



1\. Brand identity and site settings.

2\. Homepage text, images, buttons, and section order.

3\. Projects and portfolio categories.

4\. Project images and galleries.

5\. Case studies and project relationships.

6\. Services and service ordering.

7\. Testimonials and publication authorization.

8\. Navigation labels and links.

9\. Footer content and social links.

10\. SEO metadata, canonical URLs, and social-sharing images.

11\. Content publication and unpublication.

12\. Administrator memberships, invitations, and permissions.

13\. Appropriate activity logs and revision history.

14\. Secure contact submissions if the final scope includes them.



All supported content types must have a coherent editing experience in the custom dashboard.



The interface must not expose arbitrary HTML or JavaScript as ordinary editable content.



Content models must be versioned and documented. A content type must not be considered complete until its database rules, dashboard behavior, public rendering, authorization, validation, and tests are implemented.



\## 5. Passwordless Authentication



\### Approved sign-in methods



\- Google OAuth.

\- GitHub OAuth.



The CMS must not offer conventional email/password login, a CMS password-reset flow, or public self-registration.



Users authenticate through their existing provider accounts. Their provider accounts may still use passwords or multi-factor authentication under their own provider security settings; passwordless refers to the Emirate Studios CMS login experience.



\### Invitation-only access



Successful OAuth authentication does not automatically grant access to the CMS.



A user must also have an active, authorized CMS membership.



New users must enter through an approved invitation or the controlled first-Owner setup procedure.



Unknown, uninvited, inactive, suspended, or revoked users must not gain CMS access merely by signing in with Google or GitHub.



OAuth callbacks must validate the state of the authentication flow and use a secure PKCE-compatible session exchange.



Authentication and authorization must be verified server-side on protected routes and privileged operations.



\### Session handling



Use the supported Supabase SSR approach with secure cookie-based sessions.



Configure local, preview, and production URLs explicitly.



Do not use client-side UI checks as the sole security boundary.



Logout must clear the user's application session appropriately.



Account identity and application authorization are separate concerns. Provider profile metadata must never determine privileged application roles.



\## 6. Proposed Application Roles



The following roles are application requirements, not built-in Supabase roles.



\### Owner



\- Full CMS access.

\- Manage content and publication.

\- Manage administrator memberships and roles.

\- Manage site settings and security-sensitive operations.

\- Cannot be silently replaced or demoted by another ordinary administrator.

\- The system must protect the last active Owner from accidental removal.



\### Administrator



\- Manage permitted content and site settings.

\- Perform authorized publication actions.

\- Manage members and permissions within the approved limits.

\- Cannot remove the Owner's ultimate control.



\### Editor



\- Create and modify drafts.

\- Manage permitted content and draft media.

\- Cannot independently change security settings or grant privileged roles.

\- Cannot publish content unless an additional approved permission is explicitly implemented.



\### Publisher



\- Review, publish, and unpublish content.

\- Cannot manage membership, security settings, or Owner privileges.



\### Viewer



\- Read-only access to the dashboard data explicitly allowed for viewing.

\- Cannot create, modify, publish, delete, invite, or change roles.



\### Authorization requirements



\- Enforce permissions with server-side checks and PostgreSQL RLS policies.

\- Apply appropriate database grants as well as policies.

\- Validate role changes through trusted operations.

\- Prevent users from changing their own role through unrestricted metadata or browser requests.

\- Test both allowed and denied operations.

\- Treat hidden buttons and inaccessible pages as usability controls, not as complete security.



\## 7. Content Lifecycle



Content must have an explicit lifecycle rather than exposing draft edits directly to public visitors.



The intended lifecycle is:



1\. Create a new draft.

2\. Edit content and upload draft media.

3\. Validate required fields and relationships.

4\. Preview the draft through a protected mechanism.

5\. Publish through an authorized server-side action.

6\. Make the published version available to the public website.

7\. Preserve previous revisions for recovery where appropriate.

8\. Unpublish or archive content without leaving it publicly accessible.



The implementation must distinguish the draft being edited from the currently published version.



If a publication process involves multiple database records, use appropriate transactions or another carefully designed consistency mechanism.



Unpublishing must remove content from public queries and public sitemap generation.



Draft content must not leak through public routes, API responses, caches, image URLs, or error messages.



\## 8. Proposed Database Model



The following is a planning inventory. Exact SQL schemas, types, constraints, indexes, and relationships are to be designed and reviewed before creating migrations.



\### Identity and administration



\- `profiles`

\- `admin\_memberships`

\- `admin\_invites`

\- Supporting role definitions or authorization functions as justified by the design.



Supabase Auth remains the source of authenticated user identities. Application memberships determine the privileges those identities receive within Emirate Studios.



\### Brand and page content



\- `site\_settings`

\- `homepage\_sections`

\- `navigation\_items`

\- `footer\_settings` or equivalent configuration if justified.



Homepage sections must use a controlled set of section types with explicit rendering components.



\### Portfolio content



\- `project\_categories`

\- `projects`

\- `project\_images` or another suitable structured gallery representation.

\- `case\_studies`

\- Defined relationships between projects and case studies.



\### Other content



\- `services`

\- `testimonials`

\- Content revisions or publication-version records.

\- Audit records for privileged actions.



\### Contact and enquiries



A `contact\_messages` table may be implemented if database-backed contact submissions are approved.



It must have restricted access, validation, spam protection, and a defined retention policy.



Do not use the content tables as an unrestricted store for sensitive personal information.



\### Database engineering requirements



\- SQL migrations must be version-controlled.

\- Use stable primary keys and appropriate foreign keys.

\- Define unique constraints for slugs where required.

\- Add indexes according to access patterns.

\- Validate relationships and required fields.

\- Make important publication transitions atomic where possible.

\- Document how migrations run in development, preview, and production.

\- Never depend on manually editing production tables without recording the corresponding schema change.



\## 9. Media Management



Supabase Storage will provide media storage unless the architecture review identifies a compelling reason to use another service.



The dashboard must support image uploading, metadata, alternative text, galleries, display order, replacement, and deletion for authorized roles.



Uploaded files must be validated by type, size, and any applicable image constraints.



Storage authorization must be enforced through Storage policies and trusted server operations.



Where appropriate, distinguish draft assets from published assets.



Private previews must not expose secrets or create an unintended way to retrieve private content.



Public website images must remain accessible to public visitors by design.



\## 10. Custom Dashboard Requirements



The administration dashboard will use React and TSX within the Astro application.



It must be custom designed and responsive, including desktop, tablet, and mobile layouts.



\### Main dashboard areas



\- Dashboard overview.

\- Projects.

\- Project categories.

\- Case studies.

\- Services.

\- Testimonials.

\- Media library.

\- Homepage editor.

\- Brand and site settings.

\- SEO configuration.

\- Team and invitations.

\- Activity and revision history where implemented.



\### Dashboard interaction standards



\- Provide clear loading, success, empty, validation, and error states.

\- Protect destructive operations with confirmation.

\- Preserve unsaved form state where appropriate.

\- Use accessible labels, keyboard support, visible focus indicators, and appropriate dialog behavior.

\- Support search, filtering, ordering, and pagination where useful.

\- Avoid optimistic UI updates where doing so could falsely suggest a privileged operation succeeded.

\- Do not display secret values or sensitive error details.



Each module must work end to end. A decorative dashboard with non-functional buttons does not count as a completed feature.



\## 11. Dynamic Public Website



Astro will use Vercel's adapter and server-rendered output.



The public website will retrieve current published content from Supabase on server requests, subject to explicit caching rules.



\### Public behavior



\- Homepage sections and site settings are database-driven.

\- Projects can be created without editing the source code.

\- Individual project pages resolve from validated slugs.

\- Case studies use their own controlled routes and may reference projects.

\- Services and testimonials are rendered from published records.

\- Navigation, footer, branding, and supported SEO fields are data-driven.

\- Public queries do not retrieve draft or privileged records.

\- All public content pages should render useful HTML at the server.

\- Static assets remain static where appropriate.



Avoid unnecessary client-side fetching for primary page content when server rendering provides the information more securely and reliably.



\## 12. Caching and Publishing



A published content change must become visible without requiring a complete Vercel rebuild for every routine edit.



Use Astro's server-side rendering with a deliberate data and response-caching strategy.



The design must distinguish:



\- Dynamic public content.

\- Public assets.

\- Authenticated administration pages.

\- Draft previews.

\- Privileged API responses.



Authenticated pages, drafts, and user-specific responses must not be shared through unsafe public caches.



A future caching strategy must specify how cached published data is refreshed and how content changes invalidate or bypass stale results.



A dynamic sitemap must enumerate published public routes and exclude drafts, deleted records, login pages, and private administration paths.



Robots directives and sitemap configuration must not be treated as security controls.



\## 13. Security Requirements



\- Invite-only administration.

\- Provider authentication through Google and GitHub.

\- Cookie-based SSR sessions with secure callbacks.

\- Server-side authorization for all sensitive actions.

\- RLS and appropriate grants on exposed database resources.

\- Restricted Storage policies.

\- Runtime input validation.

\- Safe error messages and protected server logs.

\- Rate limiting for sensitive or abuse-prone endpoints.

\- Server-side secrets only.

\- No service-role keys or OAuth secrets in browser bundles.

\- No privileged secrets committed to Git.

\- Controlled environment-variable configuration.

\- Audit records for important administrative actions.

\- Appropriate database backups and recovery procedures.

\- Dependency vulnerability audits.

\- Security tests for allowed and denied operations.

\- Explicit contact-message access and retention rules if contact storage is implemented.



Do not add additional third-party services without documenting why the service is needed and how it affects cost, security, or maintenance.



\## 14. SEO, Accessibility, and Performance



The existing public visual design must be retained unless an approved design change says otherwise.



The implementation must provide:



\- Dynamic page titles and descriptions.

\- Canonical URLs and Open Graph metadata.

\- Correct indexing behavior for public pages.

\- No indexing of administration pages or previews.

\- Dynamic sitemap output.

\- Correct handling of deleted and changed slugs.

\- Accessible heading structure, labels, focus, and keyboard interaction.

\- Reduced-motion support.

\- Responsive layouts.

\- Sensible image dimensions, alternative text, and lazy loading where appropriate.

\- Optimized server queries and caching.

\- Safe handling of slow requests and failed services.



\## 15. Git and Change Management



\- Never begin an implementation task without checking the actual branch and working tree.

\- Do not directly commit CMS work to `main`.

\- Use a feature branch for the CMS foundation and subsequent coherent feature branches where appropriate.

\- Keep changes small and independently verifiable.

\- Commit only after the relevant acceptance criteria pass.

\- Do not rewrite shared commit history without an explicit reason and approved plan.

\- Inspect staged files before committing.

\- Never stage secrets.

\- Keep SQL migrations, documentation, and source changes in sync.

\- Record relevant commit hashes in the phase tracker.

\- Use pull requests and deployment previews when available.



\## 16. Testing and Acceptance



Use automated tests where practical, supplemented by manual browser testing.



\### Build and source quality



\- Production build succeeds.

\- TypeScript and Astro diagnostics have been reviewed.

\- Linting and formatting checks are configured as the project warrants.

\- Database migrations can be applied reproducibly.

\- Dependency audit has been run.



\### Authentication and authorization



\- Google sign-in works.

\- GitHub sign-in works.

\- Valid sessions are recognized on protected routes.

\- Unknown or uninvited accounts are denied.

\- Revoked memberships no longer grant access.

\- Role restrictions are enforced server-side and at the database level.

\- OAuth errors and expired sessions are handled safely.



\### Content lifecycle



\- Create and edit a draft.

\- Validate required fields.

\- Publish through an authorized role.

\- Confirm the public site reflects the published version.

\- Confirm edits to an unpublished draft do not alter public content.

\- Unpublish content and confirm it disappears from public access.

\- Restore a previous version where the revision mechanism supports it.



\### Media



\- Authorized uploads succeed.

\- Invalid files are rejected.

\- Unauthorized uploads and deletions are denied.

\- Alternative text and ordering persist correctly.

\- Published assets are rendered correctly.



\### UX and rendering



\- Public routes render valid HTML on the server.

\- Admin routes work on desktop and mobile.

\- Keyboard accessibility and reduced motion are tested.

\- Cache behavior is checked for stale content and private-response leakage.

\- Dynamic sitemap contains only intended public URLs.



\### Deployment



\- Local, Preview, and Production configuration is explicit.

\- OAuth callbacks are verified for each approved origin.

\- Environment variables are assigned correctly.

\- Production rollback and recovery instructions are documented.



Test status must be marked as passed, failed, or not run. Never describe an unexecuted test as successful.



\## 17. Phased Implementation



\### Phase 00 — Memory, Git, and recovery



Status: currently in progress.



Create and commit project documentation, verify the merged foundation, establish the CMS feature branch, and preserve the current production branch.



\### Phase 01 — Environment and external-service configuration



Create the Supabase project, configure environment variables, configure Google and GitHub OAuth, and prepare local, Preview, and Production settings.



\### Phase 02 — SSR and framework foundation



Add the compatible Astro Vercel adapter, React integration, Supabase libraries, validation tools, and baseline quality checks.



\### Phase 03 — Database and authorization



Define migrations, content models, roles, memberships, invitations, RLS, storage policies, and database tests.



\### Phase 04 — OAuth and protected sessions



Implement provider login, callback handling, the first Owner procedure, invitation acceptance, membership checks, logout, and route guards.



\### Phase 05 — Dashboard shell



Build the responsive dashboard layout, navigation, access-aware UI, common forms and tables, notifications, and loading/error states.



\### Phase 06 — Content and media management



Implement site settings, homepage sections, projects, categories, case studies, services, testimonials, and media.



\### Phase 07 — Dynamic publishing and public routes



Connect the public website to published database content, add dynamic project and case-study routes, and implement versioned publishing.



\### Phase 08 — Team, audit, and contact workflows



Complete team management, role changes, audit history, and approved contact-message handling.



\### Phase 09 — SEO and hardening



Complete dynamic metadata, sitemap, caching, security, accessibility, performance, and regression testing.



\### Phase 10 — Production release and handover



Verify deployment, perform end-to-end testing, confirm backups and recovery, document operations, and merge the approved CMS implementation.



Phase progression is conditional on the prior phase's acceptance criteria, not just the presence of code files.



\## 18. Scope Boundaries and Future Decisions



The initial scope is the Emirate Studios marketing portfolio and its content administration.



The following are not automatically included and require explicit approval if needed:



\- Customer accounts or client portals.

\- Payment processing or e-commerce.

\- A CRM more extensive than the approved enquiry workflow.

\- Arbitrary visual page composition beyond supported homepage section types.

\- Custom analytics infrastructure.

\- Additional identity providers.

\- Real-time collaboration beyond necessary dashboard interaction.

\- Additional databases or external storage providers.



When a new requirement is approved, update this blueprint and the decision log before implementing it if it changes the architecture.



\## 19. Phase Completion Record



Each phase must record:



\- Scope completed.

\- Files added or modified.

\- Database migrations added, if applicable.

\- Tests executed and their actual results.

\- Known issues or unresolved risks.

\- Commit hash and branch.

\- Any accepted deviation from this blueprint.

\- The precise next action.



Do not overwrite project history with an unverified summary.



\## 20. Non-Negotiable Engineering Principles



1\. Security and authorization are designed with each feature, not added at the end.

2\. The public website reads published content, never unrestricted draft content.

3\. No privileged secret may reach browser JavaScript.

4\. Every form and server-side operation is validated.

5\. Database changes are versioned and reproducible.

6\. Every significant feature has a testable acceptance criterion.

7\. Existing working behavior must not be regressed silently.

8\. Architectural changes require a documented decision.

9\. Code must be complete enough to apply and verify; no unexplained placeholders in implemented features.

10\. Future sessions must consult the project handbook and actual repository before changing code.



\---



\*\*End of Project Blueprint\*\*



