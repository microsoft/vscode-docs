---
ContentId: 9f1a2b3c-4e5f-6d7c-8a9b-1c2d3e4f5a6b
DateApproved: 11/26/2025
MetaDescription: Learn how to use background agents like Copilot CLI for autonomous coding tasks, terminal integration, and isolated development workflows in VS Code.
MetaSocialImage: images/shared/github-copilot-social.png
---

# Background agents in Visual Studio Code

Background agents in Visual Studio Code are CLI-based and operate independently on complex tasks while you continue other work in the editor. They are ideal for time-intensive operations that don't require constant interaction or for experimental feature development. Background agents can use Git worktrees to isolate their changes from your main workspace and prevent conflicts.

This article covers the key features of background agents, and how to start and manage background sessions from Copilot CLI or OpenAI Codex.

## What are background agents?

Background agents are autonomous AI assistants that run in the terminal, unlike local agents that operate within VS Code's chat interface. When you close VS Code, background agents continue working on your tasks in the background.

Background agents run independently in the background and can apply changes to your codebase, which could conflict with your active work. To prevent this, background agents can use Git worktrees to create isolated development environments.

The Agent view in VS Code provides visibility into all your background agent sessions. You can view the list of sessions, their status, and detailed progress information. You can also provide follow-up instructions or cancel sessions directly from the view.

To assign a task to a background agent, you can create a new background session directly from the Agent Sessions view, use the agent's dedicated CLI, or continue a local chat conversation from VS Code as a background agent session.

## Copilot CLI

The **Copilot CLI** is the primary background agent in VS Code, providing a command-line interface for autonomous coding tasks.

### Key features

* **Terminal-based interface**: Native command-line interaction for advanced users
* **Autonomous task execution**: Independent operation on complex, multi-step workflows
* **Worktree integration**: Isolated development environments using Git worktrees
* **Batch operations**: Process multiple files or repositories efficiently

### Installation and setup

Copilot CLI integrates directly with VS Code's terminal:

1. Copilot CLI installs automatically with the GitHub Copilot extension.
1. Access the CLI through VS Code's integrated terminal.
1. Authentication uses your existing GitHub Copilot credentials.
1. Configuration inherits VS Code settings and workspace configuration.

## Starting background agent sessions

### From VS Code chat interface

Delegate complex tasks from local chat to background agents:

1. Start a conversation in VS Code chat
2. Describe a complex, time-intensive task
3. Click **"Delegate to background agent"** when prompted
4. Monitor progress in Agent Sessions view

Example conversation flow:

```text
and update all 50+ endpoint files with proper type annotations.

Copilot: This looks like a complex task that would benefit from background
processing. Would you like me to delegate this to a background agent?

[Delegate to background agent] [Continue in chat]
```

### Via Agent Sessions view

Create background sessions directly:

1. Open **Agent Sessions** view
2. Click **"New Background Session"**
3. Provide task description and requirements
4. Specify working directory and scope
5. Start autonomous execution

### Command Palette access

Quick access via command palette:

* **`Copilot: New Background Session`** * Start new autonomous task
* **`Copilot: Show Background Sessions`** * View active background agents
* **`Copilot: Background Agent Terminal`** * Open dedicated background terminal

## Working with Copilot CLI

### Basic command structure

The Copilot CLI uses natural language commands with structured parameters:

```bash
# Start a new coding task
copilot code "Add user authentication with JWT tokens to the Express app"

# Analyze and refactor existing code
copilot refactor "Convert all class components to functional components with hooks"

# Generate comprehensive test coverage
copilot test "Create unit tests for all utility functions in /src/utils/"

# Documentation generation
copilot docs "Generate API documentation for all REST endpoints"
```

### Advanced workflow commands

#### Multi-step operations

```bash
# Complex feature implementation
copilot feature "Implement real-time chat system" \
  --include websockets,database,authentication \
  --test-coverage 90% \
  --documentation complete

# Large-scale refactoring
copilot refactor "Migrate from REST to GraphQL" \
  --preserve-compatibility \
  --incremental \
  --test-all-changes
```

#### Repository analysis

```bash
# Comprehensive codebase analysis
copilot analyze --full-repository \
  --include security,performance,architecture \
  --output detailed-report.md

# Dependency audit and updates
copilot dependencies --audit --update-safe \
  --test-after-update --create-pr
```

### Task configuration

Background agents support detailed task configuration:

#### Scope and boundaries

```bash
copilot code "Add logging system" \
  --scope "src/,tests/" \
  --exclude "node_modules/,dist/" \
  --max-files 50 \
  --preserve-existing-logs
```

#### Quality requirements

```bash
copilot implement "Shopping cart functionality" \
  --test-coverage 95% \
  --code-quality high \
  --follow-patterns existing \
  --include-docs \
  --error-handling comprehensive
```

#### Integration constraints

```bash
copilot feature "Payment processing" \
  --integrate-with stripe,paypal \
  --security-compliance pci-dss \
  --error-recovery automatic \
  --audit-logging required
```

## Terminal session management

### Background terminal sessions

Background agents operate in dedicated terminal sessions:

#### Session types

* **Primary session**: Main background agent terminal
* **Isolated sessions**: Separate environments for different tasks
* **Monitoring sessions**: Real-time progress tracking and logging
* **Debug sessions**: Detailed execution analysis and troubleshooting

#### Session controls

```bash
# List active background sessions
copilot sessions --list

# Monitor specific session progress
copilot sessions --monitor session-id-123

# Pause/resume background tasks
copilot sessions --pause session-id-123
copilot sessions --resume session-id-123

# Terminate background session
copilot sessions --stop session-id-123
```

### Terminal output management

#### Real-time monitoring

Background agents provide continuous feedback:

```text
[Background Agent] Starting task: API TypeScript conversion
[14:23:15] Analyzing codebase structure...
[14:23:18] Found 52 API endpoint files to convert
[14:23:20] Creating TypeScript interfaces...
[14:24:45] Converting endpoint 15/52: user-profile.js
[14:25:12] Running tests for converted files...
[14:26:30] All tests passing ✓
[14:26:31] Generating type definitions...
```

#### Progress indicators

```text
Task: API TypeScript Conversion                    [████████░░] 80%
├── Files Analyzed: 52/52 ✓
├── Interfaces Created: 15/15 ✓
├── Files Converted: 42/52 (⏳ user-settings.js)
├── Tests Passing: 42/42 ✓
└── Estimated Completion: 8 minutes
```

#### Error reporting

```text
[ERROR] Conversion failed for payment-gateway.js
├── Issue: Missing type definition for PaymentResponse
├── Context: Line 45, function processPayment()
├── Suggestion: Creating custom interface PaymentResponse
├── Action: Continuing with generated interface
└── Status: Resolved automatically ✓
```

## Delegation workflows

### From local chat to background

Seamless task transition from interactive to autonomous mode:

#### Delegation triggers

VS Code automatically suggests background delegation for:

* **Large-scale operations**: Tasks affecting 20+ files
* **Time-intensive work**: Operations estimated to take more than 10 minutes
* **Repetitive tasks**: Batch operations across multiple similar files
* **Analysis tasks**: Comprehensive codebase analysis or refactoring
* **Independent work**: Tasks that don't require immediate interaction

#### Context transfer

When delegating to background agents:

1. **Conversation history**: Complete chat history preserved
1. **File references**: All referenced files and their context maintained
1. **Requirements**: Task specifications and constraints carried over
1. **Workspace state**: Current workspace configuration and settings
1. **Quality standards**: Code style and testing requirements transferred

### Multi-agent coordination

Background agents can coordinate with other agent types:

#### Background to local handoff

```text
[Background Agent] Completed API conversion. Found 3 issues requiring review:
1. Complex type inference in user-auth.ts (line 127)
2. Potential breaking change in payment-types.ts
3. New interface conflicts with existing UserType

Handing off to local chat for interactive resolution...
```

#### Background to cloud escalation

```text
[Background Agent] Task scope expanded beyond local capacity.
Detected need for:
* Multi-repository changes (backend + frontend)
* PR coordination across 4 repositories
* Team review required

Escalating to cloud agent for distributed workflow...
```

## Working with worktrees

### Isolated development environments

Background agents use Git worktrees for safe, isolated development:

#### Automatic worktree creation

```bash
# Agent automatically creates worktree for experimental changes
copilot code "Implement new caching layer" --use-worktree

# Creates:
# /main-project/           (original workspace)
# /main-project-cache/     (isolated worktree for caching work)
```

#### Worktree management

```bash
# List active worktrees
git worktree list

# Switch between worktrees in VS Code
copilot worktree switch cache-implementation

# Merge successful changes back to main
copilot worktree merge cache-implementation
```

### Safe experimentation

Worktrees enable risk-free development:

#### Experimental features

```bash
# Try experimental approach in isolation
copilot experiment "Replace REST with GraphQL" \
  --worktree experimental-graphql \
  --preserve-rest-fallback \
  --comparative-testing
```

#### Parallel development

```bash
# Multiple approaches in parallel
copilot code "Performance optimization" \
  --approach caching --worktree perf-caching &

copilot code "Performance optimization" \
  --approach database-optimization --worktree perf-db &

# Compare results and choose best approach
copilot compare-worktrees perf-caching perf-db
```

### Integration with source control

#### Branch management

Background agents integrate seamlessly with Git workflows:

```bash
# Create feature branch with background work
copilot feature "User dashboard redesign" \
  --branch feature/dashboard-redesign \
  --worktree dashboard-work \
  --create-pr-when-done
```

#### Commit strategy

```bash
# Structured commit history
copilot code "Shopping cart implementation" \
  --commit-strategy incremental \
  --commit-prefix "feat(cart):" \
  --squash-before-merge
```

## Monitoring agent progress

### Agent Sessions view integration

Background agents are fully integrated with the Agent Sessions view:

#### Session information

```text
Background Agent Session #3                      [In Progress]
├── Task: API TypeScript Conversion
├── Started: 45 minutes ago
├── Progress: Converting files (85% complete)
├── Worktree: /project-api-typescript/
├── Files Modified: 44/52
├── Tests: All passing ✓
├── Current: Converting payment-gateway.js
└── ETA: 7 minutes remaining
```

#### Real-time updates

* **File progress**: Live updates on which files are being processed
* **Test results**: Continuous testing feedback and validation
* **Error handling**: Automatic error resolution and retry mechanisms
* **Performance metrics**: Processing speed and efficiency statistics

### Status notifications

#### Milestone notifications

```text
🎉 Background Agent Update
Task: API TypeScript Conversion
✅ Phase 1 Complete: Interface generation (15 interfaces created)
⏳ Phase 2 Starting: File conversion (52 files to process)
📊 Progress: 35% complete, ETA 25 minutes
```

#### Completion alerts

```text
✅ Background Task Completed Successfully!

Task: Shopping Cart Implementation
Duration: 2 hours 15 minutes
Files Created: 12
Files Modified: 8
Tests Added: 47 (100% coverage)
Commits: 8 (feature/shopping-cart branch)

Ready for review: git checkout feature/shopping-cart
```

#### Error notifications

```text
⚠️ Background Agent Needs Attention

Task: Database Migration Scripts
Issue: Permission denied accessing production config
Action Required: Update database credentials in .env
Session: Paused until resolved

[Fix Now] [View Details] [Cancel Task]
```

## Advanced background agent features

### Multi-language projects

Background agents excel at polyglot development:

#### Cross-language refactoring

```bash
# Coordinate changes across multiple languages
copilot refactor "Update API contracts" \
  --languages typescript,python,go \
  --sync-interfaces \
  --update-docs \
  --cross-language-tests
```

#### Framework migrations

```bash
# Migrate between different technology stacks
copilot migrate "Express.js to FastAPI" \
  --preserve-functionality \
  --gradual-migration \
  --compatibility-layer \
  --test-equivalence
```

### Large-scale operations

#### Repository-wide analysis

```bash
# Comprehensive codebase health check
copilot analyze --repository-wide \
  --include security,performance,maintainability \
  --generate-report \
  --prioritize-issues \
  --suggest-improvements
```

#### Batch processing

```bash
# Process multiple repositories
copilot batch "Update copyright headers" \
  --repositories frontend,backend,mobile \
  --dry-run \
  --create-prs \
  --coordinate-merges
```

### Custom tooling integration

#### External tools

```bash
# Integrate with custom development tools
copilot code "Add monitoring" \
  --use-tool prometheus,grafana \
  --follow-org-standards \
  --include-alerting \
  --dashboard-generation
```

#### CI/CD integration

```bash
# Update continuous integration
copilot ci "Add deployment pipeline" \
  --platform github-actions \
  --environments staging,production \
  --include-testing \
  --security-scanning \
  --deployment-approval
```

## Best practices

### Effective task definition

#### Clear requirements

```bash
# Good: Specific and measurable
copilot code "Add user authentication with JWT, including login/logout endpoints,
password reset via email, rate limiting (5 attempts/hour), and comprehensive
test coverage >90%"

# Avoid: Vague and unmeasurable
copilot code "make auth better"
```

#### Scope boundaries

```bash
# Define clear boundaries
copilot refactor "Convert to TypeScript" \
  --scope "src/components/,src/utils/" \
  --exclude "legacy/,third-party/" \
  --preserve-existing-tests \
  --maintain-api-compatibility
```

### Resource management

#### Concurrent sessions

* **Limit active sessions**: Run two to three background agents maximum simultaneously
* **Resource allocation**: Consider CPU and memory usage for complex tasks
* **Priority management**: Use high, medium, or low priority for task scheduling
* **Load balancing**: Distribute tasks across available computational resources

#### Performance optimization

```bash
# Optimize for performance
copilot code "Performance improvements" \
  --profile-before-after \
  --benchmark-critical-paths \
  --memory-optimization \
  --cpu-efficiency \
  --measure-improvement
```

### Quality assurance

#### Testing integration

```bash
# Comprehensive testing strategy
copilot implement "New feature" \
  --test-driven-development \
  --unit-tests \
  --integration-tests \
  --e2e-scenarios \
  --performance-tests \
  --security-tests
```

#### Code quality

```bash
# Maintain high code quality
copilot code "Feature implementation" \
  --follow-style-guide \
  --static-analysis \
  --code-review-ready \
  --documentation-complete \
  --error-handling-robust
```

## Troubleshooting

### Common issues

#### Session startup problems

1. **Terminal access**: Ensure VS Code has terminal permissions
2. **Authentication**: Verify GitHub Copilot authentication status
3. **Workspace state**: Check for workspace corruption or locks
4. **Resource availability**: Ensure sufficient system resources

#### Task execution failures

1. **File permissions**: Check read/write access to target files
2. **Git state**: Ensure clean git state without conflicts
3. **Dependencies**: Verify all required dependencies are available
4. **Scope conflicts**: Check for overlapping file modifications

#### Performance issues

1. **Resource limits**: Monitor CPU and memory usage
2. **File system**: Check available disk space and I/O performance
3. **Network**: Verify stable internet connection for cloud coordination
4. **Concurrent tasks**: Reduce number of simultaneous background agents

### Debugging background agents

#### Verbose logging

```bash
# Enable detailed logging
copilot config --log-level debug --log-file background-agent.log

# Monitor real-time logs
tail -f background-agent.log
```

#### Session diagnostics

```bash
# Diagnose session issues
copilot sessions --diagnose session-id-123 \
  --include performance,resources,conflicts \
  --output diagnostics-report.json
```

## Security considerations

### Code access and permissions

Background agents operate with restricted permissions:

* **Repository scope**: Access limited to authorized repositories
* **File system**: Restricted to workspace and temporary directories
* **Network access**: Limited to necessary GitHub and development services
* **Execution environment**: Sandboxed execution for safety

### Data privacy

* **Local processing**: Sensitive operations processed locally when possible
* **Encrypted communication**: All network communication encrypted
* **Temporary storage**: Minimal temporary data with automatic cleanup
* **Audit logging**: Complete audit trail of agent actions

### Organizational controls

Administrators can configure background agent policies:

* **Usage limits**: Control resource usage and concurrent sessions
* **Repository access**: Restrict access to sensitive repositories
* **Feature controls**: Enable or disable specific background agent capabilities
* **Monitoring**: Track background agent usage across teams

## Next steps

* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about cloud agents for tasks requiring GitHub integration
* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and delegation
* [Terminal basics](/docs/terminal/basics.md): Master VS Code terminal features
* [Source control](/docs/sourcecontrol/overview.md): Advanced Git workflows with agents

## Related resources

* [GitHub Copilot CLI documentation](https://cli.github.com/manual/gh_copilot)
* [VS Code Terminal](/docs/terminal/basics.md)
* [Git Worktrees](https://git-scm.com/docs/git-worktree)
* [Workspace Configuration](/docs/configure/settings.md)
