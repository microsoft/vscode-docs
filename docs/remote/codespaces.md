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

While working in Codespaces and VS Code in the web, there are certain limitations to keep in mind. Some of these limitations have workarounds or adaptations in place to provide a consistent remote development experience.

| Issue | Reason | Workaround |
|-|-|-|
| `Ctrl+Shift+P` won't launch the Command Palette in Firefox web-based Codespaces. | `Ctrl+Shift+P` is reserved in Firefox. | Use `F1` to launch the Command Palette. |
| Certain default keybindings (i.e. for debugging) are different in the web. | Since the browser may already have an action registered for those keybindings, we adjust the default for VS Code in the web. | Utilize the adjusted defaults. They appear on tooltip hovers over the debug actions. <ul><li> Step over is `Alt` + `F10` (instead of `F10`) on all browsers.</li><li> Step into in the web is `Alt` + `F11` (instead of `F11`) on Windows browsers.</li></ul> |
| `F11` for debugging does not work on macOS in web or desktop.  | This is a known, non-browser specific limitation, and more information can be found in [this issue](https://github.com/microsoft/vscode/issues/5102). | Disable `F11` to show desktop on macOS. You can do this by: <ul><li> Go to System Preferences -> Keyboard -> Shortcuts </li><li> Uncheck the "Show Desktop F11" option </li></ul> |
| `Ctrl+n` for new file doesn't work in web. | It opens a new window rather than creating a new file. | You can use the desktop to leverage `Ctrl+n` for new file. |
| Dragging and dropping files from VS Code to a Codespace (and vice versa) does not work. | You can see more context in [this issue](https://github.com/microsoft/vscode/issues/115535). | There are a couple of options: <ul><li> You can right-click the file in your Codespace to download it to your local machine. </li><li> You can drag files to your Codespace from the Windows explorer. </li></ul> |
| Angular app debugging isn't supported in browser-based Codespaces. | Code running in a browser cannot launch another browser instance in debug mode for security reasons. | You have a few options: <ul><li>Debug Node.js/service-side js normally.</li><li>Open the Codespace in desktop VS Code, in which case the [companion](https://github.com/microsoft/vscode-js-debug-companion) will be used to launch your local Edge or Chrome install.</li><ul> |
| Downloading a file with no extension from the browser automatically adds ".txt" | This is how Chrome (and Edge) behave. | Context and potential future solutions in [this issue](https://github.com/microsoft/vscode/issues/118436 ). |
| When you download a file from a remote (including Codespaces), attributes such as the executable bit are removed. | Context and potential future solutions can be found in [this issue](https://github.com/microsoft/vscode/issues/112099). | No current workarounds. |
| You may see the prompt, "`Your_codespace_name` can't open this folder because it contains system files" when trying to download certain folders from a Codespace. | A user agent is free to impose the level of restrictions on sensitive directories. More information in [this spec](https://wicg.github.io/file-system-access/#privacy-wide-access) and [Chromium's block list](https://source.chromium.org/chromium/chromium/src/+/master:chrome/browser/file_system_access/chrome_file_system_access_permission_context.cc;l=140-208). | Review the spec and block list to see how your use case is affected. |
| Using http://localhost:`your_forwarded_port` won't work to access a forwarded port from a browser-based Codespace. | This is based on how Codespaces handles port forwarding and generates the correct URL. | Click the link from the port forwarding notification to open your app, or the globe icon in the [Ports view](/docs/remote/containers.md#forwarding-or-publishing-a-port). |

Extensions may also behave differently in the browser.

| Extension | Issue / Reason | Workaround |
|-|-|-|
| Extensions with keyboard shortcuts that overlap with browser shortcuts, i.e. [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph), which uses `Ctrl+R` to refresh. | The keyboard shortcut may overlap with an existing browser shortcut, i.e. `Ctrl+R` refreshes the window in Safari. | You can use a desktop-based, rather than web-based, Codespace to fully leverage your keyboard shortcuts. Different browsers may also behave differently (i.e. you can refresh Git Graph in Chrome). |
| Language packs, i.e. [Japanese Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ja) | Language pack extensions are currently not supported in web-based Codespaces. | You can use a desktop-based Codespace to leverage language packs and configure display language. |
| [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) | It will not work in the browser as it introduces an install location dependency that is not easily fixable. | Use [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer). |
| Browser Debuggers, i.e. [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug), [Debugger for Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge). | Extensions which require a UI/Desktop extension host do not load in the browser. | You can use these extensions locally, or while your app is running from a Codespace, you can use something non-specific to VS Code, like Chrome DevTools to inspect elements and set breakpoints. |
| Extensions to open a browser, i.e. [open in browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser) | Extensions which require a UI/Desktop extension host do not load in the browser. | Use a substitute extension if possible, like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). |
| Extensions that rely on Chrome, such as [Protractor Test Runner](https://marketplace.visualstudio.com/items?itemName=luciannaie.protractor-test-runner#:~:text=Protractor%20Test%20Runner%20is%20a,that%20has%20protractor%20test%20files.) and [Browser Preview](https://marketplace.visualstudio.com/items?itemName=auchenberg.vscode-browser-preview). | Chrome is not included in a Codespace. | You can use these extensions on your repo locally. |
| Other [Remote Development extensions](https://code.visualstudio.com/docs/remote/remote-overview) (Remote - WSL, Remote - Containers, Remote - SSH) cannot be installed in a Codespace. | The Codespace is already a remote context. | If you'd like to run in another remote context (i.e. WSL or a remote SSH box), open VS Code desktop (not connected to a Codespace) and launch one of the other remote extensions. If you'd like to use a [custom dev container](https://code.visualstudio.com/docs/remote/create-dev-container), you can use the same .devcontainer in both Codespaces and Remote - Containers. |

## Common questions

### How do I allow VS Code to access my clipboard for reading?

In certain cases, VS Code might ask you for permission to access the clipboard when reading from it. You should be able to grant access to the clipboard from your browser either through settings (search for "site permissions") or by looking for this option in the address bar on the right:

![Allow clipboard access in browser](images/codespaces/allow-clipboard-access.png)

Once you have granted VS Code access to the clipboard, you can retry the operation.

## Questions or feedback

If you have questions, you can consult the GitHub Codespaces [Troubleshooting guide](https://docs.github.com/github/developing-online-with-codespaces/troubleshooting-your-codespace). If you'd like to provide feedback, you can enter issues in the GitHub Codespaces [Support Community](https://github.community/c/codespaces-beta/45).
