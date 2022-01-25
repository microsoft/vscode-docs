---
Order: 12
Area: java
TOCTitle: GUI Applications
ContentId: 517db620-d166-4f72-99c1-fa046710dffe
PageTitle: Develop Java GUI Applications in Visual Studio Code
DateApproved: 
MetaDescription: How to develop Java GUI Applications (JavaFX, AWT, Swing) in Visual Studio Code
MetaSocialImage:
---

# Working with GUI application in Visual Studio Code

You can develop Java GUI applications in Visual Studio Code easily. To achieve that, you need to install the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which includes all the required extensions to develop Java GUI application.

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Extension Pack for Java</a>

If you run into any issues when using the features below, you can contact us by entering an [issue](https://github.com/microsoft/vscode-java-pack/issues).

## Develop JavaFX Application

### Create a new JavaFX project

Now you can simply create a new JavaFX application with just a few steps in Visual Studio Code:

- Step 1: Install the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack).
- Step 2: In Visual Studio Code, open the command palette **Command Palette**  (`kb(workbench.action.showCommands)`) and then select the command: **Java: Create Java Project**.
- Step 3: Select the option **JavaFX** in the list, follow the wizard, which will help you scaffold a new JavaFX project via Maven Archetype.

![create JavaFX project](images/java-gui/create-javafx.png)

### Run the JavaFX application

> Note: The following guidance only works for projects managed by Maven.

To run the JavaFX application, you can open the `Maven` explorer, expand `hellofx` > `Plugins` > `javafx` and run the Maven goal: `javafx:run`.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-gui/run-javafx.mp4" type="video/mp4">
</video>

### More JavaFX examples

There are more JavaFX project examples, which cover Gradle and unmanaged folder projects in Visual Studio Code as well. You can find them [here](https://github.com/openjfx/samples/tree/master/IDE/VSCode). Each sample has documentation about how to run it as well.

## Develop AWT Application

By default, the types from AWT are hidden. You may notice that the code completion is not working when you are developing an AWT application. To enable that, you can open the command palette **Command Palette**  (`kb(workbench.action.showCommands)`) and then select the command: **Java: Help Center**. Go to the **Student** section and click `Enable AWT Development`.

> Note: This action will update a setting in workspace level, so please make sure a workspace in opened in your Visual Studio Code.

You can use the sample code below to run a simple Java AWT application in Visual Studio Code.

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

## Develop Swing Application

Swing application development is supported by default. You can directly write your Swing application code without any setup steps.

You can find more Swing samples [here](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html)
