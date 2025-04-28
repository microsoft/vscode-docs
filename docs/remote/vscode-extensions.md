---
Order: not sure
Area: remote
TOCTitle: VSCODE_EXTENSIONS
ContentId: not sure
PageTitle: VSCODE_EXTENSIONS environment variable in Visual Studio Code
DateApproved: not approved yet
MetaDescription: Learn how the VSCODE_EXTENSIONS environment variable controls where Visual Studio Code extensions are stored and managed.
---

# VSCODE_EXTENSIONS environment variable in Visual Studio Code

The `VSCODE_EXTENSIONS` environment variable is used by Visual Studio Code to specify a custom location for storing user-installed extensions. It overrides the default extensions directory that VS Code would normally use.

By setting this variable, developers and administrators can control where extensions are installed and loaded from, allowing for flexible management of the environment.

# Quickstart Guide

Want to quickly set a custom extensions folder for Visual Studio Code?

1. Pick a folder where you want your extensions saved, for example:
   - `D:\CustomExtensions` (Windows)
   - `/home/user/custom_extensions` (Linux/macOS)

2. Set the environment variable and launch VS Code:

   **Windows (PowerShell):**

   ```powershell
   $env:VSCODE_EXTENSIONS="D:\CustomExtensions"
   your code here

**Linux/macOS (Bash):**
    export VSCODE_EXTENSIONS="/home/user/custom_extensions"
    your code here

3. Done
    - All installed extensions will now live in your custom folder.
    - VS Code will read and manage extensions from the new location.

    > **Note:** `VSCODE_EXTENSIONS` only works for desktop installations (Electron apps). It has no effect on web versions like vscode.dev.

---

# What `VSCODE_EXTENSIONS` does
When `VSCODE_EXTENSIONS` is set, Visual Studio Code uses the path provided in the variable as the root directory for storing and resolving installed extensions.

If the variable is **not** set, VS Code uses the default location:

- **Windows**: `%USERPROFILE%\.vscode\extensions`
- **macOS/Linux**: `$HOME/.vscode/extensions`

**When `VSCODE_EXTENSIONS` is set:**

- All **new extensions installed** will go into the folder specified by `VSCODE_EXTENSIONS`.
- **Existing extensions** will be loaded from this custom folder.
- **Extension scanning, activation, and updates** will be based on the contents of the custom directory.
- The behavior affects **only user-installed extensions**, not built-in extensions that ship with VS Code.

---

# Where it is used in the VS Code codebase

The `VSCODE_EXTENSIONS` environment variable is read in the file:
src/vs/platform/environment/common/environmentService.ts

Within `environmentService.ts`, it is used to set the `extensionsPath` property, which defines where the extension management service looks for extensions at runtime.

### Simplified flow:

1. During startup, the environment configuration loads system environment variables.
2. If `VSCODE_EXTENSIONS` is present, its value is used to configure the `extensionsPath`.
3. The Extension Management Service uses `extensionsPath` for all extension operations (scan, install, update, delete).

---

# Scope: Native vs. Web builds

- **Native/Desktop VS Code (Electron):**
  `VSCODE_EXTENSIONS` is **used**. It directly affects where extensions are read and written.

- **VS Code for the Web** (e.g., vscode.dev, github.dev):
  `VSCODE_EXTENSIONS` is **ignored**. Web builds handle extensions differently, typically using browser storage, cloud extensions, or server-side management.

Thus, `VSCODE_EXTENSIONS` only affects **local instances** of VS Code installed on your machine.

---

# Practical Example

Suppose you want VS Code to use a custom extensions folder at `D:\CustomExtensions`.

On **Windows**, you would set the environment variable before launching VS Code:

```powershell
$env:VSCODE_EXTENSIONS="D:\CustomExtensions"
your code here

On **Linux/macOS**:
export VSCODE_EXTENSIONS="/home/user/custom_extensions"
your code here

Now, all extension installs, updates, and loads will happen from that custom folder.
