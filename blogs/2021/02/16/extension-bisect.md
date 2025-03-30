---
Order: 62
TOCTitle: Extension bisect
PageTitle: Visual Studio Code extension bisect utility
MetaDescription: Find problematic extensions quickly with the Visual Studio Code extension bisect utility
Date: 2021-02-16
Author: Johannes Rieken
---

# Resolving extension issues with bisect

February 16, 2021 by Johannes Rieken, [@johannesrieken](https://twitter.com/johannesrieken)

> "Just like git-bisect, but for VS Code extensions."

The true power of Visual Studio Code is its extensions: theme extensions add colors and icons, language extensions enable smart code completion (IntelliSense) and navigation, debugger extensions enable you to run your code and easily find bugs. There are extensions that play music, some that show stock tickers, and there are extensions that enable collaborative work across locations and time zones. The VS Code [Marketplace](https://marketplace.visualstudio.com/vscode) hosts more than 28,000 extensions and it is not uncommon that users have 50 or more extensions installed. With so many extensions out there, bugs are inevitable. Instead of denial, we want to make troubleshooting easy.

## "Bad" extensions

We love extensions and don't really think there are any "bad" extensions. However, like all software, extensions have bugs and feature gaps. So, for reading ease and artificial drama, let's use the term "bad extensions", which is an extension that might crash or simply show unwanted behavior. Fortunately, we designed VS Code with "bad" extensions in mind and therefore run them in a separate [process](https://code.visualstudio.com/api/advanced-topics/extension-host). This isolation guarantees that VS Code keeps running, the cursor always blinks, and that you can always save your work.

For fun, and to make it easier to demonstrate extension bisect, we have created and published the [Extension Bisect Demo](https://marketplace.visualstudio.com/items?itemName=jrieken.bisectdemo) extension. When installed, it will annoyingly reset your cursor whenever you reach the word "bisect". You can use this extension to follow along in this blog post.

## Finding a "bad" extension the hard way

Today, finding a "bad" extension can be easy or hard.  Open the Extensions view (`kb(workbench.view.extensions)`), [disable an extension](/docs/configure/extensions/extension-marketplace.md#disable-an-extension), reload the window (**Developer: Reload Window**), and check to see if the problem still exists. If the problem is gone, that extension is "bad" and you are done. Otherwise, re-enable the extension and repeat the process with the next extension.

![Disabling an extension step by step](./disable_manually.png)

If you are lucky, the first extension is the "bad" one; if you are unlucky, it's the last extension. Using computer science language, this means with `N` extensions, you have a worst-case of repeating the process `O(N)` (order N), and an average-case of `O(N/2)`. Because this algorithm is operated by a human (you), even small values of `N` are laborious. This is where the **extension bisect** utility comes in handy. It is much better in the worst and average cases because it disables extensions by halves.

## Welcome extension bisect

The Extension bisect utility in VS Code was inspired by the [git bisect](https://git-scm.com/docs/git-bisect) command. For those familiar with Git, this command is helpful for finding out which commit in the repository introduced an issue.

Let's use a sample: I have 24 extensions installed and the 8th extension is "bad". We know that the iterative approach requires 8 steps. What about bisect?

The video below shows starting extension bisect via the **Help: Start Extension Bisect** command and then selecting either **Good now** or **This is bad** until the "bad" extension is identified. Once identified, you have the option to report an issue for that extension.

![The extension bisect process](bisect.gif)

Here's step by step how the "bad" extension was found:

1. Bisect divides 24 extensions into two halves of 12 extensions each, and it disables all 12 extensions of the second half.
2. In this sample, the 8th extension is the "bad" one, so it is the first half and not disabled. Things are still not working as we'd expect. Because there is still an issue, extension bisect repeats the process, dividing the first 12 extensions into two parts: 6 are enabled and 6 are disabled. All other extensions are also re-enabled.
3. The 8th extension is now disabled. Things are good now. That means bisect can proceed on the second half (extensions 6-11), and divides them into 3 enabled and 3 disabled extensions.
4. Now, the 8th extension is re-enabled, and the issue has reappeared. This means bisect proceeds on the first half. It divides them into 1 enabled and 2 disabled extensions.
5. The 8th extension is now disabled, things are good again and bisect proceeds on the second half, dividing it into 1 enabled and 1 disabled extension.
6. The 8th extension is the only disabled extension, and the issue is gone. This means we have found the "bad" extension and that we are done.

## Troubleshoot faster

We see that in each step, bisect reduces the search space by half. The steps now it runs in logarithmic time, resulting in average and worst case performance of `O(log N)`. That's pretty good because it scales well. With 24 extensions, you have 4 to 5 steps to find a "bad" extension, with 38 extensions, it only takes 1 more step. However, best-case is worse because with the iterative approach, you can get lucky and find the "bad" in the first round.

Keep in mind that extension bisect relies on you giving correct feedback. You can easily fool it, and yourself, by always answering **Good now** (blames the last extension) or **This is bad** (won't find an extension).

Another useful insight is that extension bisect starts off considering the full list of enabled extensions. That means you can exclude a known "good" extension from bisect by disabling it before starting and by re-enabling it after. However, only do that when you are certain that extension isn't the "bad" one.

Lastly, you might notice that bisect is taking one extra step (`log2(N) + 1`). That's because it starts the first round by disabling all extensions. This first step is done because you might be seeing an issue that's caused by VS Code itself, not by an extension, and we don't want to send you down the rabbit hole unnecessarily.

That's it. We hope that you never need to use extension bisect. However, if you do encounter an issue possibly related to an extension, then we hope we can make troubleshooting easier, faster, and more pleasant.

Happy Coding,

Johannes Rieken, VS Code Principal Software Engineer [@johannesrieken](https://twitter.com/johannesrieken)
