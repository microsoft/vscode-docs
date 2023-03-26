---
Order: 14
Area: python
TOCTitle: Settings Reference
ContentId: d256dc5c-95e9-4c02-a82f-947bf34a3517
PageTitle: Settings Reference for Python
DateApproved: 3/6/2023
MetaDescription: Settings Reference for the Python extension in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Python settings reference

The Python Extension for Visual Studio Code is highly configurable. This page describes the key settings you can work with.

For general information about working with settings in VS Code, refer to [User and workspace settings](/docs/getstarted/settings.md), as well as the [Variables reference](/docs/editor/variables-reference.md) for information about predefined variable support.

## General Python settings

| Setting<br/>(python.) | Default | Description |
| --- | --- | --- |
| condaPath | `"conda"` | Path to the `conda` executable. |
| defaultInterpreterPath | `"python"` | Path to the default Python interpreter to be used by the Python extension on the first time it loads for a workspace, or the path to a folder containing the Python interpreter. <br> Can use variables like `${workspaceFolder}` and `${workspaceFolder}/.venv`. <br> Using a path to a folder allows anyone working with a project to create an environment in the `.venv` folder as appropriate to their operating system, rather than having to specify an exact platform-dependent path. The `settings.json` file can then be included in a source code repository. <br> **Note**: Changes to this setting made after an interpreter has been selected for a workspace will not be applied or considered by the Python extension. The Python extension doesn't automatically add or change this setting.|
| interpreter.infoVisibility | `"onPythonRelated"` |  Controls when to display the selected interpreter information on the status bar. <br> By default, it only shows when there are Python related files open in the editor. <br> You can set it to `"always"` if you'd like it to always show on the status bar, or `"never"` to hide it entirely. |
| pipenvPath | `"pipenv"` | Path to the pipenv executable to use for activation. |
| venvFolders | `[]` | Paths to folders where virtual environments are created. <br> Depending on the virtualization tool used, it can be the project itself: `${workspaceFolder}`, or separate folders for all virtual environments located side by side: `.\envs`, `~/.virtualenvs`, and so on. |
| envFile | `"${workspaceFolder}/`<br/>`.env"` | Absolute path to a file containing environment variable definitions. <br> See [Configuring Python environments - environment variable definitions file](/docs/python/environments.md#environment-variable-definitions-file). |
| globalModuleInstallation | `false` | Specifies whether to install packages for the current user only using the `--user` command-line argument (the default), or to install for all users in the global environment (when set to `true`). Ignored when using a virtual environment. <br> For more information on the `--user` argument, see [pip - User Installs](https://pip.pypa.io/en/stable/user_guide/#user-installs). |
| poetryPath | `"poetry"` | Specifies the location of the [Poetry dependency manager](https://poetry.eustace.io/) executable, if installed. The default value `"poetry"` assumes the executable is in the current path. <br> The Python extension uses this setting to install packages when Poetry is available and there's a `poetry.lock` file in the workspace folder. |
| terminal.launchArgs | `[]` | Launch arguments that are given to the Python interpreter when you run a file using commands such as **Python: Run Python File in Terminal**.<br> In the `launchArgs` list, each item is a top-level command-line element that's separated by a space (quoted values that contain spaces are a single top-level element and are thus one item in the list). <br> For example, for the arguments `--a --b --c {"value1" : 1, "value2" : 2}`, the list items should be `["--a", "--b", "--c", "{\"value1\" : 1, \"value2\" : 2}\""]`. <br> Note that VS Code ignores this setting when debugging because it instead uses arguments from your selected debugging configuration in `launch.json`. |
| terminal.executeInFileDir | `false` | Indicates whether to run a file in the file's directory instead of the current folder. |
| terminal.activateEnvironment | `true` | Indicates whether to automatically activate the environment you select using the **Python: Select Interpreter** command when a new terminal is created.<br> For example, when this setting is `true` and you select a virtual environment, the extension automatically runs the environment's *activate* command when creating a new terminal (`source env/bin/activate` on macOS/Linux; `env\scripts\activate` on Windows). |
| terminal.activateEnvInCurrentTerminal | `false` | Specifies whether to activate the currently open terminal when the Python extension is activated, using the virtual environment selected. |
| terminal.focusAfterLaunch | `false` | Whether to switch the cursor focus to the terminal when launching a Python terminal. |
| logging.level| `error` | Specifies the level of logging to be performed by the extension.<br> The possible levels of logging, in increasing level of information provided, are `off`, `error`, `warn`, `info`, and `debug`.<br> When set to `off`, which is not recommended, basic information will still be shown such as startup information and commands run by the Python extension.<br> At the `error` level, basic information and errors will be shown.<br> At the `warn` level, basic, error, and warning information will be shown. At the `info` level, basic, error, warning, and additional information like method execution times and return values will be shown. At this time, the `debug` level doesn't display additional information. |
| experiments.enabled | `true` |  Enables [A/B experiments in the Python extension](https://aka.ms/AAjvt9q). If enabled, you may be provided with proposed enhancements and/or features. |

## Code analysis settings

### IntelliSense engine settings

> **Note:** If you have never changed your language server setting, your language server is set to Pylance via the “Default” setting value.

| Setting<br/>(python.) | Default | Description |
| --- | --- | --- |
| languageServer | Default | Defines type of the language server (Default, [Pylance](https://devblogs.microsoft.com/python/announcing-pylance-fast-feature-rich-language-support-for-python-in-visual-studio-code/), Jedi, and None).|

### Python Language Server settings

#### Pylance Language Server

The language server settings apply when `python.languageServer` is `Pylance` or `Default`. If you have difficulties with the language server, see [Troubleshooting](https://github.com/microsoft/pylance-release/blob/main/TROUBLESHOOTING.md) in the language server repository.

| Setting<br/>(python.analysis.) | Default | Description |
| --- | --- | --- |
| typeCheckingMode | off | Specifies the level of type checking analysis to perform. <br> Available values are `off`, `basic`, and `strict`. <br> When set to `off` no type checking analysis is conducted; unresolved imports/variables diagnostics are produced. <br> When set to `basic` non-type checking-related rules (all rules in `off`), as well as basic type checking rules are used. <br> When set to `strict` all type checking rules at the highest severity of error (including all rules in `off` and `basic` categories) are used. |
| diagnosticMode | openFilesOnly | Specifies what code files the language server analyzes for problems. <br> Available values are `workspace` and `openFilesOnly`. |
| include | [] | Paths of directories or files that should be included in analysis. <br> If no paths are specified, Pylance defaults to the directory that contains the workspace root. <br> Paths may contain wildcard characters such as `**` (a directory or multiple levels of directories), `*` (a sequence of zero or more characters), or `?` (a single character). |
| exclude | [] | Paths of directories or files that should not be included in analysis. <br> These override the directories listed under the `python.analysis.include` setting, allowing specific subdirectories to be excluded. <br> Note that files listed in this `exclude` setting may still be included in the analysis if they are referenced/imported by source files that are not in the excluded list. <br> Paths may contain wildcard characters such as `**` (a directory or multiple levels of directories), `*` (a sequence of zero or more characters), or `?` (a single character). <br> If no exclude paths are specified, Pylance automatically excludes the following: `**/node_modules`, `**/\_\_pycache\_\_`, `.git` and any virtual environment directories. |
| ignore | [] | Paths of directories or files whose diagnostic output (errors and warnings) should be suppressed, even if they are an included file or within the transitive closure of an included file. <br> Paths may contain wildcard characters such as `**` (a directory or multiple levels of directories), `*` (a sequence of zero or more characters), or `?` (a single character). <br> If no value is provided, the value of `python.linting.ignorePatterns` (if set) will be used. |
| stubPath | ./typings | Specifies a path to a directory that contains custom type stubs. Each package's type stub file(s) are expected to be in its own subdirectory. |
| autoSearchPaths | true | Indicates whether to automatically add search paths based on some predefined names (like `src`). Available values are `true` and `false`. |
| extraPaths | [] | Specifies extra search paths for import resolution. <br> Accepts paths specified as strings and separated by commas if there are multiple paths. For example: `["path 1","path 2"]`. |
| indexing | true | Used to specify whether Pylance should index user files as well as installed third party libraries at start up, to provide a more complete set of symbols in features such as auto imports, Quick Fixes, auto completions, etc. <br> Accepted values are `true` or `false`. <br> When set to `true`, by default Pylance indexes top-level symbols of installed packages (i.e., symbols in `__all__` under `package/__init__.py`), as well as all symbols from up to 2000 user files. <br> When set to `false`, Pylance will only display symbols already referenced or used in files that were previously opened in or loaded by the editor.    |
| packageIndexDepths | [] |  Used to override how many levels under installed packages to index on a per package basis. <br> By default, only top-level modules are indexed (depth = 1). <br> To index submodules, increase depth by 1 for each level of submodule you want to index. <br> Accepted values are tuples of objects like ```{"name": "package name (str)", "depth": "depth to scan (int)", "includeAllSymbols": "whether to include all symbols (bool)"}```. <br> If `includeAllSymbols` is set to `false`, only symbols in each package's `__all__` are included. When it's set to `true`, Pylance will index every module/top level symbol declarations in the file. <br> Usage example: ```[{"name": "sklearn", "depth": 2, "includeAllSymbols": true}, {"name": "matplotlib", "depth": 3, "includeAllSymbols": false}]``` |
| completeFunctionParens | false | Adds parentheses to function completions. Accepted values are `true` and `false`. |
| useLibraryCodeForTypes | true | Parses the source code for a package when a type stub is not found. Available values are `true` and `false`. |
| autoImportCompletions | false | Controls the offering of auto imports in completions. Available values are `true` and `false`. |
| importFormat | `absolute`| Defines the default format when auto importing modules. Accepted values are `absolute` or `relative`. |
| inlayHints.variableTypes | false | Whether to display inlay hints for variable types. Accepted values are `true` or `false`. |
| inlayHints.functionReturnTypes | false |  Whether to display inlay hints for function return types.  Accepted values are `true` or `false`. |
| inlayHints.pytestParameters | false | Whether to display inlay hints for pytest fixture argument types. Accepted values are `true` or `false`. |
| diagnosticSeverityOverrides | {} | Allows a user to override the severity levels for individual diagnostics. <br> For each rule, the available severity levels are `error` (red squiggle), `warning` (yellow squiggle), `information` (blue squiggle), and `none` (rule disabled). <br> For information about the keys to use for the diagnostic severity rules, see the **Diagnostic severity rules** section below. |
| fixAll | `[]` | A list of code actions to run when running the **Fix All** command or the `source.fixAll` code action. <br> Accepted values in this list: <ul><li> `source.unusedImports`: removes all unused imports in the open file</li> <li> `source.convertImportFormat`: converts the imports according to the `python.analysis.importFormat` setting </li> |
| logLevel | `Error` | Specifies the level of logging to be performed by the language server.<br> The possible levels of logging, in increasing level of information provided, are `Error`, `Warning`, `Information`, and `Trace`.|

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
| reportFunctionMemberAccess | Diagnostics for member accesses on functions.  |
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

## AutoComplete settings

| Setting<br/>(python.autoComplete.) | Default | Description | See also |
| --- | --- | --- | --- |
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

## Linting settings

### General linting

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| enabled | `true` | Specifies whether to enable linting in general. | [Linting](/docs/python/linting.md) |
| lintOnSave | `true` | Specifies whether to lint when saving a file. | [Linting](/docs/python/linting.md) |
| maxNumberOfProblems | `100` | Limits the number of linting messages shown. | [Linting](/docs/python/linting.md) |
| ignorePatterns | `[".vscode/*.py", "**/site-packages/**/*.py"]` | Exclude file and folder patterns. | [Linting](/docs/python/linting.md) |

### Pylint

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| pylintEnabled | `true` | Specifies whether to enable Pylint. | [Linting](/docs/python/linting.md) |
| pylintArgs | `[]` | Additional arguments for Pylint, where each top-level element that's separated by a space is a separate item in the list. | [Linting](/docs/python/linting.md) |
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

### bandit

| Setting<br/>(python.linting.) | Default | Description | See also |
| --- | --- | --- | --- |
| banditEnabled | `false` | Specifies whether to enable bandit. | [Linting](/docs/python/linting.md) |
| banditArgs | `[]` | Additional arguments for bandit, where each top-level element that's separated by a space is a separate item in the list.  | [Linting](/docs/python/linting.md) |
| banditPath | `"bandit"` | The path to bandit. | [Linting](/docs/python/linting.md) |

## Testing settings

### General testing

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
