---
# DO NOT TOUCH — Managed by doc writer
ContentId:
DateApproved: 3/23/2020

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to create Language Servers to provide rich language features for embedded programming languages in Visual Studio Code.
---

# Language Server for Embedded Programming Languages

Visual Studio Code provides rich language features for programming languages. As you have read in the
[Language Server Extension Guide](/api/language-extensions/language-server-extension-guide), you can write language servers to support any programming languages. However, it involves more effort to enable such support for embedded langauges.

Today, we see an increasing amount of embedded languages, such as:

- JavaScript and CSS in HTML
- JSX in JavaScript
- Interpolation in templating languages, for example Vue, Handlebars and Razor
- HTML in PHP

This guide focuses on implementing language features for embedded languages. If you are interested in providing syntax highlighting for embedded languages, you can find information on the [Syntax Highlight Guide](/api/language-extensions/syntax-highlight-guide#embedded-languages).

This guide includes two samples that illustrates two approaches to build such a language server: **Language Services** and **Request Forwarding**. We'll take a look at both samples and conclude with each approach's pros and cons.

Code for both samples can be found at:

- [Language Server for Embedded Language with Language Services](https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-embedded-language-service)
- [Language Server for Embedded Language with Request Forwarding](https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-embedded-request-forwarding)

Here's the embedded language server we'll be building:

![sample](images/embedded-languages/embedded-lsp-sample.gif)

## Language Services

A **language service** is a library that implements [programmatic language features](/api/language-extensions/programmatic-language-features) for a single language. A **language server** can embed language services to handle embedded languages. Let's take a look at VS Code's HTML support:

- The built-in [`html` extension](https://github.com/microsoft/vscode/tree/master/extensions/html) only provides syntax highlighting and language configuration for HTML
- The built-in [`html-language-features` extension](https://github.com/microsoft/vscode/tree/master/extensions/html-language-features) includes a HTML Language Server to offer programmatic language features for HTML
- The HTML Language Server uses [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice) to support HTML
- The HTML Language Server uses [vscode-css-languageservice](https://github.com/microsoft/vscode-css-languageservice) to support CSS in HTML

The HTML Language Server analyzes a HTML document, breaks it down into language regions and uses the corresponding language service to handle language server requests. For example:

- For auto-completion request at `<|`, the HTML language server uses the HTML language service to find out HTML completions.
- For auto-completion request at `<style>.foo { | }</style>`, the HTML language server uses the CSS language service to find out CSS completions.

Let's take a look at the [`lsp-embedded-language-service` sample](https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-embedded-language-service), a simplified version of the HTML language server that implements auto-completion for HTML and CSS, and diagnostic errors for CSS.

### Language Services Sample

*This sample assumes knowledge of the [Programmatic Language Features topic](/api/language-extensions/programmatic-language-features) and the [Language Server Extension Guide topic](/api/language-extensions/language-server-extension-guide). The code builds on top of [lsp-sample](https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-sample).*

The code is available at: [microsoft/vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-embedded-language-service).

Compared to the [lsp-sample](https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-embedded-language-service), the client side code is the same.

As mentioned above, the server breaks down the document into different language regions to handle the embedded content. Let us take a look at a simple example:

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

- You have to continuously update the language services that your language server depends on
- It can be challenging to include language services that is not written in the same language as your language server. For example, a PHP language server written in PHP would find it cumbersome to include the `vscode-css-languageservice` written in TypeScript.

Let's take a look at **request forwarding**, which would solve the problems above.

## Request Forwarding

In a nutshell, request forwarding works in a similar way as language services. Request forwarding approach also takes language server requests, compute virtual contents and calculate the responses. Their major differences are:

- While the language service approach uses libraries to calculate language server responses, request forwarding sends the request back to VS Code to query all language servers and forward their responses
- The dispatching happens in the **language client**, not the **language server**

Let's take a look at this example again:

```html
<div></div>
<style>.foo { | }</style>
```

Auto completion happens in this way:

- Language Client registers a virtual text document provider for `embedded-content` document using `workspace.registerTextDocumentContentProvider`
- Langauge Client hijacks completion requests for `<FILE_URI>`
- Language Client determines that the request position falls into a CSS region
- Language Client constructs a new URI, such as `embedded-content://css/<FILE_URI>.css`
- Language Client calls `commands.executeCommand('vscode.executeCompletionItemProvider', ...)`
  - VS Code's CSS language server responds to this provider request
  - The virtual text document provider provides CSS language server with virtual content, where all non-CSS code are replaced with whitespace
  - Language Client receives response from VS Code and sends it as the response

With this approach, we are able to compute CSS auto-completion even if our code does not include any library that understands CSS. As VS Code updates its CSS language server, we are able to get the latest CSS language support without having to update our code.

Let's take a look at the sample code.

### Request Forwarding Sample

*This sample assumes knowledge of the [Programmatic Language Features topic](/api/language-extensions/programmatic-language-features) and the [Language Server Extension Guide topic](/api/language-extensions/language-server-extension-guide). The code builds on top of [lsp-sample](https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-sample).*

The code is available at: [microsoft/vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-embedded-request-forwarding).

Keeping a map between document's URI and their virtual documents, and provide them for corresponding requests:

```ts
const virtualDocumentContents = new Map<string, string>()

workspace.registerTextDocumentContentProvider('embedded-content', {
  provideTextDocumentContent: uri => {
    // Remove leading `/` and ending `.css` to get original URI
    const originalUri = uri.fsPath.slice(1).slice(0, -4)
    return virtualDocumentContents.get(originalUri)
  }
})
```

By using the `middleware` option of language client, we hijack request for auto completion:

```ts
let clientOptions: LanguageClientOptions = {
  documentSelector: [{ scheme: 'file', language: 'html' }],
  middleware: {
    provideCompletionItem: async (document, position, context, token, next) => {
      const originalUri = document.uri.toString()
      // Get virtual CSS document, with all non-CSS code replaced with whitespace
      virtualDocumentContents.set(originalUri, getCSSVirtualContent(htmlLanguageService, document.getText()))

      /**
       * Compute a virtual URI. The `embedded-content` scheme makes sure that our registered
       * `TextDocumentProvider` is used. The ending `.css` suffix makes sure that VS Code forwards
       * the request to CSS language server
       */
      const vdocUriString = `embedded-content://css/${encodeURIComponent(originalUri)}.css`
      const vdocUri = Uri.parse(vdocUriString)

      // Ask VS Code for completions on the virtual file
      return await commands.executeCommand<CompletionList>(
        'vscode.executeCompletionItemProvider',
        vdocUri,
        position,
        context.triggerCharacter
      )
    }
  }
}
```

## Conclusion

Both approaches have their pros and cons.

Language Service:

- \+ Full control of the language server and the user experience
- \+ No dependencies on other language servers. All code is in one repository
- \+ The language server can be reused in all [LSP-compliant code editors](https://microsoft.github.io/language-server-protocol/implementors/tools/)
- \- Might be hard to embed language services written in other languages
- \- Need continued maintenance to get new features from language service dependencies

Request forwarding:

- \+ Avoid issues embedding language services not written in the language server's language (e.g Embedding C# compiler in a Razor language server to support C#)
- \+ No maintenance needed to get new features upstream from other language services
- \+ Do not work with diagnostics errors which are pushed from Language Server
- \- Hard to share state to other language servers because of lack of control
- \- Cross-language features might be hard to implement (for example, providing CSS completion for `.foo` when `<div class="foo">` is present)

Overall, we recommend building a language server by embedding language services, as this approach gives you more control over the user experience and the server is reusable for any LSP-compliant editors. However, if you have a simple use case where embedded content can be easily handled without context or language server state, or if bundling the Node library is a problem for you, you can consider the Request Forwarding approach.