---
Order: 14
Area: advancedcontainers
TOCTitle: Reduce Docker warnings
PageTitle: Reduce Docker container build warnings
ContentId: 19d0127f-c27b-4bee-9a19-68c93dc63922
MetaDescription: Reduce Docker container build warnings
DateApproved: 08/01/2024
---
# Reduce Docker build warnings

The following are some tips for eliminating warnings that may be appearing in your Dockerfile builds.

## debconf: delaying package configuration, since apt-utils is not installed

This error can typically be safely ignored and is tricky to get rid of completely. However, you can reduce it to one message in stdout when installing the needed package by adding the following to your Dockerfile:

```docker
RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1
```

## Warning: apt-key output should not be parsed (stdout is not a terminal)

This non-critical warning tells you not to parse the output of `apt-key`, so as long as your script doesn't, there's no problem. You can safely ignore it.

This occurs in Dockerfiles because the `apt-key` command is not running from a terminal. Unfortunately, this error cannot be eliminated completely, but can be hidden unless the `apt-key` command returns a non-zero exit code (indicating a failure).

For example:

```docker
# (OUT=$(apt-key add - 2>&1) || echo $OUT) will only print the output with non-zero exit code is hit
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | (OUT=$(apt-key add - 2>&1) || echo $OUT)
```

You can also set the `APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE` environment variable to suppress the warning, but it looks a bit scary so be sure to add comments in your Dockerfile if you use it:

```docker
# Suppress an apt-key warning about standard out not being a terminal. Use in this script is safe.
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn
```

## Information messages appearing in red

Some CLIs output certain information (like debug details) to standard error instead of standard out. These will appear in red in Visual Studio Code's terminal and output logs.

If the messages are harmless, you can pipe the output of the command from standard error to standard out instead by appending `2>&1` to the end of the command.

For example:

```docker
RUN apt-get -y install --no-install-recommends apt-utils dialog 2>&1
```

If the command fails, you will still be able to see the errors but they won't be in red.

## Avoiding problems with images built using Docker

Given Dockerfiles and Docker Compose files can be used without VS Code or the `devcontainer` CLI, you may want to let users know that they should not try to build the image directly if it will not work as expected. To solve this problem, you can add a build argument that needs to be specified for things to work.

For example, you could add the following to your Dockerfile:

```bash
ARG vscode
RUN if [[ -z "$devcontainercli" ]] ; then printf "\nERROR: This Dockerfile needs to be built with VS Code !" && exit 1; else printf "VS Code is detected: $devcontainercli"; fi
```

And the following in your `devcontainer.json`:

```json
"build": {
      "dockerfile": "Dockerfile",
      "args": {
          // set devcontainer-cli arg for Dockerfile
          "devcontainercli": "true"
      },
    }
```

In the Docker Compose case, you can add this argument to a separate [override file to extend your configuration](/docs/devcontainers/create-dev-container.md#extend-your-docker-compose-file-for-development) that is located in a different place in your source tree than the primary Docker Compose file.
