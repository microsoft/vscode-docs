---
ContentId: 8a7c3f4e-5b2d-4c9a-8e1f-6d3a2b1c0e9f
MetaDescription: Diagnose Git issues using output logs, trace logging, and diagnostic tools in Visual Studio Code
DateApproved: 12/2/2025
Keywords:
- source control
- git
- troubleshooting
- debugging
- logs
---
# Troubleshooting source control

This article helps you diagnose and resolve Git issues in Visual Studio Code using output logs and trace logging. Use these diagnostic tools when Git operations fail or behave unexpectedly.

## Git Output window

VS Code uses your machine's Git installation to perform source control operations. The Git Output window provides detailed logs of Git commands executed by VS Code. This information is useful for understanding what Git operations are being performed and for diagnosing issues.

To open the Git Output window:

* In the Source Control view, select the **...** menu and select **Show Git Output**

* Run the **Git: Show Git Output** command from the Command Palette (`kb(workbench.action.showCommands)`)

* Open the **Output** panel (`kb(workbench.action.output.toggleOutput)`) and select **Git** from the dropdown menu

![Screenshot of the Output panel showing the Git output channel.](images/troubleshooting/git-output.png)

The Git Output window displays:

* Current log level of the Git extension
* Location of the Git executable being used
* Git commands executed by VS Code
* Command error messages
* Timestamps and duration of each command

Review this output when Git operations fail or behave unexpectedly. The information helps identify issues with Git configuration, authentication, or repository state.

> [!TIP]
> By default, the Git Output window doesn't show stdout from Git commands unless an error occurs. With the `setting(git.commandsToLog)` setting, you can specify which Git commands should always log their stdout output for more detailed diagnostics.

## Filter and search Git logs

The Git Output window can generate a large amount of information. To find relevant entries efficiently, you can use the following techniques:

* Filter the output by log level or log category using the dropdown menu in the Output panel

    ![Screenshot of the Output panel filter dropdown.](images/troubleshooting/git-output-filters.png)

    The log levels include: `trace`, `debug`, `info`, `warning`, `error`. By default, the Git Output window shows `info` level and above.

    The log categories change based on the content being logged, such as `git` or `repository`. To view the Git commands being run, select the `git` category.

* Search for specific terms using the search box in the Output panel (`kb(actions.find)`)

    The Git Output window highlights the search terms and allows you to navigate between matches. The search box supports regular expressions for advanced searching.

    ![Screenshot of the Output panel search box.](images/troubleshooting/git-output-search.png)

## Enable trace logging for the Git extension

For more detailed diagnostic information, you can enable trace logging for the Git extension. Trace logging provides verbose information about the extension's operation, including internal state and detailed command execution.

To enable trace logging:

1. Open the Git Output window

1. Select the gear icon in the Output panel header and select a log level, such as `trace`

    ![Screenshot of the Output panel log level selection.](images/troubleshooting/git-output-log-level.png)

    When you choose a log level, VS Code logs messages at that level and above. For example, selecting `trace` logs all messages, while selecting `error` only logs error messages.

## Next steps

* [Source Control FAQ](/docs/sourcecontrol/faq.md) - Answers to frequently asked questions about Git and source control
* [Source Control Overview](/docs/sourcecontrol/overview.md) - Learn about VS Code's source control features
* [Git Documentation](https://git-scm.com/doc) - Official Git documentation and resources
