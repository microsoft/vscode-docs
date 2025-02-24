---
Order: 92
TOCTitle: Copilot Next Edit Suggestions (preview)
PageTitle: Copilot Next Edit Suggestions (preview)
MetaDescription: Announcing the Next Edit Suggestions and Agent Mode for GitHub Copilot in Visual Studio Code.
Date: 2025-02-12
Author: Brigit Murtaugh, Burke Holland
---

# Copilot Next Edit Suggestions (preview)

February 12, 2025 by [Brigit Murtaugh](https://github.com/bamurtaugh), [Burke Holland](https://github.com/burkeholland)

We're excited to announce not one, not two, but _three_ previews for GitHub Copilot in this release of Visual Studio Code:

1. **Next Edit Suggestions**
2. **Agent Mode** for Copilot Edits
3. **Vision**

In this post, we're going to dive into Next Edit Suggestions and take a look at the next evolution of AI-powered code completions in your editor.

## Next Edit Suggestions (NES)

GitHub Copilot code completions - which are also called _ghost text_ - are really good at autocomplete. One of the most incredible feelings you can have working with GitHub Copilot is when it suggests the code that was in your head without you even having to ask for it. But most coding activity involves editing _existing code_ as much as it does writing new lines. It's a natural next step for completions to work on existing code as well.

We call this _Next Edit Suggestions_, or _NES_ for short. And yes - we also feel the game console nostalgia when we see that acronym.

<video src="nes-video.mp4" title="Copilot NES video" controls poster="nes-video-cover.png"></video>

### Getting started with NES

To get started with Copilot NES, first enable the VS Code setting `setting(github.copilot.nextEditSuggestions.enabled)`.

Like completions, all you need to do to start getting suggestions from NES is to start coding!

When you're presented with an edit suggestion, navigate to it with the `kbstyle(Tab)` key and then accept it with the `kbstyle(Tab)` key again. Forget about manually searching through related files or references. Copilot NES will keep tabs on your next relevant edit!

An arrow in the gutter indicates that there is an edit suggestion available. Hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:

![NES gutter menu expanded](gutter-menu-highlighted-updated.png)

Scrolled all the way past that edit suggestion? The arrow hints you at the location of the next edit suggestion, pointing up or down based on where you are in the file:

![NES with arrow directions changing](nes-arrow-directions.gif)

Suggestions can span a single symbol, an entire line, or multiple lines, depending on the scope of the potential change.

> [!NOTE]
> Reload VS Code for your updated settings to take effect.
>
> If you are a Copilot Business or Enterprise user, an administrator of your organization must opt in to the use of Copilot "Editor Preview Features," in addition to you setting `setting(github.copilot.nextEditSuggestions.enabled)` in your editor.
>
> You can learn more about [managing policies for Copilot in your organization](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization).

### Example scenarios

Copilot NES is your AI companion as you make changes that can cascade throughout your file or project, and you'll see it shine in a variety of scenarios.

**Catching and correcting mistakes:** Mistakes are a natural part of writing code, and Copilot NES is there to help catch them (sometimes before you even realize the mistake was there!).

NES helps with small mistakes like typos - maybe you were coding quickly and in the zone, and you wrote `conts` instead of `const`:

<video src="nes-typo.mp4" title="NES fixing a typo" controls poster="nes-typo-cover.png"></video>

NES can also help with more challenging mistakes in logic, like an inverted ternary expression:

<video src="nes-fib-logic.mp4" title="NES fixing a fibonacci logic mistake" controls poster="nes-fib-logic-cover.png"></video>

Our development team has been self-hosting on NES, and one of our engineers remembered one of his first "aha!" moments with NES as we were putting this blog together. He was writing a condition along the lines of `if (something !== 'a' || something !== 'b')`. NES caught that this statement would always evaluate to true (thanks De Morgan's Law!) and suggested replacing `||` with `&&` to make the code valid:

<video src="nes-de-morgan.mp4" title="NES fixing an if statement mistake" controls poster="nes-de-morgan-cover.png"></video>

**Changing intent:** Copilot NES suggests changes that match a change in intent. For example, changing a class from `Point` to `Point3D` leads to a suggestion to add a `z` variable to the class definition and to the distance calculation:

<video src="nes-point.mp4" title="NES updating Point to Point3D" controls poster="nes-point-cover.png"></video>

**Using newly added variables or logic:** Copilot NES helps you use new code you just added. This could be a small change, like calling a new method parameter in the actual method.

It could also be more complex: if you added a new command to your VS Code extension's `extension.ts`, NES will first suggest cleaning up the command in `extension.ts`. Then when you open `package.json`, NES suggests registering that command as well:

<video src="nes-extension-and-package.mp4" title="NES updating extension project with new command" controls poster="nes-extension-and-package-cover.png"></video>

**Refactoring:** If you use a new name or naming pattern, Copilot NES suggests updating subsequent code similarly:

<video src="nes-gutter.mp4" title="NES suggesting change after updating function name" controls poster="nes-gutter-cover.png"></video>

Read our [full NES docs](https://aka.ms/gh-copilot-nes-docs) for more information and scenarios, as we expand the NES experience.

### Share your feedback

Copilot NES is rapidly evolving, and we can't wait to get your feedback via issues in [our repo](https://github.com/microsoft/vscode-copilot-release) – this will be instrumental to improving the experience.

Please be sure to use [VS Code Insiders](https://code.visualstudio.com/insiders/) and the pre-release version of the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) to get all of the latest features and fixes. Get more details on how to [install an extension pre-release version](/docs/editor/extension-marketplace.md#install-a-pre-release-extension-version).

You can read our [full NES docs](https://aka.ms/gh-copilot-nes-docs) for more information and scenarios as we expand the NES experience.

We're excited about this next step in AI where Copilot anticipates what you'll want to do next - the best prompt is the one that you don't have to write. We hope you're excited too and look forward to seeing what you build!

## Agent mode

As of last week's [VS Code Insiders](https://code.visualstudio.com/insiders/) release, GitHub Copilot Edits now has an option for agent mode.

Agent mode in Copilot Edits is capable of iterating on its own code - recognizing errors and fixing them automatically, executing any terminal commands required to complete the requested task, as well as resolving runtime errors with self-healing capabilities. Instead of performing just the task that the user requests, GitHub Copilot can now infer all of the other tasks that were not specified and also need to be completed in order for the primary request to work.

<video src="agent-mode-blog-video.mp4" title="Copilot agent mode video" controls poster="Agent-Sunrise-1.webp"></video>

We see tremendous power in agent mode for GitHub Copilot. It's getting better every day, but we wanted to get it into your hands as quickly as we could. Watch this space for major changes and improvements over the next few weeks as we refine the experience, and [share your feedback](https://github.com/microsoft/vscode-copilot-release) as you try it out (today in VS Code Insiders, and soon in VS Code Stable).

You can read more about agent mode in [our docs](https://code.visualstudio.com/docs/copilot/copilot-edits#_use-agent-mode-preview).

## Vision

This release of VS Code Insiders also brings Vision support to GitHub Copilot.

It can be frustrating to have to translate what you see into a description for Copilot over and over again. This is especially true when working with user interfaces or asking it how to configure something in the editor. Now, you can just attach a screenshot to your prompt so that Copilot can see exactly what you see. You can...

* Paste from your clipboard
* Drag and drop images from the Explorer view
* Attach a screenshot of the current VS Code window (Select Attach > Screenshot Window)

This enables all kinds of scenarios...

* Giving mockups to Copilot so it can generate UI code.
* Providing a screenshot of an interface that isn't correct so Copilot can help you fix the layout.
* Generating alt text for images in HTML and Markdown
* Providing a screenshot of an error

Vision works today in VS Code Insiders and is available to everyone. The only supported model at the moment is GPT 4o, with support for other models in the works. Currently, the supported image types are JPEG/JPG, PNG, GIF, and WEBP.

## New year, new Copilot

We have big plans for Copilot as an AI pair programmer that is not only [freely available to everyone](https://code.visualstudio.com/blogs/2024/12/18/free-github-copilot), but continually pushes the boundaries of what AI can do to radically accelerate your productivity and happiness.

We never stop improving VS Code itself, so check out [our recent release notes](https://code.visualstudio.com/updates) for all the brand new goodness. We're adamant about making sure you have the best possible version of your code editor and the best AI pair programmer.

We know things are moving fast in the world of AI, so make sure to follow us on [X](https://x.com/code)/[Bluesky](https://bsky.app/profile/vscode.dev)/[LinkedIn](https://www.linkedin.com/showcase/vs-code/) and we'll make it easy for you to stay up to date on all of the latest and greatest Copilot capabilities.

Happy coding!

Brigit and Burke