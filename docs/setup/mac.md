---
ContentId: EEADB50A-F5E3-41E9-89DA-35F165196691
DateApproved: 11/12/2025
MetaDescription: Get Visual Studio Code up and running on Mac (macOS).
---
# Visual Studio Code on macOS

## Installation

1. [Download and install Visual Studio Code](#install-vs-code-on-macos)

    > [!NOTE]
    > VS Code ships monthly releases and supports [auto-update](#updates) when a new release is available.

1. [Install additional components](/docs/setup/additional-components.md)

    Install Git, Node.js, TypeScript, language runtimes, and more.

1. [Install VS Code extensions from the Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode)

    Customize VS Code with themes, formatters, language extensions and debuggers for your favorite languages, and more.

1. [Enable AI features](/docs/copilot/setup-simplified.md)

    > [!TIP]
    > If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

1. [Get started with the VS Code tutorial](/docs/getstarted/getting-started.md)

    Discover the user interface and key features of VS Code.

## Install VS Code on macOS

1. [Download Visual Studio Code](https://go.microsoft.com/fwlink/?LinkID=534106) for macOS.

1. Open the browser's download list and locate the downloaded app or archive.

1. If archive, extract the archive contents. Use double-click for some browsers or select the 'magnifying glass' icon with Safari.

1. Drag `Visual Studio Code.app` to the **Applications** folder, making it available in the macOS Launchpad.

1. Open VS Code from the **Applications** folder, by double clicking the icon.

1. Add VS Code to your Dock by right-clicking on the icon, located in the Dock, to bring up the context menu and choosing **Options**, **Keep in Dock**.

## Launch VS Code from the command line

To run VS Code from the terminal by typing `code`, add it to the `$PATH` environment variable using one of the following methods:

### Configure the path with VS Code

1. Launch VS Code

1. Open the **Command Palette** (`kbstyle(Cmd+Shift+P)`), type 'shell command', and run the **Shell Command: Install 'code' command in PATH** command.

    ![macOS shell commands](images/mac/shell-command.png)

1. Restart the terminal for the new `$PATH` value to take effect.

    You can now type 'code .' in any folder to start editing files in that folder.

> [!NOTE]
> If you still have the old `code` alias in your `.bash_profile` (or equivalent) from an early VS Code version, remove it and replace it by running the **Shell Command: Install 'code' command in PATH** command.

### Manually configure the path

To manually add VS Code to your path:

1. Run the following commands:

    **Zsh**:

    ```zsh
    cat << EOF >> ~/.zprofile
    # Add Visual Studio Code (code)
    export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
    EOF
    ```

    **Bash**:

    ```bash
    cat << EOF >> ~/.bash_profile
    # Add Visual Studio Code (code)
    export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
    EOF
    ```

    > [!NOTE]
    > The leading slash `\` is required to prevent `$PATH` from expanding during the concatenation. Remove the leading slash if you want to run the export command directly in a terminal.

1. Start a new terminal to pick up your changes.

    You can now type 'code .' in any folder to start editing files in that folder.

## Updates

VS Code ships monthly [releases](/updates) and supports auto-update when a new release is available. If you're prompted by VS Code, accept the newest update and it will get installed (you won't need to do anything else to get the latest bits).

> [!NOTE]
> You can [disable auto-update](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates) if you prefer to update VS Code on your own schedule.

## Touch Bar support

Out of the box, VS Code adds the following Touch Bar actions:

* To navigate in the editor history
* The full Debug tool bar to control the debugger on your Touch Bar:

![macOS Touch Bar](images/mac/touchbar.gif)

## Mojave privacy protections

On macOS Mojave, you might see dialogs saying "Visual Studio Code would like to access your {calendar/contacts/photos}." This is due to the new privacy protections in Mojave and is not specific to VS Code. The same dialogs might be displayed when running other applications as well. The dialog is shown once for each type of personal data and it is fine to choose **Don't Allow**, since VS Code does not need access to those folders.

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

* [VS Code tutorial](/docs/getstarted/getting-started.md) - A quick hands-on tour of the key features of VS Code.
* [Tips and Tricks](/docs/getstarted/tips-and-tricks.md) - A collection of productivity tips for working with VS Code.
* [AI-assisted coding](/docs/copilot/overview.md) - Learn about using GitHub Copilot in VS Code to help you write code faster.

## Common questions

### Why do I see "Visual Studio Code would like access to your calendar."

If you are running macOS Mojave version, you may see dialogs saying "Visual Studio Code would like to access your {calendar/contacts/photos}." This is due to the new privacy protections in Mojave [discussed above](#mojave-privacy-protections). It is fine to choose **Don't Allow** since VS Code does not need access to those folders.

### VS Code fails to update

If VS Code doesn't update once it restarts, it might be set under quarantine by macOS. Follow the steps in this [issue](https://github.com/microsoft/vscode/issues/7426#issuecomment-425093469) for resolution.

### Does VS Code run on Apple silicon machines?

Yes, VS Code supports macOS Arm64 builds that can run on Macs with the Apple silicon chipsets. You can install the Universal build, which includes both Intel and Apple silicon builds, or one of the platform-specific builds.
