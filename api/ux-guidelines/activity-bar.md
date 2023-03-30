---
# DO NOT TOUCH — Managed by doc writer
ContentId: 13b649f1-156f-489a-9c03-c2cff8060733
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for the Activity Bar in a Visual Studio Code extension.
---

# Activity Bar

The Activity Bar is a core navigation surface in VS Code. Extensions can contribute [View Containers](/api/ux-guidelines/views#view-containers) to the Activity Bar that appear as Activity Bar Items. Users can drag the item to other locations like the Panel to customize their layout.

**✔️ Do**

- Use an icon that matches the default Activity Bar item icon style
- Use a clear, obvious name for the [View Container](/api/ux-guidelines/views#view-containers) associated with the item

**❌ Don't**

- Duplicate an existing icon
- Use an Activity Bar item to open a Webview Panel

![Example of the Activity Bar](images/examples/activity-bar.png)

## Links Resources

- [View Container contribution point](/api/references/contribution-points#contributes.viewsContainers)
- [View contribution point](/api/references/contribution-points#contributes.views)
