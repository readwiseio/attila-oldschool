---
name: readwise-ghost-theme-design-system
description: Use when a Readwise teammate or AI agent wants to make visual, layout, typography, color, responsive, or component-level design-system improvements to this Readwise Ghost theme.
---

# Readwise Ghost Theme Design System

Use this skill for design-system changes to the Readwise `atilla-rw-custom` Ghost theme. The requester may describe the change in nontechnical terms; translate that into the smallest theme change that preserves the oldschool Readwise/Attila feel.

## Repo Map

- `src/sass/style.scss` is the main design surface.
- `src/sass/_colors.scss` defines upstream color variables, but the active Readwise oldschool palette is currently re-declared near the end of `src/sass/style.scss` under `Readwise legacy Attila 1.4 parity`.
- `src/sass/_fonts.scss` loads Cardo for body copy and Fira Sans for UI/headings.
- `*.hbs` and `partials/*.hbs` are Ghost Handlebars templates. Change them only when the HTML structure or rendered data must change.
- `src/js/script.js` owns menu, cover parallax, gallery, and theme-toggle behavior.
- `assets/css/style.css` and `assets/js/script.js` are generated files that must be committed when Sass or JS source changes.

## Design Principles

- Preserve the oldschool Readwise look: Cardo body text, Fira Sans headings/UI, centered reading column, quiet separators, and the blue accent `#1EAEDB`.
- Prefer token or shared-selector changes over isolated one-off styles.
- Keep the reading experience calm and text-first. Avoid decorative marketing sections, oversized cards, heavy gradients, or ornamental backgrounds.
- Maintain the current light visual treatment. The legacy parity block intentionally pins dark-mode variables back to light colors; only reintroduce dark mode if explicitly requested.
- Keep mobile behavior first-class. Check changes around the existing breakpoints: `960px`, `640px`, and `480px`.
- Do not manually edit generated assets except as the result of the build.

## Workflow

1. Identify the user-facing surface: home/archive list, post page, page template, navigation, footer, Ghost content cards, or interactive behavior.
2. Edit source files first: Sass in `src/sass/`, JavaScript in `src/js/`, and Handlebars templates only when markup is required.
3. If source Sass or JS changed, run `npm run build` or `npx grunt build`.
4. Commit generated asset changes in `assets/css/style.css` and `assets/js/script.js` with the source changes.
5. For package-impacting changes, run `npm run zip` or `npx grunt compress` and confirm `dist/atilla-rw-custom.zip` is produced.

## Checks

- Run `npm ci` first if dependencies are missing.
- Run `npm run build`.
- Run `git diff --exit-code -- assets/css/style.css assets/js/script.js` only after deciding generated assets should be clean.
- Inspect responsive behavior for desktop, `640px`, and `480px` widths when layout, spacing, navigation, or typography changes.
- When changing templates, preserve Ghost helpers such as `{{asset}}`, `{{ghost_head}}`, `{{ghost_foot}}`, `{{content}}`, `{{pagination}}`, and translation helper `{{t}}`.

## Definition Of Done

- The source change is in the narrowest reasonable file.
- Generated CSS/JS is updated when needed.
- The theme still builds with `npm run build`.
- The change does not add repo-only files to the uploadable theme ZIP.
