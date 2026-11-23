---
ContentId: 2c4d6e8f-0a1b-3c5d-7e9f-1a2b3c4d5e6f
DateApproved: 11/25/2026
MetaDescription: Control {% data variables.product.prodname_vscode_shortname %} application updates and plan managed deployments separately from extension updates.
---

# Manage updates in enterprise environments

{% data variables.product.prodname_vscode_shortname %} releases weekly updates with new features, bug fixes, and security patches. Organizations can centrally manage how {% data variables.product.prodname_vscode_shortname %} updates are handled across their development teams.

This article covers how IT admins can configure automatic updates through [enterprise policies](/docs/enterprise/policies.md).

## Update policy

{% data variables.product.prodname_vscode_shortname %} provides the `UpdateMode` policy for controlling its built-in application updater. This policy controls the `setting(update.mode)` setting.

It does not prevent updates deployed by other software-management tools or control extension updates:

| Update mechanism | Where to manage it |
|------------------|--------------------|
| Built-in application updater | Use `UpdateMode` and the modes below. |
| Linux package manager or Snap | Configure servicing through your package-management tools. Snap updates automatically unless you manage its refresh behavior separately. See [Linux installation and updates](/docs/setup/linux.md). |
| Organization software deployment | Select and distribute approved builds through your deployment tools. `UpdateMode` does not block an external installer. |
| Extension updates | Manage extension servicing separately. See [extension auto-update](/docs/configure/extensions/extension-marketplace.md#extension-auto-update) and its enterprise policies. |

Learn how to [deploy policies](/docs/enterprise/policies.md) to your organization's devices.

## Update mode options

The `UpdateMode` policy accepts the following values:

| Value     | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| `default` | Automatic checking for updates is enabled and runs in the background        |
| `start`   | Check for updates only when {% data variables.product.prodname_vscode_shortname %} starts                                  |
| `manual`  | Automatic checking is disabled; users can manually check for updates        |
| `none`    | The built-in application updater is disabled, including manual checks       |

## Disable automatic updates

To turn off the built-in application updater, including automatic and manual update checks, set the `UpdateMode` policy to `none`:

**Policy value**:

```text
none
```

For installations that use the built-in updater, users cannot update {% data variables.product.prodname_vscode_shortname %} through the application while this policy is set. You must distribute updates through your software deployment tools.

## Enable manual updates only

To allow users to check for updates manually while disabling automatic background checks, set the `UpdateMode` policy to `manual`:

**Policy value**:

```text
manual
```

For installations that use the built-in updater, users can check for updates from **Help** > **Check for Updates** on Windows and Linux, or **Code** > **Check for Updates** on macOS.

## Check for updates at startup only

To check for updates only when {% data variables.product.prodname_vscode_shortname %} starts, without background checking, set the `UpdateMode` policy to `start`:

**Policy value**:

```text
start
```

## Verify and service managed installations

Before deploying a configuration broadly:

1. Select an approved build for each target platform and installation type. Use the [version-specific download links](/docs/supporting/faq.md#previous-release-versions) when your deployment requires a particular version.

1. Deploy the build and update policy to a test group.

1. Run **Developer: Policy Diagnostics** and confirm the effective `UpdateMode` value and source. For installations with the built-in updater, verify that update checks behave as intended. Validate package-manager and extension update controls separately.

1. Confirm the [installed version](/docs/supporting/faq.md#how-do-i-find-my-current-vs-code-version), test representative development workflows, and expand the deployment only after those checks pass.

Keep a process for distributing security and maintenance updates when the application's updater is disabled. If {% data variables.product.prodname_copilot_short %} enterprise-managed settings require a newer client, AI features can remain unavailable until you deploy a version that meets the [minimum version requirement](/docs/enterprise/manage-ai-settings.md#meet-minimum-version-requirements).

## Network requirements

The built-in updater checks for and downloads updates from Microsoft services. If your network has restricted access, account for both the update service and download CDN:

* `update.code.visualstudio.com` - {% data variables.product.prodname_vscode_shortname %} download and update server
* `vscode.download.prss.microsoft.com` - {% data variables.product.prodname_vscode_shortname %} download CDN

See the [network documentation](/docs/setup/network.md#common-hostnames) for other service hostnames. Linux repository and Snap downloads use their respective package-distribution services.

## Related resources

* [Enterprise policies reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference) - Complete list of enterprise policies
* [Network connections](/docs/setup/network.md) - Proxy and firewall configuration
