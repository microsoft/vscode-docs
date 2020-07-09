---
Order: 4
Area: containers
TOCTitle: Run in container
PageTitle: Run an application in a container with Visual Studio Code
MetaDescription: Run an application in a container with Visual Studio Code
DateApproved: 7/9/2020
---
# Check your environment

One of the useful things about developing in a container is that you can use specific versions of dependencies that your application needs without impacting your local development environment.

The specific container for this tutorial has Node.js v10 installed, which you can check by opening a new terminal **Terminal** > **New Terminal** (`kb(workbench.action.terminal.new)`) and entering:

```bash
node --version; npm --version
```

This should show the following versions:

![Node.js version check](images/containers/version-check.png)

## Run the application

We can now hit `kb(workbench.action.debug.start)` which will run the application inside the container. Once the process starts, navigate to http://localhost:3000 and you should see the simple Node.js server running!

![Running the application](images/containers/hello-remote-world.png)

## Let us know how it went

At this point, you're running and developing fully in a containerized environment!

We'd love to hear your feedback by answering a short survey.

> <a class="tutorial-install-extension-btn" href="https://www.research.net/r/remoteContainer">Take the Remote Containers survey</a>

## Ending your container connection

You can end your session in the container and go back to running VS Code locally with **File** > **Close Remote Connection**.

## Next steps

If you would like to learn how the Remote - Containers extension sets up and configures your containers, read the next [How it works](/remote-tutorials/containers/how-it-works) section.

----

<a class="tutorial-next-btn" href="/remote-tutorials/containers/how-it-works">Show me how it works</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-containers', 'run-in-container')" href="javascript:void(0)">I ran into an issue</a>
