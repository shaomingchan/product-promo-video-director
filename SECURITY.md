# Security

## Never commit credentials

Do not put provider keys in `SKILL.md`, `README.md`, prompt examples, demo assets, or shell history that
will be copied into a public repository. Use environment variables or a local secret manager instead.

The repository includes `.env.example` as a placeholder. Copy it to `.env` locally, fill in the value,
and keep `.env` untracked.

## If a key was exposed

1. Revoke or rotate it in the provider dashboard immediately.
2. Remove it from the working tree and Git history if it was committed.
3. Check forks, pull requests, logs, and uploaded artifacts.
4. Open a private issue or contact the maintainer without pasting the secret into the issue.

## Reporting a vulnerability

Please use GitHub private vulnerability reporting when enabled. Otherwise, contact the repository owner
privately rather than opening a public issue with exploit details.
