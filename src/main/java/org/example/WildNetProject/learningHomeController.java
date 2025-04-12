package org.example.WildNetProject;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.Objects;
import java.util.ResourceBundle;

public class learningHomeController implements Initializable {

    @FXML
    private TextField searchField;



    // Search based on the search field
    public void search(ActionEvent event) throws IOException {
        String searchText = searchField.getText();
        if (!searchText.isEmpty()) {
            // Assuming there is a method in learningResultController to set the search text
            FXMLLoader loader = new FXMLLoader(getClass().getResource("learningResult.fxml"));
            Parent newRoot = loader.load();

            learningResultController controller = loader.getController();
            controller.setSearchText(searchText);

            Scene scene = new Scene(newRoot);
            Stage window = (Stage) ((Node) event.getSource()).getScene().getWindow();
            window.setScene(scene);
        }
    }
    public void loadButtons(ActionEvent event) throws IOException {
        Button Clicked = (Button) event.getSource();
        String buttonId = Clicked.getId();
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("learningResult.fxml"));
        Parent childNode = fxmlLoader.load();
        learningResultController controller=fxmlLoader.getController();
        controller.setButtonId(buttonId);
        controller.search();

        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();

        // Set the new scene
        stage.setScene(new Scene(childNode));
    }

    // Go back to Dashboard
    public void goToDashboard(MouseEvent event) throws IOException {
        Parent newRoot = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("dashboard.fxml")));
        Scene scene = new Scene(newRoot);
        Stage window = (Stage) ((Node) event.getSource()).getScene().getWindow();
        window.setResizable(false);
        window.setScene(scene);
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

    }
}
