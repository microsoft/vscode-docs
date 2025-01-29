---
Order: 92
TOCTitle: Copilot Next Edit Suggestions (preview)
PageTitle: Copilot Next Edit Suggestions (preview)
MetaDescription: Announcing the Next Edit Suggestions (NES) feature for GitHub Copilot in Visual Studio Code.
Date: 2025-02-05
Author: Brigit Murtaugh, Burke Holland
---

# Copilot Next Edit Suggestions (preview)
Feburary 5, 2025 by [Brigit Murtaugh](https://github.com/bamurtaugh), [Burke Holland](https://github.com/burkeholland)

GitHub Copilot code completions are great at autocomplete - they can predict and suggest the code that was in your head, without you even having to ask for it. But since most coding activity is editing existing code, it's a natural evolution of completions to also help with edits.

Edits are often not made in isolation - there's a logical flow of what edits need to be made as you iterate on your project - and they can happen both at your current cursor location and further away.

We're excited to announce the preview of **Copilot Next Edit Suggestions** (aka "Copilot NES"), which is this evolution of Copilot completions.

<!-- TODO: Update to video with voiceover from Olivia -->
<video src="nes-video-silent.mp4" width="720" controls>
    Copilot NES video walkthrough.
</video>

Based on the edits you're making, Copilot NES both predicts the location of the next edit you'll want to make and what that edit should be. NES helps you stay in the flow, suggesting future changes relevant to your current work, and you can simply `kbstyle(Tab)` to quickly navigate and accept suggestions.

You may have seen [previous work from the GitHub Next Team on NES](https://githubnext.com/projects/copilot-next-edit-suggestions/) – this is the evolution of the Next Team's great work, now part of the existing GitHub Copilot extensions.

## Getting your first suggestions
You can enable Copilot NES via the VS Code setting `setting(github.copilot.nextEdits.enabled)`.

> [!NOTE]
> If you are a Copilot Business or Enterprise user, an administrator of your organization must opt in to the use of previews of Copilot features, in addition to you setting `setting(github.copilot.nextEdits.enabled)` in your editor.
>
> You can learn more about [managing policies for Copilot in your organization](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization).

Like completions, all you need to do to start getting suggestions from NES is to start coding!

When you're presented with an edit suggestion, you can navigate to it with the `kbstyle(Tab)` key and then accept it with the `kbstyle(Tab)` key again, saving you time to find the next relevant edit (no manual searching through files or references required).

An arrow in the gutter indicates if there is an edit suggestion available. If an edit suggestion is below the current editor view, the arrow will point down instead of right:
![NES with arrow directions changing](nes-arrow-directions.gif)

<!-- ![NES with right arrow](scan-right-highlight.png) -->
<!-- ![NES with down arrow](scan-down-highlight.png) -->

You can hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:
![NES gutter menu gif](nes-gutter.gif)
<!-- ![NES gutter menu expanded](gutter-menu-highlighted.png) -->

Suggestions may span a single symbol, an entire line, or multiple lines, depending on the scope of the potential change.

## Example scenarios
Copilot NES is your AI companion as you make changes that may cascade throughout your file or project, and you'll see it shine in a variety of scenarios.

Our development team has been self-hosting on NES for a while, and one of our engineers remembers one of his first "aha!" moments with NES. He was writing a condition along the lines of `if (something !== 'a' || something !== 'b')`. NES caught that this statement would always evaluate to true (thanks De Morgan's Law!) and suggested replacing `||` with `&&` to make the code valid:
![NES fixing an if statement mistake](nes-de-morgan.gif)

The following are just a few more examples where NES shines.

**Catching and correcting mistakes:** Mistakes are a natural part of writing code, and Copilot NES is there to help catch them (sometimes before you even realize the mistake was there!).

NES helps with small mistakes like typos - maybe you were coding quickly in the zone, and you wrote `conts` instead of `const`:
![NES fixing a typo from "conts" to "const"](nes-typo.gif)

NES can also help with more challenging mistakes in logic, like a return statement that should've used `<=` instead of `>`:
![NES fixing a fibonacci logic mistake](nes-fib-logic.gif)

**Changing intent:** Copilot NES suggests changes that match a change in intent. For example, changing a class from `Point` to `Point3D` will lead to a suggestion to add a `z` variable to the class definition and to the distance calculation:
![NES gif for updating Point to Point3D](nes-point.gif)
<!-- ![NES for updating Point to Point3D](point3d-distance.png) -->

**Using newly added variables or logic:** Copilot NES helps you use new code you just added. This may be a small change, like calling a new method parameter in the actual method.

It could also be more complex: if you added a new command to your VS Code extension's `extension.ts`, NES will first suggest to clean up the command in `extension.ts`. Then when you open `package.json`, NES may suggest registering that command as well:
![Updating extension.ts and package.json with a new command](nes-extension-and-package.gif)
<!-- ![Add command in package.json](add-disposable.png) -->
<!-- ![Add command in package.json](call-disposable-full.png) -->

**Refactoring:** If you use a new name or naming pattern, Copilot NES suggests to rename subsequent variables similarly. After copy-pasting some code, NES will suggest how to adjust it to match the current code where the paste happened.

## Share your feedback
Copilot NES is rapidly evolving, and we can't wait to get your feedback via issues in [our repo](https://github.com/microsoft/vscode-copilot-release) – this will be instrumental to improving the experience.

Please be sure to use [VS Code Insiders](https://code.visualstudio.com/insiders/) and the pre-release version of the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) to get all of the latest features and fixes.

You can read our [full NES docs](https://aka.ms/gh-copilot-nes-docs) for more information and scenarios as we expand the NES experience.

We're excited about NES as a next step in an AI where the LLM anticipates what you'll need to do next - the best prompt is the one that you don't have to write. We hope you're excited too and look forward to seeing what you build!

Happy coding!

Brigit and Burke
