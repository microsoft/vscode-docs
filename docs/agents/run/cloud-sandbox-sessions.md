---
ContentId: 9b18cd39-21c1-4f77-a0ab-c54f221998b7
DateApproved: 10/23/2026
MetaDescription: Run and continue agent sessions in managed cloud sandboxes from {% data variables.product.prodname_vscode_shortname %} without keeping a local host online.
Keywords:
- cloud sandbox
- continuity
- remote execution
---
# Run agent sessions in a cloud sandbox (Experimental)

A cloud sandbox gives an agent a managed execution environment, so you can work with it without keeping your development machine online. Start a task, send follow-up instructions, and reconnect to the existing session from {% data variables.product.prodname_vscode_shortname %}. Your code and tools run in the cloud environment rather than on the device displaying the conversation.

Cloud sandboxes support continuity by separating the session's execution from your current client.

## Choose cloud or your own machine

| Option | Choose it when |
|--------|----------------|
| **Cloud sandbox (Experimental)** | You want to keep agent tools and changes off your local machine, or work on managed cloud compute without maintaining a host or keeping your own machine online. Reconnect to the existing session to continue the task. |
| **[GitHub Environments (Preview)](/docs/agents/run/remote-agent-sessions.md#github-environments-preview)** | You want to access sessions on your existing development machine across supported {% data variables.product.prodname_copilot_short %} clients. That machine and its Agent Host must remain running. |
| **[SSH or dev tunnels](/docs/agents/run/remote-agent-sessions.md#choose-how-to-connect)** | You want {% data variables.product.prodname_vscode_shortname %}-specific access to an agent host on another machine. |

Cloud execution separates agent activity from your local machine, but the agent can still affect the cloud workspace and services it has permission to access. See [cloud sandbox security considerations](/docs/agents/run/security.md#cloud-sandbox-sessions).

A cloud sandbox currently supports the {% data variables.product.prodname_copilot_short %} harness only. You can choose an available model, but not switch to the Claude or Codex harness within the cloud sandbox.

## Prerequisites

* Sign in with the {% data variables.product.prodname_github %} account that has access to the cloud service and the repository you want to use. Availability depends on your account and organization.
* Turn on the experimental `setting(chat.agentHost.cloudSandbox.enabled)` setting to create and discover cloud sandbox sessions. In the {% data variables.copilot.agents_window %}, this replaces the {% data variables.copilot.copilot_cloud_agent %} workflow on {% data variables.product.prodname_github %} Actions for new **Cloud** sessions.
* For the repository workflow below, choose a repository hosted on GitHub.com that your account can access.

To prevent this client from connecting to remote agent hosts, including cloud sandboxes, turn off `setting(chat.remoteAgentHostsEnabled)`.

## Start a cloud sandbox session

You can start a cloud sandbox session from either the {% data variables.copilot.agents_window %} or the {% data variables.copilot.chat_view %}, with cloud sandbox support enabled.

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

In the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md):

1. Select **New** to start a session.

1. Choose the **Cloud** environment, then use **Choose Repository...** to select the repository for the task.

1. Select an available model and review the session's available mode and permission controls.

1. Enter the task and its verification criteria, then send the prompt.

1. Wait for the cloud environment to connect and the repository to be ready. Continue in the session when the agent starts responding.

<!-- TODO: Add a screenshot showing Cloud selected, the repository picker, and the cloud sandbox session controls in the Agents window. -->

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

In the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md):

1. Create a new chat.

1. Open the **Session Target** control and select the **Cloud** option.

1. Review the repository for the task. A single {% data variables.product.prodname_github %} repository in the current workspace is selected automatically. If the workspace has multiple {% data variables.product.prodname_github %} repositories, choose one in the **Repository** picker. If no workspace repository is available, use **Select repository...** to search {% data variables.product.prodname_github %}, or leave it unchanged to start an empty sandbox.

1. Select an available model and review the session's available mode and permission controls.

1. Enter the task and its verification criteria, then send the prompt.

1. Wait for the cloud environment and any selected repository to be ready. Continue in the session when the agent starts responding.

{% /tab %}
{% /tabs %}

### Cloud workspace

The selected repository is prepared in the cloud environment. Files, dependencies, terminal state, and uncommitted changes on your local machine aren't automatically copied there. Give the agent the context it needs in the prompt, and use the capabilities available in the cloud session rather than assuming local extension tools are present.

> [!NOTE]
> The experimental `setting(chat.agentHost.cloudSandbox.earlyPreparation)` setting can prepare cloud compute while you compose a prompt, before you send it. It is off by default.

## Continue an existing cloud session

To pick up the same task, open its existing session rather than create another **Cloud** session:

1. Sign in to {% data variables.product.prodname_vscode_shortname %} with the account that owns the cloud session.

1. Find the session in the [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list). Check the repository and list filters if it isn't visible.

1. Open the session and check its connection state before sending a follow-up.

1. Once connected, send your next instruction in the same conversation.

<!-- TODO: Add a screenshot showing an existing cloud sandbox session and its connection status. -->

In the {% data variables.copilot.agents_window %}, opening or restoring a cloud chat connects to or wakes its environment. To wait until you start composing or explicitly connect, turn off `setting(chat.agentHost.cloudSandbox.autoConnectOnOpen)`.

In the {% data variables.copilot.chat_view %}, opening an existing cloud session connects to its environment if it is already online, but doesn't automatically wake an offline environment.

A recorded transcript can be available even when the environment isn't connected. Reading history is different from resuming live work. If the session is read-only, check whether the environment is still available and connect before trying to send a message.

Cloud execution doesn't depend on your local application remaining open, but the service controls environment availability and lifetime. Don't treat a sandbox as permanent storage or assume that a transcript guarantees a running environment.

## Review work and finish a session

Review the agent's changes and verification results in the connected session before you integrate them. Ask for the relevant tests and inspect what actually ran in the cloud environment. Use the repository's branch and pull request workflow when you want to share the result for review.

These actions have different effects:

| Action | Effect |
|--------|--------|
| Stop the active request | Requests cancellation of the current agent work. It doesn't undo completed edits or external actions. |
| Close the chat or disconnect | Ends your interaction or connection, not the cloud environment's lifetime. |
| Mark the session as done | Organizes the recorded task. It isn't a compute-shutdown control. |
| Delete the session | Deletes the cloud task. This doesn't confirm whether the underlying compute environment was deleted. |

The service manages cloud resources separately from the session list. Preserve work you need in your repository before deleting a task or relying on later environment access.

## Troubleshoot cloud sandbox sessions

| Symptom | What to check |
|---------|---------------|
| Cloud sandbox creation is unavailable | Check feature availability, account access, organization restrictions, and `setting(chat.remoteAgentHostsEnabled)`. |
| The repository can't be selected or cloned | Use a GitHub.com repository and an account with access to it. Check the reported repository or authentication error before retrying. |
| An existing session is missing | Use the owning account and check repository grouping and session filters. A deleted task isn't an existing session to resume. |
| A transcript opens but can't accept messages | Check the environment's availability and connection state. History alone doesn't provide a live host. |
| Local tools or files are missing | Cloud execution uses its own workspace and tools. Local editor state and installed extensions aren't automatically available there. |

## Related resources

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Connect to sessions on your own machines](/docs/agents/run/remote-agent-sessions.md)
* [Secure AI-assisted development](/docs/agents/run/security.md#cloud-sandbox-sessions)
