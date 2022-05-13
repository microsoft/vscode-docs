---
# DO NOT TOUCH — Managed by doc writer
ContentId: 85918f63-ff5d-4ab8-8a18-26ad00618eff
DateApproved: 5/5/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for quick picks used in a Visual Studio Code extension.
---

# Quick Picks

[Quick Picks](/api/extension-capabilities/common-capabilities#quick-pick) are an easy way to perform actions and receive input from the user. This is helpful when selecting a configuration option, needing to filter content, or picking from a list of items.

![Quick Pick](images/examples/quickpick.png)

*This made-up example shows all of the variations that a Quick Pick can contain. It can have items with icons, detail lines, and labels for indicating a default or current item. At the top, it shows the multi-step pattern with back, undo, and forward actions.*

**✔️ Do**

* Use icons for clear metaphors
* Use the description for displaying the current items (if applicable)
* Use the detail for providing (brief) additional context
* Use the multi-step pattern for a series of inputs (like a wizard)
* Provide an option to create a new item when picking from a list (if applicable)

❌ Don't

* Repeat existing functionality
* Use the same icon for multiple items
* Use more than six icons in a list
