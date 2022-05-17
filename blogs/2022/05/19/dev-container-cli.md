---
Order: 73
TOCTitle: Dev container CLI
PageTitle: Development Container CLI
MetaDescription: Provide a consistent development environment anywhere using the development container CLI.
Date: 2022-05-19
Author: Brigit Murtaugh
---

# A consistent environment anywhere with the dev container CLI

May 19, 2022 by Brigit Murtaugh, [@BrigitMurtaugh](https://twitter.com/BrigitMurtaugh)

## TLDR;

We’ve released a dev container CLI as part of the new Development Containers Specification. We’d love your feedback in [this issue](https://github.com/devcontainers/cli/issues/7), or new issues and PRs in the repo.

## Context
A consistent, predictable environment is key to a productive and enjoyable software development experience.

Containers have historically been used to standardize apps when they’re deployed, but there’s a great opportunity to support additional scenarios, including continuous integration, test automation, and full-featured coding environments. A development container provides this full-featured coding environment and ensures your project has the tools and software it needs, whether it’s complex and distributed or just has a few requirements.

![Diagram comparing dev versus production containers](dev-container-stages.png)

We’ve supported dev containers in Visual Studio Code since [the announcement](https://code.visualstudio.com/blogs/2019/05/02/remote-development) of the [Remote-Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) in 2019, and in [GitHub Codespaces](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/introduction-to-dev-containers). This support is backed by **devcontainer.json**, a structured JSON with Comments (jsonc) metadata format to configure a containerized environment.

As containerizing production workloads becomes commonplace, dev containers have become broadly useful for scenarios beyond VS Code. We’re excited to announce we’ve started work on the **Development Containers Specification**, which empowers anyone in any tool to configure a consistent dev environment. Today, we’re excited to share a major component of this spec you can now try, which is the **dev container CLI**.

## What is the dev container CLI?

The dev container CLI is a reference implementation for the dev container spec.

When tools like VS Code and Codespaces detect a devcontainer.json file in a user’s project, they use a CLI to configure a dev container. We’ve now opened up this CLI as a reference implementation so that individual users and other tools can read in devcontainer.json metadata and create dev containers from it.

This CLI can either be used directly or integrated into product experiences, like how it’s integrated with Remote-Containers and Codespaces today. It currently supports both a simple single container option and integrating with [Docker Compose](https://docs.docker.com/compose/) for multi-container scenarios.

The CLI is available in a new repo you can check out [here](https://github.com/devcontainers/cli). You can read more about its development in [this issue in our spec repo](https://github.com/devcontainers/spec/issues/9).

## How can I try it?

We’d love for you to try out the dev container CLI and let us know what you think. You can quickly try it out in just a few simple steps, either by installing its npm package or building the CLI repo from sources.

### npm install

```bash
npm install -g @devcontainers/cli
```

### Building the repo from sources

#### Set up

The CLI repository has a [dev container configuration](https://github.com/devcontainers/cli/tree/main/.devcontainer), which you can use to ensure you have the right dependencies installed.

#### Clone and compile

Start off by cloning the CLI repo, then compile it with yarn:

```bash
git clone https://github.com/devcontainers/cli
yarn
yarn compile
```

Verify you can run the CLI and see its help text:

```bash
node devcontainer.js --help
```

The output:

```bash
devcontainer <command>

Commands:
  devcontainer up                   Create and run dev container
  devcontainer build [path]         Build a dev container image
  devcontainer run-user-commands    Run user commands
  devcontainer read-configuration   Read configuration
  devcontainer exec <cmd> [args..]  Execute a command on a running dev container

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

### Try the CLI
Once you have the CLI through npm or building from sources, you can try it out with a sample project, like this [Rust sample](https://github.com/microsoft/vscode-remote-try-rust).

Clone the Rust sample to the repo's parent folder and start a dev container:

```bash
git clone https://github.com/microsoft/vscode-remote-try-rust ../vscode-remote-try-rust
node devcontainer.js up --workspace-folder ../vscode-remote-try-rust
```

This will download the container image from a container registry and start the container. Your Rust container should now be running:

```bash
[88 ms] dev-containers-cli 0.1.0.
[165 ms] Start: Run: docker build -f /home/node/vscode-remote-try-rust/.devcontainer/Dockerfile -t vsc-vscode-remote-try-rust-89420ad7399ba74f55921e49cc3ecfd2 --build-arg VARIANT=bullseye /home/node/vscode-remote-try-rust/.devcontainer
[+] Building 0.5s (5/5) FINISHED
 => [internal] load build definition from Dockerfile                       0.0s
 => => transferring dockerfile: 38B                                        0.0s
 => [internal] load .dockerignore                                          0.0s
 => => transferring context: 2B                                            0.0s
 => [internal] load metadata for mcr.microsoft.com/vscode/devcontainers/r  0.4s
 => CACHED [1/1] FROM mcr.microsoft.com/vscode/devcontainers/rust:1-bulls  0.0s
 => exporting to image                                                     0.0s
 => => exporting layers                                                    0.0s
 => => writing image sha256:39873ccb81e6fb613975e11e37438eee1d49c963a436d  0.0s
 => => naming to docker.io/library/vsc-vscode-remote-try-rust-89420ad7399  0.0s
[1640 ms] Start: Run: docker run --sig-proxy=false -a STDOUT -a STDERR --mount type=bind,source=/home/node/vscode-remote-try-rust,target=/workspaces/vscode-remote-try-rust -l devcontainer.local_folder=/home/node/vscode-remote-try-rust --cap-add=SYS_PTRACE --security-opt seccomp=unconfined --entrypoint /bin/sh vsc-vscode-remote-try-rust-89420ad7399ba74f55921e49cc3ecfd2-uid -c echo Container started
Container started
{"outcome":"success","containerId":"f0a055ff056c1c1bb99cc09930efbf3a0437c54d9b4644695aa23c1d57b4bd11","remoteUser":"vscode","remoteWorkspaceFolder":"/workspaces/vscode-remote-try-rust"}
```

You can then run commands in this dev container:

```bash
node devcontainer.js exec --workspace-folder ../vscode-remote-try-rust cargo run
```

This will compile and run the Rust sample, outputting:

```bash
[33 ms] dev-containers-cli 0.1.0.
   Compiling hello_remote_world v0.1.0 (/workspaces/vscode-remote-try-rust)
    Finished dev [unoptimized + debuginfo] target(s) in 1.06s
     Running `target/debug/hello_remote_world`
Hello, VS Code Remote - Containers!
{"outcome":"success"}
```

Congrats, you’ve just run the dev container CLI and seen it in action!

These steps are also provided in the CLI repo’s [readme](https://github.com/devcontainers/cli/blob/main/README.md).

## How can I get involved?

Your feedback is incredibly helpful in shaping and expanding the spec, and we’d love your feedback on the CLI so far. Please check out the CLI and let us know what you think. We’ve [opened an issue](https://github.com/devcontainers/cli/issues/7) specifically for folks to leave comments and questions, and you can also certainly also open new issues or PRs in the repo, just like other open-source projects.

The CLI and overall specification are under active development, so stay tuned for exciting new advancements. We’ll continue providing updates and info about what you can try out and when.

We’re incredibly excited for the future of container-based development and can’t wait to hear your feedback. We look forward to providing a ubiquitous, productive format across tools and users.

Happy Coding!

The VS Code Team, [@code](https://twitter.com/code)