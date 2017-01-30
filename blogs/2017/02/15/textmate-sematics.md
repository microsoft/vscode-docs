---
Order: 
TOCTitle: TextMate sematics
PageTitle: TextMate sematics
MetaDescription: TextMate sematics
Date: 2017-02-15TextMate sematics
Author: Alexandru Dima
---
# TextMate sematics

## Theme matching rules now respect TextMate semantics

Since our first version, VS Code has supported TextMate themes. There was, however one catch: we would leave it up to CSS to do token <-> theme rule matching. This was a great way to make progress at the time, but it also meant that TextMate themes were not rendered accurately in VS Code (i.e. TM theme matching semantics are different than CSS class name matching semantics). The issues have been piling up and we had to rip the band-aid sooner rather than later (see [issue #3008](https://github.com/Microsoft/vscode/issues/3008) for a whole bunch of differences caused by this shortcut).

> Note: The TextMate theme matching semantics are documented [here](https://manual.macromates.com/en/themes) and [here](https://manual.macromates.com/en/scope_selectors.html). VS Code 1.9.1 still does not support excluding selectors, but they are not used in the most popular TM themes.

## TextMate theme rules semantics

Here is a TypeScript file rendered with the Monokai theme in VS Code 1.8.1 and in VS Code 1.9.0. Notice how in VS Code 1.8.1, the public method `greet` would incorrectly get an underline:

| TypeScript, Monokai, 1.8.1 | TypeScript, Monokai, 1.9.0 |
|---|---|
| ![Monokai 1.8.1](images/1_9/monokai-before.png) | ![Monokai 1.9.0](images/1_9/monokai-after.png) |

Here are two Monokai theme rules that would impact the rendering before (as JSON here for brevity; the original is in XML):

```json
...
// Function name
{ "scope": "entity.name.function", "fontStyle": "", "foreground":"#A6E22E" }
...
// Class name
{ "scope": "entity.name.class", "fontStyle": "underline", "foreground":"#A6E22E" }
...
```

Before, we would generate dynamic CSS rules from the theme rules. e.g.:
```css
...
/* Function name */
.entity.name.function { color: #A6E22E; }
...
/* Class name */
.entity.name.class { color: #A6E22E; text-decoration: underline; }
...
```

Without going into too much details on how TextMate grammars work, the TextMate TypeScript grammar generates the following scopes for `greet` (from most specific to least specific):

* `entity.name.function.ts`
* `meta.definition.method.ts`
* `meta.method.declaration.ts`
* `meta.class.ts`
* `source.ts`

When rendering a token, we would ultimately take all the scopes except the least specific one, split them on `"."`, remove duplicate pieces, and render `greet` using the following HTML:

```html
<span class="token ts meta class entity name declaration method function">greet</span>
```

Before, due to the fact that both CSS selectors would match the token, we would get both Monokai theme rules applying, even if the `entity.name.class` rule should not have matched the token according to TM theme matching semantics.

Now, we generate a [trie](https://en.wikipedia.org/wiki/Trie) when we load a theme, and at each leaf node we hold on to a set of theme rules that might match. Then, **at tokenization time**, instead of allocating an array of scopes for each token, we have introduced an immutable linked list that matches each scope as it is added to the list. Ultimately, this makes it possible to represent a token using directly resolved colors, font style information, some other useful metdata etc. in 64 bits (32 bits for the start offset of the token and 32 bits for the token metadata) in a single pass over the input text.

We now generate dynamic CSS rules containing only the minimum information. e.g. (this color is the 5th distinct color appearing in the Monokai theme):
```css
.mtk5 { color: #A6E22E; }
```

And the html used to render the token:
```html
<span class="mtk5">greet</span>
```

In this Monokai example, the difference is quite small, but for some themes, the differences in CSS selectors matching rules and TM theme matching rules yield significant results:

| HTML, Quiet Light, 1.8.1 | HTML, Quiet Light, 1.9.0 |
|---|---|
| ![Quiet Light 1.8.1](images/1_9/quiet-light-before.png) | ![Quiet Light 1.9.0](images/1_9/quiet-light-after.png) |

| HTML, Red, 1.8.1 | HTML, Red, 1.9.0 |
|---|---|
| ![Red 1.8.1](images/1_9/red-before.png) | ![Red 1.9.0](images/1_9/red-after.png) |

## Other advantages

* Due to storing only 64 bits per token in [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), we are getting good memory usage reductions, especially in minified files (that have a high token count / character count ratio)
* Although theme matching now occurs in the tokenization phase, we are observing faster overall tokenization times due to the more efficient memory usage (i.e. avoiding allocating arrays of scopes that then cause GC pauses) and the single-pass nature of the new implementation (i.e. there were three passes over a line before).
* Rendering a frame is faster because:
  * the generated size of the HTML for a line has reduced significantly
  * the number of class names needed to be matched by CSS is reduced significantly
* Finally, having resolved token color information in JavaScript means we can begin working on an efficient minimap implementation.

## New tooling

We have introduced a new widget to help inspect the scopes of a token and the matching theme rule. It is under `F1 > Developer Tools: Inspect TM Scopes`

![Inspect TM Scopes](images/1_9/inspect-tm-scopes.png)

If desirable, it can be easily bound to a keybinding:

```json
{
	"key": "ctrl+k ctrl+t",
	"command": "editor.action.inspectTMScopes",
	"when": "editorTextFocus"
}
```

## Monospace fonts

We need to buy ourselves some time from rendering a frame, time that can be later spent on painting a minimap.

We have added a heuristic that reduces the time taken to paint a frame in the editor significantly in certain conditions (that occur more than 95% of the time).

If the font you are using is monospace (most of the programming fonts are monospace), if a certain line consists only of ASCII characters (most of the lines in source code stick to the ASCII range 32-126 or tabs), and if certain editor decorations (like the color boxes in CSS are not present on a line), we can skip interrogating the browser about where the text has ended up painted and simply do the math in JavaScript.

This optimization saves us a forced browser layout and further decreases the time it takes us to paint a frame.

> Note: If you notice the cursor being rendered slightly off from the text, please let us know. You can disable this optimization via `editor.disableMonospaceOptimizations`
