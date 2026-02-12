---
ContentId: f8e2a7c1-9d3b-4e5f-a6c8-1b2d3e4f5a6b
DateApproved: 02/04/2026
MetaDescription: Use the integrated browser in VS Code to preview web apps, navigate to URLs, and select elements to add as context to AI chat.
MetaSocialImage: images/debugging/debugging-social.png
---
# Integrated browser

The integrated browser enables you to open and interact with web pages directly inside VS Code. Use it to preview web applications, test authentication flows, and select page elements to add as context to your AI chat prompts.

![Screenshot of the integrated browser in VS Code displaying a web page.](images/integrated-browser/integrated-browser.png)

>[!NOTE]
> The integrated browser is currently an experimental feature and may change in future releases.

## Open the browser

Run the **Browser: Open Integrated Browser** command from the Command Palette (`kb(workbench.action.showCommands)`).

You can open multiple browser instances simultaneously, each in its own editor tab.

Enable the `setting(workbench.browser.openLocalhostLinks)` setting to automatically open `localhost` URLs in the integrated browser instead of your default system browser.

## Navigation

The browser supports `http://`, `https://`, and `file://` URLs. Use the address bar to navigate to any URL, or use in-page links to navigate within a site.

* Normal navigation and anchor links work as expected
* `kbstyle(Ctrl+click)` (`kbstyle(Cmd+click)` on macOS) opens links in a new browser tab
* Popups are blocked, but new tabs are allowed

## Developer Tools

Toggle the browser's Developer Tools from the browser toolbar to inspect elements, view console output, and debug page issues.

## Standalone window

Move the browser to its own floating window by right-clicking the editor tab and selecting **Move into New Window**. Use **Set Always on Top** from the floating window's title bar to keep it visible.

## Add elements to AI chat

Select elements from a web page to add them as context to your chat prompt. This is useful for getting help with specific HTML elements, CSS styles, or debugging UI issues.

1. Open the integrated browser and navigate to your web app.
1. Select the **Add Element to Chat** button in the browser toolbar to enter selection mode.
1. Hover over elements and select to add them to your chat prompt.

Configure what information is included:

| Setting                                          | Description                               |
|--------------------------------------------------|-------------------------------------------|
| `setting(chat.sendElementsToChat.attachCSS)`     | Include CSS styles for selected elements  |
| `setting(chat.sendElementsToChat.attachImages)`  | Include screenshots of selected elements  |

Learn more about [adding context to chat](/docs/copilot/chat/copilot-chat-context.md).

## Permissions

The browser automatically denies most permission requests (camera, microphone, geolocation) for security. Notifications, clipboard access, and file selection are allowed.

## Session storage

Control how the integrated browser stores session data such as cookies, logins, localStorage, and cache with the `setting(workbench.browser.dataStorage)` setting.

| Mode | Description |
|------|-------------|
| `global` | Data persists and is shared across all browser tabs and workspaces. |
| `workspace` | Data persists within a workspace but is isolated between workspaces. |
| `ephemeral` | Data is not shared between tabs or persisted. Similar to incognito mode. |

To clear stored data, select the menu in the browser toolbar and choose **Clear Storage (Global)** or **Clear Storage (Workspace)** depending on your current storage mode. Reload the browser tab after clearing storage to apply the changes.

> [!NOTE]
> In untrusted workspaces, the browser always uses ephemeral mode regardless of the setting, to protect your data.

## Use as a default browser

VS Code also has a built-in Simple Browser to preview web pages that has limited functionality compared to the integrated browser. If you want to use the integrated browser instead of the Simple Browser, enable the `setting(simpleBrowser.useIntegratedBrowser)` setting.

The Live Preview extension can use the integrated browser for previewing web pages. Enable the `setting(livePreview.useIntegratedBrowser)` setting to use it as the default preview browser.

## Related

* [Add context to AI chat](/docs/copilot/chat/copilot-chat-context.md)
* [Port forwarding](/docs/debugtest/port-forwarding.md)
