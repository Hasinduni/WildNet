package org.example.WildNetProject;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.Objects;
import java.util.Optional;
import java.util.ResourceBundle;

public class gameHomeController implements Initializable {



    // Go back to Dashboard
    public void goToDashboard(MouseEvent event) throws IOException {
        Parent newRoot = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("dashboard.fxml")));
        Scene scene = new Scene(newRoot);
        Stage window = (Stage) ((Node) event.getSource()).getScene().getWindow();
        window.setScene(scene);
    }

    @FXML
    private void handleGameSelection(ActionEvent event) throws IOException {
        Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
        alert.setTitle("Confirm Game Selection");
        alert.setHeaderText(null);
        alert.setContentText("Would You Really Want to Play This Game?");

        ButtonType buttonYes = new ButtonType("Yes");
        ButtonType buttonNo = new ButtonType("No");

        alert.getButtonTypes().setAll(buttonYes, buttonNo);

        Optional<ButtonType> result = alert.showAndWait();
        if (result.isPresent() && result.get() == buttonYes) {
            Button Clicked = (Button) event.getSource();
            String buttonId = Clicked.getId();
            loadGamePlay(event,buttonId);
        }
    }

    private void loadGamePlay(ActionEvent event,String buttonId) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("gamePlay.fxml"));
        Parent childNode = fxmlLoader.load();
        gameViewController controller=fxmlLoader.getController();
        controller.setButtonID(buttonId);
        controller.loading();

        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();

        // Set the new scene
        stage.setScene(new Scene(childNode));
    }
    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

    }
}
