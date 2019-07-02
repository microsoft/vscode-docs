---
Order: 15
Area: cpp
TOCTitle: Enable logging
ContentId: EC8DC085-A0E4-4401-B41F-6497EDD49352
PageTitle: How to enable logging in the Visual Studio Code C/C++ extension
DateApproved: 06/25/2019
MetaDescription: How to enable logging in the Visual Studio Code C/C++ extension
---

# How to enable logging in the extension

If you are experiencing a problem that we are unable to diagnose based on information in your issue report, we might ask you to enable logging and send us your logs.

Logging information is delivered directly to the Output window in VSCode. To turn on full logging for an issue report, follow these steps:

1. Open the **Command Palette** and choose **Preferences: Workspace settings**.
1. Search for "logging" in the search box.
1. Find **C_cpp Logging Level** and change the level to **Debug**.

   ![Logging level](images/cpp/logging-level.png)

1. From the main menu, open the Output Window by choosing **View** > **Output**.

1. Select the "C/C++" option in the log filter selector:

   ![Log filter selector](images/cpp/log-filter-selector.png)
