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

In this FastAPI tutorial, we will create a grocery list app using FastAPI. By the end of the tutorial, you will understand how to work with FastAPI in the VS Code terminal, editor, and debugger. This tutorial is not a FastAPI deep dive. For that, you can refer to the [FastAPI documentation link at the end of this tutorial](#next-steps).

The completed code project from this FastAPI tutorial can be found on GitHub: <TODO: add link>

If you have any problems, you can search for answers or ask a question on the [Python extension Discussions Q&A](https://github.com/microsoft/vscode-python/discussions/categories/q-a).

## Set up the project
There are different ways you can set up your project for this tutorial. We will cover how you can set it up in [GitHub Codespaces](TODO: add link to section below) and in [VS Code on your local machine](TODO: ADD Link to section below).

### GitHub Codespaces
You can set up this project to develop in [GitHub Codespaces](https://github.com/features/codespaces), where you can code, debug, and run your app remotely in a Codespace. A Codespace allows you to access a fully-configured development environment hosted in the cloud, eliminating the need for local setup. This environment includes your project's dependencies, tools, and extensions, ensuring a consistent and reproducible development experience. It streamlines collaboration by providing real-time editing, integrated version control, and easy access to debugging and testing tools, all while maintaining the security and reliability of your project.

To set it up for this tutorial, navigate to the [FastAPI template repository]<TODO: add link to template repo>. This template contains all the necessary configurations and dependencies to quickly get started with FastAPI development in a GitHub Codespace. Next, select **Code** > **Codespaces** > **Create Codespace on \<main\>** to create and open a Codespace for your project.

Once you're done, you can continue with the [Start Coding](#start-coding) section below.

### Locally in VS Code
To successfully complete this tutorial in [VS Code](https://code.visualstudio.com/), you need to first setup your Python development environment. Specifically, this tutorial requires:
- Python 3 (check the [installation guide](python-tutorial.md#install-a-python-interpreter) if you don’t have it installed)
- [Python extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python) (For additional details on installing extensions, see [Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-marketplace))

In this section, we will create a folder to be opened as a workspace in VS Code, set up a Python virtual environment, install the project’s dependencies and write the first lines of our FastAPI app.

1.	In your file system, create a project folder for this tutorial, such as `groceries-plugin``.
2.	Open this new folder in VS Code (**File** > **Open Folder…** or `kb(workbench.action.files.openFolder)`).


Now, let’s create a requirements.txt file listing the dependencies we wish to install for our application. The requirements.txt file is a common practice in Python development, used to specify the libraries that your project relies on and their versions. This file helps ensure that anyone working on the project can recreate a similar development environment, making it a convenient component for maintaining consistency across different development environments.

We will want to install FastAPI for creating our app, uvicorn to work as the server, and redis and type-redis for handling data storage and interacting with a Redis database.

3. Create a new file in VS Code (**File** > **New File** or `kb(workbench.action.files.newUntitledFile)`).
4. Add the following content to it:
    ```
    fastapi
    redis
    types-redis
    uvicorn
    ```
5.	Save the file (`kb(workbench.action.files.save)`) and name it requirements.txt
6.	Create a virtual environment by opening the Command Palette (`kb(workbench.action.showCommands)`) and running the **Python: Create Environment** command.
7. When asked by the environment type, select **Venv**:
![Drop down with "Venv" or "Conda" as options for environments that can be created with the Python: Create Environment command.](images/environments/create_environment_dropdown.png)

8. Then select the latest version of Python available on your machine:
![List of available global environments that can be used to create a virtual environment.](images/fastapi-tutorial/create_environment_interpreters_list.png)

9. Select the requirements.txt file from the drop-down list, so our dependencies are automatically installed, and then select "OK":
![Check box selected to install dependencies from requirements.txt file](images/fastapi-tutorial/create_environment_select_requirements.png)

The virtual environment will be created, our dependencies will be automatically installed and the environment will be selected for your workspace to be used by the Python extension.

## Start Coding

Let’s create our application!
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

    This will invoke uvicorn to start the application server through the debugger, which will allow us to step through the code to inspect its behaviour. You will see something like the following in the terminal:

    ![Uvicorn server running message displayed in the terminal, with an URL to access the app.](images/fastapi-tutorial/fastapi_debug_terminal.png)

6. `Ctrl`` + click the http://127.0.0.1:8000/ URL in the terminal to open your default browser to that address:
![Hello World message displayed in the browser.](images/fastapi-tutorial/helloworld_browser.png)
7. Stop the debugger by clicking on the stop icon in the debug toolbar, or through `kb(workbench.action.debug.stop)`.

## Create a model for grocery list items
Now that we have our FastAPI app working, let’s define our grocery list items by creating a Pydantic model.
Pydantic is a data validation and parsing library that integrates seamlessly with FastAPI. It allows you to define data models using Python classes with [type hints](https://docs.python.org/3/library/typing.html) for automatic validation and parsing of incoming data (which are called payloads) in API requests.

Pylance, the default language server for Python in VS Code, supports type hinting features that can be helpful for working with Pydantic models and FastAPI. Let's enable a few of them:
1. Open the Settings UI page (`kb(workbench.action.openSettings)`)
2. Search for "python type checking mode" and set it to "basic" to enable basic type checking. This will enable Pylance to show diagnostics and warnings to catch simple type-related errors. Alternetivaly, you can set it to "strict" to enable more advanced [type checking rules](https://microsoft.github.io/pyright/#/configuration?id=diagnostic-rule-defaults).
    ![Python Analysis Type Checking Mode options (off, basic and strict) in settings UI page.](images/fastapi-tutorial/type_checking_mode_setting.png)
3. Next, search for "Python inlay type hints", and enable inlay hints for Variable Types and Function Return Types:
    ![Two Python Analysis Type Hints settings being enabled in the settings UI page: for Function Return Types and for Variable Types.](images/fastapi-tutorial/function_and_variable_return_type_hint_settings.png)

Now let's create a Pydantic model for grocery list items.
1. Create a new Python file (`kb(workbench.action.files.newFile)` and select "Python File")
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
1. First, let's import all the packages we will need for our sample. Open the main.py file and replace the first import line with the following ones:
    ```python
    from fastapi import FastAPI, HTTPException

    from models import ItemPayload
    ```
2. Now add the following line right below `app = FastAPI()`:
    ```python
    grocery_list: dict[int, ItemPayload] = {}
    ```

    This creates a new empty dictionary that will receive keys of type int (which will be each item id) and values of the ItemPayload type.

We’ll now define routes that will allow us to add and retrieve individual items, as well as list all items in the grocery list.

3. Add the following route at the end of the `main.py` file:
    ```python
    # Route to add a item
    @app.post("/items/{item_name}/{quantity}")
    def add_item(item_name: str, quantity: int):
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0.")
        # if item already exists, we'll just add the quantity.
        # get all item names
        items_names = [item.item_name for item in grocery_list.values()]
        if item_name in items_names:
            # get index of item.item_name in item_names, which is the item_id
            item_id = items_names.index(item_name)
            grocery_list[item_id].quantity += quantity
        # otherwise, create a new item
        else:
            # generate an id for the item based on the highest ID in the grocery_list
            item_id = max(grocery_list.keys()) + 1 if grocery_list else 0
            grocery_list[item_id] = ItemPayload(item_id=item_id, item_name=item_name, quantity=quantity)

        return {"item": grocery_list[item_id]}

    ```

    You might notice Pylance adds inlay hints with the function return type, as well as the types for `item_names` and `item_id`. You can double click on each suggestion to insert them into the code:
    ![Inlay function return and variable type hints being displayed by Pylance throughout the sample code.](images/fastapi-tutorial/pylance_inlay_hints.png)

Now let's see if this route is working as expected. The fastest way to do so is to leverage both VS Code's debugger as well as FastAPI's `/docs` endpoint, which provides information about all the available API routes and allows you to interact with the API to explore their parameters and responses. This documentation is generated dynamically based on the metadata and type hints defined in your FastAPI application.

4. Add a breakpoint next to the if item.quantity <= 0 statement, by clicking on the left margin of the line number (or `kb(editor.debug.action.toggleBreakpoint)`). This will make the debugger stop prior to the execution of that line, allowing us to inspect the code line by line.
    ![Breakpoint set next to the first line in the add_item function.](images/fastapi-tutorial/debugger_breakpoint.png)

5. Start the debugger (`kb(workbench.action.debug.start)`), and then navigate to http://127.0.0.1:8000/docs in the browser.

    You'll see a Swagger-like interface with the two endpoints available in your app: `/items` and root (`/`).
    ![Swagger UI displaying two endpoints: /items and /](images/fastapi-tutorial/fastapi_first_swagger_page.png)

6. Click on the down arrow next to the `/items` route to expand it, and click on the "Try it out" button that appears on the right side.
    ![Try it out button displayed next to the /items route in the Swagger UI.](images/fastapi-tutorial/fastapi_tryitout_button.png)

7. Add a grocery list item by passing a string to the "item" field, and a number to "quantity". For example, you could provide `{"item_id": 0, "item" : "apple", "quantity": 2 }`.

8. Click on the "Execute" button.
    ![Execute button displayed below the /items route.](images/fastapi-tutorial/fastapi_execute_button.png)

9. Open VS Code again and notice the debugger has stopped at the breakpoint we set earlier.
    ![Debugger stopped at the breakpoint set in the add_item function.](images/fastapi-tutorial/fastapi_breakpoint_hit.png)

On the left side, you will see all local and global variables defined at this point in the Variables window, under the **Run and Debug** view:
![Variables window displayed in the Run and Debug view, with the item and grocery_list variables highlighted.](images/fastapi-tutorial/fastapi_debugger_variables.png)

Now let’s leverage VS Code's Debug Console to do some exploration.

10.	Select the `item.quantity <= 0` statement, right-click on the editor and select **Evaluate in Debug Console**:
    ![Evaluate in Debug Console option displayed in the context menu when right-clicking on a line of code.](images/fastapi-tutorial/fastapi_evaluate_debug_console.png)

    This will open the Debug Console and run the selected expression. As expected, the expression will be evaluated to `False`.

The Debug Console can be a powerful tool to quickly test expressions and better understand the state of your code at the time of the breakpoint. You can also use it to run arbitrary code, such as calling functions or printing variables. Learn more about Python debugging in VS Code in the [Python tutorial](python-tutorial.md#configure-and-run-the-debugger).


Finally, let's add the remaining routes for our application so we can list all items or specific items, as well as remove them from our grocery list.

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
        items_ids = {item.item_name: item.item_id if item.item_id is not None else 0 for item in grocery_list.values()}
        if item_name in items_ids.keys():
            # get index of item.item_name in item_names, which is the item_id
            item_id: int = items_ids[item_name]
            grocery_list[item_id].quantity += quantity
        # otherwise, create a new item
        else:
            # generate an id for the item based on the highest ID in the grocery_list
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

You can now open the `/docs` page again and test the new routes, leveraging the debugger and the debug console to better understand the code execution.

## Set up the data storage
At this point, you already have a working version of the application with the base functionality. This section will guide you through setting up data storage for persistence, but you can choose to skip it if you're happy with what you've learned already.

So far we are storing our data in a dictionary, which is not ideal because all ouf our data will be lost when the application is restarted.

To persist our data, we will use [Redis](https://redis.io/), which is an open source in-memory data structure store. Due to its speed and versatility, Redis is commonly used as a data storage system in a wide range of applications, including web applications, real-time analytics systems, caching layers, this tutorial, and more.

If you are already working on **GitHub Codespaces** with our existing template, you can skip directly to the ["Replace the database"](#replace-the-database) section.

If you are on Windows, you can work with Redis by setting up either a [Docker container](https://www.docker.com/products/docker-desktop/), a [GitHub Codespace](https://github.com/features/codespaces) or through [WSL](https://learn.microsoft.com/en-us/windows/wsl/) (Windows Subsystem for Linux). In this tutorial we will cover the set up using Docker containers, but you can refer to the [section above](#github-codespaces) for instructions on how to set up a GitHub Codespace.

Otherwise, if you are on a Linux or a macOS machine, you can just install Redis by following the [instructions on their website](https://redis.io/docs/getting-started/), and then skip to the ["Replace the database"](#replace-the-database) section.

### Setting up a Docker Container on Windows
The Dev Container extension for VS Code offers a simple way to configure a Linux-based workspace in your Windows machine, putting your entire project and its dependencies as well as tools you need for your project into a tidy container.
For the steps below, make sure you have the following requirements installed on your machine:

#### Requirements
-	[Docker for Windows](https://www.docker.com/)
-	[Dev Containers extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Create the Dev Container configuration
1. Open the Command Palette and run the “Dev Container: Add Dev Container Configuration Files…"
2. Select "Python 3"
    ![Python 3 option selected in the Dev Container configuration files list.](images/fastapi-tutorial/devcontainers_python3.png)
3. Select the default version.

We can optionally install features to be included in the container. For this tutorial, we will install [Redis Server](https://github.com/itsmechlark/features/tree/main/src/redis-server), which is a community contributed feature that installs and adds the proper dev container set up for Redis.

4. Select "Redis Server" as an additional feature to be installed, and then press "OK".
    ![Redis Server option selected in the Dev Container configuration files list.](images/fastapi-tutorial/devcontainers_redis_server_feature.png)

This will create a `.devcontainer` folder in your workspace, with a `devcontainer.json` file.

5. Select the "Reopen in Container" button from the notification that will show up on the bottom right corner once the dev container configuration is added to your workspace, under the `.devcontainer` folder.

    You can learn more about dev containers configuration in the [documentation](https://code.visualstudio.com/docs/devcontainers/containers#_create-a-devcontainerjson-file).

Once the container is set up, you will notice an indicator on the bottom left corner of VS Code:
![Dev Container indicator displayed on the bottom left corner of VS Code.](images/fastapi-tutorial/devcontainer_indicator.png)

You should now be ready to move on to the next section, where we will replace our data storage.

## Replace the database
1. In the `main.py` file, replace the `grocery_list = {}` in the beginning of the file with the lines below:
    ```python
    redis_client = redis.StrictRedis(host='0.0.0.0', port=6379, db=0, decode_responses=True)
    ```
Pylance will display an error message because redis hasn’t been imported yet.

2. Click on "redis" in the editor, and select the light bulb the shows up (or `kb(editor.action.quickFix)`). Then select "Add 'import redis'".
    ![Light bulb displayed next to the redis variable, with the option to add the import statement.](images/fastapi-tutorial/fastapi_add_redis_quickfix.png)

You can also set up Pylance to automatically add imports by looking for the "Auto Import Completions" setting in the Settings UI page (`kb(workbench.action.openSettings)`) and enabling it.

We now have a Redis client object that connects to a Redis server running on the local host (`host="0.0.0.0"`) and listening on port 6379 (`port=6379`). The `db` parameter specifies the Redis database to use. Redis supports multiple databases, and in this code we’re setting to use database 0, which is the default database. We're also passing `decode_responses=True` for the responses to be decoded as strings (instead of bytes).

This client can now be used to perform operations such as getting, setting, and deleting objects in the Redis database.

Let's do some more replacements in our first route `add_item`. Instead of looking into all the keys from our dictionary to find the item name that has been provided, we can fetch that information directly from a redis hash. Let’s assume we will create a hash called `item_name_to_id`, with item names mapped into their IDs once they are added in our app. We can then get the id of the item name we’re receiving by invoking the `hget` method from redis.

3. Delete line 17 (TODO: verify line number):
    ```python
    items_names = list(grocery_list.values())
    ```
    And replace it with:
    ```python
      item_id = redis_client.hget("item_name_to_id", item.item_name)
     ```

Note that Pylance raises a problem with this change. This is because the `hget` method returns either `str`, or `None` (if the item doesn’t exist). However, the lines below our code that we haven’t replaced yet expect `item_id` to be of type `int`. Let’s address it by renaming the `item_id` symbol.

4. Rename `item_id` with `item_id_str` by selecting the symbol and running the **Rename Symbol** command (`kb(editor.action.rename)`).

    This will rename all occurrences of the symbol in the file, including the one in the `return` statement.

5. Pylance should show a variable type hint next to `item_id_str`. Double click to accept it:
    ![Variable type hint displayed next to the item_id_str variable.](images/fastapi-tutorial/pylance_redis_typehint.png)

6. If the item doesn't exist, then `item_id_str` will be None. So now we can delete line 18 (TODO: verify line):
    ```python
    if item.item_name in items_names:
    ```
    And replace it with:
    ```python
    if item_id_str is not None:
    ```
Now that we have the `item_id` in a string, we just need to convert it to an `int` and add the quantity provided to the item. Because the redis hash we have so far only maps item names to their IDs, we now need to to map item IDs to their names and quantity. One way to do that is to create hashes for each item, in the format `"item_id:{item_id}"`, and provide it with "name" and "quantity" fields.

7.	Replace lines 19 and 20 with the following, to convert the `item_id` to an `int`, and then incrementing the quantity of our item by calling the `hincrby` method from redis:
    ```python
    item_id = int(item_id_bytes.decode())
    redis_client.hincrby(f"item_id:{item_id}", "quantity", item.quantity)
    ```

We now only need to replace the code for when the item does not exist, i.e. `item_id_str` is None. In this case, we will generate a new `item_id`, create a new redis hash for our item, and then add the provided item names and quantity.
To generate a new `item_id`, let’s use the `incr` method from redis, passing a new hash "item_ids". When this method is run for the first time, it will create the item_ids hash with a unique number, and then each time it's run it will generate an incremental number and store it in this hash.

8. Delete line 21 (TODO: verify line):
    ```python
    item_id: int = len(grocery_list)
    ```
    And add the following:
    ```python
    item_id: int = redis_client.incr("item_ids")
    ```

Now we will add our item to our redis hash, using the `hset` method and by providing a mapping of fields or keys (`item_id`, `quantity` and `name`), and the values (the item’s newly created id, and its provided name and quantity).

9.	Delete line 23 (TODO: verify line):
    ```python
    grocery_list[item_id] = item
    ```
    And replace it with:
    ```python
    redis_client.hset(
                f"item_id:{item_id}",
                mapping={
                    "item_id": item_id,
                    "item_name": item.item_name,
                    "quantity": item.quantity,
                },
    ```

Now we only need to map our newly created id to the item name by setting the hash we referenced in the beginning, `item_name_to_id`.

10.	Add this line to the end of the route, right before the return code:
    ```python
    redis_client.hset("item_name_to_id", item.item_name, item_id)
    ```

11.	If you would like, you can try to do a similar replacement for the other routes. Otherwise, you can just replace the entire content of your file with the lines below:
    ```python
    @app.get("/")
    def home(request: Request) -> dict[str, str]:
        url = str(request.base_url)
        return {"message": f"Add /docs to the end of the URL to access the Swagger UI."}

    # Route to add an item
    @app.post("/items")
    def add_item(item: ItemPayload) -> dict[str, ItemPayload]:
        if item.quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0.")

        # Check if item already exists
        item_id_str: str | None = redis_client.hget("item_name_to_id", item.item_name)

        if item_id_str is not None:
            item_id = int(item_id_str)
            redis_client.hincrby(f"item_id:{item_id}", "quantity", item.quantity)
        else:
            # Generate an id for the item
            item_id: int = redis_client.incr("item_id")
            redis_client.hset(
                f"item_id:{item_id}",
                mapping={
                    "item_id": item_id,
                    "item_name": item.item_name,
                    "quantity": item.quantity,
                },
            )
            # Create a set so we can search by name too
            redis_client.hset("item_name_to_id", item.item_name, item_id)

        return {"item": item}


    # Route to list a specific item by id but using Redis
    @app.get("/items/{item_id}")
    def list_item(item_id: int):
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

            item_name_str: str | None = redis_client.hget(
                f"item_id:{item_id}", "item_name"
            )
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
            redis_client.hdel(f"item_id:{item_id}", "item_id")
            return {"result": "Item deleted."}


    # Route to remove some quantity of a specific item by id but using Redis
    @app.delete("/items/{item_id}/{quantity}")
    def remove_quantity(item_id: int, quantity: int):
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
            redis_client.hdel(f"item_id:{item_id}", "item_id")
            return {"result": "Item deleted."}
        else:
            redis_client.hincrby(f"item_id:{item_id}", "quantity", -quantity)
            return {"result": f"{quantity} items removed."}
    ```

12.	Re-run the debugger to test this application by interacting with the `/docs` route.

## Optional: Set up database deletion
Because our data will be now be persisted by redis, you may want to create a script that will allow you to erase all testing data. For that you can create a new file called `flushdb.py` with the following content:
```python
import redis

redis_client = redis.StrictRedis(host='0.0.0.0', port=6379, db=0, decode_responses=True)
redis_client.flushdb()

```
Then when you want to reset your database, you can open the flushdb.py file in VS Code and click on the run button on the top-right corner of the editor or run the **Python: Run Python File in Terminal** command.

Note that this should be done with caution because it will delete all the keys in the current database, which could lead to data loss if done in production.

## Optional: Create a ChatGPT plugin using GitHub Codespaces
With GitHub Codespaces, we can host our application for testing purposes to use with [ChagGPT Plugins](https://platform.openai.com/docs/plugins/introduction), which are tools that enable [ChatGPT](https://chat.openai.com/) to interact with existing APIs to enhance ChatGPT’s abilities, allowing it to perform a wide range of actions. ChatGPT Plugins are not currently publicly available, but you can join their [waitlist](https://openai.com/waitlist/plugins) to get access. Once you do, you can follow along the livestream recording below to create your own grocery list plugin for ChatGPT:
<iframe width="560" height="315" src="https://www.youtube.com/embed/fPCjEbRpK1M?si=mTrthUxW_SgY4grR" title="Build a ChatGPT plugin with VS Code and Codespaces" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Note that all personal GitHub.com accounts have a monthly quota of free use of GitHub Codespaces included in the Free or Pro plan. For more information, see "[About billing for GitHub Codespaces](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)".

## Next Steps

The completed code project from this tutorial can be found on GitHub: [python-sample-vscode-fastapi-tutorial](TODO: Add link).

Learn more about FastAPI on the [official documentation](https://fastapi.tiangolo.com/).

To try your app on a production website, check out the tutorial [Deploy Python apps to Azure App Service using Docker Containers](https://learn.microsoft.com/azure/developer/python/tutorial-deploy-containers-01).

You may also want to review the following articles in the VS Code docs that are relevant to Python:

- [Editing Python code](/docs/python/editing.md)
- [Managing Python environments](/docs/python/environments.md)
- [Debugging Python](/docs/python/debugging.md)
- [Testing](/docs/python/testing.md)
