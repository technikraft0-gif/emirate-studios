

\# Emirate Studios — Test Plan



\*\*Purpose:\*\* Define test coverage, acceptance criteria, and evidence required before features and releases are accepted.



\*\*Related documents:\*\*



\- `PROJECT\_BLUEPRINT.md`

\- `PHASE\_TRACKER.md`

\- `DECISIONS.md`



\*\*Default rule:\*\* A test that has not been executed must remain NOT RUN. Code that has not been verified must not be described as working.



\---



\## 1. Test Status Definitions



Use these states in test reports:



\- `NOT RUN`: no execution evidence is recorded.

\- `PASS`: the required test was executed and met the acceptance criterion.

\- `FAIL`: the test was executed and did not meet the criterion.

\- `BLOCKED`: execution is prevented by an unresolved prerequisite.

\- `NOT APPLICABLE`: the test does not apply to the feature or environment.



Record the date, environment, command or procedure, observed result, and any linked issue for important failures.



A successful production build is not proof that every runtime behavior works.



A clean dependency audit is not proof that the application's own authorization model is secure.



\## 2. Historical Baseline



The following tests were reported as passing on the existing site before CMS implementation:



\- Astro production build.

\- npm dependency audit after the Astro upgrade.

\- Local browser checks for desktop layout, mobile navigation, responsive layout, portfolio filters, images/reveals, keyboard access, browser console, and contact link.

\- Sitemap output after the foundation update.

\- `git diff --check` after whitespace cleanup.



These are historical results. Re-run the appropriate tests after changing rendering mode, authentication, routing, styles, content queries, or deployment configuration.



Do not mark a future test as passed just because the old static site passed it.



\## 3. Development Environment Tests



\### Commands



\- \[ ] `node -v`

\- \[ ] `npm -v`

\- \[ ] `npm ls --depth=0`

\- \[ ] `npm audit`

\- \[ ] `npm run build`

\- \[ ] `git diff --check`

\- \[ ] `git status --short --branch`



\### Acceptance criteria



\- Required runtime versions are installed.

\- Dependencies are installed and consistent with the lockfile.

\- Production build completes without errors.

\- Security audit results are reviewed.

\- Whitespace and merge-conflict markers are not introduced.

\- Only intended files are changed.

\- No secret credentials appear in tracked or staged files.



Record relevant warnings rather than hiding them.



\## 4. SSR and Framework Tests



\### Local rendering



\- \[ ] The homepage renders successfully through Astro SSR.

\- \[ ] Direct navigation to each public route works.

\- \[ ] Direct navigation to an admin route follows the correct authentication flow.

\- \[ ] Unknown slugs produce the intended not-found behavior.

\- \[ ] A server-side dependency failure does not expose internal secrets.

\- \[ ] Browser hydration errors are checked for interactive React components.

\- \[ ] Existing visual behavior is compared against the established baseline.



\### Vercel deployment



\- \[ ] Preview deployment succeeds.

\- \[ ] Production configuration is separate from Preview configuration.

\- \[ ] Required environment variables are set in the correct environment.

\- \[ ] Provider callback URLs match the deployment origin.

\- \[ ] Server-only secrets are not in browser bundles.

\- \[ ] Dynamic routes run through the intended Vercel runtime.

\- \[ ] Deployment rollback instructions are documented.



\## 5. Google and GitHub Authentication Tests



\### Sign-in success



\- \[ ] Google login starts the correct OAuth flow.

\- \[ ] A valid authorized Google identity can complete the callback.

\- \[ ] GitHub login starts the correct OAuth flow.

\- \[ ] A valid authorized GitHub identity can complete the callback.

\- \[ ] Session cookies are set and read correctly.

\- \[ ] The user reaches the correct post-login destination.

\- \[ ] Logout clears the application session.



\### Sign-in failures



\- \[ ] Provider consent denial is handled without exposing raw errors.

\- \[ ] Missing authorization code is handled.

\- \[ ] Invalid state or callback parameters are rejected.

\- \[ ] PKCE/session-exchange failure is handled safely.

\- \[ ] Expired or invalid sessions are rejected.

\- \[ ] An unexpected redirect destination is rejected.

\- \[ ] OAuth provider configuration errors produce a safe, actionable message.



\### Invitation-only access



\- \[ ] An authorized, invited identity can be activated.

\- \[ ] An uninvited identity is denied CMS access.

\- \[ ] An expired invitation is denied.

\- \[ ] A revoked invitation is denied.

\- \[ ] An inactive or suspended membership is denied.

\- \[ ] Email matching requires the intended verified identity.

\- \[ ] Signing in with another provider does not automatically grant privileges.

\- \[ ] Provider profile metadata cannot grant a privileged application role.

\- \[ ] Duplicate invitations are handled predictably.

\- \[ ] The first Owner cannot be claimed through an unsafe public bootstrap route.



\### Passwordless requirement



\- \[ ] No CMS email/password form is present.

\- \[ ] No password-reset flow is implemented.

\- \[ ] No public sign-up form grants CMS access.

\- \[ ] Google and GitHub are the only configured CMS identity-provider options.



OAuth providers may themselves require the user to authenticate with a password or MFA. The application itself must not create a separate CMS password.



\## 6. Authorization and Role Tests



Test each role independently:



\- Owner

\- Administrator

\- Editor

\- Publisher

\- Viewer



\### Positive tests



\- \[ ] Owner can perform approved Owner operations.

\- \[ ] Administrator can perform permitted administrative operations.

\- \[ ] Editor can create and update permitted drafts.

\- \[ ] Publisher can perform allowed publication actions.

\- \[ ] Viewer can access only permitted read-only information.



\### Negative tests



\- \[ ] Viewer cannot create, edit, publish, or delete content.

\- \[ ] Editor cannot publish when not granted publication permission.

\- \[ ] Publisher cannot manage administrator membership.

\- \[ ] Administrator cannot override Owner protections.

\- \[ ] A user cannot promote themselves by editing a browser request.

\- \[ ] A user cannot alter their role through profile metadata.

\- \[ ] A revoked member's existing session loses CMS authorization.

\- \[ ] An unauthorized user cannot call privileged server endpoints directly.

\- \[ ] The final active Owner cannot be accidentally removed or demoted.



UI controls being hidden is not sufficient. Test the underlying server endpoints, database operations, and Storage access as well.



\## 7. Database and RLS Tests



\- \[ ] SQL migrations apply to a clean development database.

\- \[ ] Database constraints reject invalid values.

\- \[ ] Unique slug constraints work.

\- \[ ] Foreign keys prevent invalid content relationships.

\- \[ ] Appropriate indexes exist for common queries.

\- \[ ] RLS is enabled where required on exposed tables.

\- \[ ] Grants and RLS policies work together as intended.

\- \[ ] An unauthenticated public client cannot read drafts.

\- \[ ] Public clients cannot insert or modify administrative records.

\- \[ ] Authenticated users cannot read or edit another user's restricted data.

\- \[ ] Unauthorized role changes are denied.

\- \[ ] Publishing transitions maintain content consistency.

\- \[ ] Database failures are handled without false success responses.

\- \[ ] Migrations are reproducible in the documented order.



Test both allowed and denied requests. At least one test must demonstrate each important restriction.



\## 8. Content CRUD Tests



For each content type, test Create, Read, Update, and Delete/Archive operations.



Content types include:



\- Site settings.

\- Homepage sections.

\- Project categories.

\- Projects.

\- Project images and galleries.

\- Case studies.

\- Services.

\- Testimonials.

\- Content revisions.

\- Contact messages, if implemented.



\### Shared tests



\- \[ ] Authorized creation succeeds.

\- \[ ] Required fields are validated.

\- \[ ] Invalid input is rejected.

\- \[ ] Slugs are valid and unique where required.

\- \[ ] Updates persist after refresh.

\- \[ ] Relationships are validated.

\- \[ ] Ordering and visibility settings persist.

\- \[ ] Unauthorized operations are denied.

\- \[ ] Destructive actions require appropriate confirmation.

\- \[ ] Failed requests preserve useful user input where appropriate.

\- \[ ] Empty states and loading states render correctly.

\- \[ ] Success notifications occur only after the operation succeeds.



\## 9. Draft and Publishing Tests



\- \[ ] A new item starts in the approved initial state.

\- \[ ] Editing a draft does not alter the public version.

\- \[ ] Unauthorized users cannot publish.

\- \[ ] Authorized publishing changes the active published version.

\- \[ ] The public route renders the published content.

\- \[ ] Draft content cannot be retrieved through public queries.

\- \[ ] Unpublishing removes content from public queries.

\- \[ ] Unpublished content is not included in the sitemap.

\- \[ ] Deleted or archived content follows the documented public-access policy.

\- \[ ] Previous published content can be restored if supported.

\- \[ ] Concurrent edits are handled safely.

\- \[ ] Publication and revision history remain consistent.

\- \[ ] A failure partway through publication does not create a partially published state.



\## 10. Media and Storage Tests



\- \[ ] Authorized users can upload allowed image types.

\- \[ ] Unsupported file types are rejected.

\- \[ ] Oversized uploads are rejected.

\- \[ ] File metadata and alternative text persist.

\- \[ ] Gallery ordering persists.

\- \[ ] Authorized media replacement works.

\- \[ ] Authorized media deletion works.

\- \[ ] Unauthorized uploads are denied.

\- \[ ] Unauthorized downloads of private assets are denied.

\- \[ ] Draft-only assets are not exposed through public routes.

\- \[ ] Published image URLs render correctly.

\- \[ ] Image replacement does not leave unintended stale references.

\- \[ ] Storage failures produce a recoverable dashboard state.



\## 11. Public Website Tests



\### Dynamic content



\- \[ ] Homepage data comes from current published settings.

\- \[ ] Projects display the correct content and images.

\- \[ ] Categories and filters reflect actual project records.

\- \[ ] Project routes resolve from valid slugs.

\- \[ ] Case-study routes resolve and display correct relationships.

\- \[ ] Services display the published values.

\- \[ ] Testimonials display only authorized content.

\- \[ ] Navigation and footer update when settings change.

\- \[ ] Disabled homepage sections are omitted as intended.

\- \[ ] Reordering sections produces the correct display order.

\- \[ ] Content updates become visible under the documented cache policy.



\### Public security



\- \[ ] Drafts cannot be loaded by changing route parameters.

\- \[ ] Private administrative data does not appear in page output.

\- \[ ] Server errors do not expose credentials or internal stack traces.

\- \[ ] Public responses do not include authentication tokens.

\- \[ ] Unpublished slugs are not leaked through public listings or sitemap entries.



\### Not-found behavior



\- \[ ] An unknown project slug returns the intended not-found response.

\- \[ ] An unpublished project slug is not presented as public content.

\- \[ ] An unknown case-study slug returns the intended not-found response.



\## 12. SEO, Cache, and Rendering Tests



\- \[ ] Page titles are correct.

\- \[ ] Meta descriptions are correct.

\- \[ ] Canonical URLs use the production domain.

\- \[ ] Open Graph metadata reflects the rendered page.

\- \[ ] Image alternative text is correct where meaningful.

\- \[ ] Dynamic sitemap contains intended published public routes.

\- \[ ] Sitemap excludes admin, private, draft, and unpublished content.

\- \[ ] Robots output is consistent with the indexing policy.

\- \[ ] Admin routes and authenticated responses are not shared through public caches.

\- \[ ] Draft previews are not accidentally publicly cached.

\- \[ ] Cache invalidation or refresh behaves as documented.

\- \[ ] A published update is not indefinitely hidden by stale cached HTML.

\- \[ ] Redirect behavior is correct when public slugs change.



Robots directives are not a security mechanism. Private content must be protected through authentication, authorization, database policy, and cache controls.



\## 13. Contact Handling Tests



Apply if a database-backed contact form is approved.



\- \[ ] Valid submissions are accepted.

\- \[ ] Required fields are validated on the server.

\- \[ ] Invalid or malformed input is rejected.

\- \[ ] Spam protections and rate limits are effective.

\- \[ ] User-facing errors do not reveal internal details.

\- \[ ] Unauthorized users cannot enumerate or read submissions.

\- \[ ] Only approved administrative roles can access messages.

\- \[ ] The documented delivery and retention policy is followed.

\- \[ ] Deletion and retention behavior can be verified.

\- \[ ] Sensitive message content is excluded from inappropriate logs.



\## 14. Responsive Design and Accessibility



\### Public website



\- \[ ] Desktop layout.

\- \[ ] Tablet layout.

\- \[ ] Mobile layout.

\- \[ ] Small-screen layout.

\- \[ ] Keyboard navigation.

\- \[ ] Visible focus indicators.

\- \[ ] Accessible headings and labels.

\- \[ ] Reduced-motion behavior.

\- \[ ] Color contrast for important content.

\- \[ ] Images, menus, and forms work without unwanted overflow.



\### Dashboard



\- \[ ] Sidebar and navigation work at desktop sizes.

\- \[ ] Mobile navigation remains usable.

\- \[ ] Tables have a suitable small-screen strategy.

\- \[ ] Forms and modals are keyboard accessible.

\- \[ ] Focus is managed correctly by dialogs.

\- \[ ] Validation messages are associated with their fields.

\- \[ ] Loading, empty, denied, and error states are understandable.

\- \[ ] Buttons and form submissions do not produce duplicate operations.



\## 15. Error Handling and Performance



\- \[ ] Slow database requests are handled gracefully.

\- \[ ] Temporary failures do not imply data was saved.

\- \[ ] Sensitive error details are not returned to clients.

\- \[ ] Server-side logs omit secrets and unnecessary personal data.

\- \[ ] API and submission endpoints apply appropriate rate limiting.

\- \[ ] Images use suitable sizes and loading behavior.

\- \[ ] Common database queries avoid unnecessary repeated requests.

\- \[ ] Public routes have explicit cache behavior.

\- \[ ] Admin routes do not expose sensitive responses through shared caching.

\- \[ ] Production dependencies are reviewed after significant upgrades.



Performance targets should be measured on deployed preview pages and recorded with the test environment. Do not invent performance scores without running the measurement.



\## 16. Git and Release Checks



Before every meaningful commit:



\- \[ ] Correct branch is active.

\- \[ ] Working-tree changes have been reviewed.

\- \[ ] Staged-file list contains only intended files.

\- \[ ] No credentials or secrets are staged.

\- \[ ] `git diff --cached --check` passes.

\- \[ ] Relevant automated tests have been run.

\- \[ ] Relevant build checks pass.

\- \[ ] Commit message clearly describes the work.



Before release:



\- \[ ] CMS branch is reviewed.

\- \[ ] Preview deployment passes.

\- \[ ] Production environment variables are verified.

\- \[ ] Required migrations have been applied using the documented procedure.

\- \[ ] OAuth callbacks work on the deployed origin.

\- \[ ] Publishing workflow is tested end to end.

\- \[ ] Rollback and recovery instructions are available.



\## 17. Test Execution Record



Record meaningful test sessions here.



\### Entry template



\*\*Date:\*\*



\*\*Phase:\*\*



\*\*Environment:\*\* Local / Preview / Production



\*\*Commit:\*\*



\*\*Test commands or procedures:\*\*



\*\*Results:\*\* PASS / FAIL / BLOCKED / NOT RUN



\*\*Failures and evidence:\*\*



\*\*Fixes applied:\*\*



\*\*Retest result:\*\*



\*\*Remaining risk:\*\*



Do not substitute a successful build for integration, authorization, or browser testing.



\---



\*\*End of Test Plan\*\*



