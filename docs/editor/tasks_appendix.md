---
TOCTitle: Tasks Appendix
ContentId: 6DCA48F5-0566-4AEB-9C4C-CCBBA2945347
PageTitle: Tasks Appendix
DateApproved: 3/7/2016
MetaDescription: Additional info for using task runners in Visual Studio Code.
---

# Appendix

This is additional information for [tasks](/docs/editor/tasks.md).

## Schema for tasks.json

The following interfaces define the schema of the tasks.json file.

```typescript

/**
 * Describes the settings of a task runner
 */
export interface TaskRunnerConfiguration extends BaseTaskRunnerConfiguration {

	/**
	 * The command to execute. Not optional.
	 */
	command:string;
}


/**
 * Describs the settings of a task runner
 */
export interface BaseTaskRunnerConfiguration {

	/**
	 * The command to execute
	 */
	command?:string;

	/**
	 * Whether the task is a shell command or not
	 */
	isShellCommand?:boolean;

	/**
	 * Additional command options
	 */
	options?: CommandOptions;

	/**
	 * General args
	 */
	args?:string[];

	/**
	 * The configured tasks
	 */
	tasks?: { [id:string]: TaskDescription; };
}


/**
 * Options to be passed to the external program or shell
 */
export interface CommandOptions {
	/**
	 * The current working directory of the executed program or shell.
	 * If omitted VSCode's current workspace root is used.
	 */
	cwd?: string;

	/**
	 * The environment of the executed program or shell. If omitted
	 * the parent process' environment is used.
	 */
	env?: { [key:string]: string; };
}


/**
 * The description of a task.
 */
export interface TaskDescription {

	/**
	 * The task's name
	 */
	taskName: string;

	/**
	 * Additional arguments passed to the command when this task is
	 * executed.
	 */
	args?: string[];

	/**
	 * Whether the executed command is kept alive and is watching the file system.
	 */
	isWatching?:boolean;

	/**
	 * Whether the task should prompt on close for confirmation if running.
	 */
	promptOnClose?: boolean;

	/**
	 * Whether this task maps to the default build command.
	 */
	isBuildCommand?:boolean;

	/**
	 * Whether this task maps to the default test command.
	 */
	isTestCommand?: boolean;

	/**
	 * Controls whether the output view of the running tasks is brought to front or not.
	 * See BaseTaskRunnerConfiguration#showOutput for details.
	 */
	showOutput?: string;

	/**
	 * Controls whether the executed command is printed to the output windows as well.
	 */
	echoCommand?: boolean;

	/**
	 * See BaseTaskRunnerConfiguration#suppressTaskName for details.
	 */
	suppressTaskName?: boolean;

	/**
	 * The problem matcher(s) to use to capture problems in the tasks
	 * output.
	 */
	problemMatcher?: ProblemMatcherConfig.ProblemMatcherType;
}

/**
 * A description of a problem matcher that detects problems
 * in build output.
 */
export interface ProblemMatcher {

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
	 * The name of a predefined problem pattern, the inline definintion
	 * of a problem pattern or an array of problem patterns to match
	 * problems spread over multiple lines.
	 */
	pattern?: string | ProblemPattern | ProblemPattern[];
}

export interface ProblemPattern {

	/**
	 * The regular expression to find a problem in the console output of an
	 * executed task.
	 */
	regexp: string;

	/**
	 * The match group index of the filename.
	 * If omitted 1 is used.
	 */
	file?: number;

	/**
	 * The match group index of the problems's location. Valid location
	 * patterns are: (line), (line,column) and (startLine,startColumn,endLine,endColumn).
	 * If omitted the line and column properties are used.
	 */
	location?: number;

	/**
	 * The match group index of the problem's line in the source file.
	 *
	 * Defaults to 2.
	 */
	line?: number;

	/**
	 * The match group index of the problem's column in the source file.
	 *
	 * Defaults to 3.
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
	 * The match group index of the problems's code.
	 *
	 * Defaults to undefined. No code is captured.
	 */
	code?: number;

	/**
	 * The match group index of the message. If omitted it defaults
	 * to 4 if location is specified. Otherwise it defaults to 5.
	 */
	message?: number;

	/**
	 * Specifies if the last pattern in a multi line problem matcher should
	 * loop as long as it does match a line consequently. Only valid on the
	 * last problem pattern in a multi line problem matcher.
	 */
	loop?: boolean;
}
```
