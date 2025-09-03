---
ContentId: f8820661-7772-47e6-b63e-ac59f6752d9c
DateApproved: 08/07/2025
MetaDescription: Learn how to implement spec-driven development using VS Code's built-in AI features. Create specifications, generate code, and maintain alignment between requirements and implementation.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Set up a spec-driven development flow in VS Code

Intro

## Spec-driven development workflow

TODO: add a brief overview of the workflow steps and optionally a diagram

## Key technical components

* Custom instructions: specialized guidelines for specs, implementation plans, and code generation
* Chat modes: define specialized AI personas for different workflow stages (spec creation, implementation, review)
* Prompt files: reusable prompts for common tasks (spec creation, planning, implementation)
* Language models: choose models based on task complexity (reasoning for specs & planning, fast for code generation)
* MCP tools: use tools for research, or accessing internal/external data sources

## Step 1: Define document templates

* Specification document template
* Implementation plan template

## Step 2: Create a feature specification

1. Create custom instructions `spec.instructions.md` for writing project feature specifications

    These rules ensure specs are consistent, clear, and complete throughout the project, across all features, contributors, and iterations.

    Include additional rules and guidelines specific to the project. E.g. naming convention for spec files, acceptance criteria format, level of detail required.

    Use the defined spec template as a guide.

1. Create a chat mode `Spec.chatmode.md` for writing specs

    Add specific guidelines about the spec writer persona: perform research, ask clarifying questions, ensure completeness, operate in read-only mode except for writing specs.

1. (Optionally) Create a prompt file `spec.prompt.md` for generating a feature spec

    Provides a shorthand way to prompt the initial creation of a spec.

## Step 3: Create an implementation plan

1. Create custom instructions `plan.instructions.md` for writing implementation plans

    These rules ensure implementation plans are consistent, clear, and complete throughout the project, across all features, contributors, and iterations.

    Include rules and guidelines specific to the technical implementation of the project. E.g. technical stack considerations, architectural patterns and constraints.

    Use the defined implementation plan template as a guide.

1. Create a chat mode `Plan.chatmode.md` for writing implementation plans

    Add specific guidelines about the plan writer persona: break down specs into tasks, consider dependencies, ensure clarity, operate in read-only mode except for writing implementation plans.

1. Create a prompt file `Plan.prompt.md` for generating an implementation plan

    Whenever the spec is updated, this prompt file provides a shorthand way to prompt the creation of an implementation plan from a spec.

## Step 4: Generate implementation code

1. Create one or more custom instructions `*.instructions.md` for generating code from implementation plans

    Create separate instruction files for different programming languages or components if needed.

    Include rules and guidelines specific to the coding standards of the project. E.g. naming conventions, code structure, commenting style, testing requirements.

1. (Optionally) Create a chat mode `Implement.chatmode.md` for generating the implementation code

    Add specific guidelines about the implementer persona: follow coding standards, ensure code quality, write tests, write secure and maintainable code.

## Step 5: Continuous improvement

1. Update and refine custom instructions and chat modes based on (testing) feedback and evolving project needs

1. Generate new specs and implementation plans as new features are added or existing features are modified

    Use the reusable prompts to quickly create new specs and plans.

## Related resources
