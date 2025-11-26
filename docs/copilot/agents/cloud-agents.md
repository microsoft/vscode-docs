---
ContentId: 8d5c9f2a-1e4b-7c9f-3a8e-2b7d4f1c6e0a
DateApproved: 11/26/2025
MetaDescription: Learn how to use GitHub Copilot Cloud Agents for large-scale coding tasks, pull request integration, and collaborative development workflows in VS Code.
MetaSocialImage: images/shared/github-copilot-social.png
---

# Cloud agents in Visual Studio Code

Cloud agents represent the most powerful AI assistance available in VS Code, leveraging GitHub's remote infrastructure to handle complex, large-scale coding tasks. These agents are designed for enterprise-scale development and seamless integration with GitHub's collaborative workflows.

## What are cloud agents?

Cloud agents are AI-powered coding assistants that run on GitHub's infrastructure rather than locally on your machine. They provide:

- **Scalable Processing**: Handle large codebases and complex requirements
- **GitHub Integration**: Direct connection to repositories, issues, and pull requests
- **Team Collaboration**: Share progress and results with team members
- **Enterprise Features**: Advanced security, compliance, and organizational controls

## GitHub Copilot Coding Agent

The **GitHub Copilot Coding Agent** is the primary cloud agent available in VS Code, designed for comprehensive coding assistance and workflow automation.

### Key capabilities

- **Large-Scale Refactoring**: Modify hundreds of files across complex codebases
- **Feature Implementation**: Build complete features from high-level requirements
- **Pull Request Generation**: Automatically create PRs with detailed descriptions
- **Code Review Integration**: Suggest improvements and address review feedback
- **Documentation Generation**: Create comprehensive docs and README files

### When to use cloud agents

Cloud agents are ideal for scenarios that require:

- **Multi-file Operations**: Changes spanning numerous files or directories
- **Repository-wide Tasks**: Refactoring, dependency updates, or architectural changes
- **Collaborative Workflows**: Tasks that benefit from team review and feedback
- **Complex Requirements**: Features requiring deep codebase understanding
- **PR-based Development**: Tasks that naturally fit into pull request workflows

## Accessing cloud agents

### From VS Code chat

1. Open the **Chat** panel (`Ctrl+Alt+I` / `Cmd+Alt+I`)
2. Type your request or click **"Delegate to coding agent"** for complex tasks
3. The system will automatically route appropriate requests to cloud agents

### From Agent Sessions view

1. Open the **Agent Sessions** view
2. Click **"New Cloud Session"** button
3. Describe your task and provide context
4. Monitor progress in real-time

### Via delegation

Start with local chat and delegate when needed:

```text
@copilot I need to add user authentication to my app
```

If the task is complex, VS Code will suggest:
**"This seems like a good task for the coding agent. Delegate to coding agent?"**

## Working with the Copilot Coding Agent

### Starting a cloud agent session

1. **Describe Your Task**: Provide clear, detailed requirements

   ```text
   Add a user authentication system with login, logout, and password reset functionality.
   Use JWT tokens and integrate with our existing user database.
   ```

2. **Provide Context**: The agent analyzes your codebase automatically, but you can highlight:
   - Specific files or directories to focus on
   - Coding patterns or conventions to follow
   - Integration points with existing systems
   - Testing requirements and standards

3. **Set Expectations**: Clarify scope and deliverables
   - Which files should be modified vs. created
   - Whether to include tests, documentation, or examples
   - Integration requirements with existing code

### Cloud Agent Workflow

#### Phase 1: Analysis and Planning

The cloud agent begins by analyzing your codebase:

- **Repository Structure**: Understanding project organization and architecture
- **Dependencies and Frameworks**: Identifying existing tools and libraries
- **Coding Patterns**: Learning from your existing code style and conventions
- **Integration Points**: Finding where new code should connect to existing systems

#### Phase 2: Implementation Strategy

Before making changes, the agent develops a plan:

- **File Creation/Modification List**: What files will be changed or added
- **Implementation Approach**: Technical strategy and architecture decisions
- **Testing Strategy**: How the changes will be tested and validated
- **Integration Plan**: How new code connects to existing systems

#### Phase 3: Code Generation and Modification

The agent implements the planned changes:

- **Progressive Updates**: Changes made incrementally with status updates
- **Quality Assurance**: Code follows best practices and project conventions
- **Error Handling**: Robust error handling and edge case coverage
- **Documentation**: Inline comments and documentation generation

#### Phase 4: Pull Request Creation

Upon completion, the agent creates a comprehensive PR:

- **Detailed Description**: Clear explanation of changes and rationale
- **Testing Instructions**: How to test and validate the changes
- **Review Guidelines**: Key areas for reviewers to focus on
- **Breaking Changes**: Any compatibility or migration considerations

### Monitoring Cloud Agent Progress

#### Real-time status updates

Cloud agents provide continuous feedback through:

- **Progress Indicators**: Current phase and completion percentage
- **File Modification Tracking**: Which files are being created or changed
- **Error Reporting**: Issues encountered and resolution attempts
- **Milestone Notifications**: Key phases completed or major progress made

#### Agent Sessions view integration

Monitor cloud agents through the dedicated sessions interface:

```text
Cloud Agent Session #1                           [In Progress]
├── Task: Add user authentication system
├── Started: 2 minutes ago
├── Progress: Implementing JWT token service (60%)
├── Files Modified: 7
├── Files Created: 3
└── Next: Creating password reset endpoints
```

#### Status types

- **Analyzing**: Understanding codebase and requirements
- **Planning**: Developing implementation strategy
- **Implementing**: Actively writing and modifying code
- **Testing**: Validating changes and running tests
- **Finalizing**: Creating PR and documentation
- **Completed**: Task finished with PR ready for review

## Pull request integration

### Automated PR creation

Cloud agents automatically create pull requests when tasks complete:

#### PR description structure

```markdown
# Add User Authentication System

## Overview
This PR implements a comprehensive user authentication system with login, logout,
and password reset functionality using JWT tokens.

## Changes Made
- Added JWT token service (`src/auth/tokenService.js`)
- Implemented authentication middleware (`src/middleware/auth.js`)
- Created user login/logout endpoints (`src/routes/auth.js`)
- Added password reset functionality with email integration
- Updated user model with authentication fields
- Added comprehensive test coverage (95%+ coverage)

## Testing Instructions
1. Start the development server: `npm run dev`
2. Navigate to `/login` to test login functionality
3. Use the test credentials: `test@example.com / password123`
4. Verify JWT token is properly set in cookies
5. Test logout functionality and token invalidation
6. Test password reset flow with email integration

## Breaking Changes
- User model now requires email field validation
- API routes now require authentication middleware
- Session storage moved from memory to JWT tokens

## Review Focus Areas
- Security implementation of JWT token handling
- Password hashing and validation logic
- Error handling in authentication flows
- Test coverage for edge cases
```

### PR Review Integration

#### Addressing Review Feedback

1. **Review Comments**: Team members add feedback and suggestions
2. **Agent Response**: Cloud agent can automatically address specific feedback
3. **Iterative Updates**: Make targeted improvements based on review comments
4. **Conversation Threading**: Maintain context across review iterations

#### Follow-up Conversations

Continue working with the cloud agent after PR creation:

```text
@copilot The reviewer suggested using bcrypt instead of our current hashing.
Can you update the authentication system to use bcrypt?
```

The agent will:

- Update the existing PR with bcrypt implementation
- Preserve all existing functionality and tests
- Add commit messages explaining the changes
- Notify reviewers of updates

## Managing workspace changes

### Change tracking and review

Cloud agents integrate with VS Code's change tracking:

#### Before Applying Changes

- **Diff Preview**: Review all changes before they're applied to your workspace
- **Selective Application**: Choose which files or changes to apply
- **Backup Creation**: Automatic backup of original files before modification
- **Change Summaries**: Clear explanation of what each change accomplishes

#### During Implementation

- **Live Updates**: See changes as they're made in real-time
- **Progress Tracking**: Monitor which files are being modified
- **Error Monitoring**: Immediate notification of any implementation issues
- **Rollback Options**: Ability to revert changes if needed

#### After Completion

- **Change Summary**: Complete overview of all modifications made
- **Testing Validation**: Results of automated tests and quality checks
- **Documentation Updates**: Any documentation changes or additions
- **Next Steps**: Suggested follow-up actions or improvements

### Handling Large-Scale Changes

#### Multi-Repository Operations

For changes spanning multiple repositories:

1. **Repository Analysis**: Cloud agent analyzes all connected repositories
2. **Coordination Strategy**: Plans changes across repositories to maintain compatibility
3. **Dependency Management**: Updates package versions and dependencies correctly
4. **Testing Coordination**: Ensures cross-repository changes work together
5. **Synchronized PRs**: Creates coordinated PRs across affected repositories

#### Incremental Deployment

For large changes, cloud agents support phased implementation:

- **Phase Planning**: Break large changes into deployable phases
- **Dependency Ordering**: Ensure changes are applied in correct sequence
- **Validation Points**: Test and validate each phase before proceeding
- **Rollback Strategy**: Clear rollback plan for each implementation phase

## Follow-up prompts and interactions

### Continuing conversations

After initial task completion, continue refining with follow-up prompts:

#### Enhancement requests

```text
@copilot Can you add rate limiting to the authentication endpoints?
```

#### Bug Fixes and Improvements

```text
@copilot The tests are failing on the password reset functionality.
Can you investigate and fix the issue?
```

#### Documentation and Examples

```text
@copilot Please add API documentation and usage examples for the new
authentication endpoints.
```

### Iterative development

Cloud agents excel at iterative development workflows:

1. **Initial Implementation**: Complete basic feature implementation
2. **Review and Feedback**: Team reviews and provides suggestions
3. **Refinement**: Agent addresses feedback and makes improvements
4. **Enhancement**: Add additional features or optimizations
5. **Documentation**: Complete documentation and examples
6. **Maintenance**: Ongoing support for bug fixes and updates

### Cross-session context

Cloud agents maintain context across multiple sessions:

- **Previous Work**: Remember past implementations and decisions
- **Code Patterns**: Learn and apply established patterns from your codebase
- **Team Preferences**: Adapt to team coding standards and preferences
- **Architecture Understanding**: Build cumulative knowledge of your system architecture

## Security and privacy considerations

### Code security

Cloud agents operate with enterprise-grade security:

- **Encrypted Transmission**: All code and data encrypted in transit
- **Secure Storage**: Temporary processing data stored securely
- **Access Controls**: Repository access limited to authorized users
- **Audit Logging**: Complete audit trail of agent actions and access

### Data privacy

- **Repository Scope**: Access limited to repositories you explicitly authorize
- **Temporary Processing**: Code analyzed temporarily, not permanently stored
- **User Control**: Full control over what data is shared and processed
- **Compliance**: Meets enterprise security and compliance requirements

### Organizational controls

Administrators can configure cloud agent access:

- **Repository Permissions**: Control which repositories agents can access
- **Feature Restrictions**: Limit specific cloud agent capabilities
- **User Management**: Control which users can access cloud agents
- **Usage Monitoring**: Track and monitor cloud agent usage across organization

## Troubleshooting common issues

### Connection problems

If cloud agent sessions fail to start:

1. **Check GitHub Authentication**: Ensure you're logged in to GitHub in VS Code
2. **Repository Access**: Verify the cloud agent has access to your repository
3. **Network Connectivity**: Ensure stable internet connection for cloud communication
4. **Permission Issues**: Check that you have appropriate repository permissions

### Task failures

When cloud agent tasks don't complete successfully:

1. **Review Error Messages**: Check Agent Sessions view for detailed error information
2. **Simplify Request**: Break complex tasks into smaller, more specific requests
3. **Provide More Context**: Add additional context about your codebase and requirements
4. **Check Repository State**: Ensure repository is in a clean, workable state

### Performance optimization

For better cloud agent performance:

1. **Clear Task Description**: Provide specific, detailed requirements
2. **Relevant Context**: Share only necessary files and context
3. **Incremental Requests**: Break large tasks into manageable phases
4. **Repository Organization**: Well-organized repositories enable better agent understanding

## Best practices

### Effective task communication

1. **Be Specific**: Provide clear, detailed requirements and acceptance criteria
2. **Include Context**: Share relevant background information and constraints
3. **Set Expectations**: Clarify scope, timeline, and deliverable requirements
4. **Provide Examples**: Include examples of desired outcomes or similar implementations

### Optimal workflow integration

1. **Start with Planning**: Let the agent analyze and plan before implementing
2. **Review Incrementally**: Review and provide feedback during implementation
3. **Test Thoroughly**: Validate changes in appropriate testing environments
4. **Document Decisions**: Maintain clear documentation of agent-implemented features

### Team collaboration

1. **Share Sessions**: Make agent sessions visible to relevant team members
2. **Review Together**: Use PR reviews as team learning opportunities
3. **Establish Patterns**: Develop consistent patterns for agent task delegation
4. **Knowledge Sharing**: Document successful agent workflows for team reference

## Next steps

- **[Background Agents](/docs/copilot/agents/background-agents.md)**: Learn about CLI-based autonomous agents
- **[Agent overview](/docs/copilot/agents/overview.md)**: Understanding different agent types and delegation
- **[Copilot Chat](/docs/copilot/chat/copilot-chat.md)**: Master local chat and inline editing capabilities
- **[GitHub Integration](/docs/copilot/overview.md)**: Explore broader GitHub Copilot features

## Related documentation

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [Pull Request Best Practices](https://docs.github.com/pull-requests)
- [VS Code Source Control](/docs/sourcecontrol/overview.md)
- [Team Collaboration](/docs/editing/codebasics.md)
