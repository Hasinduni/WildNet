package org.example.WildNetProject;

import javafx.concurrent.Worker;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.ButtonType;
import javafx.scene.input.MouseEvent;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.Objects;
import java.util.Optional;
import java.util.ResourceBundle;

public class gameViewController implements Initializable {
    @FXML
    private WebView webview;
    private WebEngine engine;
    private String buttonID;

    public String getButtonID() {
        return buttonID;
    }

    public void setButtonID(String buttonID) {
        this.buttonID = buttonID;
    }
    public void goToDashboard(MouseEvent event) throws IOException {
        Parent newRoot = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("dashboard.fxml")));
        Scene scene = new Scene(newRoot);
        Stage window = (Stage) ((Node) event.getSource()).getScene().getWindow();
        window.setScene(scene);
    }

    public void loading() {

        URL url = this.getClass().getResource("GameZone/" + buttonID.toLowerCase() + ".html");

        if (url != null) {
            engine.getLoadWorker().stateProperty().addListener((obs, oldState, newState) -> {
                if (newState == Worker.State.SUCCEEDED) {
                    System.out.println("Page loaded successfully!");
                }
            });
            engine.load(url.toString());

            System.out.println("Game Play");
        } else {
            System.out.println("Result Not Found");
        }
    }

    public void exits(ActionEvent event){
        Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
        alert.setTitle("Confirm Exit");
        alert.setHeaderText(null);
        alert.setContentText("Do You Want To Exit?");

        ButtonType buttonYes = new ButtonType("Yes");
        ButtonType buttonNo = new ButtonType("No");

        alert.getButtonTypes().setAll(buttonYes, buttonNo);

        Optional<ButtonType> result = alert.showAndWait();
        if (result.isPresent() && result.get() == buttonYes) {
            Parent newRoot = null;
            try {
                newRoot = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("gamehome.fxml")));
                Scene scene = new Scene(newRoot);
                Stage window = (Stage) ((Node) event.getSource()).getScene().getWindow();
                window.setScene(scene);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }
        if (result.isPresent() && result.get() == buttonNo) {
            System.out.println("Okay");
        }

    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        engine=webview.getEngine();
    }
}
