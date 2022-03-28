---
Order: 72
TOCTitle: Increase Productivity with Containers
PageTitle: Leveraging Containers to Increase Developer Productivity
MetaDescription: Increase productivity by moving your development environment from local, to containers, to the cloud.
Date: 2022-03-28
Author: Olivia Guzzardo
---

# Leveraging Containers to Increase Developer Productivity

March 28, 2022 by Olivia Guzzardo, [@OliviaGuzzardo](https://twitter.com/OliviaGuzzardo)

One of my favorite things that industry professionals like to ask aspiring developers is, “how many lines of code does the average developer write per day?” Most guess in the hundreds or thousands – they’re always shocked to hear that the actual average figure lies in the tens.

Then what are developers doing with the rest of their time? Sure, some of the remaining time is spent on code design and googling “how to center a div in css”, but an inordinate amount is pure overhead – setting up projects, onboarding other developers, and troubleshooting issues that you can’t seem to repro on your own machine.

The VS Code team has used this as the heart of our research over the years: if we can reduce time spent on overhead, then we can increase productivity time. We have a vision where developers don’t have to keep fighting the same battles over and over again. This means a consistent dev setup that endures never-ending churn of version upgrades, configuration changes, and hardware refreshes.

But what’s the path look like to get us there? Let’s examine the journey to increase developer productivity that has led us from local development, to container-based development, to the cloud.

## Starting out with local development

Let’s begin where all developers start (and where a lot still are): local development. If you’ve uttered the phrase, “But it works on my computer!”, then chances are that you were in the local development phase. This means that everything for your development environment exists locally on your machine.

![A shrug emoji saying "It works on my machine"](it-works-on-my-machine.png)

Let’s paint a picture of what local development looks like in the real world. Bobby is so excited because he just landed his first software engineering job! On day one, he shows up ready to code. Instead, his boss hands him a stack of onboarding notes detailing all the steps that he needs to install to get the code up and running. He ends up spending his first full week doing nothing but running install commands, then being bounced from developer to developer to help troubleshoot his build issues, until he can finally run the project on his laptop.

After a little while on the project, Bobby is delivering features like a champ. Then a security vulnerability test alerts his team that they need to update their .NET Core version. Bobby goes through the effort of upgrading the version on his Windows machine, updating the dependencies in their project, and testing any necessary code changes. He pushes his changes up and everything looks good! Or does it?

As it turns out, a week later his teammate Susie gets back from being out of office and didn’t get the memo about upgrading. When she pulls the latest code, the build fails. After some back and forth figuring out who the heck broke the build while she was gone, she realizes that she still has the outdated version on her machine.

She tries installing the upgraded .NET Core version on her MacBook, but the build is still failing, so Bobby spends hours trying to figure out why on earth it’s not working for Susie – and the seasoned devs are basically back at step one for setting up their environments. And let’s not even get started on how much anxiety they’re going to feel when they need to update the prod environment…

![A meme showing a dog saying "This is fine" while sitting in a room on fire](this-is-fine-meme.png)

Clearly, a problem emerges here when everything exists solely on a developer’s machine. Your machine may differ wildly from your teammate’s, whether that be from installed versions of dependencies, or from running an entirely different OS. This can lead to a never-ending cycle of configuration nightmares. Even if you get everything in sync with your coworkers, you lose any confidence that you won’t run into more issues when you go to deploy your code.

Now wouldn’t it be nice to regain that confidence by knowing that your development environment was the same as everyone else’s environment and the deployment environment? This brings us to our first advancement in streamlining development productivity: container-based development.

## Containers are everywhere

“Containers” has been a big buzzword in the industry for a while now, so let’s dive into what exactly containers are. To understand the essence of containers, it helps to look at the comparison with a shipping container in the physical world.

In a simplistic view, physical shipping containers allow goods to stay as a unit. Everything that needs to go to Company A is in Shipping Container A. Upon arrival, Company A isn’t going to need to reach out to Container B and Container C to acquire their complete package; everything is packaged within Container A. Additionally, a company doesn’t need separate infrastructure to deal with, for example, a container full of furniture vs. a container full of food. No matter the content, they have the tools necessary to pick up that container and bring it to its destination. This provides an efficient, standardized way of shipping products.

Containers first emerged in the virtual world for this exact same benefit: a streamlined way to ship products. They provide a way to ship your software as a unit, including the binaries, dependencies, and configuration files.  This reduces the time spent on configuration overhead, as the container packages everything that the software needs to be run. The container can then be easily deployed from environment to environment. It’s [predicted](https://www.gartner.com/en/newsroom/press-releases/2020-06-25-gartner-forecasts-strong-revenue-growth-for-global-co) that by 2023, more than 75% of global organizations will be running containerized applications in production, up from less than 30% in 2020.

Traditionally, containers come into play when the code is ready to be deployed to production. While this model certainly streamlines the end of the software development lifecycle, it doesn’t do much for developers when they’re actually writing and testing the code. To solve this gap, container-based development emerged.

## Containers for developers

The idea behind container-based development is to introduce containers at the very start of the development process.  Developers can then do all coding and testing in environments that are consistent with both the production environment and other dev environments. Because of this consistency across environments, time spent troubleshooting different code behavior from one environment to another can be virtually eliminated.

This brings us to the concept of a development container: a container that runs a full-featured development environment. A dev container houses its own app and dependencies, such as the required tools, libraries, and runtimes. In the diagram below, you can see that these dependencies exist in the containers and not on the host machine, which means that you can seamlessly switch between tech stacks in no time at all.

![A diagram showing containers with different tech stacks](container-diagram.png)

To provide a way to create and connect to dev containers, VS Code unveiled the [Remote -  Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) in 2019. This extension provides the illusion of local development by leveraging the full power of dev containers, all while never leaving the comfort of VS Code. With over 11 million installs of the extension, it got us thinking: what if you could have a dev container that is hosted in the cloud?

## Moving to the cloud

Let’s be real: everything is moving to the cloud, so why should your development environment be any different? Well, for one, the cloud is vulnerable to attacks. For two, it seems like we’re constantly hearing about major outages. For three, it can be pricey. For four… wait, isn’t the cloud supposed to be a good thing?

With all these reasons to be weary of the cloud, it can be uncomfortable to think about something as important as our development environment being hosted there.  So let’s stay comfortable! Let’s continue relying on our 6-year-old laptop that makes really weird whirring noises if you try to open an email too quickly, let alone try to build a project. And we’ll just comfortably wait for the inevitability of when the laptop crashes, and then once we get our new laptop, we have to rebuild our dev environment and try to remember exactly how we had it configured.

Turns out staying in our comfort zone doesn’t sound so peachy either.

While there are inherent risks with the cloud, it also comes with major benefits: scalability, faster performance, and easier maintenance, just to name a few. Hosting in the cloud gives you access to another machine’s resources that can then be spun up quickly and available anywhere. Combine that with the benefits of container-based development, and developers can be up and coding in the blink of an eye.

## Containers in the cloud

Running containers in the cloud is not a new concept; in fact, [one study](https://www.datadoghq.com/container-report/?utm_source=SocialMedia&utm_medium=Twitter&utm_campaign=OrganicPosting-containerreport) shows that at least half of all containers are running in the cloud. The basic infrastructure involves deploying a container to a cloud-hosted VM. For a development environment hosted in the cloud, the deployed container is the dev container that houses our code and dependencies. Developers can then connect to this VM to harness the power of containers in the cloud.

VS Code’s entry into this space comes from powering [GitHub Codespaces](https://github.com/features/codespaces). Within minutes, you can create and configure a dev container hosted in the cloud that is ready whenever you need it. You can then connect via VS Code (in either the browser or desktop) to a development environment that is managed completely for you, no longer relying on your laptop’s resources to handle the demand.

![A diagram showing the infrastructure and workflow of Codespaces](codespaces-diagram.png)

## What’s next?

As developers, we want to spend more time developing software and less time on headache-inducing configuration. Trends in the industry can, and should, be used to empower developers to increase their productivity. We’ve seen how containers and the cloud can take us to the next level – what do you think could be the next step in making our lives even easier?
