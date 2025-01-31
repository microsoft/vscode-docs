---
Order: 92
TOCTitle: Introducing Next Edit Suggestions (and more!) for GitHub Copilot
PageTitle: Introducing Next Edit Suggestions (and more!) for GitHub Copilot
MetaDescription: Announcing the Next Edit Suggestions (NES) feature for GitHub Copilot in Visual Studio Code.
Date: 2025-02-05
Author: Brigit Murtaugh, Burke Holland
---

# Introducing Next Edit Suggestions (and more!) for GitHub Copilot
February 5, 2025 by [Brigit Murtaugh](https://github.com/bamurtaugh), [Burke Holland](https://github.com/burkeholland)

Today marks the first release of VS Code for 2025. We've been working hard on this release since well into last year, and we're excited to bring you not only the latest and greatest features for your favorite code editor, but some major developments for GitHub Copilot.

We're introducing what we've been calling "Next Edit Suggestions" (NES) - a new way to get suggestions for your next edit, rather than just the next line of code.

We're also unveiling prompt files, o3-mini is now available in the model picker, and Copilot Edits is GA!

And as if that wasn't enough, today's VS Code Insiders release has a couple of features that we're *really* excited about: Copilot Edits agent mode and Vision in GitHub Copilot.

That's a lot, so let's get into exactly what these features are, how they work, and how you can use them today.

## Copilot Next Edit Suggestions (preview)

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
![NES gutter menu expanded](gutter-menu-highlighted-updated.png)

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

We're excited about this next step in AI where Copilot anticipates what you'll want to do next - the best prompt is the one that you don't have to write.

But the *second* best prompt is one that you can reuse and share - which is why we're introducing prompt files.

## Prompt files
Prompt Files in GitHub Copilot Chat are designed to streamline workflows, enhance collaboration, and bring domain-specific expertise to you and your team's fingertips. With reusable and shareable prompts, you can save time, maintain consistency, and tackle complex tasks with ease. While the existing file-based custom instructions help to add codebase-wide context to each AI workflow, developers can add specific prompts as they need them, which makes them scale to the complexity of larger multi-faceted codebases.

Prompt files is currently in preview and can be enabled via the VS Code setting `setting(chat.promptFiles)`. Set it to true or a string/array of folders to define where prompt files are stored (default is .github/prompts).

Now let's close out with some features available exclusively in VS Code Insiders: agent mode and Vision. These features are in preview and changing everyday, but we wanted to get them into your hands as quickly as we could.

## Agent mode

As of today's [VS Code Insiders](https://code.visualstudio.com/insiders/) release, GitHub Copilot Edits now has a toggle to enable agent mode. You can opt-in to this experience via the VS Code setting `setting(github.copilot.chat.agent.enabled)`.

Agent mode in Copilot Edits is capable of iterating on its own code - recognizing errors and fixing them automatically, executing any terminal commands required to complete the requested task, as well as resolving runtime errors with self-healing capabilities. Instead of performing just the task that the user requests, GitHub Copilot can now infer all of the other tasks that were not specified and also need to be completed in order for the primary request to work.

<!-- TODO: add gif from github -->

We see tremendous power in agent mode for GitHub Copilot.  Watch this space for major changes and improvements over the next few weeks as we refine the experience.

## Vision

Vision for Copilot allows you to include images in your prompts. This unlocks an entirely new way of interacting with Copilot. You can imagine taking a screenshot of a layout that isn't quite right and including that in your prompt for Copilot to fix a stylesheet. Or even having Copilot create an entire UI based on a mockup.\

<!-- TODO: add gifs -->

You can even use it to generate alt text for images in Markdown and HTML. I used it for this very blog post.

To use vision, simply take a screenshot and paste it into your prompt directly from your clipboard. That's all there is to it.

While in preview, Vision will only use 4o as the backing model - regardless of what model you have chosen in the model picker. We'll continue improving Vision and adding support for additional models in the near future.

## New year, new Copilot

Speaking of Vision, we hope that you can _see the vision_ we have for Copilot as an AI pair programmer that is not only [freely available to everyone](https://code.visualstudio.com/blogs/2024/12/18/free-github-copilot), but continually pushes the boundaries of what AI can do to radically accelerate your productivity and happiness.

We never stop improving VS Code itself, so check out the [full release notes](https://code.visualstudio.com/updates) for all the brand new goodness. We're adamant about making sure you have the best possible version of your code editor and the best AI pair programmer.

We know things are moving fast in the world of AI, so make sure to follow us on [X](https://x.com/code)/[Bluesky](https://bsky.app/profile/vscode.dev)/[LinkedIn](https://www.linkedin.com/showcase/vs-code/) and we'll make it easy for you to stay up to date on all of the latest and greatest Copilot capabilities.

Happy coding!

Brigit and Burke
