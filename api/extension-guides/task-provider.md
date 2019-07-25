---
# DO NOT TOUCH — Managed by doc writer
ContentId: 49744351-83ef-4ef6-99e7-2485e6e9c79f
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to contribute tasks to Visual Studio Code through an extension (plug-in).
---

# Task Provider

Users normally define [tasks](/docs/editor/tasks) in Visual Studio Code in a `tasks.json` file. However, there are some tasks during software development that can be automatically detected by a VS Code extension with a Task Provider. When the **Tasks: Run Task** command is run from VS Code, all active Task Providers contribute tasks that the user can run. While the `tasks.json` file lets the user manually define a task for a specific folder or workspace, a Task Provider can detect details about a workspace and then automatically create a corresponding VS Code Task. For example, a Task Provider could check if there is a `make` file and create a build task. This topic describes how extensions can auto-detect and provide tasks to end-users.

This guide teaches you how to build a Task Provider that auto-detects tasks defined in [Rakefiles](https://ruby.github.io/rake/). The complete source code is at: https://github.com/Microsoft/vscode-extension-samples/tree/master/task-provider-sample.

## Task Definition

To uniquely identify a task in the system, an extension contributing a task needs to define the properties that identify a task. In the Rake example, the task definition looks like this:

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

This contributes a task definition for `rake` tasks. The task definition has two attributes `task` and `file`. `task` is the name of the Rake task and `file` points to the `Rakefile` that contains the task. The `task` property is required, the `file` property is optional. If the `file` attribute is omitted, the `Rakefile` in the root of the workspace folder is used.

## Task provider

Analogous to language providers that let extensions support code completion, an extension can register a task provider to compute all available tasks. This is done using the `vscode.tasks` namespace as shown in the following code snippet:

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

The `resolveTask` method returns `undefined` and is currently not called by VS Code. It is there to optimize task loading in the future.

The `getRakeTasks` implementation does the following:

- Lists all rake tasks defined in a `Rakefile` using the `rake -AT -f Rakefile` command.
- Parses the stdio output.
- For every listed task, creates a `vscode.Task` implementation.

Since a Rake task instantiation needs a task definition as defined in the `package.json` file, VS Code also defines the structure using a TypeScript interface like this:

```typescript
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

Assuming that the output comes from a task called `compile`, the corresponding task creation then looks like this:

```typescript
let task = new vscode.Task(
  { type: 'rake', task: 'compile' },
  'compile',
  'rake',
  new vscode.ShellExecution('rake compile')
);
```

For every task listed in the output, a corresponding VS Code task is created using the above pattern and then returns the array of all tasks from the `getRakeTasks` call.

The `ShellExecution` executes the `rake compile` command in the shell that is specific for the OS (for example under Windows the command would be executed in PowerShell, under Ubuntu it'd be executed in bash). If the task should directly execute a process (without spawning a shell), `vscode.ProcessExecution` can be used. `ProcessExecution` has the advantage that the extension has full control over the arguments passed to the process. Using `ShellExecution` makes use of the shell command interpretation (like wildcard expansion under bash). If the `ShellExecution` is created with a single command line, then the extension needs to ensure proper quoting and escaping (for example to handle whitespace) inside the command.
