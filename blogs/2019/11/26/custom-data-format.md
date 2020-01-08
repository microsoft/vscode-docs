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

The web evolves, so do its languages. New entities land in HTML and CSS; [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) and [Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini) allow users to extend HTML and CSS semantics; many developers today develop on new languages that resemble HTML and CSS. Although HTML and CSS see increasingly flexible usage, editor support for them lags behind.

To modernize the HTML and CSS language support in Visual Studio Code, we designed the [Custom Data Format](https://github.com/microsoft/vscode-custom-data), a declarative JSON format for describing HTML and CSS entities. VS Code's HTML and CSS language servers can read data defined in this format and provide language support for the newly defined HTML and CSS entities.

In this blog post, we explain the data format and how users and extension authors can take advantage of it.

## Using Custom Data Format

VS Code provides information about HTML/CSS entities in auto completion and hover information:

![HTML and CSS Language Features](html-css-language-features.png)

With the Custom Data Format, you can define new HTML/CSS entities and get auto completion, hover information and other language features. To get started, write a JSON file:

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

Then configure `html.customData` to point to the data file:

```json
{
  "html.customData": ["./html.html-data.json"]
}
```

You would get language features for the defined entities:

![Custom Data helloworld](custom-data-helloworld.png)

You can find detailed usage instruction and samples in the [microsoft/vscode-custom-data](https://github.com/microsoft/vscode-custom-data) repository.

## Using Custom Data Format for language servers

The [vscode-html-languageservice](https://github.com/Microsoft/vscode-html-languageservice) and [vscode-css-languageservice](https://github.com/Microsoft/vscode-css-languageservice) libraries allow extension authors to easily implement language servers for languages that extend or embed HTML and CSS. Recently, we added API for loading custom data:

```ts
import { getLanguageService } from 'vscode-html-languageservice'

getLanguageService({
  customDataProviders: [...]
})
```

By loading different data sets, one can easily create an extension that supports a superset or a subset of HTML/CSS. For example, the [MAVO](https://github.com/octref/vscode-mavo) extension load all HTML entities with MAVO-specific global attributes to get auto completion and hover information for those attributes. It is also possible to write extensions for HTML4, XHTML or SVG by restricitng the entities being loaded.

Finally, we curate a [dataset in the Custom Data Format](https://github.com/microsoft/vscode-custom-data/tree/master/web-data) from various sources:

- W3C specifications of HTML, CSS and WAI-ARIA
- Mozilla Developer Network
- Mozilla's [mdn-data](https://github.com/mdn/data) and [mdn-browser-compat-data](https://github.com/mdn/browser-compat-data) packages
- Chrome's ranking of CSS properties usage

The data is used in VS Code's HTML/CSS language support and published to the [vscode-web-custom-data](https://www.npmjs.com/package/vscode-web-custom-data) NPM package. You may find the data useful for implementing language servers for languages that compile down to HTML/CSS, such as Pug or Stylus.

## Looking forward

VS Code is a text editor built with web technologies, and we are commited to providing a good editing experience for the web. Through the Custom Data Format, we stay close to the latest HTML and CSS languages and offer a simple interface for users and extension authors to customize their HTML and CSS editing experience.

![Simple interface](simple-interface.png)

You can read more about the Custom Data Format at: https://github.com/microsoft/vscode-custom-data. Please feel free to open issues and feature requests.

Happy Coding!

Pine Wu, VS Code Team member [@octref](https://github.com/octref)