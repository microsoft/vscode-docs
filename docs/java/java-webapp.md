---
Order: 2
Area: java
TOCTitle: Java Web App
ContentId: 98ddf1d3-6a8e-4b0f-a44d-e57cfdf2348c
PageTitle: Deploy Java Web App to Azure
DateApproved:
MetaDescription: Java web app tutorial showing how to deploy a Java web app to Azure
MetaSocialImage: TBD
---
# Deploy a Java Web App to Azure

In our [first tutorial](/docs/java/java-tutorial.md), we've build a Java web app running locally. This tutorial will show you how to run it in the Cloud.

## Prepare your Azure account

Before running this sample on [Azure](http://www.azure.com), you need to have an Azure subscription and the command line tools.

If you don't have an Azure subscription, you can sign up for a [free Azure account](https://azure.microsoft.com/pricing/free-trial/):

<a class="tutorial-next-btn" href="https://azure.microsoft.com/pricing/free-trial/" target="_blank" style="background-color:#68217A">Create your free Azure account</a>

The [Azure Command-Line Interface (CLI)](https://docs.microsoft.com/cli/azure/overview):

<a class="tutorial-next-btn" href="https://docs.microsoft.com//cli/azure/install-azure-cli" target="_blank" style="background-color:#68217A">Install Azure CLI 2.0</a>

[comment]: <> (Replace it with using App Service Extension once Java support is ready)

## Create an Azure service principal

We'll use the [Integrated Terminal](/docs/editor/integrated-terminal.md) in VS Code. To open the terminal you can either:

* Use the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut with the backtick character.
* Use the **View** | **Integrated Terminal** menu command.
* From the **Command Palette** (`kb(workbench.action.showCommands)`), use the **View:Toggle Integrated Terminal** command.

> **Note:** You can still open an external shell with the Explorer **Open in Command Prompt** command (**Open in Terminal** on Mac or Linux) if you prefer to work outside VS Code.

Sign into your Azure account by using the Azure CLI:

```bash
az login
```

Follow the instructions to complete the sign-in process.

Create an Azure service principal:

```bash
az ad sp create-for-rbac --name "uuuuuuuu" --password "pppppppp"
```

where `uuuuuuuu` is the user name and `pppppppp` is the password for the service principal.

Azure responds with JSON that resembles the following example:

   ```bash
   {
      "appId": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      "displayName": "uuuuuuuu",
      "name": "http://uuuuuuuu",
      "password": "pppppppp",
      "tenant": "tttttttt-tttt-tttt-tttt-tttttttttttt"
   }
   ```

   > You will use the values from this JSON response when you configure the Maven plugin to deploy your web app to Azure. The `aaaaaaaa`, `uuuuuuuu`, `pppppppp`, and `tttttttt` are placeholder values, which are used in this example to make it easier to map these values to their respective elements when you configure your Maven `settings.xml` file in the next section.

## Configure Maven to use your Azure service principal

Open your Maven `settings.xml` file in a text editor. There are two locations where the `settings.xml` file may live:

* The Maven install: ${maven.home}/conf/settings.xml
* A user’s install: ${user.home}/.m2/settings.xml

  Below are some examples:

  * Windows: `%ProgramFiles%\apache-maven\3.5.0\conf\settings.xml`
  * Mac installed by Homebrew: `/usr/local/Cellar/maven/3.5.0/libexec/conf`

Add your Azure service principal settings from the previous section of this tutorial to the `<servers>` collection in the `settings.xml` file.

For example:

```bash
<servers>
  <server>
    <id>azure-auth</id>
      <configuration>
        <client>aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa</client>
        <tenant>tttttttt-tttt-tttt-tttt-tttttttttttt</tenant>
        <key>pppppppp</key>
        <environment>AZURE</environment>
      </configuration>
  </server>
</servers>
```

Where:

Element | Description
---|---
`<id>` | Specifies a unique name which Maven uses to look up your security settings when you deploy your web app to Azure.
`<client>` | Contains the `appId` value from your service principal.
`<tenant>` | Contains the `tenant` value from your service principal.
`<key>` | Contains the `password` value from your service principal.
`<environment>` | Defines the target Azure cloud environment, which is `AZURE` in this example. (A full list of environments is available in the [Maven Plugin for Azure Web Apps](TBD) documentation)

Save and close the `settings.xml` file.

## Build and deploy your web app to Azure

From the command prompt or terminal window that you were using earlier, rebuild the JAR file using Maven if you made any changes to the `pom.xml` file; for example:

```bash
mvn clean package
```

Deploy your web app to Azure by using Maven; for example:

```bash
mvn azure-webapp:deploy
```

Maven will deploy your web app to Azure; if the web app does not already exist, it will be created.

When your web has been deployed, you will see a success message from command Line

![Deploy Success](images/java-webapp/deploy-success.png)

by pasting the URL to browser, you will see the sample web app running on Azure!

![Greeting Cloud](images/java-webapp/greeting-cloud.png)

You will also be able to manage it by using the [Azure portal](https://portal.azure.com/).

Your web app will be listed in **App Services**:

![App Service View](images/java-webapp/app-service-view.png)

And the URL for your web app will be listed in the **Overview** for your web app:

![Overview](images/java-webapp/overview.png)

You have successfully built a Java web application running in the Cloud!

![Greeting Cloud](images/java-webapp/greeting-cloud.png)

## Next steps

* To see how you can containerize the app and deploy to the Cloud, check out [Java Container Tutorial](/docs/java/java-container.md)
* To learn more about Java Debugging features, see [Java Debugging Tutorial](/docs/java/java-debugging.md)
