---
Order: 5
Area: remote
TOCTitle: GitHub Codespaces
PageTitle: Developing with GitHub Codespaces
ContentId: 8d30ed21-208f-4b4e-8510-5a4a33c42618
MetaDescription: Using GitHub Codespaces
DateApproved: 3/4/2021
---
# GitHub Codespaces
[GitHub Codespaces](https://github.com/features/codespaces) provides cloud-powered development environments for any activity - whether it's a long-term project, or a short-term task like reviewing a pull request. You can work with these environments from Visual Studio Code or in a browser-based editor.


![GitHub Codespaces extension](images/codespaces/github-codespaces-extension.png)

## Environments

An environment is the "backend" half of GitHub Codespaces. It's where all of the compute associated with software development happens: compiling, debugging, restoring, etc. When you need to work on a new project, pick up a new task, or review a PR, you can simply spin up a Cloud-hosted environment, and GitHub Codespaces takes care of configuring it correctly. It automatically configures everything you need to work on your project: the source code, runtime, compiler, debugger, editor, custom dotfile configurations, relevant editor extensions and more.

## Customization

GitHub Codespaces are fully customizable on a per project basis. This is accomplished by including a `devcontainer.json` file in the project's repository, similar to VS Code [Remote Container](/docs/remote/containers.md) development.

Example customizations include:

* Setting which Linux-based operating system to use.
* Automatically installing various tools, runtimes, and frameworks.
* Forwarding commonly used ports.
* Setting environment variables.
* Configuring editor settings and installing preferred extensions.

See the [Configuring Codespaces](https://docs.github.com/github/developing-online-with-codespaces/configuring-codespaces-for-your-project) documentation for codespace-specific `devcontainer.json` settings.

## Dotfile per user configuration

Dotfiles are files whose filename begins with a dot (.). They typically contain configuration information for applications and can control how terminals, editors, source control, and various other tools behave. `.bashrc`, `.gitignore` and `.editorconfig` are examples of dotfiles commonly used by developers.

You can specify a GitHub repo containing your dotfiles, a target location for the files, as well as install commands when creating a codespace.

See the [Personalizing Codespaces](https://docs.github.com/github/developing-online-with-codespaces/personalizing-codespaces-for-your-account) documentation to learn how to add your dotfile configurations to a codespace.

## Getting started

There are getting started topics for both GitHub Codespaces clients. These will fast-track you through signing in to GitHub Codespaces, creating your first codespace, and connecting to it with your preferred client:

* [Codespaces in VS Code](https://docs.github.com/github/developing-online-with-codespaces/using-codespaces-in-visual-studio-code) - Use the [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) extension to connect and work in your environment.
* [Codespaces in the browser](https://docs.github.com/github/developing-online-with-codespaces/creating-a-codespace) - Connect to your codespace through a browser-based editor.

## Extension authors

The VS Code extension API hides most of the implementation details of running remotely so many extensions will just work in GitHub Codespaces environments without any modification. However, we recommend that you test your extension in a codespace to be sure that all of its functionality works as expected. See the article on [Supporting Remote Development and GitHub Codespaces](/api/advanced-topics/remote-extensions.md) for details.

## Known limitations and adaptations

While working with Codespaces and specifically VS Code in the web, there are certain limitations to keep in mind. Some of these limitations have workarounds or adaptations in place to provide a consistent development experience.

For several issues (especially keybindings or those listed with a workaround to move to the desktop), you can install and use a Codespace as [progressive web application](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/#pwas-on-microsoft-edge-chromium) (PWA).

![Installing Codespaces as PWA in Microsoft Edge](images/codespaces/PWA-edge-install.png)

| Issue | Reason | Workaround |
|-|-|-|
| `kbstyle(Ctrl+Shift+P)` won't launch the Command Palette in Firefox. | `kbstyle(Ctrl+Shift+P)` is reserved in Firefox. | Use `kbstyle(F1)` to launch the Command Palette. |
| Certain default keybindings (i.e. for debugging) are different in the web. | Since the browser may already have an action registered for those keybindings, we adjust the default for VS Code in the web. | Use the adjusted defaults. They appear on tooltip hovers over the debug actions. <ul><li> Step over is `kbstyle(Alt+F10)` (instead of `kbstyle(F10)`) on all browsers.</li><li> Step into in the web is `kbstyle(Alt+F11)` (instead of `kbstyle(F11)`) on Windows browsers.</li></ul> |
| `kbstyle(F11)` for debugging does not work on macOS in web or desktop.  | This is a known, non-browser specific limitation. More information can be found in [this issue](https://github.com/microsoft/vscode/issues/5102). | Disable `kbstyle(F11)` to show desktop on macOS.<ul><li> Go to: System Preferences -> Keyboard -> Shortcuts </li><li> Uncheck the "Show Desktop F11" option </li></ul> |
| `kbstyle(Ctrl+N)` for new file doesn't work in web. | `kbstyle(Ctrl+N)` opens a new window instead. | `kbstyle(Ctrl+N)` for new file works in the desktop. |
| `kbstyle(Ctrl+W)` for closing an editor doesn't work in web. | `kbstyle(Ctrl+W)` closes the current tab in browsers. | `kbstyle(Ctrl+W)` works in the desktop. |
| Dragging and dropping files from VS Code to a Codespace (and vice versa) does not work. | You can see more context in [this issue](https://github.com/microsoft/vscode/issues/115535). | There are a couple of options: <ul><li> You can right-click the file in your Codespace to download it to your local machine. </li><li> You can drag files to your Codespace from the file explorer. </li></ul> |
| Angular app debugging isn't supported in the web. | Code running in a browser cannot launch another browser instance in debug mode for security reasons. | You have a few options: <ul><li>Debug Node.js/service-side js normally.</li><li>Open the Codespace in desktop, in which case the [companion](https://github.com/microsoft/vscode-js-debug-companion) will be used to launch your local Edge or Chrome install.</li><ul> |
| Downloading a file with no extension from the browser automatically adds ".txt" | This is how Chrome and Edge behave. | Context and potential future solutions in [this issue](https://github.com/microsoft/vscode/issues/118436). |
| When you download a file from a remote (including Codespaces), attributes such as the executable bit are removed. | Context and potential future solutions can be found in [this issue](https://github.com/microsoft/vscode/issues/112099). | No current workarounds. |
| You may see the prompt, "`Your_codespace_name` can't open this folder because it contains system files" when trying to download certain folders from a Codespace. | A user agent is free to impose the level of restrictions on sensitive directories. More information in [this spec](https://wicg.github.io/file-system-access/#privacy-wide-access) and [Chromium's block list](https://source.chromium.org/chromium/chromium/src/+/master:chrome/browser/file_system_access/chrome_file_system_access_permission_context.cc;l=140-208). | No additional workarounds beyond the spec and block list. |
| Manually visiting `http://localhost:forwarded_port` won't work to access a forwarded port from a Codespace in the web. | This is based on how Codespaces handles port forwarding and generates the correct URL for the web. | Click the link from the port forwarding notification to open your app, or the globe icon in the [Ports view](/docs/remote/containers.md#forwarding-or-publishing-a-port), both of which will provide the properly generated link. More information in the [Codespaces docs](https://docs.github.com/en/github/developing-online-with-codespaces/developing-in-a-codespace#forwarding-ports). |

Extensions may also behave differently in the web.

| Extension | Issue / Reason | Workaround |
|-|-|-|
| Extensions with keyboard shortcuts that overlap with browser shortcuts, i.e. [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph), which uses `kbstyle(Ctrl+R)` to refresh. | The keyboard shortcut may overlap with an existing browser shortcut, i.e. `kbstyle(Ctrl+R)` refreshes the window in Safari. | You can use a desktop-based, rather than web-based, Codespace to fully leverage your keyboard shortcuts. Different browsers may also behave differently (i.e. you can refresh Git Graph in Chrome). |
| Language packs, i.e. [Japanese Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ja) | Language pack extensions are currently not supported in web-based Codespaces. | You can use a desktop-based Codespace to leverage language packs and configure display language. |
| [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) | It will not work in the browser as it introduces an install location dependency that is not easily fixable. | Use [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer). |
| Browser Debuggers, i.e. [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug), [Debugger for Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge). | Extensions which require a UI/Desktop extension host do not load in the browser. | You can use these extensions in local VS Code (not connected to Codespaces). Or, while your app is running from a Codespace, you can use an alternative, like Chrome DevTools to inspect elements and set breakpoints. |
| Extensions to open a browser, i.e. [open in browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser). | Extensions which require a UI/Desktop extension host do not load in the browser. | Use a substitute extension if possible, like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). |
| [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) | Project Manager relies on syncing a custom `projects.json` file, which [isn't currently supported](https://github.com/microsoft/vscode/issues/113774). | You can use the extension in desktop Codespaces or local VS Code to save and manage your projects, as these options won't require syncing a custom file. |
| Extensions that rely on Chrome, such as [Protractor Test Runner](https://marketplace.visualstudio.com/items?itemName=luciannaie.protractor-test-runner#:~:text=Protractor%20Test%20Runner%20is%20a,that%20has%20protractor%20test%20files.) and [Browser Preview](https://marketplace.visualstudio.com/items?itemName=auchenberg.vscode-browser-preview). | Chrome is not included in a Codespace. | Try to find alternative experiences, or you can use these extensions on your project in local VS Code (not connected to Codespaces). |
| [Flutter](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) (and Flutter development overall) | Several aspects of the Flutter workflow are limited due to the nature of Docker containers and Codespaces.<ul><li>Flutter recommends installation from snap, but snap cannot be installed within the Codespaces container.</li><li>Android Emulation does not work within a container.</li><li>Codespaces cannot detect USB devices plugged into your machine, which makes development on a physical device impossible.</li><li>Codespaces, like other Linux environments, doesn't support iOS development.</li></ul> | You can use local VS Code for Flutter development. |
| [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop) | The extension provides 3 areas of features to help with LaTeX authoring: 1) a set of views which surface common commands, 2) a PDF previewer, and 3) language features like snippets and IntelliSense. The extension can be used fairly fully featured, but there are some web or security limitations. | The following workarounds address limitations in the view and previewer feature areas: <ul><li>The views themselves work without issue, but a few of the commands try to launch native applications, like revealing the output folder in the OS file explorer. These do nothing in the web, so using the desktop is an alternative.</li><li>`"latex-workshop.view.pdf.viewer"` => This setting provides a PDF previewer similar to the [Markdown preview](/docs/languages/markdown#_markdown-preview). You can preview in a browser tab, in a separate PDF viewer, or in a VS Code tab.<br>Only the browser tab is usable in web-based Codespaces. The separate PDF viewer fails silently, and the VS Code tab hits the [Content Security Policy](/api/extension-guides/webview#content-security-policy) issue. The VS Code Tab viewer has other features that aren't available due to this limitation.</li></ul> |
| Other [Remote Development extensions](/docs/remote/remote-overview) (Remote - WSL, Remote - Containers, Remote - SSH) cannot be installed in a Codespace. | The Codespace is already a remote context. | If you'd like to run in another remote context (i.e. WSL or a remote SSH compute), open VS Code desktop (not connected to a Codespace) and launch one of the other remote extensions. If you'd like to use a [custom dev container](/docs/remote/create-dev-container), you can use the same `.devcontainer` in both Codespaces and Remote - Containers. |
| Some other extension doesn't work that's not listed above. | There are a few other issues that can prevent certain features from working in remote contexts as expected. | In some cases, you can use another command to work around the issue, while in others, the extension may need to be modified. Check out the [remote extension tips](/docs/remote/troubleshooting.md#extension-tips) for common remote issues and tips on resolving them. |

## Common questions

### How do I allow VS Code to access my clipboard for reading?

In certain cases, VS Code might ask you for permission to access the clipboard when reading from it. You should be able to grant access to the clipboard from your browser either through settings (search for "site permissions") or by looking for this option in the address bar on the right:

![Allow clipboard access in browser](images/codespaces/allow-clipboard-access.png)

Once you have granted VS Code access to the clipboard, you can retry the operation.

## Questions or feedback

If you have questions, you can consult the GitHub Codespaces [Troubleshooting guide](https://docs.github.com/github/developing-online-with-codespaces/troubleshooting-your-codespace). If you'd like to provide feedback, you can enter issues in the GitHub Codespaces [Support Community](https://github.community/c/codespaces-beta/45).
