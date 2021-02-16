
# Resolving extension issues with bisect

> “Just like git-bisect, but for VS Code extensions.”


The true power of VS Code is its extensions: theme extensions add colors and icons, language extensions enable smart code completion (IntelliSense) and navigation, debugger extensions enable you to run your code and easily find  bugs. There are extensions that play music, some that show stock tickers, and there are extensions that enable collaborative work across locations and time zones. The VS Code Marketplace hosts more than 28,000 extensions and it is not uncommon that users have 50 or more extensions installed. With so many extensions out there, bugs are inevitable. Instead of denial, we want to make trouble shooting easy.

We love extensions and don't really think there are any "bad" extensions. However, like all software, extensions have bugs and feature gaps. So, for reading ease and artificial drama, let’s use the term “bad extensions”, which is an extension that might crash or simply  show unwanted behavior. Fortunately, we designed VS Code with “bad” extensions in mind and therefore run them in a separate [process](https://code.visualstudio.com/api/advanced-topics/extension-host). The guarantee is that the cursor always blinks and that you can always save your work.

For fun, and to make it easier to demonstrate extension bisect, we have created and published  the [Extension Bisect Demo Extension](https://marketplace.visualstudio.com/items?itemName=jrieken.bisectdemo). When installed, it will annoyingly reset your cursor whenever you reach the word “bisect”. You can use this  extension to follow along.

Today, finding a “bad” extension can be easy or hard.  Open the extension view, [disable an extension](https://code.visualstudio.com/docs/editor/extension-gallery#_disable-an-extension), reload, and check to see if the problem still exists. If the problem is gone that extension is “bad” and you are done. Otherwise, re-enable the extension and repeat the process with the next extension.

![Disabling an extension step by step](./disable_manually.png)

If you are lucky the first extension is the “bad” one; if you are unlucky, it’s the last extension. Using computer science language this means with `N` extensions you have a worst-case of repeating the process `O(N)`, and an average-case of `O(N/2)`. Because this algorithm is operated by a human, even small values of `N` is laborious. This is where **extension bisect** comes into play. It is much better in the worst- and average-case because it disables extensions by halves.

Extension bisect in VS Code was inspired by the [`git bisect`](https://git-scm.com/docs/git-bisect) command. For those familiar with Git, this command is helpful for finding out which commit in the repository introduced an issue.

Let’s use a sample: I have 24 extensions installed and the 8th extension is “bad”. We know that the iterative approach requires 8 steps. What about bisect?

![The extension bisect process](bisect.gif)

1. Bisect divides 24 extensions into two halves of 12 extensions each, and it disables all 12 extensions of the second half.
2. In this sample, the 8th extension is the “bad” one, so it is the first half and not disabled. Things are still not working as we’d expect. Because of that, extension bisect repeats the process, dividing the first 12 extensions into two parts: 6 are enabled and 6 are disabled. All other extensions are also re-enabled.
3. The 8th extension is now disabled. Things are good now. That means bisect can proceed on the second half (extensions 6-11), and divides them into 3 enabled and 3 disabled extensions.
4. Now, the 8th extension is re-enabled, and the issue has re-appeared. This means bisect proceeds on the first half. It divides them into 1 enabled and 2 disabled extensions.
5. The 8th extension is now disabled, things are good again and bisect proceeds on the second half, dividing it into 1 enabled and 1 disabled extension.
6. The 8th extension is the only disabled extension, and things are good. This means we have found the “bad” extension and that we are done.

We see that in each step bisect reduces the search space by half. That means it runs in logarithmic time, resulting in average- and worst-case performance of `O(log N)`. That’s pretty good because it scales well. With 24 extensions you have 4 to 5 steps to find a “bad” extension, with 38 extensions it only takes 1 more step. However, best-case is worse because with the iterative approach you can be lucky and find the “bad” in the first round.

Keep in mind that bisect relies on you giving correct feedback. You can easily fool it, and yourself, by always answering “Good now” (blames the last extension) or “This is bad” (won’t find an extension).

Another useful insight is that bisect starts off with the list of enabled extensions. That means you can exclude an extension from bisect by disabling it before starting and by re-enabling it after. Though, only do that when you are certain that extension isn’t “bad”.

Lastly, in practice you might notice that bisect is taking one extra step (`log2(N) + 1`). That’s because it starts with disabling all extensions. Afterall you might be seeing an issue that’s caused by VS Code itself, not by an extension, and in that case, we don’t want to send you down the rabbit hole.

That’s it. We hope that you never need to use extension bisect. However, if you do encounter an issue, then we hope we can make troubleshooting easier, faster, and more pleasant.

Happy Coding,

Johannes Rieken, VS Code Principal Software Engineer [@johannesrieken](https://twitter.com/johannesrieken)
