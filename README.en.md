# Product Promo Video Director

An agent skill for turning a vague product-video idea into a concrete, shot-level `video-spec.md` for HyperFrames or another renderer.

Install:

```bash
npx skills add shaomingchan/product-promo-video-director -g
npx skills add heygen-com/hyperframes -g
```

Then ask your coding assistant:

```text
I want a 45-second horizontal product promo for my SaaS. Ask me the director questions first, then create video-spec.md.
```

The skill does not require an API key. If your own TTS or media pipeline needs one, inject it through an environment variable such as `AI_302_API_KEY`; never commit it. See the complete Chinese setup guide in [`README.md`](README.md) and the security policy in [`SECURITY.md`](SECURITY.md).
