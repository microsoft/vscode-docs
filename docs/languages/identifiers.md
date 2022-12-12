---
Area: languages
TOCTitle: Language Identifiers
ContentId: 3f773ade-7e71-4fb9-9bb9-d9e0b20fa799
PageTitle: Visual Studio Code language identifiers
DateApproved: 12/7/2022
MetaDescription: Visual Studio Code language mode identifiers
---
# Language Identifiers

In Visual Studio Code, each [language mode](/docs/languages/overview.md#changing-the-language-for-the-selected-file) has a unique specific language identifier. That identifier is rarely seen by the user except in the settings, for example, when associating file extensions to a language:

```json
    "files.associations": {
        "*.myphp": "php"
    }
```

Note that casing matters for exact identifier matching ('Markdown' != 'markdown')

The language identifier becomes essential for VS Code extension developers when adding new language capabilities or when replacing a language support.

Every language defines its *id* through the `languages` configuration point in the extension's `package.json` file:

```json
    "languages": [{
        "id": "java",
        "extensions": [ ".java", ".jav" ],
        "aliases": [ "Java", "java" ]
    }]
```

Language supports are added using the language identifier:

```json
    "grammars": [{
        "language": "groovy",
        "scopeName": "source.groovy",
        "path": "./syntaxes/Groovy.tmLanguage.json"
    }],
    "snippets": [{
        "language": "groovy",
        "path": "./snippets/groovy.json"
    }]
```

```typescript
languages.registerCompletionItemProvider('php', new PHPCompletionItemProvider(), '.', '$')
```

## New identifier guidelines

When defining a new language identifier, use the following guidelines:

- Use the lowercased programming language name.
- Search for other extensions in the Marketplace to find out if a language identifier has already been used.

## Known language identifiers

The following table lists known language identifiers:

Language | Identifier
-------- | ----------
ABAP | `abap`
Windows Bat | `bat`
BibTeX | `bibtex`
Clojure | `clojure`
Coffeescript | `coffeescript`
C | `c`
C++ | `cpp`
C# | `csharp`
CUDA C++ | `cuda-cpp`
CSS | `css`
Diff | `diff`
Dockerfile | `dockerfile`
F# | `fsharp`
Git | `git-commit` and `git-rebase`
Go | `go`
Groovy | `groovy`
Handlebars | `handlebars`
Haml | `haml`
HTML | `html`
Ini | `ini`
Java | `java`
JavaScript | `javascript`
JavaScript React | `javascriptreact`
JSON | `json`
JSON with Comments | `jsonc`
LaTeX | `latex`
Less | `less`
Lua | `lua`
Makefile | `makefile`
Markdown | `markdown`
Objective-C | `objective-c`
Objective-C++ | `objective-cpp`
Perl | `perl` and `perl6`
PHP | `php`
Plain Text | `plaintext`
PowerShell | `powershell`
Pug | `jade`, `pug`
Python | `python`
R | `r`
Razor (cshtml) | `razor`
Ruby | `ruby`
Rust | `rust`
SCSS | `scss` (syntax using curly brackets), `sass` (indented syntax)
ShaderLab | `shaderlab`
Shell Script (Bash) | `shellscript`
Slim | `slim`
SQL | `sql`
Stylus | `stylus`
Swift | `swift`
TypeScript | `typescript`
TypeScript React | `typescriptreact`
TeX | `tex`
Visual Basic | `vb`
Vue | `vue`
Vue HTML | `vue-html`
XML | `xml`
XSL | `xsl`
YAML | `yaml`
