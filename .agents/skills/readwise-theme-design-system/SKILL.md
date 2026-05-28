---
name: readwise-theme-design-system
description: Use when a Readwise teammate or AI agent wants visual, typography, spacing, color, responsive, or component-level design-system improvements to this Ghost theme.
---

# Readwise Theme Design System

Use this skill for visual changes to the Readwise `atilla-rw-custom` Ghost theme. The requester may use nontechnical language; translate it into the smallest source change that preserves the oldschool Readwise/Attila reading experience.

## Official Resources

- Start from Ghost's theme overview and essential concepts when unsure how a theme is rendered: https://docs.ghost.org/themes and https://ghost.org/tutorials/essential-concepts/
- Use Ghost structure docs before moving template, asset, or package files: https://docs.ghost.org/themes/structure
- Use GScan before considering a design-system change done: https://docs.ghost.org/themes/gscan/ and https://gscan.ghost.org/

## Repo Map

- `src/sass/style.scss` is the main design surface.
- `src/sass/_colors.scss` defines upstream variables, but the active Readwise legacy palette is re-declared near the end of `src/sass/style.scss` under `Readwise legacy Attila 1.4 parity`.
- `src/sass/_fonts.scss` loads Cardo for body copy and Fira Sans for UI/headings.
- `src/js/script.js` owns menu, cover parallax, gallery, and theme-toggle behavior.
- `*.hbs` and `partials/*.hbs` are Ghost templates. Use the templates/contexts skill before changing markup or Ghost helpers.
- `assets/css/style.css` and `assets/js/script.js` are generated files that must be committed when Sass or JS source changes.

## Design Principles

- Preserve the oldschool Readwise feel: Cardo body text, Fira Sans headings/UI, centered reading column, quiet separators, and the blue accent `#1EAEDB`.
- Prefer shared selectors, tokens, or existing section patterns over one-off styles.
- Keep the theme text-first. Avoid marketing-page composition, decorative gradients, oversized cards, and heavy ornamentation unless explicitly requested.
- Maintain the current light visual treatment. The legacy parity block intentionally pins dark-mode variables back to light colors; reintroduce dark mode only when explicitly requested.
- Check desktop and the existing responsive breakpoints: `960px`, `640px`, and `480px`.

## Workflow

1. Identify the affected surface: archive list, post page, static page, navigation, footer, Ghost content cards, or interaction.
2. Edit source files first: Sass in `src/sass/`, JavaScript in `src/js/`, and templates only when markup is required.
3. Run `npm run build` after Sass or JS changes.
4. Run `npm run zip` and `npm run gscan` before calling the change complete.
5. Include generated `assets/css/style.css` or `assets/js/script.js` changes only when source Sass or JS changed.
