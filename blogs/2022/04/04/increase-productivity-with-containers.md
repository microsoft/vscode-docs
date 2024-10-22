---
Order: 72
TOCTitle: Moving from Local to Remote Development
PageTitle: Using Containers to move from local to Remote Development
MetaDescription: Increase productivity by moving your development environment from local, to containers, to the cloud.
Date: 2022-04-04
Author: Olivia Guzzardo
---

# Using Containers to move from Local to Remote Development

April 4, 2022 by Olivia Guzzardo, [@OliviaGuzzardo](https://twitter.com/OliviaGuzzardo)

One of my favorite things that industry professionals like to ask aspiring developers is, "How many lines of code does the average developer write per day?" Most guess in the hundreds or thousands – they're always shocked to hear that the actual average figure lies in the tens.

Then what are developers doing with the rest of their time? Sure, there's time spent on important tasks like code design and searching "How to center a div in CSS", but an inordinate amount is spent on pure overhead – setting up projects, onboarding other developers, and troubleshooting issues that you can't seem to repro on your own machine.

The Visual Studio Code team has used this insight as the heart of their research over the years: if we can reduce time spent on overhead, like [reading about environment setup](https://code.visualstudio.com/blogs/2022/03/08/the-tutorial-problem), then we can increase productivity time. We have a vision where developers don't have to keep fighting the same battles over and over again. This means a consistent development setup that can handle the never-ending churn of version upgrades, configuration changes, and hardware refreshes.

But what does the path look like to get us there? Let's examine the journey to increase developer productivity that has led us from local development, to container-based development, to the cloud.

## Starting out with local development

Let's begin where all developers start (and where a lot still are): local development. If you've ever uttered the phrase, "But it works on my computer!", then chances are that you were in the local development phase. This means that everything for your development environment exists locally on your machine.

![A shrug emoji saying "It works on my machine"](it-works-on-my-machine.png)

Let's paint a picture of what local development looks like in the real world. Have you ever joined a new project, ready to get to work and start coding, but were instead handed pages of onboarding notes in order to get your environment up and running. You spend hours and hours waiting for install commands to finish and being bounced from colleague to colleague to troubleshoot build failures. It can be days before you can successfully run the project.

Then once you get over that onboarding hump, your team needs to update one of the project's dependency versions. So then you have to install the updated version on your laptop, test the update, and push up any refactoring updates. But your laptop runs Windows and your teammates run macOS, and the changes aren't working on their environment, and you have even more troubleshooting ahead of you.

And **THEN**, you need to make sure all the updates work in production too...

![A meme showing a dog saying "This is fine" while sitting in a room on fire](this-is-fine-meme.png)

Clearly, it is problematic when everything exists solely on a developer's machine. Your machine may differ wildly from your teammate's, whether that be from installed versions of dependencies, or from running an entirely different OS. This can lead to a never-ending cycle of configuration nightmares. Even if you get everything in sync with your coworkers, you lose any confidence that you won't run into more issues when you go to deploy your code.

Wouldn't it be nice to be confident that your development environment was the same as everyone else's including the deployment environment? This brings us to our first advancement in streamlining development productivity: container-based development.

## Containers are everywhere

"Containers" has been a big buzzword in the industry for a while now, so let's dive into what exactly containers are. To understand the essence of containers, it helps to look at the comparison with a shipping container in the physical world.

In a simplistic view, physical shipping containers allow goods to stay as a unit. Everything that needs to go to Company A is in Shipping Container A. Upon arrival, Company A isn't going to need to reach out to Container B and Container C to acquire their complete package; everything is packaged within Container A. Additionally, a company doesn't need separate infrastructure to deal with, for example, a container full of furniture versus a container full of food. No matter the content, they have the tools necessary to pick up that container and bring it to its destination. This provides an efficient, standardized way of shipping products.

Containers first emerged in the virtual world for this exact same benefit: a streamlined way to ship products. They provide a way to ship your software as a unit, including all binaries, dependencies, and configuration files.  This reduces the time spent on configuration overhead, as the container packages everything that the software needs to be run. The container can then be easily deployed from environment to environment. It's [predicted](https://www.gartner.com/en/newsroom/press-releases/2020-06-25-gartner-forecasts-strong-revenue-growth-for-global-co) that by 2023, more than 75% of global organizations will be running containerized applications in production, up from less than 30% in 2020.

Traditionally, containers are used when the code is ready to be deployed to production. While this model certainly streamlines the end of the software development lifecycle, it doesn't do much for developers when they're actually writing and testing the code. To fill this gap, container-based development arrived.

## Containers for developers

The idea behind container-based development is to introduce containers at the very start of the development process.  Developers can then do all coding and testing in environments that are consistent with other environments, like production. When there is consistency across environments, time spent troubleshooting different code behavior from one environment to another can be mostly eliminated.

This brings us to the concept of a development container: a container that runs a full-featured development environment. A dev container houses its own app and dependencies, such as the required tools, libraries, and runtimes. In the diagram below, you can see that these dependencies exist in the containers and not on the host machine, which means that you can seamlessly switch between tech stacks in no time at all.

![A diagram showing containers with different tech stacks](container-diagram.png)

To provide a way to create and connect to dev containers, VS Code released the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in 2019. This extension enhances local development by using the full power of dev containers, all while never leaving the comfort of VS Code. With over 11 million installs of the extension, it got us thinking: what if you could have a dev container that is hosted in the cloud?

## Moving to the cloud

Let's be real: everything is moving to the cloud, so why should your development environment be any different? Well, for one, the cloud is vulnerable to attacks. For two, it seems like we're constantly hearing about major outages. For three, it can be pricey. For four… wait, isn't the cloud supposed to be a good thing?

With all these reasons to be wary of the cloud, it can be uncomfortable to think about something as important as our development environment being hosted there.  So let's stay comfortable! Let's continue relying on our 6-year-old laptop that makes really weird whirring noises if you try to open an email too quickly, let alone try to build a project. And we'll just comfortably wait for the inevitable laptop crash, and then once we get our new laptop, we have to rebuild our dev environment and try to remember exactly how we had it configured.

Turns out staying in our comfort zone doesn't sound so peachy either.

While there are inherent risks with the cloud, if you choose your cloud hosting service wisely, these risks can be mitigated - we'll talk more about that shortly. With these concerns alleviated, you're left to reap some major benefits of the cloud: scalability, faster performance, and easier maintenance, just to name a few.

Hosting in the cloud gives you access to another machine's resources that can then be spun up quickly and available anywhere. Combine that with the benefits of container-based development, and developers can be up and coding in the blink of an eye.

## Containers in the cloud

Running containers in the cloud is not a new concept; in fact, [one study](https://www.datadoghq.com/container-report/?utm_source=SocialMedia&utm_medium=Twitter&utm_campaign=OrganicPosting-containerreport) shows that at least half of all containers are running in the cloud. The basic infrastructure involves deploying a container to a cloud-hosted virtual machine. We can deploy our dev container to the cloud to provide a cloud-hosted development environment.

VS Code's entry into this space comes from powering [GitHub Codespaces](https://github.com/features/codespaces). Within minutes, you can create and configure a dev container hosted in the cloud that is ready whenever you need it. You can then connect via VS Code (in either the browser or desktop) to a development environment that is managed completely for you, no longer relying on your laptop's resources to handle the demand.

![A diagram showing the infrastructure and workflow of Codespaces](codespaces-diagram.png)

The same dev containers used in the Dev Containers extension can be used in GitHub Codespaces, providing a seamless transition to the cloud.

But remember all of those scary possibilities of the cloud? Well, GitHub Codespaces alleviates those issues by leveraging GitHub's cloud features. Codespaces run on compute options hosted on GitHub.com, and the feature is currently available for developers using [GitHub Team or GitHub Enterprise Cloud](https://docs.github.com/get-started/learning-about-github/githubs-products).

GitHub bills on a per-user basis, so you'll never pay for more than what you're using. You also set a spending limit, getting rid of any surprise expenses. Additionally, GitHub can provide a service level agreement for 99.9% monthly uptime, and [GitHub Advanced Security](https://docs.github.com/get-started/learning-about-github/about-github-advanced-security) is available to ease any security concerns.

With the power of VS Code, GitHub, and dev containers, GitHub Codespaces provides a clear path to moving from local development to the cloud.

## What's next?

As developers, we want to spend more time developing software and less time on headache-inducing configuration. Trends in the industry can, and should, be used to empower developers to increase their productivity. We've explored how containers and the cloud can take us to the next level, and you can [get started with Dev Containers](/docs/devcontainers/containers.md) to see for yourself. Now, what do you think could be the next step in making our lives even easier?

Happy Coding!

Olivia Guzzardo, [@OliviaGuzzardo](https://twitter.com/OliviaGuzzardo)
