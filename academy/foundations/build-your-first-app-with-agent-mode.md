---
ContentId: 9a8f0a40-f4f9-4d2b-b7b2-c1d54ef4c006
DateApproved: 03/30/2026
MetaDescription: Build a URL shortener with agent mode in VS Code using FastAPI, sqlite3, planning, autopilot, review tools, and forking.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Build your first app with agent mode

<!-- TODO update with the actual video id once published on youtube -->
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="Build your first app with agent mode"></iframe>

This guide is a capstone walkthrough that ties together everything covered in the series. You will build a URL shortener from scratch using agent-first development, FastAPI for the API, Python `sqlite3` for the database, a simple HTML frontend, and the base62 encoder from earlier in the series.

You will see the model picker, Plan mode, Autopilot, the files changed view, session forking, and the Agent Debug Logs all in action together.

## Choosing the right model

For a project spanning multiple files, set thinking effort to High. The model will reason more deeply about how the pieces fit together before writing code.

## Planning with Plan mode

For a project with several moving parts, Plan mode is the right starting point. It forces the agent to produce a structured outline and surface design questions before code is written.

Use a detailed prompt such as the following.

```prompt
Build a URL shortener with FastAPI, Python's built-in sqlite3, and a simple HTML frontend served by FastAPI StaticFiles. Use uv for project management with Python 3.13. Use the existing base62 encoder in main.py to generate short codes from the database row ID. The API needs two endpoints. POST /shorten accepts a JSON body with a url field and returns the short code. GET /{code} redirects to the original URL. The frontend is a single index.html with a form to submit URLs and a section that displays the shortened link. Keep it minimal.
```

The Plan agent typically returns phases for setup, extracting the encoder, building the database layer, wiring endpoints, creating the frontend, and verification.

If the plan surfaces design questions, answer them directly before implementation starts.

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

Autopilot shines during multi-step setup because the agent can install dependencies, create files, start services, and verify results without pausing for each approval.

## Checking the context window

Open the context window indicator mid-session and compare it to earlier single-file sessions.

* System overhead stays roughly constant.
* User context grows as planning messages, tool results, and server logs accumulate.

If the budget fills up, run `/compact` or start a fresh session and reference the previous one.

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

This keeps the feature branch and the test branch separate while sharing the same starting checkpoint.

## Reading the Agent Debug Logs

After Autopilot runs, open the Agent Debug Logs.

* Logs view shows the sequence of events, customization loading, LLM requests, tool calls, terminal commands, parallel file creation, and verification.
* Summary view shows totals for model turns, tool calls, tokens, and events.
* Agent Flow Chart visualizes the structure of the session.

With two sessions after forking, compare the logs side by side.

## What you built

You built a working URL shortener through agent-first development.

* Model picker with high thinking effort for a multi-file project.
* Plan mode to outline architecture before coding.
* Autopilot to build the application without interruptions.
* Agent Debug Logs to inspect what happened.
* Context window indicator to monitor budget.
* Files changed view to review and accept edits.
* Follow-up prompts to extend the app.
* Fork to branch into a test suite without losing feature work.

## Your challenge

Clone the repository for this project, open it in VS Code with GitHub Copilot, and extend the URL shortener.

Ideas:

* Custom slugs so users can choose their own short codes.
* Expiration dates that disable old links automatically.
* An analytics page that shows the top URLs by click count.

Use Plan mode to scope the work, Agent mode to build it, and Agent Debug Logs to understand what the agent did.

## Learn more

* [Agents tutorial in VS Code](https://code.visualstudio.com/docs/copilot/agents/agents-tutorial)
* [Plan mode](https://docs.github.com/copilot/how-tos/chat-with-copilot/chat-in-ide#plan-mode)
* [Reviewing AI-generated code edits in VS Code](https://code.visualstudio.com/docs/copilot/chat/review-code-edits)
* [Checkpoints and editing requests in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-checkpoints)
* [Agent Logs and Chat Debug view](https://code.visualstudio.com/docs/copilot/chat/chat-debug-view)
* [FastAPI](https://fastapi.tiangolo.com/)
* [Python sqlite3](https://docs.python.org/3/library/sqlite3.html)
* [Model Context Protocol](https://modelcontextprotocol.io/introduction)
* [Custom instructions and agents for GitHub Copilot](https://code.visualstudio.com/docs/copilot/customization/overview)