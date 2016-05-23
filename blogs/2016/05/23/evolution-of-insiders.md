---
Order:
TOCTitle: Evolution of the Insiders Build 
PageTitle: Evolution of the Insiders Build 
MetaDescription: Evolution of the Visual Studio Code Insiders Build
Date: 2016-05-23
ShortDescription: Evolution of the Insiders Build
Author: Wade Anderson
---

# Evolution of the Insiders Build

May 23, 2016 by Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

Today over five thousand developers use the VS Code [Insiders Build](https://code.visualstudio.com/blogs/2016/02/01/introducing_insiders_build) for early access to new features and to validate bug fixes. We love the Insiders build becasue we get valuable feedback and usage insights prior to each Stable release. Thank you for your help!

Initially, we released an Insiders build once per month, a few days prior to the Stable release. Over time we've increased the release frequency of Insiders builds and today we ship new Insiders builds roughly weekly. 

## Nightly Builds

Even with weekly Insiders builds, [many have asked](https://github.com/Microsoft/vscode/issues/5453) for access to our nightly builds.

We initially looked at releasing our internal "Alpha" builds. Alpha builds are what we use to develop VS Code, they are produced from master each night, or sometimes on demand if the nightly build has a blocking issues. 

We decided that the overhead of releasing three different builds outweighed the benefits, as the difference between weekly and nightly builds is actually low. We then considered retiring the Insiders builds and moving everyone to Alpha, but decided that would leave dead ended installations of Insiders builds on everyones desktops.

Instead, we've decided to build Insiders nightly from master, move our development team over to the Insiders builds, and retire our internal Alpha builds. We will do development on the same builds we make public. 

For developers using Insiders builds, this means you now have access to fixes and new features a day after check in. If you are already using Insiders builds there is nothing for you to do, you will simply be notified when new builds are available, which will now be daily.

## Blocking Issues

We recoginize that occassionally you may encounter blocking issues with the Insiders builds. Rest assured, if it is bad enough we'll be blocked by it too and a fix will come out quickly! In the meantime, it has always been possible to fall back to running the Stable build as they install and run side by side.

## Release Notes

Becasue we are producing Insiders builds daily, the "Release Notes" become the completed issues for the last day. Handy queries for completed issues can be found in the [Insiders Release Notes wiki page](https://github.com/Microsoft/vscode/wiki/Alpha-Release-Notes). Features being worked on can be found in the [current month's iteration plan](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aiteration-plan+).

## Next Steps

Will start building and releasing the Insiders builds on a daily basis in conjunction with releasing the [May Stable release](https://github.com/Microsoft/vscode/issues/6105). If you are already using the Insiders build there is nothing for you to do today. On May 31st you will start receiving daily updates. Hopefully will not impact your daily workflow as the upgrade process is very quick.

If you are not using the Insiders builds and want to be on the cutting edge, using the same builds we use to develop VS Code, head over to our [downloads page](https://code.visualstudio.com/downloads) and install it today.

See you on [GitHub](https://github.com/Microsoft/vscode), [Twitter](https://go.microsoft.com/fwlink/?LinkID=533687), and [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode)!

Wade Anderson <br>
[@waderyan_](https://twitter.com/waderyan_)
