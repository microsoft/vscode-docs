---
ContentId: b850af5c-5578-4981-a810-62050e0abfb8
DateApproved: 11/11/2026
MetaDescription: Fix an API bug with an agent in {% data variables.product.prodname_vscode_shortname %}, add regression tests, and verify the result.
Keywords:
- ai
- agents
- debugging
- testing
- api
- tutorial
---
# Tutorial: Fix an API bug with an agent

Most software work starts with existing code and a bug report, not an empty project. In this tutorial, you use an AI agent in {% data variables.product.prodname_vscode %} to investigate why a paginated API skips records, add a regression test that proves the bug, implement a focused fix, and verify the result.

You work through five checkpoints: reproduce the symptom, review the diagnosis, observe a failing test, verify the fix, and review the diff. The walkthrough uses the **{% data variables.product.prodname_copilot_short %}** harness in the {% data variables.copilot.chat_view %}.

If you already have a bug to investigate, [apply the workflow to your own project](#apply-the-workflow-to-your-own-project) instead of setting up the sample.

> [!NOTE]
> The sample API fits in one file and uses only built-in Node.js modules, so you can focus on the debugging workflow. The same process applies when request handling, application logic, and tests are spread across a larger project.

## Prerequisites

To complete this tutorial, you need:

* [Download and install {% data variables.product.prodname_vscode %}](/download).
* [Enable AI features in {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/overview.md#enable-ai-features).
* Install [Node.js 22 or later](https://nodejs.org/en/download).
* Install [Git](https://git-scm.com/downloads) and configure it for commits.

## Set up the sample API

Start with an API that has working tests but contains a pagination bug.

1. Create a folder named `pagination-bug` and initialize a Git repository in it:

    ```bash
    mkdir pagination-bug
    cd pagination-bug
    git init
    ```

1. In {% data variables.product.prodname_vscode_shortname %}, select **File** > **Open Folder**, and then open the `pagination-bug` folder.

1. Create a file named `issues-api.js` and paste in the following code:

    <details>
    <summary>Expand and copy the sample API code</summary>

    ```javascript
    const assert = require("node:assert/strict");
    const http = require("node:http");
    const { test } = require("node:test");

    const PORT = 3000;
    const PAGE_SIZE = 10;
    const issues = Array.from({ length: 35 }, (_, index) => ({
      id: index + 1,
      title: `Issue ${index + 1}`,
    }));

    function getIssues(requestUrl) {
      const url = new URL(requestUrl, `http://localhost:${PORT}`);
      const pageParameter = url.searchParams.get("page");
      const page = pageParameter === null ? 0 : Number(pageParameter);

      if (
        pageParameter !== null &&
        (!Number.isInteger(page) || page < 1)
      ) {
        return {
          status: 400,
          body: { error: "page must be a positive integer" },
        };
      }

      const start = page * PAGE_SIZE;
      const requestedPage = pageParameter === null ? 1 : page;

      return {
        status: 200,
        body: {
          page: requestedPage,
          pageSize: PAGE_SIZE,
          total: issues.length,
          issues: issues.slice(start, start + PAGE_SIZE),
        },
      };
    }

    function createServer() {
      return http.createServer((request, response) => {
        const requestUrl = request.url ?? "/";
        const url = new URL(requestUrl, `http://localhost:${PORT}`);

        let result;
        if (request.method === "GET" && url.pathname === "/issues") {
          result = getIssues(requestUrl);
        } else {
          result = {
            status: 404,
            body: { error: "not found" },
          };
        }

        response.writeHead(result.status, {
          "Content-Type": "application/json",
        });
        response.end(JSON.stringify(result.body, null, 2));
      });
    }

    const command = process.argv[2];

    if (command === "serve") {
      createServer().listen(PORT, () => {
        console.log(`Issues API listening on http://localhost:${PORT}`);
      });
    } else if (command === "test") {
      test("default request returns the first page", () => {
        const result = getIssues("/issues");

        assert.equal(result.status, 200);
        assert.deepEqual(
          result.body.issues.map((issue) => issue.id),
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        );
      });

      test("page numbers must be positive integers", () => {
        assert.equal(getIssues("/issues?page=0").status, 400);
      });
    } else {
      console.error("Usage: node issues-api.js <serve|test>");
      process.exitCode = 1;
    }
    ```

    </details>

1. Run the existing tests:

    ```bash
    node issues-api.js test
    ```

    Both tests pass. A passing test suite is useful evidence, but it doesn't prove that untested behavior is correct.

    These tests call `getIssues` directly. The HTTP requests in the next section also exercise the server's request handling.

1. Commit the starting point so that you can distinguish the agent's changes from the sample code:

    ```bash
    git add issues-api.js
    git commit -m "Add pagination bug sample"
    ```

## Reproduce the bug

The bug report says:

> Some issues disappear when paging through results. `GET /issues` returns issues 1-10, but `GET /issues?page=2` returns issues 21-30. Page two should return issues 11-20. Omitting `page` should behave the same as requesting `page=1`.

Verify the report before asking the agent to change the code.

1. Open the terminal (`kb(workbench.action.terminal.toggleTerminal)`) and start the API:

    ```bash
    node issues-api.js serve
    ```

1. Open another terminal and request the default page:

    ```bash
    node -e "fetch('http://localhost:3000/issues').then(r => r.json()).then(d => console.log(JSON.stringify(d.issues.map(i => i.id))))"
    ```

    The response contains the expected IDs:

    ```text
    [1,2,3,4,5,6,7,8,9,10]
    ```

1. Request page two:

    ```bash
    node -e "fetch('http://localhost:3000/issues?page=2').then(r => r.json()).then(d => console.log(JSON.stringify(d.issues.map(i => i.id))))"
    ```

    The response confirms the reported gap:

    ```text
    [21,22,23,24,25,26,27,28,29,30]
    ```

1. In the terminal that runs the API, press `kbstyle(Ctrl+C)` to stop it.

You now have a reproducible symptom and an expected result. Providing both helps the agent investigate the actual defect instead of guessing what "pagination is broken" means.

## Ask the agent to investigate

Start with investigation instead of immediately asking for a fix. This gives you a chance to review the agent's understanding before it edits the project.

1. Open the {% data variables.copilot.chat_view %} (`kb(workbench.action.chat.open)`), start a new chat, and select **{% data variables.product.prodname_copilot_short %}** as the **Session Target** and **Agent** from the agent picker.

1. Enter the following prompt:

    ```prompt
    Investigate this pagination bug. Do not edit files yet.

    GET /issues returns IDs 1-10, but GET /issues?page=2 returns
    IDs 21-30. The API uses one-based page numbers, so page 2
    should return IDs 11-20. Omitting page should match page=1.

    Run the existing tests, trace the request through the relevant
    code, explain the cause with file references, and propose a
    regression test.
    ```

1. Review the explanation before continuing. A convincing diagnosis should:

    * Account for both observed responses.
    * Connect the API's one-based page numbers to the zero-based array offset.
    * Identify why the existing tests pass despite the defect.
    * Avoid proposing unrelated changes to the response format or sample data.

If the explanation doesn't account for the observed IDs, provide the command output and ask the agent to investigate further.

## Add a failing regression test

A regression test proves that the test suite can detect the reported bug. It also gives the agent a concrete success condition for the fix.

1. Ask the agent to add the test without changing the API implementation:

    ```prompt
    Add regression coverage in the existing test block, but do not
    change getIssues or other production code yet.

    Verify that:
    - /issues?page=1 returns the same issue IDs as /issues
    - /issues?page=2 returns IDs 11-20

    Run the tests and confirm that the new coverage fails because the
    returned IDs are wrong, not because of a test setup error.
    ```

1. Inspect the changed test code and the test output. The new assertions should fail with different expected and actual issue IDs. A test that only checks the HTTP status doesn't reproduce the reported problem.

    <!-- TODO: Add a screenshot showing the regression tests failing with the expected and actual issue IDs. -->

If the agent also changes the implementation, [restore the previous checkpoint](/docs/agents/run/review-code-edits.md#restore-a-checkpoint) and repeat the request with a narrower scope.

## Implement and test the fix

After the failing test establishes the expected behavior, ask the agent to correct the implementation.

1. Enter the following prompt:

    ```prompt
    Fix the root cause of the pagination bug with the smallest
    production-code change. Keep the public API one-based, preserve
    the existing response shape and validation, and do not add
    dependencies. Run the complete test suite after the change.
    ```

1. Confirm that the regression coverage and the original tests pass.

1. Review how the implementation handles page numbers. A correct solution uses one-based values at the API boundary and converts them to a zero-based offset when slicing the array. Equivalent implementations are valid if they preserve the same API contract and pass the tests.

If a test still fails, give the agent the complete failure output and ask it to explain the remaining mismatch before making another change.

## Verify page boundaries

The regression test covers the reported case. Add adjacent and boundary cases so that the suite also detects gaps, duplicates, or a lost final page.

1. Ask the agent to extend the tests:

    ```prompt
    Add pagination boundary tests without changing the implementation:
    - Pages 1 through 5 together return IDs 1 through 35 in order,
      with no missing or duplicate IDs.
    - Page 4 returns IDs 31-35 and page 5 is empty.
    - Omitting page still matches page=1.
    - Page values 0, -1, and 1.5 still return status 400.

    Keep expected values independent of getIssues. Run the complete
    test suite and report the command and results.
    ```

1. Review the assertions and confirm that all tests pass.

1. Start the API again to verify the fixed behavior through HTTP:

    ```bash
    node issues-api.js serve
    ```

1. In another terminal, request all five pages:

    ```bash
    node -e "(async () => { for (const p of [1, 2, 3, 4, 5]) { const d = await fetch('http://localhost:3000/issues?page=' + p).then(r => r.json()); console.log('page ' + p + ': ' + JSON.stringify(d.issues.map(i => i.id))); } })()"
    ```

    Verify the following output:

    ```text
    page 1: [1,2,3,4,5,6,7,8,9,10]
    page 2: [11,12,13,14,15,16,17,18,19,20]
    page 3: [21,22,23,24,25,26,27,28,29,30]
    page 4: [31,32,33,34,35]
    page 5: []
    ```

    Together, the responses contain IDs 1-35 exactly once, the final partial page is preserved, and a page beyond the data is empty.

1. Stop the API by pressing `kbstyle(Ctrl+C)`.

## Review the change

Before you commit an agent's work, inspect both the code and the evidence that supports it.

1. Open the **Source Control** view and select `issues-api.js` to inspect the diff.

1. Check that:

    * The regression test represents the documented API contract rather than the implementation details.
    * You observed the regression test fail before the fix and pass afterward.
    * The production change addresses the offset calculation without changing the response shape, validation, or sample data.
    * The agent didn't add dependencies or unrelated refactoring.
    * The complete test suite and manual boundary checks pass.

    <!-- TODO: Add a screenshot showing the focused production-code and regression-test changes in the Source Control diff. -->

1. If the diff contains unrelated changes, ask the agent to remove only its unrelated edits and rerun the tests.

1. Commit the verified fix:

    ```bash
    git add issues-api.js
    git commit -m "Fix issue pagination"
    ```

You fixed a reproducible API defect by establishing the expected behavior before changing production code. This workflow gives you evidence for the diagnosis, protects the behavior with a regression test, and keeps the final change focused and reviewable.

## Apply the workflow to your own project

Use the same checkpoints with your existing codebase:

1. Save your existing work and run the relevant tests as a baseline. Identify the project's test command and conventions before asking the agent to add tests.
1. Provide the smallest reproduction you have: the command or action, relevant input, actual result, and expected behavior. Attach failure output and relevant source or test files as [chat context](/docs/chat/chat-overview.md#add-context-to-your-prompts).
1. Ask the agent to investigate without editing files. If the symptom depends on runtime state, use the [debugger](/docs/debugtest/debugging.md) to inspect the failing path and share relevant stack traces or variable values.
1. Add a regression test using the existing framework. Confirm that it fails because of the reported behavior before changing implementation code.
1. Request a focused fix, run the targeted tests and related suite, and repeat the original reproduction. Review the diff before committing.

Use this prompt to start the investigation. Replace the placeholders with your reproduction and the evidence you collected. Remove credentials and other sensitive values from any output you share.

```prompt
Investigate this bug in the attached code. Do not edit files yet.

Reproduction: <command or minimal steps, including relevant input>
Expected result: <the behavior required by the contract>
Actual result: <observed output or error>
Debugger findings: <relevant stack trace or variable values, if available>
Test setup: <framework, runtime or interpreter, and working directory>
Test command: <the project's command for the relevant tests>

Run the reproduction and relevant existing tests if the environment is
available. Explain the cause with file references and propose a regression
test that fails on the reported behavior. Identify anything you couldn't
verify, and stop for review before changing code.
```

If you can't reproduce the issue or the expected behavior is unclear, resolve that uncertainty before asking the agent to implement a fix.

## Next steps

* Continue with the fixed API and [add an optional title filter](/docs/agents/guides/add-a-feature.md). Use the same repository to practice planning and testing a feature while preserving the pagination behavior you verified.
* Explore more ways to [add and validate tests with AI](/docs/agents/guides/test-code-with-ai.md).
* Review how to [inspect, revise, and revert agent changes](/docs/agents/run/review-code-edits.md).
