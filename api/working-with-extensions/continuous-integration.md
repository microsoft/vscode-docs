---
# DO NOT TOUCH — Managed by doc writer
ContentId: 891072bb-c46d-4392-800a-84d747072ce3
DateApproved: 4/8/2020

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use Continuous Integration for testing Visual Studio Code extensions (plug-ins).
---

# Continuous Integration

Extension integration tests can be run on CI services. The [`vscode-test`](https://github.com/Microsoft/vscode-test) library helps you setup extension tests on CI providers and contains a [sample extension](https://github.com/microsoft/vscode-test/tree/master/sample) setup on Azure Pipelines. You can check out the [build pipeline](https://dev.azure.com/vscode/vscode-test/_build?definitionId=15) or jump directly to the [`azure-pipelines.yml` file](https://github.com/microsoft/vscode-test/blob/master/sample/azure-pipelines.yml).

## Azure Pipelines

<a href="https://azure.microsoft.com/services/devops/"><img alt="Azure Pipelines" src="/assets/api/working-with-extensions/continuous-integration/pipelines-logo.png" width="318" /></a>

[Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines/) is great for running VS Code extension tests as it supports running the tests on Windows, macOS, and Linux. For Open Source projects, you get unlimited minutes and 10 free parallel jobs. This section explains how to setup an Azure Pipelines for running your extension tests.

First, create a free account on [Azure DevOps](https://azure.microsoft.com/services/devops/) and create an [Azure DevOps project](https://azure.microsoft.com/features/devops-projects/) for your extension.

Then, add the following `azure-pipelines.yml` file to the root of your extension's repository. Other than the `xvfb` setup script for Linux that is necessary to run VS Code in headless Linux CI machines, the definition is straight-forward:

```yaml
trigger:
- master

strategy:
  matrix:
    linux:
      imageName: 'ubuntu-16.04'
    mac:
      imageName: 'macos-10.13'
    windows:
      imageName: 'vs2017-win2016'

pool:
  vmImage: $(imageName)

steps:

- task: NodeTool@0
  inputs:
    versionSpec: '8.x'
  displayName: 'Install Node.js'

- bash: |
    /usr/bin/Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
    echo ">>> Started xvfb"
  displayName: Start xvfb
  condition: and(succeeded(), eq(variables['Agent.OS'], 'Linux'))

- bash: |
    echo ">>> Compile vscode-test"
    yarn && yarn compile
    echo ">>> Compiled vscode-test"
    cd sample
    echo ">>> Run sample integration test"
    yarn && yarn compile && yarn test
  displayName: Run Tests
  env:
    DISPLAY: ':99.0'
```

Finally, [create a new pipeline](https://docs.microsoft.com/azure/devops/pipelines/get-started-yaml?view=vsts#get-your-first-build) in your DevOps project and point it to the `azure-pipelines.yml` file. Trigger a build and voilà:

![pipelines](images/continuous-integration/pipelines.png)

You can enable the build to run continuously when pushing to a branch and even on pull requests. See [Build pipeline triggers](https://docs.microsoft.com/azure/devops/pipelines/build/triggers) to learn more.

## Github Actions

You can also configure Github Actions to run your extension CI using the [gabrielbb xvfb action](https://github.com/marketplace/actions/gabrielbb-xvfb-action). This automatically checks if Linux is the current OS and runs the tests in an Xvfb enabled environment accordingly:

```yaml
on: [push]

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    runs-on: $\{{ matrix.os }}
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Install Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 8.x
      - run: npm install
      - name: Run tests
        uses: GabrielBB/xvfb-action@v1.0
        with:
          run: npm test

```

## Travis CI

[vscode-test](https://github.com/microsoft/vscode-test) also includes a [Travis CI build definition](https://github.com/microsoft/vscode-test/blob/master/.travis.yml). Because the way to define environment variables is different from Azure Pipelines to Travis CI, the `xvfb` script is a little bit different:

```yaml
language: node_js
os:
  - osx
  - linux
node_js: 8

install:
  - |
    if [ $TRAVIS_OS_NAME == "linux" ]; then
      export DISPLAY=':99.0'
      /usr/bin/Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
    fi
script:
  - |
    echo ">>> Compile vscode-test"
    yarn && yarn compile
    echo ">>> Compiled vscode-test"
    cd sample
    echo ">>> Run sample integration test"
    yarn && yarn compile && yarn test
cache: yarn
```

## Automated publishing

You can configure the CI to publish a new version of the extension automatically.

The publish command is similar to publishing from a local environment using the [`vsce`](https://github.com/Microsoft/vsce) service but the command needs to also include the Personal Access Token (PAT).

You shouldn't expose the PAT with the rest of the source code (it's a sensitive information), so you can store it in a "secret variable". The value of that variable will not be exposed and you can use it in the `azure-pipelines.yml` file.

To create a secret variable, follow the [Azure DevOps Secrets instructions](https://docs.microsoft.com/azure/devops/pipelines/process/variables?tabs=classic%2Cbatch#secret-variables).

Next steps will be:

1. Install `vsce` as a `devDependencies` (`npm install vsce --save-dev` or `yarn add vsce --dev`).
2. Declare a `deploy` script in `package.json` without the PAT.

```json
"scripts": {
  "deploy": "vsce publish --yarn"
}
```

3. Configure the CI so the build will run for all the branches that include tags by adding a `trigger` section in `azure-pipelines.yml`:

```yaml
trigger:
  branches:
    include: ['*']
  tags:
    include: ['*']
```

4. Add a `publish` step in `azure-pipelines.yml` that calls `yarn deploy` with the secret variable. (`VSCODE_MARKETPLACE_TOKEN` in the example should be replaced with the name of the secret you created at the beginning of the process).

```yaml
- bash: |
    echo ">>> Publish"
    yarn deploy -p $(VSCODE_MARKETPLACE_TOKEN)
  displayName: Publish
  condition: and(succeeded(), startsWith(variables['Build.SourceBranch'], 'refs/tags/'), eq(variables['Agent.OS'], 'Linux'))
```

The [`condition`](https://docs.microsoft.com/azure/devops/pipelines/process/conditions) property tells the CI to run the publish step only in certain cases.

In our example, the condition has three checks:

- `succeeded()` - Publish only if the tests pass.
- `startsWith(variables['Build.SourceBranch'], 'refs/tags/')` - Publish only if a tagged (release) build.
- `eq(variables['Agent.OS'], 'Linux')` - Include if your build runs on multiple agents (Windows, Linux, etc.). If not, remove that part of the condition.
