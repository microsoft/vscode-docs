---
Order: 9
Area: python
TOCTitle: Deploy to Azure App Service
ContentId: e3f4006c-ab3f-4444-909b-fb045afcdf09
PageTitle: Deploy Python web apps to Azure App Service on Linux
DateApproved: 10/16/2018
MetaDescription: How to deploy Python web apps to Azure App Service on Linux
MetaSocialImage: images/tutorial/social.png
---
# Deploy to Azure App Service on Linux

This tutorial walks you through deploying a Python app to Azure App Service on Linux using the [VS Code App Service extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice).

[Azure App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/app-service-linux-intro), currently in Preview for Python, runs your code in a pre-defined Docker container. The characteristics of this container are summarized as follows (for full documentation, see [Configure Python apps for App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/how-to-configure-python):

- Apps are run with Python 3.7 using the Gunicorn web server.
- The container includes Flask by default but not Django.
- To install Django and any other dependencies, you must provide a `requirements.txt` file and deploy to App Service using Git, as shown in this tutorial.
- Although the container can run Django and Flask apps automatically, provided the app matches an expected structure, you can also provide a custom startup command file through which you have full control over the Gunicorn command line.
- The container definition itself is on the [github.com/Azure-App-Service/python](https://github.com/Azure-App-Service/python/tree/master/3.7.0).

## Prerequisites

To complete this tutorial you need an Azure account, Visual Studio Code with the App Service extension, a Python environment, and an app that you'd like to deploy.

### Azure account

If you don't have an Azure account, [sign up now](https://azure.microsoft.com/free/?utm_source=campaign&utm_campaign=vscode-tutorial-docker-extension&mktingSource=vscode-tutorial-docker-extension) for a free 30-day account with $200 in Azure credits to try out any combination of services.

### Visual Studio Code, Python, and the App Service extension

Install the following:

- [Visual Studio Code](https://code.visualstudio.com/).
- Python and the Python extension as described on [Python Tutorial - Prerequisites](/docs/python/python-tutorial.md).
- The [App Service Extension](vscode:extension/ms-azuretools.vscode-azureappservice), which provides interaction with Azure App Service from within VS Code. For general information, explore the [App Service extension tutorial](../app-service-extension/getting-started.md) and visit the [vscode-azureappservice GitHub repository](https://github.com/Microsoft/vscode-azureappservice).

### Sign in to Azure

Once the App Service extension is installed, sign into your Azure account by navigating to the **Azure: App Service** explorer, select **Sign in to Azure**, and follow the prompts.

![Sign in to Azure through VS Code](images/deploy-azure/azure-sign-in.png)

After signing in, verify that you see the email account of your Azure around in the Status Bar and your subscription(s) in the **Azure: App Service** explorer:

![VS Code status bar showing Azure account](images/deploy-azure/azure-account-status-bar.png)

![VS Code Azure App Service explorer showing subscriptions](images/deploy-azure/azure-subscription-view.png)

> **Note**: If you see the error **"Cannot find subscription with name [subscription ID]"**, this may be because you are behind a proxy and unable to reach the Azure API. Configure `HTTP_PROXY` and `HTTPS_PROXY` environment variables with your proxy information in your terminal:
>
> ```sh
> # MacOS/Linux
> export HTTPS_PROXY=https://username:password@proxy:8080
> export HTTP_PROXY=http://username:password@proxy:8080
>
> #Windows
> set HTTPS_PROXY=https://username:password@proxy:8080
> set HTTP_PROXY=http://username:password@proxy:8080
> ```

### App code

If you don't already have an app you'd like to work with, use one of the following:

- [python-sample-vscode-flask-tutorial](https://github.com/Microsoft/python-sample-vscode-flask-tutorial), which is the result of following the [Flask Tutorial](python/tutorial-flask.md).

- [python-sample-vscode-django-tutorial](https://github.com/Microsoft/python-sample-vscode-django-tutorial), which is the result of following the [Django Tutorial](python/tutorial-django.md).

After verifying that your app runs locally, generate a `requirements.txt` file using `pip freeze > requirements.txt`. (This file is included in both samples.)

> **Caveat**: As App Service for Linux is in preview, there are limitations with a Django app that uses a local SQLite database in a `db.sqlite3` file. You can deploy a pre-populated database which the app can use in a read-only manner; writing to the database causes an error. Also, the App Service for Linux preview at present lacks a means to initialize a new database on the App Service after you deploy code but before the App Service starts (after which the database is locked and you can't run the Django `migrate` command). These concerns aren't present, of course, when using a separate database.

## Add the app to a Git repository

As noted earlier, you must deploy to App Service on Linux using Git in order for the container to install your dependencies in `requirements.txt`. If you aren't already using a repository, create one by using the following steps:

1. In your project folder, create a file named `.gitignore` with the following contents (changing `env` if you're using a different folder for a virtual environment):

    ```gitignore
    .vscode/
    __pycache__
    env/
    ```

1. Create a `requirements.txt` file, if needed:

    1. Activate your virtual environment with the **Python: Select Interpreter** command on the **Command Palette** (`kb(workbench.action.showCommands)`).
    1. Open a terminal for the environment with **Terminal: Create New Integrated Terminal**.
    1. Run `pip freeze > requirements.txt`.

1. From the **Command Palette**, run the **Git: Initialize Repository** command.

    ![Initialize repository command in the command palette](images/deploy-azure/source-control-initialize-repository-command.png)

    The same command is found at the top of the **Source Control** explorer:

    ![Initialize repository command in the Source Control explorer](images/deploy-azure/source-control-initialize-repository-button.png)

1. In the dialog that appears, navigate to your project folder (where you typically create a Git repository), then select **Initialize Repository**.

1. In the **Source Control** explorer you see your project files ready to commit to the repository. Enter a commit message like "Initial commit", then select the checkmark button:

    ![Commit the app code to source control](images/deploy-azure/source-control-commit.png)

## Create the App Service

To deploy a Python app and install dependencies, it's necessary to create the App Service itself first, then deploy to App Service from Git.

1. In the **Azure: App Service** explorer, select the **+** command to create a new App Service, or open the command palette and select **Azure App Service: Create New Web App...". (In App Service parlance, a "web app" is a *host* for web app code, not the app code itself.)

    ![Create new App Service button in the App Service explorer](images/deploy-azure/app-service-create-new.png)

1. In the prompts that follow:

    - Enter a name for your app, which must be globally unique on App Service; typically you use your name or company name followed by the app name.
    - Select **Linux** for the operating system.
    - Select **[Preview] Python 3.7** as the runtime.

1. After a short time you see a message that the new App Service was created, along with the question **Deploy to web app?**. Answer **No** at this point because you need to change the deployment source to Git. Otherwise the "Deploy to Web App" command only copies your files to the server using a ZIP file and doesn't install your dependencies.

    ![Messages that appear after the App Service is create](images/deploy-azure/app-service-created.png)

1. To test that the App Service was created properly, expand your subscription in the **Azure: App Service** explorer, right-click the App Service name, and select **Browse website**:

    ![Browse Website command on an App Service in the App Service explorer](images/deploy-azure/browse-website-command.png)

1. Because you haven't deployed your own code to the App Service yet, you should see only the default app:

    ![Default Python app on App Service on Linux](images/deploy-azure/default-python-app.png)

## Configure a custom startup file

Depending on how you've structured your app, you may need to create a custom startup command file for your app as described on [Configure Python apps for App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/how-to-configure-python) in the Azure docs. For example, if you want to provide more arguments to Gunicorn, or you have a Flask app whose startup file isn't named `application.py`, then you need a custom command file. For a typical Django app, the App Service automatically finds the `wsgi.py` file needed to launch the app, so customizations aren't necessary.

If you need a custom startup file, you first create the file and commit it to your repository so it can be deployed with the rest of the app code.

1. Create a file in your project named `startup.txt` (the name is up to you) that contains your startup command. For Flask, see [Flask startup commands](#flask-startup-commands) in the next section.

1. Commit the command file to your Git repository.

1. In the **Azure: App Service** explorer, navigate to and right-click the App Service, and select **Open in Portal**:

    ![Open in Portal command in the App Service explorer](images/deploy-azure/open-in-portal-command.png)

1. In the Azure portal, sign in if necessary, then select **Application settings**, enter your startup file name under **Runtime** > **Startup File**, then select **Save**. (This is the one case in which you need to visit the Azure portal.)

    ![Setting the startup file name in the Azure Portal](images/deploy-azure/azure-portal-startup-file.png)

1. The App Service restarts when you save changes. Because you still haven't deployed your app code, however, visiting the site at this point shows "Service Unavailable." This message indicates that the Gunicorn server started but failed to find the app, and therefore nothing is responding to HTTP requests.

> **Note**: Instead of using a startup command file, you can also put the startup command directly in the **Startup File** field on the Azure portal. Using a file is generally preferable, however, as it keeps this bit of configuration in your repository where you can audit changes and redeploy to a different App Service instance altogether.

### Flask startup commands

By default, the App Service on Linux container assumes that a Flask app's startup file is named `application.py` and resides in the app's root folder. It further assumes that the Flask app object defined within that file is named `app`. If your app isn't structured in this exact way, then your Gunicorn startup command must identify the app object's location:

1. Different file name and/or app object name: for example, if the app's startup file is `hello.py`and the app object is named `myapp`, the startup command is as follows:

    ```text
    gunicorn --bind=0.0.0.0 --timeout 600 hello:myapp
    ```

1. Startup file is in a subfolder: for example, if the startup file is `myapp/website.py` and the app object is `app`, then use Gunicorn's `--chdir` argument to specify the folder and then name the startup file and app object as usual:

    ```text
    gunicorn --bind=0.0.0.0 --timeout 600 --chdir myapp website:app
    ```

1. Startup file is within a module: for example, the startup file is `hello_app/webapp.py` and `hello_app` is itself a module with an `__init__.py` file. The app object is named `app` and is defined in `__init__.py` and `webapp.py` uses a relative import. Because of this arrangement, you can't simply point to `webapp.py`: Python produces a "Attempted relative import in non-package" error and the app fails to start.

    In this situation, the easiest answer is to create a simple shim file that imports the app object from the module. You can then have Gunicorn start the shim. In the example given here, which matches the [python-sample-vscode-flask-tutorial](https://github.com/Microsoft/python-sample-vscode-flask-tutorial) code, you can creae a file like `startup.py` in the project root with the following contents:

    ```python
    from hello_app.webapp import app
    ```

    The startup command is then the following:

    ```text
    gunicorn --bind=0.0.0.0 --timeout 600 startup:app
    ```

## Deploy your app code using Git

As mentioned earlier, you must use Git to deploy Python apps to App Service on Linux so that your dependencies in `requirements.txt` are installed.

In this step you can choose from two Git sources:

1. In the **Azure: App Service** explorer, right-click the App Service name, and select **Configure Deployment Source**:

    ![Configure Deployment Source command on an App Service in the App Service explorer](images/deploy-azure/configure-deployment-source.png)

1. When prompted, choose either **LocalGit** or **GitHub** as the source. You choice is saved with the App Service (VS Code itself shows no indicator).

    - LocalGit: code is deployed from the currently active branch of your local copy of the repository.

    - GitHub: code is deployed from the selected branch of a GitHub repository. Selecting this option successively prompts you for the organization, repository, and branch to use, after which the extension connects the App Service directly to the repository. The connection means that pushing commits to the repository trigger a new deployment.

        The App Service extension may also inform you that "You must give Azure access to your GitHub account." For details, see [GitHub Access](#github-access) below; the **Learn More** button in the warning unfortunately takes you to an outdated article.

1. To deploy the app:

    - LocalGit: Right-click the App Service again and select **Deploy to Web App**, and select the project folder when prompted.

        ![Deploy to Web App command on an App Service in the App Service explorer](images/deploy-azure/deploy-to-web-app-command.png)

    - GitHub: Do a Git push by selecting **Git: Push** from the Command Palette.

1. While deployment is taking place, you see an indicator in the App Service extension explorer:

    ![Deployment indicator in the App Service extension explorer](images/deploy-azure/deployment-underway.png)

    You can also observe progress in the **Output** panel by selecting **Azure App Service** from the drop-down.

1. After a minute or two (depending on how many dependencies are in your `requirements.txt`), VS Code reports that deployment is complete. To verify that your files are deployed, expand the App Service in the **Azure: App Service** explorer, then expand **Files**:

    ![Checking deployment files through the App Service explorer](images/deploy-azure/expand-files-node.png)

1. You can also expand the `antenv` folder, which is where App Service creates a virtual environment with your dependencies, and verify that the packages you named in `requirements.txt` are installed in `antenv/lib/python3.7/site-packages`.

    > **Tip**: At present, the App Service extension sorts all files and folders alphabetically, and indents files slightly more than folders. As a result, you might confuse files as children of a preceding folder, when those file actually exist in the root folder. (See [issue 631](https://github.com/Microsoft/vscode-azureappservice/issues/631) in the App Service extension GitHub repo.)

1. Right-click the App Service again and select **Browse Website** to view your running app:

    ![The app running successfully on App Service](images/deploy-azure/running-app.png)

### Changing the GitHub branch

When you use the App Service extension in VS Code to set GitHub as the deployment source, you're prompted for a specific branch. This branch is then directly wired into the App Service configuration. To use a different branch, you must first disconnect the existing branch, then create a new connection:

1. In the **App Service** explorer in VS Code, right-click the App Service and select **Open in portal**.
1. On the portal, select **Deployment** > **Deployment options**.
1. Select **Disconnect**.
1. Once disconnected, you can configure a new connection directly on the portal, or you can use the App Service extension in VS Code to set the deployment source to GitHub again, selecting the desired branch.

## Make changes and redeploy

Now that you have your code in a repository, have set up an App Service, and have configured the App Service extension to deploy from that repository, your code-test-deploy process looks like this:

1. Make changes and test the app locally.
1. Commit changes to your Git repository. Always remember this step, because the App Service extension pulls your code from the repository and won't pick up uncommitted changes!
1. Deploy the code:

    1. If you're using the LocalGit option, open the **Azure: App Service** explorer, right-click the App Service, and select **Deploy to Web App**.
    1. If you're using GitHub, push your changes to GitHub and App Service automatically deploys the code and restarts.

1. Once deployment is complete, wait a few seconds for the App Service to restart, then browse the website and verify your changes.

With any deployment option, you can observe status on the Azure portal under the App Service's **Deployment** > **Deployment options** page:

![Azure portal showing deployment status for an App Service](images/deploy-azure/deployment-options-status.png)

## Next steps

Congratulations on completing this walkthrough of deploying Python code to App Service on Linux!

As noted earlier, you can learn more about the App Service extension by visiting its GitHub repository, [vscode-azureappservice](https://github.com/Microsoft/vscode-azureappservice). Issues and contributions are also very welcome.

To learn more about Azure services that you can use from Python, including data storage along with AI and Machine Learning services, visit [Azure Python Developer Center](https://docs.microsoft.com/python/azure/?view=azure-python).

There are also other Azure extensions for VS Code that you may find helpful. Just search on "Azure" in the Extensions explorer:

![Azure extensions for VS Code](images/deploy-containers/azure-extensions.png)

A few favorites include:

- [Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
- [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure CLI Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli)
- [Azure Resource Manager (ARM) Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools)

And again, if you've encountered any problems in the course of this tutorial, feel free to file an issue for this tutorial in the [VS Code docs repo](https://github.com/Microsoft/vscode-docs/issues).
