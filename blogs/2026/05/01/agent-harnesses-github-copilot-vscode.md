---
Order: 130
TOCTitle: Coding Harness
PageTitle: "The Coding Harness Behind GitHub Copilot in VS Code"
MetaDescription: Learn why the coding harness around GitHub Copilot in VS Code matters as models, tools, agents, and providers evolve.
MetaSocialImage: agent-harnesses-social.webp
Date: 2026-05-07
Author: VS Code Team
---

# The Coding Harness Behind GitHub Copilot in VS Code

May 7, 2026 by [Julia Kasper](https://github.com/jukasper)

With each new model release, the same conversation is reignited. Which model is the smartest? Which one is fastest? Which one should we use? Those are useful questions, but for a product like Visual Studio Code the model is only one part of the agentic coding experience. What developers actually interact with is the coding harness: the layer that assembles context, exposes tools, runs the agent loop, interprets tool calls, and turns a model's output into something useful inside the editor. In this post, we'll look at what that harness does, why it matters, and how we evaluate it as models and developer workflows evolve.

![Diagram showing that an agent is made up of a model plus a harness. The harness includes the agent loop, tools, context management, and system prompt.](agent.png)

## What is the coding harness?

Language models do not edit files, execute commands, or run tests by themselves. They can only produce text. The coding harness is the system that acts as a bridge between the code editor and the language model. It turns that text into action and feeds the results back so the model can decide what to do next.

In VS Code, the coding harness has three main responsibilities:

1. **Context assembly**: Before any request reaches the model, the harness builds a prompt. That prompt includes a system message with behavioral instructions, the user's query, workspace structure (languages, frameworks, open editors), conversation history from prior turns, tool results, custom instructions, and memory from earlier sessions. The harness decides what the model sees, and those decisions directly affect quality.

2. **Tool exposure**: The harness declares the tools the model is allowed to call: reading files (`read_file`), editing code (`replace_string_in_file` or `apply_patch`), running terminal commands (`run_in_terminal`), searching the codebase (`semantic_search`), and many more. Each tool has a JSON schema the model must follow and a description the model uses to decide when to invoke it. The set of available tools can change per request. Some tools are only enabled for certain models, some require user confirmation before execution, users can toggle tools on and off in the tool picker, MCP servers and extensions can contribute entirely new tools that slot into the same loop, and custom agents (`.agent.md`) can restrict their tool set to a specific subset.

3. **Tool execution**: When the model requests a tool to be run (using JSON like `{"name": "run_in_terminal", "arguments": {"command": "npm test"}}`), the harness is the one that validates the arguments, runs the tool, handles errors, formats the result, and feeds it back in the next iteration. For example, if the model asks to edit a file, the harness writes the diff. If the model asks to run a shell command, the harness is what spawns the process, captures output, and relays it.

None of these tasks can be directly achieved by the language model. However, this input determines the behavior and outcome of the model and what you experience in the code editor.

The logic that orchestrates these tasks, deciding when to continue or stop iterating and how to keep the conversation coherent across many rounds, is the **agent loop**.

## The agent loop

At its core, when you use an agent in VS Code, a tool-calling loop happens: a **"think → act → observe → think again"** cycle. On each iteration, the agent harness builds the prompt (system instructions + context + history + all tool results so far), sends it to the model, and checks the response. If the response includes tool calls, the harness executes those tools, captures their results, and loops back. If there are no tool calls, the loop can finish and the assistant’s text becomes the final response.

![Simplified diagram of the VS Code agent loop: the user sends a chat message, the tool-calling loop builds a prompt, sends it to the model, executes requested tools, records results, checks loop-control conditions, and either continues or finalizes the chat result.](agent-loop.png)

A **turn** is the user-visible chat exchange: you send one message, and the agent eventually produces a response. During that turn, the agent loop may perform many **rounds**. A round is one pass through the loop: build the prompt, call the model, receive text and/or tool calls, execute any tools, record the results, and decide whether to continue. The full execution of all those rounds is the loop’s **run**. A single user turn might trigger many rounds as the model searches files, reads code, edits files, runs tests, reads the output, and iterates on failures.

The tool-calling loop is bounded by loop-control checks. We enforce a tool-call limit, check for cancellation between rounds, and run stop hooks. Stop hooks are extension points that can inspect the agent state and either allow it to finish or push it to keep working. Within the loop, the prompt is rebuilt on every iteration. That means the model always sees the latest state of the workspace: if it edited a file three rounds ago, the current prompt reflects that edit. The harness also manages conversation summarization. When the accumulated history grows too large, it compresses earlier rounds into a summary so the model can keep working without hitting the context window ceiling.

### Why do we need an agent loop?

A simple implementation would call the model once and apply whatever it says. That can work for simple requests where all the relevant information is already available in the prompt. Most coding tasks are more complex: the agent needs to inspect files, discover project conventions, run commands, see what failed, and adjust based on what it learns. The loop is what makes that kind of multi-step reasoning possible. It lets the agent:

- **Explore before acting.** Read a file, check its structure, then decide how to edit it.
- **Verify its own work.** Run a command, read the output, fix what went wrong.
- **Decompose complex tasks.** Break a large change into file-by-file edits, testing after each one.
- **Recover from mistakes.** If an edit introduces a type error, the harness surfaces diagnostics and the model can try again.

This is another reason why the same model can perform differently across products. The model is one variable. The harness is the other.

## The harness is the product

When a new model ships, it needs to fit into an existing harness. The system prompt, the tool definitions, the loop logic, the context assembly, all of it was built and tuned over many months of real-world use. The model gets better at filling in the blanks, but the harness defines what the blanks are.

This matters even more because GitHub Copilot spans multiple model providers. GitHub Copilot in VS Code supports a growing model ecosystem. Developers can switch between models, use auto-selection, bring their own keys, or install extra providers via extensions. This means that VS Code has to deal with broad and continuously evolving ecosystem, not a single stable API.

The harness is what lets us embrace that choice without forcing developers to relearn the product every time. You should be able to switch models or try a new provider while keeping the core experience familiar: chat, sessions, tools, terminal output, debugging, and source control.

But integrating a model is rarely just adding an option to a picker. Providers differ in how they expose tool calling, structured outputs, streaming, reasoning controls, prompt caching, context limits, and error behavior. Some models are better at long planning. Some are better at terse edits. Each model has different strengths, and we work closely with model providers before each release to adapt the system prompt, tool descriptions, and loop behavior accordingly.

![Flow diagram showing VS Code and model providers iterating from an upcoming model release through Copilot API onboarding, harness optimization, evaluation, provider feedback, and launch.](model_provider_loop.png)

Different models need different harness behavior. Claude models use `replace_string_in_file` for edits; GPT models use `apply_patch`. Gemini needs reminders to use tool-calling instead of narrating it, and breaks on orphaned tool calls in history. Some models support extended thinking and need reasoning-effort controls. Some work best with a concise system prompt; others need verbose, structured instructions to stay on track. The harness selects different system prompts per model - Claude Sonnet 4 gets a different prompt than Claude 4.5, which gets a different one than Opus.

All these per-model differences aren't trivial. They translate into per-model system prompts, per-model tool sets, and per-model conversation management. This means that when a new model ships, we don't just flip a switch but we need to validate its behavior.  We validate tool schemas, retune defaults, and re-run full agent sessions before anything ships. The harder question is how we know those changes actually made things better.

## Evaluation keeps the harness honest

Just like you need to test a new feature before you ship it, models also need to be tested. That's where model evaluation comes in. Before a model ships in VS Code, we evaluate it from multiple angles. We run offline benchmarks, test it internally, and compare it against the models already available in the product. After the model is live, we keep measuring: A/B tests, aggregate usage signals, and weekly reporting help us understand how the model behaves in real developer workflows.


![Diagram showing an overview of the VS Code evaluation pipeline.](evaluations.png)

There are multiple public model benchmarks, which are useful as a shared reference point. We use these benchmarks to compare against the broader model ecosystem and to catch obvious regressions. But at frontier levels, they are no longer enough on their own.

One of the issues with the public benchmarks is coverage. SWE-bench is valuable, but it is still centered on public bug-fixing tasks. Terminal-Bench is useful for measuring command-line competence, but many tasks look more like isolated terminal puzzles than the kinds of workflows developers actually bring to an editor. Real-world coding agents need to do more than patch a known bug or solve a shell challenge. They need to scaffold projects, migrate codebases, refactor across files, follow instructions, and handle terminals and browsers.

Grading is another limitation. Many public benchmarks assume a narrow target solution: one expected patch, one expected command sequence, or one expected final answer. That can penalize valid approaches that solve the user’s problem differently. And contamination is becoming harder to ignore. SWE-bench tasks come from public repositories that may appear in training data, which makes leaderboard scores harder to interpret. OpenAI [stopped reporting SWE-bench Verified results](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) after finding that frontier models could sometimes reproduce gold patches from memory.

We still run these benchmarks. They are useful regression tests. But when we decide which models are ready to ship in VS Code, we need something closer to the product we are actually building.

### Building VSC-Bench

That's why we built VSC-Bench, our offline evaluation suite for VS Code agent behavior. VSC-Bench focuses on VS Code-specific developer tasks that public benchmarks do not cover well: custom agent modes, extension workflows, MCP and tool use, terminal and browser interaction, multi-turn conversations, and multi-language coding tasks across TypeScript, Python, C++, and others.

![Scatter chart comparing VSC-Bench model resolution rate against median total tokens, with each point representing a different model.](benchmark.png)

For example, one task asks the agent to scaffold a new API endpoint, write a test, run it, and fix any failures. The assertions check that the route exists, the test passes, and that the agent used the terminal to verify its work rather than just writing code and stopping.

Each VSC-Bench task runs in a reproducible, containerized workspace. The harness launches VS Code, opens the workspace, sends one or more user prompts to the agent, lets the agent respond with text and tool calls, and then evaluates what happened. That gives us a more realistic view of the full agent loop: not just whether the final code looks right, but whether the agent used the editor, terminal, language services, browser, and tools in ways that match the VS Code experience.

Each task carries its own assertions: checks on the final workspace (did the project build, did the tests pass) and checks on agent behavior (did it use the right tools, respect instructions, avoid unnecessary edits). For subjective criteria, we use model-based grading. The result is a benchmark signal backed by inspectable artifacts: patches, logs, screenshots, and trajectories. We refresh the suite as VS Code and agent usage evolve, ranging from small sanity checks to harder, multi-step workflows that stress planning, context management, and tool choice. Together with public benchmarks, VSC-Bench gives us a more balanced signal: public evals tell us how a model compares to the field, while product-specific evals tell us whether it is ready for the experience developers expect inside VS Code.


## The model is the engine. The harness is the car.

We started with a question developers ask every few months: which model is best? But for a coding agent, that question is a little like asking: which engine is best? The engine matters, but it's not enough on its own. It's the context the model sees, the tools it can reach, the loop that keeps it going, and the evaluation that makes sure it all works. That's the harness, and it's what we spend most of our engineering time on.

As models gain new capabilities like longer context, better planning, and native tool use, the harness evolves to take advantage of them. And as developers push agent mode into new workflows, we feed what we learn back into the loop, the tools, and the evaluations. Every VS Code release ships harness improvements alongside model updates.

You can already extend the harness yourself with [custom instructions](https://code.visualstudio.com/docs/copilot/copilot-customization), [custom agents](https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-agents), and [MCP servers](https://code.visualstudio.com/docs/copilot/chat/mcp-servers). Try switching models, add your own tools, and let us know what works — share your feedback in [our GitHub repo](https://github.com/microsoft/vscode).

Happy coding! 💙