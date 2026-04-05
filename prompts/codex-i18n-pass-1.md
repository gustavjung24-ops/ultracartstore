# Codex i18n Pass 1

Repo: `gustavjung24-ops/ultracartstore`

## Task

Perform the first i18n cleanup pass for this repo.

This pass is NOT a full translation rollout.
This pass is focused on removing shared hardcoded UI text and centralizing reusable interface labels.

Follow the governance docs already in the repo:

- `docs/content-inventory.md`
- `docs/translation-glossary.md`
- `docs/translation-rules.md`
- `docs/i18n-architecture.md`
- `docs/todo-by-file.md`

Also use the proposed locale files as reference:
- `proposed/common.en.proposed.json`
- `proposed/common.vi.proposed.json`

---

## Objectives

1. Keep the current cookie-based language switching model.
2. Do NOT redesign routing.
3. Do NOT introduce `/en` or `/vi` route restructuring.
4. Move reusable shared UI strings out of components/pages.
5. Centralize reusable UI labels in locale JSON.
6. Minimize inline bilingual ternary strings for shared interface labels.
7. Preserve existing behavior as much as possible.

---

## Important Constraints

- English remains the source of truth.
- Vietnamese must stay natural and consistent with the glossary.
- Do not rename existing runtime-critical keys unless necessary.
- Do not break page rendering.
- Do not perform unrelated refactors.
- Do not rewrite page content aggressively in this pass.
- Focus on shared UI text only.

---

## Files to inspect first

Priority files:
- `app/page.tsx`
- `app/[...slug]/page.tsx`
- `components/SidebarMenu.tsx`

Also inspect for related usage:
- `public/locales/en/common.json`
- `public/locales/vi/common.json`
- `lib/pcrm-content.ts`

---

## What should be moved to locale files

Move reusable labels such as:
- News and Events
- Related Links
- Support Our Mission
- Main Menu
- Support
- Read More
- Learn More
- Back / Go Back
- Home breadcrumb
- common contact labels
- common product labels if reused across UI

Do not move highly page-specific long-form content in this pass unless it is clearly reusable UI copy.

---

## Implementation Rules

### 1. Prefer locale keys for shared UI labels
Use locale-driven access for repeated text.

### 2. Keep components presentational
Components should render values, not own reusable wording.

### 3. Minimize inline branching
Avoid patterns like:
- `lang === "vi" ? "Tin tức và Sự kiện" : "News and Events"`

for repeated labels when a locale key can be used instead.

### 4. Preserve behavior
Do not break current cookie-driven language behavior.

### 5. Keep diffs focused
This pass should be clean and limited in scope.

---

## Expected Deliverables

### Deliverable A
Update locale files with any missing shared UI keys.

### Deliverable B
Refactor:
- `app/page.tsx`
- `app/[...slug]/page.tsx`
- `components/SidebarMenu.tsx`

so they stop hardcoding repeated UI labels.

### Deliverable C
Leave page-specific structured content for later passes.

---

## Out of Scope for Pass 1

- full page-by-page Vietnamese translation rewrite
- route localization redesign
- CMS redesign
- large refactor of structured PCRM content
- SEO rewrite
- storefront architecture rewrite

---

## Quality Standard

The result is acceptable only if:
- shared UI strings are more centralized
- hardcoded repeated labels are reduced
- locale wording follows the glossary
- no obvious regression is introduced
- code remains readable

---

## Final Check Before Commit

Before finalizing:
1. compare English and Vietnamese locale keys
2. confirm shared labels match across both files
3. confirm pages still render
4. confirm current language switching still works
5. confirm no unrelated files were changed unnecessarily
