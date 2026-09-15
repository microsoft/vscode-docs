---
ContentId: 9f84b21e-5b76-4c3a-a5dd-2021ab343f1f
DateApproved: 9/16/2026
MetaDescription: Add and run tests for existing code with AI in {% data variables.product.prodname_vscode %}, then review assertions, failures, and coverage.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Test existing code with AI

Adding tests to an existing project involves more than generating test code. You need to identify which behavior matters, follow the project's conventions, and verify that the assertions catch incorrect results.

This guide shows you how to use an agent in {% data variables.product.prodname_vscode %} to add tests for existing code, run them, investigate failures, and review the result. Start with one function or module, then expand coverage after you validate the first set of tests.

## Prerequisites

* [Enable AI features in {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/overview.md#enable-ai-features).
* Open an existing project in {% data variables.product.prodname_vscode_shortname %}.
* Install the project's dependencies and any runtime needed to run its tests.

A testing extension is optional for running tests in the terminal. To discover and run tests in the Test Explorer, install an appropriate [testing extension](/docs/debugtest/testing.md#extensions-for-testing).

## Identify the testing setup

Reuse the project's framework and test conventions instead of introducing a new test runner. This helps new tests work with existing test commands and avoids adding a second setup to maintain.

1. Open the {% data variables.copilot.chat_view %} (`kb(workbench.action.chat.open)`) and select **Agent** from the agent picker.

1. Ask the agent to inspect the project before making changes:

    ```prompt
    Inspect this project's testing setup. Identify the test framework,
    where tests belong, and the commands for running a single test file
    and the related suite. Find an existing test that demonstrates the
    project's naming, assertions, and mocking conventions.
    Do not edit files or install dependencies.
    ```

1. Review the identified commands and ask the agent to run the relevant existing tests as a baseline. Record any failures so you can distinguish them from failures introduced by new tests.

If the project has no tests, ask the agent to propose a framework and a minimal setup first. Review the proposal before asking it to install dependencies or change configuration.

> [!TIP]
> To reuse your testing conventions and safeguards across sessions, see [Make the workflow repeatable](#make-the-workflow-repeatable).

## Define the behavior to test

Choose a small scope and describe its expected behavior. A focused set of tests is easier to review for missing cases and incorrect assumptions. Include the source file and a representative existing test as [context in your prompt](/docs/chat/chat-overview.md#add-context-to-your-prompts) so the agent can follow the project's patterns.

Use requirements or documented behavior to define expected results. Asking the agent to infer every expectation from the implementation risks generating tests that preserve an existing bug.

For example, if your project has a username validator with the following requirements, adapt this prompt to its function and file names:

```prompt
Propose unit tests for `validateUsername` without editing files yet.
The requirements are:
* Accept names containing 3 to 20 ASCII letters, digits, or underscores.
* Reject names outside that length range.
* Reject spaces and other characters.

Include valid examples, both length boundaries, and invalid inputs.
Compare the proposed cases with existing tests and identify missing
coverage. Flag any behavior that needs clarification.
```

Review the proposed cases before generating code. For this example, useful boundary cases include lengths of 2, 3, 20, and 21. Testing at and just outside each limit helps catch off-by-one errors. Decide separately how inputs such as `null` should behave if the contract doesn't specify them, so the agent doesn't invent a requirement.

## Add tests without changing implementation code

Keeping implementation code unchanged lets the tests expose existing bugs and keeps any fixes separate for review. After you agree on the cases, ask the agent to implement _only_ the tests:

```prompt
Add the agreed tests using the existing framework and test conventions.
Reuse existing test helpers where appropriate. Do not change implementation
code, add dependencies, or refactor unrelated tests.
Keep expected results explicit rather than computing them with the
function under test.
```

Inspect the generated tests. Check that they call the intended code and assert observable results, rather than only checking that execution completes. Keep expected results independent of the function under test: if the test uses that function to calculate the expected value, the same bug can affect both values and let the test pass.

## Run tests and investigate failures

Start with the smallest test selection that covers the changes to get faster feedback and make failures easier to isolate. Ask the agent:

```prompt
Run the new tests with the project's existing test command. Report the
command, the pass and fail counts, and any skipped tests. If tests fail,
explain whether the cause is test setup, an incorrect expectation, or
a possible implementation bug. Do not change implementation code or weaken
assertions to make the tests pass.
```

The agent can use available [tools](/docs/agents/run/tools.md) to run tests and inspect their output. Review commands before approving execution. If execution is blocked or the required environment is unavailable, run the command yourself and provide the failure output. Treat tests that weren't run as unverified.

Identify the cause before accepting a fix. A failing test can reveal a bug, but it can also reflect faulty test setup or an incorrect expectation:

* **Test setup problem**: correct imports, fixtures, or configuration, then rerun the tests.
* **Incorrect expectation**: compare the assertion with the agreed requirements before changing it.
* **Implementation bug**: keep the test that exposes the defect and decide whether to fix the implementation as a separate step.

Don't accept deleted assertions, skipped tests, or changed expected values solely to obtain a passing result. After the targeted tests pass, run the related suite to check for interactions with existing tests.

### Use Test Explorer assistance

If a testing extension exposes a failing test in the Test Explorer, hover over the failed test and select **Fix Test Failure** (sparkle icon) to request help from {% data variables.product.prodname_copilot_short %}. Review the suggested change against the expected behavior before accepting it, then rerun the test.

## Review assertions and coverage

Before keeping the changes, [review the diff](/docs/agents/run/review-code-edits.md) and test output:

* Confirm that each assertion checks an agreed requirement, including relevant boundary and error cases.
* Check that tests are independent and don't rely on live services, shared mutable state, or timing unless those dependencies are intentional. Accidental dependencies can make tests pass or fail depending on execution order or environment.
* Verify that mocks don't replace the behavior the tests are supposed to exercise. Otherwise, a passing test might only confirm the mock's configured response.
* Confirm that implementation code and unrelated files remain unchanged.
* Check the actual execution results, including failures and skipped tests, rather than relying only on the agent's summary.

If your runner supports [test coverage](/docs/debugtest/testing.md#test-coverage), use it to find untested branches and decide which behavior to cover next. Coverage shows which code executed, not whether the assertions are correct. A passing suite, even with high coverage, doesn't prove that the implementation is correct.

## Make the workflow repeatable

Save the test commands, framework, mocking conventions, and test-quality safeguards in your project's [custom instructions](/docs/agent-customization/custom-instructions.md). This helps the agent follow the same guidance across sessions without you repeating it in every prompt. Keep the instructions in version control to share them with your team.

Alongside your project's conventions, include safeguards such as:

```markdown
* Do not delete or weaken assertions, skip tests, or change expected
  values solely to make failing tests pass.
* If an assertion appears incorrect, explain why and ask for confirmation
  before changing it.
* Run the relevant tests after changes. Report failures, skipped tests,
  and tests you could not run.
```

Custom instructions guide the agent but don't enforce these safeguards. Review the diff and test results even when instructions are in place.

## Next steps

* Follow a complete workflow to [fix an API bug with an agent](/docs/agents/guides/fix-a-bug-with-agents.md).
* Set up a test-first workflow with [TDD custom agents and handoffs](/docs/agents/guides/test-driven-development-guide.md).
* Try [testing web apps with browser agent tools](/docs/agents/guides/browser-agent-testing-guide.md).
