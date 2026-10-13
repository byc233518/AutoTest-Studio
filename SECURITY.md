# Security Policy

## Supported versions

Security fixes are applied on the latest `main` / default branch and the newest Release tag when practical.

## Reporting a vulnerability

Please **do not** open a public GitHub Issue for security problems.

Prefer one of:

1. GitHub Security Advisories: repository → Security → Advisories → Report a vulnerability
2. Contact the maintainer via the email listed on their GitHub profile

Include: affected version / commit, reproduction steps, impact, and any suggested fix.

## Secrets in this project

- Never commit `.env`, `platform-data/`, real project directories, or credentials.
- Environment passwords and LLM API keys are stored locally per project; treat exported `.zip` project packs as sensitive.
- Demo credentials in docs are placeholders only — replace them with your own.
