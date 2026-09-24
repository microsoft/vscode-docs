---
ContentId: 87225324-0ae8-4dd8-bce1-bb38ec4f29b1
DateApproved: 9/22/2026
MetaDescription: Explore a codebase with an agent in {% data variables.product.prodname_vscode_shortname %}, trace a behavior, and verify explanations against source code.
MetaSocialImage: ../images/agents-overview/hero-vscode-dev-agents-dark.png
Keywords:
- agents
- codebase
- onboarding
- code understanding
---
# Explore a codebase with an agent

Before you change an unfamiliar project, you need to know where its behavior is implemented and how to verify it. An agent can help you find entry points, follow calls across files, and locate relevant tests. Treat its explanation as a starting point to check against the code, not as an authoritative description of the project.

In this guide, you investigate one behavior in an existing repository without editing it. You finish with a map of the relevant code, supporting source references, and a list of questions to resolve before making a change.

## Prerequisites

* [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md).
* Open the repository you want to explore in {% data variables.product.prodname_vscode_shortname %}.
* Choose a question about the project, such as how a request is authorized, how a form saves data, or where an API response is assembled.

Review the [security guidance for working with agents](/docs/agents/run/security.md) before you trust or run unfamiliar code. You don't need to install dependencies or run the application to begin reading its source.

## 1. Define the question

Start with one behavior rather than asking the agent to explain the entire repository. A bounded question makes it easier to check whether the explanation is complete.

1. Open the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and start a new chat.
1. Select the **{% data variables.product.prodname_copilot_short %}** session target and the **Agent** role. Keep **Manual permissions** selected.
1. Describe the behavior you want to understand. Include an entry point if you know one, such as a route, command, or UI element.

For example, adapt this prompt to an endpoint in your project:

```prompt
Explain how a request to GET /issues becomes a paginated response in
this repository. Start with the route registration and follow the
implementation to the returned response.

Do not edit files, install dependencies, start services, or run project
code. Cite the files and symbols that support your explanation.
Separate facts you verified from assumptions and open questions.
```

> [!IMPORTANT]
> A prompt that says not to edit or run code is an instruction, not a permission boundary. Review the session's [permissions](/docs/agents/run/approvals.md) and tool activity. Don't assume that selecting manual permissions requires approval for every file edit.

## 2. Find the relevant code

Ask the agent for a small map of the parts that answer your question:

```prompt
Identify the entry point, implementation modules, configuration, and
tests relevant to this request. Explain each file's role and why it
belongs in the investigation. Do not summarize unrelated directories
or read secret values.
```

Open the referenced files as you read the answer. Check that:

* The route or other entry point is registered in the application you are investigating.
* The cited functions exist in the current checkout.
* The implementation is active code, not an unused example, generated copy, or test fixture.
* Any configuration claim names the configuration source without exposing credentials.

If the repository contains multiple applications or implementations, identify which one you mean. Add the relevant files as [chat context](/docs/chat/copilot-chat-context.md) rather than asking the agent to search the entire repository again.

## 3. Trace one path through the application

Follow a concrete input from entry point to result. Replace the example values with a request that your application supports:

```prompt
Trace GET /issues?page=2 through the files you identified. Show where
the page parameter is parsed and validated, how records are selected,
and how the response is constructed.

For each step, cite the relevant symbol and explain the input and
output. Include error paths and any database or external-service
boundary. If a dependency's implementation is unavailable, identify
what you cannot verify. Do not edit files or execute project code.
```

Check the connections, not only the individual functions. Verify that callers pass the values described, that the return value reaches the response, and that error handling follows the path the agent claims.

Ask focused follow-ups when the explanation skips a step:

```prompt
You identified the pagination helper, but have not shown how the route
calls it. Find that call site and verify which default page value it
receives. If you cannot find a connection, revise the explanation.
```

## 4. Check the explanation against tests

Tests can provide examples of intended behavior and reveal cases that the implementation summary missed:

```prompt
Find tests for the request path we traced. List the inputs and expected
results they check, with source references. Identify boundary cases
that are not covered. Do not claim that the tests pass unless they
have been run in this environment.
```

Compare the assertions with the explanation and project documentation. A test name alone isn't evidence that the test checks the behavior.

If you need runtime confirmation, first review the project's setup instructions and proposed test command. Only run code from a repository you trust, using appropriate local test resources. Record the actual result and any environment limitations. Don't treat an unavailable service or an unexecuted test as a passing check.

## 5. Record what you verified

Ask for a concise summary you can use when planning your first change:

```prompt
Summarize what we verified about this behavior. Include the entry point,
the implementation path, relevant tests and commands, and unresolved
questions. Link each important claim to its source. Distinguish tests
we inspected from tests we ran. Do not create or edit files.
```

Review the summary yourself. You should be able to locate the implementation, explain one successful and one error or boundary path, and identify how you would validate a change. If an important connection remains uncertain, resolve it with a maintainer or further investigation before editing.

Keep the verified summary with your task. Promote stable project knowledge to shared documentation only after review, rather than saving an unchecked agent-generated architecture description.

## Next steps

* [Add a feature to an existing project](/docs/agents/guides/add-a-feature.md).
* [Refactor code without changing behavior](/docs/agents/guides/refactor-safely.md).
