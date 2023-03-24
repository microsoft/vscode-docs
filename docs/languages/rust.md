---
Order: 16
Area: languages
TOCTitle: Rust
ContentId: 643d022e-9370-4ca5-bccd-c3a583c5df75
PageTitle: Rust with Visual Studio Code
DateApproved: 4/26/2022
MetaDescription: Learn about Visual Studio Code editor features (code completion, debugging, snippets, linting) for Rust.
---
# Rust in Visual Studio Code

[Rust](https://www.rust-lang.org) is a powerful programming language, often used for systems programming where performance and correctness are high priorities. If you are new to Rust and want to learn more, [The Rust Programming Language](https://doc.rust-lang.org/book) online book is a great place to start. This topic goes into detail about setting up and using Rust within Visual Studio Code, with the [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) extension.

![Rust extension banner](images/rust/rust-analyzer-extension.png)

>**Note**: There is also another popular Rust extension in the VS Code Marketplace (extension ID: rust-lang.rust) but this extension is deprecated and rust-analyzer is the recommended VS Code Rust extension by rust-lang.org.

## Installation

### 1. Install Rust

First you will need to have the Rust toolset installed on your machine. Rust is installed via the [rustup](https://rustup.rs) installer, which supports installation on Windows, macOS, and Linux. Follow the rustup installation guidance for your platform, taking care to install any extra tools required to build and run Rust programs.

>**Note**: As with installing any new toolset on your machine, you'll want to make sure to restart your terminal/Command Prompt and VS Code instances to use the updated toolset location in your platform's PATH variable.

### 2. Install the rust-analyzer extension

You can find and install the rust-analyzer extension from within VS Code via the Extensions view (`kb(workbench.view.extensions)`) and searching for 'rust-analyzer'. You should install the **Release Version**.

![rust-analyzer extension in the Extensions view](images/rust/rust-analyzer-extensions-view.png)

We'll discuss many of rust-analyzer features in this topic but you can also refer to the extension's documentation at [https://rust-analyzer.github.io](https://rust-analyzer.github.io).

### Check your installation

After installing Rust, you can check that everything is installed correctly by opening a new terminal/Command Prompt, and typing:

```bash
rustc --version
```

which will output the version of the Rust compiler. If you want more details, you can add the `--verbose` argument. If you run into problems, you can consult the Rust [installation guide](https://doc.rust-lang.org/book/ch01-01-installation.html).

You can keep your Rust installation up to date with the latest version by running:

```bash
rustup update
```

There are new stable versions of Rust published every 6 weeks so this is a good habit.

### Local Rust documentation

When you install Rust, you also get the full Rust documentation set locally installed on your machine, which you can review by typing `rustup doc`.  The Rust documentation, including [The Rust Programming Language](https://doc.rust-lang.org/book/title-page.html) and [The Cargo Book](https://doc.rust-lang.org/stable/cargo/), will open in your local browser so you can continue your Rust journey while offline.

## Hello World

### Cargo

When you install Rust with rustup, the toolset includes the rustc compiler, the rustfmt source code formatter, and the clippy Rust linter. You also get [Cargo](https://doc.rust-lang.org/cargo), the Rust package manager, to help download Rust dependencies and build and run Rust programs. You'll find that you end up using `cargo` for just about everything when working with Rust.

### Cargo new

A good way to create your first Rust program is to use Cargo to scaffold a new project by typing `cargo new`. This will create a simple Hello World program along with a default `Cargo.toml` dependency file. You pass `cargo new` the folder where you'd like to create the project.

Let's create Hello World. Navigate to a folder where you'd like to create your project and type:

```bash
cargo new hello_world
```

To open your new project in VS Code, navigate into the new folder and launch VS Code via `code .`:

```bash
cd hello_world
code .
```

>**Note**: Enable [Workspace Trust](/docs/editor/workspace-trust.md) for the new folder as you are the author. You can enable Workspace Trust for your entire project folder parent to avoid being prompted when you create new projects by checking the option to **Trust the authors of all the files in parent folder 'my_projects`**.

`cargo new` creates a simple Hello World project with a `main.rs` source code file and `Cargo.toml` [Cargo manifest](https://doc.rust-lang.org/cargo/reference/manifest.html) file.

```
src\
    main.rs
.gitignore
Cargo.toml
```

`main.rs` has the program's entry function `main()` and prints "Hello, world!" to the console using `println!`.

```rust
fn main() {
    println!("Hello, world!");
}
```

This simple Hello World program doesn't have any dependencies but you would add Rust package (crate) references under `[dependencies]`.

### Cargo build

Cargo can be used to build your Rust project. Open a new VS Code [integrated terminal](/docs/terminal/basics.md) (`kb(workbench.action.terminal.new)`) and type `cargo build`.

```bash
cargo build
```

![Cargo build output in the integrated terminal](images/rust/cargo-build.png)

You will now have `target\debug` folder with build output include an executable called `hello_world.exe`.

### Running Hello World

Cargo can also be used to run your Rust project via `cargo run`.

```bash
cargo run
```

You can also run `hello_world.exe` manually in the terminal by typing `.\target\debug\hello_world`.

![Manually running hello_world.exe output in the integrated terminal](images/rust/cargo-run.png)

## IntelliSense

IntelliSense features are provided by the Rust language server, [rust-analyzer](https://github.com/rust-lang/rust-analyzer/releases), which provides detailed code information and smart suggestions.

When you first open a Rust project, you can watch rust-analyzer's progress in the lower left of the Status bar. You want to wait until rust-analyzer has completely reviewed your project to get the full power of the language server.

![rust-analyzer in progress status in the VS Code Status bar](images/rust/rust-analyzer-status-bar.png)

### Inlay hints

One of the first things you may notice is rust-analyzer providing [inlay hints](/docs/editor/editingevolved.md#inlay-hints) to show inferred types, return values, named parameters in light text in the editor.

![Rust program with inlay hints displayed](images/rust/inlay-hints.png)

While inlay hints can be helpful for understanding your code, you can also configure the feature via the **Editor > Inlay Hints: Enabled** setting (`editor.inlayHints.enabled`).

### Hover information

Hovering on any variable, function, type, or keyword will give you information on that item such as documentation, signature, etc. You can also jump to the type definition in your own code or the standard Rust libraries.

![Hover information for the Rust String type](images/rust/hover.png)

### Auto completions

As you type in a Rust file, IntelliSense provides you with suggested completions and parameter hints.

![Smart completion for Rust String member](images/rust/code-completions.png)

>**Tip**: Use `kb(editor.action.triggerSuggest)` to trigger the suggestions manually.

## Semantic syntax highlighting

rust-analyzer is able to use [semantic syntax highlighting](https://github.com/microsoft/vscode/wiki/Semantic-Highlighting-Overview) and styling due to its rich understanding of a project source code. For example, you may have noticed that mutable variables are underlined in the editor.

![Mutable variable underline in the editor](images/rust/mutable-underline.png)

Being able to quickly tell which Rust variables are mutable or not can help your understanding of source code, but you can also change the styling with VS Code `editor.semanticTokenColorCustomizations` setting in your user [settings](/docs/getstarted/settings.md).

In `settings.json`, you would add:

```jsonc
{
  "editor.semanticTokenColorCustomizations": {
    "rules": {
      "*.mutable": {
        "fontStyle": "", // set to empty string to disable underline, which is the default
      },
    }
  },
}
```

You can learn more about rust-analyzer's semantic syntax customizations in the [Editor features](https://rust-analyzer.github.io/manual.html#editor-features) section of the rust-analyzer documentation.

## Code navigation

Code navigation features are available in the context menu in the editor.

* **Go to Definition** `kb(editor.action.revealDefinition)` - Go to the source code of the type definition.
* **Peek Definition** `kb(editor.action.peekDefinition)` - Bring up a Peek window with the type definition.
* **Go to References** `kb(editor.action.goToReferences)` - Show all references for the type.
* **Show Call Hierarchy** `kb(editor.showCallHierarchy)` - Show all calls from or to a function.

You can navigate via symbol search using the **Go to Symbol** commands from the **Command Palette** (`kb(workbench.action.showCommands)`).

* Go to Symbol in File - `kb(workbench.action.gotoSymbol)`
* Go to Symbol in Workspace - `kb(workbench.action.showAllSymbols)`

## Linting

The Rust toolset includes linting, provided by rustc and clippy, to detect issues with your source code.

![linter warning about an unused variable](images/rust/linter-warning.png)

The rustc linter, enabled by default, detects basic Rust errors, but you can use [clippy](https://github.com/rust-lang/rust-clippy) to get more lints. To enable clippy integration in rust-analyzer, change the **Rust-analyzer > Check: Command** (`rust-analyzer.check.command`) setting to `clippy` instead of the default `check`. The rust-analyzer extension will now run `cargo clippy` when you save a file and display clippy warnings and errors directly in the editor and Problems view.

## Quick Fixes

When the linter finds errors and warnings in your source code, rust-analyzer can often provide suggested Quick Fixes (also called Code Actions), which are available via a light bulb hover in the editor. You can quickly open available Quick Fixes via the `kb(editor.action.quickFix)`.

![Quick Fixes for greeting unused boolean variable](images/rust/quick-fixes.png)

## Refactoring

Due to rust-analyzer's semantic understanding of your source code, it can also provide smart renames, across your Rust files. With your cursor on a variable, select **Rename Symbol** from the context menu, Command Palette, or via `kb(editor.action.rename)`.

The rust-analyzer extension also supports other code refactorings and code generation, which the extension calls [Assists](https://rust-analyzer.github.io/manual.html#assists-code-actions).

Here are just a few of the refactorings available:

* Convert if statement to guarded return
* Inline variable
* Extract function
* Add return type
* Add import

## Formatting

The Rust toolset includes a formatter, [rustfmt](https://github.com/rust-lang/rustfmt), which can format your source code to conform to Rust conventions. You can format your Rust file using `kb(editor.action.formatDocument)` or by running the **Format Document** command from the **Command Palette** or the context menu in the editor.

You also have the option to run the formatter on each save (**Editor: Format On Save**) or paste (**Format On Paste**) to keep your Rust code properly formatted automatically while you are working.

## Debugging

The rust-analyzer extension supports debugging Rust from within VS Code.

### Install debugging support

To start debugging, you will first need to install one of two language extension with debugging support:

* [Microsoft C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) (ms-vscode.cpptools) – *on Windows*
* [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) (vadimcn.vscode-lldb) – *on macOS/Linux*

If you forget to install one of these extensions, rust-analyzer will provide a notification with links to the VS Code Marketplace when you try to start a debug session.

![rust-analyzer notification to install a debugging extension](images/rust/install-debugging-extensions.png)

### Using Rust Analyzer: Debug

The rust-analyzer extension has basic debugging support via the **Rust Analyzer: Debug** command available in the Command Palette (`kb(workbench.action.showCommands)`) and the **Run|Debug** CodeLens in the editor.

Let's debug the Hello World program, we created earlier. First we will set a breakpoint in `main.rs`.

1. You'll need to enable the setting **Debug: Allow Breakpoints Everywhere**, which you can find in the Settings editor (`kb(workbench.action.openSettings)`) by searching on 'everywhere`.

   ![Debug: Allow Breakpoints Everywhere in the Settings editor](images/rust/allow-breakpoints-everywhere.png)

2. Open `main.rs` and click the left gutter in the editor to set a break point on the `println!` line. It should display as a red dot.

   ![Red breakpoint dot in the left gutter of the editor](images/rust/set-breakpoint.png)

3. To start debugging, use either the **Rust Analyzer: Debug** command or select the **Debug** CodeLens about `main()`.

   ![Debug session stopped at breakpoint](images/rust/debug-hello-world.png)

<!--
### Using launch.json

For more complicated debugging scenarios, you can create a `launch.json` [debugging configuration](/docs/editor/debugging.md/#launch-configurations) file. A `launch.json` file lets you pass arguments to your program, run pre-launch tasks, set environment variables, and much more.

To create a `launch.json` for a Rust program:

1. In the Debug view (`kb(workbench.view.debug)`), select the **create a launch.json file** link.
2. This will display a dropdown, which several default launch configuration types. You can pick the first option as we will add another configuration for Rust.
3. You will now have a `launch.json` file in the editor, which is located in a new `.vscode` folder in your project.
4. Select the **Add Configuration** button in the lower right and select the **C/C++: (Windows) Launch** configuration.
  ![Add Configuration with C/C++ Windows Launch selected](images/rust/add-configuration.png)
-->

## Next steps

This has been a brief overview showing the rust-analyzer extension features within VS Code. For more information, see the details provided in the Rust Analyzer extension [User Manual](https://rust-analyzer.github.io/manual.html), including how to tune specific [VS Code editor](https://rust-analyzer.github.io/manual.html#vs-code-2) configurations.

To stay up to date on the latest features/bug fixes for the rust-analyzer extension, see the [CHANGELOG](https://rust-analyzer.github.io/thisweek). You can also try out new features and fixes by installing the rust-analyzer **Pre-Release Version** available in the Extensions view **Install** dropdown.

If you have any issues or feature requests, feel free to log them in the rust-analyzer extension [GitHub repo](https://github.com/rust-lang/rust-analyzer/issues).

If you'd like to learn more about VS Code, try these topics:

* [Basic Editing](/docs/editor/codebasics.md) - A quick introduction to the basics of the VS Code editor.
* [Install an Extension](/docs/editor/extension-marketplace.md) - Learn about other extensions are available in the [Marketplace](https://marketplace.visualstudio.com/vscode).
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.

## Common questions

### Linker errors

If you see linker errors such as **"error: linker `link.exe` not found"** when you try to build your Rust program, you may be missing the necessary C/C++ toolset. Depending on your platform, you will need to install a toolset with a C/C++ linker to combine the Rust compiler output.

**Windows**

On Windows, you will need to also install [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) in order to get the C/C++ linker `link.exe`. Be sure to select the **Desktop Development with C++** when running the Visual Studio installer.

>**Note**: You can use the C++ toolset from Visual Studio Build Tools along with Visual Studio Code to compile, build, and verify any codebase as long as you also have a valid Visual Studio license (either Community, Pro, or Enterprise).

**macOS**

You may need to install the XCode toolset by running `xcode-select --install` in a terminal.

**Linux**

You may need to install the GCC toolset via the `build-essential` package by running `sudo apt-get install build-essential` in a terminal.

For further troubleshooting advice, refer to the [Rust installation](https://doc.rust-lang.org/book/ch01-01-installation.html) guide.
