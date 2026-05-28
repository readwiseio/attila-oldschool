---
name: ghost-theme-custom-settings
description: Use when adding, changing, or reviewing Ghost theme custom settings in package.json and their use through the @custom object in templates.
---

# Ghost Theme Custom Settings

Use this skill when a design-system request should become a controlled Ghost Admin setting instead of a hard-coded theme change.

## Official Resources

- Custom settings docs: https://docs.ghost.org/themes/custom-settings
- Theme structure and `package.json` docs: https://docs.ghost.org/themes/structure
- Handlebars expression syntax: https://handlebarsjs.com/guide/expressions.html
- Run GScan after custom-setting changes: https://docs.ghost.org/themes/gscan/

## When To Add A Setting

- Add a custom setting when a nontechnical Readwise teammate should be able to change the behavior later in Ghost Admin.
- Do not add a setting for a one-off implementation detail or a value that should be fixed by the design system.
- Keep the total custom settings count under Ghost's limit of 20.

## Implementation Rules

- Settings live in `package.json` under `config.custom`.
- Setting keys must be stable `snake_case`; changing a key in a later release loses existing site-owner values.
- Use the right type:
  - `select` for a small predefined option set. `options` is required, and `default` must match one option.
  - `boolean` for a toggle. `default` must be `true` or `false`.
  - `color` for a color picker. `default` must be a valid hex string.
  - `image` for image upload. Do not provide a `default`.
  - `text` for short copy or integration values.
- Use `group: "homepage"` or `group: "post"` only when the setting belongs there; otherwise leave it site-wide.
- Keep descriptions under 100 characters and focused on what changes visually.

## Template Use

- Read values with `@custom.<setting_key>`.
- Use `{{#match}}` for `select`, `{{#if}}` for `boolean`, `text`, and `image`.
- For custom color settings, map the value to a CSS custom property in a small scoped `<style>` block or existing CSS variable path.
- For image settings, use `{{img_url @custom.<setting_key> size="..."}}` when a configured image size is needed.

## Validation

- Run `npm run zip` and `npm run gscan` after changing `package.json` custom settings.
- Verify existing settings such as `disqus_shortname` and `post_share` still work.
