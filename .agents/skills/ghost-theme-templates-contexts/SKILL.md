---
name: ghost-theme-templates-contexts
description: Use when editing Ghost Handlebars templates, helpers, partials, contexts, routes, post/page/tag/author rendering, or dynamic theme data.
---

# Ghost Theme Templates And Contexts

Use this skill for changes to `*.hbs`, `partials/*.hbs`, Ghost helpers, context-specific rendering, or template data access.

## Official Resources

- Ghost theme essentials: https://ghost.org/tutorials/essential-concepts/
- Ghost theme structure: https://docs.ghost.org/themes/structure
- Ghost contexts overview: https://docs.ghost.org/themes/contexts
- Use the contexts sidebar for specifics before editing context-sensitive behavior:
  - Index: https://docs.ghost.org/themes/contexts/index
  - Page: https://docs.ghost.org/themes/contexts/page
  - Post: https://docs.ghost.org/themes/contexts/post
  - Author: https://docs.ghost.org/themes/contexts/author
  - Tag: https://docs.ghost.org/themes/contexts/tag
  - Error: https://docs.ghost.org/themes/contexts/error
- Handlebars expression syntax: https://handlebarsjs.com/guide/expressions.html

## Local Template Map

- `default.hbs`: base layout, `{{ghost_head}}`, `{{ghost_foot}}`, global stylesheet/script includes, navigation wrapper.
- `index.hbs`: home/index post collection.
- `post.hbs`: individual post rendering, sharing, tags, comments, subscribe box, previous/next post links, post-only scripts.
- `page.hbs`: static page rendering.
- `tag.hbs` and `author.hbs`: archive contexts plus post list.
- `partials/loop.hbs`: post list item markup shared by collection pages.
- `partials/navigation.hbs`: menu links, social links, subscribe/RSS behavior.
- `partials/icons/*.hbs`: inline icons used by templates.

## Rules

- Preserve required Ghost helpers: `{{asset}}`, `{{body_class}}`, `{{post_class}}`, `{{ghost_head}}`, and `{{ghost_foot}}`.
- Use `{{#post}}`, `{{#foreach}}`, `{{#if}}`, `{{#match}}`, and `{{#is}}` according to the current context and Ghost docs.
- Before adding context-specific markup to a shared partial, use `{{#is}}` or move the markup to a context-specific template.
- Keep dynamic data in Handlebars expressions and static behavior in JavaScript; do not hard-code data that Ghost already provides.
- Use triple-stash only where the existing theme already expects HTML output, such as `{{{title}}}`, `{{{body}}}`, or `{{content}}`.
- Preserve translated strings with `{{t}}` when editing user-visible theme labels.

## Validation

- Run `npm run build` when Sass or JS changed.
- Run `npm run zip` and `npm run gscan` for any template change.
- If a new custom setting is needed, use the custom settings skill first.
