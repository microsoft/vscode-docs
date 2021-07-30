---
# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Testing APIs in VS Code allow users to discover and run unit tests in their workspace
---

# Testing API

The Testing API allows Visual Studio Code extensions to discover tests in the workspace and publish results. Users can execute tests in the Test Explorer view, from decorations, and inside commands. With these new APIs, Visual Studio Code supports richer displays of outputs and diffs than was previously possible.

## Examples

There are two test providers maintained by the VS Code team:

- The [sample test extension](https://github.com/microsoft/vscode-extension-samples/tree/main/test-provider-sample), which provides tests in markdown files.
- The [selfhost test extension](https://github.com/microsoft/vscode-selfhost-test-provider), that we use for running tests in VS Code itself.

## Discovering Tests

Tests are provided by the `TestController`, which requires a globally unique ID and human-readable label to create:

```ts
const controller = vscode.tests.createTestController('helloWorldTests', 'Hello World Tests');
```

To publish tests, you add `TestITem`s as children to the controller's `items` collection. `TestItem`s are the foundation of the test API is the `TestItem` interface, and are a generic type that can describe a test case, suite, or tree item as it exists in code. They can, in turn, have `children` themselves, forming a hierarchy. For example, here's a simplified version of how the sample test extension creates tests:

```ts
parseMarkdown(content, {
  onTest: (range, numberA, mathOperator, numberB, expectedValue) => {
    // If this is a top-level test, add it to its parent's children. If not,
    // add it to the controller's top level items.
    const collection = parent ? parent.children : controller.items;
    // Create a new ID that's unique among the parent's children:
    const id = [numberA, mathOperator, numberB, expectedValue].join('  ');

    // Finally, create the test item:
    const test = controller.createTestItem(id, data.getLabel(), item.uri);
    test.range = range;
    collection.add(test);
  },
  // ...
});
```

Similar to Diagnostics, it's mostly up to the extension to control when tests are discovered. A simple extension might watch the entire workspace and parse all tests in all files from the get-go. However, parsing everything immediately may be slow for large workspaces. Instead, you can do two things:

1. Actively discover tests for a file when it's opened in the editor, by watching `vscode.workspace.onDidOpenTextDocument`.
1. Setting `item.canResolveChildren = true` and setting the `controller.resolveHandler`. The `resolveHandler` is called if the user takes an action to demand tests be discovered, such as by expanding an item in the test explorer.

Here's how this strategy might look in an extension that parses files lazily:

```ts
// First, create the `resolveHandler`. This may initially be called with
// "undefined" to ask for all tests in the workspace to be discovered, usually
// when the user opens the Test Explorer for the first time.
controller.resolveHandler = async test => {
  if (!test) {
    await discoverAllFilesInWorkspace();
  } else {
    await parseTestsInFileContents(test);
  }
};

// When text documents are open, parse tests in them.
vscode.workspace.onDidOpenTextDocument(parseTestsInDocument);
// We could also listen to document changes to re-parse unsaved changes:
vscode.workspace.onDidChangeTextDocument(e => parseTestsInDocument(e.document));

// In this function, we'll get the file TestItem if we've already found it,
// otherwise we'll create it with `canResolveChildren = true` to indicate it
// can be passed to the `controller.resolveHandler` to gets its children.
function getOrCreateFile(uri: vscode.Uri) {
  const existing = controller.items.get(uri.toString());
  if (existing) {
    return existing;
  }

  const file = controller.createTestItem(uri.toString(), uri.path.split('/').pop()!, uri);
  file.canResolveChildren = true;
  return file;
}

function parseTestsInDocument(e: vscode.TextDocument) {
  if (e.uri.scheme === 'file' && e.uri.path.endsWith('.md')) {
    parseTestsInFileContents(getOrCreateFile(e.uri), e.getText());
  }
}

async function parseTestsInFileContents(file: vscode.TestItem, contents?: string) {
  // If a document is open, VS Code already knows its contents. If this is being
  // called from the resolveHandler when a document isn't open, we'll need to
  // read them from disk ourselves.
  if (contents === undefined) {
    const rawContent = await vscode.workspace.fs.readFile(file.uri);
    contents = new TextDecoder().decode(rawContent);
  }

  // some custom logic to fill in test.children from the contents...
}
```

The implementation of `discoverAllFilesInWorkspace` can be built using VS Code' existing file watching functionality. When the `resolveHandler` is called, you should continue watching for changes so that the data in the Test Explorer stays up to date.

```ts
async function discoverAllFilesInWorkspace() {
  if (!vscode.workspace.workspaceFolders) {
    return []; // handle the case of no open folders
  }

  return Promise.all(vscode.workspace.workspaceFolders.map(async workspaceFolder => {
    const pattern = new vscode.RelativePattern(workspaceFolder, '**/*.md');
    const watcher = vscode.workspace.createFileSystemWatcher(pattern);

    // When files are created, make sure there's a corresponding "file" node in the tree
    watcher.onDidCreate(uri => getOrCreateFile(uri));
    // When files change, re-parse them. Note that you could optimize this so
    // that you only re-parse children that have been resolved in the past.
    watcher.onDidChange(uri => parseTestsInFileContents(getOrCreateFile(uri)));
    // And, finally, delete TestItems fro removed files. This is simple, since
    // we use the URI as the TestItem's ID.
    watcher.onDidDelete(uri => controller.items.delete(uri.toString()));

    for (const file of await vscode.workspace.findFiles(pattern)) {
      getOrCreateFile(file);
    }

    return watcher;
  }));
}
```

The `TestItem` interface is plain and doesn't have room for custom data. If you need to associate extra information with a `TestItem`, you can use a [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap):

```ts
const testData = new WeakMap<vscode.TestItem, MyCustomData>();

// to associate data:
const item = controller.createTestItem(id, label);
testData.set(item, new MyCustomData());

// to get it back later:
const myData = testData.get(item);
```

It's guaranteed that the `TestItem` instances passed to all `TestController`-related methods will be the same as the ones originally created from `createTestItem`, so you can be sure that getting the item from the `testData` map will work.

For this example, let's just store the type of each item:

```ts
enum ItemType {
  File,
  TestCase,
}

const testData = new WeakMap<vscode.TestItem, ItemType>();

const getType = (testItem: vscode.TestItem) => testData.get(ItemType)!;
```

## Running Tests

Tests are executed through `TestRunProfile`s. Each profile belongs to a specific execution `kind`: run, debug, or coverage. Most test extensions will have at most one profile in each of these groups, but more are allowed. For example, if your extension runs tests on multiple platforms, you could have one profile for each combination of platform and `kind`. Each profile has a `runHandler`, which is invoked when a run of that type is requested.

```ts

function runHandler(shouldDebug: boolean, request: vscode.TestRunRequest, token: vscode.CancellationToken) {
  // todo
}

controller.createRunProfile('Run', vscode.TestRunProfileKind.Run, (request, token) => {
  runHandler(false, request, token);
});

controller.createRunProfile('Debug', vscode.TestRunProfileKind.Debug, (request, token) => {
  runHandler(true, request, token);
});
```

The `runHandler` should call `controller.createTestRun` at least once, passing through the original request. The request contains the tests to `include` in the test run (which is omitted if the user asked to run all tests) and possibly tests to `exclude` from the run. The extension should use the resulting `TestRun` object to update the state of tests involved in the run. For example:

```ts
async function runHandler(request: vscode.TestRunRequest, token: vscode.CancellationToken) {
  const run = controller.createTestRun(request);
  const queue: vscode.TestItem[] = [];

  // Loop through all included tests, or all known tests, and add them to our queue
  if (request.include) {
    request.include.forEach(test => queue.push(test));
  } else {
    controller.items.forEach(test => queue.push(test));
  }

  // For every test that was queued, try to run it. Call run.passed() or run.failed().
  // The `TestMessage` can contain extra information, like a failing location or
  // a diff output. But here we'll just give it a textual message.
  while (queue.length > 0 && !token.isCancellationRequested) {
    const test = queue.pop()!;

    // Skip tests the user asked to exclude
    if (request.exclude?.includes(test)) {
      continue;
    }

    switch (getType(test)) {
      case ItemType.File:
        // If we're running a file and don't know what it contains yet, parse it now
        if (test.children.size === 0) {
          await parseTestsInFileContents(test);
        }
        break;
      case ItemType.TestCase:
        // Otherwise, just run the test case. Note that we don't need to manually
        // set the state of parent tests; they'll be set automatically.
        const start = Date.now();
        try {
          await assertTestPasses(test);
          run.passed(test, Date.now() - start);
        } catch (e) {
          run.failed(test, new vscode.TestMessage(e.message), Date.now() - start);
        }
        break;
    }

    test.children.forEach(test => queue.push(test));
  }

  // Make sure to end the run after all tests have been executed:
  run.end();
}
```

In addition to the `runHandler`, you can set a `configureHandler` on the `TestRunProfile`. If present, VS Code will have UI to allow the user to configure the test run, and call the handler when they do so. From here, you can open files, show a quickpick, or do whatever is appropriate for your test framework.

> VS Code intentionally handles test configuration differently than debug or task configuration. These are traditionally editor or IDE-centric features, and are configured in special files in the `.vscode` folder. However, tests have traditionally been executed from the command line, and most test frameworks have existing configuration strategies. Therefore, in VS Code we avoid duplication of configuration and instead leave it up to extensions to handle.

### Publish-Only Controllers

The presence of run profiles is optional. A controller is allowed to create tests, call `createTestRun` outside of the `runHandler`, and update tests' states in the run without having a profile. The common use case for this are controllers who load their results from an external source, like CI or summary files.

In this case, these controllers should usually pass the optional `name` argument to `createTestRun`, and `false` for the `persist` argument. Passing `false` here instructs VS Code not to retain the test result, like it would for runs in the editor, since these results can be reloaded from an external source externally.

```ts
const controller = vscode.tests.createTestController('myCoverageFileTests', 'Coverage File Tests');

vscode.commands.registerCommand('myExtension.loadTestResultFile', async file => {
  const info = await readFile(file);

  // set the controller items to those read from the file:
  controller.items.replace(readTestsFromInfo(info));

  // create your own custom test run, then you can immediately set the state of
  // items in the run and end it to publish results:
  const run = controller.createTestRun(new vscode.TestRunRequest(), path.basename(file), false);
  for (const result of info) {
    if (result.passed) {
      run.passed(result.item);
    } else {
      run.failed(result.item, new vscode.TestMessage(result.message));
    }
  }
  run.end();
});
```
