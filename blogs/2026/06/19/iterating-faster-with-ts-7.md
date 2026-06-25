---
Order:
TOCTitle: Iterating faster with TypeScript 7
PageTitle: Iterating faster with TypeScript 7
MetaDescription: How the VS Code and TypeScript teams collaborated to adopt TypeScript 7 and speed up VS Code development
MetaSocialImage: TODO
Date: 2025-06-19
Author: Matt Bierner
Keywords: [TypeScript]
---

VS Code and TypeScript practically grew up together. We made a bet early on to write VS Code in TypeScript, and we have always worked closely with the TypeScript team to provide great built-in TypeScript and JavaScript language support in VS Code. This post is about the next step of that journey: TypeScript 7, and how collaborating on adopting TypeScript 7 sped up our builds, improved the day-to-day editing loop for both developers and agents, and helped the TypeScript team ship a more tested release.

TypeScript 7 is a [ground-up rewrite of the TypeScript compiler and language tooling in Go](https://devblogs.microsoft.com/typescript/typescript-native-port/). That means it's fast, more than 10x faster in many cases. VS Code had a lot to gain from those speedups, so we were naturally eager to adopt TypeScript 7 as soon as we could.

However, we also knew that this would take time. When we started this process in the summer of 2025, TypeScript 7 was actually already shockingly far along for a complete rewrite, but it still had type checking inconsistencies and lacked many features we needed. Even so, we wanted to start testing and providing feedback right away. Adopting TypeScript 7 while it was still being built may sound a little crazy, but it turned out to be a great decision for both VS Code and TypeScript.


## An incremental migration
The VS Code team has never been afraid to take on large engineering efforts, whether that's enabling [strict null checking in our codebase](https://code.visualstudio.com/blogs/2019/05/23/strict-null), adding [remote development support](https://code.visualstudio.com/blogs/2019/05/02/remote-development), or addressing and preventing dangerous code patterns across thousands of files. A common theme across these efforts is that we try to take an incremental approach. This means breaking big, complex problems down into small steps. Those steps happen in the main codebase (no forks or long-lived branches), and each one usually brings a small improvement as it lands. Take enough little steps, and eventually you can look back and realize that you've quietly conquered that once seemingly insurmountable challenge.

We wanted to take the same approach to adopting TypeScript 7. For us, that meant gradually introducing TypeScript 7 into different parts of our workflows and codebases, starting with lower-impact, lower-risk areas before eventually moving on to the main areas of VS Code. There are many benefits to working incrementally, but two were especially important for this effort:

- Reduced risk. Each step of the adoption was relatively small, so if something went wrong, it was easy to identify the cause and revert.

- Early feedback. We wanted to start testing and providing high-quality feedback to the TS team early in TS 7's development. That meant getting as much usage of TypeScript 7 as possible, but without negatively impacting developer productivity on the VS Code team.

    This testing helped us find bugs and limitations that they could then prioritize fixing. And as we adopted TS 7 in more parts of our codebase, those areas also became informal regression tests for each new TypeScript 7 nightly release.

In practice, that incremental philosophy unfolded as a series of phases over around 6 months. Each phase increased our use and testing of TypeScript 7 a little more, moving in step with TypeScript 7's own progress and helping shape it along the way. Here's how it played out:

**Exploration (summer and early fall 2025)**

TypeScript 7 was [publicly announced in March 2025](https://devblogs.microsoft.com/typescript/typescript-native-port/). By the summer, it was ready for initial testing, although at this point it still had known bugs and limitations.

Type checking was farther along than emit (the process of generating JavaScript output files), so most of our early testing focused on manually running the [`@typescript/native-preview` npm package](https://www.npmjs.com/package/@typescript/native-preview) on some of our smaller extensions with `--noEmit`. We reported issues as we found them, and because the `native-preview` package was updated daily, we could test new changes and fixes quickly.

As part of TypeScript 7, the TypeScript team was also building up the new language server that would power VS Code's in-editor TypeScript and JavaScript support. This was shipped using the [TypeScript native preview VS Code extension](https://marketplace.visualstudio.com/items?itemName=TypeScriptTeam.native-preview), which replaces VS Code's built-in JavaScript and TypeScript IntelliSense with the new TypeScript 7 language server. We worked with the TypeScript team to make it easy to switch back and forth between the two TypeScript versions. That flexibility mattered because TypeScript 7 was still missing a number of basic language features at this point. We wanted developers to feel that they could try it out with as little effort and risk as possible.

We also made it easy to report TypeScript 7 issues directly from VS Code. Making reporting easy meant that developers would not think twice about filing even small annoyances. Those reports fed a steady stream of real world feedback for the TypeScript team.

At this stage, most testing was done by a small number of motivated VS Code team members who were interested in alpha testing and were OK working around some annoyances.

**The TS 6 bridge (fall 2025)**

Meanwhile the TypeScript team was thinking through how to ease the transition to TypeScript 7 instead of leaving users to make one big jump. Now it being 2025, this thinking was inexplicably accompanied by a bewildering hand gesture, with the result being the aptly named TypeScript 6.0:

> TypeScript 6.0 acts as the bridge between TypeScript 5.9 and 7. As such, most changes in TypeScript 6.0 are meant to help align and prepare for adopting TypeScript 7
>
> — https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/

Such a bridge was necessary because TypeScript 7 gave the team a chance to fix and modernize certain long-standing annoyances in TypeScript tooling. For example, older TypeScript releases defaulted to targeting ES5. That made sense in 2014, when ES6 (aka ECMAScript 2015) had not been finalized yet, but it felt wildly anachronistic in 2025. It was also a footgun for new developers who would end up accidentally generating larger, less efficient JavaScript files simply because they forgot to set `target`. Similarly, TypeScript 5 did not enable strict null checks by default, so many users were missing out on this truly game-changing feature just because they did not know they needed to enable it.

For us on the VS Code team, switching to TypeScript 6 was a small, low-risk step compared to the prospect of adopting an entirely rewritten TypeScript 7. It required only a few minor code changes. Still, this small step made us more confident that our codebase was in a good state and that once TypeScript 7 was ready, we'd be able to switch to it without many issues.


**TS 6 and 7 in parallel (fall 2025)**

Next it was time to start using TypeScript 7 in earnest. We started with the lowest-risk area: using TypeScript 7 to type check our built-in extensions. During this phase, we continued to run TypeScript 6 for full type checking and JavaScript generation (emit). We set up our continuous integration so that both TypeScript 6 and 7 builds needed to pass. Generally, the type checking between TypeScript 6 and 7 matched, but running both did help catch a few differences that we reported.

By this point, thanks to steady work from the TypeScript team, the language server in TypeScript 7 was also further along, so we added the TypeScript 7 extension as a dependency in the VS Code repo so that our developers could easily switch to it. Our goal was to gradually improve our editor support so that developers could spend more and more time using TypeScript 7. We prioritized anything that caused developers to switch back to TypeScript 6, whether that was a bug or missing functionality.

One of the most common initial reasons developers switched back to TypeScript 6 may be a bit surprising: code formatting. You can generally live with suggestions not being perfect and even with `Go to Definition` behaving inconsistently, but formatting differences between TypeScript 6 and 7 would cause our PR pre-commit checks and continuous integration formatting checks to fail. That gave even little formatting inconsistencies—such as extra whitespace—outsized priority. Over time, those formatting issues were ironed out and developers had to switch back to TypeScript 6 less and less.

**Adopting TypeScript 7 for most extensions (January and February 2026)**

By early 2026, TypeScript 7 had everything we needed to start using it fully. The TypeScript team had done truly amazing work making type checking trustworthy, finishing up emit, and improving the language tooling in the editor. It was time to start switching over to TypeScript 7 fully.

As always, we wanted to move carefully and incrementally, so we started migrating our built-in extensions one by one. These built-in extensions are fundamentally quite similar to a VS Code extension you can create using `yo code`. Before the switch, those extensions used the following build tools:

- `tsc` (TypeScript 6) for type checking and development builds.
- `webpack` for production and web bundles.
- `esbuild` for fast emit.

As part of the TypeScript 7 migration, we decided to simplify our builds by switching our bundling to use esbuild instead of webpack. This simplified our build tooling and significantly reduced the time it took to generate bundles.

Our new built setup was simpler:

- `tsgo` (TypeScript 7) for type checking and development builds.
- `esbuild` for production and web bundles.

We migrated the extensions in small groups to minimize the impact of any regressions. This also let us start with the simplest extensions, building up our knowledge and confidence before moving on to more complex extensions. This process generally went smoothly, which shouldn't be a huge surprise given that we had already been building this code using TypeScript 7.


**Adopting TypeScript 7 as the default (February 2026)**

The final move was to switch to TypeScript 7 for our normal development. By then, the TypeScript team's fixes had removed the blockers we had been working around, and because the incremental steps had already done most of the work, the code change for this was actually pretty minor. [Here's the change](https://github.com/microsoft/vscode/commit/86da9175ebfa985451eb324d2f94152d867ae3af) that switches our normal watch task to use TypeScript 7, for example.

We also made TypeScript 7 the default version used in the editor for the VS Code repo. We still support switching back to the older TypeScript as an escape hatch, but it has rarely been needed in practice. Most developers are happy to stay on TypeScript 7 because of its significantly better performance.


## The numbers
So, was it all worth it? The answer is a clear and resounding yes.

Here's a before-and-after comparison for type checking the main VS Code source code:

```
# TS 6.0
tsc --noEmit -p src/tsconfig.json
36 seconds

# TS 7
tsgo --noEmit -p src/tsconfig.json
5 seconds
```

TypeScript 7 is more than seven times faster! That's especially impressive when you consider that these two tasks are doing the same work: they type check the same files with the same level of thoroughness and report the same errors. Just by switching from TypeScript 6 to TypeScript 7, we sped up our type checking by 7x.

With TypeScript 7, we can also now type check all of our built-in extensions (except Copilot) in well under a second (and even the large Copilot extension still only takes 2.5 seconds).

The results get even more impressive when we look at compiling and type checking all of VS Code, i.e. both our main source code and our roughly fifty built-in extension `tsconfig` projects. This is what the `npm run watch` command does, and it is also the command that developers working on VS Code typically run.

With TypeScript 6, `npm run watch` takes around 80 seconds to complete. After migrating to TypeScript 7, we dropped this time to just over 20 seconds: roughly four times faster. That's a whole minute saved in normal development and agent-assisted iteration every time a build needs to be restarted (re-checks after the initial watch completes are around a second at most).

Those improvements also translate into better language tooling performance in the editor. For TypeScript language features in the editor, we need to load the whole `tsconfig` project before we can provide proper errors and complex features like auto imports. For the main VS Code project, that used to take close to a minute. Now it's around 10 seconds. That's roughly 50 seconds saved. With VS Code developers often reloading their editor windows multiple times per day, those saved seconds really add up. No more quick coffee runs while the editor tools are loading.

Seeing these numbers really puts the scale of the improvements in perspective. It was easy to lose track of the total impact because our incremental approach meant that many improvements arrived gradually instead of in one big PR. Early steps might only have saved a second here or a few hundred milliseconds there. By the end, however, those small wins had added up into something significant. It's amazing to see how the TypeScript team delivered on their initial promise too: it's full TypeScript, just way faster.


## Better through collaboration
Adopting TypeScript 7 has been a big win for developers working on VS Code, but there's another result of this effort that is less tangible and perhaps even more impactful. VS Code's large, complex codebase turned out to be an excellent way to find real-world bugs in TypeScript 7 and polish its editor tooling.

The developers on the VS Code team also were not afraid to provide feedback about missing features or when something just did not feel right. Every time a developer hit a rough edge and switched back to TypeScript 6, it was a signal for the TypeScript team to decide what to fix next. The result is a more tested and polished version of TypeScript 7, one that we know works well beyond the VS Code codebase.

Although we've focused on the VS Code side of the story in this post, the TypeScript team really deserves almost all of the credit. They were the ones building TypeScript 7 after all, while also responding to all the feedback from those pesky VS Code devs. From myself and the rest of the VS Code team, thank you!

TypeScript 7 is an exciting step forward for the language. Whether you're editing code in VS Code, kicking off compiles on the command line, or asking an agent to iterate on a project, the performance improvements are significant and noticeable. Thanks to the work of the TypeScript team and the testing and feedback process outlined here, switching to TypeScript 7 should be a relatively smooth process and an easy win for many codebases.

More than anything though, I hope this post shows the value of working incrementally, testing early and often, and building tight feedback loops for close collaboration. These are values VS Code has always held, and they continued to serve us well again on this effort. I hope that this story motivates you to think differently about how you can tackle large engineering efforts in your own projects and ultimately ship better code.