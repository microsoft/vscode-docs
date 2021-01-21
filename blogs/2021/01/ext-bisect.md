# “Just like git-bisect, but for VS Code extensions.”

The true power of VS Code is its extensions: theme extensions add colors and icons, language extensions provide IntelliSense and enable code navigation, debugger extensions enable you to drill into bugs. There are extensions that play music, some that show stock tickers, and there are extensions that enable collaborative work across locations and time zones. The VS Code marketplace hosts more than 23K extensions and it is not uncommon that users have 50+ extensions installed. With so many extensions bugs are inevitable and instead of denial we want to make trouble shooting easy.

We love extensions and don't really think there are any "bad" extensions. However, like all software, extensions have bugs and feature gaps and for reading ease and artificial drama, let’s use “bad extensions”. Understand it is an extension showing unwanted behavior. In the fact, we have designed VS Code with bad extensions in mind and therefore run them in a separate [process]( https://code.visualstudio.com/api/advanced-topics/extension-host). The guarantee is that the cursor always blinks and that you can always save your work. However, not all bad extensions crash or freeze a process, sometimes it is just a small, sporadically showing, annoyance.

Because there are no bad extensions, we have created one: [Extension Bisect Demo](https://marketplace.visualstudio.com/items?itemName=jrieken.bisectdemo). When installed, it will annoyingly reset your cursor whenever you reach the word “bisect”. Use that extension to follow along.

Finding a bad extension is easy: Open the extension view, [disable an extension]( https://code.visualstudio.com/docs/editor/extension-gallery#_disable-an-extension), reload, and check for the issue. If the problem is gone that extension is bad and you are done. Otherwise, re-enable the extension and repeat the process with the next extension.

![Disabling an extension step by step](./disable_manually.png)

If you are lucky the first extension is bad, if you are unlucky it’s the last extension. Using computer science language this means with `N` extensions you have a worst-case of `O(N)`, and an average-case of `O(N/2)`. Because this algorithm is operated by a human even small values of `N` are laborious and mindless. This is where extension bisect comes into play. It is much better in the worst- and average-case because it disables extensions by halves. This is like the problem of finding out which commit in git has caused a regression. Git has the [`git bisect`](https://git-scm.com/docs/git-bisect)-command for that and that inspired us to do the same for extensions.

Let’s use a sample:  I have 24 extensions installed and the 8th extension is bad. We know that the iterative approach requires 8 steps. What about bisect?

![The extension bisect process](bisect.gif)

1. Bisect divides 24 extensions into two halves of 12 and 12 extensions and it disables all 12 extensions of the second half.
2. In this sample the 8th extension is bad, it is the first half and not disabled. Things are still bad. Because of that bisect divides the first 12 extensions into 6 enabled and 6 disabled extensions. All other extensions are also re-enabled.
3. The 8th extension is now disabled. Things are good now. That means bisect proceeds on the second half (extensions 6-11) and divides them into 3 enabled and 3 disabled extensions.
4. Now, the 8th extension is re-enabled, and things have turned bad. This means bisect proceeds on the first half. It divides them into 1 enabled and 2 disabled extensions.
5. The 8th extension is now disabled, things are good again and bisect proceeds on the second half, dividing it into 1 enabled and 1 disabled extension.
6. The 8th extension is the only disabled extension and things are good. This means we have found the bad extension and that we are done.

We see that in each step bisect reduces the search space by half. That means it runs in logarithmic time, resulting in average- and worst-case performance of `O(log N)`. That’s pretty good because it scales well. With 24 extensions you have 4 to 5 steps to find a bad extension, with 38 extensions it only takes 1 more step. However, best-case is worse because with the iterative approach you can be lucky and find the bad in the first round.

Keep in mind that bisect relies on you giving correct feedback. You can easily fool it, and yourself, by always answering “Good now” (blames the last extension) or “This is bad” (won’t find an extension).

Another useful insight is that bisect starts off with the list of enabled extensions. That means you can exclude an extension from bisect by disabling it before starting and by re-enabling it after. Though, only do that when you are certain that extension isn’t "bad".

The disable-enable trick is useful when using VS Code [remote]( https://code.visualstudio.com/docs/remote/remote-overview) to code in a container, via SSH, or on WSL. Current stable (1.52.1) ships with a [bug]( https://github.com/microsoft/vscode/issues/112473) which goes like so: VS Code remote means that there is a local extension host process and an extension host process on a remote machine. The connection between these extension hosts is done with a “resolver” extension and when bisect disables that extension you are cut off from your remote (until the extension is re-enabled). So, keep that in mind or use [VS Code Insiders]( https://code.visualstudio.com/insiders/) because that already ships with a fix.

Last, in practice you might notice that bisect is taking one extra step (`log2(N) + 1`). That’s because it starts with disabling all extensions. Afterall you might be seeing an issue that’s caused by VS Code itself, not by an extension, and in that case, we don’t want to send you down the rabbit hole.

That’s it. We hope that you don’t need to use bisect. However, if you do encounter an issue then trouble shooting should easy, fast, and pleasant.

Happy Coding,

Johannes Rieken, VS Code Principal Software Engineer [@johannesrieken](https://twitter.com/johannesrieken)
