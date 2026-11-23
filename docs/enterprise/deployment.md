---
ContentId: e68aa172-9a87-4962-a0df-70c02a2988d2
DateApproved: 11/25/2026
MetaDescription: Deploy {% data variables.product.prodname_vscode %} to managed devices, validate organizational controls, and plan ongoing servicing.
MetaSocialImage: images/policies/allowed-extensions-managed-by-organization.png
---

# Deploy {% data variables.product.prodname_vscode_shortname %} to managed devices

As an IT admin, use this guide to choose an installation method, prepare required services and controls, and validate a pilot before deploying {% data variables.product.prodname_vscode %} broadly. Use your organization's software distribution and device management tools to carry out the rollout.

## Define the rollout scope

Before choosing a package or policy:

* Check the [system requirements and supported deployment environments](/docs/supporting/requirements.md), especially when planning virtual desktop or shared-machine deployments.
* Identify the operating systems, processor architectures, installation accounts, and developer accounts in the rollout.
* Choose a representative project and the development tasks that must work, such as installing an approved extension, building, debugging, or using an approved agent.
* Identify who owns software deployment, device policies, GitHub administration, and network access. Give pilot participants a support contact.

For AI work, include the clients and execution hosts your developers use. A policy on the connecting device does not establish runtime enforcement on a remote host or in a container.

## Choose an installation method

Use the platform guide for package acquisition and installation steps:

| Platform | Deployment decision |
|----------|---------------------|
| [Windows](/docs/setup/windows.md#choose-user-setup-or-system-setup) | Choose User setup for an individual account or System setup for a machine-wide installation. System setup requires administrator permissions. For automation, review [unattended setup](/docs/setup/windows.md#run-unattended-setup). |
| [macOS](/docs/setup/mac.md#install-vs-code-on-macos) | Choose a build for the target architecture and plan how your software distribution tool installs the application bundle. |
| [Linux](/docs/setup/linux.md#install-vs-code-on-linux) | Choose the package for the distribution. Decide whether to use the Microsoft package repository, Snap, or a package distributed through your own deployment process. Repository configuration and signing keys are part of installation. |

If you need a specific approved build, use the [version-specific downloads](/docs/supporting/faq.md#previous-release-versions). Record the version and installation type so the deployment team can reproduce the pilot.

A machine-wide installation does not replace extension configuration, device policies, or account-level AI controls.

## Prepare network access and extensions

Confirm that the installation and the intended developer account can reach the services needed for approved work:

* Coordinate [network access, proxy, and certificate requirements](/docs/setup/network.md#plan-network-access-for-managed-devices) with your network team. Check installation and update services as well as the services developers use.
* Choose how developers obtain extensions. Use the public Marketplace or review the eligibility and deployment requirements for a [private marketplace](/docs/enterprise/extensions.md#host-a-private-extension-marketplace).
* Configure [allowed extensions](/docs/enterprise/extensions.md#deploy-with-organization-policy) if your organization restricts installation or enablement.
* For a Windows image with preinstalled extension packages, follow [Preinstall extensions](/docs/enterprise/extensions.md#preinstall-extensions) and test first launch with a new user account.

An installed extension can still be disabled by policy or require additional tools. Include extension functionality in the pilot, not only installation.

## Configure required controls

Choose controls based on organizational requirements rather than deploying every policy in a sample file.

* **Editor settings**: Follow the deployment steps for [Windows Group Policy](/docs/enterprise/policies.md#windows-group-policies), [macOS configuration profiles](/docs/enterprise/policies.md#macos-configuration-profiles), or a [Linux policy file](/docs/enterprise/policies.md#linux-json-policies).
* **AI access and execution**: [Choose a management solution](/docs/enterprise/manage-ai-settings.md#choose-a-management-solution) for each control. Check supported clients, harnesses, minimum versions, and precedence.
* **Telemetry**: Configure [product telemetry and feedback](/docs/enterprise/telemetry.md). Review independent extension telemetry and agent monitoring separately.
* **Servicing**: Decide who manages [application and extension updates](/docs/enterprise/updates.md#update-policy). The application's update policy does not control package managers or an external installer.

Keep the configuration and the intended outcome for each control together. For example, distinguish setting a starting model from restricting which models developers can select.

## Validate a pilot

Use a test group that covers the installation methods and development environments in the rollout.

1. Install the approved package and deploy the selected controls through your management tools. Wait for the target devices to receive the configuration.

1. Launch {% data variables.product.prodname_vscode_shortname %} as the intended developer, not only as the account that installed it. Confirm the [installed version](/docs/supporting/faq.md#how-do-i-find-my-current-vs-code-version).

1. Run **Developer: Policy Diagnostics** from the Command Palette (`kb(workbench.action.showCommands)`). Compare effective values and sources with the intended configuration. See [Verify policy enforcement](/docs/enterprise/policies.md#verify-policy-enforcement).

1. Confirm the expected extensions and versions with `code --list-extensions --show-versions` under the developer account. Check the Extensions view for enablement and policy restrictions, then exercise the extensions your test project needs.

1. Complete the representative development tasks. For each important restriction, also test a harmless operation that the policy should block. A value in diagnostics alone does not prove that the restriction applies to that workflow.

1. For AI sessions, follow [Verify an AI rollout](/docs/enterprise/manage-ai-settings.md#verify-an-ai-rollout) on each approved client and execution host.

1. Verify that the chosen update mechanism behaves as intended. Check application, package-manager, and extension servicing separately.

If the pilot fails, pause the rollout and use [administrator troubleshooting](/docs/enterprise/troubleshooting.md). Do not remove controls or bypass certificate checks as a general way to make the pilot pass.

## Expand and maintain the deployment

After the pilot passes, expand deployment through your management tools. Keep the approved package, configuration, validation results, and responsible teams recorded in your deployment process.

* Tell developers which capabilities are available, how to request an exception, and where to report a problem.
* Schedule [application and extension servicing](/docs/enterprise/updates.md#verify-and-service-managed-installations), including security updates when the application's updater is off.
* Repeat relevant pilot checks when a client version, extension, policy, or AI harness changes.
* Define a recovery process with the deployment team. Before using an earlier build, check that it supports the controls your organization requires.

## Related resources

* [Troubleshoot managed deployments](/docs/enterprise/troubleshooting.md)
* [Roll out the Copilot harness in your organization](/docs/agents/run/move-to-copilot.md#roll-out-the-copilot-harness-in-your-organization)
