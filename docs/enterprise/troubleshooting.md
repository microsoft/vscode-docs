---
ContentId: 946d6a8c-7912-45c2-b3ab-2681f743d26e
DateApproved: 11/25/2026
MetaDescription: Diagnose managed {% data variables.product.prodname_vscode_shortname %} policy and access issues, and collect safe escalation evidence.
MetaSocialImage: images/policies/allowed-extensions-managed-by-organization.png
---

# Troubleshoot managed installations

Use this guide as an endpoint administrator or help desk technician to determine whether a managed {% data variables.product.prodname_vscode_shortname %} problem comes from policy delivery, conflicting controls, enforcement scope, account access, or connectivity. Collect evidence from the affected installation before changing your configuration.

## Choose a troubleshooting path

| Symptom | Start here |
|---------|------------|
| A policy is missing or has an unexpected value. | [Check delivery and precedence](#check-delivery-and-precedence). |
| The expected policy appears, but behavior differs. | [Check enforcement scope](#check-enforcement-scope). |
| AI is unavailable, sign-in fails, or a connection fails. | [Check account, version, and network scope](#check-account-version-and-network-scope). |
| An update is blocked or occurs despite an update policy. | [Check account, version, and network scope](#check-account-version-and-network-scope). |
| The cause remains unclear or needs another team's action. | [Prepare an escalation](#prepare-an-escalation). |

## Capture the policy state

1. Record the affected operation, expected result, actual result, and time of failure. Identify the application, release channel, operating system, and installation type. For agent problems, also record the session's harness and where its commands run.

1. In the affected installation, open the Command Palette (`kb(workbench.action.showCommands)`) and run **Developer: Policy Diagnostics**.

1. Review **System Information**, **Applied Policy**, **Non-applied Policy**, and **Account Policy Gate**. Record the relevant policy name, reported value, source, and any gate reason. See [the policy report fields](/docs/enterprise/policies.md#verify-policy-enforcement).

1. Run **Developer: Show Logs**, select **Window**, and look for errors around the failure time, including policy parsing or retrieval errors.

> [!CAUTION]
> Policy reports can contain account identifiers, authentication and session information, and extension access details. Review and redact reports and logs before sharing them. Preserve only the evidence needed to investigate the problem.

The report is a snapshot of the policy state observed by that installation. It helps establish delivery and policy resolution, but does not prove runtime enforcement on another host or the telemetry behavior of third-party extensions.

## Check delivery and precedence

Use these checks when a policy is absent or the reported value differs from your intended configuration.

1. Confirm which system owns the control: device management, {% data variables.product.prodname_copilot_short %} enterprise-managed settings, or GitHub organization settings. These use different delivery paths, even when the same MDM tool deploys them. See [management solutions and scope](/docs/enterprise/manage-ai-settings.md#understand-the-three-management-solutions).

1. For a device policy, check the management assignment and delivery status for the affected device or user. Compare the deployed policy name, value type, and product target with the [platform deployment instructions](/docs/enterprise/policies.md). Confirm that the installed release supports the policy.

1. If delivery succeeded but the policy is not applied, check the deployed payload for syntax errors and the Window log for parsing errors. For device policies, use policy names rather than editor setting IDs. After the device receives a correction, restart the application and regenerate the report.

1. If the value is applied but unexpected, compare its reported source with the intended source. Follow [the precedence rules](/docs/enterprise/manage-ai-settings.md#understand-precedence), including the keys that combine restrictions. Don't assume that the device-policy value wins over an enterprise-managed value for the same control.

1. For an unexpected server-managed value, ask the {% data variables.product.prodname_copilot_short %} administrator to check team membership and mapped configuration files. Follow [managed-settings verification](/docs/enterprise/manage-ai-settings.md#verify-applied-managed-settings).

Correct the configuration in the system that owns it. Changing a developer's user or workspace settings does not override an enforced policy.

## Check enforcement scope

Use these checks when diagnostics show the expected value but the operation still behaves differently.

1. Check whether the control applies to the affected client, feature, and harness, rather than only whether its value was delivered. Review [device-policy coverage differences](/docs/enterprise/manage-ai-settings.md#use-vs-code-device-policies). For example, `ChatAgentMode` is not a universal restriction on agent sessions.

1. Distinguish a starting default from a restriction. A managed model default does not prevent a developer from selecting another available model in a conversation. See [managed model defaults](/docs/enterprise/manage-ai-settings.md#set-managed-model-defaults).

1. For runtime controls, identify the execution host. In a remote or container session, check the machine or container where commands run, not only the connecting device. Confirm that the harness supports the control and that the host meets its prerequisites.

1. For a Copilot harness sandbox issue, run `/sandbox policy` in the affected session and compare its host, paths, and network restrictions with the intended configuration. Follow [execution-environment verification](/docs/agents/run/move-to-copilot.md#validate-each-execution-environment).

1. In an approved test environment, exercise one permitted operation and one harmless operation that should be blocked. Check the actual result, not only whether an approval prompt appears. Follow [workflow and control verification](/docs/agents/run/move-to-copilot.md#verify-the-workflow-and-controls).

Keep organizational controls in place while investigating. Don't use a less-restricted harness or grant a broad exception as a generic troubleshooting step.

## Check account, version, and network scope

1. Check **Account Policy Gate** in the policy report. If its state is `restricted`, use the reason to choose the next action:
   * For `noAccount`, `wrongProvider`, or `orgNotApproved`, confirm the required account and organization with the GitHub administrator. See [approved GitHub organizations](/docs/enterprise/manage-ai-settings.md#restrict-ai-features-to-approved-github-organizations).
   * For `policyNotResolved`, run **Developer: Sync Account Policy**, then regenerate the report. If it remains unresolved, collect the associated errors and investigate account-policy retrieval.

1. Check any minimum-version notice against the installed version. The managed-settings service can block AI features until the client meets its requirement, even when other editor features work. Have the software deployment team deliver an approved version that meets [the minimum requirement](/docs/enterprise/manage-ai-settings.md#meet-minimum-version-requirements).

1. For unexpected update behavior, identify who performs the update. The built-in updater's policy does not govern package-manager or extension updates. Route the issue to the owner of the relevant update mechanism using [enterprise update guidance](/docs/enterprise/updates.md#update-policy).

1. For connection or certificate errors, identify the failing service and where the request originates. Ask the network team to check proxy routing, permitted destinations, and certificate trust on that device or execution host. Keep certificate validation in place.

1. If account and management checks pass but AI still fails, have the developer collect [AI network diagnostics](/docs/agents/agent-troubleshooting/troubleshooting.md#collect-network-diagnostics) or follow the relevant [AI troubleshooting path](/docs/agents/agent-troubleshooting/troubleshooting.md#choose-a-troubleshooting-path). Apply your organization's redaction requirements before sharing the output.

## Prepare an escalation

Include the following in an internal support request:

* The failed operation, expected and actual results, failure time and time zone, and minimal reproduction steps.
* The application version and channel, operating system, installation type, and affected client. For agent issues, include the harness and execution-host type.
* The relevant policy names, reported values and sources, account gate state and reason, and redacted log excerpts.
* The scope of impact: one device, an assigned group, an account, a client, or an execution environment. Include a working comparison if one is available.
* The checks already completed and their results, including any approved configuration changes.

Route the request according to the evidence:

| Evidence | Responsible team and next action |
|----------|----------------------------------|
| Missing assignment, failed device delivery, or invalid device-policy payload. | Device management: inspect targeting, deployment status, and payload format. |
| Unexpected managed source, team override, account gate, or service-side access restriction. | GitHub or {% data variables.product.prodname_copilot_short %} administration: inspect the account, membership, and managed configuration. |
| Required client version is not deployed. | Software deployment: reconcile the approved release with the service requirement. |
| Proxy, destination, or certificate errors. | Network support: inspect the request path and trust configuration on the originating host. |
| Expected policy is delivered, but a supported control fails in a reproducible case. | Help desk or platform support: escalate to the product support channel with redacted diagnostics and reproduction steps. |

Do not attach complete diagnostic reports to public issues without reviewing and redacting them. Share sensitive evidence only through your organization's approved support channel.

## Next steps

After resolving the issue, repeat the affected operation and verify the intended restriction. For rollout changes, return to your [deployment pilot](/docs/enterprise/deployment.md) before expanding the assignment.
