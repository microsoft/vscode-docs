I'm excited to announce the public preview of **GitHub Copilot for Azure** - a new addition to your toolkit that seamlessly integrates with GitHub Copilot Chat in VS Code. Think of it as your personal assistant for navigating the Azure cloud. Instead of switching between your IDE and the Azure portal to manage infrastructure or search for commands and arguments, focus on what you do best – writing code. Whether you're provisioning services or deploying apps, just ask in GitHub Copilot Chat and handle it all right inside your editor.

You can get started right now by installing GitHub Copilot for Azure from the VS Code Marketplace!

GitHub Copilot for Azure can help with...

### Learning about Azure

![GIF demonstrating learning about Azure](learn_10-11-2024.gif)

GitHub Copilot for Azure makes learning about Azure services a breeze, whether you're new to the platform or a seasoned pro. It pulls in relevant, up-to-date documentation like answers on Azure OpenAI models, Azure AI Search, or even how pricing works for services like Azure SQL, all within your coding environment. Instead of searching through multiple sources, it surfaces the info you need on-the-fly, letting you understand key services without ever leaving your editor. This makes it super handy for developers just starting with Azure, helping them grasp complex concepts faster, while also saving time for experienced developers who need quick reminders or details on the latest services and features.

**Suggested prompts for learning:**

- `@azure Give me a detailed description of Azure AI Search`
- `@azure Which azure services can run my container?`

### Deploying

[!GIF showing how to search for and deploy an azd template](deploy-init_10-11-2024.gif)

GitHub Copilot for Azure takes the hassle out of deploying your apps by guiding you through tasks like setting up resources or automating deployments. Whether you're building a RAG (Retrieval-Augmented Generation) app with Python, creating a CI/CD pipeline, or using the Azure Developer CLI (azd) to deploy your project, it can suggest app templates, the right commands and configurations straight from your code editor. No need to search for sample applications, look up CLI commands or YAML syntax - it fills in the blanks for you. This is especially helpful when you need to quickly spin up services or tear them down, saving you time and letting you focus on writing great code instead of managing infrastructure.

**Suggested prompts for deploying:**

- `@azure Can you help me build an RAG chat app with GPT-4o?`
- `@azure List the regions where GPT-4o is available`

### Troubleshooting

[!GIF demonstrating how to diagnose an app issue](diagnose-logs_10-11-2024.gif)

Sometimes things go wrong. When they do, GitHub Copilot for Azure simplifies diagnosing and troubleshooting by providing quick insights into your application's performance and resource issues. Whether you're trying to figure out why your Kubernetes cluster is sluggish or the root cause of those annoying 500 errors on your website, @azure has your back. It helps by performing diagnoses, searching logs, and pointing you toward potential issues without having to search through documentation or manually run multiple checks. This speeds up the troubleshooting process, letting you zero in on problems faster and get your app or service back to full speed with less frustration.

Building on that, it doesn’t just help identify problems - it actively assists in fixing them too. Once you’ve pinpointed what’s causing your resource or app issues, it can suggest solutions, like optimizing configurations, scaling resources, or fixing code that’s causing those 500 errors. For example, if your Kubernetes cluster is running slow, it might recommend changes to your deployment settings or resource limits. If you’re dealing with quota exhaustion or performance bottlenecks, it can offer tips on how to scale efficiently. Essentially, it becomes your go-to tool for both diagnosing and resolving issues, so you can focus on improving your app rather than troubleshooting for hours.

**Suggested prompts for troubleshooting:**

- `@azure Why is my ReallyImportantWebsite webapp running slow?`
- `@azure Are there any errors in the logs of my SuperCoolDemo Container App?`

### Operating

[!GIF demonstrating searching for Azure resources](view-resources_10-11-2024.gif)

Following troubleshooting, GitHub Copilot for Azure also helps you stay on top of resource operations. After resolving issues, it's crucial to ensure your resources are being used properly, and it makes this easy. For example, you can quickly ask how many Azure OpenAI deployments you have or request a count of your storage accounts in eastus, sorted by size. This immediate access to resource data helps you optimize your setup by identifying over-provisioned resources, rebalancing workloads, or fine-tuning configurations - all without leaving your coding environment. It streamlines the process of managing resources and keeping everything running smoothly, making sure you’re not only fixing problems but also preventing new ones from cropping up.

**Suggested prompts for operating:**

- `@azure how many web app plans using the free tier do I have deployed grouped by region sorted by highest to lowest?`
- `@azure How do I list all the pods in my AKS cluster?`

### Slash Commands give you more control

GitHub Copilot for Azure is new, and sometimes it may not understand what you want, but it has slash commands that you can use to specify your intent:

- `/help` to see what kinds of things it can do
- `/learn` to learn about Azure
- `/resources` for info on your Azure resources
- `/diagnose` to figure out what’s wrong with your applications
- `/changeTenant` to choose the Azure tenant you want to use

### Get started now!

GitHub Copilot for Azure is currently in public preview, and can be installed from the VS Code Marketplace: Get GitHub Copilot for Azure

### Share your thoughts

We would love to know what you think, good or bad! Use the "Thumbs Up" and "Thumbs Down" buttons to tell us, and you can open issues in our GitHub repo. We would love to hear from you about how we can improve and help you with your Azure journey.

---

Feel free to ask if you need any more help!
