---
Order: 10
Area: python
TOCTitle: FastAPI Tutorial
ContentId: 0d32bced91aa5c2ee5696fc7995370ae
PageTitle: Python and FastAPI Tutorial in Visual Studio Code
DateApproved:
MetaDescription: Python FastAPI tutorial showing IntelliSense and debugging support in Visual Studio Code, the best Python IDE.
---
# FastAPI Tutorial in Visual Studio Code

[FastAPI](https://fastapi.tiangolo.com/) is a modern high-performant web framework for building APIs with Python. It is designed to make it easy to build APIs quickly and efficiently while providing features like automatic validation, serialization, and documentation of your API, making it a popular choice for building web services and microservices.

In this FastAPI tutorial, we will create a grocery list app using FastAPI. By the end of the tutorial, you will understand how to work with FastAPI in the VS Code terminal, editor, and debugger. This tutorial is not a FastAPI deep dive. For that, you can refer to the [official FastAPI documentation](https://fastapi.tiangolo.com/).

If this is your first time using Python, we recommend you to start with our [Python tutorial](python-tutorial.md) to get familiar with the language and VS Code's Python support. This tutorial is more suited for those who are already familiar with Python and want to learn how to work with FastAPI in VS Code.

The completed code project from this FastAPI tutorial can be found on GitHub: [python-sample-vscode-fastapi-tutorial](https://github.com/microsoft/python-sample-vscode-fastapi-tutorial).

If you have any problems, you can search for answers or ask a question on the [Python extension Discussions Q&A](https://github.com/microsoft/vscode-python/discussions/categories/q-a).

## Set up the project
There are different ways you can set up your project for this tutorial. We will cover how you can set it up in [GitHub Codespaces](#github-codespaces) and in [VS Code on your local machine](#locally-in-vs-code).

### GitHub Codespaces
You can set up this project to develop in [GitHub Codespaces](https://github.com/features/codespaces), where you can code, debug, and run your app remotely in a Codespace. A Codespace allows you to access a fully-configured development environment hosted in the cloud, eliminating the need for local setup. This environment includes your project's dependencies, tools, and extensions, ensuring a consistent and reproducible development experience. It streamlines collaboration by providing real-time editing, integrated version control, and easy access to debugging and testing tools, all while maintaining the security and reliability of your project.

> Note: All GitHub.com accounts have a monthly quota of free use of GitHub Codespaces included in the Free or Pro plan. For more information, see "[About billing for GitHub Codespaces](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)".

To set it up for this tutorial, navigate to [this project's GitHub repository](https://github.com/microsoft/python-sample-vscode-fastapi-tutorial). This Codespace will contain all the necessary configurations and dependencies to quickly get started with FastAPI development.

To get the most of this tutorial, select the **dictionarybased** branch:
![dictionarybased branch selected in the python-sample-vscode-fastapi-tutorial GitHub repo.](images/fastapi-tutorial/dictionarybased_github_branch.png)

Then, select **Code** > **Codespaces** > **Create Codespace on \<dictionarybased\>** branch to create and open a Codespace for your project.

Once you're done, you can continue with the [Replace the database](#replace-the-database) section below.

### Locally in VS Code
To successfully complete this tutorial in [VS Code](https://code.visualstudio.com/), you need to first setup your Python development environment. Specifically, this tutorial requires:
- Python 3 (check the [installation guide](python-tutorial.md#install-a-python-interpreter) if you don’t have it installed)
- [Python extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python) (For additional details on installing extensions, see [Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-marketplace))

In this section, we will create a folder to be opened as a workspace in VS Code, set up a Python virtual environment, and install the project’s dependencies.

1.	In your file system, create a project folder for this tutorial, such as `groceries-plugin`.
2.	Open this new folder in VS Code (**File** > **Open Folder…** or `kb(workbench.action.files.openFolder)`).
3. When the [Workspace Trust](/docs/editor/workspace-trust) prompt shows up, click on the "Yes, I trust the authors" button to allow the workspace to access necessary resources and extensions. You can learn more about Workspace Trust in the [documentation](/docs/editor/workspace-trust).

Now, let’s create a `requirements.txt` file listing the dependencies we wish to install for the application. The `requirements.txt` file is a common practice in Python development, used to specify the libraries that your project relies on and their versions. This file helps ensure that anyone working on the project can recreate a similar development environment, making it a convenient component for maintaining consistency across different development environments.

We will want to install FastAPI for creating the app, uvicorn to work as the server, and Redis and type-redis for handling data storage and interacting with a Redis database.

4. Create a new file in VS Code (**File** > **New Text File** or `kb(workbench.action.files.newUntitledFile)`).
5. Add the following content to it:
    ```
    fastapi
    redis
    types-redis
    uvicorn
    ```
6.	Save the file (`kb(workbench.action.files.save)`) and name it `requirements.txt`
7.	Create a virtual environment by opening the Command Palette (`kb(workbench.action.showCommands)`) and running the **Python: Create Environment** command.
    > Note: this step may take a couple of minutes to complete.
8. When asked by the environment type, select **Venv**:
![Drop down with "Venv" or "Conda" as options for environments that can be created with the Python: Create Environment command.](images/environments/create_environment_dropdown.png)

9. Then select the latest version of Python available on your machine:
![List of available global environments that can be used to create a virtual environment.](images/fastapi-tutorial/create_environment_interpreters_list.png)

10. Select the `requirements.txt` file from the drop-down list, so the dependencies are automatically installed, and then select "OK":
![Check box selected to install dependencies from requirements.txt file](images/fastapi-tutorial/create_environment_select_requirements.png)

The virtual environment will be created, the dependencies will be automatically installed and the environment will be selected for your workspace to be used by the Python extension. You can confirm it's been selected by checking the bottom right corner of VS Code:

![Environment in the status bar](images/shared/environment-in-status-bar.png)

> Note: If you don't see the newly created environment information on the status bar, you can click on the Python interpreter indicator (or run the **Python: Select Interpreter** command from the Command Palette) and manually select the virtual environment.

## Start Coding

Let’s create the application!
1. Create a new Python file by clicking on **File** > **New File…** (`kb(workbench.action.files.newFile)`), and then select "Python File".
2. Save it as `main.py` (`kb(workbench.action.files.saveAs)`) in the `groceries-plugin` folder.
3. Add the following code to `main.py` and save the file:
    ```python
    from fastapi import FastAPI

    app = FastAPI()

    @app.get("/")
    def root():
        return {"message": "Hello World"}
    ```
4. Run the code by starting up the debugger (`kb(workbench.action.debug.start)`)
5. From the drop-down menu, select the **FastAPI** configuration option from the drop-down list:
![Drop down with debugger configuration options, with FastAPI being highlighted.](images/fastapi-tutorial/fastapi_debug_config_option.png)

    This will invoke uvicorn to start the application server through the debugger, which will allow us to step through the code to inspect its behavior. You will see something like the following in the terminal:

    ![Uvicorn server running message displayed in the terminal, with an URL to access the app.](images/fastapi-tutorial/fastapi_debug_terminal.png)

6. `Ctrl` + click the http://127.0.0.1:8000/ URL in the terminal to open your default browser to that address:
![Hello World message displayed in the browser.](images/fastapi-tutorial/helloworld_browser.png)

    Congrats! Your FastAPI app is up and running!

7. Stop the debugger by clicking on the stop icon in the debug toolbar, or through `kb(workbench.action.debug.stop)`.

## Create a model for grocery list items
Now that we have the FastAPI app working, let’s define our grocery list items by creating a Pydantic model.
Pydantic is a data validation and parsing library that integrates seamlessly with FastAPI. It allows you to define data models using Python classes with [type hints](https://docs.python.org/3/library/typing.html) for automatic validation and parsing of incoming data (which are called payloads) in API requests.


Pylance, the default language server for Python in VS Code, supports type hinting features that can be helpful for working with Pydantic models and FastAPI. This is because Pylance is built on top of [Pyright](https://github.com/microsoft/pyright), which is a static type checker for Python that can detect type errors in your code to prevent bugs and improve code quality.

The 3 steps below are optional, but given FastAPI leverages type hints extensively to improve code readability and validation, we can take advantage of Pylance's type checking features to catch errors early on:

1. Open the Settings UI page (`kb(workbench.action.openSettings)`)
2. Search for "python type checking mode" and set it to "basic" to enable basic type checking. This will enable Pylance to show diagnostics and warnings to catch simple type-related errors. Alternatively, you can set it to "strict" to enable more advanced [type checking rules](https://microsoft.github.io/pyright/#/configuration?id=diagnostic-rule-defaults).
    ![Python Analysis Type Checking Mode options (off, basic and strict) in settings UI page.](images/fastapi-tutorial/type_checking_mode_setting.png)
3. Next, search for "Python inlay type hints", and enable inlay hints for Variable Types and Function Return Types:
    ![Two Python Analysis Type Hints settings being enabled in the settings UI page: for Function Return Types and for Variable Types.](images/fastapi-tutorial/function_and_variable_return_type_hint_settings.png)

Now let's create a Pydantic model for grocery list items.
1. Create a new Python file (`kb(workbench.action.files.newFile)` and select "Python File"
2. Add the following lines to the file, and then save it in the `groceries-plugin` folder as `models.py` (`kb(workbench.action.files.saveAs)`):
    ```python
    from typing import Optional
    from pydantic import BaseModel

    class ItemPayload(BaseModel):
        item_id: Optional[int]
        item_name: str
        quantity: int
    ```

## Create Routes
Now we need a place to store the grocery list items. For simplicity, let’s start with an empty dictionary.
1. First, let's import all the packages we will need for the sample. Open the `main.py` file and replace the first import line with the following ones:
    ```python
    from fastapi import FastAPI, HTTPException

    from models import ItemPayload
    ```
2. Now add the following line right below `app = FastAPI()`:
    ```python
    grocery_list: dict[int, ItemPayload] = {}
    ```

    This creates a new empty dictionary that will receive keys of type `int` (which will be item IDs) and values of the `ItemPayload` type.

We'll now define routes in our FastAPI application. In the context of web applications, routes are like pathways that map specific URLs to the code that handles them. These routes serve as the entry points for different functionalities within our application. When a client, such as a web browser or another program, sends a request to our application with a particular URL, FastAPI routes that request to the appropriate function (also known as route handler or view function) based on the URL, and that function processes the request and generates a response.

Let's proceed with defining routes that will allow us to add and retrieve individual items, as well as list all items in the grocery list.

3. Add the following route at the end of the `main.py` file:
    ```python
    # Route to add a item
    @app.post("/items/{item_name}/{quantity}")
    def add_item(item_name: str, quantity: int):
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0.")
        # if item already exists, we'll just add the quantity.
        # get all item names
        items_ids = {item.item_name: item.item_id if item.item_id is not None else 0 for item in grocery_list.values()}
        if item_name in items_ids.keys():
            # get index of item_name in item_ids, which is the item_id
            item_id = items_ids[item_name]
            grocery_list[item_id].quantity += quantity
    # otherwise, create a new item
        else:
            # generate an id for the item based on the highest ID in the grocery_list
            item_id = max(grocery_list.keys()) + 1 if grocery_list else 0
            grocery_list[item_id] = ItemPayload(
                item_id=item_id, item_name=item_name, quantity=quantity
            )

        return {"item": grocery_list[item_id]}
    ```

    If you have enabled type hints, you might notice Pylance adds inlay hints with the function return type, as well as the types for `item_ids` and `item_id`. You can optionally double click on each suggestion to insert them into the code:
    ![Inlay function return and variable type hints being displayed by Pylance throughout the sample code.](images/fastapi-tutorial/pylance_inlay_hints.png)

Now let's see if this route is working as expected. The fastest way to do so is to leverage both VS Code's debugger as well as FastAPI's `/docs` endpoint, which provides information about all the available API routes and allows you to interact with the API to explore their parameters and responses. This documentation is generated dynamically based on the metadata and type hints defined in the FastAPI application.

4. Add a breakpoint next to the if quantity <= 0 statement, by clicking on the left margin of the line number (or `kb(editor.debug.action.toggleBreakpoint)`). This will make the debugger stop prior to the execution of that line, allowing us to inspect the code line by line.
    ![Breakpoint set next to the first line in the add_item function.](images/fastapi-tutorial/debugger_breakpoint.png)

5. Start the debugger (`kb(workbench.action.debug.start)`), and then navigate to http://127.0.0.1:8000/docs in the browser.

    You'll see a Swagger interface with the two endpoints available in the app: `/items` and root (`/`).
    ![Swagger UI displaying two endpoints: /items and /](images/fastapi-tutorial/fastapi_first_swagger_page.png)

6. Click on the down arrow next to the `/items` route to expand it, and click on the "Try it out" button that appears on the right side.
    ![Try it out button displayed next to the /items route in the Swagger UI.](images/fastapi-tutorial/fastapi_tryitout_button.png)

7. Add a grocery list item by passing a string to the "item" field, and a number to "quantity". For example, you could provide apple as the `item_name` and 2 as the `quantity`.

8. Click on the "Execute" button.
    ![Execute button displayed below the /items route.](images/fastapi-tutorial/fastapi_execute_button.png)

9. Open VS Code again and notice the debugger has stopped at the breakpoint we set earlier.
    ![Debugger stopped at the breakpoint set in the add_item function.](images/fastapi-tutorial/fastapi_breakpoint_hit.png)

On the left side, you will see all local and global variables defined at this point in the Variables window, under the **Run and Debug** view. In our example, we can see `item_name` set to apple and `quantity` set to 2 under the locals variable view, as well as an empty `grocery_list` dictionary under the globals variable view.

![Variables window displayed in the Run and Debug view, with the item and grocery_list variables highlighted.](images/fastapi-tutorial/fastapi_debugger_variables.png)

Now let’s leverage VS Code's Debug Console to do some exploration.

10.	Select the `quantity <= 0` statement, right-click on the editor and select **Evaluate in Debug Console**:
    ![Evaluate in Debug Console option displayed in the context menu when right-clicking on a line of code.](images/fastapi-tutorial/fastapi_evaluate_debug_console.png)

    This will open the Debug Console and run the selected expression. As expected in our example, the expression will be evaluated to `False`.

The Debug Console can be a powerful tool to quickly test expressions and better understand the state of your code at the time of a breakpoint. You can also use it to run arbitrary code, such as calling functions or printing variables. You can learn more about Python debugging in VS Code in the [Python tutorial](python-tutorial.md#configure-and-run-the-debugger).

You can now continue the execution of the code by clicking on the "Continue" button in the debug toolbar, or by pressing `F5` (`kb(workbench.action.debug.continue)`).

Finally, let's add the remaining routes for the application so we can list all items or specific items, as well as remove them from our grocery list. You can leave the debugger running as it will automatically reload the application when you save the changes you'll make in the next step.

11. Replace the content in `main.py` with the code below:
    ```python
    from fastapi import FastAPI, HTTPException

    from models import ItemPayload

    app = FastAPI()

    grocery_list: dict[int, ItemPayload] = {}

    # Route to add an item
    @app.post("/items/{item_name}/{quantity}")
    def add_item(item_name: str, quantity: int) -> dict[str, ItemPayload]:
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0.")
        # if item already exists, we'll just add the quantity.
        # get all item names
        items_ids: dict[str, int] = {
            item.item_name: item.item_id if item.item_id is not None else 0
            for item in grocery_list.values()
        }
        if item_name in items_ids.keys():
            # get index of item_name in item_ids, which is the item_id
            item_id: int = items_ids[item_name]
            grocery_list[item_id].quantity += quantity
        # otherwise, create a new item
        else:
            # generate an ID for the item based on the highest ID in the grocery_list
            item_id: int = max(grocery_list.keys()) + 1 if grocery_list else 0
            grocery_list[item_id] = ItemPayload(
                item_id=item_id, item_name=item_name, quantity=quantity
            )

        return {"item": grocery_list[item_id]}


    # Route to list a specific item by id
    @app.get("/items/{item_id}")
    def list_item(item_id: int) -> dict[str, ItemPayload]:
        if item_id not in grocery_list:
            raise HTTPException(status_code=404, detail="Item not found.")
        return {"item": grocery_list[item_id]}


    # Route to list all items
    @app.get("/items")
    def list_items() -> dict[str, dict[int, ItemPayload]]:
        return {"items": grocery_list}


    # Route to delete a specific item by id
    @app.delete("/items/{item_id}")
    def delete_item(item_id: int) -> dict[str, str]:
        if item_id not in grocery_list:
            raise HTTPException(status_code=404, detail="Item not found.")
        del grocery_list[item_id]
        return {"result": "Item deleted."}


    # Route to remove some quantity of a specific item by id
    @app.delete("/items/{item_id}/{quantity}")
    def remove_quantity(item_id: int, quantity: int) -> dict[str, str]:
        if item_id not in grocery_list:
            raise HTTPException(status_code=404, detail="Item not found.")
        # if quantity to be removed is higher or equal to item's quantity, delete the item
        if grocery_list[item_id].quantity <= quantity:
            del grocery_list[item_id]
            return {"result": "Item deleted."}
        else:
            grocery_list[item_id].quantity -= quantity
        return {"result": f"{quantity} items removed."}

    ```

12. Save the file (`kb(workbench.action.files.save)`). The application should automatically reload.

You can now open the `/docs` page again and test the new routes, leveraging the debugger and the debug console to better understand the code execution. Once you're done, you can stop the debugger (`kb(workbench.action.debug.stop)`). You may also remove the breakpoint we added on step 4 by clicking on it.

Congratulations! You now have a working FastAPI application with routes to add, list, and delete items from a grocery list.

## Set up the data storage
At this point, you already have a working version of the application with the base functionality. This section will guide you through setting up data storage for persistence, but you can choose to skip it if you're happy with what you've learned already.

So far we are storing the data in a dictionary, which is not ideal because all of the data will be lost when the application is restarted.

To persist the data, we will use [Redis](https://redis.io/), which is an open source in-memory data structure store. Due to its speed and versatility, Redis is commonly used as a data storage system in a wide range of applications, including web applications, real-time analytics systems, caching layers, this tutorial, and more.

If you are already working on **GitHub Codespaces** with our existing template, you can skip directly to the ["Replace the database"](#replace-the-database) section.

If you are on Windows, you can work with Redis by setting up either a [Docker container](https://www.docker.com/products/docker-desktop/), a [GitHub Codespace](https://github.com/features/codespaces) or through [WSL](https://learn.microsoft.com/en-us/windows/wsl/) (Windows Subsystem for Linux). In this tutorial we will use a Docker container, but you can refer to the [section above](#github-codespaces) for instructions on how to set up a GitHub Codespace.

Otherwise, if you are on a Linux or a macOS machine, you can install Redis by following the [instructions on their website](https://redis.io/docs/getting-started/), and then skip to the ["Replace the database"](#replace-the-database) section.

### Setting up a Docker Container on Windows
The Dev Container extension for VS Code offers a simple way to configure a Linux-based workspace in your Windows machine, putting your entire project and its dependencies as well as tools you need for your project into a tidy container.
For the steps below, make sure you have the following requirements installed on your machine:

#### Requirements
-	[Docker for Windows](https://www.docker.com/)
-	[Dev Containers extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Create the Dev Container configuration
1. Open the Command Palette and run the “Dev Container: Add Dev Container Configuration Files…"
2. Select "Python 3":

    <img src="images/fastapi-tutorial/devcontainers_python3.png" alt="Python 3 option selected in the Dev Container configuration files list." width="500"/>
3. Select the default version.

We can optionally install features to be included in the container. For this tutorial, we will install [Redis Server](https://github.com/itsmechlark/features/tree/main/src/redis-server), which is a community contributed feature that installs and adds the proper dev container set up for Redis.

4. Select "Redis Server" as an additional feature to be installed, press "OK", and then select "Keep Defaults".
    <img src="images/fastapi-tutorial/devcontainers_redis_server_feature.png" alt="Redis Server option selected in the Dev Container configuration files list." width="500"/>

This will create a `.devcontainer` folder in your workspace, with a `devcontainer.json` file. Let's make some edits to this file so the container setup will include steps such as installing the VS Code extensions we'll need as well as the project dependencies.

5. Open the `devcontainer.json` file.
6. Add a "," after the `"features" : { ... }` entry, so we can add more settings to the file.
7. Locate the content below and remove the comment (`//`) from that line, so the dependencies can be installed once the container is created:
    ```
    "postCreateCommand": "pip3 install --user -r requirements.txt",
    ```
8. Add the following setting to `devcontainer.json`:
    ```
        // Use 'postCreateCommand' to run commands after the container is created.
        "postCreateCommand": "pip3 install --user -r requirements.txt",

        // Configure tool-specific properties.
        "customizations": {
            "vscode": {
                "extensions": [
                    "ms-python.python", //Python extension ID
                    "ms-python.vscode-pylance" //Pylance extension ID
                ]
            }
        }
    ```
9. Save the file.

10. Select the "Reopen in Container" button from the notification that will show up on the bottom right corner, or run the **Dev Containers: Reopen in Container** command from the Command Palette.

    You can learn more about dev containers configuration in the [documentation](https://code.visualstudio.com/docs/devcontainers/containers#_create-a-devcontainerjson-file).
    > Note: it may take several minutes to build the container, depending on internet speed and machine performance.

Once it's done, you will have a fully configured Linux-based workspace with Python 3 and Redis Server installed.

Once the container is set up, you will notice an indicator on the bottom left corner of VS Code:

![Dev Container indicator displayed on the bottom left corner of VS Code.](images/fastapi-tutorial/devcontainer_indicator.png)

> Note: Double check that the Python and Pylance extensions have been successfully installed in the container by opening the Extensions view (`kb(workbench.view.extensions)`) and searching for them. If not, you can install them by clicking on the "Install in Dev Container" button.

You should also see the selected Python interpreter information on the status bar at the bottom right corner, matching the version specified in the `devcontainer.json` file:

<img src="images/fastapi-tutorial/devcontainer_python_interpreter.png" alt="Python interpreter selection" width="250"/>

> Note: If you don't see the Python interpreter information on the status bar, you can click on the Python interpreter indicator (or run the **Python: Select Interpreter** command from the Command Palette) and manually select the Python interpreter in the container.

We are now ready to move on to the next section, where we will replace the data storage.

## Replace the database

We have a dictionary that stores the grocery list items, but we want to replace it with a Redis database. In this tutorial, we will use Redis hashes to store our data, which is a data structure that can store multiple key-value pairs.

Unlike a traditional database where you can retrieve an item without knowing its ID, you need to know the Redis hash key in order to retrieve a value from it. In this tutorial, we will create a hash called `item_name_to_id` that will allow us to retrieve items by name, and map them to their IDs. In addition, we'll create other hashes that will allow us to retrieve items by ID, mapping them to their names and quantities. Each item hash will be named `item_id:{item_id}` and will have two fields: `item_name` and `quantity`.


First, let's start by replacing the dictionary with a Redis client object that connects to a Redis server.

1. In the `main.py` file, replace the `grocery_list: dict[int, ItemPayload] = {}` in the beginning of the file with the lines below:
    ```python
    redis_client = redis.StrictRedis(host='0.0.0.0', port=6379, db=0, decode_responses=True)
    ```
Pylance will display an error message because Redis hasn’t been imported yet.

2. Click on "redis" in the editor, and select the light bulb that shows up (or `kb(editor.action.quickFix)`). Then select **Add 'import redis'**.
    ![Light bulb displayed next to the Redis variable, with the option to add the import statement.](images/fastapi-tutorial/fastapi_add_redis_quickfix.png)

    > **Tip**: You can set up Pylance to automatically add imports by looking for the "Auto Import Completions" setting in the Settings UI page (`kb(workbench.action.openSettings)`) and enabling it.

We now have a Redis client object that connects to a Redis server running on the local host (`host="0.0.0.0"`) and listening on port 6379 (`port=6379`). The `db` parameter specifies the Redis database to use. Redis supports multiple databases, and in this code we’re setting to use database 0, which is the default database. We're also passing `decode_responses=True` for the responses to be decoded as strings (instead of bytes).

Let's do some more replacements in the first route `add_item`. Instead of looking into all the keys from the dictionary to find the item name that has been provided, we can fetch that information directly from a Redis hash.

We'll assume that the `item_name_to_id` hash already exists, mapping item names to their IDs (don't worry, we'll add this code shortly!). We can then get the ID of the item name we’re receiving in the request by invoking the `hget` method from Redis, which will return the item ID if the requested name already exists in the hash, or `None` if it doesn't.

3. Delete the line with the content below:
    ```python
    items_ids = {item.item_name: item.item_id if item.item_id is not None else 0 for item in grocery_list.values()}
    ```
    And replace it with:
    ```python
      item_id = redis_client.hget("item_name_to_id", item_name)
     ```

Note that Pylance raises a problem with this change. This is because the `hget` method returns either `str`, or `None` (if the item doesn’t exist). However, the lines below the code that we haven’t replaced yet expect `item_id` to be of type `int`. Let’s address it by renaming the `item_id` symbol.

4. Rename `item_id` to `item_id_str`.

5. If you have inlay hints enabled, Pylance should show a variable type hint next to `item_id_str`. You can optionally double click to accept it:

    ![Variable type hint displayed next to the item_id_str variable.](images/fastapi-tutorial/pylance_redis_typehint.png)

6. If the item doesn't exist, then `item_id_str` will be None. So now we can delete the line with the following content:
    ```python
    if item_name in items_ids.keys():
    ```
    And replace it with:
    ```python
    if item_id_str is not None:
    ```

Now that we have the item ID as a string, we need to convert it to an `int` and update the quantity for the item. Currently, our Redis hash only maps item names to their IDs. To also map item IDs to their names and quantities, we will create a separate Redis hash for each item, using `"item_id:{item_id}"` as our hash name to make retrieval by ID easier. We'll also add  `item_name` and `quantity` fields for each of these hashes.

7.	Delete the code within the `if` block:
    ```python
    item_id: int = items_ids[item_name]
    grocery_list[item_id].quantity += quantity
    ```
    And add the following, to convert the `item_id` to an `int`, and then to increment the quantity of the item by calling the `hincrby` method from Redis. This method will increment the value of the `"quantity"` field by the given amount in the request (`quantity`):

    ```python
    item_id = int(item_id_str)
    redis_client.hincrby(f"item_id:{item_id}", "quantity", quantity)
    ```


We now only need to replace the code for when the item does not exist, i.e. `item_id_str` is `None`. In this case, we will generate a new `item_id`, create a new Redis hash for the item, and then add the provided item name and quantity.
To generate a new `item_id`, let’s use the `incr` method from Redis, passing a new hash called `"item_ids"`. This hash will be used to store the last generated ID, so we can increment it each time we create a new item, ensuring that they all have a unique ID.

8. Delete the line with the following content:
    ```python
    item_id: int = max(grocery_list.keys()) + 1 if grocery_list else 0
    ```
    And add the following:
    ```python
    item_id: int = redis_client.incr("item_ids")
    ```

    When this `incr` call is run for the first time with the `item_ids` key, Redis will create the key and map it to the value `1`.  Then, each subsequent time it's run, it will increment the stored value by 1.

Now we will add the item to the Redis hash, using the `hset` method and by providing a mapping the fields (`item_id`, `quantity` and `name`), and the values (the item’s newly created id, and its provided name and quantity).

9.	Delete the line with the following content:
    ```python
    grocery_list[item_id] = ItemPayload(
            item_id=item_id, item_name=item_name, quantity=quantity
        )
    ```
    And replace it with the following:
    ```python
    redis_client.hset(
                f"item_id:{item_id}",
                mapping={
                    "item_id": item_id,
                    "item_name": item_name,
                    "quantity": quantity,
                })
    ```

Now we only need to map the newly created ID to the item name by setting the hash we referenced in the beginning, `item_name_to_id`.

10.	Add this line to the end of the route, inside the `else` block:
    ```python
    redis_client.hset("item_name_to_id", item_name, item_id)
    ```

11. Delete the line with the following content:
    ```python
    return {"item": grocery_list[item_id]}
    ```
    And replace it with:
    ```python
    return {"item": ItemPayload(item_id=item_id, item_name=item_name, quantity=quantity)}
    ```

12.	If you would like, you can try to do a similar replacement for the other routes. Otherwise, you can just replace the entire content of the file with the lines below:
    ```python
    import redis
    from fastapi import FastAPI, HTTPException

    from models import ItemPayload

    app = FastAPI()

    redis_client = redis.StrictRedis(host="0.0.0.0", port=6379, db=0, decode_responses=True)

    # Route to add an item
    @app.post("/items/{item_name}/{quantity}")
    def add_item(item_name: str, quantity: int) -> dict[str, ItemPayload]:
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0.")

        # Check if item already exists
        item_id_str: str | None = redis_client.hget("item_name_to_id", item_name)

        if item_id_str is not None:
            item_id = int(item_id_str)
            redis_client.hincrby(f"item_id:{item_id}", "quantity", quantity)
        else:
            # Generate an id for the item
            item_id: int = redis_client.incr("item_ids")
            redis_client.hset(
                f"item_id:{item_id}",
                mapping={
                    "item_id": item_id,
                    "item_name": item_name,
                    "quantity": quantity,
                },
            )
            # Create a set so we can search by name too
            redis_client.hset("item_name_to_id", item_name, item_id)

        return {
            "item": ItemPayload(item_id=item_id, item_name=item_name, quantity=quantity)
        }


    # Route to list a specific item by id but using Redis
    @app.get("/items/{item_id}")
    def list_item(item_id: int) -> dict[str, dict[str, str]]:
        if not redis_client.hexists(f"item_id:{item_id}", "item_id"):
            raise HTTPException(status_code=404, detail="Item not found.")
        else:
            return {"item": redis_client.hgetall(f"item_id:{item_id}")}


    @app.get("/items")
    def list_items() -> dict[str, list[ItemPayload]]:
        items: list[ItemPayload] = []
        stored_items: dict[str, str] = redis_client.hgetall("item_name_to_id")

        for name, id_str in stored_items.items():
            item_id: int = int(id_str)

            item_name_str: str | None = redis_client.hget(f"item_id:{item_id}", "item_name")
            if item_name_str is not None:
                item_name: str = item_name_str
            else:
                continue  # skip this item if it has no name

            item_quantity_str: str | None = redis_client.hget(
                f"item_id:{item_id}", "quantity"
            )
            if item_quantity_str is not None:
                item_quantity: int = int(item_quantity_str)
            else:
                item_quantity = 0

            items.append(
                ItemPayload(item_id=item_id, item_name=item_name, quantity=item_quantity)
            )

        return {"items": items}


    # Route to delete a specific item by id but using Redis
    @app.delete("/items/{item_id}")
    def delete_item(item_id: int) -> dict[str, str]:
        if not redis_client.hexists(f"item_id:{item_id}", "item_id"):
            raise HTTPException(status_code=404, detail="Item not found.")
        else:
            item_name: str | None = redis_client.hget(f"item_id:{item_id}", "item_name")
            redis_client.hdel("item_name_to_id", f"{item_name}")
            redis_client.delete(f"item_id:{item_id}")
            return {"result": "Item deleted."}


    # Route to remove some quantity of a specific item by id but using Redis
    @app.delete("/items/{item_id}/{quantity}")
    def remove_quantity(item_id: int, quantity: int) -> dict[str, str]:
        if not redis_client.hexists(f"item_id:{item_id}", "item_id"):
            raise HTTPException(status_code=404, detail="Item not found.")

        item_quantity: str | None = redis_client.hget(f"item_id:{item_id}", "quantity")

        # if quantity to be removed is higher or equal to item's quantity, delete the item
        if item_quantity is None:
            existing_quantity: int = 0
        else:
            existing_quantity: int = int(item_quantity)
        if existing_quantity <= quantity:
            item_name: str | None = redis_client.hget(f"item_id:{item_id}", "item_name")
            redis_client.hdel("item_name_to_id", f"{item_name}")
            redis_client.delete(f"item_id:{item_id}")
            return {"result": "Item deleted."}
        else:
            redis_client.hincrby(f"item_id:{item_id}", "quantity", -quantity)
            return {"result": f"{quantity} items removed."}

    ```

13.	Re-run the debugger to test this application by interacting with the `/docs` route. You can stop the debugger once you're done.

Congrats! You now have a working FastAPI application with routes to add, list, and delete items from a grocery list, and the data being persisted in a Redis database.

## Optional: Set up database deletion
Because the data will be now be persisted by Redis, you may want to create a script that will allow you to erase all testing data. For that you can create a new file called `flushdb.py` with the following content:
```python
import redis

redis_client = redis.StrictRedis(host='0.0.0.0', port=6379, db=0, decode_responses=True)
redis_client.flushdb()

```
Then when you want to reset the database, you can open the flushdb.py file in VS Code and click on the run button on the top-right corner of the editor, or run the **Python: Run Python File in Terminal** command from the Command Palette.

Note that this should be done with caution because it will delete all the keys in the current database, which could lead to data loss if done in production.

## Optional: Create a ChatGPT plugin using GitHub Codespaces
With GitHub Codespaces, we can host our application for testing purposes to use with [ChatGPT Plugins](https://platform.openai.com/docs/plugins/introduction), which are tools that enable [ChatGPT](https://chat.openai.com/) to interact with existing APIs to enhance ChatGPT’s abilities, allowing it to perform a wide range of actions. ChatGPT Plugins are not currently publicly available, but you can join their [wait list](https://openai.com/waitlist/plugins) to get access. Once you do, you can follow along the live stream recording below to create your own grocery list plugin for ChatGPT:
<iframe width="560" height="315" src="https://www.youtube.com/embed/fPCjEbRpK1M?si=mTrthUxW_SgY4grR" title="Build a ChatGPT plugin with VS Code and Codespaces" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

> Note: All personal GitHub.com accounts have a monthly quota of free use of GitHub Codespaces included in the Free or Pro plan. For more information, see "[About billing for GitHub Codespaces](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)".

## Next Steps

Thank you for following along this tutorial! We hope you learned something new about FastAPI and how to use it with VS Code.

The completed code project from this tutorial can be found on GitHub: [python-sample-vscode-fastapi-tutorial](https://github.com/microsoft/python-sample-vscode-fastapi-tutorial).

Learn more about FastAPI on the [official documentation](https://fastapi.tiangolo.com/).

To try the app on a production website, check out the tutorial [Deploy Python apps to Azure App Service using Docker Containers](https://learn.microsoft.com/azure/developer/python/tutorial-deploy-containers-01).

You may also want to review the following articles in the VS Code docs that are relevant to Python:

- [Editing Python code](/docs/python/editing.md)
- [Managing Python environments](/docs/python/environments.md)
- [Debugging Python](/docs/python/debugging.md)
- [Testing](/docs/python/testing.md)
