---
Order: 4
Area: terminal
TOCTitle: Terminal Appearance
ContentId: F1AA7F3E-E078-4C02-B2DE-EC3F5F36F751
PageTitle: Terminal Appearance in Visual Studio Code
MetaDescription: Visual Studio Code's integrated terminal allows customizing its appearance in various ways.
---
# Terminal Appearance

## Text style

Text in the terminal can be customized with the following settings:

- `terminal.integrated.fontFamily`: The font family to use, this takes a string in the format that fontFamily in CSS takes. For example, `'Fira Code', monospace` will configure `Fira Code` as the primary font and `monospace` as the fallback when it lacks glyphs.
- `terminal.integrated.fontSize`: Changes the font size of text in the terminal.
- `terminal.integrated.letterSpacing`: Configures additional horizontal spacing between characters in pixels.
- `terminal.integrated.lineHeight`: Configures additional spacing vertical between characters as a multiplier of the regular line height. For example, `1.1` will add 10% additional vertical space.
- `terminal.integrated.fontWeight`: Configures the font weight of "normal" text.
- `terminal.integrated.fontWeightBold`: Configures the font weight of "bold" text.

### Powerline symbols and Nerd Fonts

Powerline fonts are special patched fonts that contain additional characters that can be used in the terminal. VS Code's terminal [renders some of the powerline symbols without needing to configure a font](#_custom-glyphs), but if more glyphs are desired, configure a powerline font with the font family setting. Powerline fonts typically end in `" for Powerline"`, the following is an example of how to configure a DejaVu Sans Mono that has been patched:

```json
"editor.fontFamily": "'DejaVu Sans Mono for Powerline'"
```

Nerd Fonts work the same and typically have a `" NF"` suffix, the following is an example of how to configure Hack's nerd fonts variant:

```json
"terminal.integrated.fontFamily": "'Hack NF'"
```

## Customizing tabs

## Terminal colors

## Terminal cursor

## Minimum contrast ratio

## Power

## GPU acceleration

## Custom glyphs

When [GPU acceleration](#_gpu-acceleration) is enabled, various special characters use custom rendering instead of the font to improve how they display in the terminal. These include box drawing characters (`U+2500-U+257F`), block elements (`U+2580-U+259F`) and a subset of powerline symbols (`U+E0B0-U+E0B7`). This means that the configured font does not need to support these characters as well as having the characters draw pixel perfect and stretch to the size of the entire cell.

Here are some examples of these character when using with line height and letter spacing configured, notice how there are no gaps between cells thanks to the custom glyphs:

![](images/appearance/custom-glyphs.png)

This feature can be disabled by setting `"terminal.integrated.customGlyphs": false`.

## Customizing your prompt

## Common questions

### Why is my terminal showing a multi-colored triangle or a completely black rectangle?

The terminal can have problems with GPU accelerated rendering in some environments. For example, you might see a big multi-colored triangle instead of text. This is typically caused by driver/VM graphics issues and the same also happens in Chromium. Workaround these issues by launching `code` with the `--disable-gpu` flag or by using the setting `"terminal.integrated.gpuAcceleration": "off"` to avoid using the canvas in the terminal. See the [GPU acceleration](#_gpu-acceleration) section for more information.

### Why are the colors in the terminal not correct?

TODO: Link back to min contrast section