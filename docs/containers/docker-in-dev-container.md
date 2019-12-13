VS Code extensions run as either a "Workspace" extension (aka in the dev container) or as a "UI" extension (aka outside the dev container). By default, the Docker extension will run as a "Workspace" extension. Some features (like Intellisense and "Add Docker Files to Workspace") will continue to work whereas others (like viewing and managing images or containers) will not. You have a few options to configure the Docker extension in your remote environment.

## Option A: Two Instances of VS Code

Open up two instances of VS Code - one "remote" instance in your dev container and one normal instance outside of the container. Use the normal instance for any feature that doesn't work inside the remote instance.

## Option B: Docker as a "UI" extension

Run Docker as a "UI" extension by changing the following setting and reloading VS Code:

```json
"remote.extensionKind": {
    "ms-azuretools.vscode-docker": "ui"
}
```

This enables some features, but still not the full feature set. For any unsupported feature, you will see a warning like this:

![Screen Shot 2019-09-10 at 1 39 08 PM](https://user-images.githubusercontent.com/11282622/64651102-8a1a8780-d3d5-11e9-8536-a5ed516751fe.png)

You can switch back to a "Workspace" extension or ignore the warning and upvote [#1260](https://github.com/microsoft/vscode-docker/issues/1260), which is meant to improve this experience.

NOTE: If you think the above warning is incorrectly blocking functionality that should work, you can disable it by setting `docker.showRemoteWorkspaceWarning` to `true`.

## Option C: Docker in Docker

This is currently the only option that allows you to leverage the full feature set of the Docker extension in one instance of VS Code. However, it is the most complicated to set up. Follow the steps outlined [here](https://github.com/microsoft/vscode-dev-containers/tree/master/containers/docker-in-docker).