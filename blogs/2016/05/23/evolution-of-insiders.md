---
Order:
TOCTitle: Evolution of VS Code Insiders
PageTitle: Evolution of Visual Studio Code Insiders
MetaDescription: Evolution of the Visual Studio Code Insiders Build
MetaSocialImage: /assets/blogs/2016/11/30/opengraph_insiders.png
Date: 2016-05-23
ShortDescription: Evolution of the Insiders Build
Author: Wade Anderson
---

# Evolution of the Insiders Build

May 23, 2016 by Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

Today over five thousand developers use the Visual Studio Code [Insiders Build](https://code.visualstudio.com/blogs/2016/02/01/introducing_insiders_build) for early access to new features and to validate bug fixes. We love the Insiders build because we get valuable feedback and usage insights prior to each Stable release. Thank you for your help!

Initially, we released an Insiders build once per month, a few days before the Stable release. Over time, we increased the frequency of Insiders builds and today we ship new Insiders builds roughly once a week.

![value prop of insiders](value_props.svg)

## Nightly Builds

Even with weekly Insiders builds, [many users asked](https://github.com/Microsoft/vscode/issues/5453) for access to our nightly builds.

We initially looked at releasing our internal "Alpha" builds. Alpha builds are what we use to develop VS Code. They are produced from our master branch each night or on demand, if the nightly build has a blocking issue.

We decided that the overhead of releasing three different builds outweighed the benefits and the difference between weekly and nightly builds was actually low. We then considered retiring the Insiders builds and moving everyone to Alpha but decided that would leave dead ended installations of Insiders builds on everyone's desktops.

Instead, we've decided to build Insiders nightly from master, move our development team over to the Insiders builds, and retire our internal Alpha builds. We will do development on the same builds we make public.

For developers using Insiders builds, this means you now have access to fixes and new features a day after check in. If you are already using Insiders builds there is nothing for you to do, you will simply be notified when new builds are available, which will be daily starting in June.

## Release Frequency

At a minimum, we will release new Insiders builds daily. However, you may be prompted to update your builds more frequently if we have to fix a blocking issue. Please know we try to minimize these as we're prompted to install along with everyone else. Fortunately, downloads happen in the background, updates are quick, and if you are in the middle of something you can always postpone the upgrade to a more convenient time.

## Blocking Issues

We recognize that occasionally, you may encounter blocking issues with the Insiders builds. Rest assured, if it is bad enough, we'll be blocked by it too and a fix will come out quickly. Please submit a new issue and let us know you are using the Insiders build. If the fix will take time, it is always possible to revert to running the Stable build as Insiders builds install and run side-by-side with Stable.

## Release Notes

Because we are producing Insiders builds daily, the "Release Notes" become the completed issues for the last day. Handy queries for completed issues can be found in the [Insiders Release Notes wiki page](https://github.com/Microsoft/vscode/wiki/Insiders-Release-Notes). Features being worked on can be found in the [current month's iteration plan](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aiteration-plan+).

## Next Steps

We will start building and releasing the Insiders builds on a daily basis in conjunction with releasing the [May Stable release](https://github.com/Microsoft/vscode/issues/6105). If you are already using the Insiders build, there is nothing for you to do! Starting in June, you will begin receiving daily update notifications.

If you are not using the Insiders builds and want to be on the leading edge, using the same builds we use to develop VS Code, head over to our [downloads page](/insiders) and install the Insiders build today.

See you on [GitHub](https://github.com/Microsoft/vscode), [Twitter](https://go.microsoft.com/fwlink/?LinkID=533687), and [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode)!

Wade Anderson <br>
[@waderyan_](https://twitter.com/waderyan_)
