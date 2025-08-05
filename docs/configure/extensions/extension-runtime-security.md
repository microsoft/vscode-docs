---
ContentId: b921a11a-ed69-4716-bc93-589ba8e01e22
DateApproved: 07/09/2025
MetaDescription: Learn about the security measures in place for Visual Studio Code extensions, including permissions, user reliability checks, and Marketplace protections.
---
# Extension runtime security

[Extensions](/docs/configure/extensions/extension-marketplace.md) greatly enhance the functionality of Visual Studio Code. They can also introduce risks, such as malicious code execution and data privacy concerns. The [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) has many ways to protect you from bad extensions. In addition, VS Code gives you several indicators of an extension's reliability.

This document outlines the runtime permissions of extensions in VS Code and the measures in place to protect you from malicious extensions. You'll learn how to make an informed decision about the reliability of an extension before installing it.

## About extension runtime permissions

The [extension host](/api/advanced-topics/extension-host.md) is responsible for running extensions in VS Code. The extension host has the same permissions as VS Code itself. This means that any action that VS Code can perform, an extension can also perform through the extension host.

For example, an extension can read and write files on your machine, make network requests, run external processes, and modify workspace settings.

## Extension publisher trust

As of VS Code release 1.97, when you first install an extension from a third-party publisher, VS Code shows a dialog prompting you to confirm that you trust the publisher of that extension.

When you trust the publisher of an extension pack or an extension with dependencies on other extensions, you are also trusting the publishers of the dependent extensions.

Publishers for extensions that you installed previously are considered trusted and are automatically added to the list of trusted publishers.

You can manage the list of trusted extensions by using the **Extensions: Manage Trusted Extensions Publishers** command.

> [!IMPORTANT]
> When you install extensions by using the [VS Code command line](/docs/configure/command-line.md#working-with-extensions), the extension's publisher is not automatically trusted.

## Determine extension reliability

Before you install an extension, you can take various steps to determine if it's reliable. The Visual Studio Marketplace provides you with information about the extension to help you make an informed decision:

* **Ratings & Reviews**: Read what others think about the extension.

* **Q & A**: Review existing questions and the level of the publisher's responsiveness. You can also engage with the extension's publisher if you have concerns.

* **Issues, Repository, and License**: Check if the publisher provided these and if they have the support you expect.

* **Verified Publisher**: Use the blue check mark next to the publisher's name and domain name as an extra signal of trust. The check mark indicates that the publisher has proven domain-name ownership to the Marketplace. It also shows that the Marketplace has verified both the existence of the domain name and the good standing of the publisher on the Marketplace for at least six months.

    ![Verified publisher](images/extension-marketplace/bluecheck.png)

> [!TIP]
> If you want to enforce which extensions are allowed to be used in your organization, check out how to [configure allowed extensions in VS Code](/docs/setup/enterprise.md#configure-allowed-extensions).

## Marketplace protections

The Visual Studio Marketplace employs several mechanisms to protect you from malicious extensions:

* **Malware scanning**: The Marketplace runs a malware scan on each extension package that's published to ensure its safety. The scan, which uses several antivirus engines, is run for each new extension and for each extension update. Until the scan is all clear, the extension won't be published in the Marketplace for public usage.

* **Dynamic detection**: The Marketplace does dynamic detection by verifying the extension's runtime behavior by running it in a sandboxed environment (_clean room VM_).

* **Verified publishers**: Publishers can verify (blue check mark) their identity by proving domain ownership. It shows that the publisher has proven domain-name ownership to the Marketplace. It also shows that the Marketplace has verified both the existence of the domain and the good standing of the publisher on the Marketplace for at least six months.

* **Unusual usage monitoring**: The Marketplace monitors the downloads and usage patterns of extensions to detect unusual behavior.

* **Name squatting**: The Marketplace stops extension authors from stealing the names of official publishers, such as Microsoft or RedHat, and popular extensions, like GitHub Copilot.

* **Block List**: If a malicious extension is reported and verified, or a vulnerability is found in an extension dependency, the extension is removed from the Marketplace and added to a *block list*. If the extension has been installed, it's automatically uninstalled by VS Code.

* **Extension Signature Verification**: The Visual Studio Marketplace signs all extensions when they're published. VS Code checks this signature when you install an extension to verify the integrity and the source of the extension package.

Learn about these measures in the [Security and Trust in Visual Studio Marketplace blog post](https://devblogs.microsoft.com/blog/security-and-trust-in-visual-studio-marketplace).

## Report suspicious extensions

If you do see an extension that looks suspicious, report the extension to the Marketplace team. The Marketplace team provides an initial response within one business day.

To report an extension:

1. Open the extension's page in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode).

1. Select the **Report a concern** link at the bottom of the extension **More Info** section.

## Related resources

* Learn how to install and manage extensions in [Visual Studio Code](/docs/configure/extensions/extension-marketplace.md).

* Use [Workspace Trust](/docs/editing/workspaces/workspace-trust.md) to decide whether code in a project folder can be executed by VS Code and extensions without explicit approval. This adds an extra layer of security when working with unfamiliar code.

* Configure [allowed extensions in VS Code](/docs/setup/enterprise.md#configure-allowed-extensions) to enforce which extensions are allowed to be used in your organization.
