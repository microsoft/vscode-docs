---
DateApproved: 2/19/2025
MetaDescription: Learn about Visual Studio Code editor features (code completion, debugging, testing) for Swift.
---
# Swift in Visual Studio Code

[Swift](https://www.swift.org) is a general-purpose programming language that's approachable for newcomers and powerful for experts.
It is fast, modern, safe, and a joy to write. This topic goes into detail about setting up and using Swift within Visual Studio Code, with the [swiftlang.swift-vscode](https://marketplace.visualstudio.com/items?itemName=swiftlang.swift-vscode) extension.

The Swift extension includes:

- Syntax highlighting and code completion
- Code navigation features such as Go to Definition and Find All References
- Refactoring and quick fixes to code
- Package management and tasks with support for Swift Package Manager
- Rich support for debugging
- Testing with XCTest or Swift Testing frameworks

The Swift extension is designed to support the following projects:

- Swift Package Manager projects (e.g. using a `Package.swift`)
- Projects that can generate a `compile_commands.json` (e.g. using CMake)

## Install the extension

1. First, install Swift. If you do not already have Swift installed on your system, see the
   [Getting Started Guide on Swift.org](https://www.swift.org/getting-started/).
2. Download and install [Visual Studio Code](https://code.visualstudio.com/Download).
3. Install the Swift extension from the
   [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=swiftlang.swift-vscode)
   or directly from within the VS Code extensions pane.

![Installing the swift-vscode extension from the extensions pane](images/swift/installation.png)

## Create a new Swift project

To create a new Swift project, you can use the `Swift: Create New Project...` command in
the Swift extension to guide you through the process. You can find this command by opening
the Command Palette and following the instructions below.

- For macOS: `kbstyle(CMD+Shift+P)`
- Other platforms: `kbstyle(Ctrl+Shift+P)`

![Create New Project command showing available project templates](images/swift/select-project-template.png)

1. Choose the type of project you'd like to create from the list of templates.
2. Choose the directory where the project will be stored.
3. Give your project a name.
4. Open the newly created project. You will be prompted to open the project in
   the current window, a new window, or add it to the current workspace. The
   default behavior can be configured by using the
   `swift.openAfterCreateNewProject` setting.

## Language features

The Swift extension uses [SourceKit LSP](https://github.com/apple/sourcekit-lsp)
to power language features. SourceKit LSP provides the following features in the
editor. Use these links to see the VS Code documentation for each topic:

- [Code completion](/docs/editing/intellisense.md)
- [Go to definition](/docs/editing/editingevolved.md#go-to-definition)
- [Find all references](/docs/editing/editingevolved.md#peek)
- [Rename refactoring](/docs/editing/refactoring.md#rename-symbol)
- [Diagnostics](/docs/editing/editingevolved.md#errors--warnings)
- [Quick Fixes](/docs/editing/editingevolved.md#code-action)

SourceKit LSP also provides code actions to automate common tasks. Code actions in VS Code
appear as a light bulb near the editor margin (see the below screenshot for an
example of this). Clicking on the light bulb will show you the available actions
which can include:

- Adding targets to your `Package.swift`
- Converting JSON to protocols
- Adding documentation to your functions

![Package swift actions](images/swift/package_actions.png)

> [!IMPORTANT]
> Prior to Swift 6.1 you must perform a `swift build` command on your project either
> on the command line or using a task in VS Code before language features can be used.
> This populates the index in SourceKit-LSP.

## Swift tasks

Visual Studio Code provides tasks as a way to run external tools. See the
[Integrate with External Tools via Tasks](/docs/debugtest/tasks.md)
documentation to learn more.

The Swift extension provides some built-in tasks that you can use to build via
Swift Package Manager. You can also configure custom tasks by creating a
`tasks.json` file in the root folder of your project. For example, this
`tasks.json` builds of your Swift targets in release mode:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "swift",
      "label": "Swift Build All - Release",
      "detail": "swift build --build-tests",
      "args": ["build", "--build-tests", "-c", "release"],
      "env": {},
      "cwd": "${workspaceFolder}",
      "group": "build"
    }
  ]
}
```

The above task is configured to be in the `build` group. This means it will
appear in the `run build tasks` menu that can be opened with `kbstyle(CMD+Shift+B)`
on macOS or `kbstyle(Ctrl+Shift+B)` on other platforms:

![Run build task menu](images/swift/build-tasks.png)

Any errors that occur during a build appear in the editor as diagnostics
alongside those provided by SourceKit-LSP. Running another build task clears the
diagnostics from the previous build task.

## Debugging

Visual Studio Code provides a rich debugging experience. See the
[Debugging](/docs/debugtest/debugging.md) documentation for
more information.

The Swift extension relies on the
[LLDB DAP extension](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.lldb-dap) to enable
debugging support.

By default, the extension creates a launch configuration for each executable
target in your Swift package. You may configure these yourself by adding a
`launch.json` file to the root folder of your project. For example, this
`launch.json` launches a Swift executable with custom arguments:

```json
{
  "configurations": [
    {
      "type": "swift",
      "name": "Debug swift-executable",
      "request": "launch",
      "args": ["--hello", "world"],
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/.build/debug/swift-executable",
      "preLaunchTask": "swift: Build Debug swift-executable"
    }
  ]
}
```

You can launch a debugging session via the Debug view in VS Code.

1. Select the launch configuration you wish to debug.
2. Click on the green play button to launch a debugging session.

The executable will be launched and you can set breakpoints in
your Swift code that will be hit as code executes.

The screenshot below shows an example of debugging a Hello World program. It
is paused on a breakpoint and you can see that the Debug View shows the values
of variables in scope. You can also hover over identifiers in the editor to see
their variable values:

![Debugging](images/swift/debugging.png)

## Test Explorer

Visual Studio Code provides a Test Explorer view in the left sidebar which can
be used:

- To navigate to tests
- To run tests
- To Debug tests

The Swift extension supports [XCTest](https://developer.apple.com/documentation/xctest) as well as
[Swift Testing](https://swiftpackageindex.com/apple/swift-testing/main/documentation/testing).
As you write tests they are automatically added to the Test Explorer.

![Inline test errors](images/swift/inline_assertion_failures.png)

To debug a test:

1. Set a breakpoint
2. Run the test, suite, or entire test target with the `Debug Test` profile.

The `Run Test with Coverage` profile instruments the code under test and opens a
code coverage report when the test run completes. As you browse covered files,
line numbers that were executed during a test appear green, and those that were
missed appear red. Hovering over a line number shows how many times covered
lines were executed. Line execution counts can be shown or hidden using the
`Test: Show Inline Coverage` command.

Swift Testing tests annotated with
[tags](https://swiftpackageindex.com/apple/swift-testing/main/documentation/testing/addingtags)
can be filtered in the Test Explorer using `@TestTarget:tagName`. You can then
run or debug the filtered list of tests.

> [!IMPORTANT]
> The Swift VS Code extension does not support running Swift Testing tests in Swift 5.10 or earlier.

## Advanced toolchain selection

The Swift extension automatically detects your installed Swift toolchain.
However, it also provides a command called `Swift: Select Toolchain...` which
can be used to select between toolchains if you have multiple installed.

> [!IMPORTANT]
> This is an advanced feature used to configure VS Code with a toolchain other
> than the default on your machine. It is recommended to use `xcode-select` on
> macOS or `swiftly` on Linux to switch between toolchains globally.

You may be prompted to select where to configure this new path. Your options are
to:

- Save it in User Settings
- Save it in Workspace Settings

Keep in mind that Workspace Settings take precedence over User Settings:

![Settings selection](images/swift/configuration.png)

The Swift extension will then prompt you to reload the extension in order to
pick up the new toolchain. You must do so, otherwise the extension will not
function correctly:

![Reload VS Code warning](images/swift/reload.png)
