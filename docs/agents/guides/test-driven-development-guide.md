---
ContentId: a9c5f4d2-8e91-4b3a-9d2c-7f1e3b8a6c4d
DateApproved: 11/11/2026
MetaDescription: Practice test-driven development with AI in {% data variables.product.prodname_vscode_shortname %}, using failing tests and review checkpoints.
Keywords:
- ai
- copilot
- agents
- instructions
- customization
- guide
- testing
- TDD
---
# Practice test-driven development with AI

Test-driven development (TDD) starts with a test that detects missing behavior, followed by the implementation that makes it pass. You then refactor while keeping the tests passing. These small [red-green-refactor cycles](https://martinfowler.com/bliki/TestDrivenDevelopment.html) give you evidence for each change.

This guide shows you how to use an agent in {% data variables.product.prodname_vscode %} for each phase, with a review checkpoint before you move to the next. Use the **{% data variables.product.prodname_copilot_short %}** harness in the {% data variables.copilot.chat_view %} and your own repository. Custom agents and handoffs aren't required.

If you want to cover behavior that already exists rather than develop new behavior, start with [Test existing code with AI](/docs/agents/guides/test-code-with-ai.md).

## Prerequisites

* [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md).
* Open your repository in {% data variables.product.prodname_vscode_shortname %}.
* Install the project's dependencies and confirm that its test command runs from the integrated terminal.

If the project has no testing setup, [choose a framework and establish a test command](/docs/agents/guides/test-code-with-ai.md#identify-the-testing-setup) before starting the TDD cycle.

## Keep a review checkpoint between phases

Use separate requests for each phase instead of asking the agent to implement the entire feature at once.

| Phase | Agent's task | Evidence to review before continuing |
|-------|--------------|--------------------------------------|
| Red | Add a focused test without implementing the behavior. | The test runs and fails because the expected behavior is missing. |
| Green | Implement the behavior without weakening the test. | The new test and relevant existing tests pass. |
| Refactor | Improve the structure without changing behavior, if needed. | The tests still pass and the diff stays within scope. |

One agent can handle all three phases. Your separate requests and review checkpoints keep you involved; separate custom agents are an optional way to reuse the roles.

## Establish the baseline

1. Open the {% data variables.copilot.chat_view %} (`kb(workbench.action.chat.open)`), start a new chat, and select **{% data variables.product.prodname_copilot_short %}** as the **Session Target** and **Agent** from the agent picker.

1. Ask the agent to identify and run the relevant existing tests:

    ```prompt
    Inspect this project's test framework, test locations, and conventions.
    Identify the commands for a focused test run and the related suite.
    Run the relevant existing tests and report any failures or skipped tests.
    Do not edit files, install dependencies, or change configuration.
    ```

1. Review the output and record existing failures. Resolve setup problems before proceeding so you can distinguish a new failing assertion from a test that can't run.

## Define one behavior

Describe the expected behavior independently of the current implementation. Choose a small increment rather than asking the agent to generate a complete feature and its tests.

For example, suppose you're adding a username validator with this contract:

* Accept names containing 3 to 20 ASCII letters, digits, or underscores.
* Reject names outside that length range.
* Reject spaces and other characters.

Start with the minimum length rule: `ab` is invalid and `abc` is valid. Later cycles can cover the maximum length and allowed characters. Adapt the function name and file paths to your project, and clarify unspecified inputs, such as `null`, before testing them.

## Red: add and run a failing test

1. Ask the agent to add only the tests for the first increment:

    ```prompt
    Add focused tests for validateUsername using the existing test framework.
    For this increment, "ab" must return false and "abc" must return true.
    Keep expected values explicit and independent of the implementation.

    Do not implement the behavior or refactor existing code. If a new
    function or type needs a minimal placeholder for tests to execute,
    explain what is needed and wait for approval.

    Run the targeted tests. Report the command, actual failure, and why
    it demonstrates missing behavior rather than a test setup problem.
    Stop after the test run so I can review it.
    ```

1. Review the test code and failure output. Confirm that the tests call the intended code and fail on the expected behavior, not an unrelated import, dependency, or configuration error.

If the tests already pass, the selected behavior might already exist. Review the assertions and choose the next missing behavior; don't break correct code to manufacture a failing test.

## Green: implement the behavior

After you confirm the red-phase result, ask for the smallest implementation that satisfies the current tests:

```prompt
Implement the behavior covered by the failing tests. Preserve existing
behavior and follow the project's conventions. Do not add unrelated
features, dependencies, or refactoring.

Do not delete or weaken assertions, skip tests, or change expected values
to make the suite pass. If a test conflicts with the agreed requirements,
explain the conflict before changing it.

Run the targeted tests and the related suite. Report results, including
failures, skipped tests, and anything you couldn't run. Stop for review.
```

Review the implementation diff and actual test output. The current tests should pass without changing their meaning, and previously passing related tests should remain passing.

If a test fails, [identify whether the cause is setup, the expectation, or the implementation](/docs/agents/guides/test-code-with-ai.md#run-tests-and-investigate-failures) before accepting another edit.

## Refactor: improve structure without changing behavior

Refactor only when the passing implementation needs cleanup. A cycle doesn't require a refactor if the code is already clear.

```prompt
Review the passing implementation for a small, useful refactor.
If none is needed, say so and leave the files unchanged.

If you refactor, preserve observable behavior and the existing assertions.
Do not add functionality or unrelated cleanup. Run the targeted tests and
related suite afterward, then summarize the changes and results for review.
```

[Review the diff](/docs/agents/run/review-code-edits.md) and confirm that the tests still pass. If the refactor requires changing assertions, check whether the tests depend on implementation details or the proposed change alters behavior.

Repeat the cycle for the next requirement. In the username example, add cases at lengths 20 and 21, then cover allowed and disallowed characters. Keep each increment small enough to review.

## Make the workflow repeatable

Once the workflow works in your project, save its conventions rather than repeating them in every request.

### Save project instructions

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`) and select **Instructions** in the Agent Customizations editor.

1. Open your existing project instructions. If none exist, select `+` next to **Workspace** and choose a project instructions file offered for the {% data variables.product.prodname_copilot_short %} harness.

1. Add the verified test commands, framework, file locations, and relevant mocking conventions. Include safeguards such as:

    ```markdown
    * Work on one agreed behavior at a time.
    * In the red phase, add a test and confirm the expected failure before
      implementing behavior.
    * Do not weaken assertions, skip tests, or change expected values solely
      to make tests pass.
    * Run focused tests and the related suite after implementation changes.
      Report failures, skipped tests, and checks that could not run.
    * Stop for review between red, green, and refactor phases.
    ```

1. Save the instructions and [verify them in a new chat](/docs/agent-customization/custom-instructions.md#verify-your-instructions).

If you prefer to create the file directly, use `.github/copilot-instructions.md` or `AGENTS.md` at the repository root. Keep phase and review rules in project-wide instructions because they apply to implementation changes as well as tests. For test-file-specific conventions, use [file-based instructions](/docs/agent-customization/custom-instructions.md#apply-instructions-to-specific-files-or-tasks).

### Optionally create separate phase agents

If your team repeatedly uses the same roles, open **Agents** in the Agent Customizations editor and select **New Agent** next to **Workspace**. Follow [Create a custom agent](/docs/agent-customization/custom-agents.md#create-a-custom-agent), using each phase's task and review criteria from this guide as its instructions.

Select the next phase's agent manually after reviewing the previous result. Verify the agents with your chosen harness before sharing them with the team.

> [!IMPORTANT]
> Instructions guide behavior but don't enforce file-level restrictions. An agent with editing or terminal tools can change both tests and implementation. Review the diff and test output at every checkpoint.

### Existing Local handoff workflows

The Local harness is deprecated `feature(local-harness)`. If you already use custom-agent handoffs, see the [Local handoff guidance](/docs/agent-customization/custom-agents.md#handoffs) and [move your workflow to the Copilot harness](/docs/agents/run/move-to-copilot.md). Handoff buttons aren't required for the review-driven workflow in this guide.

## Next steps

* Apply a failing-test-first workflow to [fix an API bug](/docs/agents/guides/fix-a-bug-with-agents.md).
* Use existing tests to [refactor safely](/docs/agents/guides/refactor-safely.md).
