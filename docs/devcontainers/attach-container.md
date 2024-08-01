---
Order: 10
Area: devcontainers
TOCTitle: Attach to Container
PageTitle: Attach to a running container using Visual Studio Code Remote Development
ContentId: ed14ef07-f44c-4675-b95b-cb5faffc7abb
MetaDescription: Attach to a running container using Visual Studio Code Remote Development
DateApproved: 08/01/2024
---
# Attach to a running container

Visual Studio Code can create and start containers for you but that may not match your workflow and you may prefer to "attach" VS Code to an already running Docker container - regardless of how it was started. Once attached, you can install extensions, edit, and debug like you can when you open a folder in a container using [devcontainer.json](https://containers.dev/implementors/json_reference).

## Attach to a Docker container

To attach to a Docker container, either select **Dev Containers: Attach to Running Container...** from the Command Palette (`kbstyle(F1)`) or use the **Remote Explorer** in the Activity Bar and from the **Containers** view, select the **Attach to Container** inline action on the container you want to connect to.

![Containers Explorer screenshot](images/attach-container/containers-attach.png)

> **Note:** When using Alpine Linux containers, some extensions may not work due to `glibc` dependencies in native code inside the extension.

## Attached container configuration files

VS Code supports image or container name-level configuration files to speed up setup when you repeatedly connect to a given Docker container. Once attached, anytime you open a folder, [install an extension](/docs/devcontainers/containers.md#managing-extensions), or [forward a port](/docs/devcontainers/containers.md#forwarding-or-publishing-a-port), a local image-specific configuration file will automatically be updated to remember your settings so that when you attach again, everything is back to the right place.

* By default, an **image-level** configuration is used. To view or update it after attaching, select **Dev Containers: Open Container Configuration File** from the Command Palette (`kbstyle(F1)`).

* If you would prefer to tie your configuration to a **container name**, select **Dev Containers: Open Named Configuration File** from the Command Palette (`kbstyle(F1)`) after attaching. Any updates from this point forward will apply to this name-level configuration rather than at the image level.

Both of these files support a subset of `devcontainer.json` properties:

```json
{
    // Default path to open when attaching to a new container.
    "workspaceFolder": "/path/to/code/in/container/here",

    // Set *default* container specific settings.json values on container create.
    "settings": {
        "terminal.integrated.defaultProfile.linux": "bash"
    },

    // Add the IDs of extensions you want installed when the container is created.
    "extensions": [
        "dbaeumer.vscode-eslint"
    ],

    // An array port numbers to forward
    "forwardPorts": [8000],

    // Container user VS Code should use when connecting
    "remoteUser": "vscode",

    // Set environment variables for VS Code and sub-processes
    "remoteEnv": { "MY_VARIABLE": "some-value" }
}
```

See the [attached container config reference](#attached-container-configuration-reference) for a complete list of properties and their uses.

Once saved, whenever you open a container for the first time with the same image / container name, these properties will be used to configure the environment.

> **Tip:** If something is wrong with your configuration, you can also edit it when not attached to the container by selecting **Dev Containers: Open Attached Container Configuration File...** from the Command Palette (`kbstyle(F1)`) and then picking the image / container name from the presented list.

Finally, if you have extensions you want installed regardless of the container you attach to, you can update `settings.json` to specify a list of [extensions that should always be installed](/docs/devcontainers/containers.md#always-installed-extensions).

## Attached container configuration reference

Attached container configuration files are similar to [devcontainer.json](https://containers.dev/implementors/json_reference) and supports a subset of its properties.

| Property | Type | Description |
|----------|------|-------------|
| `workspaceFolder` | string | Sets the default path that VS Code should open when connecting to the container (which is often the path to a volume mount where the source code can be found in the container). Not set by default (an empty window is opened). |
| `extensions` | array | An array of extension IDs that specify the extensions that should be installed inside the container when it is created. Defaults to `[]`. |
| `settings` | object | Adds default `settings.json` values into a container/machine specific settings file.  |
| `forwardPorts` | array | A list of ports that should be forwarded from inside the container to the local machine. |
| `portsAttributes` | object | Object that maps a port number, `"host:port"` value, range, or regular expression to a set of default options. See [port attributes](https://containers.dev/implementors/json_reference/#port-attributes) for available options. For example: <br />`"portsAttributes": {"3000": {"label": "Application port"}}` |
| `otherPortsAttributes` | object | Default options for ports, port ranges, and hosts that aren't configured using `portsAttributes`. See [port attributes](https://containers.dev/implementors/json_reference/#port-attributes) for available options. For example: <br /> `"otherPortsAttributes": {"onAutoForward": "silent"}` |
| `remoteEnv` | object | A set of name-value pairs that sets or overrides environment variables for VS Code (or sub-processes like terminals) but not the container as a whole. Environment and [pre-defined variables](#variables-in-attached-container-configuration-files) may be referenced in the values.<br>For example: `"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |
| `remoteUser` | string | Overrides the user that VS Code runs as in the container (along with sub-processes like terminals, tasks, or debugging). Defaults to the user the container as a whole is running as (often `root`). |
| `userEnvProbe` | enum | Indicates the type of shell to use to "probe" for user environment variables to include in VS Code or other connected tool's processes: `none`, `interactiveShell`, `loginShell`, or `loginInteractiveShell` (default). The specific shell used is based on the default shell for the user (typically bash). For example, bash interactive shells will typically include variables set in `/etc/bash.bashrc` and `~/.bashrc` while login shells usually include variables from `/etc/profile` and `~/.profile`. Setting this property to `loginInteractiveShell` will get variables from all four files. |
| `postAttachCommand` | string,<br>array | A command string or list of command arguments to run after VS Code attaches to the container. Use `&&` in a string to execute multiple commands. For example, `"yarn install"` or `"apt-get update && apt-get install -y curl"`. The array syntax `["yarn", "install"]` will invoke the command (in this case `yarn`) directly without using a shell. Not set by default. <br>Note that the array syntax will execute the command without a shell. You can [learn more](https://containers.dev/implementors/json_reference/#formatting-string-vs-array-properties) about formatting string vs array properties. |

### Variables in attached container configuration files

Variables can be referenced in certain string values in attached configuration files in the following format: **${variableName}**. The following table is a list of available variables you can use.

| Variable | Properties | Description |
|----------|---------|----------------------|
| `${containerEnv:VAR_NAME}` | `remoteEnv` | Value of an existing environment variable inside the container (in this case, `VAR_NAME`) once it is up and running. For example: `"remoteEnv": { "PATH": "${containerEnv:PATH}:/some/other/path" }` |

## Attach to a container in a Kubernetes cluster

To attach to a container in a Kubernetes cluster, first install the [Kubernetes extension](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) and `kubectl` along with the Dev Containers extension. Then select the Kubernetes explorer from the Activity bar and expand the cluster and Pod where the container you want to attach to resides. Finally, right-click on the container and select **Attach Visual Studio Code** from context menu.

> **Note:** Attached container configuration files are not yet supported for containers in a Kubernetes cluster.

![Attach to Kubernetes Container](images/attach-container/k8s-attach.png)

## Next steps

* [Create a Dev Container](/docs/devcontainers/create-dev-container.md) - Create a custom container for your work environment.
* [Advanced Containers](/remote/advancedcontainers/overview.md) - Find solutions to advanced container scenarios.
* [devcontainer.json reference](https://containers.dev/implementors/json_reference) - Review the `devcontainer.json` schema.
