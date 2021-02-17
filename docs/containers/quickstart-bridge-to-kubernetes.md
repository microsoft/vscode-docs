---
Area: containers
ContentId: 6206f223-a124-41fa-a9cf-4cc12d851833
PageTitle: Use Bridge to Kubernetes to run and debug locally with Kubernetes
DateApproved: 02/18/2021
MetaDescription: Learn how to use Bridge to Kubernetes to develop, debug, and test a Kubernetes application locally in Visual Studio Code
---
# Use Bridge to Kubernetes

This sample illustrates how Bridge to Kubernetes can be used to develop a microservice version of a simple TODO application on any Kubernetes cluster. This sample, using Visual Studio Code, has been adapted from code provided by [TodoMVC](http://todomvc.com). In this example, we use Docker Desktop Kubernetes to host the application, but these steps should work with any Kubernetes cluster.

The TODO application sample is composed of a frontend and a backend that provides persistent storage. This extended sample adds a statistics component and breaks the application into a number of microservices, specifically:

- The frontend uses a Mongo database to persist TODO items;
- The frontend writes add, complete, and delete events to a RabbitMQ queue;
- A statistics worker receives events from the RabbitMQ queue and updates a Redis cache;
- A statistics API exposes the cached statistics for the frontend to show.

In all, this extended TODO application is composed of six interrelated components.

## Prerequisites

- [Docker Desktop](https://hub.docker.com/editions/community/docker-ce-desktop-windows) with Kubernetes enabled. For information on how to set up Kubernetes with Docker, see [Deploy to Kubernetes](https://docs.docker.com/get-started/kube-deploy/).
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed and on the path in a command-line environment of your choice
- [Bridge to Kubernetes](https://aka.ms/bridge-to-k8s-vsc-extension) Visual Studio Code extension

## Deploy the application

Clone the [mindaro repo](https://github.com/Microsoft/mindaro) and open a command window with the current working folder to *samples/todo-app*.

Make sure the context is set to `docker-desktop`.

```cmd
kubectl config current-context
```

If you don't see `docker-desktop` as the context, use this command to set the context:

```cmd
kubectl config use-context docker-desktop
```

Create a namespace for the sample.

```cmd
kubectl create namespace todo-app
```

Then, apply the deployment manifest:

```cmd
kubectl apply -n todo-app -f deployment.yaml
```

This is a simple deployment that exposes the frontend using a service of type `LoadBalancer`. Wait for all the pods to be running and for the external IP of the `frontend` service to become available.

```cmd
kubectl -n todo-app get pods
```

```output
NAME                            READY   STATUS    RESTARTS   AGE
frontend-74dfdb4c57-b7rqd       1/1     Running   1          20m
stats-api-9bcb874bd-t4jz2       1/1     Running   0          20m
stats-cache-59459866-t4ck5      1/1     Running   0          20m
stats-queue-78d7d48c6c-6lcqn    1/1     Running   0          20m
stats-worker-766b947d59-4p7mc   1/1     Running   2          20m
todos-db-85574b59c8-fzfr6       1/1     Running   0          20m
```

Get the external IP address. // TODO: this doesn't work

```cmd
kubectl get services
```


Browse to the application using the external IP and port (the second number in the PORT(S) column).

```
http://<external-ip>:<port>
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

Once VS Code has launched, open the Kubernetes pane from the left sidebar of VS Code, and then select the **todo-app** namespace in your Docker Desktop cluster. Right-click the **todo-app** node, and choose **Use Namespace**.

![Select Namespace](images/quickstart-bridge-to-kubernetes/docker-desktop-use-namespace.png)

Install dependencies by running `npm install` in a terminal window (CTRL + ~).

```cmd
npm install
```

Next, place a breakpoint on line 17 of `server.js`.

Open the Command Palette (`kb(workbench.action.showCommands)`) and type Bridge to Kubernetes. Select the **Bridge to Kubernetes: Configure** option.

![Bridge to Kubernetes: Configure command](images/quickstart-bridge-to-kubernetes/bridge_configure.png)

You are prompted to configure the service you want to replace, the port to forward from your development computer, and the launch task to use.

Choose the `stats-api` service.

![Select the service to connect to](images/quickstart-bridge-to-kubernetes/select_service.png)

After you select your service, you are prompted to enter the TCP port for your local application. For this example, enter 3001.

![Enter the port number](images/quickstart-bridge-to-kubernetes/enter_port.png)

Choose **Run Script: dev** as the launch task.

![Choose the debugger launch task](images/quickstart-bridge-to-kubernetes/launch_task.png)

You have the option of running isolated or not isolated. If you run isolated, only your requests are routed to your local process; other developers can use the cluster without being affected. If you don't run isolated, all traffic is redirected to your local process. For more information on this option, see [Using routing capabilities for developing in isolation](https://docs.microsoft.com/visualstudio/containers/overview-bridge-to-kubernetes?view=vs-2019#using-routing-capabilities-for-developing-in-isolation). For this example, we will proceed with non-isolated.

![Choose isolation](images/quickstart-bridge-to-kubernetes/isolation.png)

> **Note**: You will be prompted to allow the EndpointManager to run elevated and modify your hosts file.

The Bridge to Kubernetes debugging profile has been successfully configured.

Select the Debug icon on the left and select **Run Script: dev with Bridge to Kubernetes**. Click the start button next to **Run Script: dev with Kubernetes**.

![Choose debug launch profile](images/quickstart-bridge-to-kubernetes/debug_profile.png)

Your development computer is connected when the VS Code status bar turns orange and the Kubernetes extension shows you are connected. Once your development computer is connected, traffic starts redirecting to your development computer for the stats-api you are replacing.

![Debugging with Bridge to Kubernetes](images/quickstart-bridge-to-kubernetes/debugging.png)

Navigate to the frontend entry point of your todo-app. For Docker Desktop Kubernetes, we'll be using `127.0.0.1`. To access the local endpoint URL for your app, open the Kubernetes menu on the status bar and choose the endpoint entry.

Make a request to the stats-api by choosing the **stats** link.

![Running web site - choose the status link](images/quickstart-bridge-to-kubernetes/stats.png)

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
