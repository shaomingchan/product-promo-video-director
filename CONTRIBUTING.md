# Contributing

1. Keep examples provider-neutral and free of private product data.
2. Never commit API keys, cookies, credentials, customer media, or private screenshots.
3. Keep the skill focused on product-promotion video planning and production handoff.
4. Prefer small, reviewable changes to `SKILL.md`, references, templates, and examples.
5. Run the secret scan before opening a pull request:

```bash
node scripts/check-secrets.mjs
```

For changes that affect a rendered example, document the renderer version and the preview/check result.
