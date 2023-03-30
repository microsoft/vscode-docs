---
Order: 11
Area: editor
TOCTitle: VS Code for the Web
ContentId: d665a790-1da1-4f45-bc0f-c09822528e55
PageTitle: Visual Studio Code for the Web
DateApproved: 3/30/2023
MetaDescription: Visual Studio Code for the Web and the vscode.dev URL
---
# Visual Studio Code for the Web

Visual Studio Code for the Web provides a free, zero-install Microsoft Visual Studio Code experience running entirely in your browser, allowing you to quickly and safely browse source code repositories and make lightweight code changes. To get started, go to **[https://vscode.dev](https://vscode.dev)** in your browser.

VS Code for the Web has many of the features of VS Code Desktop that you love, including search and syntax highlighting while browsing and editing, along with extension support to work on your codebase and make simpler edits. In addition to opening repositories, forks, and pull requests from source control providers like GitHub and Azure Repos (in preview), you can also work with code that is stored on your local machine.

VS Code for the Web runs entirely in your web browser, so there are certain limitations compared to the desktop experience, which you can read more about [below](#limitations).

## Relationship to VS Code Desktop

VS Code for the Web provides a browser-based experience for navigating files and repositories and committing lightweight code changes. However, if you need access to a runtime to run, build, or debug your code, or you want to use platform features such as a terminal, we recommend moving your work to the desktop application or [GitHub Codespaces](https://github.com/features/codespaces) for the full capabilities of VS Code. In addition, VS Code Desktop lets you run extensions that aren't supported in the web version, and use a full set of keyboard shortcuts not limited by your browser.

When you're ready to switch, you'll be able to ["upgrade"](#continue-working-in-a-different-environment) to the full VS Code Desktop experience with a few clicks.

You can also switch between the Stable and Insiders versions of VS Code for the Web by selecting the gear icon, then **Switch to Insiders Version...**, or by navigating directly to [https://insiders.vscode.dev](https://insiders.vscode.dev).

## Opening a project

By navigating to [https://vscode.dev](https://vscode.dev), you can create a new local file or project, work on an existing local project, or access source code repositories hosted elsewhere, such as on GitHub and Azure Repos (part of Azure DevOps).

You can navigate to a project repository directly from a URL, following the scheme: `https://vscode.dev/SOURCE/ORG/REPO`. Using the [VS Code repo](https://github.com/microsoft/vscode) as an example, this would look like: `https://vscode.dev/github/microsoft/vscode`.

To work with both GitHub and Azure Repos, VS Code for the Web supports two routes, `vscode.dev/github` and `vscode.dev/azurerepos`:

GitHub: `https://vscode.dev/github/organization/repo`

Azure Repos: `https://vscode.dev/azurerepos/organization/project/repo`

From your browser's search bar (aka omnibox), you can easily open any GitHub repository in `vscode.dev`. Simply install the `vscode.dev` [extension](https://chrome.google.com/webstore/detail/vs-code/kobakmhnkfaghloikphojodjebdelppk) for Chrome and Edge. Then, type `code` to activate the omnibox, followed by your repository's name. Suggestions are populated by your browser search history, so if the repo you want doesn't come up, you can also type in the fully qualified `<owner>/<repo>` name to open it, for example `microsoft/vscode`.

![Type `code` in your browser and search a GitHub repository to open in vscode.dev](images/vscode-web/chrome-omnibox-extension.png)

If you're already in VS Code for the Web at [https://vscode.dev](https://vscode.dev), you can alternatively navigate to different repos via the [Remote Repositories](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-repositories) extension commands. Select the remote indicator in the lower left of the Status bar, and you'll be presented with the **Open Remote Repository...** command.

![GitHub Repositories](images/vscode-web/remote-repositories.png)

GitHub Repositories is the core component that provides the ability to remotely browse and edit a repository from within the editor.

Rather than cloning your work, GitHub Repositories creates a virtual file system to access repositories and pull requests, allowing you to become productive quickly without needing to pull code onto your local machine. You can learn more about the extension in our [GitHub Repositories](/docs/sourcecontrol/github.md#github-repositories-extension) guide.

>**Note**: The GitHub Repositories extension works in VS Code Desktop as well to provide fast repository browsing and editing.

You can create a new file in the web just as you would in a VS Code Desktop environment, using **File** > **New File** from the Command Palette (`kbstyle(F1)`).

## Azure Repos (preview)

Support for Azure Repos (part of Azure DevOps) in Visual Studio Code for the Web is in preview, and the experience will continue to grow and evolve over time.

When you navigate to a URL with the schema `https://vscode.dev/azurerepos/organization/project/repo`, you will be able to read, search the files in the repo, and commit your changes to Azure Repos. You can fetch, pull, and sync changes, and view branches.

You can open any repository, branch, or tag from Azure Repos in VS Code for the Web by prefixing `vscode.dev` to the Azure Repos URL.

Alternatively, when you are on an Azure DevOps repository or pull request, you can press (`kbstyle(.)`) to open it in vscode.dev.

### Current limitations

Azure Repos support is currently read-only. Commit, branch, fork, and PR actions are disabled in the Source Control view and Command Palette.

## More custom URLs

Like in the desktop, you can customize VS Code for the Web through a rich ecosystem of extensions that support just about every back end, language, and service. Unlike in the desktop, it's easy for us to deliver customized experiences with pre-installed extensions through unique `vscode.dev` URLs (like `vscode.dev/github` and `vscode.dev/azurerepos` described above).

### Themes

You can share and experience color themes through VS Code for the Web through the URL scheme: `https://vscode.dev/theme/extensionId`.

For instance, you can go to [https://vscode.dev/theme/sdras.night-owl](https://vscode.dev/theme/sdras.night-owl) to experience the [Night Owl theme](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) without having to go through the download and install process.

> Note: The color theme URL scheme works for themes that are fully declarative (no code).

An extension can define multiple themes. You can use the schema `/theme/extensionId/themeName`. If no `themeName` is specified, VS Code for the Web will take the first theme.

As a theme author, you can add the following badge to your extension readme to allow users to easily try out your theme in VS Code for the Web (replacing `<extensionId>` with your theme extension's unique identifier):

```markdown
[![Preview in vscode.dev](https://img.shields.io/badge/preview%20in-vscode.dev-blue)](https://vscode.dev/theme/<extensionId>)
```

### Visual Studio Live Share

[Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) guest sessions are available in the browser through the `https://vscode.dev/liveshare` URL. The `sessionId` will be passed to the extension to make joining a seamless experience.

## Continue working in a different environment

In some cases, you will want to access a different environment that has the ability to run code. You can switch to working on a repository in a development environment that has support for a local file system and full language and development tooling.

The GitHub Repositories extension makes it easy for you to clone the repository locally, reopen it on the desktop, or create a GitHub codespace for the current repository (if you have the [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) extension installed and access to create GitHub codespaces). To do this, use the **Continue Working On...** command available from the Command Palette (`kbstyle(F1)`) or click on the Remote indicator in the Status bar.

## Use your own compute power with the VS Code Server

You may develop against another machine in VS Code for the Web using the VS Code Server.

The VS Code Server is a private preview service you can run on a remote development machine, like your desktop PC or a virtual machine (VM). It allows you to securely connect to that remote machine from anywhere through a vscode.dev URL, without the requirement of SSH. This lets you "bring your own compute" to vscode.dev, enabling additional scenarios like running your code in the browser.

You may learn more about the VS Code Server in its [documentation](https://aka.ms/vscode-server-doc).

## Safe exploration

VS Code for the Web runs entirely in your web browser's sandbox and offers a very limited execution environment.

When accessing code from remote repositories, the web editor doesn't "clone" the repo, but instead loads the code by invoking the services' APIs directly from your browser; this further reduces the attack surface when cloning untrusted repositories.

When working with local files, VS Code for the Web loads them through your browser's file system access APIs, which limit the scope of what the browser can access.

## Saving and sharing work

When working on a local file in the web, your work is saved automatically if you have [Auto Save](/docs/editor/codebasics.md#save-auto-save) enabled. You can also save manually as you do when working in desktop VS Code (for example **File** > **Save**).

When working on a remote repository, your work is saved in the browser's local storage until you commit it. If you open a repo or pull request using GitHub Repositories, you can push your changes in the Source Control view to persist any new work.

## Run anywhere

Similar to [GitHub Codespaces](/docs/remote/codespaces.md), VS Code for the Web can run on tablets, like iPads.

## Language support

Language support is a bit more nuanced on the web, including code editing, navigation, and browsing. The desktop experiences are typically powered by language services and compilers that expect a file system, runtime, and compute environment. In the browser, these experiences are powered by language services running in the browser that provide source code tokenization and syntax colorization, completions, and many single-file operations.

Generally, experiences fall into the following categories:

* **Good:** For most programming languages, VS Code for the Web gives you code syntax colorization, text-based completions, and bracket pair colorization. Using a [Tree-sitter](https://tree-sitter.github.io/tree-sitter) syntax tree through the [anycode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.anycode), we're able to provide additional experiences such as **Outline/Go to Symbol** and **Symbol Search** for popular languages such as C/C++, C#, Java, PHP, Rust, and Go.
* **Better:** The TypeScript, JavaScript, and Python experiences are all powered by language services that run natively in the browser. With these programming languages, you'll get the "**Good**" experience plus rich single file completions, semantic highlighting, syntax errors, and more.
* **Best:** For many "webby" languages, such as JSON, HTML, CSS, and LESS, etc., the coding experience in vscode.dev is nearly identical to the desktop (including Markdown preview!).

You can determine the level of language support in your current file through the Language Status Indicator in the Status bar:

![Language status indicator](images/vscode-web/status-indicator.png)

## Limitations

Since VS Code for the Web runs completely within the browser, some experiences will naturally be more constrained when compared to what you can do in the desktop app. For example, the terminal and debugger are not available, which makes sense since you can't compile, run, and debug a Rust or Go application within the browser sandbox.

### Extensions

Only a subset of extensions can run in the browser. You can use the Extensions view to install extensions in the web, and extensions that cannot be installed will have a warning icon and **Learn Why** link. We expect more extensions to become enabled over time.

![Limited extension support](images/vscode-web/extension-limit.png)

When you install an extension, it is saved in the browser's local storage. You can ensure your extensions are synced across VS Code instances, including different browsers and even the desktop, by enabling [Settings Sync](/docs/editor/settings-sync).

When an Extension Pack contains extensions that do not run in the browser sandbox, you will get an informational message with the option to see the extensions included in the pack.

![Python extension pack limit](images/vscode-web/python-extension-limit.png)

When extensions are executed in the browser sandbox, they are more restricted. Extensions that are purely declarative, such as most themes, snippets, or grammars, can run unmodified and are available in VS Code for the Web without any modification from the extension authors. Extensions that are running code need to be updated to support running in the browser sandbox. You can read more about what is involved to support extensions in the browser in the [web extension authors guide](/api/extension-guides/web-extensions.md).

There are also extensions that run in the browser with partial support only. A good example is a language extension that [restricts its support](/docs/nodejs/working-with-javascript.md#partial-intellisense-mode) to single files or the currently opened files.

### File system API

Edge and Chrome today support the [File System API](https://developer.mozilla.org/docs/Web/API/File_System_Access_API), allowing web pages to access the local file system. If your browser does not support the File System API, you cannot open a folder locally, but you can open files instead.

### Browser support

You can use VS Code for the Web in Chrome, Edge, Firefox, and Safari.

Webviews might appear differently or have some unexpected behavior in Firefox and Safari. You can view issue queries in the VS Code GitHub repo to track issues related to specific browsers, such as with the [Safari label](https://github.com/microsoft/vscode/labels/safari) and [Firefox label](https://github.com/microsoft/vscode/labels/firefox).

There are additional steps you can take to improve your browser experience using VS Code for the Web. Review the [Additional browser setup](#additional-browser-setup) section for more information.

### Mobile support

You can use VS Code for the Web on mobile devices, but smaller screens may have certain limitations.

### Keybindings

Certain keybindings may also work differently in the web.

| Issue | Reason |
|-|-|
| `kb(workbench.action.showCommands)` won't launch the Command Palette in Firefox. | `kb(workbench.action.showCommands)` is reserved in Firefox. <br> As a workaround, use `kbstyle(F1)` to launch the Command Palette. |
| `kb(workbench.action.files.newUntitledFile)` for new file doesn't work in web. | `kb(workbench.action.files.newUntitledFile)` opens a new window instead. <br> As a workaround, you can use `kbstyle(Ctrl+Alt+N)` (`kbstyle(Cmd+Alt+N)` on macOS). |
| `kb(workbench.action.closeActiveEditor)` for closing an editor doesn't work in web. | `kb(workbench.action.closeActiveEditor)` closes the current tab in browsers. <br> As a workaround, you can use `kbstyle(Ctrl+Shift+Alt+N)` (`kbstyle(Cmd+Shift+Alt+N)` on macOS). |
| `kb(workbench.action.tasks.build)` will not toggle the favorites bar in the browser. | VS Code for the Web overrides this and redirects to the "Build" menu in the Command Palette. |
| `kbstyle(Alt+Left)` and `kbstyle(Alt+Right)` should navigate within the editor but may incorrectly trigger tab history navigation. | If focus is outside the editor, these shortcuts trigger tab history navigation instead. |

## Additional browser setup

There are additional browser configuration steps you can take when working with VS Code in a browser.

### Opening new tabs and windows

In certain cases, you may need to open a new tab or window while working in VS Code for the Web. VS Code might ask you for permission to access the clipboard when reading from it. Depending on your browser, you may grant access to the clipboard or otherwise allow for pop-up windows in different ways:

* Chrome, Edge, Firefox: Search for "site permissions" in your browser's settings, or look for the following option in the address bar on the right:

![Allow clipboard access in the browser](images/vscode-web/allow-clipboard-access.png)

* Safari: In the Safari browser, go to **Preferences...** > **Websites** > **Pop-up Windows** > the domain you're accessing (for example, `vscode.dev`), and select **Allow** from the dropdown.
