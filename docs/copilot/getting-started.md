---
Order: 2
Area: copilot
TOCTitle: Getting started
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
PageTitle: GitHub Copilot getting started
DateApproved: 12/7/2023
MetaDescription: Get started with GitHub Copilot in Visual Studio Code and create your first AI-powered suggestions and chat messages.
---
# Getting started with GitHub Copilot in VS Code

This tutorial walks you through configuring the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension in Visual Studio Code, and using AI-powered suggestions to help you create a simple calculator in TypeScript.

For an overview of the GitHub Copilot features in VS Code, see the [GitHub Copilot Overview](/docs/copilot/overview.md).

## Set up VS Code for GitHub Copilot

### Install the GitHub Copilot extension

You use the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension to power your artificial intelligence (AI) suggestions in VS Code.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extension</a>

### Sign in to GitHub

If you didn't previously authorize VS Code in your GitHub account, you're prompted to sign in to GitHub in VS Code:

![VS Code notification to sign into the Copilot extension](images/getting-started/copilot-auth-toast.png)

In your browser, GitHub requests the necessary permissions for GitHub Copilot. To approve these permissions, select **Authorize Visual Studio Code**.

## Activate your GitHub Copilot free trial

If you want to use GitHub Copilot, you either need a subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization. You can learn more about billing for Copilot in the [GitHub Copilot documentation](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

As an individual, if you didn't yet activate your free trial for Copilot, the extension notifies you in VS Code. Select **Signup for GitHub Copilot** to activate your trial.

![Copilot sign up notification in VS Code](images/getting-started/copilot-access-toast.png)

Alternately, start a free trial from the [GitHub Copilot signup page](https://github.com/github-copilot/signup).

## Get your first suggestion

Now that you've signed up for Copilot and activated the extension, let's see its assistance in action!

If you're new to a programming language, a particular code base, or you're not familiar with a specific programming concept, it's great to have a pair programmer alongside you. Copilot presents suggestions automatically in the editor to help you code more efficiently.

In this tutorial, you're using GitHub Copilot to help you create a `Calculator` class in TypeScript, but Copilot can provide suggestions for numerous other languages and a wide variety of frameworks.

1. Open Visual Studio Code and create a new TypeScript file `Calculator.ts`.

1. In the TypeScript file, start typing the following class definition.

    ```typescript
    class Calculator {
    ```

    Copilot will automatically suggest a method for our `Calculator` calls in grayed text (ghost text). In our example, the `add` method is suggested. The exact suggestion may vary. For any given input, Copilot might also offer multiple suggestions.

    ![Video showing Copilot suggesting the `add` and `subtract` methods inside the Calculator class](./images/getting-started/copilot-generate-methods.gif)

1. To accept the suggestion, press the `kbstyle(Tab)` key.

    Congratulations! You've accepted your first AI-powered inline suggestion.

1. Press `kbstyle(Enter)` to get more suggestions and add more methods to your class.

    Inline suggestions can help you with generating boilerplate or repetitive code, letting you focus on more complex coding tasks.

## Use code comments for suggestions

So far, Copilot is giving you suggestions based on the code you're typing, trying to predict what is relevant. In this step, you'll give instructions to Copilot about what you want it to suggest by using code comments.

We now want to add a method to our `Calculator` class to calculatet the factorial of a given number.

1. In the TypeScript file, inside the class, add the following code comment.

    ```typescript
    // method to calculate the factorial of a number
    ```

    ![Video showing Copilot suggesting the `factorial` method based on a code comment](./images/getting-started/copilot-generate-factorial.gif)

1. Press `kbstyle(Enter)` and notice that Copilot suggests a `factorial` method implementation.

1. Press the `kbstyle(Tab)` key to accept the suggestion.

    You can experiment further by using alternate code comments to influence the suggestions. Here are some examples to get you started.

    Provide information about the method signature:

    ```typescript
    // method called `factorial` to calculate the factorial of a number, the parameter `num` is a number, and the return type is a number
    ```

    Give information about the algorithm:

    ```typescript
    // method to calculate the factorial of a number, don't use recursion
    ```

## Fix coding errors with Copilot

Now that you have an implementation for a simple `Calculator` class, let's test that it works correctly. In this steps, you'll use Copilot to help fix coding errors.

1. In the TypeScript file, below the class, type the following code.

    ```typescript
    const calculator = new Calculator();
    
    // invoke the add method and print the result
    ```

    Copilot will suggest code to invoke the `add` method and output the results to the console. Press the `kbstyle(Tab)` key to accept the suggestion.

1. Now, let's see what happens when we make a coding error. Type the following code, incorrectly passing a second argument to the `factorial` method.

    ```typescript
    console.log(calculator.factorial(5, 10)); 
    ```

    Notice that the second argument gets a red squiggle because the method only accepts one argument.

1. Hover over the red squiggle, select **Quick fix** in the Code Action options, and then select **Fix using Copilot**.

    Copilot suggests to fix the problem by removing the second argument when invoking the `factorial` method. You can preview the modification and choose to **Accept** or **Discard** the changes.

    ![Video showing Copilot suggesting a code fix](./images/getting-started/copilot-code-fix.gif)

## Congratulations

Congratulations, you've now used artificial intelligence to enhance your coding! In this tutorial, you've installed the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension in VS Code and used the Copilot to provide you with suggestions in the editor to help you code more efficiently.

Next, learn how you can get started with Copilot chat features to interact with Copilot and ask questions about your code, your workspace, and more.
