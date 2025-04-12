package org.example.WildNetProject;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ToggleButton;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.event.ActionEvent;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.fxml.FXMLLoader;
import java.io.IOException;

public class ThemeSettingsController {

    @FXML
    private AnchorPane mainPane;

    @FXML
    private ToggleButton nightLightToggle;

    @FXML
    private Button btnMonochrome;

    @FXML
    private Button btnColorful;

    @FXML
    private Button btnApply;

    @FXML
    private Button btnRevert;

    private String currentTheme = "default";

    @FXML
    public void initialize() {
        nightLightToggle.setOnAction(this::toggleDarkLight);
        btnMonochrome.setOnAction(this::setMonochromeMode);
        btnColorful.setOnAction(this::setColorfulMode);
        btnApply.setOnAction(this::applySettings);
        btnRevert.setOnAction(this::revertToDefault);

        // Set initial selection state
        updateButtonStyles();
    }

    @FXML
    private void toggleDarkLight(ActionEvent event) {
        if (nightLightToggle.isSelected()) {
            mainPane.getScene().getStylesheets().add(getClass().getResource("dark-theme.css").toExternalForm());
        } else {
            mainPane.getScene().getStylesheets().remove(getClass().getResource("dark-theme.css").toExternalForm());
        }
    }

    @FXML
    private void setMonochromeMode(ActionEvent event) {
        currentTheme = "monochrome";
        updateButtonStyles();
    }

    @FXML
    private void setColorfulMode(ActionEvent event) {
        currentTheme = "colorful";
        updateButtonStyles();
    }

    @FXML
    private void applySettings(ActionEvent event) {
        mainPane.getScene().getStylesheets().clear();
        if ("monochrome".equals(currentTheme)) {
            mainPane.getScene().getStylesheets().add(getClass().getResource("monochrome-theme.css").toExternalForm());
        } else if ("colorful".equals(currentTheme)) {
            mainPane.getScene().getStylesheets().add(getClass().getResource("colorful-theme.css").toExternalForm());
        } else {
            // Default theme, no stylesheet applied
        }
    }

    @FXML
    private void revertToDefault(ActionEvent event) {
        currentTheme = "default";
        mainPane.getScene().getStylesheets().clear();
        updateButtonStyles();
    }

    @FXML
    public void goToTheme(ActionEvent event) throws IOException {
        switchScene("theme.fxml", event);
    }

    @FXML
    public void goToUser(ActionEvent event) throws IOException {
        switchScene("user.fxml", event);
    }

    @FXML
    public void goToSound(ActionEvent event) throws IOException {
        switchScene("sound.fxml", event);
    }

    @FXML
    public void goToDashboard(ActionEvent event) throws IOException {
        switchScene("dashboard.fxml", event);
    }

    private void switchScene(String fxmlFile, ActionEvent event) throws IOException {
        Parent newRoot = FXMLLoader.load(getClass().getResource(fxmlFile));
        Scene scene = new Scene(newRoot);
        Stage stage = (Stage) mainPane.getScene().getWindow();
        stage.setScene(scene);
    }

    private void updateButtonStyles() {
        btnMonochrome.getStyleClass().removeAll("selected");
        btnColorful.getStyleClass().removeAll("selected");

        if ("monochrome".equals(currentTheme)) {
            btnMonochrome.getStyleClass().add("selected");
        } else if ("colorful".equals(currentTheme)) {
            btnColorful.getStyleClass().add("selected");
        }
    }
}
