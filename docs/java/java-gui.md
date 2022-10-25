---
Order: 12
Area: java
TOCTitle: GUI Applications
ContentId: 517db620-d166-4f72-99c1-fa046710dffe
PageTitle: Develop Java GUI Applications in Visual Studio Code
DateApproved: 10/11/2022
MetaDescription: How to develop Java GUI Applications (JavaFX, AWT, Swing) in Visual Studio Code
---

# Working with GUI applications in VS Code

You can develop Java GUI applications in Visual Studio Code easily. To achieve that, you need to install the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which includes all the required extensions to develop Java GUI applications.

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Extension Pack for Java</a>

If you run into any issues when using the features below, you can contact us by entering an [issue](https://github.com/microsoft/vscode-java-pack/issues).

## Develop JavaFX applications

### Create a new JavaFX project

You can create a new JavaFX application with just a few steps in VS Code:

- Step 1: Install the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack).
- Step 2: In Visual Studio Code, open the Command Palette (`kb(workbench.action.showCommands)`) and then select the command **Java: Create Java Project**.
- Step 3: Select the option **JavaFX** in the list, follow the wizard, which will help you scaffold a new JavaFX project via Maven Archetype.

![create JavaFX project](images/java-gui/create-javafx.png)

### Run the JavaFX application

> Note: The following guidance only works for projects managed by Maven. The generated project requires at least JDK 11 to launch it. Please make sure you have JDK 11 installed locally and set the installation path to the setting [`java.configuration.runtimes`](https://github.com/redhat-developer/vscode-java#project-jdks).

To run the JavaFX application, you can open the **Maven** Explorer, expand `hellofx` > `Plugins` > `javafx` and run the Maven goal: `javafx:run`.

> **Note**: Make sure you have installed the [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) extension. If you cannot find the **Maven** explorer, open the Command Palette (`kb(workbench.action.showCommands)`) and then select the command **Explorer: Focus on Maven View**.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-gui/run-javafx.mp4" type="video/mp4">
</video>

### More JavaFX examples

More JavaFX project examples can be found in the [openjfx samples repository](https://github.com/openjfx/samples/tree/master/IDE/VSCode), which covers different project structures (such as Gradle and unmanaged folder projects). There is documentation on each sample to describe how to run the program.

## Develop AWT applications

By default, the types from the Abstract Window Toolkit (AWT) are hidden. You may notice that code completions are not working when you are developing an AWT application. To enable completions, you can open the Command Palette  (`kb(workbench.action.showCommands)`) and then select the command **Java: Help Center**. Go to the **Student** section and select **Enable AWT Development**.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-gui/enable-awt.mp4" type="video/mp4">
</video>

> Note: This action will update a setting, `java.completion.filteredTypes` at the workspace level in `.vscode\settings.json`, so please make sure a workspace is opened in VS Code.

You can use the sample code below to run a simple Java AWT application in VS Code.

```java
import java.awt.*;
import java.awt.event.*;

public class AwtExample extends Frame {
  public AwtExample() {
    Button btn = new Button("Button");
    btn.setBounds(50, 50, 50, 50);
    add(btn);
    setSize(150, 150);
    setTitle("This is my First AWT example");
    setLayout(new FlowLayout());
    setVisible(true);
    addWindowListener(new WindowAdapter() {
        public void windowClosing(WindowEvent we) {
            dispose();
        }
    });
  }

  public static void main(String args[]){
    new AwtExample();
  }
}
```

## Develop Swing applications

Swing application development is supported by default. You can directly write your Swing application code without any setup.

You can find more Swing samples in the [Oracle Swing documentation](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html).
