---
Order: 8
Area: getstarted
TOCTitle: Display Language
PageTitle: Visual Studio Code Display Language (Locale)
ContentId: 413A7FA3-94F8-4FCB-A4A3-F4C1E77EF716
DateApproved: 6/6/2018
MetaDescription: How to change the display language (locale) of Visual Studio Code.
---
# Display Language

Visual Studio Code ships with 10 available display languages (locales): English (US), Simplified Chinese, Traditional Chinese, French, German, Italian, Japanese, Korean, Russian and Spanish.  Localized display text for all 10 languages is included in the main VS Code download and as such, doesn't require a secondary install.

By default, VS Code picks up the operating system's display language, falling back to English (US) if the locale is not supported.

## Available locales

Display Language | Locale
-----------------|-------
English (US) | `en`
Simplified Chinese | `zh-CN`
Traditional Chinese | `zh-TW`
French | `fr`
German | `de`
Italian | `it`
Spanish | `es`
Japanese | `ja`
Korean | `ko`
Russian | `ru`

### Language Pack extension locales

Additional display languages are available as Language Pack extensions (Category: **Language Packs**) on the VS Code [Marketplace](https://marketplace.visualstudio.com/vscode).

Display Language | Locale
-----------------|-------
Bulgarian | `bg`
Hungarian | `hu`
Portuguese (Brazil) | `pt-br`
Turkish | `tr`

## Marketplace Language Packs

Currently VS Code ships with 10 display languages, but in the future, VS Code is going to change to providing all display languages through [Marketplace Language Packs](https://marketplace.visualstudio.com/search?target=VSCode&category=Language%20Packs&sortBy=Downloads). Additional display languages are already available as Marketplace extensions and providing all languages through extensions has several advantages:

* Users only need to install the display languages they want to use.
* Languages fixes and updates can be provided separately from VS Code releases.
* No difference between core and community display language support.

Once your preferred display language is available on the Marketplace (Category: **Language Packs**), we encourage you to install the extension. In the future, we will remove the in-product languages (English will still ship as the default).

You can search for Language Packs in the Extensions view (`kb(workbench.view.extensions)`) and typing the language you are looking for along with `category:"Language Packs"`.

![German Language Pack](images/locales/german-language-pack.png)

## Setting the Language

If you want to configure a specific language, you can either use the command line switch `--locale` to specify a locale when you launch a VS Code session or use the **Configure Display Language** command to persist the display language to use when VS Code is started.

Below is an example of using the `--locale` command line switch to set the VS Code display language to French:

```bash
code . --locale=fr
```

## Configure Display Language command

The **Configure Display Language** command creates a `locale.json` file in your user VS Code folder.  Set the `locale` attribute to your preferred locale.

Press `kb(workbench.action.showCommands)` to bring up the **Command Palette** then start typing "display" to filter and display the **Configure Display Language** command.

![configure display language command ](images/locales/configure-language-command.png)

Press `kbstyle(Enter)` and a `locale.json` file is created with the default value set to your operating system language. You can use IntelliSense (`kb(editor.action.triggerSuggest)`) to select a different supported language locale.

![locale IntelliSense](images/locales/locale-intellisense.png)

Save `locale.json` and restart VS Code to use the new display language.

The example below sets VS Code to display Simplified Chinese `zh-CN`:

```json
{
    // Defines VS Code's display language.
    "locale":"zh-CN"
}
```

You can rerun the **Configure Display Language** command to review and change your `locale.json` file.

>**Note:** Changing the `locale` value requires a restart of VS Code.
