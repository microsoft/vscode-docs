---
ContentId:
DateApproved: 1/9/2023
MetaDescription: Learn how to build machine learning applications in Azure Machine Learning using the Visual Studio Code extension
MetaSocialImage: images/tutorial/python-social.png
---

# Microsoft Fabric Extensions for Visual Studio Code

## Overview
Microsoft Fabric extensions for VS Code provide a powerful, integrated development experience for data engineers and developers working with Fabric artifacts, lakehouses, notebooks, and user data functions. These extensions streamline workflows by enabling local development, debugging, and workspace management directly within VS Code.

## What is Microsoft Fabric?
Microsoft Fabric is a unified data and analytics platform that combines the best of Power BI, Azure Synapse, and Data Factory into a single, integrated experience. It empowers organizations to manage, analyze, and visualize data across teams with ease—enabling faster insights, better collaboration, and more informed decision-making. Whether you're a data engineer, analyst, or business leader, Fabric simplifies your workflow and accelerates your data journey.
[Sign up for free](https://app.fabric.microsoft.com/?pbi_source=learn-vscodedocs-microsoft-fabric-quickstart) and explore Microsoft Fabric for 60 days — no credit card required. 

## Extensions Available

### Micorosft Fabric 
- Core extension to manage Fabric workspaces.
- View, create, rename, and delete Fabric items.
- Sign in and switch tenants.
- Access items grouped by type or in list view.
- Open and edit notebooks.
- Use the Command Palette for quick actions.[1](https://learn.microsoft.com/fabric/data-engineering/set-up-fabric-vs-code-extension)

### Fabric User Data Functions
- Author, test, and deploy serverless user data functions.
- Debug locally with breakpoints.
- Manage connections and libraries.
- Publish changes to Fabric.[1](https://learn.microsoft.com/fabric/data-engineering/set-up-fabric-vs-code-extension)[3](https://blog.fabric.microsoft.com/en/blog/boost-your-development-with-microsoft-fabric-extensions-for-visual-studio-code?ft=Microsoft-fabric:category)

### Fabric Data Engineering
- Explore lakehouses and table data.
- Develop and debug notebooks and Spark job definitions.
- Synchronize local and remote notebooks.
- Browse raw files and lakehouse structure.[2](https://learn.microsoft.com/fabric/data-engineering/setup-vs-code-extension)[3](https://blog.fabric.microsoft.com/en/blog/boost-your-development-with-microsoft-fabric-extensions-for-visual-studio-code?ft=Microsoft-fabric:category)

## Git integration
Microsoft Fabric supports Git integration that enables seamless version control and collaboration across data and analytics projects. You can connect a Fabric workspace to Git repositories—primarily Azure DevOps or GitHub and only supported items are synced. The integration supports CI/CD workflows, allowing teams to manage releases efficiently and maintain high-quality analytics environments. 

## Fabric MCP server 
The Fabric MCP is our contribution to this ecosystem: a local MCP server that packages the full OpenAPI specifications for Fabric’s public APIs, JSON schemas for every item type (Lakehouses, pipelines, semantic models, notebooks, Real‑Time analytics workloads and more) and built‑in guidance on pagination, error handling and other best practices. 

- **Complete API context:** Agents can browse a catalogue of all supported workloads and fetch detailed request/response schemas. They learn authentication requirements, parameter names and data types, so generated code aligns with Fabric’s public APIs. 
- **Item definition knowledge:** For each Fabric item, the MCP exposes a JSON schema describing its shape, constraints and defaults. Whether you’re building a Lakehouse, creating a Data Factory pipeline or configuring a semantic model, your AI assistant knows the exact structure required. 
- **Best‑practice guidance built in:** Developers often grapple with pagination, long‑running operations and error handling. The Fabric MCP surfaces recommended patterns, so code generation follows Microsoft’s guidelines from day one. 
- **Local‑first security:**The server runs entirely on your own machine or infrastructure. It never connects directly to your Fabric environment; instead, it generates code that you decide to execute. This keeps credentials and data safe while still enabling powerful automation. 
-** Open source and extensible:** The server is part of the Microsoft MCP repository alongside other service‑specific MCP implementations. You can fork it, add new schemas or guidance and contribute back. Templates are just JSON and YAML files — no proprietary formats. 

## Next steps
[Set up your Fabric trial capacity](https://learn.microsoft.com/fabric/fundamentals/fabric-trial)
