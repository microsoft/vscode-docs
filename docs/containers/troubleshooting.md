---
ContentId: 028C3555-AB2D-4762-BD32-99EDCB737BAD
PageTitle: Troubleshooting Docker development in Visual Studio Code
DateApproved: 
MetaDescription: Troubleshooting Docker development in Visual Studio Code
---
# Troubleshooting Docker development in Visual Studio Code

Use this article to look up errors and find possible solutions to issues with Docker development in VS Code.

## I'm on Linux and get the error "connect EACCES /var/run/docker.sock"

Since VS Code runs as a non-root user, you will need to follow the steps in "Manage Docker as a non-root user" from [Post-installation steps for Linux](https://aka.ms/AA37yk6) for the extension to be able to access docker.
