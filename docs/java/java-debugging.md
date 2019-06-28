---
Order: 3
Area: java
TOCTitle: Running and Debugging
ContentId: 929e5410-3bfe-4107-b331-565afe5d341f
PageTitle: Run and Debug Java in Visual Studio Code
DateApproved: 6/17/2019
MetaDescription: See how you can run and debug your Java source code locally, and in the cloud.
MetaSocialImage:
---

# Running and Debugging Java

Visual Studio Code allows you to debug Java applications through the [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) extension. It's a lightweight Java debugger based on [Java Debug Server](https://github.com/Microsoft/java-debug), which extends the [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java).

Here's a list of supported debugging features:

- Launch/Attach
- Breakpoints
- Exceptions
- Pause & Continue
- Step In/Out/Over
- Variables
- Call Stacks
- Threads
- Debug Console
- Evaluation
- Hot Code Replace

The Java debugger is an open-source project, which welcomes contributors to collaborate through GitHub repositories:

- [Debugger for Java Extension](https://github.com/Microsoft/vscode-java-debug)
- [Java Debugger Server for Visual Studio Code](https://github.com/Microsoft/java-debug)

If you run into any issues when using the features below, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'debugging')" href="javascript:void(0)">Report an issue</a>

## Install

For the debugger to work, you also need to have the [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) extension installed. To make it easier, there is a [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which bundles the [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java), the [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) and several other popular Java [extensions](/docs/java/extensions.md).

You can manually install the extension pack from the Extensions view (`kb(workbench.view.extensions)`) by typing `vscode-java-pack` in the search box. You will also be prompted to install the Java Extension Pack when you edit a Java file in VS Code for the first time.

## Use

It's easy to run and debug your Java application as we provide several entry points for that.

### CodeLens

Once the debugger is activated, you will find **Run|Debug** on the CodeLens of your `main()` function.

![CodeLens](images/java-debugging/java-codelens.gif)

### Clicking F5

Once you select **Run** or `kb(workbench.action.debug.start)`, the debugger will automatically find the entry point of your project and start debugging.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/debug-intro.mp4" type="video/mp4">
</video>

It's possible that there might be multiple debugging configurations for your project and you can always add and modify those then select the desired one to run.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/java-debug.mp4" type="video/mp4">
</video>

If there's no debug configuration file `launch.json` in your project, the debugger will automatically find the main class and generate the configuration for you to launch your application. VS Code keeps debugging configuration information in a `launch.json` file located in a `.vscode` folder in your workspace (project root folder) or in your [user settings](/docs/editor/debugging.md#global-launch-configuration) or [workspace settings](/docs/editor/multi-root-workspaces.md#workspace-launch-configurations). For more details, please read [Launch configurations](/docs/editor/debugging.md#launch-configurations)

There's also a convenient setting for debugging `current file` so the editor knows which file is currently active and choose it as the entry point.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/current-file.mp4" type="video/mp4">
</video>

### Accepting inputs

Currently, the VS Code Java Debugger uses the Debug Console as the default console, which doesn't accept input. In order for the console to accept your input (for example when using **Scanner**), you need to change the console to use the Integrated Terminal in `launch.json`.

```json
"console": "integratedTerminal"
```

If you'd like to use that setting each time you launch a Java program, you can configure it as a global user setting with `java.debug.settings.console`.

### Debugging single files

VS Code can run and debug single Java files without any project.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/single-file-debugging.mp4" type="video/mp4">
</video>

### Debugging external files

The Java debugger also supports external source files. This lets you debug third-party classes when they are inside a JAR or a source attachment. Set your breakpoints in those classes before you start debugging. You can also attach missing source code with a `zip/jar` file using the Context menu **Attach Source** action.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/attach-source.mp4" type="video/mp4">
</video>

Java 9 and newer versions are supported with VS Code Java Debugger as well.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/java9.mp4" type="video/mp4">
</video>

### Debug session inputs

The default Debug Console in VS Code doesn't support inputs. If your program need inputs from a terminal, you can use the Integrated Terminal (`kb(workbench.action.terminal.toggleTerminal)`) within VS Code or an external terminal to launch it.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/launch-in-terminal.mp4" type="video/mp4">
</video>

### Step filtering

Step filter is supported by the extension to filter out types that you do not wish to see or step through while debugging. With this feature, you can configure the packages to filter within your `launch.json` so they could be skipped when you step through.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/step-filter.mp4" type="video/mp4">
</video>

### Expression evaluation

The debugger also lets you evaluate expressions in the **WATCH** window as well as the Debug Console. You can also use this feature for conditional breakpoint setting.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/expression-evaluation.mp4" type="video/mp4">
</video>

### Conditional breakpoint

With the help of expression evaluation, the debugger also supports conditional breakpoint. You can set your breakpoint to break when expression evaluates to true.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/conditional-bp.mp4" type="video/mp4">
</video>

### Hot Code replacement

Another advanced feature the debugger supports is 'Hot Code' replacement. Hot code replacement (HCR) is a debugging technique whereby the Java debugger transmits new class files over the debugging channel to another Java Virtual Machine (JVM). HCR facilitates experimental development and fosters iterative trial-and-error coding. With this new feature, you can start a debugging session and change a Java file in your development environment, and the debugger will replace the code in the running JVM. No restart is required, which is why it’s called "hot". Below is an illustration of how you can use HCR with Debugger for Java in VS Code.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/hcr.mp4" type="video/mp4">
</video>

You may use the debug setting `java.debug.settings.hotCodeReplace` to control how to trigger Hot Code replacement. The possible setting values are:

* `manual` - Click the toolbar to apply the changes (default).
* `auto` - Automatically apply the changes after compilation.
* `never` - Disable Hot Code replacement.

### Logpoints

[Logpoints](/blogs/2018/07/12/introducing-logpoints-and-auto-attach.md#introducing-logpoints) is also supported by Java Debugger. Logpoints allow you to send output to debug console without editing code. They’re different from breakpoints because they don’t stop the execution flow of your application.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/logpoints.mp4" type="video/mp4">
</video>

## Configuration

There are many options and settings available to configure the debugger. For example, configuring the current working directory (cwd) and environment variables is easily done with launch options.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-debugging/cwd-env.mp4" type="video/mp4">
</video>

Consult the documentation for the [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) extension for help with setting up your project.

Below are all the configurations available for `Launch` and `Attach`. For more information about how to write the `launch.json` file, refer to [Debugging](/docs/editor/debugging.md).

### Launch

- `mainClass` (required) - The fully qualified class name (for example [java module name/]com.xyz.MainApp) or the java file path of the program entry.
- `args` - The command-line arguments passed to the program. Use `"${command:SpecifyProgramArgs}"` to prompt for program arguments. It accepts a string or an array of string.
- `sourcePaths` - The extra source directories of the program. The debugger looks for source code from project settings by default. This option allows the debugger to look for source code in extra directories.
- `modulePaths` - The modulepaths for launching the JVM. If not specified, the debugger will automatically resolve from current project.
- `classPaths` - The classpaths for launching the JVM. If not specified, the debugger will automatically resolve from current project.
- `encoding` - The `file.encoding` setting for the JVM. If not specified, 'UTF-8' will be used. Possible values can be found in [Supported Encodings](http://docs.oracle.com/javase/8/docs/technotes/guides/intl/encoding.doc.html).
- `vmArgs` - The extra options and system properties for the JVM (for example -Xms\<size\> -Xmx\<size\> -D\<name\>=\<value\>), it accepts a string or an array of string.
- `projectName` - The preferred project in which the debugger searches for classes. There could be duplicated class names in different projects. This setting also works when the debugger looks for the specified main class when launching a program. It is required when the workspace has multiple Java projects, otherwise the expression evaluation and conditional breakpoint may not work.
- `cwd` - The working directory of the program. Defaults to `${workspaceFolder}`.
- `env` - The extra environment variables for the program.
- `stopOnEntry` - Automatically pause the program after launching.
- `console` - The specified console to launch the program. If not specified, use the console specified by the `java.debug.settings.console` user setting.
  - `internalConsole` - VS Code debug console (input stream not supported).
  - `integratedTerminal` - VS Code integrated terminal.
  - `externalTerminal` - External terminal that can be configured in user settings.
- `shortenCommandLine` - When the project has long classpath or big VM arguments, the command line to launch the program may exceed the maximum command-line string limitation allowed by the OS. This configuration item provides multiple approaches to shorten the command line. Defaults to `auto`.
  - `none` - Launch the program with the standard command line 'java [options] classname [args]'.
  - `jarmanifest` - Generate the classpath parameters to a temporary classpath.jar file, and launch the program with the command line 'java -cp classpath.jar classname [args]'.
  - `argfile` - Generate the classpath parameters to a temporary argument file, and launch the program with the command line 'java @argfile [args]'. This value only applies to Java 9 and higher.
  - `auto` - Automatically detect the command-line length and determine whether to shorten the command line via an appropriate approach.
- `stepFilters` - Skip specified classes or methods when stepping.
  - `classNameFilters` - Skip the specified classes when stepping. Class names should be fully qualified. Wildcard is supported.
  - `skipSynthetics` - Skip synthetic methods when stepping.
  - `skipStaticInitializers` - Skip static initializer methods when stepping.
  - `skipConstructors` - Skip constructor methods when stepping.

### Attach

- `hostName` (required) - The host name or IP address of remote debuggee.
- `port` (required) - The debug port of remote debuggee.
- `timeout` - Time out value before reconnecting, in milliseconds (default to 30000 ms).
- `sourcePaths` - The extra source directories of the program. The debugger looks for source code from project settings by default. This option allows the debugger to look for source code in extra directories.
- `projectName` - The preferred project in which the debugger searches for classes. There could be duplicated class names in different projects. It is required when the workspace has multiple Java projects, otherwise the expression evaluation and conditional breakpoint may not work.
- `stepFilters` - Skip specified classes or methods when stepping.
  - `classNameFilters` - Skip the specified classes when stepping. Class names should be fully qualified. Wildcard is supported.
  - `skipSynthetics` - Skip synthetic methods when stepping.
  - `skipStaticInitializers` - Skip static initializer methods when stepping.
  - `skipConstructors` - Skip constructor methods when stepping.

### User Settings

- `java.debug.logLevel`: Minimum level of debugger logs that are sent to VS Code, defaults to `warn`.
- `java.debug.settings.showHex`: Show numbers in hex format in **Variables**, defaults to `false`.
- `java.debug.settings.showStaticVariables`: Show static variables in **Variables**, defaults to `false`.
- `java.debug.settings.showQualifiedNames`: Show fully qualified class names in **Variables**, defaults to `false`.
- `java.debug.settings.showLogicalStructure`: Show the logical structure for the Collection and Map classes in **Variables**, defaults to `true`.
- `java.debug.settings.showToString`: Show 'toString()' value for all classes that override 'toString' method in **Variables**, defaults to `true`.
- `java.debug.settings.maxStringLength`: The maximum length of strings displayed in **Variables** or **Debug Console**, strings longer than this limit will be trimmed, defaults to `0` which means no trim is performed.
- `java.debug.settings.hotCodeReplace`: Reload the changed Java classes during debugging, defaults to `manual`. Make sure `java.autobuild.enabled` is not disabled for [VSCode Java](https://github.com/redhat-developer/vscode-java). See the [Hot Code Replace wiki page](https://github.com/Microsoft/vscode-java-debug/wiki/Hot-Code-Replace) for more information about usages and limitations.
  - manual - Click the toolbar to apply the changes.
  - auto - Automatically apply the changes after compilation.
  - never - Never apply the changes.
- `java.debug.settings.enableHotCodeReplace`: Enable hot code replace for Java code. Make sure the auto build is not disabled for [VS Code Java](https://github.com/redhat-developer/vscode-java). See the [Hot Code Replace wiki page](https://github.com/Microsoft/vscode-java-debug/wiki/Hot-Code-Replace) for more information about usages and limitations.
- `java.debug.settings.enableRunDebugCodeLens`: Enable the CodeLens provider for the run and debug buttons over main entry points, defaults to `true`.
- `java.debug.settings.forceBuildBeforeLaunch`: Force building the workspace before launching java program, defaults to `true`.
- `java.debug.settings.console`: The specified console to launch a Java program, defaults to `internalConsole`. If you want to customize the console for a specific debug session, please modify the `console` configuration in `launch.json`.
  - `internalConsole` - VS Code debug console (input stream not supported).
  - `integratedTerminal` - VS Code integrated terminal.
  - `externalTerminal` - External terminal that can be configured in user settings.

## Troubleshooting

A detailed troubleshooting guide can be found in the [vscode-java-debug GitHub repository](https://github.com/Microsoft/vscode-java-debug/blob/master/Troubleshooting.md).

## Feedback and questions

You can find the full list of issues at [Issue Tracker](https://github.com/Microsoft/vscode-java-debug/issues). You can submit a [bug or feature suggestion](https://github.com/Microsoft/vscode-java-debug/issues/new) and participate in the community driven [vscode-java-debug Gitter channel](https://gitter.im/Microsoft/vscode-java-debug).

## Next steps

Read on to find out about:

* [Debugging](/docs/editor/debugging.md) - Find out how to use the debugger in VS Code with your project for any language.

And for Java:

* [Java Testing](/docs/java/java-testing.md) - Test Java within VS Code with the Java Test Runner extension.
* [Java Extensions](/docs/java/extensions.md) - Learn about more useful Java extensions for VS Code.
