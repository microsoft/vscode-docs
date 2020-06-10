---
Order: 3
Area: ssh
TOCTitle: Set up SSH
PageTitle: Set up SSH
MetaDescription: Set up an SSH key to use with Visual Studio Code
DateApproved: 6/10/2020
---
# Set up SSH

There are several authentication methods into a VM, including an SSH public/private key pair or a username and password. We strongly recommend using key-based authentication (if you use a username/password, you'll be prompted to enter your credentials more than once by the extension). If you're on Windows and have already created keys using PuttyGen, you can [reuse them](/docs/remote/troubleshooting.md#reusing-a-key-generated-in-puttygen).

## Create an SSH key

If you don't have an SSH key pair, open a bash shell or the command line and type in:

```bash
ssh-keygen -t rsa -b 2048
```

This will generate the SSH key. Press `kbstyle(Enter)` at the following prompt to save the key in the default location (under your user directory as a folder named `.ssh`).

![ssh-keygen output](images/ssh/ssh-keygen.png)

You will then be prompted to enter a secure passphrase but you can leave that blank. You should now have a `id_rsa.pub` file which containers your new public SSH key.

Next, you'll add the SSH key to your virtual machine SSH host.

---

<a class="tutorial-next-btn" href="/remote-tutorials/ssh/add-ssh-key">I have an SSH key</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'create-ssh-key')" href="javascript:void(0)">I ran into an issue</a>
