---
Order: 8
Area: languages
TOCTitle: PowerShell
ContentId: 8688bb6d-793e-4a37-aed2-5af4cfe89940
PageTitle: PowerShell editing with Visual Studio Code
DateApproved: 08/15/2022
MetaDescription: Learn about using PowerShell in Visual Studio Code
---
# PowerShell in Visual Studio Code

[PowerShell][1] is a task-based command-line shell and scripting language built on [.NET][2], which
provides a powerful toolset for administrators on any platform.

The Microsoft [PowerShell][3] extension for Visual Studio Code (VS Code) provides rich language
support and capabilities such as syntax completions, definition tracking, and linting for
PowerShell. The extension works anywhere you can run VS Code and PowerShell 7 or higher. The
extension also works for Windows PowerShell 5.1. The extension no longer supports the older versions
of Windows PowerShell.

Our test matrix includes the following configurations:

- **Windows Server 2022** with Windows PowerShell 5.1 and PowerShell 7.2
- **Windows Server 2019** with Windows PowerShell 5.1 and PowerShell 7.2
- **macOS 11** with PowerShell Core 7.2
- **Ubuntu 20.04** with PowerShell Core 7.2

## Installing the PowerShell extension

There are two versions of the extension:

- [PowerShell][4] - the fully tested stable release
- [PowerShell Preview][5] - a preview release containing new features and other changes, but not
  fully tested

Both extensions can be installed, but only one should be enabled. This allows you to switch from the
stable to the preview version to try out new features.

### Installing from within VS Code

The PowerShell extension can be installed from the Visual Studio Code Marketplace by clicking the
[Install Button][6]. You can also install the PowerShell extension from within VS Code by opening
the Extensions view with keyboard shortcut `kb(workbench.view.extensions)`, typing "PowerShell", and
selecting the PowerShell extension:

![PowerShell extension][7]

### Installing from the command line

The extension can also be installed from any command-line shell (including PowerShell, cmd, and
bash) on any supported platform using the following command:

```powershell
code --install-extension ms-vscode.powershell
```

If you are running the VS Code [Insiders][8] build, use this command instead:

```powershell
code-insiders --install-extension ms-vscode.powershell
```

## Major features

- Syntax highlighting
- Code snippets
- IntelliSense for cmdlets and more
- Rule-Based analysis provided by PowerShell Script Analyzer
- **Go to Definition** of cmdlets and variables
- Find references of cmdlets and variables
- Document and Workspace symbol discovery
- Run selected section of PowerShell code using `kbstyle(F8)`
- Launch online help for the symbol under the cursor using `kbstyle(Ctrl + F1)`
- Local script debugging and basic interactive console support
- Enable ISE mode using `kb(workbench.action.showCommands)` then search for "Enable ISE Mode"

### Debugging

The PowerShell extension uses the built-in [debugging interface][9] of VS Code to allow for
debugging of PowerShell scripts and modules. For more information about debugging PowerShell, see
[Using VS Code][10].

### Multi-version support

You can configure the PowerShell extension to use any supported version of PowerShell installed on
your machine by following [these instructions][11].

Or run the **PowerShell: Show Session Menu** command from the Command Palette
(`kb(workbench.action.showCommands)`).

### CodeLens support

CodeLenses are a VS Code feature to provide actionable, contextual information that is displayed
within the source code.

CodeLens support was added in version 1.3.0 of the PowerShell extension, read the
[PowerShell extension changelog][12] for more information.

CodeLens features include:

- Pester **Run tests** and **Debug tests**.

  ![Pester CodeLens Integration][13]

- Pester symbol support

  ![CodeLens Pester Symbol Support][14]

- Function reference

  CodeLens function reference support shows the number of times a function is referenced within your
  code and allows you to jump to specific references.

  ![CodeLens Function Reference Support][15]

### PSScriptAnalyzer integration

[PSScriptAnalyzer][16] is a PowerShell module that provides a static source code checker for modules
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

To disable **PSScriptAnalyzer**, open your settings (`kb(workbench.action.openSettings)`), browse **Extensions**, select the **PowerShell**
extension, and deselect the checkbox for **Script Analysis: Enable** (`powershell.scriptAnalysis.enable`).

![PSScriptAnalyzer Settings][17]

**PSScriptAnalyzer** also provides code formatting. You can invoke automatic document formatting
with the **Format Document** command or the (`kb(editor.action.formatDocument)`) keyboard shortcut.

### Pester integration

[Pester][18] is a framework for running unit tests to execute and Windows PowerShell 5.1 comes with
**Pester** 3.40 pre-installed. To update **Pester** or to install the latest version on other
platforms follow the [Pester installation instructions][19].

### Plaster integration

[Plaster][20] is a template-based file and project generator written in PowerShell. Its purpose is to
streamline the creation of PowerShell module projects, Pester tests, DSC Configurations and more.

The PowerShell extension allows the creation of new Plaster projects using the **PowerShell: Create
New Project from Plaster Template** command from the Command Palette
(`kb(workbench.action.showCommands)`).

![Plaster Project][22]

## PowerShell extension settings

You can customize VS Code [settings][23] from the **File** > **Preferences** > **Settings** menu
item (**Code** > **Preferences** > **Settings** on macOS).

You can also select the gear icon located in the lower left corner of the Activity Bar.

![codeGear][24]

You can also use the keyboard shortcut `kb(workbench.action.openSettings)` to open your settings.
You can still open the `settings.json` file by using **Preferences: Open Settings (JSON)** command
from the Command Palette (`kb(workbench.action.showCommands)`) or by changing the default settings
editor with the `"workbench.settings.editor"` setting.

Go to [User and Workspace settings][25] for more information on configuring VS Code settings.

### Types.ps1xml and Format.ps1xml files

PowerShell `.ps1xml` files are used to extend the type system and define output formatting. For more
information on these files, please refer to the official PowerShell documentation on
[Types.ps1xml][26] and [Format.ps1xml][27]. You can get IntelliSense features when authoring
`.ps1xml` files by installing the [XML extension by Red Hat][28]. After installing, add this
configuration to your user settings:

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

This tells the XML extension to use the official XML schemas from the PowerShell repository for all
`.ps1xml` files. This enables the following features in `ps1xml` files:

- Syntax error reporting
- Schema validation
- Tag and attribute completion
- Auto-close tags
- Symbol highlighting
- Document folding
- Document symbols and outline
- Renaming support
- Document Formatting

## Example scripts

Example scripts are included with the extension and can be found at the following path.

`~/.vscode/extensions/ms-vscode.PowerShell-<version>/examples`

To open or view the examples in VS Code, run the following from your PowerShell command prompt:

```powershell
code (Get-ChildItem ~\.vscode\extensions\ms-vscode.PowerShell-*\examples)[-1]
```

You can also open the examples from the Command Palette (`kb(workbench.action.showCommands)`) with
the **PowerShell: Open Examples Folder** command.

![Open PowerShell Examples][29]

## Additional resources

More detailed documentation can be found in the PowerShell documentation. Start with
[Using VS Code][30].

Check out the [troubleshooting guide][31] for answers to common questions.

For more information on debugging, check out the _Hey, Scripting Guy!_ two-part blog post series
written by [@keithHill][32] on debugging with the PowerShell extension:

- [Debugging PowerShell script in Visual Studio Code - Part 1][33]
- [Debugging PowerShell script in Visual Studio Code - Part 2][34]

<!-- link references -->
[1]: https://learn.microsoft.com/powershell/
[2]: https://learn.microsoft.com/dotnet
[3]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell
[4]: vscode:extension/ms-vscode.PowerShell
[5]: vscode:extension/ms-vscode.PowerShell-Preview
[6]: vscode:extension/ms-vscode.PowerShell
[7]: images/powershell/PowerShellExtension.png
[8]: /insiders
[9]: /docs/editor/debugging.md
[10]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode#debugging-with-visual-studio-code
[11]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode#choosing-a-version-of-powershell-to-use-with-the-extension
[12]: https://marketplace.visualstudio.com/items/ms-vscode.PowerShell/changelog
[13]: images/powershell/pesterCodeLens.png
[14]: images/powershell/codeLensPesterSymbol.gif
[15]: images/powershell/codeLensFuncRef.gif
[16]: https://learn.microsoft.com/powershell/utility-modules/psscriptanalyzer/overview
[17]: images/powershell/pssaExtensionSetting.png
[18]: https://pester.dev/
[19]: https://pester.dev/docs/introduction/installation
[20]: https://github.com/PowerShell/Plaster
[22]: images/powershell/cpPlasterCommand.png
[23]: /docs/getstarted/settings.md
[24]: images/powershell/codeGear.png
[25]: /docs/getstarted/settings.md
[26]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_types.ps1xml
[27]: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_format.ps1xml
[28]: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml
[29]: images/powershell/pwshExamples.png
[30]: https://learn.microsoft.com/powershell/scripting/dev-cross-plat/vscode/using-vscode
[31]: https://github.com/PowerShell/vscode-powershell/blob/main/docs/troubleshooting.md#troubleshooting-powershell-extension-issues
[32]: https://twitter.com/r_keith_hill
[33]: https://devblogs.microsoft.com/scripting/debugging-powershell-script-in-visual-studio-code-part-1/
[34]: https://devblogs.microsoft.com/scripting/debugging-powershell-script-in-visual-studio-code-part-2/
