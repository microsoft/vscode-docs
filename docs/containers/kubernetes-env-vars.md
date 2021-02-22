---
Area: containers
ContentId: 8c1ee589-25bb-4c2d-ab8d-7ccfa7b4e282
PageTitle: Use Kubernetes service environment variables for service to service communication
DateApproved: 02/12/2021
MetaDescription: Learn how to use Kubernetes service environment variables with Bridge to Kubernetes to enable service-to-service communication as a non-elevated user in a Kubernetes cluster
---
# Kubernetes service environment variables

When you communicate with another service in the same Kubernetes cluster, for example with an HTTP request, you typically use the hardcoded service name in the URL for the request, but that won't work in some scenarios with Bridge to Kubernetes. This article describes how to use the Kubernetes service environment variables to specify the connection URL.

## Avoid redirection failures

Bridge to Kubernetes reroutes traffic by modifying the host name resolution to redirect network traffic to its own version of the services. The redirection works in most scenarios, but fails in the case where the Bridge to Kubernetes process has restricted privilege, such as when the request originates from a non-elevated user account or when using VS Code Remote SSH. This is because in order to enable the name resolution for redirected services, Bridge to Kubernetes needs to modify the hosts file, but that is not possible when Bridge to Kubernetes runs from a non-elevated user account. To work around this issue, you can write your code to use the Kubernetes service environment variables instead of a hardcoded service name.

## Environment variables table

The following table shows the Kubernetes service environment variables that are available from any service in the cluster, for an example service using the TCP protocol on a port. The *servicename* is the name of the service, converted to uppercase, and with hyphens converted to underscores, so for example, a service named web-api yields an environment variable named WEB_API_SERVICE_HOST.

| Name | Example | Description |
| - | - | - |
| *servicename*_SERVICE_HOST | 10.0.0.11 | The name of the service host |
| *servicename*_SERVICE_PORT | 6379 | The port for the service |
| *servicename*_PORT | tcp://10.0.0.11:6379 | The URL with protocol, IP address, and port. |
| *servicename*\_PORT_*portnumber*_*protocol* | tcp://10.0.0.11:6379 | The URL with protocol, IP address and port. |
| *servicename*\_PORT_*portnumber*_*protocol*_PROTO| tcp | The protocol identifier. |
| *servicename*\_PORT_*portnumber*_*protocol*_PORT | 6379 | The port number for TCP. |
| *servicename*\_PORT_*portnumber*_*protocol*_ADDR | 10.0.0.11 | The IP address for TCP. |

So if the service is named web-api, the variables are WEB_API_SERVICE_HOST and WEB_API_SERVICE_PORT, and so on. The default environment variables created by Kubernetes are described in the [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/service/#environment-variables). For information about the supported protocols, see [Supported protocols](https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support).

## Environment variables in source code

To enable your services to run in Bridge to Kubernetes without elevated privileges, replace any hardcoded references to the hostname with the environment variable. The following example shows this in a .NET service named mywebapi written in C#:

```csharp
    using var client = new HttpClient();
    var host = Environment.GetEnvironmentVariable("MYWEBAPI_SERVICE_HOST");
    var port = Environment.GetEnvironmentVariable("MYWEBAPI_SERVICE_PORT");
    var request = new HttpRequestMessage();
    request.RequestUri = new Uri($"http://{host}:{port}/api/data");
    var response = await client.SendAsync(request);
```

An example in Node.js looks like this:

```js
    server.get("/api/data", function (req, res) {
        var options = {
            host: process.env.MYWEBAPI_SERVICE_HOST,
            port: process.env.MYWEBAPI_SERVICE_PORT,
            path: '/api/data',
            method: 'GET'
        };
        var req = http.request(options, function(response) {
            res.setHeader('Content-Type', 'application/json');
            var responseString = '';
            //another chunk of data has been received, so append it to `responseString`
            response.on('data', function (chunk) {
                responseString += chunk;
            });
            response.on('end', function () {
                res.send(responseString);
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
          });

          req.end();
    });
```

To update your code to use the environment variables, look for any occurrences of the hostname and update to use the value obtained from the environment variable *servicename*_SERVICE_HOST.

Even if you usually don't specify the port used by the target service when calling it, you will need to use the *servicename*_SERVICE_PORT environment variable. Specifying the port allows Bridge to Kubernetes to avoid the conflicts happening when a specific port isn't available on the development machine. You don't need to change the port on which your service listens for this to work: you just need to make sure that when your service calls other services, it calls them using both the *servicename*_SERVICE_HOST and *servicename*_SERVICE_PORT environment variables.

If you reuse the same code elsewhere in the cluster, that is fine, because these environment variables are available in every pod in the cluster. If you reuse the same code outside of a Kubernetes cluster, you either have to set up the equivalent environment variables or modify the code appropriately for the new platform or hosting service.

## Set VS Code to use Kubernetes service environment variables

If you're using VS Code with a remote computer or running VS Code as a normal user, you also need to configure VS Code to use the Kubernetes service environment variables. Open tasks.json, find the task with the label `bridge-to-kubernetes.service` and add the property `usekubernetesServiceEnvironmentVariables` with the value `true`, as shown in the following code:

```json
    "tasks": [
        {
            "label": "bridge-to-kubernetes.service",
            "type": "bridge-to-kubernetes.service",
            "service": "bikes",
            "ports": [
                3000
            ],
            "useKubernetesServiceEnvironmentVariables": true
        }
    ]
```

The setting is only needed if you are running VS Code as a normal user, or if you are using a remote session, but if you have modified your code as described in this article, there is no harm in setting this property.

## Next steps

Read more about Bridge to Kubernetes configuration at [How to configure Bridge to Kubernetes](https://docs.microsoft.com/visualstudio/containers/configure-bridge-to-kubernetes).
