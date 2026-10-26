---
ContentId: cbff1d23-7653-44b7-b24d-4a9a889fea41
DateApproved: 10/28/2026
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

For Copilot sessions, use the [Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) for configuration, event payloads, and output decisions. A plugin packages hooks; it does not translate Local scripts into the shared harness's contract.

When adopting or updating a plugin, follow [Migrate hooks](/docs/agent-customization/migrate-customizations.md#migrate-hooks). Update the source package, not its installation cache. Check bundled scripts, path references, agent-scoped hooks, and any duplicate commands in user settings or repository hook files.

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
    review-tool-copilot.cjs
```

### Hook configuration format

Use the hook schema supported by the plugin's target runtime. For Copilot, review the [command-hook format](https://docs.github.com/en/copilot/reference/hooks-reference#command-hooks) and [matcher semantics](https://docs.github.com/en/copilot/reference/hooks-reference#matcher-filtering). Event aliases can affect payload and tool names, so test scripts and matchers together.

### Reference plugin paths in hook commands

Use a plugin-root reference rather than hardcoding its installation directory. These references identify the package root, not the current repository or the folder containing the hook configuration:

| Plugin format | Token | Environment variable |
|---------------|-------|----------------------|
| Agent Plugins 1.0 | `${PLUGIN_ROOT}` | `PLUGIN_ROOT` |
| Copilot | `${PLUGIN_ROOT}` | `PLUGIN_ROOT` |
| Claude | `${CLAUDE_PLUGIN_ROOT}` | `CLAUDE_PLUGIN_ROOT` |
| Legacy OpenPlugin | `${PLUGIN_ROOT}` | `PLUGIN_ROOT` |

For example, include the [converted review script](/docs/agent-customization/migrate-customizations.md#example-conversion) as `scripts/review-tool-copilot.cjs` in the package structure above. In an Agent Plugins 1.0 package, put this configuration in `com.github.copilot/hooks/hooks.json`:

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "command": "node \"${PLUGIN_ROOT}/scripts/review-tool-copilot.cjs\"",
        "env": { "REVIEW_TOOL_NAME": "<copilot-tool-name>" },
        "timeoutSec": 10
      }
    ]
  }
}
```

Replace `<copilot-tool-name>` with the tool to review. The quoted script path keeps installations containing spaces as one command argument. This example requires Node.js on the execution host and does not write into the installed package.

The [plugin parser](https://github.com/microsoft/vscode/blob/1.142.0/src/vs/platform/agentPlugins/common/pluginParsers.ts) defines the format-specific hook-root references and their command-path expansion. Use the token and hook-file location for your package format; do not copy an installed cache path. Before testing the package in a disposable Copilot session, deactivate any standalone copy of the same hook.

### Supported hook events

Use the shared harness's [event reference](https://docs.github.com/en/copilot/reference/hooks-reference#hook-event-input-payloads) for plugin-wide hooks.

Hooks in a plugin-provided custom agent's frontmatter are [scoped to that agent](/docs/agent-customization/hooks.md#agent-scoped-hooks). {% data variables.product.prodname_vscode_shortname %} forwards those hooks when passing the agent to Copilot. The agent appearing in the picker doesn't prove its hooks run, so verify the expected events and decisions in a trusted session. Keep agent-specific hooks in the agent's frontmatter rather than broadening them to plugin-wide execution.

### How plugin hooks interact with other hooks

Plugin-wide hooks run alongside other applicable hook sources. For Copilot `preToolUse`, a denial blocks the tool call. Return no decision when the hook should leave the normal permission flow unchanged. Review the runtime's timeout and failure rules before relying on a hook for validation.

Disabling a plugin also disables its hooks. Unless enterprise policy controls the plugin's enablement, you can enable or disable plugins globally or for a specific workspace from the Extensions view.

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
