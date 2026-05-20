---
ContentId: 7FDF94DB-3527-4296-BE1C-493495B89408
DateApproved: 5/20/2026
MetaDescription: Install Visual Studio Code on Linux with Debian, RPM, Snap, Arch, or Nix package options.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Installing Visual Studio Code on Linux

Visual Studio Code is available on Linux through official Debian, RPM, and Snap packages. Community-maintained packages are also available for Arch Linux and Nix.

## Install VS Code on Linux

Choose the package method that matches your Linux distribution.

<details id="_debian-and-ubuntubased-distributions">
<summary id="debian-and-ubuntu-based-distributions">Debian and Ubuntu-based distributions</summary>

1. Download the [.deb package](https://go.microsoft.com/fwlink/?LinkID=760868).

1. Install the package with the graphical software center, or install it from the command line:

    ```bash
    sudo apt install ./<file>.deb

    # On older Linux distributions, run these commands instead:
    # sudo dpkg -i <file>.deb
    # sudo apt-get install -f # Install dependencies
    ```

    > [!NOTE]
    > Other binaries are available on the [VS Code download page](/download).

The `.deb` package prompts to install the apt repository and signing key, which enables auto-update through the system package manager.

For non-interactive installation, run this command before installing the `.deb` package to automatically install the apt repository and signing key:

```bash
echo "code code/add-microsoft-repo boolean true" | sudo debconf-set-selections
```

To manually install the apt repository:

1. Install the signing key:

    ```bash
    sudo apt install wget gpg &&
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg
    ```

1. Create a `/etc/apt/sources.list.d/vscode.sources` file with these contents:

    ```plaintext
    Types: deb
    URIs: https://packages.microsoft.com/repos/code
    Suites: stable
    Components: main
    Architectures: amd64,arm64,armhf
    Signed-By: /usr/share/keyrings/microsoft.gpg
    ```

1. Update the package cache and install the package:

    ```bash
    sudo apt update &&
    sudo apt install code # or code-insiders
    ```

> [!NOTE]
> Due to the manual signing process and publishing system, the Debian repository could lag behind by up to three hours and not immediately contain the latest version of VS Code.

</details>

<details id="_rhel-fedora-and-centosbased-distributions">
<summary id="rhel-fedora-and-centos-based-distributions">RHEL, Fedora, and CentOS-based distributions</summary>

Microsoft provides the stable 64-bit VS Code package for RHEL, Fedora, and CentOS-based distributions in a yum repository.

1. Install the key and yum repository:

    ```bash
    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc &&
    echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo > /dev/null
    ```

1. Update the package cache and install the package with `dnf` on Fedora 22 and later:

    ```bash
    dnf check-update &&
    sudo dnf install code # or code-insiders
    ```

    On older versions, use `yum`:

    ```bash
    yum check-update &&
    sudo yum install code # or code-insiders
    ```

> [!NOTE]
> Due to the manual signing process and publishing system, the yum repository could lag behind by up to three hours and not immediately contain the latest version of VS Code.

</details>

<details id="_snap-package">
<summary id="snap-package">Snap package</summary>

VS Code is officially distributed as a Snap package in the [Snap Store](https://snapcraft.io/store).

[![Get it from the Snap Store](images/linux/snap-store.png)](https://snapcraft.io/code)

Install the Snap package with this command:

```bash
sudo snap install --classic code # or code-insiders
```

Once installed, the Snap daemon automatically updates VS Code in the background. VS Code shows an in-product update notification whenever a new update is available.

> [!NOTE]
> If `snap` isn't available in your Linux distribution, check the [Installing snapd guide](https://docs.snapcraft.io/installing-snapd).

Learn more about snaps from the [official Snap documentation](https://docs.snapcraft.io).

</details>

<details id="_opensuse-and-slebased-distributions">
<summary id="opensuse-and-sle-based-distributions">openSUSE and SLE-based distributions</summary>

The yum repository from the [RHEL, Fedora, and CentOS panel](#rhel-fedora-and-centosbased-distributions) also works for openSUSE and SLE-based systems.

1. Install the key and yum repository:

    ```bash
    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc &&
    echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/zypp/repos.d/vscode.repo > /dev/null
    ```

1. Update the package cache and install the package:

    ```bash
    sudo zypper install code
    ```

</details>

<details id="_arch-linux-aur-package">
<summary id="arch-linux-aur-package">Arch Linux AUR package</summary>

The [Arch User Repository package for VS Code](https://aur.archlinux.org/packages/visual-studio-code-bin) is community maintained.

For installation details, see the Arch Linux wiki article about [installing AUR packages](https://wiki.archlinux.org/index.php/Arch_User_Repository).

</details>

<details id="_nix-package">
<summary id="nix-package">Nix package</summary>

The [VS Code Nix package](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/editors/vscode/vscode.nix) in the nixpkgs repository is community maintained.

To install VS Code by using Nix:

1. Set the `allowUnfree` option to true in your `config.nix`.

1. Run this command:

    ```bash
    nix-env -i vscode
    ```

</details>

<details id="_manual-rpm-package">
<summary id="manual-rpm-package">Manual RPM package</summary>

Download and install the [VS Code .rpm package](https://go.microsoft.com/fwlink/?LinkID=760867) manually when repository installation is not available. Auto-update does not work unless the repository is installed.

Install the downloaded `.rpm` package with your package manager, for example with `dnf`:

```bash
sudo dnf install <file>.rpm
```

> [!NOTE]
> Other binaries are available on the [VS Code download page](/download).

</details>

## Updates

VS Code ships weekly [releases](/updates). If the VS Code repository is installed correctly, the system package manager handles auto-update the same way it handles other packages on the system.

> [!NOTE]
> Updates are automatic and run in the background for the [Snap package](#snap-package).

## Configure VS Code as the default text editor

### xdg-open

Set VS Code as the default text editor for text files, `text/plain`, used by `xdg-open`:

```bash
xdg-mime default code.desktop text/plain
```

### Debian alternatives system

Debian-based distributions support setting a default **editor** through the [Debian alternatives system](https://wiki.debian.org/DebianAlternatives), without concern for the MIME type. Set VS Code as the default editor with this command:

```bash
sudo update-alternatives --set editor /usr/bin/code
```

If VS Code was installed with the Snap package, use this command instead:

```bash
sudo update-alternatives --set editor /snap/bin/code
```

If VS Code doesn't show up as an alternative to the default `editor`, register it:

```bash
sudo update-alternatives --install /usr/bin/editor editor $(which code) 10
```

## Use the custom title bar

The custom title bar provides theming support and better accessibility through keyboard navigation and screen readers. These benefits might not always translate as well to Linux because desktop environments and window managers vary. For this reason, the custom title bar isn't enabled by default on Linux.

For accessibility improvements while using a screen reader, enable the custom title bar when running in accessibility mode.

Configure the title bar with the **Window: Title Bar Style** (`setting(window.titleBarStyle)`) setting:

* `custom`: Use the custom title bar.
* `native`: Use the operating system title bar.

## Develop on Linux with WSL

Another option for Linux development with VS Code is to use a Windows machine with the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/install) (WSL).

With WSL, install and run Linux distributions on Windows to develop and test source code on Linux while working locally on a Windows machine. WSL supports Linux distributions such as Ubuntu, Debian, SUSE, and Alpine from the Microsoft Store.

When paired with the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl), VS Code provides editing and debugging support while running in the context of a Linux distro on WSL.

See the [Developing in WSL](/docs/remote/wsl.md) documentation to learn more, or try the [Working in WSL](/docs/remote/wsl-tutorial.md) introductory tutorial.

## After installation

After you install VS Code, finish setup for your development workflow:

* [Install additional components](/docs/setup/additional-components.md), including Git, Node.js, TypeScript, language runtimes, and command-line tools.
* [Install extensions from the Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode) to add themes, formatters, debuggers, and language support.
* [Set up GitHub Copilot](/docs/copilot/setup.md) to use AI features in VS Code.
* [Start the VS Code tutorial](/docs/getstarted/getting-started.md) for a hands-on tour of the user interface and key features.

## Common questions

<details>
<summary>Package git is not installed</summary>

This error can appear during installation when the package manager's lists are out of date. Update the package manager and install again:

```bash
# For .deb
sudo apt-get update

# For .rpm on Fedora 21 and earlier
sudo yum check-update

# For .rpm on Fedora 22 and later
sudo dnf check-update
```

</details>

<details>
<summary>Conflicts with VS Code packages from other repositories</summary>

Some distributions, such as [Pop!_OS](https://pop.system76.com), provide their own `code` package. To ensure that the official VS Code repository is used, create a file named `/etc/apt/preferences.d/code` with this content:

```plaintext
Package: code
Pin: origin "packages.microsoft.com"
Pin-Priority: 9999
```

</details>

<details>
<summary>Debian and moving files to trash</summary>

If deleting files from the VS Code Explorer fails on Debian, the trash implementation used by VS Code might be missing.

Run this command to install the missing packages:

```bash
sudo apt-get install gvfs libglib2.0-bin
```

</details>

<details>
<summary>"Visual Studio Code is unable to watch for file changes in this large workspace" (error ENOSPC)</summary>

This notification indicates that the VS Code file watcher is running out of file handles. This often happens when opening a workspace that contains many files. Before adjusting platform limits, add large folders, such as Python `.venv`, to the `setting(files.watcherExclude)` setting. Other running applications might also consume file handles, so closing other applications might help.

View the current limit by running:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

Increase the limit to the maximum by editing `/etc/sysctl.conf` and adding this line to the end of the file. Arch Linux and Ubuntu 24.10 and later use files in `/etc/sysctl.d/*.conf`.

```bash
fs.inotify.max_user_watches=524288
```

Load the new value:

```bash
sudo sysctl --system
```

Each file watch [takes up 1,080 bytes](https://stackoverflow.com/a/7091897/1156119). If all 524,288 watches are consumed, the upper bound is around 540 MiB. In memory-constrained environments, choose a lower value.

Another option is to exclude specific workspace directories from the VS Code file watcher with the `setting(files.watcherExclude)` [setting](/docs/configure/settings.md). The default `setting(files.watcherExclude)` value excludes `node_modules` and some folders under `.git`. Add other directories that VS Code should not track.

```json
"files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
}
```

</details>

<details>
<summary>I can't see Chinese characters in Ubuntu</summary>

Open the application menu, then choose **File** > **Preferences** > **Settings**. In the **Text Editor** > **Font** section, set **Font Family** to `Droid Sans Mono, Droid Sans Fallback`.

To edit the `settings.json` file directly, set `setting(editor.fontFamily)`:

```json
"editor.fontFamily": "Droid Sans Mono, Droid Sans Fallback"
```

</details>

<details>
<summary>The code bin command does not bring the window to the foreground on Ubuntu</summary>

Running `code .` on Ubuntu when VS Code is already open in the current directory does not bring VS Code into the foreground. This is an operating system behavior that can be changed with `ccsm`.

```bash
# Install
sudo apt-get update
sudo apt-get install compizconfig-settings-manager

# Run
ccsm
```

Under **General** > **General Options** > **Focus & Raise Behavior**, set **Focus Prevention Level** to **Off**. This operating system setting applies to all applications, not only VS Code.

</details>

<details>
<summary>Cannot install .deb package due to "/etc/apt/sources.list.d/vscode.list: No such file or directory"</summary>

This error can occur when `sources.list.d` doesn't exist or the current user doesn't have access to create the file. Create the folder and an empty `vscode.list` file:

```bash
sudo mkdir /etc/apt/sources.list.d
sudo touch /etc/apt/sources.list.d/vscode.list
```

</details>

<details>
<summary>Cannot move or resize the window while X forwarding a remote window</summary>

If using X forwarding to use VS Code remotely, use the native title bar to manipulate the window. Set `setting(window.titleBarStyle)` to `native`.

</details>

<details>
<summary>Repository changed its origin value</summary>

If an error similar to the following appears:

```plaintext
E: Repository '...' changed its 'Origin' value from '...' to '...'
N: This must be accepted explicitly before updates for this repository can be applied. See apt-secure(8) manpage for details.
```

Use `apt` instead of `apt-get` and accept the origin change when prompted:

```bash
sudo apt update
```

</details>
