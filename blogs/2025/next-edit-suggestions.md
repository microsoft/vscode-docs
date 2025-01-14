---
Order: 92
TOCTitle: Copilot Next Edit Suggestions (preview)
PageTitle: Copilot Next Edit Suggestions (preview)
MetaDescription: Announcing the Next Edit Suggestions (NES) feature for GitHub Copilot in Visual Studio Code.
Date: 2025-02-05
Author: Brigit Murtaugh
---

# Copilot Next Edit Suggestions (preview)
Feburary 5, 2025 by Brigit Murtaugh, @bamurtaugh

GitHub Copilot inline suggestions are great at autocompleting a section of code currently being edited, offering suggestions to complete your code, comments, tests, and more. But since most coding activity is editing existing code, it's a natural evolution of Copilot Completions to also help with edits, both at your current cursor location and further away. 

We’re excited to announce the preview of Copilot Next Edit Suggestions (aka “Copilot NES”), which both predicts the location of the next edit you'll want to make and what that edit should be.

<!-- TODO: Video about NES from Burke, like what he created for Copilot Edits blog -->

You may have seen [previous work from the GitHub Next Team on NES](https://githubnext.com/projects/copilot-next-edit-suggestions/) – this is the evolution of the Next Team’s great work, now part of the existing GitHub Copilot extensions.

Copilot NES is currently in public preview. You can sign up for access via [the watilist](TODO).

## Getting your first suggestions
Like completions, all you need to do to start getting suggestions from NES is to start coding!

When you're presented with an edit suggestion, you can navigate to it with the `kbstyle(Tab)` key and then accept it with the `kbstyle(Tab)` key again. An arrow in the gutter indicates if there is an edit suggestion available. If an edit suggestion is below the current editor view, the arrow will point down instead of right. 

<!-- TODO: Add image or gif; gif with screencast mode (to show using tab) may be most effective -->

You can hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:

<!-- TODO: Add image -->

Suggestions may span a single symbol, an entire line, or multiple lines, depending on the scope of the potential change. 

## Example scenarios
Copilot NES is an expert companion as you make changes that may cascade throughout your file or project. The following are a few examples where NES shines.

**Refactoring:** Rename a variable once in a file, and Copilot NES will suggest to update it everywhere else. 
<!-- TODO: Add image -->

**Correcting mistakes:** Copilot NES helps with mistakes like typos. It can also help with more challenging mistakes in logic, i.e. if a statement should’ve used AND instead of OR.
<!-- TODO: Add image -->

**Changing intent:** Copilot NES suggests changes that match a change in intent, i.e. changing a function `moveCursorUp` to `moveCursorDown` should adjust all the code logically.
<!-- TODO: Add image -->

## Sign up and share your feedback
You can sign up for the NES public preview via [the watilist](TODO).

Once you get access, be sure to use [VS Code Insiders](https://code.visualstudio.com/insiders/) and the pre-release version of the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) to get all of the latest features and fixes.

We’d also love to hear your feedback via issues in [our repo](https://github.com/microsoft/vscode-copilot-release) – it’ll be instrumental to improving the experience. 

You can read our [full NES docs](TODO) for more information and scenarios as we expand the NES experience.

We can’t wait to see what you build!

Happy coding!

Brigit Murtaugh
