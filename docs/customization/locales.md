---
Order: 7
Area: customization
TOCTitle: Display Language
PageTitle: Visual Studio Code Display Language (Locale)
DateApproved: 3/7/2016
MetaDescription: How to change the display language (locale) of Visual Studio Code.  

# Display Language

Visual Studio Code ships with 10 available display languages (locales): English (US), Simplified Chinese, Traditional Chinese, French, German, Italian, Japanese, Korean, Russian and Spanish.  Localized display text for all 10 languages is included in the main VS Code download and as such, doesn't require a secondary install.

By default, VS Code picks up the operation system's display language, falling back to English (US) if the locale is not supported.

## Available locales

Display Language | Locale
-----------------|-------
English (US) |`en-US`
Simplified Chinese|`zh-CN`
Traditional Chinese|`zh-TW`
French|`fr`
German|`de`
Italian|`it`
Japanese|`ja`
Korean|`ko`
Russian|`ru`
Spanish|`es`

## Setting the Locale

If you want to configure a specific language, you can either use the command line switch `--locale` to specify a locale when you launch a VS Code session or use the **Configure Locale** action to persist the display language to use when VS Code is started.

**Configure Locale** creates a `locale.json` file in your user VS Code folder.  Set the `locale` attribute to your preferred locale.

The example below sets VS Code to display Traditional Chinese `zh-TW`:

```json
{
    // Defines VS Code's display language.
    "locale":"zh-TW
}
```

Changing the `locale` value requires a restart of VS Code.
