---
Order: 3
Area: developcloud
TOCTitle: Working over SSH
ContentId: 4e2fe911-7bbc-4f3c-abc1-fb174217ef30
PageTitle: Working over SSH with Visual Studio Code
DateApproved: 10/22/2020
MetaDescription: Learn to use SSH connections to lab machines with Visual Studio Code
---
# VS Code Remote SSH

## What is SSH?

SSH, or the secure shell protocol, lets you access a remote computer or virtual machine securely over a network connection.

You can connect over SSH into another machine from Visual Studio Code and interact with files and folders anywhere on that remote filesystem. If you have an app located on a different computer, you could use SSH to connect to it and access your app, view its files, and even modify, run, and debug it.

You can also take advantage of any tools or dependencies installed on that remote machine. You could connect to remote machines very different than your local machine. For instance, they could have a different operating system, different tools installed, or much stronger computing power.

In the classroom, you might SSH into lab machines to access computers with certain dependencies required for an assignment (like a specific version of Python or a C++ compiler), a different operating system than your own, or source code or automatic tests pre-loaded from your professor.

## Get started with SSH in VS Code

To get started with using SSH in VS Code, you'll need to download the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) from the Extension Marketplace.

![Remote SSH extension](images/ssh-lab-machines/remote-ssh.png)

Check out the following video to see an example of using Remote - SSH in action:

<iframe src="https://youtube.com/embed/rh1Ag41J6IA?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="Visual Studio Code Remote - SSH"></iframe>

As demonstrated above, we can SSH into a more powerful virtual machine to greatly speed up the execution time of our programs.

## Next steps

We also highly recommend checking out the step-by-step [SSH tutorial](/docs/remote/ssh-tutorial.md).