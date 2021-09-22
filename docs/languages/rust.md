---
Order: 17
Area: languages
TOCTitle: Rust
ContentId:
PageTitle: Rust with Visual Studio Code
DateApproved: 22/05/2021
MetaDescription: Find out how to get the best out of Visual Studio Code and Rust.
MetaSocialImage: images/rust
---
# Rust for Visual Studio Code

Rust support for Visual Studio Code is now provided by [Microsoft Rust Extension](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust) to enable users for development.

[Rust Extension](images/Rust/Language_Rust.png)

## Install The Extension

1. Open VS Code
1. Select the Extensions view icon on the Activity bar or use the keyboard shortcut (`kb(workbench.view.extensions)`).
1. Search for `'Rust'`.
1. Select **Install**.

After you install the extension, when you open or create a `*rust` file, you will have syntax highlighting (colorization), smart completions and hovers (IntelliSense), and error checking.

## Install a compilor

At the command line prompt in terminal:
```
❯ brew install rustup
```
Note: If rust is already installed it can be updated using rustup update.

## Install compiler and package manager.
At the command line prompt in terminal:
```
❯ rustup-init
```
You can uninstall at any time with rustup self uninstall and these changes will be reverted.
After running `rustup-init` you will be presented with various options — just go ahead and use the default option — option 1
```
1) Proceed with installation (default)
```

## Verify
At the command line prompt in terminal:
```
❯ rustc — version
rustc 1.46.0 (04488afe3 2020-08-24)
```
which should return `rustc` with the version number.
Note: you may need to exit and reload the terminal for path updates to take effect.

## Feedback

If you run into any issues or have suggestions for the Microsoft Rust extension, please file. If you haven't already provided feedback, please take this [quick survey](https://www.research.net/r/VBVV6C6) to help shape this extension for your needs.
