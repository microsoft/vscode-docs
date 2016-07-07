---
Order: 3
Area: setup
TOCTitle: Linux
ContentId: 7FDF94DB-3527-4296-BE1C-493495B89408
PageTitle: Running Visual Studio Code on Linux
DateApproved: 7/7/2016
MetaDescription: Get Visual Studio Code up and running on Linux.
---

# Running VS Code on Linux

## Installation

1. Download Visual Studio Code for your distribution, [.deb](http://go.microsoft.com/fwlink/?LinkID=760868) for Debian-based distributions such as Ubuntu or [.rpm](http://go.microsoft.com/fwlink/?LinkID=760867) for Red Hat-based distributions such as Fedora or CentOS. Note that 32-bit binaries are also available on the [download page](/Download).
2. Install the package through a GUI package manager by double clicking on the package file, or through the command line:

 ```bash
 # For .deb
 sudo dpkg -i <file>.deb

 # For .rpm (Fedora 21 and below)
 sudo yum install <file>.rpm
 
 # For .rpm (Fedora 22 and above)
 sudo dnf install <file>.rpm
 ```

3. VS Code should now be available to run through the launcher or the command line by running `code`.

>**Tip:** Run `code .` in any folder to start editing files in that folder.

## Updates

VS Code ships monthly and you can see when a new release is available by checking [Updates](/updates).  Unfortunately, VS Code does not yet support auto-update on Linux, so you will need to manually install each new release.

## Node.js

Node.js is a popular platform and runtime for easily building and running JavaScript applications. It also includes [NPM](https://www.npmjs.com/), a Package Manager for Node.js modules. You'll see Node.js and NPM mentioned frequently in our documentation and some optional VS Code tooling requires Node.js (ex. the VS Code [extension generator](/docs/tools/yocode.md)).

If you'd like to install Node.js on Linux, see [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager) to find the Node.js package and installation instructions tailored to your Linux distribution.

To learn more about JavaScript and Node.js, see our [Node.js walkthrough](/docs/runtimes/nodejs.md) where you'll learn about running and debugging Node.js applications with VS Code.

## Next Steps

Once you have installed VS Code, these topics will help you learn more about VS Code:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [The Basics](/docs/editor/codebasics.md) - A quick orientation around VS Code.
* [User/Workspace Settings](/docs/customization/userandworkspace.md) - Learn how to configure VS Code to your preferences through settings.

## Common Questions

### Azure VM Issues

I'm getting a "Running without the SUID sandbox" error?

Unfortunately, this is a known issue that we're still investigating.

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

```
fs.inotify.max_user_watches=524288
```

The new value can then be loaded in by running `sudo sysctl -p`. Note that [Arch Linux](https://www.archlinux.org/) works a little differently, [view this page for advice](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers).

While 524288 is the maximum number of files that can be watched, if you're in an environment that is particularly memory constrained, you may wish to lower the number. Each file watch [takes up 540 bytes (32-bit) or ~1kB (64-bit)](http://stackoverflow.com/a/7091897/1156119), so assuming that all 524288 watches are consumed that results in an upper bound of around 256MB (32-bit) or 512MB (64-bit).

### I can't see Chinese characters in Ubuntu

We're working on a fix. In the meantime, open the application menu, then choose **File** > **Preferences** > **User Settings**. Then set `editor.fontFamily` as shown:

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

```
# Install
sudo apt-get update
sudo apt-get install compizconfig-settings-manager

# Run
ccsm
```

Under **General** > **General Options** > **Focus & Raise Behaviour**, set "Focus Prevention Level" to "Off". Remember this is an OS-level setting that will apply to all applications, not just VS Code.
