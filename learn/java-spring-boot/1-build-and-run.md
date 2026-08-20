---
ContentId: d2c6da4d-350d-4007-8b28-7277114e3e23
DateApproved: 08/18/2026
MetaDescription: Build and run a Spring Boot application in Visual Studio Code with Java extensions, Maven, and the Spring Boot Dashboard.
MetaSocialImage: ../images/shared/agent-first-development-social.png
---

# Build and run your first Spring Boot app in Visual Studio Code

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ZX8LEQpKPx0?si=HUjEWz0XHj_aDysn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

You know that moment when you clone a Java repository, open it, and nothing happens? No
run button, no green ticks, no clue which of the two hundred files is the one that
starts. Just a folder.

That gap is almost never about Java being hard. It is about tooling that has not been
switched on yet.

In this chapter, we'll switch it on. Two extension packs, one build, one run — and the
folder turns into an application you can click around in.

By the end, you will have a Spring Boot web app running on your machine, and you will
know which file does what and how the tooling found it.

No terminal gymnastics required.

## What You Will Learn

Before we install anything, let's set the target. This is not a tour of every Java
feature in the editor. It is the shortest honest path from a cloned folder to a running
web page.

In this chapter, you will learn to:

- **Install the right tooling:** Add the two extension packs that turn Visual Studio Code into a Java and Spring Boot environment, and confirm the surfaces they add.
- **Confirm your JDK:** Check which Java runtime the project resolved to, and know where to get one if it is missing.
- **Read the project structure:** Follow a request from the HTML page down to the repository and back, so no file is a mystery.
- **Build and run from the editor:** Package the project with Maven and start it from the Spring Boot Dashboard, without typing a command.
- **Verify it end to end:** Add, complete, and delete an item in a real browser, then shut the app down cleanly.

Here is the whole chapter on one line, so you always know where you are.

![Chapter 1 journey from a cloned folder to a verified running app](../images/java-spring-boot/ch1-journey.png)

Fig 1: Chapter 1 journey, from an unopened folder to a verified running app.

## Problem Framing: Why the Tooling Comes First

A Java project is not self-describing. The `pom.xml` knows the dependencies, the JDK
knows how to compile, and Spring Boot knows how to start — but none of that is visible
until an extension reads it and puts it on screen.

Install the tooling first and the project explains itself. Skip it, and you end up
reading build files by hand to work out what should have been a button.

### Try this

Compare two ways of starting. In the first, you open a terminal, guess at a Maven
command, and read a wall of log output. In the second, you install two packs, and the
editor tells you the runtime it picked, the goals it can run, and the app it can start.
The second one scales to a team, because the next person sees exactly the same surfaces.

## Prerequisites

A quick readiness check. Most first-run friction here comes from a missing runtime, not
from the framework.

- **A cloned copy of the sample:** Clone [microsoft/github-copilot-java-mcp-demo](https://github.com/microsoft/github-copilot-java-mcp-demo) and open the folder in Visual Studio Code.
- **Visual Studio Code:** Installed and up to date, so extension installation and commands behave as described.
- **A Java Development Kit:** JDK 25. If you do not have one, the first exercise covers where to get it without leaving the editor.
- **No Java extensions yet:** Leave the **Extension Pack for Java** and the **Spring Boot Extension Pack** uninstalled, because this chapter installs them.

Maven does not need to be installed separately. The repository ships the Maven Wrapper,
and the extension pack drives it for you.

> **Expected warnings:** The Maven build prints a Mockito self-attach notice and
> dynamic-agent warnings, and startup prints three `BeanPostProcessorChecker` warnings
> about the MCP annotation scanner. All of them are normal. Wait for **`BUILD SUCCESS`**
> and the started message instead of reacting to them.

## What Is the Extension Pack for Java?

The **Extension Pack for Java** is a Microsoft-published bundle that gives Visual Studio
Code full Java support in one install. Instead of picking extensions one at a time and
hoping they agree with each other, you get one pack that covers the whole loop.

- **Language support:** Completion, navigation, refactoring, and diagnostics from the Java language server.
- **Debugging:** Breakpoints, stepping, and variable inspection for any Java process the editor launches.
- **Maven:** A **Maven** view in the Explorer that reads `pom.xml` and exposes the build lifecycle.
- **Project management:** A **Java Projects** view that shows sources, dependencies, and the resolved JDK.
- **Testing:** Test discovery and a run surface in the Testing view.

The **Spring Boot Extension Pack** sits on top of that and adds Spring awareness:
**Spring Boot Tools** for Spring-aware editing of configuration and mapping code, and
the **Spring Boot Dashboard** for running, stopping, and inspecting the application.

![Extensions view with the Extension Pack for Java and the Spring Boot Extension Pack](../images/java-spring-boot/ch1-extensions-java-pack.png)

Fig 2: Searching the Extensions view surfaces both packs used in this chapter.

## Exercise - install the tooling

Let's get both packs installed and confirm they are working before touching any code.

1. Select the **Extensions** button in the Activity Bar, search for **`Extension Pack for Java`**, open the result, and select **Install**.
2. Wait for the **Opening Java Projects** notification to appear and finish. The pack finds the project's `pom.xml` and starts importing on its own.
3. Confirm the import worked: the Status Bar reads **Java: Ready**, and the Explorer has gained **Java Projects** and **Maven** views.
4. Select **View → Command Palette**, search for **`Java: Configure Java Runtime`**, and run it. On the **Project Settings** page, stay on **Classpath → JDK Runtime** and find **JDK: JavaSE-25** with its install path below.
5. If you do not have a JDK yet, **Download a new JDK...** on that tab fetches one without leaving the editor. Otherwise close the tab without selecting **Apply Settings**.
6. Return to the **Extensions** view, search for **`Spring Boot Extension Pack`**, and install it too. A new **Spring Boot Dashboard** icon appears in the Activity Bar.

That is the entire setup. Everything from here on is the project itself.

## Reading the Project: What the Tooling Just Imported

Now that the editor understands the project, the files are worth a look. The order below
follows a single request through the app, which is a far better map than alphabetical
order.

### The build file

`pom.xml` is Maven's project definition, and it is the file the Java extension read
first. The `spring-boot-starter-parent` sets the framework version, the coordinates name
the project `springboot-mcp-demo`, and the `java.version` property is `25` — matching the
JDK you just confirmed.

Below that sit four starter dependencies, and between them they decide what the app can
do:

- **Actuator:** Adds health and monitoring endpoints. Chapter 2 uses these.
- **WebMVC:** Spring Boot 4's name for the Spring Web starter. It brings the embedded web server and request handling.
- **Thymeleaf:** Renders HTML pages on the server.
- **Spring AI MCP server starter:** Publishes the app's operations over the Model Context Protocol. Chapter 3 uses this.

### The source layout

In the Explorer, expand **src → main**, then the compacted `java\com\example\tododemo`
row, then **resources → templates**. Under the base package the code splits into small
folders — `model`, `repository`, `service`, `web` — plus an `mcp` folder that Chapter 3
covers, and a `templates` folder holding the HTML page.

### The classes, in request order

| File | What it does |
| ------ | -------------- |
| `SpringbootMcpDemoApplication.java` | One `@SpringBootApplication` annotation and a `main` method. Spring scans this package and everything below it, starts the embedded server, creates one instance of each annotated class, and wires them together. |
| `model/Todo.java` | The data: an id, a title, a completed flag, and a creation timestamp. |
| `repository/TodoRepository.java` | Marked `@Repository`. Keeps todos in a concurrent map rather than a database, and its `save` method is what hands out the next id. |
| `service/TodoService.java` | Marked `@Service`. Spring passes the repository into its constructor — that is dependency injection in practice. Its `add` method validates and trims the title, creates a `Todo` with no id yet, and saves it. |
| `templates/index.html` | Plain HTML. The add form posts to `/todos` with a single `title` field, and a Thymeleaf loop below it renders one row per todo. |
| `web/TodoController.java` | `@GetMapping("/")` asks the service for every todo and renders the template. `@PostMapping("/todos")` passes `title` straight to `service.add`, then returns `redirect:/`, which re-renders the list with the new item. |

Browser, controller, service, repository, and back. That is the full round trip, and it
is the same path Chapter 2 traces with a debugger.

## Exercise - build and run

With the code understood, let's prove it works.

1. In the Explorer, scroll to the **Maven** section below the file tree and expand it. Expand **springboot-mcp-demo → Lifecycle**, hover over **package**, and select its **Run** button.
2. Wait for **`BUILD SUCCESS`** in the **Maven-springboot-mcp-demo** terminal that opens. The `package` goal compiles the code, runs the tests, and produces the runnable JAR, so it proves the whole project is sound rather than just that it compiles.
3. Select the **Spring Boot Dashboard** icon in the Activity Bar, find **springboot-mcp-demo**, and select its **Run** action. Startup takes a few seconds.
4. Check the running state and port in the Dashboard, then select **Open In Browser** to open <http://localhost:8080>.
5. In the page, enter **`Prepare the demo`** and select **Add**. Select that row's checkbox, then select its **Delete** button.
6. Return to the Dashboard and select the app's **Stop** action.

![Spring Boot Dashboard showing springboot-mcp-demo running on port 8080](../images/java-spring-boot/ch1-dashboard-running.png)

Fig 3: The Dashboard reports the app as running, alongside the port it bound to.

Each of those three browser actions is a full server round trip: **Add** posts to
`/todos` and redirects, the checkbox posts to the toggle endpoint, and **Delete** drops
the item from the map. The page re-renders every time, which is why the list is always in
step with the server.

![The Todo web app running at localhost:8080](../images/java-spring-boot/ch1-web-app.png)

Fig 4: The running app — `TodoController` rendered this page from `index.html`. This is the moment just after **Add** in step 5, before the row is completed and deleted.

Because this app keeps its todos in memory, stopping the process clears them. That is
intentional for a sample, and it means every chapter starts from a clean list.

## Quick Question

The Spring Boot Dashboard can start the application on its own. So why does this chapter
run a Maven `package` build first, and why start the app from the Dashboard rather than
from a terminal?

## Answer

Those are two separate answers. `package` is the honest build check: it compiles, runs
the tests, and produces the artifact, so a green result means the project is sound and
not merely syntactically valid — a `Run` that starts is a much weaker signal. The
Dashboard matters for a different reason: it launches the process through Visual Studio
Code, which is what lets the editor attach a debugger and populate live views such as
**Properties** and **Memory**. An app started from a plain terminal runs perfectly well
but stays invisible to those views, and that difference shows up as soon as you want to
inspect a running request.

## What's Next

You now have a working Java and Spring Boot setup, a project you can navigate, and an
application you can start and stop from the editor. That is the foundation every later
chapter assumes.

In [Chapter 2, Debug and Inspect a Spring Boot Request](/learn/java-spring-boot/2-debug-and-inspect), we'll
stop trusting the browser and start inspecting the process. You'll set a breakpoint on the
exact line where the web layer hands off to the service, step through the call, and watch
the repository assign an id — then check the app's health and memory while it is still
running.

## Learn more

- [Java in Visual Studio Code](https://code.visualstudio.com/docs/languages/java) — the product-level guide to the surfaces used here.
- [Extension Pack for Java on the Marketplace](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) — what the pack installs and why.
- [Spring Boot reference documentation](https://docs.spring.io/spring-boot/) — starters, auto-configuration, and the application lifecycle.
- [Maven build lifecycle](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html) — what `package` actually runs.
- [Demo source on GitHub](https://github.com/microsoft/github-copilot-java-mcp-demo) — the sample used in every chapter.

---

Chapter 1 of 4 · Next: [Debug and Inspect a Spring Boot Request](/learn/java-spring-boot/2-debug-and-inspect)
