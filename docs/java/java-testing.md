---
Order: 4
Area: java
TOCTitle: Unit Testing
ContentId: 82be3b78-2c09-4571-abec-69f95f111e0f
PageTitle: Java Unit Tests in Visual Studio Code
DateApproved: 5/30/2018
MetaDescription: See how you can test your Java code in Visual Studio Code.
MetaSocialImage:
---

# Testing Java with Visual Studio Code

Testing Java in Visual Studio Code is enabled by [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) extension. It's a lightweight extension to run and debug Java test cases. The extension supports following test frameworks:

- JUnit 4 (v4.8.0+)
- JUnit 5 (v5.1.0+)
- TestNG (v6.8.0+)

The [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) works with [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) and [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) to provide the following features:

- Run test cases
- Debug test cases
- View test report
- View tests in Test Explorer

Here's a brief instruction with TestNG

![Test Explorer](images/java-testing/testng.gif)

And with JUnit5

![Test Explorer](images/java-testing/test-junit5.gif)

The JUnit 5 support also covers frequently used annotations such as `@DisplayName` and `@ParameterizedTest`

![DisplayName](images/java-testing/displayname.png)

![ParameterizedTest](images/java-testing/parameterizedtest.png)

Please visit the [GitHub repository](https://github.com/Microsoft/vscode-java-test) of the [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) for more details such as commands and settings.

## Next steps

Read on to find out about:

* [Debugging](/docs/java/java-debugging.md) - Find out how to debug your Java project with VS Code.
* [Java Extensions](/docs/java/extensions.md) - Learn about more useful Java extensions for VS Code.
