---
Order: 8
Area: getstarted
TOCTitle: Display Language
PageTitle: Visual Studio Code Display Language (Locale)
ContentId: 413A7FA3-94F8-4FCB-A4A3-F4C1E77EF716
DateApproved: 08/01/2024
MetaDescription: How to change the display language (locale) of Visual Studio Code.
---
# Display Language

Visual Studio Code ships by default with English as the display language and other [languages](#available-locales) rely on Language Pack [extensions](/docs/editor/extension-marketplace.md) available from the [Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Language%20Packs&sortBy=Installs).

VS Code detects the operating system's UI language and prompts you to install the appropriate Language Pack, if available on the Marketplace. Below is an example recommending a Simplified Chinese Language Pack:

![Language Pack recommendation](images/locales/lang-pack-recommendation.png)

After installing the Language Pack extension and following the prompt to restart, VS Code uses the Language Pack matching your operating system's UI language.

>**Note**: This article explains how to change the display language in the VS Code UI via Language Packs such as French or Chinese. If you want to add programming language support, for example for C++ or Java, refer to the [Programming Languages](/docs/languages/overview.md) section of the documentation.

## Changing the Display Language

You can also override the default UI language by explicitly setting the VS Code display language using the **Configure Display Language** command.

Press `kb(workbench.action.showCommands)` to bring up the **Command Palette** then start typing "display" to filter and display the **Configure Display Language** command.

![configure display language command](images/locales/configure-language-command.png)

Press `kbstyle(Enter)` and a list of available languages by [locale](#available-locales) is displayed, with the active (current) language highlighted.

![installed languages list](images/locales/installed-languages-list.png)

Select another language to change the display language. If the Language Pack is not yet installed, VS Code installs it. You are prompted to restart when you select a different display language.

The **Configure Display Language** command writes to the Runtime Configuration Arguments file `argv.json` in your user VS Code folder (`.vscode`).

The display language can also be changed by editing the `argv.json` file directly (**Preferences: Configure Runtime Arguments**) and restarting VS Code.

## Available locales

Display Language | Locale
-----------------|-------
English (US) | `en`
Simplified Chinese | `zh-cn`
Traditional Chinese | `zh-tw`
French | `fr`
German | `de`
Italian | `it`
Spanish | `es`
Japanese | `ja`
Korean | `ko`
Russian | `ru`
Portuguese (Brazil) | `pt-br`
Turkish | `tr`
Polish | `pl`
Czech | `cs`
Hungarian | `hu`

## Marketplace Language Packs

As described above, VS Code ships with English as the default display language, but other languages are available through [Marketplace Language Packs](https://marketplace.visualstudio.com/search?target=VSCode&category=Language%20Packs&sortBy=Installs).

You can also search for Language Packs in the Extensions view (`kb(workbench.view.extensions)`) by typing the language you are looking for along with `category:"Language Packs"`.

![German Language Pack](images/locales/german-language-pack.png)

You can have multiple Language Packs installed and select the current display language with the **Configure Display Language** command.

## Setting the Language

If you want to use a specific language for a VS Code session, you can use the command-line switch `--locale` to specify a locale when you launch VS Code.

Below is an example of using the `--locale` command-line switch to set the VS Code display language to French:

```bash
code . --locale=fr
```

**Note**: You must have the appropriate Language Pack installed for the language you specify with the command-line switch. If the matching Language Pack is not installed, VS Code will display English.

## Common questions

### Unable to write to file because the file is dirty

This notification may mean that your `argv.json` file wasn't saved after a previous change. Check if there are any errors in the file (**Preferences: Configure Runtime Arguments**), make sure the file is saved, and try to install the Language Pack again.

### Can I contribute to a language pack's translations?

Yes, the [Visual Studio Code Community Localization Project](https://aka.ms/vscodeloc) is open to anyone, where contributors can provide new translations, vote on existing translations, or suggest process improvements.

### How can I enable a programming language like Python?

Refer to the [Programming Languages](/docs/languages/overview.md) section to learn how to install support for programming languages, such as PHP, Python, and Java.
