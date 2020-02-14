---
DateApproved:
MetaDescription:
---

# Embedded Languages

TODO work in progress
- samples
- references to APIs
- graphs

In VSCode each file is associated with a language. Language supports such as code completion, hovers, are contributed to that language.
Same for syntax highlighting which is done through text mate grammars which are contributed to the language.

When a language allows to embedded snippets of an other language (e.g. CSS in HTML or HTML in PHP) there are various techniques to achive that.

Embedded syntax highlighting

TextMapte grammars have a feature called grammar injection where new rules can be added to the grammar of the host language.

Often this leads to very complex solutions and is also not very performant and it's worth to explore to directly embedd the rules embedded language un the host grammar.

Language features for embedded languages

There are two appraoches:

Include the support for embedded langauegs in the host language server

The language server also implements support for the embedded language. It can do that by including libraries that provide that support. For example there are easy to use node modules for [css, less, scss](https://github.com/Microsoft/vscode-css-languageservice), [html](https://github.com/Microsoft/vscode-html-languageservice) and [json](https://github.com/Microsoft/vscode-json-languageservice) or more basic language supports for [typescript](https://github.com/Microsoft/typescript)

Forward requests to an other language server

Forward requests to an other language server as done in [intelephense](https://github.com/bmewburn/vscode-intelephense).

The other language services are implemented in their own processes and the standardized way of communicating with other language servers is through documents.


The first approach has the following advantages
+ Full control of the user experience. Completion proposals, hovers... can be tuned to apply to the situation.
+ No dependencies on other language servers, self contained server that is easy to embedded also in other editors or IDE.
- Only possible if the language support is avilable to be embedded
- New features are not availaable unless hooked up bu the implementer of the language server.

The second approach has the following advantages
+ not everything needs to be added to the same language server, avoiding intergration issues sucha s when some parts are implemented in other programming languages (e.g. Embedding a node library into a C++ library)
+ now need to reimplement the features for the embedded language.
- state across the language parts is difficult to implement.
- some features might need state from other language servers which is very hard to implement.

In either case the embedded content needs to be escaped according to the owner language. E.g `>` needs to be `&gt`.




