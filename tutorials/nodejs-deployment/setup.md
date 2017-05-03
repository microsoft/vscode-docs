---
Order: 2
TOCTitle: Setup
PageTitle: Setup
MetaDescription:
MetaSocialImage:
DateApproved: 4/26/2017
ShortDescription:
---
# Setup

In this step, you will install the Azure Command Line Interface (CLI). You will use the CLI to do the following:

* Create an Azure Website.
* Set up a deployment pipeline between a local/remote Git repository and the Website.
* View your application's logs (`console.log()` output).

## Install the Azure CLI

The Azure CLI is cross platform and runs on Windows, macOS, as well as many different Linux distributions.

> [Install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

### Log In

Once installed, you can use the `az` command from your favorite terminal.

Following the instructions, browse to [https://aka.ms/devicelogin](https://aka.ms/devicelogin) and paste in the 9 character code. When prompted, use the email address and password you used when creating your Azure account.

```bash
$ az login
To sign in, go to https://aka.ms/devicelogin and enter the code BF9BUDLGR to authenticate.
```

### Update the CLI

Make sure you've got the latest CLI components installed by telling the CLI to update itself. This is useful if you have not run the CLI in a while.

```bash
$ az component update
```

## Prerequisite Check

Before we continue, ensure that you have all of the prerequisites properly installed. Type each command and ensure it displays the version you have installed. If your Node.js version is less than 6, please [upgrade](https://nodejs.org/en/download/) to the most current LTS ("Long Term Stable") release.

```bash
$ node -v
6.10.2
```

Now check that you have `git` installed. If not, [install](https://git-scm.com/downloads) it and test again.

```bash
$ git --version
git version 2.6.4
```

----

<a class="tutorial-next-btn" href="/tutorials/nodejs-deployment/express">I've installed the Azure CLI and the prerequisites</a>