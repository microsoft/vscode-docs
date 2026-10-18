---
ContentId: cbff1d23-7653-44b7-b24d-4a9a889fea41
DateApproved: 10/16/2026
MetaDescription: Package skills, agents, MCP servers, hooks, and automation templates with agent plugins in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../../agent-customization/images/agent-plugins/installed-plugins.png
Keywords:
- agent plugins
- plugin manifest
- plugin authoring
- skills
- hooks
- mcp
- automations
---
# Agent plugin authoring reference

Package related customizations as a plugin that developers can install together. This reference covers manifests, directory layouts, component configuration, and compatibility across plugin formats and agent harnesses.

Use it when creating a plugin or inspecting how its components are configured. To find, install, update, or remove an existing plugin, see [Use agent plugins](/docs/agent-customization/agent-plugins.md).

## Package structure

Agent Plugins 1.0 defines skills and MCP servers as portable component types. Other capabilities are client-specific and use the standard's reverse-domain [client extension namespaces](https://agent-plugins.org/plugin-authors/client-extensions). {% data variables.product.prodname_vscode_shortname %} reads Copilot-specific components from the `com.github.copilot` namespace and ignores namespaces owned by other clients.

| Capability | Description | Client-specific | Standard |
|------------|-------------|:--------------:|:--------:|
| [MCP servers](/docs/agent-customization/mcp-servers.md) | External tool integrations | | ✓ |
| [Skills](/docs/agent-customization/agent-skills.md) | Instructions, scripts, and resources that load on-demand | | ✓ |
| [Agents](/docs/agent-customization/custom-agents.md) | Specialized personas and tool configurations | ✓ | |
| [Hooks](/docs/agent-customization/hooks.md) | Shell commands that execute at agent lifecycle points | ✓ | |
| [Automation templates](#automations-in-plugins) | Reusable prompts and schedules for agent tasks | ✓ | |
| Slash commands | Commands you can invoke with `/` in chat | ✓ | |

For example, a testing plugin might include a `test-runner` skill with scripts, a `test-reviewer` agent with read-only tools, and an MCP server for a test reporting dashboard. In the Agent Plugins format, the directory structure looks like this:

```text
my-testing-plugin/
  plugin.json              # Plugin metadata and configuration
  skills/
    test-runner/
      SKILL.md             # Testing skill instructions
      run-tests.sh         # Supporting script
  mcp.json                 # MCP server definitions
  automations/
    review.automation.md   # Automation template
  scripts/
    validate-tests.sh      # Hook script
  com.github.copilot/
    agents/
      test-reviewer.agent.md  # Code review agent
    hooks/
      hooks.json           # Hook configuration
```

Plugins in the Copilot and Claude formats provide the same capabilities from different locations. See [Plugin formats](#plugin-formats).

## Plugin manifest (plugin.json)

An Agent Plugins 1.0 package has a `plugin.json` file at its root that declares the standard's schema:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-dev-tools",
  "description": "React development utilities",
  "version": "1.2.0"
}
```

| Field | Type | Required | Description |
|-------|------|:--------:|-------------|
| `$schema` | string | Yes | Canonical Agent Plugins schema identifier. |
| `name` | string | Yes | Plugin name and package identifier. |
| `version` | string | No | Plugin version. Semantic Versioning is recommended. |
| `description` | string | No | Brief description of the plugin. |
| `author` | object | No | Author information with optional `name`, `email`, and `url` fields. |
| `homepage` | string | No | Documentation or homepage. |
| `repository` | string | No | Source repository. |
| `license` | string | No | License identifier. An SPDX identifier is recommended. |
| `keywords` | string[] | No | Search and discovery terms. |
| `extensions` | object | No | Client-specific data keyed by reverse-domain namespace. |

Skills are discovered from the `skills/` folder, and MCP server configuration is discovered from the `mcp.json` file. You don't list these component paths in the manifest. Custom agents, hooks, commands, and MCP server definitions are not portable top-level manifest fields.

Copilot-specific components live in the `com.github.copilot` directory at the plugin root, and Copilot-specific manifest data goes under the matching key in `extensions`:

```text
my-plugin/
  plugin.json              # $schema declares Agent Plugins 1.0
  skills/                  # Portable: agent skills
  mcp.json                 # Portable: MCP server configuration
  com.github.copilot/      # Copilot-specific components
    agents/
    commands/
    rules/
    hooks/
      hooks.json
```

Other clients ignore the `com.github.copilot` namespace, so a package stays portable while keeping its Copilot capabilities.

For the full field constraints and validation rules, see the [Agent Plugins manifest documentation](https://agent-plugins.org/plugin-authors/manifest).

> [!NOTE]
> Existing Copilot-format plugins that don't declare the Agent Plugins schema remain supported. For their manifest fields, see the [{% data variables.copilot.copilot_cli %} plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference#pluginjson).

## Plugin formats

{% data variables.product.prodname_vscode_shortname %} auto-detects the plugin format by checking the root manifest and format-specific manifest paths. A root `plugin.json` that declares the canonical Agent Plugins `$schema` uses Agent Plugins semantics. The Copilot format is used as the default when no other format marker is found.

| Plugin format | Plugin manifest |
|---------------|-----------------|
| Agent Plugins 1.0 | `plugin.json` with `$schema` set to `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` |
| Copilot | `plugin.json` |
| Claude | `.claude-plugin/plugin.json` |
| Legacy OpenPlugin | `.plugin/plugin.json` |

### Plugin environment variables

Some plugin formats provide a root token that you can use in hook commands and MCP server configurations to reference files within the plugin directory. {% data variables.product.prodname_vscode_shortname %} expands the token at runtime and also sets it as an environment variable in the hook or server process.

| Plugin format | Plugin root |
|---------------|------------------|
| Agent Plugins 1.0 | `${PLUGIN_ROOT}` |
| Claude | `${CLAUDE_PLUGIN_ROOT}` |
| Copilot | `${PLUGIN_ROOT}` or `${CLAUDE_PLUGIN_ROOT}` |
| Legacy OpenPlugin | `${PLUGIN_ROOT}` |

Agent Plugins 1.0 also defines `${PLUGIN_ROOT}` for packaged files and `${PLUGIN_DATA}` for writable state that persists across plugin updates. {% data variables.product.prodname_vscode_shortname %} preserves these placeholders for the plugin runtime to expand. For details about where placeholders are supported, see the [Agent Plugins specification](https://github.com/agentplugins/agent-plugins-spec/blob/main/spec/1.0.0.md#9-environment-variables-and-placeholder-expansion).

## Automations in plugins

Agent Plugins can contribute automation templates that appear under **Templates from Plugins** in the [{% data variables.copilot.agents_window %}](/docs/agents/run/automations.md#start-from-a-template). A template provides a reusable name, prompt, and schedule. It doesn't create or enable an automation when the plugin is installed.

> [!NOTE]
> Automation templates are a {% data variables.product.prodname_vscode_shortname %}-specific plugin capability, not a portable Agent Plugins 1.0 component type.

### Automation template location

Store automation templates in an `automations/` folder at the root of an Agent Plugins package. Each file must use the `.automation.md` suffix:

```text
my-plugin/
  plugin.json
  automations/
    daily-review.automation.md
    weekly-review.automation.md
```

To add templates from other folders, configure `extensions.com.github.copilot.automations.paths` in `plugin.json`. These paths are relative to the `com.github.copilot/` folder and supplement the default `automations/` folder:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-dev-tools",
  "version": "1.2.0",
  "extensions": {
    "com.github.copilot": {
      "automations": {
        "paths": [
          "./team-automations/"
        ]
      }
    }
  }
}
```

Set `exclusive` to `true` alongside `paths` to load templates only from the configured folders and skip the default `automations/` folder.

### Automation template format

An automation template is a Markdown file with YAML frontmatter. The Markdown body is the prompt:

```markdown
---
version: 1
id: weekly-review
name: Weekly review
description: Review the workspace for regressions.
schedule:
  kind: cron
  expression: "30 10 * * 5"
  timeZone: local
---
Review the workspace changes from the past week.
Identify regressions and suggest follow-up actions.
```

The frontmatter supports these fields:

| Field | Required | Description |
|-------|:--------:|-------------|
| `version` | Yes | File format version. Use `1`. |
| `id` | Yes | Identifier that is unique within the plugin. Use lowercase letters, numbers, periods, or hyphens, with a maximum of 64 characters. |
| `name` | Yes | Display name for the template. |
| `description` | No | Short description of the automation's purpose. |
| `schedule` | Yes | Manual, hourly, daily, or weekly schedule. |

Use one of these schedule formats:

| Schedule | YAML |
|----------|------|
| Manual | `kind: manual` |
| Hourly | `kind: hourly` |
| Daily | `kind: cron`, a five-field expression such as `"0 9 * * *"`, and `timeZone: local` |
| Weekly | `kind: cron`, a five-field expression such as `"30 10 * * 5"`, and `timeZone: local` |

The five cron fields represent minute, hour, day of month, month, and day of week. Only local-time cron expressions that represent a daily or weekly schedule are supported. {% data variables.product.prodname_vscode_shortname %} ignores invalid templates rather than changing their schedule.

Plugin templates can't specify a workspace, provider, model, permissions, enabled state, or run history. When someone selects a template, the **New Automation** dialog opens so they can review the prompt and choose the execution configuration. The **Enabled** checkbox is cleared by default.

Disabling a plugin removes its templates from the Automations view. Automations that were previously created from those templates and their run history remain available.

## MCP servers in plugins

Plugins can bundle [MCP servers](/docs/agent-customization/mcp-servers.md) to provide agents with additional tools and data sources. Plugin MCP servers start automatically when the plugin is enabled and stop when the plugin is disabled.

### MCP configuration file

{% tabs id="mcp-configuration" %}
{% tab label="Agent Plugins 1.0" %}

Place MCP server definitions in the `mcp.json` file at the plugin root and follow the [portable MCP configuration format](https://agent-plugins.org/plugin-authors/mcp-servers).

```text
my-plugin/
  plugin.json             # Plugin metadata and configuration
  skills/
  mcp.json              # MCP server definitions
  servers/
    db-server             # Server executable
  config.json             # Server configuration
```

{% /tab %}

{% tab label="Copilot and Claude" %}

Place MCP server definitions in the `.mcp.json` file at the plugin root. {% data variables.product.prodname_vscode_shortname %} discovers this file automatically when it loads the plugin.

```text
my-plugin/
  plugin.json             # Plugin metadata and configuration
  skills/
  .mcp.json              # MCP server definitions
  servers/
    db-server             # Server executable
  config.json             # Server configuration
```

In the `.mcp.json` file, MCP servers are defined in a top-level `mcpServers` object. Each server entry specifies a command, arguments, and optional environment variables:

```json
{
  "mcpServers": {
    "plugin-database": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_PATH": "${CLAUDE_PLUGIN_ROOT}/data"
      }
    },
    "plugin-api": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${CLAUDE_PLUGIN_ROOT}"
    }
  }
}
```

### Reference plugin paths in server configuration

For Claude-format plugins, use the `${CLAUDE_PLUGIN_ROOT}` token in MCP server fields to reference executables and files within the plugin directory. {% data variables.product.prodname_vscode_shortname %} expands this token in the following fields:

* `command`: the executable path
* `args`: command-line arguments
* `cwd`: working directory
* `env`: environment variable values
* `envFile`: path to an environment file
* `url`: for HTTP-based MCP servers
* `headers`: HTTP header values

{% data variables.product.prodname_vscode_shortname %} also injects a `CLAUDE_PLUGIN_ROOT` environment variable into the server process, so server code can access the plugin path at runtime.

{% /tab %}

{% /tabs %}

### How plugin MCP servers interact with other servers

Plugin MCP servers appear alongside workspace and user-level MCP servers. You can manage them through the same tools:

* Select **Configure Tools** in the {% data variables.copilot.chat_view %} to see tools from all MCP servers, including plugin servers.

* Run **MCP: List Servers** from the Command Palette to view plugin servers alongside other servers.

Plugin MCP servers are implicitly trusted when you install the plugin. Unlike workspace MCP servers, they do not show a separate trust prompt at startup.

Disabling a plugin stops its MCP servers. Tools provided by the stopped servers are no longer available in chat.

## Hooks in plugins

Plugins can include [hooks](/docs/agent-customization/hooks.md) that run shell commands at agent lifecycle points. Plugin-wide hooks work alongside your workspace and user-level hooks. When a plugin is enabled, these hooks fire in addition to any other hooks configured for the same event.

> [!NOTE]
> Hooks are client-specific and are not a portable Agent Plugins 1.0 component type. In an Agent Plugins package, they come from the `com.github.copilot` namespace.

Organizations can distribute approved hooks through plugins. When managed settings specify `allowManagedHooksOnly: true`, plugin hooks run only when the plugin is force-enabled by a managed `enabledPlugins["plugin@marketplace"]: true` entry. User enablement alone is not sufficient, and `allowManagedHooksOnly` does not itself enable the plugin. See [Deploy hooks through managed plugins](/docs/enterprise/manage-ai-settings.md#deploy-hooks-through-managed-plugins).

Hook configuration and payloads depend on the session's harness. Start with [choosing a hook implementation](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session) to find its supported events and configuration. For Local harness sessions, expand **Configure plugin hooks for Local harness sessions** below.

### Hook file location

The hook file location depends on the plugin format:

| Plugin format | Hook file path |
|---------------|----------------|
| Agent Plugins 1.0 | `com.github.copilot/hooks/hooks.json` |
| Claude | `hooks/hooks.json` |
| Copilot | `hooks.json` (at the plugin root) |

{% data variables.product.prodname_vscode_shortname %} auto-detects the plugin format and discovers the hook file automatically.

```text
my-plugin/
  plugin.json
  com.github.copilot/
    hooks/
      hooks.json         # Hook configuration (Agent Plugins format)
  scripts/
    format.sh            # Hook script referenced by hooks.json
```

<details>
<summary>Configure plugin hooks for Local harness sessions</summary>

The following configuration, event, and matcher behavior applies to the Local harness.

### Hook configuration format

For the Local harness, plugin hooks use the same base format as [workspace hooks](/docs/agent-customization/hooks.md#local-hook-configuration-formats). The Local parser accepts Claude hook configuration, including matcher syntax, but ignores matcher values. As a result, all nested commands for the event run in Local harness sessions.

**Flat format** (same as workspace hooks):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
      }
    ]
  }
}
```

**Matcher format** (Claude compatibility syntax):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
          }
        ]
      }
    ]
  }
}
```

The Local harness parses the `matcher` field for compatibility with Claude Code, but ignores matcher values. To filter Local hook behavior, check the event input inside the hook script.

### Reference plugin paths in hook commands

Use a plugin-root token in Local hook commands to reference bundled scripts and files without hardcoding the plugin's installation path.

| Plugin format | Token | Environment variable |
|---------------|-------|----------------------|
| Claude | `${CLAUDE_PLUGIN_ROOT}` | `CLAUDE_PLUGIN_ROOT` |
| Legacy OpenPlugin | `${PLUGIN_ROOT}` | `PLUGIN_ROOT` |

{% data variables.product.prodname_vscode_shortname %} expands the token to the plugin's absolute path in hook commands and `env` values. This includes the `command`, `bash`, `powershell`, and platform-specific command fields. Expanded command paths are shell-quoted, so plugin paths can contain spaces.

The hook process also receives the matching root environment variable. For example, a Node.js script can read `process.env.CLAUDE_PLUGIN_ROOT`. These references resolve to the new root when the plugin is discovered at a different location.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/scripts/validate-tool.sh"
      }
    ]
  }
}
```

The same expansion applies to hooks in the frontmatter of plugin-provided custom agents. For example, a Claude-format plugin can contribute `agents/reviewer.md` that invokes its bundled `scripts/validate-tool.js` script:

```markdown
---
name: Code reviewer
description: Review code with plugin-provided validation.
hooks:
  PreToolUse:
    - type: command
      command: "node ${CLAUDE_PLUGIN_ROOT}/scripts/validate-tool.js"
---

Review code for correctness and maintainability.
```

For legacy OpenPlugin plugins, use `${PLUGIN_ROOT}` in place of `${CLAUDE_PLUGIN_ROOT}`.

These [agent-scoped hooks](/docs/agent-customization/hooks.md#agent-scoped-hooks-for-the-local-harness) are in Preview and require the Local harness, `setting(chat.useHooks)`, and a trusted workspace. They run only while the contributing custom agent is active, including when it runs as a subagent.

### Supported hook events

In the Local harness, plugin hooks support the same events as workspace hooks: `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PreCompact`, `SubagentStart`, `SubagentStop`, and `Stop`. See the [Local hooks reference](/docs/agents/reference/hooks-reference.md) for event schemas.

### How plugin hooks interact with other hooks

Plugin-wide hooks run alongside workspace-level and user-level hooks. When multiple hooks target the same event, all of them execute. For `PreToolUse` hooks, the most restrictive permission decision across all hooks wins: `deny` overrides `ask`, which overrides `allow`.

Disabling a plugin also disables its hooks. Unless enterprise policy controls the plugin's enablement, you can enable or disable plugins globally or for a specific workspace from the Extensions view.

</details>

## Cross-tool compatibility

Agent Plugins 1.0 is an open standard designed for cross-tool compatibility. A conformant plugin uses a root `plugin.json`, puts skills in `skills/`, and puts MCP server configuration in `mcp.json`. Compatible clients can discover the portable component types they support from the same package.

Agent Plugins can also include client-specific manifest data and files under a stable reverse-domain namespace. Clients ignore namespaces they don't implement, so client-specific capabilities don't prevent other clients from loading the portable components. {% data variables.product.prodname_vscode_shortname %} reads custom agents, slash commands, rules, hooks, and automation path configuration from the `com.github.copilot` namespace. Other clients only use the capabilities in that namespace that they support.

For example:

```text
my-plugin/
  plugin.json
  skills/
  mcp.json
  com.github.copilot/      # Read by {% data variables.product.prodname_vscode_shortname %} and other Copilot clients
  com.example.client/      # Ignored by {% data variables.product.prodname_vscode_shortname %}
```

{% data variables.product.prodname_vscode_shortname %} continues to support existing Copilot, Claude, and legacy OpenPlugin formats. Plugins that don't declare the Agent Plugins schema continue to use their existing format-specific discovery rules.

For details about the portable format, see the [Agent Plugins specification](https://github.com/agentplugins/agent-plugins-spec/blob/main/spec/1.0.0.md). For other formats, see the [{% data variables.copilot.copilot_cli %} plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) and the [Claude Code plugin marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces).

## Test and distribute a plugin

Before distributing a plugin, verify its behavior with each harness and client you intend to support:

1. Register your development copy as a [local plugin](/docs/agent-customization/agent-plugins.md#use-local-plugins). This configuration is Experimental.
1. Check that its supported components appear, then run a representative task to verify the skills, agents, hooks, and tools that the plugin provides. Review any code that a hook or MCP server runs before testing.
1. If the plugin includes automation templates, confirm that they appear in **Templates from Plugins** and review their configuration before creating an automation.
1. Before publishing an update, bump the `version` field in `plugin.json` and in the `marketplace.json` plugin entry, if applicable. Follow the marketplace schema for your plugin format.
1. Test the [installation](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins) and [update](/docs/agent-customization/agent-plugins.md#update-plugins) paths that developers will use.

For marketplace schemas and distribution details, see the [Agent Plugins specification](https://github.com/agentplugins/agent-plugins-spec/blob/main/spec/1.0.0.md), the [{% data variables.copilot.copilot_cli %} plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference), and the [Claude Code marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces).

## Related resources

* [Create agent skills](/docs/agent-customization/agent-skills.md)
* [Create custom agents](/docs/agent-customization/custom-agents.md)
* [Configure agent hooks](/docs/agent-customization/hooks.md)
