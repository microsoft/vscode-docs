---
Order: 53
TOCTitle: Improving CI Build Times
PageTitle: How Visual Studio Code leverages Azure Pipelines Artifact Caching Tasks to improve CI
MetaDescription: How Visual Studio Code leverages Azure Pipelines Artifact Caching Tasks to improve CI
MetaSocialImage: /assets/blogs/2020/02/18/hero.png
Date: 2020-02-18
ShortDescription: How Visual Studio Code leverages Azure Pipelines Artifact Caching Tasks to improve CI
Author: Ethan Dennis, João Moreno
---
# Improving CI Build Times

February 18, 2020 by Ethan Dennis, [@erdennis13](https://twitter.com/erdennis13) and João Moreno, [@joaomoreno](https://twitter.com/joaomoreno)

Visual Studio Code is a large project with lots of moving parts and an active participant list. We have [shown](https://code.visualstudio.com/blogs/2018/09/12/engineering-with-azure-pipelines) how we actively use Azure Pipelines to keep up with good engineering practices by maintaining our build and continuous integration infrastructure. In this blog post, we’ll talk about how we used the [Azure Pipelines Artifact Caching Tasks](https://github.com/microsoft/azure-pipelines-artifact-caching-tasks) to dramatically reduce our CI build times.

We described in an [earlier blog post](https://medium.com/crawl-walk-sprint/reducing-vs-code-ci-build-times-by-33-dbb1715b5028) how we reduced CI build times by 33%. This was accomplished by using custom build tasks that cache the node modules that VS Code consumes instead of resolving the packages at build time. While we were happy with this performance boost, we wanted to see how much further we could push the caching tasks that we built.

When we last talked about our CI engineering, our target platforms spanned Windows, macOS, and Linux. As of today, VS Code targets a much more diverse set of platforms, such as Arm64 and Alpine Linux for its remote server components. In total, we have eight different targets that all share common build steps. This post outlines how we leveraged the caching tasks to reduce CI duplication and further improve our build times.

## Room for improvement

So, what exactly were the common steps across all build jobs? Each build target has a job that follows a similar set of steps. At a very high level, each job must:

1. Restore dependencies
2. Lint TypeScript and JavaScript
3. Compile TypeScript to JavaScript
4. Run unit test suites
5. Run integration test suites
6. Package VS Code

Our caching tasks were an obvious choice to speed up the **Restore dependencies** step. For example, why run an expensive `npm install` step, when you could cache the results from a previous run, given that the `package-lock.json` file rarely changes? Since we’ve discussed caching packages previously, what makes this post interesting is how we applied caching to the other steps.

Since linting and compilation are platform-independent, those steps could easily be run by a single build agent that would share its results with other platform-dependent agents, instead of having all agents perform this work repeatedly. We created a Linux build agent whose sole responsibility was exactly this: restore packages, lint, and compile the source code. All we had to do was to share the results with other agents.

## Cache everything

In order to share cache results across build agents, we needed platform-independent caches, which were initially unsupported by the caching tasks. So an optional `platformIndependent` parameter was added to the Azure Pipelines Artifact Caching Tasks.

Here's how VS Code uses the `platformIndependent` parameter:

```yaml
- task: 1ESLighthouseEng.PipelineArtifactCaching.RestoreCacheV1.RestoreCache@1
  inputs:
    keyfile: keyfile
    targetfolder: target
    vstsFeed: $(ArtifactFeed)
    platformIndependent: true
```

When caching node modules, it’s logical to use `package-lock.json` files as a cache key. When this file changes, we must invalidate the cache. When caching compilation outputs, the entire code base must act as a cache key. To simplify things, we decided to use the HEAD commit as the cache key since a new commit will inevitably create a new cache entry. This works fine for our purposes since a single build, despite running across build agents, always runs over a single commit.

Another missing feature was the ability to create multiple caches per build job. We now found ourselves juggling two caches (node modules, compilation) with no way to address each cache individually. The caching tasks output an environment variable called `CacheRestored` that can be used to optimistically skip build tasks. This environment variable works great in builds that interact with a single cache, but not so great with multiple caches—leaving us to wonder which cache `CacheRestored` is referring to. Once again, another optional `alias` parameter was added to the Azure Pipelines Artifact Caching Tasks.

And here's how we use the `alias` parameter:

```yaml
- task: 1ESLighthouseEng.PipelineArtifactCaching.RestoreCacheV1.RestoreCache@1
  inputs:
    keyfile: "yarn.lock"
    targetfolder: "node_modules"
    vstsFeed: "$(ArtifactFeed)"
    alias: "Packages"

- script: |
    yarn install
  displayName: Install Dependencies
  condition: ne(variables['CacheRestored-Packages'], 'true')
```

Here, an alias of `Packages` is appended to the environment variable output, allowing us to cache NPM packages and compilation output in a single build job. We were finally deduplicating a lot of the CI work that could now be executed only once and shared across platform-specific agents.

There was still room for one final optimization, given a specific use case: build resubmissions. We sometimes must retrigger VS Code builds on previously built commits since tests might be flaky or some agents might randomly fail. Ideally, the shared agent would not restore or recompile the common code but defer to the platform-dependent agents to perform their work. The issue we noticed was that the compilation cache packages were massive and restoring them would take around 8 minutes—all for nothing since the shared agent would simply yield control if that cache existed. So a new optional `dryRun` parameter was once again added to the Azure Pipelines Artifact Caching Tasks, which allows us to check for a cache package’s existence without restoring it—effectively cutting 8 minutes off our build resubmissions.

Using the `dryRun` parameter in our build looks like this:

```yaml
- task: 1ESLighthouseEng.PipelineArtifactCaching.RestoreCacheV1.RestoreCache@1
  inputs:
    keyfile: commit
    targetfolder: output
    vstsFeed: "$(ArtifactFeed)"
    dryRun: true

- script: |
    npm run compile install
  displayName: Install Dependencies
  condition: ne(variables['CacheExists'], 'true')
```

Notice this also introduced a new `CacheExists` variable, which works together with the `dryRun` parameter.

## Results

Once these changes were implemented, we saw drastic reductions in total build time. The following table shows the change in total build times for each platform that VS Code targets:

| Platform     | Before  | After  | Time Savings |
|--------------|---------|--------|--------------|
| Windows      | 58 min     | 44 min    |  24%         |
| Windows 32   | 59 min     | 46 min    | 22%          |
| Linux        | 38 min     | 23 min    | 39%          |
| macOS        | 68 min     | 42 min    | 38%          |
| Linux Arm    | 22 min     | 21 min    | 5%           |
| Linux Alpine | 23 min     | 26 min    | -13%         |

![VS Code before and after build times](chart.png)

The Linux Arm and Linux Alpine targets only build the [VS Code remote server components](https://code.visualstudio.com/docs/remote/remote-overview), so their original build times were good enough. But since they share some common tasks with the standard VS Code client platforms, we decided to have them depend on the common build agent. This resulted in slightly increased build times due to the increased overhead in one case.

Build resubmissions saw a drastic improvement, since the shared agent tasks can be skipped altogether. Here are some numbers for macOS, for example:

| Platform     | Before | After | Time Savings |
|--------------|--------|-------|--------------|
| macOS        | 68s     | 34s    | 50%          |

In total, we were thrilled to see a combined ~50% reduction in VS Code’s CI build times! The best news is that you can draw inspiration from [our build definitions](https://github.com/microsoft/vscode/tree/main/build/azure-pipelines) to realize build time improvements of your own.

Happy Caching,

Ethan Dennis, Developer Services Senior Software Engineer
[@erdennis13](https://twitter.com/erdennis13)

João Moreno, VS Code Senior Software Engineer
[@joaomoreno](https://twitter.com/joaomoreno)
