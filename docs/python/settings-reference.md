---
Order: 8
Area: python
TOCTitle: Settings Reference
ContentId: d256dc5c-95e9-4c02-a82f-947bf34a3517
PageTitle: Settings Reference for Python
DateApproved: 10/26/2017
MetaDescription: Settings Reference for the Python extension in Visual Studio Code
MetaSocialImage: TBD
---

# Python Settings Reference

## General settings

| Setting | Default | Description |
| --- | --- | --- |
| python.pythonPath | `"Python"` | Path to the python interpreter. |
| python.venvPath | `""` | Path to folder with a list of Virtual Environments, such as ~/.pyenv, ~/Envs, ~/.virtualenvs. |
| python.envFile | `"${workspaceRoot}/.env"` | Absolute path to a file containing environment variable definitions. |
| python.terminal.launchArgs | `[]` | Launch arguments given the Python interpreter when running a file. |
| python.terminal.executeInFileDir | `false` | Indicates whether to run a file in the file's directory instead of the current folder. |
| python.jediPath | `""` | Path to folder containing the Jedi library (folder should contain a 'Jedi' subfolder). |


## Workspace symbol (tags) settings

| Setting | Default | Description |
| --- | --- | --- |
| python.workspaceSymbols.tagFilePath | `"${workspaceRoot}/.vscode/tags"` | Fully qualified path to tag file (an exuberant ctag file), used to provide workspace symbols. |
| python.workspaceSymbols.enabled | `true` | Specifies whether to enable the Workspace Symbol provider. |
| python.workspaceSymbols.rebuildOnStart | `true` | Specifies whether to re-build the tags file on start. |
| python.workspaceSymbols.rebuildOnFileSave | `true` | Specifies whether to re-build the tags file on when saving a Python file. |
| python.workspaceSymbols.ctagsPath | `"ctags"` | Fully qualified path to the ctags executable; default value assumes it's in the current environment. |
| python.workspaceSymbols.exclusionPatterns | `["**/site-packages/**"]` | Pattern used to exclude files and folders from [ctags](http://ctags.sourceforge.net/ctags.html). |


## AutoComplete settings

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.autoComplete.addBrackets | `false` | Specifies whether VS Code automatically adds parentheses (`()`)when autocompleting a function name. | [Editing](editing.md#autocomplete-and-intellisense) |
| python.autoComplete.preloadModules | `[]` | Specifies modules to pre-load to improve autocomplete performance. | [Editing](editing.md#autocomplete-and-intellisense) |
| python.autoComplete.extraPaths" | `[]` | Specifies locations of additional packages for which to load autocomplete data. | [Editing](editing.md#autocomplete-and-intellisense) |

## Formatting settings

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.formatting.formatOnSave | `false` | Applies formatting on document save. |[Editing - Formatting](editing.md#formatting) |
| python.formatting.outputWindow | `"Python"` | The name of the output window for formatting messages. |[Editing - Formatting](editing.md#formatting) |
| python.formatting.provider | `"autopep8"` | Specifies the formatter to use, either "autopep8" or "yapf". |[Editing - Formatting](editing.md#formatting) |
| python.formatting.autopep8Path | `"autopep8"` | Path to autopep8 | [Editing - Formatting](editing.md#formatting) |
| python.formatting.autopep8Args| `[]` | Arguments for autopep8, each argument as a separate item in the array. | [Editing - Formatting](editing.md#formatting) |
| python.formatting.yapfPath | `"yapf"` | Path to yapf | [Editing - Formatting](editing.md#formatting) |
| python.formatting.yapfArgs| `[]` | Arguments for yapf, each argument as a separate item in the array. | [Editing - Formatting](editing.md#formatting) |


## Refactoring - Sort Imports settings

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.sortImports.path | `""` | Path to isort script | [Editing - Refactoring - Sort Imports](editing.md#sort-imports) |
| python.sortImports.args | `[]` | Arguments for isort, each argument as a separate item in the array. | [Editing - Refactoring - Sort Imports](editing.md#sort-imports) |

## Linting settings

### General

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.linting.enabled | `true` | Specifies whether the enable linting in general. | [Linting](linting.md) |
| python.linting.enabledWithoutWorkspace | `true` | Specifies whether to perform linting without a workspace open | [Linting](linting.md) |
| python.linting.lintOnTextChange | `true` | Specifies whether to lint as you type. | [Linting](linting.md) |
| python.linting.lintOnSave | `true` | Specifies whether to line when saving a file. | [Linting](linting.md) |
| python.linting.maxNumberOfProblems | `100` | Limits the number of linting messages shown. | [Linting](linting.md) |
| python.linting.outputWindow | `"Python"` | The output window in which to display linting messages. | [Linting](linting.md) |
| python.linting.ignorePatterns | `[".vscode/*.py", "**/site-packages/**/*.py"]` | Exclude file and folder patterns. | [Linting](linting.md) |

### Pylint

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.linting.pylintEnabled | `true` | Specifies whether to enable Pylint. | [Linting](linting.md) |
| python.linting.pylintArgs | `[]` | Additional arguments for Pylint, with each argument given as an item in the array. | [Linting](linting.md) |
| python.linting.pylintPath | `"pylint"` | The path to Pylint. | [Linting](linting.md) |
| python.linting.pylintCategorySeverity.convention | `"Information"` | Mapping for Pylint convention message to VS Code type. | [Linting](linting.md) |
| python.linting.pylintCategorySeverity.refactor | `"Hint"` | Mapping for Pylint refactor message to VS Code type. | [Linting](linting.md) |
| python.linting.pylintCategorySeverity.warning | `"Warning"` | Mapping for Pylint warning message to VS Code type. | [Linting](linting.md) |
| python.linting.pylintCategorySeverity.error | `"Error"` | Mapping for Pylint error message to VS Code type. | [Linting](linting.md) |
| python.linting.pylintCategorySeverity.fatal | `"Error"` | Mapping for Pylint fatal message to VS Code type. | [Linting](linting.md) |


### Pep8

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.linting.pep8Enabled | `false` | Specifies whether to enable Pep8. | [Linting](linting.md) |
| python.linting.pep8Args | `[]` | Additional arguments for Pep8, with each argument given as an item in the array. | [Linting](linting.md) |
| python.linting.pep8Path | `"pep8"` | The path to Pep8. | [Linting](linting.md) |
| python.linting.pep8CategorySeverity.W | `"Warning"` | Mapping for Pep8 W message to VS Code type.| [Linting](linting.md) |
| python.linting.pep8CategorySeverity.E | `"Error"` | Mapping for Pep8 E message to VS Code type.| [Linting](linting.md) |


### Flake8

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.linting.flake8Enabled | `false` | Specifies whether to enable Flake8. | [Linting](linting.md) |
| python.linting.flake8Args | `[]` | Additional arguments for Flake8, with each argument given as an item in the array. | [Linting](linting.md) |
| python.linting.flake8Path | `"flake8"` | The path to Flake8. | [Linting](linting.md) |
| python.linting.flake8CategorySeverity.F | `"Error"` | Mapping for Flake8 F message to VS Code type.| [Linting](linting.md) |
| python.linting.flake8CategorySeverity.E | `"Error"` | Mapping for Flake8 E message to VS Code type.| [Linting](linting.md) |
| python.linting.flake8CategorySeverity.W | `"Warning"` | Mapping for Flake8 W message to VS Code type.| [Linting](linting.md) |


### mypy

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.linting.mypyEnabled | `false` | Specifies whether to enable mypy. | [Linting](linting.md) |
| python.linting.mypyArgs | `["--ignore-missing-imports", "--follow-imports=silent"]` | Additional arguments for mypy, with each argument given as an item in the array. |[Linting](linting.md) |
| python.linting.mypyPath | `"mypy"` | The path to mypy. | [Linting](linting.md) |
| python.linting.mypyCategorySeverity.error | `"Error"` | Mapping for mypy error message to VS Code type. | [Linting](linting.md) |
| python.linting.mypyCategorySeverity.note | `"Information"` | Mapping for mypy note message to VS Code type. | [Linting](linting.md) |


### pydocstyle

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.linting.pydocstyleEnabled | `false` | Specifies whether to enable pydocstyle. | [Linting](linting.md) |
| python.linting.pydocstyleArgs | `[]` | Additional arguments for pydocstyle, with each argument given as an item in the array. | [Linting](linting.md) |
| python.linting.pydocstylePath | `"pydocstyle"` | The path to pydocstyle. | [Linting](linting.md) |


### prospector

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.linting.prospectorEnabled | `false` | Specifies whether to enable prospector. | [Linting](linting.md) |
| python.linting.prospectorArgs | `[]` | Additional arguments for prospector, with each argument given as an item in the array. | [Linting](linting.md) |
| python.linting.prospectorPath | `"prospector"` | The path to prospector. | [Linting](linting.md) |


### pylama

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.linting.pylamaEnabled | `false` | Specifies whether to enable pylama. | [Linting](linting.md) |
| python.linting.pylamaArgs | `[]` | Additional arguments for pylama, with each argument given as an item in the array.  | [Linting](linting.md) |
| python.linting.pylamaPath | `"pylama"` | The path to pylama. | [Linting](linting.md) |



## Jupyter settings

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.promptToInstallJupyter | `true` | Display prompt to install Jupyter Extension. | [Jupyter](jupyter.md) |
| "python.jupyter.appendResults" | `true` | Specifies whether to append the results to results window. When false, results are cleared with each run. | [Jupyter](jupyter.md) |
| "python.jupyter.defaultKernel" | `""` | Default kernel, defaulting to the first available kernel. | [Jupyter](jupyter.md) |
| "python.jupyter.startupCode" | `["%matplotlib inline"]` | The code to run when the kernel starts, where each item in the array is a separate line of code. | [Jupyter](jupyter.md) |


## Unit testing settings

### UnitTest framework

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.unitTest.unittestEnabled | `false` | Specifies whether UnitTest is enabled for unit testing. | [Unit testing](unit-testing.md)  |
| python.unitTest.unittestArgs | `["-v", "-s", ".", "-p", "*test*.py"]` | Arguments to pass to unittest, with each argument specified as an item in the array. See below for a description of the defaults. | [Unit testing](unit-testing.md) |
| python.unitTest.outputWindow | `"Python Test Log"` | The window to use for unit test output. | [Unit testing](unit-testing.md) | [Unit testing](unit-testing.md)  |
| python.unitTest.promptToConfigure | `true` | Specifies whether VS Code prompts to configure a test framework if potential tests are discovered. | [Unit testing](unit-testing.md)  |
| python.unitTest.debugPort | `3000` | Port number used for debugging of UnitTest tests. | [Unit testing](unit-testing.md) |

### PyTest framework

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.unitTest.pyTestEnabled | `false` | Specifies whether PyTest is enabled for unit testing. | [Unit testing](unit-testing.md) |
| python.unitTest.pyTestPath | `"py.test"` | Path to PyTest. Use a full path if PyTest is located outside the current environment. | [Unit testing](unit-testing.md) |
| python.unitTest.pyTestArgs | `[]` | Arguments to pass to PyTest, with each argument specified as an item in the array. | [Unit testing](unit-testing.md) |

### Nose framework

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.unitTest.nosetestsEnabled | `false` | Specifies whether Nose  is enabled for unit testing. | [Unit testing](unit-testing.md) |
| python.unitTest.nosetestPath | `"nosetests"` | Path to Nose. Use a full path if PyTest is located outside the current environment. | [Unit testing](unit-testing.md) |
| python.unitTest.nodetestArgs | `[]` | Arguments to pass to Nose, with each argument specified as an item in the array. | [Unit testing](unit-testing.md) |
