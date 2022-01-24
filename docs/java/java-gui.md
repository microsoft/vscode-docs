# Working with GUI application in Visual Studio Code

You can develop Java GUI applications in Visual Studio Code easily. To achieve that, you need to install the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which includes all the required extensions to develop Java GUI application.

If you run into any issues when using the features below, you can contact us by entering an [issue](https://github.com/microsoft/vscode-java-pack/issues).

## Develop JavaFX Application

Now you can simply create a new JavaFX application will very few steps in Visual Studio Code. Open the command palette **Command Palette**  (`kb(workbench.action.showCommands)`) and then select the command: **Java: Create Java Project**. You will find the option **JavaFX** in the list, which will help you scaffold a new JavaFX project via Maven archetype.

![create JavaFX project](images/java-gui/create-javafx.png)

To run the JavaFX application, you can open the `Maven` explorer, expand `hellofx` > `Plugins` > `javafx` and run the Maven goal: `javafx:run`.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-gui/run-javafx.mp4" type="video/mp4">
</video>

## Develop AWT Application

By default, the types from AWT are hidden. You may notice that the code completion is not working when you are developing an AWT application. To enable that, you can open the command palette **Command Palette**  (`kb(workbench.action.showCommands)`) and then select the command: **Java: Help Center**. Go to the **Student** section and click `Enable AWT Development`.

> Note: This action will update a setting in workspace level, so please make sure a workspace in opened in your Visual Studio Code.

## Develop Swing Application

Swing application development is supported by default. You can directly write your Swing application code without any setup steps.
