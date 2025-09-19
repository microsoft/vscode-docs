#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   export GITHUB_TOKEN=<token-with-admin-rights>
#   ./scripts/protect-repos.sh IBERMOLINA lifeos vscode-docs
# Notes:
# - Requires: curl, jq
# - Applies: private visibility, enables security features, sets branch protection with required checks

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required (apt-get install -y jq)" >&2; exit 1
fi

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "GITHUB_TOKEN env var is required" >&2; exit 1
fi

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <owner> <repo1> [repo2 ...]" >&2; exit 1
fi

OWNER="$1"; shift

api() {
  local method="$1"; shift
  local path="$1"; shift
  curl -sS -X "$method" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com${path}" "$@"
}

for REPO in "$@"; do
  echo "==> Securing $OWNER/$REPO"

  echo " - Making repository private"
  api PATCH "/repos/$OWNER/$REPO" -d '{"private": true}' | jq -r '.full_name + " private=" + ( .private|tostring )'

  echo " - Enabling security features (secret scanning, push protection, dependabot alerts/updates)"
  # Secret scanning (if supported on your plan)
  api PATCH "/repos/$OWNER/$REPO" -d '{"security_and_analysis": {"secret_scanning": {"status": "enabled"}, "secret_scanning_push_protection": {"status": "enabled"}, "dependabot_security_updates": {"status": "enabled"}}}' >/dev/null || true

  echo " - Setting branch protection on main"
  api PUT "/repos/$OWNER/$REPO/branches/main/protection" -d '{
    "required_status_checks": { "strict": true, "contexts": ["CI / Build and checks", "CI / Pre-commit checks"] },
    "enforce_admins": true,
    "required_pull_request_reviews": { "required_approving_review_count": 1, "dismiss_stale_reviews": true, "require_last_push_approval": true },
    "restrictions": null
  }' >/dev/null || true

  echo " - Done: $OWNER/$REPO"
  echo
done
