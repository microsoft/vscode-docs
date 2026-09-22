---
ContentId: b8e2024a-7618-4a7c-a2ee-8618b4530f89
DateApproved: 9/22/2026
MetaDescription: Refactor code with an agent in {% data variables.product.prodname_vscode_shortname %} while preserving behavior through focused changes and regression checks.
MetaSocialImage: ../images/agents-overview/hero-vscode-dev-agents-dark.png
Keywords:
- agents
- refactoring
- regression testing
- existing projects
---
# Refactor code without changing behavior

A refactor changes how code is organized without changing what it does. An agent can help find repeated logic, propose a smaller structure, and update callers, but a cleaner-looking diff doesn't prove that the behavior is preserved.

In this guide, you define a bounded refactor in your own repository, establish regression coverage, make the change in reviewable steps, and verify that existing callers still work. The example extracts repeated query validation into a shared helper.

For a symbol rename or a supported method extraction, prefer the editor's [language-aware refactoring actions](/docs/editing/refactoring.md). Use an agent when the task also needs investigation, design decisions, or coordinated edits that those actions don't cover.

## Prerequisites

* [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md).
* Open a trusted repository with a working development environment.
* Identify a small area to improve and a concrete goal, such as removing duplicate validation while preserving API responses.
* Preserve unrelated work and create a [development branch](/docs/sourcecontrol/branches-worktrees.md) for the refactor.

Work in the current folder on that branch. If the existing behavior is unclear, [trace it through the codebase](/docs/agents/guides/explore-a-codebase.md) before changing its structure.

## 1. Define what must stay the same

Record the behavior that callers depend on:

* Accepted inputs, defaults, and validation boundaries.
* Return values, response shapes, and ordering.
* Error types, status codes, and messages where they are part of the contract.
* Side effects, such as state changes or external calls.
* Public names and interfaces that other code consumes.

For the example, the goal is to extract repeated pagination validation into a helper without changing page defaults, accepted values, error responses, or the order of validation. Exclude new API behavior and unrelated cleanup.

1. Open the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and start a new chat.
1. Select the **{% data variables.product.prodname_copilot_short %}** session target and the **Agent** role. Keep **Manual permissions** selected.
1. Ask the agent to investigate the proposed refactor. Replace the placeholder with the relevant files or symbols:

    ```prompt
    Investigate the repeated pagination validation in <files-or-symbols>.
    Compare the implementations and identify all known callers.
    Report differences in defaults, accepted inputs, error behavior,
    and side effects before proposing a shared helper.

    Cite the relevant code and tests. Identify callers or behavior you
    cannot verify. Do not edit files or run project code.
    ```

Review differences before deciding to consolidate the code. Similar-looking functions might intentionally have different contracts. Don't make them behave identically merely to remove duplication.

## 2. Establish regression coverage

Ask the agent to identify the existing test commands and run the relevant tests after you review the commands. Record their results before any implementation changes.

If the behavior isn't sufficiently covered, [add tests for the existing code](/docs/agents/guides/test-code-with-ai.md) first:

```prompt
Add regression tests for the behavior we agreed to preserve.
Cover defaults, valid values, boundary and invalid inputs, and the
observable results for each affected caller.

Use the existing test framework. Keep implementation code unchanged
and expected results explicit. Run the new tests and the related
existing tests, then report their actual results.
```

Review the assertions against requirements and documented behavior, not only against the current implementation. If you discover a likely bug, decide whether to fix it as a separate change. Don't silently turn a refactor into a behavior change or encode a known defect as the intended contract.

Review the test-only diff separately from the implementation refactor. Preserve this verified baseline in Git so you can compare or recover the changes later.

## 3. Choose a bounded plan

Ask for the smallest structure that achieves your goal:

```prompt
Propose a plan to extract the agreed validation into a shared helper.
Name the files and callers to update, and identify the tests that
verify each step. Preserve the contracts we recorded.

Reuse existing helpers if they already solve the problem. Do not add
dependencies, redesign public interfaces, or reformat unrelated code.
Wait for my approval before editing.
```

Check that the plan accounts for every known caller and explains any behavior differences that must remain. Ask the agent to separate independent cleanup from the required refactor.

Prompts guide the agent but don't enforce access restrictions. Review the session's [permissions and tool approvals](/docs/agents/run/approvals.md) before implementation.

## 4. Refactor in reviewable steps

After approving the plan, start with one small step:

```prompt
Implement the first approved step and run its targeted tests.
Preserve the baseline assertions and public behavior. Stop after this
step so I can review the diff before you update the remaining callers.
Report any unexpected behavior or required plan change.
```

Inspect the diff and test output. Continue with the next step only after the current one is understood and validated.

Keep the tests that exercise behavior through existing public entry points. New unit tests for a helper are useful, but they don't replace evidence that the original callers still work.

If tests depend on private implementation details that the refactor removes, review any necessary test updates separately. Preserve the observable expectations instead of rewriting the tests to match the new code automatically.

## 5. Check callers and compatibility

After the planned edits are complete:

1. Inspect all references to the changed symbols. Check imports, exports, configuration references, and callers outside the edited files.
1. Run the targeted tests and the related suite, including tests for every affected caller.
1. Run the project's applicable build, type check, and lint checks.
1. Exercise representative valid and invalid inputs through the original entry points.
1. Compare the results with the recorded baseline, including errors and side effects.

Source references and passing tests don't prove that external consumers are compatible. If a published API, package export, or persisted format is affected, verify it against the relevant consumer contracts. Defer the change if you can't establish the required compatibility.

Treat unexecuted checks as unverified. Ask the agent to report environment failures or missing test resources rather than claiming completion.

## 6. Review and keep the refactor

[Review the complete diff](/docs/agents/run/review-code-edits.md) against the goal and preserved behavior. Check for unrelated formatting, dependency changes, weakened tests, or accidental changes to defaults and error handling.

Ask for a concise summary of the structural change, callers checked, tests run, and remaining uncertainty. Verify that summary against the diff and command output before committing the intended changes.

If behavior changed unexpectedly, stop and investigate. Use your version-control baseline or the [agent recovery workflow](/docs/agents/guides/get-agent-back-on-track.md) to recover unwanted edits without discarding unrelated work.

You finish with a smaller or clearer implementation and evidence that the behavior you set out to preserve still holds.

## Next steps

* [Add new behavior as a separate feature](/docs/agents/guides/add-a-feature.md).
* [Set up a test-driven development workflow](/docs/agents/guides/test-driven-development-guide.md).
