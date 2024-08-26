---
Order: 3
Area: advancedcontainers
TOCTitle: Start processes
PageTitle: Start a processes when a container starts
ContentId: 5be7285b-998b-4378-bdc4-90915e858eb7
MetaDescription: Start a process when a container starts
DateApproved: 08/01/2024
---
# Start a process when the container starts

When you are working in a development container, you may want to execute a command or start something each time the container starts. The easiest way to do this is using the `postStartCommand` property in `devcontainer.json`. For example, if you wanted to run `yarn install` every time you connected to the container to keep dependencies up to date, you could add the following:

```json
"postStartCommand": "yarn install"
```

### Video: Run npm install when a container is created

<iframe width="560" height="315" src="https://www.youtube.com/embed/9qRy_kxVCK8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br><br>

In other cases, you may want to start up a process and leave it running. This can be accomplished by using `nohup` and putting the process into the background using `&`.  For example:

```json
"postStartCommand": "nohup bash -c 'your-command-here &'"
```

### Video: Run 'npm start' whenever the container is started

<iframe width="560" height="315" src="https://www.youtube.com/embed/zFzPnWgBx_I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br><br>

Those familiar with Linux may expect to be able to use the `systemctl` command to start and stop background services managed by something called `systemd`. Unfortunately, `systemd` has overhead and is generally not used in containers as a result.

In many cases, there is a command you can run instead (for example, `sshd`). And on Debian/Ubuntu, there are often scripts under `/etc/init.d` that you can run directly.

```json
"postStartCommand": "/etc/init.d/ssh start"
```

These systems also include a `service` command that will use `systemctl` or `/etc/init.d` scripts based on what is installed.

```json
"postStartCommand": "service ssh start"
```

### Video: Start SSH service in a container

<iframe width="560" height="315" src="https://www.youtube.com/embed/KuSNpZgDYDs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Adding startup commands to the Docker image instead

While `postStartCommand` is convenient and allows you to execute commands in your source tree, you can also add these steps instead to a Dockerfile using a custom [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint) or [CMD](https://docs.docker.com/engine/reference/builder/#cmd).

When referencing a Dockerfile in `devcontainer.json`, the default entrypoint and command is overridden. First, disable this behavior using the `overrideCommand` property.

```json
"overrideCommand": false
```

The `overrideCommand` property defaults to `true` because many images will immediately exit if a command is not specified. Instead, we will need to handle this in our Dockerfile.

Next, consider this Dockerfile:

```docker
FROM mcr.microsoft.com/devcontainers/base:1-ubuntu

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "sleep", "infinity" ]
```

The `CMD` here makes sure the container stays running by default. Keeping your startup steps in the `ENTRYPOINT` allows you to safely override the command when using `docker run` with your image or using Docker Compose. This resolves to the following:

```bash
/docker-entrypoint.sh sleep infinity
```

Next, create a `docker-entrypoint.sh` script:

```bash
#!/usr/bin/env bash

echo "Hello from our entrypoint!"

exec "$@"
```

Anything you execute in this file will then fire each time the container starts. However, it's important to include the last `exec "$@"` line since this is what will cause the command `sleep infinity` in our example to fire.

Finally, if you are using Docker Compose, be sure that neither the [entrypoint](https://docs.docker.com/compose/compose-file/compose-file-v3/#entrypoint) nor [command](https://docs.docker.com/compose/compose-file/compose-file-v3/#command) properties are set for your container.
