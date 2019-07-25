---
Order: 2
Area: setup
TOCTitle: Linux
ContentId: 7FDF94DB-3527-4296-BE1C-493495B89408
PageTitle: Running Visual Studio Code on Linux
DateApproved: 7/3/2019
MetaDescription: Get Visual Studio Code up and running on Linux.
---
# Visual Studio Code on Linux

## Installation

### Snap

Visual Studio Code is officially distributed as a Snap package in the [Snap Store](https://snapcraft.io/store):

[![Get it from the Snap Store](images/linux/snap-store.png)](https://snapcraft.io/code)

You can install it simply by running:

```bash
sudo snap install --classic code # or code-insiders
```

Once installed, the Snap daemon will take care of automatically updating VS Code in the background. You will get an in-product update notification whenever a new update is available.

**Note:** If `snap` isn't available in your Linux distribution, please check the following [Installing snapd guide](https://docs.snapcraft.io/installing-snapd), which can help you get that set up.

Learn more about snaps from the [official Snap Documentation](https://docs.snapcraft.io).

### Debian and Ubuntu based distributions

The easiest way to install Visual Studio Code for Debian/Ubuntu based distributions is to download and install the [.deb package (64-bit)](https://go.microsoft.com/fwlink/?LinkID=760868), either through the graphical software center if it's available, or through the command line with:

```bash
sudo apt install ./<file>.deb

# If you're on an older Linux distribution, you will need to run this instead:
# sudo dpkg -i <file>.deb
# sudo apt-get install -f # Install dependencies
```

Installing the .deb package will automatically install the apt repository and signing key to enable auto-updating using the system's package manager. Note that 32-bit and .tar.gz binaries are also available on the [VS Code download page](/Download).

The repository and key can also be installed manually with the following script:

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
```

Then update the package cache and install the package using:

```bash
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install code # or code-insiders
```

### RHEL, Fedora, and CentOS based distributions

We currently ship the stable 64-bit VS Code in a yum repository, the following script will install the key and repository:

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
```

Then update the package cache and install the package using `dnf` (Fedora 22 and above):

```bash
dnf check-update
sudo dnf install code
```

Or on older versions using `yum`:

```bash
yum check-update
sudo yum install code
```

Due to the manual signing process and the system we use to publish, the yum repo may lag behind and not get the latest version of VS Code immediately.

### openSUSE and SLE-based distributions

The yum repository above also works for openSUSE and SLE-based systems, the following script will install the key and repository:

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/zypp/repos.d/vscode.repo'
```

Then update the package cache and install the package using:

```bash
sudo zypper refresh
sudo zypper install code
```

### AUR package for Arch Linux

There is a community maintained [Arch User Repository package for VS Code](https://aur.archlinux.org/packages/visual-studio-code-bin).

To get more information about the installation from the AUR, please consult the following wiki entry:
[Install AUR Packages](https://wiki.archlinux.org/index.php/Arch_User_Repository#Build_and_install_the_package).

### Nix package for NixOS (or any Linux distribution using Nix package manager)

There is a community maintained [VS Code Nix package](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/editors/vscode/default.nix) in the nixpkgs repository. In order to install it using Nix, set `allowUnfree` option to true in your `config.nix` and execute:

```bash
nix-env -i vscode
```

### Installing .rpm package manually

The [VS Code .rpm package (64-bit)](https://go.microsoft.com/fwlink/?LinkID=760867) can also be manually downloaded and installed, however auto-updating won't work unless the repository above is installed. Once downloaded it can be installed using your package manager, for example with `dnf`:

```bash
sudo dnf install <file>.rpm
```

Note that 32-bit and .tar.gz binaries are also available on the [VS Code download page](/Download).

## Updates

VS Code ships monthly and you can see when a new release is available by checking the [release notes](/updates). If the VS Code repository was installed correctly, then your system package manager should handle auto-updating in the same way as other packages on the system.

**Note:** Updates are automatic and run in the background for the [Snap package](#snap).

## Node.js

Node.js is a popular platform and runtime for easily building and running JavaScript applications. It also includes [npm](https://www.npmjs.com/), a Package Manager for Node.js modules. You'll see Node.js and npm mentioned frequently in our documentation and some optional VS Code tooling requires Node.js (for example, the VS Code [extension generator](/api/get-started/your-first-extension.md)).

If you'd like to install Node.js on Linux, see [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager) to find the Node.js package and installation instructions tailored to your Linux distribution. You can also install and support multi version of Node.js by using the [Node Version Manager](https://github.com/creationix/nvm).

To learn more about JavaScript and Node.js, see our [Node.js tutorial](/docs/nodejs/nodejs-tutorial.md), where you'll learn about running and debugging Node.js applications with VS Code.

## Setting VS Code as the default text editor

### xdg-open

You can set the default text editor for text files (`text/plain`) that is used by `xdg-open` with the following command:

```bash
xdg-mime default code.desktop text/plain
```

### Debian alternatives system

Debian-based distributions allow setting a default **editor** using the [Debian alternatives system](https://wiki.debian.org/DebianAlternatives), without concern for the MIME type. You can set this by running the following and selecting code:

```bash
sudo update-alternatives --set editor /usr/bin/code
```

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript, and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.

## Common questions

### Azure VM Issues

I'm getting a "Running without the SUID sandbox" error?

You can safely ignore this error.

### Debian and moving files to trash

If you see an error when deleting files from the VS Code Explorer on the Debian operating system, it might be because the trash implementation that VS Code is using is not there.

Run these commands to solve this issue:

```bash
sudo apt-get install gvfs-bin
```

### "Visual Studio Code is unable to watch for file changes in this large workspace" (error ENOSPC)

When you see this notification, it indicates that the VS Code file watcher is running out of handles because the workspace is large and contains many files. The current limit can be viewed by running:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

The limit can be increased to its maximum by editing `/etc/sysctl.conf` and adding this line to the end of the file:

```bash
fs.inotify.max_user_watches=524288
```

The new value can then be loaded in by running `sudo sysctl -p`. Note that [Arch Linux](https://www.archlinux.org/) works a little differently, See [Increasing the amount of inotify watchers](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers) for details.

While 524,288 is the maximum number of files that can be watched, if you're in an environment that is particularly memory constrained, you may wish to lower the number. Each file watch [takes up 540 bytes (32-bit) or ~1kB (64-bit)](https://stackoverflow.com/a/7091897/1156119), so assuming that all 524,288 watches are consumed, that results in an upper bound of around 256MB (32-bit) or 512MB (64-bit).

Another option is to exclude specific workspace directories from the VS Code file watcher with the `files.watcherExclude` [setting](/docs/getstarted/settings.md). The default for `files.watcherExclude` excludes `node_modules` and some folders under `.git`, but you can add other directories that you don't want VS Code to track.

```json
"files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
  }
```

### I can't see Chinese characters in Ubuntu

We're working on a fix. In the meantime, open the application menu, then choose **File** > **Preferences** > **Settings**. In the **Text Editor** > **Font** section, set "Font Family" to `Droid Sans Mono, Droid Sans Fallback`. If you'd rather edit the `settings.json` file directly, set `editor.fontFamily` as shown:

```json
    "editor.fontFamily": "Droid Sans Mono, Droid Sans Fallback"
```

### Package git is not installed

This error can appear during installation and is typically caused by the package manager's lists being out of date. Try updating them and installing again:

```bash
# For .deb
sudo apt-get update

# For .rpm (Fedora 21 and below)
sudo yum update

# For .rpm (Fedora 22 and above)
sudo dnf update
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

Under **General** > **General Options** > **Focus & Raise Behaviour**, set "Focus Prevention Level" to "Off". Remember this is an OS-level setting that will apply to all applications, not just VS Code.

### Cannot install .deb package due to "/etc/apt/sources.list.d/vscode.list: No such file or directory"

This can happen when `sources.list.d` doesn't exist or you don't have access to create the file. To fix this, try manually creating the folder and an empty `vscode.list` file:

```bash
sudo mkdir /etc/apt/sources.list.d
sudo touch /etc/apt/sources.list.d/vscode.list
```

### Cannot move or resize the window while X forwarding a remote window

If you are using X forwarding to use VS Code remotely, you will need to use the native title bar to ensure you can properly manipulate the window. You can switch to using it by setting `window.titleBarStyle` to `native`.

### Using the custom title bar

The custom title bar and menus were enabled by default on Linux for several months. The custom title bar has been a success on Windows, but the customer response on Linux suggests otherwise. Based on feedback, we have decided to make this setting opt-in on Linux and leave the native title bar as the default.

The custom title bar provides many benefits including great theming support and better accessibility through keyboard navigation and screen readers. Unfortunately, these benefits do not translate as well to the Linux platform. Linux has a variety of desktop environments and window managers that can make the VS Code theming look foreign to users. For users needing the accessibility improvements, we recommend enabling the custom title bar when running in accessibility mode using a screen reader. You can still manually set the title bar with the **Window: Title Bar Style** (`window.titleBarStyle`) setting.

### Broken cursor in editor with display scaling enabled

Due to an upstream [issue #14787](https://github.com/electron/electron/issues/14787) with Electron, the mouse cursor may render incorrectly with scaling enabled. If you notice that the usual text cursor is not being rendered inside the editor as you would expect, try falling back to the native menu bar by configuring the setting `window.titleBarStyle` to `native`.

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
