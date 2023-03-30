---
# DO NOT TOUCH — Managed by doc writer
ContentId: b76a223a-a210-4bdb-b537-36c1ea6814ae
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to create Language Servers to provide rich language features for embedded programming languages in Visual Studio Code.
---

# Embedded Programming Languages

Visual Studio Code provides rich language features for programming languages. As you have read in the
[Language Server extension guide](/api/language-extensions/language-server-extension-guide), you can write language servers to support any programming language. However, it involves more effort to enable such support for embedded languages.

Today, there are an increasing number of embedded languages, such as:

- JavaScript and CSS in HTML
- JSX in JavaScript
- Interpolation in templating languages, for example Vue, Handlebars and Razor
- HTML in PHP

This guide focuses on implementing language features for embedded languages. If you are interested in providing syntax highlighting for embedded languages, you can find information in the [Syntax Highlight guide](/api/language-extensions/syntax-highlight-guide#embedded-languages).

This guide includes two samples that illustrate two approaches to build such a language server: **Language Services** and **Request Forwarding**. We'll review both samples and conclude with each approach's pros and cons.

Source code for both samples can be found at:

- [Language Server for Embedded Language with Language Services](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-embedded-language-service)
- [Language Server for Embedded Language with Request Forwarding](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-embedded-request-forwarding)

Here's the embedded language server we'll be building:

![sample](images/embedded-languages/embedded-lsp-sample.gif)

Both samples contribute a new language, `html1`, for illustration purpose. You can create a file `.html1` and test the following functionalities:

- Completions for HTML tags
- Completions for CSS in `<style>` tag
- Diagnostics for CSS (only in the Language Services sample)

## Language Services

A **language service** is a library that implements [programmatic language features](/api/language-extensions/programmatic-language-features) for a single language. A **language server** can embed language services to handle embedded languages.

Here's an outline of VS Code's HTML support:

- The built-in [html extension](https://github.com/microsoft/vscode/tree/main/extensions/html) only provides syntax highlighting and language configuration for HTML.
- The built-in [html-language-features extension](https://github.com/microsoft/vscode/tree/main/extensions/html-language-features) includes an HTML Language Server to offer programmatic language features for HTML.
- The HTML Language Server uses [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice) to support HTML.
- The CSS Language Server uses [vscode-css-languageservice](https://github.com/microsoft/vscode-css-languageservice) to support CSS in HTML.

The HTML language server analyzes an HTML document, breaks it down into language regions, and uses the corresponding language service to handle language server requests.

For example:

- For auto-completion request at `<|`, the HTML language server uses the HTML language service to provide HTML completions.
- For auto-completion request at `<style>.foo { | }</style>`, the HTML language server uses the CSS language service to provide CSS completions.

Let's examine the [lsp-embedded-language-service](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-embedded-language-service) sample, a simplified version of the HTML language server that implements auto-completion for HTML and CSS, and diagnostic errors for CSS.

### Language Services sample

>**Note**: This sample assumes knowledge of the [Programmatic Language Features topic](/api/language-extensions/programmatic-language-features) and the [Language Server extension guide](/api/language-extensions/language-server-extension-guide). The code builds on top of [lsp-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample).

The source code is available at [microsoft/vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-embedded-language-service).

Compared to the [lsp-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample), the client-side code is the same.

As mentioned above, the server breaks down the document into different language regions to handle the embedded content.

Here is a simple example:

```html
<div></div>
<style>.foo { }</style>
```

In this case, the server detects the `<style>` tag, and marks `.foo { }` as a CSS region.

Given an auto completion request at a specific position, the server uses the following logic to compute a response:

- If the position falls into any region
  - Handle it with a virtual document with the region's language, while replacing all other regions with whitespace
- If the position falls out of any region
  - Handle it with a virtual document in HTML, while replacing all regions with whitespace

For example, when doing an auto completion in this position:

```html
<div></div>
<style>.foo { | }</style>
```

The server determines that the position is inside the region and computes a virtual CSS document with the following content (█ stands for space)):

```css
███████████
███████.foo { | }████████
```

The server then uses `vscode-css-languageservice` to analyze this document and compute a list of completion items. Because the content now contains no HTML, the CSS language service can handle it without issue. By replacing all non-CSS content with whitespace, we save ourselves from having to manually offset the positions.

The server code handling completion requests:

```ts
connection.onCompletion(async (textDocumentPosition, token) => {
  const document = documents.get(textDocumentPosition.textDocument.uri);
  if (!document) {
    return null;
  }

  const mode = languageModes.getModeAtPosition(document, textDocumentPosition.position);
  if (!mode || !mode.doComplete) {
    return CompletionList.create();
  }
  const doComplete = mode.doComplete!;

  return doComplete(document, textDocumentPosition.position);
});
```

The CSS mode that is responsible for handling all language server requests that fall into CSS regions:

```ts
export function getCSSMode(
  cssLanguageService: CSSLanguageService,
  documentRegions: LanguageModelCache<HTMLDocumentRegions>
): LanguageMode {
  return {
    getId() { return 'css' },
    doComplete(document: TextDocument, position: Position) {
      // Get virtual CSS document, with all non-CSS code replaced with whitespace
      const embedded = documentRegions.get(document).getEmbeddedDocument('css')
      // Compute a response with vscode-css-languageservice
      const stylesheet = cssLanguageService.parseStylesheet(embedded)
      return cssLanguageService.doComplete(embedded, position, stylesheet)
    }
  }
}
```

This is a simple and effective approach for handling embedded languages. However, there are some drawbacks with this approach:

- You have to continuously update the language services that your language server depends on.
- It can be challenging to include language services that are not written in the same language as your language server. For example, a PHP language server written in PHP would find it cumbersome to include the `vscode-css-languageservice` written in TypeScript.

We'll now cover **request forwarding**, which would solve the problems above.

## Request Forwarding

In a nutshell, request forwarding works in a similar way as language services. The request forwarding approach also takes language server requests, computes virtual content, and calculates the responses.

The major differences are:

- While the language service approach uses libraries to calculate language server responses, request forwarding sends the request back to VS Code to use extensions that are active and have registered a completion provider for the embedded language.

Here is the simple example again:

```html
<div></div>
<style>.foo { | }</style>
```

Auto completion happens in this way:

- The language client registers a virtual text document provider for `embedded-content` document using `workspace.registerTextDocumentContentProvider`.
- The language client hijacks completion requests for `<FILE_URI>`.
- The language client determines that the request position falls into a CSS region.
- The language client constructs a new URI, such as `embedded-content://css/<FILE_URI>.css`.
- The language client then calls `commands.executeCommand('vscode.executeCompletionItemProvider', ...)`
  - VS Code's CSS language server responds to this provider request.
  - The virtual text document provider provides CSS language server with virtual content, where all non-CSS code is replaced with whitespace.
  - The language client receives response from VS Code and sends it as the response.

With this approach, we are able to compute CSS auto-completion even if our code does not include any library that understands CSS. As VS Code updates its CSS language server, we get the latest CSS language support without having to update our code.

Let's now review the sample code.

### Request Forwarding sample

>**Note**: This sample assumes knowledge of the [Programmatic Language Features topic](/api/language-extensions/programmatic-language-features) and the [Language Server extension guide](/api/language-extensions/language-server-extension-guide). The code builds on top of [lsp-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample).

The source code is available at [microsoft/vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-embedded-request-forwarding).

Keeping a map between document's URI and their virtual documents, and provide them for corresponding requests:

```ts
const virtualDocumentContents = new Map<string, string>()

workspace.registerTextDocumentContentProvider('embedded-content', {
  provideTextDocumentContent: uri => {
    // Remove leading `/` and ending `.css` to get original URI
    const originalUri = uri.path.slice(1).slice(0, -4);
    const decodedUri = decodeURIComponent(originalUri);
    return virtualDocumentContents.get(decodedUri);
  }
})
```

By using the `middleware` option of language client, we hijack request for auto completion:

```ts
let clientOptions: LanguageClientOptions = {
  documentSelector: [{ scheme: 'file', language: 'html' }],
  middleware: {
    provideCompletionItem: async (document, position, context, token, next) => {
      // If not in `<style>`, do not perform request forwarding
      if (!isInsideStyleRegion(htmlLanguageService, document.getText(), document.offsetAt(position))) {
        return await next(document, position, context, token);
      }

      const originalUri = document.uri.toString(true);
      virtualDocumentContents.set(originalUri, getCSSVirtualContent(htmlLanguageService, document.getText()));

      const vdocUriString = `embedded-content://css/${encodeURIComponent(
        originalUri
      )}.css`;
      const vdocUri = Uri.parse(vdocUriString);
      return await commands.executeCommand<CompletionList>(
        'vscode.executeCompletionItemProvider',
        vdocUri,
        position,
        context.triggerCharacter
      );
    }
  }
}
```

## Potential issues

While implementing embedded language servers, we have encountered many issues. Although we do not have a perfect solution yet, we want to give you a heads-up as you are likely to encounter those issues as well.

### Hard to implement language features

Generally, language features that work across language region boundaries are harder to implement. For example, auto-completion or hover content is easy to implement, as you can detect the embedded content's language and compute a response based on the embedded content. However, language features such as formatting or renaming might need special handling. In the case of formatting, you need to handle indentation and formatter settings for multiple regions inside the single document. For renaming, it can be challenging to make it work across different regions within different documents.

### Language Services can be stateful and hard to embed

VS Code's HTML support provides HTML, CSS, and JavaScript language features. Although the HTML and CSS language services are non-stateful, the TypeScript server powering the JavaScript language features is. We only offer basic JavaScript support inside HTML documents because it is hard to inform TypeScript of the project's state. For example, if you include a `<script>` tag that points to the `lodash` library hosted on a CDN, you will not get `_.` completions inside `<script>` tags.

### Encoding and decoding

The main language of a document might have a different encoding or escaping rules than its embedded language. For example, this HTML document is invalid according to the [HTML spec](https://www.w3.org/TR/html401/appendix/notes.html#h-B.3.2):

```html
<SCRIPT type="text/javascript">
  document.write ("<EM>This won't work</EM>")
</SCRIPT>
```

In this case, if the language server for the embedded JavaScript returns a result that contains `</`, it should be escaped to `<\/`.

## Conclusion

Both approaches have their pros and cons.

Language Service:

- \+ Full control of the language server and the user experience.
- \+ No dependencies on other language servers. All code is in one repository.
- \+ The language server can be reused in all [LSP-compliant code editors](https://microsoft.github.io/language-server-protocol/implementors/tools/).
- \- Might be hard to embed language services written in other languages.
- \- Needs continued maintenance to get new features from language service dependencies.

Request forwarding:

- \+ Avoid issues embedding language services not written in the language server's language (for example, embedding C# compiler in a Razor language server to support C#).
- \+ No maintenance needed to get new features upstream from other language services.
- \- Does not yet work with diagnostics errors. The VS Code API currently does not support diagnostic providers that can 'pull' (request) diagnosics. ([Issue](https://github.com/microsoft/vscode/issues/159911)).
- \- Hard to share state to other language servers because of lack of control.
- \- Cross-language features might be hard to implement (for example, providing CSS completion for `.foo` when `<div class="foo">` is present).

Overall, we recommend building a language server by embedding language services, as this approach gives you more control over the user experience and the server is reusable for any LSP-compliant editors. However, if you have a simple use case where embedded content can be easily handled without context or language server state, or if bundling the Node.js library is a problem for you, you can consider the Request Forwarding approach.
