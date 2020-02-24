---
Order: 53
TOCTitle: Custom Data Format
PageTitle: "Custom Data Format: Evolving HTML and CSS Language Features"
MetaDescription: "Custom Data Format: Evolving HTML and CSS Language Features"
Date: 2020-01-08
Author: Pine Wu
MetaSocialImage:
---

# Custom Data Format: Evolving HTML and CSS Language Features

January 8, 2020 by Pine Wu, [@octref](https://github.com/octref)

The web evolves, so do its languages. New entities land in HTML and CSS. [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) and [Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini) allow users to extend HTML and CSS semantics. Many developers today develop on languages that embed HTML and CSS. Although HTML and CSS see increasingly flexible usage, editor support for them lags behind.

To modernize the HTML and CSS language support in Visual Studio Code, we designed the [Custom Data Format](https://github.com/microsoft/vscode-custom-data), a declarative JSON format for describing HTML and CSS entities. VS Code's HTML and CSS language servers can read data defined in this format and provide language support for the newly defined HTML and CSS entities.

In this blog post, we explain the data format and how users and extension authors can take advantage of it.

## Using Custom Data Format

VS Code provides information about HTML/CSS entities in auto completion and hover information:

![HTML and CSS Language Features](html-css-language-features.png)

With the Custom Data Format, users can easily define new HTML/CSS entities and get auto completion, hover information and other language features.

To get started, write a JSON file `html.html-data.json`:

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

Then as you point `html.customData` to that data file:

```json
{
  "html.customData": ["./html.html-data.json"]
}
```

You would get language features for the defined entities:

![Custom Data helloworld](custom-data-helloworld.png)

You can try this feature by opening the preconfigured [helloworld sample](https://github.com/microsoft/vscode-custom-data/tree/master/samples/helloworld) with VS Code. By editing the HTML/CSS custom data files, you can add, remove or refine definition of custom entities and fine-tune the language features.

The `html.customData` and `css.customData` settings serve as a good starting point for using Custom Data. However, there are other ways to take advantage of Custom Data as well. In the following sections, we describe how extension authors can share curated set of Custom Data or leverage Custom Data to build language support.

## Sharing Custom Data through extensions

Today, many web frameworks build on top of HTML. For example, the [MAVO](https://mavo.io) project extends HTML syntax with various `mv-` attributes. Custom Data makes it easy to support such web frameworks:

- Generate [Custom Data for all MAVO attributes](https://github.com/octref/vscode-mavo/blob/master/data/mavo.json)
- Point to the Custom Data file in an [Contribution Point](https://code.visualstudio.com/api/references/contribution-points), `contributes.html.customData`
- Publish the [extension](https://marketplace.visualstudio.com/items?itemName=octref.vscode-mavo) to help others use MAVO framework in VS Code

By downloading the [MAVO extension](https://marketplace.visualstudio.com/items?itemName=octref.vscode-mavo), users get auto-completion and hover information for all MAVO attributes in HTML files:

![MAVO demo](mavo-demo.gif)

The extension's source code is at [vscode-mavo](https://github.com/octref/vscode-mavo) repository. We hope the project serves as a starting point for implementing web framework or language support in VS Code. You can find more information about the `contributes.html.customData` and `contributes.css.customData` Contribution Points at [vscode-custom-data](https://github.com/microsoft/vscode-custom-data).

## Using Custom Data for language servers

The [vscode-html-languageservice](https://github.com/Microsoft/vscode-html-languageservice) and [vscode-css-languageservice](https://github.com/Microsoft/vscode-css-languageservice) libraries allow extension authors to easily implement language servers for languages that extend or embed HTML and CSS. Recently, we added API for loading custom data:

```ts
import { getLanguageService } from 'vscode-html-languageservice'

getLanguageService({
  customDataProviders: [...]
})
```

Our built-in [HTML language server](https://github.com/microsoft/vscode/tree/master/extensions/html-language-features) utilizes this API to load a curated set of Custom Data that we have collected from various sources:

- W3C specifications of HTML, CSS and WAI-ARIA
- Mozilla Developer Network
- Mozilla's [mdn-data](https://github.com/mdn/data) and [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data) packages
- Chrome's ranking of CSS properties usage

We have published this set of data to [NPM](https://www.npmjs.com/package/vscode-web-custom-data). You can find the data [on GitHub](https://github.com/microsoft/vscode-custom-data/tree/master/web-data) as well. Language server authors might use this dataset in combination with our HTML/CSS language services to implement support for their languages that extend or embed HTML/CSS, or they could use this data to implement support for languages that transpile to HTML/CSS, such as Pug or Stylus. Finally, we will continue to curate this dataset to provide up-to-date language support for HTML/CSS in VS Code.

## Summary

At VS Code team, we are commited to providing a good editing experience for languages of the web. Through the Custom Data Format, we stay close to the latest HTML and CSS languages and offer a simple interface for users and extension authors to customize their HTML and CSS editing experience.

![Simple interface](simple-interface.png)

You can read more about the Custom Data Format at: https://github.com/microsoft/vscode-custom-data. Please feel free to open issues and feature requests.

Happy Coding!

Pine Wu, VS Code Team member [@octref](https://github.com/octref)