---
Order: 46
TOCTitle: Language Server Index Format
PageTitle: Language Server Index Format
MetaDescription: Rich Code Navigation without Checkout
Date: 2019-02-10
ShortDescription: Rich Code Navigation without Checkout
Author: Dirk Bäumer
---

## The Language Server Index Format (LSIF) - Rich Code Navigation without Checkout

There are many scenarios where the focus of a developer is on reading and comprehending code and not on authoring new code. For example you want to browse an existing code version in a repository like GitHub or you want to review a pull request.

To do this today you typically check out a branch or clone a repository, open your preferred development tool, and finally you can read and navigate the code. Now, wouldn't it be cool if you could do this without first cloning the repo? You could do this all right from within your tool and still get the code comprehension features like hover, go to definition and find all references. The blog post [A first look at rich code navigation](https://code.visualstudio.com/blogs/2018/12/04/rich-navigation) illustrates this scenario for a Pull Request review.

The goal of the Language Server Index Format (LISF, pronounced like "else if") is to support rich code navigation in development tools or a Web UI without having to checkout code. This is similar in spirit as the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) which simplified the integration of rich code editing capabilities into adevelopment tool.

Why not simply use a corresponding LSP language servers? LSP provides rich code authoring features like auto complete or format on type and also support rich code navigation. To provide these features efficiently a language server requires to have all the code files available on a local disk. It also reads parts or all of the files into memory and computes abstract syntax trees to power the features. The goal of the Language Server Index Format is to augment the LSP protocol to support rich code navigation features without these requirements. LSIF defines a standard format for language servers or other programming tools to emit their knowledge about a code workspace. This dumped information can later be used to answer LSP requests for the same workspace without running a language server.

## The Language Server Index Format

LSIF builds on LSP and it uses the same data types as defined in LSP. At a high level, LSIF models the data returned from language server requests. Same as LSP, LSIF  doesn't contain any program symbol information nor does the LSIF define any symbol semantics (e.g. what makes the definition of a symbol or when a method overrides another method). The LSIF therefore doesn't define a symbol database, which is consistent with the LSP approach.

Using LSP data types as the base for LSIF has another advantage: it can easily be integrated into tools or servers which already understand LSP.

Let's have a look at an example. We start with a simple Typescript file named `sample.ts` with the content below:

```typescript
function bar(): void {
}
```

Hovering over `bar()` shows the following hover in VS Code:

![Hover over Bar](./hover.png)

This hover information is expressed in LSP using the `Hover` type:

```typescript
export interface Hover {
    /**
     * The hover's content
     */
    contents: MarkupContent | MarkedString | MarkedString[];
    /**
     * An optional range
     */
    range?: Range;
}
```

In the above example the concrete value is:

```typescript
{
  contents: [
    { language: "typescript", value: "function bar(): void" }
  ]
}
```

A client tool would retrieve the hover content from a language server by sending a `textDocument/hover` request for document `file:///Users/dirkb/sample.ts` at position `{line: 0, character: 10}`.

LSIF defines a format that language servers or standalone tools emit to describe the tuple `['textDocument/hover', 'file:///Users/dirkb/sample.ts', {line: 0, character: 10}]` that resolves the request for the above hover. The data can then be taken and persisted into a database.

LSP requests are position based, however results often only vary for ranges and not for single positions. In the above hover example the hover value is the same for all positions of the identifier `bar`. This means the same hover value is returned when a user hovers over `b` in `bar` or over `r` in `bar`. To make the emitted data more compact the LSIF uses ranges instead of positions. For this example a LSIF tool emits the tuple `['textDocument/hover', 'file:///Users/dirkb/sample.ts', { start: { line: 0, character: 9 }, end: { line: 0, character: 12 }]` which includes range information.


LSIF uses graphs to emit this information. In the graph an LSP request is represented with edges and documents. The ranges or request results (e.g the hover) are represented using vertices. This format has the following benefits:

- for a given code range there can be different results. For example, a user is interested in the hover value, the location of the definition of the range, or to find all references for this range. LSIF therefore links these results with the range.
- extending the format with additional request types can easily be done by adding new edge kints.
- it is possible to emit data as soon as it is available. This enables streaming rather than having to store large amounts of data in memory. For example, emitting data for a document should be done for each file as the parsing progresses.

For the Hover example the emitted LSIF graph data looks as follows:

```typescript
// a vertex representing the document
{ id: 1, type: "vertex", label: "document", uri: "file:///Users/dirkb/sample.ts", languageId: "typescript" }
// a vertex representing the range for the identifier bar
{ id: 4, type: "vertex", label: "range", start: { line: 0, character: 9}, end: { line: 0, character: 12 } }
// an edge saying that the document with id 1 contains the range with id 4
{ id: 5, type: "edge", label: "contains", outV: 1, inV: 4}
// a vertex representing the actual hover result
{ id: 6, type: "vertex", label: "hoverResult",
  result: {
    contents: [
      { language: "typescript", value: "function bar(): void" }
    ]
  }
}
// an edge linking the hover result to the range.
{ id: 7, type: "edge", label: "textDocument/hover", outV: 4, inV: 6 }
```

The corresponding graph looks like this:

![LSIF graph for a hover](./hoverResult.png)

The LSP also supports requests that only take a document as a parameter (they are not position based). Some of them are interesting for code comprehension features as well. Examples are to list all document symbols or to compute all folding ranges. These requests are modeled in LSIF in the form `[request, document]` -> result. Lets again look at an example:

```typescript
function bar(): void {
  console.log('Hello World!');
}
```

The folding range result for the document containing above function bar is emitted like this:

```typescript
// a vertex representing the document
{ id: 1, type: "vertex", label: "document", uri: "file:///Users/dirkb/sample.ts", languageId: "typescript" }
// a vertex representing the folding result
{ id: 2, type: "vertex", label: "foldingRangeResult", result: [ { startLine: 0, startCharacter: 20, endLine: 2, endCharacter: 1 } ] }
// an edge connecting the folding result to the document.
{ id: 3, type: "edge", label: "textDocument/foldingRange", outV: 1, inV: 2 }
```

![LSIF graph for a folding range result](./foldingRange.png)

These are only two example for LSP requests supported by the LSIF. Besides these the current version of the [LSIF specification](https://github.com/Microsoft/language-server-protocol/blob/master/indexFormat/specification.md) supports document symbols, document links, go to definition, go to declaration, go to type definition, find all references and go to implementation.


## We need your feedback!

At this point have made good initial progress to share the LSIF specification and we wanted to start an open conversation with the community about what we're working on. For feedback please comment on the issue [Language Server Index Format](https://github.com/Microsoft/language-server-protocol/issues/623).

## How to get started

To get started with LSIF you can have a look at the following resources:

- The [LSIF specification](https://github.com/Microsoft/language-server-protocol/blob/master/indexFormat/specification.md). The document also describes some additional optimizations that have been done to keep the emitted data compact.
- [LSIF Index for TypeScript](https://github.com/Microsoft/lsif-typescript): a tool that generates LSIF for TypeScript. Please see the readme how to use the tool.
- [VS Code extension for LSIF](https://github.com/Microsoft/vscode-lsif-extension): an extension for VS Code that provides language comprehension features using an LSIF JSON dump. In case you implement a new LSIF generator, then you can use this extension to validate it with arbitrary source code.

