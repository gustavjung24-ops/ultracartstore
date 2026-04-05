# Content Inventory

Repo: `gustavjung24-ops/ultracartstore`

## Purpose

This document inventories where content currently lives in the repo and classifies each content source by role, risk, and intended future ownership.

The goal is to stop mixing:
- UI strings
- page content
- legacy storefront data
- auto-generated / machine-translated PCRM data

This inventory is the baseline for i18n cleanup before full Vietnamese localization.

---

## Current Content Sources

### 1. `public/locales/en/common.json`
**Type:** UI strings  
**Role:** Existing locale source for English  
**Status:** Keep  
**Notes:** Should become one of the main sources of truth for shared interface text.

Contains or should contain:
- navigation labels
- footer labels
- generic CTA labels
- common buttons
- common section headings
- breadcrumb labels

---

### 2. `public/locales/vi/common.json`
**Type:** UI strings  
**Role:** Existing locale source for Vietnamese  
**Status:** Keep, but rewrite/review heavily  
**Notes:** Current Vietnamese quality is inconsistent and contains machine-like phrasing.

Must be normalized so that:
- wording is natural for Vietnamese readers
- terminology is consistent
- keys match English exactly

---

### 3. `app/page.tsx`
**Type:** Homepage rendering + hardcoded UI/content strings  
**Role:** Active runtime file  
**Status:** Refactor  
**Problems found:**
- language switching relies on cookie `site_lang`
- multiple strings are hardcoded with inline EN/VI logic
- homepage UI text is not fully delegated to locale files

**Required action:**
- move reusable UI text to locale JSON
- keep only rendering logic in component
- minimize inline `lang === "vi" ? ... : ...`

---

### 4. `app/[...slug]/page.tsx`
**Type:** Dynamic page renderer for PCRM-style content  
**Role:** Active runtime file  
**Status:** Refactor  
**Problems found:**
- still contains hardcoded labels such as breadcrumbs / related links
- language selection logic is mixed with presentation

**Required action:**
- move shared labels to locale files
- centralize page content language selection in content layer or helper function

---

### 5. `components/SidebarMenu.tsx`
**Type:** Navigation / utility UI  
**Role:** Active runtime component  
**Status:** Refactor  
**Problems found:**
- contains hardcoded Vietnamese strings
- not fully controlled by locale keys

**Required action:**
- move all labels to locale JSON
- keep component purely presentational

---

### 6. `components/ProductInfo.tsx`
**Type:** Product/storefront UI  
**Role:** Legacy storefront component, possibly still active in some routes  
**Status:** Audit and separate  
**Notes:** Should not drive the i18n strategy for the PCRM content layer.

**Required action:**
- confirm whether it is still mission-critical
- keep storefront text separate from PCRM educational content

---

### 7. `data/product.ts`
**Type:** Legacy storefront data  
**Role:** Old fallback content source  
**Status:** Reduce role  
**Notes:** README suggests this file was once a central editable content source for storefront/product demo behavior.

**Required action:**
- do not use this as the central content source for full-site localization
- keep only for storefront fallback if still needed
- avoid mixing medical/educational site copy with product/store data

---

### 8. `lib/pcrm-content.ts`
**Type:** Content mapping / normalization layer  
**Role:** Critical  
**Status:** Keep and improve  
**Notes:** This file is the best place to centralize page content language resolution.

Currently interacts with:
- generated PCRM source content
- translated content
- manual page overrides

**Required action:**
- make this the clean content adapter layer
- isolate language selection here as much as possible
- reduce page-level inline branching

---

### 9. `pcrm_data/*`
**Type:** extracted source material  
**Role:** English/source-side reference data  
**Status:** Keep  
**Notes:** Useful as source reference and extraction archive.

Should be treated as:
- source material
- extraction support
- crawl/archive data

Should NOT be treated as final localized runtime copy directly.

---

### 10. `pcrm_translated/generated_source_pages.json`
**Type:** generated normalized source pages  
**Role:** likely source-side structured page data  
**Status:** Keep  
**Notes:** Good candidate for source-of-truth structured page content on the EN side.

---

### 11. `pcrm_translated/translated_all.json`
**Type:** translated content dataset  
**Role:** current translated content source  
**Status:** Review and likely replace/clean  
**Problems found:**
- likely includes machine-generated or inconsistent translations
- not safe as final published Vietnamese copy without editorial pass

**Required action:**
- do not assume this is publish-ready
- build edited Vietnamese content layer from reviewed copy

---

### 12. `pcrm_translated/pages/*`
**Type:** page-level translated/generated assets  
**Role:** support content  
**Status:** Audit  
**Notes:** Need to determine whether these are used directly at runtime or only as generation artifacts.

---

### 13. `docs/*`
**Type:** project rules / architecture / translation governance  
**Role:** New governance layer  
**Status:** Add now  
**Purpose:**
- define architecture
- freeze terminology
- instruct Codex or collaborators
- avoid future drift

---

## Content Classification

### A. UI Strings
These are short interface texts used repeatedly across the app.

Examples:
- menu labels
- button labels
- CTA labels
- footer headings
- breadcrumb labels
- section labels like “Related Links”

**Target location:** `public/locales/*`

---

### B. Page Content
These are titles, paragraphs, cards, related links, summaries, and structured page copy.

Examples:
- homepage hero/supporting text
- About content
- Good Nutrition content
- Health Topics content
- Ethical Science content
- article/page body content

**Target location:** structured PCRM content layer via `lib/pcrm-content.ts`

---

### C. Legacy Storefront Content
These are leftover demo/store/product-oriented texts.

Examples:
- product copy
- SKU labels
- storefront category descriptions

**Target location:** isolated storefront module only

---

### D. Generated / Machine-Translated Artifacts
These are useful as input material but not safe as final published copy.

Examples:
- bulk generated translation JSON
- cached machine translation outputs
- extraction artifacts

**Target location:** archive/reference, not direct publication without review

---

## Future Source of Truth

### UI Source of Truth
- `public/locales/en/common.json`
- `public/locales/vi/common.json`

### Page Content Source of Truth
- English structured PCRM source pages
- reviewed Vietnamese structured content
- mapped through `lib/pcrm-content.ts`

### Legacy Storefront
- isolated fallback only
- should not define global website language architecture

---

## Immediate Priorities

1. Stop adding new hardcoded UI strings.
2. Move shared labels out of `app/page.tsx`, `[...slug]/page.tsx`, and `SidebarMenu.tsx`.
3. Rewrite Vietnamese locale strings for quality and consistency.
4. Freeze glossary before large-scale translation work.
5. Use reviewed content, not raw machine translation, as final Vietnamese source.

---

## Anti-Patterns to Avoid

- Hardcoding Vietnamese directly in components
- Mixing UI strings and page content in the same file
- Letting multiple files define the same label differently
- Treating machine-generated translation output as final content
- Reusing storefront data architecture for educational/medical content

---

## Completion Criteria

This inventory phase is complete when:
- every active text source is classified
- there is a clear owner for UI vs page content
- legacy files no longer act as accidental sources of truth
- translation work can proceed without architecture confusion