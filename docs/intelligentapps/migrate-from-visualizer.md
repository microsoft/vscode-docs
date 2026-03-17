---
ContentId: c68118c4-453e-404a-97a5-4509850a2da2
DateApproved: 03/12/2026
MetaDescription: Migrate from Local Agent Playground and Local Visualizer to Agent Inspector in AI Toolkit for unified debugging, workflow visualization, and code navigation.
---
# Migrate from Local Agent Playground & Local Visualizer to Agent Inspector

In this article, you learn how to migrate your existing AI agent projects from Local Agent Playground and Local Visualizer to Agent Inspector in AI Toolkit. Agent Inspector combines chat, workflow visualization, and debugging support into a single experience.

## Why this change matters

AI Toolkit consolidates the **Local Agent Playground** and **Local Visualizer** into a single, unified experience called **Agent Inspector**. This transition improves your AI agent development workflow.

### Developer-centric benefits of Agent Inspector

| Capability | Previous experience | Agent Inspector |
|------------|---------------------|------------------|
| **Debugging** | No integrated debugging | One-click F5 debugging with breakpoints, variable inspection, and step-through |
| **Code navigation** | None | Double-click workflow nodes to jump directly to source code |
| **Workflow + Chat** | Separate tools (Visualizer + Playground) | Unified interface with chat and visualization together |
| **Production path** | Manual deployment setup | Generated code uses Hosted Agent SDK, ready for Microsoft Foundry deployment |

### Key improvements

1. **Unified experience**: Agent Inspector combines chat and tracing into a single interface, so you no longer need to switch between separate tools.

2. **Debugging support**: Set breakpoints in your agent code, pause execution, inspect variables, and step through your workflow logic. The separate tools didn't offer these capabilities.

3. **Copilot-assisted setup**: GitHub Copilot can automatically generate the debugging configuration, endpoints, and environment setup, reducing manual configuration errors.

4. **Code navigation**: When viewing workflow execution graphs, double-click any node to immediately open the corresponding source file in your editor.

5. **Consistent with production**: The `agentdev` CLI and Agent Framework SDK used in Agent Inspector are the same foundation you use for deploying to Microsoft Foundry, ensuring your local development matches production behavior.

### What changes for your workflow

| Before (old tools) | After (Agent Inspector) |
|--------------------|-------------------------|
| Run `Microsoft Foundry: Open Visualizer for Hosted Agents` command | Press `kbstyle(F5)` in VS Code |
| Enter endpoint URL manually in Local Agent Playground | Automatic, configured in launch.json |
| View traces in a separate Visualizer tab | View traces in Inspector alongside chat |
| No debugging | Full breakpoint and step-through debugging |

---

## Migration guide: existing projects

If your project uses the **Local Visualizer** (via the Microsoft Foundry extension) or the **Local Agent Playground**, follow these steps to migrate to Agent Inspector.

### Prerequisites

Before you start, make sure you have:

- **Python 3.10+** installed
- **VS Code AI Toolkit extension** installed (Agent Inspector is part of this extension)
- Your agent built with the **Agent Framework SDK** (`agent-framework` package)

### Step 1: Update your observability code

**Remove** the previous visualizer setup code:

```python
# You can remove this if you just need workflow visualization as tracing is not required, or change the port to 4317 if you want to keep using tracing features in AI Toolkit.
from agent_framework.observability import setup_observability
setup_observability(vs_code_extension_port=4319)
```

Agent Inspector communicates with your agent server through `agent-dev-cli` and doesn't require OTEL tracing.

### Step 2: Add VS Code debug configuration

You have two options:

#### Option A: Let Copilot configure it (recommended)

1. Open GitHub Copilot in VS Code.
2. Select **AIAgentExpert** from Agent Mode.
3. Enter this prompt:
   ```
   Help me set up the debug environment for the workflow agent to use AI Toolkit Agent Inspector
   ```
4. Copilot generates the `.vscode/tasks.json` and `.vscode/launch.json` files for you.

#### Option B: Manual configuration

Create or update your `.vscode` folder with these files:

**`.vscode/tasks.json`**
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Validate prerequisites",
      "type": "aitk",
      "command": "debug-check-prerequisites",
      "args": { "portOccupancy": [5679, 8087] }
    },
    {
      "label": "Run Agent Server",
      "type": "shell",
      "command": "${command:python.interpreterPath} -m debugpy --listen 127.0.0.1:5679 -m agentdev run ${file} --port 8087",
      "isBackground": true,
      "dependsOn": ["Validate prerequisites"],
      "problemMatcher": {
        "pattern": [{"regexp": "^.*$", "file": 0, "location": 1, "message": 2}],
        "background": { "activeOnStart": true, "beginsPattern": ".*", "endsPattern": "Application startup complete|running on" }
      }
    },
    {
      "label": "Open Inspector",
      "type": "shell",
      "command": "echo '${input:openTestTool}'",
      "presentation": {"reveal": "never"},
      "dependsOn": ["Run Agent Server"]
    },
    {
      "label": "Terminate All",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    { "id": "openTestTool", "type": "command", "command": "ai-mlstudio.openTestTool", "args": {"port": 8087} },
    { "id": "terminate", "type": "command", "command": "workbench.action.tasks.terminate", "args": "terminateAll" }
  ]
}
```

**`.vscode/launch.json`**
```json
{
  "version": "0.2.0",
  "configurations": [{
    "name": "Debug Agent",
    "type": "debugpy",
    "request": "attach",
    "connect": { "host": "localhost", "port": 5679 },
    "preLaunchTask": "Open Inspector",
    "postDebugTask": "Terminate All"
  }]
}
```

> **Note**: Replace `${file}` in tasks.json with your agent's entrypoint Python file path if you want a fixed configuration.

### Step 3: Install required dependencies

Install `debugpy` and `agent-dev-cli`:

```bash
pip install debugpy agent-dev-cli
```

### Step 4: Run your agent with Agent Inspector

1. Press `kbstyle(F5)` to start debugging.
2. Agent Inspector automatically:
   - Starts your agent server on port 8087
   - Attaches the Python debugger on port 5679
   - Opens the Inspector UI with the chat playground and workflow visualization

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8087 already in use | Check for other running agent servers and stop them first |
| Port 5679 in use | Another debug session might be running. Close it and try again |
| Breakpoints not hit | Make sure `debugpy` is installed and port 5679 matches in launch.json |
| API or framework errors | Agent Framework is actively evolving. Copy terminal errors into Copilot for help |

For additional questions or issues, visit the [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues).

## What you learned

In this article, you learned how to:

- Migrate from Local Agent Playground and Local Visualizer to Agent Inspector.
- Update your agent code and VS Code configuration for the new debugging experience.
- Use the new capabilities of Agent Inspector to improve your agent development workflow.
- Troubleshoot common issues during migration and setup.
