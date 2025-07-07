## [`v1.101`](https://code.visualstudio.com/updates/v1_101) <img src="images/1_101_eli-edit/sparkle-filled.svg" alt="sparkle" style= "float: right; height: 1em; vertical-align: middle;">

<div style="
  position: relative;
  background-image: url('images/1_101_eli-edit/background.svg');
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
  box-sizing: border-box;
">
  <div style="
    font-size: 2rem;
    font-weight: 600;
    color: #1a1a1a;
    background-color: rgba(255, 255, 255, 0.75);
    padding: 0.4rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  ">
    June 2025 Update
  </div>
</div>

<br>
<br>
<br>
<div style="font-size: 1.25rem; font-weight: 600;">
  Welcome to the June release of Visual Studio Code.
</div>
There are many updates in this version that we hope you'll like, some of the key highlights include:

<br>
<br>
<br>

| <img src="images/1_101_eli-edit/copilot.svg" alt="Copilot" style="height: 18px"> <br> [Chat &darr;](#chat) | <img src="images/1_101_eli-edit/mcp.svg" alt="MCP" style="height: 18px"> <br> [MCP &darr;](#MCP) | <img src="images/1_101_eli-edit/source-control.svg" alt="Source Control" style="height: 18px"> <br> [SCM &darr;](#Source-control) | <img src="images/1_101_eli-edit/notebook.svg" alt="Notebook" style="height: 18px"> <br> [Notebooks &darr;](#notebooks) |
|----------|----------|----------|----------|
| <br> Group and manage related tools by combining them in a tool set.  <br> | <br> Expand your agent coding flow with support for prompts, resources, and sampling. <br> | <br> Assign and track work for GitHub Copilot Coding Agent from within VS Code.  <br> |  <br> Follow mode keeps your view in sync as the agent runs cells. <br> |



<br>
<br>


><br>**Use what others won’t for weeks. Influence what you’ll get next.**
<br>
[Download Insiders](https://code.visualstudio.com/insiders/) for nightly updates. Access features early and shape the next version of VS Code.
<br>
<br>
_v1.101 Released June 12, 2025_
<br>
<br>

<br>



<br>


















## Chat

<details>
<summary><strong>Chat tool sets</strong><br><em>Define tool sets through the chat UI or proposed API.
</em></summary>

<table>
<br>
<br>
<tr>
<td style="width: 60%; vertical-align: top;">
VS Code now enables you to define tool sets, either through a proposed API or through the UI. A tool set is a collection of different tools that can be used just like individual tools. Tool sets make it easier to group related tools together, and quickly enable or disable them in agent mode.

For instance, the tool set below is for managing GitHub notifications (using the [GitHub MCP server](https://github.com/github/github-mcp-server)).

To create a tool set, run the **Configure Tool Sets** > **Create new tool sets file** command from the Command Palette. You can then select the tools you want to include in the tool set, and provide a description and icon.

To use a tool set in a chat query, reference it by #-mentioning its name, like `#gh-news`. You can also choose it from the tool picker in the chat input box.

[Learn more &rarr;](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode#_define-tool-sets)

</td>
<td style="width: 40%; vertical-align: top;">

```json
{
  "gh-news": {
    "tools": [
      "list_notifications",
      "dismiss_notification",
      "get_notification_details",
    ],
    "description": "Manage GH notification",
    "icon": "github-project"
  }
}
```

</td>
</tr>
</table>
<br>
</details>

---









<details>
<summary><strong>MCP support for prompts</strong><br><em>Add slash prompts directly in the chat UI.</em></summary>

<table>
<br>
<br>
<tr>
<td style="width: 60%; vertical-align: top;">

VS Code's Model Context Protocol support now includes prompt support. Prompts can be defined by MCP servers to generate reusable snippets or tasks for the language model. Prompts are accessible as slash `/` commands in chat, in the format `/mcp.servername.promptname`. You can enter plain text or include command output in prompt variables, and we also support completions when servers provide it.

The following example shows how we generate a prompt using AI, save it using the [Gistpad MCP server](https://github.com/lostintangent/gistpad-mcp), and then use it to generate a changelog entry:

</td>
<td style="width: 40%; text-align: center; vertical-align: top;">

<video src="images/1_101/mcp-prompts.mp4" autoplay loop controls muted style="width: 100%; border-radius: 6px;"></video>

</td>
</tr>
</table>
<br>
</details>

---









<details>
<summary><strong>MCP support for resources</strong><br><em>Attach and reuse MCP resources with templates and context tools.

</em></summary>

<table>
<tr>
<td style="width: 60%; vertical-align: top;">

VS Code's Model Context Protocol support now includes resource support, which includes support for resource templates. It is available in several places:

1. Resources returned from MCP tool calls are available to the model and can be saved in chat, either via a **Save** button or by dragging the resource onto the Explorer view.
1. Resources can be attached as context via the **Add Context...** button in chat, then selecting **MCP Resources...**.
1. You can browse and view resources across servers using the **MCP: Browse Resources** command or for a server by its entry in the **MCP: List Servers** command.

Here's an example of attaching resources from the [Gistpad MCP server](https://github.com/lostintangent/gistpad-mcp) to chat:

</td>
<td style="width: 40%; text-align: center; vertical-align: top;">

<video src="images/1_101/mcp-resources.mp4" autoplay loop controls muted style="width: 100%; border-radius: 6px;"></video>

</td>
</tr>
</table>
<br>
</details>

<br>
<br>
<br>


## MCP

<details>
<summary><strong>Chat tool sets</strong><br><em>Define tool sets through the chat UI or proposed API.
</em></summary>

<table>
<br>
<br>
<tr>
<td style="width: 60%; vertical-align: top;">
VS Code now enables you to define tool sets, either through a proposed API or through the UI. A tool set is a collection of different tools that can be used just like individual tools. Tool sets make it easier to group related tools together, and quickly enable or disable them in agent mode.

For instance, the tool set below is for managing GitHub notifications (using the [GitHub MCP server](https://github.com/github/github-mcp-server)).

To create a tool set, run the **Configure Tool Sets** > **Create new tool sets file** command from the Command Palette. You can then select the tools you want to include in the tool set, and provide a description and icon.

To use a tool set in a chat query, reference it by #-mentioning its name, like `#gh-news`. You can also choose it from the tool picker in the chat input box.

[Learn more &rarr;](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode#_define-tool-sets)

</td>
<td style="width: 40%; vertical-align: top;">

```json
{
  "gh-news": {
    "tools": [
      "list_notifications",
      "dismiss_notification",
      "get_notification_details",
    ],
    "description": "Manage GH notification",
    "icon": "github-project"
  }
}
```

</td>
</tr>
</table>
<br>
</details>

---









<details>
<summary><strong>Prompt support</strong><br><em>Add slash prompts directly in the chat UI.</em></summary>

<table>
<br>
<br>
<tr>
<td style="width: 60%; vertical-align: top;">

VS Code's Model Context Protocol support now includes prompt support. Prompts can be defined by MCP servers to generate reusable snippets or tasks for the language model. Prompts are accessible as slash `/` commands in chat, in the format `/mcp.servername.promptname`. You can enter plain text or include command output in prompt variables, and we also support completions when servers provide it.

The following example shows how we generate a prompt using AI, save it using the [Gistpad MCP server](https://github.com/lostintangent/gistpad-mcp), and then use it to generate a changelog entry:

</td>
<td style="width: 40%; text-align: center; vertical-align: top;">

<video src="images/1_101/mcp-prompts.mp4" autoplay loop controls muted style="width: 100%; border-radius: 6px;"></video>

</td>
</tr>
</table>
<br>
</details>

---









<details>
<summary><strong>MCP support for resources</strong><br><em>Attach and reuse MCP resources with templates and context tools.

</em></summary>

<table>
<br>
<br>
<tr>
<td style="width: 60%; vertical-align: top;">

VS Code's Model Context Protocol support now includes resource support, which includes support for resource templates. It is available in several places:

1. Resources returned from MCP tool calls are available to the model and can be saved in chat, either via a **Save** button or by dragging the resource onto the Explorer view.
1. Resources can be attached as context via the **Add Context...** button in chat, then selecting **MCP Resources...**.
1. You can browse and view resources across servers using the **MCP: Browse Resources** command or for a server by its entry in the **MCP: List Servers** command.

Here's an example of attaching resources from the [Gistpad MCP server](https://github.com/lostintangent/gistpad-mcp) to chat:

</td>
<td style="width: 40%; text-align: center; vertical-align: top;">

<video src="images/1_101/mcp-resources.mp4" autoplay loop controls muted style="width: 100%; border-radius: 6px;"></video>

</td>
</tr>
</table>
<br>
</details>

<br>
<br>
<br>


## More
<details>
<summary style="font-size: 1.5rem; font-weight: 600; margin-top: 1rem;">Extension Authoring</summary>
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 600; margin-top: 1rem;">Proposed API</summary>
</details>

<details>
<summary style="font-size: 1.5rem; font-weight: 600; margin-top: 1rem;">Engineering</summary>
</details>


