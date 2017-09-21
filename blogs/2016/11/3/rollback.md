---
Order:
TOCTitle: 1.7 Rollback Incident Report
PageTitle: Visual Studio Code 1.7 Rollback Incident Report
MetaDescription: Visual Studio Code 1.7 Rollback Incident Report
Date: 2016-11-03
ShortDescription: Visual Studio Code 1.7 Rollback Incident Report
Author: Wade Anderson
---

# 1.7 Rollback Incident Report

November 3, 2016 by Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

Last night Wednesday November 2nd, we rolled back the 1.7 release of Visual Studio Code to 1.6.1. If you had upgraded to 1.7, you would have been prompted to update back to 1.6.1. This morning we implemented a mitigation fix and created a new release and you should now be on VS Code 1.7.1. If you are not sure what version you are on, you can [find the version information](/docs/supporting/faq.md#how-do-i-find-what-version-of-vs-code-i-am-using) in the About dialog.

We apologize for the inconvenience these updates caused and want to explain the events that took place and the steps we're taking to ensure you have a great experience with VS Code.

## Automatic Type Acquisition

In VS Code 1.7, we released a featured called "Automatic Type Acquisition" (ATA). The purpose of ATA is to improve the JavaScript IntelliSense experience.

VS Code uses the TypeScript language service to provide IntelliSense for JavaScript. The TypeScript language service uses special files called type declaration files (also known as typings files), which are published on npm under the [@types scope](https://www.npmjs.com/~types). In the past, you had to manually install type declaration files to light up IntelliSense for the dependencies in `package.json`. We know this isn't an easy chore so we teamed up with the TypeScript team to develop ATA.

A TypeScript language service that has ATA enabled watches your `package.json` files and automatically installs the type declaration files of all dependencies in a cache on your file system. It does the same when it finds references to well-known client-side libraries.

After enabling this feature on Insiders builds for two weeks, we felt it proved useful for users and decided to ship ATA to everyone in VS Code 1.7.

## What happened?

**Nov 2 at ~1:57 pm PST** We released VS Code 1.7. The team in Zurich went to bed and the Redmond team started on our plans for 1.8.

**Nov 2 at ~4:12 pm PST** We were contacted by npm. They were seeing a huge spike in registry activity from clients attempting to access non-existent packages under the `@types` scope. At its peak, these requests accounted for roughly 10% of all traffic ([Fun fact](https://news.ycombinator.com/item?id=12861093): VS Code users were sending approximately the same amount of requests npm sees from the country of India) and briefly overwhelmed their service.

The npm dev ops acted quickly to mitigate the un-intentional DDoS and diagnosed the issue as coming from the VS Code 1.7 release. The key issue was a flood of requests for non-existent packages, caused by the following algorithm:

1. The TypeScript language server checks the modules listed in `package.json` against its application cache.
2. For each module not in the application cache, the TypeScript language server makes a request to npm requesting `@types/{module}`.
3. Modules that do exist are added to the application cache.
4. Anticipating that new type declaration files will be added to `@types` scope, modules that don't exist are requested each time a project or folder is opened, which causes npm to respond with a 404.

Given the number of modules that do not exist under the `@types` scope, a large volume of 404's briefly impacted npm's availability.

**Nov 2 at ~5:45 pm PST** With proper context and at the request of npm, we took down the 1.7 release and moved users back VS Code 1.6.1. We updated the website with the facts we had and rolled up our sleeves to analyze the best next steps.

## Going forward

You should have been prompted to install VS Code 1.7.1. This release has ATA disabled, however all other 1.7 features are available to use. Over the next few days, we will work with the TypeScript team on a satisfactory fix for ATA (one was started last night in this [PR](https://github.com/Microsoft/TypeScript/pull/12014)) and we will notify you when this update is available.

[#HappyCoding](https://twitter.com/hashtag/HappyCoding?src=hash)

Wade Anderson, VS Code Team Member <br>
[@waderyan_](https://twitter.com/waderyan_)