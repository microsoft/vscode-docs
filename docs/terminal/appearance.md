---
Order: 4
Area: terminal
TOCTitle: Terminal Appearance
ContentId: F1AA7F3E-E078-4C02-B2DE-EC3F5F36F751
PageTitle: Terminal Appearance in Visual Studio Code
MetaDescription: Visual Studio Code's integrated terminal allows customizing its appearance in various ways.
---
# Terminal Appearance

TODO: Initial description and screenshot

## Text style

Text in the terminal can be customized with the following settings:

- `terminal.integrated.fontFamily`: The font family to use, this takes a string in the format that fontFamily in CSS takes. For example, `"'Fira Code', monospace"` will configure `Fira Code` as the primary font and `monospace` as the fallback when it lacks glyphs.
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

## Terminal cursor

TODO: ...

## Customizing tabs

### Visibility

Terminal tabs appear on the right of the terminal view when there are two or more terminals by default, showing the active terminal in the view header when there is only one. This is designed to save horizontal space, but may not be desirable. How tabs are presented can be configured with the following settings:

- `terminal.integrated.tabs.hideCondition`: When to hide the tabs to the right, set to `"never"` to always show them.
- `terminal.integrated.tabs.showActiveTerminal`: When to show the active terminal in the terminal view header.
- `terminal.integrated.tabs.showActions`: When to show the active terminal's actions in the view header.
- `terminal.integrated.tabs.location`: Whether the tabs should be shown on the left or right of the terminal.
- `terminal.integrated.tabs.enabled`: Whether to use tabs, disabling will show the original dropdown view.

### Tab text

The text on each tab is determined by the `terminal.integrated.tabs.title`, `terminal.integrated.tabs.description` and `terminal.integrated.tabs.separator` settings. By default, the title displays what the shell's detected process name.

To change the title to display the escape sequence sent by the shell, use:

```json
"terminal.integrated.tabs.title": "${sequence}"
```

### Icons

Each terminal has an associated icon which is determined by its [terminal profile](https://code.visualstudio.com/docs/terminal/profiles). The default icon and its color, which will be used if not defined in a profile, can be configured with the `terminal.integrated.tabs.defaultIcon` and `terminal.integrated.tabs.defaultColor` settings.

### Status

A tab's "status" is the icon that appears on the right of the tab. Some statuses such as those displays by tabs animate. If this is distracting the animation can be disabled with:

```json
"terminal.integrated.tabs.enableAnimation": false
```

### Visual bell

The terminal features a visual bell which displays a yellow bell icon briefly when the terminal's bell is triggered. This can be disabled with `terminal.integrated.enableBell` and the duration can be configured with `terminal.integrated.bellDuration`.

## Terminal colors

While the terminal is capable of displaying true color, programs commonly use 8 ANSI colors (black, red, green, yellow, blue, magenta, cyan and white) and bright variants of each. These ANSI colors are determined by the active [color theme](https://code.visualstudio.com/docs/getstarted/themes), but they can also be configured independently from the theme with the [`workbench.colorCustomizations` setting](https://code.visualstudio.com/docs/getstarted/themes#_workbench-colors).

Whether bold text uses the normal ANSI colors or the bright varient can be configured with the `terminal.integrated.drawBoldTextInBrightColors` setting.

### Minimum contrast ratio

Terminals often have contrast issues because of how they were designed, these issues often arise due to some conflict with dark/light themes, ANSI colors or shells/programs running in the terminal.

The minimum contrast ratio feature aims to solve this problem in a general way by always displaying text such that a certain contrast ratio is met. This is done by either increasing or reducing the luminance of the text's foreground color. By default this is set to ensure a 4.5:1 contrast ratio is met for reasonable contrast on all text.

One downside of this is that colored text may sometimes lose some of its saturation. This feature can be disabled to get the original colors with:

```json
"terminal.integrated.minimumContrastRatio": 1
```

## GPU acceleration

The terminal features 3 different renderers, each of which have different trade offs:

- Webgl renderer - True GPU acceleration
- Canvas renderer - GPU acceleration by leveraging the [`CanvasRenderingContext2D` web API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D), slower than webgl but faster than DOM
- DOM renderer - A fallback renderer that's much slower but has great compatibility

GPU acceleration driven by the Webgl renderer is enabled in the terminal by default. This helps the terminal work faster and display at a high FPS by significantly reducing the time the CPU spend rendering each frame. This typically works without issue but for certain environments it may not work properly, common examples of this are Linux VMs, browsers that don't support webgl and machines with outdated drivers.

The default `terminal.integrated.gpuAcceleration` value of `"auto"` work by first selecting the webgl renderer, if it detects issues it will fallback to the canvas renderer, and if it detect issues there it will fallback to the DOM renderer. Sometimes this detection doesn't work and requires manual intervention, setting `terminal.integrated.gpuAcceleration` to `"dom"` typically resolves rendering-related problems like these at the cost of performance.

### Custom glyphs

When [GPU acceleration](#_gpu-acceleration) is enabled, various special characters use custom rendering instead of the font to improve how they display in the terminal. These include box drawing characters (`U+2500-U+257F`), block elements (`U+2580-U+259F`) and a subset of powerline symbols (`U+E0B0-U+E0B7`). This means that the configured font does not need to support these characters as well as having the characters draw pixel perfect and stretch to the size of the entire cell.

Here are some examples of these character when using with line height and letter spacing configured, notice how there are no gaps between cells thanks to the custom glyphs:

![](images/appearance/custom-glyphs.png)

This feature can be disabled by setting `"terminal.integrated.customGlyphs": false`.

## Customizing your prompt

TODO: ...

## Common questions

### Why is my terminal showing a multi-colored triangle or a completely black rectangle?

The terminal can have problems with GPU accelerated rendering in some environments. For example, you might see a big multi-colored triangle instead of text. This is typically caused by driver/VM graphics issues and the same also happens in Chromium. Workaround these issues by launching `code` with the `--disable-gpu` flag or by using the setting `"terminal.integrated.gpuAcceleration": "off"` to avoid using the canvas in the terminal. See the [GPU acceleration](#_gpu-acceleration) section for more information.

### Why are the colors in the terminal not correct?

TODO: Link back to min contrast section