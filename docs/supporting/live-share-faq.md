---
TOCTitle: Live Share FAQ
ContentId: TODO
PageTitle: Live Share Frequently Asked Questions
DateApproved: 11/15/2017
MetaDescription: Find out more about VS Live share.
MetaSocialImage: /assets/blogs/2017/11/15/ls-social-resized.png
---

# Visual Studio Live Share FAQ
Updated November 16, 2017

## What is Live Share?
Live Share allows developers to share a codebase and its context so you get instant, bi-directional, collaboration using your tools (Visual Studio 2017 or Visual Studio Code). With Live Share, your teammate can read, navigate, edit, and importantly debug the workspace you’ve shared with them seamlessly and securely.  To see a demo of Live Share and sign-up for the preview visit the [Live Share overview page](/visual-studio-live-share).

## What are the core capabilities of Live Share?
Live Share enables you to share your codebase with your team members via a secure connection. With Live Share, you are able to collaboratively edit multiple files in a workspace and more importantly debug your application with your teammates. During co-editing your edits are immediately seen by your teammates. During co-debugging you are sharing the same debug session of your application. This means you and your teammates can control the program execution with breakpoints and steps, but you can independently inspect variables, watches, locals, and REPLs (e.g. Immediate Window in Visual Studio).

Live Share has a wide variety of use cases such as: resolving a bug together, showing an issue that won't repro on another person's machine, solving design issues, pair programming, conducting a coding interview, mentoring other members on a team, or performing ad-hoc code reviews.

## By using Live Share, is my code stored on a Microsoft server?
No, the shared code resides on the machine of the person that initiated the share. It is not stored or uploaded to the cloud in any way. Rather, Live Share establishes a connection between you and your teammate Live Share does not inspect or collect any data on the code that is shared.

## Does this remote-based model work anywhere? Is it peer-to-peer?
Live Share's only requirement is that the person sharing and their teammate each have internet access. Secure communication between team members during a live share session is facilitated by an Azure relay. Your workspace (i.e. source files) is not stored in the cloud. No special peer-to-peer connection is required though one might be used to reduce latency.

## What is shared during a Live Share session?
Live Share doesn't transfer all keyboard and mouse inputs. It only communicates the data needed for each collaboration activity to your teammates' machines. For example, when you share your workspace your folder structure is shared. When you collaboratively edit a file, that file's contents are shared. When you are collaboratively debugging, debug actions like step and debug state like call stack and locals are shared.

## When will this be released?
We will have a limited, US-only private preview in early 2018. We are taking signups for it [here](/visual-studio-live-share).

## How is my code shared with other teammates?
When using Live Share, you’re making the code you’re working on available so that your teammate can access it via a secure cloud service that remotes commands from your editor. Your teammate can open and edit the files without needing to store them in the cloud or permanently store them on your teammate’s machine.

Live Share enables instant access to capabilities like the project tree, code navigation, and search. It also allows your teammate to benefit from editor enhancements like IntelliSense.

Once collaboration stops (e.g. you close your editor, go offline, or stop sharing), then further actions or access by your teammate is not enabled.


## What happens if a user goes offline, or stops sharing?
The remote model requires that the developer sharing via Live Share and their teammate must be online to be connected. If your teammate attempts to use Live Share when you are offline, they will be unable to join the session until you are online again.

## What about screen sharing?
Live Share lets you share your project's code and its context. It means that your teammate can easily jump into your codebase and work with you, using their familiar tool. Your editor or other apps are not shared or viewable by your teammate, and you don’t have to change your workstyle or use a web-based app.

Live Share does not replace screen sharing where you may want to show a menu item or discuss visual aspects of your app or your editor. Instead, you have the option to use Live Share along with chat, voice, video, and screen sharing.


## What about other collaboration tools?
Live Share can be used with chat, instant messaging, or email technologies. We’ve observed that many collaborative interactions between developers start in these tools. However, when the discussion is about code, they often get to a point where it’s simply too hard to explain a problem with text, code snippets, or single files - more context is needed.

Live Share can be used for many things such as, seeking help on a design issue, resolving a bug, pair programming, conducting a coding interview, or performing an ad-hoc review before a code commit or a pull-request.


## What about other web editors?
With web-based editors, both teammates need to use the same web app to get collaborative benefits, which may not be their primary, day-to-day editor. Many web-based editors assume that you are building and deploying into a Virtual Machine often hosted in a cloud environment.

While this may be desirable for many scenarios, developers often want to collaborate on apps that aren’t hosted in a VM or in the cloud.  With Live Share, you and your teammate can use the capabilities of the tools’ ecosystem in addition to the same capabilities available in web-based editors.

Live Share goes a step further and enables you to share a debug session.  This makes it especially useful in enlisting others to help you track down issues that only happen on your machine without altering their development workflow or needing to alter the application design.


## What is the roadmap?
We are working to bring the initial Live Share capabilities to a private (limited) preview as soon as we can (1st quarter of calendar year 2018), but this is just the start. There are additional scenarios that we are also working towards that will provide more capabilities for development teams, such as asynchronous support. We hope to announce more capabilities as we work through the private preview.


## When will the limited private preview be available?
We are working to bring the initial Live Share capabilities to a limited private (US only) preview as soon as we can. We are intending to invite a limited number of developers to participate in the private preview so that we can deliver the best experience as possible. The limited private preview will be our chance to work closely with dedicated developers to shape the first product release.

It is an exciting time for us, so to get updates and express interest in participating in the limited private preview, [please sign-up, here](/visual-studio-live-share).


## If I sign-up for the limited private preview, what can I expect?
We still have some work to go before we can release a limited private preview. By signing up now ([here](/visual-studio-live-share)), we will send updates and more details about Live Share, and we may invite you to participate in the limited private preview (US only), or help us with user experience testing.

You can [unsubscribe at any time](https://aka.ms/vsls-unsubscribe). For more details about our privacy statement, see [here](https://aka.ms/vsls-privacy).


## What languages will be supported in the limited private preview?
The initial focus for Live Share in the private preview will be Node.js and ASP.NET/ASP.NET Core (C#) based web applications and services. This is just the start, as we will introduce more in the future.
