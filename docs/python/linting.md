---
Order: 3
Area: python
TOCTitle: Linting
ContentId: 0ccb0e35-c4b2-4001-91bf-79ff1618f601
PageTitle: Linting Python Code in Visual Studio Code
DateApproved: 10/30/2017
MetaDescription: Linting Python Code in Visual Studio Code
MetaSocialImage: TBD
---

# Linting Python Code in VS Code

By default, linting for Python code is enabled in VS Code using Pylint. Additional linters, along with Pylint, can be enabled and disabled in any combination using their respective settings.

## General linting settings

To change the linting behavior across all enabled linters, modify the following settings:

| Feature | Setting | Default value |
| --- | --- | --- |
| Linting in general | python.linting.enabled | `true` |
| Perform linting without a workspace open | python.linting.enabledWithoutWorkspace | `true` |
| Linting as you type | python.linting.lintOnTextChange | `true` |
| Linting on file save | python.linting.lintOnSave | `false` |
| Maximum number of linting messages | python.linting.maxNumberOfProblems | `100` |
| Output window in which to display messages | python.linting.outputWindow | `"Python"` |
| Exclude file and folder patterns | python.linting.ignorePatterns | `[".vscode/*.py", "**/site-packages/**/*.py"]`  |

## Specific linters

The following table provides a summary of available Python linters and their basic settings. Only Pylint is enabled by default.

Custom arguments can be specified in the appropriate arguments setting for each linter, with each argument given as a separate item in the array.

A custom path is generally unnecessary as the Python extension resolve the path to the linter based on the Python interpreter being used (see [Environments](environments.md)). To use a different version of a linter, specify its path in the appropriate custom path setting.

| Linter | pip install package name | Default state | Enabling setting (true/false) | Arguments setting | Custom path setting |
| --- | --- | --- | --- | --- | --- |
| [Pylint](#pylint) (default) | pylint | Enabled | python.linting.pylintEnabled | python.linting.pylintArgs |python.linting.pylintPath |
| [Pep8](#pep8) | pep8 | Disabled | python.linting.pep8Enabled | python.linting.pep8Args |python.linting.pep8Path |
| [Flake8](#flake8) | flake8 | Disabled | python.linting.flake8Enabled | python.linting.flake8Args |python.linting.flake8Path |
| [mypy](#mypy) | mypy-lang | Disabled | python.linting.mypyEnabled | python.linting.mypyArgs |python.linting.mypyPath |
| pydocstyle | pydocstyle | Disabled | python.linting.pydocstyleEnabled | python.linting.pydocstyleArgs | python.linting.pydocstylePath |
| prospector | prospector | Disabled | python.linting.prospectorEnabled | python.linting.prospectorArgs | python.linting.prospectorPath |
| [pylama] | pylama | Disabled | python.linting.pylamaEnabled | python.linting.pylamaArgs | python.linting.pylamaPath |


The sections that follow provide additional details for those individual linters linked in the table.

### Pylint

#### Command-line arguments and configuration files

See [Pylint command line arguments](https://pylint.readthedocs.io/en/latest/user_guide/run.html#command-line-options) for general switches. Command line arguments can be used to load Pylint plugins, such that that for Django:

```json
"python.linting.pylintArgs": ["--load-plugins", "pylint_django"]
```

Options can also be specified in a `pylintrc` or `.pylintrc` file in the workspace folder, as described on [Pylint command line arguments](https://pylint.readthedocs.io/en/latest/user_guide/run.html#command-line-options).

To control which Pylint messages are shown, add the following contents to an options file:

```
[MESSAGES CONTROL]

# Enable the message, report, category or checker with the given id(s). You can
# either give multiple identifier separated by comma (,) or put this option
# multiple time.
#enable=

# Disable the message, report, category or checker with the given id(s). You
# can either give multiple identifier separated by comma (,) or put this option
# multiple time (only on the command line, not in the configuration file where
# it should appear only once).
# disable=
```


#### Message category mapping

The Python extension maps Pylint message categories to VS Code categories through the following settings. If desired, change the setting to change the mapping.

| Pylint category | Applicable setting | VS Code category mapping |
| --- | --- | --- |
| convention | python.linting.pylintCategorySeverity.convention | Information |
| refactor | python.linting.pylintCategorySeverity.refactor | Hint |
| warning | python.linting.pylintCategorySeverity.warning | Warning |
| error | python.linting.pylintCategorySeverity.error | Error |
| fatal | python.linting.pylintCategorySeverity.fatal | Error |


### Pep8

#### Command-line arguments and configuration files

Pep8 options are read from the `[pep8]` section of a `tox.ini` or `setup.cfg` file located in any parent folder of the path(s) being processed. For details, see [Pep8 Options](http://pep8.readthedocs.org/en/latest/intro.html).

#### Message category mapping

The Python extension maps pep8 message categories to VS Code categories through the following settings. If desired, change the setting to change the mapping.

| Pep8 category | Applicable setting | VS Code category mapping |
| --- | --- | --- |
| W | python.linting.pep8CategorySeverity.W | Warning |
| E | python.linting.pep8CategorySeverity.E | Error |

### Flake8

#### Command-line arguments and configuration files

Flake8 user options are read from the `.flake8` (Windows) or `~/.config/flake8` (Mac/Linux) file.

At the project level, options are read from the `[flake8]` section of a `tox.ini` or `setup.cfg` file. Only the first file is considered. For details, seer [Flake8 Configuration](http://flake8.readthedocs.org/en/latest/config.html).

#### Message category mapping

The Python extension maps flake8 message categories to VS Code categories through the following settings. If desired, change the setting to change the mapping.

| Flake8 category | Applicable setting | VS Code category mapping |
| --- | --- | --- |
| F | python.linting.flake8CategorySeverity.F | Error |
| E | python.linting.flake8CategorySeverity.E | Error |
| W | python.linting.flake8CategorySeverity.W | Warning |


### mypy

#### Message category mapping

The Python extension maps flake8 message categories to VS Code categories through the following settings. If desired, change the setting to change the mapping.

| mypy category | Applicable setting | VS Code category mapping |
| --- | --- | --- |
| error | python.linting.mypyCategorySeverity.error | Error |
| note | python.linting.mypyCategorySeverity.note | Information |


## Troubleshooting linting

| Error message | Cause | Solution |
| --- | --- | --- |
| ... unable to import \<module_name\> | The Python extension is using the wrong version of Pylint. | Enture that the `pythonPath` setting points to a valid Python installation where Pylint is installed. Alternately, set the `python.linting.pylintPath` to an appropriate version of Pylint for the Python interpreter being used. |
| Linting with \<linter\> failed ... | The path to the Python interpreter is incorrect. | Check the `pythonPath` setting (see [Environments](environments.md). |
| | The linter has not been installed in the current Python environment. | Open a command window, navigate to the location of the Python interpreter in the `pythonPath` setting, and run `pip install` for the linter. |
| | The path to the linter is incorrect. | Ensure that the appropriate `python.linting.<linter>Path` setting for the linter is correct. |
| | Custom arguments are defined incorrectly. | Check the appropriate `python.linting.<linter>Args` settings, and that the value of the setting is an array of separate argument items. For example, `"python.linting.pylintPath": "pylint --load-plugins pylint_django"` is incorrect. The correct syntax is `"python.linting.pylintArgs": ["--load-plugins", "pylint_django"]`. |