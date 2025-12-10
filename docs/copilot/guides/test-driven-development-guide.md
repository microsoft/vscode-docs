---
ContentId: a9c5f4d2-8e91-4b3a-9d2c-7f1e3b8a6c4d
DateApproved: 11/03/2025
MetaDescription: Learn how to set up a test-driven development (TDD) workflow in VS Code using AI customization features.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Set up a test-driven development flow in VS Code

Test-driven development (TDD) is a software development approach where you write tests before implementing functionality. This creates a tight feedback loop that improves code quality, catches bugs early, and ensures your code meets requirements. By using AI within the TDD methodology, you enable the AI to generate comprehensive test cases, suggest implementation code that passes those tests, and assist with refactoring.

This guide shows you how to set up an AI-assisted test-driven development workflow in Visual Studio Code using custom chat modes and handoffs.

## Test-driven development workflow

Test-driven development follows a three-phase cycle known as [red-green-refactor](https://martinfowler.com/bliki/TestDrivenDevelopment.html). This cycle repeats for each small increment of functionality.

To implement an AI-assisted TDD workflow in VS Code, create [custom chat modes](/docs/copilot/customization/custom-chat-modes.md) for each phase of the cycle. Each chat mode focuses the AI on the specific goals of that phase:

* **Red phase**: Write a failing test for the functionality you want to develop. The test fails because the functionality doesn't exist yet.
* **Green phase**: Write the minimal code needed to make the test pass. Focus on making it work, not making it perfect.
* **Refactor phase**: Improve the code quality while keeping all tests passing. Clean up duplication, improve naming, and enhance structure.

![Diagram that shows the TDD workflow with custom chat modes in VS Code. The diagram has four main phases: Testing context, Red phase (Write failing test), Green phase (Implement code), and Refactor phase (Improve code). Arrows indicate the flow from one phase to the next, with handoffs between chat modes for each phase.](../images/test-driven-development-guide/tdd-workflow-diagram.png)

Specify [handoffs](/docs/copilot/customization/custom-chat-modes.md#handoffs) between these chat modes to transition from one phase to the next and guide the AI through the TDD cycle.

By using [custom instructions](/docs/copilot/customization/custom-instructions.md), you can set up a testing context that defines your project's test conventions such as testing frameworks and test structure. This context helps the AI generate tests that align with your project's standards.

Optionally, use the [built-in plan agent](/docs/copilot/chat/chat-planning.md) or a custom planning agent to create an implementation plan for the feature before starting the TDD cycle. This helps clarify requirements and identify edge cases to cover with tests.

<!--
```mermaid
flowchart LR
    TC(["Testing context<br/>(Instructions)"]) --&lt; red["Red phase<br/>(chat mode)"]
    red --&lt; FT([Failing test])
    FT --&gt; green["Green phase<br/>(chat mode)"]
    green --&gt; PT([Passing test])
    PT --&gt; refactor["Refactor phase<br/>(chat mode)"]
    refactor --&gt; CT([Final code])
    CT -.Next feature.-> red

    style red fill:#ffcdd2,stroke:#c62828
    style green fill:#c8e6c9,stroke:#2e7d32
    style refactor fill:#ffe0b2,stroke:#ef6c00
    style TC fill:#f5f5f5,stroke:#616161
    style FT fill:#ffebee,stroke:#c62828
    style PT fill:#e8f5e9,stroke:#2e7d32
    style CT fill:#e3f2fd,stroke:#1565c0
```
-->

## Step 1: Set up testing context

Establish project-wide test conventions and practices that guide AI in generating consistent, high-quality tests. [Custom instructions](/docs/copilot/customization/custom-instructions.md) ensure the AI understands your testing approach and maintains standards across all TDD phases.

**Why this helps**: Without explicit test conventions, AI might generate tests that don't match your project's style, use inconsistent patterns, or miss important test scenarios.

* Create a `.github/copilot-instructions.md` [instructions file](/docs/copilot/customization/custom-instructions.md#use-a-githubcopilot-instructionsmd-file) at the root of your repository to define your project's testing guidelines.

    The instructions in this file are automatically included in all chat interactions as context for the AI agent.

    Include guidance on test structure, naming conventions, assertion style, test coverage expectations, and any testing frameworks or tools your project uses.

    The following example provides a starting point for test conventions:

    ```markdown
    # [Project Name] Testing Guidelines

    ## Test conventions
    * Write clear, focused tests that verify one behavior at a time
    * Use descriptive test names that explain what is being tested and the expected outcome
    * Follow Arrange-Act-Assert (AAA) pattern: set up test data, execute the code under test, verify results
    * Keep tests independent - each test should run in isolation without depending on other tests
    * Start with the simplest test case, then add edge cases and error conditions
    * Tests should fail for the right reason - verify they catch the bugs they're meant to catch
    * Mock external dependencies to keep tests fast and reliable
    ```

    > [!TIP]
    > You can create an optional test structure template that defines sections and patterns for different test types (for example, `test-template.md`). Reference this template in your instructions file so the AI uses it when generating tests.

* Alternatively, create [`.instructions.md` files](/docs/copilot/customization/custom-instructions.md#use-instructionsmd-files) for specific test directories.

    With `.instructions.md` files, you can provide targeted guidance for different types of tests (unit, integration, end-to-end) or specific modules instead of using a single global instructions file.

    For example, create `tests/unit/unit-tests.instructions.md` with unit test-specific guidance:

    ```markdown
    ---
    applyTo: tests/unit/**
    ---
    Focus on testing individual functions and methods in isolation. Mock all external dependencies.
    ```

## Step 2: Create red phase chat mode

The red phase focuses on writing clear, failing tests that define the desired functionality. A dedicated [chat mode](/docs/copilot/customization/custom-chat-modes.md) for this phase describes the AI's role and guidelines for creating these tests. In this mode, the AI should not implement any code, only write the failing test, and then hand off to the green phase.

**Why this helps**: Without a focused mode, the AI might mix implementation suggestions with test creation, and miss the core TDD principle of writing tests first.

To create a red phase [chat mode](/docs/copilot/customization/custom-chat-modes.md) `.github/chatmodes/TDD-red.chatmode.md`:

1. Run the **Chat: Configure Chat Modes** > **Create New custom chat mode file** command in the Command Palette.

1. Name the file `TDD-red.chatmode.md` and describe the red phase role and guidelines.

    The following `TDD-red.chatmode.md` file provides a starting point for the red phase.

    ```markdown
    ---
    description: 'Write failing tests that define desired behavior (Red phase).'
    handoffs:
    - label: Move to green phase
      agent: TDD-green
      prompt: Now implement the minimal code to make these tests pass.
      send: true
    ---
    # Red Phase: Write Failing Tests

    You are a test-first developer focused on writing clear, failing tests that define desired behavior before any implementation exists.

    ## Guidelines

    * Understand the requirement thoroughly before writing tests
    * Write the simplest test that fails for the right reason
    * Test one behavior at a time
    * Follow project test conventions and patterns

    ## Workflow

    1. Clarify the requirement if needed by asking questions
    2. Identify the simplest test case that captures the core behavior
    3. Write the test using appropriate assertions
    4. Verify the test fails because the functionality doesn't exist (not due to syntax errors)
    5. Explain what the test verifies and why it currently fails

    ## Do not

    * Implement any production code
    * Write passing tests
    ```

## Step 3: Create green phase chat mode

The green phase implements minimal code to pass the tests written in the red phase. A dedicated [chat mode](/docs/copilot/customization/custom-chat-modes.md) for this phase describes the AI's role and guidelines for implementing just enough code to make tests pass. After implementation, the AI hands off to the refactor phase.

To create a green phase [chat mode](/docs/copilot/customization/custom-chat-modes.md) `.github/chatmodes/TDD-green.chatmode.md`:

1. Run the **Chat: Configure Chat Modes** > **Create New custom chat mode file** command in the Command Palette.

1. Name the file `TDD-green.chatmode.md` and describe the green phase role and guidelines.

    The following `TDD-green.chatmode.md` file provides a starting point:

    ```markdown
    ---
    description: 'Implement minimal code to make tests pass (Green phase).'
    handoffs:
    - label: Refactor Code
      agent: TDD-refactor
      prompt: Now refactor this code to improve quality while keeping tests passing.
      send: false
    ---
    # Green Phase: Make Tests Pass

    You are a pragmatic developer focused on writing the minimal code needed to make failing tests pass.

    ## Guidelines

    * Implement only what's needed to satisfy the current test
    * Avoid over-engineering or adding features not covered by tests
    * Keep code simple and direct - optimization comes later
    * Run the test frequently to verify progress

    ## Workflow

    1. Understand what the test expects
    2. Write the simplest implementation that makes the test pass
    3. Run the test to verify it passes
    4. Run the full test suite to ensure no regressions

    ## Do not

    * Add functionality beyond what tests require
    * Optimize prematurely
    * Refactor code (that happens in the next phase)
    * Skip running tests
    ```

## Step 4: Create refactor phase chat mode

The refactor phase improves code quality while keeping all tests passing. A dedicated [chat mode](/docs/copilot/customization/custom-chat-modes.md) for this phase describes the AI's role and guidelines for safe refactoring. After refactoring, the AI can either return to the red phase for the next feature or finish if all functionality is complete.

1. Create a refactor phase [chat mode](/docs/copilot/customization/custom-chat-modes.md) `.github/chatmodes/TDD-refactor.chatmode.md`.

    The following `TDD-refactor.chatmode.md` file provides a starting point:

    ```markdown
    ---
    description: 'Improve code quality while keeping all tests passing (Refactor phase).'
    ---
    # Refactor Phase: Improve Code Quality

    You are a quality-focused developer who improves code structure and readability while maintaining all test coverage.

    ## Guidelines

    * Keep all tests passing throughout refactoring
    * Remove duplication (DRY principle)
    * Improve naming for clarity
    * Simplify complex logic
    * Enhance code structure and organization

    ## Workflow

    1. Identify opportunities for improvement (duplication, unclear naming, complex logic)
    2. Make small, safe refactoring steps
    3. Run tests after each change to ensure they still pass
    4. Continue until code meets quality standards

    ## Do not

    * Change functionality or behavior
    * Add new features
    * Skip running tests after changes
    * Make large refactoring changes in one step
    ```

1. After refactoring, run the full test suite to verify all tests still pass.

## Step 5: Use the TDD workflow

With the custom chat modes and testing context set up, you can now use the AI-assisted TDD workflow in VS Code to implement new features:

1. Open the Chat view and select the **TDD-red** chat mode to start the red phase.

1. Provide a prompt that describes the feature or behavior you want to implement.

    Follow the agent through the red phase to write failing tests. You can continue the conversation until you're satisfied with the tests.

    For example:

    ```text
    Implement user registration with email validation and password requirements.
    ```

1. When ready, use the handoff to transition to the **TDD-green** chat mode for the green phase.

    Notice that the agent automatically switches to the green phase and starts implementing code to make the tests pass. You can provide additional prompts or clarifications as needed.

1. After the tests pass, use the handoff to transition to the **TDD-refactor** chat mode for the final refactor phase.

    The agent switches to the refactor phase and now focuses on improving code quality while ensuring all tests remain passing.

At any time, you can review the code and tests generated by the AI, run tests manually, and provide feedback or corrections to guide the AI's output. You can manually switch back to previous phases if needed.

## Troubleshooting and best practices

### Common TDD pitfalls with AI

**Skipping the red phase**: AI might suggest implementing code before writing tests.

**Over-implementation**: AI might generate more code than needed to pass the current test. Review implementations critically and remove unnecessary complexity.

**Testing implementation details**: Tests should verify behavior, not implementation. If refactoring requires changing tests, they might be too tightly coupled to implementation details.

**Incomplete test coverage**: AI might miss edge cases or error conditions. Review generated tests critically and ask for additional tests covering boundary conditions, error scenarios, and edge cases.

### Best practices for TDD with AI

**Validate test quality**: After AI generates a test, review it to ensure it fails for the right reason. Run the test before implementing to verify it catches the missing functionality.

**Maintain incremental progress**: Take small steps through the TDD cycle. Write one test, implement minimal code, refactor, then repeat. Small iterations prevent large mistakes and keep the codebase working.

**Run tests frequently**: Execute tests immediately after changes. Don't accumulate multiple changes before testing. Frequent test runs provide rapid feedback and catch issues early.

**Use test coverage as a guide**: High coverage doesn't guarantee quality, but low coverage indicates untested behavior. Ask AI to suggest tests for uncovered code paths.

**Maintain test independence**: Tests should run in any order without affecting each other. If tests depend on execution order or shared state, refactor to make them independent.

**Update test context as needed**: As your project evolves, update the testing guidelines in your instructions file to reflect new conventions, frameworks, or practices.

## Related resources

Learn more about testing and AI customization in VS Code:

* [Testing with AI](/docs/copilot/guides/test-with-copilot.md)
* [Custom chat modes](/docs/copilot/customization/custom-chat-modes.md)
* [Custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Running tests with VS Code](/docs/debugtest/testing.md)
