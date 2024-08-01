---
Order: 10
Area: advancedcontainers
TOCTitle: Use Docker or Kubernetes
PageTitle: Use Docker or Kubernetes from a container
ContentId: d324a29d-3f64-4331-9c34-a283719e9d7b
MetaDescription: Use Docker or Kubernetes from a container
DateApproved: 08/01/2024
---
# Use Docker or Kubernetes from a container

While you can build, deploy, and debug your application inside a dev container, you may also need to test it by running it inside a set of production-like containers. Fortunately, by installing the needed Docker or Kubernetes CLIs and mounting your local Docker socket, you can build and deploy your app's container images from inside your dev container.

Once the needed CLIs are in place, you can also work with the appropriate container cluster using the [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension or the [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extension.

See the following example Dev Container Templates for additional information on a specific scenario. To add them to your project, **open the folder** you want to work with in VS Code and run the **Dev Containers: Add Dev Container Configuration Files...** command in the Command Palette (`kbstyle(F1)`).

You'll be prompted to pick a pre-defined container configuration from our [first-party and community index](https://containers.dev/templates) in a filterable list sorted based on your folder's contents. From the VS Code UI, you may select one of the Templates described in the sections below.

**Running Docker or Minikube in a development container**

* [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker) - Illustrates how to run Docker (or Moby) entirely inside a container. Provides support for bind mounting all folders inside the development container, but cannot reuse your local machine's cache.

* [Kubernetes - Minikube-in-Docker](https://aka.ms/vscode-remote/samples/kubernetes-helm-minikube) - Illustrates how to run Minikube entirely inside a container with similar benefits and limitations as Docker-in-Docker.

**Accessing an existing Docker or Minikube instance from a container**

* [Docker-from-Docker](https://aka.ms/vscode-remote/samples/docker-from-docker) - Also known as "Docker-outside-of-Docker", this illustrates how you can use the Docker (or Moby) CLI in your dev container to connect to your host's Docker daemon by bind mounting the Docker Unix socket. Lower overhead and can reuse your machine's cache, but has [bind mounting limitations](#mounting-host-volumes-with-docker-from-inside-a-container).

* [Docker-from-Docker Compose](https://aka.ms/vscode-remote/samples/docker-from-docker-compose) - Variation of Docker-from-Docker for situations where you are using Docker Compose instead of a single Dockerfile.

* [Kubernetes - Local Configuration](https://aka.ms/vscode-remote/samples/kubernetes-helm) - Takes the Docker-from-Docker model and adds kubectl and Helm to illustrate how you can access a local Minikube or Docker provided Kubernetes cluster.

There is also documentation on the [Docker-in-Docker](https://github.com/devcontainers/features/tree/main/src/docker-in-docker), [Docker-from-Docker](https://github.com/devcontainers/features/tree/main/src/docker-from-docker), and [Kubernetes](https://github.com/devcontainers/features/tree/main/src/kubectl-helm-minikube) install scripts that you can reuse and are referenced by the samples above.

## Mounting host volumes with Docker from inside a container

When following the [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker) model, using the Docker CLI from inside a dev container will cause it to interact with a Docker daemon running in the same place. This means that you can "bind" mount anything inside the dev container into the "inner" containers you create.

For example, this will "just work":

```bash
docker run -v /workspace/examplefile.txt:/incontainer/path debian
```

However, if you want to bind mount a host folder available into this inner container, you need to [mount it](/remote/advancedcontainers/add-local-file-mount.md) into your dev container first.

With [Docker-from-Docker](https://aka.ms/vscode-remote/samples/docker-from-docker), the type of bind mounting that works by default is reversed. Here, the Docker CLI inside the container interacts with the host's Docker daemon instead. This affects mounting directories from inside the container as the path inside the container may not match the path of the directory on the host.

The same example above will fail since the path on the host, outside the container isn't `/workspace/...`. In addition, some folders simply cannot be mounted because they only exist in the container. If you need to do this, you may find the Docker-in-Docker model fits your needs better.

If you are opening a folder in a container, you can pass the host directory into the container as an environment variable to allow you to mount the workspace folder. (This does not, however, work if you used a volume - Docker-in-Docker is the best choice there.) To do so, add the following to `devcontainer.json`:

```json
  "remoteEnv": {
    // Pass in the host directory for Docker mount commands from inside the container
    "HOST_PROJECT_PATH": "${localWorkspaceFolder}"
  }
```

The example below is from a `makefile` and mounts the `KUBECONFIG` file from the development container into the new Docker container it starts:

```make
docker run -p 8089:8089 -p 9090:9090 -v $(shell echo ${KUBECONFIG} | sed s#/workspace#${HOST_PROJECT_PATH}#):/kubeconfig.json -e KUBECONFIG=/kubeconfig.json ${IMG} -f behaviours/run_submit_locust.py
```
