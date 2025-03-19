---
Order: 8
Area: languages
TOCTitle: PowerShell
ContentId: 8688bb6d-793e-4a37-aed2-5af4cfe89940
PageTitle: PowerShell editing with Visual Studio Code
DateApproved: 02/20/2025
MetaDescription: Learn about using PowerShell in Visual Studio Code
---
# PowerShell in Visual Studio Code

[PowerShell][24] is a task-based command-line shell and scripting language built on [.NET][23] that
provides a powerful toolset for administrators on any platform.

The Microsoft [PowerShell][31] extension for Visual Studio Code (VS Code) provides rich language
support and capabilities such as syntax completions, definition tracking, and linting for
PowerShell. The extension should work everywhere VS Code is supported using
[PowerShell 7+ currently supported versions][17].

Support for Windows PowerShell 5.1 is provided on a best effort basis. [.NET Framework 4.8][18] or
higher is required.

[VS Code Remote Development][13] Environments, including [GitHub Codespaces][19] and
[VS Code Server][14] are supported.

> [!IMPORTANT]
> [Visual Studio Code for the Web][12] is only supported for limited functionality such as basic
> syntax highlighting, as the PowerShell engine can't run in this environment.

We actively test the following configurations:

- **Windows Server 2022** with Windows PowerShell 5.1 and PowerShell 7+
- **macOS 14.7** with PowerShell 7+
- **Ubuntu 24.04** with PowerShell 7+

On Windows, we also test with and without Constrained Language Mode enabled.

## Installing the PowerShell extension

The PowerShell extension can be installed from the Visual Studio Code Marketplace by clicking the
[Install Button][44]. You can also install the PowerShell extension from within VS Code by opening
the **Extensions** view with keyboard shortcut `kb(workbench.view.extensions)`, typing _PowerShell_,
and selecting the PowerShell extension:

![PowerShell extension][40]

## Major features

- [Syntax highlighting][20]
- Advanced built-in [code snippets][08]
- [IntelliSense][05] for cmdlets and more
- [Problems][09] reported by [PowerShell Script Analyzer][11]
- [Go to Definition][02] of cmdlets, variables, classes and more
- [Find References][04] of cmdlets, variables, classes and more
- Document and Workspace [Symbol Navigation][03]
- Symbol-based [Outline View][10]
- Run selected PowerShell code in current terminal using `kbstyle(F8)`
- Launch online help for the symbol under the cursor using `kbstyle(Ctrl + F1)`
- PowerShell [Debugger][29] integration
- An Extension Terminal that can interact with the debugger (try `Set-PSBreakpoint`!)
- PowerShell ISE theme available in the [theme picker][07]
- Also try ISE mode using `kb(workbench.action.showCommands)` then search for "Enable ISE Mode"

### Debugging

The PowerShell extension uses the built-in [debugging interface][01] of VS Code to allow for
debugging of PowerShell scripts and modules. For more information about debugging PowerShell, see
[Using VS Code][29].

### Multi-version support

You can configure the PowerShell extension to use any supported version of PowerShell installed on
your machine by following [these instructions][28].

Or run the **PowerShell: Show Session Menu** command from the Command Palette
(`kb(workbench.action.showCommands)`).

### CodeLens support

CodeLenses are a VS Code feature to provide actionable, contextual information that's displayed
within the source code.

CodeLens features include:

- Pester **Run tests** and **Debug tests**.

  ![Pester CodeLens Integration][39]

- Pester symbol support

  ![CodeLens Pester Symbol Support][38]

- Function, variable, class, and other symbol references

  CodeLens reference support shows the number of times a symbol is referenced within your
  code and allows you to jump to specific references.

  ![CodeLens Function Reference Support][37]

### PSScriptAnalyzer integration

[PSScriptAnalyzer][30] is a PowerShell module that provides a static source code checker for modules
and scripts. **PSScriptAnalyzer** has rules that verify the quality of PowerShell code. These rules
are based on PowerShell best practices identified by the PowerShell Team and the community.
**PSScriptAnalyzer** generates diagnostic records (errors and warnings) to inform users about
potential code defects and suggests possible solutions for improvements.

The PowerShell extension includes **PSScriptAnalyzer** by default, and automatically performs
analysis on PowerShell script files you edit in VS Code.

**PSScriptAnalyzer** comes with a collection of built-in rules that check various aspects of
PowerShell source code such as presence of uninitialized variables, usage of **PSCredential** type,
usage of `Invoke-Expression`, and others. The module also allows you to include or exclude specific
rules.

To disable **PSScriptAnalyzer**, open your settings (`kb(workbench.action.openSettings)`), browse
**Extensions**, select the **PowerShell** extension, and deselect the checkbox for **Script
Analysis: Enable** (`powershell.scriptAnalysis.enable`).

![PSScriptAnalyzer Settings][42]

**PSScriptAnalyzer** also provides code formatting. You can invoke automatic document formatting
with the **Format Document** command or the (`kb(editor.action.formatDocument)`) keyboard shortcut.

### Pester integration

[Pester][33] is a framework for running unit tests to execute and Windows PowerShell 5.1 comes with
**Pester** 3.40 preinstalled. To update **Pester** or to install the latest version on other
platforms, follow the [Pester installation instructions][34].

## PowerShell extension settings

You can customize VS Code [settings][06] from the **File** > **Preferences** > **Settings** menu item.

You can also select the gear icon located in the lower left corner of the Activity Bar.

![codeGear][36]

You can also use the keyboard shortcut `kb(workbench.action.openSettings)` to open your settings.
You can still open the `settings.json` file using **Preferences: Open User Settings (JSON)** command from
the Command Palette (`kb(workbench.action.showCommands)`) or by changing the default settings editor
with the `"workbench.settings.editor"` setting.

Go to [User and Workspace settings][06] for more information on configuring VS Code settings.

### Types.ps1xml and Format.ps1xml files

PowerShell `.ps1xml` files are used to extend the type system and define output formatting. For more
information on these files, see the official PowerShell documentation on [Types.ps1xml][26] and
[Format.ps1xml][25]. You can get IntelliSense features when authoring `.ps1xml` files by installing
the [XML extension by Red Hat][32]. After installing, add this configuration to your user settings:

```json
"xml.fileAssociations": [
  {
    "systemId": "https://raw.githubusercontent.com/PowerShell/PowerShell/master/src/Schemas/Format.xsd",
    "pattern": "**/*.Format.ps1xml"
  },
  {
    "systemId": "https://raw.githubusercontent.com/PowerShell/PowerShell/master/src/Schemas/Types.xsd",
    "pattern": "**/*.Types.ps1xml"
  }
]
```

This configuration tells the XML extension to use the official XML schemas from the PowerShell
repository for all `.ps1xml` files. Configuring these schemas enables the following features in
`ps1xml` files:

- Syntax error reporting
- Schema validation
- Tag and attribute completion
- Autoclose tags
- Symbol highlighting
- Document folding
- Document symbols and outline
- Renaming support
- Document formatting

## Example scripts

Example scripts are included with the extension and can be found at the following path.

`~/.vscode/extensions/ms-vscode.PowerShell-<version>/examples`

To open or view the examples in VS Code, run the following from your PowerShell command prompt:

```powershell
code (Get-ChildItem ~\.vscode\extensions\ms-vscode.PowerShell-*\examples)[-1]
```

You can also open the examples from the Command Palette (`kb(workbench.action.showCommands)`) with
the **PowerShell: Open Examples Folder** command.

![Open PowerShell Examples][43]

## Additional resources

There are more detailed articles in the PowerShell documentation. Start with [Using VS Code][27].

Check out the [troubleshooting guide][21] for answers to common questions.

For more information on debugging, check out the _Hey, Scripting Guy!_ two-part blog post series
written by [@keithHill][35] on debugging with the PowerShell extension:

- [Debugging PowerShell script in Visual Studio Code - Part 1][15]
- [Debugging PowerShell script in Visual Studio Code - Part 2][16]

## Testing new features and providing feedback

We would encourage you to try the _pre-release_ version whenever possible. When a
_Pre-Release_ is available, it can be installed from the marketplace using the **Switch to
Pre-Release Version** button. You can switch back to the stable version of the extension
by using the **Switch to Release Version** button that will appear. You can also downgrade
to other versions of the extension using the arrow next to the **Uninstall** button and
choosing **Install Another Version...**.

![Screenshot showing the button to switch to a pre-release version.][41]

If you find a bug, [open an issue][22] and revert to the stable version while we fix it.

<!-- link references -->
[01]: /docs/editor/debugtest/debugging
[02]: /docs/editing/editingevolved#_go-to-definition
[03]: /docs/editing/editingevolved#_open-symbol-by-name
[04]: /docs/editing/editingevolved#_reference-information
[05]: /docs/editing/intellisense
[06]: /docs/configure/settings
[07]: /docs/configure/themes
[08]: /docs/editing/userdefinedsnippets
[09]: /docs/getstarted/tips-and-tricks#_errors-and-warnings
[10]: /docs/getstarted/userinterface#_outline-view
[11]: http://github.com/PowerShell/PSScriptAnalyzer
[12]: https://code.visualstudio.com/docs/setup/vscode-web
[13]: https://code.visualstudio.com/docs/remote/remote-overview
[14]: https://code.visualstudio.com/docs/remote/vscode-server
[15]: https://devblogs.microsoft.com/scripting/debugging-powershell-script-in-visual-studio-code-part-1/
[16]: https://devblogs.microsoft.com/scripting/debugging-powershell-script-in-visual-studio-code-part-2/
[17]: https://docs.microsoft.com/en-us/powershell/scripting/powershell-support-lifecycle
[18]: https://dotnet.microsoft.com/download/dotnet-framework
[19]: https://github.com/features/codespaces
[20]: https://github.com/PowerShell/EditorSyntax
[21]: https://github.com/PowerShell/vscode-powershell/blob/main/docs/troubleshooting.md#troubleshooting-powershell-extension-issues
[22]: https://github.com/PowerShell/vscode-powershell/issues/new/choose
[23]: https://learn.microsoft.com/dotnet
[24]: https://learn.microsoft.com/powershell/
[25]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_format.ps1xml
[26]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_types.ps1xml
[27]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode
[28]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode#choosing-a-version-of-powershell-to-use-with-the-extension
[29]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode#debugging-with-visual-studio-code
[30]: https://learn.microsoft.com/powershell/utility-modules/psscriptanalyzer/overview
[31]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell
[32]: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml
[33]: https://pester.dev/
[34]: https://pester.dev/docs/introduction/installation
[35]: https://twitter.com/r_keith_hill
[36]: images/powershell/codeGear.png
[37]: images/powershell/codeLensFuncRef.gif
[38]: images/powershell/codeLensPesterSymbol.gif
[39]: images/powershell/pesterCodeLens.png
[40]: images/powershell/PowerShellExtension.png
[41]: images/powershell/prerelease-switch.png
[42]: images/powershell/pssaExtensionSetting.png
[43]: images/powershell/pwshExamples.png
[44]: vscode:extension/ms-vscode.PowerShell
