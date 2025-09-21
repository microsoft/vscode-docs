---
ContentId: 99a5d36e-ce14-4040-b1cf-7345b7fa2c7d
DateApproved: 9/21/2025
MetaDescription: Get started with Microsoft Fabric extensions for Visual Studio Code to develop data engineering and analytics solutions
MetaSocialImage: images/datascience/fabric-social.png
---

# Microsoft Fabric Extensions for Visual Studio Code

## Overview
[Microsoft Fabric](https://learn.microsoft.com/fabric/) extensions for VS Code provide a powerful, integrated development experience for data engineers and developers working with Fabric artifacts, lakehouses, notebooks, and user data functions. These extensions streamline workflows by enabling local development, debugging, and workspace management directly within VS Code.

## What is Microsoft Fabric?

[Microsoft Fabric](http://app.fabric.microsoft.com/) is an enterprise-ready, end-to-end analytics platform. It unifies data movement, data processing, ingestion, transformation, real-time event routing, and report building. It supports these capabilities with integrated services like Data Engineering, Data Factory, Data Science, Real-Time Intelligence, Data Warehouse, and Databases. [Sign up for free](https://app.fabric.microsoft.com/?pbi_source=learn-vscodedocs-microsoft-fabric-quickstart) and explore Microsoft Fabric for 60 days — no credit card required.

![What is Microsoft Fabric?](images/microsoft-fabric/microsoft-fabric.png)

## Prerequisites

Before you get started with Microsoft Fabric extensions for VS Code, you need:

* **Visual Studio Code**: Install [VS Code](https://code.visualstudio.com/) version 1.74.0 or later.
* **Microsoft Fabric account**: You need access to a Microsoft Fabric workspace. You can [sign up for a free trial](https://app.fabric.microsoft.com/?pbi_source=learn-vscodedocs-microsoft-fabric-quickstart) to get started.
* **Python**: For data engineering and notebook development, install [Python 3.8 or later](https://python.org/downloads/).

## Installation and setup

You can find and install the extensions in VS Code. Select the **Extensions** and search for **Microsoft Fabric** in the Extensions marketplace.

### Which extensions to use

| Extension                  | Best For | Key Features | Recommended for you if… |Documentation|
|-----------------------------|-----------------------------|-----------------------------|--------------------------| --------------------------|
| **Microsoft Fabric extension**   | General workspace management, item management and working with item definitions | - Manage Fabric items (Lakehouses, Notebooks, Pipelines)<br>- Microsoft account sign-in & tenant switching<br>- Unified or grouped item views<br>- Edit Fabric notebooks with IntelliSense<br>- Command Palette integration (`Fabric:` commands) | You want a single extension to manage workspaces, notebooks, and items in Fabric directly from VS Code. | [What is Fabric VS code extension](https://learn.microsoft.com/fabric/data-engineering/set-up-fabric-vs-code-extension)|
| **Fabric User data functions** | Developers building custom transformations & workflows | - Author serverless functions in Fabric<br>- Local debugging with breakpoints<br>- Manage data source connections<br>- Install/manage Python libraries<br>- Deploy functions directly to Fabric workspace | You build automation or data transformation logic and need debugging + deployment from VS Code. | [Developer User data function in VS code](https://learn.microsoft.com/fabric/data-engineering/user-data-functions/create-user-data-functions-vs-code)|
| **Fabric Data Engineering** | Data engineers working with large-scale data & Spark | - Explore Lakehouses (tables, raw files)<br>- Develop/debug Spark notebooks<br>- Build/test Spark job definitions<br>- Sync notebooks between local VS Code & Fabric<br>- Preview schemas & sample data | You work with Spark, Lakehouses, or large-scale data pipelines and want to explore, develop, and debug locally. | [Develop notebooks in VS Code](https://learn.microsoft.com/fabric/data-engineering/setup-vs-code-extension)
|

## Getting started
Once you have the extensions installed and signed in, you can start working with Fabric workspaces and items. In the Command Palette `(Ctrl+Shift+P)`, type **Fabric** to list the commands that are specific to Microsoft Fabric.
![Microsoft Fabric commands](images/microsoft-fabric/fabric-command-palette.png)

## Fabric Workspace and items explorer

The Fabric extensions provide a seamless way to work with both remote and local Fabric items.
- In the Fabric extension, you'll see a **Fabric Workspaces** section that displays all items from your remote workspace, organized by type (Lakehouses, Notebooks, Pipelines, etc.).
- In the Fabric extension, you'll see a **Local folder** section that displays a Fbric item(s) folder opened in VS Code. It reflects the structure of your fabric item definition for each type that is opened in VS Code. This allows you develop locally and publish your changes to current or new workspace.

 [Add image remote and local view]

## Use user data functions for data science

1. In the Command Palette `(Ctrl+Shift+P)`, type **Fabric: Create Item**.
2. Select your workspace and select **User data function**. Provide a name and select **Python** language.
3. You will be notificed to setup the Python virtual environment and continue to set this up locally.
4. Open `functions_app.py` and
Here's an example of developing a User Data Function for data science using scikit-learn:

```python
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import numpy as np
import datetime
import fabric.functions as fn
import logging

udf = fn.UserDataFunctions()

@udf.function()
def train_customer_churn_model(datapath: str, targetcolumn: str):
    """
    Train a Random Forest model to predict customer churn.

    Args:
        data_path (str): Path to the training dataset
        target_column (str): Name of the target column

    Returns:
        dict: Model performance metrics and model path
    """
    # Load and prepare data
    df = pd.read_csv(data_path)

    # Feature engineering
    numeric_features = df.select_dtypes(include=[np.number]).columns.tolist()
    numeric_features.remove(target_column)

    X = df[numeric_features]
    y = df[target_column]

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train Random Forest model
    rf_model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42,
        class_weight='balanced'
    )

    rf_model.fit(X_train_scaled, y_train)

    # Make predictions and evaluate
    y_pred = rf_model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)

    # Save model and scaler
    joblib.dump(rf_model, 'churn_model.pkl')
    joblib.dump(scaler, 'feature_scaler.pkl')

    return {
        'accuracy': accuracy,
        'classification_report': classification_report(y_test, y_pred),
        'feature_importance': dict(zip(numeric_features, rf_model.feature_importances_)),
        'model_path': 'churn_model.pkl',
        'scaler_path': 'feature_scaler.pkl'
    }

@udf.function()
def predict_churn(customerdata: pd.DataFrame) -> pd.DataFrame:
    """
    Predict customer churn using the trained model.

    Args:
        customer_data (pd.DataFrame): Customer features for prediction

    Returns:
        pd.DataFrame: Predictions with probability scores
    """
    # Load saved model and scaler
    model = joblib.load('churn_model.pkl')
    scaler = joblib.load('feature_scaler.pkl')

    # Scale features
    features_scaled = scaler.transform(customer_data)

    # Make predictions
    predictions = model.predict(features_scaled)
    probabilities = model.predict_proba(features_scaled)

    # Return results
    results = customer_data.copy()
    results['churn_prediction'] = predictions
    results['churn_probability'] = probabilities[:, 1]  # Probability of churn

    return results
```

5. Update the `requirements.txt` file to specify the dependencies:

    ```txt
    scikit-learn=1.2.0
    joblib=1.2.0
    fabric-user-data-functions == 1.0.0
    pandas == 2.3.1
    numpy == 2.3.2
    requests == 2.32.5
    ```

6. Test your functions locally, by pressing `F5`.
7. In Fabric extension,in **Local folder** , select the function and publish to your the workspace.
   [ADD image]


## Git integration
Microsoft Fabric supports Git integration that enables seamless version control and collaboration across data and analytics projects. You can connect a Fabric workspace to Git repositories—primarily Azure DevOps or GitHub and only supported items are synced. The integration supports CI/CD workflows, allowing teams to manage releases efficiently and maintain high-quality analytics environments.

 [Add image for GIT with source control]

## Fabric MCP server
The Fabric local MCP that packages the full OpenAPI specifications for Fabric’s public APIs, JSON schemas for every item type (Lakehouses, pipelines, semantic models, notebooks, Real‑Time analytics workloads and more) and built‑in guidance on pagination, error handling and other best practices.

[Add getting started content]

## Next steps

Now that you have Microsoft Fabric extensions set up in VS Code, explore these resources to deepen your knowledge:

### Learn more about Microsoft Fabric

* [Set up your Fabric trial capacity](https://learn.microsoft.com/fabric/fundamentals/fabric-trial)
* [Microsoft Fabric fundamentals](https://learn.microsoft.com/fabric/fundamentals/fabric-overview)

### Community and support

* [Microsoft Fabric community forums](https://community.fabric.microsoft.com/)
* [Fabric samples and templates](https://github.com/microsoft/fabric-samples)
* [VS Code marketplace reviews and feedback](https://marketplace.visualstudio.com/items?itemName=ms-fabric.vscode-fabric)
