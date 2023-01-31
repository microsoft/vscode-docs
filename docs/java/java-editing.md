---
Order: 2
Area: java
TOCTitle: Navigate and Edit
ContentId: 843e139a-9e3c-4b4f-95d1-32a9a7480e8e
PageTitle: Navigate and edit Java Source Code in Visual Studio Code
DateApproved: 12/9/2021
MetaDescription: Navigate and edit Java Source Code in Visual Studio Code
---
# Navigate and edit Java source code

Visual Studio Code is a source code editor first and foremost with rich editing [features](/docs/editor/codebasics.md). In this document, we will go through a few Java-specific features, which are helpful when working with Java.

If you run into any issues when using the features below, you can contact us by entering an [issue](https://github.com/microsoft/vscode-java-pack/issues).

## Code navigation

With the [Outline view](/docs/getstarted/userinterface.md#outline-view), you can conveniently navigate the members within the current file. [Projects view](/docs/java/java-project.md#projects-view) also provide a great overview of your project. As a Java editor, it also supports Call Hierarchy, Type Hierarchy, Definition Navigation, Search Types in Workspace, etc.

## Search for symbols

You can search for symbols in the current file or workspace to navigate your code more quickly.

### Search for symbols in the workspace

To search for a symbol in the current workspace, start by pressing `kb(workbench.action.showAllSymbols)`, then enter the name of the symbol. A list of potential matches will appear as before. If you choose a match that was found in a file that's not already open, the file will be opened before navigating to the match's location. Alternatively, you can also use  **Quick Open** (`kb(workbench.action.quickOpen)`) then enter the '#' command to search the current workspace. `kb(workbench.action.showAllSymbols)` is just the shortcut for the '#' commands, so everything works the same.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/search-in-workspace.mp4" type="video/mp4">
</video>

### Search for symbols in current file

To search for a symbol in the current file, use **Quick Open** (`kb(workbench.action.quickOpen)`) then enter the '@' command, then enter the name of the symbol you're looking for. A list of potential matches will appear and be filtered as you type. Choose from the list of matches to navigate to its location.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/search-in-file.mp4" type="video/mp4">
</video>

## Peek Definition

You can take a quick look at how a symbol was defined by using the Peek Definition feature. This feature displays a few lines of code near the definition inside a peek window, so you can take a look without navigating away from your current location.

To peek at a symbol's definition, place your cursor on the symbol anywhere it's used in your source code and then press `kb(editor.action.peekDefinition)`. Alternatively, you can choose **Peek Definition** from the context menu (right-click, then choose **Peek Definition**).

## Go to Definition

You can also quickly navigate to where a symbol is defined by using the Go to Definition feature.

To go to a symbol's definition, place your cursor on the symbol anywhere it is used in your source code and then press `kb(editor.action.revealDefinition)`. Alternatively, you can choose **Go to Definition** from the context menu (right-click, then choose **Go to Definition**). When there's only one definition of the symbol, you'll navigate directly to its location, otherwise the competing definitions are displayed in a peek window as described in the previous section and you have to choose the definition that you want to go to.

## Go to Super Implementation

You can keep track of class implementations and overriding methods by clicking the **Go to Super Implementation** link on hover.

![Spring Navigation](images/java-editing/goto-super.png)

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/goto-super-implementation.mp4" type="video/mp4">
</video>

## Call Hierarchy

A Call Hierarchy view shows all calls from or to a function and allows you to drill into callers of callers and call of calls. Right-click on a function and select **Peek** > **Peek Call Hierarchy**.

![Call Hierarchy Peek](images/java-editing/call-hierarchy.png)

You can also right-click in a function body and pick **Show Call Hierarchy**.

![Call Hierarchy Menu](images/java-editing/call-hierarchy.gif)

## Type Hierarchy

A Type Hierarchy view shows the inheritance relationships between Java Objects. You can right-click on a type and pick **Show Type Hierarchy**.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/type-hierarchy.mp4" type="video/mp4">
</video>

## Folding regions

Folding regions allows you to fold or unfold code snippet to better view the source code.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/folding-range.mp4" type="video/mp4">
</video>

## Smart Selection

With [Smart Selection](https://code.visualstudio.com/updates/v1_33#_smart-select-api) (semantic selection), you can expand or shrink the selection range based on the semantic information of the caret position in your source code.

* To expand the selection, use `kb(editor.action.smartSelect.expand)`.
* To shrink the selection, use `kb(editor.action.smartSelect.shrink)`.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/smart-selection.mp4" type="video/mp4">
</video>

## Semantic Highlighting

Syntax highlighting is an important feature that allows you to read code more efficiently. With the help of [Semantic Highlighting](https://github.com/microsoft/vscode/wiki/Semantic-Highlighting-Overview), VS Code can provide more accurate source code coloring based on symbol information from the Java language service.

Below is just one example, left is the behavior after enabling semantic highlighting and right is the one with only syntax highlighting.

![Semantic Highlighting](images/java-editing/semantic-highlighting.png)

You can learn more about the details of Java semantic highlighting on the [Java Language Support extension wiki](https://github.com/redhat-developer/vscode-java/wiki/Semantic-Highlighting).

## Navigating code with Spring Boot

The [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot) extension provides enhanced navigation and code completion support for Spring Boot projects.

* `@/` shows all defined request mappings (mapped path, request method, source location)
* `@+` shows all defined beans (bean name, bean type, source location)
* `@>` shows all functions (prototype implementation)
* `@` shows all Spring annotations in the code

![Spring Navigation](images/java-editing/spring-navigation.png)

To learn more about Spring Boot support with Visual Studio Code, read [Spring Boot in Visual Studio Code](/docs/java/java-spring-boot.md).

## Code editing

Editing code is also easy with IntelliSense for smart code completions and signature details. You can use code snippets as well as various code actions such as generating Getters/Setters and organizing imports to further boost your productivity.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/code-editing.mp4" type="video/mp4">
</video>

Java support in Visual Studio Code detects issues within your code automatically, and provides you with Quick Fix suggestions.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/quick-fix.mp4" type="video/mp4">
</video>

For more details about refactoring and code actions, see [Refactoring and Source Actions](/docs/java/java-refactoring.md).

## IntelliSense

Code completion in Visual Studio Code for Java is provided by [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java). The extension is powered by the same [Java development tools (JDT)](https://www.eclipse.org/jdt/) behind Eclipse, so you can expect the same level of support.

In addition, there's also AI-assisted IntelliSense called [IntelliCode](https://visualstudio.microsoft.com/services/intellicode/). It saves you time by putting what you're most likely to use at the top of your completion list. IntelliCode recommendations are based on thousands of open-source projects on GitHub each with over 100 stars, so it's trained on the most common usages from high-quality projects. When combined with the context of your code, the completion list is tailored to promote those practices. Here's IntelliCode for Java in action.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/intellicode.mp4" type="video/mp4">
</video>

IntelliCode works well with popular Java libraries and frameworks like Java SE and Spring. It will help you whether you are doing monolithic web apps or modern microservices.

## Create new file

VS Code supports applying templates when you create a Java source file. When you create a `.java` file in the File Explorer, the language server will automatically generate the class body, and fill the package info for you:

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-editing/create-new-file.mp4" type="video/mp4">
</video>

## Code snippets

Visual Studio Code supports a wide range of popular Java code snippets to make you more productive, such as class/interface, syserr, sysout, if/else, try/catch, static main method. Using information from Java language server, it also provides a preview of the code snippet during the selection.

For example, typing "**sout**" or "**sysout**" will produce a code snippet for `System.out.println()`.<br>
Similarly, typing "**main**" or "**psvm**" will generate a code snippet for `public static void main(String[] args) {}`.

![Code Snippet](images/java-editing/code-snippet.png)

The complete list of shortcuts are listed below:

### Code snippet shortcuts

| shortcut key | description |
|---|---|
| ctor | Public constructor |
| dowhile | Do-while statement |
| foreach, iter | Iterate over an array or Iterable |
| fori | Iterate over array |
| if | If statement |
| ifelse | If-else statement |
| ifnull | If statement checking for null |
| ifnotnull | If statement checking for not null |
| main, psvm | Public static main method |
| new | Create new Object |
| private_method | Private method |
| private_static_method | Private static method |
| prf | Private field |
| protected_method | Protected method |
| public_method | Public method |
| public_static_method | Public static method |
| switch | Switch statement |
| syserr, serr | Print to standard err |
| sysout, sout | Print to standard out |
| systrace, soutm | Print current method to standard out |
| try_catch | Try/catch block |
| try_resources | Try-with-resources statement |
| while | While statement |

### Postfix snippet shortcuts

| shortcut key | template content | description |
|---|---|---|
| cast | ((SomeType) expr) | Casts the expression to a new type |
| else | if (!expr) | Creates a negated if statement |
| for | for (T item : expr) | Creates a for statement |
| fori | for (int i = 0; i < expr.length; i++) | Creates a for statement which iterates over an array |
| forr | for (int i = expr.length-1; i >= 0; i--) | Creates a for statement which iterates over an array in reverse order |
| if | if (expr) | Creates a if statement |
| nnull | if (expr != null) | Creates an if statement and checks if the expression does not resolve to null |
| null | if (expr == null) | Creates an if statement which checks if expression resolves to null |
| sysout | System.out.println(expr) | Sends the affected string to a System.out.println(..) call |
| throw | throw expr | Throws the given Exception |
| var | T name = expr | Creates a new variable |
| while | while (expr) {} | Creates a while loop |
