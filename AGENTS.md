# Agent Instructions

Use the repo-local skills before making changes:

- For visual, typography, layout, color, responsive, or component changes, read `.agents/skills/readwise-theme-design-system/SKILL.md`.
- For Handlebars templates, helpers, partials, or context-specific rendering, read `.agents/skills/ghost-theme-templates-contexts/SKILL.md`.
- For Ghost Admin custom settings in `package.json`, read `.agents/skills/ghost-theme-custom-settings/SKILL.md`.
- For theme ZIP, GScan, release artifact, or GitHub Actions packaging changes, read `.agents/skills/ghost-theme-packaging-validation/SKILL.md`.

Generated files matter in this repo. If Sass or JavaScript source changes, run `npm run build` and include the generated `assets/css/style.css` or `assets/js/script.js` changes.
Before merging, run `npm run zip` and `npm run gscan` so the uploadable Ghost theme artifact is validated.
