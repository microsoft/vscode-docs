<p align="center">
  <img alt="vscode logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Visual_Studio_Code_1.18_icon.svg/1200px-Visual_Studio_Code_1.18_icon.svg.png" width="100px" />
  <h1 align="center">Visual Studio Code Documentation</h1>
</p>

You've found the Visual Studio Code documentation GitHub repository, which contains the content for the [Visual Studio Code documentation](https://code.visualstudio.com/docs).

Topics submitted here will be published to the [Visual Studio Code](https://code.visualstudio.com) portal.

If you are looking for the VS Code product GitHub repository, you can find it [here](https://github.com/Microsoft/vscode).

## Index
1. [About Visual Studio Code](#visual-studio-code)
2. [Contributing to the documentation](#contributing-to-the-documentation)
3. [Feedback](#feedback)
4. [Documentation Issues](#documentation-issues)
5. [Editing](#editing)
6. [Publishing](#publishing)

## Visual Studio Code

[VS Code](https://code.visualstudio.com/) is a lightweight source code editor and powerful development environment for building and debugging modern web and cloud applications. It is free and available on your favorite platform - Linux, macOS, and Windows.

If you landed here looking for other information about VS Code, head over to [our website](https://code.visualstudio.com) for additional information.

## Contributing to the documentation

To contribute with new topics / information or make changes to existing documentation, see [Contributing](./CONTRIBUTING.md#contributing) for instructions and guidelines.

## Cloning

For small fixes, you can use the Edit button on each page to directly edit the Markdown file on GitHub. If you plan to clone the repo to make significant changes, read along.

We have adopted [Git LFS](https://git-lfs.github.com/) to store the images in this repo. Bare `git clone` will take 1.4GB+, and we recommend the following setup:

- Install [Git LFS](https://git-lfs.github.com/).
- Run `git lfs install`. You only need to run this once.
- `GIT_LFS_SKIP_SMUDGE=1 git clone git@github.com:Microsoft/vscode-docs.git`. This only downloads text files that amount to ~16MB.
- `git lfs pull -I <PATTERN>`, where `<PATTERN>` is a string of comma-separated globs. For example:
    - `git lfs pull -I "docs/nodejs"`: Only download images in `docs/nodejs`.
    - `git lfs pull -I "release-notes/images/1_3*/*"`: Only download images in latest release notes.
    - `git lfs pull`: Download all images in this repo.

The history of this repo before we adopt LFS can be found at [microsoft/vscode-docs-archive](https://github.com/Microsoft/vscode-docs-archive).

## Feedback

If you want to give documentation feedback, please use the feedback control located at the bottom of each documentation page.

## Documentation Issues

To enter documentation bugs, please create a [new GitHub issue](https://github.com/Microsoft/vscode-docs/issues) (try to check if there isn't a topic about your issue already).

If you think the issue is with the VS Code product itself, please enter issues [here](https://github.com/Microsoft/vscode/issues).

## Editing

In order to edit the VS Code documentation, ensure that you have [Git](https://git-scm.com/downloads) installed.

Clone a copy of the repo:

```
git clone https://github.com/Microsoft/vscode-docs.git
```

VS Code itself is great for reviewing and editing [Markdown](https://code.visualstudio.com/docs/languages/markdown) with nice preview support.

If you want to use VS Code, simply navigate to the `vscode-docs` directory and launch VS Code from there:

```
cd vscode-docs
code .
```

You can open any of the Markdown files and see a preview with the **Open Preview to the Side** button in the upper right of the editor.

![Markdown Preview Button](images/MDPreviewButton.png)

## Publishing

Steps for how to publish documentation changes can be found [here](https://github.com/Microsoft/vscode-website#publishing-a-documentation-change) in the (private) repository of the VS Code website.
