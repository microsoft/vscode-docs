---
Order: 2
Area: wsl
TOCTitle: Enable WSL
PageTitle: Enable WSL
MetaDescription: TBD
DateApproved: 7/25/2019
---
# Enable WSL

Windows Subsystem for Linux (WSL) is an optional feature on Windows 10. You can enabled it through the Windows Features dialog or PowerShell.

## Turn Windows features on or off

In the Windows search bar, type "features" to bring up the **Windows Features** dialog. Scroll down and check **Windows Subsystem for Linux**.

![Turn Windows features on and off dialog](https://link)

Select **OK** and you will be prompted to restart Windows.

## PowerShell

If you prefer you can open PowerShell as an Administrator and type:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

After the command runs, you will be prompted to restart Windows.

![PowerShell prompt to restart](images/wsl/powershell-output.png)

## Check

After restarting Windows, you can check that you have WSL enabled by opening a Command Prompt and typing 'wsl'.

![wsl-check](images/wsl/wsl-check.png)

WSL is enabled but you haven't installed a Linux distribution yet. Next we will install Linux via the Microsoft Store.

----

<a class="tutorial-next-btn" href="/remote-tutorials/wsl/install-linux">I've enabled Windows Subsystem for Linux</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-wsl', 'enable-wsl')" href="javascript:void(0)">I ran into an issue</a>
