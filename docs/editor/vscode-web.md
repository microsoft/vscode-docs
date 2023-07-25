https://github.com/ffguarnizo/pacientes.git
/**
  * @swagger
 * paths:
 *   /pacientes:
 *     get:
 *       summary: Obtener el listado de pacientes
 *       responses:
 *         200:
 *           description: JSON con el listado de pacientes
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Paciente'
 *   /crear_paciente:
 *     post:
 *       summary: Crear un nuevo paciente
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       responses:
 *         200:
 *           description: Paciente creado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Paciente'
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       properties:
 *         cedula:
 *           type: integer
 *           format: int32
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         fechaNacimiento:
 *           type: string
 *           format: date-time
 *         telefono:
 *           type: string
 */
export default {};

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
