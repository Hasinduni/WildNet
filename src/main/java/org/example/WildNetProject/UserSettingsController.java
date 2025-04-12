package org.example.WildNetProject;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.scene.control.Dialog;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import javax.swing.*;
import java.awt.*;
import java.io.*;

import java.sql.*;
import java.time.LocalDate;
import java.util.Optional;

public class UserSettingsController extends Component {

    @FXML
    private TextField nameTextField;
    @FXML
    private TextField emailTextField;
    @FXML
    private DatePicker dobDatePicker;
    @FXML
    private ImageView profileImageView;
    @FXML
    private Button setProfilePictureButton;
    @FXML
    private Button editDetailsButton;

    private static String nam1;
    private Stage stage;
    private Scene scene;

    private Parent newRoot;

    public static void setNam1(String nam1) {
        UserSettingsController.nam1 = nam1;
    }
    databaseConnection Instance=databaseConnection.getInstance();
    Connection conn=Instance.getConnection();
    // Initialize method, called after the FXML fields are populated
    @FXML
    public void initialize() throws SQLException, IOException {
        databaseConnection Instance=databaseConnection.getInstance();
        Connection conn=Instance.getConnection();
        PreparedStatement pr1=conn.prepareStatement("select img from userprof where user =? ");
        pr1.setString(1,nam1);
        ResultSet rs1=pr1.executeQuery();
        if(rs1.next()){
            InputStream inputStream = rs1.getBinaryStream("img");
            if(inputStream!=null){
                Image image=new Image(inputStream);
                profileImageView.setImage(image);
            }

        }
        setProfilePictureButton.setOnAction(event -> {
            try {
                setProfilePicture();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        });
        editDetailsButton.setOnAction(event -> saveUserDetails());
        try {
            Statement str=conn.createStatement();
            System.out.println(nam1);
            ResultSet rs=str.executeQuery("select * from userdetails where name='"+nam1+"'");
           rs.next();
           nameTextField.setText(rs.getString(1));
           emailTextField.setText(rs.getString(2));
           nameTextField.setEditable(false);
           emailTextField.setEditable(false);
           rs.close();
           str.close();


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public void setProfilePicture() throws SQLException, FileNotFoundException {
        FileChooser fileChooser = new FileChooser();
        fileChooser.setTitle("Select Profile Image");
        fileChooser.getExtensionFilters().addAll(
                new FileChooser.ExtensionFilter("Image Files", "*.png", "*.jpg", "*.jpeg"));
        File selectedFile = fileChooser.showOpenDialog(profileImageView.getScene().getWindow());
        FileInputStream fis = new FileInputStream(selectedFile);
        if (selectedFile != null) {
            profileImageView.setImage(new Image(selectedFile.toURI().toString()));
            String sqlQuery="update userprof set img=? where user=?";
            PreparedStatement preparedStatement= conn.prepareStatement(sqlQuery);
            preparedStatement.setBinaryStream(1, fis, (int) selectedFile.length());
            preparedStatement.setString(2,nam1);
            int result=preparedStatement.executeUpdate();
            preparedStatement.close();
            System.out.println("successfull "+result+" "+"raws affected");

        }
    }

    public void saveUserDetails() {
        FXMLLoader noteFxmlLoader = new FXMLLoader();
        noteFxmlLoader.setLocation(getClass().getResource("edit.fxml"));
        try {
            DialogPane dialogPane = noteFxmlLoader.load();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        editController controller = noteFxmlLoader.getController();
        Dialog<ButtonType> dialog = new Dialog<>();
        dialog.setDialogPane(controller.getPane1());
        dialog.setTitle("Change Details");
        Optional<ButtonType> check = dialog.showAndWait();
        if(check.get()==ButtonType.OK){
                String name=controller.getName1().getText().isEmpty() ? null :controller.getName1().getText();
                String email=controller.getEmail1().getText().isEmpty() ? null:controller.getEmail1().getText();
                LocalDate date=controller.getDobDatePicker().getValue();
               System.out.println("LocalDate value: " + date);
                if(name!=null && email!=null && date !=null) {
                    try {

                        PreparedStatement pr=conn.prepareStatement("update userdetails set name=?,email=?,dob=? where name=?");
                        System.out.println(nam1);
                        pr.setString(1,name);
                        pr.setString(2,email);
                        pr.setDate(3, Date.valueOf(date));
                        pr.setString(4,nam1);
                        pr.executeUpdate();
                        nam1 = name;
                        pr.close();
                        JOptionPane.showMessageDialog(this,"User Details Updated Successfully!","ALERT!",JOptionPane.INFORMATION_MESSAGE);
                    }
                    catch (SQLException e) {
                        throw new RuntimeException(e);
                    }
                }
                else{
                    JOptionPane.showMessageDialog(this,"Fields Cannot Be Empty","ALERT!",JOptionPane.ERROR_MESSAGE);
                }

        }
        if(check.get()==ButtonType.CANCEL){

        }



    }

    public void goToTheme(ActionEvent event) throws IOException {
        switchScene(event,"theme.fxml");
    }

    public void goToLogout(ActionEvent event) throws IOException{
        switchScene(event,"login.fxml");
    }

    public void goToUser(ActionEvent event) throws  IOException{
        switchScene(event,"user.fxml");
    }

    public void goToSound(ActionEvent event) throws  IOException{
        switchScene(event,"sound.fxml");
    }

    public void goToDashboard(ActionEvent event) throws  IOException{
        switchScene(event,"dashboard.fxml");
    }
    // Common method to switch scenes
    private void switchScene(ActionEvent event, String fxmlFile) throws IOException {
        newRoot = FXMLLoader.load(getClass().getResource(fxmlFile));
        scene = new Scene(newRoot);
        stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setResizable(false);
        stage.setScene(scene);
    }
}
