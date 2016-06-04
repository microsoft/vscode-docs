# Introduction

# Images and Screenshots

## Simplify
A good rule of thumb in visual design is to remove as much as possible to simplify until it breaks the design; then add the thing back that, if removed, would break the design.  Similarly, we should strive for simplicity in how visually explain how to use VS Code.  Ways we can acheive this include

- Cropping screenshots to show only the particular feature we are demonstrating
- Using the simplest code possible to convey a concept and avoid creating a distraction
- Cropping off OS chrome, unless it is relevant to the subject matter
- Avoiding unusual states in our UI that are not relevant to the subject matter and could be distracting or confusing (such as notificiations for unsaved/uncommitted files, linting squigly lines in the editor, selected text, breakpoints, open panels that aren't needed like find/replace or console/output).
- Remove stray lines or comments that are not adding value.
- Disable extensions that would alter the look of VS Code from what users would otherwise have on a fresh install, unless we are discussing extensions, etc...
- Make sure contents of strings, variable names, etc... are helping users understand the concepts and are not distracting.

## Unified style
Stick with one consistent theme (the default dark theme), unless we are discussing themes or some other concept that would warrent using a different theme.

** Full product **
For showing off the value of the product or features that need context, you can take a screenshot of the entire product.  Just remove the chrome of the OS so that its universally applicable (unless the chrome is relevant).

** Features **
When context is not needed to explain features, crop into the feature and ensure we don't lose any of the feature's edges or incorporate pixels from the background.

** In-context Features **
If it's useful to show the feature in context, but the context would be distracting potentially, then consider layering the feature as it would normally appear of the its context in the background.  Then you can blur or lower the opacity of the background.  Ensure we are consistent with all other instances of where we do this. 

## Avoid chopping things off
Code should be visually complete when possible.  We should strive to show both opening and closing braces, parantheses and quotes, unless the contents are too long to do so.

As much as possible, we should not partially obscure text or other parts of the UI.


## 1:1 pixel ratio
At medium screen sizes and larger (> 992px), screenshots should be exactly 1:1 pixel ratio so that text and edges are razor sharp.  This also ensures consistency across multiple screenshots and what users see in the actual program on their machine.
