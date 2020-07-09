---
Order: 4
Area: ssh
TOCTitle: Add SSH key
PageTitle: Add SSH key to your virtual machine
MetaDescription: Add SSH key to your virtual machine
DateApproved: 7/9/2020
---
# Add SSH key to your VM

In the previous step, you generated an SSH key pair. Take the public key and paste it into your VM setup, by copying the entire contents of the `id_rsa.pub`. You also want to allow your VM to accept inbound SSH traffic by selecting **Allow selected ports** and choosing **SSH** from the **Select inbound ports** dropdown list.

![Add SSH public key to VM](images/ssh/add-ssh-public-key.png)

## Auto-shutdown

A cool feature of using Azure VMs is the ability to enable auto-shutdown (because let's face it, we all forget to turn off our VMs…). If you go to the **Management** tab, you can set the time you want to shut down the VM daily.

![Virtual machine auto-shutdown](images/ssh/vm-auto-shutdown.png)

Select **Review and Create**, then **Create**, and Azure will deploy your VM for you!

Once the deployment is finished (it may take several minutes), go to the new resource view for your virtual machine.

Next, you'll connect to your virtual machine through SSH with Visual Studio Code.

----

<a class="tutorial-next-btn" href="/remote-tutorials/ssh/connect-to-vm">I've added my SSH key and created the VM</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'add-ssh-key')" href="javascript:void(0)">I ran into an issue</a>
