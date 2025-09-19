# Automation requirements

This document defines CI and release automation for this repository. It uses GitHub Actions and npm-based tooling.

## Goals

* Keep CI fast, reliable, and secure.
* Validate Large File Storage (LFS) usage for media.
* Lint JavaScript when ESLint is present.
* Provide a simple, tag-driven release workflow.

## CI pipeline

* Triggers: Pull requests to `main` and pushes to `main`.
* Runner: `ubuntu-latest`.
* Node: 18.x.
* Permissions: `contents: read`.
* Concurrency: One CI run per ref, cancel in-progress.
* Cache: Use `actions/setup-node` with `cache: npm` and default `package-lock.json` path.
* Steps:
  * Checkout repo.
  * Setup Node 18 with npm cache.
  * Install dependencies via `npm ci`.
  * Run `npm run check-lfs` to validate media tracked by Git LFS.
  * Run `npm run lint` only if `eslint` is installed (optional in this repo).
* Artifacts: None required.
* Secrets: None required for CI.
* Status check: Require the single CI job to pass before merging to `main`.

## Release pipeline

* Triggers:
  * Manual: `workflow_dispatch` with an input `version` (optional).
  * Tags: `push` on tags matching `v*.*.*`.
* Runner: `ubuntu-latest`.
* Node: 18.x.
* Permissions: `contents: write` to create/update GitHub Releases.
* Concurrency: Single release per tag.
* Steps:
  * Checkout repo.
  * Setup Node 18 with npm cache.
  * `npm ci`.
  * Validate LFS: `npm run check-lfs`.
  * Lint (optional): `npm run lint` if ESLint is installed.
  * Create or update a GitHub Release for the current tag and upload any artifacts if needed (none by default).
* Secrets:
  * Use `GITHUB_TOKEN` (provided by GitHub Actions) for release creation. No additional secrets are required.

### `release.yml` skeleton

```yaml
name: Release

on:
  workflow_dispatch:
    inputs:
      version:
        description: Release version (e.g., v1.2.3)
        required: false
        type: string
  push:
    tags:
      - 'v*.*.*'

permissions:
  contents: write

concurrency:
  group: release-${{ github.ref }}
  cancel-in-progress: false

jobs:
  release:
    name: Create GitHub Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18.x
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: LFS check (media under Git LFS)
        run: npm run check-lfs

      - name: Lint (if available)
        shell: bash
        run: |
          if [ -x ./node_modules/.bin/eslint ]; then
            npm run lint
          else
            echo "Skipping lint: eslint not installed"
          fi

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Branch protections

* Protect `main` with required status check from the CI job.
* Require pull requests before merging. Disallow direct pushes to `main`.

## Optional enhancements

* Add markdown linting (`markdownlint-cli2`) and link checking for docs.
* Enable Dependabot for GitHub Actions and npm updates.
* Add CodeQL code scanning for JavaScript if the amount of JS increases.

## Acceptance criteria

* CI runs on PRs and pushes to `main` and enforces LFS and optional linting.
* Release workflow can be triggered by tag push `v*.*.*` or manually.
* Required status checks block merges into `main` until CI succeeds.
