---
Order: 8
Area: cpp
TOCTitle: Enhanced Colorization
ContentId: 2C406EA6-87DC-4A2D-AEC2-90BAA491697C
PageTitle: Enhanced Colorization in Visual Studio Code C++ projects
DateApproved: 07/25/2019
MetaDescription: How to customize semantic colorization of C++ code in Visual Studio Code.
---

# Enhanced Colorization

The Visual Studio Code C/C++ extension now supports semantic colorization, when IntelliSense is enabled.  Enhanced colorization can be enabled using the enhancedColorization setting:

```json
"C_Cpp.enhancedColorization": "Enabled"
```

## Themes

Colors can be associated using the existing support for theming and color customization in VS Code.  Documentation on Themes in VS Code can be found [here](https://code.visualstudio.com/docs/getstarted/themes)

Colors are associated with [TextMate scopes](https://macromates.com/manual/en/language_grammars#naming_conventions).

## IntelliSense Tokens and Scopes

| Token         | Scope         |
| ------------- |:-------------:|
| Class Template | entity.name.class.template |
| Enumerator | variable.other.enummember |
| Event  (C++/CLI) | variable.other.event |
| Function | entity.name.function |
| Function Template | entity.name.function.template |
| Generic Type (C++/CLI) | entity.name.class.generic |
| Global Variable | variable.other.global |
| Identifier | entity.name |
| Label | entity.name.label |
| Local Variable | variable.other.local |
| Macro | entity.name.function.preprocessor |
| Member Field  | variable.other.member |
| Member Function | entity.name.function.member |
| Member Operator | keyword.operator.member |
| Namespace | entity.name.type.namespace |
| New / Delete | keyword.operator.new |
| Operator Function | entity.name.function.operator |
| Parameter | variable.parameter |
| Property (C++/CLI) | variable.other.property |
| Reference Type (C++/CLI) | entity.name.class.reference |
| Static Member Field | variable.other.member.static |
| Static Member Function | entity.name.function.member.static |
| Type | entity.name.type |
| User-Defined Literal - Number | entity.name.user-defined-literal.number |
| User-Defined Literal - Raw | entity.name.user-defined-literal |
| User-Defined Literal - String | entity.name.user-defined-literal.string |
| Value Type (C++/CLI) | entity.name.class.value |

Many of the tokens recognized by IntelliSense do not directly map to existing scopes in the VS Code's default C/C++ TextMate grammar, so are likely not colored by existing VS Code themes.

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

Use the following to augment the Visual Studio Dark theme to match what Visual Studio would display for C++ files.

```json
    "editor.tokenColorCustomizations": {
        "[Visual Studio Dark]": {
            "textMateRules": [
                {
                    "scope": "entity.name",
                    "settings": {
                        "foreground": "#FFFFFF"
                    }
                },
                {
                    "scope": "comment",
                    "settings": {
                        "foreground": "#57A64A"
                    }
                },
                {
                    "scope": "keyword.control",
                    "settings": {
                        "foreground": "#569CD6"
                    }
                },
                {
                    "scope": "keyword.control.directive",
                    "settings": {
                        "foreground": "#9B9B9B"
                    }
                },
                {
                    "scope": "keyword.operator",
                    "settings": {
                        "foreground": "#B4B4B4"
                    }
                },
                {
                    "scope": "variable",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "constant.numeric",
                    "settings": {
                        "foreground": "#B5CEA8"
                    }
                },
                {
                    "scope": "string.quoted",
                    "settings": {
                        "foreground": "#D69D85"
                    }
                },
                {
                    "scope": "comment.xml.doc",
                    "settings": {
                        "foreground": "#57A64A"
                    }
                },
                {
                    "scope": "comment.xml.doc.tag",
                    "settings": {
                        "foreground": "#57A64A"
                    }
                },
                {
                    "scope": "entity.name.function.preprocessor",
                    "settings": {
                        "foreground": "#BD63C5"
                    }
                },
                {
                    "scope": "variable.other.enummember",
                    "settings": {
                        "foreground": "#B8D7A3"
                    }
                },
                {
                    "scope": "variable.other.global",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "variable.other.local",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "variable.parameter",
                    "settings": {
                        "foreground": "#7F7F7F"
                    }
                },
                {
                    "scope": "entity.name.type",
                    "settings": {
                        "foreground": "#4EC9B0"
                    }
                },
                {
                    "scope": "entity.name.class.reference",
                    "settings": {
                        "foreground": "#4EC9B0"
                    }
                },
                {
                    "scope": "entity.name.class.value",
                    "settings": {
                        "foreground": "#4EC9B0"
                    }
                },
                {
                    "scope": "entity.name.function",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "entity.name.function.member",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "variable.other.member",
                    "settings": {
                        "foreground": "#DADADA"
                    }
                },
                {
                    "scope": "entity.name.function.member.static",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "variable.other.member.static",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "variable.other.event",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "entity.name.class.template",
                    "settings": {
                        "foreground": "#4EC9B0"
                    }
                },
                {
                    "scope": "entity.name.class.generic",
                    "settings": {
                        "foreground": "#4EC9B0"
                    }
                },
                {
                    "scope": "entity.name.function.template",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "entity.name.type.namespace",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "entity.name.label",
                    "settings": {
                        "foreground": "#C8C8C8"
                    }
                },
                {
                    "scope": "entity.name.user-defined-literal",
                    "settings": {
                        "foreground": "#DADADA"
                    }
                },
                {
                    "scope": "entity.name.user-defined-literal.string",
                    "settings": {
                        "foreground": "#D69D85"
                    }
                },
                {
                    "scope": "entity.name.user-defined-literal.number",
                    "settings": {
                        "foreground": "#B5CEA8"
                    }
                },
                {
                    "scope": "entity.name.function.operator",
                    "settings": {
                        "foreground": "#B4B4B4"
                    }
                },
                {
                    "scope": "keyword.operator.member",
                    "settings": {
                        "foreground": "#B4B4B4"
                    }
                },
                {
                    "scope": "keyword.operator.new",
                    "settings": {
                        "foreground": "#569CD6"
                    }
                },
            ]
        }
    }
```

Use the following to augment the Visual Studio Light theme to match what Visual Studio would display for C++ files.

```json
    "editor.tokenColorCustomizations": {
        "[Visual Studio Light]": {
            "textMateRules": [
                {
                    "scope": "entity.name",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "comment",
                    "settings": {
                        "foreground": "#008000"
                    }
                },
                {
                    "scope": "keyword.control",
                    "settings": {
                        "foreground": "#0000FF"
                    }
                },
                {
                    "scope": "keyword.control.directive",
                    "settings": {
                        "foreground": "#808080"
                    }
                },
                {
                    "scope": "keyword.operator",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "variable",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "constant.numeric",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "string.quoted",
                    "settings": {
                        "foreground": "#A31515"
                    }
                },
                {
                    "scope": "comment.xml.doc",
                    "settings": {
                        "foreground": "#006400"
                    }
                },
                {
                    "scope": "comment.xml.doc.tag",
                    "settings": {
                        "foreground": "#A9A9A9"
                    }
                },
                {
                    "scope": "entity.name.function.preprocessor",
                    "settings": {
                        "foreground": "#6F0026"
                    }
                },
                {
                    "scope": "variable.other.enummember",
                    "settings": {
                        "foreground": "#2F4F4F"
                    }
                },
                {
                    "scope": "variable.other.global",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "variable.other.local",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "variable.parameter",
                    "settings": {
                        "foreground": "#808080"
                    }
                },
                {
                    "scope": "entity.name.type",
                    "settings": {
                        "foreground": "#2B91AF"
                    }
                },
                {
                    "scope": "entity.name.class.reference",
                    "settings": {
                        "foreground": "#2B91AF"
                    }
                },
                {
                    "scope": "entity.name.class.value",
                    "settings": {
                        "foreground": "#2B91AF"
                    }
                },
                {
                    "scope": "entity.name.function",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "entity.name.function.member",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "variable.other.member",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "entity.name.function.member.static",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "variable.other.member.static",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "variable.other.event",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "entity.name.class.template",
                    "settings": {
                        "foreground": "#2B91AF"
                    }
                },
                {
                    "scope": "entity.name.class.generic",
                    "settings": {
                        "foreground": "#2B91AF"
                    }
                },
                {
                    "scope": "entity.name.function.template",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "entity.name.type.namespace",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "entity.name.label",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "entity.name.user-defined-literal",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "entity.name.user-defined-literal.string",
                    "settings": {
                        "foreground": "#A31515"
                    }
                },
                {
                    "scope": "entity.name.user-defined-literal.number",
                    "settings": {
                        "foreground": "#000000"
                    }
                },
                {
                    "scope": "entity.name.function.operator",
                    "settings": {
                        "foreground": "#008080"
                    }
                },
                {
                    "scope": "keyword.operator.member",
                    "settings": {
                        "foreground": "#008080"
                    }
                },
                {
                    "scope": "keyword.operator.new",
                    "settings": {
                        "foreground": "#0000FF"
                    }
                },
            ]
        }
    }
```
