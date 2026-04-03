---
ContentId: 9a8f0a40-f4f9-4d2b-b7b2-c1d54ef4c006
DateApproved: 03/30/2026
MetaDescription: Build a URL shortener with agent mode in VS Code using FastAPI, sqlite3, planning, autopilot, review tools, and forking.
MetaSocialImage: ../images/shared/agent-first-development-social.png
---
# Build your first app with agent mode

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/hmfldW7dmgw?si=v9OJQDJZPMkGf-jt" title="Video for building your first app with agent mode." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This guide is a capstone walkthrough that ties together everything covered in the series. You will build a URL shortener from scratch using agent-first development, FastAPI for the API, Python `sqlite3` for the database, a simple HTML frontend, and the base62 encoder from earlier in the series.

You will see the model picker, the plan agent, Autopilot, the files changed view, session forking, and the Agent Debug Logs all in action together.

## Choosing the right model

For a project spanning multiple files - database schema, API routing, frontend, integration between them - set thinking effort to High. The model will reason more deeply about how the pieces fit together before writing code.

Open a fresh chat session, click the model picker, and set thinking effort to High.

## Planning with the Plan agent

For a project with several moving parts, use the Plan agent to start. It forces the agent to produce a structured outline and surface design questions before code is written.

Switch to the Plan agent, and use a detailed prompt such as the following:

```prompt
Build a URL shortener with FastAPI, Python's built-in sqlite3, and a simple HTML frontend served by FastAPI StaticFiles. Use uv for project management with Python 3.13. Use the existing base62 encoder in main.py to generate short codes from the database row ID. The API needs two endpoints. POST /shorten accepts a JSON body with a url field and returns the short code. GET /{code} redirects to the original URL. The frontend is a single index.html with a form to submit URLs and a section that displays the shortened link. Keep it minimal.
```

This prompt names the framework, the database approach, the exact endpoints, the project management tool, and references existing code. Specific prompts give the plan agent clear boundaries.

### Reviewing the plan

Expect the plan to break the work into phases such as project setup with `uv`, extracting the base62 encoder into its own module, building the `sqlite3` database layer, wiring up the API endpoints, creating the HTML frontend, and verification.

It might also surface design questions in a further considerations section, such as whether to preserve the CLI, whether duplicate URLs should get the same short code, and whether to validate URLs before shortening. Resolve those questions directly before implementation starts.

Answer the questions directly, like:

```prompt
Drop the CLI, we don't need it anymore. New short code each time and yes add URL validation.
```

Three clear answers, no ambiguity. Design questions resolved before any code is written.

## Handing off to Agent mode

After reviewing the plan, you can choose one of three options.

| Option | What it does |
| --- | --- |
| Start Implementation | Starts the build with default approvals. |
| Start with Autopilot | Starts the build with Autopilot. |
| Open in Editor | Saves the plan as a file for manual reference. |

For a well-scoped plan that you already reviewed, Autopilot is often the right choice.

## Watching Autopilot work

Even in Autopilot, every action shows up as a tool call in the chat panel.

A typical build sequence looks like this.

1. Create a todo list to track progress.
1. Run `uv add fastapi uvicorn[standard]` to install dependencies.
1. Rename `main.py` to `base62.py` and keep only encode and decode logic.
1. Create `database.py`, `app.py`, `static/index.html`, and `.gitignore` in parallel.
1. Start the server in the background.
1. Run a verification script that tests the endpoints end to end.

Autopilot shines during multi-step setup because the agent can install dependencies, create files, start services, and verify results without pausing for each approval. That verification step is important. A strong agent run does not stop at writing files. It verifies the app end to end before marking the task complete.

## Checking the context window

Open the context window indicator mid-session and compare it to earlier single-file sessions.

* System (tool definitions and instructions) stays roughly constant.
* User context grows as planning messages, tool results, and server logs accumulate.

If the budget fills up, run `/compact` to summarize the conversation history, or start a fresh session and reference the previous one for context.

## Reviewing the files changed

After the build completes, the files changed bar shows every file the agent created or modified.

Review each file carefully.

* `base62.py`, encode and decode extracted cleanly from the original file.
* `app.py`, FastAPI app with `POST /shorten`, `GET /{code}`, and `GET /`.
* `database.py`, `sqlite3` helpers for storing and looking up URLs.
* `static/index.html`, form, results section, and JavaScript.

Use the arrow controls to move through edits. Undo individual changes when needed, or select **Keep All** when everything looks correct.

## Iterating on a working app

Once the core app works, iterate with a targeted follow-up prompt.

```prompt
Add a lookup section to the frontend and a GET /lookup/{code} endpoint that returns the original URL as JSON instead of redirecting. The frontend should have a second form where I paste a short code and see the original URL displayed below it.
```

The agent should update only the relevant files instead of rebuilding the entire project.

## Forking for a different direction

After adding the lookup feature, fork the session before exploring a test suite.

Use a prompt such as this in the forked session.

```prompt
Add a test suite using pytest. Test the base62 encode/decode functions and the API endpoints including /lookup/{code}, using FastAPI TestClient. Use uv to add pytest and httpx as dev dependencies.
```

The original session is untouched in the Agent Sessions sidebar. Two branches: one for features, one for tests.

In practice, this is a strong use of forking. It separates concerns: feature work in one branch of the conversation and tests in another, each starting from the same known-good checkpoint.

## Reading the Agent Debug Logs

After Autopilot runs, open the Agent Debug Logs.

* Logs view shows the sequence of events, customization loading, LLM requests, tool calls, terminal commands, parallel file creation, and verification.
* Summary view shows totals for model turns, tool calls, tokens, and events.
* Agent Flow Chart visualizes the structure of the session.

With two sessions after forking, compare the logs side by side.

You can also attach a debug snapshot and ask a direct question such as `#debugEventsSnapshot How many tool calls did this session make?`

## What you built

You built a working URL shortener through agent-first development.

* Model picker with high thinking effort for a multi-file project.
* Plan agent to outline architecture before coding.
* Autopilot to build the application without interruptions.
* Agent Debug Logs to inspect what happened.
* Context window indicator to monitor budget.
* Files changed view to review and accept edits.
* Follow-up prompts to extend the app.
* Fork to branch into a test suite without losing feature work.

## Your challenge

Create the URL shortener we built in this series, leverage the prompts we've used (or come up with your own!) and then extend it.

Ideas:

* Custom slugs so users can choose their own short codes.
* Expiration dates that disable old links automatically.
* An analytics page that shows the top URLs by click count.

Use the plan agent to scope the work, Agent mode to build it, and check your Agent Debug Logs to understand what the agent did.

When you finish, open the context window indicator and review the session stats so you can see how the work affected your context budget.

That's the foundation of agent-first development. Harness, model, context, tools, prompt. Five things, working together. The more you practice, the better your results get.

Watch for future sections covering MCP, custom instructions and skills, and more advanced agent patterns. Happy coding!

## Learn more

* [Agents tutorial in VS Code](https://code.visualstudio.com/docs/copilot/agents/agents-tutorial)
* [Planning with agents in VS Code](https://code.visualstudio.com/docs/copilot/agents/planning)
* [Reviewing AI-generated code edits in VS Code](https://code.visualstudio.com/docs/copilot/chat/review-code-edits)
* [Checkpoints and editing requests in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-checkpoints)
* [Agent Logs and Chat Debug view](https://code.visualstudio.com/docs/copilot/chat/chat-debug-view)
* [FastAPI](https://fastapi.tiangolo.com/)
* [Python sqlite3](https://docs.python.org/3/library/sqlite3.html)
* [Model Context Protocol](https://modelcontextprotocol.io/introduction)
* [Custom instructions and agents for GitHub Copilot](https://code.visualstudio.com/docs/copilot/customization/overview)