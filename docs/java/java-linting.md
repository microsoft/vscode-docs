---
Order: 4
Area: java
TOCTitle: Formatting and Linting
ContentId: dd4fa82e-0021-404c-87e4-3b69f1e12463
PageTitle: Formatting, linting, and code analysis for Java in Visual Studio Code
DateApproved: 2/26/2021
MetaDescription: Formatting, linting, and code analysis for Java in Visual Studio Code
---
# Java formatting and linting

[Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) also provides [formatting settings](https://github.com/redhat-developer/vscode-java/wiki/Formatter-settings). You can export an Eclipse formatter file and then use it for your project in VS Code.

In addition, there are also the [Checkstyle for Java](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle) and [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) extensions, which provide features for live linting and code analysis.

## Checkstyle

With the [Checkstyle for Java](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle) extension, you can use either existing `checkstyle` configurations (Google's or Sun's Check) or your own customized files for your project. When editing a Java file, the extension will check the file format and provide Quick Fixes if possible on the fly.

Set Checkstyle configuration file.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-linting/checkstyle.mp4" type="video/mp4">
</video>

The [Checkstyle for Java](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle) extension supports live linting.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-linting/checkstyle-live-linting.mp4" type="video/mp4">
</video>

And batch check.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-linting/checkstyle-batch.mp4" type="video/mp4">
</video>

The Problems panel will open when you click the Checkstyle status icon in the Status bar.

**Set Checkstyle configuration file**

![Set Checkstyle configuration file](images/java-linting/set_config.png)

* To set the configuration file, right-click the `.xml` file and select **Set the Checkstyle Configuration File**.
* You can also trigger the command **Checkstyle: Set Checkstyle Configuration File** to choose the configuration file in the File Explorer. The extension looks for a `checkstyle.xml` file in your workspace to make Checkstyle configuration easier. You will also see the two built-in configurations:

  * **Google's Check**
  * **Sun's Check**

* Command **Checkstyle: Set the Checkstyle Configuration** detects potential **Checkstyle** configuration files and lists them. You can also provide a configuration file by directly writing a URL in the input box.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-linting/checkstyle-configuration.mp4" type="video/mp4">
</video>

You can also set the Checkstyle version by using the command **Checkstyle: Set the Checkstyle Version**.

The command will:

* List the latest Checkstyle version from the main repo.
* List all the downloaded versions.
* List all the supported versions.
* Mark the currently used version with a check symbol.

In addition, you can also bring any 3rd-party modules for Checkstyle by configuring its path. For example, after using the configuration below, you can add `<module name="SingleBreakOrContinueCheck"/>` or `<module name="com.github.sevntu.checkstyle.checks.naming.SingleBreakOrContinueCheck"/>` to `checkstyle.xml` to leverage those checks.

```json
"java.checkstyle.modules": [ "${workspaceFolder}/src/main/resources/sevntu-checks-1.35.0.jar" ]
```

**Check the style and fix the violations**

![Fix style violation](images/java-linting/quick_fix.png)

* When editing a Java file, the extension will check the file format and provide Quick Fixes if possible. You can click the lightbulb button in the editor to show the available Quick Fixes.

For more details about [Checkstyle for Java](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle), visit its [GitHub Repository](https://github.com/jdneo/vscode-checkstyle).

## SonarLint

The [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) extension lets you detect bugs and vulnerabilities as you write code in VS Code. Java is one of the languages supported, and the extension will run in the background and highlight source code that poses a quality or security concern.

**Code Analysis on the fly**

Issues are highlighted directly in the editor with hovers to provide detailed explanations.

![SonarLint Bug](images/java-linting/SonarLint.Bug.gif)

Issues found in the opened file can also be reviewed through the Problems panel of VS Code. When applicable, secondary code locations are mentioned so you can understand where the issue originates from (for example, the code path that led to a bug).

**Rule documentation and remediation guidance**

For any issue detected, SonarLint provides full documentation about the rule that was violated, and the coding best practice it relates to. This lets you understand why an issue is raised, and most importantly how to best fix it.

![SonarLint Rules](images/java-linting/SonarLint.Rule.Description.gif)

**Enabling more quality and security rules**

By default, SonarLint provides a wide array of rules to detect bugs and vulnerabilities. More checks can be enabled through the SonarLint Rules view.

![SonarLint Activate-Deactivate Rules](images/java-linting/SonarLint.Activate-Deactivate.Rules.gif)

For more details about the [SonarLint for VS Code extension](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode), visit the [SonarLint website](https://www.sonarlint.org/vscode/).

## Formatter

Currently, you need an Eclipse formatter file like [Google Style](https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml).

Set the following property:

```json
"java.format.settings.url": "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml",
```

The property can point to a URL or a local file path.

If the formatter XML file contains more than one profile, you can set the profile name:

```json
"java.format.settings.profile": "GoogleStyle",
```

You can also define the formatting preferences in your project's [.settings/org.eclipse.jdt.core.prefs](https://gist.github.com/fbricon/30c5971f7e492c8a74ca2b2d7a7bb966). It will override the global formatting settings.

We are working on a solution to allow editing your formatting preferences from within VS Code. For now, the best way to edit them is to use Eclipse. See [Formatter Settings](https://github.com/redhat-developer/vscode-java/wiki/Formatter-settings) for details.
