---
Order: 4
Area: editor
TOCTitle: Extension Runtime Security
ContentId: b921a11a-ed69-4716-bc93-589ba8e01e22
PageTitle: Visual Studio Code Extension Runtime Security
DateApproved: 12/11/2024
MetaDescription: Learn about the security measures in place for Visual Studio Code extensions, including permissions, user reliability checks, and Marketplace protections.
---

# Extension runtime security

[Extensions](/docs/editor/extension-marketplace.md) greatly enhance the functionality of Visual Studio Code. They can also introduce risks, such as malicious code execution and data privacy concerns. The [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) has many ways to protect you from bad extensions. You can check if an extension is safe before you install it.

This document outlines the runtime permissions of extensions in VS Code and the measures in place to protect you from malicious extensions. You'll learn how to make an informed decision about the reliability of an extension before installing it.

## About extension runtime permissions

The [extension host](/api/advanced-topics/extension-host.md) is responsible for running extensions in VS Code. The extension host has the same permissions as VS Code itself. This means that any action that VS Code can perform, an extension can also perform through the extension host.

For example, an extension can read and write files on your machine, make network requests, run external processes, and modify workspace settings.

## Determine extension reliability

Before you install an extension, you can take various steps to determine if it's reliable. The Visual Studio Marketplace provides you with information about the extension to help you make an informed decision:

* **Ratings & Reviews**: Read what others think about the extension.

* **Q & A**: Review existing questions and the level of the publisher's responsiveness. You can also engage with the extension's publisher if you have concerns.

* **Issues, Repository, and License**: Check if the publisher provided these and if they have the support you expect.

* **Verified Publisher**: Use the blue check mark next to the publisher's name and domain name as an extra signal of trust. The check mark indicates that the publisher has proven domain-name ownership to the Marketplace. It also shows that the Marketplace has verified both the existence of the domain name and the good standing of the publisher on the Marketplace for at least six months.

    ![Verified publisher](images/extension-marketplace/bluecheck.png)

## Marketplace protections

The Visual Studio Code Marketplace employs several mechanisms to protect you from malicious extensions:

* **Malware scanning**: The Marketplace runs a malware scan on each extension package that's published to ensure its safety. The scan, which uses several antivirus engines, is run for each new extension and for each extension update. Until the scan is all clear, the extension won't be published in the Marketplace for public usage.

* **Verified publishers**: Publishers can verify (blue check mark) their identity by proving domain ownership. It shows that the publisher has proven domain-name ownership to the Marketplace. It also shows that the Marketplace has verified both the existence of the domain and the good standing of the publisher on the Marketplace for at least six months.

* **Name squatting**: The Marketplace stops extension authors from stealing the names of official publishers, such as Microsoft or RedHat, and popular extensions, like GitHub Copilot.

* **Kill List**: If a malicious extension is reported and verified, or a vulnerability is found in an extension dependency, the extension is removed from the Marketplace and added to a *kill list*. If the extension has been installed, it's automatically uninstalled by VS Code.

* **Extension Signature Verification**: The Visual Studio Marketplace signs all extensions when they're published. VS Code checks this signature when you install an extension to verify the integrity and the source of the extension package.

## Report suspicious extensions

If you do see an extension that looks suspicious, report the extension to the Marketplace team:

1. Open the extension's page in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode).

1. Select the **Report a concern** link at the bottom of the extension **More Info** section.

## Related resources

* Learn how to install and manage extensions in [Visual Studio Code](/docs/editor/extension-marketplace.md).

* Use [Workspace Trust](/docs/editor/workspace-trust.md) to decide whether code in a project folder can be executed by VS Code and extensions without explicit approval. This adds an extra layer of security when working with unfamiliar code.
