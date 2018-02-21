---
TOCTitle: Live Share FAQ
ContentId: TODO
PageTitle: Live Share Frequently Asked Questions
DateApproved: 2/20/2018
MetaDescription: Find out more about VS Live share.
MetaSocialImage: /assets/blogs/2017/11/15/ls-social-resized.png
---

# Visual Studio Live Share FAQ
Updated February 20, 2018

## What is Live Share?
Live Share allows developers to share a codebase and its context so you get instant, bi-directional, collaboration directly from your existing tools (Visual Studio 2017 or Visual Studio Code). With Live Share, your teammate can read, navigate, edit, and debug the project you’ve shared with them, both seamlessly and securely.  To see a demo of Live Share and sign-up for the preview visit the [Live Share overview page](/visual-studio-live-share).

## What are the tooling requirements for using Live Share?
During the private preview, Live Share will be iterating quickly to respond to user feedback, which means needing to take advantage of features within Visual Studio and Visual Studio Code that may only be available in their respective preview/insider releases. Long-term, Live Share will support the stable builds of both tools, however, for now, we recommend that both the host and guest(s) within a Live Share session install the following (depending on preference):

* [Visual Studio 2017 preview (15.6 preview 3+)](https://www.visualstudio.com/vs/preview/)
* Visual Studio Code (either [Stable](https://code.visualstudio.com/) or [Insiders](https://code.visualstudio.com/insiders/)).

## What are the core capabilities of Live Share?
Live Share enables you to share your codebase with your team members via a secure connection. With Live Share, you are able to collaboratively edit multiple files in a workspace and more importantly debug your application with your teammates. During co-editing your edits are immediately seen by your teammates. During co-debugging you are sharing the same debug session of your application. This means you and your teammates can control the program execution with breakpoints and steps, but you can independently inspect variables, watches, locals, and REPLs (e.g. the Immediate Window in Visual Studio).

Live Share has a wide variety of use cases such as: investigating a bug together, showing an issue that won't repro on another person's machine, solving design issues, pair programming, conducting a coding interview, mentoring other members on a team, or performing ad-hoc code reviews.

## By using Live Share, is my code stored on a Microsoft server?
No, the shared code resides solely on the machine of the developer who initiated the share. It is not stored or uploaded to the cloud in any way. Rather, Live Share simply establishes a secure connection between you and your teammates (which is encrypted end-to-end), and doesn't inspect or collect any data on the code that is shared.

## Does this remote-based model work anywhere? Is it peer-to-peer?
Live Share's only requirement is that the person sharing and their teammate each have internet access. Secure communication between team members during a collaboration session is facilitated by an Azure relay. Your workspace (i.e. source files) is not stored in the cloud. No special peer-to-peer connection is required though one might be used to reduce latency. See [changing the connection mode](http://aka.ms/vsls-docs/connection-mode) in our docs for additional details.

## What is shared during a Live Share session?
Live Share doesn't transfer all keyboard and mouse inputs. It only communicates the data needed for each collaboration activity to your teammates' machines. For example, when you share your workspace, your folder structure is shared. When you collaboratively edit a file, that file's contents are shared. When you are collaboratively debugging, debug actions (e.g. stepping) and state (e.g. call stack and locals) are shared.

## When will Live Share be released?
Live Share is available now as a limited, private preview, and we are accepting [sign-ups](http://aka.ms/vsls-signup) from users to get early access. We intend to work closely with a limited number of developers, in order to collect feedback and ensure we can deliver the best experience possible, before opening the service more broadly. Developers will be invited in an ongoing series of "waves" to help make this possible, so once you've signed up, stay tuned for further updates.

## How much will it cost?
We are committed to a substantive free tier of Visual Studio Live Share for developers to use on an ongoing basis. We will be evaluating the introduction of paid tiers with advanced features as we better understand the needs of the community.

## How is my code shared with other teammates?
When using Live Share, you’re making the code you’re working on available such that your teammates can access it via a secure cloud service that remotes commands from your editor. Your teammates can open and edit the files without needing to store them in the cloud or permanently store them on your teammate’s machine.

Live Share enables instant access to capabilities like the project tree, code navigation, and search. It also allows your teammates to benefit from editor enhancements such as IntelliSense.

## What happens if a user goes offline, or stops sharing?
The remote model requires that the developer sharing via Live Share and their teammate must be online to be connected. If your teammate attempts to use Live Share when you are offline, they will be unable to join the session until you are online again. Additionally, once collaboration stops (e.g. you close your editor, go offline, or stop sharing), then further actions or file access by your teammates are immediately disabled.

## What about screen sharing?
Live Share lets you share your project's code and its context. It means that your teammate can easily jump into your codebase and work with you, using their familiar tool. Your editor or other apps are not shared or viewable by your teammate, and you don’t have to change your workstyle or use a web-based app.

Live Share does not replace screen sharing where you may want to show a menu item or discuss visual aspects of your app or your editor. Instead, you have the option to use Live Share along with chat, voice, video, and screen sharing.

## What about other collaboration tools?
Live Share can be used with chat, instant messaging, or email technologies. We’ve observed that many collaborative interactions between developers start in these tools. However, when the discussion is about code, they often get to a point where it’s simply too hard to explain a problem with text, code snippets, or single files - more context is needed.

Live Share can be used for many things, such as: seeking help on an issue, resolving a bug, pair programming, conducting a coding interview, or performing an ad-hoc review before a code commit or a pull-request.

## What about other web editors?
With web-based editors, both teammates need to use the same web app to get collaborative benefits, which may not be their primary, day-to-day editor. Many web-based editors assume that you are building and deploying into a Virtual Machine often hosted in a cloud environment.

While this may be desirable for many scenarios, developers often want to collaborate on apps that aren’t hosted in a VM or in the cloud.  With Live Share, you and your teammate can use the capabilities of the tools’ ecosystem in addition to the same capabilities available in web-based editors.

Live Share goes a step further and enables you to share a debug session.  This makes it especially useful in enlisting others to help you track down issues that only happen on your machine without altering their development workflow or needing to alter the application design.

## If I sign-up for the limited private preview, what can I expect?
By [signing up](http://aka.ms/vsls-signup), we will send updates and details about Live Share, and we may invite you to participate in the private preview (US only), or help us with user experience testing.

We intend to work closely with a limited number of developers, in order to collect feedback and ensure we can deliver the best experience possible, before opening the service more broadly. Developers will be invited in an ongoing series of waves to make this possible.

Once invited, you'll be given the information needed to start sharing with your colleagues. While only those in the preview can "host" a session and share,  anyone can download the needed extension to join as a "guest".

You can [unsubscribe at any time](https://aka.ms/vsls-unsubscribe). For more details about our privacy statement, see [here](https://aka.ms/vsls-privacy).

## Which languages and platforms will be supported in the limited private preview?
During the private preview, the initial focus for Live Share is Node.js and ASP.NET/ASP.NET Core (C#) web applications and services. However, our goal is to support the diverse landscape of languages and platforms, to ensure we can enable rich collaboration, regardless of the application type being developed.

Many of the existing Live Share capabilities already enable other languages and platforms (e.g. collaboratively debugging Java in VS Code), and you can view more details about the current support [here](http://aka.ms/vsls-docs/platform-support). This is just the start, and we expect to improve this picture moving forward based on feedback.

## What is the roadmap?
You can view the set of private preview known issues, and roadmap items [here](http://aka.ms/vsls-issues). We encourage you to up-vote existing items, file new feature requests, and log bug reports, in order to help us shape the direction of the product moving forward.
