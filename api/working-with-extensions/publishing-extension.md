---
# DO NOT TOUCH — Managed by doc writer
ContentId: 7EA90618-43A3-4873-A9B5-61CC131CE4EE
DateApproved: 9/2/2021

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to publish Visual Studio Code extensions to the public Marketplace and share them with other developers.
---

# Publishing Extensions

Once you have made a high-quality extension, you can publish it to the [VS Code Extension Marketplace](https://marketplace.visualstudio.com/vscode) so others can find, download, and use your extension. Alternatively, you can [package](#packaging-extensions) an extension into the installable VSIX format and share it with other users.

This topic covers:

- Using [vsce](#vsce), the CLI tool for managing VS Code extensions
- [Packaging](#packaging-extensions), [publishing](#publishing-extensions) and [unpublishing](#unpublishing-extensions) extensions
- [Registering a `publisherId`](#create-a-publisher) necessary for publishing extensions

## vsce

[vsce](https://github.com/microsoft/vsce), short for "Visual Studio Code Extensions", is a command-line tool for packaging, publishing and managing VS Code extensions.

### Installation

Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

```bash
npm install -g vsce
```

### Usage

You can use `vsce` to easily [package](#packaging-extensions) and [publish](#publishing-extensions) your extensions:

```bash
$ cd myExtension
$ vsce package
# myExtension.vsix generated
$ vsce publish
# <publisherID>.myExtension published to VS Code Marketplace
```

`vsce` can also search, retrieve metadata, and unpublish extensions. For a reference on all the available `vsce` commands, run `vsce --help`.

## Publishing extensions

---

**Note:** Due to security concerns, `vsce` will not publish extensions that contain user-provided SVG images.

The publishing tool checks the following constraints:

- The icon provided in `package.json` may not be an SVG.
- The badges provided in the `package.json` may not be SVGs unless they are from [trusted badge providers](/api/references/extension-manifest#approved-badges).
- Image URLs in `README.md` and `CHANGELOG.md` need to resolve to `https` URLs.
- Images in `README.md` and `CHANGELOG.md` may not be SVGs unless they are from [trusted badge providers](/api/references/extension-manifest#approved-badges).

---

Visual Studio Code uses [Azure DevOps](https://azure.microsoft.com/services/devops/) for its Marketplace services. This means that authentication, hosting, and management of extensions are provided through Azure DevOps.

`vsce` can only publish extensions using [Personal Access Tokens](https://docs.microsoft.com/azure/devops/integrate/get-started/authentication/pats). You need to create at least one in order to publish an extension.

### Get a Personal Access Token

First off, follow the documentation to [create your own organization](https://docs.microsoft.com/azure/devops/organizations/accounts/create-organization) in Azure DevOps. In the following examples, the organization's name is `vscode`, you should use your new organization name as appropriate. Note that the organization's name doesn't necessarily have to be same as your publisher name.

From your organization's home page (for example: `https://dev.azure.com/vscode`), open the User settings dropdown menu next to your profile image and select **Personal access tokens**:

![Personal settings menu](images/publishing-extension/token1.png)

On the **Personal Access Tokens** page, select **New Token** to create a new Personal Access Token and set the following details:

- Give it a Name
- Set Organization to **All accessible organizations**
- Optionally extend its expiration date
- Set Scopes to **Custom defined** and choose the **Marketplace > Manage** scope

![Create personal access token](images/publishing-extension/token2.png)

Select **Create** and you'll be presented with your newly created Personal Access Token. **Copy** it, you'll need it to create a publisher.

### Create a publisher

A **publisher** is an identity who can publish extensions to the Visual Studio Code Marketplace. Every extension needs to include a `publisher` name in its [`package.json` file](/api/references/extension-manifest).

You can create a new publisher through the Visual Studio Marketplace publisher [management page](https://marketplace.visualstudio.com/manage). You need to login in with the same Microsoft account you used to create the [Personal Access Token](/api/working-with-extensions/publishing-extension#get-a-personal-access-token) in the previous section.

Test your publisher's personal access token using [`vsce`](#vsce), while at the same time storing it for later usage:

```bash
vsce login <publisher name>
```

### Publish an extension

You can publish an extension using [`vsce`](#vsce) with the `publish` command:

```bash
vsce publish
```

This command will ask for the personal access token, if you haven't already provided it with the `vsce login` command above.

Alternatively, you can [package the extension](#packaging-extensions) (`vsce package`) and manually upload it to the [Visual Studio Marketplace publisher management page](https://marketplace.visualstudio.com/manage).

![Add an extension through management page](images/publishing-extension/add-extension.png)

## Review extension installs and ratings

The same [Visual Studio Marketplace publisher management page](https://marketplace.visualstudio.com/manage) gives you access to each extension's  Acquisition Trend over time, as well as Total Acquisition counts and Ratings & Reviews. Right-click an extension and choose **Reports**.

![Marketplace extension report](images/publishing-extension/extension-report.png)

## Auto-incrementing the extension version

You can auto-increment an extension's version number when you publish by specifying the [SemVer](https://semver.org/) compatible number to increment: `major`, `minor`, or `patch`.

For example, if you want to update an extension's version from 1.0.0 to 1.1.0, you would specify `minor`:

```bash
vsce publish minor
```

This will modify the extension's `package.json` [version](/api/references/extension-manifest#fields) attribute before publishing the extension.

You can also specify a complete SemVer compatible version on the command line:

```bash
vsce publish 2.0.1
```

> **Note:** If `vsce publish` is run in a git repo, it will also create a version commit and tag via [npm-version](https://docs.npmjs.com/cli/version#description).  The default commit message will be extension's version, but you can supply a custom commit message using the `-m` flag.  (The current version can be referenced from
the commit message with `%s`.)

## Unpublishing extensions

You can unpublish an extension with the vsce tool by specifying the extension ID `publisher.extension`.

```bash
vsce unpublish (publisher name).(extension name)
```

> **Note:** When you unpublish an extension, the Marketplace will remove any extension statistics it has collected. You may want to update your extension rather than unpublish it.

## Packaging extensions

If you want to test an extension on your local install of VS Code or distribute an extension without publishing it to VS Code Marketplace, you can choose to package your extension. `vsce` can package your extension into a `VSIX` file, from which users can easily install. Some extensions publish VSIX files to each GitHub release.

For extension authors, they can run `vsce package` in extension root folder to create such VSIX files.

For users who receive such a VSIX file, they can install the extension with `code --install-extension my-extension-0.0.1.vsix`.

### Sharing privately with others

If you want to share your extension with others privately, you can send them your packaged extension `.vsix` file.

## Your extension folder

To load an extension, you need to copy the files to your VS Code extensions folder `.vscode/extensions`. Depending on your platform, it is located in the following folders:

- **Windows** `%USERPROFILE%\.vscode\extensions`
- **macOS** `~/.vscode/extensions`
- **Linux** `~/.vscode/extensions`

## Visual Studio Code compatibility

When authoring an extension, you will need to describe what is the extension's compatibility to Visual Studio Code itself. This can be done via the `engines.vscode` field inside `package.json`:

```json
{
  "engines": {
    "vscode": "^1.8.0"
  }
}
```

A value of `1.8.0` means that your extension is compatible only with VS Code `1.8.0`. A value of `^1.8.0` means that your extension is compatible with VS Code `1.8.0` and onwards, including `1.8.1`, `1.9.0`, etc.

You can use the `engines.vscode` field to make sure the extension only gets installed for clients that contain the API you depend on. This mechanism plays well with the Stable release as well as the Insiders one.

For example, imagine that the latest Stable version of VS Code is `1.8.0` and that during `1.9.0`'s development a new API is introduced and thus made available in the Insider release through version `1.9.0-insider`. If you want to publish an extension version that benefits from this API, you should indicate a version dependency of `^1.9.0`. Your new extension version will be installed only on VS Code `>=1.9.0`, which means all current Insider customers will get it, while the Stable ones will only get the update when Stable reaches `1.9.0`.

## Advanced usage

### Marketplace integration

You can customize how your extension looks in the Visual Studio Marketplace. See the [Go extension](https://marketplace.visualstudio.com/items/golang.go) for an example.

Here are some tips for making your extension look great on the Marketplace:

- A `README.md` file at the root of your extension will be used to populate the extension's Marketplace page's contents. `vsce` will modify README links for you in two different ways:
  - If you add a `repository` field to your `package.json` and it is a public GitHub repository, `vsce` will automatically detect it and adjust relative links accordingly, using the `master` branch by default. You can override the GitHub branch with the `--githubBranch` flag when running `vsce package` or `vsce publish`.
  - For more fine-grained control, you can set the `--baseContentUrl` and `--baseImagesUrl` flags to set the base URLs for relative links.
- A `LICENSE` file at the root of your extension will be used as the contents for the extension's license.
- A `CHANGELOG.md` file at the root of your extension will be used as the contents for the extension's change log.
- You can set the banner background color by setting `galleryBanner.color` to the intended hex value in `package.json`.
- You can set an icon by setting `icon` to a relative path to a squared `128px` PNG file included in your extension, in `package.json`.

Also see [Marketplace Presentation Tips](/api/references/extension-manifest#marketplace-presentation-tips).

### `.vscodeignore`

You can create a `.vscodeignore` file to exclude some files from being included in your extension's package. This file is a collection of [glob](https://github.com/isaacs/minimatch) patterns, one per line.

For example:

```bash
**/*.ts
**/tsconfig.json
!file.ts
```

You should ignore all files not needed at runtime. For example, if your extension is written in TypeScript, you should ignore all `**/*.ts` files, like in the previous example.

**Note:** Development dependencies listed in `devDependencies` will be automatically ignored, you don't need to add them to the `.vscodeignore` file.

### Pre-publish step

It's possible to add a pre-publish step to your manifest file. The command will be called every time the extension is packaged.

```json
{
  "name": "uuid",
  "version": "0.0.1",
  "publisher": "someone",
  "engines": {
    "vscode": "0.10.x"
  },
  "scripts": {
    "vscode:prepublish": "tsc"
  }
}
```

This will always invoke the [TypeScript](https://www.typescriptlang.org/) compiler whenever the extension is packaged.

### Platform-specific extensions

Extensions can publish different packages for each platform (Windows, Linux, macOS) VS Code is running on. This is useful if your extension has platform-specific libraries, so you can control the exact binaries that are included in a platform package.

The currently supported platforms are:

- `win32-x64` - Windows 64-bit
- `win32-ia32` - Windows 32-bit
- `win32-arm64` - Windows ARM64
- `linux-x64` - Linux 64-bit
- `linux-arm64` - Linux ARM64
- `linux-armhf` - Linux ARMhf
- `alpine-x64` - Linux Alpine
- `darwin-x64` - macOS 64-bit
- `darwin-arm64` - macOS ARM64
- `web` - VS Code for the web

If an extension decides to publish a package for at least one of these platforms, we call it a **platform-specific extension**.

When installing a platform-specific extension, VS Code looks for the extension package that matches the current platform. If no package has been published for the platform, the extension will appear as disabled and can not be installed. Therefore, you need to publish a package for each and every platform that your extension supports. To meet this requirement, we are providing tooling to help make this potentially repetitive process easier.

**Publishing**

Starting from version `1.96.3`, [vsce](https://github.com/microsoft/vscode-vsce) supports a `--target` parameter that allows you to specify target platforms while publishing.

For example, if your platform-specific extension has a `Windows` specific package but has the same package for all the other platforms, you would run the following commands when publishing:

```bash
vsce publish --packagePath PATH_TO_WINDOWS_SPECIFIC_VSIX --target "win32-x64 win32-ia32 win32-arm64"
vsce publish --packagePath PATH_TO_GENERIC_VSIX --target "linux-x64 linux-arm64 linux-armhf alpine-x64 darwin-x64 darwin-arm64 web"
```

If your extension does not work on a particular platform, you would simply omit it from the list of targets.

Since this process is manual and potentially error-prone, we recommend using the [platform-specific extension sample](https://github.com/microsoft/vscode-platform-specific-sample) as a starting point for automating this. Same as in the [workflow example](https://github.com/microsoft/vscode-platform-specific-sample/blob/main/.github/workflows/ci.yml), your extension can use [GitHub Actions](https://github.com/features/actions) to automate the process of platform-specific publishing.

If you want a platform-specific extension to also support running in the browser as a [web extension](/api/extension-guides/web-extensions), it **must** target the `web` platform when publishing. For example, a platform-specific extension could publish its `web` version with a limited set of functionality that does not depend on the Node.js runtime.

## Next steps

- [Extension Marketplace](/docs/editor/extension-marketplace) - Learn more about VS Code's public Extension Marketplace.
- [Testing Extensions](/api/working-with-extensions/testing-extension) - Add tests to your extension project to ensure high quality.
- [Bundling Extensions](/api/working-with-extensions/bundling-extension) - Improve load times by bundling your extension files with webpack.

## Common questions

### I get 403 Forbidden (or 401 Unauthorized) error when I try to publish my extension?

One easy mistake to make when creating the PAT (Personal Access Token) is to not select **All accessible organizations** in the **Organizations** field dropdown (instead selecting a specific organization). You should also set the Authorized Scopes to `Marketplace (Manage)` for the publish to work.

### I can't unpublish my extension through the `vsce` tool?

You may have changed your extension ID or publisher name. You can also manage your extensions directly on the Marketplace by going to the [manage page](https://marketplace.visualstudio.com/manage). You can update or unpublish your extension from your publisher manage page.

### Why does vsce not preserve file attributes?

Note that when building and publishing your extension from Windows, all the files included in the extension package will lack POSIX file attributes, namely the executable bit. Some `node_modules` dependencies rely on those attributes to properly function. Publishing from Linux and macOS works as expected.

### Can I publish from a continuous integration (CI) build?

Yes, see the [Automated publishing](/api/working-with-extensions/continuous-integration#automated-publishing) section of the [Continuous Integration](/api/working-with-extensions/continuous-integration) topic to learn how to configure Azure DevOps, GitHub Actions, and Travis CI to automatically publish your extension to the Marketplace.
