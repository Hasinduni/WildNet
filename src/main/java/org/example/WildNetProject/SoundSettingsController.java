package org.example.WildNetProject;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Slider;
import javafx.scene.control.ToggleButton;
import javafx.stage.Stage;

import java.io.IOException;

public class SoundSettingsController {

    @FXML
    private ToggleButton calmMusicButton, funMusicButton, customMusicButton;
    @FXML
    private Slider musicSlider;
    @FXML
    private Button muteMusicButton, btnApply, btnRevert;
    @FXML
    private Stage stage;

    @FXML
    public void initialize() {
        setupMusicButtons();
        muteMusicButton.setOnAction(this::toggleMute);
        btnApply.setOnAction(this::applySettings);
        btnRevert.setOnAction(this::revertSettings);
    }

    private void setupMusicButtons() {
        calmMusicButton.setOnAction(event -> selectMusic("Calm Music"));
        funMusicButton.setOnAction(event -> selectMusic("Fun Music"));
        customMusicButton.setOnAction(event -> selectMusic("Custom Music"));
    }

    private void selectMusic(String musicType) {
        System.out.println("Selected Music Type: " + musicType);
        // Add additional logic here if needed
    }

    private void toggleMute(ActionEvent event) {
        boolean isMuted = musicSlider.getValue() == 0;
        if (!isMuted) {
            musicSlider.setValue(0);
            System.out.println("Muted");
        } else {
            musicSlider.setValue(50);  // Assuming 50 is the default volume level
            System.out.println("Unmuted");
        }
    }

    @FXML
    private void applySettings(ActionEvent event) {
        // Implement the logic to apply settings
        System.out.println("Settings Applied");
    }

    @FXML
    private void revertSettings(ActionEvent event) {
        // Implement the logic to revert settings
        System.out.println("Settings Reverted to Default");
    }

    public void goToTheme(ActionEvent event) throws IOException {
        switchScene(event, "theme.fxml");
    }

    public void goToUser(ActionEvent event) throws IOException {
        switchScene(event, "user.fxml");
    }

    public void goToSound(ActionEvent event) throws IOException {
        switchScene(event, "sound.fxml");
    }

    public void goToDashboard(ActionEvent event) throws IOException {
        switchScene(event, "dashboard.fxml");
    }

    // Common method to switch scenes
    private void switchScene(ActionEvent event, String fxmlFile) throws IOException {
        Parent newRoot = FXMLLoader.load(getClass().getResource(fxmlFile));
        Scene scene = new Scene(newRoot);
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setResizable(false);
        stage.setScene(scene);
    }
}
