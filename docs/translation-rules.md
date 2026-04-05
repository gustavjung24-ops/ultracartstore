# Translation Rules

Repo: `gustavjung24-ops/ultracartstore`

## Purpose

These rules define how English content should be localized into Vietnamese for this project.

This is not raw translation work.
This is editorial localization for a public-facing Vietnamese website inspired by PCRM-style content.

The goals are:
- preserve meaning
- sound natural to Vietnamese readers
- maintain trust and credibility
- keep terminology consistent
- avoid machine-translated tone

---

## Rule 1: English is the source of truth

The English source must always be treated as the reference version.

Vietnamese localization must:
- preserve the original meaning
- preserve the structural role of the content
- avoid inventing new claims or interpretations

Do not paraphrase so aggressively that the source meaning changes.

---

## Rule 2: Vietnamese must read naturally

Do not translate word-for-word when that creates awkward Vietnamese.

Avoid:
- stiff literal phrasing
- Western sentence structure copied directly into Vietnamese
- machine-like noun stacking
- unnatural brand phrasing

Prefer:
- smooth Vietnamese sentence flow
- concise navigation labels
- readable educational tone
- public-facing clarity

---

## Rule 3: Consistency matters more than stylistic variation

Once a key term is approved in the glossary, reuse it consistently.

Do not casually rotate between:
- many variants of the same term
- formal and informal labels for the same concept
- multiple translations of the same navigation item

Consistency is more important than sounding “creative”.

---

## Rule 4: Separate UI translation from content translation

### UI translation
Used for:
- buttons
- menus
- labels
- breadcrumbs
- section headings

UI translation must be:
- short
- stable
- scannable
- consistent across the site

### Content translation
Used for:
- titles
- summaries
- paragraphs
- educational content
- page introductions

Content translation must be:
- meaning-accurate
- grammatically natural
- readable for Vietnamese audiences

---

## Rule 5: Medical and nutrition content must prioritize accuracy

Where medical, nutrition, or scientific meaning is involved:
- accuracy comes before elegance
- do not simplify to the point of distortion
- do not exaggerate claims
- do not turn informative copy into marketing copy

If the English is careful, the Vietnamese must also be careful.

---

## Rule 6: Do not over-market educational content

This project should not sound like:
- sales copy
- hype copy
- aggressive ad copy
- exaggerated wellness promises

Avoid:
- sensational claims
- emotional manipulation
- miracle language
- overpromising health outcomes

Prefer:
- calm authority
- educational clarity
- public trust tone

---

## Rule 7: Keep keys and structure unchanged

For locale JSON and structured content files:
- do not rename keys unless explicitly instructed
- do not merge keys arbitrarily
- do not split keys without approval
- do not remove content structure

The translation must fit the existing rendering system.

---

## Rule 8: No hidden additions

Do not:
- add claims not in the source
- add explanatory medical advice not present in the source
- add local opinions
- add promotional slogans unless specifically requested

Translation is not the place to improvise site strategy.

---

## Rule 9: Use context-sensitive brevity

### For navigation
Use short approved labels.

### For hero headings
Balance clarity and impact.

### For body copy
Use complete natural Vietnamese sentences.

### For scientific/resource pages
Keep terminology tighter and more disciplined.

---

## Rule 10: Machine-generated copy is draft only

Any machine-translated text must be treated as draft material only.

Before publication, Vietnamese copy must be reviewed for:
- grammar
- naturalness
- terminology
- consistency
- tone
- meaning preservation

No raw machine output should go live without editorial review.

---

## Rule 11: Cookie-based language switching remains valid for now

The current repo uses cookie-based language switching via `site_lang`.

Until architecture changes are explicitly approved:
- do not redesign the routing model
- do not introduce `/en` and `/vi` route restructuring as part of basic translation cleanup
- focus first on cleaning content ownership and string management

---

## Rule 12: Hardcoded strings should be eliminated progressively

Any reusable label currently hardcoded in:
- `app/page.tsx`
- `app/[...slug]/page.tsx`
- `components/SidebarMenu.tsx`
- other shared components

should be moved into locale files or structured content sources.

Hardcoded bilingual branching should be minimized over time.

---

## Rule 13: Use the glossary before making wording decisions

Before translating any important term, check `docs/translation-glossary.md`.

If a phrase is not in the glossary:
- choose the closest natural translation
- add it later if it becomes recurring
- do not create multiple inconsistent variants

---

## Rule 14: Review order for every translated block

Every translated block should be reviewed in this order:

1. Meaning accuracy
2. Vietnamese grammar
3. Natural wording
4. Terminology consistency
5. UI fit / layout fit
6. Tone consistency

---

## Rule 15: Homepage and shared UI have highest priority

Before deep page-by-page translation:
- homepage
- navigation
- footer
- common CTAs
- shared labels

must be cleaned first.

These define trust and perceived quality for the whole site.

---

## Definition of done

A translation task is only considered complete when:
- the meaning matches the source
- Vietnamese sounds natural
- approved terminology is used
- keys and structure remain intact
- no awkward machine phrasing remains