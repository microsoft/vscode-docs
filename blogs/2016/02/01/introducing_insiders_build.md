---
Order:
TOCTitle: The Insiders Build
PageTitle: Introducing the Insiders Build
MetaDescription: insiders build
MetaSocialImage: /assets/blogs/2016/02/01/opengraph_insiders.png
Date: 2016-02-01
ShortDescription: VS Code has its roots in the web (built using TypeScript and Node.js) and one thing we love about cloud based applications is that they are always up to date. Update the service and all of your users are instantly on the latest fixes and features, with no user interaction.
Author: Chris Dias
---

# Introducing the Insiders Build

February 1, 2016 by Chris Dias, [@chrisdias](https://twitter.com/chrisdias)

VS Code has its roots in the web (built using TypeScript and Node.js) and one thing we love about cloud based applications is that they are always up to date. Update the service and all of your users are instantly on the latest fixes and features, with no user interaction.

This is why VS Code has automatic updates on by default. We periodically query the update service to see if a new version is available, download it when ready, and then gently prompt you to restart.

Of course, it has always been possible to turn off automatic updates. It has also always been possible to subscribe to what we called the “Insiders Channel” which gave you get early access to monthly drops, letting you check out new features, test an extension, or even help us find that last-minute show stopper issue.

There were two shortcomings to this model. First, you needed to join the “Insiders Program” to learn about the “updateChannel”: “insiders” setting. Second, you had to choose whether you want to work with the Stable (the official monthly release) or the Insiders version. You could not easily switch back to Stable if you hit a blocking issue with the Insiders drop, without having to change settings.

With the open sourcing of VS Code in November, we are retiring the Insiders Program. With the upcoming January 2016 release, we are introducing a new Insiders build that installs side by side with the monthly, stable VS Code release.

![Insiders and Stable, side by side, don't worry, the green icon is temporary](insiders_build_icon.png)

No longer do you need to manage settings to switch between the two. The Insiders build is a separate installation with isolated settings, extensions, and configurations. This does mean that you will need to configure both and install your favorite extensions into each, but once you’ve done this, trying out new features (and giving us feedback!) is easier than ever.

The Insiders build will automatically update when we release new builds, generally towards the end of each month. Depending on how successful this process is we will consider releasing new updates even more often.

The features included in the Insiders build is tracked in [our iteration plans](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=label%3Aiteration-plan+). Feel free to communicate your thoughts, ideas and bug reports on these builds – we will be paying close attention to the feedback as it helps us stabilize before an official release.

[Download the Insiders build](/insiders) today! Again, you only need to install it once and it will update itself when we push new builds each month.

Note: If you have been an “Insider”, you will need to manually download this new drop to keep testing the latest and greatest of VS Code. Your current build will upgrade to the latest stable release when we ship at the end of the month.

Chris Dias