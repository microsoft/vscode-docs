---
Order: 53
TOCTitle: Custom Data Format
PageTitle: "Custom Data Format: Evolving HTML and CSS Language Features"
MetaDescription: "Custom Data Format: Evolving HTML and CSS Language Features"
Date: 2019-11-26
Author: Pine Wu
MetaSocialImage:
---

# Custom Data Format: Evolving HTML and CSS Language Features

November 27, 2019 by Pine Wu, [@octref](https://github.com/octref)

The web evolves, so do its languages. New entities continue to land in HTML and CSS; [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) and [Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini) give users a way to extend HTML and CSS semantics; many developers today develop on new languages that resemble HTML and CSS. Although HTML and CSS see increasingly flexible usage, editor support for them lags behind.

To modernize the HTML and CSS language support in Visual Studio Code, we designed the [Custom Data Format](https://github.com/microsoft/vscode-custom-data), a declarative JSON format for describing HTML and CSS entities. VS Code's HTML and CSS language servers can read data defined in this format and adapt to support the provided HTML and CSS entities.

In this blog post, we illustrate usage of Custom Data Format and explain how you can take advantage of it. We also explain the Custom Data Format from three perspectives:

- Staying up-to-date with latest HTML and CSS specifications
- Offering editor support for Web Components
- Supporting web frameworks built on top of HTML and CSS

## Using Custom Data

If you are using the latest version of VS Code, you are already using Custom Data! The HTML and CSS language servers load a set of data curated from many sources, such as:

- W3C specifications of HTML, CSS and WAI-ARIA
- Mozilla Developer Network
- Mozilla's mdn-data and mdn-browser-compat-data packages
- Chrome's ranking of CSS properties usage

These data are presented through the HTML and CSS language features:

- Links to specification or MDN article on every HTML and CSS entity
- Warning of experimental and deprecated properties
- Browser support information
- Sorting of auto-completed CSS properties based on usage data from [Chrome Platform Status](https://www.chromestatus.com/metrics/css/popularity)

![HTML and CSS Language Features](html-css-language-features.png)

You can provide additional data in this format to get auto-completion and hover support as well. All it takes is a JSON file:

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

Once you point VS Code to Custom Data JSON files through `html.customData` or `css.customData` settings, VS Code will load them to provide up-to-date language features for these new entities.

![Custom Data helloworld](custom-data-helloworld.png)

You can find detailed instructions to use Custom Data in the [microsoft/vscode-custom-data](https://github.com/microsoft/vscode-custom-data) repository.

## Staying up-to-date with latest HTML and CSS specifications

In the past, VS Code's HTML and CSS support read data of HTML and CSS entities from two schema files. It is hard to keep them updated. With the arrival of Custom Data, we are able to separate the language features (such as auto completion, hover information) development from the data curation. For each new release, we pull latest data from various sources and publish them through the [vscode-web-custom-data](https://www.npmjs.com/package/vscode-web-custom-data) NPM package.

On the one hand, we keep an up-to-date dictionary of every HTML and CSS entities in the Custom Data Format. Meanwhile, we continue to improve the presentation of these information in the editor through development of HTML and CSS language servers.

## Offering editor support for Web Components

Custom Data Format was originally designed to support Web Components. As Web Components extends HTML semantics with dynamically defined custom elements, we created the Custom Data Format to capture the extended semantics and evolved our HTML language server to handle data in this format. We approached the Web Components community with our [proposal](https://github.com/w3c/webcomponents/issues/776) to implement Web Component support for code editors.

Although the discussion is still onging, the Web Components community recently started specifying [custom-elements-json](https://github.com/webcomponents/custom-elements-json), a metadata format to describe each Web Component. The hope is for each Web Component:

- A static analyzer could emit JSON data following this format
- Each Web Component distribute this JSON data on NPM
- Editor could pick up this JSON data to provide language features

The custom-element-json data format has a bigger scope than Custom Data Format and is a superset of it. For example, since the custom-element-json data format aims to power API documentation generation and component presentation on [webcomponents.org](https://www.webcomponents.org), it includes more fields than VS Code's Custom Data Format. From other perspective, we intend to keep Custom Data Format as a lean interface to declaratively enhance the HTML language features of VS Code:

![Custom Data as a lean interface](lean-interface.png)

We look forward to working together with the Web Components community to evolve both the Custom Data Format and the custom-element-json format, eventually to provide a better editing experience for Web Components in the editor.

## Supporting web frameworks built on top of HTML and CSS

Today, many developers develop on the web with templating languages that semantically extend HTML. Backend developers write Handlebars, Razor and Jinja, and frontend developers write JSX, Vue Single File Component and Angular HTML template. Additionally, frameworks such as [Vue](https://vuejs.org) and [MAVO](https://mavo.io) allows developers to drop a script tag and start using an extended set of HTML entities right inside a normal HTML file. Although we are happy to see people using VS Code for writing such a diverse variety of languages, it is infeasible for us to provide language support for all HTML-esque languages.

We therefore encourage framework and language developers to reuse our library, [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice), to build support for their frameworks and languages. By combining `vscode-html-languageservice` with our curated custom data at [vscode-web-custom-data](https://www.npmjs.com/package/vscode-web-custom-data), one can easily replicate the HTML language support in other HTML-esque languages. In the case that frameworks extend HTML with additional tags, attributes and attribute values, framework authors also have the option to simply provide a JSON file in the Custom Data Format to gain additional support in normal HTML files. A good example is the [MAVO](https://marketplace.visualstudio.com/items?itemName=octref.vscode-mavo) extension.

## Looking forward

VS Code is a text editor built with web technologies, and we are commited to providing a good editing experience for the web. Through the Custom Data Format, we stay close to the latest HTML and CSS languages and offer a simple interface for users and hackers to customize their HTML and CSS editing experience.

You can learn more about the Custom Data Format at: https://github.com/microsoft/vscode-custom-data. Please feel free to open issues and feature requests.

Happy Coding!

Pine Wu, VS Code Team member [@octref](https://github.com/octref)