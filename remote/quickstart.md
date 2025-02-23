
# Connecting VS Code to Your VirtualBox VM

Want to use VS Code directly with your VirtualBox VM? This guide will help you set up remote development using the Remote - SSH extension.

## Before You Start

You'll need:
- A VirtualBox VM running Linux
- SSH server on your VM (Install it by running):
```bash
sudo apt-get install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
```
- VS Code with the Remote - SSH extension installed
- SSH client on your computer

## Setting Up Your VM's Network

You have two ways to connect to your VM:

### Using Bridged Networking

Set your VM's network adapter to "Bridged Adapter" in VirtualBox settings. Find your VM's IP address:

```bash
ip addr show
```

Add to your SSH config file (`~/.ssh/config`):
```
Host vbox-vm
    HostName 192.168.1.100   # Replace with your VM's IP
    User your_username       # Replace with your username
```

### Using Port Forwarding

If bridged networking isn't working:

1. Open your VM's settings in VirtualBox
2. Go to Network -> Advanced -> Port Forwarding
3. Forward host port 2222 to guest port 22

Then add to your SSH config:
```
Host vbox-vm
    HostName localhost
    Port 2222
    User your_username
```

## Connecting from VS Code

1. Open VS Code
2. Press `F1` and type "Remote-SSH: Connect to Host"
3. Select `vbox-vm`
4. Wait for the new VS Code window to connect

## Troubleshooting

If you can't connect, check:
- Is the SSH service running on your VM?
- Are firewalls blocking SSH?
- Are your port forwarding settings correct?
- Try setting up SSH keys to avoid password prompts
