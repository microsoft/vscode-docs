---
Order: 13
Area: python
TOCTitle: Settings Reference
ContentId: d256dc5c-95e9-4c02-a82f-947bf34a3517
PageTitle: Settings Reference for Python
DateApproved: 7/20/2021
MetaDescription: Settings Reference for the Python extension in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Python settings reference

The Python Extension for Visual Studio Code is highly configurable. This page describes the key settings you can work with.

For general information about working with settings in VS Code, refer to [User and workspace settings](/docs/getstarted/settings.md), as well as the [Variables reference](/docs/editor/variables-reference.md) for information about predefined variable support.

## General settings

| Setting<br/>(python.) | Default | Description |
| --- | --- | --- |
| condaPath | `"conda"` | Path to the `conda` executable. |
| defaultInterpreterPath | `"python"` | Path to the default Python interpreter to be used by the Python extension on the first time it loads for a workspace, or the path to a folder containing the Python interpreter. Can use variables like `${workspaceFolder}` and `${workspaceFolder}/.venv`. Using a path to a folder allows anyone working with a project to create an environment in the `.venv` folder as appropriate to their operating system, rather than having to specify an exact platform-dependent path. `settings.json` file can then be included in a source code repository. **Note**: Changes to this setting made after an interpreter has been selected for a workspace will not be applied or considered by the Python extension. As well, the Python extension doesn't automatically add or change this setting.|
| pipenvPath | `"pipenv"` | Path to the pipenv executable to use for activation. |
| disableInstallationCheck | `false` | If set to `true`, disables a warning from the extension if no Python interpreter is installed. On macOS, also disables a warning that appears if you're using the OS-installed Python interpreter. It's generally recommended to install a separate interpreter on macOS. |
| venvFolders | `[]` | Paths to folders where virtual environments are created. Depending on the virtualization tool used, it can be the project itself: `${workspaceFolder}`, or separate folders for all virtual environments located side by side: `.\envs`, `~/.virtualenvs`, and so on. |
| envFile | `"${workspaceFolder}/`<br/>`.env"` | Absolute path to a file containing environment variable definitions. See [Configuring Python environments - environment variable definitions file](/docs/python/environments.md#environment-variable-definitions-file). |
| globalModuleInstallation | `false` | Specifies whether to install packages for the current user only using the `--user` command-line argument (the default), or to install for all users in the global environment (when set to `true`). Ignored when using a virtual environment. For more information on the `--user`argument, see [pip - User Installs](https://pip.pypa.io/en/stable/user_guide/#user-installs). |
| poetryPath | `"poetry"` | Specifies the location of the [Poetry dependency manager](https://poetry.eustace.io/) executable, if installed. The default value `"poetry"` assumes the executable is in the current path. The Python extension uses this setting to install packages when Poetry is available and there's a `poetry.lock` file in the workspace folder. |
| terminal.launchArgs | `[]` | Launch arguments that are given to the Python interpreter when you run a file using commands such as **Python: Run Python File in Terminal**. In the `launchArgs` list, each item is a top-level command-line element that's separated by a space (quoted values that contain spaces are a single top-level element and are thus one item in the list). For example, for the arguments `--a --b --c {"value1" : 1, "value2" : 2}`, the list items should be `["--a", "--b", "--c", "{\"value1\" : 1, \"value2\" : 2}\""]`. Note that Visual Studio code ignores this setting when debugging because it instead uses arguments from your selected debugging configuration in `launch.json`. |
| terminal.executeInFileDir | `false` | Indicates whether to run a file in the file's directory instead of the current folder. |
| terminal.activateEnvironment | `true` | Indicates whether to automatically activate the environment you select using the **Python: Select Interpreter** command when a new terminal is created. For example, when this setting is `true` and you select a virtual environment, the extension automatically runs the environment's *activate* command when creating a new terminal (`source env/bin/activate` on macOS/Linux; `env\scripts\activate` on Windows). |
| terminal.activateEnvInCurrentTerminal | `false` | Specifies whether to activate the currently open terminal when the Python extension is activated, using the virtual environment selected. |
| logging.level| `error` | Specifies the level of logging to be performed by the extension. The possible levels of logging, in increasing level of information provided, are `off`, `error`, `warn`, `info`, and `debug`. When set to `off`, which is not recommended, basic information will still be shown such as startup information and commands run by the Python extension. At the `error` level, basic information and errors will be shown. At the `warn` level, basic, error, and warning information will be shown. At the `info` level, basic, error, warning, and additional information like method execution times and return values will be shown. At this time, the `debug` level doesn't display additional information. |
| insidersChannel | `off` | Specifies whether to participate in the Insiders program and the channel to use. Set to `weekly` or `daily` to automatically download and install the latest Insiders builds of the Python extension, which include upcoming features and bug fixes. |

## Workspace symbol (tags) settings

Workspace symbols are symbols in C source code generated by the ctags tool (described on [Wikipedia](https://en.wikipedia.org/wiki/Ctags) and on [ctags.sourceforge.net](http://ctags.sourceforge.net/ctags.html)). To quote Wikipedia, ctags "generates an index (or tag) file of names found in source and header files of various programming languages." Where Python is concerned, ctags makes it easier to jump to defined functions and other symbols in C/C++ extension modules.

| Setting<br/>(python.workspaceSymbols.) | Default | Description |
| --- | --- | --- |
| tagFilePath | `"${workspaceFolder}/`<br/>`.vscode/tags"` | Fully qualified path to tag file (an exuberant ctag file), used to provide workspace symbols. |
| enabled | `true` | Specifies whether to enable the Workspace Symbol provider. |
| rebuildOnStart | `true` | Specifies whether to rebuild the tags file on start. |
| rebuildOnFileSave | `true` | Specifies whether to rebuild the tags file on when saving a Python file. |
| ctagsPath | `"ctags"` | Fully qualified path to the ctags executable; default value assumes it's in the current environment. |
| exclusionPatterns | `["**/site-packages/**"]` | Pattern used to exclude files and folders from ctags. |

## Code analysis settings

### IntelliSense engine settings

> **Note:** If you have never changed your language server setting, your language server is set to Pylance via the “Default” setting value.

| Setting<br/>(python.) | Default | Description |
| --- | --- | --- |
| languageServer | Default | Defines type of the language server (Default, [Pylance](https://devblogs.microsoft.com/python/announcing-pylance-fast-feature-rich-language-support-for-python-in-visual-studio-code/), Microsoft, Jedi, None).|

### Python Language Server settings

#### Pylance Language Server

The language server settings apply when `python.languageServer` is `Pylance` or `Default`. If you have difficulties with the language server, see [Troubleshooting](https://github.com/microsoft/pylance-release/blob/main/TROUBLESHOOTING.md) in the language server repository.

| Setting<br/>(python.analysis.) | Default | Description |
| --- | --- | --- |
| typeCheckingMode | off | Specifies the level of type checking analysis to perform. Available values are `off`, `basic`, and `strict`. When set to `off` no type checking analysis is conducted; unresolved imports/variables diagnostics are produced. When set to `basic` non-type checking-related rules (all rules in `off`), as well as basic type checking rules are used. When set to `strict` all type checking rules at the highest severity of error (including all rules in `off` and `basic` categories) are used. |
| diagnosticMode | openFilesOnly | Specifies what code files the language server analyzes for problems. Available values are `workspace` and `openFilesOnly`. |
| stubPath | ./typings | Specifies a path to a directory that contains custom type stubs. Each package's type stub file(s) are expected to be in its own subdirectory. |
| autoSearchPaths | true | Indicates whether to automatically add search paths based on some predefined names (like `src`). Available values are `true` and `false`. |
| extraPaths | [] | Specifies extra search paths for import resolution. Paths should be specified as strings and must be separated by commas when there are multiple paths. `["path 1","path 2"]` |
| completeFunctionParens | false | Adds parentheses to function completions. Accepted values are `true` and `false`. |
| useLibraryCodeForTypes | true | Parses the source code for a package when a typestub is not found. Available values are `true` and `false`. |
| autoImportCompletion | true | Controls the offering of auto-imports in completions. Available values are `true` and `false`. |
| diagnosticSeverityOverrides | {} | Allows a user to override the severity levels for individual diagnostics. For each rule, the available severity levels are `error` (red squiggle), `warning` (yellow squiggle), `information` (blue squiggle), and `none` (rule disabled). For information about the keys to use for the diagnostic severity rules, see the **Diagnostic severity rules** section below. |

> **Note:** Similar to the core Python extension, Pylance has an Insiders program that offers early access to new features and improvements. To enable the Insiders program, set `pylance.insidersChannel` to `daily`. This setting enables a daily check for new builds. At startup or when the Insiders setting is changed, Pylance will automatically update and prompt you to reload. To leave the Insiders program, just remove the setting, or explicitly set it to `off` instead. You might be prompted to downgrade your extension to the latest stable version.

**Diagnostic severity rules**

This section details all the available rules that can be customized using the `python.analysis.diagnosticSeverityOverrides` setting as shown in the following example.

```json
{
    "python.analysis.diagnosticSeverityOverrides": {
        "reportUnboundVariable": "information",
        "reportImplicitStringConcatenation": "warning"
    }
}
```

| Value | Description |
| --- | ---|
| reportGeneralTypeIssues | Diagnostics for general type inconsistencies, unsupported operations, argument/parameter mismatches, etc. This covers all of the basic type-checking rules not covered by other rules. It does not include syntax errors.  |
| reportPropertyTypeMismatch | Diagnostics for properties where the type of the value passed to the setter is not assignable to the value returned by the getter. Such mismatches violate the intended use of properties, which are meant to act like variables. |
| reportPropertyTypeMismatch | Diagnostics for member accesses on functions.  |
| reportMissingImports | Diagnostics for imports that have no corresponding imported python file or type stub file.  |
| reportMissingModuleSource | Diagnostics for imports that have no corresponding source file. This happens when a type stub is found, but the module source file was not found, indicating that the code may fail at runtime when using this execution environment. Type checking will be done using the type stub. |
| reportMissingTypeStubs | Diagnostics for imports that have no corresponding type stub file (either a typeshed file or a custom type stub). The type checker requires type stubs to do its best job at analysis. |
| reportImportCycles | Diagnostics for cyclical import chains. These are not errors in Python, but they do slow down type analysis and often hint at architectural layering issues. Generally, they should be avoided. |
| reportUnusedImport | Diagnostics for an imported symbol that is not referenced within that file. |
| reportUnusedClass | Diagnostics for a class with a private name (starting with an underscore) that is not accessed. |
| reportUnusedFunction | Diagnostics for a function or method with a private name (starting with an underscore) that is not accessed. |
| reportUnusedVariable | Diagnostics for a variable that is not accessed. |
| reportDuplicateImport | Diagnostics for an imported symbol or module that is imported more than once. |
| reportWildcardImportFromLibrary | Diagnostics for a wildcard import from an external library. |
| reportOptionalSubscript | Diagnostics for an attempt to subscript (index) a variable with an Optional type. |
| reportOptionalMemberAccess | Diagnostics for an attempt to access a member of a variable with an Optional type. |
| reportOptionalCall | Diagnostics for an attempt to call a variable with an Optional type. |
| reportOptionalIterable | Diagnostics for an attempt to use an Optional type as an iterable value (e.g. within a for statement). |
| reportOptionalContextManager | Diagnostics for an attempt to use an Optional type as a context manager (as a parameter to a with statement). |
| reportOptionalOperand | Diagnostics for an attempt to use an Optional type as an operand to a binary or unary operator (like '+', '==', 'or', 'not'). |
| reportUntypedFunctionDecorator | Diagnostics for function decorators that have no type annotations. These obscure the function type, defeating many type analysis features.  |
| reportUntypedClassDecorator | Diagnostics for class decorators that have no type annotations. These obscure the class type, defeating many type analysis features. |
| reportUntypedBaseClass | Diagnostics for base classes whose type cannot be determined statically. These obscure the class type, defeating many type analysis features.  |
| reportUntypedNamedTuple | Diagnostics when “namedtuple” is used rather than “NamedTuple”. The former contains no type information, whereas the latter does. |
| reportPrivateUsage | Diagnostics for incorrect usage of private or protected variables or functions. Protected class members begin with a single underscore `_` and can be accessed only by subclasses. Private class members begin with a double underscore but do not end in a double underscore and can be accessed only within the declaring class. Variables and functions declared outside of a class are considered private if their names start with either a single or double underscore, and they cannot be accessed outside of the declaring module. |
| reportConstantRedefinition | Diagnostics for attempts to redefine variables whose names are all-caps with underscores and numerals. |
| reportIncompatibleMethodOverride | Diagnostics for methods that override a method of the same name in a base class in an incompatible manner (wrong number of parameters, incompatible parameter types, or incompatible return type). |
| reportIncompatibleVariableOverride | Diagnostics for class variable declarations that override a symbol of the same name in a base class with a type that is incompatible with the base class symbol type.  |
| reportInvalidStringEscapeSequence | Diagnostics for invalid escape sequences used within string literals. The Python specification indicates that such sequences will generate a syntax error in future versions. |
| reportUnknownParameterType | Diagnostics for input or return parameters for functions or methods that have an unknown type. |
| reportUnknownArgumentType | Diagnostics for call arguments for functions or methods that have an unknown type. |
| reportUnknownLambdaType | Diagnostics for input or return parameters for lambdas that have an unknown type. |
| reportUnknownVariableType | Diagnostics for variables that have an unknown type. |
| reportUnknownMemberType | Diagnostics for class or instance variables that have an unknown type. |
| reportMissingTypeArgument | Diagnostics for when a generic class is used without providing explicit or implicit type arguments. |
| reportInvalidTypeVarUse | Diagnostics for improper use of type variables in a function signature. |
| reportCallInDefaultInitializer | Diagnostics for function calls within a default value initialization expression. Such calls can mask expensive operations that are performed at module initialization time. |
| reportUnnecessaryIsInstance | Diagnostics for 'isinstance' or 'issubclass' calls where the result is statically determined to be always true or always false. Such calls are often indicative of a programming error.  |
| reportUnnecessaryCast | Diagnostics for 'cast' calls that are statically determined to be unnecessary. Such calls are sometimes indicative of a programming error. |
| reportAssertAlwaysTrue | Diagnostics for 'assert' statement that will probably always assert. This can be indicative of a programming error.  |
| reportSelfClsParameterName | Diagnostics for a missing or misnamed “self” parameter in instance methods and “cls” parameter in class methods. Instance methods in metaclasses (classes that derive from “type”) are allowed to use “cls” for instance methods. |
| reportImplicitStringConcatenation | Diagnostics for two or more string literals that follow each other, indicating an implicit concatenation. This is considered a bad practice and often masks bugs such as missing commas. |
| reportUndefinedVariable | Diagnostics for undefined variables. |
| reportUnboundVariable | Diagnostics for unbound and possibly unbound variables.  |
| reportInvalidStubStatement | Diagnostics for statements that should not appear within a stub file. |
| reportUnusedCallResult | Diagnostics for call expressions whose results are not consumed and are not None. |
| reportUnsupportedDunderAll | Diagnostics for unsupported operations performed on `__all__`. |
| reportUnusedCoroutine | Diagnostics for call expressions that return a Coroutine and whose results are not consumed. |

#### Jedi Language Server

The language server settings apply when `python.languageServer` is `Jedi`.
| Setting | Default | Description |
| --- | --- | --- |
| jediPath | `""` | Path to folder containing the Jedi library (folder should contain a `jedi` subfolder). |
| jediMemoryLimit | 0 | Memory limit for the Jedi completion engine in megabytes. Zero (the default) means 1024 MB. -1 disables the memory limit check. |

#### Microsoft Python Language Server

The language server settings apply when `python.languageServer` is `Microsoft`. If you have any difficulties with the language server, see [Troubleshooting](https://github.com/microsoft/python-language-server/blob/master/TROUBLESHOOTING.md) in the language server repository.

| Setting<br/>(python.analysis.) | Default | Description |
| --- | --- | --- |
| diagnosticPublishDelay | `1000` | The number of milliseconds to wait before transferring diagnostic messages to the problems list. |
| disabled<br/>errors<br/>warnings<br/>information | `[]` | List of diagnostics messages to suppress or show as errors, warnings, or information. See below for applicable values. The classification of messages affects both what's shown in the Problems window and in the editor (such as the color of the underlining). |
| logLevel | `"Error"` | Defines the types of log messages that language server writes into the Problems window, one of "Error", "Warning", "Information", and "Trace". The "Warning" level implicitly includes "Error"; "Information" implicitly includes "Warning" and "Error"; "Trace" includes all messages. |
| openFilesOnly | `true` | When true, shows only errors and warnings for open files rather than for the entire workspace. |
| symbolsHierarchyDepthLimit | `10` | Limits the depth of the symbol tree in the document outline. |
| typeshedPaths | `[]` | Paths to look for [typeshed modules](https://github.com/python/typeshed/) on GitHub. |

The `disabled`, `errors`, `warnings`, and `information` settings can contain the following values:

| Value | Default type | Description or message text |
| --- | --- | --- |
| inherit-non-class | Warning | Attempted to inherit something that is not a class. |
| too-many-function-arguments | Warning | Too many arguments have been provided to a function call. |
| too-many-positional-arguments-before-star | Warning | Too many arguments have been provided before a starred argument. |
| no-cls-argument | Warning | First parameter in a class method must be cls. |
| no-method-argument | Warning | Method has no arguments. |
| no-self-argument | Warning | First parameter in a method must be self. |
| parameter-already-specified | Warning | An argument with this name has already been specified. |
| parameter-missing | Warning | A required positional argument is missing. |
| positional-argument-after-keyword | Warning | A positional argument has been provided after a keyword argument. |
| positional-only-named | Warning | A positional-only argument (3.8+) has been named in a function call. |
| return-in-init | Warning | Encountered an explicit return in `__init__` function. |
| typing-generic-arguments | Warning | An error occurred while constructing `Generic`. |
| typing-typevar-arguments | Warning | An error occurred while constructing `TypeVar`. |
| typing-newtype-arguments | Warning| An error occurred while constructing `NewType`. |
| unknown-parameter-name | Warning | The keyword argument name provided is unknown. |
| unresolved-import | Warning | An import cannot be resolved, and may be missing.|
| undefined-variable | Warning | A variable has been used that has not yet been defined.|
| variable-not-defined-globally | Warning | A variable is not defined in the global scope. |
| variable-not-defined-nonlocal | Warning | A variable is not defined in non-local scopes. |

To suppress the "undefined-variable" messages, for example, use the setting `"python.analysis.disabled": ["undefined-variable"]`. To suppress those messages and "too-many-function-arguments" messages as well, use the setting `"python.analysis.disabled": ["undefined-variable", "too-many-function-arguments"]`. You can similarly set `"python.analysis.errors"`, `"python.analysis.warnings"`, and `"python.analysis.information"` to control the visibility and severity of the diagnostics.

## AutoComplete settings

| Setting<br/>(python.autoComplete.) | Default | Description | See also |
| --- | --- | --- | --- |
| addBrackets | `false` | Specifies whether VS Code automatically adds parentheses (`()`) when autocompleting a function name. | [Editing](/docs/python/editing.md#autocomplete-and-intellisense) |
| extraPaths | `[]` | Specifies locations of additional packages for which to load autocomplete data. | [Editing](/docs/python/editing.md#autocomplete-and-intellisense) |

## Formatting settings

| Setting<br/>(python.formatting.) | Default | Description | See also |
| --- | --- | --- | --- |
| provider | `"autopep8"` | Specifies the formatter to use, either "autopep8", "black", or "yapf". |[Editing - Formatting](/docs/python/editing.md#formatting) |
| autopep8Path | `"autopep8"` | Path to autopep8 | [Editing - Formatting](/docs/python/editing.md#formatting) |
| autopep8Args| `[]` | Arguments for autopep8, where each top-level element that's separated by a space is a separate item in the list. | [Editing - Formatting](/docs/python/editing.md#formatting) |
| blackPath | `"black"` | Path to black | [Editing - Formatting](/docs/python/editing.md#formatting) |
| blackArgs| `[]` | Arguments for black, where each top-level element that's separated by a space is a separate item in the list. | [Editing - Formatting](/docs/python/editing.md#formatting) |
| yapfPath | `"yapf"` | Path to yapf | [Editing - Formatting](/docs/python/editing.md#formatting) |
| yapfArgs| `[]` | Arguments for yapf, where each top-level element that's separated by a space is a separate item in the list. | [Editing - Formatting](/docs/python/editing.md#formatting) |

## Refactoring - Sort Imports settings

| Setting<br/>(python.sortImports.) | Default | Description | See also |
| --- | --- | --- | --- |
| path | `""` | Path to isort script | [Editing - Refactoring - Sort Imports](/docs/python/editing.md#sort-imports) |
| args | `[]` | Arguments for isort, each argument as a separate item in the array. | [Editing - Refactoring - Sort Imports](/docs/python/editing.md#sort-imports) |

## Linting settings

### General

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| enabled | `true` | Specifies whether to enable linting in general. | [Linting](/docs/python/linting.md) |
| lintOnSave | `true` | Specifies whether to line when saving a file. | [Linting](/docs/python/linting.md) |
| maxNumberOfProblems | `100` | Limits the number of linting messages shown. | [Linting](/docs/python/linting.md) |
| ignorePatterns | `[".vscode/*.py", "**/site-packages/**/*.py"]` | Exclude file and folder patterns. | [Linting](/docs/python/linting.md) |

### Pylint

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| pylintEnabled | `true` | Specifies whether to enable Pylint. | [Linting](/docs/python/linting.md) |
| pylintArgs | `[]` | Additional arguments for Pylint, where each top-level element that's separated by a space is a separate item in the list. | [Linting](/docs/python/linting.md) |
| pylintUseMinimalCheckers | `true` | Specifies whether to use the default value for pylintArgs. | [Linting](/docs/python/linting.md) |
| pylintPath | `"pylint"` | The path to Pylint. | [Linting](/docs/python/linting.md) |
| pylintCategorySeverity.convention | `"Information"` | Mapping for Pylint convention message to VS Code type. | [Linting](/docs/python/linting.md) |
| pylintCategorySeverity.refactor | `"Hint"` | Mapping for Pylint refactor message to VS Code type. | [Linting](/docs/python/linting.md) |
| pylintCategorySeverity.warning | `"Warning"` | Mapping for Pylint warning message to VS Code type. | [Linting](/docs/python/linting.md) |
| pylintCategorySeverity.error | `"Error"` | Mapping for Pylint error message to VS Code type. | [Linting](/docs/python/linting.md) |
| pylintCategorySeverity.fatal | `"Error"` | Mapping for Pylint fatal message to VS Code type. | [Linting](/docs/python/linting.md) |

### pycodestyle (pep8)

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| pycodestyleEnabled | `false` | Specifies whether to enable pycodestyle. | [Linting](/docs/python/linting.md) |
| pycodestyleArgs | `[]` | Additional arguments for pycodestyle, where each top-level element that's separated by a space is a separate item in the list. | [Linting](/docs/python/linting.md) |
| pycodestylePath | `"pycodestyle"` | The path to pycodestyle. | [Linting](/docs/python/linting.md) |
| pycodestyleCategorySeverity.W | `"Warning"` | Mapping for pycodestyle W message to VS Code type.| [Linting](/docs/python/linting.md) |
| pycodestyleCategorySeverity.E | `"Error"` | Mapping for pycodestyle E message to VS Code type.| [Linting](/docs/python/linting.md) |

### Flake8

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| flake8Enabled | `false` | Specifies whether to enable flake8. | [Linting](/docs/python/linting.md) |
| flake8Args | `[]` | Additional arguments for flake8, where each top-level element that's separated by a space is a separate item in the list. | [Linting](/docs/python/linting.md) |
| flake8Path | `"flake8"` | The path to flake8. | [Linting](/docs/python/linting.md) |
| flake8CategorySeverity.F | `"Error"` | Mapping for flake8 F message to VS Code type.| [Linting](/docs/python/linting.md) |
| flake8CategorySeverity.E | `"Error"` | Mapping for flake8 E message to VS Code type.| [Linting](/docs/python/linting.md) |
| flake8CategorySeverity.W | `"Warning"` | Mapping for flake8 W message to VS Code type.| [Linting](/docs/python/linting.md) |

### mypy

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| mypyEnabled | `false` | Specifies whether to enable mypy. | [Linting](/docs/python/linting.md) |
| mypyArgs | `["--ignore-missing-imports", "--follow-imports=silent"]` | Additional arguments for mypy, where each top-level element that's separated by a space is a separate item in the list. |[Linting](/docs/python/linting.md) |
| mypyPath | `"mypy"` | The path to mypy. | [Linting](/docs/python/linting.md) |
| mypyCategorySeverity.error | `"Error"` | Mapping for mypy error message to VS Code type. | [Linting](/docs/python/linting.md) |
| mypyCategorySeverity.note | `"Information"` | Mapping for mypy note message to VS Code type. | [Linting](/docs/python/linting.md) |

### pydocstyle

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| pydocstyleEnabled | `false` | Specifies whether to enable pydocstyle. | [Linting](/docs/python/linting.md) |
| pydocstyleArgs | `[]` | Additional arguments for pydocstyle, where each top-level element that's separated by a space is a separate item in the list. | [Linting](/docs/python/linting.md) |
| pydocstylePath | `"pydocstyle"` | The path to pydocstyle. | [Linting](/docs/python/linting.md) |

### prospector

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| prospectorEnabled | `false` | Specifies whether to enable prospector. | [Linting](/docs/python/linting.md) |
| prospectorArgs | `[]` | Additional arguments for prospector, where each top-level element that's separated by a space is a separate item in the list. | [Linting](/docs/python/linting.md) |
| prospectorPath | `"prospector"` | The path to prospector. | [Linting](/docs/python/linting.md) |

### pylama

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| pylamaEnabled | `false` | Specifies whether to enable pylama. | [Linting](/docs/python/linting.md) |
| pylamaArgs | `[]` | Additional arguments for pylama, where each top-level element that's separated by a space is a separate item in the list.  | [Linting](/docs/python/linting.md) |
| pylamaPath | `"pylama"` | The path to pylama. | [Linting](/docs/python/linting.md) |

## Testing settings

### General settings

| Setting<br/>(python.testing.) | Default | Description | See also |
| --- | --- | --- | --- |
| cwd | null | Specifies an optional working directory for tests. | [Testing](/docs/python/testing.md) |
| promptToConfigure | `true` | Specifies whether VS Code prompts to configure a test framework if potential tests are discovered. | [Testing](/docs/python/testing.md)  |
| debugPort | `3000` | Port number used for debugging of unittest tests. | [Testing](/docs/python/testing.md) |
  autoTestDiscoverOnSaveEnabled | `true` | Specifies whether to enable or disable auto run test discovery when saving a test file. | [Testing](/docs/python/testing.md) |

### unittest framework

| Setting<br/>(python.testing.) | Default | Description | See also |
| --- | --- | --- | --- |
| unittestEnabled | `false` | Specifies whether unittest is enabled for testing. | [Testing](/docs/python/testing.md)  |
| unittestArgs | `["-v", "-s", ".", "-p", "*test*.py"]` | Arguments to pass to unittest, where each top-level element that's separated by a space is a separate item in the list. | [Testing](/docs/python/testing.md) |

### pytest framework

| Setting<br/>(python.testing.) | Default | Description | See also |
| --- | --- | --- | --- |
| pytestEnabled | `false` | Specifies whether pytest is enabled for testing. | [Testing](/docs/python/testing.md) |
| pytestPath | `"pytest"` | Path to pytest. Use a full path if pytest is located outside the current environment. | [Testing](/docs/python/testing.md) |
| pytestArgs | `[]` | Arguments to pass to pytest, where each top-level element that's separated by a space is a separate item in the list. When debugging tests with pytest-cov installed, include `--no-cov` in these arguments. | [Testing](/docs/python/testing.md) |

### Nose framework

| Setting<br/>(python.testing.) | Default | Description | See also |
| --- | --- | --- | --- |
| nosetestsEnabled | `false` | Specifies whether Nose  is enabled for testing. | [Testing](/docs/python/testing.md) |
| nosetestPath | `"nosetests"` | Path to Nose. Use a full path if pytest is located outside the current environment. | [Testing](/docs/python/testing.md) |
| nosetestArgs | `[]` | Arguments to pass to Nose, where each top-level element that's separated by a space is a separate item in the list. | [Testing](/docs/python/testing.md) |

## Predefined variables

The Python extension settings support predefined variables. Similar to the general VS Code settings, variables use the **${variableName}** syntax. Specifically, the extension supports the following variables:

- **${cwd}** - the task runner's current working directory on startup
- **${workspaceFolder}** - the path of the folder opened in VS Code
- **${workspaceRootFolderName}** - the name of the folder opened in VS Code without any slashes (/)
- **${workspaceFolderBasename}** - the name of the folder opened in VS Code without any slashes (/)
- **${file}** - the current opened file
- **${relativeFile}** - the current opened file relative to `workspaceFolder`
- **${relativeFileDirname}** - the current opened file's dirname relative to `workspaceFolder`
- **${fileBasename}** - the current opened file's basename
- **${fileBasenameNoExtension}** - the current opened file's basename with no file extension
- **${fileDirname}** - the current opened file's dirname
- **${fileExtname}** - the current opened file's extension

- **${lineNumber}** - the current selected line number in the active file
- **${selectedText}** - the current selected text in the active file
- **${execPath}** - the path to the running VS Code executable

For additional information about predefined variables and example usages, see the [Variables reference](/docs/editor/variables-reference.md) in the general VS Code docs.

## Next steps

- [Python environments](/docs/python/environments.md) - Control which Python interpreter is used for editing and debugging.
- [Editing code](/docs/python/editing.md) - Learn about autocomplete, IntelliSense, formatting, and refactoring for Python.
- [Linting](/docs/python/linting.md) - Enable, configure, and apply a variety of Python linters.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
