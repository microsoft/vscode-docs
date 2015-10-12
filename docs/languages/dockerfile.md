---
Order: 9
Area: languages
TOCTitle: DockerFile
PageTitle: Working with DockerFiles in Visual Studio Code
DateApproved: 10/12/2015
MetaDescription: Find out how to get the best out of Visual Studio Code and Docker.
---

# Working with Docker

[Docker](http://www.docker.com) is a very popular container platform that lets you easily package, deploy, and consume applications and services. Whether you are a seasoned Docker developer or just getting started, Visual Studio Code makes it easy to author `Dockerfile` and `docker-compose.yml` files in your workspace.

## Dockerfiles

With Docker you can build images by specifying the step by step commands needed to build the image in a `Dockerfile`. A Dockerfile is simply a text file that contains the build instructions.

VS Code understands the structure of Dockerfiles as well as the available set of instructions, meaning we can give you a great experience when authoring these files in the tool.

1. Create a new file in your workspace named `Dockerfile`
2. Press `kb(editor.action.triggerSuggest)` to bring up a list of snippets corresponding to valid `Dockerfile` commands

 ![Dockerfile IntelliSense](images/docker/dockerfileintellisense.png)

3. Press `Tab` to move between fields within the snippet. For example, with the `COPY` snippet you can fill in the `source` and then press `tab` to move to the `dest` field.

 ![Dockerfile IntelliSense](images/docker/dockerfiletemplate.png)

In addition to snippets for authoring your `Dockerfile`, Visual Studio Code will provide you with a description of any Docker command you hover over with the mouse. For example, when hovering over `WORKDIR` you will see the following.

![Dockerfile IntelliSense](images/docker/dockerfiletooltip.png)

For more information on Dockerfiles, check out [Dockerfile best practices](
https://docs.docker.com/articles/dockerfile_best-practices/) on [docker.com](http://docker.com).

## Docker Compose

[Docker Compose](https://docs.docker.com/compose/) lets you define and run multi-container applications with Docker. You define what the shape of these containers look like with a file called `docker-compose.yml`.

Visual Studio Code's experience for authoring `docker-compose.yml` is also very rich, providing IntelliSense for valid Docker compose directives and it will query Docker Hub for metadata on public Docker images.

1. Create a new file in your workspace called `docker-compose.yml`
2. Define a new service called `web:`
3. On the second line, bring up IntelliSense by pressing `kb(editor.action.triggerSuggest)` to see a list of all valid compose directives.

 ![Dockerfile IntelliSense](images/docker/dockercomposeintellisense.png)

4. For the `image` directive you can press `kb(editor.action.triggerSuggest)` again and VS Code will query the Docker Hub index for public images.

 ![Dockerfile IntelliSense](images/docker/dockercomposeimageintellisense.png)

VS Code will first show a list of popular images along with metadata such as the number of stars and description. If you continue typing VS Code will query the Docker Hub index for matching images, including searching public profiles. For example, searching for `Microsoft` will show you all the public Microsoft images.

 ![Dockerfile IntelliSense](images/docker/dockercomposesearch.png)
