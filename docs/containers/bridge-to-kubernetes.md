---
Order: 11
Area: containers
TOCTitle: Develop with Kubernetes
ContentId: 80bd336b-0d2d-4d63-a771-8b3ea22a64d3
PageTitle: Use Bridge to Kubernetes to run and debug locally with Kubernetes
DateApproved: 07/22/2020
MetaDescription: Learn how to use Bridge to Kubernetes to connect your development computer to a Kubernetes cluster
---

# Use Bridge to Kubernetes with Visual Studio Code

Bridge to Kubernetes allows you to run and debug code on your development computer, while still connected to your Kubernetes cluster with the rest of your application or services. For example, if you have a large microservices architecture with many interdependent services and databases, replicating those dependencies on your development computer can be difficult. Additionally, building and deploying code to your Kubernetes cluster for each code change during inner-loop development can be slow, time consuming, and difficult to use with a debugger.

Bridge to Kubernetes avoids having to build and deploy your code to your cluster by instead creating a connection directly between your development computer and your cluster. Connecting your development computer to your cluster while debugging allows you to quickly test and develop your service in the context of the full application without creating any Docker or Kubernetes configuration.

Bridge to Kubernetes redirects traffic between your connected Kubernetes cluster and your development computer. This traffic redirection allows code on your development computer and services running in your Kubernetes cluster to communicate as if they are in the same Kubernetes cluster. Bridge to Kubernetes also provides a way to replicate environment variables and mounted volumes available to pods in your Kubernetes cluster in your development computer. Providing access to environment variables and mounted volumes on your development computer allows you to quickly work on your code without having to replicate those dependencies manually.

In this guide, you will learn how to use Bridge to Kubernetes to redirect traffic between your Kubernetes cluster and code running on your development computer. This guide also provides a script for deploying a large sample application with multiple microservices on a Kubernetes cluster.

## Before you begin

This article assumes you already have your own cluster with a microservices architecture and you want to debug one of the pods in your cluster. If you're using MiniKube running locally and want to learn how to use Bridge to Kubernetes with an existing sample application, see [Use Bridge to Kubernetes with MiniKube](/docs/containers/minikube.md). If you are using Azure Kubernetes service and want to use an existing sample application, see [Bridge to Kubernetes (AKS)](bridge-to-kubernetes-aks.md).

### Prerequisites

* A Kubernetes cluster with an app that you want to debug.
* [Visual Studio Code][vs-code] running on macOS, Windows 10, or Linux (currently in preview).
* The [Bridge to Kubernetes][btk-vs-code] extension installed in Visual Studio Code.

> **Note** Although this quickstart works with Azure Kubernetes Service (AKS), you can also try Bridge to Kubernetes with other Kubernetes clusters. Support for other clusters is in preview.

## Connect to your cluster and debug a service

On your development computer, download and configure the Kubernetes CLI to connect to your Kubernetes cluster using the cluster-specific command.

Install dependencies by running `npm install` in a terminal window (CTRL + ~).

```cmd
npm install
```

Open the workspace for the app you want to debug in Visual Studio Code. Open the Kubernetes extension and select the namespace in the your cluster. Right-click its node, and choose **Use Namespace**.

![Select Namespace](images/minikube/select-namespace.png)

Open the Command Palette (`kb(workbench.action.showCommands)`), and run the command **Bridge to Kubernetes: Configure** to start the configuration process.

Choose your service.

![Select the service to connect to](images/minikube/select_service.png)

All traffic in the Kubernetes cluster is redirected for your service to the version of your application running in your development computer. Bridge to Kubernetes also routes all outbound traffic from the application back to your Kubernetes cluster.

> **Important**: You can only redirect services that have a single pod.

After you select your service, you are prompted to enter the TCP port for your local application.

![Enter the port number](images/minikube/enter_port.png)

Choose the launch task appropriate for the type of app.

![Choose the debugger launch task](images/minikube/launch_task.png)

> **Note**: You will be prompted to allow the **EndpointManager** to run elevated and modify your hosts file.

You have the option of running isolated or not isolated. If you run isolated, only your requests are routed to your local process; other developers can use the cluster without being affected. If you don't run isolated, all traffic is redirected to your local process. For more information on this option, see [Using routing capabilities for developing in isolation][btk-overview-routing].

![Choose isolation](images/minikube/isolation.png)

Select the **Debug** icon on the left and select **Launch via NPM with Kubernetes** at the top.

![Choose debug launch profile](images/minikube/debug_profile.png)

Your development computer is connected when the VS Code status bar turns orange and the Kubernetes extension shows you are connected.

![Debugging with Bridge to Kubernetes](images/minikube/debugging.png)

> **Note**: On subsequent launches, you will not be prompted for the service name, port, launch task, or whether to run isolated. These values are saved in `.vscode/tasks.json`. To change these settings later, open the Command Palette (`kb(workbench.action.showCommands)`), and run the command **Bridge to Kubernetes: Configure**.

Once your development computer is connected, traffic starts redirecting to your development computer for the service you are replacing.

## Set a break point

Set a breakpoint with `kb(editor.debug.action.toggleBreakpoint)` or selecting **Run** then **Toggle Breakpoint**.

Navigate to the sample application by opening the public URL. When your code reaches the breakpoint, it should open in the debugger. To resume the service, hit `kb(workbench.action.debug.run)` or select **Run** then **Continue**. Return to your browser and verify you see a placeholder image for the bike.

### Update your application

When you make code changes locally, whether or not they are visible to others who are using the cluster depends on whether you are running isolated or not. If you're running isolated, you can make changes that don't affect other users.

Edit your code, save your changes, and press `kb(workbench.action.debug.restart)` or select **Run** then **Restart Debugging**. After you are reconnected, refresh your browser and validate your changes.

Select **Run** then **Stop Debugging** or press `kb(workbench.action.debug.stop)` to stop the debugger.

> **Note**: By default, stopping the debugging task also disconnects your development computer from your Kubernetes cluster. You can change this behavior by searching for **Bridge to Kubernetes: Disconnect After Debugging** in the Visual Studio Code settings and removing the check next to **Disconnect automatically when Debugging ends**. After updating this setting, your development computer will remain connected when you stop and start debugging. To disconnect your development computer from your cluster, click on the Bridge to Kubernetes extension on the status bar then choose **Disconnect current session**.

## Additional configuration

Bridge to Kubernetes can handle routing traffic and replicating environment variables without any additional configuration. If you need to download any files that are mounted to the container in your Kubernetes cluster, such as a ConfigMap file, you can create a `KubernetesLocalProcessConfig.yaml` to download those files to your development computer. For more information, see [Configure Bridge to Kubernetes][kubernetesLocalProcessConfig-yaml].

## Using logging and diagnostics

Logging output is written to the **Bridge to Kubernetes** window after your development computer is connected to your Kubernetes cluster.

Click on the **Kubernetes** Status bar and choose **Show connection diagnostics information**. This command prints the current environment variables and DNS entires in the logging output.

Additionally, you can find the diagnostic logs in the `Bridge to Kubernetes` directory in your development computer's TEMP directory. On Windows 10, that's in `%TEMP%\Bridge to Kubernetes`. On a Mac, the TEMP directory can be found by running `echo $TMPDIR` from a terminal window. On Linux, it is `/tmp/Bridge to Kubernetes`.

## Running in isolation mode

With Bridge to Kubernetes, you can also set up an isolated version the services you're working on, meaning that others who are using the cluster won't be affected by your changes. This isolation mode is accomplished by routing your requests to your copy of each affected service, but routing all other traffic normally. More explanation on how this is done can be found at [How Bridge to Kubernetes Works][btk-overview-routing].

## Troubleshooting

 If you get this error when activating the Bridge to Kubernetes extension:

"Failed to update dependencies: maximum number of retries exceeded"

 First, retry the activation using the button. If it repeatedly does not succeed, see [https://github.com/microsoft/mindaro/issues/32](https://github.com/microsoft/mindaro/issues/32).

## Next steps

Learn more about Bridge to Kubernetes at [How Bridge to Kubernetes works][btk-how-it-works].

[azure-kubernetes-service]: https://docs.microsoft.com/azure/aks/kubernetes-walkthrough
[azds-cli]: https://docs.microsoft.com/azure/dev-spaces/how-to/install-dev-spaces#install-the-client-side-tools
[azds-tmp-dir]: https://docs.microsoft.com/azure/dev-spaces/troubleshooting#before-you-begin
[btk-vs-code]: https://marketplace.visualstudio.com/items?itemName=mindaro.mindaro
[azure-cli]: https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest
[azure-cloud-shell]: https://docs.microsoft.com/azure/cloud-shell/overview
[az-aks-get-credentials]: https://docs.microsoft.com/cli/azure/aks?view=azure-cli-latest#az-aks-get-credentials
[az-aks-vs-code]: https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-aks-tools
[preview-terms]: https://azure.microsoft.com/support/legal/preview-supplemental-terms/
[supported-regions]: https://azure.microsoft.com/global-infrastructure/services/?products=kubernetes-service
[troubleshooting]: https://docs.microsoft.com/azure/dev-spaces/troubleshooting#fail-to-restore-original-configuration-of-deployment-on-cluster
[vs-code]: https://code.visualstudio.com/download
[kubernetesLocalProcessConfig-yaml]: https://docs.microsoft.com/visualstudio/containers/configure-bridge-to-kubernetes
[btk-how-it-works]: https://docs.microsoft.com/visualstudio/containers/overview-bridge-to-kubernetes
[btk-overview-routing]: https://docs.microsoft.com/visualstudio/containers/overview-bridge-to-kubernetes#using-routing-capabilities-for-developing-in-isolation
