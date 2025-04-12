package org.example.WildNetProject;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class dashboardController  implements Initializable {
    private Stage stage;
    private Scene scene;
    @FXML
    private Button community;
    private Parent newRoot;
    @FXML
    private Label username;
    @FXML
    private ImageView img;
    public static String name;
    // Navigate to Learning Center
    public void goToLearningCenter(ActionEvent event) throws IOException {
        switchScene(event, "learningHome.fxml");
    }

    // Navigate to Game Home
    public void goToGameHome(ActionEvent event) throws IOException {
        switchScene(event, "gameHome.fxml");
    }

    // Navigate to Community Home
    public void goToCommunityHome(ActionEvent event) throws IOException {
        switchScene(event, "communityHome.fxml");
    }
    //navigate to the setting
    public void goToTheme(ActionEvent event) throws  IOException{
        switchScene(event,"theme.fxml");
    }
    // Common method to switch scenes
    private void switchScene(ActionEvent event, String fxmlFile) throws IOException {
        newRoot = FXMLLoader.load(getClass().getResource(fxmlFile));
        scene = new Scene(newRoot);
        stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setResizable(false);
        stage.setScene(scene);
    }
    public void user(String name){
        username.setText(name);

    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        databaseConnection Instance=databaseConnection.getInstance();
        Connection conn=Instance.getConnection();
        PreparedStatement pr1= null;
        try {
            pr1 = conn.prepareStatement("select img from userprof where user =? ");
            pr1.setString(1,name);
            ResultSet rs1=pr1.executeQuery();
            if(rs1.next()){
                InputStream inputStream = rs1.getBinaryStream("img");
                if(inputStream!=null){
                    Image image=new Image(inputStream);
                    img.setImage(image);
                }

            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        community.setDisable(true);
        user(name);

    }
}
