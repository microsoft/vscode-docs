---
ContentId: 645513c2-9e7d-4ed1-b923-f2c45974f30d
DateApproved: 11/16/2026
MetaDescription: Find and fix a bug in {% data variables.product.prodname_vscode %} with a small JavaScript example, breakpoints, stepping, and variable inspection.
MetaSocialImage: images/debugging/debugging-social.png
---
# Quickstart: debug your first application

Find out why a small program produces the wrong result by pausing it, inspecting its variables, and stepping through the code in {% data variables.product.prodname_vscode %}. Then fix the bug and verify the result.

This quickstart uses a single JavaScript file and the built-in Node.js debugger. You don't need an existing project, additional extensions, packages, or a `launch.json` configuration.

If you already have an application to debug, see [start a debugging session](/docs/debugtest/debugging.md#start-a-debugging-session) and choose the [setup for your language](/docs/debugtest/debugging.md#prerequisites).

## Prerequisites

* Install [{% data variables.product.prodname_vscode %}](https://code.visualstudio.com/download).
* Install [Node.js](https://nodejs.org/en/download/), which runs the JavaScript example.

In {% data variables.product.prodname_vscode_shortname %}, select **Terminal** > **New Terminal** and check that Node.js is available:

```bash
node --version
```

You should see a version number. If the command isn't found, restart {% data variables.product.prodname_vscode_shortname %} after installing Node.js, then open a new terminal and try again.

## 1. Create a practice project

1. Create an empty folder named `debugging-practice` and open it with **File** > **Open Folder**.

    If prompted, trust the folder you created. Only trust other projects when you know their source. Learn about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

1. In the Explorer view (`kb(workbench.view.explorer)`), create a file named `app.js`.

1. Add the following code and save the file (`kb(workbench.action.files.save)`):

    ```javascript
    function calculateTotal(price, quantity) {
        const total = price + quantity;
        return total;
    }

    const price = 10;
    const quantity = 3;
    const total = calculateTotal(price, quantity);
    console.log(`Total: ${total}`);
    ```

The program should calculate the cost of three items priced at 10 each. The expected total is **30**, but the calculation contains a bug.

## 2. Reproduce the problem

1. Select **Terminal** > **New Terminal**. The terminal opens in your project folder.

1. Run the program:

    ```bash
    node app.js
    ```

    The output is:

    ```text
    Total: 13
    ```

Running the program shows the incorrect result. Next, use the debugger to inspect how the program calculates it.

## 3. Pause at a breakpoint

A breakpoint pauses the program before a line runs, so you can examine its state.

1. Return to the `app.js` editor and select the margin to the left of the line number beside `const total = price + quantity;` on line 2. A red circle marks the breakpoint.

    Alternatively, place the cursor on that line and press `kb(editor.debug.action.toggleBreakpoint)`.

1. Select **Run** > **Start Debugging** (`kb(workbench.action.debug.start)`). If prompted to choose a debugger, select **Node.js**.

1. Open the **Run and Debug** view (`kb(workbench.view.debug)`) if it isn't already visible.

Execution pauses on line 2. The current-line highlight indicates the line that runs next, not a line that has already run. Under **VARIABLES**, expand **Local** to find `price` with a value of `10` and `quantity` with a value of `3`.

<!-- TODO: Capture a focused screenshot of app.js paused on line 2, showing the breakpoint, current-line highlight, and Run and Debug view. -->

## 4. Inspect the calculation

1. In the Debug toolbar, select **Step Over** (`kb(workbench.action.debug.stepOver)`) once.

    The debugger runs the calculation and pauses on `return total;`. Hover over `total` in the editor or find it under **VARIABLES**. Its value is `13`.

1. Select **View** > **Debug Console**. At the input prompt, enter the following expression and press `kbstyle(Enter)`:

    ```javascript
    price * quantity
    ```

    The result is `30`. The inputs are correct, but the code adds them instead of multiplying them. Evaluating this expression doesn't change the source file.

1. Select **Continue** (`kb(workbench.action.debug.continue)`) in the Debug toolbar to finish the program.

    The debugging session ends. Inspect variables and evaluate expressions while paused, before continuing to the end of the program.

<!-- TODO: Capture a focused screenshot of the paused calculateTotal function, Local variables with total equal to 13, and the Debug Console expression returning 30. -->

## 5. Fix the bug

In `app.js`, replace the addition on line 2 with multiplication, and save the file:

```javascript
const total = price * quantity;
```

## 6. Verify the fix

1. Keep the breakpoint on line 2 and start debugging again with `kb(workbench.action.debug.start)`.

1. When execution pauses, select **Step Over** once. Confirm that `total` is now `30` under **VARIABLES**.

1. Select **Continue** to finish the program.

1. In the terminal, run `node app.js` again. Confirm that the output is:

    ```text
    Total: 30
    ```

You reproduced the problem, inspected the calculation, identified its cause, and verified the fix. Select the red breakpoint circle to remove it when you're finished.

## Troubleshooting

* **Node.js isn't found**: confirm that `node --version` works in a new terminal in {% data variables.product.prodname_vscode_shortname %}. The built-in debugger doesn't install the Node.js runtime.
* **The program runs without pausing**: confirm that `app.js` is the active editor, the breakpoint is on line 2, and you used **Start Debugging**, not **Run Without Debugging** or `node app.js` in a regular terminal.
* **The breakpoint is hollow or unavailable**: hover over it to read the debugger's message. Save `app.js` and confirm that you selected **Node.js**.
* **The Debug Console can't find a variable**: pause inside `calculateTotal` and select that function's frame in **CALL STACK**. After the program exits, start debugging again before inspecting its variables.

## Next steps

* [Debug your own code](/docs/debugtest/debugging.md#prerequisites) with the runtime and debugger for your language.
* [Explore debugging tools](/docs/debugtest/debugging.md#data-inspection), including watches, the call stack, and conditional breakpoints.
* [Create a reusable debug configuration](/docs/debugtest/debugging-configuration.md) when your application needs arguments, environment variables, or a different entry point.
