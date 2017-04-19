---
Order: 6
TOCTitle: Tailing Logs
PageTitle: Tailing Logs
MetaDescription: 
MetaSocialImage: 
Date: 
ShortDescription: 
Author: 
---

# Tailing Logs

In this step you will "tail" the logs from the running Website. Any calls to `console.log()` in the site will be displayed in your terminal.

Run the following Azure CLI command.

``` bash
$ az appservice web log tail --name myExpressApp-chrisdias
```

After a few seconds you should see a message indicating that you are connected to the log-streaming service.

``` bash
2017-04-17T19:55:35  Welcome, you are now connected to log-streaming service.
```

Refresh the page a few times in the browser and you'll see log output.

``` bash
GET / 304 1.704 ms - -
GET / 304 0.935 ms - -
GET / 304 0.490 ms - -
```

---- 

<div class="btn" a href="/tutorials/nodejs-deployment/7.publishing-changes">I can see my logs</div>