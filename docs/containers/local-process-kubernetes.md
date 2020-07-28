---
Order: 11
Area: containers
TOCTitle: Develop with Kubernetes
ContentId: 1b347391-cb5e-46ac-8fa0-e893c13e6a24
PageTitle: Use Local Process to run and debug locally with Kubernetes
DateApproved: 07/22/2020
MetaDescription: Learn how to use Local Process with Kubernetes to connect your development computer to a Kubernetes cluster
---

# Use Local Process with Kubernetes with Visual Studio Code (preview)

Local Process with Kubernetes allows you to run and debug code on your development computer, while still connected to your Kubernetes cluster with the rest of your application or services. For example, if you have a large microservices architecture with many interdependent services and databases, replicating those dependencies on your development computer can be difficult. Additionally, building and deploying code to your Kubernetes cluster for each code change during inner-loop development can be slow, time consuming, and difficult to use with a debugger.

Local Process with Kubernetes avoids having to build and deploy your code to your cluster by instead creating a connection directly between your development computer and your cluster. Connecting your development computer to your cluster while debugging allows you to quickly test and develop your service in the context of the full application without creating any Docker or Kubernetes configuration.

Local Process with Kubernetes redirects traffic between your connected Kubernetes cluster and your development computer. This traffic redirection allows code on your development computer and services running in your Kubernetes cluster to communicate as if they are in the same Kubernetes cluster. Local Process with Kubernetes also provides a way to replicate environment variables and mounted volumes available to pods in your Kubernetes cluster in your development computer. Providing access to environment variables and mounted volumes on your development computer allows you to quickly work on your code without having to replicate those dependencies manually.

In this guide, you will learn how to use Local Process with Kubernetes to redirect traffic between your Kubernetes cluster and code running on your development computer. This guide also provides a script for deploying a large sample application with multiple microservices on a Kubernetes cluster.

> **Important**: This feature is currently in preview. Previews are made available to you on the condition that you agree to the [supplemental terms of use][preview-terms]. Some aspects of this feature may change prior to general availability (GA).

## Before you begin

This guide uses the [Bike Sharing sample application][bike-sharing-github] to demonstrate connecting your development computer to a Kubernetes cluster. If you already have your own application running on a Kubernetes cluster, you can still follow the steps below and use the names of your own services.

### Prerequisites

* An Azure subscription. If you don't have an Azure subscription, you can create a [free account](https://azure.microsoft.com/free).
* [Azure CLI installed][azure-cli].
* [Visual Studio Code][vs-code] running on macOS or Windows 10.
* The [Local Process with Kubernetes][lpk-vs-code] extension installed in Visual Studio Code.

## Create a Kubernetes cluster

Create an AKS cluster in a [supported region][supported-regions]. The below commands create a resource group called `MyResourceGroup` and an AKS cluster called `MyAKS`.

```azurecli-interactive
az group create \
    --name MyResourceGroup \
        --location eastus
az aks create \
    --resource-group MyResourceGroup \
    --name MyAKS \
    --location eastus \
    --node-count 3 \
    --generate-ssh-keys
```

## Install the sample application

Install the sample application on your cluster using the provided script. You can run this script on your development computer or using the [Azure Cloud Shell][azure-cloud-shell]. Use the name of your cluster and resource group.

> **Important**: You must have **Owner** or **Contributor** access to your cluster in order to run the script.

```azurecli-interactive
git clone https://github.com/Microsoft/mindaro
cd mindaro/
chmod +x ./local-process-quickstart.sh
./local-process-quickstart.sh -g MyResourceGroup -n MyAKS
```

Navigate to the sample application running your cluster by opening its public URL, which is displayed in the output of the installation script.

```console
$ ./local-process-quickstart.sh -g MyResourceGroup -n MyAKS
Checking directory /home/<user>/mindaro for GIT repo Microsoft/Mindaro
Setting the Kube context
...
To try out the app, open the url:
bikeapp.bikesharingweb.EXTERNAL_IP.nip.io
```

In the above sample, the public URL is `bikeapp.bikesharingweb.EXTERNAL_IP.nip.io`.

## Connect to your cluster and debug a service

On your development computer, download and configure the Kubernetes CLI to connect to your Kubernetes cluster using [az aks get-credentials][az-aks-get-credentials].

```azurecli
az aks get-credentials --resource-group MyResourceGroup --name MyAKS
```

Open `mindaro/samples/BikeSharingApp/Bikes` from the [Bike Sharing sample application][bike-sharing-github] in Visual Studio Code. Open the Azure Kubernetes Service extension and select the **bikeapp** namespace in the **MyAKS** cluster. Right-click the **bikeapp** node, and choose **Use Namespace**.

![Select Namespace](images/local-process-kubernetes-vs-code/select-namespace.png)

Use the `npm install` command to install the dependencies for the application.

```console
npm install
```

Select the **Debug** icon on the left and select **Local Process with Kubernetes (Preview)** at the top.

![Choose Local Process with Kubernetes](images/local-process-kubernetes-vs-code/choose-local-process.png)

Click on the start button next to **Local Process with Kubernetes (Preview)**. The first time you run this launch configuration you are prompted to configure the service you want to replace, the port to forward from your development computer, and the launch task to use.

Choose the **bikes** service.

![Choose Service](images/local-process-kubernetes-vs-code/choose-service.png)

All traffic in the Kubernetes cluster is redirected for the bikes service to the version of your application running in your development computer. Local Process with Kubernetes also routes all outbound traffic from the application back to your Kubernetes cluster.

> **Important**: You can only redirect services that have a single pod.

After you select your service, you are prompted to enter the TCP port for your local application. For this example, enter "3000".

![Connect choose port](images/local-process-kubernetes-vs-code/choose-port.png)

Choose **Launch via NPM** as the launch task.

![Connect choose launch task](images/local-process-kubernetes-vs-code/choose-launch.png)

> **Note**: You will be prompted to allow the **EndpointManager** to run elevated and modify your hosts file.

You have the option of running isolated or not isolated. If you run isolated, only your requests are routed to your local process; other developers can use the cluster without being affected. If you don't run isolated, all traffic is redirected to your local process. For more information on this option, see [Using routing capabilities for developing in isolation](https://docs.microsoft.com/visualstudio/containers/overview-local-process-kubernetes#using-routing-capabilities-for-developing-in-isolation).

![Isolation prompt](images/local-process-kubernetes-vs-code/lpk-isolation-prompt.png)

Your development computer is connected when the VS Code status bar turns orange and the Kubernetes extension shows you are connected.

![Development computer connected](images/local-process-kubernetes-vs-code/development-computer-connected.png)

> **Note**: On subsequent launches, you will not be prompted for the service name, port, launch task, or whether to run isolated. These values are saved in `.vscode/tasks.json`. To change these settings later, open the Command Palette, and run the command **Local Process with Kubernetes: Configure Local Process with Kubernetes**.

Once your development computer is connected, traffic starts redirecting to your development computer for the service you are replacing.

## Set a break point

Open [server.js][server-js-breakpoint] and click somewhere on line 233 to put your cursor there. Set a breakpoint by hitting `kb(editor.debug.action.toggleBreakpoint)` or clicking **Run** then **Toggle Breakpoint**.

Navigate to the sample application by opening the public URL. Select **Aurelia Briggs (customer)** as the user, then select a bike to rent. Notice the image for the bike does not load. Return to Visual Studio Code and observe line 233 is highlighted. The breakpoint you set has paused the service at line 233. To resume the service, hit `kb(workbench.action.debug.run)` or click **Run** then **Continue**. Return to your browser and verify you see a placeholder image for the bike.

Remove the breakpoint by putting your cursor on line 233 in `server.js` and hitting `kb(editor.debug.action.toggleBreakpoint)`.

### Update your application

Edit `server.js` to remove lines 234 and 235:

```javascript
    // Hard code image url *FIX ME*
    theBike.imageUrl = "/static/logo.svg";
```

The section should now look like:

```javascript
    var theBike = result;
    theBike.id = theBike._id;
    delete theBike._id;
```

Save your changes and press `kb(workbench.action.debug.restart)` or click **Run** then **Restart Debugging**. After you are reconnected, refresh your browser and verify that you no longer see a placeholder image for the bike.

Click **Run** then **Stop Debugging** or press `kb(workbench.action.debug.stop)` to stop the debugger.

> **Note**: By default, stopping the debugging task also disconnects your development computer from your Kubernetes cluster. You can change this behavior by searching for **Local Process With Kubernetes: Disconnect After Debugging** in the Visual Studio Code settings and removing the check next to **Disconnect automatically when Debugging ends**. After updating this setting, your development computer will remain connected when you stop and start debugging. To disconnect your development computer from your cluster click on the LPK extension on the status bar then choose **Disconnect current session**.
>
> If Visual Studio Code abruptly ends the connection to the cluster or terminates, the service you are redirecting may not be restored to its original state before you connected with Local Process with Kubernetes. To fix this issue, see the [Troubleshooting guide][troubleshooting].

## Additional configuration

Local Process with Kubernetes can handle routing traffic and replicating environment variables without any additional configuration. If you need to download any files that are mounted to the container in your Kubernetes cluster, such as a ConfigMap file, you can create a `KubernetesLocalProcessConfig.yaml` to download those files to your development computer. For more information, see [Configure Local Process with Kubernetes][kubernetesLocalProcessConfig-yaml].

## Using logging and diagnostics

Logging output is written to the **Local Process with Kubernetes** window after your development computer is connected to your Kubernetes cluster.

![Output](images/local-process-kubernetes-vs-code/output.png)

Click on the **Kubernetes** status bar and choose **Show connection diagnostics information**. This command prints the current environment variables and DNS entires in the logging output.

![Output with diagnostics](images/local-process-kubernetes-vs-code/output-diagnostics.png)

Additionally, you can find the diagnostic logs in the `Local Process with Kubernetes` directory in your development computer's TEMP directory. On Windows 10, that's in `%TEMP%\Local Process Kubernetes`. On a Mac, the TEMP directory can be found by running `echo $TMPDIR` from a terminal window.

## Remove the sample application from your cluster

Use the provided script to remove the sample application from your cluster.

```azurecli-interactive
./local-process-quickstart.sh -c -g MyResourceGroup -n MyAKS
```

[azure-kubernetes-service]: https://docs.microsoft.com/azure/aks/kubernetes-walkthrough
[azds-cli]: https://docs.microsoft.com/azure/dev-spaces/how-to/install-dev-spaces#install-the-client-side-tools
[azds-tmp-dir]: https://docs.microsoft.com/azure/dev-spaces/troubleshooting#before-you-begin
[lpk-vs-code]: https://marketplace.visualstudio.com/items?itemName=mindaro.mindaro
[azure-cli]: https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest
[azure-cloud-shell]: https://docs.microsoft.com/azure/cloud-shell/overview
[az-aks-get-credentials]: https://docs.microsoft.com/cli/azure/aks?view=azure-cli-latest#az-aks-get-credentials
[az-aks-vs-code]: https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-aks-tools
[bike-sharing-github]: https://github.com/Microsoft/mindaro
[preview-terms]: https://azure.microsoft.com/support/legal/preview-supplemental-terms/
[server-js-breakpoint]: https://github.com/Azure/dev-spaces/blob/master/samples/BikeSharingApp/Bikes/server.js#L233
[supported-regions]: https://azure.microsoft.com/global-infrastructure/services/?products=kubernetes-service
[troubleshooting]: https://docs.microsoft.com/azure/dev-spaces/troubleshooting#fail-to-restore-original-configuration-of-deployment-on-cluster
[vs-code]: https://code.visualstudio.com/download
[kubernetesLocalProcessConfig-yaml]: https://docs.microsoft.com/visualstudio/containers/configure-local-process-with-kubernetes