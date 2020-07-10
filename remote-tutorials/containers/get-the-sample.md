---
Order: 3
Area: containers
TOCTitle: Get the sample
PageTitle: Clone the sample Node.js repository
MetaDescription: Clone the sample Node.js GitHub repository
DateApproved: 7/9/2020
---
# Get the sample

To create a Docker container, we are going to clone a GitHub repository with a Node.js project.

```bash
git clone https://github.com/microsoft/vscode-remote-try-node
```

**Note**: There are other remote container samples such as `vscode-remote-try-python` or `vscode-remote-try-java`, but this tutorial will use `vscode-remote-try-node`.

## Open the repo in Visual Studio Code

Upon opening one of the sample projects listed above, you should see the following notification prompting you to reopen the workspace inside a dev container. Select **Reopen in Container**.

![Dev container notification](images/containers/dev-container-toast.png)

## Wait for the container to build

If this is your first time connecting, a Docker image will be downloaded, built, and starts a container with a copy of VS Code Server running. This might take a few minutes the first time, but future connections will only take seconds.

![Building image](images/containers/building-image.png)

## Check

Once the container is running and you're connected, you should see your remote context change in the bottom left of the Status bar:

![Building image](images/containers/connected.png)

----

<a class="tutorial-next-btn" href="/remote-tutorials/containers/run-in-container">I've created the container</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-containers', 'get-the-sample')" href="javascript:void(0)">I ran into an issue</a>
