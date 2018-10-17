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

[Azure App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/app-service-linux-intro), currently in Preview for Python, runs your code in a pre-defined Docker container. The characteristics of this container are fully documented on [Configure Python apps for App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/how-to-configure-python), and are summarized as follows:

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

- [python-sample-vscode-django-tutorial](https://github.com/Microsoft/python-sample-vscode-django-tutorial), which is the result of following the [Django Tutorial](python/tutorial-django.md). Specifically use the "app-service-deploy" branch, which contains some necessary details for deployment to App Service.

After verifying that your app runs properly, generate a `requirements.txt` file using `pip freeze > requirements.txt`. (This file is included in both samples.)

## Add the app to a Git repository

As noted earlier, you must deploy to App Service on Linux using Git in order for the container to install your dependencies in `requirements.txt`. If you aren't already using a repository, create one by using the following steps:

1. In your project folder, create a file named `.gitignore` with the following contents (changing `env` if you're using a different folder for a virtual environment):

    ```gitignore
    .vscode/
    __pycache__
    env/
    ```

1. If you don't already have a `requirements.txt` file, create one now by running `pip freeze > requirements.txt` in a terminal with your virtual environment activated.

1. Open the **Command Palette** (`kb(workbench.action.showCommands)`) and run the **Git: Initialize Repository** command.

    ![Initialize repository command in the command palette](images/deploy-azure/source-control-initialize-repository-command.png)

    The same command is found at the top of the **Source Control** explorer:

    ![Initialize repository command in the Source Control explorer](images/deploy-azure/source-control-initialize-repository-button.png)

1. In the dialog that appears, navigate to your project folder (where you typically create a Git repository), then select **Initialize Repository**.

1. In the **Source Control** explorer you see your project files ready to commit to the repository. Enter a commit message like "Initial commit", then select the checkmark button:

    ![Commit the app code to source control](images/deploy-azure/source-control-commit.png)

## Create the App Service

To deploy a Python app an install dependencies, it's necessary to create the App Service itself first, then deploy to App Service from Git.

1. In the **Azure: App Service** explorer, select the **+** command to create a new App Service, or open the command palette and select **Azure App Service: Create New Web App...". (In App Service parlance, a "web app" is a *host* for web app code, not the app code itself.)

    ![Create new App Service button in the App Service explorer](images/deploy-azure/app-service-create-new.png)

1. In the prompts that follow:

    - Enter a name for your app, which must be globally unique on App Service; typically you use your name or company name followed by the app name.
    - Select **Linux** for the operating system.
    - Select **[Preview] Python 3.7** as the runtime.

1. After a short time you see a message that the new App Service was created, along with the question **Deploy to web app?**. For the question, answer **No** because you want to use Git deployment instead.

    ![Messages that appear after the app service is create](images/deploy-azure/app-service-created.png)

    You answer **No** at this point because you need to configure the deployment source first. Otherwise the "Deploy to Web App" command only copies your files to the server using a ZIP file and doesn't install your dependencies.

1. To test that the App Service was created properly, expand your subscription in the **Azure: App Service** explorer, right-click the app service name, and select **Browse website**:

    ![Browse Website command on an App Service in the App Service explorer](images/deploy-azure/browse-website-command.png)

1. Because you haven't deployed your own code to the App Service yet, you should see only the default app:

    ![Default Python app on App Service on Linux](images/deploy-azure/default-python-app.png)

## Configure a custom startup file

Depending on the way you've structured your app, you may need to create a custom startup command file for your app as described on [Configure Python apps for App Service on Linux](https://docs.microsoft.com/azure/app-service/containers/how-to-configure-python) in the Azure docs. For example, if you want to provide more arguments to Gunicorn, or you have a Flask app whose startup file isn't named `application.py`, then you need a custom command file.

1. Create a file in your project named `startup.txt` (the name is up to you) that contains your startup command. For example, if you have a Flask app whose startup file is `hello.py`and the Flask app object is named `app`, the contents of the file should be as follows:

    ```text
    gunicorn --bind=0.0.0.0 --timeout 600 hello:app
    ```

1. Commit the command file to your Git repository.

1. In the **Azure: App Service** explorer, right-click the App Service and select **Open in Portal**:

    ![Open in Portal command in the App Service explorer](images/deploy-azure/open-in-portal-command.png)

1. In the Azure portal, select **Application settings**, enter your startup file name under **Runtime** > **Startup File**, then select **Save**. (This is the one case in which you need to visit the Azure portal.)

    ![Setting the startup file name in the Azure Portal](images/deploy-azure/azure-portal-startup-file.png)

> **Note**: Because you still haven't deployed your app code visiting the site at this point shows "Service unavailable", which means the Gunicorn server started but failed to find the app, and therefore nothing is responding to HTTP requests.

## Deploy your app code using Git

As mentioned earlier, you must use Git to deploy Python apps to App Service on Linux so that your dependencies in `requirements.txt` are installed.

In this step you can choose from two sources:

- Local Git: code is deployed from the currently active branch of your local copy of the repository. This option is best if you want to deploy different branches to staging sites running on App Service, or if you maintain the production copy of the app on your computer directly.
- GitHub: code is deployed from the master branch of a GitHub repository, which naturally includes all changes that have been merged from everyone in a development team. This option is best when you want to deploy the production version of an app, to both primary staging sites and your production site.

1. In the **Azure: App Service** explorer, right-click the app service name, and select **Configure Deployment Source**:

    ![Configure Deployment Source command on an App Service in the App Service explorer](images/deploy-azure/configure-deployment-source.png)

1. When prompted, choose either **LocalGit** or **GitHub** as the source.

    When choosing **GitHub**, the App Service extension informs you that "You must give Azure access to your GitHub account" as shown below. For details, see [GitHub Access](#github-access) below; the **Learn More** button in the warning unfortunately takes you to an outdated

1. Right-click the app service again and select **Deploy to Web App**.

    ![Deploy to Web App command on an App Service in the App Service explorer](images/deploy-azure/deploy-to-web-app-command.png)

1. After a minute or two (depending on how many dependencies are in your `requirements.txt`), VS Code reports that deployment is complete. To verify that your files are deployed, expand the App Service in the **Azure: App Service** explorer, then expand **Files**:

    ![Checking deployment files through the App Service explorer](images/deploy-azure/expand-files-node.png)

1. You can also expand the `antenv` folder, which is where App Service creates a virtual environment with your dependencies, and verify that the packages you named in `requirements.txt` are installed in `antenv/lib/python3.7/site-packages`.

    > **Tip**: At present, the App Service extension sorts all files and folders alphabetically, and indents files slightly more than folders. The result is that it's easy to think that the files are children of a preceding folder. (See [issue 631](https://github.com/Microsoft/vscode-azureappservice/issues/631) in the App Service extension GitHub repo.)

1. Right-click the App Service again and select **Browse Website** to view your running app:

    ![The app running successfully on App Service](images/deploy-azure/running-app.png)

## Make changes and redeploy

Now that you have your code in a repository, have set up an App Service, and have configured the App Service extension to deploy from that repository, your code-test-deploy process looks like this:

1. Make changes and test the app locally.
1. Commit changes to your Git repository. Always remember this step, because the App Service extension pulls your code from the repository and won't pick up uncommitted changes!
1. In the **Azure: App Service** explorer, right-click the App Service and select **Deploy to Web App**.
1. Once deployment is complete, wait a few seconds for the App Service to restart, then browse the website and verify your changes.

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
