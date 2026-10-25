

\# Emirate Studios — AI Development Instructions



These instructions apply to AI coding agents and assisted development sessions working in this repository.



\## 1. Mandatory Reading Order



Before proposing or modifying implementation code, read:



1\. `AGENTS.md`

2\. `docs/PROJECT\_BLUEPRINT.md`

3\. `docs/PHASE\_TRACKER.md`

4\. `docs/DECISIONS.md`

5\. `docs/TEST\_PLAN.md`

6\. The relevant source files and configuration.

7\. Relevant SQL migrations and tests when working on backend features.



If documentation conflicts with actual code or Git history, identify the conflict rather than silently guessing. Update the relevant documentation when an approved decision resolves the mismatch.



Do not rely solely on conversation history for the current state of the repository.



\## 2. Inspect Before Changing



Before changing any file:



1\. Confirm the repository root.

2\. Inspect the current Git branch and working-tree status.

3\. Inspect the existing file contents and related imports.

4\. Read the relevant architecture and decision records.

5\. Identify whether the proposed change belongs to the current implementation phase.

6\. Identify the acceptance criteria and likely regression risks.



Do not recreate files or overwrite existing work without checking what they contain.



Never assume a command ran or a change was saved unless its result has been observed.



\## 3. Architecture Rules



The approved stack is:



\- Astro for the application and server-rendered public routes.

\- TypeScript for application logic.

\- React/TSX for the interactive custom dashboard.

\- CSS for styling, retaining the existing public design system.

\- SQL for schema migrations, constraints, database functions, and RLS policies.

\- Supabase PostgreSQL for persistent data.

\- Supabase Auth with Google and GitHub OAuth only.

\- Supabase Storage for media.

\- Astro's compatible Vercel adapter for server rendering.

\- GitHub for version control.

\- Vercel for application deployment.



Do not introduce Sanity or another hosted CMS as the primary content-management interface.



Do not replace Astro with another frontend framework without an approved architecture change.



Do not add Tailwind or other UI/styling frameworks without a documented reason and approval.



Prefer the simplest architecture that meets the approved requirements. Do not add services, dependencies, background systems, or abstractions merely because they are available.



\## 4. Authentication Rules



The CMS login experience must support Google and GitHub OAuth through Supabase Auth.



Do not introduce:



\- CMS email/password login.

\- CMS password-reset forms.

\- Public CMS self-registration.

\- Unrestricted administrator bootstrap routes.

\- Privilege assignment based on user-controlled profile metadata.



Authentication and application authorization are different.



A successful OAuth login must not automatically grant CMS access.



Every CMS request must be checked against an authorized application membership and the permissions required for that operation.



Use the supported Supabase SSR authentication approach and the configured secure session flow.



Validate OAuth callback state, handle errors safely, and restrict redirects to approved destinations.



Never store provider client secrets in source files or browser bundles.



\## 5. Authorization and Database Rules



Do not treat hidden UI controls or client-side route guards as sufficient authorization.



For every privileged operation:



1\. Authenticate the request.

2\. Verify active membership and the required role or capability.

3\. Validate all untrusted input.

4\. Enforce database permissions and applicable RLS policies.

5\. Perform the operation safely.

6\. Return a response appropriate to the outcome.

7\. Record important administrative actions where required.



RLS policies and database grants must be designed together.



Never expose a Supabase service-role or secret key to client-side JavaScript.



Never let a user grant themselves a role through an untrusted request.



Prevent the final active Owner from being accidentally removed or demoted.



Treat unknown, inactive, suspended, or revoked members as unauthorized.



Test both allowed and denied operations.



\## 6. Draft and Publishing Rules



The public website may retrieve only published content.



An Editor saving a draft must not change the public version.



Publishing must be a privileged server-side action.



Unpublishing must remove content from public queries, dynamic routes, and the public sitemap.



Do not allow draft previews to leak through public routes, logs, shared caches, or Storage permissions.



Do not render arbitrary user-provided HTML or JavaScript from editable content.



Use controlled, schema-defined content types and components.



Where changes involve multiple related records, use an appropriate transaction or consistency mechanism.



\## 7. Server Rendering and Caching



Astro must use server rendering by default once the SSR phase is accepted.



Static assets should remain static where appropriate.



Avoid moving primary content fetching into the browser when server-side rendering provides a more secure and useful result.



Authenticated admin responses, draft previews, and user-specific data must not be exposed through unsafe public caching.



Define cache policy explicitly for dynamic public pages.



Do not claim that a content change is immediately visible until the relevant query, caching, and rendering behavior has been verified.



\## 8. Secrets and Environment Configuration



\- Do not commit `.env` files or credential values.

\- Do not place provider secrets in TypeScript constants.

\- Do not expose Supabase secret/service-role keys in `PUBLIC\_` environment variables or browser bundles.

\- Keep deployment-hook URLs and other privileged credentials server-side.

\- Use distinct local, Preview, and Production configuration.

\- Provide `.env.example` only with placeholder names and clearly fake example values.

\- Never ask the user to paste secret credentials into chat.

\- If a secret is accidentally committed, treat it as exposed and recommend revocation and rotation; deleting the line alone is insufficient.



Check `.gitignore` and the staged-file list before each commit.



\## 9. Coding and File-Delivery Standards



When providing code for the project owner to apply locally:



1\. State the exact file path.

2\. Explain whether the file is new, fully replaced, or partially edited.

3\. For a full replacement, provide the complete file contents.

4\. For a partial change, identify an unambiguous insertion or replacement point.

5\. Include required imports and dependencies.

6\. Handle validation and errors.

7\. Avoid pseudocode in files claimed to be implemented.

8\. Explain required environment variables by name without requesting their values.

9\. Include the exact commands to validate the change.

10\. Identify relevant expected outcomes and failure conditions.



Do not silently omit sections of a large file.



Do not provide a partial file as though it were complete.



Avoid asking the project owner to make ambiguous changes such as "adjust the code as needed."



Respect the owner's workflow: the owner copies code into the local project, runs the commands, and provides the actual results.



\## 10. Testing and Reporting



Never claim to have run commands on the owner's local machine.



Never describe a test as passed unless the execution result was observed.



Distinguish clearly between:



\- Implemented.

\- Build-verified.

\- Unit-tested.

\- Integration-tested.

\- Browser-tested.

\- Preview-deployment-tested.

\- Production-verified.

\- Not yet tested.



A successful build does not prove that authentication, authorization, database permissions, publishing, or browser behavior works.



A zero-vulnerability dependency audit does not prove application security.



After a failure:



1\. Capture the actual error.

2\. Identify the likely cause from evidence.

3\. Make the smallest appropriate change.

4\. Rerun the relevant test.

5\. Record the result in `docs/PHASE\_TRACKER.md` and `docs/TEST\_PLAN.md` where applicable.



Do not skip verification simply to advance to the next phase.



\## 11. Git Workflow



\- Inspect the current branch before modifying code.

\- Do not work directly on `main`.

\- Keep related changes on a feature branch.

\- Do not create duplicate branches without inspecting existing branches first.

\- Stage only intended files.

\- Review staged filenames and diffs before committing.

\- Run `git diff --cached --check`.

\- Never commit secrets, generated output, or unintended files.

\- Do not force-push or rewrite shared history without an approved reason.

\- Commit only after the relevant acceptance criteria pass.

\- Push the intended branch and verify the result.

\- Use pull requests and Preview deployments where available.



If a command fails because a branch or file already exists, inspect the actual state before repeating it.



\## 12. File and Dependency Management



Inspect `package.json` and `package-lock.json` before adding dependencies.



Use versions compatible with the installed Astro release and the relevant integrations.



Do not run broad or forced dependency upgrades to address an isolated problem without assessing the impact.



Use the project's existing package manager and preserve its lockfile.



Create SQL migrations for schema changes rather than relying on undocumented manual database edits.



Do not remove files or dependencies merely because they appear unused without checking imports, configuration, and project requirements.



\## 13. UI and UX Standards



Preserve the established Emirate Studios visual identity unless a redesign is approved.



The dashboard must be professionally designed, responsive, accessible, and consistent.



Every interactive feature must include appropriate:



\- Loading state.

\- Empty state.

\- Validation state.

\- Success feedback.

\- Failure feedback.

\- Permission-denied behavior.

\- Keyboard and focus support.

\- Confirmation for destructive actions.



Use semantic HTML and accessible labels.



Support reduced-motion preferences.



Ensure mobile layouts do not hide important operations or require desktop-only interaction.



Do not build decorative controls that have no functional behavior.



Do not use fabricated production metrics, testimonials, or user records to imply real operational results.



\## 14. Phase and Memory Discipline



Follow the sequence in `docs/PHASE\_TRACKER.md`.



Do not start a dependent phase before its prerequisites and acceptance criteria are satisfied.



Update `docs/PHASE\_TRACKER.md` after meaningful progress.



Update `docs/DECISIONS.md` when an architecture decision is made or changed.



Update `docs/TEST\_PLAN.md` with actual relevant test results.



Update `docs/PROJECT\_BLUEPRINT.md` when an approved requirement or major architecture detail changes.



At the end of an implementation checkpoint, record:



\- Actual branch and commit.

\- Files added or changed.

\- Tests actually executed and their results.

\- Known issues and unresolved decisions.

\- Exact next action.



Keep documentation consistent with the code. Do not mark work complete merely because code was generated.



\## 15. Handling Missing Information



Do not invent:



\- OAuth client IDs or secrets.

\- Supabase project identifiers.

\- Production environment-variable values.

\- Database passwords.

\- Real client testimonials.

\- Verified case-study outcomes.

\- Deployment status.

\- Test results.

\- Production configuration.



When a value is required, identify the setting, explain where the project owner obtains it, and describe how it must be configured safely.



When code can be written safely without a credential, provide the implementation while leaving configuration as an explicitly documented prerequisite.



\## 16. Definition of Done



A feature is complete only when:



\- It satisfies the approved requirements.

\- Its code is integrated at the correct file paths.

\- Its input and failure handling are implemented.

\- Its access controls are enforced.

\- Relevant positive and negative tests have been run.

\- The production build passes when applicable.

\- Relevant browser behavior has been checked.

\- No secrets or unintended files are staged.

\- The tracker and decision documents are current.

\- The changes are committed on the correct branch.



\---



\*\*End of AI Development Instructions\*\*



