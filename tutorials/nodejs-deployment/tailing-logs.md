---
Order: 5
TOCTitle: Viewing Logs
PageTitle: Viewing Logs
MetaDescription:
MetaSocialImage:
DateApproved: 10/5/2017
ShortDescription:
---
# Viewing Logs

In this step, you will view (or "tail") the logs from the running Website. Any calls to `console.log()` in the site will be displayed in your terminal.

Run the following Azure CLI command.

```bash
$ az webapp log tail --name myExpressApp-chrisdias
```

After a few seconds, you should see a message indicating that you are connected to the log-streaming service.

```bash
2017-04-17T19:55:35  Welcome, you are now connected to log-streaming service.
```

Refresh the page a few times in the browser and you'll see log output.

```bash
GET / 304 1.704 ms - -
GET / 304 0.935 ms - -
GET / 304 0.490 ms - -
```

----

 <a class="tutorial-next-btn" href="/tutorials/nodejs-deployment/publishing-changes">I can see my logs</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment', 'tailing-logs')" href="javascript:void(0)">I ran into an issue</a>