package org.example.WildNetProject;

import javafx.fxml.FXML;
import javafx.scene.control.DialogPane;
import javafx.scene.control.TextField;

public class usePassController {
    @FXML
    private TextField pass1;
    @FXML
    private TextField pass2;

    @FXML
    private DialogPane pane2;

    public TextField getPass1() {
        return pass1;
    }

    public TextField getPass2() {
        return pass2;
    }

    public DialogPane getPane2() {
        return pane2;
    }
}
