---
Order: 1
Area: java
TOCTitle: Java Web App Tutorial
ContentId: 12d8264b-643f-4745-a7ea-8433dedb1331
PageTitle: Java Web App Tutorial in VS Code
DateApproved:
MetaDescription: Java web app tutorial showing IntelliSense, debugging, and code navigation support in the Visual Studio Code editor.
MetaSocialImage: TBD
---
# Java in VS Code

This 10 minutes quickstart shows you how to create a simple Java web app, run it locally, and eventually run it on cloud.

## Scenario

A simple Spring Boot Getting Started web app
<br><br>
![Greeting from Java](imgages/GreetingFromSpring.png)

## Before you begin

Before running and deploying this sample, you must have JDK and Maven on your local development environment. If not, please

1. Download and install the Java SE Development Kit (JDK):
<br>
<a class="tutorial-next-btn" href="http://www.oracle.com/technetwork/java/javase/downloads/index.html" target="_blank" style="background-color:#68217A">Download JDK</a>
<br>
2. Download Apache Maven version 3 or greater:
<br>
<a class="tutorial-next-btn" href="https://maven.apache.org/download.cgi" target="_blank" style="background-color:#68217A">Download Apache Maven</a>
<br>
3. Install Apache Maven for your local development environment
<br>
<a class="tutorial-next-btn" href="https://maven.apache.org/install" target="_blank" style="background-color:#68217A">Instal Apache Maven</a>
<br>

## Download and test the Spring Boot app
1. Clone the [Spring Boot Getting Started](https://github.com/spring-guides/gs-spring-boot) sample project to your local machine. You can clone a Git repository with the **Git: Clone** command in the **Command Palette** (`kb(workbench.action.showCommands)`). Paste https://github.com/microsoft/gs-spring-boot.git as the URL of the remote repository and the decide the parent directory under which to put the local repository. After that, you can open the cloned repository in your VS Code.

![Clone Spring Repository](imgages/CloneRepository.gif)

2. Then you can open any of the Java file in the repository. If you haven't got the Java related extensions installed with your VS Code, you would be recommended to install the Java extension pack. Just follow the instruction and install the Java Extension Pack from Microsoft.

![Install Java Extensions](imgages/InstallExtensions.gif)

3. Once you have the Extensions installed, it will automatically build the project for you, and then you can simply run it within VS Code. VS Code can generate the correct launch file for you automatically too

![Run Spring Boot](imgages/RunSpringBoot.gif)

4. Test the web app by browsing to http://localhost:8080 using a web browser. You should see the following message displayed: *Greetings from Spring Boot!*
<br><br>
![Greeting from Spring](images/GreetingFromSpring.png)

## Make a change
1. Try it now, edit *HelloController.java* to change *Greetings from Spring Boot!* to something else.
2. Simply click the Restart button on the top of the editor to reload the app and see result by reload the browser.

![Restart Application](images/RestartApplication.PNG)

## Debug the application
1. You can also set a breakpoint in the application code, and reload your browser to hit the breakpoint.
![Debug Application](images/Debugging.PNG)

Congratulations, now you have your first Spring Boot web app running locally! Now let's try host it on Cloud.

## Prepare your Azure account
Before running this sample on [Azure](http://www.azure.com), you need to
1. Have an [Azure](http://www.azure.com) subscription; if you don't already have one, you can sign up for a [free Azure account](https://azure.microsoft.com/pricing/free-trial/
).
<br>
<a class="tutorial-next-btn" href="https://azure.microsoft.com/pricing/free-trial/" target="_blank" style="background-color:#68217A">Create your free Azure account</a>
<br>
2. The [Azure Command-Line Interface (CLI)](https://docs.microsoft.com/cli/azure/overview).
<br>
<a class="tutorial-next-btn" href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" target="_blank" style="background-color:#68217A">Install Azure CLI 2.0</a>
<br>

## Create an Azure service principal
1. Using the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) in VS Code, to open the terminal:

* Use the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut with the backtick character.
* Use the **View** | **Integrated Terminal** menu command.
* From the **Command Palette** (`kb(workbench.action.showCommands)`), use the **View:Toggle Integrated Terminal** command.

> **Note:** You can still open an external shell with the Explorer **Open in Command Prompt** command (**Open in Terminal** on Mac or Linux) if you prefer to work outside VS Code.
2. Sign into your Azure account by using the Azure CLI:
   ```
   az login
   ```
   Follow the instructions to complete the sign-in process.

2. Create an Azure service principal:
   ```
   az ad sp create-for-rbac --name "uuuuuuuu" --password "pppppppp"
   ```
   Where `uuuuuuuu` is the user name and `pppppppp` is the password for the service principal.

3. Azure responds with JSON that resembles the following example:
   ```
   {
      "appId": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      "displayName": "uuuuuuuu",
      "name": "http://uuuuuuuu",
      "password": "pppppppp",
      "tenant": "tttttttt-tttt-tttt-tttt-tttttttttttt"
   }
   ```

   >
   > You will use the values from this JSON response when you configure the Maven plugin to deploy your web app to Azure. The `aaaaaaaa`, `uuuuuuuu`, `pppppppp`, and `tttttttt` are placeholder values, which are used in this example to make it easier to map these values to their respective elements when you configure your Maven `settings.xml` file in the next section.
   >

## Configure Maven to use your Azure service principal

1. Open your Maven `settings.xml` file in a text editor; There are two locations where a settings.xml file may live:
   * The Maven install: ${maven.home}/conf/settings.xml
   * A user’s install: ${user.home}/.m2/settings.xml
   Below are some examples:
   * Windows: `%ProgramFiles%\apache-maven\3.5.0\conf\settings.xml`
   * Mac installed by Homebrew: `/usr/local/Cellar/maven/3.5.0/libexec/conf`

2. Add your Azure service principal settings from the previous section of this tutorial to the `<servers>` collection in the *settings.xml* file; for example:

   ```
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
   ---|---|---
   `<id>` | Specifies a unique name which Maven uses to look up your security settings when you deploy your web app to Azure.
   `<client>` | Contains the `appId` value from your service principal.
   `<tenant>` | Contains the `tenant` value from your service principal.
   `<key>` | Contains the `password` value from your service principal.
   `<environment>` | Defines the target Azure cloud environment, which is `AZURE` in this example. (A full list of environments is available in the [Maven Plugin for Azure Web Apps] documentation)

3. Save and close the *settings.xml* file.

## Build and deploy your web app to Azure


1. From the command prompt or terminal window that you were using earlier, rebuild the JAR file using Maven if you made any changes to the *pom.xml* file; for example:
   ```
   mvn clean package
   ```

2. Deploy your web app to Azure by using Maven; for example:
   ```
   mvn azure-webapp:deploy
   ```

Maven will deploy your web app to Azure; if the web app does not already exist, it will be created.

3. When your web has been deployed, you will see a success message from command Line
<br><br>
![Deploy Success](DeploySuccess.png)
by pasting the URL to browser, you will see the sample web app running on Cloud!
<br><br>
![Greeting Cloud](GreetingCloud.png)
You will also be able to manage it by using the [Azure portal](https://portal.azure.com/).

4. Your web app will be listed in **App Services**:
<br><br>
![App Service View](AppServiceView.png)

5. And the URL for your web app will be listed in the **Overview** for your web app:
<br><br>
![Overview](Overview.png)

You have successfully built a Java web app on cloud!

![Greeting Cloud](GreetingCloud.PNG)

## Next steps
* To see how you can containerize the app and deploy to the Cloud, check out [Java Container Tutorial](docs/java/java-container)
* To learn more about Java Debugging features, see [Java Debugging Tutorial](docs/java/java-debugging)
