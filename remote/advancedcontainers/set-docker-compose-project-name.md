---
Order: 9
Area: advancedcontainers
TOCTitle: Set Docker Compose project name
PageTitle: Set Docker Compose project name
ContentId: 3071cf6e-1a93-498a-91e9-48f439c589b3
MetaDescription: Set Docker Compose project name
DateApproved: 08/01/2024
---
# Set Docker Compose project name

Visual Studio Code will respect the value you configure for the Docker Compose [project name](https://docs.docker.com/compose/project-name/).

The top-level property `name` in the `docker-compose.yml` can be used to set the project name.

Alternatively, you can set the `COMPOSE_PROJECT_NAME` environment variable for the VS Code process, or specify it in a `.env` file in the same folder as the `docker-compose.yml`.

> **Note**: make sure to close all open VS Code windows first.

To start VS Code from the command line:

```bash
# from bash
COMPOSE_PROJECT_NAME=foo code .
```

```PowerShell
# from PowerShell
$env:COMPOSE_PROJECT_NAME=foo
code .
```

Alternatively, add the following entry to a `.env` file in the same folder as the `docker-compose.yml`:

```
COMPOSE_PROJECT_NAME=foo
```

When no project name is configured and the `docker-compose.yml` is in the `.devcontainer` folder, the Docker Compose default of using the `docker-compose.yml` folder's basename is overridden with `${project-folder-basename}_devcontainer` to avoid name collisions with other projects.
