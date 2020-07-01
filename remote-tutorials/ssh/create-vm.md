---
Order: 2
Area: ssh
TOCTitle: Create a VM
PageTitle: Create a virtual machine on Azure
MetaDescription: Create a virtual machine on Azure
DateApproved: 6/10/2020
---
# Create a virtual machine

If you don't have an existing Linux virtual machine, you can create a new VM through the [Azure portal](https://portal.azure.com). In the Azure portal, search for "Virtual Machines", and choose **Add**. From there, you can select your Azure subscription and create a new resource group, if you don't already have one.

![Create a virtual machine](images/ssh/create-vm.png)

Now you can specify details of your VM, such as the name, the size of, and the base image. Choose Ubuntu Server 18.04 LTS for this example, but you can choose recent versions of other Linux distros and look at VS Code's [supported SSH servers](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server).

![Virtual machine instance details](images/ssh/vm-instance-details.png)

Next, you'll set up an SSH host by creating and adding an SSH public key.

----

<a class="tutorial-next-btn" href="/remote-tutorials/ssh/create-ssh-key">I've configured a virtual machine</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'create-vm')" href="javascript:void(0)">I ran into an issue</a>
