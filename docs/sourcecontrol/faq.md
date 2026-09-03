---
ContentId: 431b4458-34c4-4aba-a0ee-eaddf7cd91a1
MetaDescription: Find answers about Git clients, source control providers, SSH authentication, and GitHub Enterprise support in {% data variables.product.prodname_vscode %}.
DateApproved: 9/2/2026
Keywords:
- source control
- scm
- version control
- git
---
# Source control FAQ

This article answers common support and compatibility questions about source control in {% data variables.product.prodname_vscode %}. For task instructions, start with the [source control overview](/docs/sourcecontrol/overview.md). For errors and unexpected behavior, see [source control troubleshooting](/docs/sourcecontrol/troubleshooting.md).

## Git clients and providers

### Can {% data variables.product.prodname_vscode_shortname %} use GitHub Desktop for Git operations?

No. {% data variables.product.prodname_vscode_shortname %} uses the [official Git distribution](https://git-scm.com/) for its built-in Git integration. Installing GitHub Desktop doesn't replace this requirement.

### Can I use Team Foundation Version Control?

Install the [Azure Repos extension](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team) to add Team Foundation Version Control support to {% data variables.product.prodname_vscode_shortname %}.

### Can I use another source control provider?

Yes. Git support is built into {% data variables.product.prodname_vscode_shortname %}, and extensions can contribute support for other source control systems. Search the Extensions view (`kb(workbench.view.extensions)`) for `@category:"scm providers"`.

## Authentication

### Can I use SSH authentication with {% data variables.product.prodname_vscode_shortname %}?

Yes. {% data variables.product.prodname_vscode_shortname %} uses the SSH configuration from your Git installation. If an SSH key has a passphrase, configure an SSH agent so Git can request or reuse the passphrase.

For platform-specific configuration, see [GitHub's SSH documentation](https://docs.github.com/authentication/connecting-to-github-with-ssh).

### How do I authenticate with an Azure DevOps organization that requires multifactor authentication?

Use [Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager), the recommended Git credential helper for Windows, macOS, and Linux. Git for Windows includes Git Credential Manager.

## GitHub

### Is GitHub Enterprise Server supported?

Yes. {% data variables.product.prodname_vscode_shortname %} supports authentication with GitHub Enterprise Server. Open a local checkout of a GitHub Enterprise Server repository and follow the sign-in prompt.

The [GitHub Pull Requests and Issues extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) also supports GitHub Enterprise Server. Configure the extension for your server before you manage pull requests or issues.

## Common tasks

Use the focused source control articles for common tasks:

* [Stage, commit, amend, or undo changes](/docs/sourcecontrol/staging-commits.md)
* [Create, rename, or delete branches](/docs/sourcecontrol/branches-worktrees.md)
* [Configure remotes and synchronize changes](/docs/sourcecontrol/repos-remotes.md)
* [Resolve merge conflicts](/docs/sourcecontrol/merge-conflicts.md)
* [Inspect commit and file history](/docs/sourcecontrol/history.md)
