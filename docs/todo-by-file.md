# TODO by File

Repo: `gustavjung24-ops/ultracartstore`

## Priority Legend
- **P1** = do first
- **P2** = do after P1
- **P3** = later / audit / optional cleanup

---

## P1 — Governance and structure

### `docs/content-inventory.md`
- [x] Add to repo
- [x] Treat as baseline content audit
- [ ] Update if new content sources are discovered

### `docs/translation-glossary.md`
- [x] Add to repo
- [x] Use as terminology lock before new translation work
- [ ] Expand only when recurring terms appear

### `docs/translation-rules.md`
- [x] Add to repo
- [x] Use for all translation and Codex-assisted work

### `docs/i18n-architecture.md`
- [x] Add to repo
- [x] Use as architecture reference before refactoring

### `docs/todo-by-file.md`
- [x] Add to repo
- [x] Keep updated as tasks are completed

---

## P1 — Locale source cleanup

### `public/locales/en/common.json`
- [x] Review keys currently in use
- [x] Ensure shared UI strings exist here
- [x] Add missing shared labels from hardcoded components/pages
- [x] Keep wording short and stable

### `public/locales/vi/common.json`
- [x] Rewrite awkward machine-like wording
- [x] Align all keys with English exactly
- [x] Normalize navigation labels
- [x] Normalize CTA wording
- [x] Normalize footer and generic section labels

---

## P1 — Remove hardcoded shared UI text

### `app/page.tsx`
- [x] Identify reusable labels currently hardcoded
- [x] Move shared labels to locale files
- [x] Minimize inline EN/VI ternaries for shared UI
- [x] Keep page-specific content separate from generic UI copy

### `app/[...slug]/page.tsx`
- [x] Move breadcrumb labels to locale files
- [x] Move generic “Related Links” style labels to locale files
- [x] Reduce inline language branching for reusable copy

### `components/SidebarMenu.tsx`
- [x] Move all menu/support labels into locale files
- [x] Remove direct Vietnamese hardcoding
- [x] Keep component presentational

---

## P2 — Content layer cleanup

### `lib/pcrm-content.ts`
- [x] Review current source-loading logic
- [x] Clarify EN source vs VI translated data ownership
- [x] Centralize content language resolution here where possible
- [x] Reduce page-level content language branching elsewhere
- [x] Add helper patterns for selecting localized fields

### `pcrm_translated/generated_source_pages.json`
- [ ] Confirm this remains the structured source-side reference
- [ ] Document expected schema if needed

### `pcrm_translated/translated_all.json`
- [ ] Audit translation quality
- [ ] Mark as draft/reference if not editorially reviewed
- [ ] Avoid direct trust as final publish-ready copy

### `pcrm_translated/pages/*`
- [ ] Audit usage
- [ ] Confirm whether runtime or generation-only
- [ ] Document role

---

## P2 — Homepage and shared experience polish

### Homepage-related files
- [ ] Standardize homepage UI labels
- [ ] Standardize hero/support labels
- [ ] Review trust-facing wording for Vietnamese readers
- [ ] Remove leftover machine-like headings

### Shared navigation/footer files
- [ ] Ensure all repeated labels come from locale files
- [ ] Match glossary-approved wording

---

## P3 — Legacy storefront audit

### `data/product.ts`
- [ ] Confirm whether still actively needed
- [ ] Remove role as accidental global content source
- [ ] Keep only for storefront/product fallback if still used

### `components/ProductInfo.tsx`
- [ ] Review dependence on legacy product text
- [ ] Separate storefront concerns from educational content concerns

---

## P3 — Future optional improvements

### Locale organization
- [ ] Consider splitting `common.json` into namespaces later
- [ ] Example future files:
  - `nav.json`
  - `footer.json`
  - `home.json`

### Runtime architecture
- [ ] Revisit whether cookie-based switching remains enough long-term
- [ ] Do NOT migrate route structure during initial cleanup unless explicitly planned

---

## Delivery Order

### Commit 1
- Add all `docs/*`

### Commit 2
- Add revised/proposed locale files
- Add Codex prompt file

### Commit 3
- Refactor `app/page.tsx`
- Refactor `app/[...slug]/page.tsx`
- Refactor `components/SidebarMenu.tsx`

### Commit 4
- Improve `lib/pcrm-content.ts`
- Begin structured content cleanup

### Commit 5+
- Start page-by-page translation rollout

---

## Definition of Ready for Full Translation

The repo is ready for full translation work when:
- governance docs exist
- locale files are stabilized
- shared hardcoded UI text has been removed
- content ownership is clear
- glossary and rules are being followed consistently