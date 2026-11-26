---
ContentId: 3d7a9c4e-2f1b-4e8a-8c6d-5a1f3e9b2d74
DateApproved: 11/26/2026
MetaDescription: Debug a runtime crash or state bug in {% data variables.product.prodname_vscode_shortname %} by pairing an AI agent in the Chat view with the debugger and logs.
MetaSocialImage: ../images/agents-overview/chat-view-expanded.png
Keywords:
- debugging
- runtime failure
- stack trace
- debugger
- breakpoints
- logpoints
- logs
- agents
- chat view
---
# Debug a runtime failure with an agent and the debugger

Runtime failures such as crashes, unexpected exceptions, race conditions, and corrupted state often depend on live inputs, environment settings, or call order that static code reading misses. Pairing the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) with the built-in {% data variables.product.prodname_vscode %} debugger lets you collect real runtime evidence while using an agent to form hypotheses, locate root causes, and verify fixes.

In this guide, you investigate a reproducible runtime failure in your own project, use the debugger to test the agent's hypotheses against live state, lock in a failing regression test, and verify a minimal fix.

If you want a guided practice tutorial with a sample project first, complete [Fix an API bug with an agent](/docs/agents/guides/fix-a-bug-with-agents.md).

## Prerequisites

**Project:** Your repository with a reproducible runtime failure. **Harness:** {% data variables.product.prodname_copilot_short %}. **Interface:** {% data variables.copilot.chat_view %}.

* [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md).
* Open a trusted repository with a working build or run command and the [debugger extension](/docs/debugtest/debugging.md#debugger-extensions) for your runtime.
* Commit or stash unrelated work and create a [development branch](/docs/sourcecontrol/branches-worktrees.md) before applying fixes.
* Review the [recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline) before letting an agent run commands on an existing repository.

## 1. Capture runtime evidence before asking for a fix

Start by collecting concrete output from the failing run instead of describing the symptom from memory. In [{% data variables.product.prodname_copilot_short %} harness sessions](/docs/agents/run/agent-harnesses.md#copilot), share runtime evidence in one of these ways:

| Evidence source | How to share it in the {% data variables.copilot.chat_view %} |
|-----------------|---------------------------------------------------------------|
| Stack trace, terminal output, or Debug Console output | Copy and paste the relevant output directly into the chat prompt. Pasted blocks attach cleanly as text context. |
| Saved log file | Select **Add Context** (`+`) > **Files** and select the log file, even if it sits outside your workspace. |
| Web application runtime errors | Open the app in the [integrated browser](/docs/debugtest/integrated-browser.md#add-context-to-ai-chat) and select **Add to Chat** > **Add Console Logs to Chat**. |
| Failing command or test script | Ask the agent to run the reproduction command with **Manual permissions** enabled so you approve the command and the agent inspects stdout and stderr directly. |

> [!CAUTION]
> Review stack traces and log files before sharing them in chat. Redact API keys, access tokens, connection strings, and sensitive customer data.

## 2. Form testable hypotheses before editing code

Ask the agent to diagnose the failure in read-only mode first. A confident explanation from static code is a hypothesis, not proof of the root cause.

1. Open the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) (`kb(workbench.action.chat.open)`), start a new chat, and confirm **Copilot**, **Agent**, and **Manual permissions** are selected.

1. Paste the stack trace or attach the log file, describe how to reproduce the failure, and ask for ranked hypotheses plus where to inspect runtime state:

    ```prompt
    Investigate this runtime failure without editing any files.
    Here are the reproduction steps and error output:
    <paste stack trace or log excerpt>

    List the top 2 or 3 root-cause hypotheses with exact files and line numbers.
    For each hypothesis, suggest specific breakpoints, conditional breakpoints,
    or logpoints to confirm or rule it out in the debugger.
    ```

1. Review the referenced files in the editor and check whether the suggested breakpoint locations match the failing code path.

## 3. Inspect live state with the debugger beside chat

Use the {% data variables.product.prodname_vscode_shortname %} debugger to test the agent's leading hypothesis against actual runtime values.

1. If the project does not have a debug configuration yet, ask the agent to [generate a `launch.json` configuration](/docs/debugtest/debugging-configuration.md#generate-a-launch-configuration-with-ai). Verify the generated command, arguments, and environment variables before running it.

1. Set the suggested [breakpoints, conditional breakpoints, or logpoints](/docs/debugtest/debugging.md#breakpoint-types) in the editor margin (`kb(editor.debug.action.toggleBreakpoint)`). Prefer logpoints for high-frequency loops or timing-sensitive code where pausing changes the behavior.

1. Start debugging (`kb(workbench.action.debug.start)`) and trigger the failure.

1. When execution pauses, inspect the **VARIABLES** and **CALL STACK** panels in the **Run and Debug** view and evaluate expressions in the **Debug Console** (`kb(workbench.debug.action.toggleRepl)`). Use **Step Over** (`kb(workbench.action.debug.stepOver)`) to watch state change across lines.

1. Share the concrete debugger observations back in the {% data variables.copilot.chat_view %}. For example:

    ```prompt
    I paused at <file>:<line> right before the crash.
    The variable <name> was <actual value> instead of <expected value>,
    and the call stack entered from <caller>.
    Confirm the root cause and explain the smallest safe fix without editing files yet.
    ```

Repeat this check until runtime observations confirm the exact root cause.

## 4. Add a failing regression test and apply a focused fix

Once live evidence confirms the root cause, encode the failing condition in a test before changing production code.

1. Ask the agent to write a minimal regression test or reproduction script that triggers the confirmed root cause:

    ```prompt
    Write a focused regression test that reproduces this failure for <confirmed root cause>.
    Run the test and confirm it fails with the same error before editing the implementation.
    ```

1. Verify the test fails for the expected reason.

1. Ask the agent to implement the smallest fix that resolves the root cause without changing unrelated behavior, then re-run the regression test and relevant existing tests:

    ```prompt
    Implement the minimal fix for the confirmed root cause.
    Run the new regression test and the existing tests for this area,
    and report what passed or failed.
    ```

1. Re-run the original scenario under the debugger (`kb(workbench.action.debug.start)`) to confirm the runtime failure no longer reproduces.

## 5. Review the diff and clean up debug artifacts

Runtime debugging often leaves temporary artifacts behind. Check every modified file before committing:

1. Open the **Source Control** view and inspect every changed and untracked file in the [diff editor](/docs/sourcecontrol/staging-commits.md#review-changes-with-the-diff-editor).

1. Remove any temporary print statements, diagnostic logging, disabled checks, or unwanted edits to `.vscode/launch.json`, and remove temporary breakpoints or logpoints from the **BREAKPOINTS** section.

1. Run your project's full relevant test suite yourself to verify the final clean state, then commit the fix and regression test.

## Next steps

* [Debug code with {% data variables.product.prodname_vscode %}](/docs/debugtest/debugging.md) for conditional breakpoints, logpoints, and multi-target debugging.
* [Fix an API bug with an agent](/docs/agents/guides/fix-a-bug-with-agents.md) for a self-contained sample bug-fixing tutorial.
* [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md) if an investigation starts looping or editing the wrong files.
