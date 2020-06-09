---
Order: 58
TOCTitle: Go extension
PageTitle: Visual Studio Code Go extension joins the Go project
MetaDescription: Visual Studio Code Go extension joins the Go project
Date: 2020-06-09
Author: Alessandro Segala
MetaSocialImage: /assets/blogs/2020/06/09/go-extension-build-social.png
---
# The next phase of the Go experience

June 9, 2020 by Alessandro Segala, [@ItalyPaleAle](https://twitter.com/ItalyPaleAle)

Since the very beginning, we have worked with developer communities to build Visual Studio Code as a powerful, extensible editor. Five years into this journey, individuals, and organizations in our community have helped us create an editor that is really for all developers, using any language.

For many of our 11 million users, VS Code is their primary code editor, as is the case for 41% of developers that are working with Go (according to the [Go developer survey](https://blog.golang.org/survey2019-results). We are proud of the work that we have done on the [Go extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=golang.Go), which is the result of an extensive development effort together with the Go community by virtue of both code contributions and integration with over a dozen independently maintained tools.

![Go extension](go-extension.png)

Last year, we worked with the Go team to enable support for a new language server for the Go language, [gopls](https://golang.org/s/gopls), and improving support for the [Delve](https://github.com/go-delve/delve/issues/1515) debugger. Using the new language server improves the [experience](https://www.youtube.com/watch?v=EFJfdWzBHwE) of Go developers working with VS Code. It offers an integrated solution for various components of the core developer experience (code completion, jump to definition, hover tooltips, etc.) through a tool that is maintained by the Go project itself and is kept up to date with support for new language features such as Go modules.

## The Go extension for VS Code joins the Go project

Today we are happy to announce that the Go team has officially stepped up as the **new maintainer of the Go extension**. During the last few years working together with the Go team, it is clear they are in the best position to advance the tooling ecosystem for Go and ensure that it evolves alongside the language.

Both the Go and Visual Studio Code teams recognize the importance of Visual Studio Code for Go developers, and we will continue to work together to deliver a great experience for all *Gophers*.

Being part of the Go project will also ensure that we’ll engage with the community every step along the way. The extension currently depends on many different tools that are maintained by the community, and we are committed to work with the owners of those projects to help reduce the burden of maintenance work on the Go community.

In practical terms, as the extension graduates to being part of the Go project, we will be changing the publisher of the extension from “Microsoft” to “Golang” in the VS Code Marketplace.

Additionally, the source code repository for the extension is changing to join the rest of the Go project at [golang/vscode-go](https://github.com/golang/vscode-go).

## Contributing and support

In order to offer the best experience to Go developers, we ask you to continue sharing your feedback with us by opening an [issue](https://github.com/golang/vscode-go/issues) on GitHub. We also welcome every [contribution](https://github.com/golang/vscode-go/blob/master/docs/contributing.md) from the community.

If you need assistance with the Go extension for VS Code, you can connect with our team members on the `#vscode` channel on the [Gophers Slack](https://invite.slack.golangbridge.org). Conversations between Go team members working on the extension will take place in the `#vscode-dev` channel in the same Slack workspace, and we welcome discussion on issues and contributions from community members.

From all of us in the Visual Studio Code and Go teams, we are excited for the future ahead and for the ability to work together to deliver world-class tooling to every developer working with Go, and we look forward continue collaborating with the community.

Happy Coding!

Alessandro Segala, VS Code Product Manager [@ItalyPaleAle](https://twitter.com/ItalyPaleAle)
