---
TOCTitle: Tasks Appendix
ContentId: 6DCA48F5-0566-4AEB-9C4C-CCBBA2945347
PageTitle: Tasks Appendix
DateApproved: 2/7/2018
MetaDescription: Additional info for using task runners in Visual Studio Code.
---
# Appendix

This is additional information for [tasks](/docs/editor/tasks.md).

## Schema for tasks.json

The following interfaces define the schema of the tasks.json file.

```typescript

interface TaskConfiguration extends BaseTaskConfiguration {

    /**
     * The configuration's version number
     */
    version: "2.0.0";

    /**
     * Windows specific task configuration
     */
    windows?: BaseTaskConfiguration;

    /**
     * Mac specific task configuration
     */
    osx?: BaseTaskConfiguration;

    /**
     * Linux specific task configuration
     */
    linux?: BaseTaskConfiguration;
}

interface BaseTaskConfiguration {

    /**
     * The type of a custom task. Tasks of type "shell" are executed
     * inside a shell (e.g. bash, cmd, powershell, ...)
     */
    type: "shell" | "process";

    /**
     * The command to be executed. Can be an external program or a shell
     * command.
     */
    command: string;

    /**
     * Specifies whether a global command is a background task.
     */
    isBackground?: boolean;

    /**
     * The command options used when the command is executed. Can be omitted.
     */
    options?: CommandOptions;

    /**
     * The arguments passed to the command. Can be omitted.
     */
    args?: string[];

    /**
     * The presentation options.
     */
    presentation?: PresentationOptions;

    /**
     * The problem matcher to be used if a global command is executed (e.g. no tasks
     * are defined). A tasks.json file can either contain a global problemMatcher
     * property or a tasks property but not both.
     */
    problemMatcher?: string | ProblemMatcher | (string | ProblemMatcher)[];

    /**
     * The configuration of the available tasks. A tasks.json file can either
     * contain a global problemMatcher property or a tasks property but not both.
     */
    tasks?: TaskDescription[];
}


/**
 * Options to be passed to the external program or shell
 */
export interface CommandOptions {

    /**
     * The current working directory of the executed program or shell.
     * If omitted the current workspace's root is used.
     */
    cwd?: string;

    /**
     * The environment of the executed program or shell. If omitted
     * the parent process' environment is used.
     */
    env?: { [key:string]:string; };

    /**
      * Configuration of the shell when task type is `shell`
      */
     shell: {

        /**
        * The shell to use.
        */
        executable: string;

        /**
        * The arguments to be passed to the shell executable to run in command mode
        * (e.g ['-c'] for bash or ['/S', '/C'] for cmd.exe).
        */
        args?: string[];
    }
}

/**
 * The description of a task.
 */
interface TaskDescription {

    /**
     * The task's name
     */
    label: string;

    /**
     * The type of a custom task. Tasks of type "shell" are executed
     * inside a shell (e.g. bash, cmd, powershell, ...)
     */
    type: "shell" | "process";

    /**
     * The command to execute. If the type is "shell" it should be the full
     * command line including any additional arguments passed to the command.
     */
    command: string;

    /**
     * Whether the executed command is kept alive and runs in the background.
     */
    isBackground?: boolean;

    /**
     * Additional arguments passed to the command. Should be used if type
     * is "process".
     */
    args?: string[];

    /**
     * Defines the group to which this tasks belongs
     */
    group?: "build" | "string";

    /**
     * The presentation options.
     */
    presentation?: PresentationOptions;

    /**
     * The problem matcher(s) to use to capture problems in the tasks
     * output.
     */
    problemMatcher?: string | ProblemMatcher | (string | ProblemMatcher)[];
}

interface PresentationOptions {

    /**
     * Controls whether the task output is reveal in the user interface.
     * Defaults to `always`.
     */
    reveal?: "never" | "silent" | "always";

    /**
     * Controls whether the command associated with the task is echoed
     * in the user interface.
     */
    echo?: boolean;

    /**
     * Controls whether the panel showing the task output is taking focus.
     */
    focus?: boolean;

    /**
     * Controls if the task panel is used for this task only (dedicated),
     * shared between tasks (shared) or if a new panel is created on
     * every task execution (new). Defaults to `shared`
     */
    panel?: "shared" | "dedicated" | "new";
}

/**
 * A description of a problem matcher that detects problems
 * in build output.
 */
interface ProblemMatcher {

    /**
     * The name of a base problem matcher to use. If specified the
     * base problem matcher will be used as a template and properties
     * specified here will replace properties of the base problem
     * matcher
     */
    base?: string;

    /**
     * The owner of the produced VS Code problem. This is typically
     * the identifier of a VS Code language service if the problems are
     * to be merged with the one produced by the language service
     * or 'external'. Defaults to 'external' if omitted.
     */
    owner?: string;

    /**
     * The severity of the VS Code problem produced by this problem matcher.
     *
     * Valid values are:
     *   "error": to produce errors.
     *   "warning": to produce warnings.
     *   "info": to produce infos.
     *
     * The value is used if a pattern doesn't specify a severity match group.
     * Defaults to "error" if omitted.
     */
    severity?: string;

    /**
     * Defines how filename reported in a problem pattern
     * should be read. Valid values are:
     *  - "absolute": the filename is always treated absolute.
     *  - "relative": the filename is always treated relative to
     *    the current working directory. This is the default.
     *  - ["relative", "path value"]: the filename is always
     *    treated relative to the given path value.
     */
    fileLocation?: string | string[];

    /**
     * The name of a predefined problem pattern, the inline definition
     * of a problem pattern or an array of problem patterns to match
     * problems spread over multiple lines.
     */
    pattern?: string | ProblemPattern | ProblemPattern[];

    /**
     * Additional information used to detect when a background task (like a watching task in Gulp)
     * is active.
     */
    background?: BackgroundMatcher;
}

/**
 * A description to track the start and end of a background task.
 */
interface BackgroundMatcher {

    /**
     * If set to true the watcher is in active mode when the task
     * starts. This is equals of issuing a line that matches the
     * beginPattern.
     */
    activeOnStart?: boolean;

    /**
     * If matched in the output the start of a background task is signaled.
     */
    beginsPattern?: string;

    /**
     * If matched in the output the end of a background task is signaled.
     */
    endsPattern?: string;
}

interface ProblemPattern {

    /**
     * The regular expression to find a problem in the console output of an
     * executed task.
     */
    regexp: string;

    /**
     * The match group index of the filename.
     */
    file: number;

    /**
     * The match group index of the problems's location. Valid location
     * patterns are: (line), (line,column) and (startLine,startColumn,endLine,endColumn).
     * If omitted the line and column properties are used.
     */
    location?: number;

    /**
     * The match group index of the problem's line in the source file.
     * Can only be omitted if location is specified.
     */
    line?: number;

    /**
     * The match group index of the problem's column in the source file.
     */
    column?: number;

    /**
     * The match group index of the problem's end line in the source file.
     *
     * Defaults to undefined. No end line is captured.
     */
    endLine?: number;

    /**
     * The match group index of the problem's end column in the source file.
     *
     * Defaults to undefined. No end column is captured.
     */
    endColumn?: number;

    /**
     * The match group index of the problem's severity.
     *
     * Defaults to undefined. In this case the problem matcher's severity
     * is used.
     */
    severity?: number;

    /**
     * The match group index of the problem's code.
     *
     * Defaults to undefined. No code is captured.
     */
    code?: number;

    /**
     * The match group index of the message. Defaults to 0.
     */
    message: number;

    /**
     * Specifies if the last pattern in a multi line problem matcher should
     * loop as long as it does match a line consequently. Only valid on the
     * last problem pattern in a multi line problem matcher.
     */
    loop?: boolean;
}
```
