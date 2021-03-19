---
Area: containers
ContentId: 6206f223-a124-41fa-a9cf-4cc12d851833
PageTitle: Use Bridge to Kubernetes to run and debug locally with Kubernetes
DateApproved: 10/20/2020
MetaDescription: Use a todo sample app to learn how to use Bridge to Kubernetes to develop, debug, and test a Kubernetes application locally in Visual Studio Code
---
# Use Bridge to Kubernetes with a sample

This sample illustrates how Bridge to Kubernetes can be used to develop a microservice version of a simple TODO application on any Kubernetes cluster. This sample, using Visual Studio Code, has been adapted from code provided by [TodoMVC](http://todomvc.com). In this example, we use MiniKube to host the application, but these steps should work with any Kubernetes cluster.

The TODO application sample is composed of a frontend and a backend that provides persistent storage. This extended sample adds a statistics component and breaks the application into a number of microservices, specifically:

- The frontend calls the database-api to persist and update TODO items;
- The database-api service relies on a Mongo database to persist TODO items;
- The frontend writes add, complete, and delete events to a RabbitMQ queue;
- A statistics worker receives events from the RabbitMQ queue and updates a Redis cache;
- A statistics API exposes the cached statistics for the frontend to show.

In all, this extended TODO application is composed of six interrelated components.

## Prerequisites

- [MiniKube](https://kubernetes.io/docs/setup/learning-environment/minikube/) or another Kubernetes cluster installed
- [Chocolatey](https://chocolatey.org/) package manager, to install MiniKube
- On Windows 10, [Hyper-V](https://docs.microsoft.com/virtualization/hyper-v-on-windows)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed and on the path in a command-line environment of your choice
- [Bridge to Kubernetes](https://aka.ms/bridge-to-k8s-vsc-extension) Visual Studio Code extension

## Install MiniKube

You can use any Kubernetes provider with Bridge to Kubernetes. In this article, we use MiniKube. MiniKube is a lightweight Kubernetes provider that lets you host Kubernetes on your local machine. Follow the [installation instructions](https://minikube.sigs.k8s.io/docs/start/) to install MiniKube on Windows 10, Linux, or macOS.

For best results on Windows 10, you should use the Hyper-V VM manager and create a [virtual switch](https://docs.microsoft.com/windows-server/virtualization/hyper-v/get-started/create-a-virtual-switch-for-hyper-v-virtual-machines).

Once installed, start MiniKube, specify to use Hyper-V, and provide the name of the primary virtual switch. This command must be run from a command prompt with Administrator privileges.

```cmd
minikube start --vm-driver hyperv --hyperv-virtual-switch "Primary Virtual Switch"
```

## Deploy the application

Clone the [mindaro repo](https://github.com/Microsoft/mindaro) and open a command window with the current working folder to *samples/todo-app*.

Create a namespace for the sample.

```cmd
kubectl create namespace todo-app
```

Then, apply the deployment manifest:

```cmd
kubectl apply -n todo-app -f deployment.yaml
```

This is a simple deployment that exposes the frontend using a service of type `LoadBalancer`. Wait for all the pods to be running and for the external IP of the `frontend` service to become available.

If you are testing with MiniKube, you will need to use `minikube tunnel` to resolve an external IP.

```output
kubectl get services -n todo-app

NAME          TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
frontend      LoadBalancer   10.0.49.177    127.0.0.1   80:30145/TCP   18h
```

Browse to the application using the external IP and local port (the first number in the PORT(S) column).

```
http://{external-ip}:{local-port}
```

Test the running app in the browser. As you add, complete and delete todo items, notice that the stats page updates with the expected metrics.

## Debug the stats-api service

You can now use the Bridge to Kubernetes extension to demonstrate how traffic from the Kubernetes cluster can be redirected to a locally running version of the stats-api.

```cmd
cd stats-api/
```

Open the source code for the stats-api in VS Code.

```cmd
code .
```

Once VS Code has launched, open the Kubernetes pane from the left sidebar of VS Code, and then select the **todo-app** namespace in your MiniKube cluster. Right-click the **todo-app** node, and choose **Use Namespace**.

![Select Namespace](images/bridge-to-kubernetes-sample/select-namespace.png)

Install dependencies by running `npm install` in a terminal window (CTRL + ~).

```cmd
npm install
```

Next, place a breakpoint on line 17 of `server.js`.

Open the Command Palette (`kb(workbench.action.showCommands)`) and type Bridge to Kubernetes. Select the **Bridge to Kubernetes: Configure** option.

![Bridge to Kubernetes: Configure command](images/bridge-to-kubernetes-sample/bridge_configure.png)

You are prompted to configure the service you want to replace, the port to forward from your development computer, and the launch task to use.

Choose the `stats-api` service.

![Select the service to connect to](images/bridge-to-kubernetes-sample/select_service.png)

After you select your service, you are prompted to enter the TCP port for your local application. For this example, enter 3001.

![Enter the port number](images/bridge-to-kubernetes-sample/enter_port.png)

Choose **Run Script: dev** as the launch task.

![Choose the debugger launch task](images/bridge-to-kubernetes-sample/launch_task.png)

You have the option of running isolated or not isolated. If you run isolated, only your requests are routed to your local process; other developers can use the cluster without being affected. If you don't run isolated, all traffic is redirected to your local process. For more information on this option, see [Using routing capabilities for developing in isolation](https://docs.microsoft.com/visualstudio/containers/overview-bridge-to-kubernetes?view=vs-2019#using-routing-capabilities-for-developing-in-isolation). For this example, we will proceed with non-isolated.

![Choose isolation](images/bridge-to-kubernetes-sample/isolation.png)

> **Note**: You will be prompted to allow the EndpointManager to run elevated and modify your hosts file.

The Bridge to Kubernetes debugging profile has been successfully configured.

Select the Debug icon on the left and select **Run Script: dev with Bridge to Kubernetes**. Click the start button next to **Run Script: dev with Kubernetes**.

![Choose debug launch profile](images/bridge-to-kubernetes-sample/debug_profile.png)

Your development computer is connected when the VS Code status bar turns orange and the Kubernetes extension shows you are connected. Once your development computer is connected, traffic starts redirecting to your development computer for the stats-api you are replacing.

![Debugging with Bridge to Kubernetes](images/bridge-to-kubernetes-sample/debugging.png)

Navigate to the frontend entry point of your todo-app. For minikube, we'll be using `127.0.0.1`. To access the local endpoint URL for your app, open the Kubernetes menu on the status bar and choose the endpoint entry.

Make a request to the stats-api by choosing the **stats** link.

![Running web site - choose the status link](images/bridge-to-kubernetes-sample/stats.png)

Notice the traffic that initially started in your cluster was redirected to your locally running version (outside of the cluster) where the breakpoint was triggered.

Press play and let the request continue complete transparently.

This is just one example on how to use Bridge to Kubernetes on non-AKS clusters.  Try it on your own project next!

## Clean up

To clean up the assets produced by this sample, run:

```cmd
kubectl delete namespace todo-app
```

## Next steps

You can also deploy your app to Azure Kubernetes Service (AKS) with Bridge to Kubernetes. See [Use Bridge to Kubernetes with AKS](/docs/containers/bridge-to-kubernetes-aks.md)
