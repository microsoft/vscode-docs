---
ContentId: 3f9e2b7d-6a8c-4d1e-9f2a-8c4b5d7e9f1a
DateApproved: 11/25/2026
MetaDescription: Validate a web app with AI browser tools in {% data variables.product.prodname_vscode_shortname %}, reproduce a defect, and verify the fix.
Keywords:
- ai
- copilot
- agents
- browser
- integrated browser
- testing
- automation
- guide
- tutorial
---
# Build and validate a web app with browser tools

Browser tools let an agent check a running web app instead of relying only on its source code. The agent can open the app, interact with it, inspect the result, and repeat a failing interaction after a fix.

In this guide, you build a calculator, validate it against explicit acceptance criteria, and practice reproducing and fixing a defect. Use the **{% data variables.product.prodname_copilot_short %}** harness in the {% data variables.copilot.chat_view %}. The generated implementation can vary but the expected behavior stays the same.

These interactive checks provide feedback during development. They don't automatically create a saved test suite or prove that the entire app is correct.

## Prerequisites

**Project:** Sample web app (no build step). **Harness:** {% data variables.product.prodname_copilot_short %}. **Interface:** {% data variables.copilot.chat_view %}.

* [Install {% data variables.product.prodname_vscode %}](/download).
* [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md).
* Leave `setting(workbench.browser.enableChatTools)` turned on, which is the default.

The sample uses HTML, CSS, and JavaScript without a build step or additional dependencies.

## Define the acceptance criteria

Decide what the agent should observe before asking it to validate the app. For this calculator, use the following checks:

| Check | Actions | Expected result |
|-------|---------|-----------------|
| Digit buttons | Clear the calculator, then select a digit. Repeat for each digit from 0 to 9. | The display shows the selected digit. |
| Addition | Enter `3 + 5 =`. | `8` |
| Subtraction | Enter `9 - 4 =`. | `5` |
| Multiplication | Enter `6 * 7 =`. | `42` |
| Division | Enter `8 / 2 =`. | `4` |
| Clear | Enter `9 +`, select **Clear**, then enter `2 + 3 =`. | Clear displays `0` and resets the pending operation. The new calculation returns `5`. |
| Division by zero | Enter `7 / 0 =`. | `Error`, not `Infinity` or `NaN`. |

Start each independent check with **Clear** so that a previous calculation doesn't affect the result.

## Step 1: Check browser tool availability

1. Create a project folder and open it in {% data variables.product.prodname_vscode_shortname %}.
1. Open the {% data variables.copilot.chat_view %} (`kb(workbench.action.chat.open)`), start a new chat, and select **{% data variables.product.prodname_copilot_short %}** as the **Session Target** and **Agent** from the agent picker.
1. Select **Open Customizations** in the {% data variables.copilot.chat_view %} title bar > **Tools** and verify that **Integrated Browser** is selected.

If the tools are missing, check `setting(workbench.browser.enableChatTools)`. Organization policy can also turn them off. See [browser tools troubleshooting](/docs/agents/run/browser-tools.md#troubleshoot-browser-tools).

## Step 2: Build the calculator

Ask the agent to build the app with the behavior you intend to verify:

```prompt
Create a calculator using index.html, styles.css, and script.js.
Use plain HTML, CSS, and JavaScript without dependencies or a build step.
It must work when index.html is opened directly in a browser.

Include buttons for digits 0-9, addition, subtraction, multiplication,
division, Clear, and equals. Show the entered value and calculation result.
Clear must reset the display to 0 and discard any pending operation.
Division by zero must display Error rather than Infinity or NaN.
```

[Review the saved changes](/docs/agents/run/review-code-edits.md). If edits are pending review, select **Keep** to retain them or **Undo** to revert them. **Keep** clears pending review; the files are already saved to your workspace.

Don't assume the generated function names or internal structure match another calculator implementation. Judge the app against the acceptance criteria.

## Step 3: Run the acceptance checks

Ask the agent to interact with the app without changing it during the check:

```prompt
Open index.html in the integrated browser and check the calculator by
selecting its buttons. Start each independent check with Clear.

Verify:
* Each digit button from 0 to 9 displays that digit after Clear.
* 3 + 5 = 8, 9 - 4 = 5, 6 * 7 = 42, and 8 / 2 = 4.
* Entering 9 + and then Clear displays 0. Entering 2 + 3 = afterward
  returns 5, without retaining the previous operation.
* 7 / 0 = displays Error, not Infinity or NaN.

Do not edit files. Report each check's actions, expected result, actual
result, and pass or fail status. Mark checks you couldn't run as unverified.
```

Review the browser tool calls and reported results. A screenshot can support a visual observation, but it doesn't show that every interaction passed. If the agent can't open the page or complete an action, resolve that problem before treating the check as verified.

The following video illustrates browser interaction with a calculator. Your generated layout and tool sequence might differ.

<video src="../images/browser-agent-testing-guide/agent-testing-calculator.mp4" title="Video showing the agent testing the calculator in the integrated browser." autoplay loop controls muted></video>

## Step 4: Reproduce and fix a defect

If an acceptance check failed, use that failure for this step. If all checks passed, introduce a controlled defect to practice the workflow:

```prompt
Introduce only this defect in the calculator: dividing by zero displays
Infinity instead of Error. Keep the JavaScript syntactically valid and
leave all other behavior unchanged. Do not fix the defect yet.
```

Review the diff to confirm that only the intended behavior changed. Then reproduce the defect before requesting a fix:

```prompt
Reload the calculator to use the saved code. Select Clear, enter 7 / 0 =,
and report the actual display value. It should be Error.
Do not edit files during this check.
```

After you observe the incorrect result, ask for a focused fix:

```prompt
Fix the division-by-zero behavior so the display shows Error.
Avoid unrelated changes.

Reload the page and repeat the failing interaction. Then rerun every
acceptance check from the earlier request, starting each with Clear.
Report the actual results and any checks you couldn't complete.
```

For a different defect, replace the division-by-zero case with the actions and expected result from the failed check.

Review the fix and verification output. Reload after code changes so the agent checks the updated app, not a page still running the previous code.

## Keep regression coverage

Browser interaction during a chat isn't a saved automated test. To catch the same defect after future changes, add regression coverage to your project's test suite.

Use unit tests for isolated calculation behavior and browser tests for behavior that depends on the UI. Reuse an existing framework rather than introducing a second runner:

```prompt
Add a regression test for the defect we fixed using the project's existing
test framework and conventions. Verify the expected behavior, not the
implementation details, and run the relevant tests.

If no suitable test framework exists, propose a minimal setup and wait
for approval before installing dependencies or changing configuration.
```

Review the assertions and execution output. See [Test existing code with AI](/docs/agents/guides/test-code-with-ai.md) for guidance on test quality, failures, and coverage.

## Apply the workflow to your web app

For an existing project, give the agent the development-server command, app URL, a focused user journey, and expected results. Specify whether it should only report failures or also fix them.

If a flow needs an existing browser session, [share a page with the agent](/docs/agents/run/browser-tools.md#share-an-existing-page). Sharing gives access to that page's current session, including its sign-in state. Use a test account and disposable data for actions that submit forms or change stored data.

Other useful checks include:

* **Forms**: test valid and invalid input, error messages, and successful submission.
* **Responsive layouts**: compare navigation and content at specified desktop and mobile viewport sizes.
* **Accessibility**: investigate labels, headings, and keyboard interactions. Agent checks aren't a complete accessibility audit; include manual keyboard and assistive-technology testing.

For browser capabilities, session isolation, and privacy controls, see [Use browser tools with agents](/docs/agents/run/browser-tools.md).

## Next steps

* Use [test-driven development](/docs/agents/guides/test-driven-development-guide.md) to define behavior before implementation.
* Learn how to [attach browser elements, screenshots, and console output to chat](/docs/debugtest/integrated-browser.md#add-context-to-ai-chat).
