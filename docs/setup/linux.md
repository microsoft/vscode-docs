---
Order: 2
Area: setup
TOCTitle: Linux
ContentId: 7FDF94DB-3527-4296-BE1C-493495B89408
PageTitle: Running Visual Studio Code on Linux
DateApproved: 03/05/2025
MetaDescription: Get Visual Studio Code up and running on Linux.
---
# Visual Studio Code on Linux

## Installation

1. [Download and install Visual Studio Code for your Linux distribution](#install-vs-code-on-linux)

    > [!NOTE]
    > VS Code ships monthly releases and supports [auto-update](#updates) when a new release is available.

1. [Install additional components](/docs/setup/additional-components.md)

    Install Git, Node.js, TypeScript, language runtimes, and more.

1. [Install VS Code extensions from the Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode)

    Customize VS Code with themes, formatters, language extensions and debuggers for your favorite languages, and more.

1. [Set up AI-assisted coding with GitHub Copilot](/docs/copilot/setup-simplified.md)

    > [!TIP]
    > If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

1. [Get started with the VS Code tutorial](/docs/getstarted/getting-started.md)

    Discover the user interface and key features of VS Code.

## Install VS Code on Linux

### Debian and Ubuntu based distributions

1. The easiest way to install Visual Studio Code for Debian/Ubuntu based distributions is to download and install the [.deb package (64-bit)](https://go.microsoft.com/fwlink/?LinkID=760868), either through the graphical software center if it's available, or through the command line with:

    ```bash
    sudo apt install ./<file>.deb

    # If you're on an older Linux distribution, you will need to run this instead:
    # sudo dpkg -i <file>.deb
    # sudo apt-get install -f # Install dependencies
    ```

    > [!NOTE]
    > Other binaries are also available on the [VS Code download page](/Download).

    When you install the .deb package, it prompts to install the apt repository and signing key to enable auto-updating using the system's package manager.

1. To automatically install the apt repository and signing key, such as on a non-interactive terminal, run the following command first:

    ```bash
    echo "code code/add-microsoft-repo boolean true" | sudo debconf-set-selections
    ```

1. To manually install the apt repository:

    1. Run the following script:

        ```bash
        sudo apt-get install wget gpg
        wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
        sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
        echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" |sudo tee /etc/apt/sources.list.d/vscode.list > /dev/null
        rm -f packages.microsoft.gpg
        ```

    1. Then update the package cache and install the package using:

        ```bash
        sudo apt install apt-transport-https
        sudo apt update
        sudo apt install code # or code-insiders
        ```

### RHEL, Fedora, and CentOS based distributions

We currently ship the stable 64-bit VS Code for RHEL, Fedora, or CentOS based distributions in a yum repository.

1. Install the  key and yum repository by running the following script:

    ```bash
    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
    echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo > /dev/null
    ```

1. Then update the package cache and install the package using `dnf` (Fedora 22 and above):

    ```bash
    dnf check-update
    sudo dnf install code # or code-insiders
    ```

    Or on older versions using `yum`:

    ```bash
    yum check-update
    sudo yum install code # or code-insiders
    ```

> [!NOTE]
> Due to the manual signing process and the publishing system we use, the yum repo could lag behind and might not immediately get the latest version of VS Code.

### Snap

VS Code is officially distributed as a Snap package in the [Snap Store](https://snapcraft.io/store)

[![Get it from the Snap Store](images/linux/snap-store.png)](https://snapcraft.io/code)

You can install it by running:

```bash
sudo snap install --classic code # or code-insiders
```

Once installed, the Snap daemon takes care of automatically updating VS Code in the background. You get an in-product update notification whenever a new update is available.

> [!NOTE]
> If `snap` isn't available in your Linux distribution, check the [Installing snapd guide](https://docs.snapcraft.io/installing-snapd), which can help you get that set up.

Learn more about _snaps_ from the [official Snap Documentation](https://docs.snapcraft.io).

### openSUSE and SLE-based distributions

The yum repository [mentioned previously](#rhel-fedora-and-centos-based-distributions) also works for openSUSE and SLE-based systems.

1. Install the  key and yum repository by running the following script:

    ```bash
    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
    echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" |sudo tee /etc/zypp/repos.d/vscode.repo > /dev/null
    ```

1. Then update the package cache and install the package using:

    ```bash
    sudo zypper install code
    ```

### AUR package for Arch Linux

There is a community-maintained [Arch User Repository package for VS Code](https://aur.archlinux.org/packages/visual-studio-code-bin).

To get more information about the installation from the AUR, consult the following wiki entry:
[Install AUR Packages](https://wiki.archlinux.org/index.php/Arch_User_Repository).

### Nix package for NixOS (or any Linux distribution using Nix package manager)

There is a community-maintained [VS Code Nix package](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/editors/vscode/vscode.nix) in the nixpkgs repository.

To install it by using Nix:

1. Set `allowUnfree` option to true in your `config.nix`

1. Run the following command:

    ```bash
    nix-env -i vscode
    ```

### Install the `.rpm` package manually

You can manually download and install the [VS Code .rpm package (64-bit)](https://go.microsoft.com/fwlink/?LinkID=760867), however, auto-updating won't work unless the repository above is installed.

Once downloaded, the `.rpm` package can be installed by using your package manager, for example with `dnf`:

```bash
sudo dnf install <file>.rpm
```

> [!NOTE]
> Other binaries are also available on the [VS Code download page](/Download).

## Updates

VS Code ships monthly and you can see when a new release is available by checking the [release notes](/updates). If the VS Code repository was installed correctly, then your system package manager should handle auto-updating in the same way as other packages on the system.

> [!NOTE]
> Updates are automatic and run in the background for the [Snap package](#snap).

## Configure VS Code as the default text editor

### xdg-open

You can set the default text editor for text files (`text/plain`) that is used by `xdg-open` with the following command:

```bash
xdg-mime default code.desktop text/plain
```

### Debian alternatives system

Debian-based distributions allow setting a default **editor** by using the [Debian alternatives system](https://wiki.debian.org/DebianAlternatives), without concern for the MIME type. You can set this by running the following command and selecting `code`:

```bash
sudo update-alternatives --set editor /usr/bin/code
```

If VS Code doesn't show up as an alternative to the default `editor`, you need to register it:

```bash
sudo update-alternatives --install /usr/bin/editor editor $(which code) 10
```

## Use the custom title bar

The custom title bar provides many benefits, including great theming support and better accessibility through keyboard navigation and screen readers. These benefits might not always translate as well to the Linux platform. Linux has various desktop environments and window managers that can make the VS Code theming look foreign to users. Therefore, the custom title bar isn't enabled by default on Linux.

For users needing the accessibility improvements, we recommend enabling the custom title bar when running in accessibility mode using a screen reader.

You can manually configure the title bar with the **Window: Title Bar Style** (`setting(window.titleBarStyle)`) setting:

* `custom`: Use the custom title bar.
* `native`: Use the operating system's title bar.

## Windows as a Linux developer machine

Another option for Linux development with VS Code is to use a Windows machine with the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/install) (WSL).

### Windows Subsystem for Linux

With WSL, you can install and run Linux distributions on Windows to develop and test your source code on Linux, while still working locally on a Windows machine. WSL supports Linux distributions such as Ubuntu, Debian, SUSE, and Alpine available from the Microsoft Store.

When coupled with the [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension, you get full VS Code editing and debugging support while running in the context of a Linux distro on WSL.

See the [Developing in WSL](/docs/remote/wsl.md) documentation to learn more, or try the [Working in WSL](/docs/remote/wsl-tutorial.md) introductory tutorial.

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

* [VS Code tutorial](/docs/getstarted/getting-started.md) - A quick hands-on tour of the key features of VS Code.
* [Tips and Tricks](/docs/getstarted/tips-and-tricks.md) - A collection of productivity tips for working with VS Code.
* [AI-assisted coding](/docs/copilot/overview.md) - Learn about using GitHub Copilot in VS Code to help you write code faster.

## Common questions

### Debian and moving files to trash

If you see an error when deleting files from the VS Code Explorer on the Debian operating system, it might be because the trash implementation that VS Code is using is not there.

Run these commands to solve this issue:

```bash
sudo apt-get install gvfs libglib2.0-bin
```

### Conflicts with VS Code packages from other repositories

Some distributions, for example [Pop!\_OS](https://pop.system76.com) provide their own `code` package. To ensure the official VS Code repository is used, create a file named `/etc/apt/preferences.d/code` with the following content:

```
Package: code
Pin: origin "packages.microsoft.com"
Pin-Priority: 9999
```

### "Visual Studio Code is unable to watch for file changes in this large workspace" (error ENOSPC)

When you see this notification, it indicates that the VS Code file watcher is running out of file handles that are needed to implement file watching. Most often this can happen when opening a workspace that is large and contains many files. Before adjusting platform limits, make sure that potentially large folders, such as Python `.venv`, are added to the `setting(files.watcherExclude)` setting (more details below). It is also possible that other running applications consume so many file handles that none are left for VS Code to use. In that case, it might help to close these other applications.

The current limit can be viewed by running:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

The limit can be increased to its maximum by editing `/etc/sysctl.conf` (except on Arch Linux, read below) and adding this line to the end of the file:

```bash
fs.inotify.max_user_watches=524288
```

The new value can then be loaded in by running `sudo sysctl -p`.

While 524,288 is the maximum number of files that can be watched, if you're in an environment that is particularly memory-constrained, you might want to lower the number. Each file watch [takes up 1,080 bytes](https://stackoverflow.com/a/7091897/1156119), so assuming that all 524,288 watches are consumed, that results in an upper bound of around 540 MiB.

[Arch](https://www.archlinux.org/)-based distros (including Manjaro) require you to change a different file; follow [these steps](https://gist.github.com/tbjgolden/c53ca37f3bc2fab8c930183310918c8c) instead.

Another option is to exclude specific workspace directories from the VS Code file watcher with the `setting(files.watcherExclude)` [setting](/docs/editor/customizing/settings.md). The default for `setting(files.watcherExclude)` excludes `node_modules` and some folders under `.git`, but you can add other directories that you don't want VS Code to track.

```json
"files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
  }
```

### I can't see Chinese characters in Ubuntu

We're working on a fix. In the meantime, open the application menu, then choose **File** > **Preferences** > **Settings**. In the **Text Editor** > **Font** section, set "Font Family" to `Droid Sans Mono, Droid Sans Fallback`. If you'd rather edit the `settings.json` file directly, set `setting(editor.fontFamily)` as shown:

```json
    "editor.fontFamily": "Droid Sans Mono, Droid Sans Fallback"
```

### Package git is not installed

This error can appear during installation and is typically caused by the package manager's lists being out of date. Try updating them and installing again:

```bash
# For .deb
sudo apt-get update

# For .rpm (Fedora 21 and below)
sudo yum check-update

# For .rpm (Fedora 22 and above)
sudo dnf check-update
```

### The code bin command does not bring the window to the foreground on Ubuntu

Running `code .` on Ubuntu when VS Code is already open in the current directory will not bring VS Code into the foreground. This is a feature of the OS which can be disabled using `ccsm`.

```bash
# Install
sudo apt-get update
sudo apt-get install compizconfig-settings-manager

# Run
ccsm
```

Under **General** > **General Options** > **Focus & Raise Behavior**, set "Focus Prevention Level" to "Off". Remember this is an OS-level setting that will apply to all applications, not just VS Code.

### Cannot install .deb package due to "/etc/apt/sources.list.d/vscode.list: No such file or directory"

This can happen when `sources.list.d` doesn't exist or you don't have access to create the file. To fix this, try manually creating the folder and an empty `vscode.list` file:

```bash
sudo mkdir /etc/apt/sources.list.d
sudo touch /etc/apt/sources.list.d/vscode.list
```

### Cannot move or resize the window while X forwarding a remote window

If you are using X forwarding to use VS Code remotely, you will need to use the native title bar to ensure you can properly manipulate the window. You can switch to using it by setting `setting(window.titleBarStyle)` to `native`.

### Repository changed its origin value

If you receive an error similar to the following:

```
E: Repository '...' changed its 'Origin' value from '...' to '...'
N: This must be accepted explicitly before updates for this repository can be applied. See apt-secure(8) manpage for details.
```

Use `apt` instead of `apt-get` and you will be prompted to accept the origin change:

```bash
sudo apt update
```
