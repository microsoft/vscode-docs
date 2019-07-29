---
Order: 4
Area: ssh
TOCTitle: Add SSH key
PageTitle: Add SSH key to your virtual machine
MetaDescription: Add SSH key to your virtual machine
DateApproved: 7/26/2019
---
## Add SSH keys to your VM

In the previous step, we generated an SSH key pair. We'll take the public key and paste it into our VM setup, by copying the contents of the `id_rsa.pub`. You also want to allow your VM to accept inbound SSH traffic.

![Add SSH public key to VM](images/ssh/add-ssh-public-key.png)

A cool feature of using Azure VMs is the ability to enable auto-shutdown (because let's face it, we all forget to turn off our VMs…). If you go to the **Management** tab, you can set the time you want to shut down the VM daily.

![Virtual machine auto-shutdown](images/ssh/vm-auto-shutdown.png)

Select **Review and Create** and Azure will deploy your VM for you!

Next, connect to your virtual machine through SSH.

----

<a class="tutorial-next-btn" href="/remote-tutorials/ssh/connect-to-vm">I've added my SSH key</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'add-ssh-key')" href="javascript:void(0)">I ran into an issue</a>
