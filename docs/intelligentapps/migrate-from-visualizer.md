---
ContentId: c68118c4-453e-404a-97a5-4509850a2da2
DateApproved: 03/03/2026
MetaDescription: Migrate from Local Agent Playground and Local Visualizer to Agent Inspector in AI Toolkit for unified debugging, workflow visualization, and code navigation.
---
# Migrate from Local Agent Playground & Local Visualizer to Agent Inspector

## Why this change matters

AI Toolkit consolidates the **Local Agent Playground** and **Local Visualizer** into a single, unified experience called **Agent Inspector**. This transition improves your AI agent development workflow.

### Developer-Centric Benefits of Agent Inspector

| Capability | Previous Experience | Agent Inspector |
|------------|---------------------|-----------------|
| **Debugging** | No integrated debugging | One-click F5 debugging with breakpoints, variable inspection, and step-through |
| **Code Navigation** | None | Double-click workflow nodes to jump directly to source code |
| **Workflow + Chat** | Separate tools (Visualizer + Playground) | Unified interface with chat and visualization together |
| **Production Path** | Manual deployment setup | Generated code uses Hosted Agent SDK, ready for Microsoft Foundry deployment |

### Key Improvements

1. **Unified Experience**: No more switching between a playground for chat and a separate visualizer for tracing. Agent Inspector combines both in a single, integrated interface.

2. **True Debugging Support**: Set breakpoints in your agent code, pause execution, inspect variables, and step through your workflow logic. This was previously impossible with the separate tools.

3. **Copilot-Assisted Setup**: GitHub Copilot can automatically generate the debugging configuration, endpoints, and environment setup, reducing manual configuration errors.

4. **Code Navigation**: When viewing workflow execution graphs, double-click any node to immediately open the corresponding source file in your editor.

5. **Consistent with Production**: The `agentdev` CLI and Agent Framework SDK used in Agent Inspector are the same foundation you'll use for deploying to Microsoft Foundry, ensuring your local development matches production behavior.

---

## Migration Guide: Existing Projects

If you have an existing project already set up to use the **Local Visualizer** (via Microsoft Foundry extension) and/or **Local Agent Playground**, follow these steps to migrate to Agent Inspector.

### Prerequisites

Before migrating, ensure you have:

- **Python 3.10+** installed
- **VS Code AI Toolkit extension** installed (this is where Agent Inspector lives)
- Your agent built using the **Agent Framework SDK** (`agent-framework` package)

### Step 1: Update Your Observability Code

**Remove** the previous visualizer setup code:

```python
# You can remove this if you just need workflow visualization as tracing is not required, or change the port to 4317 if you want to keep using tracing features in AI Toolkit.
from agent_framework.observability import setup_observability
setup_observability(vs_code_extension_port=4319)
```

Agent Inspector communicates with the locally running agent server through `agent-dev-cli`, without a hard dependency on OTEL tracing.

### Step 2: Add VS Code Debug Configuration

You have two options:

#### Option A: Let Copilot Configure It (Recommended)

1. Open GitHub Copilot in VS Code
2. Select **AIAgentExpert** from Agent Mode
3. Enter this prompt:
   ```
   Help me set up the debug environment for the workflow agent to use AI Toolkit Agent Inspector
   ```
4. Copilot will generate the necessary `.vscode/tasks.json` and `.vscode/launch.json` files

#### Option B: Manual Configuration

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

### Step 3: Install Required Dependencies

Ensure `debugpy` and the `agent-dev-cli` CLI are installed:

```bash
pip install debugpy agent-dev-cli
```

### Step 4: Run Your Agent with Agent Inspector

1. Press `kbstyle(F5)` to start debugging
2. Agent Inspector will automatically:
   - Start your agent server on port 8087
   - Attach the Python debugger on port 5679
   - Open the Inspector UI with both chat playground and workflow visualization

### What Changes for Your Workflow

| Before (Old Tools) | After (Agent Inspector) |
|--------------------|-------------------------|
| Run `Microsoft Foundry: Open Visualizer for Hosted Agents` command | Press **F5** in VS Code |
| Enter endpoint URL manually in Local Agent Playground | Automatic — configured via launch.json |
| View traces in separate Visualizer tab | Integrated in Inspector alongside chat |
| No debugging | Full breakpoint and step-through debugging |

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8087 already in use | Check for other running agent servers; terminate them first |
| Port 5679 in use | Another debug session may be running; close it |
| Breakpoints not hit | Ensure `debugpy` is installed and port 5679 matches in launch.json |
| API/Framework errors | Agent Framework is actively evolving — copy terminal errors to Copilot for fixes |

---

## Summary

By migrating to Agent Inspector, you gain:
- ✅ Unified chat + visualization experience
- ✅ Full debugging support with breakpoints
- ✅ One-click F5 launch
- ✅ Code navigation from workflow nodes
- ✅ Copilot-assisted configuration
- ✅ Production-ready tooling alignment

For questions or issues, visit the [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues).