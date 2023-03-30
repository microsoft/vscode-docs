---
# DO NOT TOUCH — Managed by doc writer
ContentId: 92904eb4-6ef0-4801-80d2-6c2c3326ad82
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for notifications in a Visual Studio Code extension.
---

# Notifications

[Notifications](/api/extension-capabilities/common-capabilities#display-notifications) display brief information that is surfaced from the bottom right of VS Code.

![Example of a notification](images/examples/notification.png)

You can send three types of notifications:

* [Information](/api/references/vscode-api#window.showInformationMessage)
* [Warning](/api/references/vscode-api#window.showWarningMessage)
* [Error](/api/references/vscode-api#window.showErrorMessage)

It's important to limit the number of notifications sent in order to respect the user's attention. To help guide your decision on whether or not you should show a notification, please follow our notification decision tree:

[![Show a multi-step quick pick if multi step user input is immediately needed. If user input is immediately needed but it is not multi-step show a modal dialog. If you need to show progress that is low priority show the progress in the status bar. If the interaction is triggered by the user find the right moment to show the notification and only then show it. If you need to show multiple notifications try to combine them into one. If the user does not really need to be notified consider to not show anything and relax.](images/examples/notification-decision-tree.png)](/assets/api/ux-guidelines/examples/notification-decision-tree.png)

## Notification examples

![Information notification](images/examples/notification-info.png)

*This notification appears after the user runs an **Update version** command. Notice that there are no additional actions and is purely informational.*

![Warning notification](images/examples/notification-warning.png)

*This example highlights an issue with a feature that requires user input and shows actions to resolve the issue.*

![Error notification](images/examples/notification-error.png)

*This example shows a failure notification with an action to resolve the issue.*

**✔️ Do**

* Respect the user's attention by only sending notifications when absolutely necessary
* Add a **Do not show again** option for every notification
* Show one notification at a time

**❌ Don't**

* Send repeated notifications
* Use for promotion
* Ask for feedback on the first install
* Show actions if there aren't any

## Progress notification

When needing to display progress for an indeterminate timeframe (for example, setting up an environment), you can use the progress notification. This type of global progress notification should be used as a last resort as progress is best kept within context (within a view or editor).

**✔️ Do**

* Show a link to see more details (like logs)
* Show information as setup progresses (initializing, building, etc.)
* Provide an action to cancel the operation (if applicable)
* Add timers for timed out scenarios

**❌ Don't**

* Leave a notification running in progress

![Progress notification](images/examples/notification-progress.png)

*This example uses the progress notification to show the setup involved for a remote connection, while also providing a link to the output logs (**details**).*

## Links

* [Hello World extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-sample)
* [Notifications extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/notifications-sample)
