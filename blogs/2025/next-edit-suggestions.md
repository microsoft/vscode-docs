---
Order: 92
TOCTitle: Copilot Next Edit Suggestions (preview)
PageTitle: Copilot Next Edit Suggestions (preview)
MetaDescription: Announcing the Next Edit Suggestions (NES) feature for GitHub Copilot in Visual Studio Code.
Date: 2025-02-05
Author: Brigit Murtaugh, Burke Holland, Olivia Guzzardo
---

# Copilot Next Edit Suggestions (preview)
Feburary 5, 2025 by [Brigit Murtaugh](https://github.com/bamurtaugh), [Burke Holland](https://github.com/burkeholland), [Olivia Guzzardo](https://github.com/olguzzar)

GitHub Copilot code completions are great at autocomplete, providing the predictive ability to suggest the code that was in your head without you even having to ask for it. But since most coding activity is editing existing code, it's a natural evolution of completions to also help with edits. Edits are often not made in isolation - there's a logical flow of what edits need to be made as you iterate on your project - and they can happen both at your current cursor location and further away.

We're excited to announce the preview of **Copilot Next Edit Suggestions** (aka "Copilot NES"), which is this evolution of Copilot completions.

Based on the edits you're making, NES both predicts the location of the next edit you'll want to make and what that edit should be. NES helps you stay in the flow, suggesting future changes relevant to your current work, and you can simply `kbstyle(Tab)` to quickly navigate and accept suggestions.

<!-- TODO: Video about NES from Rob -->

You may have seen [previous work from the GitHub Next Team on NES](https://githubnext.com/projects/copilot-next-edit-suggestions/) – this is the evolution of the Next Team's great work, now part of the existing GitHub Copilot extensions.

## Getting your first suggestions
You can enable NES via the VS Code setting `setting(github.copilot.nextEdits.enabled)`.

> [!NOTE]
> If you are a Copilot Business or Enterprise user, your organization admin will need to enable NES, in addition to you setting `setting(github.copilot.nextEdits.enabled)` in your editor.
<!-- TODO: Any other details or actionable link? -->

Like completions, all you need to do to start getting suggestions from NES is to start coding!

When you're presented with an edit suggestion, you can navigate to it with the `kbstyle(Tab)` key and then accept it with the `kbstyle(Tab)` key again, saving you time to find the next relevant edit (no manual searching through files or references required).

An arrow in the gutter indicates if there is an edit suggestion available. If an edit suggestion is below the current editor view, the arrow will point down instead of right.

<!-- TODO: Add image or gif; gif with screencast mode (to show using tab) may be most effective -->

You can hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:

<!-- TODO: Add image -->

Suggestions may span a single symbol, an entire line, or multiple lines, depending on the scope of the potential change.

## Example scenarios
Copilot NES is an expert companion as you make changes that may cascade throughout your file or project. The following are a few examples where NES shines.

**Changing intent:** Copilot NES suggests changes that match a change in intent. For example, changing a class from `point` to `point3d` will add a `z` variable to the class definition and its distance calculation.
<!-- TODO: Add image -->

**Adding new variables or logic:** Copilot NES helps you use new code you just added. This may be a small change, like calling a new method parameter in the actual method. It could also be more complex: if you added a new command to your VS Code extension's `extension.ts`, when you open `package.json`, NES may suggest adding that command as well.

**Refactoring:** Rename a variable once in a file, and Copilot NES will suggest to update it everywhere else.
<!-- TODO: Add image -->

**Correcting mistakes:** Copilot NES helps with mistakes like typos. It can also help with more challenging mistakes in logic, like if a statement should've used `AND` instead of `OR`.
<!-- TODO: Add image -->

## Share your feedback
NES is rapidly evolving, and we can't wait to get your feedback via issues in [our repo](https://github.com/microsoft/vscode-copilot-release) – this will be instrumental to improving the experience.

Please be sure to use [VS Code Insiders](https://code.visualstudio.com/insiders/) and the pre-release version of the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) to get all of the latest features and fixes.

You can read our [full NES docs](aka.ms/gh-copilot-nes-docs) for more information and scenarios as we expand the NES experience.

NES is a next step in an AI that anticipates what you'll need to do next - the best prompt is the one that you don't have to write.

We can't wait to see what you build!

Happy coding!

Brigit, Burke, and Olivia
