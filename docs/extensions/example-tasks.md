---
Order: 5
Area: extensions
TOCTitle: Example-Tasks
ContentId: 49744351-83ef-4ef6-99e7-2485e6e9c79f
PageTitle: Contributing Tasks to Visual Studio Code
DateApproved: 8/12/2018
MetaDescription: Learn how to contribute tasks to Visual Studio Code.
---

# Example - Tasks

Usually user define tasks in the `tasks.json` file. However there are quite some task during software developement that can be autodetected by the tool and instead of the user defining the tasks that task can be created by an extension.

The following description is based on the [Rake task provider example](https://github.com/Microsoft/vscode-extension-samples/tree/master/task-provider-sample)

## Task Definition

To uniquely idientify a task in the system an extension contributing a task needs to define the properties that identify a task. In the Rake example the task definition looks like this:

```json
"taskDefinitions": [
	{
		"type": "rake",
		"required": [
			"task"
		],
		"properties": {
			"task": {
				"type": "string",
				"description": "The Rake task to customize"
			},
			"file": {
				"type": "string",
				"description": "The Rake file that provides the task. Can be omitted."
			}
		}
	}
]
```

This contributes a task definition for `rake` tasks. If defines that the task definition has two attributes `task` and `file`. `task` is the name of the Rake task and `file` points to the Rake file that contains the task. The `task` property is required, the `file` property is optional. If omitted the rake file in the root of the workspace folder is used.

## Task provider

Analogous to language provides for example for code compelete an extension can register a task provider that is call when VS Code needs to compute all available tasks. This is done using the `vscode.tasks` namespace using the following code snippet

```ts
import * as vscode from 'vscode';

let rakePromise: Thenable<vscode.Task[]> | undefined = undefined;
const taskProvider = vscode.tasks.registerTaskProvider('rake', {
	provideTasks: () => {
		if (!rakePromise) {
			rakePromise = getRakeTasks();
		}
		return rakePromise;
	},
	resolveTask(_task: vscode.Task): vscode.Task | undefined {
		return undefined;
	}
});
```

The `resolveTask` currently returns `undefined` and is not called by VS Code. It is there to optimize task loading in the future.

The `getRakeTasks` implementation does the following:

* lists all rake tasks defined in a rake file using the `rake -AT -f Rakefile` command
* parses the stdio output
* for every listed task creates a vscode task implementation.

Since a Rake task instantiation needs a task definition as definied in the package.json file we also define the structure using a TypeScript interface like this:

```TypeScript
interface RakeTaskDefinition extends vscode.TaskDefinition {

	/**
	 * The task name
	 */
	task: string;

	/**
	 * The rake file containing the task
	 */
	file?: string;
}
```

Assuming that the output listed a task `compile` the corresponding task creation then looks like this:

```TypeScript
let task = new vscode.Task({ type: 'rake', task: 'compile' }, 'compile', 'rake', new vscode.ShellExecution('rake compile'));
```

For every task listed in the output the code creates a corresponding VS Code task using the above pattern and then returns the array of all task from the `getRakeTasks` call.

The `ShellExecution` execute the `rake compile` command in the shell that is specific for the OS (for example under Windows the command would be executed in PowerShell under Ubuntu in bash). If the task should directly execute a process (without spawning a shell) the `vscode.ProcessExecution` can be used. A `ProcessExecution` has the advantage that the extension has full control over the arguments passed to the process. Using a `ShellExecution` makes use of the shell command interpretation (like wildcard expanding under bash). If the `ShellExecution` is created with a single command line then the extension needs in addition ensure proper quoting and escaping (for example for white spaces)inside the command.

