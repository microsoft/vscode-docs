---
Order: 92
TOCTitle: Copilot Next Edit Suggestions (preview)
PageTitle: Copilot Next Edit Suggestions (preview)
MetaDescription: Announcing the Next Edit Suggestions (NES) feature for GitHub Copilot in Visual Studio Code.
Date: 2025-02-05
Author: Brigit Murtaugh, Burke Holland
---

# Copilot Next Edit Suggestions (preview)
February 5, 2025 by [Brigit Murtaugh](https://github.com/bamurtaugh), [Burke Holland](https://github.com/burkeholland)

Today marks the first release of VS Code for 2025. We've been working hard on this release since well into last year, and we're excited to bring you not only the latest and greatest features for your favorite code editor, but some major developments for GitHub Copilot.

GitHub Copilot code completions are great at autocomplete - they can predict and suggest the code that was in your head, without you even having to ask for it. But since most coding activity is editing existing code, it's a natural evolution of completions to also help with edits.

Edits are often not made in isolation - there's a logical flow of what edits need to be made as you iterate on your project - and they can happen both at your current cursor location and further away.

We're excited to announce the preview of **Copilot Next Edit Suggestions** (aka "Copilot NES"), which is this evolution of Copilot completions.

<video src="nes-video.mp4" title="Copilot NES video" controls poster="/assets/blogs/2025/02/05/point3d.png"></video>

Based on the edits you're making, Copilot NES both predicts the location of the next edit you'll want to make and what that edit should be. NES helps you stay in the flow, suggesting future changes relevant to your current work, and you can simply `kbstyle(Tab)` to quickly navigate and accept suggestions.

You may have seen [previous work from the GitHub Next Team on NES](https://githubnext.com/projects/copilot-next-edit-suggestions/) – this is the evolution of the Next Team's great work, now part of the existing GitHub Copilot extensions.

## Getting your first suggestions
You can enable Copilot NES via the VS Code setting `setting(github.copilot.nextEditSuggestions.enabled)`.

> [!NOTE]
> If you are a Copilot Business or Enterprise user, an administrator of your organization must opt in to the use of previews of Copilot features, in addition to you setting `setting(github.copilot.nextEditSuggestions.enabled)` in your editor.
>
> You can learn more about [managing policies for Copilot in your organization](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization).

Like completions, all you need to do to start getting suggestions from NES is to start coding!

When you're presented with an edit suggestion, you can navigate to it with the `kbstyle(Tab)` key and then accept it with the `kbstyle(Tab)` key again, saving you time to find the next relevant edit (no manual searching through files or references required).

An arrow in the gutter indicates if there is an edit suggestion available. You can hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:
<!-- ![NES gutter menu gif](nes-gutter.gif) -->
![NES gutter menu expanded](gutter-menu-highlighted.png)

If an edit suggestion is below the current editor view, the arrow will point down instead of right:
![NES with arrow directions changing](nes-arrow-directions.gif)
<!-- ![NES with right arrow](scan-right-highlight.png) -->
<!-- ![NES with down arrow](scan-down-highlight.png) -->

Suggestions may span a single symbol, an entire line, or multiple lines, depending on the scope of the potential change.

## Example scenarios
Copilot NES is your AI companion as you make changes that may cascade throughout your file or project, and you'll see it shine in a variety of scenarios.

**Catching and correcting mistakes:** Mistakes are a natural part of writing code, and Copilot NES is there to help catch them (sometimes before you even realize the mistake was there!).

NES helps with small mistakes like typos - maybe you were coding quickly in the zone, and you wrote `conts` instead of `const`:
![NES fixing a typo from "conts" to "const"](nes-typo.gif)

NES can also help with more challenging mistakes in logic, like an inverted ternary expression:
![NES fixing a fibonacci logic mistake](nes-fib-logic.gif)

Our development team has been self-hosting on NES, and one of our engineers remembered one of his first "aha!" moments with NES as we were putting this blog together. He was writing a condition along the lines of `if (something !== 'a' || something !== 'b')`. NES caught that this statement would always evaluate to true (thanks De Morgan's Law!) and suggested replacing `||` with `&&` to make the code valid:
![NES fixing an if statement mistake](nes-de-morgan.gif)

**Changing intent:** Copilot NES suggests changes that match a change in intent. For example, changing a class from `Point` to `Point3D` will lead to a suggestion to add a `z` variable to the class definition and to the distance calculation:
![NES gif for updating Point to Point3D](nes-point.gif)
<!-- ![NES for updating Point to Point3D](point3d-distance.png) -->

**Using newly added variables or logic:** Copilot NES helps you use new code you just added. This may be a small change, like calling a new method parameter in the actual method.

It could also be more complex: if you added a new command to your VS Code extension's `extension.ts`, NES will first suggest to clean up the command in `extension.ts`. Then when you open `package.json`, NES suggests registering that command as well:
![Updating extension.ts and package.json with a new command](nes-extension-and-package.gif)
<!-- ![Add command in package.json](add-disposable.png) -->
<!-- ![Add command in package.json](call-disposable-full.png) -->

**Refactoring:** If you use a new name or naming pattern, Copilot NES suggests to update subsequent code similarly:
![NES suggesting change after updating function name](nes-gutter.gif)

After copy-pasting some code, NES may suggest how to adjust it to match the current code where the paste happened.

## Share your feedback
Copilot NES is rapidly evolving, and we can't wait to get your feedback via issues in [our repo](https://github.com/microsoft/vscode-copilot-release) – this will be instrumental to improving the experience.

Please be sure to use [VS Code Insiders](https://code.visualstudio.com/insiders/) and the pre-release version of the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) to get all of the latest features and fixes.

You can read our [full NES docs](https://aka.ms/gh-copilot-nes-docs) for more information and scenarios as we expand the NES experience.

We're excited about this next step in AI where Copilot anticipates what you'll want to do next - the best prompt is the one that you don't have to write. We hope you're excited too and look forward to seeing what you build!

But before you go, there's one more feature in preview that we want to talk about: agent mode.

## Agent mode

As of today's release, GitHub Copilot Edits now has a toggle to enable agent mode. You can opt-in to this experience via the VS Code setting `setting(github.copilot.chat.agent.enabled)`.

In agent mode, Copilot Edits is capable of iterating on its own code - recognizing errors and fixing them automatically, executing any terminal commands required to complete the requested task, as well as resolving runtime errors with self-healing capabilities. Instead of performing just the task that the user requests, GitHub Copilot can now infer all of the other tasks that were not specified and also need to be completed in order for the primary request to work.

<!-- TODO: add gif from github -->

We see tremendous power in agent mode for GitHub Copilot. It's getting better every day, but we wanted to get it into your hands as quickly as we could. Watch this space for major changes and improvements over the next few weeks as we refine the experience, and [share your feedback](https://github.com/microsoft/vscode-copilot-release) as you try it out.

## New year, new Copilot

We have big plans for Copilot as an AI pair programmer that is not only [freely available to everyone](https://code.visualstudio.com/blogs/2024/12/18/free-github-copilot), but continually pushes the boundaries of what AI can do to radically accelerate your productivity and happiness.

There's much more in this release of VS Code for GitHub Copilot - including prompt files, Gemini 2.0 pro, and model selections for completions. We never stop improving VS Code itself, so check out the [full release notes](https://code.visualstudio.com/updates) for all the brand new goodness. We're adamant about making sure you have the best possible version of your code editor and the best AI pair programmer.

We know things are moving fast in the world of AI, so make sure to follow us on [X](https://x.com/code)/[Bluesky](https://bsky.app/profile/vscode.dev)/[LinkedIn](https://www.linkedin.com/showcase/vs-code/) and we'll make it easy for you to stay up to date on all of the latest and greatest Copilot capabilities.

Happy coding!

Brigit and Burke
