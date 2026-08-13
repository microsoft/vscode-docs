---
ContentId: 3f9e2b7d-6a8c-4d1e-9f2a-8c4b5d7e9f1a
DateApproved: 8/5/2026
MetaDescription: Build and validate web applications with AI agents and browser tools in {% data variables.product.prodname_vscode_shortname %} through an interactive test and fix workflow.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- agents
- browser
- integrated browser
- testing
- automation
- guide
- tutorial
---
# Build and validate a web app with browser tools

Browser tools give agents a closed development loop for web applications. The agent can create an app, open it in the integrated browser, interact with it against acceptance criteria, identify issues, fix them, and repeat the checks.

This guide walks you through that loop by building and validating a calculator app. For browser tool capabilities, session types, privacy controls, and prompting patterns, see [Use browser tools with agents](/docs/agents/run/browser-tools.md).

## Prerequisites

To complete this guide, you need:

* [{% data variables.product.prodname_vscode %} installed on your computer](/download)
* [A GitHub Copilot subscription](/docs/setup/copilot.md)
* The `setting(workbench.browser.enableChatTools)` setting turned on, which is the default

## What the agent validates

Before you ask the agent to test the calculator, define observable acceptance criteria:

* Each digit button enters the correct value.
* Addition, subtraction, multiplication, and division return the expected result.
* **Clear** resets the calculator.
* Dividing by zero shows an error instead of an invalid numeric result.

These criteria give the agent a clear definition of success and make its final verification report easier to review.

## Step 1: Verify browser tools

Browser tools are generally available by default. Verify that they are selected for the request:

1. Open the {% data variables.copilot.chat_view %} (`kb(workbench.action.chat.open)`) and select **Agent** from the Agents dropdown.

1. Select **Open Customizations** (gear icon) > **Tools** and verify that **Integrated Browser** is selected.

The agent can now use these tools to interact with web pages. If the tools are missing, verify that `setting(workbench.browser.enableChatTools)` is turned on. An organization policy can also turn off browser tools.

## Step 2: Ask the agent to build a calculator

With browser tools enabled, ask the agent to create a simple calculator application.

1. Create a new project folder and open it in {% data variables.product.prodname_vscode_shortname %}.

1. In the {% data variables.copilot.chat_view %}, enter the following prompt:

    ```prompt
    Create a calculator with buttons for digits 0-9, operations (add, subtract, multiply, divide), clear, and equals. Use HTML, CSS, and JavaScript. Style it with a clean, modern design.
    ```

1. Review the generated files as the agent creates `index.html`, `styles.css`, and `script.js`.

1. Select **Keep** to save the files to your workspace.

The agent has built the basic structure of the calculator application.

## Step 3: Let the agent test the calculator

Now ask the agent to open the calculator in the integrated browser and verify it works correctly.

1. In the {% data variables.copilot.chat_view %}, enter the following prompt:

    ```prompt
    Open the calculator in the browser and validate it against these criteria:
    each digit button enters the correct value; addition, subtraction,
    multiplication, and division return the expected result; Clear resets
    the calculator; and division by zero shows an error. Report the result
    for each criterion. If any criterion fails, fix the issue and repeat
    the complete validation.
    ```

1. Watch as the agent opens `index.html` in the integrated browser, parses the page content to understand the structure, and systematically tests each button and operation by simulating clicks and checking the results.

    <video src="../images/browser-agent-testing-guide/agent-testing-calculator.mp4" title="Video showing the agent testing the calculator in the integrated browser." autoplay loop controls muted></video>

The agent reports which operations work correctly and identifies any issues it discovers.

## Step 4: Watch the agent debug and fix issues

If the agent discovers bugs during testing, it automatically analyzes the problem and implements a fix.

1. Let's introduce a bug by removing the division by zero check:

    ```javascript
    function calculate() {
        if (!operator || shouldReset) return;

        const a = parseFloat(previous);
        const b = parseFloat(current);
        let result;

        switch (operator) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
    }
    ```

1. Ask the agent to reproduce the issue, fix it, and verify the acceptance criterion again:

    ```prompt
    Test division by zero. If it produces an invalid numeric result instead
    of an error, fix the issue. Then repeat the test and report the result.
    ```

1. Watch as the agent encounters an error when dividing by zero, then analyzes and fixes the code, and finally validates the bug fix.

The agent has completed a full development cycle: build, validate, debug, fix, and revalidate by using browser tools.

## Step 5: Share a browser page with the agent (optional)

You can also manually open web pages and explicitly share them with the agent for analysis or interaction. By default, the agent can only interact with web pages it opened itself.

1. Open the integrated browser by running the **Browser: Open Integrated Browser** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Navigate to a web page you want the agent to analyze or interact with.

1. Select the **Share with Agent** button in the browser toolbar.

    A visual indicator on the browser tab shows that the page is actively shared with the agent.

1. Ask the agent to perform actions on the shared page:

    ```prompt
    What is the main heading on this page? Click the first link and tell me where it goes.
    ```

The agent can now access the shared page and perform interactions on your behalf. When you're done, select the **Share with Agent** button again to revoke access.

> [!TIP]
> Shared pages use your existing browser session, including cookies and login state. Pages opened by the agent use isolated ephemeral sessions, so they don't share cookies or storage with your other browser tabs.

## Try these scenarios

Now that you understand how browser tools work, try these scenarios to explore different use cases:

* **Form validation testing**: have the agent verify validation rules, error messages, and successful submission by building and testing a contact form

* **Responsive layout verification**: ask the agent to screenshot a page at different viewport sizes and verify responsive behavior (for example, a landing page with navigation menus)

* **Authentication flow testing**: let the agent test credential validation, error handling, and successful redirects in a login page

* **Interactive functionality testing**: have the agent verify user interactions and state management

* **Accessibility audits**: ask the agent to check any web page for missing alt text, heading hierarchy, keyboard navigation, and color contrast issues

## Related resources

* [Use browser tools with agents](/docs/agents/run/browser-tools.md)
* [Integrated browser](/docs/debugtest/integrated-browser.md)
* [Core concepts of AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/concepts/agents.md)
