---
ContentId: 8fbfb21b-d9ec-439a-8f3e-e96d5ab7ffad
DateApproved: 9/22/2026
MetaDescription: Add a feature to an existing project with an agent in {% data variables.product.prodname_vscode_shortname %}, from a reviewed plan to a tested change.
MetaSocialImage: ../images/agents-overview/hero-vscode-dev-agents-dark.png
Keywords:
- agents
- feature development
- planning
- existing projects
---
# Add a feature to an existing project

Adding a feature means more than generating new code. The change needs to fit the project's structure, preserve existing behavior, and have evidence that it works.

In this guide, you use an agent to research a small feature in your own repository, review its plan, implement the change, and prepare the verified result for a pull request. You don't need to create custom agents or instructions first.

The example adds an optional title filter to a paginated issues API. Adapt the prompts and acceptance criteria to a feature in your project. No particular framework or sample project is required.

## Prerequisites

* [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md).
* Open a trusted repository with a working development environment and existing tests.
* Choose a small feature with an observable result. If you're unfamiliar with the implementation, [explore the codebase](/docs/agents/guides/explore-a-codebase.md) first.
* Preserve unrelated work and create a [development branch](/docs/sourcecontrol/branches-worktrees.md) using your team's normal workflow.

For this guide, work in the current folder on that branch. Review the [recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline) before letting an agent work in an existing project.

## 1. Define the feature

Describe what should change, what must stay the same, and how you will check the result. Avoid requests such as "add search" that leave important behavior for the agent to invent.

For the example API, the feature brief is:

| Requirement | Expected behavior |
|---|---|
| Optional filter | `GET /issues?q=<text>` returns issues whose titles contain the text, ignoring case. |
| Empty filter | A missing, empty, or whitespace-only `q` preserves the unfiltered result. Leading and trailing whitespace is trimmed. |
| Pagination | Filtering happens before pagination. The existing `total` field counts all matching issues, not only the current page. |
| No matches | Return the existing response shape with an empty issues list and `total` equal to zero. |
| Compatibility | Keep the existing ordering, page numbering, page size, validation, and response fields. |
| Scope | Reuse the current API and test framework. Don't add a UI, dependencies, or a new search service. |

Check that these assumptions match your API before using the prompts. For example, if your API doesn't expose a `total` field, decide how clients should determine the result count rather than adding a field unintentionally.

## 2. Establish the baseline

1. Open the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and start a new chat.
1. Select the **{% data variables.product.prodname_copilot_short %}** session target and the **Agent** role. Keep **Manual permissions** selected.
1. Ask the agent to inspect the implementation and testing conventions without editing:

    ```prompt
    Find the issues-list endpoint, its pagination logic, and related
    tests. Identify an existing optional query parameter to use as a
    pattern, if one exists. Report the relevant files and commands for
    running the targeted tests and related suite.
    Do not edit files, install dependencies, or run commands yet.
    ```

1. Review the identified files and commands. Ask the agent to run the existing tests for the affected area, and inspect the actual output.

Resolve failures that prevent you from validating the feature before you continue. Record unrelated baseline failures separately so that they aren't confused with regressions from the change.

## 3. Review a plan before editing

Provide the agreed feature brief and ask for a plan:

```prompt
Plan the optional title filter described in the feature brief.
Identify the implementation and test files to change, existing helpers
to reuse, and any API documentation that needs updating.

Include tests for missing, empty, and whitespace-only filters, trimmed
input, mixed-case matches, no matches, and filtering before pagination.
Preserve the existing response shape, ordering, and pagination behavior.

Identify unresolved decisions and compatibility risks. Do not edit files.
Wait for my approval before implementing.
```

You can also use the dedicated [planning workflow](/docs/agents/run/planning.md) to create and refine the plan. An instruction to wait for approval doesn't change the session's tool permissions.

Review whether the plan follows the code you inspected. It should name actual files, account for existing clients, and explain how tests demonstrate the acceptance criteria. Resolve ambiguities before approving it.

For example, check that pagination tests use enough matching records to span multiple pages. A test with only one matching record might not detect filtering that happens after pagination.

## 4. Implement the approved change

Ask the agent to implement only the agreed scope:

```prompt
Implement the approved plan using this project's existing patterns.
Add tests for the agreed acceptance criteria and update the API
documentation. Do not add dependencies or refactor unrelated code.

Run the targeted tests, then the related suite. Report the commands,
pass and fail counts, and any checks that were skipped or could not run.
If the plan needs to change, explain why and wait for my decision.
```

Review tool requests and the changing files as the agent works. If it discovers a shared dependency or proposes a broader API change, revisit the plan rather than letting the scope expand implicitly.

If the agent changes unrelated behavior, send a focused correction. For repeated failures or unwanted changes, use the [agent recovery guide](/docs/agents/guides/get-agent-back-on-track.md).

## 5. Verify the feature and existing behavior

A completion message isn't evidence that the feature works. Inspect the tests and their output, then exercise the behavior yourself.

For the example API:

1. Use known test data with mixed-case titles, nonmatching titles, and enough matches for more than one page.
1. Compare a request without `q` with the baseline. Existing clients should receive the same behavior.
1. Check empty, whitespace-only, and padded filter values against the agreed rules.
1. Request each page of the filtered results. Verify the expected issue IDs, ordering, total count, and absence of gaps or duplicates.
1. Check a filter with no matches and confirm the response shape is unchanged.
1. Repeat the existing invalid-page checks to confirm that the feature didn't weaken validation.

Run the project's required build, type check, or lint checks as appropriate. If a check can't run, record the reason and arrange verification in the required environment before treating the feature as complete.

When a test fails, compare the result with the feature brief before changing either the test or implementation. Don't accept weakened assertions or skipped tests merely to obtain a passing result.

## 6. Prepare the change for review

[Review the complete diff](/docs/agents/run/review-code-edits.md), including tests, documentation, and untracked files. Confirm that every change supports the approved feature and that no unrelated work is included.

Ask the agent for a review summary:

```prompt
Summarize this change for a pull request. Explain the user-visible
behavior, how compatibility is preserved, and the validation performed.
List checks that were not run and any remaining limitations. Base the
summary on the actual diff and command output, not only the plan.
Do not commit or publish anything.
```

Review the summary, commit the intended changes, and open a pull request through your team's normal process. Address review feedback with the same scope and acceptance criteria, then rerun the affected checks.

You now have a feature whose implementation, tests, and review summary can be compared with an explicit set of requirements.

## Next steps

* [Adapt agents to your project with instructions and skills](/docs/agents/guides/customize-copilot-guide.md).
* [Run independent tasks in separate worktrees](/docs/agents/guides/delegate-two-tasks.md).
