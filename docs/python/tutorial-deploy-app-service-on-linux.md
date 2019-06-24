---
Order: 10
Area: python
TOCTitle: Deploy to Azure App Service
ContentId: 1d4ae3ac-5d53-4e29-bf70-d97f1186c6c2
PageTitle: Deploy Python web apps to Azure App Service on Linux
DateApproved: 04/18/2019
MetaDescription: How to deploy Python web apps to Azure App Service on Linux
MetaSocialImage: images/tutorial/social.png
---
# Deploy to Azure App Service on Linux

This tutorial walks you through using Visual Studio Code to deploy a Python application to Azure App Service on Linux using the [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extension.

[Azure App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/app-service-linux-intro), currently in Preview for Python, runs your source code in a pre-defined Docker container. The characteristics of this container are summarized as follows (for full documentation, see [Configure Python apps for App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/how-to-configure-python)):

- Apps are run with Python 3.7 using the [Gunicorn](https://gunicorn.org) web server.
- The container includes [Flask](https://http://flask.pocoo.org) by default but not [Django](https://www.djangoproject.com).
- To install Django and any other dependencies, you **must** provide a `requirements.txt` file and deploy to App Service using Git, as shown in this tutorial. For App Service to install dependencies, `requirements.txt` must be deployed to the root folder.
- Although the container can run Django and Flask apps automatically, provided the app matches an expected structure, you can also provide a custom startup command file through which you have full control over the Gunicorn command line. A custom startup command is typically required for Flask apps, but not Django apps.
- The container definition itself is on the [github.com/Azure-App-Service/python](https://github.com/Azure-App-Service/python/tree/master/3.7.0).

If you encounter any problems in the course of this tutorial, feel free to file an issue in the [Visual Studio Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Prerequisites

To complete this tutorial, you need an Azure account, Visual Studio Code with the Azure App Service extension, a Python environment, and an app that you'd like to deploy.

### Azure account

If you don't have an Azure account, [sign up now](https://azure.microsoft.com/free/?utm_source=campaign&utm_campaign=vscode-tutorial-docker-extension&mktingSource=vscode-tutorial-docker-extension) for a free account with $200 in Azure credits to try out any combination of services.

### Visual Studio Code, Python, and the Azure App Service extension

Install the following software:

- [Visual Studio Code](https://code.visualstudio.com/).
- Python and the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extension as described on [Python Tutorial - Prerequisites](/docs/python/python-tutorial.md).
- The [Azure App Service](vscode:extension/ms-azuretools.vscode-azureappservice) extension, which provides interaction with Azure App Service from within VS Code. For general information, explore the [App Service extension tutorial](/tutorials/app-service-extension/getting-started.md) and visit the [vscode-azureappservice GitHub repository](https://github.com/Microsoft/vscode-azureappservice).

### Sign in to Azure

Once the App Service extension is installed, sign into your Azure account by navigating to the **Azure: App Service** explorer, select **Sign in to Azure**, and follow the prompts.

![Sign in to Azure through VS Code](images/deploy-azure/azure-sign-in.png)

After signing in, verify that you see the email account of your Azure around in the Status Bar and your subscription(s) in the **Azure: App Service** explorer:

![VS Code status bar showing Azure account](images/deploy-azure/azure-account-status-bar.png)

![VS Code Azure App Service explorer showing subscriptions](images/deploy-azure/azure-subscription-view.png)

> **Note**: If you see the error **"Cannot find subscription with name [subscription ID]"**, this may be because you are behind a proxy and unable to reach the Azure API. Configure `HTTP_PROXY` and `HTTPS_PROXY` environment variables with your proxy information in your terminal:
>
> ```sh
> # macOS/Linux
> export HTTPS_PROXY=https://username:password@proxy:8080
> export HTTP_PROXY=http://username:password@proxy:8080
>
> #Windows
> set HTTPS_PROXY=https://username:password@proxy:8080
> set HTTP_PROXY=http://username:password@proxy:8080
> ```

### Your application

If you don't already have an app you'd like to work with, use one of the options below. Be sure to verify that the app runs locally.

- Create a new folder, open it in VS Code, and add a file named `hello.py` with the contents below, which creates a minimal Flask app as used in this walkthrough. The app object is purposely named `myapp` to demonstrate how the names are used in the startup command for the App Service, as you see later.

    Also follow the instructions in [Flask Tutorial - Create a project environment for Flask](/docs/python/tutorial-flask.md#create-a-project-environment-for-flask) to create a virtual environment with Flask installed within which you can run the app locally.

    ```python
    from flask import Flask
    myapp = Flask(__name__)

    @myapp.route("/")
    def hello():
        return "Hello Flask, on Azure App Service for Linux"
    ```

- [python-sample-vscode-flask-tutorial](https://github.com/Microsoft/python-sample-vscode-flask-tutorial), which is the result of following the [Flask Tutorial](/docs/python/tutorial-flask.md).

- [python-sample-vscode-django-tutorial](https://github.com/Microsoft/python-sample-vscode-django-tutorial), which is the result of following the [Django Tutorial](/docs/python/tutorial-django.md).

    > **Caveat**: If your Django app uses a local SQLite database like this sample, you need to include a pre-initialized and pre-populated copy of the `db.sqlite3` file in your repository. The reason for this is that, at present, the preview of App Service for Linux doesn't have a means to run Django's `migrate` command as part of deployment, so you must deploy a pre-made database. Even then, the database is effectively read-only; writing to the database also causes errors. The workaround is to use a database that's hosted elsewhere, in which case you would deploy and initialize that database separately before deploying the app code as described in this tutorial.

## Create the App Service

1. In the **Azure: App Service** explorer, select the **+** command to create a new App Service, or open the Command Palette (`kb(workbench.action.showCommands)`) and select **Azure App Service: Create New Web App**. (In App Service terminology, a "web app" is a **host** for web app code, not the app code itself.)

    ![Create new App Service button in the App Service explorer](images/deploy-azure/app-service-create-new.png)

1. In the prompts that follow:

    - Enter a name for your app, which must be globally unique on App Service; typically you use your name or company name followed by the app name.
    - Select **Linux** for the operating system.
    - Select **[Preview] Python 3.7** as the runtime.

1. After a short time you see a message that the new App Service was created, along with the question **Deploy to web app?**. Answer **No** at this point because you need to change the deployment source to Git. Otherwise the "Deploy to Web App" command only copies your files to the server using a ZIP file and doesn't install your dependencies.

    ![Messages that appear after the App Service is created](images/deploy-azure/app-service-created.png)

1. To confirm that the App Service is running properly, expand your subscription in the **Azure: App Service** explorer, right-click the App Service name, and select **Browse website**:

    ![Browse Website command on an App Service in the App Service explorer](images/deploy-azure/browse-website-command.png)

1. Because you haven't deployed your own code to the App Service yet, you should see only the default app:

    ![Default Python app on App Service on Linux](images/deploy-azure/default-python-app.png)

### (Optional) Upload an environment variable definitions file

If you have an [environment variable definitions file](environments.md#environment-variable-definitions-file) (typically with the `.env` extension), you can use that file to configure the App Service environment as well:

1. In the **Azure: App Service** explorer, expand the node for the desired App Service, then right-click the **Application Settings** node and select **Upload Local Settings**.

1. VS Code prompts you for the location of your `.env` file, then uploads it to the App Service.

1. Once the upload is complete, you can expand the **Application Settings** node to see the individual values. You can also view them on the Azure portal by navigating to the App Service and selecting **Configuration**.

1. If you create settings directly on the Azure portal, you can save them in a definitions file by right-clicking the **Application Settings** node and selecting **Download Remote Settings**. This process makes sure that you have those settings in your repository and not only on the portal.

## Configure a custom startup file

Depending on how you've structured your app, you may need to create a custom startup command file for your app as described on [Configure Python apps for App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/how-to-configure-python) in the Azure docs.

The specific use cases of a custom startup command are as follows:

- You have a **Flask** app whose startup file and app object are named something *other* than `application.py` and `app`, respectively. In other words, unless you have an `application.py` in the root folder of your project, *and* the Flask app object is named `app`, then you need a custom startup command.
- You want to start the Gunicorn web server with additional arguments beyond the defaults, which are `--bind=0.0.0.0 --timeout 600`.

Django apps typically don't need customizations unless you want to provide additional arguments to Gunicorn.

If you need a custom startup file, first create the file and commit it to your repository so it can be deployed with the rest of the app code.

1. Create a file in your project named `startup.txt` (or another name of your choice) that contains your startup command. For Flask, see [Flask startup commands](#flask-startup-commands) in the next section.

1. In the **Azure: App Service** explorer, expand the App Service, right-click **Application Settings**, and select **Open in Portal**:

    ![Open Settings in Portal command in the App Service explorer](images/deploy-azure/open-settings-in-portal-command.png)

1. In the Azure portal, sign in if necessary; then on the **Application settings** page, enter your startup file name (like `startup.txt`) under **Runtime** > **Startup File**, then select **Save**. (This step is the one case in which you need to visit the Azure portal.)

    ![Setting the startup file name in the Azure portal](images/deploy-azure/azure-portal-startup-file.png)

1. The App Service restarts when you save changes. Because you still haven't deployed your app code, however, visiting the site at this point shows "Application Error." This message indicates that the Gunicorn server started but failed to find the app, and therefore nothing is responding to HTTP requests.

> **Note**: Instead of using a startup command file, you can also put the startup command directly in the **Startup File** field on the Azure portal. Using a file is generally preferable, however, as it keeps this bit of configuration in your repository where you can audit changes and redeploy to a different App Service instance altogether.

### Flask startup commands

By default, the App Service on Linux container assumes that a Flask app's startup file is named `application.py` and resides in the app's root folder. It further assumes that the Flask app object defined within that file is named `app`. If your app isn't structured in this exact way, then your custom startup command must identify the app object's location:

1. **Different file name and/or app object name**: for example, if the app's startup file is `hello.py`and the app object is named `myapp`, the startup command is as follows:

    ```text
    gunicorn --bind=0.0.0.0 --timeout 600 hello:myapp
    ```

1. **Startup file is in a subfolder**: for example, if the startup file is `myapp/website.py` and the app object is `app`, then use Gunicorn's `--chdir` argument to specify the folder and then name the startup file and app object as usual:

    ```text
    gunicorn --bind=0.0.0.0 --timeout 600 --chdir myapp website:app
    ```

1. **Startup file is within a module**: in the [python-sample-vscode-flask-tutorial](https://github.com/Microsoft/python-sample-vscode-flask-tutorial) code, the `webapp.py` startup file is contained within the folder `hello_app`, which is itself a module with an `__init__.py` file. The app object is named `app` and is defined in `__init__.py` and `webapp.py` uses a relative import. Because of this arrangement, pointing Gunicorn to `webapp:app` produces the error, "Attempted relative import in non-package," and the app fails to start.

    In this situation, create a simple shim file that imports the app object from the module, and then have Gunicorn launch the app using the shim. The [python-sample-vscode-flask-tutorial](https://github.com/Microsoft/python-sample-vscode-flask-tutorial) code, for example, contains `startup.py` with the following contents:

    ```python
    # startup.py shim
    from hello_app.webapp import app
    ```

    The startup command is then the following:

    ```text
    gunicorn --bind=0.0.0.0 --timeout 600 startup:app
    ```

## Add the app to a Git repository

As noted earlier, you must deploy to App Service on Linux using Git in order for the container to install your dependencies in `requirements.txt`. The following steps make sure you have both a `requirements.txt` file and a repository:

1. Create a `requirements.txt` file in your root folder if you don't have one already:

    1. Activate your virtual environment with the **Python: Select Interpreter** command on the **Command Palette** (`kb(workbench.action.showCommands)`).
    1. Open a terminal for the environment with **Terminal: Create New Integrated Terminal**.
    1. Make sure you're in the root folder of the app, then run `pip freeze > requirements.txt`.

    > **Tip**: be sure to place `requirements.txt` in the root folder, otherwise App Service won't find it and won't automatically install your dependencies.

1. In your project folder, create a file named `.gitignore` with the following contents (change `.venv` if you're using a different folder for a virtual environment):

    ```gitignore
    .vscode/
    __pycache__
    .venv/
    ```

1. From the **Command Palette**, run the **Git: Initialize Repository** command.

    ![Initialize repository command in the Command Palette](images/deploy-azure/source-control-initialize-repository-command.png)

    The same command is found at the top of the **Source Control** explorer:

    ![Initialize repository command in the Source Control explorer](images/deploy-azure/source-control-initialize-repository-button.png)

1. In the prompt that appears, select your current folder for the repository, then answer **Open Repository** in the subsequent message"

    ![Selecting a repository folder](images/deploy-azure/source-control-select-folder.png)

    ![Opening the repository after initialization](images/deploy-azure/source-control-open-repository.png)

1. In the Source Control explorer, you see your project files ready to commit to the repository. Enter a commit message like "Initial commit", then select the checkmark button:

    ![Commit the app code to source control](images/deploy-azure/source-control-commit.png)

## Deploy your app using Git

As mentioned earlier, you must use Git to deploy Python apps to App Service on Linux so that your dependencies in `requirements.txt` are installed. With Git deploy you can use either a local repository or a GitHub repository.

1. Make sure all your code changes are committed to your repository, and pushed to GitHub if you're using that option.

1. In the **Azure: App Service** explorer, right-click the App Service name, and select **Configure Deployment Source**:

    ![Configure Deployment Source command on an App Service in the App Service explorer](images/deploy-azure/configure-deployment-source.png)

1. When prompted, choose either **LocalGit** or **GitHub** as the source:

    - **LocalGit**: code is deployed from the currently active branch of your local copy of the repository.

    - **GitHub**: code is deployed from the selected branch of a GitHub repository, and happens automatically when you push commits to the repository. Selecting this option successively prompts you for the organization, repository, and branch to use.

1. With both choices, the extension connects the App Service to the repository. You don't see indications of the connection in VS Code itself; on the Azure portal, you can examine the connect on the Azure portal in the App Service's **Deployment Center** page.

1. To shorten deployment time, you can exclude VS Code files and your virtual environment by adding the following lines to the `.vscode/settings.json` file (replace `.env` with your particular virtual environment folder):

    ```json
    "appService.zipIgnorePattern": [
        ".vscode{,/**}",
        ".env{,/**}"
    ],
    ```

1. To deploy the app:

    - **LocalGit**: Commit your changes to your local repository, then right-click the App Service again, select **Deploy to Web App**, and select the project folder when prompted. (You can also select the deploy button at the top of the explorer.)

        ![Deploy to Web App command on an App Service in the App Service explorer](images/deploy-azure/deploy-to-web-app-command.png)

    - **GitHub**: Commit your changes, then do a Git push by selecting **Git: Push** from the Command Palette or by using the sync changes button on the status bar:

        ![Git sync changes button on the VS Code status bar](images/deploy-azure/git-sync-changes.png)

1. While deployment is taking place, you see an indicator in the App Service extension explorer:

    ![Deployment indicator in the App Service extension explorer](images/deploy-azure/deployment-underway.png)

    You can also observe progress in the **Output** panel (`kb(workbench.action.output.toggleOutput)`) by selecting **Azure App Service** from the drop-down:

    ![Observing App Service output in the Output window](images/deploy-azure/app-service-output.png)

1. After a minute or two (depending on how many dependencies are in your `requirements.txt`), VS Code reports that deployment is complete. To verify that your files are deployed, expand the App Service in the **Azure: App Service** explorer, then expand **Files**:

    ![Checking deployment files through the App Service explorer](images/deploy-azure/expand-files-node.png)

    The `antenv` folder is where App Service creates a virtual environment with your dependencies. If you expand this node, you can verify that the packages you named in `requirements.txt` are installed in `antenv/lib/python3.7/site-packages`.

1. Right-click the App Service again and select **Browse Website** to view your running app (you may need to refresh the browser if the previous page was cached):

    ![The app running successfully on App Service](images/deploy-azure/running-app.png)

## Make changes and redeploy

With your App Service connected to a repository, you have a simple code-test-deploy process:

1. Make changes and test the app locally.

1. Commit changes to your Git repository. Always remember this step, because the App Service extension pulls your code from the repository and won't pick up uncommitted changes!

1. Deploy the code:

    1. **LocalGit**: open the **Azure: App Service** explorer, right-click the App Service, and select **Deploy to Web App**.
    1. **GitHub**: push your changes to GitHub; App Service automatically deploys the code and restarts.

1. Once deployment is complete, wait a few seconds for the App Service to restart, then browse the website and verify your changes.

With any deployment option, you can observe status on the Azure portal under the App Service's **Deployment** > **Deployment options** page:

![Azure portal showing deployment status for an App Service](images/deploy-azure/deployment-options-status.png)

### Changing the GitHub branch

When you use the App Service extension in VS Code to set GitHub as the deployment source, you're prompted for a specific branch. This branch is then directly wired into the App Service configuration. To use a different branch, you must first disconnect the existing branch, then create a new connection:

1. In the **App Service** explorer in VS Code, right-click the App Service and select **Open in portal**.
1. On the portal, select **Deployment** > **Deployment options**, then select **Disconnect**.

    ![Disconnecting a deployment source](images/deploy-azure/deployment-options-disconnect.png)

1. Once disconnected, you can configure a new connection directly on the portal, or you can use the App Service extension in VS Code to set the deployment source to GitHub again, selecting the desired branch.

## Clean up resources

The App Service you created includes a backing App Service Plan that can incur costs. To clean up the resources, right-click the App Service in the **Azure: App Service** explorer and select **Delete**. You can also visit the [Azure portal](https://portal.azure.com), select **Resource groups** from the left-side navigation pane, select the resource group that was created in the process of this tutorial, and then use the **Delete resource group** command.

## Next steps

Congratulations on completing this walkthrough of deploying Python code to App Service on Linux!

As noted earlier, you can learn more about the App Service extension by visiting its GitHub repository, [vscode-azureappservice](https://github.com/Microsoft/vscode-azureappservice). Issues and contributions are also welcome.

To learn more about Azure services that you can use from Python, including data storage along with AI and Machine Learning services, visit [Azure Python Developer Center](https://docs.microsoft.com/python/azure/?view=azure-python).

There are also other Azure extensions for VS Code that you may find helpful. Just search on "Azure" in the Extensions explorer:

![Azure extensions for VS Code](images/deploy-containers/azure-extensions.png)

Some popular extensions are:

- [Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
- [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure CLI Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli)
- [Azure Resource Manager (ARM) Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools)

And again, if you encountered any problems in the course of this tutorial, feel free to file an issue in the [VS Code docs repo](https://github.com/Microsoft/vscode-docs/issues).
