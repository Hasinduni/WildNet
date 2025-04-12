package org.example.WildNetProject;

import javafx.concurrent.Worker;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.scene.image.ImageView;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;
import javafx.stage.Stage;
import javafx.scene.web.WebView;
import java.io.IOException;
import java.net.URL;
import java.util.Objects;
import java.util.ResourceBundle;

public class learningResultController implements Initializable {
        @FXML
        private ImageView imageview1;

        @FXML
        private TextField textfield;
        @FXML
        private VBox mainpart;
        private String buttonId;
        private WebEngine engine;
        private  String text;


    public void setButtonId(String buttonId) {
        this.buttonId = buttonId;
    }

    @FXML
        private  WebView webview;
    // This method gets called from learningHomeController
    public void setSearchText(String searchText) {
        text=searchText;
        URL url=this.getClass().getResource("LearnCenter/"+text.toLowerCase()+".html");
        if(url!=null) {
            engine.load(url.toString());
            System.out.println("Learning");
        }
        else{
            System.out.println("Result Not Found");
        }


    }

    public void goToDashboard(ActionEvent event) throws IOException {
        Parent newRoot = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("learningHome.fxml")));
        Scene scene = new Scene(newRoot);
        Stage window = (Stage) ((Node) event.getSource()).getScene().getWindow();
        window.setScene(scene);
    }

    public void search(){
        System.out.println("Learning Center");
       String text=textfield.getText().isEmpty() ? null :textfield.getText();
        if(text!=null && text!="") {
            text = textfield.getText();
            System.out.println(text);
            URL url = this.getClass().getResource("LearnCenter/" + text.toLowerCase() + ".html");
            if (url != null) {
                webview.getEngine().setOnAlert(event -> {
                    System.out.println(event.getData());
                });

                engine.getLoadWorker().stateProperty().addListener((obs, oldState, newState) -> {
                    if (newState == Worker.State.SUCCEEDED) {
                        System.out.println("Page loaded successfully!");
                    }
                });

                webview.getEngine().executeScript("console.log = function(message) { alert(message); };");
                engine.load(url.toString());
                System.out.println("Learning");
            } else {
                System.out.println("Result Not Found");
            }
        }
        else{
            text = buttonId;
            System.out.println(text);
            URL url = this.getClass().getResource("LearnCenter/" + text.toLowerCase() + ".html");
            if (url != null) {
                webview.getEngine().setOnAlert(event -> {
                    System.out.println(event.getData());
                });

                webview.getEngine().getLoadWorker().exceptionProperty().addListener((o, old, newval) -> {
                    if (newval != null) {
                        System.out.println("Exception Occurred: " + newval.getMessage());
                    }
                });

                webview.getEngine().executeScript("console.log = function(message) { alert(message); };");
                engine.load(url.toString());
                System.out.println("Learning");
            } else {
               System.out.println("Result Not Found");
            }
        }

    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
                engine=webview.getEngine();
    }
}
