---
Order: 54
TOCTitle: Custom Data Format
PageTitle: "Custom Data Format: Evolving HTML and CSS language features"
MetaDescription: "Custom Data Format: Evolving HTML and CSS language features"
Date: 2020-02-24
Author: Pine Wu
MetaSocialImage:
---

# Custom Data Format: Evolving HTML and CSS language features

February 24, 2020 by Pine Wu, [@octref](https://github.com/octref)

The web evolves and so do its languages. New entities continue to land in HTML and CSS specifications. [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) and [Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini) allow users to extend HTML and CSS semantics. Many developers today use programming languages that embed HTML and CSS. Although HTML and CSS see increasingly flexible usage, editor support for new features often lags behind.

To modernize the HTML and CSS language support in Visual Studio Code, we designed the [Custom Data Format](https://github.com/microsoft/vscode-custom-data), a declarative JSON format for describing HTML and CSS entities. VS Code's HTML and CSS language servers can read data defined in this format and provide language support for the newly defined HTML and CSS entities.

In this blog post, we explain the data format and how users and extension authors can take advantage of it.

## Using Custom Data Format

VS Code provides information about HTML/CSS entities in auto-completion and hovers information:

![HTML and CSS Language Features](html-css-language-features.png)

With the Custom Data Format, users can easily define new HTML/CSS entities and get auto-completions, hover information, and other language features.

To get started, users can write a JSON file `html.html-data.json`:

```json
{
  "version": 1.1,
  "tags": [
    {
      "name": "my-button",
      "description": "My button. You should use it as in `<my-button type='alert'></mybutton>`.",
      "references": [
        {
          "name": "Bootstrap buttons",
          "url": "https://getbootstrap.com/docs/4.0/components/buttons/"
        }
      ]
    }
  ]
}
```

Then define a `html.customData` value in your user or workspace [settings](/docs/getstarted/settings.md) pointing to that data file:

```json
{
  "html.customData": ["./html.html-data.json"]
}
```

You then get language features for the defined entities:

![Custom Data helloworld](custom-data-helloworld.png)

You can try this feature by opening the preconfigured [Custom Data hello world sample](https://github.com/microsoft/vscode-custom-data/tree/main/samples/helloworld) with VS Code. You can edit the HTML/CSS custom data files in order to add, remove, or refine the definitions of custom entities and fine-tune the language features.

The `html.customData` and `css.customData` settings serve as a good starting point for using Custom Data. However, there are other ways to take advantage of Custom Data as well. In the following sections, we describe how extension authors can share curated sets of Custom Data or leverage Custom Data to build language support.

## Sharing Custom Data through extensions

Today, many web frameworks are built on top of HTML. For example, the [Mavo](https://mavo.io) project extends HTML syntax with various `mv-` attributes. Custom Data makes it easy to support such web frameworks:

- Generate [Custom Data for all Mavo attributes](https://github.com/octref/vscode-mavo/blob/master/data/mavo.json).
- Point to the Custom Data file in the `contributes.html.customData` extension [Contribution Point](https://code.visualstudio.com/api/references/contribution-points).
- Publish the [extension](https://marketplace.visualstudio.com/items?itemName=octref.vscode-mavo) to help others use the Mavo framework in VS Code.

By downloading the [Mavo extension](https://marketplace.visualstudio.com/items?itemName=octref.vscode-mavo), users get auto-completion and hover information for all Mavo attributes in HTML files:

![Mavo demo](mavo-demo.gif)

The extension's source code is at the [vscode-mavo](https://github.com/octref/vscode-mavo) repository. We hope the project serves as a starting point for implementing web framework or language support in VS Code. You can find more information about the `contributes.html.customData` and `contributes.css.customData` Contribution Points at [vscode-custom-data](https://github.com/microsoft/vscode-custom-data).

## Using Custom Data for language servers

The [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice) and [vscode-css-languageservice](https://github.com/microsoft/vscode-css-languageservice) libraries allow extension authors to easily implement language servers for languages that extend or embed HTML and CSS. Recently, we added an API for loading custom data:

```ts
import { getLanguageService } from 'vscode-html-languageservice'

getLanguageService({
  customDataProviders: [...]
})
```

Our built-in [HTML language server](https://github.com/microsoft/vscode/tree/main/extensions/html-language-features) utilizes this API to load a curated set of Custom Data that we have collected from various sources:

- W3C specifications of HTML, CSS, and WAI-ARIA
- Mozilla Developer Network
- Mozilla's [mdn-data](https://github.com/mdn/data) and [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data) packages
- Chrome's ranking of CSS properties usage

We have published this set of data to [NPM](https://www.npmjs.com/package/vscode-web-custom-data). You can find the data [on GitHub](https://github.com/microsoft/vscode-custom-data/tree/main/web-data) as well. Language server authors might use this dataset in combination with our HTML/CSS language services to implement support for their languages that extend or embed HTML/CSS, or they could use this data to implement support for languages that transpile to HTML/CSS, such as Pug or Stylus. Finally, we will continue to curate this dataset to provide up-to-date language support for HTML/CSS in VS Code.

## Summary

The VS Code team is committed to providing a good editing experience for web languages. Through the Custom Data Format, we stay close to the latest HTML and CSS language features and offer a simple interface for users and extension authors to customize their HTML and CSS editing experience.

![Simple interface](simple-interface.png)

You can read more about the Custom Data Format in the [vscode-custom-data](https://github.com/microsoft/vscode-custom-data) repository, where you can open issues and feature requests.

Happy Coding!

Pine Wu, VS Code Team member [@octref](https://github.com/octref)
