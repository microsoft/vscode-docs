---
Order: 9
Area: cpp
TOCTitle: IntelliSense engines
ContentId: ----------
PageTitle: C/C++ IntelliSense engines in Visual Studio Code
DateApproved: 06/25/2019
MetaDescription: About the C/C++ IntelliSense engines in Visual Studio Code
---

# IntelliSense engines

There are two IntelliSense engines used to power the C/C++ IntelliSense experience in VS Code.

* `Default` - Visual Studio's IntelliSense engine, which is the default engine that provides semantic-aware IntelliSense features
* `Tag Parser` - the "fuzzy" IntelliSense engine that provides quick but "fuzzy" results, is used to provide the fallback experience if the default engine is unable to fully resolve include paths

Ultimately all the IntelliSense and code browsing features will be powered by the "Default" engine. The following features have been implemented so far:

* Autocomplete suggestions for class/struct/namespace members
* Parameter hints
* Quick info (hover over tooltip)
* Error squiggles
* Reference highlighting

The other IntelliSense features, such as global autocomplete, and code browsing features, such as Go to definition/declaration, are currently powered by the "Tag Parser" based engine.

## `includePath` and `browse.path`

The two IntelliSense engines use two different settings in the `c_cpp_properties.json` file for specifying include paths. This file is located in the **.vscode** directory in the opened folder. You can create or open this file by either using the **C/Cpp: Edit Configurations** command in the command palette or by selecting "Edit "includePath" setting" in the Light Bulb menu. Look for the following settings in the section where your current configuration is defined (by default there's one configuration per OS, such as "Win32 or "Mac").

### includePath

This array of path strings is used by the "Default" IntelliSense engine. The paths that you specify for this setting are the same paths that you would send to your compiler via the -I switch. When your source files are parsed, the IntelliSense engine will prepend these paths to the files specified by your #include directives while attempting to resolve them. These paths are searched **non-recursively**.

### browse.path

This array of path strings is used by the "Tag Parser" (also called the *browse engine*). This engine will **recursively** enumerate all files under the paths specified and track them as potential includes while tag parsing your project folder. To disable recursive enumeration of a path, you can append a `/*` to the path string.

### How fallback works and how to control the behavior

The extension first tries to fully parse any opened file using the "Default" IntelliSense engine. If it discovers that it cannot find a header file or a dependency, it will fall back to the tag parser and provide the fuzzy IntelliSense behavior. The fallback affects a full translation unit (TU), not just a single open file. The Problems panel provides details about unresolved headers and dependencies. Other opened TUs will continue to use the "Default" IntelliSense engine provided that all #include dependencies are resolved.

We recognize that resolving all #includes may not be necessary for all projects and you may still want to experience the productivity benefits of using the "Default" semantic engine without customizing the default include path. For that, the “Force semantic IntelliSense” action can be chosen. When invoked, all unresolved #include squiggles will turn red and semantic member list and linting will be enabled in all files regardless of whether or not #include statements can be resolved.

### IntelliSense engine setting

We recommend using the "Default" engine for the best IntelliSense experience. However, it is possible to explicitly choose the IntelliSense engine by editing your [user or workspace settings](https://code.visualstudio.com/docs/getstarted/settings). The setting you should modify is `C_Cpp.intelliSenseEngine`. There are two values for this setting:

* `Default` - use Visual Studio's IntelliSense engine
* `Tag Parser` - use the "fuzzy" IntelliSense engine

### See Also

[Configuring includePath for better IntelliSense results](configure-intellisense-cpp.md)
[c_cpp_properties.json reference guide](c-cpp-properties-schema-reference.md)
