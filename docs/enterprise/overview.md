---
ContentId: a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d
DateApproved: 11/25/2026
MetaDescription: Plan deployment, govern AI and extensions, and troubleshoot {% data variables.product.prodname_vscode %} across managed devices.
---

# {% data variables.product.prodname_vscode_shortname %} for enterprise

As an IT admin, deploy {% data variables.product.prodname_vscode %}, configure your organization's controls, and verify that developers can complete approved work. Start with the task you need to accomplish, then follow the deployment and troubleshooting guides for the full workflow.

## Start with an admin task

* **Deploy to managed devices**: [Choose an installation method, configure controls, and validate a pilot](/docs/enterprise/deployment.md) before expanding your rollout.
* **Govern AI use**: [Choose where to manage AI access, tools, and execution](/docs/enterprise/manage-ai-settings.md) based on the clients and accounts your organization uses.
* **Manage extensions**: [Approve extensions and configure distribution](/docs/enterprise/extensions.md), including a private marketplace or Windows extension preinstallation.
* **Control updates**: [Plan application and extension servicing](/docs/enterprise/updates.md) and verify which update mechanism manages each installation.
* **Manage telemetry**: [Configure product telemetry and feedback](/docs/enterprise/telemetry.md), and review agent monitoring separately.
* **Configure network access**: [Review service, proxy, and certificate requirements](/docs/setup/network.md#plan-network-access-for-managed-devices) with your network team.
* **Resolve a managed-device issue**: [Check policy delivery, precedence, and enforcement](/docs/enterprise/troubleshooting.md) and collect evidence for the responsible administrator.

## Choose the right management scope

Use [device policies](/docs/enterprise/policies.md) for supported editor settings on managed Windows, macOS, and Linux installations. These policies override the corresponding user and workspace settings.

AI controls can also come from {% data variables.product.prodname_copilot_short %} enterprise-managed settings or GitHub organization and enterprise settings. These systems have different scopes and precedence. Follow [Choose a management solution](/docs/enterprise/manage-ai-settings.md#choose-a-management-solution) rather than assuming a device policy covers every client or agent session.

## Verify before expanding a rollout

Use a pilot group that represents your developers' devices, accounts, projects, and execution environments. Confirm both the effective configuration and its behavior: an approved workflow should succeed, and a harmless operation that policy prohibits should be blocked.

Follow the [deployment validation checklist](/docs/enterprise/deployment.md#validate-a-pilot) for the editor and [AI rollout checks](/docs/enterprise/manage-ai-settings.md#verify-an-ai-rollout) for agent sessions. Give developers a support contact and a process for requesting access to restricted capabilities.

## Help developers on managed devices

If you're a developer using a managed device, start with the [AI troubleshooting guidance](/docs/agents/agent-troubleshooting/troubleshooting.md#start-with-basic-checks). Contact your administrator about organization-managed restrictions rather than trying to override them in user or workspace settings.

## Related resources

* [System requirements and supported environments](/docs/supporting/requirements.md)
* [Enterprise policy reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference)
