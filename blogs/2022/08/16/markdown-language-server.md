---
Order: 75
TOCTitle: Markdown Language Server
PageTitle: Introducing the Markdown Language Server
MetaDescription: Why we decided to build a language server for working with Markdown
Date: 2022-08-16
Author: Matt Bierner
---

# Introducing the Markdown Language Server

August 16, 2022 by Matt Bierner, [@MattBierner](https://twitter.com/MattBierner)

Markdown was the first feature I took ownership of when I joined VS Code back in 2016. Wow, has it really been six years? It was a great match though. I've worked with Markdown long enough that I ever find myself hopefully typing backticks and asterisks into Twitter, Outlook, and just about every textbox my cursor lands in. It's been incredibly rewarding to grow VS Code's built-in Markdown support over the years and see how our Markdown extension has directly and indirectly shaped core features like webviews and notebooks.

That's why I'm excited to share a project I've been quietly working towards for the past half year, and a project that I think represents the next step for VS Code's Markdown tooling: a Markdown Language Server. With this language server, we're making much of VS Code's built-in Markdown language tooling — everything from document outlines, to smart folding, to path completions — available to other editors and tools. Our goal is to push Markdown tooling forward with the type of smarts more often associated with programming languages.

The Markdown Language Server effort is split between two new (and somewhat confusingly similarly named!) open source libraries:

- [Markdown Language Service][service] — A TypeScript library that provides tools for working with Markdown.

- [Markdown Language Server][server] — A [language server][ls] for Markdown built using the language service.

While these libraries are still in early stages, they are already being used by VS Code 1.70+ (and hopefully you never even noticed :). We've even seen a few benefits from this switch, such as moving Markdown tooling to a separate process so it can't block other extensions. I'm looking forward to onboarding other editors and tools to these projects as well!

But before I get too ahead of myself, perhaps you're wondering: why is a Markdown language server needed? And truthfully, it took me these six years to come around to this myself. This also tracks my evolution from seeing Markdown simply as plaintext with a few asterisks, brackets, and pound signs thrown in to liven things up, to instead understanding Markdown as a markup language, and one that could benefit from many of the same tools we ship for programming languages like TypeScript or Python.


## Getting down with Markdown tooling

Back before I discovered VS Code, I mostly coded with a simple text editor. This meant I had to remember symbol names and type them out every time wanted to use them. If I wanted to rename a variable, I'd do a text find/replace and hope that my unit-tests would catch the inevitable cases where a name had been either missed or mangled. It was a slow and unreliable way to work, yet I was content because I didn't know things could be better. I only truly grasped how primitive my workflow had been when I finally got my hands on smarter tools.

I recently had the same realization with Markdown. For years I'd been fine using VS Code's relatively simple Markdown editor. I was content with to have syntax highlighting and the built-in preview. Document outlines and clickable editor links where just bonuses. I'd gotten used to writing out links by hand. I'd come to accept that if I changed a header name, I would need to do a text search to update all the links to that header. And because I saw Markdown as little more than fancy plaintext, I couldn't even imagine that a better way was possible.

But one day after mistyping an image path for like the hundredth time, it finally hit me: this isn't fun! Why am I wasting my life manually typing out and validating these links? That's what tools are for! I knew I didn't want just any tool though, I wanted one that would help me read and write my Markdown as text instead of hiding the Markdown source behind some WYSIWYG-style UI magic. That's very much in keeping with the ethos of VS Code and how we think about support for programming languages. Why shouldn't many of the same smarts we offer for traditional programming languages apply to Markdown too? I started work on link completions the very next day.

Link completions are suggestions that help you write links to headers within the current file or to other files in the workspace. I even added support for completing links to headers within other Markdown files. Neat! It was a small addition but one that made a huge difference in my productivity. Soon I couldn't imagine how I'd ever lived without it.

Giddy with the success of Markdown completions, I swooned as I imagined what other language smarts I could next bring to bear on Markdown. I fantasied of confidently F2ing on headers to safely rename them. I daydreamed of red sguigglies beaming out through murky seas of text to help identify invalid links. It all seemed so obvious! Why hadn't I thought of it years ago? I was starting to understand Markdown as structured text instead of just plain text, and the possibilities for better Markdown tooling seemed endless.

I won't bore you with the story behind every new feature or dive into all gory details of how they were all implemented. Suffice it to say, I took an incremental approach which made all the effort possible with the limited time I had to devote to VS Code's Markdown support. Instead of jumping directly to building rename support for instance, first I got a solid version of "Find All References" up and running (because if you want to rename a symbol, first you need to know all the places where it is referenced). Working incrementally and building each feature on top of each other also helped me test old features as I implemented new ones. For instance, implementing renaming on link me helped catch tons of bugs with link detection. (The only downside to this approach is the feeling when you realize that you've built your oh so elegant tower atop a few very hairy regular expressions).

When experimental support for reporting invalid file/image links rolled out in late Spring, I finally took a step back to survey my work. The set of Markdown language features now included:

- Document outlines
- Workspace symbols
- Document links
- Smart folding
- Smart selection
- Completions
- Rename
- Find all references
- Go to definition
- Diagnostics for broken links
- Updating of links on file moves / renames

I knew these new tools would make working with Markdown faster and safer. But as I reviewed this list of programming language like features, an idea kept nagging at me. I'd dismissed it as ridiculous just a scant few months back but now, as I thought over again, I realized that it may finally be time for a Markdown language server.


## Are you being servered?

Late spring 2022. At this point, all of VS Code's Markdown tooling was still running on the [normal extension API](https://code.visualstudio.com/api/references/vscode-api). While I wanted to explore moving all of these tools over to a proper language server, making the change would have a real engineering cost. I needed to make sure it was going to be worthwhile.

I went back and forth on this for more than month. Even though the existing code was in decent shape, there were plenty of unknowns. What if I got part of the way through only to realize it wouldn't work? I'd never even seriously worked on a language server before.

As I debated all this, I kept myself busy by refactoring the extension code as if it were going to be moved to a language server. I tried to isolate dependencies on VS Code's extension APIs, I switched more logic to use service injection, and I made sure tests didn't rely on the filesystem. That way even if I never took the language server plunge, at least I was cleaning up the codebase.

A few considerations ultimately convinced me that a Markdown language server was the right next step. First a rather mundane one: I was finding it very challenging to efficiently implement link diagnostics for Markdown files. On a large Markdown workspace such as [vscode-docs](https://github.com/Microsoft/vscode-docs), I kept accidentally blocking the extension host for few hundred of milliseconds. Not good. A language server on the other hand though runs as its own process. Not only that, but language servers also had a fancy new pull model for diagnostics that I was excited to try out.

Then there were more noble factors. For instance, a Markdown language server would be useful to other editors and tools. This even includes the other editor the VS Code team ships: Monaco! Not to mention the possibilities of something like a Markdown CLI tool. Even if I didn't have the time to build such a tool myself, perhaps someone else could using the language server as a starting point. I'd put a lot of work into VS Code's Markdown tooling and it would be great if all this work could benifit others too.

By making a new language server available, I might also be able to kickstart a shared effort around improving Markdown tooling. VS Code is both a prolific producer and user of open source software, and I'd seen the clear benefits these types of projects offer. True an open source Markdown language server would help other editors, but this in turn would also invite contributions that would ultimately help VS Code too! Instead of each editor/tool duplicating effort implementing their own Markdown tooling, a language server could bring developers together to work on a larger project that would benefit everyone.

But all these grand musings were irrelevant without a plan of how to actually build the language server. Even after all my refactoring, moving the code to a language server was going to be a lot of work! It seemed overwhelming, until I realized that I didn't have to do it all in one go. I could build the server incrementally, moving over one feature at a time from the VS Code Markdown extension to the new Markdown language server. Even better, if I did it right, I could check in each little incremental migration so that users would be testing out the new language server as it was being built. Ideally users would never even notice when a feature moved from the extension to the language server.

Maybe this is something really obvious to say, but I've become a huge believer in this type of incremental approach to large code changes. No hundred thousand LOC PRs or massive feature branches that stick around for months (or years!). Instead make a bunch of small, safe changes to `main`. If everything goes as planned, the commit that caps off all this work should be spectacularly anti-climatic. This is the approach we took to progressively [strict null check the entire VS Code codebase](https://code.visualstudio.com/blogs/2019/05/23/strict-null), and this is how I felt that I could move all of VS Code's Markdown tooling to a new language server as quickly as possible and with as little drama as possible.

And spoiler alert: it worked! I moved over language features over one at a time. I learned as I went, and refactored when it became clear it was needed. Diagnostics were the last feature to move over, as not only was I moving them to the language server but I also rewrote them to use the language server's new pull diagnostics model. The last commit of the whole effort mostly just deleted now unused code from the Markdown extension. And so today, if you're on VS Code 1.70+, almost all Markdown language features now use the new language server.


## Building better Markdown tooling together

In many ways, the past six months have seen more advances in VS Code's Markdown tooling than the past six years I've been working in the space. Today we are shipping many new tools, some of which have not been available for Markdown before. Many of these benefit even the most casual readers and writers of Markdown, while others will only be appreciated by advanced users. However for all the progress, I know that we've really only just started to explore what's possible in Markdown tooling.

What really get me excited about the Markdown Language server though is that now this project is bigger than just VS Code. By making our Markdown tooling easy to consume, my hope is that we can help push Markdown tooling forward for everyone. These open source projects are invitations to help build the future of Markdown tooling together. If you're interested in contributing, check out the new projects and see what you can create using them. You can submit bug reports and feature requests, maybe even a PR! There are tons of smart Markdown language features I haven't even dreamt of yet. Let's build them together!

If you're interested in checking out the code or contributing, you can find the Markdown language service and server over on GitHub and npm:

- [Markdown Language Service][service] — A TypeScript library that provides tools for working with Markdown.

- [Markdown Language Server][server] — A [language server][ls] for Markdown built using the language service.

Happy Coding!

Matt Bierner, [@MattBierner](https://twitter.com/MattBierner)


[ls]: https://microsoft.github.io/language-server-protocol/
[server]: https://github.com/microsoft/vscode/tree/main/extensions/Markdown-language-features/server
[service]: https://github.com/microsoft/vscode-Markdown-languageservice
