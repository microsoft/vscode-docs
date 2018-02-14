---
Order: 2
Area: setup
TOCTitle: Linux
ContentId: 7FDF94DB-3527-4296-BE1C-493495B89408
PageTitle: Running Visual Studio Code on Linux
DateApproved: 2/7/2018
MetaDescription: Get Visual Studio Code up and running on Linux.
---
# Running VS Code on Linux

## Installation

### Debian and Ubuntu based distributions

The easiest way to install for Debian/Ubuntu based distributions is to download and install the [.deb package (64-bit)](https://go.microsoft.com/fwlink/?LinkID=760868) either through the graphical software center if it's available or through the command line with:

```bash
sudo dpkg -i <file>.deb
sudo apt-get install -f # Install dependencies
```

Installing the .deb package will automatically install the apt repository and signing key to enable auto-updating using the regular system mechanism. Note that 32-bit and .tar.gz binaries are also available on the [download page](/Download).

The repository and key can also be installed manually with the following script:

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
```

Then update the package cache and install the package using:

```bash
sudo apt-get update
sudo apt-get install code # or code-insiders
```

### RHEL, Fedora and CentOS based distributions

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

### openSUSE and SLE based distributions

The yum repository above also works for openSUSE and SLE based systems, the following script will install the key and repository:

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

There is a community maintained Arch User Repository (AUR) [package for VS Code](https://aur.archlinux.org/packages/visual-studio-code-bin).

### Nix package for NixOS (or any Linux distribution using Nix package manager)

There is a community maintained [Nix package](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/editors/vscode/default.nix) in the nixpkgs repository. In order to install it using Nix, set `allowUnfree` option to true in your `config.nix` and execute:

```bash
nix-env -i vscode
```

### Installing .rpm package manually

The [.rpm package (64-bit)](https://go.microsoft.com/fwlink/?LinkID=760867) can also be manually downloaded and installed, however auto-updating won't work unless the repository above is installed. Once downloaded it can be installed using your package manager, for example with `dnf`:

```bash
sudo dnf install <file>.rpm
```

Note that 32-bit and .tar.gz binaries are also available on the [download page](/Download).

## Updates

VS Code ships monthly and you can see when a new release is available by checking [Updates](/updates). If the VS Code repository was installed correctly, then your system package manager should handle auto-updating in the same way as other packages on the system.

## Node.js

Node.js is a popular platform and runtime for easily building and running JavaScript applications. It also includes [NPM](https://www.npmjs.com/), a Package Manager for Node.js modules. You'll see Node.js and NPM mentioned frequently in our documentation and some optional VS Code tooling requires Node.js (for example, the VS Code [extension generator](/docs/extensions/yocode.md)).

If you'd like to install Node.js on Linux, see [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager) to find the Node.js package and installation instructions tailored to your Linux distribution.

To learn more about JavaScript and Node.js, see our [Node.js tutorial](/docs/nodejs/nodejs-tutorial.md) where you'll learn about running and debugging Node.js applications with VS Code.

## Setting VS Code as the default text editor

### xdg-open

You can set the default text editor for text files (`text/plain`) that is used by `xdg-open` with the following command:

```bash
xdg-mime default code.desktop text/plain
```

### Debian alternatives system

Debian-based distributions allow setting a default *editor* using the [alternatives system](https://wiki.debian.org/DebianAlternatives), without concern for the mime type. You can set this by running the following and selecting code.

```bash
sudo update-alternatives --set editor /usr/bin/code
```

## Next Steps

Once you have installed VS Code, these topics will help you learn more about VS Code:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.

## Common Questions

### Azure VM Issues

I'm getting a "Running without the SUID sandbox" error?

You can safely ignore this error.

### Debian and Moving Files to Trash

If you see an error when deleting files from the VS Code Explorer on the Debian operating system, it might be because the trash implementation that VS Code is using is not there.

Run these commands to solve this issue:

```bash
sudo apt-get install gvfs-bin
```

### error ENOSPC

When you see this error, it indicates that the VS Code file watcher is running out of handles. The current limit can be viewed by running:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

The limit can be increased to its maximum by editing `/etc/sysctl.conf` and adding this line to the end of the file:

```bash
fs.inotify.max_user_watches=524288
```

The new value can then be loaded in by running `sudo sysctl -p`. Note that [Arch Linux](https://www.archlinux.org/) works a little differently, [view this page for advice](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers).

While 524288 is the maximum number of files that can be watched, if you're in an environment that is particularly memory constrained, you may wish to lower the number. Each file watch [takes up 540 bytes (32-bit) or ~1kB (64-bit)](https://stackoverflow.com/a/7091897/1156119), so assuming that all 524288 watches are consumed that results in an upper bound of around 256MB (32-bit) or 512MB (64-bit).

### I can't see Chinese characters in Ubuntu

We're working on a fix. In the meantime, open the application menu, then choose **File** > **Preferences** > **Settings**. Then set `editor.fontFamily` as shown:

```json
    "editor.fontFamily": "Droid Sans Mono, Droid Sans Fallback"
```

### Package git is not installed

This error can appear during installation and is typically caused by the package manager's being out of date. Try updating it and installing again:

```bash
# For .deb
sudo apt-get update

# For .rpm (Fedora 21 and below)
sudo yum update

# For .rpm (Fedora 22 and above)
sudo dnf update
```

### The code bin command does not bring the window to the foreground on Ubuntu

Running 'code .' on Ubuntu when VS Code is already open in the current directory will not bring VS Code into the foreground. This is a feature of the OS which can be disabled using `ccsm`.

```bash
# Install
sudo apt-get update
sudo apt-get install compizconfig-settings-manager

# Run
ccsm
```

Under **General** > **General Options** > **Focus & Raise Behaviour**, set "Focus Prevention Level" to "Off". Remember this is an OS-level setting that will apply to all applications, not just VS Code.
