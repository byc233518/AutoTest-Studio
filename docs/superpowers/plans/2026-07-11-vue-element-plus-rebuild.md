# Vue 3 + Element Plus Frontend Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the native JavaScript frontend with a maintainable Vue 3 + Element Plus application optimized for tester workflows.

**Architecture:** Preserve the Express API and introduce a Vite-built SPA under `frontend/`, outputting production assets to `web-dist/`. Pinia stores own remote state; route views compose focused Element Plus components.

**Tech Stack:** Vue 3, Vite, Vue Router, Pinia, Element Plus, Playwright.

---

1. Add Vite dependencies, scripts, proxy, and Express static fallback.
2. Add app shell, routing, authentication store, and purple theme tokens.
3. Build dashboard and scenario catalog with readiness states.
4. Build execution dialog with editable tabular data.
5. Build scenario edit drawer with data and recording workflows.
6. Build runs view and evidence-oriented result drawer.
7. Build app, module, environment, and AI settings pages.
8. Replace frontend contract tests and retain API tests.
9. Build production assets and verify desktop/mobile workflows.
