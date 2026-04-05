# i18n Architecture

Repo: `gustavjung24-ops/ultracartstore`

## Goal

Define a practical multilingual architecture for the current repo without breaking the existing runtime model.

This repo already has:
- Next.js
- `next-i18next`
- locale JSON files
- cookie-based language switching via `site_lang`
- structured PCRM content data
- some hardcoded bilingual UI logic

The immediate goal is not a full routing redesign.
The immediate goal is to standardize content ownership.

---

## Current Reality

The repo currently mixes several language mechanisms:

1. Locale files in `public/locales/*`
2. Cookie-based runtime language selection (`site_lang`)
3. Structured content with EN/VI fields or translated datasets
4. Inline hardcoded bilingual labels in components/pages

This mixed state increases maintenance cost and translation inconsistency.

---

## Architecture Decision

### Keep for now
- cookie-based language switching
- existing route structure
- dynamic page rendering through current app router pattern

### Standardize now
- all reusable UI strings go to locale JSON
- all structured page content goes through a content adapter layer
- remove hardcoded repeated labels from components/pages
- stop treating machine translation dumps as publication-ready copy

---

## Two-Layer Content Model

### Layer 1: UI Strings
This layer contains repeated interface labels.

Examples:
- navigation labels
- footer headings
- common buttons
- CTA labels
- breadcrumbs
- generic section labels

**Storage location:**
- `public/locales/en/common.json`
- `public/locales/vi/common.json`

**Usage rule:**
Components must read these strings from locale files rather than hardcoding them.

---

### Layer 2: Page Content
This layer contains structured page-specific content.

Examples:
- page titles
- summaries
- paragraphs
- cards
- related links
- educational page sections

**Storage location:**
- structured English source data
- structured reviewed Vietnamese content data
- mapped through `lib/pcrm-content.ts`

**Usage rule:**
Page components should request already-resolved content instead of making translation decisions inline.

---

## Legacy Content Separation

`data/product.ts` and other storefront-era data should not define the overall localization model for the educational/medical site.

If storefront functionality is still needed:
- isolate it as a separate content concern
- keep its text independent from PCRM content architecture
- do not reuse it as the default content source for unrelated pages

---

## Runtime Language Resolution

### Current model
The current site reads `site_lang` cookie to determine whether to render English or Vietnamese.

### Decision
Keep this model for the current cleanup phase.

Reason:
- it avoids unnecessary route restructuring
- it matches current implementation
- it reduces migration risk during content cleanup

### Future option
A future migration to route-based locales may be considered later, but not during the initial standardization phase.

---

## File Ownership

### Locale JSON owns
- short interface strings
- generic labels
- reusable CTAs
- cross-page UI text

### Content adapter owns
- page-level content language selection
- source/translation mapping
- content normalization
- fallback logic

### Pages/components own
- layout
- rendering
- presentational structure

Pages/components should NOT own reusable copy decisions.

---

## Refactor Direction

### Phase 1
- add governance docs
- review and fix locale wording
- identify and remove hardcoded shared labels

### Phase 2
- centralize page content resolution in `lib/pcrm-content.ts`
- minimize inline `lang === "vi" ? ... : ...`

### Phase 3
- review translated datasets
- replace raw machine-like copy with edited Vietnamese content

---

## Principles

1. One purpose per content source
2. No repeated ownership of the same label
3. No publish-ready trust in machine output
4. Components render; data layers decide content
5. Translation consistency beats improvisation

---

## Success Criteria

The architecture cleanup is successful when:
- shared UI text no longer lives scattered across components
- page content is resolved in a consistent way
- English and Vietnamese roles are clear
- translation work can scale without structural confusion