---
# DO NOT TOUCH — Managed by doc writer
ContentId: d9038699-4ffe-485b-b40a-b1260a9973ad
DateApproved: 09/05/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Tutorial that walks you through creating a VS Code extension that uses the Language Model API to generate AI-powered code annotations.
---

# Tutorial: Generate AI-powered code annotations by using the Language Model API

In this tutorial, you'll learn how to create a Visual Studio Code extension that uses the Language Model API to generate AI-powered code annotations. You'll create a Code Tutor extension that provides inline suggestions for how to improve your code.

<!-- TODO: Add a screenshot of the extension in action -->
![]()

## Prerequisites

You'll need the following tools and accounts to complete this tutorial:

- [Visual Studio Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org/en/download/)

## Step 1: Scaffold out the extension

First, use Yeoman and VS Code Extension Generator to scaffold a TypeScript or JavaScript project ready for development.

```bash
npx --package yo --package generator-code -- yo code
```

Select the following options to complete the new extension wizard...

```bash
# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? Code Tutor

### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? code-tutor
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? npm

# ? Do you want to open the new folder with Visual Studio Code? Open with `code`
```

## Step 2: Modify the package.json file to include the correct commands

By default, the scaffolded project will include a single "helloWorld" command in the `package.json` file. This command will show up in the Command Palette when your extension is installed. You'll want to modify this so that it shows a "Show Code Tutor Annotations" command instead.

In the `package.json` file, find the "contributes" section and modify the existing "helloWorld" command so that it looks like this:

```json
"contributes": {
  "commands": [
      {
      "command": "code-tutor.annotate",
      "title": "Tutor"
      }
  ]
}
```

We also want a "Tutor" button to show up at the top of the editor so that the user can easily activate the tutor annotations. To do that, add a "menus" section in the "contributes" section, just under the "commands".

```json
"contributes": {
  "commands": [
    {
      "command": "code-tutor.annotate",
      "title": "Tutor"
    }
  ],
  "menus": {
    "editor/title": [
      {
        "when": "editorFocus",
        "command": "code-tutor.annotate",
        "group": "navigation"
      }
    ]
  }
}
```

- The "editor/title" specifies where we want this menu option - which is in the title bar of whichever tab is currently open in the editor area.
- The "when" specifies when we want this menu option to be shown. In this case, we want it to be shown whenever the editor has focus.
- The "command" specifies which command we want to run when the user clicks this menu option. In this case, we want to run the "code-tutor.annotate" command that we defined earlier.
- The "group" specifies where we want this menu option to be shown in the title bar. The "navigation" group is the section that is on the top right of the editor.

<!-- TODO: Add "Group" screenshot -->
![]()

At this point, you can run the extension from the "Run and Debug" view in the sidebar. This will open a new VS Code instance with the extension installed. If you open a project that contains code files and then open a code file, you should see the "Tutor" button in the title bar of the editor. You'll also see a "Tutor" option in the Command Palette.

However, if you click on the "Tutor" button or select the option from the Command Palette, you'll see an error message that says "Command 'code-tutor.annotate' resulted in an error (command 'code-tutor.annotate' not found)". That's because we haven't implemented the command yet, so let's do that next.

## Step 3: Implement the "Tutor" command

Commands are defined in the `package.json` file, but they are implemented in the `src/extension.ts` file. Open this file and locate the following line.

```ts
const disposable = vscode.commands.registerCommand('code-tutor.helloWorld', () => {
```

Remember that we changed this command in the `package.json` file to be `code-tutor.annotate` instead of `code-tutor.helloWorld`. We also want to register a TextEditor command instead of just a command. This will give us a reference to the current text editor.

Modify the line so that it looks like this:

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {
```

You can now run the extension again, and this time when you click on the "Tutor" button or select the option from the Command Palette, you should see a message that says "Hello from Code Tutor!".

We're now ready to start building the functionality to generate AI-powered code annotations.

## Step 4

To get our Code Tutor annotations working, we'll need to do a few things...

1. Get the code with line numbers from the current editor.
2. Send the code to the Language Model API to get the annotations.
3. Parse the annotations and display them in the editor.

Let's start by getting the code from the current editor. Add the following method directly above the `export function deactivate() { }` line at the bottom of the `extension.ts` file.

```ts
function getCodeWithLineNumbers(textEditor: vscode.TextEditor) {
 let currentLine = textEditor.visibleRanges[0].start.line;
 const endLine = textEditor.visibleRanges[0].end.line;
 let code = '';
 while (currentLine < endLine) {
  code += `${currentLine + 1}: ${textEditor.document.lineAt(currentLine).text} \n`;
  currentLine++;
 }
 return code;
}
```

This code uses the `visibleRanges` property of the TextEditor to get the lines that are currently visible in the editor. It then loops through these lines and adds each one to a string, along with the line number. Finally, it returns the string that contains the code with line numbers.

Now we can call this method from the `code-tutor.annotate` command. Modify the implementation of the command so that it looks like this:

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getCodeWithLineNumbers(textEditor);

});
```

The next step is to call the GitHub Copilot language model. To do this, we first need to specify which chat model we want to use.

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getCodeWithLineNumbers(textEditor);

  // select the 4o chat model
  let [model] = await vscode.lm.selectChatModels({
    vendor: 'copilot',
    family: 'gpt-4o',
  });
});
```

Now we need to send the code to the language model along with a prompt that tells the model to generate annotations for the code. Add the following code to the top of the file directly under the imports.

```ts
const ANNOTATION_PROMPT = `You are a code tutor who helps students learn how to write better code. Your job is to evaluate a block of code that the user gives you. The user is writing You will then annotate any lines that could be improved with a brief suggestion and the reason why you are making that suggestion. Only make suggestions when you feel the severity is enough that it will impact the readibility and maintainability of the code. Be friendly with your suggestions and remember that these are students so they need gentle guidance. Format each suggestion as a single JSON object. It is not necessary to wrap your response in triple backticks. Here is an example of what your response should look like:

{ "line": 1, "suggestion": "I think you should use a for loop instead of a while loop. A for loop is more concise and easier to read." }{ "line": 12, "suggestion": "I think you should use a for loop instead of a while loop. A for loop is more concise and easier to read." }
`;
```

This is a special prompt that instructs the language model on how to generate annotations. It also includes examples for how the model should format its response. This is what allows to to know what format the response will be in, so that we can parse it and display it as annotations. Now we can pass the prompt and the code with line numbers to the model.

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getCodeWithLineNumbers(textEditor);

  // select the 4o chat model
  let [model] = await vscode.lm.selectChatModels({
    vendor: 'copilot',
    family: 'gpt-4o',
  });

  // init the chat message
  const messages = [
    vscode.LanguageModelChatMessage.User(ANNOTATION_PROMPT),
    vscode.LanguageModelChatMessage.User(codeWithLineNumbers),
  ];
});
```

We're ready to send the messages to the model and parse the response. First, we'll check to make sure that our model is ready to use. This accounts for when the extension is still loading or the user needs to grant permission or the extension to GitHub Copilot.

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getCodeWithLineNumbers(textEditor);

  // select the 4o chat model
  let [model] = await vscode.lm.selectChatModels({
    vendor: 'copilot',
    family: 'gpt-4o',
  });

  // init the chat message
  const messages = [
    vscode.LanguageModelChatMessage.User(ANNOTATION_PROMPT),
    vscode.LanguageModelChatMessage.User(codeWithLineNumbers),
  ];

  // make sure the model is ready
  if (model) {

    // send the messages array to the model and get the response
    let chatResponse = await model.sendRequest(messages, {}, new vscode.CancellationTokenSource().token);

  }
});
```

Then we'll send the messages to the model and get the response. Chat responses come in as fragments. These fragments usually contain single words, but sometimes they contain just punctuation. In order to display annotations as the response streams in, we want to wait until we have a complete annotation before we display it. Because of the way we have instructed our model to return its response, we know that when we see a closing `}` we have a complete annotation. We can then parse the annotation and display it in the editor.

Add the following function above the `getCodeWithLineNumbers` method in the `extension.ts` file.

```ts
async function parseChatResponse(chatResponse: vscode.LanguageModelChatResponse, textEditor: vscode.TextEditor) {
 let accumulatedResponse = "";

 for await (const fragment of chatResponse.text) {
  accumulatedResponse += fragment;

  // if the fragment is a }, we can try to parse the whole line
  if (fragment.includes("}")) {
   try {
    const annotation = JSON.parse(accumulatedResponse);
    applyDecoration(textEditor, annotation.line, annotation.suggestion);
    // reset the accumulator for the next line
    accumulatedResponse = "";
   }
   catch (e) {
    // do nothing
   }
  }
 }
}
```

Now we can call this method from the `code-tutor.annotate` command. Modify the implementation of the command so that it looks like this:

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getCodeWithLineNumbers(textEditor);

  // select the 4o chat model
  let [model] = await vscode.lm.selectChatModels({
    vendor: 'copilot',
    family: 'gpt-4o',
  });

  // init the chat message
  const messages = [
    vscode.LanguageModelChatMessage.User(ANNOTATION_PROMPT),
    vscode.LanguageModelChatMessage.User(codeWithLineNumbers),
  ];

  // make sure the model is ready
  if (model) {

    // send the messages array to the model and get the response
    let chatResponse = await model.sendRequest(messages, {}, new vscode.CancellationTokenSource().token);

    // parse the response and display the annotations
    await parseChatResponse(chatResponse, textEditor);

  }
});
```

We need one last method to actually display the annotations. VS Code calls these "decorations". Add the following method above the `parseChatResponse` method in the `extension.ts` file.

```ts
function applyDecoration(editor: vscode.TextEditor, line: number, suggestion: string) {

 const decorationType = vscode.window.createTextEditorDecorationType({
  after: {
   contentText: ` ${suggestion.substring(0, 25) + "..."}`,
   color: "grey",
  },
 });

 // get the end of the line with the specified line number
 const lineLength = editor.document.lineAt(line - 1).text.length;
 const range = new vscode.Range(
  new vscode.Position(line - 1, lineLength),
  new vscode.Position(line - 1, lineLength),
 );

 const decoration = { range: range, hoverMessage: suggestion };

 vscode.window.activeTextEditor?.setDecorations(decorationType, [
  decoration,
 ]);
}
```

This method takes in our parsed annotation from the model and uses it to create a decoration. This is done by first creating a `TextEditorDecorationType` that specifies the appearance of the decoration. In this case, we are just adding a grey annotation and truncating it to 25 characters. We'll show the full message when the user hovers over the message.

We are then setting where the decoration should appear. We need it to be on the line number that was specified in the annotation, and at the end of the line.

Finally, we set the decoration on the active text editor which is what causes the annotation to appear in the editor.

And that's it! You can now run the extension and open a code file. When you click on the "Tutor" button or select the option from the Command Palette, you should see the code annotations appear in the editor.

<!-- TODO: Completed project image -->
![]()

## Related content

- [Language Model API extension guide](/api/extension-guides/language-model.md)
- [Tutorial: Create a code tutor chat participant with the Chat API](/api/extension-guides/chat-tutorial.md)
- [VS Code Chat API reference](/api/extension-guides/chat.md)
