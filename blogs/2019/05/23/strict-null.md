---
Order: 48
TOCTitle: Strict null checking
PageTitle: Strict null checking the Visual Studio Code codebase
MetaDescription: Strict null checking the Visual Studio Code codebase
MetaSocialImage: /assets/blogs/2019/05/23/social-strict-null.png
Date: 2019-05-23
ShortDescription: Strict null checking
Author: Matt Bierner
---
# Strict null checking Visual Studio Code

May 23, 2019 by Matt Bierner, [@mattbierner](https://twitter.com/mattbierner)

## Safety permits speed

Moving fast is fun. It's fun to ship new features, make users happy, and improve our codebases. But, at the same time, it's not fun to ship a buggy product. No one likes getting issues or being woken up for an incident at three in the morning.

Although moving fast and shipping stable code are often presented as being incompatible, that shouldn't be the case. Many times the same factors that make code fragile and buggy are also what slow down development. After all, how can we move fast if we're always worried about breaking things?

In this post, I'd like to share a major engineering effort that the VS Code team recently completed: enabling TypeScript's [strict null checking](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#--strictNullChecks) in our codebase. We believe this work will allow us to both move faster and to ship a more stable product. Enabling strict null checking was motivated by understanding bugs not as isolated events but as symptoms of larger hazards in our source code. Using strict null checking as a case study, I'm going to discuss what motivated our work, how we came up with an incremental approach to addressing the problem, and how we went about implementing the fix. This same general approach to identifying and reducing hazards can be applied to any software project.

## An example

To illustrate the problem VS Code was facing before enabling strict null checking, let's consider a simple TypeScript library. Don't worry if you're new to TypeScript; the specifics are not important. This make-believe example is only meant to illustrate the class of problem we were hitting in the VS Code codebase, as well as mentioning some traditional responses to such problems.

Our example library consists of a single `getStatus` function that fetches a given user's status from the backend of a hypothetical website:

```ts
export interface User {
    readonly id: string;
}

/**
 * Get the status of a user
 */
export async function getStatus(user: User): Promise<string> {
    const id = user.id;
    const result = await fetch(`/api/v0/${id}/status`);
    const json = await result.json();
    return json.status;
}
```

Looks reasonable. Ship it!

But after deploying our new code, we see a spike of crashes. From the call stack, it looks like the crashes are happening in our `getStatus` function. Uh oh!

Tracing back a little farther, it seems one of our fellow engineers is calling `getStatus(undefined)` in a misguided attempt to get the status of the current user. This causes an exception when the code tries to access: `undefined.id`. Simple mistake. And now that we know the cause, let's fix it!

So we update the calling code, update `getStatus` to handle `undefined`, and also add a helpful warning in our doc comment:

```ts
/**
 * Get the status of a user
 *
 * Don't call this with undefined or null!
 */
export async function getStatus(user: User): Promise<string> {
    if (!user) {
        return '';
    }
    const id = user.id;
    const result = await fetch(`/api/v0/${id}/status`);
    const json = await result.json();
    return json.status;
}
```

And because we are totally real engineers, we also write a test:

```ts
it('should return empty status for undefined user', async () => {
    assert.equals(getStatus(undefined), '');
});
```

Great! No more crashes. And we're even back at 100% test coverage too! Our code **must** be perfect now.

A few days go by and then: BOOM! Someone notices something strange in our logs, a huge number requests to `/api/v0/undefined/status`. That's an odd user name...

So we investigate again, fix the code again, add more tests. Maybe also send a passive-aggressive email to whoever was calling `getStatus({ id: undefined })`.

```ts
/**
 * Get the status of a user
 *
 * !!!
 * WARNING: Don't call this with undefined or null, or with a user without an id
 * !!!
 */
export async function getStatus(user: User): Promise<string> {
    if (!user) {
        return '';
    }
    const id = user.id;
    if (typeof id !== 'string') {
        return '';
    }
    const result = await fetch(`/api/v0/${id}/status`);
    const json = await result.json();
    return json.status;
}
```

Perfect. But, just to make sure, let's require that all changes that introduce a call to `getStatus` be approved by a senior engineer. That should permanently put a stop to these pesky bugs...

And maybe this time we go a few more days before the next crash. Maybe a few months even. But, unless our code is never changed again, there will be one. If not in this specific function, then somewhere else in our codebase.

To make matters worse, every change now requires: defensively checking for `undefined`, changing tests or adding new tests, and getting team sign-off. What gives? We're all doing our part and yet there are still bugs! There's got to be a better way.

## Identifying the hazard

While the bugs in the example above may seem obvious, we were hitting the same type of problems while developing VS Code. Every iteration, we would fix bugs related to an unexpected `undefined`. And we would add tests. And we would vow to be better engineers. Those are all traditional responses and yet in the next iteration, it would happen all over again. Not only was this causing some users to have a poor experience with VS Code, these bugs and our responses to them were also slowing us down while working on new features or changing existing source code.

We realized that we needed to start understanding our bugs in a new way, not as isolated events but as symptoms/signals of larger problems. Our responses to these bugs and our frustration at not being able to move quickly were also symptoms. When we started discussing the root causes of these symptoms, we found a few common ones:

* Failure to catch simple programming mistakes, such as accessing properties on `null` or `undefined`.
* Under-specified interfaces. Which parameters can be `undefined` or `null`, and which functions may return `undefined` or `null`? Often the implementer of the function was working under a different set of assumptions than the callers.
* Type oddities. `undefined` vs `null`. `undefined` vs `false`. `undefined` vs empty string.
* Feeling that we could not trust the code or safely refactor it.

Identifying the root causes was a good first step, but we wanted to go even deeper. What were [the hazards](https://arlobelshee.com/improving-testing-is-not-safe-a-parable/) in all these cases that allowed a well meaning engineer to introduce the bug in the first place? And we quickly identified a glaring hazard common to all these issues: the lack of strict null checking in the VS Code codebase.

To understand strict null checking, you have to remember that TypeScript's aim is to add typing to JavaScript. A consequence of TypeScript's JavaScript legacy is that, by default, TypeScript allows `undefined` and `null` to be used for any value:

```ts
// Without strict null checking, all of these calls are valid

getStatus(undefined); // Ok
getStatus(null); // Ok
getStatus({ id: undefined }); // Ok
```

While this flexibility makes it simpler to migrate from JavaScript to TypeScript, the example library for our hypothetical website showed that it is also a hazard. This hazard was also central to the four root causes we had identified working on VS Code (plus many others).

Thankfully though, TypeScript provides an option called [strict null checking](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#--strictNullChecks) that causes `undefined` and `null` to be treated as distinct types. When using strict null checking, any type that may be nullable must be annotated as such:

```ts
// With "strictNullCheck": true, all of these produce compile errors

getStatus(undefined); // Error
getStatus(null); // Error
getStatus({ id: undefined }); // Error
```

Fixing isolated lines of code or adding tests was a reactive solution that only fixed those specific bugs. Enabling strict null checking is a proactive solution that not only would fix the bugs we were seeing reported every month, but would also prevent these entire classes of bugs from happening in the future. No more forgetting to check if an optional property has a value. No more questioning if a function can return null or not. The benefits were clear.

## Coming up with an incremental plan

The problem was that we couldn't just enable a compiler flag and everything would be magically fixed. The core VS Code codebase has some 1800 TypeScript files, comprising more than half a million lines. Compiling it with `"strictNullChecks": true` produced some 4500 errors. Ugh!

Furthermore, VS Code is made of a small core team and we like moving fast. Branching off the code to fix those 4500 strict null errors would have added a huge amount of engineering overhead. And where do you even start? Go through the list of errors top to bottom? In addition, changes in a branch would not help main, where the majority of the team would still be working.

We wanted a plan that would incrementally bring the benefits of strict null checking to all engineers on the team, starting right away. That way, we could break the work into manageable changes with each small change making the code a little bit safer.

To do this, we created a new TypeScript project file called `tsconfig.strictNullChecks.json` that enabled strict null checking and initially consisted of zero files. We then selectively added individual files to this project, fixed the strict null errors in those files, and then checked in the change. As long as we added files that either had no imports or only imported other already strict null checked files, we only had to fix a small number of errors each iteration.

```json
{
    "extends": "./tsconfig.base.json", // Shared configuration with our main `tsconfig.json`
    "compilerOptions": {
        "noEmit": true, // Don't output any javascript
        "strictNullChecks": true
    },
    "files": [
        // Slowly growing list of strict null check files goes here
    ]
}
```

While this plan seemed reasonable, one issue was that engineers working in main would normally not be compiling the strict null checked subset of VS Code. To prevent accidental regressions to already strict null checked files, we added a continuous integration step that compiled `tsconfig.strictNullChecks.json`. This ensured that checkins that regressed strict null checking would break the build.

We also put together [two simple scripts](https://github.com/mjbvz/vscode-strict-null-check-migration-tools) to automate some of the repetitive tasks related to adding files to the strict null checked project. The first script printed a list of files that were eligible to be strict null checked. A file is considered eligible if it only imports files that were themselves strict null checked. The second script tried to automatically add eligible files to the strict null project. If adding the file caused no compile errors, then it was committed to `tsconfig.strictNullChecks.json`.

We also considered automating some of the strict null fixes themselves but we ultimately opted against this. Strict null errors are often a good signal that source code should be refactored. Maybe there wasn't a good reason why a type was nullable. Maybe the callers should handle null instead of the implementors. Manually reviewing and fixing these errors gave us a chance to make our code better, instead of brute forcing it to be strict null compatible.

## Executing the plan

Over the next few months, we slowly expanded the number of strict null checked files. This was often tedious work. Most strict null errors were simple: just adding null annotations. For others, it was difficult to understand the intent of the code. Was a value purposefully left uninitialized or is there actually a programming mistake?

In general, we tried to avoid using [TypeScript's not-null assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator) in our main codebase as much as possible. We did use it more freely in our tests, reasoning that if the lack of null checking in the test code would cause an exception, then the test will fail anyway.

One dispiriting aspect of the whole process was that the total number of strict null errors in the VS Code codebase never seemed to decrease. If anything, if you compiled all of VS Code with strict null checks enabled, all of our strict null work actually seemed to be causing the total number of errors to go up! This is because strict null fixes often have cascading effects. Correctly annotating that a function can return `undefined` may introduce strict null errors for all consumers of that function. Rather than worrying about the total number of remaining errors, we focused on the number of files that were already strict null checked and worked to ensure that we never regressed this total.

It's also important to note that enabling strict null checking does not magically prevent strict null related exceptions from ever occurring. For example, `any` types or bad casts can easily bypass strict null checking:

```ts
// strictNullCheck: true

function double(x: number): number { return x * 2; }

double(undefined as any); // not an error
```

as can accessing out of bounds elements in an array:

```ts
// strictNullCheck: true

function double(x: number): number { return x * 2; }

const arr = [1, 2, 3]

double(arr[5]); // not an error
```

Furthermore, unless you also enable TypeScript's strict property initialization, the compiler will not complain if you access a member that is not yet initialized

```ts
// strictNullCheck: true

class Value {
    public x: number;

    public setValue(x: number) { this.x = x; }

    public double(): number {
        return this.x * 2; // not an error even though `x` will be `undefined` if `setValue` has not been called yet
    }
}
```

The point of this effort was never to eliminate 100% of the strict null errors in VS Code—which would be extremely difficult, if not impossible—but to prevent the vast majority of common strict null related errors. It also was a good chance to clean up our code and make it safer to refactor. Getting 95% of the way there was acceptable for us.

You can find our entire strict null checking plan and its execution [on GitHub](https://github.com/microsoft/vscode/issues/60565). All members of the VS Code team along with many external contributors were involved in this effort. As the driver of this work, I made the most strict null related fixes, but it only took up around a quarter of my engineering time. There was certainly a bit of pain along the way, including some annoyance that many strict null regressions were only caught by continuous integration after checkin. The strict null work also introduced a few new bugs. However, considering the amount of code changed, things went remarkably smoothly.

The [change that finally enabled strict null checking](https://github.com/microsoft/vscode/commit/7d0e64f5ec69c1452bcf227692768db45b8d6334#diff-9f6a7f86a587bb89b022817ce9f353f5) for the whole VS Code codebase was rather anti-climactic: it fixed a few more code errors, deleted `tsconfig.strictNullChecks.json`, and set `"strictNullChecks": true` in our main `tsconfig`. The lack of drama was exactly as planned. And with that, VS Code was strict null checked!

## Conclusion

One common question I hear when telling people about this project is: So how many bugs did it fix? I think that question isn't really meaningful. With VS Code, we never had a problem fixing bugs related to the lack strict null checking. Usually it involved adding a conditional and perhaps a test or two. But we kept seeing the same type of bug over and over and over again. Fixing these bugs was slowing us down unnecessarily and it meant that we couldn't fully trust our code. The lack of strict null checking in our codebase was a hazard and the bugs were only a symptom of this hazard. By enabling strict null checking, we have done significant work to prevent an entire class of bugs, in addition to bringing many other benefits to our codebase and working style.

The point of this post was not to be a tutorial on enabling strict null checking in a large codebase. If this problem does apply to you, hopefully you saw that it is possible to do in a sane way without any magic. (I will add that if you are starting a new TypeScript project, do your future self a favor and start with `"strict": true` as the default.)

What I hope you take away is that, far too often, the response to a bug is to either add tests or blame. "Of course Bob should have known to check for undefined before accessing that property." People mean well but will make mistakes. Tests are useful but also have a cost and only test what we write them to test.

Instead, when you encounter a bug or something else that is slowing you down, rather than rushing in a fix and moving on to the next issue, stop for a moment to really explore what caused it. What was its root cause? What hazards does it reveal? For example, maybe your source code contains a hazardous coding pattern and could use some refactoring. Then work to address the hazard in a way that is proportional to its impact. You don't need to rewrite everything. Do the minimum amount of upfront work required and automate when it makes sense. Reduce hazards and make the world incrementally better today.

We took this approach with strict null checking VS Code, and will apply it to other problems in the future. I hope you find it useful as well, no matter what type of project you are working on.

Happy Coding,

Matt Bierner, VS Code Team Member
[@mattbierner](https://twitter.com/mattbierner)