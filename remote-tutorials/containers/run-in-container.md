---
Order: 3
Area: containers
TOCTitle: Run in container
PageTitle: Run App in Dev Container with Visual Studio Code
MetaDescription: Run App in Dev Container with Visual Studio Code
DateApproved: 7/26/2019
---
# Check your environment

One of the useful things about developing in a container is that you can use specific versions of dependencies that your application needs without impacting your local development environment.

This specific container has Node v10, which we can check by opening a new terminal **Terminal** > **New Terminal** (`kb(workbench.action.terminal.new)`) and entering:

```bash
node --version; npm --version
```

This should show the following versions:

![Building image](images/containers/version-check.png)

## Run the application

We can now hit `kb(workbench.action.debug.start)` which will run the application inside the container. Once the process starts, navigate to http://localhost:3000 and you should see the simple Node.js server running!

![Building image](images/containers/hello-remote-world.png)

# Next steps

At this point, you're running and developing fully in a containerized environment!

If you would like to see how the extension sets up and configures your containers, read on to the next section.

Otherwise, we'd love to [hear your thoughts](https://www.research.net/r/remoteContainerFeedback) on the remote container extension.

----

<a class="tutorial-next-btn" href="/remote-tutorials/containers/how-it-works">The app is running!</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-containers', 'run-in-container')" href="javascript:void(0)">I ran into an issue</a>
