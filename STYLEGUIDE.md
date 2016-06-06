# Introduction
One of the goals of our documentation is to get users to "wow" faster.  This includes helping them learn what they need to learn to have an excellent experience in VS Code in the shortest amount of time possible and with the least amount of effort on their part.

Well-taken screenshots can break up the monotony of reading and help users more easily understand what they need to know.

# Images and Screenshots

## Simplify
A good rule of thumb in visual design is to remove as much as possible to simplify until doing so breaks the design; then add the thing back that, if removed, would break the design.  Similarly, we should strive for simplicity in how we visually explain how to use VS Code.  Actions to help us achieve this include

- **Crop screenshots** to show only the particular feature we are demonstrating
- **Simplest code possible** to convey a concept and avoid creating a distraction
- **Leave out OS chrome**, unless it is relevant to the subject matter
- **Avoid unusual states** in our UI that are not relevant to the subject matter and could be distracting or confusing (such as indicators for unsaved/uncommitted code, linting squiggly lines in the editor, selected text, breakpoints, open panels that aren't needed like find/replace or console/output).
- **Be concise** and avoid excessive stray lines or comments that are not adding value.
- **Disable irrelevant extensions** that would alter the look of VS Code from what users would otherwise have on a fresh install, unless we are discussing extensions, etc.
- **Content should be intuitive** — strings, variable names, etc. should help users understand the concepts and not be distracting.

## Unified style
Stick with one consistent theme (the *default dark theme*), unless we are discussing themes or some other concept that would warrant using a different theme.

**Full product**

For showing off the value of the product or features that need context, you can take a screenshot of the entire product.  Just remove the chrome of the OS so that it's universally applicable (unless the chrome is relevant).

**Features**

When context is not needed to explain features, crop into the feature and ensure we don't lose any of the feature's edges or incorporate pixels from the background.

**In-context Features**

If it's useful to show a feature in context, but the context could be distracting, then consider layering the feature as it would normally appear on top of its context.  Then blur or lower the opacity of the background.  Ensure we are consistent with all other instances of where we do this. 

## Avoid chopping things off
Code should be visually complete, when possible.  We should strive to show both opening and closing braces, parentheses and quotes, unless the contents are too long to do so.

As much as possible, we should not partially obscure or cut off text or other parts of the UI.


## 1:1 pixel ratio
At medium screen sizes and larger (> 992px), screenshots should be exactly 1:1 pixel ratio so that text and edges are razor sharp.  This also ensures visual consistency across multiple screenshots and what users see on their copies of VS Code.
