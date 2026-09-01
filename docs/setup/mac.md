---
ContentId: EEADB50A-F5E3-41E9-89DA-35F165196691
DateApproved: 9/2/2026
MetaDescription: Install {% data variables.product.prodname_vscode %} on macOS, add the code command to your path, and resolve common setup issues.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Installing {% data variables.product.prodname_vscode %} on macOS

{% data variables.product.prodname_vscode %} is available for macOS through a downloadable disk image. {% data variables.product.prodname_vscode_shortname %} supports Intel-based Macs and Macs with Apple silicon.

## Install {% data variables.product.prodname_vscode_shortname %} on macOS

1. [Download {% data variables.product.prodname_vscode %}](https://go.microsoft.com/fwlink/?LinkID=534106) for macOS.

1. Open the downloaded `.dmg` file.

1. Drag `{% data variables.product.prodname_vscode %}.app` to the **Applications** folder.

1. Open {% data variables.product.prodname_vscode_shortname %} from the **Applications** folder by double-clicking the icon.

1. To keep {% data variables.product.prodname_vscode_shortname %} in the Dock, Control-click the icon in the Dock, then select **Options** > **Keep in Dock**.

> [!NOTE]
> The [Download {% data variables.product.prodname_vscode %}](/download) page also lists Universal, Intel chip, and Apple silicon builds.

## Launch {% data variables.product.prodname_vscode_shortname %} from the command line

To run {% data variables.product.prodname_vscode_shortname %} from the terminal by typing `code`, add {% data variables.product.prodname_vscode_shortname %} to the `$PATH` environment variable.

### Configure PATH with {% data variables.product.prodname_vscode_shortname %}

1. Launch {% data variables.product.prodname_vscode_shortname %}.

1. Open the **Command Palette** (`kbstyle(Cmd+Shift+P)`), type `shell command`, and run the **Shell Command: Install 'code' command in PATH** command.

    ![Screenshot showing the Shell Command command in the Command Palette on macOS.](images/mac/shell-command.png)

1. Restart the terminal for the new `$PATH` value to take effect.

    Run `code .` in any folder to start editing files in that folder.

> [!NOTE]
> If an old `code` alias remains in `.bash_profile` or an equivalent shell profile from an earlier {% data variables.product.prodname_vscode_shortname %} version, remove it and run the **Shell Command: Install 'code' command in PATH** command again.

### Manually configure PATH

To manually add {% data variables.product.prodname_vscode_shortname %} to your path, run the command for your shell.

**Zsh**:

```zsh
cat << EOF >> ~/.zprofile
# Add {% data variables.product.prodname_vscode %} (code)
export PATH="\$PATH:/Applications/{% data variables.product.prodname_vscode %}.app/Contents/Resources/app/bin"
EOF
```

**Bash**:

```bash
cat << EOF >> ~/.bash_profile
# Add {% data variables.product.prodname_vscode %} (code)
export PATH="\$PATH:/Applications/{% data variables.product.prodname_vscode %}.app/Contents/Resources/app/bin"
EOF
```

> [!NOTE]
> The leading backslash in `\$PATH` prevents `$PATH` from expanding during concatenation. Remove the backslash when running the export command directly in a terminal.

Start a new terminal to pick up your changes. Run `code .` in any folder to start editing files in that folder.

## Updates

{% data variables.product.prodname_vscode_shortname %} ships weekly [releases](/updates) and supports auto-update when a new release is available. When {% data variables.product.prodname_vscode_shortname %} prompts you for an update, accept the prompt to install the new version.

> [!NOTE]
> [Disable auto-update](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-auto-updates) if you prefer to update {% data variables.product.prodname_vscode_shortname %} on your own schedule.

## Touch Bar support

{% data variables.product.prodname_vscode_shortname %} adds these Touch Bar actions on supported Macs:

* Editor history navigation.
* The Debug toolbar for controlling the debugger.

![Screenshot showing {% data variables.product.prodname_vscode_shortname %} Touch Bar actions on macOS.](images/mac/touchbar.gif)

## After installation

After you install {% data variables.product.prodname_vscode_shortname %}, finish setup for your development workflow:

* [Install additional components](/docs/setup/additional-components.md), including Git, Node.js, TypeScript, language runtimes, and command-line tools.
* [Install extensions from the Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode) to add themes, formatters, debuggers, and language support.
* [Set up GitHub Copilot](/docs/setup/copilot.md) to use AI features in {% data variables.product.prodname_vscode_shortname %}.
* [Start the {% data variables.product.prodname_vscode_shortname %} tutorial](/docs/editing/getting-started/editor-tutorial.md) for a hands-on tour of the user interface and key features.

## Common questions

<details>
<summary>Why does {% data variables.product.prodname_vscode %} ask for access to my calendar?</summary>

On macOS Mojave, dialogs might say "{% data variables.product.prodname_vscode %} would like to access your calendar, contacts, or photos." These dialogs come from macOS privacy protections and are not specific to {% data variables.product.prodname_vscode_shortname %}. Select **Don't Allow** because {% data variables.product.prodname_vscode_shortname %} does not need access to those folders.

</details>

<details>
<summary>{% data variables.product.prodname_vscode_shortname %} fails to update</summary>

If {% data variables.product.prodname_vscode_shortname %} doesn't update after restart, macOS might have set it under quarantine. Follow the steps in [issue #7426](https://github.com/microsoft/vscode/issues/7426#issuecomment-425093469) to resolve the issue.

</details>

<details>
<summary>Does {% data variables.product.prodname_vscode_shortname %} run on Apple silicon machines?</summary>

Yes. {% data variables.product.prodname_vscode_shortname %} supports macOS Arm64 builds that run on Macs with Apple silicon. Install the Universal build, which includes both Intel and Apple silicon builds, or install one of the platform-specific builds.

</details>
