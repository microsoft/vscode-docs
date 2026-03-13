---
Order: 129
TOCTitle: How VS Code Builds with AI
PageTitle: "How VS Code Builds with AI"
MetaDescription: Learn how VS Code uses AI across its own development workflow with GitHub Copilot agent mode, automated testing, and AI-powered code review.
MetaSocialImage: weekly-release-announcement.png
Date: 2026-03-12
Author: Pierce Boggan
---

# How VS Code Builds with AI

March 12, 2026 by [Pierce Boggan](https://github.com/pierceboggan)

We use AI every day to ship VS Code. It's made us so much faster that, after ten years of monthly releases, we just went weekly. Agents were the key that unlocked this, not just for writing code, but across every part of how the team works.

To kick off [Agent Sessions Day](https://youtube.com/live/tAezuMSJuFs), I sat down with Peng Lyu, Engineering Manager on the VS Code team, to walk through how the VS Code team actually uses AI for our day-to-day work. Not only for implementing features (that part's self-evident), but for everything *around* building features: triage, code review, release notes, validation, staying productive in a meeting-heavy schedule.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ee-obY-4rqk?si=N-y6jlg15iBzoKxH" title="Agent Sessions Day: How VS Code Builds with AI." frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In that session, we probably only covered 5% of what the team does with agents on any given day. But it's representative of how a product that's used by millions of developers is built. So, we wanted to share more about these big recent changes to our workflow, and where we think we're going next.

## After Ten Years of Monthly Releases, We Went Weekly

We shipped VS Code monthly for ten years. Every single month we went through our well-oiled cycle of plan, build, test, endgame, ship. With each member of the team rotating through the different roles, it was a rhythm that became part of the team's culture.

Recently, we decided to start shipping VS Code on a weekly cadence. And we wanted to keep the bar for rigor and quality just as high. A monthly cycle gives you breathing room with time to plan, time to run a full endgame week where the team cross-tests each other's features, and time to write thorough release notes. Moving to a weekly cadence means all of that has to get faster or get automated. This is a huge change and a year ago, we couldn't have done it. This shift was only possible because of the way agents have transformed how we work.

![A screenshot of a GitHub issue where Kai Maetzel shares that the VS Code team is switching to weekly releases.](weekly-release-announcement.png)

The weekly cadence isn't about shipping faster for its own sake. It's about getting improvements to developers sooner. A bug fix that used to wait three weeks for the next stable release now ships in days. A feature that's merged on Monday can be in developers' editors that same week. That feedback loop of *ship > learn > iterate* just gets so much faster.

## What We Learned From This Shift

Our workflows and processes continue to evolve daily, as we learn and adapt. But there are some key learnings that continue to hold true:

1. **Parallelize yourself.** Build the habit of kicking off multiple agent sessions before context-switching. Worktrees, cloud agents, multiple VS Code sessions… use them all.
2. **Skip the intermediate artifacts.** What used to be meeting notes → issues → specs → code, is now actually becoming meeting → agent sessions → code → PR.
3. **Automate the overhead that scales with velocity.** We built agent-powered pipelines for issue triage, commit summarization, release notes, code review, all of it using Copilot CLI, the Copilot SDK, and GitHub Actions.  Engineers are still on the other end of these workflows, but agents help surface the right things to the right people, faster.
4. **Invest in harnesses before speed.** Tests, golden scenarios, and code review gates prevent agent-driven velocity from becoming agent-driven regression.
5. **Ownership is evolving.** When PMs, engineers from other areas, community contributors, and agents can contribute to any component, traditional ownership models need to adapt. Accountability for outcomes still rests with engineers.
6. **Keep humans in the loop for taste.** Agents check correctness. Humans evaluate delight.

Let's look into more detail on how each of these plays out in our team.

### Working in Parallel

There's a famous [Paul Graham](https://paulgraham.com/makersschedule.html) essay about how maker schedules and manager schedules are fundamentally incompatible. That was mostly true until recently. But agents are changing that.

Here's what a typical day might look like:

- Before entering a meeting, kick off 3-4 agent sessions for fixing bugs, prototyping features, or triaging issues.
- During the meeting, agents run in parallel across multiple VS Code sessions, worktrees, or in the cloud.
- After the meeting, review the agent output, verify locally, merge or re-prompt, and kick off again.

Managers still attend meetings and other managerial tasks, but they can use agents to also take on some of the maker work that used to be impossible to do in a meeting-heavy schedule.

Let me give you a real example. Peng starts each morning by updating [VS Code Insiders](https://code.visualstudio.com/insiders). Most days, we ship Insiders builds twice a day so we can get early feedback on the stuff we are working on. Then he runs a custom agent that fetches his meetings via [Work IQ](https://learn.microsoft.com/microsoft-365-copilot/extensibility/workiq-overview), and produces a snapshot of what's on his plate.

From there, Peng decides what needs his focus, what to delegate to agents, and what to prioritize for the team. The agent handles the busywork of gathering context so he can cut straight to the interesting problems. By the time he's in his first call, tasks are already running in parallel.

![A task management view showing a prioritized to-do list split into two sections: "Do Yourself (people/decisions)" with 4 items including prepping for VS Code Live Agent Sessions Day, scheduling a 1:1, sending a repo link, and communicating opt-out expectations; and "Open Code Tasks (delegate or do)" with 3 items including background agent worktree improvements, starting a group chat for review coordination, and discussing a GitHub endpoint for steering context. Each item includes status notes and dates.](task-management.png)

> *"Previously, you were always working sequentially. You wrote notes, turned them into issues, and then someone else, or you, would pick that up later. Now you are empowered and able to do things in parallel. It's a habit you have to build. So, I don't write down meeting notes anymore. I'm kicking off the agents directly."* — Peng Lyu

It really is a new muscle. Someone in a meeting mentions something we need to go do, and I'll fire off agents right there. We’ve also enabled transcription for most of our meetings in Teams, so grabbing context after the fact is easy. What used to be meeting notes turned into issues turned into work is now just a prompt kicked off in the moment.

### Automating the Overhead

More velocity is great. It also creates its own overhead: more issues to triage, more commits to track, more release notes to write. Here's how we've automated the parts that scale with speed.

**Commit summarization.** We built a custom slash command that fetches all commits from the last 24 hours across multiple repos and summarizes them with a fast model. It used to be you'd git fetch and have 20 or 30 commits. Now, there can be 100+ waiting for you. An entire feature area can land in a single day. That same pipeline feeds into our Insiders changelog and powers our automated X account that posts daily updates. All built on Copilot CLI and the Copilot SDK, running as GitHub Actions triggered by commits to main.

**Issue triage.** VS Code is one of the largest open-source projects on GitHub. We love our community, and the volume of issues we get is a reflection of how many people care about the product: hundreds land daily.  We used to have a rotating "inbox tracker" role, one person triaging everything for a week. This no longer scales.

Now, every time an issue is opened, it triggers an agent loop in GitHub Actions that detects duplicates (with confidence scores), determines the right owner, and suggests labels. The agent reads our ownership docs and looks at historical assignment patterns, because ownership shifts over time.

You can see it in the repo's public data: comparing Jan-Mar year over year, commit volume has more than doubled and the team is closing nearly 3x as many issues. Better triage helps engineers find and fix the right issues faster, which frees up more time for actual software development.

![Bar chart titled VS Code Repo Activity Jan 1 to Mar 10 showing a year-over-year comparison using public GitHub data. Commits grew from 2,339 in 2025 to 5,104 in 2026, a 2.2x increase. Issues Closed grew from 2,916 in 2025 to 8,402 in 2026, a 2.9x increase. 2025 bars are gray, 2026 bars are blue.](repo-activity.png)

> *"Now that piece of code is written by Copilot, who is the right owner for it? I would say it's still our engineers who are accountable for the outcome. But you do need the right harness to welcome other people to contribute to your component."* — Peng Lyu

The team also built a Chrome extension that shows triage suggestions directly on GitHub issues, like duplicates, owners, and labels. It includes a dashboard showing issue status across the team. Inside VS Code, custom slash commands let engineers groom issues and find duplicates without leaving the editor.

We've already seen a real boost in shipping velocity from the team. And, there’s still so much more we can continue to automate, streamline, and learn from as these workflows mature.

## Everyone Ships Code

This is the part I'm most excited about, because it's changed how I work more than anything else.

The traditional PM loop looks like this: write a spec or PRD → create issues → hand off to engineering. Nobody loved reading those specs, and the fundamental problem is that they're based on hypotheses. You're writing about what you think the experience should be, but you don't actually know until it's built. So, the turnaround time for feature validating can be long.

What's changed is that instead of creating a spec, I create a prototype, an actual pull request!

With agents in VS Code, I can go from someone giving us feedback on X or Reddit to a working prototype, self-host and experience it on Insiders, and continue to iterate. I had a PR merged last month that implements forking conversations in Copilot Chat. Together with Justin, one of our engineers, we reviewed the PR, worked through a few CSS changes together in the office and merged it. That's in VS Code now.

![A screenshot of an X post from @pierceboggan sharing that the fork feature is coming to VS Code.](fork.png)

This doesn't mean that all these prototypes end up in the product. Engineers are still accountable for code quality and architecture. If Peng looks at my PR and says "this doesn’t have the right architecture," that's fair, I'm fine with my PR getting thrown away and rebuilt. But the PR moves the conversation forward faster than any document ever could. The first PR doesn't have to be perfect. It moves the needle and starts a conversation with the engineer who owns that feature area.

This workflow is also a litmus test for whether your codebase is agent-ready. Can an agent find the right components? Can it find regressions? Can it find the right fix? If a PM can throw a problem at an agent and get a reasonable PR, that tells you something good about the codebase's structure, documentation, and test coverage. If the agent struggles, that's a signal too.

## Keeping Quality High as Velocity Increases

More velocity means more risk of regression.

> *"Without the right harness, for the first week or two your productivity is really high. Then you quickly reach a ceiling where you keep regressing."* — Peng Lyu

If a new component doesn't have good guardrails, agent-driven development starts strong and then quality degrades quickly. The fundamentals are still important, and with AI, we can actually improve upon them:

- **Automated validation.** When you've got 5-10 agents running at once, manually verifying that each one delivered the right experience, not just code that compiles, is expensive. Our team built a custom agent that uses the Playwright MCP server to launch VS Code, navigate to the feature under test, take screenshots, and evaluate whether the change matches expected behavior. Because it runs inside an agent loop, if the screenshot shows something broken, the agent goes and fixes it. Screenshots are stored for human review.

- **Testing.** Comprehensive test suites, unit tests, integration tests, and the infrastructure to run them, are table stakes. Beyond that, we document **golden scenarios**: specs of expected behavior for core user flows. We've traditionally tested these manually during monthly endgame weeks. We're now giving these scenarios to agents to run as automated post-merge validation. We're also exploring using this pipeline to auto-generate demo recordings: a PR lands, a demo video gets generated, and that becomes content for the changelog or a tweet.

- **Code review.** Every PR automatically gets a Copilot code review, and engineers resolve Copilot's comments before requesting human review. Six months ago, we didn't enforce this because the feedback was too noisy. Over the last few months, model quality significantly improved, often catching security, performance, and code quality issues on first pass. Resolving those comments before requesting human review has become a natural part of our workflow. We coordinate through a Slack channel where a bot posts PRs with status indicators for CI and Copilot Code Review, both updating in-place as checks complete. The culture is "give one, take one": submit a PR, pick up a review.

- **Evaluating for taste.** Human review isn't going away and has even become more important. When agents are writing more code and PRs are landing faster, the human reviewer checks whether the change actually makes sense for the product. Does this fit the architecture long-term? Does it feel right to use? Agents can catch bugs, but they can't tell you whether a feature is going to delight a developer.

Traditionally, we had endgame weeks where engineers, PMs, and designers test each other's features. This aren't doing away with this, but rather compressing it in time. On the PM side, I've been exploring what I think of as taste-based grading: writing down the qualitative experience I want a feature to have, then using agents to evaluate whether the implementation matches. Maybe 80% of the agent's observations are useful, 20% I ignore, but that 80% still gets you pretty far. Things like: does our model picker just show the model name and multiplier, or is there more information a user would actually want?

We think this same approach could help us check whether our published docs actually match the lived experience of using the product. All of our VS Code docs are largely written by one person, which is kind of amazing given our pace, but docs can go stale fast when the product is changing this quickly. We're exploring how agents can help us catch that drift automatically.

## What’s Next

More broadly, all of this comes back to what we think of as agent-ready codebase assessment: does your codebase have the structure, documentation, and test coverage for agents to contribute effectively?

We’re genuinely curious: what does your team's version of this look like? Are there workflows we're missing? Things you've automated that we haven't thought of? Drop us an issue in the [VS Code repo](https://github.com/microsoft/vscode/issues) or find us on [X](https://x.com/code) — we're building this alongside you and your feedback shapes what comes next.

We had a lot of other great sessions at [Agent Sessions Day](https://aka.ms/VSCode/Feb19) too, so check those out if you haven't already.

Happy coding! 💙