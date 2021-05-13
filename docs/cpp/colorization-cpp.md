---
Order: 9
Area: cpp
TOCTitle: Enhanced colorization
ContentId: 2C406EA6-87DC-4A2D-AEC2-90BAA491697C
PageTitle: Enhanced colorization in Visual Studio Code C++ projects
DateApproved: 07/29/2019
MetaDescription: How to customize semantic colorization of C++ code in Visual Studio Code.
---
# Enhanced colorization

The Visual Studio Code C/C++ extension now supports semantic colorization, when IntelliSense is enabled.  Use of enhanced colorization is controlled by the C_Cpp.enhancedColorization setting.  This setting is enabled by default.

```json
"C_Cpp.enhancedColorization": "Enabled"
```

## Themes

Colors can be associated using the existing support for theming and color customization in VS Code.  See the [VS Code Themes documentation](/docs/getstarted/themes.md) for more information.

Colors are associated with [TextMate scopes](https://macromates.com/manual/en/language_grammars#naming_conventions).

Many of the tokens recognized by IntelliSense do not directly map to existing scopes in VS Code's default C/C++ TextMate grammar, so are likely not colored by existing VS Code themes.

### C/C++ Themes Extension

We've created a set of VS Code themes that closely resemble the default Light and Dark themes in Visual Studio, and include colors for semantic tokens.  These themes can be found [here](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-themes).

## IntelliSense Tokens and Scopes

| Token         | Scope         |
| ------------- |:-------------:|
| Class Template | entity.name.type.class.templated |
| Enumerator | variable.other.enummember |
| Event  (C++/CLI) | variable.other.event |
| Function | entity.name.function |
| Function Template | entity.name.function.templated |
| Generic Type (C++/CLI) | entity.name.type.class.generic |
| Global Variable | variable.other.global |
| Label | entity.name.label |
| Local Variable | variable.other.local |
| Macro | entity.name.function.preprocessor |
| Member Field  | variable.other.property |
| Member Function | entity.name.function.member |
| Namespace | entity.name.namespace |
| New / Delete | keyword.operator.new |
| Operator Overload Function | entity.name.function.operator |
| Operator Overload Member | entity.name.function.operator.member |
| Parameter | variable.parameter |
| Property (C++/CLI) | variable.other.property.cli |
| Reference Type (C++/CLI) | entity.name.type.class.reference |
| Static Member Field | variable.other.property.static |
| Static Member Function | entity.name.function.member.static |
| Type | entity.name.type |
| User-Defined Literal - Number | entity.name.operator.custom-literal.number |
| User-Defined Literal - Raw | entity.name.operator.custom-literal |
| User-Defined Literal - String | entity.name.operator.custom-literal.string |
| Value Type (C++/CLI) | entity.name.type.class.value |

## Customizing Colors in Settings

Colors can also be overridden globally, in settings:

```json
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "entity.name.type",
                "settings": {
                    "foreground": "#FF0000",
                    "fontStyle": "italic bold underline"
                }
            }
        ]
    }
```

Or, overridden on a per-theme basis:

```json
    "editor.tokenColorCustomizations": {
        "[Visual Studio Dark]": {
            "textMateRules": [
                {
                    "scope": "entity.name.type",
                    "settings": {
                        "foreground": "#FF0000",
                        "fontStyle": "italic bold underline"
                    }
                }
            ]
        }
    }
```
